const defaultState = {
	showNav: false
};

const nav = (state = defaultState, action) => {
	switch(action.type) {
		case 'HIDE_NAV':
			return {showNav: false};
		case 'TOGGLE_NAV':
			return {showNav: !state.showNav};
		default:
			return state;
	}
};

export default nav