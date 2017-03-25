import React from 'react'
import { Provider } from 'react-redux'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import routes from './Routes'

function Store({store}) {
	return (
		<Provider store={store}>
			<Router history={browserHistory} routes={routes} />
		</Provider>
	);
}

export default Store