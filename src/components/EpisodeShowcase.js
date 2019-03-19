import React from 'react';
import PlayerBtn from './Player/PlayerBtn';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

function EpisodeShowcase({data}) {
	const latestEpisode = data.allMarkdownRemark.edges[0].node;
	const { title, image, description, episodeType, episodeNumber } = latestEpisode.frontmatter;
	const { fluid } = image.childImageSharp;
	const { slug: permalink } = latestEpisode.fields;

	return (
		<div className="episode-showcase">
			<div className="art-width">
				<Img
					fluid={fluid}
					alt={`Artwork for ${title}`} 
					className="cover-art"
				/>
			</div>
			<div className="description">
				<h4>
					<Link to={`${permalink}`}>
						{`${episodeType === 'full' && episodeNumber ? `Episode ${episodeNumber}: ` : ''}${title}`}
					</Link>
				</h4>
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