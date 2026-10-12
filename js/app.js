document.documentElement.classList.add('js');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Datos (transcriptos de las historias) ---------- */
const MUCHO = [
  { h: 'para empezar', items: [
    { n: 'Nuestra panera', q: '', d: 'Manteca de ajo negro, pan masa madre. *Opcional: lata de anchoas.', t: 'veg' }
  ]},
  { h: 'bocados', items: [
    { n: 'Yenga', q: '4 un', d: 'Papa bastón crocante por fuera, puré por dentro. Con ketchúp picante y alioli.', t: 'veg sg' },
    { n: 'Mini bikini', q: '2 un', d: 'Crocante y dulce por fuera, con queso fundido por dentro.', t: 'veg' },
    { n: 'Queso y dulce', q: '1 un', d: 'Galleta brisée, gorgonzola, ajo en reducción de vino tinto.', t: 'veg' },
    { n: 'Bonito', q: '1 un', d: 'Tosti, ensaladilla, anchoa.', t: '' },
    { n: 'Yuca', q: '2 un', d: 'Frita con salsa guasacaca.', t: 'veg sg' }
  ]},
  { h: 'para terminar | postres', items: [
    { n: 'Copa Cindor', q: '', d: 'Cremoso de chocolate 72% con aove y escamas de sal. Crema batida con cardamomo y pimienta.', t: 'veg sg' },
    { n: 'Helado de boniato', q: '', d: 'Con caramelo de miso y garrapiñada de pistachos.', t: 'veg sg' },
    { n: 'Panqueque', q: '', d: 'De dulce de leche, flambeado con ron y bocha de helado.', t: 'veg' }
  ]}
];

const POCO = [
  { n: 'Labneh', k: 'labneh', t: 'veg', d: 'Con pistachos caramelizados, miel picante, cebolla crispy, tajín y cebollino. Sale con focaccia.' },
  { n: 'Halloumi, el de bocado', k: 'halloumi', t: 'veg sg', d: 'Queso grillado sobre mermelada de pimientos, palta, aceite de cebollino y brotes.' },
  { n: 'Burrata de invierno 2.0', k: 'burrata', t: 'veg sg', d: 'Burrata, calabaza asada, pesto, nueces caramelizadas y miel.' },
  { n: 'Ensalada César', k: 'cesar', t: '', d: 'Lechuga, croutones, salsa césar, bastante parmesano rallado.' },
  { n: 'Todo rojo', k: 'rojo', t: 'veg sg', d: 'Tomate rosa, frutilla, cebolla morada encurtida. Con vinagreta biri.' },
  { n: 'Setas con puré', k: 'setas', t: 'veg sg', d: 'Puré de zanahorias confitadas, girgolas asadas, salsa de maní y sésamo, cebolla crispy, cilantro y lima.' },
  { n: 'Udon', k: 'udon', t: '', d: 'Fideo grueso japonés. Consultar salsa.' },
  { n: 'Milas de pollo', k: 'milas', t: '', d: 'Milanesa de muslo. Con limón y alioli.' },
  { n: 'Molleja', k: 'molleja', t: '', d: 'Dorada por fuera, manteca por dentro. Con puré de manzana.' },
  { n: 'Entraña', k: 'entrana', t: 'sg', d: 'Vuelta y vuelta con escamas de sal. Con mayo chimi.' }
];

/* Garabatos propios (dibujos simples, no son el arte de la marca) */
const DOODLES = {
  labneh: ['M8 34 Q10 54 32 54 Q54 54 56 34 Z', 'M17 34 Q19 18 32 20 Q45 18 47 34', 'M25 28 Q32 24 39 28', 'M24 42 l1 1', 'M33 46 l1 1', 'M41 42 l1 1', 'M46 10 l-5 9', 'M53 13 l-3 8'],
  halloumi: ['M10 28 L38 20 L54 28 L26 38 Z', 'M10 28 L10 40 L26 50 L26 38', 'M26 50 L54 40 L54 28', 'M20 29 L28 34', 'M28 26 L36 31', 'M36 23 L44 28'],
  burrata: ['M12 38 Q12 22 32 22 Q52 22 52 38 Q52 52 32 52 Q12 52 12 38 Z', 'M25 23 Q32 8 39 23', 'M32 16 Q34 10 37 8', 'M46 44 Q56 44 58 32 Q48 32 46 44'],
  cesar: ['M32 56 Q12 42 18 18 Q32 4 46 18 Q52 42 32 56 Z', 'M32 54 L32 12', 'M32 42 L21 33', 'M32 42 L43 33', 'M32 28 L24 21', 'M32 28 L40 21'],
  rojo: ['M32 54 C8 54 6 30 22 25 C28 23 36 23 42 25 C58 30 56 54 32 54 Z', 'M32 24 L32 12', 'M22 20 L32 25 L42 20', 'M25 15 L32 21 L39 15', 'M24 38 Q28 44 34 44'],
  setas: ['M8 34 Q8 10 32 10 Q56 10 56 34 Z', 'M25 34 Q23 48 25 56 L39 56 Q41 48 39 34', 'M20 24 l1 0', 'M34 18 l1 0', 'M44 27 l1 0', 'M28 27 l1 0'],
  udon: ['M6 32 Q8 56 32 56 Q56 56 58 32 Z', 'M12 30 Q18 14 24 26 Q30 38 36 24 Q42 12 50 28', 'M46 6 L30 32', 'M54 9 L38 33'],
  milas: ['M8 36 Q6 20 22 20 Q30 14 40 20 Q56 22 54 38 Q50 54 34 50 Q16 56 8 36 Z', 'M18 32 l1 1', 'M28 40 l1 1', 'M38 30 l1 1', 'M44 42 l1 1', 'M42 4 A14 14 0 0 1 58 14 Z'],
  molleja: ['M10 36 Q8 18 26 16 Q38 8 50 20 Q60 32 50 46 Q38 56 24 52 Q10 50 10 36 Z', 'M22 32 Q30 26 36 34', 'M28 44 Q38 42 44 34', 'M18 42 l1 1'],
  entrana: ['M5 40 Q3 30 14 26 L48 11 Q60 11 60 22 Q58 31 46 35 L18 50 Q7 52 5 40 Z', 'M17 38 L22 29', 'M28 33 L33 24', 'M39 28 L44 19']
};
const TONES = [['--bordo', '--bordo']];
const doodle = (k, n) => {
  const [st, fl] = TONES[0];
  return `<span class="dw" style="--s:var(${st});--f:var(${fl})"><svg class="doodle" viewBox="0 0 64 64" aria-hidden="true"><g filter="url(#wob)">${DOODLES[k].map((p, i) => `<path pathLength="1" style="--i:${i}" d="${p}"/>`).join('')}</g></svg></span>`;
};

const DRINKS = [
  { h: 'Pingüino', small: 'La jarra de la casa.', items: [
    { n: 'Blanco · Sine Blanco', d: 'El vi a punt, 2023, Terra Alta, Cataluña – ES', c: '#e3b04b' },
    { n: 'Tinto · A.Qua', d: 'El vi a punt, 2023, Toledo – ES', c: '#7b1e3a' }
  ]},
  { h: 'Vinos', small: 'De baja intervención. Por copa o botella: consultar.', items: [] },
  { h: 'Cocktails', items: [
    { n: 'Biribiri', d: '50% vermouth, 50% cold brew', c: '#8a4b1a' },
    { n: 'Dry martini', d: 'Con lavanda', c: '#d9d6a0' },
    { n: 'Espresso martini', d: '', c: '#4a2c1d' },
    { n: 'Margaritajín', d: '', c: '#b9c45a' },
    { n: 'Negroni', d: '', c: '#c63a2c' },
    { n: 'Mosto de verano', d: '', c: '#e8c15a' }
  ]},
  { h: 'Otros', items: [
    { n: 'Agua', d: 'Servicio con o sin gas', c: '#9ec9d6' },
    { n: 'Coca Cola', d: 'De vidrio, 330 ml', c: '#2a1714' },
    { n: 'Vermouth', d: '', c: '#8a3a1a' },
    { n: 'Cerveza', d: '', c: '#e0a52a' },
    { n: 'Baileys', d: '', c: '#d8c3a0' }
  ]}
];

/* ---------- Render ---------- */
document.getElementById('mucho-list').innerHTML = MUCHO.map(g =>
  `<section class="grp"><h3>${g.h}</h3><ul>${g.items.map(it =>
    `<li class="dish" data-tags="${it.t}">
      <button class="row" type="button" aria-expanded="false">
        <span class="name">${it.n}</span><span class="qty">${it.q}</span>
        <span class="desc">${it.d}</span>
      </button>
      <div class="peek"><div><div class="polaroid"><div class="shot">foto</div><p>${it.n}</p></div></div></div>
    </li>`).join('')}</ul></section>`).join('');

document.getElementById('poco-list').innerHTML = POCO.map((p, n) =>
  `<li data-tags="${p.t}" class="pdish"><button class="pd" type="button">${doodle(p.k, n)}<span><h4>${p.n}</h4><p>${p.d}</p></span></button></li>`).join('');

document.getElementById('drinks').innerHTML = DRINKS.map(g =>
  `<div class="panel"><h3>${g.h}</h3>${g.small ? `<p class="small">${g.small}</p>` : ''}${g.items.map(i =>
    `<button class="drink" type="button" aria-pressed="false" data-c="${i.c}" style="--c:${i.c}"><span class="dot"></span><span class="dn">${i.n}</span>${i.d ? `<span class="dd">${i.d}</span>` : '<span class="dd"></span>'}</button>`).join('')}</div>`).join('');


/* ---------- Apertura: velas que se soplan y parallax ---------- */
(function () {
  const hero = document.getElementById('top'), stage = document.getElementById('stage'), body = document.getElementById('hbody');
  [['w1', 'out1'], ['w2', 'out2']].forEach(([id, cls]) => {
    document.getElementById(id).addEventListener('click', () => {
      if (hero.classList.contains(cls)) return;
      hero.classList.add(cls);
      setTimeout(() => hero.classList.remove(cls), 2200);
    });
  });
  if (RM) return;
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(scrollY, innerHeight);
      stage.style.transform = `translateX(-50%) translateY(${y * .22}px)`;
      body.style.transform = `translateY(${-y * .12}px)`;
      body.style.opacity = Math.max(0, 1 - y / (innerHeight * .7));
      ticking = false;
    });
  }, { passive: true });
})();

/* ---------- Mucho biri: foto al tocar ---------- */
document.getElementById('mucho-list').addEventListener('click', e => {
  const b = e.target.closest('.row'); if (!b) return;
  const li = b.parentElement, open = li.classList.toggle('open');
  b.setAttribute('aria-expanded', open);
});

/* ---------- Filtro (demo) ---------- */
const chips = [...document.querySelectorAll('.chip')];
const filterables = [...document.querySelectorAll('.dish, .pdish')];
const countEl = document.getElementById('count');
function applyFilter() {
  const act = chips.filter(c => c.getAttribute('aria-pressed') === 'true').map(c => c.dataset.t);
  let n = 0;
  filterables.forEach(el => {
    const tags = el.dataset.tags.split(' ');
    const ok = act.every(t => tags.includes(t));
    el.classList.toggle('dim', !ok);
    if (ok) n++;
  });
  countEl.textContent = act.length ? `${n} de ${filterables.length} platos` : '';
}
chips.forEach(c => c.addEventListener('click', () => {
  c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true');
  applyFilter();
}));

/* ---------- Poco biri: swap de título y garabatos que se trazan ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target;
  if (el.id === 't-poco') el.classList.add('go');
  else el.querySelector('.dw').classList.add('draw');
  io.unobserve(el);
}), { threshold: .55 });
io.observe(document.getElementById('t-poco'));
document.querySelectorAll('.pdish').forEach(el => io.observe(el));
document.getElementById('poco-list').addEventListener('click', e => {
  const d = e.target.closest('.pdish')?.querySelector('.dw'); if (!d) return;
  d.classList.remove('draw'); void d.getBoundingClientRect(); d.classList.add('draw');
});

/* ---------- Bebidas: líquido ---------- */
(function () {
  const sec = document.getElementById('bebidas');
  const cv = document.getElementById('liq');
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  const pingu = document.getElementById('pingu');
  const spout = document.getElementById('spout');
  const COLS = ['#7b1e3a', '#c0782a', '#2a1710', '#b9c45a', '#c63a2c', '#e3b04b', '#4a2c1d', '#d9d6a0'];
  const S = 6;            // px de pantalla por px del canvas (baja resolución = rápido)
  const K = 3 / S;        // escala de radios respecto del diseño original
  const rgbOf = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  let W = 0, H = 0, blobs = [], running = false, t = 0, poured = false, lastY = scrollY, last = null;

  function size() {
    const w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    W = Math.max(60, Math.round(w / S)); H = Math.max(100, Math.round(h / S));
    cv.width = W; cv.height = H;
    if (!blobs.length) {
      const N = Math.max(16, Math.min(46, Math.round(W * H * .42 / (Math.PI * 13 * K * 13 * K))));
      for (let i = 0; i < N; i++) blobs.push({ x: W / 2, y: -60, vx: 0, vy: 0, r: (9 + Math.random() * 9) * K, c: COLS[i % COLS.length], rgb: rgbOf(COLS[i % COLS.length]), on: false });
    }
    blobs.forEach(b => { b.x = Math.min(b.x, W); b.y = Math.min(b.y, H); });
  }

  function step() {
    t++;
    const sl = Math.sin(t * .012) * .03;
    const on = blobs.filter(b => b.on);
    for (const b of on) {
      b.vy += .32 * K; b.vx += sl * K; b.vx *= .985; b.vy *= .985;
      b.x += b.vx; b.y += b.vy;
      const m = b.r * .6;
      if (b.x < m) { b.x = m; b.vx *= -.3; } else if (b.x > W - m) { b.x = W - m; b.vx *= -.3; }
      if (b.y > H - m) { b.y = H - m; b.vy *= -.25; b.vx *= .98; }
    }
    for (let i = 0; i < on.length; i++) for (let j = i + 1; j < on.length; j++) {
      const a = on[i], b = on[j];
      let dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || .01, min = (a.r + b.r) * .8;
      if (d < min) {
        const o = (min - d) * .25; dx /= d; dy /= d;
        a.x -= dx * o; a.y -= dy * o; b.x += dx * o; b.y += dy * o;
      }
    }
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const b of blobs) {
      if (!b.on) continue;
      const R = b.r * 1.9, [r, g, bl] = b.rgb;
      const gr = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, R);
      gr.addColorStop(0, `rgba(${r},${g},${bl},1)`);
      gr.addColorStop(1, `rgba(${r},${g},${bl},0)`);
      ctx.fillStyle = gr;
      ctx.fillRect(b.x - R, b.y - R, R * 2, R * 2);
    }
    // umbral del alfa: junta las manchas en una sola masa de líquido
    const img = ctx.getImageData(0, 0, W, H), d = img.data;
    for (let i = 3; i < d.length; i += 4) {
      const a = d[i];
      if (a === 0) continue;
      const t = (a - 105) / 30;
      d[i] = t <= 0 ? 0 : t >= 1 ? 255 : t * 255;
    }
    ctx.putImageData(img, 0, 0);
  }
  let raf = 0;
  let prev = 0;
  function loop(ts) {
    if (!running) return;
    const dt = prev ? ts - prev : 16.7; prev = ts;
    step();
    if (dt > 24) step();   // si el celular va lento, adelanta la física en vez de verse en cámara lenta
    draw();
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!running && !RM) { running = true; prev = 0; raf = requestAnimationFrame(loop); } }
  function stop() { running = false; cancelAnimationFrame(raf); }

  function pourAt(sx, sy) {
    blobs.forEach((b, i) => setTimeout(() => {
      b.on = true; b.x = sx + (Math.random() - .5) * 6; b.y = sy; b.vx = (Math.random() - .5) * 1.2 * K; b.vy = (1 + Math.random()) * K;
    }, i * 70));
  }
  function settleNow() {
    blobs.forEach(b => { b.on = true; b.x = Math.random() * W; b.y = H - Math.random() * H * .25; });
    for (let i = 0; i < 260; i++) step();
    draw();
  }
  function trigger() {
    if (poured) return; poured = true;
    if (RM) { settleNow(); pingu.classList.add('go'); return; }
    pingu.classList.add('go');
    setTimeout(() => {
      const sp = spout.getBoundingClientRect(), cr = cv.getBoundingClientRect();
      pourAt((sp.left - cr.left) / cr.width * W, Math.max(0, (sp.top - cr.top) / cr.height * H));
    }, 850);
  }

  function toCanvas(ev) {
    const r = cv.getBoundingClientRect();
    return [(ev.clientX - r.left) / r.width * W, (ev.clientY - r.top) / r.height * H];
  }
  function force(px, py, vx, vy, rad) {
    for (const b of blobs) {
      if (!b.on) continue;
      const dx = b.x - px, dy = b.y - py, d = Math.hypot(dx, dy);
      if (d < rad && d > .01) { const k = 1 - d / rad; b.vx += vx * k * .6 + dx / d * k * .8; b.vy += vy * k * .6 + dy / d * k * .8; }
    }
    if (RM) { for (let i = 0; i < 40; i++) step(); draw(); }
  }
  let lp = null;
  sec.addEventListener('pointermove', ev => {
    if (!poured) return;
    const [x, y] = toCanvas(ev);
    if (lp) force(x, y, Math.max(-3, Math.min(3, x - lp[0])), Math.max(-3, Math.min(3, y - lp[1])), 15);
    lp = [x, y];
  });
  sec.addEventListener('pointerleave', () => { lp = null; });
  sec.addEventListener('pointerdown', ev => {
    if (!poured || ev.target.closest('.drink')) return;
    const [x, y] = toCanvas(ev);
    for (const b of blobs) {
      if (!b.on) continue;
      const dx = b.x - x, dy = b.y - y, d = Math.hypot(dx, dy);
      if (d < 23 && d > .01) { const k = 1 - d / 23; b.vx += dx / d * k * 2; b.vy -= 1 + k * 2; }
    }
  });

  function tint(color) {
    if (!poured) return;
    const top = blobs.filter(b => b.on).sort((a, b) => a.y - b.y).slice(0, 9);
    top.forEach(b => { b.c = color; b.rgb = rgbOf(color); b.vy -= 3 + Math.random() * 2; b.vx += (Math.random() - .5) * 2; });
    if (RM) { for (let i = 0; i < 40; i++) step(); }
    draw();
  }
  document.getElementById('drinks').addEventListener('click', e => {
    const d = e.target.closest('.drink'); if (!d) return;
    document.querySelectorAll('.drink[aria-pressed="true"]').forEach(x => x.setAttribute('aria-pressed', 'false'));
    d.setAttribute('aria-pressed', 'true');
    tint(d.dataset.c);
  });

  function onScroll() {
    const dy = scrollY - lastY; lastY = scrollY;
    if (!poured && sec.getBoundingClientRect().top <= innerHeight * .05) trigger();
    if (poured && !RM) {
      const m = Math.min(Math.abs(dy), 40);
      if (m > 2) for (const b of blobs) if (b.on) { b.vx += (Math.random() - .5) * m * .05 * K; b.vy -= Math.random() * m * .05 * K; }
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', size);

  size();
  new IntersectionObserver(es => {
    if (es[0].isIntersecting) { start(); onScroll(); } else stop();
  }, { rootMargin: '80px' }).observe(sec);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
})();
