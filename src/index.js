import { createElement } from 'react'
import { render } from 'react-dom'

import store from './reducers/store'

import { AppContainer } from 'react-hot-loader'

import Store from './components/Store'


const hotRender = (Component) => render(
	createElement(
		AppContainer, 
		{}, 
		createElement(Component, {key: 'store', store: store})
	), 
	document.getElementById('root')
);

hotRender(Store);

if(module.hot) {
	module.hot.accept('./components/Template', () => hotRender(Store))
}