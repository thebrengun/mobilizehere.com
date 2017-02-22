import React from 'react'
import AboutText from '../AboutText'
import { Link } from 'react-router'

import SoundCloudEmbed from '../SoundCloudEmbed'

import takeAction from '../../assets/images/index/take-action-graphic.jpg'

function Home() {
	return (
		<div>
			<div className="lz-dbl-padding">
				<SoundCloudEmbed />
			</div>
			<div className="lz-dbl-padding">
				<Link to={'/take-action/'}>
					<img src={takeAction} className="img-responsive" />
				</Link>
			</div>
			<h2>About Mobilize</h2>
			<AboutText />
		</div>
	);
}

export default Home