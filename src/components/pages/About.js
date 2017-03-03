import React from 'react'
import Helmet from 'react-helmet'
import AboutText from '../AboutText'
import mobilizeLogoBig from '../../assets/images/about/mobilize-logo-big.jpg'

function About({about, route}) {
	return (
		<div className="row">
			<Helmet title={route.title} />
			<div className="col-xs-12 col-sm-6 col-sm-offset-3">
				<h2 className="mobilize-heading">About</h2>
				<img src={mobilizeLogoBig} className="pull-left about-img" alt="Mobilize Logo" />
				<AboutText />
			</div>
		</div>
	);
}

export default About