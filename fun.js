/* Her A-Z: fun layer (round 2).
   Kind streaks, badges, phase-themed hub, small celebrations. No guilt messages.
   Needs nutri.js (window.HZN) and delight.js (window.HZD). Everything stays on this device. */
(function () {
"use strict";
var FK = "hz_fun";
var MASCOT = { period: "🌸", foll: "🌱", fert: "✨", lut: "🌙" };
function D() { return window.HZD || {}; }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function dk(d) { return D().dkey ? D().dkey(d) : d.toISOString().slice(0, 10); }
function loadNut() { try { var o = JSON.parse(localStorage.getItem("hz_nut") || "{}"); return (o && o.days) || {}; } catch (e) { return {}; } }
function loadFun() { try { var o = JSON.parse(localStorage.getItem(FK) || "{}"); if (!o.seen) o.seen = {}; if (!o.full) o.full = {}; if (!o.badges) o.badges = {}; return o; } catch (e) { return { seen: {}, full: {}, badges: {} }; } }
function saveFun(o) { try { localStorage.setItem(FK, JSON.stringify(o)); } catch (e) { } }
function dayHas(days, d) { var r = days[dk(d)]; return !!(r && r.foods && r.foods.length); }

/* streak: consecutive days with at least one food ticked. Today not ticked yet keeps yesterday's streak alive. */
function stats() {
  var days = loadNut(), keys = Object.keys(days).filter(function (k) { return days[k].foods && days[k].foods.length; }).sort();
  var now = new Date(), d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var n = 0, c = new Date(d);
  if (!dayHas(days, c)) c.setDate(c.getDate() - 1);
  while (dayHas(days, c)) { n++; c.setDate(c.getDate() - 1); }
  var best = 0, run = 0, prev = null;
  keys.forEach(function (k) {
    var p = k.split("-"), t = Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000;
    run = (prev !== null && t - prev === 1) ? run + 1 : 1; prev = t; if (run > best) best = run;
  });
  var foods = (days[dk(d)] || {}).foods || [];
  return { streak: n, best: Math.max(best, n), total: keys.length, todayFoods: foods.length, doneToday: dayHas(days, d) };
}

var BADGES = [
  { id: "first", e: "🌱", n: "First step", t: "Tick your first food.", ok: function (s) { return s.total >= 1; } },
  { id: "s3", e: "🔥", n: "Three in a row", t: "Nourish yourself 3 days in a row.", ok: function (s) { return s.best >= 3; } },
  { id: "s7", e: "🌟", n: "A whole week", t: "7 days in a row.", ok: function (s) { return s.best >= 7; } },
  { id: "s14", e: "🏅", n: "Fortnight glow", t: "14 days in a row.", ok: function (s) { return s.best >= 14; } },
  { id: "d10", e: "🍓", n: "Ten days in", t: "Tick foods on 10 different days.", ok: function (s) { return s.total >= 10; } },
  { id: "rain", e: "🌈", n: "Rainbow plate", t: "Tick 10 different foods in one day.", ok: function (s) { return s.todayFoods >= 10 || s.rainbow; } },
  { id: "full", e: "🍽️", n: "Full plate", t: "Cover every focus nutrient for your phase in a day.", ok: function (s, f) { return Object.keys(f.full).length >= 1; } },
  { id: "full5", e: "👑", n: "Five full plates", t: "Cover every focus nutrient on 5 days.", ok: function (s, f) { return Object.keys(f.full).length >= 5; } },
  { id: "explore", e: "🧭", n: "Phase explorer", t: "Look at all four phases in the Nutrition tab.", ok: function (s, f) { return Object.keys(f.seen).length >= 4; } }
];
function earned(s, f) { return BADGES.filter(function (b) { return b.ok(s, f); }).map(function (b) { return b.id; }); }

function streakText(s) {
  if (s.streak >= 2) return "🔥 " + s.streak + "-day streak" + (s.doneToday ? "" : ". Tick a food today to keep it going");
  if (s.streak === 1) return s.doneToday ? "🌱 Day 1. Lovely start" : "🌱 You nourished yourself yesterday";
  return s.total ? "🌱 Fresh start today. Every day counts" : "🌱 Tick a food to start your streak";
}
function stripHtml() {
  var s = stats(), f = loadFun(), e = earned(s, f);
  return '<div class="hzf-strip"><span class="hzf-streak">' + esc(streakText(s)) + (s.best > s.streak && s.best >= 3 ? '<span class="hzf-best"> · best ' + s.best + "</span>" : "") + '</span><button type="button" class="chip hzf-badgebtn" data-hzf="badges">🏆 ' + e.length + "/" + BADGES.length + "</button></div>";
}
function badgesSheet() {
  if (!D().sheet) return;
  var s = stats(), f = loadFun(), e = earned(s, f);
  var h = '<h2 style="margin-top:0">🏆 Your badges</h2><p class="hzn-small">Badges are just for fun. There is no wrong way to do this, and a missed day never takes anything away.</p><div class="hzf-grid">';
  BADGES.forEach(function (b) {
    var on = e.indexOf(b.id) > -1;
    h += '<div class="hzf-badge' + (on ? " on" : "") + '"><span class="hzf-be" aria-hidden="true">' + (on ? b.e : "🔒") + "</span><b>" + esc(b.n) + "</b><span class=\"hzn-small\">" + esc(b.t) + "</span></div>";
  });
  h += "</div>";
  D().sheet(h, "Badges");
}

/* celebrations */
function reduced() { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (x) { return false; } }
function confetti(x, y) {
  if (reduced()) return;
  var em = ["🌸", "✨", "💗", "🌿", "⭐", "🍓"], box = document.createElement("div");
  box.className = "hzf-confetti"; box.setAttribute("aria-hidden", "true");
  for (var i = 0; i < 16; i++) {
    var sp = document.createElement("span"), a = (Math.PI * 2 * i) / 16 + Math.random() * 0.4, r = 60 + Math.random() * 70;
    sp.textContent = em[i % em.length];
    sp.style.left = x + "px"; sp.style.top = y + "px";
    sp.style.setProperty("--dx", Math.cos(a) * r + "px");
    sp.style.setProperty("--dy", Math.sin(a) * r - 40 + "px");
    sp.style.animationDelay = Math.random() * 0.1 + "s";
    box.appendChild(sp);
  }
  document.body.appendChild(box);
  setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 1400);
}
var toastT = null;
function toast(msg) {
  var t = document.getElementById("hzf-toast");
  if (!t) { t = document.createElement("div"); t.id = "hzf-toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg; t.className = "show";
  clearTimeout(toastT); toastT = setTimeout(function () { t.className = ""; }, 3200);
}

/* after each tick: record full plates, award badges, celebrate */
function afterTick(ev) {
  var f = loadFun(), before = f.badges, s = stats();
  var HZN = window.HZN, p = HZN && HZN.phaseNow && HZN.phaseNow(), justFull = false;
  if (p && HZN.FOCUS[p.key]) {
    var tk = HZN.ticked(), all = HZN.FOCUS[p.key].every(function (id) { return HZN.covered(id, tk); }), k = dk(new Date());
    if (all && !f.full[k]) { f.full[k] = 1; justFull = true; }
    if (!all && f.full[k]) delete f.full[k];
    if (tk.length >= 10) f.rainbow = 1;
  }
  s.rainbow = !!f.rainbow;
  var e = earned(s, f), fresh = e.filter(function (id) { return !before[id]; });
  fresh.forEach(function (id) { before[id] = 1; });
  f.badges = before; saveFun(f);
  var x = window.innerWidth / 2, y = window.innerHeight / 2;
  if (ev && ev.clientX) { x = ev.clientX; y = ev.clientY; }
  if (justFull) { confetti(x, y); toast("All focus nutrients covered today. Lovely work! 🌸"); }
  if (fresh.length) {
    var b = BADGES.filter(function (z) { return z.id === fresh[0]; })[0];
    if (!justFull) confetti(x, y);
    setTimeout(function () { toast("New badge: " + b.e + " " + b.n); }, justFull ? 3300 : 0);
  }
  refreshStrips();
}
function refreshStrips() {
  [].slice.call(document.querySelectorAll(".hzf-strip")).forEach(function (el) { el.outerHTML = stripHtml(); });
}

/* phase explorer: count phases viewed in the Nutrition tab */
function noteSeen(k) {
  var f = loadFun(); if (f.seen[k]) return; f.seen[k] = 1;
  var s = stats(); s.rainbow = !!f.rainbow;
  var was = f.badges.explore; var e = earned(s, f);
  if (e.indexOf("explore") > -1 && !was) { f.badges.explore = 1; saveFun(f); confetti(window.innerWidth / 2, 200); toast("New badge: 🧭 Phase explorer"); refreshStrips(); }
  else saveFun(f);
}

/* decorate: strip + phase theme */
var busy = false, obs = null;
function decorate() {
  if (busy) return; busy = true;
  try {
    var hubs = [].slice.call(document.querySelectorAll("#hzh-hub, .hzn-hubcard"));
    hubs.forEach(function (h) {
      var box = h.querySelector("[data-hzn-box]"); if (!box) return;
      var k = box.getAttribute("data-hzn-box");
      if (h.getAttribute("data-ph") !== k) h.setAttribute("data-ph", k);
      if (!h.querySelector(".hzf-mascot")) h.insertAdjacentHTML("afterbegin", '<span class="hzf-mascot" aria-hidden="true">' + (MASCOT[k] || "🌸") + "</span>");
      else { var m = h.querySelector(".hzf-mascot"); if (m.textContent !== MASCOT[k]) m.textContent = MASCOT[k]; }
      if (!h.querySelector(".hzf-strip")) {
        box.insertAdjacentHTML("beforebegin", stripHtml());
      }
    });
  } catch (x) { }
  finally { busy = false; try { obs.takeRecords(); } catch (y) { } }
}

document.addEventListener("click", function (e) {
  var t = e.target; if (!t.closest) return;
  var el = t.closest("[data-nfood]");
  if (el && el.getAttribute("aria-pressed") === "true") { afterTick(e); return; }
  if (el) { setTimeout(function () { var f = loadFun(), HZN = window.HZN, p = HZN && HZN.phaseNow(); if (p) { var tk = HZN.ticked(); if (!HZN.FOCUS[p.key].every(function (id) { return HZN.covered(id, tk); })) { delete f.full[dk(new Date())]; saveFun(f); } } refreshStrips(); }, 0); return; }
  el = t.closest("[data-hzf]"); if (el && el.getAttribute("data-hzf") === "badges") { badgesSheet(); return; }
  el = t.closest("[data-nut]"); if (el) noteSeen(el.getAttribute("data-nut"));
});

var css = [
  ".hzn-hub,.hzn-hubcard{position:relative;overflow:hidden}",
  ".hzn-hub[data-ph],.hzn-hubcard[data-ph]{background:linear-gradient(160deg,color-mix(in srgb,var(--hzn-col,var(--accent)) 12%,var(--surface)),var(--surface) 55%)}",
  ".hzf-mascot{position:absolute;right:14px;top:10px;font-size:34px;line-height:1;animation:hzfloat 4s ease-in-out infinite;opacity:.9;pointer-events:none}",
  "@keyframes hzfloat{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-6px) rotate(4deg)}}",
  ".hzf-strip{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:6px 0 4px;padding-right:44px}",
  ".hzf-streak{font-weight:700;font-size:14.5px}",
  ".hzf-best{font-weight:400;color:var(--muted)}",
  ".hzf-badgebtn{min-height:36px;font-size:14px}",
  ".hzf-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}",
  ".hzf-badge{border:1.5px dashed var(--line);border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:2px;opacity:.65}",
  ".hzf-badge.on{border-style:solid;border-color:var(--accent);background:var(--accent-soft);opacity:1}",
  ".hzf-be{font-size:28px}",
  ".hzf-confetti{position:fixed;inset:0;pointer-events:none;z-index:100000;overflow:hidden}",
  ".hzf-confetti span{position:absolute;font-size:22px;animation:hzburst 1.1s ease-out forwards;opacity:0}",
  "@keyframes hzburst{0%{transform:translate(0,0) scale(.4);opacity:1}100%{transform:translate(var(--dx),calc(var(--dy) + 90px)) scale(1.1) rotate(200deg);opacity:0}}",
  "#hzf-toast{position:fixed;left:50%;bottom:100px;transform:translate(-50%,20px);background:var(--ink,#2B2230);color:#fff;padding:12px 18px;border-radius:999px;font-weight:700;font-size:14.5px;max-width:86vw;text-align:center;opacity:0;pointer-events:none;transition:opacity .3s,transform .3s;z-index:100001}",
  "#hzf-toast.show{opacity:1;transform:translate(-50%,0)}",
  "@media (prefers-reduced-motion:reduce){.hzf-mascot{animation:none}#hzf-toast{transition:none}}"
].join("\n");
var st = document.createElement("style"); st.id = "hzf-css"; st.textContent = css; document.head.appendChild(st);

window.HZF = { stats: stats, badges: BADGES, earned: function () { return earned(stats(), loadFun()); } };

var app0 = document.getElementById("app");
if (app0) { obs = new MutationObserver(decorate); obs.observe(app0, { childList: true, subtree: true }); }
window.addEventListener("hashchange", function () { setTimeout(decorate, 50); });
setTimeout(decorate, 50);
})();
