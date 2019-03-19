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

export const query = graphql`
	query PodcastEpisodeById($id: String!) {
		markdownRemark(id: { eq: $id }) {
			fields {
				slug
			}
			html
			frontmatter {
				legacyURL
				title
				image {
					childImageSharp {
						fluid(maxWidth: 600) {
							src
							srcSet
							sizes
							aspectRatio
							tracedSVG
						}
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