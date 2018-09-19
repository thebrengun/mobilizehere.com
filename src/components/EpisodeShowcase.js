import React from 'react';
import Link from 'react-router/lib/Link';
import PlayerBtn from './Player/PlayerBtn';

function EpisodeShowcase({episode}) {
	const {title, image, permalink, description} = episode;
	return (
		<div className="episode-showcase">
			<div className="art-width">
				<img 
					src={image} 
					alt={`Artwork for ${title}`} 
					className="img-responsive"
				/>
			</div>
			<div className="description">
				<h4><Link to={`/${permalink}`}>{title}</Link></h4>
				<div>
					<p>{description}</p>
					<PlayerBtn 
						episode={episode} 
						renderStatusText={({statusText}) => <span className="podcast-display-btn-text">{statusText}</span>} 
						className="podcast-display-btn-color" 
					/>
				</div>
			</div>
		</div>
	);
}

export default EpisodeShowcase;