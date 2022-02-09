import React from 'react'

class SubMenu extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.listenForClicks = this.listenForClicks.bind(this)
    this.stopListeningForClicks = this.stopListeningForClicks.bind(this)
  }

  componentWillUnmount() {
    this.stopListeningForClicks()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.listenForClicks()
    } else {
      this.stopListeningForClicks()
    }
  }

  listenForClicks() {
    window.addEventListener('click', this.handleClick)
  }

  stopListeningForClicks() {
    window.removeEventListener('click', this.handleClick)
  }

  handleClick(e) {
    this.props.toggle()
  }

  render() {
    return (
      <span className="sub-menu">
        <button
          onClick={(e) => {
            e.stopPropagation()
            this.props.toggle()
            this.btn.blur()
          }}
          ref={(ref) => {
            this.btn = ref
          }}
        >
          {this.props.control}
        </button>
        <span className="ctrl-wrapper">
          <span
            className={[
              'ul-wrapper',
              this.props.show ? 'sub-visible' : 'sub-hidden',
            ].join(' ')}
          >
            <span className="arrow-wrapper">
              <span className="sub-menu-pinch-arrow"></span>
            </span>
            <ul className="sub-menu-menu" onClick={(e) => e.stopPropagation()}>
              {this.props.menu.map(({ text, href }) => (
                <li key={'link-to-' + text}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </span>
        </span>
      </span>
    )
  }
}

export default SubMenu
