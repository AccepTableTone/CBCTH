/**REACT */
import React from 'react';
/*LIBRARIES* */
/*PROJECT */

const SearchBox = (props) => {
	const searchForCityWeather = () => {
		props.getWeatherByCityName(document.getElementById('tbCitySearch').value);
		document.getElementById('tbCitySearch').value = '';
		document.getElementById('tbCitySearch').blur();
	};
	return (
		<React.Fragment>
			<div>
				<input
					type="text"
					id="tbCitySearch"
					className="search-input"
					maxLength="35"
					autoComplete="off"
					onKeyDown={(event) => {
						if (event.keyCode === 13) {
							searchForCityWeather();
						}
					}}
				/>
			</div>
			<div className="search-icon-container">
				{!props.isSearching ? (
					<i className="fas fa-search pointer" onClick={() => searchForCityWeather()} />
				) : (
					<i className="fas fa-spinner fa-spin" />
				)}
			</div>
		</React.Fragment>
	);
};

export default SearchBox;
