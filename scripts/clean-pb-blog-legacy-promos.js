const path = require('path');
const { cleanBlogDirectory } = require('../src/services/pb-legacy-commercial-cleanup');

const postsDir = path.join(__dirname, '..', 'data', 'pb-blog', 'posts');
const backupDir = path.join(__dirname, '..', '.tmp', 'pb-blog-legacy-backup');
const changed = cleanBlogDirectory(postsDir, backupDir);

console.log(`Cleaned legacy commercial blocks from ${changed} El Balcón posts.`);
