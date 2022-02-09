import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout.js'
import PageBtns from '../components/PageBtns.js'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

class GalleryTemplate extends React.PureComponent {
  render() {
    const { pageContext } = this.props
    const { index: pageNumber, pageCount } = pageContext
    const images = pageContext.group.map(({ node }) => node)
    const numPrevImages = images.length * (pageNumber - 1)

    return (
      <Layout>
        <Helmet title={'Gallery'} />
        <h2>Gallery</h2>
        <div className="lz-grid lz-grid-wrap">
          {images.map(({ childImageSharp, id }, i) => {
            const { thumbnails: thumbnail } = childImageSharp
            const imageNum = numPrevImages + (i + 1)
            return (
              <Link
                to={`/gallery/img/${imageNum > 1 ? imageNum : ''}`}
                className="lz-col"
                key={`gallery-image-${id}`}
              >
                <GatsbyImage image={thumbnail} className="cover-art" />
              </Link>
            )
          })}
        </div>
        <PageBtns
          pathPrefix="/gallery/"
          pageNumber={pageNumber}
          pageCount={pageCount}
        />
      </Layout>
    )
  }
}

export default GalleryTemplate
