import React from 'react'

import { IndexRoute, Route } from 'react-router'

import Template from './Template'
import Home from './pages/Home'
import Podcast from './pages/Podcast'
import TakeAction from './pages/TakeAction'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'

const title = "Mobilize Here";

export const routes = (
	<Route path="/" component={Template}>
		<IndexRoute component={Home} title={`${title}`} />
		<Route path="podcast/" component={Podcast} title={`${title} - Podcast`} />
		<Route path="take-action/" component={TakeAction} title={`${title} - Take Action`} />
		<Route path="gallery/" component={Gallery} title={`${title} - Gallery`} />
		<Route path="about/" component={About} title={`${title} - About`} />
		<Route path="contact/" component={Contact} title={`${title} - Contact`} />
    </Route>
);

export default routes