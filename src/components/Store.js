import React from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './Routes'

function Store({store}) {
	return (
		<Provider store={store}>
			<Router history={browserHistory} routes={routes} />
		</Provider>
	);
}

export default Store