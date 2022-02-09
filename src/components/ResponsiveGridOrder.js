import React from 'react'

class ResponsiveGridOrder extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      row: this.calculateRow(props.activeItem),
      col: this.calculateCol(props.activeItem),
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.activeItem !== this.props.activeItem &&
      nextProps.activeItem > -1
    ) {
      this.setState({
        row: this.calculateRow(nextProps.activeItem),
        col: this.calculateCol(nextProps.activeItem),
      })
    }
  }

  calculateRow = (play) => {
    const { breakSmall } = this.props
    if (play > -1) {
      const columns = window.innerWidth >= breakSmall ? 4 : 2
      return Math.ceil((play + 1) / columns)
    } else {
      return 1
    }
  }

  calculateCol = (play) => {
    const { breakSmall } = this.props
    if (play > -1) {
      const columns = window.innerWidth >= breakSmall ? 4 : 2
      const col = (play + 1) % columns
      return col === 0 ? columns - 1 : col - 1
    } else {
      return 1
    }
  }

  render() {
    return null
  }
}

ResponsiveGridOrder.defaultProps = {
  breakSmall: 750,
  activeItem: -1,
}

export default ResponsiveGridOrder
