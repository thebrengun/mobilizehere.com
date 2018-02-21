import { combineReducers, createStore, applyMiddleware } from 'redux'
import nav from './nav'
import scroll from './scroll'
import about from './about'
import podcast from './podcast'
import gallery from './gallery'
import resources from './resources'
import player from './player'
import drawer from './drawer'

const reducers = combineReducers({
	nav, 
	scroll,
	about,
	podcast,
	gallery,
	resources,
	player,
	drawer
});

const middleware = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));

export default store