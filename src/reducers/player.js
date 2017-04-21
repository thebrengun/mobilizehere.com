import data from '../providers/podcast.provider'

const defaultState = {
	discovered: true,
	playing: true,
	progress: {playedSeconds: 0, played: 0, loaded: 0, loadedSeconds: 0},
	seeking: false,
	duration: null,
	queue: data.episodes.concat(data.extras).sort(({date: dateA}, {date: dateB}) => new Date(dateB).getTime() - new Date(dateA).getTime()),
	played: []
};

const player = (state = defaultState, action) => {
	switch(action.type) {
		case 'UPDATE_PROGRESS':
			if(!state.seeking) {
				return {...state, progress: action.progress};
			} else {
				return {...state};
			}
		case 'START_SEEK':
			return {...state, seeking: true};
		case 'END_SEEK':
			return {...state, seeking: false};
		case 'UPDATE_SEEK':
			return {...state, progress: {...state.progress, played: action.played}};
		case 'UPDATE_DURATION':
			return {
				...state, duration: action.duration
			};
		case 'NEXT': 
			return {
				...state, 
				playing: true,
				played: state.queue.slice(0, 1).concat(state.played),
				queue: state.queue.slice(1)
			};
		case 'PREVIOUS': 
			return {
				...state, 
				queue: state.played.slice(0, 1).concat(state.queue),
				played: state.played.slice(1)
			};
		case 'PAUSE':
			return {...state, playing: false};
		case 'PLAY':
			return {...state, playing: true};
		case 'PLAY_NOW':
			return {
				...state, 
				discovered: true,
				playing: true,
				queue: [action.episode].concat(state.queue.filter(removeFromQueue(action.episode)))
			};
		case 'PLAY_NEXT':
			return {
				...state, 
				queue: state.queue.slice(0, 1).concat([action.episode]).concat(state.queue.slice(1).filter(removeFromQueue(action.episode)))
			};
		case 'PLAY_LATER':
			return {
				...state, 
				queue: state.queue.filter(removeFromQueue(action.episode)).concat([action.episode])
			};
		default:
			return state;
	}
};

function removeFromQueue({url}) {
	return ({url: episodeUrl}) => (url !== episodeUrl);
}

export default player