import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = (props) => {

  const { image } = props;

  if (!!image && !!image.fluid) {
    return (
      <Img fluid={image.fluid} {...props} />
    )
  }

  if (!!image && typeof image === 'string')
    return <img src={image} {...props} />

  return null
}

PreviewCompatibleImage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired
}

PreviewCompatibleImage.defaultProps = {
  alt: ''
};

export default PreviewCompatibleImage