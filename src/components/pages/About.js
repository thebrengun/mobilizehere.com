import React from 'react';
import Helmet from 'react-helmet';
import ShareYourStory from '../partials/ShareYourStory';
import { connect } from 'react-redux';
import '../../css/about.scss';
import mobilizeLogoBig from '../../assets/images/about/mobilize-logo-big.jpg';

function About({__content, credits, route}) {
	return (
		<div>
			<Helmet title={route.title}>
				<meta property="og:title" content={route.title} />
				<meta property="og:url" content={'https://www.mobilizehere.com/' + route.path} />
			</Helmet>
			<h2 className="mobilize-heading">About</h2>
			<div className="about-container">
				<img src={mobilizeLogoBig} className="about-img" alt="Mobilize Logo" />
				<div dangerouslySetInnerHTML={{__html: __content}} />
			</div>
			<ShareYourStory />
			<div className="lz-padding">
				<h3>Credits</h3>
				<div className="credits">
					{credits.map(
						(name, i) => <span key={`podcast-contrib-${i}`}>{name}</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default connect(({about}) => ({...about}))(About)