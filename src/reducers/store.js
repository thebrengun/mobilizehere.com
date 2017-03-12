import { combineReducers, createStore } from 'redux'
import nav from './nav'
import scroll from './scroll'
import about from './about'
import podcast from './podcast'
import gallery from './gallery'
import resources from './resources'

const reducers = combineReducers({
	nav, 
	scroll,
	about,
	podcast,
	gallery,
	resources
});

const store = createStore(reducers);

export default store