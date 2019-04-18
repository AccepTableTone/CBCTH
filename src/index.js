/**REACT */
import React from 'react';
import ReactDOM from 'react-dom';
/**LIBRARIES */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
/**PROJECT */
import App from './app';
import appReducer from './redux/reducer';
import initialState from './config/initialState';

import './site.css';
/**thunk allows action creators to return functions instead of a plain object */
const store = createStore(appReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
