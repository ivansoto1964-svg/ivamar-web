const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "../../data/caribex-blog/posts");
const CARIBEX_FEED = "https://blog.yourcaribbeanexpert.com/feeds/posts/default?alt=json&max-results=50";
const CACHE_FILE = path.join(__dirname, "../../data/caribex-blog/sync-cache.json");

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
    .replace(/font-size:[^;;"]*;?/gi,"")
    .replace(/line-height:[^;;"]*;?/gi,"")
    .replace(/<div[^>]*>/gi,"<p>").replace(/<\/div>/gi,"</p>")
    .replace(/<img[^>]+blogger\.googleusercontent\.com[^>]*>/gi,"")
    .replace(/<img[^>]+bp\.blogspot\.com[^>]*>/gi,"")
    .replace(/href="https?:\/\/blog\.yourcaribbeanexpert\.com[^"]*"/gi,'href="#"')
    .replace(/Continue Exploring[\s\S]*?<\/ul>/gi,"")
    .replace(/Keep Exploring[\s\S]*?<\/ul>/gi,"")
    .replace(/Related Articles[\s\S]*?<\/ul>/gi,"")
    .replace(/\n\s*\n/g,"\n").trim();
}

async function syncCaribex() {
  try {
    if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
    const res = await fetch(CARIBEX_FEED);
    const data = await res.json();
    const entries = data.feed.entry || [];
    const synced = [];

    for (const entry of entries) {
      const title = entry.title.$t.trim();
      const slug = slugify(title);
      const rawContent = cleanHtml(entry.content ? entry.content.$t : "");
      // Remove duplicate title from content (Blogger includes title in body)
      const titleEscaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const content = rawContent.replace(new RegExp('<h[1-3][^>]*>\\s*' + titleEscaped + '\\s*<\/h[1-3]>', 'gi'), '').replace(new RegExp('<p[^>]*>\\s*' + titleEscaped + '\\s*<\/p>', 'gi'), '').trim();
      const date = new Date(entry.published.$t);
      const dateStr = date.toLocaleDateString("en-US", {year:"numeric",month:"long",day:"numeric"});
      const dateISO = date.toISOString().split("T")[0];
      const cats = (entry.category || []).map(c => c.term.trim()).filter(t => t.length < 40 && !t.includes("\n") && !t.includes("?"));
      const category = cats.length > 0 ? cats[0] : "Caribbean Travel";
      const tags = (entry.category || []).map(c => c.term.trim()).filter(Boolean);
      const link = (entry.link.find(l => l.rel === "alternate") || {}).href || "";

      let image = "/img/og-caribex.jpg";
      const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) image = imgMatch[1];
      else if (entry.media$thumbnail) { image = entry.media$thumbnail.url.replace(/s72-[^/]*/,"s1200-c").replace(/w[0-9]+-h[0-9]+-c/,"s1200-c"); }
      if (!image.startsWith("http")) image = "/img/og-caribex.jpg";

      const textContent = content.replace(/<[^>]+>/g,"").trim();
      const lines = textContent.split("\n").map(l => l.trim()).filter(l => l.length > 40 && !l.includes("?"));
      const excerpt = (lines[0] || textContent).substring(0, 160) + "...";
      const readTime = Math.max(1, Math.ceil(textContent.split(/\s+/).length / 200)).toString();

      const post = { slug, title, excerpt, category, date: dateStr, dateISO, readTime, image, tags, bloggerUrl: link, content };
      fs.writeFileSync(path.join(POSTS_DIR, slug + ".json"), JSON.stringify(post, null, 2));
      synced.push(slug);
    }

    const cache = { lastSync: new Date().toISOString(), count: synced.length, posts: synced };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    return cache;
  } catch(e) {
    console.error("Caribex sync error:", e.message);
    throw e;
  }
}

router.get("/sync", async (req, res) => {
  try {
    const result = await syncCaribex();
    res.json({ success: true, ...result });
  } catch(e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

syncCaribex().catch(e => console.error("Initial Caribex sync failed:", e.message));
setInterval(() => syncCaribex().catch(e => console.error("Auto Caribex sync failed:", e.message)), 30 * 60 * 1000);

module.exports = router;
