import React from 'react'
import Link from 'react-router/lib/Link'
import IndexLink from 'react-router/lib/IndexLink'
import SubMenu from './SubMenu'
import { connect } from 'react-redux'
import closeNav from '../assets/images/template/nav-close.jpg'

function ToggleNav({showNav, toggleNav}) {
	return (
		<div className="hamburger hide-desktop">
			{showNav ? 
				<button aria-label="close menu" onClick={toggleNav}>
					<img src={closeNav} alt="Hide Navigation" />
				</button>
				: 
				<button aria-label="menu" onClick={toggleNav}>
					<div className="hamburger-line"></div>
					<div className="hamburger-line"></div>
					<div className="hamburger-line"></div>
				</button>
			}
		</div>
	);
}

function NavLinkDumb({children, to, closeAllSubNavs}) {
	return <Link to={to} activeClassName="nav-active" onFocus={closeAllSubNavs}>{children}</Link>
}

const NavLink = connect(
	(state) => ({}), 
	(dispatch) => ({
		closeAllSubNavs: () => dispatch({type: 'CLOSE_ALL_SUB_NAVS'})
	})
)(NavLinkDumb);

function Nav({showNav, toggleNav, subNavs, toggleSubNav}) {
	return (
		<div className={['lz-padding', 'lz-nav', !showNav ? 'hide-nav' : ''].join(' ')}>
			<div className="nav-column">
				<nav>
					<SubMenu 
						control={subNavs.subscribe.name} 
						menu={subNavs.subscribe.menu} 
						show={subNavs.subscribe.show} 
						toggle={toggleSubNav('subscribe')}
					/>
					<NavLink to="/podcast/">Podcast</NavLink>
					<NavLink to="/take-action/">Take Action</NavLink>
					<NavLink to="/gallery/">Gallery</NavLink>
					<NavLink to="/about/">About</NavLink>
				</nav>
			</div>
			<div className="hide-desktop nav-modal" onClick={toggleNav}></div>
		</div>
	);
}

export { ToggleNav, Nav }