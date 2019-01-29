import React from 'react';
import Layout from '../components/Layout.js';
import PageBtns from '../components/PageBtns.js';
import { Link } from 'gatsby';

class GalleryImageTemplate extends React.PureComponent {
	render() {
		const { pageContext } = this.props;
		const { index: pageNumber, pageCount } = pageContext;
		const image = pageContext.group.map(({ node }) => node)[0];
		const { src } = image.childImageSharp.fullsize;

		return (
			<Layout>				
				<div className="photo-step">
					<div className="photo-step-links">
						{pageNumber - 1 > 0 ? <Link to={`/gallery/img/${(pageNumber - 1) > 1 ? pageNumber - 1 : ''}`} className="photo-step-link">Prev</Link> : <span></span>}
						{pageNumber + 1 <= pageCount ? <Link to={`/gallery/img/${pageNumber + 1}`} className="photo-step-link">Next</Link> : <span></span>}
					</div>
					<img src={src} className="img-responsive gallery-fullsize" />
				</div>
				<PageBtns pathPrefix="/gallery/img/" pageNumber={pageNumber} pageCount={pageCount} />
			</Layout>
		);
	}
}

export default GalleryImageTemplate;