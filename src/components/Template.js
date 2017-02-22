import React from 'react'
import Helmet from 'react-helmet'
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
			<div>
				<Helmet 
					htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
	                titleTemplate="Mobilize - %s"
	                defaultTitle="Mobilize"
	                titleAttributes={{itemprop: "name", lang: "en"}}
	                //base={{target: "_blank", href: "http://mysite.com/"}}
	                meta={[
	                	{charset: "utf-8"},
	                	{httpEquiv: "x-ua-compatible", content: "ie=edge"},
	                    {name: "description", content: ""},
	                    {name: "viewport", content: "width=device-width,initial-scale=1"}
	                ]}
	                link={[
	                    {rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Montserrat"}
	                    //{rel: "apple-touch-icon", href: "http://mysite.com/img/apple-touch-icon-57x57.png"},
	                    //{rel: "apple-touch-icon", sizes: "72x72", href: "http://mysite.com/img/apple-touch-icon-72x72.png"}
	                ]}
				/>
				<div className="lz-container">
					<div className="lz-padding">
						<Link to="/">
							<img src={desktopLogo} className="logo desktop-logo" />
							<img src={mobileLogo} className="logo mobile-logo" />
						</Link>
						<ToggleNav showNav={showNav} toggleNav={toggleNav} />
					</div>
					<Nav showNav={showNav} />
					{children}
					<div className="lz-footer lz-padding text-center">2017 &copy; Reserved to Mobilize</div>
				</div>
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