import React from 'react'
import { connect } from 'react-redux'

import IndexLink from 'react-router/lib/IndexLink'
import Link from 'react-router/lib/Link'
import withRouter from 'react-router/lib/withRouter'

import styles from '../css/index.scss'

import desktopLogo from '../assets/images/template/mobilize-logo-desktop.png'
import mobileLogo from '../assets/images/template/mobilize-logo-mobile.jpg'

import {Nav, ToggleNav} from './Nav'

class Template extends React.Component {
	constructor() {
		super();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.location.pathname !== this.props.location.pathname) {
			this.props.hideNav();
		}

		if(parseInt(nextProps.location.query.view, 10) > -1) {
			this.props.disableScroll();
		} else {
			this.props.enableScroll();
		}
	}

	render() {
		const { children, toggleNav, showNav, scroll } = this.props;
		return (
			<div className={['lz-container', showNav || !scroll ? 'lz-container-no-scroll' : ''].join(' ')}>
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
				<div className="lz-footer lz-padding text-center">2017 &copy; Reserved to Mobilize</div>
			</div>
		);
	}
}

const mapStateToProps = ({nav, scroll}) => ({showNav: nav.showNav, scroll});
const mapDispatchToProps = (dispatch) => ({
	toggleNav: () => dispatch({type: 'TOGGLE_NAV'}),
	hideNav: () => dispatch({type: 'HIDE_NAV'}),
	disableScroll: () => dispatch({type: 'NO_SCROLL'}),
	enableScroll: () => dispatch({type: 'SCROLL'})
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Template))