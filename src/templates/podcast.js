import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout.js';
import PodcastDetailPageComponent from '../components/pages/PodcastDetailPage.js';

class PodcastTemplate extends React.PureComponent {
	render() {
		const { data,path } = this.props;
		const { slug } = data.markdownRemark.fields;
		const { frontmatter, html: __content } = data.markdownRemark;
		const episode = {...frontmatter, __content };

		return (
			<Layout path={path}>
				<PodcastDetailPageComponent episode={{...episode, slug}} />
			</Layout>
		);
	}
}

export const query = graphql`query PodcastEpisodeById($id: String!) {
  markdownRemark(id: {eq: $id}) {
    fields {
      slug
    }
    html
    frontmatter {
      legacyURL
      title
      image {
        default: childImageSharp {
          gatsbyImageData(placeholder: TRACED_SVG, layout: FULL_WIDTH)
        }
        og: childImageSharp {
          gatsbyImageData(
            width: 630,
            aspectRatio: 1,
            formats: [ PNG ],
            transformOptions: {
              cropFocus: CENTER
            }
          )
        }
      }
      description
      date
      episodeType
      episodeNumber
      url
      length
      duration
      explicit
    }
  }
}
`;

export default PodcastTemplate;