const scroll = (state = true, action) => {
  switch (action.type) {
    case 'SCROLL':
      return true
    case 'NO_SCROLL':
      return false
    default:
      return state
  }
}

export default scroll
