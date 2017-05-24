import React from 'react'

import IndexRoute from 'react-router/lib/IndexRoute'
import Route from 'react-router/lib/Route'
import Redirect from 'react-router/lib/Redirect'

import Template from './Template'
import Home from './pages/Home'
import Podcast from './pages/Podcast'
import TakeAction from './pages/TakeAction'
import Gallery from './pages/Gallery'
import About from './pages/About'

import PodcastDetailPage from './pages/PodcastDetailPage'

import data from '../providers/podcast.provider'

const title = "Mobilize Here";

export const routes = (
	<Route path="/" component={Template} title={title}>
		<Redirect from="index.html" to="/" />
		<IndexRoute component={Home} title={`${title}`} />
		<Route path="podcast/" component={Podcast} title={`${title} - Podcast`}>
			<Redirect from="index.html" to="/podcast/" />
		</Route>
		<Route path="take-action/" component={TakeAction} title={`${title} - Take Action`}>
			<Redirect from="index.html" to="/take-action/" />
		</Route>
		<Route path="gallery/" component={Gallery} title={`${title} - Gallery`}>
			<Redirect from="index.html" to="/gallery/" />
		</Route>
		<Route path="about/" component={About} title={`${title} - About`}>
			<Redirect from="index.html" to="/about/" />
		</Route>
		<Redirect from="contact/index.html" to="contact/" />
		<Redirect from="contact/" to="about/" />
		{data.episodes.map((episode, i) => 
			<Route 
				path={episode.permalink} 
				title={`${title} - ${episode.title}`} 
				component={PodcastDetailPage} 
				data={episode} 
				key={`podcast-episode-${i}`} 
			>
				<Redirect from="index.html" to={`/${episode.permalink}/`} />
			</Route>
		)}
    </Route>
);

export default routes