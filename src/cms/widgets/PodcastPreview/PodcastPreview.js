import React from 'react';
import { Provider } from 'react-redux';
import showdown from 'showdown';
import store from '../../../reducers/store.js';
import PodcastDetailPage from '../../../components/pages/PodcastDetailPage.js';
import MainPlayer from '../../../components/Player/Player.js';

class PodcastPreview extends React.PureComponent {
	constructor() {
		super();
		this.converter = new showdown.Converter();
	}

	render() {
		const { makeHtml } = this.converter;
		const { entry, getAsset } = this.props;
		
		const data = {
			id: entry.getIn(['data', 'id']),
			title: entry.getIn(['data', 'title']),
			image: getAsset(entry.getIn(['data', 'image'])).value,
			description: entry.getIn(['data', 'description']),
			date: entry.getIn(['data', 'date']),
			episodeType: entry.getIn(['data', 'episodeType']),
			episodeNumber: entry.getIn(['data', 'episodeNumber']),
			length: entry.getIn(['data', 'length']),
			url: entry.getIn(['data', 'url']),
			duration: entry.getIn(['data', 'duration']),
			explicit: entry.getIn(['data', 'explicit']),
			__content: makeHtml.call(this.converter, entry.getIn(['data', 'body']))
		};

		return (
			<Provider store={store}>
				<div className="lz-container player-is-visible">
					<PodcastDetailPage episode={data} />
					<MainPlayer />
				</div>
			</Provider>
		);
	}
}

export default PodcastPreview;

// - {label: "Title", name: "title", widget: "string"}
// - {label: "Artwork", name: "image", widget: "image", default: "/assets/mobilize_logo.jpg"}
// - {label: "Description", name: "description", widget: "string"}
// - {label: "Publish Date", name: "date", widget: "datetime"}
// - {label: "Is Episode", name: "isEpisode", widget: "isEpisode", default: true, required: false}
// - {label: "Media URL", name: "url", widget: "string"}
// - {label: "File Size (in bytes)", name: "length", widget: "number"}
// - {label: "Duration (mm:ss)", name: "duration", widget: "string"}
// - {label: "Explicit (yes/no)", name: "explicit", widget: "string", default: "no"}
// - {label: "SoundCloud Track ID", name: "trackId", widget: "string"}
// - {label: "Body", name: "body", widget: "markdown"}