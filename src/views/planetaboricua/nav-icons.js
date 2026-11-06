// Original inline SVG marks: one palette, stroke weight and coordinate system.
const hands = '<path d="m3 14 2-5c.5-1 2-.6 1.8.5l-.5 3M21 14l-2-5c-.5-1-2-.6-1.8.5l.5 3M2 14l4 6h4v-4l-3-3c-1-1-2 .4-1 1.4L8 16M22 14l-4 6h-4v-4l3-3c1-1 2 .4 1 1.4L16 16"/>';
const art = hands+'<path class="pb-icon-accent" d="m12 4 3 3-3 4-3-4z"/>';
const marks = {
  home:'<path d="m3 10 9-7 9 7M5 9v11h14V9M10 20v-7h4v7"/><path class="pb-icon-accent" d="M17 4v3"/>',
  balcony:'<path d="M7 13V7a5 5 0 0 1 10 0v6M4 13h16v8H4zM3 17h18M8 13v8m4-8v8m4-8v8"/><path class="pb-icon-accent" d="M12 3v9"/>',
  artisans:art,
  weekly:hands+'<path class="pb-icon-accent" d="m12 2 1.3 2.8 3.1.4-2.2 2.2.5 3.1L12 9l-2.7 1.5.5-3.1-2.2-2.2 3.1-.4z"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18M7 14h2m4 0h2m-8 3h2"/><path class="pb-icon-accent" d="m14 17 2 2 3-4"/>',
  plate:'<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M6 8h2m8 0h2M6 16h12"/><path class="pb-icon-accent" d="M5 11v3l3-1.5z"/><path d="M11 14v-3h2a1 1 0 0 1 0 2h-2m5 1v-3h2a1 1 0 0 1 0 2h-2m1 0 2 1"/>',
  resources:'<path d="M3 8V5h6l2 3h10v12H3zM3 8h18"/><path class="pb-icon-accent" d="M8 12h8m-8 4h5"/>',
  travel:'<rect x="4" y="6" width="16" height="15" rx="2"/><path d="M9 6V3h6v3M8 7v13m8-13v13"/><path class="pb-icon-accent" d="m10 13 4-2m-1 0 1 2"/>',
  news:'<path d="M5 3h16v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8h2v11M9 7h8M9 16h8m-8-3h8"/><path class="pb-icon-accent" d="M9 10h5"/>',
  newsletter:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/><path class="pb-icon-accent" d="m4 18 5-5m11 5-5-5"/>',
  about:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3"/><path class="pb-icon-accent" d="M17 4a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 4v3"/>',
  ads:'<path d="M4 10h4l11-5v14L8 14H4zM7 14l1 7h4l-2-6"/><path class="pb-icon-accent" d="M22 9v6"/>',
  contact:'<path d="M21 12a9 9 0 0 1-13 8l-5 1 1-5a9 9 0 1 1 17-4Z"/><path class="pb-icon-accent" d="M8 9h8m-8 4h5"/>',
  profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/><path class="pb-icon-accent" d="M10 8h4"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  menu:'<path d="M4 6h16M4 18h16"/><path class="pb-icon-accent" d="M4 12h16"/>'
};
function navIcon(name) {
  if (!Object.hasOwn(marks,name)) return '';
  return `<svg class="pb-nav-icon" data-pb-icon="${name}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${marks[name]}</svg>`;
}
module.exports = { navIcon };
