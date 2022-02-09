import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import Layout from '../components/Layout.js'
import StaticEpisodeShowcase from '../components/StaticEpisodeShowcase.js'
import ShareYourStory from '../components/partials/ShareYourStory.js'
import downloadSheetMusic from '../assets/images/index/download-sheet-music.png'
import takeAction from '../assets/images/index/take-action-graphic-2.png'
import '../css/index.scss'

class IndexPage extends React.Component {
  render() {
    const { path, data } = this.props
    const { html } = data.allMarkdownRemark.edges.map(({ node }) => node)[0]
    return (
      <Layout path={path}>
        <div className="lz-dbl-padding">
          <StaticEpisodeShowcase />
        </div>
        <ShareYourStory />
        <div className="lz-dbl-padding">
          <a
            href="https://www.mobilizehere.com/assets/Rise-Up-Choir-Sheet-Music-Sibelius.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={downloadSheetMusic}
              className="img-responsive lz-padding"
              alt="Download Rise Up Sheet Music"
            />
          </a>
          <Link to={'/take-action/'}>
            <img
              src={takeAction}
              className="img-responsive lz-padding"
              alt="Take Action"
            />
          </Link>
        </div>
        <h2>About Mobilize</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    )
  }
}

function StaticIndex() {
  const query = graphql`
    query AboutDescription {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/data/info/" } }
      ) {
        edges {
          node {
            html
          }
        }
      }
    }
  `
  return (
    <StaticQuery query={query} render={(data) => <IndexPage data={data} />} />
  )
}

export default StaticIndex
