import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'

const PreviewCompatibleImage = ({ image, ...props }) => {
  if (image && image.gatsbyImageData) {
    return <GatsbyImage image={image.gatsbyImageData} {...props} />
  }

  if (image && typeof image === 'string') {
    return <img src={image} {...props} />
  }

  return null
}

PreviewCompatibleImage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
}

PreviewCompatibleImage.defaultProps = {
  alt: '',
}

export default PreviewCompatibleImage
