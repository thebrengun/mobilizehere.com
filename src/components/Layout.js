import React from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';

import { Link } from 'gatsby';

import '../css/index.scss';

import desktopLogo from '../assets/images/template/mobilize-logo-desktop.png';
import mobileLogo from '../assets/images/template/mobilize-logo-mobile.png';
import largeImage from '../assets/images/about/mobilize-logo-big.jpg'

import {Nav, ToggleNav} from './Nav';

class Layout extends React.PureComponent {
	render() {
		const { children, toggleNav, toggleSubNav, showNav, subNavs, scroll, discovered } = this.props;
		const netlifyLink = <a href="https://www.netlify.com" rel="noopener noreferrer" target="_blank">Netlify</a>;
		const githubLink = <a href="https://github.com/mobilizehere/mobilizehere.com" rel="noopener noreferrer" target="_blank">Source</a>;

		return (
			<div 
				className={[
					'lz-container', 
					showNav || !scroll ? 'lz-container-no-scroll' : '', 
					discovered && !(showNav || !scroll) ? 'player-is-visible' : 'player-is-invisible'
				].join(' ')}
			>
				<Helmet htmlAttributes={{lang: 'en'}}>
					<title>Mobilize</title>
					<meta name="description" content="Mobilize is a podcast that puts a spotlight on and is a resource for people, friends, communities, and activists who have decided to stand up, resist, fight back -- mobilize." />
					<meta property="og:title" content="Mobilize" />
					<meta property="og:description" content="Mobilize is a podcast that puts a spotlight on and is a resource for people, friends, communities, and activists who have decided to stand up, resist, fight back -- mobilize." />
					<meta property="og:image" content={largeImage} />
					<meta property="og:url" content="https://www.mobilizehere.com" />
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@MobilizeHere" />
					<meta name="twitter:title" content="Mobilize Podcast" />
					<meta name="twitter:description" content="Mobilize is a podcast that puts a spotlight on and is a resource for people, friends, communities, and activists who have decided to stand up, resist, fight back -- mobilize." />
					<meta name="twitter:image" content={largeImage} />
				</Helmet>

				<div className="lz-header lz-padding">
					<div className="logo">
						<Link to="/">
							<img src={desktopLogo} className="desktop-logo" alt="Mobilize" />
							<img src={mobileLogo} className="mobile-logo" alt="Mobilize" />
						</Link>
					</div>
					<ToggleNav showNav={showNav} toggleNav={toggleNav} />
				</div>
				<Nav 
					showNav={showNav} 
					toggleNav={toggleNav} 
					subNavs={subNavs} 
					toggleSubNav={toggleSubNav} 
				/>
				{children}
				<div className="lz-footer lz-padding text-center">
					<span>
						2017 - 2019 &copy; Reserved to Mobilize - Hosted with {netlifyLink} - {githubLink}
					</span>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({nav, scroll, player}) => ({
	discovered: player.discovered,
	showNav: nav.showNav, 
	subNavs: nav.subNavs, 
	scroll
});

const mapDispatchToProps = (dispatch) => ({
	toggleNav: () => dispatch({type: 'TOGGLE_NAV'}),
	toggleSubNav: (name) => 
		() => {
			dispatch({type: 'TOGGLE_SUB_NAV', name});
		}
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);