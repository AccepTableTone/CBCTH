import * as CONSTS from '../config/constants';
import FUNCS from '../config/funcs';

/**get the users current location from navigator */
export const getCurrentUsersLocation = () => {
	return (dispatch) => {
		/**set loading flag */
		dispatch(action.setIsLoading(true));
		/**can we get the user's location */
		if ('geolocation' in navigator) {
			/**get user's current position */
			navigator.geolocation.getCurrentPosition((position) => {
				/**dispatch the user's location to state so we can reuse it if we ned to */
				dispatch(action.setLocation(position));
				if (position.coords) {
					/**if we have some coordinates then ping the weather service for weather by coords */
					dispatch(getWeatherByCoordinates(position.coords.longitude, position.coords.latitude));
				} else {
					/**if no coords then no location - means no weather - UI will respond accordingly */
					dispatch(action.setLocation(null));
				}
			});
		} else {
			/**can't get location - so can't get weather by coords - set location to null and UI will respond accordingly */
			dispatch(action.setLocation(null));
		}
	};
};
/**request weather data from weather api by  coordinates */
export const getWeatherByCoordinates = (longitude, latitude) => {
	return (dispatch) => {
		/**set loading flag */
		dispatch(action.setIsLoading(true));
		fetch(`${CONSTS.CURRENT_WEATHER_URL}&lat=${latitude}&lon=${longitude}&mode=xml`)
			.then((response) => {
				/**check response */
				if (!response.ok) dispatch(action.setError(true));
				return response;
			})
			.then((response) => response.text())
			.then((response) => {
				/**parse xml response to JSON object and dispatch to store */
				const weatherData = FUNCS.mapWeatherXmlToJson(response);
				dispatch(action.setWeatherData(weatherData));

				if (!!weatherData.cityId) {
					dispatch(getFiveDayForecastByCityId(weatherData.cityId));
				}

				if (weatherData.cityName) {
					dispatch(getCityImage(weatherData.cityName));
				}
			});
	};
};
/**get weather by city id - this can be reused to refresh both weather by coords and weather by cityname  */
export const getWeatherByCityId = (cityId) => {
	return (dispatch) => {
		fetch(`${CONSTS.CURRENT_WEATHER_URL}&id=${cityId}`)
			.then((response) => {
				/**check response */
				if (!response.ok) dispatch(action.setError(true));
				return response;
			})
			.then((response) => response.json())
			.then((response) => {
				/**parse xml response to JSON object and dispatch to store */
				const weatherData = FUNCS.mapCityWeatherData(response);
				dispatch(action.setWeatherData(weatherData));

				if (!!weatherData.cityId) {
					dispatch(getFiveDayForecastByCityId(weatherData.cityId));
				}
			});
	};
};
/**get weather by city name */
export const getWeatherByCityName = (cityName) => {
	return (dispatch) => {
		fetch(`${CONSTS.CURRENT_WEATHER_URL}&q=${cityName}`)
			.then((response) => {
				/**check response */
				if (!response.ok) dispatch(action.setError(true));
				return response;
			})
			.then((response) => response.json())
			.then((response) => {
				/**if 404 then the cityname could not be found */
				if (response.cod === '404') {
					dispatch(action.setFailedSearch(cityName));
				} else {
					/**parse xml response to JSON object and dispatch to store */
					const weatherData = FUNCS.mapCityWeatherData(response);
					dispatch(action.setWeatherData(weatherData));

					if (!!weatherData.cityId) {
						dispatch(getFiveDayForecastByCityId(weatherData.cityId));
					}

					dispatch(getCityImage(cityName));
				}
			});
	};
};
/**get five day forecast from weather api by city id */
export const getFiveDayForecastByCityId = (cityId) => {
	return (dispatch) => {
		fetch(`${CONSTS.FIVEDAY_WEATHER_URL}&id=${cityId}`)
			.then((response) => {
				/**check response */
				if (!response.ok) dispatch(action.setError(true));
				return response;
			})
			.then((response) => response.json())
			.then((response) => {
				/**parse xml response to JSON object and dispatch to store */
				const forecastData = FUNCS.mapForecastData(response);
				dispatch(action.setForeCastData(forecastData));
			});
	};
};
/**try to find city image for background */
export const getCityImage = (cityName) => {
	return (dispatch) => {
		fetch(`${CONSTS.IMAGES_SEARCH_URL}/${cityName} skyline`)
			.then((response) => {
				/**check response */
				if (!response.ok) dispatch(action.setError(true));
				return response;
			})
			.then((response) => response.json())
			.then((response) => {
				let haveImage = false;
				if (response.Photos && Array.isArray(response.Photos) && response.Photos.length > 0) {
					const usingThisOne = response.Photos[0];
					if (usingThisOne.Src && usingThisOne.Src.Landscape) {
						haveImage = true;
						dispatch(action.setBackGroundImage(usingThisOne.Src.Landscape, cityName));
					}
				}
				if (!haveImage) {
					dispatch(action.setBackGroundImage(CONSTS.STRING_DEFAULT_BG_IMAGE, cityName));
				}
			});
	};
};
/**the user can change between F and C - this handles it */
export const changeTemperatureUnit = (newTemperatureUnit) => {
	return (dispatch) => {
		dispatch(action.setTemperatureUnit(newTemperatureUnit));
	};
};
/**the user can change between F and C - this handles it */
export const toggleSearch = (showSearch) => {
	return (dispatch) => {
		dispatch(action.toggleSearch(showSearch));
	};
};

/**created actions */
const action = {
	setIsLoading(isLoading) {
		return {
			type: CONSTS.ACTION_TYPE_IS_LOADING,
			isLoading
		};
	},
	setIsSearching(isSearching) {
		return {
			type: CONSTS.ACTION_TYPE_IS_SEARCHING,
			isSearching
		};
	},
	setFailedSearch(searchTerm) {
		return {
			type: CONSTS.ACTION_TYPE_FAILED_SEARCH,
			searchTerm
		};
	},
	setError(hasError) {
		return {
			type: CONSTS.ACTION_TYPE_HAS_ERROR,
			hasError
		};
	},
	setLocation(userPosition) {
		return {
			type: CONSTS.ACTION_TYPE_USER_LOCATION,
			userPosition,
			haveUserPosition: userPosition !== null
		};
	},
	setWeatherData(weatherData) {
		return {
			type: CONSTS.ACTION_TYPE_WEATHER_DATA,
			weatherData,
			haveWeatherData: !!weatherData
		};
	},
	setForeCastData(foreCastData) {
		return {
			type: CONSTS.ACTION_TYPE_FORECAST_DATA,
			foreCastData,
			haveForeCastData: !!foreCastData
		};
	},
	setTemperatureUnit(currentTemperatureUnit) {
		return {
			type: CONSTS.ACTION_TOGGLE_TEMPERATURE_UNIT,
			currentTemperatureUnit
		};
	},
	toggleSearch(showSearch) {
		return {
			type: CONSTS.ACTION_TOGGLE_SHOWSEARCH,
			showSearch
		};
	},
	setBackGroundImage(backgroundImage, cityName) {
		return {
			type: CONSTS.ACTION_TYPE_SETTING_BACKGROUND,
			backgroundImage,
			cityName
		};
	}
};
