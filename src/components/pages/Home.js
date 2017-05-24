import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'

import EpisodeShowcase from '../EpisodeShowcase'
import ShareYourStory from '../partials/ShareYourStory'

import takeAction from '../../assets/images/index/take-action-graphic-2.png'
import downloadSheetMusic from '../../assets/images/index/download-sheet-music.png'

function Home({route, featuredEpisode, aboutText}) {
	return (
		<div>
			<Helmet title={route.title} />
			<div className="lz-dbl-padding">
				<EpisodeShowcase episode={featuredEpisode} />
			</div>
			<ShareYourStory />
			<div className="lz-dbl-padding">
				<a href="https://www.mobilizehere.com/assets/Rise-Up-Choir-Sheet-Music-Sibelius.pdf" target="_blank" rel="noopener">
					<img src={downloadSheetMusic} className="img-responsive lz-padding" alt="Download Rise Up Sheet Music" />
				</a>
				<Link to={'/take-action/'}>
					<img src={takeAction} className="img-responsive lz-padding" alt="Take Action" />
				</Link>
			</div>
			<h2>About Mobilize</h2>
			<div dangerouslySetInnerHTML={{__html: aboutText}} />
		</div>
	);
}

const mapStateToProps = ({podcast, about}) => ({
	featuredEpisode: podcast.episodes[0],
	aboutText: about.__content
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home)