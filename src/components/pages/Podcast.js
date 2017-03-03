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
			<div>
				<SoundCloudEmbed trackId={data[0].trackId} />
			</div>
			<PodcastPage {...Paginate(data, location)} />
		</div>
	);
}

const mapStateToProps = ({podcast}) => ({
	data: podcast
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Podcast)