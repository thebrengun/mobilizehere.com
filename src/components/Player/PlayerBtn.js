import addIcon from '../../assets/player/ic_playlist_add_black_24dp_1x.png'
import addedIcon from '../../assets/player/ic_playlist_add_check_black_24dp_1x.png'

import React from 'react'
import PlayerIcon from './PlayerIcon'
import  { connect } from 'react-redux'

function PlayerBtn({episode, nowPlaying, queue, playing, discovered, playNow, playNext, resume, pause, playLater}) {
	const isPaused = !playing && nowPlaying.url === episode.url;
	const isPlaying = playing && nowPlaying.url === episode.url;
	const notPlaying = !playing && nowPlaying.url !== episode.url || playing && nowPlaying.url !== episode.url;

	const PlayBtn = (
		<button 
			onClick={(e) => playNow(episode)} 
			aria-label={'Play ' + episode.title} 
			className="podcast-display-btn"
		>
			<PlayerIcon type="playInCircle" />
		</button>
	);
	const PlayNowBtn = PlayBtn;
	const PauseBtn = (
		<button 
			onClick={pause} 
			aria-label={'Pause ' + episode.title} 
			className="podcast-display-btn"
		>
			<PlayerIcon type="pauseInCircle" />
		</button>
	);
	const ResumeBtn = (
		<button 
			onClick={resume} 
			aria-label={'Resume ' + episode.title} 
			className="podcast-display-btn"
		>
			<PlayerIcon type="playInCircle" />
		</button>
	);

	// Not Discovered: "Play", Not Playing: "Play Now", Is Playing: "Pause" Is Paused: "Resume"
	const PrimaryBtn = !discovered ? PlayBtn : notPlaying ? PlayNowBtn : isPlaying ? PauseBtn : ResumeBtn;

	return (
		<div>
			{PrimaryBtn}
		</div>
	);
}

const mapStateToProps = ({player}) => ({
	nowPlaying: player.queue[0],
	queue: player.queue.slice(1),
	playing: player.playing,
	discovered: player.discovered
});

const mapDispatchToProps = (dispatch) => ({
	playNow: (episode) => dispatch({type: 'PLAY_NOW', episode}),
	playNext: (episode) => dispatch({type: 'PLAY_NEXT', episode}),
	playLater: (episode) => dispatch({type: 'PLAY_LATER', episode}),
	pause: () => dispatch({type: 'PAUSE'}),
	resume: () => dispatch({type: 'PLAY'})

});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBtn)