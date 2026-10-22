/*
 * TE-32323 mobile-browser vision-click lab — shared recorder.
 *
 * Every element a test may target carries data-qa="<id>". Each tap/click is recorded so a KaneAI
 * step is judged by WHAT it hit, not by whether the step went green (the bug passes silently):
 *   window.__qa.last  — data-qa of the last element hit ("NONE" when the tap hit no target)
 *   window.__qa.log   — every hit: {id, x, y, top, h, t} (tap point and target rect, CSS px)
 *   document.title    — "LAST=<id>" so the value is visible without JS too
 *   #qa-last          — the same value on the page
 * Read it back from a JS step:  return window.__qa.last   /   return JSON.stringify(window.__qa.log)
 */
(function () {
  const qa = (window.__qa = { last: 'NONE', log: [], values: {} });

  function show(id) {
    qa.last = id;
    document.title = 'LAST=' + id;
    const el = document.getElementById('qa-last');
    if (el) el.textContent = id;
  }

  function record(id, ev, target) {
    const r = target ? target.getBoundingClientRect() : { top: -1, height: -1 };
    qa.log.push({
      id,
      x: ev && 'clientX' in ev ? Math.round(ev.clientX) : null,
      y: ev && 'clientY' in ev ? Math.round(ev.clientY) : null,
      top: Math.round(r.top),
      h: Math.round(r.height),
      t: Date.now(),
    });
    show(id);
  }
  qa.record = record;

  document.addEventListener(
    'click',
    (ev) => {
      const hit = ev.target.closest('[data-qa]');
      record(hit ? hit.getAttribute('data-qa') : 'NONE', ev, hit);
    },
    true,
  );

  // Inputs and native selects: record the value against the field that received it.
  document.addEventListener('change', (ev) => {
    const f = ev.target.closest('[data-qa]');
    if (!f) return;
    qa.values[f.getAttribute('data-qa')] = f.value;
    record('change:' + f.getAttribute('data-qa') + '=' + f.value, null, f);
  });
  document.addEventListener('input', (ev) => {
    const f = ev.target.closest('[data-qa]');
    if (f) qa.values[f.getAttribute('data-qa')] = f.value;
  });
  document.addEventListener('focusin', (ev) => {
    const f = ev.target.closest('input[data-qa], textarea[data-qa]');
    if (f) qa.focus = f.getAttribute('data-qa');
  });

  // Custom (uhaul-style) dropdowns: the trigger toggles its own list; an option records dd:opt.
  document.querySelectorAll('.dd').forEach((dd) => {
    const trigger = dd.querySelector('.dd-trigger');
    const list = dd.querySelector('.dd-list');
    trigger.addEventListener('click', () => {
      document.querySelectorAll('.dd-list.open').forEach((l) => l !== list && l.classList.remove('open'));
      list.classList.toggle('open');
      qa.open = list.classList.contains('open') ? trigger.getAttribute('data-qa') : 'NONE';
    });
    list.querySelectorAll('li').forEach((li) =>
      li.addEventListener('click', () => {
        trigger.querySelector('.dd-value').textContent = li.textContent;
        qa.values[trigger.getAttribute('data-qa')] = li.textContent;
        list.classList.remove('open');
        qa.open = 'NONE';
      }),
    );
  });

  // Canvas: report which painted box was hit (no DOM node exists for it).
  const cv = document.getElementById('qa-canvas');
  if (cv) {
    const ctx = cv.getContext('2d');
    const boxes = [
      { name: 'RED', color: '#d23c3c', x: 12, y: 14, w: 92, h: 56 },
      { name: 'GREEN', color: '#2f9e5a', x: 116, y: 14, w: 92, h: 56 },
      { name: 'BLUE', color: '#3166d6', x: 220, y: 14, w: 92, h: 56 },
      { name: 'BLACK', color: '#222', x: 12, y: 84, w: 92, h: 56 },
      { name: 'ORANGE', color: '#e0832b', x: 116, y: 84, w: 92, h: 56 },
      { name: 'PURPLE', color: '#7d45c4', x: 220, y: 84, w: 92, h: 56 },
    ];
    const dpr = window.devicePixelRatio || 1;
    cv.width = cv.clientWidth * dpr;
    cv.height = cv.clientHeight * dpr;
    ctx.scale(dpr, dpr);
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    boxes.forEach((b) => {
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.fillStyle = '#fff';
      ctx.fillText(b.name, b.x + b.w / 2, b.y + b.h / 2);
    });
    cv.addEventListener('click', (ev) => {
      const r = cv.getBoundingClientRect();
      const sx = (ev.clientX - r.left) * (cv.clientWidth / r.width);
      const sy = (ev.clientY - r.top) * (cv.clientHeight / r.height);
      const b = boxes.find((k) => sx >= k.x && sx <= k.x + k.w && sy >= k.y && sy <= k.y + k.h);
      // The capture listener already logged "canvas"; refine it with the painted box.
      record('canvas:' + (b ? b.name : 'MISS'), ev, cv);
    });
  }

  // iframe buttons post their hit to the parent.
  window.addEventListener('message', (ev) => {
    if (ev.data && ev.data.qa) record(ev.data.qa, null, document.getElementById('qa-frame'));
  });
})();
