import React from 'react';
import Helmet from 'react-helmet';
import PlayerBtn from '../Player/PlayerBtn';
import Img from 'gatsby-image';
import PreviewCompatibleImage from '../PreviewCompatibleImage.js';

import '../../css/podcast-detail-page.scss'

function PodcastDetailPageComponent({episode}) {
	const { title, image, description, date, episodeType, episodeNumber, url, __content, slug } = episode;
	const d = new Date(date);
	const dateStr = `${d.toDateString()}`;
	return (
		<div className="podcast-detail-page">
			<Helmet title={title}>
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:audio" content={url} />
				<meta property="og:image" content={image} />
				<meta property="og:url" content={'https://www.mobilizehere.com' + slug} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@MobilizeHere" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={image} />
			</Helmet>
			<h2>{`${episodeType === 'full' && episodeNumber ? `Episode ${episodeNumber}: ` : ''}${title}`}</h2>
			<PreviewCompatibleImage 
				image={image} 
				alt={`Cover Art for ${title}`} 
				className="pd-art pull-right" 
			/>
			<h3 className="pd-date">{dateStr}</h3>
			<p>{description}</p>
			<PlayerBtn 
				episode={episode} 
				renderStatusText={({statusText}) => <span className="podcast-display-btn-text">{statusText}</span>} 
				className="podcast-display-btn-color" 
			/>
			<div className="podcast-detail-body" dangerouslySetInnerHTML={{__html: __content}} />
		</div>
	);
}

export default PodcastDetailPageComponent