'use strict';
const PUBLISHER='ca-pub-2526350815852271';
const SCRIPT=`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER}" crossorigin="anonymous"></script>`;
function withPBAdSense(html,{hostname='',statusCode=200,privatePage=false}={}) {
  if (!['masboricuaqueunmofongo.com','www.masboricuaqueunmofongo.com'].includes(String(hostname).toLowerCase()) || privatePage || statusCode!==200 || typeof html!=='string' || !/<\/head\s*>/i.test(html)) return html;
  if (/<meta\b(?=[^>]*\bname\s*=\s*["']robots["'])(?=[^>]*\bcontent\s*=\s*["'][^"']*noindex)[^>]*>/i.test(html)) return html;
  if (/<script\b[^>]*\bsrc\s*=\s*["'][^"']*\/adsbygoogle\.js(?:\?|["'])/i.test(html)) return html;
  return html.replace(/<\/head\s*>/i,SCRIPT+'$&');
}
module.exports={withPBAdSense,PUBLISHER,SCRIPT};
