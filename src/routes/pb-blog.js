const express = require("express");
const router = express.Router();
const fs = require("fs");
const pbBlogIndex = require("../views/pb-blog/index");
const pbBlogPost = require("../views/pb-blog/post");
const { CATEGORIES, categorySlug } = require("../utils/pb-editorial");
const blogStore = require("../services/pb-blog-store");
const POSTS_PER_PAGE = 9;
const COMMENTS_FILE = "/data/pb-comments/approved.json";

function loadCommentsForPost(slug) {
  try {
    return JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf8")).filter(c => c.articleSlug === slug && c.section === "blog").sort((a,b) => new Date(b.approvedAt) - new Date(a.approvedAt));
  } catch (_) { return []; }
}

const loadPosts = () => blogStore.loadPosts();

function visibleCategories(posts) { return CATEGORIES.filter(c => posts.some(p => p.category === c)); }

router.get("/", (req, res) => {
  const posts = loadPosts();
  const page = parseInt(req.query.page) || 1;
  const cat = req.query.cat || null;
  const filtered = cat ? posts.filter(p => categorySlug(p.category) === cat) : posts;
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page-1)*POSTS_PER_PAGE, page*POSTS_PER_PAGE);
  res.send(pbBlogIndex(paginated, page, totalPages, cat, null, visibleCategories(posts), filtered.length));
});

router.get("/buscar", (req, res) => {
  const q = (req.query.q || "").toLowerCase().trim();
  const posts = loadPosts();
  const filtered = q ? posts.filter(p =>
    (p.title||"").toLowerCase().includes(q) ||
    (p.excerpt||"").toLowerCase().includes(q) ||
    (p.category||"").toLowerCase().includes(q) ||
    (p.tags||[]).some(t => t.toLowerCase().includes(q))
  ) : posts;
  res.send(pbBlogIndex(filtered, 1, 1, null, q, visibleCategories(posts), filtered.length));
});

router.get("/sitemap.xml", (req, res) => {
  const posts = loadPosts();
  const urls = posts.map(p => `<url><loc>https://www.masboricuaqueunmofongo.com/blog/${p.slug}</loc><lastmod>${p.dateISO || new Date().toISOString().split("T")[0]}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("");
  res.set("Content-Type","application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.masboricuaqueunmofongo.com/blog</loc><changefreq>daily</changefreq><priority>0.9</priority></url>${urls}</urlset>`);
});

router.get("/feed.xml", (req, res) => {
  const posts = loadPosts().slice(0,20);
  const items = posts.map(p => `<item><title><![CDATA[${p.title}]]></title><link>https://www.masboricuaqueunmofongo.com/blog/${p.slug}</link><description><![CDATA[${p.excerpt||""}]]></description><pubDate>${new Date(p.dateISO||p.date||Date.now()).toUTCString()}</pubDate><guid>https://www.masboricuaqueunmofongo.com/blog/${p.slug}</guid></item>`).join("");
  res.set("Content-Type","application/rss+xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Los Temas del Balcón — Planeta Boricua</title><link>https://www.masboricuaqueunmofongo.com/blog</link><description>Artículos sobre cultura boricua, identidad y diáspora.</description><language>es-PR</language>${items}</channel></rss>`);
});

router.get("/categoria/:cat", (req, res) => {
  const posts = loadPosts();
  const cat = req.params.cat;
  const filtered = posts.filter(p => categorySlug(p.category) === cat || (cat === "cultura" && p.category === "Cultura e identidad"));
  const page = parseInt(req.query.page) || 1;
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page-1)*POSTS_PER_PAGE, page*POSTS_PER_PAGE);
  res.send(pbBlogIndex(paginated, page, totalPages, cat, null, visibleCategories(posts), filtered.length));
});

router.get("/:slug", (req, res) => {
  try {
    const post = blogStore.readPost(req.params.slug);
    if (!post) return res.status(404).send("Post no encontrado");
    const allPosts = loadPosts();
    const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
    const related = allPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0,3);
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    res.send(pbBlogPost(post, related, prevPost, nextPost, loadCommentsForPost(post.slug), res.locals.pbExploreRecommendations || []));
  } catch(e) {
    res.status(500).send("Error cargando el artículo");
  }
});

module.exports = router;
