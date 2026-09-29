/*
 * TE-29629 grid-action lab.
 *
 * Every click is recorded in the sticky status bar ("Last action") and the event log, so a
 * KaneAI step can be judged by WHAT it hit, not by whether the step went green:
 *   EDIT / DELETE / VIEW / COPY ...  — the named icon was hit, on the named row
 *   MISS                             — the Action cell was hit, but outside every icon (the bug)
 *   BLOCKED                          — a disabled icon was hit
 *   CELL                             — a non-action cell was hit
 */
(function () {
  const PATHS = {
    edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-7l-1 1H5v2h14V4z',
    view: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
    copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
    more: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
    download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
    link: 'M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
    check: 'M9 16.17 4.83 12l-1.42 1.42L9 19 21 7l-1.41-1.41z',
    close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  };
  const VERB = {
    edit: 'EDIT', delete: 'DELETE', view: 'VIEW', copy: 'COPY', more: 'MORE',
    download: 'DOWNLOAD', link: 'OPEN LINK', check: 'SAVE', close: 'CANCEL',
  };
  const TITLE = {
    edit: 'Edit', delete: 'Delete', view: 'View', copy: 'Duplicate', more: 'More options',
    download: 'Download', link: 'Open profile', check: 'Save', close: 'Cancel',
  };

  const NAMES = [
    ['Aarav Mehta', 'Sales Rep', 'Pune'], ['Priya Sharma', 'Project Manager', 'Austin'],
    ["Liam O'Connor", 'Installer', 'Dublin'], ['Sofía García', 'Estimator', 'Madrid'],
    ['Chen Wei', 'Sales Rep', 'Shanghai'], ['Fatima Zahra', 'Scheduler', 'Rabat'],
    ['Noah Williams', 'Installer', 'Denver'], ['Yuki Tanaka', 'Admin', 'Osaka'],
    ['Olivia Brown', 'Estimator', 'Leeds'], ['Mateo Rossi', 'Installer', 'Turin'],
    ['Amara Okafor', 'Project Manager', 'Lagos'], ['Lucas Silva', 'Sales Rep', 'Recife'],
    ['Emma Johansson', 'Scheduler', 'Malmö'], ['Arjun Nair', 'Installer', 'Kochi'],
    ['Hana Kim', 'Admin', 'Busan'], ['Diego Torres', 'Estimator', 'Lima'],
    ['Zoe Martin', 'Sales Rep', 'Lyon'], ['Omar Haddad', 'Installer', 'Amman'],
    ['Ines Duarte', 'Scheduler', 'Porto'], ['Ethan Clarke', 'Project Manager', 'Perth'],
    ['Maya Patel', 'Sales Rep', 'Leicester'], ['Jonas Weber', 'Installer', 'Bremen'],
    ['Aisha Bello', 'Estimator', 'Abuja'], ['Ravi Iyer', 'Scheduler', 'Chennai'],
    ['Grace Lee', 'Admin', 'Seattle'], ['Tomás Novak', 'Installer', 'Brno'],
    ['Nina Petrova', 'Project Manager', 'Sofia'], ['Kofi Mensah', 'Sales Rep', 'Accra'],
    ['Lea Fischer', 'Estimator', 'Graz'], ['Samir Khan', 'Installer', 'Karachi'],
    ['Chloe Dupont', 'Scheduler', 'Nantes'], ['Daniel Cohen', 'Sales Rep', 'Haifa'],
    ['Mei Lin', 'Admin', 'Taipei'], ['Oscar Lindqvist', 'Installer', 'Uppsala'],
    ['Ana Popescu', 'Estimator', 'Cluj'], ['Kenji Sato', 'Project Manager', 'Sendai'],
    ['Laura Bianchi', 'Sales Rep', 'Bologna'], ['Victor Mwangi', 'Installer', 'Nairobi'],
    ['Sara Nilsen', 'Scheduler', 'Bergen'], ['Ahmed Saleh', 'Estimator', 'Cairo'],
    ['Julia Novak', 'Admin', 'Zagreb'], ['Pablo Ruiz', 'Installer', 'Seville'],
    ['Leah Goldberg', 'Sales Rep', 'Boston'], ['Rohan Das', 'Scheduler', 'Kolkata'],
  ];
  // Each grid on a page takes the NEXT names, so every row name is unique per page and a
  // prompt such as "edit Chen Wei" can only mean one row.
  let nextName = 0;
  const people = (n) => NAMES.slice(nextName, (nextName += n)).map(([name, role, city], i) => ({
    id: i + 1,
    name,
    email: name.toLowerCase().normalize('NFD').replace(/[̀-ͯ']/g, '').replace(/\s+/g, '.') + '@renlab.test',
    role,
    city,
    status: i % 4 === 3 ? 'Inactive' : 'Active',
    selected: false,
    active: i % 3 !== 1,
  }));

  const COL_LABEL = {
    id: '#', name: 'Name', email: 'Email', role: 'Role', status: 'Status', city: 'City',
    phone: 'Phone', region: 'Region', source: 'Lead source', created: 'Created', owner: 'Owner',
    updated: 'Updated', tags: 'Tags', select: 'Select', active: 'Active', project: 'Project',
    zip: 'ZIP', budget: 'Budget',
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function svg(act) {
    return `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="${PATHS[act]}"/></svg>`;
  }

  // Unlabelled icons are a <span> with an aria-hidden svg: no role, no name, no tabindex —
  // they produce NO accessibility entry, and the gridcell around them has an empty name.
  // This is the structure TE-29629 reports.
  function icon(act, row, o) {
    const cls = ['ic', o.iconClass || '', act === 'delete' ? 'danger' : '', o.locked ? 'disabled' : ''].join(' ').trim();
    if (act === 'link') {
      return o.labelled
        ? `<a class="${cls}" data-act="link" href="#profile-${row.id}" aria-label="Open profile ${esc(row.name)}">${svg(act)}</a>`
        : `<a class="${cls}" data-act="link" href="#profile-${row.id}">${svg(act)}</a>`;
    }
    if (o.labelled) {
      return `<button type="button" class="${cls}" data-act="${act}" aria-label="${TITLE[act]} ${esc(row.name)}" title="${TITLE[act]}"${o.locked ? ' aria-disabled="true"' : ''}>${svg(act)}</button>`;
    }
    return `<span class="${cls}" data-act="${act}">${svg(act)}</span>`;
  }

  function cellValue(col, r) {
    switch (col) {
      case 'status':
        return `<span class="badge ${r.status === 'Inactive' ? 'inactive' : ''}">${r.status}</span>`;
      case 'statusSelect':
        return `<select data-status aria-label="Status for ${esc(r.name)}">${['Active', 'Inactive', 'On hold']
          .map((s) => `<option${s === r.status ? ' selected' : ''}>${s}</option>`).join('')}</select>`;
      case 'select': return `<span class="fake-check ${r.selected ? 'on' : ''}" data-act="select"></span>`;
      case 'active': return `<span class="fake-switch ${r.active ? 'on' : ''}" data-act="active"></span>`;
      case 'phone': return `+1 (555) 01${String(r.id).padStart(2, '0')}-${1000 + r.id * 37}`;
      case 'region': return ['North', 'South', 'East', 'West'][r.id % 4];
      case 'source': return ['Referral', 'Web form', 'Home show', 'Door knock'][r.id % 4];
      case 'created': return `2026-0${(r.id % 8) + 1}-1${r.id % 9}`;
      case 'updated': return `2026-09-${String(10 + r.id).padStart(2, '0')}`;
      case 'owner': return NAMES[(r.id + 3) % NAMES.length][0];
      case 'tags': return ['bath', 'windows', 'roofing', 'siding'][r.id % 4];
      case 'project': return `PRJ-${4100 + r.id * 7}`;
      case 'zip': return String(73000 + r.id * 113);
      case 'budget': return `$${(12 + r.id * 3).toLocaleString()},500`;
      default: return esc(r[col] ?? '');
    }
  }

  const grids = {};
  let seq = 0;

  function record(kind, name, gridId, detail) {
    seq += 1;
    const last = document.getElementById('last-action');
    const text = `${kind} — ${name}${gridId ? ` (grid ${gridId})` : ''}`;
    if (last) {
      last.textContent = text;
      last.className = kind === 'MISS' || kind === 'BLOCKED' ? 'miss' : 'hit';
    }
    document.body.dataset.lastAction = kind;
    document.body.dataset.lastRow = name;
    const tbody = document.getElementById('event-log');
    if (tbody) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${seq}</td><td>${esc(kind)}</td><td>${esc(name)}</td><td>${esc(gridId || '-')}</td><td>${esc(detail || '')}</td><td>${new Date().toLocaleTimeString()}</td>`;
      tbody.prepend(tr);
    }
    window.__labLog = window.__labLog || [];
    window.__labLog.push({ seq, kind, name, grid: gridId, detail });
  }

  function renderTable(g) {
    const o = g.opts;
    const cols = o.cols;
    const head = cols.map((c) => `<th role="columnheader">${COL_LABEL[c] || COL_LABEL[c.replace('Select', '')] || c}</th>`).join('')
      + `<th role="columnheader" style="width:${o.actionWidth}px">${o.actionHeader || 'Action'}</th>`;
    const body = g.rows.map((r) => {
      const editing = g.editing === r.id;
      const cells = cols.map((c) => {
        if (c === 'name' && editing) {
          return `<td role="gridcell" data-col="name"><input class="inline-edit" aria-label="Full name" value="${esc(r.name)}"></td>`;
        }
        return `<td role="gridcell" data-col="${c}">${cellValue(c, r)}</td>`;
      }).join('');
      let actions;
      if (!g.ready) actions = '<span class="skeleton"></span>';
      else if ((o.emptyFor || []).includes(r.id)) actions = '';
      else if (editing) actions = ['check', 'close'].map((a) => icon(a, r, o)).join('');
      else {
        const locked = (o.lockedFor || []).includes(r.id);
        actions = o.actions.map((a) => icon(a, r, { ...o, locked })).join('');
      }
      return `<tr role="row" data-row="${r.id}" data-name="${esc(r.name)}">${cells}`
        + `<td role="gridcell" class="act-cell" style="width:${o.actionWidth}px"><div class="act-group ${o.align}">${actions}</div></td></tr>`;
    }).join('');
    g.mount.innerHTML = `<table class="grid ${o.className || ''}" role="grid" aria-label="${esc(o.caption || `Grid ${g.id}`)}" data-grid="${g.id}">`
      + `<thead><tr role="row">${head}</tr></thead><tbody>${body}</tbody></table>`;
  }

  function grid(selector, opts) {
    const o = {
      cols: ['name', 'email', 'role', 'status'],
      actions: ['edit'],
      align: 'left',
      actionWidth: 96,
      rows: 8,
      ...opts,
    };
    const g = {
      id: o.id,
      opts: o,
      mount: document.querySelector(selector),
      rows: people(o.rows),
      editing: null,
      ready: !o.lateMs,
    };
    grids[g.id] = g;
    renderTable(g);
    if (o.lateMs) setTimeout(() => { g.ready = true; renderTable(g); }, o.lateMs);
    return g;
  }

  // Non-table containers (list items, flex rows, cards) share the same row contract.
  function container(selector, { id, kind, rows = 5, actions = ['edit'], labelled = false }) {
    const g = { id, opts: { actions, labelled }, rows: people(rows), mount: document.querySelector(selector), ready: true, kind };
    grids[id] = g;
    const icons = (r) => actions.map((a) => icon(a, r, { labelled })).join('');
    if (kind === 'list') {
      g.mount.innerHTML = `<ul class="plain" role="list" data-grid="${id}">${g.rows.map((r) =>
        `<li role="listitem" data-row="${r.id}" data-name="${esc(r.name)}"><span>${esc(r.name)} — weekly summary email</span><span class="act-cell">${icons(r)}</span></li>`).join('')}</ul>`;
    } else if (kind === 'flex') {
      g.mount.innerHTML = `<div data-grid="${id}">${g.rows.map((r) =>
        `<div class="flex-row" data-row="${r.id}" data-name="${esc(r.name)}"><span class="grow">${esc(r.name)}</span><span class="grow">${esc(r.role)}</span><span class="grow">${esc(r.city)}</span><span class="act-cell" style="width:90px">${icons(r)}</span></div>`).join('')}</div>`;
    } else if (kind === 'plain-table') {
      g.mount.innerHTML = `<table class="grid" data-grid="${id}"><thead><tr><th>Name</th><th>City</th><th>Action</th></tr></thead><tbody>${g.rows.map((r) =>
        `<tr data-row="${r.id}" data-name="${esc(r.name)}"><td data-col="name">${esc(r.name)}</td><td data-col="city">${esc(r.city)}</td><td class="act-cell" style="width:110px"><div class="act-group">${icons(r)}</div></td></tr>`).join('')}</tbody></table>`;
    } else if (kind === 'cards') {
      g.mount.innerHTML = `<div class="cards" data-grid="${id}">${g.rows.map((r) =>
        `<div class="mini-card act-cell" data-row="${r.id}" data-name="${esc(r.name)}"><strong>${esc(r.name)}</strong><br><span style="color:#667085">${esc(r.role)} · ${esc(r.city)}</span>${icons(r)}</div>`).join('')}</div>`;
    }
    return g;
  }

  function closeDialog() {
    const ov = document.querySelector('.overlay');
    if (ov) ov.remove();
  }

  function dialog(title, bodyHtml, buttons) {
    closeDialog();
    const ov = document.createElement('div');
    ov.className = 'overlay';
    ov.innerHTML = `<div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title"><h3 id="dlg-title">${esc(title)}</h3>${bodyHtml}`
      + `<div class="actions">${buttons.map((b, i) => `<button type="button" class="btn ${b.cls || ''}" data-btn="${i}">${b.text}</button>`).join('')}</div></div>`;
    ov.addEventListener('click', (e) => {
      const b = e.target.closest('[data-btn]');
      if (b) buttons[Number(b.dataset.btn)].run();
    });
    document.body.appendChild(ov);
    const first = ov.querySelector('input');
    if (first) first.focus();
  }

  function openEdit(g, r) {
    record('EDIT', r.name, g.id, 'edit dialog opened');
    dialog(`Edit ${r.name}`,
      `<label for="dlg-name">Full name</label><input id="dlg-name" value="${esc(r.name)}">`
      + `<label for="dlg-email">Email</label><input id="dlg-email" value="${esc(r.email)}">`,
      [
        { text: 'Cancel', run: () => { closeDialog(); record('EDIT CANCELLED', r.name, g.id); } },
        {
          text: 'Save changes', cls: 'primary', run: () => {
            const old = r.name;
            r.name = document.getElementById('dlg-name').value.trim() || old;
            r.email = document.getElementById('dlg-email').value.trim() || r.email;
            closeDialog();
            if (!g.kind) renderTable(g); else g.mount.querySelector(`[data-row="${r.id}"]`).dataset.name = r.name;
            record('SAVED', r.name, g.id, old === r.name ? 'no change' : `renamed from ${old}`);
          },
        },
      ]);
  }

  function openDelete(g, r) {
    record('DELETE', r.name, g.id, 'delete confirmation opened');
    dialog(`Delete ${r.name}?`, `<p>This removes the record from grid ${esc(g.id)}. You can restore it with "Reset lab".</p>`, [
      { text: 'Cancel', run: () => { closeDialog(); record('DELETE CANCELLED', r.name, g.id); } },
      {
        text: 'Delete', cls: 'danger', run: () => {
          g.rows = g.rows.filter((x) => x.id !== r.id);
          closeDialog();
          if (g.kind) g.mount.querySelector(`[data-row="${r.id}"]`).remove(); else renderTable(g);
          record('DELETED', r.name, g.id);
        },
      },
    ]);
  }

  function openView(g, r) {
    record('VIEW', r.name, g.id, 'details opened');
    dialog(`Details — ${r.name}`, `<p>Email: ${esc(r.email)}<br>Role: ${esc(r.role)}<br>City: ${esc(r.city)}<br>Status: ${esc(r.status)}</p>`,
      [{ text: 'Close', cls: 'primary', run: closeDialog }]);
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('.overlay')) return;
    const scope = e.target.closest('[data-grid]');
    const rowEl = e.target.closest('[data-row]');
    if (!scope || !rowEl) return;
    const g = grids[scope.dataset.grid];
    const r = g.rows.find((x) => x.id === Number(rowEl.dataset.row));
    const iconEl = e.target.closest('[data-act]');

    if (iconEl) {
      const act = iconEl.dataset.act;
      if (act === 'link') e.preventDefault();
      if (iconEl.classList.contains('disabled')) return record('BLOCKED', r.name, g.id, `${act} is disabled on this row`);
      if (act === 'select' || act === 'active') {
        const key = act === 'select' ? 'selected' : 'active';
        r[key] = !r[key];
        iconEl.classList.toggle('on', r[key]);
        return record(`${act.toUpperCase()} ${r[key] ? 'ON' : 'OFF'}`, r.name, g.id);
      }
      if (act === 'edit' && g.opts.inlineEdit) {
        g.editing = r.id;
        renderTable(g);
        const input = g.mount.querySelector('input.inline-edit');
        if (input) input.focus();
        return record('EDIT', r.name, g.id, 'inline edit started');
      }
      if (act === 'check') {
        const old = r.name;
        r.name = g.mount.querySelector('input.inline-edit').value.trim() || old;
        g.editing = null;
        renderTable(g);
        return record('SAVED', r.name, g.id, old === r.name ? 'no change' : `renamed from ${old}`);
      }
      if (act === 'close') {
        g.editing = null;
        renderTable(g);
        return record('EDIT CANCELLED', r.name, g.id);
      }
      if (act === 'edit') return openEdit(g, r);
      if (act === 'delete') return openDelete(g, r);
      if (act === 'view') return openView(g, r);
      return record(VERB[act], r.name, g.id);
    }
    if (e.target.closest('input, select')) return;
    if (e.target.closest('.act-cell')) return record('MISS', r.name, g.id, 'Action area clicked outside every icon');
    const cell = e.target.closest('[data-col]');
    if (cell) record('CELL', r.name, g.id, `${COL_LABEL[cell.dataset.col] || cell.dataset.col} cell`);
  });

  document.addEventListener('change', (e) => {
    const sel = e.target.closest('select[data-status]');
    if (!sel) return;
    const scope = sel.closest('[data-grid]');
    const rowEl = sel.closest('[data-row]');
    const g = grids[scope.dataset.grid];
    const r = g.rows.find((x) => x.id === Number(rowEl.dataset.row));
    r.status = sel.value;
    record(`STATUS → ${sel.value}`, r.name, g.id);
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDialog(); });

  // Shared page chrome: top bar, sticky "Last action" bar, and the event log card.
  function init({ title, subtitle, fullBleed }) {
    document.title = `TE-29629 · ${title}`;
    const main = document.querySelector('main');
    if (fullBleed) main.classList.add('full-bleed');
    const top = document.createElement('header');
    top.className = 'top';
    top.innerHTML = '<span class="brand">Renovation CRM · QA lab</span><nav><a href="index.html">All scenarios</a>'
      + '<a href="a-core.html">A</a><a href="b-multi-icon.html">B</a><a href="c-labelled.html">C</a>'
      + '<a href="d-containers.html">D</a><a href="e-geometry.html">E</a><a href="f-state.html">F</a></nav>';
    document.body.prepend(top);
    main.insertAdjacentHTML('afterbegin', `<h1>${esc(title)}</h1><div class="subtitle">${esc(subtitle)}</div>`
      + '<div class="status-bar"><strong>Last action:</strong><span id="last-action">none yet</span>'
      + '<button type="button" class="btn" onclick="location.reload()">Reset lab</button></div>');
    main.insertAdjacentHTML('beforeend', '<div class="card"><h2>Event log</h2><table class="log"><thead><tr><th>#</th><th>Action</th><th>Row</th><th>Grid</th><th>Detail</th><th>Time</th></tr></thead><tbody id="event-log"></tbody></table></div>');
  }

  window.Lab = { init, grid, container, record };
}());
