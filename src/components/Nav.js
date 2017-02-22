import React from 'react'
import { Link, IndexLink } from 'react-router'
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

function Nav({showNav}) {
	return (
		<div className={['lz-padding', 'lz-nav', !showNav ? 'hide-nav' : ''].join(' ')}>
			<nav>
				<IndexLink to="/" activeClassName="nav-active">Home</IndexLink>
				<NavLink to="/podcast/">Podcast</NavLink>
				<NavLink to="/take-action/">Take Action</NavLink>
				<NavLink to="/resources/">Resources</NavLink>
				<NavLink to="/gallery/">Gallery</NavLink>
				<NavLink to="/about/">About</NavLink>
				<NavLink to="/contact/">Contact</NavLink>
			</nav>
		</div>
	);
}

export { ToggleNav, Nav }