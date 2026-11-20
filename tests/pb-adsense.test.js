'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {withPBAdSense,SCRIPT}=require('../src/services/pb-adsense');
const html='<!doctype html><html><head><title>PB</title></head><body>Artículo</body></html>';
const host={hostname:'www.masboricuaqueunmofongo.com'};
test('The authorized loader is present exactly once inside the head of public HTML',()=>{
 const result=withPBAdSense(html,host);
 assert.ok(result.includes(SCRIPT));assert.ok(result.indexOf(SCRIPT)<result.indexOf('</head>'));
 assert.match(result,/client=ca-pub-2526350815852271/);assert.match(result,/async[^>]+crossorigin="anonymous"/);
 assert.equal(withPBAdSense(result,host),result);
 assert.ok(withPBAdSense(html,{hostname:'masboricuaqueunmofongo.com'}).includes(SCRIPT));
});
test('Private, unindexed, error and unrelated-host responses do not receive the loader',()=>{
 for(const options of [{...host,privatePage:true},{...host,statusCode:404},{...host,statusCode:500},{hostname:'evil-masboricuaqueunmofongo.com'},{hostname:'ivamar-web.onrender.com'}]) assert.equal(withPBAdSense(html,options),html);
 for(const meta of ['<meta name="robots" content="noindex,nofollow">',"<meta content='noindex,follow' name='robots'>"]){const page=html.replace('</head>',meta+'</head>');assert.equal(withPBAdSense(page,host),page);}
 assert.equal(withPBAdSense('{"ok":true}',host),'{"ok":true}');
});
