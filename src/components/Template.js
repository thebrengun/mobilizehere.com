import React from 'react'
import { connect } from 'react-redux'

import Helmet from 'react-helmet'

import IndexLink from 'react-router/lib/IndexLink'
import Link from 'react-router/lib/Link'
import withRouter from 'react-router/lib/withRouter'

import styles from '../css/index.scss'

import desktopLogo from '../assets/images/template/mobilize-logo-desktop.png'
import mobileLogo from '../assets/images/template/mobilize-logo-mobile.png'

import MainPlayer from './Player/Player'

import {Nav, ToggleNav} from './Nav'

import appleIcon57 from '../assets/icons/apple-icon-57x57.png'
import appleIcon60 from '../assets/icons/apple-icon-60x60.png'
import appleIcon72 from '../assets/icons/apple-icon-72x72.png'
import appleIcon76 from '../assets/icons/apple-icon-76x76.png'
import appleIcon114 from '../assets/icons/apple-icon-114x114.png'
import appleIcon120 from '../assets/icons/apple-icon-120x120.png'
import appleIcon144 from '../assets/icons/apple-icon-144x144.png'
import appleIcon152 from '../assets/icons/apple-icon-152x152.png'
import appleIcon180 from '../assets/icons/apple-icon-180x180.png'
import androidIcon192 from '../assets/icons/android-icon-192x192.png'
import favicon32 from '../assets/icons/favicon-32x32.png'
import favicon96 from '../assets/icons/favicon-96x96.png'
import favicon16 from '../assets/icons/favicon-16x16.png'
import msIcon144 from '../assets/icons/ms-icon-144x144.png'
import largeImage from '../assets/images/about/mobilize-logo-big.jpg'

class Template extends React.Component {
	constructor() {
		super();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.location.pathname !== this.props.location.pathname) {
			this.props.hideNav();
			this.props.closeDrawer();
		}

		if(parseInt(nextProps.location.query.view, 10) > -1) {
			this.props.disableScroll();
		} else {
			this.props.enableScroll();
		}
	}

	render() {
		const { children, toggleNav, showNav, scroll, discovered, route } = this.props;
		return (
			<div 
				className={[
					'lz-container', 
					showNav || !scroll ? 'lz-container-no-scroll' : '', 
					discovered && !(showNav || !scroll) ? 'player-is-visible' : 'player-is-invisible'
				].join(' ')}
			>
				<Helmet>
					<title>{route.title}</title>
					<meta property="og:title" content={route.title} />
					<meta property="og:description" content="Mobilize is a podcast that puts a spotlight on and is a resource for people, friends, communities, and activists who have decided to stand up, resist, fight back -- mobilize." />
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
				<Nav showNav={showNav} toggleNav={toggleNav} />
				{children}
				<div className="lz-footer lz-padding text-center">
					<span>2017 &copy; Reserved to Mobilize - Hosted with <a href="https://www.netlify.com" target="_blank" rel="noopener">Netlify</a> - <a href="https://github.com/mobilizehere/mobilizehere.com" target="_blank" rel="noopener">Source</a></span>
				</div>
				<MainPlayer />
			</div>
		);
	}
}

const mapStateToProps = ({nav, scroll, player}) => ({showNav: nav.showNav, scroll, discovered: player.discovered});
const mapDispatchToProps = (dispatch) => ({
	toggleNav: () => dispatch({type: 'TOGGLE_NAV'}),
	hideNav: () => dispatch({type: 'HIDE_NAV'}),
	disableScroll: () => dispatch({type: 'NO_SCROLL'}),
	enableScroll: () => dispatch({type: 'SCROLL'}),
	closeDrawer: () => dispatch({type: 'CLOSE_DRAWER'})
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Template))