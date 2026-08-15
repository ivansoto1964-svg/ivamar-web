const fs = require('fs');
const path = require('path');
const { CATEGORIES, editorialCategory } = require('../utils/pb-editorial');

const SEED_POSTS_DIR = path.join(__dirname, '../../data/pb-blog/posts');
const DATA_DIR = process.env.PB_BLOG_DATA_DIR || '/data/pb-blog';
const POSTS_DIR = path.join(DATA_DIR, 'posts');
const MEDIA_DIR = path.join(DATA_DIR, 'media');

function ensureDirectory(directory) {
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
}

function initialize() {
  ensureDirectory(SEED_POSTS_DIR);
  try {
    ensureDirectory(POSTS_DIR);
    ensureDirectory(MEDIA_DIR);
  } catch (error) {
    console.error('[PBBlog] Persistent storage is unavailable:', error.message);
    return;
  }

  for (const file of fs.readdirSync(SEED_POSTS_DIR).filter(name => name.endsWith('.json'))) {
    const destination = path.join(POSTS_DIR, file);
    if (!fs.existsSync(destination)) fs.copyFileSync(path.join(SEED_POSTS_DIR, file), destination);
  }
}

function activePostsDirectory() {
  return fs.existsSync(POSTS_DIR) ? POSTS_DIR : SEED_POSTS_DIR;
}

function slugify(value = '') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 120);
}

function validSlug(value = '') {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (_) { return null; }
}

function normalizePost(post) {
  return {
    ...post,
    status: post.status || 'published',
    category: CATEGORIES.includes(post.category) && post.category !== 'Lo más reciente'
      ? post.category
      : editorialCategory(post.title, [post.category, ...(post.tags || [])])
  };
}

function loadPosts({ includeDrafts = false } = {}) {
  try {
    return fs.readdirSync(activePostsDirectory())
      .filter(file => file.endsWith('.json'))
      .map(file => readJson(path.join(activePostsDirectory(), file)))
      .filter(Boolean)
      .map(normalizePost)
      .filter(post => includeDrafts || post.status === 'published')
      .sort((a, b) => new Date(b.dateISO || b.updatedISO || 0) - new Date(a.dateISO || a.updatedISO || 0));
  } catch (_) { return []; }
}

function readPost(slug, { includeDrafts = false } = {}) {
  if (!validSlug(slug)) return null;
  const post = readJson(path.join(activePostsDirectory(), `${slug}.json`));
  if (!post) return null;
  const normalized = normalizePost(post);
  return includeDrafts || normalized.status === 'published' ? normalized : null;
}

function writePost(post, originalSlug = '') {
  initialize();
  if (!validSlug(post.slug)) throw new Error('Slug inválido.');
  const directory = activePostsDirectory();
  const destination = path.join(directory, `${post.slug}.json`);
  const temporary = `${destination}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(post, null, 2), 'utf8');
  fs.renameSync(temporary, destination);
  if (originalSlug && originalSlug !== post.slug && validSlug(originalSlug)) {
    const previous = path.join(directory, `${originalSlug}.json`);
    if (fs.existsSync(previous)) fs.unlinkSync(previous);
  }
  return post;
}

function deletePost(slug) {
  if (!validSlug(slug)) return false;
  const file = path.join(activePostsDirectory(), `${slug}.json`);
  if (!fs.existsSync(file)) return false;
  fs.unlinkSync(file);
  return true;
}

function saveImageData(dataUrl, slug) {
  initialize();
  const match = String(dataUrl || '').match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/);
  if (!match) throw new Error('La imagen debe ser JPG, PNG o WebP.');
  const buffer = Buffer.from(match[2], 'base64');
  if (!buffer.length || buffer.length > 5 * 1024 * 1024) throw new Error('La imagen no puede superar 5 MB.');
  const signatures = {
    jpeg:buffer.length>3 && buffer[0]===0xff && buffer[1]===0xd8 && buffer[2]===0xff,
    png:buffer.length>8 && buffer.subarray(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])),
    webp:buffer.length>12 && buffer.subarray(0,4).toString()==='RIFF' && buffer.subarray(8,12).toString()==='WEBP'
  };
  if (!signatures[match[1]]) throw new Error('El archivo no corresponde a una imagen válida.');
  const extension = match[1] === 'jpeg' ? 'jpg' : match[1];
  const filename = `${slug}-${Date.now()}.${extension}`;
  fs.writeFileSync(path.join(MEDIA_DIR, filename), buffer);
  return `/media/pb-blog/${filename}`;
}

initialize();

module.exports = {
  POSTS_DIR,
  MEDIA_DIR,
  SEED_POSTS_DIR,
  slugify,
  loadPosts,
  readPost,
  writePost,
  deletePost,
  saveImageData
};
