const defaultState = {
	showNav: false,
	subNavs: {
		subscribe: {
			name: 'Subscribe',
			show: false, 
			menu: [
				{text: 'iTunes', href: 'https://itunes.apple.com/us/podcast/mobilize/id1229280265'},
				{text: 'Google Play', href: 'https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&isi=691797987&ius=googleplaymusic&link=https://play.google.com/music/m/I3jcwhqyumtfgwz3kbwrm7upwlm?t%3DMobilize%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16'},
				{text: 'Stitcher', href: 'http://www.stitcher.com/podcast/mobilize'},
				{text: 'RSS', href: 'https://www.mobilizehere.com/podcast.rss'}
			]
		}
	}
};

const nav = (state = defaultState, action) => {
	switch(action.type) {
		case 'HIDE_NAV':
			return {...state, showNav: false, subNavs: hideAll(state.subNavs)};
		case 'TOGGLE_NAV':
			return {...state, showNav: !state.showNav, subNavs: hideAll(state.subNavs)};
		case 'TOGGLE_SUB_NAV':
			return {
				...state, 
				subNavs: {
					...state.subNavs, 
					[action.name]: {
						...state.subNavs[action.name], 
						show: !state.subNavs[action.name].show
					}
				}
			};
		case 'CLOSE_ALL_SUB_NAVS':
			return {...state, subNavs: hideAll(state.subNavs)};
		default:
			return state;
	}
};

function hideAll(subNavs) {
	return Object.keys(subNavs).reduce((next, key) => ({...next, [key]: {...subNavs[key], show: false}}), {});
}

export default nav