import React from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';

import { Link } from 'gatsby';

import '../css/index.scss';

import desktopLogo from '../assets/images/template/mobilize-logo-desktop.png';
import mobileLogo from '../assets/images/template/mobilize-logo-mobile.png';
import largeImage from '../assets/images/about/mobilize-logo-big.jpg'
import appleIcon57 from '../assets/icons/apple-icon-57x57.png';
import appleIcon60 from '../assets/icons/apple-icon-60x60.png';
import appleIcon72 from '../assets/icons/apple-icon-72x72.png';
import appleIcon76 from '../assets/icons/apple-icon-76x76.png';
import appleIcon114 from '../assets/icons/apple-icon-114x114.png';
import appleIcon120 from '../assets/icons/apple-icon-120x120.png';
import appleIcon144 from '../assets/icons/apple-icon-144x144.png';
import appleIcon152 from '../assets/icons/apple-icon-152x152.png';
import appleIcon180 from '../assets/icons/apple-icon-180x180.png';
import androidIcon192 from '../assets/icons/android-icon-192x192.png';
import favicon32 from '../assets/icons/favicon-32x32.png';
import favicon96 from '../assets/icons/favicon-96x96.png';
import favicon16 from '../assets/icons/favicon-16x16.png';
import msIcon144 from '../assets/icons/ms-icon-144x144.png';
import splash from '../assets/icons/splash.png';

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
					<link rel="apple-touch-icon" sizes="57x57" href={appleIcon57} />
					<link rel="apple-touch-icon" sizes="60x60" href={appleIcon60} />
					<link rel="apple-touch-icon" sizes="72x72" href={appleIcon72} />
					<link rel="apple-touch-icon" sizes="76x76" href={appleIcon76} />
					<link rel="apple-touch-icon" sizes="114x114" href={appleIcon114} />
					<link rel="apple-touch-icon" sizes="120x120" href={appleIcon120} />
					<link rel="apple-touch-icon" sizes="144x144" href={appleIcon144} />
					<link rel="apple-touch-icon" sizes="152x152" href={appleIcon152} />
					<link rel="apple-touch-icon" sizes="180x180" href={appleIcon180} />
					<link rel="icon" type="image/png" sizes="192x192"  href={androidIcon192} />
					<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
					<link rel="icon" type="image/png" sizes="96x96" href={favicon96} />
					<link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
					<link rel="icon" type="image/png" sizes="512x512" href={splash} />

					<meta name="msapplication-TileColor" content="#2096c3" />
					<meta name="msapplication-TileImage" content={msIcon144} />
					<meta name="theme-color" content="#2096c3" />
					<meta property="og:title" content="Mobilize" />
					<meta property="og:description" content="Mobilize is a podcast that puts a spotlight on and is a 
					resource for people, friends, communities, and activists who have decided to stand up, resist, 
					fight back -- mobilize." />
					<meta property="og:image" content={largeImage} />
					<meta property="og:url" content="https://www.mobilizehere.com" />
					<meta name="twitter:card" content={largeImage} />
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