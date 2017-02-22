import React from 'react'
import SoundCloudEmbed from '../SoundCloudEmbed'
import PodcastPage from './PodcastPage'
import { connect } from 'react-redux'
import Paginate from '../Paginate'

function Podcast({data, location}) {
	return (
		<div>
			<div>
				<SoundCloudEmbed />
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