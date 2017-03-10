import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import Paragraphs from '../Paragraphs'
import aboutStyles from '../../css/about.scss'
import mobilizeLogoBig from '../../assets/images/about/mobilize-logo-big.jpg'

function About({aboutText, credits, route}) {
	return (
		<div>
			<Helmet title={route.title} />
			<h2 className="mobilize-heading">About</h2>
			<div className="about-container">
				<img src={mobilizeLogoBig} className="about-img" alt="Mobilize Logo" />
				<Paragraphs paragraphs={aboutText} />
			</div>
			<h3>Credits</h3>
			<div className="credits">
				{credits.map(
					name => <span>{name}</span>
				)}
			</div>
		</div>
	);
}

export default connect(({about}) => ({...about}))(About)