import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout.js';
import PodcastDetailPageComponent from '../components/pages/PodcastDetailPage.js';

class PodcastTemplate extends React.PureComponent {
	render() {
		const { data,path } = this.props;
		const slug = data.markdownRemark.fields.slug;
		const episode = data.markdownRemark.frontmatter;

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
			frontmatter {
				legacyURL
				title
				image
				description
				date
				url
				length
				duration
				explicit
			}
		}
	}
`;

export default PodcastTemplate;