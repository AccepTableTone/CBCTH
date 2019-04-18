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
		fetch(`${CONSTS.CURRENT_WEATHER_URL}&lat=${latitude}&lon=${longitude}`)
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

/**the user can change between F and C - this handles it */
export const changeTemperatureUnit = (newTemperatureUnit) => {
	return (dispatch) => {
		dispatch(action.setTemperatureUnit(newTemperatureUnit));
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
	}
};
