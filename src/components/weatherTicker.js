/**REACT */
import React from 'react';
/*LIBRARIES* */
/*PROJECT */
import WeatherTickerItem from './weatherTickerItem';

let currentDay = null;

const getTickerItem = (forecast, currentTemperatureUnit, cityName) => {
	/**check what day we are looking at - if it is different than what we were looking at we want to add a label ticker item */
	if (forecast.dt !== currentDay) {
		currentDay = forecast.dt;
		return (
			<React.Fragment key={`${forecast.dt}LABEL`}>
				<WeatherTickerItem isLabel={true} forecast={forecast} cityName={cityName} />
				<WeatherTickerItem forecast={forecast} currentTemperatureUnit={currentTemperatureUnit} />
			</React.Fragment>
		);
	} else {
		/**if we are still on the same day - just show the forecast for the time of day */
		return (
			<WeatherTickerItem
				forecast={forecast}
				currentTemperatureUnit={currentTemperatureUnit}
				key={`${forecast.dt}${forecast.dt_txt}`}
			/>
		);
	}
};

const WeatherTicker = (props) => {
	return (
		<div className="ticker-wrap">
			<div className="ticker">
				<WeatherTickerItem isFirst={true} />

				{props.forecastData.details.map((forecast) => {
					return getTickerItem(forecast, props.currentTemperatureUnit, props.forecastData.cityName);
				})}
			</div>
		</div>
	);
};

export default WeatherTicker;
