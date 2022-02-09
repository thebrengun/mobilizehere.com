import '../../css/lz-grid.scss'
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout.js'
import { StaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

class TakeAction extends React.PureComponent {
  render() {
    const { data, path } = this.props
    const resources = data.allMarkdownRemark.edges.map(
      ({ node }) => node.frontmatter
    )

    return (
      <Layout path={path}>
        <Helmet title={'Take Action'} />
        <h2>Take Action</h2>
        <div className="lz-grid lz-grid-wrap">
          {resources.map(({ title, color, image, url }, i) => (
            <div className="lz-col" key={`${title}-${i}`}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <GatsbyImage
                  image={image.childImageSharp.gatsbyImageData}
                  alt={url}
                  className="img-responsive cover-art"
                  backgroundColor={color}
                />
              </a>
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

function StaticTakeAction() {
  const query = graphql`
    query Resources {
      allMarkdownRemark(
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/src/data/resources/" } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              color
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 350
                    placeholder: TRACED_SVG
                    layout: CONSTRAINED
                  )
                }
              }
              url
            }
          }
        }
      }
    }
  `
  return (
    <StaticQuery query={query} render={(data) => <TakeAction data={data} />} />
  )
}

export default StaticTakeAction
