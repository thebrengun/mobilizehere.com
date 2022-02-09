const defaultState = {
  activeDrawerOnPage: -1,
}

const drawer = (state = defaultState, action) => {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return { ...state, activeDrawerOnPage: action.index }
    case 'CLOSE_DRAWER':
      return { ...state, activeDrawerOnPage: -1 }
    default:
      return state
  }
}

export default drawer
