import React from "react";
import PlayerBtn from "./Player/PlayerBtn";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

function EpisodeShowcase({ data }) {
  const latestEpisode = data.allMarkdownRemark.edges[0].node;
  const { title, image, description, episodeType, episodeNumber } =
    latestEpisode.frontmatter;
  const { slug: permalink } = latestEpisode.fields;

  return (
    <div className="episode-showcase">
      <div className="art-width">
        <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={`Artwork for ${title}`} className="cover-art" />
      </div>
      <div className="description">
        <h4>
          <Link to={`${permalink}`}>
            {`${
              episodeType === "full" && episodeNumber
                ? `Episode ${episodeNumber}: `
                : ""
            }${title}`}
          </Link>
        </h4>
        <div>
          <p>{description}</p>
          <PlayerBtn
            episode={{ ...latestEpisode.frontmatter, permalink }}
            renderStatusText={({ statusText }) => (
              <span className="podcast-display-btn-text">{statusText}</span>
            )}
            className="podcast-display-btn-color"
          />
        </div>
      </div>
    </div>
  );
}

export default EpisodeShowcase;
