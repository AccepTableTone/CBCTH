/**REACT */
import React from 'react';
/*LIBRARIES* */
/*PROJECT */
import FUNCS from '../config/funcs';
import WeatherNav from './weatherNav';

const WeatherDetails = (props) => {
	const wdata = props.weatherData;

	return (
		<div className="details-container">
			<div className="details-location">{wdata.cityName}</div>
			<div className="details-date">{FUNCS.formatDate(new Date(), 'MMMM DD h:mm a')}</div>
			<div className="summary-text">{FUNCS.toTitleCase(wdata.summary)}</div>

			<div className="display-flex">
				<div className="details-temp">
					{FUNCS.getTemperatureByUnit(wdata, props.currentTemperatureUnit)}
					<div className="details-temp-unit">{FUNCS.getUnitStringByUnit(props.currentTemperatureUnit)}</div>
				</div>
				<div className="summary-icon">
					{wdata.summaryIcon && (
						<img
							src={FUNCS.getWeatherIconSource(wdata.summaryIcon)}
							width="80"
							height="80"
							alt={wdata.summary}
						/>
					)}
				</div>
			</div>
			<WeatherNav
				refreshWeatherData={props.refreshWeatherData}
				loadLocationWeather={props.loadCurrentLocationWeather}
				changeTemperatureUnit={props.changeTemperatureUnit}
				currentTemperatureUnit={props.currentTemperatureUnit}
				toggleSearch={props.toggleSearch}
				showingSearch={props.showingSearch}
			/>
		</div>
	);
};

export default WeatherDetails;
