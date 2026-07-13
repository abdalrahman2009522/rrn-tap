const PRESETS = [
  { id: "aurora", name: "Aurora", css: "linear-gradient(120deg,#3a2470,#2e6ba8,#6d3699,#1e2560)" },
  { id: "sunset", name: "Sunset", css: "linear-gradient(130deg,#4a2260,#c94a2e,#e2a742,#5b2148)" },
  { id: "ocean",  name: "Ocean",  css: "linear-gradient(160deg,#0f2542,#1b5482,#2ba1a8,#152447)" },
  { id: "forest", name: "Forest", css: "linear-gradient(140deg,#0f2a1f,#2e6a3d,#68a24b,#123024)" },
];

const DEFAULT_SHORTCUTS = [
  { id: "1", label: "YouTube", url: "https://youtube.com" },
  { id: "2", label: "Gmail", url: "https://mail.google.com" },
  { id: "3", label: "GitHub", url: "https://github.com" },
  { id: "4", label: "X", url: "https://x.com" },
  { id: "5", label: "Reddit", url: "https://reddit.com" },
  { id: "6", label: "Netflix", url: "https://netflix.com" },
];

const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { alert("Storage full: " + e.message); } }
};

let background = store.get("newtab-background", { type: "preset", presetId: "aurora" });
let shortcuts = store.get("newtab-shortcuts", DEFAULT_SHORTCUTS);

const $ = (s) => document.querySelector(s);
const bg = $("#bg");
const orbs = $("#orbs");

function applyBackground() {
  if (background.type === "custom") {
    bg.style.background = `url(${background.dataUrl}) center/cover no-repeat`;
    bg.classList.remove("animated-gradient");
    orbs.style.display = "none";
  } else {
    const p = PRESETS.find(p => p.id === background.presetId) || PRESETS[0];
    bg.style.background = p.css;
    bg.classList.add("animated-gradient");
    orbs.style.display = "";
  }
  renderPresets();
}

function tick() {
  const now = new Date();
  const h = now.getHours() % 12 || 12;
  const m = String(now.getMinutes()).padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";
  $("#time").textContent = `${h}:${m} ${ampm}`;
  $("#date").textContent = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}
setInterval(tick, 1000); tick();

$("#search").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = $("#q").value.trim();
  if (!q) return;
  location.href = $("#engine").value + encodeURIComponent(q);
});

function faviconFor(url) {
  try { const u = new URL(url); return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=64`; }
  catch { return ""; }
}

function renderShortcuts() {
  const el = $("#shortcuts");
  el.innerHTML = "";
  shortcuts.forEach(s => {
    const a = document.createElement("a");
    a.className = "shortcut";
    a.href = s.url;
    const img = document.createElement("img");
    img.src = faviconFor(s.url);
    img.alt = "";
    const span = document.createElement("span");
    span.textContent = s.label;
    a.appendChild(img);
    a.appendChild(span);
    el.appendChild(a);
  });
}
renderShortcuts();

function renderEditShortcuts() {
  const el = $("#editShortcuts");
  el.innerHTML = "";
  shortcuts.forEach((s, i) => {
    const row = document.createElement("div");
    row.className = "edit-row";
    const labelInput = document.createElement("input");
    labelInput.dataset.i = i; labelInput.dataset.k = "label";
    labelInput.value = s.label; labelInput.placeholder = "Label";
    const urlInput = document.createElement("input");
    urlInput.dataset.i = i; urlInput.dataset.k = "url";
    urlInput.value = s.url; urlInput.placeholder = "https://";
    const delBtn = document.createElement("button");
    delBtn.dataset.del = i; delBtn.textContent = "×";
    row.appendChild(labelInput);
    row.appendChild(urlInput);
    row.appendChild(delBtn);
    el.appendChild(row);
  });
  el.querySelectorAll("input").forEach(inp => {
    inp.addEventListener("input", (e) => {
      const i = +e.target.dataset.i, k = e.target.dataset.k;
      shortcuts[i][k] = e.target.value;
      store.set("newtab-shortcuts", shortcuts);
      renderShortcuts();
    });
  });
  el.querySelectorAll("button[data-del]").forEach(btn => {
    btn.addEventListener("click", () => {
      shortcuts.splice(+btn.dataset.del, 1);
      store.set("newtab-shortcuts", shortcuts);
      renderShortcuts(); renderEditShortcuts();
    });
  });
}

function renderPresets() {
  const el = $("#presets");
  el.innerHTML = "";
  PRESETS.forEach(p => {
    const b = document.createElement("button");
    b.className = "preset" + (background.type === "preset" && background.presetId === p.id ? " active" : "");
    b.style.background = p.css;
    b.innerHTML = `<span>${p.name}</span>`;
    b.addEventListener("click", () => {
      background = { type: "preset", presetId: p.id };
      store.set("newtab-background", background);
      applyBackground();
    });
    el.appendChild(b);
  });
}

$("#fileInput").addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  if (file.size > 4 * 1024 * 1024) { alert("Please pick an image under 4MB."); return; }
  const reader = new FileReader();
  reader.onload = () => {
    background = { type: "custom", dataUrl: reader.result, fileName: file.name };
    store.set("newtab-background", background);
    applyBackground();
  };
  reader.readAsDataURL(file);
});

$("#reset").addEventListener("click", () => {
  background = { type: "preset", presetId: "aurora" };
  store.set("newtab-background", background);
  applyBackground();
});

$("#addShortcut").addEventListener("click", () => {
  shortcuts.push({ id: String(Date.now()), label: "New", url: "https://example.com" });
  store.set("newtab-shortcuts", shortcuts);
  renderShortcuts(); renderEditShortcuts();
});

$("#openSettings").addEventListener("click", () => { $("#panel").hidden = false; });
$("#closeSettings").addEventListener("click", () => { $("#panel").hidden = true; });

applyBackground();
renderEditShortcuts();