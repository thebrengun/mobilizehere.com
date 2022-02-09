import React from 'react'

function Paragraphs({ paragraphs }) {
  return (
    <div>
      {paragraphs.map((text, paragraphIndex) => (
        <p key={'paragraph-' + paragraphIndex}>{text}</p>
      ))}
    </div>
  )
}

export default Paragraphs
