import React from 'react'
import Helmet from 'react-helmet'
import SoundCloudEmbed from '../SoundCloudEmbed'
import PodcastPage from './PodcastPage'
import { connect } from 'react-redux'
import Paginate from '../Paginate'

function Podcast({data, location, route}) {
	return (
		<div>
			<Helmet title={route.title} />
			<h2>Podcast</h2>
			<h3>Featured Episode</h3>
			<div>
				<SoundCloudEmbed trackId={data[0].trackId} />
			</div>
			<h3>Episodes</h3>
			<PodcastPage {...Paginate(data, location)} />
		</div>
	);
}

const mapStateToProps = ({podcast}) => ({
	data: podcast.episodes
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Podcast)