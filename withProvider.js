import React from 'react';
import { Provider } from 'react-redux';
import store from './src/reducers/store.js';
import MainPlayer from './src/components/Player/Player';

function withProvider({element}) {
	return (
		<Provider 
			store={store}
		>
			<React.Fragment>
				{element}
				<MainPlayer />
			</React.Fragment>
		</Provider>
	);
}

export default withProvider;