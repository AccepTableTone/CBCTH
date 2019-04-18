/**REACT */
import React from 'react';
/**LIBRARIES */
import { connect } from 'react-redux';
/**PROJECT */
import * as ACTIONS from './redux/actions';
import FUNCS from './config/funcs';
import WeatherDetails from './components/weatherDetails';
import WeatherTicker from './components/weatherTicker';

class App extends React.Component {
	/**when component mounts - determine user location */
	componentDidMount = () => {
		this.props.getUserLocation();
	};
	/**refresh weather data - pass this down to weather details */
	refreshWeatherData = () => {
		this.props.getWeatherByCoordinates(
			this.props.state.userPosition.coords.longitude,
			this.props.state.userPosition.coords.latitude
		);
	};
	/**render app */
	render() {
		if (!this.props.state) return null;

		return (
			<div
				className="weather-page-container"
				style={FUNCS.getBackgroundImageStyle(this.props.state.backgroundImage)}
			>
				<React.Fragment>
					{this.props.state.haveWeatherData && (
						<WeatherDetails
							weatherData={this.props.state.weatherData}
							refreshWeatherData={this.refreshWeatherData.bind(this)}
							currentTemperatureUnit={this.props.state.currentTemperatureUnit}
							changeTemperatureUnit={this.props.changeTemperatureUnit.bind(this)}
							isLoading={this.props.state.isLoading}
						/>
					)}
					{this.props.state.haveForeCastData && (
						<WeatherTicker
							forecastData={this.props.state.foreCastData}
							currentTemperatureUnit={this.props.state.currentTemperatureUnit}
						/>
					)}
				</React.Fragment>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { state };
}

function mapDispatchToProps(dispatch) {
	return {
		getUserLocation: () => dispatch(ACTIONS.getCurrentUsersLocation()),
		getWeatherByCoordinates: (longitude, latitude) =>
			dispatch(ACTIONS.getWeatherByCoordinates(longitude, latitude)),
		getForecastByCityId: (cityId) => dispatch(ACTIONS.getFiveDayForecastByCityId(cityId)),
		changeTemperatureUnit: (newTemperatureUnit) => dispatch(ACTIONS.changeTemperatureUnit(newTemperatureUnit))
	};
}

const connectApp = connect(mapStateToProps, mapDispatchToProps);
export default connectApp(App);
