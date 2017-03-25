import React from 'react'
import Link from 'react-router/lib/Link'
import IndexLink from 'react-router/lib/IndexLink'
import { connect } from 'react-redux'
import closeNav from '../assets/images/template/nav-close.jpg'

function ToggleNav({showNav, toggleNav}) {
	return (
		<div className="hamburger hide-desktop" onClick={toggleNav}>
			{showNav ? 
				<div>
					<img src={closeNav} className="img-responsive" alt="Hide Navigation" />
				</div>
				: 
				<div>
					<div className="hamburger-line"></div>
					<div className="hamburger-line"></div>
					<div className="hamburger-line"></div>
				</div>
			}
		</div>
	);
}

function NavLink({children, to}) {
	return <Link to={to} activeClassName="nav-active">{children}</Link>
}

function Nav({showNav, toggleNav}) {
	return (
		<div className={['lz-padding', 'lz-nav', !showNav ? 'hide-nav' : ''].join(' ')}>
			<div className="nav-column">
				<nav>
					<IndexLink to="/" activeClassName="nav-active">Home</IndexLink>
					<NavLink to="/podcast/">Podcast</NavLink>
					<NavLink to="/take-action/">Take Action</NavLink>
					<NavLink to="/gallery/">Gallery</NavLink>
					<NavLink to="/about/">About</NavLink>
					<NavLink to="/contact/">Contact</NavLink>
				</nav>
			</div>
			<div className="hide-desktop nav-modal" onClick={toggleNav}></div>
		</div>
	);
}

export { ToggleNav, Nav }