import pauseIconSm from '../../assets/player/ic_pause_black_24dp_1x.png'
import playIconSm from '../../assets/player/ic_play_arrow_black_24dp_1x.png'
import addIcon from '../../assets/player/ic_playlist_add_black_24dp_1x.png'
import addedIcon from '../../assets/player/ic_playlist_add_check_black_24dp_1x.png'

import React from 'react'
import  { connect } from 'react-redux'

function PlayerBtn({episode, nowPlaying, queue, playing, discovered, playNow, playNext, resume, pause, playLater}) {
	const isPaused = !playing && nowPlaying.url === episode.url;
	const isPlaying = playing && nowPlaying.url === episode.url;
	const notPlaying = !playing && nowPlaying.url !== episode.url || playing && nowPlaying.url !== episode.url;

	const PlayImg = <img src={playIconSm} />;
	const PauseImg = <img src={pauseIconSm} />;
	const PlayBtn = <button onClick={(e) => playNow(episode)}>{PlayImg} <span>Play</span></button>
	const PlayNowBtn = <button onClick={(e) => playNow(episode)}>{PlayImg}<span>Play Now</span></button>;
	const PauseBtn = <button onClick={pause}>{PauseImg}<span>Pause</span></button>;
	const ResumeBtn = <button onClick={resume}>{PlayImg}<span>Resume</span></button>;

	// Not Discovered: "Play", Not Playing: "Play Now", Is Playing: "Pause" Is Paused: "Resume"
	const PrimaryBtn = !discovered ? PlayBtn : notPlaying ? PlayNowBtn : isPlaying ? PauseBtn : ResumeBtn;

	return (
		<div>
			{PrimaryBtn}
			{discovered && notPlaying ? 
				<span>
					<button onClick={(e) => playNext(episode)}>
						<img src={(queue[0] && (queue[0].url === episode.url)) ? addedIcon : addIcon} />
					</button>
				</span> : ''
			}
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