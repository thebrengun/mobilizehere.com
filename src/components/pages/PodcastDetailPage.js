import React from 'react'
import Helmet from 'react-helmet'
import PlayerBtn from '../Player/PlayerBtn'

import '../../css/podcast-detail-page.scss'

function PodcastDetailPageComponent({route}) {
	const { title, image, date, isEpisode, length, trackId, url, duration, explicit, __content } = route.data;
	return (
		<div>
			<Helmet title={title} />
			<h2>{title}</h2>
			<div className="pd-description-and-art">
				<div className="pd-art">
					<img src={image} alt={`Cover Art for ${title}`} className="img-responsive" />
				</div>
				<div className="pd-description">
					<div dangerouslySetInnerHTML={{__html: __content}}></div>
					<PlayerBtn episode={route.data} />
				</div>
			</div>
		</div>
	);
}

export default PodcastDetailPageComponent