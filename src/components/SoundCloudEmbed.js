import React from 'react'

class SoundCloudEmbed extends React.Component {

	constructor() {
		super();
		this.makeUrl = this.makeUrl.bind(this);
	}

	makeUrl(trackId) {
		return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false`;
	}

	render() {
		const { trackId } = this.props;
		return (
			<iframe 
				width="100%" 
				height="166" 
				scrolling="no" 
				frameBorder="no" 
				src={this.makeUrl(trackId)}
			>
			</iframe>
		);
	}
}

SoundCloudEmbed.defaultProps = {
	trackId: '305459487'
};

export default SoundCloudEmbed