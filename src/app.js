/**REACT */
import React from 'react';
/**LIBRARIES */
import { connect } from 'react-redux';
/**PROJECT */
import * as ACTIONS from './redux/actions';
import FUNCS from './config/funcs';
import WeatherDetails from './components/weatherDetails';
import WeatherTicker from './components/weatherTicker';
import SearchBox from './components/searchbox';

class App extends React.Component {
	/**when component mounts - determine user location */
	componentDidMount = () => {
		this.props.getUserLocation();
	};
	/**refresh weather data - pass this down to weather details */
	refreshWeatherData = () => {
		this.props.getWeatherByCityId(this.props.state.weatherData.cityId);
	};
	/**get weather data by cirty name string */
	getWeatherByCityName = (city) => {
		if (!FUNCS.isNullorEmpty(city)) {
			this.props.getWeatherByCityName(city);
		}
	};
	/**get weather data from set of long, lat coords */
	getWeatherByLocation = () => {
		this.props.getWeatherByCoordinates(
			this.props.state.userPosition.coords.longitude,
			this.props.state.userPosition.coords.latitude
		);
	};
	changeTemperatureUnit = (newUnit) => {
		this.props.changeTemperatureUnit();
	};
	/**render app */
	render() {
		return (
			<div
				className="weather-page-container"
				id="weatherPageContainer"
				style={FUNCS.getBackgroundImageStyle(
					this.props.state.backgroundImage,
					this.props.state.lastBackgroundImage
				)}
			>
				<React.Fragment>
					<div className="search-container">
						{this.props.state.showSearch && (
							<React.Fragment>
								<div className="failed-search-msg">
									{this.props.state.failedSearch &&
										`We could not find the city '${this.props.state
											.searchTerm}'. Please try again.`}
								</div>

								<SearchBox
									isSeaching={this.props.state.isSearching}
									getWeatherByCityName={this.getWeatherByCityName}
								/>
							</React.Fragment>
						)}
					</div>

					<WeatherDetails
						weatherData={this.props.state.weatherData}
						refreshWeatherData={this.refreshWeatherData.bind(this)}
						loadCurrentLocationWeather={this.getWeatherByLocation.bind(this)}
						currentTemperatureUnit={this.props.state.currentTemperatureUnit}
						changeTemperatureUnit={this.changeTemperatureUnit.bind(this)}
						isLoading={this.props.state.isLoading}
						showingSearch={this.props.state.showSearch}
						toggleSearch={this.props.toggleSearch.bind(this)}
						haveWeatherData={this.props.state.haveWeatherData}
						haveUserPosition={this.props.state.haveUserPosition}
					/>

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
		getWeatherByCityName: (cityName) => dispatch(ACTIONS.getWeatherByCityName(cityName)),
		getWeatherByCityId: (cityId) => dispatch(ACTIONS.getWeatherByCityId(cityId)),
		getForecastByCityId: (cityId) => dispatch(ACTIONS.getFiveDayForecastByCityId(cityId)),
		changeTemperatureUnit: (newTemperatureUnit) => dispatch(ACTIONS.changeTemperatureUnit(newTemperatureUnit)),
		toggleSearch: (showsearch) => dispatch(ACTIONS.toggleSearch(showsearch))
	};
}

const connectApp = connect(mapStateToProps, mapDispatchToProps);
export default connectApp(App);
