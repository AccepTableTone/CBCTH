import * as CONSTS from './constants';

export default {
	isLoading: false,
	hasError: false,
	errorMessage: '',

	userPosition: null,
	haveUserPosition: false,

	weatherData: null,
	haveWeatherData: false,
	foreCastData: null,
	haveForeCastData: false,

	currentTemperatureUnit: CONSTS.TYPES_TEMPERATURE_UNIT_CELSIUS,

	showSearch: false,
	isSearching: false,
	searchTerm: '',
	failedSearch: false,

	backgroundImage: null,
	lastBackgroundImage: CONSTS.STRING_DEFAULT_BG_IMAGE
};
