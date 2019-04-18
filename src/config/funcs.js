/**REACT */
/** LIBRARIES*/
import dateFormat from 'date-fns/format';
/**PROJECT */
import * as CONSTS from './constants';

//°F
export default {
	/**set background image - TODO: sort out how to properly transition from one background image to another - this is bareable */
	getBackgroundImageStyle(newImage, currentImage) {
		if (!newImage) {
			return {
				backgroundImage: `url(${currentImage})`,
				transition: '0s, 3s'
			};
		} else {
			return {
				backgroundImage: `url(${newImage}), url(${currentImage})`,
				transition: '0s, 3s'
			};
		}
	},
	/**the weather api include a icon reference - so lets show an icon e!--[../] - if we don't have an icon, default to a sunny day */
	getWeatherIconSource(icon) {
		if (!icon) return `http://openweathermap.org/img/w/01d.png`;
		return `http://openweathermap.org/img/w/${icon}.png`;
	},
	/**weather api returns temps in kelvins - couple simple conversion funcs */
	convertKelvinTemperatureToCelsius(kelvin) {
		if (!kelvin) return null;
		return parseInt(kelvin - 273.15, 10);
	},
	convertKelvinTemperatureToFahrenheit(kelvin) {
		if (!kelvin) return null;
		return parseInt((kelvin - 273.15) * 9 / 5 + 32, 10);
	},
	/**the user can change the unit for temperature - so return the temp in that unit - we don't display kelvins */
	getTemperatureByUnit(currentWeather, currentUnit) {
		return currentUnit === CONSTS.TYPES_TEMPERATURE_UNIT_CELSIUS
			? currentWeather.temparatureInCelsius
			: currentWeather.temparatureInFahrenheit;
	},
	/**we store a display version of temp units as constants - this returns the one we want to display */
	getUnitStringByUnit(currentUnit) {
		return currentUnit === CONSTS.TYPES_TEMPERATURE_UNIT_CELSIUS
			? CONSTS.STRING_UNIT_CELSIUS
			: CONSTS.STRING_UNIT_FAHRENHEIT;
	},
	/**we are pulling the data from the weather api in XML - this will parse that xml into json then create a boiled down model that the components will use */
	mapWeatherXmlToJson(fullXml) {
		/**api xml to json */
		function xmlToJson(xml) {
			// Create the return object
			var obj = {};

			/**type 1 === ELEMENET_NODE */
			if (xml.nodeType === 1) {
				// element
				// do attributes
				if (xml.attributes.length > 0) {
					obj[`${xml.nodeName}Details`] = {};
					for (var j = 0; j < xml.attributes.length; j++) {
						var attribute = xml.attributes.item(j);
						obj[`${xml.nodeName}Details`][attribute.nodeName] = attribute.nodeValue;
					}
				}
			} else if (xml.nodeType === 3) {
				/**type 3 === TEXT_NODE */
				obj = xml.nodeValue;
			}

			// do children
			// If just one text node inside
			if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
				obj = xml.childNodes[0].nodeValue;
			} else if (xml.hasChildNodes()) {
				for (var i = 0; i < xml.childNodes.length; i++) {
					var item = xml.childNodes.item(i);
					var nodeName = item.nodeName;
					if (typeof obj[nodeName] == 'undefined') {
						obj[nodeName] = xmlToJson(item);
					} else {
						if (typeof obj[nodeName].push == 'undefined') {
							var old = obj[nodeName];
							obj[nodeName] = [];
							obj[nodeName].push(old);
						}
						obj[nodeName].push(xmlToJson(item));
					}
				}
			}
			return obj;
		}
		/**json from xml into simple model */
		function jsonToWeatherData(json) {
			const weatherJson = json.current;

			const weatherData = {
				summary: '',
				summaryIcon: null,
				temparatureInKelvins: null,
				temparatureInCelsius: null,
				temparatureInFahrenheit: null,
				cityId: null,
				cityName: ''
			};

			/**we are assuming the weather api service model is constant e!--[../]  */
			if (weatherJson) {
				weatherData.summary = weatherJson.weather.weatherDetails.value;
				weatherData.summaryIcon = weatherJson.weather.weatherDetails.icon;
				weatherData.isValid = true;
				weatherData.temparatureInKelvins = weatherJson.temperature.temperatureDetails.value;
				weatherData.isValid = true;
				weatherData.cityId = weatherJson.city.cityDetails.id;
				weatherData.cityName = weatherJson.city.cityDetails.name;
			}

			return weatherData;
		}

		const parser = new DOMParser();
		const xmlDom = parser.parseFromString(fullXml, 'application/xml');
		const json = xmlToJson(xmlDom);
		const weatherData = jsonToWeatherData(json);

		/**calculate the temps for differnet units here */
		weatherData.temparatureInCelsius = this.convertKelvinTemperatureToCelsius(weatherData.temparatureInKelvins);
		weatherData.temparatureInFahrenheit = this.convertKelvinTemperatureToFahrenheit(
			weatherData.temparatureInKelvins
		);

		return weatherData;
	},
	/**when refreshing we search by city id data originally populated by coords or city id */
	mapCityWeatherData(json) {
		const jsonWeather = Array.isArray(json.weather) && json.weather.length > 0 ? json.weather[0] : null;
		return {
			summary: jsonWeather ? jsonWeather.description : '',
			summaryIcon: jsonWeather ? jsonWeather.icon : null,
			temparatureInKelvins: json.main.temp,
			temparatureInCelsius: this.convertKelvinTemperatureToCelsius(json.main.temp),
			temparatureInFahrenheit: this.convertKelvinTemperatureToFahrenheit(json.main.temp),
			cityId: json.id,
			cityName: json.name
		};
	},
	/**we get a 5 day forecast from the weather api once we have a city - we get the data in json - this takes that json and creates a simple model  */
	mapForecastData(forecastJson) {
		/**our final forecast model */
		const forecastData = {
			cityId: forecastJson.city.id,
			cityName: forecastJson.city.name
		};

		/**we are only going to display 6am, noon, and 6pm in the 5 day forecast - so filter accordingly */
		forecastData.details = forecastJson.list.filter(
			(f) => f.dt_txt.includes('6:00') || f.dt_txt.includes('12:00') || f.dt_txt.includes('18:00')
		);
		/**create a some new properties from the dates in the data */
		forecastData.details.map((m) => {
			/**get month and day */
			m.dt = this.formatDate(new Date(m.dt_txt), 'MMMM DD');
			/**lets get the day of week as well */
			m.dt_wk = this.formatDate(new Date(m.dt_txt), 'dddd');
			/**quick date format to label morning, afternoon or evening */
			m.dt_txt = this.formatDate(new Date(m.dt_txt), 'h:mma')
				.replace('6:00am', 'Morning')
				.replace('12:00pm', 'Afternoon')
				.replace('6:00pm', 'Evening');
			m.temparatureInKelvins = m.main.temp;
			m.temparatureInCelsius = this.convertKelvinTemperatureToCelsius(m.main.temp);
			m.temparatureInFahrenheit = this.convertKelvinTemperatureToFahrenheit(m.main.temp);

			return m;
		});
		return forecastData;
	},
	/**utility to format dates */
	formatDate(date, fnsFormat) {
		return dateFormat(date, fnsFormat);
	},
	/**utility to fix some api string that are all lower case */
	toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	},
	isEmptyString(str) {
		return str.toString().replace(/ /g, '') === '';
	},
	isNullorEmpty(val) {
		return val === null || !val || this.isEmptyString(val);
	}
};
