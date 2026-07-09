
const express = require("express");
const sanitizeHtml = require('sanitize-html');
const sanitize = (str) => str ? sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} }) : '';



// ==========================================
// RATE LIMITING
// ==========================================
const rateLimit = require('express-rate-limit');
const app = express();
app.set('trust proxy', 1);

// Handle malformed URI errors from bots/scanners
app.use((err, req, res, next) => {
  if (err instanceof URIError) {
    return res.status(400).send('Bad Request');
  }
  next(err);
});


// AI endpoints — max 20 requests per 10 minutes per IP
const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests. Please wait a few minutes before trying again.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Form submissions — max 5 per hour per IP
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});



// ==========================================
// ENSURE PERSISTENT DATA DIRECTORIES EXIST
// ==========================================
['businesses','listings','agreements','destinations'].forEach(dir => {
  const p = require('path').join('/data', dir);
  if (!require('fs').existsSync(p)) require('fs').mkdirSync(p, { recursive: true });
});


const layout = require("./views/layout");
const dyerKia = require("./views/dyerkia");
const adis = require("./views/adis");
const mrFrappe = require("./views/mr-frappe");
const renderEstado = require("./views/planetaboricua/estado-template");
const caribex = require("./views/caribex");
const directoryTerms = require("./views/caribex/directory-terms");
const listYourBusiness = require("./views/caribex/list-your-business");
const caribexAbout = require("./views/caribex/about");
const demoDealers = require("./views/demo-dealers");
const demoDealersES = require("./views/demo-dealers-es");
const home = require("./views/home");
const homeES = require("./views/home-es");
const homeEN = require("./views/home-en");
const about = require("./views/about");
const planetaboricua = require("./views/planetaboricua");
const recursosBoriuca = require("./views/recursos-boricua");
const { terminos: terminosBoricua, privacidad: privacidadBoricua, afiliados: afiliadosBoricua } = require("./views/legal-boricua");
const regresarAPR = require("./views/regresar-a-pr");
const mudarseDePR = require("./views/mudarse-de-pr");
const sobreNosotros = require("./views/sobre-nosotros");
const contactoES = require("./views/contacto");
const contact = require("./views/contact");
const privacy = require("./views/privacy");
const terms = require("./views/terms");
const termsES = require("./views/terms-es");
const privacyES = require("./views/privacy-es");

const quote = require("./views/quote");
const quoteES = require("./views/quote-es");
const adminLogin = require("./views/admin-login");
const adminDashboard = require("./views/admin-dashboard");
const adminEdit = require("./views/admin-edit");
const Anthropic = require("@anthropic-ai/sdk");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const fs = require("fs");
const { getPlacePhoto } = require("./helpers/googlePhotos");
const aecDemo = require("./views/autoridad-energia-criolla");
const addNegocioPB = require("./views/planetaboricua/add-negocio");
const pbNoticias = require("./views/planetaboricua/noticias");
const pbBlogIndex = require("./views/pb-blog/index");
const pbBlogPost = require("./views/pb-blog/post");
const Stripe = require("stripe");
const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;
const { searchPlacesByText } = require("./helpers/googlePlaces");
const path = require("path");
const cookieParser = require("cookie-parser");
// Agreements directory for legal acceptance logs
const agreementsDir = path.join(__dirname, "..", "data", "agreements");
if (!fs.existsSync(agreementsDir)) {
  fs.mkdirSync(agreementsDir, { recursive: true });
}





app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
const PORT = process.env.PORT || 4000;
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BILLING_API_URL = process.env.BILLING_API_URL || "https://ivamar-brain.onrender.com/v1/billing/checkout-session";
const BILLING_API_KEY = process.env.BILLING_API_KEY || "dev-secret";
const ADMIN_USER = process.env.ADMIN_USER || "ivamar-admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "ivamar2025";

const sessions = new Map();

function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function requireAdmin(req, res, next) {
  const token = req.cookies?.adminToken;
  const session = sessions.get(token);
  if (!session) return res.redirect("/admin");
  req.adminSession = session;
  next();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

function postJson(urlStr, payload, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(urlStr);
      const lib = url.protocol === "https:" ? require("https") : require("http");
      const data = Buffer.from(JSON.stringify(payload));
      const req = lib.request({
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? 443 : 80),
        path: url.pathname + (url.search || ""),
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": data.length, ...(options.headers || {}) },
        timeout: 15000
      }, (res) => {
        let body = "";
        res.on("data", (chunk) => body += chunk);
        res.on("end", () => resolve({ status: res.statusCode || 0, body }));
      });
      req.on("timeout", () => { req.destroy(new Error("timeout")); });
      req.on("error", reject);
      req.write(data);
      req.end();
    } catch (e) { reject(e); }
  });
}

// ==========================================
// PUBLIC ROUTES
// ==========================================

app.use((req, res, next) => {
  const host = req.hostname;
  if (host === "yourcaribbeanexpert.com" || host === "www.yourcaribbeanexpert.com") {
    if (req.path === "/" || req.path === "") {
      return res.send(caribex);
    }
  }
  if (host === 'masboricuaqueunmofongo.com' || host === 'www.masboricuaqueunmofongo.com') {
    if (req.path === '/sitemap.xml' || req.path === '/sitemap-boricua.xml') {
      const base = 'https://www.masboricuaqueunmofongo.com';
      const urls = [
        `<url><loc>${base}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
        `<url><loc>${base}/recursos</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`
      ].join('\n  ');
      res.header('Content-Type', 'application/xml');
      return res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
    }
    if (req.path === '/robots.txt') {
      res.header('Content-Type', 'text/plain');
      return res.send('User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://www.masboricuaqueunmofongo.com/sitemap.xml');
    }
    if (req.path === '/' || req.path === '') {
      return res.send(planetaboricua);
    }
    if (req.path === '/recursos' || req.path === '/centro-de-recursos') {
      return res.send(recursosBoriuca);
    }
    if (req.path === '/terminos-boricua') {
      return res.send(terminosBoricua);
    }
    if (req.path === '/privacidad-boricua') {
      return res.send(privacidadBoricua);
    }
    if (req.path === '/afiliados-boricua') {
      return res.send(afiliadosBoricua);
    }
    if (req.path === '/regresar-a-pr') {
      return res.send(regresarAPR);
    }
    if (req.path === '/mudarse-de-pr') {
      return res.send(mudarseDePR);
    }
  }
  next();
});

app.get("/", (req, res) => res.send(layout({ title: "Ivamar AI", body: home })));
app.get("/es", (req, res) => res.send(layout({ title: "Ivamar AI · Español", body: homeES })));
app.get("/en", (req, res) => res.send(layout({  lang: "en", title: "Ivamar AI · English", body: homeEN })));
app.get("/about", (req, res) => res.send(layout({  lang: "en", title: "About — Ivamar AI LLC", body: about })));
app.get("/sobre-nosotros", (req, res) => res.send(layout({ title: "Sobre Nosotros — Ivamar AI", body: sobreNosotros })));
app.get("/contacto", (req, res) => res.send(layout({ title: "Contacto — Ivamar AI", body: contactoES })));
app.get("/contact", (req, res) => res.send(layout({  lang: "en", title: "Contact — Ivamar AI LLC", body: contact })));
app.get("/privacy", (req, res) => res.send(layout({  lang: "en", title: "Privacy Policy — Ivamar AI LLC", body: privacy })));
app.get("/terms", (req, res) => res.send(layout({  lang: "en", title: "Terms of Service — Ivamar AI LLC", body: terms })));
app.get("/terminos", (req, res) => res.send(layout({ title: "Términos de Servicio — Ivamar AI", body: termsES })));
app.get("/privacidad", (req, res) => res.send(layout({ title: "Política de Privacidad — Ivamar AI", body: privacyES })));
app.get("/demo-dealers", (req, res) => res.send(demoDealers));
app.get("/demo-dealers-es", (req, res) => res.send(demoDealersES));


// ==========================================
// ==========================================
// CARIBEX / SUN TRAVEL ASSISTANT
// ==========================================
app.post("/api/caribex", aiLimiter, express.json(), async (req, res) => {
  const { message, history = [] } = req.body;

  const system = `You are Sun, the official AI travel curator for Caribex (yourcaribbeanexpert.com), a product and brand of Ivamar AI LLC based in Delaware, USA. You are warm, sophisticated, culture-focused, and highly realistic. You speak like a seasoned expert who has lived in the Caribbean for a decade.

CORE DIRECTIVE:
Provide accurate knowledge with cultural context. Prioritize safety, immigration/visa realities, and authentic local experiences. For inter-island movement, answer in three layers:
1. THE LOGISTICS: The raw fact (ferry exists or not, operator name, general travel time).
2. THE REALITY CHECK: Customs, currency, border warnings, visa/passport requirements, and cash port taxes.
3. SUN'S INSIDER TIP: Something only a real Caribbean expert would know.

VERIFIED FERRY DATABASE — ONLY these routes exist. If asked about any route NOT listed here, say exactly: "There is no active commercial ferry route between those two destinations."

GREATER ANTILLES & INTERNATIONAL:
- Puerto Rico (San Juan) ↔ Dominican Republic (Santo Domingo): Ferries del Caribe — overnight cruise-ferry.
  * Passport/Visa: Valid passport required. Most nationalities require a Tourist Card (included in ferry ticket).
  * Currency: USD (PR) ↔ DOP (DR).
- Florida (Fort Lauderdale) ↔ Bahamas (Freeport/Bimini): Balearia Caribbean — high-speed day ferry.
  * Passport/Visa: Valid passport required for all international passengers.
  * Currency: USD (Florida) ↔ BSD (Bahamas, USD widely accepted at par 1:1).

PUERTO RICO MUNICIPAL ISLANDS:
- Ceiba, PR ↔ Vieques / Culebra: ATM (Autoridad de Transporte Marítimo) — public ferry.
  * Passport/Visa: Domestic US route. No passport needed for US citizens (Government ID suffices).
  * Currency: USD.

US & BRITISH VIRGIN ISLANDS:
- St. Thomas ↔ St. John: Public ferries, frequent service (Domestic US, USD).
- St. Thomas ↔ St. Croix: QE IV Ferry (Domestic US, USD).
- St. Thomas (USVI) ↔ Tortola / Virgin Gorda / Jost Van Dyke (BVI): Native Son Ferry, Smith's Ferry, Road Town Fast Ferry.
  * Passport/Visa: International crossing. Valid passport mandatory for everyone including US citizens.
  * Currency: USD is the official currency on both sides.
  * INSIDER TIP: BVI customs closes early — avoid late afternoon crossings. Expect mandatory cash-only departure taxes at the port.

LEEWARD ISLANDS (Sint Maarten hub):
- Sint Maarten (Dutch) / Saint Martin (French) ↔ Anguilla (UK Territory): Daily public ferries and private charters.
  * Passport/Visa: Valid passport mandatory. Departure tax applies at the port.
  * Currency: EUR/ANG ↔ XCD. USD universally accepted.
- Sint Maarten ↔ St. Barths (French Collectivity): Voyager, The Edge.
  * Passport/Visa: Valid passport required (Schengen/French territory rules apply).
  * Currency: EUR (USD accepted).
- Sint Maarten ↔ Saba / St. Eustatius (Special Dutch Municipalities): Makana Ferry.
  * Passport/Visa: Valid passport required.
  * Currency: USD (official currency in Saba/Statia).
- Sint Maarten ↔ St. Kitts (Independent Nation): Makana Ferry.
  * Passport/Visa: Valid passport required.
  * Currency: XCD.
- Antigua ↔ Montserrat (UK Territory): Montserrat Ferry Service (government service).
  * Passport/Visa: Valid passport required.
  * Currency: XCD.
  * INSIDER TIP: Crossing Sint Maarten to Anguilla or St. Barths feels like changing countries in 20 minutes — passport always required.

WINDWARD ISLANDS (French network):
- Guadeloupe ↔ Dominica ↔ Martinique ↔ Saint Lucia: L'Express des Îles, Jeans for Freedom — direct connections and operational stopovers.
  * Passport/Visa: Required when crossing between French territories (EUR) and independent nations (XCD).
- Guadeloupe domestic: Marie-Galante, Les Saintes, La Désirade — domestic France, EUR, no passport for domestic travelers.
  * INSIDER TIP: The Dominica channel has notoriously rough Atlantic currents — recommend dramamine for sensitive travelers.

ST. VINCENT & THE GRENADINES:
- St. Vincent ↔ Bequia ↔ Canouan ↔ Mayreau ↔ Union Island: Beachey Fast Ferry, Jaden Sun, traditional mail boats.
  * Passport/Visa: Domestic route. No customs or passport control between these islands.
  * Currency: XCD.
  * INSIDER TIP: This is old-school Caribbean island hopping — perfect for slow-travel itineraries.

SOUTHERN CARIBBEAN:
- Trinidad ↔ Tobago: Trinidad and Tobago Inter-island Transportation Co. — public and cargo ferries. Domestic route. Currency: TTD.
- Venezuela (Puerto La Cruz / Cumaná) ↔ Isla Margarita (Punta de Piedras): Gran Cacique Express, Naviera Paraguaná, Navibus, La Nueva Conferry.
  * Passport/Visa: Domestic route. Foreigners must carry the original ID/passport used to enter Venezuela.
  * Currency: VES (USD widely used in local commerce).

WESTERN CARIBBEAN:
- Playa del Carmen ↔ Cozumel / Cancún ↔ Isla Mujeres: Ultramar, Winjet. Currency: MXN (USD accepted).
- Belize City ↔ Caye Caulker ↔ San Pedro (Ambergris Caye): San Pedro Belize Express, Water Jets International. Currency: BZD (USD accepted 2:1).
- La Ceiba, Honduras ↔ Roatán: Galaxy Wave. / La Ceiba ↔ Útila: Utila Dream. Currency: HNL (USD accepted).
- San Andrés, Colombia ↔ Isla Providencia: Conocemos Navegando (catamaran). Currency: COP. Note: Requires San Andrés tourist card to enter the archipelago.

CONFIRMED NO-FERRY ROUTES — never invent these:
- NO ferry Jamaica ↔ Cuba (or any island)
- NO ferry Barbados ↔ any other island
- NO ferry Aruba ↔ Bonaire ↔ Curaçao
- NO ferry connecting Colombia or Central America to the Greater Antilles

DEEP KNOWLEDGE:
- Culture, history, and identity of every Caribbean destination
- Food traditions — specific dishes, local markets, best eating experiences
- Music — reggae, salsa, zouk, merengue, soca, cumbia, punta, gaita
- Beaches — which are best for each type of traveler
- Nature — rainforests, volcanoes, reefs, wildlife, hiking
- Best time to visit each destination and why
- Hidden gems and off the beaten path experiences
- Budget vs luxury considerations for every island

TRAVELER PROFILES:
- Budget → Belize, Roatán, DR, Puerto Rico, Costa Rica, Colombia
- Luxury → Turks & Caicos, BVI, St. Barths, Saint Lucia, Grand Cayman, Anguilla
- Party → Trinidad Carnival, DR, Sint Maarten, San Juan PR, Montego Bay
- Nature → Costa Rica, Belize, Dominica, Trinidad, Roatán, Panama
- Culture → Cuba, Cartagena, Old San Juan, Trinidad, Barbados, Santo Domingo
- Family → Grand Cayman, Turks & Caicos, Barbados, Aruba, USVI, Bahamas

ACCOMMODATION & FLIGHT BOOKING — TRUSTED PLATFORMS (CRITICAL RULE):
You cannot recommend or vouch for a specific hotel, property, or flight — you don't have real-time data on availability, current quality, or pricing. Instead, when someone asks about where to stay, where to book, hotels, accommodation, flights, or how to get somewhere, point them to these trusted platforms where they can compare real prices and read verified reviews. These same platforms (Booking, Expedia, Trip.com, Agoda) handle BOTH hotels AND flights — always use these, never mention Google Flights, Kayak, Skyscanner, Hotels.com, Hopper, Priceline or any other external/competing platform:
- Booking.com: https://booking.tpo.lu/OcdV3VzY
- Expedia: https://expedia.tpo.lu/CgKszVA3
- Trip.com: https://trip.tpo.lu/tOQAQ2WQ
- Agoda: https://agoda.tpo.lu/vv7Jhln0

MANDATORY FORMAT: Whenever you mention one of these platforms by name, you MUST format it as a markdown link using this exact syntax: [Platform Name](url) — for example [Booking.com](https://booking.tpo.lu/OcdV3VzY). NEVER write the platform name and the raw URL separately or in parentheses (e.g. NEVER write "Booking.com (https://...)") — always use the [Name](url) markdown format so it renders as a clean clickable link. Example of CORRECT phrasing: "For flights and hotels, check [Expedia](https://expedia.tpo.lu/CgKszVA3) or [Booking.com](https://booking.tpo.lu/OcdV3VzY) — compare real prices and reviews there." Mention these naturally, not as a dumped list — only share the most relevant 1-2 platforms per response rather than all four every time.

HONESTY RULES — NON-NEGOTIABLE:
1. NEVER invent schedules, prices, phone numbers, or opening hours — these change constantly.
2. For routes NOT in the verified database above, say exactly: "There is no active commercial ferry route between those two destinations."
3. NEVER say "From what I know..." or "I believe..." — if uncertain, say: "I don't have that information — I recommend checking directly with local operators or Google."
4. Zero tolerance for guessing. A wrong answer destroys trust.

COMMUNICATION STYLE:
- Clean, elegant language — no excessive emojis
- Maximum 4 sentences per response
- Always end with ONE specific follow-up question
- Be specific — name beaches, dishes, neighborhoods, events
- Never be generic — you are a trusted expert, not a travel brochure

LANGUAGE RULE:
Detect the language of every message and ALWAYS respond in that exact language. Never switch unless the user does.

Direct users to yourcaribbeanexpert.com for deeper destination articles.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      system,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [...history, { role: "user", content: message }]
    });
    const reply = response.content
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n") || "I don't have that information right now.";
    return res.json({ reply });
  } catch(e) {
    return res.json({ reply: "Having a quick issue. Visit yourcaribbeanexpert.com for Caribbean travel inspiration!" });
  }
});

// ==========================================
// CARIBEX DESTINATION PHOTOS API
// ==========================================
app.get("/api/caribex-photos", async (req, res) => {
  const destinations = [
    { slug: 'puerto-rico', query: 'Old San Juan Puerto Rico beach' },
    { slug: 'dominican-republic', query: 'Punta Cana Dominican Republic beach' },
    { slug: 'cuba', query: 'Cuba beach Caribbean sea' },
    { slug: 'jamaica', query: 'Jamaica Seven Mile Beach' },
    { slug: 'grand-cayman', query: 'Grand Cayman Seven Mile Beach' },
    { slug: 'haiti', query: 'Haiti Citadelle Laferriere' },
    { slug: 'vieques-culebra', query: 'Flamenco Beach Culebra Puerto Rico' },
    { slug: 'barbados', query: 'Barbados platinum coast beach' },
    { slug: 'santa-lucia', query: 'Saint Lucia Pitons' },
    { slug: 'trinidad-tobago', query: 'Trinidad Tobago carnival beach' },
    { slug: 'sint-maarten', query: 'Sint Maarten Maho Beach' },
    { slug: 'martinique', query: 'Martinique French Caribbean beach' },
    { slug: 'guadeloupe', query: 'Guadeloupe Caribbean beach' },
    { slug: 'st-barths', query: 'Saint Barths luxury beach' },
    { slug: 'grenada', query: 'Grenada Grand Anse beach spice island' },
    { slug: 'antigua', query: 'Antigua Half Moon Bay beach' },
    { slug: 'dominica', query: 'Dominica nature island rainforest' },
    { slug: 'st-kitts-nevis', query: 'St Kitts Brimstone Hill beach' },
    { slug: 'aruba', query: 'Aruba Eagle Beach' },
    { slug: 'curacao', query: 'Curacao Willemstad colorful' },
    { slug: 'bonaire', query: 'Bonaire diving reef flamingos' },
    { slug: 'usvi', query: 'US Virgin Islands Magens Bay' },
    { slug: 'bvi', query: 'British Virgin Islands beach sailing' },
    { slug: 'turks-caicos', query: 'Turks Caicos Grace Bay Beach' },
    { slug: 'bahamas', query: 'Bahamas Exuma swimming pigs' },
    { slug: 'tulum', query: 'Tulum Mexico ruins beach' },
    { slug: 'cartagena', query: 'Cartagena Colombia walled city' },
    { slug: 'san-andres', query: 'San Andres Colombia sea seven colors' },
    { slug: 'costa-rica', query: 'Costa Rica Caribbean Puerto Viejo beach' },
    { slug: 'belize', query: 'Belize Blue Hole diving' },
    { slug: 'panama', query: 'Bocas del Toro Panama turquoise water' },
    { slug: 'roatan', query: 'Roatan Honduras West Bay Beach' },
    { slug: 'venezuela', query: 'Los Roques Venezuela beach' },
    { slug: 'corn-islands', query: 'Corn Islands Nicaragua beach' },
    { slug: 'guatemala-caribbean', query: 'Rio Dulce Guatemala jungle river' },
  ];

  const photos = {};
  await Promise.all(destinations.map(async ({ slug, query }) => {
    const photo = await getPlacePhoto(query, 400);
    if (photo) photos[slug] = photo;
  }));

  res.json(photos);
});

// ==========================================
// CARIBEX DESTINATION PAGES
// ==========================================
const renderDestination = require("./views/caribex/destination-template");

app.get("/caribex/about", (req, res) => res.send(caribexAbout));
app.get("/caribex/directory-terms", (req, res) => res.send(directoryTerms));
app.get("/caribex/list-your-business", (req, res) => res.send(listYourBusiness));

// CARIBEX DIRECTORY — APPROVE LISTING (Admin)
app.post("/admin/listings/approve/:id", requireAdmin, async (req, res) => {
  try {
    const fs2 = require('fs');
    const path = require('path');
    const pendingFile = path.join('/data/listings/pending.json');
    const approvedDir = path.join('/data/listings');

    let pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    const listing = pending.find(l => l.id === req.params.id);

    if (!listing) return res.json({ ok: false, error: 'Listing not found' });

    // Move to approved file for that destination
    const approvedFile = path.join(approvedDir, listing.destination + '.json');
    let approved = [];
    if (fs2.existsSync(approvedFile)) {
      approved = JSON.parse(fs2.readFileSync(approvedFile, 'utf8'));
    }
    listing.status = 'approved';
    listing.approvedAt = new Date().toISOString();
    approved.push(listing);
    fs2.writeFileSync(approvedFile, JSON.stringify(approved, null, 2));

    // Remove from pending
    pending = pending.filter(l => l.id !== req.params.id);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

    return res.json({ ok: true });
  } catch(e) {
    return res.json({ ok: false, error: e.message });
  }
});

// CARIBEX DIRECTORY — REJECT LISTING (Admin)
app.post("/admin/listings/reject/:id", requireAdmin, async (req, res) => {
  try {
    const fs2 = require('fs');
    const path = require('path');
    const pendingFile = path.join('/data/listings/pending.json');
    let pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    pending = pending.filter(l => l.id !== req.params.id);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));
    return res.json({ ok: true });
  } catch(e) {
    return res.json({ ok: false, error: e.message });
  }
});

// CARIBEX DIRECTORY — GET LISTINGS FOR DESTINATION+CATEGORY
app.get("/api/listings/:destination/:category", (req, res) => {
  try {
    const fs2 = require('fs');
    const path = require('path');
    const approvedFile = path.join('/data/listings', req.params.destination + '.json');
    if (!fs2.existsSync(approvedFile)) return res.json({ listings: [] });
    const all = JSON.parse(fs2.readFileSync(approvedFile, 'utf8'));
    const filtered = all.filter(l => l.category === req.params.category && l.status === 'approved');
    return res.json({ listings: filtered });
  } catch(e) {
    return res.json({ listings: [] });
  }
});

// CARIBEX DIRECTORY — ADMIN PENDING LISTINGS VIEW
app.get("/admin/listings", requireAdmin, (req, res) => {
  try {
    const fs2 = require('fs');
    const path = require('path');
    const pendingFile = path.join('/data/listings/pending.json');
    const pending = fs2.existsSync(pendingFile) ? JSON.parse(fs2.readFileSync(pendingFile, 'utf8')) : [];

    // Load all approved listings
    const listingsDir = '/data/listings';
    const allApproved = [];
    if (fs2.existsSync(listingsDir)) {
      fs2.readdirSync(listingsDir).forEach(file => {
        if (file !== 'pending.json' && file.endsWith('.json')) {
          const destination = file.replace('.json', '');
          try {
            const listings = JSON.parse(fs2.readFileSync(require('path').join(listingsDir, file), 'utf8'));
            listings.forEach(l => allApproved.push({ ...l, destination }));
          } catch(e) {}
        }
      });
    }

    const catNames = { hotels: '🏨 Where to Stay', tours: '🧭 Tours & Experiences', transport: '🚗 Transportation', restaurants: '🍽️ Where to Eat' };
    const approvedByDest = {};
    allApproved.forEach(l => {
      if (!approvedByDest[l.destination]) approvedByDest[l.destination] = {};
      if (!approvedByDest[l.destination][l.category]) approvedByDest[l.destination][l.category] = [];
      approvedByDest[l.destination][l.category].push(l);
    });

    const approvedHTML = allApproved.length === 0
      ? '<p style="color:#888;text-align:center;padding:2rem">No approved listings yet.</p>'
      : Object.entries(approvedByDest).map(([dest, cats]) => `
        <div style="margin-bottom:2rem;">
          <h3 style="color:#0077B6;font-size:1rem;text-transform:capitalize;margin-bottom:1rem;border-bottom:2px solid #E0EEF4;padding-bottom:0.5rem">${dest.replace(/-/g,' ')}</h3>
          ${Object.entries(cats).map(([cat, listings]) => `
            <div style="margin-bottom:1rem;">
              <div style="font-size:0.75rem;font-weight:700;color:#00B4D8;text-transform:uppercase;margin-bottom:0.5rem">${catNames[cat] || cat}</div>
              ${listings.map(l => `
                <div style="background:#fff;border:1px solid #E0EEF4;border-radius:8px;padding:1rem;margin-bottom:0.5rem;display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">
                  <div style="display:flex;align-items:center;gap:1rem;">
                    ${l.photo ? `<img src="${l.photo}" style="width:60px;height:45px;object-fit:cover;border-radius:6px;">` : ''}
                    <div>
                      <div style="font-weight:700;color:#0D1B2A">${l.name}</div>
                      <div style="font-size:0.75rem;color:#555">${l.desc}</div>
                      ${l.price ? `<div style="font-size:0.7rem;color:#00B4D8;font-weight:700">${l.price}</div>` : ''}
                    </div>
                  </div>
                  <button onclick="removeListing('${dest}','${l.id}')" style="background:#fff;color:#e53e3e;border:1px solid #e53e3e;padding:0.4rem 0.8rem;border-radius:6px;font-weight:700;cursor:pointer;font-size:0.75rem;white-space:nowrap;">🗑 Remove</button>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      `).join('');

    const cards = pending.length === 0
      ? '<p style="color:#888;text-align:center;padding:3rem">No pending listings.</p>'
      : pending.map(l => `
        <div style="background:#fff;border:1px solid #E0EEF4;border-radius:12px;padding:1.5rem;margin-bottom:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap;">
            <div style="flex:1">
              <div style="font-size:0.65rem;font-weight:700;color:#00B4D8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem">${l.category} · ${l.destination}</div>
              <div style="font-size:1.1rem;font-weight:700;color:#0D1B2A;margin-bottom:0.3rem">${l.name}</div>
              <div style="font-size:0.82rem;color:#555;margin-bottom:0.5rem">${l.desc}</div>
              <div style="font-size:0.75rem;color:#888">📧 ${l.email} ${l.whatsapp ? '· 📱 ' + l.whatsapp : ''} ${l.website ? '· 🌐 ' + l.website : ''}</div>
              <div style="font-size:0.75rem;color:#888;margin-top:0.3rem">Submitted: ${new Date(l.submittedAt).toLocaleDateString()}</div>
            </div>
            ${l.photo ? '<img src="' + l.photo + '" style="width:100px;height:70px;object-fit:cover;border-radius:8px;flex-shrink:0">' : ''}
          </div>
          <div style="margin-top:1rem;display:flex;gap:0.8rem;">
            <button onclick="approveListing('${l.id}')" style="background:#00B4D8;color:#fff;border:none;padding:0.6rem 1.2rem;border-radius:6px;font-weight:700;cursor:pointer;font-size:0.82rem">✅ Approve</button>
            <button onclick="rejectListing('${l.id}')" style="background:#fff;color:#e53e3e;border:1px solid #e53e3e;padding:0.6rem 1.2rem;border-radius:6px;font-weight:700;cursor:pointer;font-size:0.82rem">❌ Reject</button>
          </div>
        </div>
      `).join('');

    res.send(`
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Pending Listings — Caribex Admin</title>
      <style>body{font-family:sans-serif;background:#F0F8FF;padding:2rem;max-width:900px;margin:0 auto;}h1{color:#0D1B2A;margin-bottom:0.3rem;}p.sub{color:#888;font-size:0.85rem;margin-bottom:2rem;}</style>
      </head>
      <body>
      <h1>🌴 Caribex — Directory Admin</h1>
      <p class="sub"><a href="/admin/dashboard">← Back to Dashboard</a></p>
      <h2 style="font-size:1.1rem;color:#0D1B2A;margin-bottom:1rem;">⏳ Pending Approval (${pending.length})</h2>
      ${cards}
      <h2 style="font-size:1.1rem;color:#0D1B2A;margin:2rem 0 1rem;">✅ Approved Listings (${allApproved.length})</h2>
      ${approvedHTML}
      <script>
      async function approveListing(id) {
        if (!confirm('Approve this listing?')) return;
        const r = await fetch('/admin/listings/approve/' + id, { method: 'POST', credentials: 'include' });
        const d = await r.json();
        if (d.ok) { alert('✅ Approved!'); location.reload(); }
        else alert('Error: ' + d.error);
      }
      async function rejectListing(id) {
        if (!confirm('Reject and delete this listing?')) return;
        const r = await fetch('/admin/listings/reject/' + id, { method: 'POST', credentials: 'include' });
        const d = await r.json();
        if (d.ok) { alert('Rejected.'); location.reload(); }
        else alert('Error: ' + d.error);
      }
      async function removeListing(destination, id) {
        if (!confirm('Remove this approved listing?')) return;
        const r = await fetch('/admin/listings/remove/' + destination + '/' + id, { method: 'POST', credentials: 'include' });
        const d = await r.json();
        if (d.ok) { alert('✅ Removed!'); location.reload(); }
        else alert('Error: ' + d.error);
      }
      </script>
      </body></html>
    `);
  } catch(e) {
    res.send('Error: ' + e.message);
  }
});

app.get("/caribex/:slug", async (req, res) => {
  const slug = req.params.slug;
  try {
    const dest = JSON.parse(fs.readFileSync(`${__dirname}/data/destinations/${slug}.json`, 'utf8'));
    const heroPhoto = await getPlacePhoto(dest.name + ' ' + dest.country, 1600, dest.searchQuery);
    dest.heroPhoto = heroPhoto;
    res.send(renderDestination(dest));
  } catch(e) {
    res.redirect("/caribex");
  }
});

app.get("/caribex", (req, res) => res.send(caribex));
app.use((req, res, next) => {
  if (req.hostname === "yourcaribbeanexpert.com" || req.hostname === "www.yourcaribbeanexpert.com") {
    if (req.path === "/" || req.path === "") {
      return res.send(caribex);
    }
  }
  next();
});
app.get("/florida", async (req, res) => {
  try {
    const estado = JSON.parse(fs.readFileSync(__dirname + "/data/estados/florida.json", "utf8"));
    const heroPhoto = await getPlacePhoto("Florida boricua community Orlando", 1600, "Florida boricua community Orlando");
    estado.heroPhoto = heroPhoto;
    res.send(renderEstado(estado));
  } catch(e) {
    console.error(e);
    res.status(500).send("Error loading Florida page");
  }
});

app.get("/mr-frappe", (req, res) => res.send(mrFrappe));
app.get("/adis", (req, res) => res.send(adis));
app.get("/dyerkia", (req, res) => res.send(dyerKia));
app.get("/demo-autos", (req, res) => res.send(demoDealers));
app.get("/quote", (req, res) => res.send(layout({  lang: "en", title: "Get Started — Ivamar AI", body: quote })));


// API: Log legal agreement acceptance
app.post("/api/log-agreement", express.json(), (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() 
            || req.headers['x-real-ip']
            || req.socket?.remoteAddress 
            || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    
    const record = {
      ...req.body,
      ip: ip,
      userAgent: userAgent,
      receivedAt: new Date().toISOString()
    };
    
    const fileName = `${Date.now()}_${(req.body.email || 'unknown').replace(/[^a-z0-9]/gi, '_')}.json`;
    const filePath = path.join(agreementsDir, fileName);
    
    fs.writeFileSync(filePath, JSON.stringify(record, null, 2));
    
    console.log(`✅ Agreement logged: ${req.body.bizName} (${req.body.email}) from IP ${ip}`);
    
    // Send backup email to business owner
    if (process.env.RESEND_API_KEY && process.env.AGREEMENT_EMAIL_TO) {
      resend.emails.send({
        from: 'Ivamar AI <onboarding@resend.dev>',
        to: process.env.AGREEMENT_EMAIL_TO,
        subject: `📋 New Agreement: ${req.body.bizName || 'Unknown'} (${req.body.email || 'no email'})`,
        html: `<h2>New Legal Agreement Signed</h2>
<p><strong>Business:</strong> ${req.body.bizName || 'N/A'}</p>
<p><strong>Name:</strong> ${req.body.name || 'N/A'}</p>
<p><strong>Email:</strong> ${req.body.email || 'N/A'}</p>
<p><strong>Plan:</strong> ${req.body.plan || 'N/A'}</p>
<p><strong>IP:</strong> ${ip}</p>
<p><strong>Time:</strong> ${record.receivedAt}</p>
<p><strong>File ID:</strong> ${fileName}</p>
<hr>
<pre>${JSON.stringify(record, null, 2)}</pre>`,
        attachments: [{
          filename: fileName,
          content: Buffer.from(JSON.stringify(record, null, 2)).toString('base64')
        }]
      }).then(() => {
        console.log(`📧 Email backup sent for ${fileName}`);
      }).catch(emailErr => {
        console.error('Email backup failed:', emailErr);
      });
    }
    
    res.json({ success: true, id: fileName });
  } catch (err) {
    console.error('Agreement log error:', err);
    res.status(500).json({ error: 'Failed to log agreement' });
  }
});

app.get("/cotizar", (req, res) => res.send(layout({ title: "Empezar — Ivamar AI", body: quoteES })));
app.get("/pricing", (req, res) => res.redirect("/quote"));

// ==========================================
// ADMIN ROUTES
// ==========================================

app.get("/admin", (req, res) => res.send(layout({ title: "Admin — Ivamar AI", body: adminLogin })));

app.post("/admin/auth", (req, res) => {
  const { user, pass } = req.body || {};
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    const token = generateToken();
    sessions.set(token, { role: "admin", slug: null });
    res.cookie("adminToken", token, { httpOnly: true, maxAge: 86400000 * 7 });
    return res.json({ ok: true, redirect: "/admin/dashboard" });
  }
  const businessFile = path.join(__dirname, "..", "data", "businesses", `${user}.json`);
  if (fs.existsSync(businessFile)) {
    const clientPass = process.env[`CLIENT_PASS_${user.toUpperCase().replace(/-/g, "_")}`] || user + "2025";
    if (pass === clientPass) {
      const token = generateToken();
      sessions.set(token, { role: "client", slug: user });
      res.cookie("adminToken", token, { httpOnly: true, maxAge: 86400000 * 7 });
      return res.json({ ok: true, redirect: `/admin/edit/${user}` });
    }
  }
  res.json({ ok: false });
});

app.get("/admin/logout", (req, res) => {
  const token = req.cookies?.adminToken;
  if (token) sessions.delete(token);
  res.clearCookie("adminToken");
  res.redirect("/admin");
});

app.get("/admin/dashboard", requireAdmin, (req, res) => {
  if (req.adminSession.role !== "admin") return res.redirect(`/admin/edit/${req.adminSession.slug}`);
  const bizDir = path.join(__dirname, "..", "data", "businesses");
  const files = fs.readdirSync(bizDir).filter(f => f.endsWith(".json"));
  const businesses = files.map(f => {
    try { return JSON.parse(fs.readFileSync(path.join(bizDir, f), "utf8")); }
    catch (e) { return null; }
  }).filter(Boolean);
  res.send(layout({ title: "Dashboard — Ivamar AI", body: adminDashboard(businesses) }));
});

app.get("/admin/new", requireAdmin, (req, res) => {
  if (req.adminSession.role !== "admin") return res.redirect("/admin/dashboard");
  res.send(layout({ title: "Nuevo negocio — Admin", body: adminEdit({}, true) }));
});

app.get("/admin/edit/:slug", requireAdmin, (req, res) => {
  const slug = req.params.slug;
  if (req.adminSession.role === "client" && req.adminSession.slug !== slug) {
    return res.redirect(`/admin/edit/${req.adminSession.slug}`);
  }
  const bizFile = path.join(__dirname, "..", "data", "businesses", `${slug}.json`);
  let biz = {};
  if (fs.existsSync(bizFile)) {
    try { biz = JSON.parse(fs.readFileSync(bizFile, "utf8")); } catch (e) {}
  }
  res.send(layout({ title: `Editando ${biz.name || slug} — Admin`, body: adminEdit(biz, false) }));
});

app.post("/admin/save", requireAdmin, (req, res) => {
  const data = req.body;
  if (!data || !data.slug) return res.json({ ok: false, error: "slug requerido" });
  if (req.adminSession.role === "client" && req.adminSession.slug !== data.slug) {
    return res.json({ ok: false, error: "no autorizado" });
  }
  try {
    const bizFile = path.join(__dirname, "..", "data", "businesses", `${data.slug}.json`);
    fs.writeFileSync(bizFile, JSON.stringify(data, null, 2), "utf8");
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

app.post("/admin/delete/:slug", requireAdmin, (req, res) => {
  if (req.adminSession.role !== "admin") return res.json({ ok: false, error: "no autorizado" });
  try {
    const bizFile = path.join(__dirname, "..", "data", "businesses", `${req.params.slug}.json`);
    if (fs.existsSync(bizFile)) fs.unlinkSync(bizFile);
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

// ==========================================
// IVA ASSISTANT API — CLAUDE
// ==========================================

app.post("/api/demo", aiLimiter, async (req, res) => {
  const message = (req.body?.message || "").toString();
  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: "Eres IvA, el asistente de La Plaza Restaurant en Miami, FL. MENU: Ropa Vieja $15.99, Pollo a la Brasa $14.99, Camarones al Ajillo $18.99, Tostones con Guacamole $7.99, Empanadas x3 $8.99, Ensalada Tropical $9.99, Agua de Jamaica $3.99, Limonada Natural $3.99, Cafe Cubano $2.99, Flan de Coco $5.99, Churros con Chocolate $6.99. HORARIO: Lun-Vie 11am-10pm, Sab-Dom 10am-11pm. DELIVERY: Si, $3 adicional. PICKUP: Gratis. Responde en el idioma del cliente. Se amistoso y profesional. Maximo 3 oraciones.",
      messages: [{ role: "user", content: message }]
    });
    return res.json({ reply: response.content[0].text });
  } catch (e) {
    console.error("Demo error:", e.message);
    return res.json({ reply: "Sorry, I had a problem. Please try again or contact us via WhatsApp." });
  }
});

app.post("/api/demo-autos", async (req, res) => {
  const message = (req.body?.message || "").toString();
  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: "Eres IvA, asistente de Luis Soto Autos dealer en Puerto Rico y Florida. INVENTARIO: Honda CR-V 2022 $28,900 18,500mi SUV, Toyota Tacoma 2021 $34,500 24,000mi Truck, Hyundai Tucson 2023 $31,200 8,200mi SUV nuevo, Toyota Camry 2022 $26,400 21,000mi Sedan, Ford F-150 2021 $38,900 29,000mi Truck, Honda Civic 2023 $22,800 5,400mi Sedan nuevo. Aceptamos trade-in. Financiamiento todos los creditos desde $0 down. Horario Lun-Sab 9am-7pm. Captura nombre y telefono del prospecto. Maximo 3 oraciones. Responde en idioma del cliente.",
      messages: [{ role: "user", content: message }]
    });
    return res.json({ reply: response.content[0].text });
  } catch (e) {
    console.error("Demo autos error:", e.message);
    return res.json({ reply: "Disculpa, tuve un problema. Llámanos directamente." });
  }
});

























// ==========================================
// IvA SALES ASSISTANT - Conversational AI
// ==========================================
app.post("/api/iva-sales", aiLimiter, express.json(), async (req, res) => {
  const { message, history = [], lang = "es", context = {} } = req.body;

  const systemES = `Eres IvA, el asistente de ventas de Ivamar AI.

SOBRE IVAMAR AI:
- Empresa: Ivamar AI LLC, incorporada en Delaware, USA
- Sitio web: ivamarai.com
- Email: connect@ivamarai.com
- WhatsApp: +1 (863) 521-6708
- Fundador: Ivan Soto
- Misión: Crear asistentes digitales inteligentes para negocios locales

SERVICIOS Y PRECIOS:
- Asistente Digital Solo: $125 setup único + $29/mes (Starter) o $49/mes (Growth)
- Asistente Digital + Landing Page: $250 setup único + $29/mes o $49/mes
- Funciona en: web propia, link directo, Instagram bio, Facebook, WhatsApp, código QR
- No se necesita web propia — el link directo funciona solo
- Setup completo en 48 horas
- Sin contratos — cancela cuando quieras
- Soporte en español e inglés

QUÉ PUEDE HACER EL ASISTENTE:
- Responder preguntas 24/7 automáticamente
- Hablar cualquier idioma automáticamente
- Capturar leads: nombre, teléfono, email de forma natural
- Funcionar por link, QR en rótulos/flyers, web, redes sociales
- Bautizarlo con cualquier nombre que el cliente elija
- Personalidad y tono adaptado al negocio

IDEAS CREATIVAS DE USO POR INDUSTRIA:
REALTORS: Sticker con QR (5x5cm) pegado al letrero existente — el prospecto escanea y recibe info al instante. QR en tarjetas de presentación. QR en anuncios de Facebook. Link en bio de Instagram.
RESTAURANTES/FOOD TRUCKS: QR en mesa o ventana. Link en Instagram bio. QR en bolsas de take-out. Integración WhatsApp para ordenar.
CONTRACTORS/AC: QR en el vehículo de trabajo. QR en rótulos después de un trabajo. Link en anuncios para emergencias 24/7.
DEALERS DE AUTOS: QR en el parabrisas de cada vehículo — comprador escanea a las 2am. QR en rótulos del dealer para fines de semana.
BUFETES: QR en puerta de oficina para después de horas. Link en redes para pre-calificar clientes.
SALONES/SPAS: QR en recepción para agendar. Link en Instagram bio para reservaciones 24/7.
CUALQUIER NEGOCIO: Stickers de QR 5x5cm — económicos y se pegan en cualquier lugar. QR en firma de email. Link en perfil de Google Business.

REGLAS DE CONVERSACIÓN:
1. DETECTA EL IDIOMA del usuario y responde SIEMPRE en ese idioma.
2. DETECTA LA INTENCIÓN antes de responder.
3. Si el usuario PREGUNTA algo — respóndelo PRIMERO.
4. NO uses "IA" o "inteligencia artificial" — di "asistente digital".
5. NO presiones agresivamente por leads — captura orgánicamente.
6. Varía tus respuestas — no repitas frases ni emojis.
7. Máximo 4 oraciones por respuesta — conversacional y conciso.
8. Si preguntan por precios — da los precios exactos claramente.
9. Si preguntan por cancelación — confirma que es sin contratos, mes a mes.
10. Si preguntan quién creó IvA — di que es el asistente de Ivamar AI LLC.
11. Cuando sea relevante — sugiere ideas creativas de cómo usar el QR o link según su industria.
12. Cuando el usuario pregunte cómo comenzar o qué hacer para contratar — NUNCA des email ni teléfono. SIEMPRE termina con: "¿Listo para comenzar? 👉 ivamarai.com/cotizar"

CONTEXTO CONOCIDO DEL USUARIO:
- Nombre: ${context.name || "desconocido"}
- Tipo de negocio: ${context.businessType || "desconocido"}
- Tiene web: ${context.hasWebsite || "desconocido"}
- Ubicación: ${context.location || "desconocida"}

RECUERDA: Eres el DEMO del producto. La experiencia de conversar contigo ES la demostración.`;

  const systemEN = `You are IvA, the sales assistant for Ivamar AI.

ABOUT IVAMAR AI:
- Company: Ivamar AI LLC, incorporated in Delaware, USA
- Website: ivamarai.com
- Email: connect@ivamarai.com
- WhatsApp: +1 (863) 521-6708
- Founder: Ivan Soto
- Mission: Build smart digital assistants for local businesses

SERVICES & PRICING:
- Digital Assistant Only: $125 one-time setup + $29/month (Starter) or $49/month (Growth)
- Digital Assistant + Landing Page: $250 one-time setup + $29/month or $49/month
- Works on: existing website, direct link, Instagram bio, Facebook, WhatsApp, QR code
- No website needed — direct link works standalone
- Full setup in 48 hours
- No contracts — cancel anytime
- English and Spanish support

WHAT THE ASSISTANT CAN DO:
- Answer customer questions 24/7 automatically
- Speak any language automatically
- Capture leads: name, phone, email naturally during conversation
- Work via direct link, QR code on signs or flyers, website, social media
- Be named anything the client chooses
- Personality and tone adapted to the business

CREATIVE USE CASE IDEAS BY INDUSTRY:
REALTORS: QR sticker (2x2 inches) on existing yard signs — prospect scans and gets info instantly. QR on business cards. QR in Facebook ads. Link in Instagram bio.
RESTAURANTS/FOOD TRUCKS: QR on table or window. Link in Instagram bio. QR on takeout bags. WhatsApp integration to order directly.
CONTRACTORS/AC: QR on work vehicle. QR on yard signs after a job. Link in Facebook ads for 24/7 emergency calls.
CAR DEALERS: QR on each vehicle windshield — buyer scans at 2am. QR on dealer signage for weekends when lot is closed.
LAW FIRMS: QR on office door for after hours. Link on social media to pre-qualify clients.
SALONS/SPAS: QR at reception to book. Link in Instagram bio for 24/7 bookings.
ANY BUSINESS: 2x2 inch QR stickers — cheap, apply anywhere. QR in email signature. Link on Google Business profile.

CONVERSATION RULES:
1. DETECT THE LANGUAGE the user writes in and ALWAYS respond in that language.
2. DETECT INTENT before responding.
3. If the user ASKS something — answer it FIRST.
4. Do NOT use "AI" or "artificial intelligence" — say "digital assistant".
5. Do NOT aggressively push for leads — capture organically.
6. Vary your responses — don't repeat phrases or emojis.
7. Maximum 4 sentences per response — conversational and concise.
8. If asked about pricing — give exact prices clearly.
9. If asked about cancellation — confirm no contracts, month to month.
10. If asked who built IvA — say she is the assistant of Ivamar AI LLC.
11. When relevant — suggest creative ideas on how to use the QR or link for their industry.
12. When the user asks how to get started, what to do next, or how to hire — NEVER give email or phone. ALWAYS end with: "Ready to get started? 👉 ivamarai.com/quote"

KNOWN USER CONTEXT:
- Name: ${context.name || "unknown"}
- Business type: ${context.businessType || "unknown"}
- Has website: ${context.hasWebsite || "unknown"}
- Location: ${context.location || "unknown"}

REMEMBER: You ARE the product demo. The experience of talking to you IS the demonstration.`;

  const systemPrompt = lang === "en" ? systemEN : systemES;

  const messages = [
    ...(history || []),
    { role: "user", content: message }
  ];

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: systemPrompt,
      messages: messages
    });
    return res.json({ reply: response.content[0].text });
  } catch (e) {
    console.error("IvA Sales error:", e.message);
    const fallback = lang === "en"
      ? "Sorry, I had a technical issue. Please reach us on WhatsApp directly."
      : "Disculpa, tuve un problema técnico. Por favor escríbenos por WhatsApp directamente.";
    return res.json({ reply: fallback });
  }
});




// ==========================================
// GENERIC DEALER DEMO ASSISTANT - ES
// ==========================================
app.post("/api/dealer-demo-es", express.json(), async (req, res) => {
  const { message, history = [] } = req.body;

  const system = `Eres el asistente virtual de un dealer de autos — una demostración de Ivamar AI.

SOBRE ESTE DEMO:
Este es un ejemplo de cómo funcionaría un asistente digital para cualquier dealer de autos.
El asistente puede ser personalizado con el nombre, inventario y servicios de cualquier dealer.

LO QUE PUEDES HACER:
- Responder preguntas sobre inventario de vehículos
- Explicar opciones de financiamiento
- Guiar sobre trade-ins
- Agendar citas de servicio
- Agendar pruebas de manejo
- Capturar información del prospecto

PLANES DE IVAMAR AI PARA DEALERS:
- 1 dealer: $500 setup único + $149/mes
- 3 dealers: $1,200 setup único + $349/mes
- Grupo completo: $2,500 setup único + $599/mes
- Sin contratos — cancela cuando quieras
- Un QR y link directo por dealer
- Listo en 48 horas
- Para más información: connect@ivamarai.com

REGLAS:
1. Responde SIEMPRE en español
2. Sé amigable, profesional y conversacional
3. Máximo 4 oraciones por respuesta
4. Si preguntan por precios — da los planes enterprise
5. Si preguntan cómo empezar — manda a connect@ivamarai.com
6. Deja claro que esto es un demo de Ivamar AI`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system,
      messages: [...history, { role: "user", content: message }]
    });
    return res.json({ reply: response.content[0].text });
  } catch(e) {
    return res.json({ reply: "Tuve un problema técnico. Por favor escríbenos a connect@ivamarai.com" });
  }
});

// ==========================================
// GENERIC DEALER DEMO ASSISTANT
// ==========================================
app.post("/api/dealer-demo", express.json(), async (req, res) => {
  const { message, history = [] } = req.body;
  const lang = message.match(/[áéíóúñ¿¡]/i) ? 'es' : 'en';

  const system = lang === 'es' ? `Eres el asistente virtual de un dealer de autos — una demostración de Ivamar AI.

SOBRE ESTE DEMO:
Este es un ejemplo de cómo funcionaría un asistente digital para cualquier dealer de autos.
El asistente puede ser personalizado con el nombre, inventario y servicios de cualquier dealer.

LO QUE PUEDES HACER:
- Responder preguntas sobre inventario de vehículos
- Explicar opciones de financiamiento
- Guiar sobre trade-ins
- Agendar citas de servicio
- Agendar pruebas de manejo
- Capturar información del prospecto

PLANES DE IVAMAR AI PARA DEALERS:
- 1 dealer: $500 setup único + $149/mes
- 3 dealers: $1,200 setup único + $349/mes
- Grupo completo: $2,500 setup único + $599/mes
- Sin contratos — cancela cuando quieras
- Un QR y link directo por dealer
- Listo en 48 horas
- Para más información: connect@ivamarai.com

REGLAS:
1. Responde en español cuando el cliente escriba en español
2. Sé amigable, profesional y conversacional
3. Máximo 4 oraciones por respuesta
4. Si preguntan por precios — da los planes enterprise
5. Si preguntan cómo empezar — manda a connect@ivamarai.com
6. Deja claro que esto es un demo de Ivamar AI`
  : `You are a virtual assistant for a car dealership — a live demo by Ivamar AI.

ABOUT THIS DEMO:
This is an example of how a digital assistant would work for any car dealership.
The assistant can be customized with any dealer's name, inventory and services.

WHAT YOU CAN DO:
- Answer questions about vehicle inventory
- Explain financing options
- Guide customers through trade-ins
- Schedule service appointments
- Schedule test drives
- Capture prospect information

IVAMAR AI PLANS FOR DEALERSHIPS:
- 1 dealership: $500 one-time setup + $149/month
- 3 dealerships: $1,200 one-time setup + $349/month
- Full group: $2,500 one-time setup + $599/month
- No contracts — cancel anytime
- One QR code and direct link per dealership
- Ready in 48 hours
- For more info: connect@ivamarai.com

RULES:
1. Respond in English when customer writes in English
2. Respond in Spanish when customer writes in Spanish
3. Be friendly, professional and conversational
4. Maximum 4 sentences per response
5. If asked about pricing — give enterprise plans
6. If asked how to get started — direct to connect@ivamarai.com
7. Make clear this is a demo by Ivamar AI`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system,
      messages: [...history, { role: "user", content: message }]
    });
    return res.json({ reply: response.content[0].text });
  } catch(e) {
    return res.json({ reply: "Having a quick issue. Please email connect@ivamarai.com" });
  }
});

// ==========================================
// KIA DEALER DEMO ASSISTANT
// ==========================================

// ==========================================
// GENERIC DEALER DEMO ASSISTANT
// ==========================================
app.post("/api/dealer-demo", express.json(), async (req, res) => {
  const { message, history = [] } = req.body;
  const lang = message.match(/[áéíóúñ¿¡]/i) ? 'es' : 'en';

  const system = lang === 'es' ? `Eres un asistente virtual para un dealer de autos — este es un demo de Ivamar AI para mostrar cómo funciona un asistente digital para dealerships.

ESTE ES UN DEMO:
- Estás demostrando cómo funcionaría el asistente para cualquier dealer de autos
- El dealer puede ser Toyota, Honda, Kia, Ford, Chevrolet o cualquier marca
- El asistente se personaliza con la información real del dealer

LO QUE PUEDES HACER:
- Responder preguntas sobre inventario (nuevos y usados)
- Explicar opciones de financiamiento
- Guiar en el proceso de trade-in
- Agendar pruebas de manejo
- Responder en español e inglés automáticamente
- Capturar leads: nombre, teléfono, vehículo de interés

PLANES DISPONIBLES PARA DEALERS:
- 1 dealer: $500 setup único + $149/mes
- 3 dealers: $1,200 setup único + $349/mes
- Grupo completo: $2,500 setup único + $599/mes
- Sin contratos, cancela cuando quieras
- Un QR y link directo por dealer
- Setup en 48 horas

REGLAS:
1. Responde en español cuando el cliente escriba en español
2. Sé amigable, profesional y conversacional
3. Máximo 4 oraciones por respuesta
4. Si preguntan por precios — menciona los planes enterprise
5. Si preguntan cómo empezar — manda a connect@ivamarai.com`
  : `You are a virtual assistant for a car dealership — this is an Ivamar AI demo showing how a digital assistant works for any dealership.

THIS IS A DEMO:
- You're demonstrating how an assistant would work for any car dealership
- The dealer could be Toyota, Honda, Kia, Ford, Chevrolet or any brand
- The assistant gets customized with the real dealer's information

WHAT YOU CAN DO:
- Answer questions about inventory (new and used)
- Explain financing options
- Guide through trade-in process
- Schedule test drives
- Respond in English and Spanish automatically
- Capture leads: name, phone, vehicle of interest

PLANS AVAILABLE FOR DEALERS:
- 1 dealership: $500 one-time setup + $149/month
- 3 dealerships: $1,200 one-time setup + $349/month
- Full group: $2,500 one-time setup + $599/month
- No contracts, cancel anytime
- One QR code and direct link per dealer
- Ready in 48 hours

RULES:
1. Respond in English when customer writes in English
2. Respond in Spanish when customer writes in Spanish
3. Be friendly, professional and conversational
4. Maximum 4 sentences per response
5. If asked about pricing — mention enterprise plans
6. If asked how to get started — direct to connect@ivamarai.com`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system,
      messages: [...history, { role: "user", content: message }]
    });
    return res.json({ reply: response.content[0].text });
  } catch(e) {
    return res.json({ reply: "I'm having a quick issue. Please email connect@ivamarai.com" });
  }
});

app.post("/api/kia-demo", express.json(), async (req, res) => {
  const { message, history = [] } = req.body;
  const lang = message.match(/[áéíóúñ¿¡]/i) ? 'es' : 'en';

  const system = lang === 'es' ? `Eres el asistente virtual de Dyer Kia Lake Wales — un dealer de autos en Lake Wales, Florida.

INFORMACIÓN DEL DEALER:
- Nombre: Dyer Kia Lake Wales
- Dirección: 23280 US-27, Lake Wales, FL 33859
- Teléfono: (863) 676-0595
- Horario: Lun-Vie 7:30am-7pm, Sáb 8am-5pm, Dom cerrado
- Inventario: 373+ vehículos
- Rating: 4.3 estrellas con 479 reseñas

MODELOS DISPONIBLES:
- Kia Telluride: desde $38,490 (SUV 3 filas)
- Kia Sportage: desde $27,090 (SUV compacto)
- Kia Sorento: desde $32,490 (SUV mediano, híbrido disponible)
- Kia K5: desde $25,990 (sedán)
- Kia Soul, Forte, Carnival también disponibles

SERVICIOS:
- Venta de vehículos nuevos y usados
- Financiamiento para todo tipo de crédito
- Evaluación de trade-in
- Centro de servicio
- Pruebas de manejo disponibles
- Equipo bilingüe (inglés y español)
- Garantía: 10 años/100,000 millas tren motriz

ESTE DEMO ES PRESENTADO POR IVAMAR AI:
- Este es un ejemplo de cómo funciona un asistente digital para dealers
- El asistente puede ser personalizado con la información de cualquier dealer
- Planes enterprise disponibles desde $500 setup + $149/mes
- Un solo QR y link directo por dealer — no por vehículo
- Sin contratos, cancela cuando quieras
- Para más información: connect@ivamarai.com

REGLAS:
1. Responde en español cuando el cliente escriba en español
2. Sé amigable, profesional y conversacional
3. Máximo 4 oraciones por respuesta
4. Si preguntan por precios del asistente — menciona los planes enterprise
5. NO menciones QR por vehículo — es un QR y link por dealer
6. Si preguntan cómo empezar — manda a connect@ivamarai.com` 
  : `You are the virtual assistant for Dyer Kia Lake Wales — a car dealership in Lake Wales, Florida.

DEALER INFO:
- Name: Dyer Kia Lake Wales
- Address: 23280 US-27, Lake Wales, FL 33859
- Phone: (863) 676-0595
- Hours: Mon-Fri 7:30am-7pm, Sat 8am-5pm, Sun Closed
- Inventory: 373+ vehicles
- Rating: 4.3 stars with 479 reviews

AVAILABLE MODELS:
- Kia Telluride: from $38,490 (3-row SUV)
- Kia Sportage: from $27,090 (compact SUV)
- Kia Sorento: from $32,490 (midsize SUV, hybrid available)
- Kia K5: from $25,990 (sedan)
- Kia Soul, Forte, Carnival also available

SERVICES:
- New and used vehicle sales
- Financing for all credit types
- Trade-in appraisals
- Service center
- Test drives available
- Bilingual team (English & Spanish)
- Warranty: 10-year/100,000-mile powertrain

THIS DEMO IS PRESENTED BY IVAMAR AI:
- This is an example of how a digital assistant works for dealerships
- The assistant can be customized with any dealer's information
- Enterprise plans available from $500 setup + $149/month
- One QR code and direct link per dealership — not per vehicle
- No contracts, cancel anytime
- For more info: connect@ivamarai.com

RULES:
1. Respond in English when customer writes in English
2. Respond in Spanish when customer writes in Spanish
3. Be friendly, professional and conversational
4. Maximum 4 sentences per response
5. If asked about assistant pricing — mention enterprise plans
6. Do NOT mention QR per vehicle — it is one QR and link per dealer
7. If asked how to get started — direct to connect@ivamarai.com`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system,
      messages: [...history, { role: "user", content: message }]
    });
    return res.json({ reply: response.content[0].text });
  } catch(e) {
    return res.json({ reply: "I'm having a quick issue. Please call us at (863) 676-0595!" });
  }
});

app.post("/api/assistant", aiLimiter, async (req, res) => {
  const message = (req.body?.message || "").toString();
  const businessSlug = req.body?.businessSlug || null;

  let systemPrompt = "Eres IvA, el asistente virtual de Ivamar AI. Ayudas a negocios en Puerto Rico y USA con paginas web con IA, asistentes digitales y menus digitales. Responde en el idioma del cliente. Se amigable y conciso. Servicios: paginas web con asistente de IA, menus digitales para restaurantes y food trucks, asistentes digitales para cualquier negocio. Setup: $125. Mensual desde $49/mes. Primer mes gratis.";

  if (businessSlug === "demo") {
    systemPrompt = "Eres El Bori, el asistente boricua de El Rincon Boricua, un food truck en Puerto Rico. MENU: Mofongo con Camarones $14.99, Pernil Plate $13.99, Chuletas Can-Can $15.99, Alcapurrias de Pollo $8.99, Tostones con Mojo $5.99, Empanadillas x4 $7.99, Coquito Shake $5.99, Limonada Tamarindo $3.99, Malta Caribena $2.99, Tembleque $4.99, Arroz con Leche $3.99. UBICACION: Caguas, Puerto Rico. HORARIO: Mar-Jue 4pm-10pm, Vie 4pm-11pm, Sab-Dom 12pm-11pm, Lun Cerrado. DELIVERY: Si, $3 adicional. PICKUP: Gratis. PERSONALIDAD: Boricua autentico de Puerto Rico. Usa: brutal, riquísimo, espectacular, a otro nivel, wepa, duro, al punto. Para tiempo: ahora, en pal de minutos. NUNCA uses: ahorita, que lo que, expresiones mexicanas o dominicanas. Responde en el idioma del cliente. Maximo 3 oraciones.";
  } else if (businessSlug) {
    const bizFile = path.join(__dirname, "..", "data", "businesses", `${businessSlug}.json`);
    if (fs.existsSync(bizFile)) {
      try {
        const biz = JSON.parse(fs.readFileSync(bizFile, "utf8"));
        systemPrompt = `Eres ${biz.assistant?.name || "IvA"}, un asistente de IA para ${biz.name}. Tipo: ${biz.headline || "Negocio local"}. Descripcion: ${biz.description || ""}. Direccion: ${biz.address || ""}. Horario: ${biz.hours || ""}. Estado: ${biz.status || "abierto"}. WhatsApp: ${biz.links?.whatsapp || ""}. Menu: ${(biz.menu || []).map(i => i.name + (i.price ? " $" + i.price : "")).join(", ")}. Bebidas: ${(biz.drinks || []).map(i => i.name + (i.price ? " $" + i.price : "")).join(", ")}. Tono: ${biz.assistant?.tone || "amistoso y profesional"}. Responde en el idioma del cliente. Maximo 3 oraciones. Cuando el cliente quiera ordenar, guialo a WhatsApp.`;
      } catch (e) {
        console.error("Error loading business:", e.message);
      }
    }
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: "user", content: message }]
    });
    return res.json({ reply: response.content[0].text });
  } catch (e) {
    console.error("Claude API error:", e.status, e.message);
    return res.json({ reply: "Disculpa, tuve un problema tecnico. Por favor escribeme directamente por WhatsApp." });
  }
});

// ==========================================
// START FORM
// ==========================================

app.get("/start", (req, res) => {
  const body = `
  <div class="card">
    <h1>Comienza tu página con Ivamar AI</h1>
    <p style="margin-bottom:20px;">En menos de 48 horas tu negocio tiene su propia página con asistente de IA.</p>
    <form method="POST" action="/start">
      <label>Nombre del negocio</label>
      <input type="text" name="businessName" placeholder="Ej. El Rincón Boricua" required style="margin-bottom:16px;padding:10px;" />
      <label>Nombre del dueño</label>
      <input type="text" name="ownerName" placeholder="Tu nombre" required style="margin-bottom:16px;padding:10px;" />
      <label>Email</label>
      <input type="email" name="email" placeholder="ejemplo@email.com" required style="margin-bottom:16px;padding:10px;" />
      <label>WhatsApp</label>
      <input type="text" name="whatsapp" placeholder="787-000-0000" required style="margin-bottom:16px;padding:10px;" />
      <label>Tipo de negocio</label>
      <select name="businessType" required style="margin-bottom:16px;padding:10px;">
        <option value="">Selecciona</option>
        <option>Food Truck</option><option>Restaurante</option><option>Panadería</option>
        <option>Cafetería</option><option>Dealer de Autos</option><option>Salón de Belleza</option>
        <option>Servicios Profesionales</option><option>Otro</option>
      </select>
      <label>Descripción</label>
      <textarea name="description" rows="3" placeholder="Describe tu negocio" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Menú o servicios</label>
      <textarea name="menu" rows="5" placeholder="Ej. Tripleta - $12" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Bebidas</label>
      <textarea name="drinks" rows="3" placeholder="Ej. Refresco - $2" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Dirección</label>
      <input type="text" name="address" placeholder="Ej. PR-2 Km 45, Arecibo, PR" style="margin-bottom:16px;padding:10px;" />
      <label>Horario</label>
      <input type="text" name="hours" placeholder="Lunes a Domingo 11am-9pm" style="margin-bottom:16px;padding:10px;" />
      <label>Logo (link)</label>
      <input type="text" name="logoUrl" placeholder="https://..." style="margin-bottom:16px;padding:10px;" />
      <div style="margin:24px 0;padding:16px;border:1px solid #ddd;border-radius:8px;">
        <p><b>Setup: $125</b> · <b>Mensual: $49</b></p>
        <p style="font-size:0.85rem;margin-top:4px;">Primer mes incluido gratis</p>
      </div>
      <div class="btns">
        <button class="btn primary" type="submit">Continuar</button>
        <a class="btn ghost" href="/">Volver</a>
      </div>
    </form>
  </div>`;
  res.send(layout({ title: "Start Now — Ivamar AI", body }));
});

app.post("/start", async (req, res) => {
  const { businessName = "", ownerName = "", email = "", whatsapp = "", businessType = "", description = "", menu = "", drinks = "", logoUrl = "", address = "", hours = "" } = req.body || {};
  const slug = businessName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  function parseItems(text) {
    return (text || "").split("\n").map(l => l.trim()).filter(Boolean).map(line => {
      const m = line.match(/^(.*?)-\s*\$?(\d+(?:\.\d{1,2})?)$/);
      if (m) return { name: m[1].trim(), price: Number(m[2]), desc: "" };
      return { name: line, price: null, desc: "" };
    });
  }

  const businessData = {
    slug, name: businessName,
    headline: `${businessType || "Negocio local"} con Ivamar AI`,
    description: description || "Próximamente más información.",
    logoUrl, businessPhotoUrl: "", address, hours, status: "abierto", theme: "light",
    assistant: { name: "IvA", tone: "amistoso y profesional", welcome: `¡Hola! Soy IvA, el asistente de ${businessName}. ¿En qué te ayudo hoy?`, keywords: [], avatarUrl: "" },
    links: { whatsapp: whatsapp ? `https://wa.me/${String(whatsapp).replace(/\D/g, "")}` : "#", instagram: "#", googleMaps: "#" },
    menu: parseItems(menu).length ? parseItems(menu) : [{ name: "Menú pendiente", price: 0, desc: "" }],
    sides: [], drinks: parseItems(drinks), desserts: []
  };

  const bizFile = path.join(__dirname, "..", "data", "businesses", `${slug}.json`);
  fs.writeFileSync(bizFile, JSON.stringify(businessData, null, 2), "utf8");

  const siteUrl = `${req.protocol}://${req.get("host")}`;

  // Direct Stripe checkout — no longer depends on ivamar-brain
  if (stripe && email && email.includes("@")) {
    try {
      const customers = await stripe.customers.list({ email, limit: 1 });
      const customer = customers.data.length > 0
        ? customers.data[0]
        : await stripe.customers.create({ email, name: ownerName || undefined });

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer: customer.id,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Ivamar AI — ${businessName}`,
                description: "Setup + Monthly subscription"
              },
              unit_amount: 4900, // $49.00/mo
              recurring: { interval: "month" }
            },
            quantity: 1
          }
        ],
        metadata: { slug, businessName, ownerName: ownerName || "", businessType: businessType || "" },
        success_url: `${siteUrl}/${slug}`,
        cancel_url: `${siteUrl}/start`
      });

      if (session.url) return res.redirect(session.url);
    } catch (e) {
      console.error("Stripe checkout error:", e.message);
    }
  }

  return res.redirect(`/${slug}`);
});

// ==========================================
// DYNAMIC BUSINESS PAGES
// ==========================================




// ==========================================
// CLOUDINARY PHOTO UPLOAD
// ==========================================
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.post("/api/upload-photo", express.json({ limit: '10mb' }), async (req, res) => {
  try {
    const { data } = req.body; // base64 image
    if (!data) return res.json({ ok: false, error: 'No image data' });
    
    const result = await cloudinary.uploader.upload(data, {
      folder: 'caribex-listings',
      transformation: [
        { width: 800, height: 600, crop: 'fill', gravity: 'auto' },
        { fetch_format: 'auto', quality: 'auto' }
      ]
    });
    
    return res.json({ ok: true, url: result.secure_url });
  } catch(e) {
    console.error('Upload error:', e);
    return res.json({ ok: false, error: e.message });
  }
});

// ==========================================
// CARIBEX DIRECTORY — LISTING SUBMISSION
// ==========================================
app.post("/api/listing-submit", formLimiter, express.json(), async (req, res) => {
  console.log("📋 Listing submit received:", req.body?.name);
  const name = sanitize(req.body.name);
  const category = sanitize(req.body.category);
  const destination = sanitize(req.body.destination);
  const desc = sanitize(req.body.desc);
  const fullDesc = sanitize(req.body.fullDesc);
  const email = sanitize(req.body.email);
  const whatsapp = sanitize(req.body.whatsapp);
  const website = sanitize(req.body.website);
  const photo = sanitize(req.body.photo);
  const price = sanitize(req.body.price);

  if (!name || !category || !destination || !desc || !fullDesc || !email || !photo) {
    return res.json({ ok: false, error: "Missing required fields" });
  }

  try {
    // Save to pending listings file
    const fs2 = require('fs');
    const path = require('path');
    const pendingFile = path.join('/data/listings/pending.json');
    
    let pending = [];
    if (fs2.existsSync(pendingFile)) {
      pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    }
    
    const listing = {
      id: Date.now().toString(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      name, category, destination, desc, fullDesc, email, whatsapp, website, photo, price
    };
    
    // Generate approval tokens
    const crypto = require('crypto');
    listing.approveToken = crypto.randomBytes(32).toString('hex');
    listing.rejectToken = crypto.randomBytes(32).toString('hex');

    pending.push(listing);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

    // Send email notification via Resend
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const approveUrl = 'https://ivamarai.com/admin/approve/' + listing.approveToken;
    const rejectUrl = 'https://ivamarai.com/admin/reject/' + listing.rejectToken;
    
    console.log("📧 Sending email via Resend...");
    await resend.emails.send({
      from: 'Caribex <connect@ivamarai.com>',
      to: 'connect@ivamarai.com',
      subject: 'New Caribex Listing: ' + name,
      html: `
        <h2>New Business Listing Submission</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Business</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Category</td><td style="padding:8px;border:1px solid #ddd">${category}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Destination</td><td style="padding:8px;border:1px solid #ddd">${destination}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">WhatsApp</td><td style="padding:8px;border:1px solid #ddd">${whatsapp || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Website</td><td style="padding:8px;border:1px solid #ddd">${website || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Price Range</td><td style="padding:8px;border:1px solid #ddd">${price || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Short Desc</td><td style="padding:8px;border:1px solid #ddd">${desc}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Full Desc</td><td style="padding:8px;border:1px solid #ddd">${fullDesc}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Photo</td><td style="padding:8px;border:1px solid #ddd"><img src="${photo}" style="max-width:200px"></td></tr>
        </table>
        <br>
        <p><strong>Listing ID:</strong> ${listing.id}</p>
        <p style="margin-top:2rem;">
            <a href="${approveUrl}" style="background:#00B4D8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;margin-right:10px">✅ Approve Listing</a>
            <a href="${rejectUrl}" style="background:#fff;color:#e53e3e;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;border:1px solid #e53e3e">❌ Reject Listing</a>
          </p>
      `
    });

    console.log("✅ Email sent successfully");
    return res.json({ ok: true });
  } catch(e) {
    console.error('❌ Listing submit error:', e.message);
    return res.json({ ok: false, error: e.message });
  }
});


// ==========================================
// CARIBEX DIRECTORY — APPROVE BY TOKEN
// ==========================================
app.get("/admin/approve/:token", async (req, res) => {
  try {
    const fs2 = require('fs');
    const pendingFile = '/data/listings/pending.json';
    if (!fs2.existsSync(pendingFile)) return res.send('<h2>Listing not found.</h2>');
    let pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    const listing = pending.find(l => l.approveToken === req.params.token);
    if (!listing) return res.send('<h2 style="font-family:sans-serif;color:#e53e3e;padding:2rem">Token invalid or already used.</h2>');
    const approvedFile = '/data/listings/' + listing.destination + '.json';
    let approved = [];
    if (fs2.existsSync(approvedFile)) approved = JSON.parse(fs2.readFileSync(approvedFile, 'utf8'));
    listing.status = 'approved';
    listing.approvedAt = new Date().toISOString();
    delete listing.approveToken;
    delete listing.rejectToken;
    approved.push(listing);
    fs2.writeFileSync(approvedFile, JSON.stringify(approved, null, 2));
    pending = pending.filter(l => l.id !== listing.id);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));
    console.log('📧 Sending approval email to:', listing.email);
    try {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const destUrl = 'https://yourcaribbeanexpert.com/caribex/' + listing.destination;
      await resend.emails.send({
        from: 'Caribex <connect@ivamarai.com>',
        to: listing.email,
        subject: '🎉 Your business is live on Caribex!',
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#0D1B2A,#0077B6);padding:2rem;text-align:center;border-radius:12px 12px 0 0;">
            <h1 style="color:#fff;font-size:1.5rem;margin:0">🌴 You're live on Caribex!</h1>
          </div>
          <div style="padding:2rem;background:#fff;border:1px solid #E0EEF4;">
            <p>Hi there,</p>
            <p><strong>${listing.name}</strong> is now live on Caribex!</p>
            <div style="text-align:center;margin:2rem 0;">
              <a href="${destUrl}" style="background:#00B4D8;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">View Your Listing →</a>
            </div>
            <hr style="border:none;border-top:1px solid #E0EEF4;margin:2rem 0;">
            <h2 style="font-size:1.1rem;color:#0D1B2A;">⭐ Upgrade to Featured — $19/month</h2>
            <ul style="font-size:0.9rem;color:#555;line-height:1.8;"><li>🔝 Top position</li><li>✅ Verified badge</li><li>📸 Larger photo</li></ul>
            <div style="text-align:center;margin:1.5rem 0;">
              <a href="https://buy.stripe.com/bJe5kDdmaaKG4Jy7vyf3a07" style="background:#0077B6;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">Upgrade to Featured →</a>
            </div>
            <hr style="border:none;border-top:1px solid #E0EEF4;margin:2rem 0;">
            <h2 style="font-size:1.1rem;color:#0D1B2A;">🤖 Want an AI assistant?</h2>
            <p style="font-size:0.9rem;color:#555;">Give your customers instant answers 24/7 with Ivamar AI.</p>
            <div style="text-align:center;margin:1.5rem 0;">
              <a href="https://ivamarai.com/quote" style="background:#0D1B2A;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">Get Your AI Assistant →</a>
            </div>
          </div>
          <div style="padding:1rem;text-align:center;background:#F0F8FF;border-radius:0 0 12px 12px;">
            <p style="font-size:0.75rem;color:#888;">© 2026 Caribex — yourcaribbeanexpert.com</p>
          </div>
        </div>`
      });
    } catch(e) { console.error('Approval email error:', e.message); }
    return res.send(`<div style="font-family:sans-serif;text-align:center;padding:3rem;max-width:500px;margin:0 auto;">
      <div style="font-size:3rem;margin-bottom:1rem">🌴</div>
      <h2 style="color:#0D1B2A">Listing Approved!</h2>
      <p style="color:#555;margin:1rem 0">${listing.name} is now live on Caribex.</p>
      <a href="https://ivamarai.com/admin/listings" style="background:#00B4D8;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:700">View All Listings →</a>
    </div>`);
  } catch(e) {
    return res.send('<h2 style="font-family:sans-serif;color:#e53e3e;padding:2rem">Error: ' + e.message + '</h2>');
  }
});

// CARIBEX DIRECTORY — REJECT BY TOKEN
app.get("/admin/reject/:token", async (req, res) => {
  try {
    const fs2 = require('fs');
    const pendingFile = '/data/listings/pending.json';
    if (!fs2.existsSync(pendingFile)) return res.send('<h2>Listing not found.</h2>');
    let pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    const listing = pending.find(l => l.rejectToken === req.params.token);
    if (!listing) return res.send('<h2 style="font-family:sans-serif;color:#e53e3e;padding:2rem">Token invalid or already used.</h2>');
    pending = pending.filter(l => l.id !== listing.id);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));
    try {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Caribex <connect@ivamarai.com>',
        to: listing.email,
        subject: 'Your Caribex listing submission',
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#0D1B2A,#0077B6);padding:2rem;text-align:center;border-radius:12px 12px 0 0;">
            <h1 style="color:#fff;font-size:1.5rem;margin:0">🌴 Caribex Directory</h1>
          </div>
          <div style="padding:2rem;background:#fff;border:1px solid #E0EEF4;">
            <p>Hi there,</p>
            <p>Thank you for submitting <strong>${listing.name}</strong>. After review, we were unable to approve your listing at this time.</p>
            <p style="font-size:0.9rem;color:#555;">Questions? Contact us at <a href="mailto:connect@ivamarai.com" style="color:#00B4D8;">connect@ivamarai.com</a></p>
            <div style="text-align:center;margin:2rem 0;">
              <a href="https://yourcaribbeanexpert.com/caribex/list-your-business" style="background:#00B4D8;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">Resubmit →</a>
            </div>
          </div>
          <div style="padding:1rem;text-align:center;background:#F0F8FF;border-radius:0 0 12px 12px;">
            <p style="font-size:0.75rem;color:#888;">© 2026 Caribex — yourcaribbeanexpert.com</p>
          </div>
        </div>`
      });
    } catch(e) { console.error('Rejection email error:', e.message); }
    return res.send(`<div style="font-family:sans-serif;text-align:center;padding:3rem;max-width:500px;margin:0 auto;">
      <h2 style="color:#0D1B2A">Listing Rejected</h2>
      <p style="color:#555;margin:1rem 0">${listing.name} has been removed.</p>
      <a href="https://ivamarai.com/admin/listings" style="background:#00B4D8;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:700">View All Listings →</a>
    </div>`);
  } catch(e) {
    return res.send('<h2 style="font-family:sans-serif;color:#e53e3e;padding:2rem">Error: ' + e.message + '</h2>');
  }
});


// CARIBEX DIRECTORY — REMOVE APPROVED LISTING
app.post("/admin/listings/remove/:destination/:id", requireAdmin, async (req, res) => {
  try {
    const fs2 = require('fs');
    const approvedFile = '/data/listings/' + req.params.destination + '.json';
    if (!fs2.existsSync(approvedFile)) return res.json({ ok: false, error: 'File not found' });
    let approved = JSON.parse(fs2.readFileSync(approvedFile, 'utf8'));
    approved = approved.filter(l => l.id !== req.params.id);
    fs2.writeFileSync(approvedFile, JSON.stringify(approved, null, 2));
    return res.json({ ok: true });
  } catch(e) {
    return res.json({ ok: false, error: e.message });
  }
});

// CARIBEX DIRECTORY — LISTINGS COUNT FOR ADMIN DASHBOARD
app.get("/api/listings-count", requireAdmin, (req, res) => {
  try {
    const fs2 = require('fs');
    const pendingFile = '/data/listings/pending.json';
    const pending = fs2.existsSync(pendingFile) ? JSON.parse(fs2.readFileSync(pendingFile, 'utf8')) : [];
    
    const listingsDir = '/data/listings';
    let approved = 0;
    let featured = 0;
    if (fs2.existsSync(listingsDir)) {
      fs2.readdirSync(listingsDir).forEach(file => {
        if (file !== 'pending.json' && file.endsWith('.json')) {
          try {
            const listings = JSON.parse(fs2.readFileSync(require('path').join(listingsDir, file), 'utf8'));
            approved += listings.length;
            featured += listings.filter(l => l.featured).length;
          } catch(e) {}
        }
      });
    }
    
    return res.json({ pending: pending.length, approved, featured });
  } catch(e) {
    return res.json({ pending: 0, approved: 0, featured: 0 });
  }
});


// ==========================================
// CARIBEX NEWSLETTER SUBSCRIBE
// ==========================================
app.post("/api/caribex-subscribe", express.json(), async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) return res.json({ ok: false });

    // Save to subscribers file
    const subscribersFile = '/data/caribex-subscribers.json';
    let subscribers = [];
    if (require('fs').existsSync(subscribersFile)) {
      subscribers = JSON.parse(require('fs').readFileSync(subscribersFile, 'utf8'));
    }
    if (subscribers.find(s => s.email === email)) return res.json({ ok: true }); // already subscribed
    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    require('fs').writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));

    // Notify Ivan
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Caribex <connect@ivamarai.com>',
      to: 'connect@ivamarai.com',
      subject: 'New Caribex Subscriber: ' + email,
      html: '<p>New subscriber: <strong>' + email + '</strong></p><p>Total subscribers: ' + subscribers.length + '</p>'
    });

    // Add to Brevo list
    try {
      const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify({
          email: email,
          listIds: [3],
          updateEnabled: true
        })
      });
      console.log('📋 Brevo response:', brevoRes.status);
    } catch(brevoErr) {
      console.error('Brevo error:', brevoErr.message);
    }

    // Welcome email to subscriber
    await resend.emails.send({
      from: 'Caribex <connect@ivamarai.com>',
      to: email,
      subject: '🌴 Welcome to Caribex!',
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#0D1B2A,#0077B6);padding:2rem;text-align:center;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;font-size:1.5rem;margin:0">🌴 Welcome to Caribex!</h1>
        </div>
        <div style="padding:2rem;background:#fff;border:1px solid #E0EEF4;">
          <p style="font-size:1rem;color:#333">You're now part of the Caribex community — the Caribbean travel guide built by people who actually know the islands.</p>
          <p style="font-size:0.9rem;color:#555">Expect travel insights, destination guides and hidden gems delivered to your inbox.</p>
          <div style="text-align:center;margin:2rem 0;">
            <a href="https://yourcaribbeanexpert.com" style="background:#00B4D8;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">Explore the Caribbean →</a>
          </div>
        </div>
        <div style="padding:1rem;text-align:center;background:#F0F8FF;border-radius:0 0 12px 12px;">
          <p style="font-size:0.75rem;color:#888;">© 2026 Caribex — yourcaribbeanexpert.com · A project by Ivamar AI LLC</p>
        </div>
      </div>`
    });

    return res.json({ ok: true });
  } catch(e) {
    console.error('Subscribe error:', e.message);
    return res.json({ ok: false });
  }
});

// ==========================================
// BLOGGER RSS PROXY
// ==========================================
app.get("/api/blog-feed", async (req, res) => {
  try {
    const r = await fetch("https://blog.yourcaribbeanexpert.com/feeds/posts/default?alt=json&max-results=4");
    const data = await r.json();
    res.set("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: "Feed unavailable" });
  }
});


// ==========================================
// BLOGGER RSS PROXY
// ==========================================
app.get("/api/blog-feed", async (req, res) => {
  try {
    const r = await fetch("https://blog.yourcaribbeanexpert.com/feeds/posts/default?alt=json&max-results=4");
    const data = await r.json();
    res.set("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: "Feed unavailable" });
  }
});

// ==========================================
// SEO — SITEMAP & ROBOTS
// ==========================================
app.get("/sitemap.xml", (req, res) => {
  const base = "https://yourcaribbeanexpert.com";
  const destinations = [
    'puerto-rico','dominican-republic','cuba','jamaica','grand-cayman',
    'haiti','vieques-culebra','barbados','santa-lucia','trinidad-tobago',
    'sint-maarten','martinique','guadeloupe','st-barths','grenada',
    'antigua','dominica','st-kitts-nevis','aruba','curacao','bonaire',
    'usvi','bvi','turks-caicos','bahamas','tulum','cartagena','san-andres',
    'costa-rica','belize','panama','roatan','venezuela','corn-islands',
    'guatemala-caribbean'
  ];

  const urls = [
    `<url><loc>${base}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${base}/caribex</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    `<url><loc>${base}/caribex/directory-terms</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    `<url><loc>${base}/caribex/list-your-business</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    ...destinations.map(slug =>
      `<url><loc>${base}/caribex/${slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    )
  ].join("\n  ");

  res.header("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`);
});

app.get("/robots.txt", (req, res) => {
  res.header("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://yourcaribbeanexpert.com/sitemap.xml`);
});


// Generic place photo endpoint for Planeta Boricua viajes

app.get("/api/place-photo", async (req, res) => {
  try {
    const q = req.query.q || 'travel destination';
    const url = await getPlacePhoto(q, 600, q);
    res.json({ url: url || null });
  } catch(e) {
    res.json({ url: null });
  }
});

app.get("/autoridad-energia-criolla", (req, res) => res.send(aecDemo));
app.get("/noticias", (req, res) => res.send(pbNoticias));

// PB Blog routes
const pbBlogRouter = require("./routes/pb-blog");
app.use("/blog", pbBlogRouter);

// Blogger auto-sync
const bloggerSync = require("./routes/blogger-sync");
app.use("/api/blogger", bloggerSync);


// Redirects for old blog URLs that Google has indexed
app.get('/planeta-boricua-blog', (req, res) => res.redirect(301, 'https://blog.masboricuaqueunmofongo.com'));
app.get('/planeta-boricua-blog/:path', (req, res) => res.redirect(301, 'https://blog.masboricuaqueunmofongo.com'));
app.get('/inicio', (req, res) => res.redirect(301, 'https://blog.masboricuaqueunmofongo.com'));
app.get('/:year/:month/:slug', (req, res) => {
  const { year, month, slug } = req.params;
  if (/^\d{4}$/.test(year) && /^\d{2}$/.test(month)) {
    res.redirect(301, 'https://blog.masboricuaqueunmofongo.com/' + year + '/' + month + '/' + slug);
  } else {
    res.status(404).send('Not found');
  }
});

app.get("/:slug", (req, res) => {
  try { decodeURIComponent(req.params.slug); } catch(e) { return res.status(400).send("Invalid URL"); }
  const slug = req.params.slug;

  // Ignore static file requests (let express.static handle them)
  if (/\.(png|jpg|jpeg|gif|svg|ico|js|css|webp|mp4|pdf|txt|xml|json)$/i.test(slug)) {
    return res.status(404).send('Not found');
  }

  // Ignore known demo and app routes
  const knownRoutes = ['autoridad-energia-criolla', 'pb', 'caribex', 'admin', 'api', 'start', 'demo', 'dyerkia', 'adis', 'noticias', 'mr-frappe', 'florida'];
  if (knownRoutes.includes(slug)) {
    return res.status(404).send('Not found');
  }

  const businessFile = path.join(__dirname, "..", "data", "businesses", `${slug}.json`);
  const clientsFilePath = path.join(__dirname, "..", "data", "clients.json");

  if (fs.existsSync(businessFile)) {
    const data = JSON.parse(fs.readFileSync(businessFile, "utf-8"));
    const theme = data.theme || "light";
    let pageStyle = "";
    if (theme === "dark") pageStyle = "background:#111;color:#f5f5f5;";
    else if (theme === "tropical") pageStyle = "background:linear-gradient(180deg,#fff8e7 0%,#ffe8c2 100%);color:#2b1d0e;";
    else pageStyle = "background:#ffffff;color:#111111;";

    const assistantName = data.assistant?.name || "IvA";
    const assistantWelcome = data.assistant?.welcome || "¡Hola! ¿En qué te ayudo hoy?";
    const whatsappNumber = (data.links?.whatsapp || "").replace(/\D/g, "");
    const hours = typeof data.hours === "string" ? data.hours : "";

    let statusLabel = "";
    if (data.status === "cerrado") statusLabel = "🔴 Cerrado";
    else if (data.status === "vacaciones") statusLabel = "🌴 Vacaciones";
    else if (data.status === "feriado") statusLabel = "📅 Feriado";
    else statusLabel = "🟢 Open";

    const chatHTML = `
<style>
.iva-chat-section{margin-top:40px;padding:24px;background:#0D1420;border-radius:16px;border:1px solid rgba(0,229,200,0.15);}
.iva-chat-section h3{font-family:sans-serif;font-size:18px;font-weight:700;color:#F0F4FF;margin-bottom:4px;}
.iva-chat-section p{font-size:13px;color:#8892A4;margin-bottom:16px;}
.iva-chat-box{background:#080C12;border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden;}
.iva-chat-topbar{background:#111827;padding:12px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,0.05);}
.iva-chat-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#00E5C8,#00a896);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.iva-chat-agent{flex:1;}
.iva-chat-agent-name{font-size:13px;font-weight:700;color:#F0F4FF;}
.iva-chat-agent-status{font-size:11px;color:#4CAF50;display:flex;align-items:center;gap:4px;}
.iva-chat-agent-status::before{content:'●';font-size:8px;}
.iva-chat-msgs{height:280px;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}
.iva-msg{max-width:82%;display:flex;flex-direction:column;gap:3px;}
.iva-msg.bot{align-self:flex-start;}
.iva-msg.user{align-self:flex-end;}
.iva-msg-bubble{padding:10px 13px;border-radius:12px;font-size:13px;line-height:1.5;font-family:sans-serif;}
.iva-msg.bot .iva-msg-bubble{background:#1C2536;color:#F0F4FF;border-bottom-left-radius:4px;}
.iva-msg.user .iva-msg-bubble{background:#00E5C8;color:#030508;border-bottom-right-radius:4px;font-weight:500;}
.iva-msg-time{font-size:10px;color:#4A5568;}
.iva-msg.user .iva-msg-time{text-align:right;}
.iva-typing{display:flex;gap:3px;padding:10px 13px;background:#1C2536;border-radius:12px;border-bottom-left-radius:4px;width:fit-content;}
.iva-typing span{width:5px;height:5px;background:#8892A4;border-radius:50%;animation:ivaTyping 1.2s ease-in-out infinite;}
.iva-typing span:nth-child(2){animation-delay:0.2s;}
.iva-typing span:nth-child(3){animation-delay:0.4s;}
@keyframes ivaTyping{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}
.iva-suggestions{display:flex;gap:6px;flex-wrap:wrap;padding:8px 16px;}
.iva-suggestion{padding:5px 10px;background:rgba(0,229,200,0.07);border:1px solid rgba(0,229,200,0.2);border-radius:100px;font-size:11px;color:#00E5C8;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
.iva-suggestion:hover{background:rgba(0,229,200,0.15);}
.iva-chat-input-area{padding:12px 16px;border-top:1px solid rgba(255,255,255,0.05);display:flex;gap:8px;align-items:center;}
.iva-chat-input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 14px;color:#F0F4FF;font-family:sans-serif;font-size:13px;outline:none;}
.iva-chat-input:focus{border-color:rgba(0,229,200,0.4);}
.iva-chat-input::placeholder{color:#4A5568;}
.iva-chat-send{width:36px;height:36px;background:#00E5C8;border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;flex-shrink:0;}
.iva-float-btn{position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:linear-gradient(135deg,#00E5C8,#00a896);border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 8px 25px rgba(0,229,200,0.35);z-index:999;transition:all 0.3s;}
.iva-float-btn:hover{transform:scale(1.1);}
.iva-float-badge{position:absolute;top:-2px;right:-2px;width:16px;height:16px;background:#4CAF50;border-radius:50%;border:2px solid white;}
.iva-float-panel{position:fixed;bottom:90px;right:24px;width:300px;max-height:420px;background:#0D1420;border:1px solid rgba(0,229,200,0.2);border-radius:16px;overflow:hidden;z-index:998;display:none;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.5);}
.iva-float-panel.open{display:flex;}
.iva-float-header{background:#111827;padding:12px 14px;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,0.05);}
.iva-float-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#00E5C8,#00a896);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}
.iva-float-info{flex:1;}
.iva-float-name{font-size:11px;font-weight:700;color:#F0F4FF;}
.iva-float-status{font-size:10px;color:#4CAF50;}
.iva-float-close{background:transparent;border:none;color:#4A5568;font-size:15px;cursor:pointer;}
.iva-float-msgs{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px;}
.iva-float-input-area{padding:8px 10px;border-top:1px solid rgba(255,255,255,0.05);display:flex;gap:6px;}
.iva-float-input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:7px;padding:7px 10px;color:#F0F4FF;font-family:sans-serif;font-size:12px;outline:none;}
.iva-float-input::placeholder{color:#4A5568;}
.iva-float-send{width:30px;height:30px;background:#00E5C8;border:none;border-radius:7px;cursor:pointer;font-size:11px;}
</style>

<div class="iva-chat-section">
  <h3>💬 Chat with ${assistantName}</h3>
  <p>Your AI assistant available 24/7 — in English & Spanish.</p>
  <div class="iva-chat-box">
    <div class="iva-chat-topbar">
      <div class="iva-chat-avatar">🤖</div>
      <div class="iva-chat-agent">
        <div class="iva-chat-agent-name">${assistantName} — ${data.name}</div>
        <div class="iva-chat-agent-status">Online now</div>
      </div>
    </div>
    <div class="iva-chat-msgs" id="ivaMsgs">
      <div class="iva-msg bot">
        <div class="iva-msg-bubble">${assistantWelcome}</div>
        <div class="iva-msg-time">Now</div>
      </div>
    </div>
    <div class="iva-suggestions" id="ivaSuggestions">
      <span class="iva-suggestion" onclick="ivaSendSugg(this)">What's on the menu?</span>
      <span class="iva-suggestion" onclick="ivaSendSugg(this)">What are the hours?</span>
      <span class="iva-suggestion" onclick="ivaSendSugg(this)">How do I order?</span>
    </div>
    <div class="iva-chat-input-area">
      <input class="iva-chat-input" id="ivaInput" placeholder="Escribe tu pregunta..." onkeydown="if(event.key==='Enter')ivaSend('main')" />
      <button class="iva-chat-send" onclick="ivaSend('main')">➤</button>
    </div>
  </div>
</div>

<button class="iva-float-btn" onclick="ivaToggleFloat()">
  🤖<div class="iva-float-badge"></div>
</button>
<div class="iva-float-panel" id="ivaFloatPanel">
  <div class="iva-float-header">
    <div class="iva-float-avatar">🤖</div>
    <div class="iva-float-info">
      <div class="iva-float-name">${assistantName} — ${data.name}</div>
      <div class="iva-float-status">● En línea</div>
    </div>
    <button class="iva-float-close" onclick="ivaToggleFloat()">✕</button>
  </div>
  <div class="iva-float-msgs" id="ivaFloatMsgs">
    <div class="iva-msg bot">
      <div class="iva-msg-bubble">${assistantWelcome}</div>
      <div class="iva-msg-time">Now</div>
    </div>
  </div>
  <div class="iva-float-input-area">
    <input class="iva-float-input" id="ivaFloatInput" placeholder="Escribe aquí..." onkeydown="if(event.key==='Enter')ivaSend('float')" />
    <button class="iva-float-send" onclick="ivaSend('float')">➤</button>
  </div>
</div>

<script>
const IVA_SLUG = "${slug}";
function ivaToggleFloat(){document.getElementById('ivaFloatPanel').classList.toggle('open');}
function ivaAddMsg(cId,text,type){const c=document.getElementById(cId);const now=new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});const d=document.createElement('div');d.className='iva-msg '+type;d.innerHTML='<div class="iva-msg-bubble">'+text+'</div><div class="iva-msg-time">'+now+'</div>';c.appendChild(d);c.scrollTop=c.scrollHeight;}
function ivaShowTyping(cId){const c=document.getElementById(cId);const d=document.createElement('div');d.className='iva-msg bot';d.id='ivaT_'+cId;d.innerHTML='<div class="iva-typing"><span></span><span></span><span></span></div>';c.appendChild(d);c.scrollTop=c.scrollHeight;}
function ivaHideTyping(cId){const el=document.getElementById('ivaT_'+cId);if(el)el.remove();}
async function ivaSend(mode){
  const iId=mode==='float'?'ivaFloatInput':'ivaInput';
  const mId=mode==='float'?'ivaFloatMsgs':'ivaMsgs';
  const input=document.getElementById(iId);
  const text=input.value.trim();if(!text)return;
  input.value='';
  const sugg=document.getElementById('ivaSuggestions');if(sugg)sugg.style.display='none';
  ivaAddMsg(mId,text,'user');ivaShowTyping(mId);
  try{
    const r=await fetch('/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,businessSlug:IVA_SLUG})});
    const data=await r.json();
    ivaHideTyping(mId);ivaAddMsg(mId,data.reply||'¿En qué más te ayudo?','bot');
  }catch(e){ivaHideTyping(mId);ivaAddMsg(mId,'Disculpa, tuve un problema. Intenta de nuevo.','bot');}
}
function ivaSendSugg(el){document.getElementById('ivaInput').value=el.textContent;ivaSend('main');}
<\/script>`;

    const body = `
      <div class="card" style="${pageStyle}">
        ${data.businessPhotoUrl ? `<div style="margin:-20px -20px 24px -20px;overflow:hidden;border-radius:16px 16px 0 0;"><img src="${data.businessPhotoUrl}" alt="${data.name}" style="width:100%;height:300px;object-fit:cover;display:block;" /></div>` : ""}
        <div style="text-align:center;margin-bottom:18px;">
          ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.name}" style="width:80px;height:80px;object-fit:cover;border-radius:14px;border:3px solid #fff;box-shadow:0 6px 20px rgba(0,0,0,.15);margin-bottom:12px;" />` : ""}
          <div style="display:inline-block;margin-bottom:8px;padding:6px 14px;border-radius:999px;background:rgba(0,0,0,.05);font-weight:700;">${statusLabel}</div>
          <h1 style="margin:8px 0;font-size:30px;">${data.name}</h1>
          <p style="color:var(--muted);font-size:16px;max-width:600px;margin:0 auto;">${data.description || ""}</p>
        </div>
        ${data.address || hours ? `<div style="text-align:center;margin-bottom:20px;">${data.address ? `<div style="margin-bottom:6px;">📍 ${data.address}</div>` : ""}${hours ? `<div>🕐 ${hours}</div>` : ""}</div>` : ""}
        <div style="text-align:center;margin:20px 0;">
          <a href="${data.links?.whatsapp || "#"}" target="_blank" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-size:17px;font-weight:700;padding:13px 22px;border-radius:12px;">📲 Order via WhatsApp</a>
        </div>
        <h2 style="margin-top:36px;font-size:26px;">Menu</h2>
        <div class="grid">
          ${(data.menu || []).map((item, i) => `<div class="tile"><b>${item.name}</b><div style="font-size:13px;color:#888;margin-top:4px;">${item.desc || ""}</div><div style="margin-top:6px;font-weight:900;">${item.price !== null ? "$" + item.price : "Precio pendiente"}</div><div style="margin-top:10px;display:flex;align-items:center;gap:8px;"><button onclick="changeQty('menu-${i}',-1)" style="padding:5px 9px;border:none;border-radius:7px;cursor:pointer;">-</button><span id="qty-menu-${i}">0</span><button onclick="changeQty('menu-${i}',1)" style="padding:5px 9px;border:none;border-radius:7px;cursor:pointer;">+</button></div></div>`).join("")}
        </div>
        ${(data.drinks || []).length ? `<h2 style="margin-top:28px;font-size:22px;">Bebidas</h2><div class="grid">${(data.drinks || []).map((item, i) => `<div class="tile"><b>${item.name}</b><div style="margin-top:6px;font-weight:900;">${item.price !== null ? "$" + item.price : ""}</div><div style="margin-top:10px;display:flex;align-items:center;gap:8px;"><button onclick="changeQty('drink-${i}',-1)" style="padding:5px 9px;border:none;border-radius:7px;cursor:pointer;">-</button><span id="qty-drink-${i}">0</span><button onclick="changeQty('drink-${i}',1)" style="padding:5px 9px;border:none;border-radius:7px;cursor:pointer;">+</button></div></div>`).join("")}</div>` : ""}
        <div id="cart" style="margin-top:36px;padding:18px;border-radius:16px;background:#f0f0f0;">
          <h2 style="margin-top:0;">🛒 Your Order</h2>
          <div id="cart-items" style="margin-bottom:14px;color:#555;">Nothing added yet.</div>
          <div style="font-weight:700;"><div>Subtotal: $<span id="subtotal">0.00</span></div><div>Tax (11.5%): $<span id="tax">0.00</span></div><div style="font-size:18px;margin-top:6px;">Total: $<span id="total">0.00</span></div></div>
          <a id="send-order-btn" href="#" target="_blank" style="margin-top:14px;display:inline-block;width:100%;padding:12px;border-radius:10px;background:#25D366;color:white;font-weight:700;text-decoration:none;text-align:center;">Send Order via WhatsApp</a>
        </div>
        ${chatHTML}
        <script>
        const menuItems = ${JSON.stringify(data.menu || [])};
        const drinkItems = ${JSON.stringify(data.drinks || [])};
        const waNumber = "${whatsappNumber}";
        const bizName = "${data.name}";
        function changeQty(id,delta){const el=document.getElementById("qty-"+id);if(!el)return;let qty=parseInt(el.textContent||"0",10)+delta;if(qty<0)qty=0;el.textContent=qty;updateCart();}
        function updateCart(){let lines=[],subtotal=0;function process(items,prefix){items.forEach((item,i)=>{const el=document.getElementById("qty-"+prefix+"-"+i);const qty=el?parseInt(el.textContent||"0",10):0;if(qty>0){const price=Number.isFinite(Number(item.price))?Number(item.price):0;subtotal+=qty*price;lines.push(item.name+" x"+qty+" = $"+(qty*price).toFixed(2));}});}process(menuItems,"menu");process(drinkItems,"drink");document.getElementById("cart-items").innerHTML=lines.length?lines.join("<br/>"):"Nothing added yet.";const tax=subtotal*0.115;document.getElementById("subtotal").textContent=subtotal.toFixed(2);document.getElementById("tax").textContent=tax.toFixed(2);document.getElementById("total").textContent=(subtotal+tax).toFixed(2);const msg="🛒 *Order — "+bizName+"*\\n\\n"+lines.join("\\n")+"\\n\\n💰 *Total: $"+(subtotal+tax).toFixed(2)+"*\\n\\nThank you!";document.getElementById("send-order-btn").href="https://wa.me/"+waNumber+"?text="+encodeURIComponent(msg);}
        updateCart();
        <\/script>
      </div>`;
    return res.send(layout({ title: data.name, body }));
  }

  let clients = [];
  try {
    const raw = fs.readFileSync(clientsFilePath, "utf8");
    clients = JSON.parse(raw);
    if (!Array.isArray(clients)) clients = [];
  } catch (e) { clients = []; }

  const client = clients.find(item => item.slug === slug);
  if (client) {
    const body = `<div class="card"><h1>${client.businessName}</h1><p><b>WhatsApp:</b> ${client.whatsapp || "Pendiente"}</p><div class="btns" style="margin-top:16px;"><a class="btn ghost" href="/">Volver</a></div></div>`;
    return res.send(layout({ title: client.businessName, body }));
  }

  return res.status(404).send(layout({ title: "No encontrado", body: `<div class="card"><h2>Negocio no encontrado</h2><a class="btn ghost" href="/">Volver</a></div>` }));
});


// ==========================================
// AUTORIDAD ENERGÍA CRIOLLA — DEMO
// ==========================================

// AEC route moved above /:slug

app.post("/api/aec-chat", aiLimiter, express.json(), async (req, res) => {
  const { message, history = [] } = req.body;
  const system = `Eres IvA, el asistente virtual de Autoridad de Energía Criolla, una empresa de paneles solares en Puerto Rico fundada por Reinaldo Ortiz García. Eres amable, profesional y conoces muy bien el mercado solar de Puerto Rico.

SOBRE LA EMPRESA:
- Nombre: Autoridad de Energía Criolla
- Fundador/Presidente: Reinaldo Ortiz García — instalador y asesor con años de experiencia
- Servicios: instalación de sistemas solares residenciales y comerciales, reparación, mantenimiento, baterías e inversores
- Teléfono: (939) 865-1483
- Email: autoridadenergiacriolla@gmail.com
- Filosofía: servicio honesto, educación al cliente, soluciones accesibles

INFORMACIÓN TÉCNICA Y DE INCENTIVOS QUE CONOCES:
- Crédito Federal ITC: 30% del costo del sistema como crédito en impuestos federales (disponible hasta 2032)
- Ley 399 de PR: exención total de impuesto sobre la propiedad para sistemas de energía renovable
- Net Metering con LUMA: venta del exceso de energía de vuelta a la red, créditos en la factura
- Financiamiento disponible desde $0 de inicial
- Retorno de inversión típico: 5-7 años
- Ahorro mensual promedio: $100-200 dependiendo del sistema y consumo
- Garantía de paneles: 25 años típicamente
- Garantía de inversores: 10-12 años típicamente
- Un sistema residencial típico cuesta entre $15,000-$30,000 antes de incentivos
- Después del crédito del 30%, el costo real baja significativamente

CÓMO RESPONDER:
- Responde en español
- Máximo 3-4 oraciones por respuesta
- Si preguntan por cotización específica, pide el consumo mensual de luz (kWh o monto en $) para dar una estimación más precisa
- Siempre termina ofreciendo conectar con Reinaldo via WhatsApp: (939) 865-1483
- Si preguntan algo que no sabes, di "Para darte información más precisa sobre eso, te recomiendo hablar directamente con Reinaldo al (939) 865-1483"`;

  try {
    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const messages = [
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system,
      messages
    });
    res.json({ reply: response.content[0].text });
  } catch(err) {
    console.error('AEC chat error:', err.message);
    res.json({ reply: 'Hubo un error técnico. Llama directamente a Reinaldo al (939) 865-1483.' });
  }
});

// ==========================================
// PLANETA BORICUA — DIRECTORIO DE NEGOCIOS
// ==========================================

// Página de noticias PBN
// noticias route moved above /:slug

// Formulario público
app.get("/pb/add-negocio", (req, res) => res.send(addNegocioPB));

// Submit de nuevo negocio
app.post("/api/pb-negocio-submit", formLimiter, express.json(), async (req, res) => {
  console.log("📋 PB Negocio submit:", req.body?.name);
  const name = sanitize(req.body.name);
  const category = sanitize(req.body.category);
  const location = sanitize(req.body.location);
  const city = sanitize(req.body.city);
  const zip = sanitize(req.body.zip || '');
  const address = sanitize(req.body.address || '');
  const desc = sanitize(req.body.desc);
  const fullDesc = sanitize(req.body.fullDesc);
  const email = sanitize(req.body.email);
  const whatsapp = sanitize(req.body.whatsapp || '');
  const website = sanitize(req.body.website || '');
  const instagram = sanitize(req.body.instagram || '');
  const photo = sanitize(req.body.photo);
  const price = sanitize(req.body.price || '');

  if (!name || !category || !location || !city || !desc || !fullDesc || !email || !photo) {
    return res.json({ ok: false, error: "Faltan campos requeridos" });
  }

  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const pendingFile = pathLib.join('/data/pb-listings/pending.json');
    const pendingDir = pathLib.dirname(pendingFile);
    if (!fs2.existsSync(pendingDir)) fs2.mkdirSync(pendingDir, { recursive: true });

    let pending = [];
    if (fs2.existsSync(pendingFile)) {
      pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    }

    const crypto = require('crypto');
    const negocio = {
      id: Date.now().toString(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      name, category, location, city, zip, address, desc, fullDesc,
      email, whatsapp, website, instagram, photo, price,
      approveToken: crypto.randomBytes(32).toString('hex'),
      rejectToken: crypto.randomBytes(32).toString('hex')
    };

    pending.push(negocio);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

    // Email notification to admin
    const { Resend } = require('resend');
    const resendClient = new Resend(process.env.RESEND_API_KEY);
    const approveUrl = 'https://masboricuaqueunmofongo.com/admin/pb-approve/' + negocio.approveToken;
    const rejectUrl = 'https://masboricuaqueunmofongo.com/admin/pb-reject/' + negocio.rejectToken;

    await resendClient.emails.send({
      from: 'Planeta Boricua <connect@ivamarai.com>',
      to: 'connect@ivamarai.com',
      subject: '🇵🇷 Nuevo Negocio PB: ' + name,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:1.5rem;border-radius:8px 8px 0 0;">
            <h2 style="color:#fff;margin:0;">🇵🇷 Nuevo Negocio en Planeta Boricua</h2>
          </div>
          <div style="padding:1.5rem;border:1px solid #eee;">
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Negocio</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Categoría</td><td style="padding:8px;border:1px solid #ddd">${category}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ubicación</td><td style="padding:8px;border:1px solid #ddd">${city}, ${location}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">ZIP</td><td style="padding:8px;border:1px solid #ddd">${zip || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Dirección</td><td style="padding:8px;border:1px solid #ddd">${address || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">WhatsApp</td><td style="padding:8px;border:1px solid #ddd">${whatsapp || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Website</td><td style="padding:8px;border:1px solid #ddd">${website || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Instagram</td><td style="padding:8px;border:1px solid #ddd">${instagram || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Precio</td><td style="padding:8px;border:1px solid #ddd">${price || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Descripción</td><td style="padding:8px;border:1px solid #ddd">${desc}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Foto</td><td style="padding:8px;border:1px solid #ddd"><img src="${photo}" style="max-width:200px;border-radius:8px;"></td></tr>
            </table>
            <div style="margin-top:2rem;display:flex;gap:1rem;">
              <a href="${approveUrl}" style="background:#16a34a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">✅ Aprobar y Publicar</a>
              <a href="${rejectUrl}" style="background:#dc2626;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">❌ Rechazar</a>
            </div>
          </div>
        </div>
      `
    });

    return res.json({ ok: true });
  } catch(e) {
    console.error('PB negocio submit error:', e.message);
    return res.json({ ok: false, error: e.message });
  }
});

// Aprobar negocio via token (desde el email)
app.get("/admin/pb-approve/:token", async (req, res) => {
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const pendingFile = pathLib.join('/data/pb-listings/pending.json');
    const approvedDir = '/data/pb-listings';

    let pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    const negocio = pending.find(n => n.approveToken === req.params.token);

    if (!negocio) return res.send('<h2>Token inválido o negocio ya procesado.</h2>');

    // Move to approved file by location
    const approvedFile = pathLib.join(approvedDir, negocio.location + '.json');
    let approved = [];
    if (fs2.existsSync(approvedFile)) {
      approved = JSON.parse(fs2.readFileSync(approvedFile, 'utf8'));
    }
    negocio.status = 'approved';
    negocio.approvedAt = new Date().toISOString();
    negocio.badge = 'boricua-verificado';
    approved.push(negocio);
    fs2.writeFileSync(approvedFile, JSON.stringify(approved, null, 2));

    // Remove from pending
    pending = pending.filter(n => n.approveToken !== req.params.token);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

    // Email confirmation to business
    try {
      const { Resend } = require('resend');
      const resendClient = new Resend(process.env.RESEND_API_KEY);
      await resendClient.emails.send({
        from: 'Planeta Boricua <connect@ivamarai.com>',
        to: negocio.email,
        subject: '🇵🇷 ¡Tu negocio fue aprobado en Planeta Boricua!',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:2rem;border-radius:8px 8px 0 0;text-align:center;">
              <h1 style="color:#fff;margin:0;">🇵🇷 ¡Wepa! Estás aprobado</h1>
            </div>
            <div style="padding:2rem;border:1px solid #eee;">
              <p style="font-size:1rem;color:#333;">Hola, <strong>${negocio.name}</strong>!</p>
              <p style="color:#555;line-height:1.6;margin-top:1rem;">Tu negocio ha sido verificado y ya aparece en el <strong>Directorio Boricua</strong> de Planeta Boricua con el badge de <strong>🏅 Boricua Verificado</strong>.</p>
              <p style="color:#555;line-height:1.6;margin-top:1rem;">Miles de boricuas en USA y Puerto Rico podrán encontrarte ahora mismo en <a href="https://masboricuaqueunmofongo.com/#directorio" style="color:#002D62;font-weight:700;">masboricuaqueunmofongo.com</a></p>
              <p style="color:#555;line-height:1.6;margin-top:1rem;">¿Necesitas actualizar información? Contáctanos en <strong>connect@ivamarai.com</strong></p>
              <p style="margin-top:2rem;font-size:0.85rem;color:#999;">© 2026 Planeta Boricua · Un proyecto de Ivamar AI LLC</p>
            </div>
          </div>
        `
      });
    } catch(emailErr) {
      console.error('Error enviando email de aprobación:', emailErr.message);
    }

    res.send(`
      <html><body style="font-family:sans-serif;text-align:center;padding:3rem;">
        <h2 style="color:#16a34a;">✅ ¡Negocio aprobado!</h2>
        <p><strong>${negocio.name}</strong> ya aparece en el directorio de Planeta Boricua.</p>
        <p>Se envió email de confirmación a ${negocio.email}</p>
      </body></html>
    `);
  } catch(e) {
    res.send('<h2>Error: ' + e.message + '</h2>');
  }
});

// Rechazar negocio via token (desde el email)
app.get("/admin/pb-reject/:token", async (req, res) => {
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const pendingFile = pathLib.join('/data/pb-listings/pending.json');

    let pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    const negocio = pending.find(n => n.rejectToken === req.params.token);

    if (!negocio) return res.send('<h2>Token inválido o negocio ya procesado.</h2>');

    pending = pending.filter(n => n.rejectToken !== req.params.token);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

    // Email to business
    try {
      const { Resend } = require('resend');
      const resendClient = new Resend(process.env.RESEND_API_KEY);
      await resendClient.emails.send({
        from: 'Planeta Boricua <connect@ivamarai.com>',
        to: negocio.email,
        subject: 'Actualización sobre tu solicitud en Planeta Boricua',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:2rem;">
            <h2>Hola, ${negocio.name}</h2>
            <p style="color:#555;line-height:1.6;">Gracias por tu interés en Planeta Boricua. En esta ocasión no pudimos aprobar tu solicitud. Esto puede deberse a información incompleta o que el negocio no cumple con nuestros criterios del directorio.</p>
            <p style="color:#555;line-height:1.6;margin-top:1rem;">Si crees que fue un error o quieres más información, contáctanos en <strong>connect@ivamarai.com</strong></p>
          </div>
        `
      });
    } catch(emailErr) {
      console.error('Error enviando email de rechazo:', emailErr.message);
    }

    res.send(`
      <html><body style="font-family:sans-serif;text-align:center;padding:3rem;">
        <h2 style="color:#dc2626;">❌ Negocio rechazado</h2>
        <p><strong>${negocio.name}</strong> fue rechazado y eliminado de la lista de pendientes.</p>
        <p>Se envió email de notificación a ${negocio.email}</p>
      </body></html>
    `);
  } catch(e) {
    res.send('<h2>Error: ' + e.message + '</h2>');
  }
});

// API para obtener TODOS los negocios aprobados
app.get("/api/pb-negocios/all", (req, res) => {
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const listingsDir = '/data/pb-listings';
    const category = req.query.category;
    let allNegocios = [];

    if (fs2.existsSync(listingsDir)) {
      fs2.readdirSync(listingsDir).forEach(file => {
        if (file.endsWith('.json') && file !== 'pending.json') {
          try {
            const negocios = JSON.parse(fs2.readFileSync(pathLib.join(listingsDir, file), 'utf8'));
            negocios.forEach(n => allNegocios.push(n));
          } catch(e) {}
        }
      });
    }

    if (category) allNegocios = allNegocios.filter(n => n.category === category);
    return res.json({ negocios: allNegocios });
  } catch(e) {
    return res.json({ negocios: [] });
  }
});

// API para obtener negocios aprobados por ubicación
app.get("/api/pb-negocios/:location", (req, res) => {
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const approvedFile = pathLib.join('/data/pb-listings', req.params.location + '.json');
    if (!fs2.existsSync(approvedFile)) return res.json({ negocios: [] });
    const negocios = JSON.parse(fs2.readFileSync(approvedFile, 'utf8'));
    const category = req.query.category;
    const filtered = category ? negocios.filter(n => n.category === category) : negocios;
    return res.json({ negocios: filtered });
  } catch(e) {
    return res.json({ negocios: [] });
  }
});

app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));

app.post('/api/nayeli', aiLimiter, express.json(), async (req, res) => {
  const { message, history = [], email } = req.body;

  // Handle email capture
  if (email && email.includes('@')) {
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
        body: JSON.stringify({ email, listIds: [4], updateEnabled: true, attributes: { SOURCE: 'nayeli-chat' } })
      });
      await resend.emails.send({
        from: 'Planeta Boricua <connect@ivamarai.com>',
        to: 'connect@ivamarai.com',
        subject: '🇵🇷 Nayeli capturó email: ' + email,
        html: '<p>Email capturado por Nayeli: <strong>' + email + '</strong></p><p>Historial: ' + JSON.stringify(history).slice(0, 500) + '</p>'
      });

      // Generate personalized summary using Claude based on conversation history
      let summaryHtml = '';
      let relevantLinks = [];
      try {
        const Anthropic = require('@anthropic-ai/sdk');
        const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const convoText = history.map(h => (h.role === 'user' ? 'Usuario: ' : 'Nayeli: ') + h.content).join('\n');

        const summaryPrompt = `Basándote en esta conversación entre un usuario y Nayeli (asistente de Planeta Boricua), genera un resumen breve en español boricua (2-3 oraciones, tono cálido y personal) de lo que se habló, dirigido directamente al usuario como si fuera un email. NO uses saludos genéricos, ve directo al resumen. Conversación:\n\n${convoText}\n\nResponde SOLO con el resumen, sin preámbulo.`;

        const summaryRes = await client.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          messages: [{ role: 'user', content: summaryPrompt }]
        });
        summaryHtml = summaryRes.content[0].text;

        // Determine relevant links based on conversation content
        const fullText = convoText.toLowerCase();
        if (fullText.includes('regresar') || fullText.includes('volver a pr') || fullText.includes('usa a pr') || fullText.includes('a la isla')) {
          relevantLinks.push({ url: 'https://www.masboricuaqueunmofongo.com/regresar-a-pr', label: '🇵🇷 Guía: Regresar a Puerto Rico →', color: '#CE1126' });
        }
        if (fullText.includes('mudar') && (fullText.includes('usa') || fullText.includes('estados unidos') || fullText.includes('florida') || fullText.includes('texas') || fullText.includes('nueva york'))) {
          relevantLinks.push({ url: 'https://www.masboricuaqueunmofongo.com/mudarse-de-pr', label: '🇺🇸 Guía: Mudarse de PR a USA →', color: '#002D62' });
        }
        if (relevantLinks.length === 0) {
          relevantLinks.push({ url: 'https://www.masboricuaqueunmofongo.com/recursos', label: '📋 Centro de Recursos Completo →', color: '#444' });
        }
      } catch(e) {
        console.error('Summary generation error:', e.message);
        summaryHtml = '¡Wepa! Aquí tienes los recursos más útiles de Planeta Boricua para lo que estás bregando.';
        relevantLinks = [{ url: 'https://www.masboricuaqueunmofongo.com/recursos', label: '📋 Centro de Recursos Completo →', color: '#444' }];
      }

      const linksHtml = relevantLinks.map(l =>
        '<a href="' + l.url + '" style="display:block;background:' + l.color + ';color:#fff;padding:0.8rem 1.2rem;border-radius:6px;text-decoration:none;font-weight:700;margin-bottom:0.8rem;">' + l.label + '</a>'
      ).join('') + '<a href="https://www.masboricuaqueunmofongo.com/recursos" style="display:block;background:#444;color:#fff;padding:0.8rem 1.2rem;border-radius:6px;text-decoration:none;font-weight:700;">📋 Ver Centro de Recursos Completo →</a>';

      await resend.emails.send({
        from: 'Nayeli — Planeta Boricua <connect@ivamarai.com>',
        to: email,
        subject: '🇵🇷 Nayeli te envía tu resumen de Planeta Boricua',
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:2rem;text-align:center;border-radius:12px 12px 0 0;">
            <img src="https://www.masboricuaqueunmofongo.com/img/nayeli.jpg" alt="Nayeli" style="width:90px;height:90px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid #fff;margin-bottom:0.8rem;">
            <h1 style="color:#fff;font-size:1.3rem;margin:0">🇵🇷 Tu resumen de Planeta Boricua</h1>
            <p style="color:rgba(255,255,255,0.8);font-size:0.85rem;margin-top:0.3rem;">De parte de Nayeli</p>
          </div>
          <div style="padding:2rem;background:#fff;border:1px solid #e5e5e0;">
            <p style="font-size:0.95rem;color:#333;line-height:1.6;">${summaryHtml}</p>
            <div style="margin:1.5rem 0;">
              ${linksHtml}
            </div>
            <p style="font-size:0.85rem;color:#666;">También te suscribimos al newsletter de Planeta Boricua para que no te pierdas nada boricua. Puedes cancelar cuando quieras.</p>
          </div>
          <div style="padding:1rem;text-align:center;background:#f5f5f0;border-radius:0 0 12px 12px;">
            <p style="font-size:0.72rem;color:#999;">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Un proyecto de Ivamar AI LLC</p>
          </div>
        </div>`
      });
    } catch(e) { console.error('Nayeli email error:', e.message); }
    return res.json({ reply: '¡Perfecto! Anotado 📨 Te acabo de enviar un email con el resumen de todo lo que hablamos y los links útiles. Ya quedas en la familia de Planeta Boricua 🇵🇷 ¿Hay algo más en lo que te pueda ayudar?' });
  }

  // MODO CHINCHORREO - detect food/restaurant queries and search real places via Google
  let chinchorreoResults = '';
  const foodKeywords = /chinchorro|chinchorreo|food truck|d[oó]nde com|mofongo|alcapurria|lech[oó]n|tripleta|restaurante boricua|comida boricua|comida puertorrique[ñn]a/i;
  if (foodKeywords.test(message)) {
    try {
      // Try to extract a location mention from the message or recent history for a better search query
      const recentText = [message, ...history.slice(-4).map(h => h.content)].join(' ');
      const locationMatch = recentText.match(/\ben\s+([A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,30})(?:[,.]|$)/);
      const location = locationMatch ? locationMatch[1].trim() : '';
      const searchQuery = location
        ? `Puerto Rican restaurant or chinchorro in ${location}`
        : 'Puerto Rican restaurant or chinchorro';
      const places = await searchPlacesByText(searchQuery);
      if (places && places.length > 0) {
        chinchorreoResults = '\n\n## RESULTADOS REALES DE GOOGLE PLACES (usa SOLO esta info, nunca inventes otros lugares):\n' +
          places.map(p => {
            const name = p.displayName?.text || 'Sin nombre';
            const addr = p.formattedAddress || 'Dirección no disponible';
            const rating = p.rating ? `${p.rating}⭐ (${p.userRatingCount || 0} reseñas)` : 'Sin calificación aún';
            const maps = p.googleMapsUri || '';
            return `- ${name} — ${addr} — ${rating}${maps ? ' — ' + maps : ''}`;
          }).join('\n');
      } else {
        chinchorreoResults = '\n\n## BÚSQUEDA DE GOOGLE PLACES: No se encontraron resultados para esta ubicación específica. Sé honesta sobre esto y sugiere que el usuario busque en Google Maps o pregunte en grupos de Facebook locales.';
      }
    } catch (e) {
      console.error('Chinchorreo search error:', e.message);
    }
  }

  const system = `Eres Nayeli, la asistente cultural de Planeta Boricua (masboricuaqueunmofongo.com) — el portal de cultura, noticias y recursos para la comunidad puertorriqueña en PR y la diáspora en USA.${chinchorreoResults}

## TU IDENTIDAD
Naciste digitalmente en Lake Wales, Florida, pero tu corazón es de Hatillo, Puerto Rico. Eres boricua de alma — naciste fuera de la isla, como la bandera, pero ondeas por todos los boricuas del mundo, estén donde estén.

## CONOCIMIENTO CRÍTICO — CIUDADANÍA BORICUA (NUNCA CUESTIONAR ESTO)
TODOS los puertorriqueños nacidos en Puerto Rico SON ciudadanos estadounidenses de nacimiento, desde la Ley Jones de 1917. No existe diferencia entre "ser boricua" y "ser ciudadano americano" — son la misma cosa. NUNCA preguntes "¿eres ciudadano americano o boricua solamente?" ni nada similar que sugiera que son categorías separadas o que la ciudadanía de un boricua nacido en la isla esté en duda — eso es un error factual grave y puede generar miedo o confusión innecesaria sobre estatus migratorio. Moverse entre Puerto Rico y cualquier estado de USA (o viceversa) es movimiento DOMÉSTICO para un boricua — no requiere visa, pasaporte (aunque es buena práctica tenerlo), ni ningún proceso de inmigración. Si surge el tema de mudanza PR↔USA, asume automáticamente que la persona ya es ciudadana (a menos que ella mismo indique que nació fuera de PR de padres extranjeros u otra situación específica) y enfócate en los temas reales: logística, documentos de mudanza, trabajo, vivienda — NUNCA en si "puede" entrar a USA o si necesita papeles migratorios para eso.

## TU PERSONALIDAD
Hablas en español boricua puro — natural, cálido, directo. NUNCA uses "ahorita", "te late", "órale", "chido", "güey" o expresiones de otros países.

Expresiones boricuas que usas naturalmente (sin forzar todas en cada mensaje): "wepa", "ay bendito", "acho", "mi pana", "pues dale", "bregando", "brutal", "de show", "qué calentón", "mano" (neutral, sirve para cualquiera).

NUNCA uses "nene" o "nena" — son términos que asumen género. Usa "mano", el nombre de la persona una vez la sepas, o ninguna forma directa.

NUNCA inventes palabras que no existen en el boricua real (ejemplo: "bregilla" no existe). Si no estás segura de que una expresión es auténtica, no la uses — mejor hablar claro que forzar slang falso.

NUNCA uses "bicho" — en Puerto Rico tiene una connotación vulgar/sexual fuerte, es completamente inapropiado fuera de ese contexto. NUNCA uses palabras de otros países que NO son boricuas, aunque sean comunes en otros lugares — por ejemplo "ahorita" (en PR decimos "ahora", "en un ratito", o "rápido" para algo inmediato; "ahorita" en boricua real a veces significa "más tarde", lo opuesto a su uso en México/Colombia, así que genera confusión). Tampoco uses "che", "wey/güey", "parce", "chamo", "vale", "pana" en el sentido venezolano, ni otras muletillas que no son de Puerto Rico.

Expresiones boricuas auténticas adicionales que puedes usar naturalmente cuando encajen (no fuerces todas): "a fuego" (en punto, excelente), "estar en la brega" (estar en la lucha, trabajando duro), "jangueo" (salir con amigos), "la buena" (buena racha), "la mala" (mala racha, momento difícil), "al garete" (sin rumbo, fuera de control).

Refranes que usas cuando encajan naturalmente: "eso es bizcocho con leche fría" (algo genial), "somos más boricuas que un mofongo" (orgullo), "estás como cangrejo viudo a media noche" (alguien perdido/confundido), "el corazón boricua cabe en una carry-on" (sobre la diáspora y llevar la cultura a donde vayas).

Cuando envías algo rápido dices "te lo mando ahora mismo", "en un par de segundos te llega" — NUNCA "ahorita".

## ESTILO "COQUÍ CON GPS" — IMPORTANTE ENTENDER ESTO BIEN
"El Coquí Informante", "el Coquí con GPS", "el Pajarito del Barrio" son formas boricuas de hablar — un vacilón cultural para decir que estás pendiente, conectada, buscando información, atenta a lo que se cuenta. NO son fuentes de datos reales ni personajes que confirman lugares específicos. Puedes usar esa forma de hablar como estilo ("el Coquí Informante anda pendiente y me sopla que...") PERO el contenido detrás siempre debe basarse en información real que tengas — nunca inventes nombres de negocios, direcciones o lugares específicos solo porque el estilo lo permite. Es un tono cariñoso, no una licencia para inventar datos.

## CÓMO FLUYE LA CONVERSACIÓN — MUY IMPORTANTE

Si es la PRIMERA vez que alguien escribe (history vacío), tu única respuesta debe ser corta: preséntate y pregunta el nombre, nada más. Ejemplo: "¡Wepa! Soy Nayeli, tu asistente boricua 🇵🇷 ¿Cómo te llamas?" NO menciones mudanzas ni guías en ese primer mensaje — espera la respuesta.

Una vez sepas el nombre, sigue construyendo confianza como lo haría un boricua conociendo a otro: pregunta de qué pueblo es (si está en PR) o de dónde es originalmente y dónde vive ahora (si está en la diáspora). Reacciona con calidez genuina — si menciona un pueblo, puedes decir algo cariñoso sobre ese lugar si lo sabes, o simplemente mostrar interés real. Esto no es un formulario, es cómo dos boricuas se conocen: con curiosidad y cariño, no interrogatorio.

REGLA DE ORO: haz UNA sola pregunta a la vez. NUNCA listes 2-3 preguntas numeradas seguidas — eso se siente como formulario, no charla. Deja que la conversación fluya: la persona responde algo, reaccionas específicamente a eso, y entonces sigue la siguiente pregunta natural. Construye el contexto poco a poco, con paciencia. No bombardees con información de golpe — da lo esencial primero y profundiza según lo que pidan.

## DATOS — SOLO USA LO QUE ESTÁ AQUÍ, NUNCA INVENTES NÚMEROS NI LUGARES
Si no tienes un dato exacto (precio de renta, costo de seguro en otro estado, nombre de un chinchorro específico, etc.), NO lo presentes como hecho verificado. Di algo como "eso varía, te recomiendo verificar en [fuente]" o da un rango amplio aclarando que es aproximado. Nunca inventes el nombre de un negocio o lugar que no esté confirmado en tu información.

## MODO CHINCHORREO 🌴🍽️
Se activa cuando alguien pregunta por chinchorros, food trucks, dónde comer comida boricua, o platos como mofongo/alcapurrias/lechón/tripleta.

Adapta el lenguaje: en PR dices "chinchorro", "frituras"; en USA dices "food truck", "boricua spot".

SI VES UNA SECCIÓN "RESULTADOS REALES DE GOOGLE PLACES" más arriba en este prompt: esos son lugares reales y verificados — preséntalos con tu personalidad boricua (nombre, dirección, rating si lo tiene), nunca inventes otros lugares además de esos, y nunca digas que no puedes recomendar lugares específicos cuando sí tienes resultados reales frente a ti. Si la sección dice que no se encontraron resultados, sé honesta sobre eso.

SI NO hay ninguna sección de resultados de Google Places (la búsqueda no se activó o no aplica): NUNCA inventes nombres de lugares. En su lugar:
- Pregunta con cariño en qué pueblo o ciudad está ("Acho, ¿en qué pueblo o ciudad andas ahora mismito?") — esto ayuda a que la próxima búsqueda sí encuentre resultados reales
- Recomienda el directorio de negocios boricuas en masboricuaqueunmofongo.com donde puede encontrar negocios reales verificados
- Da consejos generales y reales sobre qué hace bueno a un chinchorro (ambiente, frituras frescas, que esté lleno de gente local) sin inventar nombres específicos

## RECURSOS PR ↔ USA QUE CONOCES

### MUDARSE DE PR A USA (/mudarse-de-pr):
- Navieras: Crowley (904-727-2200) y TOTE Maritime (904-855-0500) — San Juan a Jacksonville FL, 3-5 días
- EXPORTAR vehículo DESDE PR HACIA USA (cuando alguien se va de la isla): se hace EN PUERTO RICO antes de embarcar — Certificado No Deudas DTOP (válido 3 días), Preinspección Policía División Vehículos Hurtados de PR (válido 5 días), lavado a presión completo, EIN federal, afidávit notarial, ACAA No Gravamen (válido 30 días). Sellos físicos obligatorios.
- Licencias por estado: FL $48/30días (Tax Collector, no el DMV), NY $64.50/30días (DMV), TX $33/90días, IL $30/90días, CT $72/60días, NJ $24/60días
- Registrar auto en FL: VIN verification (Form HSMV 82042) por policía/notario/dealer → Tax Collector's Office (NO el DMV)
- Seguro médico: SEP 60 días al mudarse — healthcare.gov (1-800-318-2596)
- Servicios USA: FL (FPL Miami, Duke Orlando, TECO Tampa, JEA Jacksonville), NY (ConEd 1-800-752-6633), NJ (PSE&G), CT (Eversource), IL (ComEd 1-800-334-7661), TX (powertochoose.org)
- Internet USA: Xfinity, AT&T, Spectrum, Verizon Fios — comparar en broadbandnow.com
- Crédito en USA: secured card, Experian Boost gratis, Banco Popular opera en PR y algunos estados
- Escuelas: Ley McKinney-Vento protege derecho a educación, ESL disponible sin costo

### REGRESAR A PR (/regresar-a-pr):
⚠ Proceso DIFERENTE al de exportar — esto es para registrar un carro EN Puerto Rico al llegar/establecerse. NUNCA mezclar con el proceso de "Vehículos Hurtados" que es exclusivo para EXPORTAR desde la isla.
- Registrar vehículo EN PR (orden): 1) Arbitrios en SURI (hacienda.pr.gov/arbitrios) con VIN, 2) Inspección vehicular $20, 3) Seguro Compulsorio $99 (ASC, MAPFRE 787-772-8400, SODA), 4) CESCO con: DTOP-776, título, Hoja Arbitrios SC-2042, certificado inspección, seguro compulsorio, sellos código 2024 ($11) y 0842 ($2), sin multas, sin deudas ASUME/ACAA
- Cita CESCO: web.cescodigital.pr.gov o cesco.turnospr.com — semanas de anticipación
- GESTORES: mucha gente prefiere contratar un gestor para el papeleo de CESCO/DTOP en vez de hacerlo ellos — menciónalo si la persona se ve abrumada
- Licencia en PR — el calentón 🔥: multas primero (CESCO Digital), acta post-julio 2010 (vitalrecords.pr.gov), Social Security SIN LAMINAR, Certificación Médica DTOP-DIS-260 (vigencia 6 meses), 2 pruebas de residencia, cita con semanas de anticipación, REAL ID ⭐ obligatorio desde mayo 2025
- LUMA Energy: 1-844-888-5862 · lumapr.com
- AAA Agua: 1-787-620-2482 · acueductos.pr.gov — base $11.84/mes + consumo
- Internet PR: Liberty $52.99/300Mbps (787-355-2222), Claro PR (787-792-3000), Starlink rural
- Solar: aproximado $15,000-25,000, crédito federal 30%
- Vivienda — precios aproximados que cambian: San Juan $1,200-2,500/mes, Ponce y otras ciudades $600-1,200/mes — siempre recomienda verificar en clasificadosonline.com
- Empleo: Indeed PR, trabajo remoto desde PR es opción real, Ley 60 incentivos fiscales, CCE pridco.pr.gov

### CULTURA BORICUA:
- Gastronomía: mofongo, pernil, pasteles, alcapurrias, tostones, tembleque, coquito, lechón, asopao
- Música: salsa, reggaetón, trap, plena, bomba, música jíbara — Bad Bunny, Daddy Yankee, Marc Anthony
- 78 municipios: Rincón (surf), Luquillo (playa), Ponce (Ciudad Señorial), Hatillo (tu pueblo natal)
- Directorio de negocios boricuas en el portal, Blog: blog.masboricuaqueunmofongo.com

## EMAIL CAPTURE — DOS MOMENTOS

Primer intento, después de dar información útil real (2-3 mensajes en adelante), de forma natural:
- "Oye, si quieres te envío todo esto por email con los links directos 📧 ¿Me das tu correo?"

Si no lo dieron y la conversación parece cerrar (dicen "gracias", "ok", "nada más"), pide UNA VEZ MÁS antes de despedirte:
- "Antes de que te vayas — dame tu email y te mando un resumen de todo esto 📧"

No insistas más de dos veces total. Si no lo dan, despídete con calidez sin presionar.

## LINKS DEL PORTAL
- masboricuaqueunmofongo.com/recursos — Centro de Recursos
- masboricuaqueunmofongo.com/mudarse-de-pr — Guía PR→USA
- masboricuaqueunmofongo.com/regresar-a-pr — Guía USA→PR
- blog.masboricuaqueunmofongo.com — Blog

## REGLAS FINALES
- Nunca inventes datos, lugares o precios que no tengas con certeza
- Menciona links del portal cuando sean genuinamente relevantes
- Tono boricua pero confiable — la gente toma decisiones reales con esta info
- Respuestas concisas, 2-4 párrafos cortos, evita bloques enormes con muchos bullets de golpe
- Planeta Boricua es un producto de Ivamar AI LLC (ivamarai.com)`;

  try {
    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const messages = [
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system,
      messages
    });
    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('Nayeli error:', err.message);
    res.json({ reply: '¡Ay bendito! Tuve un problemita técnico. ¡Inténtalo de nuevo! 🇵🇷' });
  }
});

app.get('/api/planetaboricua-blog', async (req, res) => {
  try {
    const r = await fetch('https://masboricuaqueunmofongo.blogspot.com/feeds/posts/default?alt=json&max-results=4');
    const data = await r.json();
    const posts = (data.feed.entry || []).map(e => {
      const rawContent = e.content ? e.content.$t : (e.summary ? e.summary.$t : '');
      const cleanText = rawContent.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim();
      const lines = cleanText.split('\n').map(l => l.trim()).filter(l => l.length > 60);
      const summary = (lines[0] || cleanText).slice(0, 140) + '...';
      let img = null;
      if (e.media$thumbnail) {
        const u = e.media$thumbnail.url;
        const i = u.lastIndexOf('/s');
        img = u.replace('/s72-', '/s1200-').replace('/s72/', '/s1200/');
      } else {
        const content = e.content ? e.content.$t : '';
        const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (match) img = match[1];
      }
      const tag = e.category && e.category[0] ? e.category[0].term.replace(/\n/g, ' ').trim() : 'Cultura Boricua';
      const titleText = e.title.$t.trim();
      const slug = titleText.toLowerCase().replace(/[áàä]/g,'a').replace(/[éèë]/g,'e').replace(/[íìï]/g,'i').replace(/[óòö]/g,'o').replace(/[úùü]/g,'u').replace(/ñ/g,'n').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      return {
        title: titleText,
        link: '/blog/' + slug,
        date: new Date(e.published.$t).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' }),
        summary,
        img,
        tag,
        slug
      };
    });
    res.set('Access-Control-Allow-Origin', '*');
    res.json(posts);
  } catch (err) {
    res.json([]);
  }
});


app.get('/api/noticias-pr', async (req, res) => {
  try {
    const results = [];

    // GNews API - noticias de PR en español
    try {
      const gnews = await fetch(`https://gnews.io/api/v4/search?q=puerto+rico&lang=es&max=6&apikey=${process.env.GNEWS_API_KEY}`);
      const gdata = await gnews.json();
      if (gdata.articles) {
        gdata.articles.forEach(a => {
          results.push({
            title: a.title,
            link: a.url,
            date: new Date(a.publishedAt).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' }),
            summary: a.description ? a.description.slice(0, 120) + '...' : '',
            img: a.image || null,
            source: a.source.name,
            categoria: 'Puerto Rico'
          });
        });
      }
    } catch(e) { console.log('GNews error:', e.message); }

    // RSS feeds — fuentes específicas de PR y diáspora boricua
    const feeds = [
      { url: 'https://periodismoinvestigativo.com/feed/', source: 'Periodismo Investigativo', categoria: 'Investigación' },
      { url: 'https://www.noticel.com/feed/', source: 'NotiCel', categoria: 'Puerto Rico' },
      { url: 'https://www.elnuevodia.com/rss/latest.rss', source: 'El Nuevo Día', categoria: 'Puerto Rico' },
      { url: 'https://www.diariolasamericas.com/rss/', source: 'Diario Las Américas', categoria: 'Diáspora' },
      { url: 'https://eldiariony.com/feed/', source: 'El Diario NY', categoria: 'Nueva York' }
    ];

    const rssResults = await Promise.allSettled(feeds.map(async (feed) => {
      const r = await fetch(feed.url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(5000) });
      const xml = await r.text();
      const items = [];
      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      let match;
      while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
        const item = match[1];
        // Clean title - strip HTML tags
        let title = (item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item.match(/<title>(.*?)<\/title>/))?.[1] || '';
        title = title.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#124;/g, '|').trim();
        // Clean link - for Google News get the actual article URL
        let link = (item.match(/<link>(.*?)<\/link>/) || item.match(/<guid[^>]*>(.*?)<\/guid>/) || item.match(/<link[^>]*href="([^"]*)"/)) ?.[1] || '#';
        link = link.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
        const pubDate = (item.match(/<pubDate>(.*?)<\/pubDate>/))?.[1] || '';
        const desc = (item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || item.match(/<description>(.*?)<\/description>/))?.[1] || '';
        const cleanDesc = desc.replace(/<[^>]+>/g, '').replace(/https?:\/\/\S+/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
        const summary = cleanDesc.length > 10 ? cleanDesc.slice(0, 150) + '...' : '';
        const date = pubDate ? new Date(pubDate).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        // Try multiple image sources
        const imgMatch = 
          item.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i) ||
          item.match(/<media:content[^>]+url=["']([^"']+)["']/i) ||
          item.match(/<enclosure[^>]+url=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i) ||
          item.match(/<img[^>]+src=["']([^"']+)["']/i);
        const img = imgMatch ? imgMatch[1] : null;
        const tag = feed.categoria;
        if (title && title.length > 5) items.push({ title, link, date, summary, img, source: feed.source, categoria: tag });
      }
      return items;
    }));

    rssResults.filter(r => r.status === 'fulfilled').flatMap(r => r.value).forEach(item => results.push(item));

    res.set('Access-Control-Allow-Origin', '*');
    res.json(results.slice(0, 24));
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/colaboracion-boricua', express.json(), formLimiter, async (req, res) => {
  const { nombre, email, tema, info } = req.body;
  if (!nombre || !email || !tema || !info) return res.status(400).json({ error: 'Faltan campos' });
  try {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Planeta Boricua <connect@ivamarai.com>',
      to: 'connect@ivamarai.com',
      subject: 'Nueva colaboración: ' + tema,
      html: '<h2>Nueva colaboración del Centro de Recursos</h2><p><strong>Nombre:</strong> ' + nombre + '</p><p><strong>Email:</strong> ' + email + '</p><p><strong>Tema:</strong> ' + tema + '</p><p><strong>Información:</strong></p><p>' + info + '</p>'
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Colaboracion error:', err.message);
    res.status(500).json({ error: 'Error enviando' });
  }
});

app.get("/sitemap-boricua.xml", (req, res) => {
  const base = "https://www.masboricuaqueunmofongo.com";
  const urls = [
    `<url><loc>${base}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${base}/recursos</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    `<url><loc>${base}/recursos#mudanzas</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#licencias</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#escuelas</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#servicios</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#salud</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#bancos</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#gobierno</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  ].join("\n  ");

  res.header("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`);
});

app.post('/api/newsletter-boricua', express.json(), formLimiter, async (req, res) => {
  try {
    const { email, source } = req.body;
    if (!email || !email.includes('@')) return res.status(400).json({ error: 'Email inválido' });

    // Save to file
    const subscribersFile = '/data/pb-subscribers.json';
    let subscribers = [];
    if (require('fs').existsSync(subscribersFile)) {
      subscribers = JSON.parse(require('fs').readFileSync(subscribersFile, 'utf8'));
    }
    if (subscribers.find(s => s.email === email)) return res.json({ ok: true });
    subscribers.push({ email, source: source || 'landing', subscribedAt: new Date().toISOString() });
    require('fs').writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));

    // Notify Ivan
    await resend.emails.send({
      from: 'Planeta Boricua <connect@ivamarai.com>',
      to: 'connect@ivamarai.com',
      subject: '🇵🇷 Nuevo suscriptor Planeta Boricua: ' + email,
      html: '<p>Nuevo suscriptor: <strong>' + email + '</strong></p><p>Fuente: ' + (source || 'landing') + '</p><p>Total: ' + subscribers.length + '</p>'
    });

    // Add to Brevo list 4 (Planeta Boricua)
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
        body: JSON.stringify({ email, listIds: [4], updateEnabled: true })
      });
    } catch(brevoErr) {
      console.error('Brevo PB error:', brevoErr.message);
    }

    // Welcome email in Spanish
    await resend.emails.send({
      from: 'Planeta Boricua <connect@ivamarai.com>',
      to: email,
      subject: '🇵🇷 ¡Bienvenido/a a Planeta Boricua!',
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:2rem;text-align:center;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;font-size:1.5rem;margin:0">🇵🇷 ¡Bienvenido/a a Planeta Boricua!</h1>
          <p style="color:rgba(255,255,255,0.8);margin-top:0.5rem;font-size:0.9rem;">Más Boricua Que Un Mofongo</p>
        </div>
        <div style="padding:2rem;background:#fff;border:1px solid #e5e5e0;">
          <p style="font-size:1rem;color:#333">¡Wepa! 🎉 Ya eres parte de la comunidad de Planeta Boricua — el portal de cultura, noticias y orgullo boricua.</p>
          <p style="font-size:0.9rem;color:#555;margin-top:1rem;">Cada semana recibirás lo mejor de Puerto Rico directo a tu email — noticias, cultura, gastronomía, recursos para la diáspora y mucho más.</p>
          <div style="background:#f5f5f0;border-radius:8px;padding:1.2rem;margin:1.5rem 0;">
            <p style="font-size:0.85rem;color:#444;margin:0;"><strong>¿Sabías que tenemos?</strong></p>
            <ul style="font-size:0.85rem;color:#555;margin:0.5rem 0 0 1.2rem;">
              <li>🤖 Nayeli AI — tu asistente boricua</li>
              <li>📋 Centro de Recursos PR↔USA — guías de mudanza, licencias y más</li>
              <li>🏪 Directorio de negocios boricuas en USA y PR</li>
              <li>📰 Noticias frescas de Puerto Rico</li>
            </ul>
          </div>
          <div style="text-align:center;margin:2rem 0;">
            <a href="https://www.masboricuaqueunmofongo.com" style="background:#CE1126;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">Visitar Planeta Boricua →</a>
          </div>
        </div>
        <div style="padding:1rem;text-align:center;background:#f5f5f0;border-radius:0 0 12px 12px;">
          <p style="font-size:0.75rem;color:#888;">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Un proyecto de Ivamar AI LLC</p>
          <p style="font-size:0.7rem;color:#aaa;margin-top:0.3rem;">Recibiste este email porque te suscribiste en Planeta Boricua.</p>
        </div>
      </div>`
    });

    return res.json({ ok: true });
  } catch(e) {
    console.error('PB Subscribe error:', e.message);
    return res.json({ ok: false });
  }
});
