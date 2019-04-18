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

	currentTemperatureUnit: CONSTS.STRING_UNIT_CELSIUS,

	backgroundImage: null
};
