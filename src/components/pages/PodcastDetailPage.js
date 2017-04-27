import React from 'react'
import Helmet from 'react-helmet'
import SoundCloudEmbed from '../SoundCloudEmbed'

import '../../css/podcast-detail-page.scss'

function PodcastDetailPageComponent({route}) {
	const { title, image, date, isEpisode, length, trackId, url, duration, explicit, __content } = route.data;
	return (
		<div>
			<Helmet title={title} />
			<h2>{title}</h2>
			<div className="pd-description-and-art">
				<div dangerouslySetInnerHTML={{__html: __content}}></div>
				<div className="pd-art">
					<img src={image} alt={`Cover Art for ${title}`} className="img-responsive" />
				</div>
			</div>
			<div>
				<SoundCloudEmbed trackId={trackId} />
			</div>
		</div>
	);
}

export default PodcastDetailPageComponent