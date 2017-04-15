import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import aboutStyles from '../../css/about.scss'
import mobilizeLogoBig from '../../assets/images/about/mobilize-logo-big.jpg'

function About({__content, credits, route}) {
	return (
		<div>
			<Helmet title={route.title} />
			<h2 className="mobilize-heading">About</h2>
			<div className="about-container">
				<img src={mobilizeLogoBig} className="about-img" alt="Mobilize Logo" />
				<div dangerouslySetInnerHTML={{__html: __content}} />
			</div>
			<h3>Credits</h3>
			<div className="credits">
				{credits.map(
					(name, i) => <span key={`podcast-contrib-${i}`}>{name}</span>
				)}
			</div>
		</div>
	);
}

export default connect(({about}) => ({...about}))(About)