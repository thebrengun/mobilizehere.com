import '../../css/lz-player.scss'

import React from 'react'
import ReactPlayer from 'react-player'
import PlayerIcon from './PlayerIcon'

import { connect } from 'react-redux'

function MainPlayer({
	buffer, playing, duration, progress, discovered, queue, play, played, pause, 
	previous, next, updateDuration, updateProgress, showNav, seeking, startSeek, 
	endSeek, updateSeek, onBuffer, onReady, onStart
}) {
	let playerRef;
	const disabled = {disabled: 'disabled'};
	const noop = () => {};
	const playingFirstTrack = played.length === 0;
	const playingLastTrack = queue.length <= 1;
	const playedSeconds = progress.playedSeconds || 0;
	const remaining = duration ? duration - playedSeconds : 0;
	const nowPlaying = queue[0];
	return (
		<div>
		<div 
			className={[
				'player', 
				!discovered ? 'player-hidden' : 'player-visible', 
				playing ? 'playing' : '', 
				showNav ? 'nav-is-showing' : 'nav-is-not-showing'
			].join(' ')}
		>
			<div className="player-info">
				<div className="player-controls">
					<div className="player-button-set">
						<button 
							onClick={playingFirstTrack ? noop : previous}
							aria-label="Next Episode"
							className={[
								'ctrl-btn',
								playingFirstTrack ? 'disabled-btn' : ''
							].join(' ')}
						>
							<PlayerIcon type="previous" />
						</button>
						<button 
							onClick={playing ? pause : play}
							aria-label={playing ? 'Pause' : 'Play'} 
							className="ctrl-btn"
						>
							<PlayerIcon type={playing ? 'pause' : 'play'} />
						</button>
						<button 
							onClick={playingLastTrack ? noop : next}
							aria-label="Previous Episode"
							className={[
								'ctrl-btn',
								playingLastTrack ? 'disabled-btn' : ''
							].join(' ')}
						>
							<PlayerIcon type="next" />
						</button>
					</div>
				</div>
				<div className="player-now-playing">
					<div className="title-text">
						<span>{nowPlaying.title}</span>
					</div>
				</div>
				<div className="player-time">
					<span>
						-{Math.floor(remaining / 60)}m:{Math.ceil(remaining % 60)}s
					</span>
				</div>
			</div>
			<div className={['player-seekbar', buffer ? 'buffering' : ''].join(' ')}>
				<div className="seekbar-loaded" style={{width: progress.loaded * 100 + '%'}}></div>
				<div className="seekbar-played" style={{width: progress.played * 100 + '%'}}></div>
			</div>
			<div className="seek-input">
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
  					aria-label="Seek"
				/>
			</div>
		</div>
		<ReactPlayer 
			ref={player => { playerRef = player }} 
			url={discovered ? nowPlaying.url : ''} 
			playing={playing} 
			onReady={onReady}
			onStart={onStart}
			onPlay={play}
			onPause={pause}
			onBuffer={onBuffer}
			onEnded={next}
			onError={e => console.log('onError', e)}
			onProgress={updateProgress}
			onDuration={updateDuration}
			width={0}
			height={0}
		/>
		</div>
	);
}

const mapStateToProps = ({player, nav}) => ({...player, showNav: nav.showNav});
const mapDispatchToProps = (dispatch) => ({
	onBuffer: () => dispatch({type: 'BUFFER'}),
	play: (e) => dispatch({type: 'PLAY'}),
	pause: () => dispatch({type: 'PAUSE'}),
	previous: () => dispatch({type: 'PREVIOUS'}),
	next: () => dispatch({type: 'NEXT'}),
	updateDuration: (duration) => dispatch({type: 'UPDATE_DURATION', duration}),
	updateProgress: (progress) => dispatch({type: 'UPDATE_PROGRESS', progress}),
	startSeek: () => dispatch({type: 'START_SEEK'}),
	endSeek: () => dispatch({type: 'END_SEEK'}),
	updateSeek: (played) => dispatch({type: 'UPDATE_SEEK', played}),
	onReady: () => dispatch({type: 'READY'}),
	onStart: () => dispatch({type: 'START'})
});


export default connect(mapStateToProps, mapDispatchToProps)(MainPlayer)