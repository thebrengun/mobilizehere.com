import React from 'react'
import ReactDOM from 'react-dom/server'

function Noscript(props) {
  // https://github.com/facebook/react/issues/1252
  // Thanks to:
  // https://github.com/facebook/react/issues/1252#issuecomment-246161590

  const staticMarkup = ReactDOM.renderToStaticMarkup(props.children)

  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />
}

export default Noscript
