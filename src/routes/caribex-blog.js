const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "../../data/caribex-blog/posts");
const POSTS_PER_PAGE = 9;

function loadPosts() {
  try {
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".json"));
    return files.map(f => {
      try { return JSON.parse(fs.readFileSync(path.join(POSTS_DIR, f), "utf8")); }
      catch(e) { return null; }
    }).filter(Boolean).sort((a, b) => new Date(b.dateISO || b.date || 0) - new Date(a.dateISO || a.date || 0));
  } catch(e) { return []; }
}

function norm(s) {
  return (s||"").toLowerCase().replace(/ /g,"-").replace(/[áàä]/g,"a").replace(/[éèë]/g,"e").replace(/[íìï]/g,"i").replace(/[óòö]/g,"o").replace(/[úùü]/g,"u");
}

const caribexBlogIndex = require("../views/caribex-blog/index");
const caribexBlogPost = require("../views/caribex-blog/post");

router.get("/", (req, res) => {
  const posts = loadPosts();
  const page = parseInt(req.query.page) || 1;
  const cat = req.query.cat || null;
  const filtered = cat ? posts.filter(p => norm(p.category).includes(cat)) : posts;
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page-1)*POSTS_PER_PAGE, page*POSTS_PER_PAGE);
  res.send(caribexBlogIndex(paginated, page, totalPages, cat, null));
});

router.get("/buscar", (req, res) => {
  const q = (req.query.q || "").toLowerCase().trim();
  const posts = loadPosts();
  const filtered = q ? posts.filter(p =>
    (p.title||"").toLowerCase().includes(q) ||
    (p.excerpt||"").toLowerCase().includes(q) ||
    (p.tags||[]).some(t => t.toLowerCase().includes(q))
  ) : posts;
  res.send(caribexBlogIndex(filtered, 1, 1, null, q));
});

router.get("/sitemap.xml", (req, res) => {
  const posts = loadPosts();
  const urls = posts.map(p => `<url><loc>https://www.yourcaribbeanexpert.com/insights/${p.slug}</loc><lastmod>${p.dateISO||'2026-01-01'}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("");
  res.set("Content-Type","application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.yourcaribbeanexpert.com/insights</loc><changefreq>daily</changefreq><priority>0.9</priority></url>${urls}</urlset>`);
});

router.get("/feed.xml", (req, res) => {
  const posts = loadPosts().slice(0,20);
  const items = posts.map(p => `<item><title><![CDATA[${p.title}]]></title><link>https://www.yourcaribbeanexpert.com/insights/${p.slug}</link><description><![CDATA[${p.excerpt||""}]]></description><pubDate>${new Date(p.dateISO||p.date||Date.now()).toUTCString()}</pubDate><guid>https://www.yourcaribbeanexpert.com/insights/${p.slug}</guid></item>`).join("");
  res.set("Content-Type","application/rss+xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Caribex Insights — Your Caribbean Expert</title><link>https://www.yourcaribbeanexpert.com/insights</link><description>Caribbean travel guides, tips and expert insights.</description><language>en</language>${items}</channel></rss>`);
});

router.get("/:slug", (req, res) => {
  try {
    const postPath = path.join(POSTS_DIR, req.params.slug + ".json");
    if (!fs.existsSync(postPath)) return res.status(404).send("Article not found");
    const post = JSON.parse(fs.readFileSync(postPath, "utf8"));
    const allPosts = loadPosts();
    const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
    const related = allPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0,3);
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    res.send(caribexBlogPost(post, related, prevPost, nextPost));
  } catch(e) {
    res.status(500).send("Error loading article");
  }
});

module.exports = router;
