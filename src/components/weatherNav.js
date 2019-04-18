/**REACT */
import React from 'react';
/*LIBRARIES* */
/*PROJECT */
import * as CONSTS from '../config/constants';

const WeatherNav = (props) => {
	return (
		<div className="details-nav">
			{/* give user link to open search or show location weather */}
			{!props.showingSearch ? (
				<i onClick={() => props.toggleSearch(!props.showingSearch)} className="fas fa-search" />
			) : (
				<React.Fragment>
					{props.haveUserPosition && (
						<i
							onClick={() => {
								props.loadLocationWeather();
								props.toggleSearch(!props.showingSearch);
							}}
							className="fas fa-map-marker-alt"
						/>
					)}
				</React.Fragment>
			)}
			{props.haveWeatherData && (
				<React.Fragment>
					{/* ggive user link to change temperature unit */}
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
				</React.Fragment>
			)}
		</div>
	);
};

export default WeatherNav;
