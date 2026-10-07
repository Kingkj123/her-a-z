/* Her A–Z: nutrition engine (round 1).
   - Home: "What to eat today" hub with a tick-off food checklist for the current cycle phase
   - Nutrient pages (bottom sheet) that link foods, supplements, guides and cycle phases
   - Track: food ideas from today's symptoms (Log) and patterns by phase (Patterns)
   - Guides and Supplements pages: food-first cards that link back to the cycle
   Needs delight.js (window.HZD) and nutrition.js. Everything stays on this device. */
(function () {
"use strict";
var KEYS = ["period", "foll", "fert", "lut"];
var EVL = { s: ["Strong evidence", "hzn-s"], m: ["Some evidence", "hzn-m"], l: ["Limited evidence", "hzn-l"] };
function D() { return window.HZD || {}; }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

/* ---------- Foods (name, emoji) ---------- */
var FOOD = {
  lentils: ["Lentils, beans and chickpeas", "🫘"], redmeat: ["Red meat", "🥩"], greens: ["Dark leafy greens", "🥬"],
  cereal: ["Fortified cereal", "🥣"], eggs: ["Eggs", "🥚"], apricots: ["Dried apricots", "🍑"], tofu: ["Tofu", "🧈"],
  citrus: ["Oranges and citrus", "🍊"], peppers: ["Peppers", "🫑"], kiwi: ["Kiwi", "🥝"], berries: ["Berries", "🫐"],
  broccoli: ["Broccoli", "🥦"], oily: ["Oily fish", "🐟"], nuts: ["Nuts", "🥜"], seeds: ["Seeds", "🌻"],
  wholegrain: ["Wholegrains and oats", "🌾"], dairy: ["Milk, yoghurt or cheese", "🥛"], chicken: ["Chicken or turkey", "🍗"],
  banana: ["Bananas", "🍌"], potato: ["Potatoes and sweet potato", "🥔"], gingerf: ["Fresh ginger", "🫚"],
  shellfish: ["Shellfish", "🦐"], water: ["Water or herbal tea", "💧"], veg: ["Colourful veg", "🥕"],
  darkchoc: ["Dark chocolate", "🍫"], oliveoil: ["Olive oil", "🫒"], avocado: ["Avocado", "🥑"]
};

/* ---------- Nutrients ---------- */
var NUT = {
  iron: { n: "Iron", e: "🩸", s: "Carries oxygen around your body", ev: "s", when: ["period", "foll"], supp: "iron",
    why: "You lose iron in period blood, and low iron is a common cause of tiredness. Iron need is highest around your period.",
    tip: "Pair plant iron with vitamin C. Tea and coffee within an hour of a meal can block absorption.",
    foods: ["lentils", "redmeat", "greens", "cereal", "eggs", "apricots", "tofu"],
    guides: ["heavy-periods", "iron-deficiency-anaemia"] },
  vitc: { n: "Vitamin C", e: "🍊", s: "Helps you absorb iron", ev: "s", when: ["period", "fert"], supp: null,
    why: "Vitamin C helps your body absorb iron from plant foods and supports your immune system and skin.",
    tip: "A glass of orange juice or a handful of berries alongside an iron-rich meal works well.",
    foods: ["citrus", "peppers", "kiwi", "berries", "broccoli"], guides: ["iron-deficiency-anaemia"] },
  b12: { n: "Vitamin B12", e: "🥚", s: "Energy and healthy blood", ev: "s", when: ["foll"], supp: null,
    why: "B12 helps make red blood cells and keeps nerves healthy. It is found mainly in animal foods.",
    tip: "If you are vegan, choose fortified foods or ask a pharmacist about a B12 supplement.",
    foods: ["eggs", "dairy", "oily", "redmeat", "cereal"], guides: ["b12-deficiency", "fatigue-tiredness"] },
  folate: { n: "Folate", e: "🥬", s: "Cell growth and pregnancy health", ev: "s", when: ["foll", "fert"], supp: "folic-acid",
    why: "Folate supports healthy cell growth. If you could become pregnant, the NHS advises 400 micrograms of folic acid a day.",
    tip: "Folate is lost in cooking. Steam or microwave greens rather than boiling them for long.",
    foods: ["greens", "broccoli", "lentils", "cereal", "citrus"], guides: ["infertility"] },
  b6: { n: "Vitamin B6", e: "🍌", s: "May ease PMS symptoms", ev: "l", when: ["lut"], supp: "vitamin-b6",
    why: "Small trials suggest B6 may help some PMS symptoms such as mood changes. The evidence is limited.",
    tip: "Do not take more than 10 mg a day as a supplement unless a doctor advises. High doses can damage nerves.",
    foods: ["chicken", "banana", "potato", "oily", "lentils", "cereal"], guides: ["pms-pmdd"] },
  magnesium: { n: "Magnesium", e: "🥜", s: "Muscles, mood and sleep", ev: "l", when: ["period", "lut"], supp: "magnesium",
    why: "May help cramps, headaches, mood and sleep for some people. The research is limited, but magnesium-rich foods are good for you anyway.",
    tip: "A small handful of nuts or seeds goes a long way.",
    foods: ["nuts", "seeds", "wholegrain", "greens", "lentils", "darkchoc"], guides: ["period-pain", "pms-pmdd"] },
  calcium: { n: "Calcium", e: "🥛", s: "Bones, and PMS in some trials", ev: "m", when: ["lut"], supp: "calcium",
    why: "Needed for strong bones. In some trials, around 1,000 mg a day eased PMS symptoms. The UK recommendation is 700 mg.",
    tip: "Fortified plant milks and tofu set with calcium count too.",
    foods: ["dairy", "tofu", "greens", "oily"], guides: ["pms-pmdd"] },
  omega3: { n: "Omega-3 fats", e: "🐟", s: "Heart, joints and period pain", ev: "l", when: ["period", "fert"], supp: "omega-3",
    why: "Omega-3 fats support your heart and brain. Some small studies suggest they may ease period pain.",
    tip: "Aim for 2 portions of fish a week, one of them oily. Walnuts and seeds also count.",
    foods: ["oily", "nuts", "seeds"], guides: ["period-pain"] },
  vitd: { n: "Vitamin D", e: "☀️", s: "Bones, muscles and immunity", ev: "s", when: ["period", "foll", "fert", "lut"], supp: "vitamin-d",
    why: "Helps your body absorb calcium. In the UK, sunlight is too weak from about October to March to make enough.",
    tip: "Food gives only a little. From October to March the NHS suggests considering 10 micrograms a day.",
    foods: ["oily", "eggs", "cereal"], guides: ["vitamin-d-deficiency"] },
  zinc: { n: "Zinc", e: "🦐", s: "Skin, immunity and reproduction", ev: "s", when: ["fert"], supp: null,
    why: "Needed for normal reproduction, skin and immune health. Most women get enough from food.",
    tip: "You don't need a supplement unless a doctor suggests one.",
    foods: ["shellfish", "redmeat", "seeds", "lentils", "dairy"], guides: ["hormonal-acne"] },
  fibre: { n: "Fibre", e: "🌾", s: "Gut health and steady energy", ev: "m", when: ["foll", "lut"], supp: null,
    why: "Eases constipation, which progesterone can make worse before your period, and keeps blood sugar steadier.",
    tip: "Add fibre slowly and drink water, or it can cause bloating.",
    foods: ["wholegrain", "lentils", "veg", "berries", "broccoli"], guides: ["constipation", "bloating"] },
  protein: { n: "Protein", e: "🍗", s: "Keeps you full, builds muscle", ev: "l", when: ["foll"], supp: null,
    why: "Supports muscle and keeps you full. Spreading it across the day helps with steady energy.",
    tip: "Add a source of protein to each meal.",
    foods: ["eggs", "chicken", "oily", "tofu", "lentils", "dairy"], guides: [] },
  ginger: { n: "Ginger", e: "🫚", s: "May ease cramps and nausea", ev: "m", when: ["period"], supp: "ginger",
    why: "A few small trials found ginger eased period pain about as well as common painkillers, and it is a long-standing remedy for nausea.",
    tip: "Fresh ginger tea, or grated into stir-fries and soups.",
    foods: ["gingerf"], guides: ["period-pain"] },
  hydration: { n: "Hydration", e: "💧", s: "Headaches, bloating, energy", ev: "l", when: ["period", "fert", "lut"], supp: null,
    why: "Being well hydrated can help with headaches, tiredness and constipation. It is not a cure, but it is an easy win.",
    tip: "Water, herbal tea, soups and fruit all count.",
    foods: ["water"], guides: ["bloating", "constipation"] }
};

/* What to focus on in each phase (max 5) */
var FOCUS = {
  period: ["iron", "vitc", "magnesium", "omega3", "ginger"],
  foll: ["iron", "b12", "folate", "protein", "fibre"],
  fert: ["folate", "zinc", "omega3", "vitc", "hydration"],
  lut: ["calcium", "b6", "magnesium", "fibre", "hydration"]
};

/* Logged symptom -> nutrients to try (ideas, not treatment) */
var SYM = {
  "Cramps": ["magnesium", "ginger", "omega3"], "Back pain": ["magnesium", "ginger"],
  "Headache": ["hydration", "magnesium"], "Migraine": ["magnesium", "hydration"],
  "Bloating": ["fibre", "ginger", "hydration"], "Nausea": ["ginger", "b6"],
  "Dizziness": ["iron", "hydration", "b12"], "Joint aches": ["omega3", "vitd"],
  "Constipation": ["fibre", "hydration", "magnesium"], "Acne": ["zinc", "omega3"],
  "Hair shedding": ["iron", "protein", "zinc", "b12"], "Brain fog": ["omega3", "b12", "hydration"],
  "Poor sleep": ["magnesium"], "Fatigue": ["iron", "b12", "vitd", "protein"], "Anxiety": ["magnesium"],
  "Anxious": ["magnesium"], "Irritable": ["calcium", "b6", "magnesium"], "Tearful": ["b6", "calcium"],
  "Overwhelmed": ["magnesium"], "Low mood": ["omega3", "b12", "vitd"], "Low energy": ["iron", "b12", "protein", "vitd"],
  "Short sleep": ["magnesium"], "Strong pain": ["magnesium", "ginger", "omega3"]
};
var SYMG = {
  "Cramps": "period-pain", "Strong pain": "period-pain", "Headache": "migraine-hormones", "Migraine": "migraine-hormones",
  "Bloating": "bloating", "Constipation": "constipation", "Acne": "hormonal-acne", "Fatigue": "fatigue-tiredness",
  "Dizziness": "fatigue-tiredness", "Low energy": "fatigue-tiredness", "Poor sleep": "insomnia-sleep", "Short sleep": "insomnia-sleep",
  "Hair shedding": "hair-loss", "Anxiety": "anxiety-hormones", "Anxious": "anxiety-hormones", "Low mood": "depression-low-mood"
};
var MOODMAP = { "Low": "Low mood" };

/* Guides -> nutrients (shown as a food-first card) */
var GUIDE_NUT = {
  "heavy-periods": ["iron", "vitc"], "iron-deficiency-anaemia": ["iron", "vitc", "b12", "folate"],
  "period-pain": ["ginger", "magnesium", "omega3"], "pms-pmdd": ["calcium", "b6", "magnesium", "fibre"],
  "bloating": ["fibre", "ginger", "hydration"], "constipation": ["fibre", "hydration", "magnesium"],
  "migraine-hormones": ["magnesium", "hydration"], "fatigue-tiredness": ["iron", "b12", "vitd", "protein"],
  "vitamin-d-deficiency": ["vitd", "calcium"], "hormonal-acne": ["zinc", "omega3"], "b12-deficiency": ["b12", "folate"],
  "coeliac": ["iron", "b12", "folate", "calcium", "vitd"], "infertility": ["folate", "zinc", "omega3"],
  "pcos": ["fibre", "protein", "omega3"], "first-periods": ["iron", "vitc"], "irregular-periods": ["protein", "omega3"],
  "perimenopause-menopause": ["calcium", "vitd", "omega3"], "breast-pain": ["magnesium"], "insomnia-sleep": ["magnesium"],
  "osteoporosis": ["calcium", "vitd", "protein"], "hair-loss": ["iron", "protein", "zinc", "b12"]
};
/* Supplements -> nutrient */
var SUPP_NUT = { "iron": "iron", "calcium": "calcium", "magnesium": "magnesium", "vitamin-b6": "b6", "folic-acid": "folate",
  "vitamin-d": "vitd", "omega-3": "omega3", "ginger": "ginger" };

/* ---------- Helpers ---------- */
var SK = "hz_nut";
function load() { try { var o = JSON.parse(localStorage.getItem(SK) || "{}"); return o && o.days ? o : { days: {} }; } catch (e) { return { days: {} }; } }
function save(o) {
  try {
    var keys = Object.keys(o.days).sort();
    while (keys.length > 120) { delete o.days[keys.shift()]; }
    localStorage.setItem(SK, JSON.stringify(o));
  } catch (e) { }
}
function today() { return D().dkey ? D().dkey(new Date()) : new Date().toISOString().slice(0, 10); }
function ticked() { var r = load().days[today()]; return (r && r.foods) || []; }
function toggleFood(id) {
  var o = load(), k = today(), r = o.days[k] || (o.days[k] = { foods: [] });
  var i = r.foods.indexOf(id);
  if (i > -1) r.foods.splice(i, 1); else r.foods.push(id);
  if (!r.foods.length) delete o.days[k];
  save(o);
  return i < 0;
}
function covered(nid, tk) { return NUT[nid].foods.some(function (f) { return tk.indexOf(f) > -1; }); }
function phaseNow() {
  var d = D(); if (!d.cycle || !d.phaseOf) return null;
  var c = d.cycle(); if (!c) return null;
  return { key: d.phaseOf(c, Math.min(c.cd, c.len)), c: c };
}
function pcol(k) { var p = D().PHASES; return (p && p[k] && p[k].c) || "var(--accent)"; }
function pname(k) { var p = D().PHASES; return (p && p[k] && p[k].n) || k; }
function evb(x) { var v = EVL[x]; return '<span class="hzn-ev ' + v[1] + '">' + v[0] + "</span>"; }
function guideId(x) {
  if (typeof ENTRIES === "undefined") return null;
  return ENTRIES.some(function (e) { return e.id === x; }) ? x : null;
}
function guideName(id) {
  if (typeof ENTRIES === "undefined") return id;
  var m = ENTRIES.filter(function (e) { return e.id === id; })[0];
  return m ? m.name : id;
}
function guideLinks(list) {
  var out = [];
  list.forEach(function (g) { var id = guideId(g); if (id && out.indexOf(id) < 0) out.push(id); });
  return out.map(function (id) { return '<a href="#/entry/' + id + '">' + esc(guideName(id)) + "</a>"; }).join(" · ");
}
function ring(done, total, col) {
  var C = 2 * Math.PI * 22, f = total ? done / total : 0;
  return '<svg class="hzn-ring" viewBox="0 0 56 56" role="img" aria-label="' + done + ' of ' + total + ' covered today">' +
    '<circle cx="28" cy="28" r="22" fill="none" stroke="var(--line)" stroke-width="6"/>' +
    '<circle class="hzn-arc" cx="28" cy="28" r="22" fill="none" stroke="' + col + '" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + (C * f).toFixed(1) + " " + C.toFixed(1) + '" transform="rotate(-90 28 28)"/>' +
    '<text x="28" y="33" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">' + done + "/" + total + "</text></svg>";
}

/* ---------- Checklist ---------- */
function foodChip(f, tk) {
  var on = tk.indexOf(f) > -1;
  return '<button type="button" class="chip hzn-food" data-nfood="' + f + '" aria-pressed="' + (on ? "true" : "false") + '"><span aria-hidden="true">' + FOOD[f][1] + "</span> " + esc(FOOD[f][0]) + "</button>";
}
function checklistInner(key) {
  var ids = FOCUS[key], tk = ticked(), done = 0, rows = "";
  ids.forEach(function (id) {
    var n = NUT[id], cov = covered(id, tk);
    if (cov) done++;
    var chips = n.foods.map(function (f) { return foodChip(f, tk); }).join("");
    rows += '<div class="hzn-nrow' + (cov ? " on" : "") + '"><div class="hzn-nhead"><button type="button" class="hzn-nname" data-ninfo="' + id + '"><span class="hzn-ne" aria-hidden="true">' + n.e + "</span><span><b>" + esc(n.n) + '</b><span class="hzn-nshort">' + esc(n.s) + '</span></span></button><span class="hzn-check" aria-hidden="true">' + (cov ? "✓" : "") + '</span></div><div class="hzn-foods2">' + chips + "</div></div>";
  });
  var msg = done === ids.length ? '<div class="hzn-done">All covered today. Lovely work!</div>' : '<p class="hzn-small hzn-lead">Tick what you have eaten. One food per nutrient is enough.</p>';
  return '<div class="hzn-ringrow">' + ring(done, ids.length, pcol(key)) + '<div><b>' + done + " of " + ids.length + " focus nutrients covered</b><div class=\"hzn-small\">" + esc(pname(key)) + " · tap a nutrient to learn more</div></div></div>" + msg + rows;
}
function checklistCard() {
  var p = phaseNow();
  if (!p) return "";
  return '<div class="trk-card hzn-hubcard" style="--hzn-col:' + pcol(p.key) + '"><h2 style="margin-top:0">Today\'s food checklist</h2><div data-hzn-box="' + p.key + '">' + checklistInner(p.key) + "</div></div>";
}
function hubHtml() {
  var p = phaseNow();
  if (!p) {
    return '<section class="hzn-hub" id="hzh-hub"><h2>Eat for your cycle</h2><p>Log the first day of your period and Her A–Z will show what to eat in each phase of your cycle.</p><div class="hzn-actions"><button class="btn small" type="button" data-hz="log-period">My period started today</button><button class="btn small trk-ghost" type="button" data-ngo="nut">Explore nutrition</button></div></section>';
  }
  return '<section class="hzn-hub" id="hzh-hub" style="--hzn-col:' + pcol(p.key) + '"><span class="hzn-eyebrow">' + esc(pname(p.key)) + " · day " + Math.min(p.c.cd, p.c.len) + "</span><h2>What to eat today</h2>" +
    '<div data-hzn-box="' + p.key + '">' + checklistInner(p.key) + '</div><div class="hzn-actions"><button class="btn small" type="button" data-ngo="nut">My phase guide</button><button class="btn small trk-ghost" type="button" data-ngo="supps">Supplements</button></div></section>';
}
function refreshBoxes() {
  [].slice.call(document.querySelectorAll("[data-hzn-box]")).forEach(function (b) { b.innerHTML = checklistInner(b.getAttribute("data-hzn-box")); });
}

/* ---------- Nutrient sheet ---------- */
function openNutrient(id) {
  var n = NUT[id]; if (!n || !D().sheet) return;
  var tk = ticked();
  var h = '<h2 style="margin-top:0">' + n.e + " " + esc(n.n) + "</h2><p class=\"hzn-small\">" + esc(n.s) + "</p><p>" + evb(n.ev) + "</p><p>" + esc(n.why) + "</p>";
  h += "<h3>Matters most in</h3><p>" + n.when.map(function (k) { return '<span class="hzn-phase" style="--hzn-col:' + pcol(k) + '">' + esc(pname(k)) + "</span>"; }).join(" ") + "</p>";
  h += "<h3>Foods to try</h3><p class=\"hzn-small\">Tap a food you have had today.</p><div class=\"hzn-foods2\">" + n.foods.map(function (f) { return foodChip(f, tk); }).join("") + "</div>";
  h += '<p class="hzn-tip"><b>Tip:</b> ' + esc(n.tip) + "</p>";
  if (n.supp) h += '<p><button class="btn small trk-ghost" type="button" data-nsupp="' + n.supp + '">Supplement info and safety</button></p><p class="hzn-small">Food first. Check with a pharmacist before taking supplements.</p>';
  var gl = guideLinks(n.guides);
  if (gl) h += '<p class="hzn-small">Related guides: ' + gl + "</p>";
  h += '<p><button class="btn small" type="button" data-ngo="nut">See it in my cycle</button></p>';
  D().sheet(h, n.n);
}

/* ---------- Navigation helpers ---------- */
function closeSheet() { try { if (D().closeSheet) D().closeSheet(true); } catch (e) { } }
function goNut() {
  closeSheet();
  if (location.hash !== "#/track") location.hash = "#/track";
  var tries = 0;
  (function t() {
    var b = [].slice.call(document.querySelectorAll(".trk-seg")).filter(function (x) { return x.textContent.trim() === "Nutrition"; })[0];
    if (b) { if (b.getAttribute("aria-pressed") !== "true") b.click(); window.scrollTo(0, 0); }
    else if (tries++ < 25) setTimeout(t, 100);
  })();
}
function goSupp(id) {
  closeSheet();
  if (location.hash !== "#/supps") location.hash = "#/supps";
  var tries = 0;
  (function t() {
    var el = id ? document.getElementById("s-" + id) : document.querySelector("details.supp");
    if (el) { if (id) { el.open = true; } el.scrollIntoView({ block: "start" }); }
    else if (tries++ < 25) setTimeout(t, 100);
  })();
}

/* ---------- Track: symptoms and patterns ---------- */
function symptomsOf(rec) {
  var out = [];
  (rec.sx || []).forEach(function (s) { out.push(s); });
  (rec.mood || []).forEach(function (m) { out.push(MOODMAP[m] || m); });
  if (typeof rec.energy === "number" && rec.energy <= 1) out.push("Low energy");
  if (typeof rec.sleep === "number" && rec.sleep === 0) out.push("Short sleep");
  if (typeof rec.pain === "number" && rec.pain >= 3) out.push("Strong pain");
  return out;
}
function nutChips(ids) {
  return ids.map(function (id) { var n = NUT[id]; return '<button type="button" class="chip hzn-nchip" data-ninfo="' + id + '"><span aria-hidden="true">' + n.e + "</span> " + esc(n.n) + "</button>"; }).join("");
}
function symptomCard() {
  var T = D().loadT ? D().loadT() : null; if (!T) return "";
  var rec = (T.log || {})[today()] || {};
  var syms = symptomsOf(rec).filter(function (s) { return SYM[s]; });
  if (!syms.length) return '<div class="trk-card" id="hzn-sx"><h2 style="margin-top:0">Food ideas for how you feel</h2><p class="hzn-small">Log a symptom or your mood above and Her A–Z will suggest foods and nutrients that may help.</p></div>';
  var count = {}, order = [];
  syms.forEach(function (s) { SYM[s].forEach(function (n) { if (!count[n]) { count[n] = 0; order.push(n); } count[n]++; }); });
  order.sort(function (a, b) { return count[b] - count[a]; });
  var top = order.slice(0, 5);
  var gl = guideLinks(syms.map(function (s) { return SYMG[s]; }).filter(Boolean));
  return '<div class="trk-card" id="hzn-sx"><h2 style="margin-top:0">Food ideas for how you feel</h2><p class="hzn-small">Based on what you logged today: ' + esc(syms.slice(0, 4).join(", ")) + '. These are ideas to try, not treatment.</p><div class="hzn-foods2">' + nutChips(top) + "</div>" + (gl ? '<p class="hzn-small">Read more: ' + gl + "</p>" : "") + '<p class="hzn-small">If symptoms are severe, new or keep coming back, speak to your GP or pharmacist.</p></div>';
}
function dn(k) { var p = String(k).split("-"); return Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000; }
function insightsCard() {
  var d = D(), T = d.loadT ? d.loadT() : null, c = d.cycle ? d.cycle() : null;
  var intro = '<div class="trk-card" id="hzn-ins"><h2 style="margin-top:0">Your patterns and food ideas</h2>';
  if (!T || !c) return intro + '<p class="hzn-small">Log your period start and a few symptoms, and patterns will appear here.</p></div>';
  var L = T.log || {}, days = Object.keys(L).sort(), starts = [], prev = null;
  days.forEach(function (k) { if ((L[k].flow || 0) >= 2) { if (prev === null || dn(k) - dn(prev) > 3) starts.push(k); prev = k; } });
  if (!starts.length) return intro + '<p class="hzn-small">Log your period start and a few symptoms, and patterns will appear here.</p></div>';
  var stat = {};
  days.forEach(function (k) {
    var s = null; for (var i = starts.length - 1; i >= 0; i--) { if (dn(starts[i]) <= dn(k)) { s = starts[i]; break; } }
    if (!s) return;
    var idx = dn(k) - dn(s) + 1; if (idx > c.len * 1.5) return;
    var ph = d.phaseOf(c, Math.min(idx, c.len));
    symptomsOf(L[k]).forEach(function (sy) { var o = stat[sy] || (stat[sy] = { t: 0, p: {} }); o.t++; o.p[ph] = (o.p[ph] || 0) + 1; });
  });
  var list = [];
  Object.keys(stat).forEach(function (sy) {
    var o = stat[sy]; if (o.t < 3 || !SYM[sy]) return;
    var best = null; KEYS.forEach(function (k) { if (o.p[k] && (!best || o.p[k] > o.p[best])) best = k; });
    if (best && o.p[best] / o.t >= 0.5) list.push({ sy: sy, t: o.t, k: best, n: o.p[best] });
  });
  list.sort(function (a, b) { return b.t - a.t; });
  if (!list.length) return intro + '<p class="hzn-small">No clear patterns yet. Keep logging for a couple of cycles and your insights will show up here.</p></div>';
  var h = intro;
  list.slice(0, 3).forEach(function (x) {
    var g = SYMG[x.sy] ? guideLinks([SYMG[x.sy]]) : "";
    h += '<div class="hzn-insight" style="--hzn-col:' + pcol(x.k) + '"><b>' + esc(x.sy) + "</b><p>Logged " + x.t + " times. " + x.n + " of them were in your " + esc(pname(x.k)) + " phase.</p><div class=\"hzn-foods2\">" + nutChips(SYM[x.sy].slice(0, 3)) + "</div>" + (g ? '<p class="hzn-small">Read more: ' + g + "</p>" : "") + "</div>";
  });
  return h + "</div>";
}

/* ---------- Decorate pages ---------- */
function injectHub(app) {
  var sec = app.querySelector("#rd-sections");
  if (!sec || sec.querySelector("#hzh-hub")) return;
  var anchor = sec.querySelector(".rd-today");
  if (anchor) anchor.insertAdjacentHTML("afterend", hubHtml());
  else sec.insertAdjacentHTML("afterbegin", hubHtml());
}
function injectTrack(app) {
  var wrap = app.querySelector(".wrap.trk") || app.querySelector(".wrap"); if (!wrap) return;
  var seg = wrap.querySelector('.trk-seg[aria-pressed="true"]'); if (!seg) return;
  var tab = seg.textContent.trim();
  var disc = wrap.querySelector(".disclaimer");
  function put(html) { if (disc) disc.insertAdjacentHTML("beforebegin", html); else wrap.insertAdjacentHTML("beforeend", html); }
  if (tab === "Log") {
    var nb = wrap.querySelector('[data-trk="day"][data-v="1"]');
    var isToday = !nb || nb.disabled || nb.getAttribute("aria-disabled") === "true";
    if (isToday && !wrap.querySelector("#hzn-sx")) put(symptomCard());
  } else if (tab === "Patterns") {
    if (!wrap.querySelector("#hzn-ins")) put(insightsCard());
  }
}
function injectEntry(app, id) {
  var list = GUIDE_NUT[id]; if (!list) return;
  if (app.querySelector("#hzn-eat")) return;
  var heads = [].slice.call(app.querySelectorAll("h2"));
  var h = heads.filter(function (x) { return /^Supplements people ask/i.test(x.textContent); })[0] || heads.filter(function (x) { return /^Managing/i.test(x.textContent); })[0] || heads.filter(function (x) { return /^When to get help/i.test(x.textContent); })[0];
  if (!h) return;
  var card = '<section id="hzn-eat" class="hzn-eat"><h2>Food ideas that may help</h2><p class="hzn-small">Eating well can support you alongside any treatment. Tap a nutrient for foods, tips and supplement info.</p><div class="hzn-foods2">' + nutChips(list) + '</div><p><button class="btn small trk-ghost" type="button" data-ngo="nut">See what to eat in my cycle</button></p></section>';
  var host = h.closest("section") || h.parentNode;
  host.insertAdjacentHTML("beforebegin", card);
}
function injectSupps(app) {
  [].slice.call(app.querySelectorAll("details.supp")).forEach(function (d) {
    if (d.querySelector(".hzn-supp")) return;
    var sid = d.id.replace(/^s-/, ""), nid = SUPP_NUT[sid]; if (!nid) return;
    var n = NUT[nid], body = d.querySelector(".sbody"); if (!body) return;
    var foods = n.foods.map(function (f) { return FOOD[f][1] + " " + FOOD[f][0]; }).join(", ");
    var when = n.when.map(function (k) { return '<span class="hzn-phase" style="--hzn-col:' + pcol(k) + '">' + esc(pname(k)) + "</span>"; }).join(" ");
    body.insertAdjacentHTML("afterbegin", '<div class="hzn-supp"><b>Food first</b><p>' + esc(foods) + '</p><p class="hzn-small">Matters most in: ' + when + '</p><p><button class="chip hzn-more" type="button" data-ninfo="' + nid + '">' + n.e + " Foods and cycle timing</button></p></div>");
  });
}
var busy = false, obs = null;
function decorate() {
  if (busy) return; busy = true;
  try {
    var app = document.getElementById("app"); if (!app) return;
    var h = location.hash || "#/";
    if (h === "#/" || h === "#" || h === "") injectHub(app);
    else if (h.indexOf("#/track") === 0) injectTrack(app);
    else if (h.indexOf("#/entry/") === 0) injectEntry(app, h.split("/")[2]);
    else if (h.indexOf("#/supps") === 0) injectSupps(app);
  } catch (x) { if (window.__hzDebug) console.error(x); }
  finally { busy = false; try { obs.takeRecords(); } catch (x) { } }
}

/* ---------- Events ---------- */
document.addEventListener("click", function (e) {
  var t = e.target; if (!t.closest) return;
  var el = t.closest("[data-nfood]");
  if (el) {
    var id = el.getAttribute("data-nfood"), on = toggleFood(id);
    var all = [].slice.call(document.querySelectorAll('[data-nfood="' + id + '"]'));
    all.forEach(function (b) { b.setAttribute("aria-pressed", on ? "true" : "false"); });
    refreshBoxes();
    if (on) { all = [].slice.call(document.querySelectorAll('[data-nfood="' + id + '"]')); all.forEach(function (b) { b.classList.add("hzn-pop"); setTimeout(function () { b.classList.remove("hzn-pop"); }, 450); }); try { if (D().buzz) D().buzz(8); } catch (x) { } }
    return;
  }
  el = t.closest("[data-ninfo]"); if (el) { openNutrient(el.getAttribute("data-ninfo")); return; }
  el = t.closest("[data-nsupp]"); if (el) { goSupp(el.getAttribute("data-nsupp")); return; }
  el = t.closest("[data-ngo]");
  if (el) { var g = el.getAttribute("data-ngo"); if (g === "nut") goNut(); else if (g === "supps") goSupp(null); }
});

window.HZN = { NUT: NUT, FOOD: FOOD, FOCUS: FOCUS, checklistCard: checklistCard, openNutrient: openNutrient, ticked: ticked, covered: covered, phaseNow: phaseNow, refresh: refreshBoxes };

/* ---------- Styles ---------- */
var css = [
  ".hzn-hub{background:var(--surface);border:1.5px solid var(--line);border-left:6px solid var(--hzn-col,var(--accent));border-radius:22px;padding:16px 16px 14px;margin:14px 0;box-shadow:rgba(210,72,111,.07) 0 6px 18px}",
  ".hzn-hub h2{margin:2px 0 8px}",
  ".hzn-eyebrow{font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}",
  ".hzn-ringrow{display:flex;align-items:center;gap:12px;margin:6px 0 10px}",
  ".hzn-ring{width:56px;height:56px;flex:0 0 56px;color:var(--ink)}",
  ".hzn-arc{transition:stroke-dasharray .5s ease}",
  ".hzn-lead{margin:0 0 8px}",
  ".hzn-nrow{border-top:1px solid var(--line);padding:10px 0 8px}",
  ".hzn-nhead{display:flex;align-items:center;justify-content:space-between;gap:8px}",
  ".hzn-nname{display:flex;align-items:center;gap:10px;background:none;border:0;padding:4px 0;text-align:left;color:inherit;font:inherit;cursor:pointer}",
  ".hzn-ne{font-size:24px;line-height:1}",
  ".hzn-nname b{display:block}",
  ".hzn-nshort{display:block;font-size:13px;color:var(--muted)}",
  ".hzn-check{width:26px;height:26px;border-radius:50%;border:2px solid var(--line);display:inline-flex;align-items:center;justify-content:center;font-weight:700;color:#fff;flex:0 0 26px}",
  ".hzn-nrow.on .hzn-check{background:var(--sage-ink,#2F5A47);border-color:var(--sage-ink,#2F5A47)}",
  ".hzn-foods2{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 2px}",
  ".hzn-food,.hzn-nchip,.hzn-more{min-height:40px;font-size:14px}",
  ".hzn-pop{animation:hznpop .45s ease}",
  "@keyframes hznpop{0%{transform:scale(1)}40%{transform:scale(1.14)}100%{transform:scale(1)}}",
  "@media (prefers-reduced-motion:reduce){.hzn-pop{animation:none}.hzn-arc{transition:none}}",
  ".hzn-done{background:var(--sage);color:var(--sage-ink);border-radius:14px;padding:10px 14px;font-weight:700;margin:4px 0 8px}",
  ".hzn-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}",
  ".hzn-hubcard{border-left:6px solid var(--hzn-col,var(--accent))}",
  ".hzn-tip{background:var(--accent-soft);border-radius:14px;padding:10px 14px}",
  ".hzn-phase{display:inline-block;font-size:13px;font-weight:700;padding:3px 10px;border-radius:999px;border:2px solid var(--hzn-col,var(--accent));margin:2px 4px 2px 0}",
  ".hzn-insight{border-top:1px solid var(--line);padding:10px 0 10px 12px;border-left:4px solid var(--hzn-col,var(--accent));margin-top:10px}",
  ".hzn-eat{background:var(--sage);color:var(--sage-ink);border-radius:18px;padding:14px 16px;margin:16px 0}",
  ".hzn-eat h2{margin-top:0}",
  ".hzn-supp{background:var(--sage);color:var(--sage-ink);border-radius:14px;padding:10px 14px;margin:8px 0}",
  ".hzn-supp p{margin:4px 0}"
].join("\n");
var st = document.createElement("style"); st.id = "hzn-css2"; st.textContent = css; document.head.appendChild(st);

var app0 = document.getElementById("app");
if (app0) { obs = new MutationObserver(decorate); obs.observe(app0, { childList: true, subtree: true }); }
window.addEventListener("hashchange", function () { setTimeout(decorate, 0); });
decorate();
})();
