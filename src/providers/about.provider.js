import info from '../../site/settings/info.md'

const data = {
	...info,
	credits: info.contributors.split(',').map(name => name.trim())
};

export default data;