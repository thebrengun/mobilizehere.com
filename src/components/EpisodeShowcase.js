import React from 'react';
import PlayerBtn from './Player/PlayerBtn';
import { Link } from 'gatsby';

function EpisodeShowcase({data}) {
	const latestEpisode = data.allMarkdownRemark.edges[0].node;
	const { title, image, description } = latestEpisode.frontmatter;
	const { slug: permalink } = latestEpisode.fields;

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
						episode={{...latestEpisode.frontmatter, permalink}} 
						renderStatusText={({statusText}) => <span className="podcast-display-btn-text">{statusText}</span>} 
						className="podcast-display-btn-color" 
					/>
				</div>
			</div>
		</div>
	);
}

export default EpisodeShowcase;