const STAY22_LMA_ID = '6a4026801c8b38e97c6ad9fd';

const TRAVEL_TERMS = /\b(?:viaj(?:e|es|ar|ero|era|eros|eras)|turismo|turista|hotel(?:es)?|hospedaje|alojamiento|reserv(?:a|as|ar)|vuelo(?:s)?|aerol[ií]nea|aeropuerto|crucero|vacaciones|escapada|destinos?|itinerario|road\s*trip|booking|expedia|trip\.com|airbnb|parador(?:es)?|vieques|culebra|orlando|florida|nueva\s+york|new\s+york|filadelfia|chicago)\b/i;

function stripMarkup(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ');
}

function hasTravelIntent(content = {}) {
  // Use editorial metadata rather than the full HTML body. Historical articles can
  // contain generic travel affiliate footers that should not classify the story.
  const text = [content.title, content.summary]
    .map(stripMarkup)
    .join(' ');
  return TRAVEL_TERMS.test(text);
}

function renderStay22({ enabled = true } = {}) {
  if (!enabled) return '';
  return `<script data-pb-travel-affiliate="stay22">
(function(s,t,a,y,twenty,two){s.Stay22=s.Stay22||{};s.Stay22.params={lmaID:${JSON.stringify(STAY22_LMA_ID)}};twenty=t.createElement(a);two=t.getElementsByTagName(a)[0];twenty.async=1;twenty.src=y;two.parentNode.insertBefore(twenty,two);})(window,document,"script","https://scripts.stay22.com/letmeallez.js");
</script>`;
}

module.exports = { STAY22_LMA_ID, hasTravelIntent, renderStay22 };
