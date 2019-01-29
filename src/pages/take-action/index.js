import '../../css/lz-grid.scss';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout.js';
import { StaticQuery, graphql } from 'gatsby';

class TakeAction extends React.PureComponent {
	render() {
		const { data, path } = this.props;
		const resources = data.allMarkdownRemark.edges.map(({ node }) => node.frontmatter);

		return (
			<Layout path={path}>
				<Helmet title={"Take Action"} />
				<h2>Take Action</h2>
				<div className="lz-grid lz-grid-wrap">
					{resources.map(
						({title, color, image, url}, i) => 
							<div 
								className="lz-col" 
								style={{background: color}} 
								key={`${title}-${i}`}
							>
								<a href={url} target="_blank" rel="noopener noreferrer">
									<img src={image} className="img-responsive" alt={url} />
								</a>
							</div>
					)}
				</div>
			</Layout>
		);
	}
}

function StaticTakeAction() {
	const query = graphql`
		query Resources {
			allMarkdownRemark(limit: 1000, filter: {fileAbsolutePath: {regex: "\/src\/data\/resources\/"}}) {
				edges {
					node {
						id
						frontmatter {
							title
							color
							image
							url
						}
					}
				}
			}
		}
	`;
	return (
		<StaticQuery 
			query={query} 
			render={(data) => <TakeAction data={data} />} 
		/>
	);
}

export default StaticTakeAction;