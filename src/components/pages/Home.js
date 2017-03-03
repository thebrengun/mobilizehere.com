import React from 'react'
import Helmet from 'react-helmet'
import AboutText from '../AboutText'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import SoundCloudEmbed from '../SoundCloudEmbed'

import takeAction from '../../assets/images/index/take-action-graphic.png'

function Home({route, data}) {
	return (
		<div>
			<Helmet title={route.title} />
			<div className="lz-dbl-padding">
				<SoundCloudEmbed trackId={data[0].trackId} />
			</div>
			<div className="lz-dbl-padding">
				<Link to={'/take-action/'}>
					<img src={takeAction} className="img-responsive" alt="Take Action" />
				</Link>
			</div>
			<h2>About Mobilize</h2>
			<AboutText />
		</div>
	);
}

const mapStateToProps = ({podcast}) => ({
	data: podcast
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home)