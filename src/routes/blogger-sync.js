const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "../../data/pb-blog/posts");
const BLOGGER_FEED = "https://blog.masboricuaqueunmofongo.com/feeds/posts/default?alt=json&max-results=50";
const CACHE_FILE = path.join(__dirname, "../../data/pb-blog/sync-cache.json");

function slugify(str) {
  return str.toLowerCase()
    .replace(/[áàä]/g,"a").replace(/[éèë]/g,"e")
    .replace(/[íìï]/g,"i").replace(/[óòö]/g,"o")
    .replace(/[úùü]/g,"u").replace(/ñ/g,"n")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

function cleanHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"")
    .replace(/class="[^"]*"/gi,"")
    .replace(/style="[^"]*"/gi,"")
    .replace(/<div[^>]*>/gi,"<p>").replace(/<\/div>/gi,"</p>")
    .replace(/href="https?:\/\/blog\.masboricuaqueunmofongo\.com[^"]*"/gi,'href="#"').replace(/href="http:\/\/blog\.masboricuaqueunmofongo\.com[^"]*"/gi,'href="#"')
    .replace(/<img[^>]+(s72-c|s400|thumbnail)[^>]*>/gi,"")
    .replace(/Descubre m[\s\S]*?<\/ul>/gi,"")
    .replace(/En Planeta Boricua[\s\S]*?<\/ul>/gi,"")
    .replace(/\n\s*\n/g,"\n").trim();
}

async function syncBlogger() {
  try {
    const res = await fetch(BLOGGER_FEED);
    const data = await res.json();
    const entries = data.feed.entry || [];
    const synced = [];

    for (const entry of entries) {
      const title = entry.title.$t.trim();
      const slug = slugify(title);
      const content = cleanHtml(entry.content ? entry.content.$t : "");
      const date = new Date(entry.published.$t);
      const dateStr = date.toLocaleDateString("es-PR", {year:"numeric",month:"long",day:"numeric"});
      const dateISO = date.toISOString().split("T")[0];
      const cats = (entry.category || []).map(c => c.term.trim()).filter(t => t.length < 40 && !t.includes("\n") && !t.includes("?"));
      const category = cats.length > 0 ? cats[0] : "Cultura Boricua";
      const tags = (entry.category || []).map(c => c.term.trim()).filter(Boolean);
      const link = (entry.link.find(l => l.rel === "alternate") || {}).href || "";

      // Extract first image
      let image = "/img/og-planetaboricua.jpg";
      const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) image = imgMatch[1];
      else if (entry.media$thumbnail) image = entry.media$thumbnail.url.replace("/s72-","/s1200-");

      // Extract excerpt
      const textContent = content.replace(/<[^>]+>/g,"").trim();
      const lines = textContent.split("\n").map(l => l.trim()).filter(l => l.length > 40 && !l.includes("?") && !l.includes("\u00bf"));
      const excerpt = (lines[0] || textContent).substring(0, 160) + "...";

      const cleanImage = image && image.startsWith('http') ? image : '/img/og-planetaboricua.jpg';
      const post = { slug, title, excerpt, category, date: dateStr, dateISO, readTime: Math.max(1, Math.ceil(textContent.split(/\s+/).length / 200)).toString(), image: cleanImage, tags, bloggerUrl: link, content };

      const postPath = path.join(POSTS_DIR, slug + ".json");
      fs.writeFileSync(postPath, JSON.stringify(post, null, 2));
      synced.push(slug);
    }

    const cache = { lastSync: new Date().toISOString(), count: synced.length, posts: synced };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    return cache;
  } catch(e) {
    console.error("Blogger sync error:", e.message);
    throw e;
  }
}

// Manual sync endpoint
router.get("/sync", async (req, res) => {
  try {
    const result = await syncBlogger();
    res.json({ success: true, ...result });
  } catch(e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Auto sync on startup and every 6 hours
syncBlogger().catch(e => console.error("Initial sync failed:", e.message));
setInterval(() => syncBlogger().catch(e => console.error("Auto sync failed:", e.message)), 6 * 60 * 60 * 1000);

module.exports = router;
