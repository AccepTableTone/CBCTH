/**REACT */
/**LIBRARIES */
/**PROJECT */
import * as CONSTS from '../config/constants';

const appReducer = (state, action) => {
	switch (action.type) {
		/**waiting on async request */
		case CONSTS.ACTION_TYPE_IS_LOADING:
			return { ...state, isLoading: action.isLoading };
		/**waiting on async searchrequest */
		case CONSTS.ACTION_TYPE_IS_SEARCHING:
			return { ...state, isSearching: action.isSearching };
		/**waiting on async searchrequest */
		case CONSTS.ACTION_TYPE_EMPTY_SEARCH:
			return { ...state, emptySearch: true, searchTerm: action.searchTerm, hasError: false, isSearching: false };
		/**have user geo location */
		case CONSTS.ACTION_TYPE_USER_LOCATION:
			return { ...state, userPosition: action.userPosition, haveUserPosition: action.haveUserPosition };
		/**have a some weather data */
		case CONSTS.ACTION_TYPE_WEATHER_DATA:
			return {
				...state,
				weatherData: action.weatherData,
				haveWeatherData: action.haveWeatherData,
				isLoading: false,
				isSearching: false,
				searchTerm: '',
				emptySearch: false,
				hasError: false
			};
		/**have some 5 day forecast data */
		case CONSTS.ACTION_TYPE_FORECAST_DATA:
			return {
				...state,
				foreCastData: action.foreCastData,
				haveForeCastData: action.haveForeCastData
			};
		/**switch temperature unit c and F */
		case CONSTS.ACTION_TOGGLE_TEMPERATURE_UNIT:
			return { ...state, currentTemperatureUnit: action.currentTemperatureUnit };
		/**show search text box */
		case CONSTS.ACTION_TOGGLE_SHOWSEARCH:
			return { ...state, showSearch: action.showSearch };
		/**update background image */
		case CONSTS.ACTION_TYPE_SETTING_BACKGROUND:
			return {
				...state,
				lastBackgroundImage: state.backgroundImage,
				backgroundImage: action.backgroundImage
			};
		case CONSTS.ACTION_TYPE_HAS_ERROR:
			return {
				...state,
				hasError: true,
				emptySearch: false,
				isSearching: false,
				errorMessage: action.errorMessage
			};
		default:
			return state;
	}
};

export default appReducer;
