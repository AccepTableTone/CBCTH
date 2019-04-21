/**open weather map */
export const API_KEY = '47af6dbf493821482ea2cb9248f58b91';
export const CURRENT_WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
export const FIVEDAY_WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
export const IMAGES_SEARCH_URL = `http://glth.acceptabletone.com/glth/api/imagesearch`;

/**action types */
export const ACTION_TYPE_IS_LOADING = 'isloading';
export const ACTION_TYPE_IS_SEARCHING = 'issearching';
export const ACTION_TYPE_EMPTY_SEARCH = 'emptySearch';
export const ACTION_TYPE_SETTING_BACKGROUND = 'background';
export const ACTION_TYPE_HAS_ERROR = 'haserror';
export const ACTION_TYPE_USER_LOCATION = 'userlocation';
export const ACTION_TYPE_WEATHER_DATA = 'weatherdata';
export const ACTION_TYPE_FORECAST_DATA = 'forecastdata';

export const ACTION_TOGGLE_TEMPERATURE_UNIT = 'toggleunit';
export const ACTION_TOGGLE_SHOWSEARCH = 'showsearch';

/**TYPES */
export const TYPES_TEMPERATURE_UNIT_CELSIUS = 'celsius';
export const TYPES_TEMPERATURE_UNIT_FAHRENHEIT = 'fahrenheit';

/**STRINGS */
export const STRING_UNIT_CELSIUS = '°C';
export const STRING_UNIT_FAHRENHEIT = '°F';

export const STRING_DEFAULT_BG_IMAGE =
	'https://www.vernonmorningstar.com/wp-content/uploads/2018/10/13912827_web1_180518-BPD-okanagan-weather.jpg';
