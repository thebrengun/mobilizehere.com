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
			<div>
				<noscript>
					<div style={{margin: '5%', textAlign: 'center'}}>
						<strong style={{color: '#646464'}}>You need to enable JavaScript to use the SoundCloud player.</strong>
						<div>
							<a href="http://www.enable-javascript.com/" target="_blank"><button>Show Me How</button></a>
						</div>
					</div>
				</noscript>
				<iframe 
					width="100%" 
					height="166" 
					scrolling="no" 
					frameBorder="no" 
					src={this.makeUrl(trackId)}
				>
				</iframe>
			</div>
		);
	}
}

SoundCloudEmbed.defaultProps = {
	trackId: '305459487'
};

export default SoundCloudEmbed