import React from 'react'
import Helmet from 'react-helmet'
import AboutText from '../AboutText'
import mobilizeLogoBig from '../../assets/images/about/mobilize-logo-big.jpg'

function About({about, route}) {
	return (
		<div>
			<Helmet title={route.title} />
			<h2 className="mobilize-heading">About</h2>
			<div className="about-container">
				<img src={mobilizeLogoBig} className="about-img" alt="Mobilize Logo" />
				<AboutText />
			</div>
		</div>
	);
}

export default About