import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link, withRouter } from 'react-router'

import styles from '../css/index.scss'

import desktopLogo from '../assets/images/template/mobilize-logo-desktop.jpg'
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
	}

	render() {
		const { children, toggleNav, showNav } = this.props;
		return (
			<div className="lz-container">
				<div className="lz-padding">
					<Link to="/">
						<img src={desktopLogo} className="logo desktop-logo" alt="Mobilize" />
						<img src={mobileLogo} className="logo mobile-logo" alt="Mobilize" />
					</Link>
					<ToggleNav showNav={showNav} toggleNav={toggleNav} />
				</div>
				<Nav showNav={showNav} />
				{children}
				<div className="lz-footer lz-padding text-center">2017 &copy; Reserved to Mobilize</div>
			</div>
		);
	}
}

const mapStateToProps = ({nav}) => ({showNav: nav.showNav});
const mapDispatchToProps = (dispatch) => ({
	toggleNav: () => dispatch({type: 'TOGGLE_NAV'}),
	hideNav: () => dispatch({type: 'HIDE_NAV'})
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Template))