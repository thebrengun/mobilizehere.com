import '../../css/lz-player.scss'

import fwdIconSm from '../../assets/player/ic_forward_10_black_24dp_1x.png'
import fwdIcon from '../../assets/player/ic_forward_10_black_24dp_2x.png'
import pauseIconSm from '../../assets/player/ic_pause_black_24dp_1x.png'
import pauseIcon from '../../assets/player/ic_pause_black_24dp_2x.png'
import playIconSm from '../../assets/player/ic_play_arrow_black_24dp_1x.png'
import playIcon from '../../assets/player/ic_play_arrow_black_24dp_2x.png'
import repIconSm from '../../assets/player/ic_replay_10_black_24dp_1x.png'
import repIcon from '../../assets/player/ic_replay_10_black_24dp_2x.png'
import nextIconSm from '../../assets/player/ic_skip_next_black_24dp_1x.png'
import nextIcon from '../../assets/player/ic_skip_next_black_24dp_2x.png'
import prevIconSm from '../../assets/player/ic_skip_previous_black_24dp_1x.png'
import prevIcon from '../../assets/player/ic_skip_previous_black_24dp_2x.png'

import React from 'react'
import ReactPlayer from 'react-player'

import {connect} from 'react-redux'

function MainPlayer({playing, duration, progress, discovered, queue, play, played, pause, previous, next, updateDuration, updateProgress, startSeek, endSeek, updateSeek}) {
	let playerRef;
	const disabled = {disabled: 'disabled'};
	const noop = () => {};
	const playingFirstTrack = played.length === 0;
	const playingLastTrack = queue.length <= 1;
	const playedSeconds = progress.playedSeconds || 0;
	const remaining = duration ? duration - playedSeconds : 0;
	return (
		<div className={['player', !discovered ? 'hidden' : ''].join(' ')}>
			<div className="lz-container player-main">
				<div className="player-art">
					<img 
						src={queue[0].image} 
						alt={'Cover Art for ' + queue[0].title} 
						className="img-responsive"
					/>
				</div>
				<div 
					className={[
						'player-info',
						playing ? 'playing' : ''
					].join(' ')}
				>
					<div className="now-playing">
						<div className="playing-title">
							{queue[0].title}
						</div>
						<div className="seek-bar">
							<div className="seek-wrap">
								<input 
									type="range" 
									min={0} 
									max={1} 
									step="any" 
									value={progress.played}
									onMouseDown={startSeek}
	              					onChange={(e) => updateSeek(parseFloat(e.target.value))}
	              					onMouseUp={(e) => {
	              						playerRef.seekTo(parseFloat(e.target.value));
	              						endSeek();
	              					}}
	              					className="seek-input"
								/>
								<div 
									className={[
										'seek-color', 
										playing ? 'playing' : ''
									].join(' ')} 
									style={{
										width: progress.played * 100 + '%'
									}}
								>
								</div>
							</div>
							<div className="time">
								{playing ? '-' : ''}{Math.floor(remaining / 60)}m:{Math.ceil(remaining % 60)}s
							</div>
						</div>
					</div>
					<div className="player-controls">
						<button 
							onClick={playingFirstTrack ? noop : previous}
							className={[
								'ctrl-btn',
								playingFirstTrack ? 'disabled-btn' : ''
							].join(' ')}
						>
							<img src={prevIconSm} />
						</button>
						<button 
							onClick={playing ? pause : play}
							className="ctrl-btn"
						>
							<img 
								src={
									playing ? 
										pauseIconSm : 
										playIconSm
								}
							/>
						</button>
						<button 
							onClick={playingLastTrack ? noop : next}
							className={[
								'ctrl-btn',
								playingLastTrack ? 'disabled-btn' : ''
							].join(' ')}
						>
							<img src={nextIconSm} />
						</button>
					</div>
				</div>
			</div>
			<ReactPlayer 
				ref={player => {playerRef = player}}
				url={queue[0].url || null} 
				playing={false} 
				hidden={true} 
				controls={false} 
				onProgress={updateProgress}
				onReady={() => console.log('onReady')}
				onStart={() => console.log('onStart')}
				onPlay={play}
				onDuration={updateDuration} 
				onPause={pause}
				onBuffer={() => console.log('onBuffer')}
				onEnded={next} 
				onError={e => console.log('onError', e)}
			/>
		</div>
	);
}

const mapStateToProps = ({player}) => ({...player});
const mapDispatchToProps = (dispatch) => ({
	play: () => dispatch({type: 'PLAY'}),
	pause: () => dispatch({type: 'PAUSE'}),
	previous: () => dispatch({type: 'PREVIOUS'}),
	next: () => dispatch({type: 'NEXT'}),
	updateDuration: (duration) => dispatch({type: 'UPDATE_DURATION', duration}),
	updateProgress: (progress) => dispatch({type: 'UPDATE_PROGRESS', progress}),
	startSeek: () => dispatch({type: 'START_SEEK'}),
	endSeek: () => dispatch({type: 'END_SEEK'}),
	updateSeek: (played) => dispatch({type: 'UPDATE_SEEK', played})
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPlayer)