import React from 'react'
import Helmet from 'react-helmet'
import PlayerBtn from '../Player/PlayerBtn'

import '../../css/podcast-detail-page.scss'

function PodcastDetailPageComponent({route}) {
	const { title, image, description, date, isEpisode, length, trackId, url, duration, explicit, __content } = route.data;
	const d = new Date(date);
	const dateStr = `${d.toDateString()}`;
	return (
		<div className="podcast-detail-page">
			<Helmet title={route.title}>
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:audio" content={url} />
				<meta property="og:image" content={image} />
				<meta property="og:url" content={'https://www.mobilizehere.com/' + route.path} />
				<meta name="twitter:card" content={image} />
			</Helmet>
			<h2>{title}</h2>			
			<img src={image} alt={`Cover Art for ${title}`} className="img-responsive pd-art pull-right" />
			<span className="pd-date">{dateStr}</span>
			<p>{description}</p>
			<PlayerBtn 
				episode={route.data} 
				renderStatusText={({statusText}) => <span className="podcast-display-btn-text">{statusText}</span>} 
				className="podcast-display-btn-color" 
			/>
			<div dangerouslySetInnerHTML={{__html: __content}} />
		</div>
	);
}

export default PodcastDetailPageComponent