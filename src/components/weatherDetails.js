/**REACT */
import React from 'react';
/*LIBRARIES* */
/*PROJECT */
import * as CONSTS from '../config/constants';
import FUNCS from '../config/funcs';

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
					<img
						src={FUNCS.getWeatherIconSource(wdata.summaryIcon)}
						width="80"
						height="80"
						alt={wdata.summary}
					/>
				</div>
			</div>

			<div className="details-nav">
				{props.currentTemperatureUnit === CONSTS.TYPES_TEMPERATURE_UNIT_CELSIUS ? (
					<span onClick={() => props.changeTemperatureUnit(CONSTS.TYPES_TEMPERATURE_UNIT_FAHRENHEIT)}>
						{CONSTS.STRING_UNIT_FAHRENHEIT}
					</span>
				) : (
					<span onClick={() => props.changeTemperatureUnit(CONSTS.TYPES_TEMPERATURE_UNIT_CELSIUS)}>
						{CONSTS.STRING_UNIT_CELSIUS}
					</span>
				)}
				<i
					onClick={() => props.refreshWeatherData()}
					className={`fas fa-sync-alt ${props.isLoading ? 'fa-spin' : ''}`}
				/>
			</div>
		</div>
	);
};

export default WeatherDetails;
