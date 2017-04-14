const req = require.context('../../site/content/resource', true, /^\.\/.*\.md$/);
const data = req.keys().map(req);

export default data;