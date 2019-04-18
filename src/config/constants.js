/**open weather map */
export const API_KEY = '47af6dbf493821482ea2cb9248f58b91';
export const CURRENT_WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&mode=xml`;
export const FIVEDAY_WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

/**action types */
export const ACTION_TYPE_IS_LOADING = 'isloading';
export const ACTION_TYPE_HAS_ERROR = 'haserror';
export const ACTION_TYPE_USER_LOCATION = 'userlocation';
export const ACTION_TYPE_WEATHER_DATA = 'weatherdata';
export const ACTION_TYPE_FORECAST_DATA = 'forecastdata';
export const ACTION_TOGGLE_TEMPERATURE_UNIT = 'toggleunit';

/**TYPES */
export const TYPES_TEMPERATURE_UNIT_CELSIUS = 'celsius';
export const TYPES_TEMPERATURE_UNIT_FAHRENHEIT = 'fahrenheit';

/**STRINGS */
export const STRING_UNIT_CELSIUS = '°C';
export const STRING_UNIT_FAHRENHEIT = '°F';
