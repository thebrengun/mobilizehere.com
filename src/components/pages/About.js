import React from 'react'
import Helmet from 'react-helmet'
import AboutText from '../AboutText'
import aboutStyles from '../../css/about.scss'
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
			<h3>Credits</h3>
			<div className="credits">
				{[
					"Luke Allen",
					"Matt Bockelman",
					"Zoe Brock",
					"Jiyoon Cha",
					"Cory Choy",
					"Justin Frankel",
					"Lily Hamburger",
					"Brian Herman",
					"Thomas Johnson",
					"Alexander Juhan",
					"Kyle Kaglund",
					"Jason Katz",
					"Donny Kim",
					"Charlotte Littlehales",
					"Nick Long",
					"Brennan McVicar",
					"Kristin Mink",
					"Betsy Nagler",
					"Claudio Santos",
					"Aaron Schillinger",
					"Jon Selby",
					"Eric Shansby",
					"Fletcher Wolfe",
					"Rachel Yood"
				].map(
					name => <span>{name}</span>
				)}
			</div>
		</div>
	);
}

export default About