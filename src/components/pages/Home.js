import React from 'react'
import Helmet from 'react-helmet'
import Paragraphs from '../Paragraphs'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import SoundCloudEmbed from '../SoundCloudEmbed'

import takeAction from '../../assets/images/index/take-action-graphic.png'

function Home({route, featuredEpisode, aboutText}) {
	return (
		<div>
			<Helmet title={route.title} />
			<div className="lz-dbl-padding">
				<SoundCloudEmbed trackId={featuredEpisode.trackId} />
			</div>
			<div className="lz-dbl-padding">
				<Link to={'/take-action/'}>
					<img src={takeAction} className="img-responsive" alt="Take Action" />
				</Link>
			</div>
			<h2>About Mobilize</h2>
			<Paragraphs paragraphs={aboutText} />
		</div>
	);
}

const mapStateToProps = ({podcast, about}) => ({
	featuredEpisode: podcast.episodes[0],
	aboutText: about.aboutText
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home)