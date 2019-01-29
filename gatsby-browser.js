import store from './src/reducers/store.js';
import withProvider from './withProvider.js';

export const wrapRootElement = withProvider;

export const onRouteUpdate = ({ location }) => {
	store.dispatch({type: 'HIDE_NAV'});
	store.dispatch({type: 'CLOSE_DRAWER'});
};