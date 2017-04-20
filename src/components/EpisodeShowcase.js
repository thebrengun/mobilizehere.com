import React from 'react'
import PlayerBtn from './Player/PlayerBtn'

function EpisodeShowcase({episode}) {
	const {title, image, __content} = episode;
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
				<h4>{title}</h4>
				<div 
					dangerouslySetInnerHTML={{
						__html: __content
					}} 
				/>
				<PlayerBtn episode={episode} />
			</div>
		</div>
	);
}

export default EpisodeShowcase