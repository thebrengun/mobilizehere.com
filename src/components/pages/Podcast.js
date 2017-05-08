import React from 'react'
import Helmet from 'react-helmet'
import EpisodeShowcase from '../EpisodeShowcase'
import PodcastPage from './PodcastPage'
import { connect } from 'react-redux'
import { removeTagsFromString } from '../../providers/podcast.provider'
import Paginate from '../Paginate'

function Podcast({data, player, location, route}) {
	return (
		<div>
			<Helmet title={route.title}>
				<meta property="og:title" content={route.title} />
				<meta property="og:description" content={removeTagsFromString(data[0].__content)} />
				<meta property="og:audio" content={data[0].url} />
				<meta property="og:image" content={data[0].image} />
				<meta property="og:url" content={'https://www.mobilizehere.com/' + route.path} />
				<meta name="twitter:card" content={data[0].image} />
			</Helmet>
			<h2>Podcast</h2>
			<h3>Newest Episode</h3>
			<div>
				<EpisodeShowcase 
					episode={data[0]} 
				/>
			</div>
			<h3>Episodes</h3>
			<PodcastPage {...Paginate(data.slice(1), location)} />
		</div>
	);
}

const mapStateToProps = ({podcast}) => ({
	data: podcast.episodes
});

export default connect(mapStateToProps, {})(Podcast)