const req = require.context('../../site/content/podcast', true, /^\.\/.*\.md$/);

const data = req.keys()
	.map(req)
	.map(addRootToImagePath)
	.sort(sortByDate({ascending: false}))
	.reduce(
		splitEpisodesAndExtras, 
		{episodes: [], extras: []}
	);

function sortByDate({ascending = true}) {

	return ({date: dateA}, {date: dateB}) => ascending ? sort(dateA, dateB) : sort(dateB, dateA);

	function sort(dateA, dateB) {
		const dateAObj = new Date(dateA), dateBObj = new Date(dateB);
		return dateAObj < dateBObj ? -1 : dateAObj > dateBObj ? 1 : 0;
	}
}

function splitEpisodesAndExtras(formatted, podcast) {
	return podcast.isEpisode ? 
		({...formatted, episodes: formatted.episodes.concat([{...podcast, permalink: convertTitleToURL(podcast.title)}])}) : 
		({...formatted, extras: formatted.extras.concat([{...podcast, permalink: convertTitleToURL(podcast.title)}])});
}

function addRootToImagePath(podcast) {
	if(process.env.NODE_ENV !== 'dev') {
		const {image} = podcast;
		return {...podcast, image: 'https://www.mobilizehere.com' + image};
	} else {
		return podcast;
	}
}

function convertTitleToURL(title) {
	const specialChars = /[^((a-z)|(0-9)|(-))]/g;
	const whitespace = /\s/g;
	const multipleDashes = /-{2,}/g;
	const trailingSlash = '/';
	return title.toLowerCase().replace(specialChars, ' ').trim().replace(whitespace, '-').replace(multipleDashes, '-') + trailingSlash;
}

export default data;