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
		case CONSTS.ACTION_TYPE_FAILED_SEARCH:
			return { ...state, failedSearch: true, searchTerm: action.searchTerm };
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
				failedSearch: false
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
			/**we keep a list of images - if the user searches for the same city then we don't need to all the api again (this isn't implemenetd yet...but it will be e!--[..\]) */
			const currentImage = state.backgroundImage;
			return {
				...state,
				lastBackgroundImage: currentImage,
				backgroundImage: action.backgroundImage
			};

		default:
			return state;
	}
};

export default appReducer;
