import React from 'react'

const styles = {
  preview: {
    background: '#f00',
    color: '#fff',
    padding: '.15em',
    border: 'solid 1px #900',
  },
}

class IsEpisodeControl extends React.Component {
  render() {
    const { value, onChange } = this.props
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="css-1d8xcao"
      />
    )
  }
}

class IsEpisodePreview extends React.Component {
  render() {
    const { value } = this.props
    return (
      <span style={styles.preview}>
        Type: {value ? 'Full Episode' : 'Extra'}
      </span>
    )
  }
}

const isEpisodeConfig = ['isEpisode', IsEpisodeControl, IsEpisodePreview]

export default isEpisodeConfig
