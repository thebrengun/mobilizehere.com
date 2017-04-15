import data from '../providers/podcast.provider.js'

const podcast = (state = data, action) => {
	switch(action.type) {
		default:
			return state;
	}
};

export default podcast