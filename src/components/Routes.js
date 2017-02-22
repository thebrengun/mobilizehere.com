import React from 'react'

import { IndexRoute, Route } from 'react-router'

import Template from './Template'
import Home from './pages/Home'

import Podcast from './pages/Podcast'
import PodcastPage from './pages/PodcastPage'

import Resources from './pages/Resources'
import ResourcesPage from './pages/ResourcesPage'

import Gallery from './pages/Gallery'
import GalleryPage from './pages/GalleryPage'

import TakeAction from './pages/TakeAction'
import About from './pages/About'
import Contact from './pages/Contact'

export const routes = (
	<Route path="/" component={Template}>
		<IndexRoute component={Home} />
		<Route path="podcast/" component={Podcast} />
		<Route path="resources/" component={Resources} />
		<Route path="gallery/" component={Gallery} />
		<Route path="take-action/" component={Resources} />
		<Route path="about/" component={About} />
		<Route path="contact/" component={Contact} />
    </Route>
);

export default routes