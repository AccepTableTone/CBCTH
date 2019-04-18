/**REACT */
import React from 'react';
/*LIBRARIES* */
/*PROJECT */
import FUNCS from '../config/funcs';

const WeatherTickerItem = (props) => {
	/**return a label ticker item */
	if (props.isFirst) {
		return (
			<div className="ticker-item first-ticker-item">
				<div>
					5 Day Forecast <i class="far fa-smile" />
				</div>
			</div>
		);
	}

	/**return a label ticker item */
	if (props.isLabel) {
		return (
			<div className="ticker-item label-ticker-item">
				<div className="ticker-item-label">{props.forecast.dt}</div>
				<div className="ticker-item-dow">{props.forecast.dt_wk}</div>
			</div>
		);
	}
	/**return a weather summary ticker item */
	const wdata =
		props.forecast && Array.isArray(props.forecast.weather) && props.forecast.weather.length > 0
			? props.forecast.weather[0]
			: null;

	if (!wdata) return null;

	return (
		<div className="ticker-item">
			<div className="ticker-item-tod">{props.forecast.dt_txt}</div>
			<div className="ticker-item-summary">{FUNCS.toTitleCase(wdata.description)}</div>
			<div className="display-flex">
				<div className="ticker-item-temp">
					{FUNCS.getTemperatureByUnit(props.forecast, props.currentTemperatureUnit)}
					<div className="ticker-item-unit">{FUNCS.getUnitStringByUnit(props.currentTemperatureUnit)}</div>
				</div>
				<div className="ticker-item-icon">
					<img src={FUNCS.getWeatherIconSource(wdata.icon)} width="40" height="40" alt={wdata.description} />
				</div>
			</div>
		</div>
	);
};

export default WeatherTickerItem;
