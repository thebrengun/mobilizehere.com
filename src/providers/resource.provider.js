const req = require.context('../../site/content/resource', true, /^\.\/.*\.md$/);
const data = req.keys().map(req).map(addRootToImagePath);

function addRootToImagePath(podcast) {
	if(process.env.NODE_ENV !== 'dev') {
		const {image} = podcast;
		return {...podcast, image: 'https://www.mobilizehere.com' + image};
	} else {
		return podcast;
	}
}

export default data;