import React from 'react'
import Helmet from 'react-helmet'
import EpisodeShowcase from '../EpisodeShowcase'
import PodcastPage from './PodcastPage'
import { connect } from 'react-redux'
import Paginate from '../Paginate'

function Podcast({data, player, location, route}) {
	return (
		<div>
			<Helmet title={route.title} />
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