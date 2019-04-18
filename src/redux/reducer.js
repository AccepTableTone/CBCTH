/**REACT */
/**LIBRARIES */
/**PROJECT */
import * as CONSTS from '../config/constants';

const appReducer = (state, action) => {
	switch (action.type) {
		/**waiting on async request */
		case CONSTS.ACTION_TYPE_IS_LOADING:
			return { ...state, isLoading: action.isLoading };
		/**have user geo location */
		case CONSTS.ACTION_TYPE_USER_LOCATION:
			return { ...state, userPosition: action.userPosition, haveUserPosition: action.haveUserPosition };
		/**have a some weather data */
		case CONSTS.ACTION_TYPE_WEATHER_DATA:
			return {
				...state,
				weatherData: action.weatherData,
				haveWeatherData: action.haveWeatherData,
				isLoading: false
			};
		/**have some 5 day forecast data */
		case CONSTS.ACTION_TYPE_FORECAST_DATA:
			return {
				...state,
				foreCastData: action.foreCastData,
				haveForeCastData: action.haveForeCastData
			};
		case CONSTS.ACTION_TOGGLE_TEMPERATURE_UNIT:
			return { ...state, currentTemperatureUnit: action.currentTemperatureUnit };
		default:
			return state;
	}
};

export default appReducer;
