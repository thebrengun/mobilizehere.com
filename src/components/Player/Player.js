import '../../css/lz-player.scss'

import React from 'react'
import ReactPlayer from 'react-player'
import PlayerIcon from './PlayerIcon'

import { connect } from 'react-redux'

function MainPlayer({playing, duration, progress, discovered, queue, play, played, pause, previous, next, updateDuration, updateProgress, showNav, seeking, startSeek, endSeek, updateSeek}) {
	let playerRef;
	const disabled = {disabled: 'disabled'};
	const noop = () => {};
	const playingFirstTrack = played.length === 0;
	const playingLastTrack = queue.length <= 1;
	const playedSeconds = progress.playedSeconds || 0;
	const remaining = duration ? duration - playedSeconds : 0;
	const nowPlaying = queue[0];
	const iconFill = playing ? '#f59446' : '#4d4d4d';
	return (
		<div className={['player', !discovered ? 'player-hidden' : 'player-visible', playing ? 'playing' : '', showNav ? 'nav-is-showing' : 'nav-is-not-showing'].join(' ')}>
			<div className="player-info">
				<div className="player-controls">
					<div className="player-button-set">
						<button 
							onClick={playingFirstTrack ? noop : previous}
							className={[
								'ctrl-btn',
								playingFirstTrack ? 'disabled-btn' : ''
							].join(' ')}
						>
							<PlayerIcon type="previous" fill={iconFill} />
						</button>
						<button 
							onClick={playing ? pause : play}
							className="ctrl-btn"
						>
							<PlayerIcon type={playing ? 'pause' : 'play'} fill={iconFill} />
						</button>
						<button 
							onClick={playingLastTrack ? noop : next}
							className={[
								'ctrl-btn',
								playingLastTrack ? 'disabled-btn' : ''
							].join(' ')}
						>
							<PlayerIcon type="next" fill={iconFill} />
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
			<div className="player-seekbar">
				<div 
					className="seekbar-played" 
					style={{
						width: progress.played * 100 + '%'
					}}
				>
				</div>
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
				/>
			</div>
			<ReactPlayer 
				ref={player => { playerRef = player }} 
				url={nowPlaying.url} 
				playing={playing} 
				onReady={() => console.log('onReady')}
				onStart={() => console.log('onStart')}
				// onPlay={() => this.setState({ playing: true })}
				// onPause={() => this.setState({ playing: false })}
				onBuffer={() => console.log('onBuffer')}
				onEnded={next}
				onError={e => console.log('onError', e)}
				onProgress={updateProgress}
				onDuration={updateDuration}
				width={0}
				height={0}
			/>
		</div>
	);
	// return (
	// 	<div className={['player', !discovered ? 'hidden' : ''].join(' ')}>
	// 		<div className="top">
	// 			<div className="top-left">
	// 				<div className="player-controls">
	// 					<button 
	// 						onClick={playingFirstTrack ? noop : previous}
	// 						className={[
	// 							'ctrl-btn',
	// 							playingFirstTrack ? 'disabled-btn' : ''
	// 						].join(' ')}
	// 					>
	// 						<img src={arrowBtnLeft} />
	// 					</button>
	// 					<button 
	// 						onClick={playing ? pause : play}
	// 						className="ctrl-btn"
	// 					>
	// 						<img 
	// 							src={
	// 								playing ? 
	// 									pauseBtn : 
	// 									playBtn
	// 							}
	// 						/>
	// 					</button>
	// 					<button 
	// 						onClick={playingLastTrack ? noop : next}
	// 						className={[
	// 							'ctrl-btn',
	// 							playingLastTrack ? 'disabled-btn' : ''
	// 						].join(' ')}
	// 					>
	// 						<img src={arrowBtnRight} />
	// 					</button>
	// 				</div>
	// 			</div>
	// 			<div className="lz-container player-main">
	// 				<div className="playing-title">
	// 					{queue[0].title}
	// 				</div>
	// 			</div>
	// 			<div className="top-right">
	// 				<div className="time">
	// 					{playing ? '-' : ''}{Math.floor(remaining / 60)}m:{Math.ceil(remaining % 60)}s
	// 				</div>
	// 			</div>
	// 		</div>
	// 		<div className="seek-bar">
	// 			<div className="seek-wrap">
	// 				<input 
	// 					type="range" 
	// 					min={0} 
	// 					max={1} 
	// 					step="any" 
	// 					value={progress.played}
	// 					onMouseDown={startSeek}
	//   					onChange={(e) => updateSeek(parseFloat(e.target.value))}
	//   					onMouseUp={(e) => {
	//   						playerRef.seekTo(parseFloat(e.target.value));
	//   						endSeek();
	//   					}}
	//   					className="seek-input"
	// 				/>
	// 				<div 
	// 					className={[
	// 						'seek-color', 
	// 						playing ? 'playing' : ''
	// 					].join(' ')} 
	// 					style={{
	// 						width: progress.played * 100 + '%'
	// 					}}
	// 				>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
}

const mapStateToProps = ({player, nav}) => ({...player, showNav: nav.showNav});
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