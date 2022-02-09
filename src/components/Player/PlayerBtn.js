import React, { PureComponent } from 'react'
import PlayerIcon from './PlayerIcon'
import { connect } from 'react-redux'

const PLAY_BTN = 'PLAY_BTN'
const PLAY_NOW_BTN = 'PLAY_NOW_BTN'
const PAUSE_BTN = 'PAUSE_BTN'
const RESUME_BTN = 'RESUME_BTN'

class PlayerBtn extends PureComponent {
  chooseBtnType = () => {
    const { discovered, nowPlaying, episode, playing } = this.props
    const nowPlayingUrl = nowPlaying && nowPlaying.url ? nowPlaying.url : ''
    const isPlaying = playing && nowPlayingUrl === episode.url
    const notPlaying =
      (!playing && nowPlayingUrl !== episode.url) ||
      (playing && nowPlayingUrl !== episode.url)
    // Not Discovered: "Play", Not Playing: "Play Now", Is Playing: "Pause" Is Paused: "Resume"
    const buttonType = !discovered
      ? PLAY_BTN
      : notPlaying
      ? PLAY_NOW_BTN
      : isPlaying
      ? PAUSE_BTN
      : RESUME_BTN
    return buttonType
  }

  render() {
    const {
      children,
      className,
      episode,
      resume,
      pause,
      renderStatusText,
      playNow,
    } = this.props

    switch (this.chooseBtnType()) {
      case PAUSE_BTN:
        return (
          <PauseBtn
            {...{ pause, episode, className, renderStatusText, children }}
          />
        )
      case RESUME_BTN:
        return (
          <ResumeBtn
            {...{ resume, episode, className, renderStatusText, children }}
          />
        )
      case PLAY_BTN:
      case PLAY_NOW_BTN:
      default:
        return (
          <PlayBtn
            {...{ playNow, episode, className, renderStatusText, children }}
          />
        )
    }
  }
}

PlayerBtn.defaultProps = { className: 'podcast-display-btn' }

class PlayBtn extends PureComponent {
  render() {
    const { episode, className, renderStatusText, children, playNow } =
      this.props
    return (
      <button
        onClick={(e) => playNow(episode)}
        aria-label={'Play ' + episode.title}
        className={className}
      >
        <PlayerIcon type="playInCircle" />
        {renderStatusText &&
          renderStatusText({ statusText: 'Play Episode', children: children })}
      </button>
    )
  }
}

class PauseBtn extends PureComponent {
  render() {
    const { pause, episode, className, renderStatusText, children } = this.props
    return (
      <button
        onClick={pause}
        aria-label={'Pause ' + episode.title}
        className={className}
      >
        <PlayerIcon type="pauseInCircle" />
        {renderStatusText &&
          renderStatusText({ statusText: 'Pause Episode', children: children })}
      </button>
    )
  }
}

class ResumeBtn extends PureComponent {
  render() {
    const { resume, episode, className, renderStatusText, children } =
      this.props
    return (
      <button
        onClick={resume}
        aria-label={'Resume ' + episode.title}
        className={className}
      >
        <PlayerIcon type="playInCircle" />
        {renderStatusText &&
          renderStatusText({
            statusText: 'Resume Episode',
            children: children,
          })}
      </button>
    )
  }
}

const mapStateToProps = ({ player }) => ({
  nowPlaying: player.queue[0],
  playing: player.playing,
  discovered: player.discovered,
})

const mapDispatchToProps = (dispatch) => ({
  playNow: (episode) => dispatch({ type: 'PLAY_NOW', episode }),
  playNext: (episode) => dispatch({ type: 'PLAY_NEXT', episode }),
  playLater: (episode) => dispatch({ type: 'PLAY_LATER', episode }),
  pause: () => dispatch({ type: 'PAUSE' }),
  resume: () => dispatch({ type: 'PLAY' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBtn)
