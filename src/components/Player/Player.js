import '../../css/lz-player.scss'
import React, { PureComponent } from 'react'
import ReactPlayer from 'react-player'
import PlayerIcon from './PlayerIcon'
import { connect } from 'react-redux'

class MainPlayer extends PureComponent {
  render() {
    const {
      buffer,
      playing,
      duration,
      progress,
      discovered,
      queue,
      play,
      played,
      pause,
      previous,
      next,
      updateDuration,
      updateProgress,
      showNav,
      startSeek,
      endSeek,
      updateSeek,
      onBuffer,
      onReady,
      onStart,
    } = this.props

    const noop = () => {}
    const playingFirstTrack = played.length === 0
    const playingLastTrack = queue.length <= 1
    const playedSeconds = progress.playedSeconds || 0
    const remaining = duration ? duration - playedSeconds : 0
    const nowPlaying = queue[0]

    const handleSeekStart = (e) => {
      startSeek()
    }
    const handleSeekChange = (e) => {
      updateSeek(parseFloat(e.target.value))
    }
    const handleSeekEnd = (e) => {
      this.playerRef.seekTo(parseFloat(e.target.value))
      endSeek()
    }

    const getPercentOfAverageTouchClientX = (e) => {
      const { touches, target } = e
      let sum = 0
      for (let i = 0; i < touches.length; i++) {
        const { clientX } = touches[i]
        sum += clientX
      }
      const averageX = sum / touches.length
      const percent = averageX / target.clientWidth
      return percent
    }

    const handleTouchStart = (e) => {
      startSeek()
      updateSeek(parseFloat(getPercentOfAverageTouchClientX(e)))
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      updateSeek(parseFloat(getPercentOfAverageTouchClientX(e)))
    }

    const handleTouchEnd = handleSeekEnd

    return (
      <div>
        <div
          className={[
            'player',
            !discovered ? 'player-hidden' : 'player-visible',
            playing ? 'playing' : '',
            showNav ? 'nav-is-showing' : 'nav-is-not-showing',
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
                    playingFirstTrack ? 'disabled-btn' : '',
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
                    playingLastTrack ? 'disabled-btn' : '',
                  ].join(' ')}
                >
                  <PlayerIcon type="next" />
                </button>
              </div>
            </div>
            <div className="player-now-playing">
              <div className="title-text">
                <span>
                  {nowPlaying
                    ? `${
                        nowPlaying.episodeType === 'full' &&
                        nowPlaying.episodeNumber
                          ? `Episode ${nowPlaying.episodeNumber}: `
                          : ''
                      }${nowPlaying.title}`
                    : ''}
                </span>
              </div>
            </div>
            <div className="player-time">
              <span>
                -{Math.floor(remaining / 60)}m:{Math.ceil(remaining % 60)}s
              </span>
            </div>
          </div>
          <div
            className={['player-seekbar', buffer ? 'buffering' : ''].join(' ')}
          >
            <div
              className="seekbar-loaded"
              style={{ width: progress.loaded * 100 + '%' }}
            ></div>
            <div
              className="seekbar-played"
              style={{ width: progress.played * 100 + '%' }}
            ></div>
          </div>
          <div className="seek-input">
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={progress.played}
              onMouseDown={handleSeekStart}
              onTouchStart={handleTouchStart}
              onChange={handleSeekChange}
              onTouchMove={handleTouchMove}
              onMouseUp={handleSeekEnd}
              onTouchEnd={handleTouchEnd}
              aria-label="Seek"
            />
          </div>
        </div>
        <ReactPlayer
          ref={(player) => {
            this.playerRef = player
          }}
          url={discovered ? nowPlaying.url : ''}
          playing={playing}
          onReady={onReady}
          onStart={onStart}
          onPlay={play}
          onPause={pause}
          onBuffer={onBuffer}
          onEnded={next}
          onError={(e) => console.log('onError', e)}
          onProgress={updateProgress}
          onDuration={updateDuration}
          width={0}
          height={0}
        />
      </div>
    )
  }
}

MainPlayer.defaultProps = {
  queue: [{ title: '', url: '' }],
}

const mapStateToProps = ({ player, nav }) => ({
  ...player,
  showNav: nav.showNav,
})
const mapDispatchToProps = (dispatch) => ({
  onBuffer: () => dispatch({ type: 'BUFFER' }),
  play: (e) => dispatch({ type: 'PLAY' }),
  pause: () => dispatch({ type: 'PAUSE' }),
  previous: () => dispatch({ type: 'PREVIOUS' }),
  next: () => dispatch({ type: 'NEXT' }),
  updateDuration: (duration) => dispatch({ type: 'UPDATE_DURATION', duration }),
  updateProgress: (progress) => dispatch({ type: 'UPDATE_PROGRESS', progress }),
  startSeek: () => dispatch({ type: 'START_SEEK' }),
  endSeek: () => dispatch({ type: 'END_SEEK' }),
  updateSeek: (played) => dispatch({ type: 'UPDATE_SEEK', played }),
  onReady: () => dispatch({ type: 'READY' }),
  onStart: () => dispatch({ type: 'START' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPlayer)
