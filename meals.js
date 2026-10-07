/* Her A-Z: diets, meal ideas and shopping list (round 3).
   Vegetarian and vegan options change the foods shown everywhere, plus phase meal ideas
   and a shopping list. Needs nutri.js (window.HZN) and delight.js (window.HZD).
   Everything stays on this device. */
(function () {
"use strict";
var DK = "hz_diet", SK = "hz_shop";
var DIETS = { all: "Everything", veg: "Vegetarian", vegan: "Vegan" };
var ANIMAL = { redmeat: "m", chicken: "m", oily: "f", shellfish: "f", eggs: "e", dairy: "d" };
var EXTRA_FOODS = {
  plantmilk: ["Fortified plant milk or yoghurt", "🥛"], yeast: ["Nutritional yeast (B12-fortified)", "🧂"],
  mushroom: ["UV-exposed mushrooms", "🍄"], algae: ["Algae omega-3 oil", "🌊"]
};
var VEGAN_ADD = { calcium: ["plantmilk"], b12: ["plantmilk", "yeast"], omega3: ["algae"], vitd: ["mushroom", "plantmilk"], protein: ["plantmilk"] };
var AISLES = [["p", "Fruit and veg"], ["m", "Meat and fish"], ["g", "Grains, tins and dried"], ["d", "Dairy and alternatives"], ["o", "Other and cupboard"]];

function HZN() { return window.HZN; }
function D() { return window.HZD || {}; }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function dkey() { return D().dkey ? D().dkey(new Date()) : new Date().toISOString().slice(0, 10); }
function curDiet() { try { var d = localStorage.getItem(DK); return d === "veg" || d === "vegan" ? d : "all"; } catch (e) { return "all"; } }

/* ---------- Meal ideas (base = vegan; veg and all override where they differ) ---------- */
var MEALS = {
  period: [
    { s: "Breakfast", t: "Porridge with berries, walnuts and ground flaxseed, made with fortified plant milk", f: ["wholegrain", "berries", "nuts", "seeds", "plantmilk"], i: ["g:Porridge oats", "p:Berries (fresh or frozen)", "o:Walnuts", "o:Ground flaxseed", "d:Fortified plant milk"],
      veg: { t: "Porridge with berries, walnuts and ground flaxseed, made with milk", f: ["wholegrain", "berries", "nuts", "seeds", "dairy"], i: ["g:Porridge oats", "p:Berries (fresh or frozen)", "o:Walnuts", "o:Ground flaxseed", "d:Milk"] } },
    { s: "Lunch", t: "Red lentil and spinach dal with lemon and brown rice", f: ["lentils", "greens", "citrus", "wholegrain"], i: ["g:Red lentils", "p:Spinach", "p:Lemon", "g:Brown rice", "p:Onion and garlic", "o:Curry spices"] },
    { s: "Dinner", t: "Tofu and broccoli stir-fry with peppers and fresh ginger", f: ["tofu", "broccoli", "peppers", "gingerf", "wholegrain"], i: ["d:Firm tofu", "p:Broccoli", "p:Peppers", "p:Fresh ginger", "g:Brown rice or noodles", "o:Soy sauce"],
      all: { t: "Beef and broccoli stir-fry with peppers and fresh ginger", f: ["redmeat", "broccoli", "peppers", "gingerf", "wholegrain"], i: ["m:Lean beef strips", "p:Broccoli", "p:Peppers", "p:Fresh ginger", "g:Brown rice or noodles", "o:Soy sauce"] } },
    { s: "Snack", t: "Dried apricots and a handful of pumpkin seeds", f: ["apricots", "seeds"], i: ["g:Dried apricots", "o:Pumpkin seeds"] },
    { s: "Drink", t: "Fresh ginger and lemon tea", f: ["gingerf", "citrus"], i: ["p:Fresh ginger", "p:Lemon"] },
    { s: "Omega-3 idea", t: "Chia pudding with kiwi and walnuts", f: ["seeds", "kiwi", "nuts", "plantmilk"], i: ["o:Chia seeds", "p:Kiwi", "o:Walnuts", "d:Fortified plant milk"],
      veg: { t: "Chia pudding with milk, kiwi and walnuts", f: ["seeds", "kiwi", "nuts", "dairy"], i: ["o:Chia seeds", "p:Kiwi", "o:Walnuts", "d:Milk"] },
      all: { t: "Grilled salmon with potatoes and greens", f: ["oily", "potato", "greens"], i: ["m:Salmon fillets", "p:Potatoes", "p:Green veg"] } }
  ],
  foll: [
    { s: "Breakfast", t: "Tofu scramble with spinach and nutritional yeast on wholegrain toast", f: ["tofu", "greens", "yeast", "wholegrain"], i: ["d:Firm tofu", "p:Spinach", "o:Nutritional yeast (B12-fortified)", "g:Wholegrain bread"],
      veg: { t: "Spinach and mushroom omelette on wholegrain toast", f: ["eggs", "greens", "wholegrain"], i: ["d:Eggs", "p:Spinach", "p:Mushrooms", "g:Wholegrain bread"] } },
    { s: "Breakfast", t: "Fortified cereal with B12-fortified plant milk and banana", f: ["cereal", "plantmilk", "banana"], i: ["g:Fortified wholegrain cereal", "d:Fortified plant milk", "p:Bananas"],
      veg: { t: "Fortified cereal with milk and banana", f: ["cereal", "dairy", "banana"], i: ["g:Fortified wholegrain cereal", "d:Milk", "p:Bananas"] } },
    { s: "Lunch", t: "Chickpea, avocado and sweet potato bowl with leafy greens", f: ["lentils", "avocado", "potato", "greens"], i: ["g:Tinned chickpeas", "p:Avocado", "p:Sweet potato", "p:Salad leaves"] },
    { s: "Dinner", t: "Black bean and veg chilli with brown rice", f: ["lentils", "veg", "wholegrain"], i: ["g:Tinned black beans", "g:Chopped tomatoes", "p:Peppers and onion", "g:Brown rice"],
      veg: { t: "Black bean and veg chilli with brown rice and a spoon of yoghurt", f: ["lentils", "veg", "wholegrain", "dairy"], i: ["g:Tinned black beans", "g:Chopped tomatoes", "p:Peppers and onion", "g:Brown rice", "d:Yoghurt"] },
      all: { t: "Chicken and vegetable traybake with broccoli", f: ["chicken", "broccoli", "veg", "potato"], i: ["m:Chicken thighs", "p:Broccoli", "p:Mixed veg", "p:Potatoes"] } },
    { s: "Snack", t: "Hummus with carrot and pepper sticks", f: ["lentils", "veg", "peppers"], i: ["o:Hummus", "p:Carrots", "p:Peppers"] },
    { s: "Snack", t: "Fortified soya yoghurt with berries and oats", f: ["plantmilk", "berries", "wholegrain"], i: ["d:Fortified soya yoghurt", "p:Berries", "g:Oats"],
      veg: { t: "Live yoghurt with berries and oats", f: ["dairy", "berries", "wholegrain"], i: ["d:Live yoghurt", "p:Berries", "g:Oats"] } }
  ],
  fert: [
    { s: "Breakfast", t: "Berry smoothie bowl with banana, seeds and fortified plant milk", f: ["berries", "banana", "seeds", "plantmilk"], i: ["p:Frozen berries", "p:Bananas", "o:Pumpkin seeds", "d:Fortified plant milk"],
      veg: { t: "Berry smoothie bowl with banana, seeds and yoghurt", f: ["berries", "banana", "seeds", "dairy"], i: ["p:Frozen berries", "p:Bananas", "o:Pumpkin seeds", "d:Yoghurt"] } },
    { s: "Lunch", t: "Spinach, chickpea and roasted pepper salad with pumpkin seeds and olive oil", f: ["greens", "lentils", "peppers", "seeds", "oliveoil"], i: ["p:Spinach", "g:Tinned chickpeas", "p:Peppers", "o:Pumpkin seeds", "o:Olive oil"] },
    { s: "Dinner", t: "Walnut and lentil bolognese with wholewheat pasta and a side salad", f: ["lentils", "nuts", "wholegrain", "veg", "oliveoil"], i: ["g:Green or brown lentils", "o:Walnuts", "g:Wholewheat pasta", "g:Chopped tomatoes", "p:Salad leaves"],
      all: { t: "Baked salmon with broccoli and brown rice", f: ["oily", "broccoli", "wholegrain"], i: ["m:Salmon fillets", "p:Broccoli", "g:Brown rice"] } },
    { s: "Snack", t: "An orange and a handful of nuts", f: ["citrus", "nuts"], i: ["p:Oranges", "o:Mixed nuts"] },
    { s: "Drink", t: "Water infused with cucumber, mint and lemon", f: ["water", "citrus"], i: ["p:Cucumber", "p:Mint", "p:Lemon"] },
    { s: "Zinc idea", t: "Roasted chickpeas and pumpkin seeds", f: ["lentils", "seeds"], i: ["g:Tinned chickpeas", "o:Pumpkin seeds"],
      all: { t: "Prawn, avocado and spinach salad", f: ["shellfish", "avocado", "greens"], i: ["m:Prawns", "p:Avocado", "p:Spinach"] } }
  ],
  lut: [
    { s: "Breakfast", t: "Overnight oats with banana, almond butter and fortified plant milk", f: ["wholegrain", "banana", "nuts", "plantmilk"], i: ["g:Oats", "p:Bananas", "o:Almond butter", "d:Fortified plant milk"],
      veg: { t: "Overnight oats with banana, almond butter and milk", f: ["wholegrain", "banana", "nuts", "dairy"], i: ["g:Oats", "p:Bananas", "o:Almond butter", "d:Milk"] } },
    { s: "Lunch", t: "Baked sweet potato with chickpeas, tahini and kale", f: ["potato", "lentils", "seeds", "greens"], i: ["p:Sweet potato", "g:Tinned chickpeas", "o:Tahini", "p:Kale"] },
    { s: "Dinner", t: "Calcium-set tofu and vegetable curry with brown rice", f: ["tofu", "veg", "wholegrain"], i: ["d:Calcium-set tofu", "p:Mixed veg", "g:Coconut milk", "g:Brown rice", "o:Curry paste"],
      all: { t: "Roast chicken with potatoes and kale", f: ["chicken", "potato", "greens"], i: ["m:Chicken", "p:Potatoes", "p:Kale"] } },
    { s: "Snack", t: "Banana with a square or two of dark chocolate", f: ["banana", "darkchoc"], i: ["p:Bananas", "o:Dark chocolate (70% or more)"] },
    { s: "Drink", t: "Warm fortified plant milk with cinnamon", f: ["plantmilk"], i: ["d:Fortified plant milk", "o:Cinnamon"],
      veg: { t: "Warm milk with cinnamon", f: ["dairy"], i: ["d:Milk", "o:Cinnamon"] } }
  ]
};
function mealFor(m, diet) {
  var v = diet === "vegan" ? m : diet === "veg" ? (m.veg || m) : (m.all || m.veg || m);
  return { s: m.s, t: v.t, f: v.f, i: v.i };
}
function mealList(phase, diet) { return (MEALS[phase] || []).map(function (m) { return mealFor(m, diet); }); }

/* ---------- Diet: filter foods everywhere ---------- */
var ORIG = null;
function allowed(f, d) { var a = ANIMAL[f]; if (!a) return true; if (d === "all") return true; if (d === "veg") return a === "e" || a === "d"; return false; }
function applyDiet() {
  var H = HZN(); if (!H || !H.NUT) return;
  var d = curDiet(), N = H.NUT, F = H.FOOD;
  Object.keys(EXTRA_FOODS).forEach(function (k) { if (!F[k]) F[k] = EXTRA_FOODS[k]; });
  if (!ORIG) { ORIG = {}; Object.keys(N).forEach(function (id) { ORIG[id] = N[id].foods.slice(); }); }
  Object.keys(N).forEach(function (id) {
    var list = ORIG[id].filter(function (f) { return allowed(f, d); });
    if (d === "vegan" && VEGAN_ADD[id]) VEGAN_ADD[id].forEach(function (x) { if (list.indexOf(x) < 0) list.push(x); });
    N[id].foods = list.length ? list : ORIG[id].slice();
  });
  try { H.refresh(); } catch (e) { }
}
var RE_MEAT = /\b(meat|beef|chicken|turkey|liver|fish|salmon|mackerel|sardines?|prawns?|shellfish)\b/i;
var RE_ANIM = /\b(eggs?|dairy|milk|yoghurt|yogurt|cheese|kefir)\b/i;
var RE_OK = /plant|soya|soy |oat milk|almond milk|fortified/i;
function filterPhaseText() {
  var d = curDiet();
  [].slice.call(document.querySelectorAll(".hzn-foods")).forEach(function (el) {
    if (!el.hasAttribute("data-hzm-orig")) el.setAttribute("data-hzm-orig", el.innerHTML);
    var o = el.getAttribute("data-hzm-orig");
    if (d === "all") { if (el.innerHTML !== o) el.innerHTML = o; return; }
    var cut = o.indexOf("</b>"); if (cut < 0) return;
    var head = o.slice(0, cut + 4), items = o.slice(cut + 4).split(",");
    var keep = items.filter(function (it) {
      if (RE_MEAT.test(it)) return false;
      if (d === "vegan" && RE_ANIM.test(it) && !RE_OK.test(it)) return false;
      return true;
    }).map(function (s) { return s.trim(); }).filter(Boolean);
    var need = el.parentNode && el.parentNode.querySelector("b"), title = need ? need.textContent : "";
    if (d === "vegan") {
      if (title === "Omega-3 fats") keep.push("algae-based omega-3 oil");
      if (title === "Iron and vitamin B12") keep.push("B12-fortified foods such as yeast extract and plant milks (check the label)");
    }
    if (!keep.length) return;
    var html = head + " " + keep.join(", ");
    if (el.innerHTML !== html) el.innerHTML = html;
  });
}

/* ---------- Shopping list ---------- */
function loadShop() { try { var o = JSON.parse(localStorage.getItem(SK) || "{}"); return o && o.items ? o : { items: [] }; } catch (e) { return { items: [] }; } }
function saveShop(o) { try { localStorage.setItem(SK, JSON.stringify(o)); } catch (e) { } }
function addIngredients(list) {
  var o = loadShop(), added = 0;
  list.forEach(function (s) {
    var a = s.charAt(0), n = s.slice(2);
    if (!o.items.some(function (x) { return x.n.toLowerCase() === n.toLowerCase(); })) { o.items.push({ n: n, a: a, d: 0 }); added++; }
  });
  saveShop(o); return added;
}
function shopHtml() {
  var o = loadShop();
  if (!o.items.length) return '<p class="hzn-small">Your list is empty. Tap 🛒 on a meal idea to add its ingredients.</p>';
  var h = "";
  AISLES.forEach(function (ai) {
    var its = o.items.filter(function (x) { return x.a === ai[0]; });
    if (!its.length) return;
    h += '<h3 class="hzm-aisle">' + esc(ai[1]) + '</h3><div class="hzm-items">';
    its.forEach(function (x) { h += '<button type="button" class="hzm-item" data-hzm-shop="' + esc(x.n) + '" aria-pressed="' + (x.d ? "true" : "false") + '"><span class="hzm-box" aria-hidden="true">' + (x.d ? "✓" : "") + "</span>" + esc(x.n) + "</button>"; });
    h += "</div>";
  });
  h += '<div class="hzn-actions"><button type="button" class="btn small" data-hzm-act="copy">Copy list</button><button type="button" class="btn small trk-ghost" data-hzm-act="cleardone">Clear ticked</button><button type="button" class="btn small trk-ghost" data-hzm-act="clearall">Clear all</button></div>';
  return h;
}
function shopText() {
  var o = loadShop(), out = [];
  AISLES.forEach(function (ai) {
    var its = o.items.filter(function (x) { return x.a === ai[0] && !x.d; });
    if (its.length) { out.push(ai[1] + ":"); its.forEach(function (x) { out.push("- " + x.n); }); out.push(""); }
  });
  return out.join("\n").trim();
}
function shopCount() { return loadShop().items.filter(function (x) { return !x.d; }).length; }
function refreshShop() { [].slice.call(document.querySelectorAll(".hzm-shopbox")).forEach(function (b) { b.innerHTML = shopHtml(); }); refreshHomeBtns(); }

/* ---------- UI pieces ---------- */
var toastT = null;
function toast(msg) {
  var t = document.getElementById("hzf-toast");
  if (!t) { t = document.createElement("div"); t.id = "hzf-toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg; t.className = "show"; clearTimeout(toastT); toastT = setTimeout(function () { t.className = ""; }, 2800);
}
function dietNote(d) {
  if (d === "veg") return '<p class="hzn-small"><b>Vegetarian.</b> Iron is the one to watch. Plant iron is absorbed less well, so pair beans, lentils, greens and fortified cereals with vitamin C. Eggs and dairy help with B12 and calcium.</p>';
  if (d === "vegan") return '<div class="hzn-warn"><b>Vegan: nutrients worth planning.</b><ul><li><b>B12:</b> you need a reliable source every day, from fortified foods or a supplement. Ask a pharmacist.</li><li><b>Vitamin D:</b> consider a supplement from October to March. Vegan D3 (from lichen) is available.</li><li><b>Calcium:</b> choose calcium-fortified plant drinks and calcium-set tofu.</li><li><b>Omega-3:</b> flax, chia and walnuts give ALA. Algae oil gives DHA and EPA directly.</li><li><b>Iodine:</b> unfortified plant milks are low. Look for iodine-fortified ones.</li><li><b>Iron:</b> pulses, tofu, greens and fortified cereals with vitamin C. Tea and coffee near meals reduce absorption.</li></ul>General information, not personal advice. If you are pregnant, planning a pregnancy or have heavy periods, talk to your GP, pharmacist or a registered dietitian.</div>';
  return '<p class="hzn-small">Choose how you eat and every food list, meal idea and shopping list will follow it.</p>';
}
function dietChips(d) {
  return Object.keys(DIETS).map(function (k) { return '<button type="button" class="chip" data-hzm-diet="' + k + '" aria-pressed="' + (k === d ? "true" : "false") + '">' + (k === "vegan" ? "🌱 " : k === "veg" ? "🥕 " : "🍽️ ") + DIETS[k] + "</button>"; }).join("");
}
function dietCard() {
  var d = curDiet();
  return '<div class="trk-card hzm-card hzm-dietcard"><h2 style="margin-top:0">🥗 How do you eat?</h2><div class="hzn-foods2" role="group" aria-label="Diet">' + dietChips(d) + "</div>" + dietNote(d) + "</div>";
}
function covers(m, phase) {
  var H = HZN(), out = [];
  if (!H || !H.FOCUS[phase]) return out;
  H.FOCUS[phase].forEach(function (id) { if (H.NUT[id].foods.some(function (f) { return m.f.indexOf(f) > -1; })) out.push(id); });
  return out;
}
function mealDone(m) { var tk = HZN().ticked(); return m.f.every(function (f) { return tk.indexOf(f) > -1; }); }
function mealsCard(phase) {
  var H = HZN(), d = curDiet(), list = mealList(phase, d), P = D().PHASES, nm = (P && P[phase] && P[phase].n) || "";
  var h = '<div class="trk-card hzm-card hzm-meals" data-hzm-phase="' + phase + '"><h2 style="margin-top:0">🍳 Meal ideas</h2><p class="hzn-small">Simple ideas for your ' + esc(nm.toLowerCase()) + (phase === "fert" ? "" : " phase") + ' that cover your focus nutrients' + (d === "all" ? "" : ", all " + (d === "vegan" ? "vegan" : "vegetarian")) + ".</p>";
  list.forEach(function (m, idx) {
    var done = mealDone(m), cv = covers(m, phase);
    h += '<div class="hzm-meal' + (done ? " done" : "") + '"><span class="hzm-slot">' + esc(m.s) + "</span><b>" + esc(m.t) + '</b><div class="hzm-cov">' + cv.map(function (id) { return '<span class="hzm-cv">' + H.NUT[id].e + " " + esc(H.NUT[id].n) + "</span>"; }).join("") + '</div><div class="hzm-btns"><button type="button" class="chip" data-hzm-eat="' + idx + '"' + (done ? ' disabled aria-disabled="true"' : "") + ">" + (done ? "✓ In my day" : "✓ I had this") + '</button><button type="button" class="chip" data-hzm-add="' + idx + '">🛒 Add ingredients</button></div></div>';
  });
  return h + "</div>";
}
function shopCard() { return '<div class="trk-card hzm-card hzm-shop"><h2 style="margin-top:0">🛒 Shopping list</h2><div class="hzm-shopbox">' + shopHtml() + "</div></div>"; }

function openSheet(kind) {
  if (!D().sheet) return;
  if (kind === "diet") { var d = curDiet(); D().sheet('<h2 style="margin-top:0">🥗 How do you eat?</h2><div class="hzn-foods2" role="group">' + dietChips(d) + "</div>" + dietNote(d), "Diet"); }
  else D().sheet('<h2 style="margin-top:0">🛒 Shopping list</h2><div class="hzm-shopbox">' + shopHtml() + '</div><p class="hzn-small">Add ingredients from the Meal ideas in Track, then Nutrition.</p>', "Shopping list");
}

/* ---------- Decorate ---------- */
function selectedPhase() { var b = document.querySelector('[data-nut][aria-pressed="true"]'); return b ? b.getAttribute("data-nut") : null; }
function refreshHomeBtns() {
  var act = document.querySelector("#hzh-hub .hzn-actions"); if (!act) return;
  var label = "🥗 " + DIETS[curDiet()], n = shopCount(), cnt = "🛒 List" + (n ? " (" + n + ")" : "");
  var a = act.querySelector('[data-hzm-open="diet"]'), b = act.querySelector('[data-hzm-open="shop"]');
  if (!a) act.insertAdjacentHTML("beforeend", '<button type="button" class="btn small trk-ghost" data-hzm-open="diet">' + label + "</button>");
  else if (a.textContent !== label) a.textContent = label;
  if (!b) act.insertAdjacentHTML("beforeend", '<button type="button" class="btn small trk-ghost" data-hzm-open="shop">' + cnt + "</button>");
  else if (b.textContent !== cnt) b.textContent = cnt;
}
var busy = false, obs = null;
function decorate() {
  if (busy) return; busy = true;
  try {
    if (!HZN()) return;
    if (ORIG === null || (HZN().NUT && !HZN().FOOD.plantmilk)) applyDiet();
    refreshHomeBtns();
    var hub = document.querySelector(".hzn-hubcard"), ph = selectedPhase();
    if (hub && ph) {
      if (!document.querySelector(".hzm-dietcard")) hub.insertAdjacentHTML("beforebegin", dietCard());
      var meals = document.querySelector(".hzm-meals");
      if (!meals) {
        hub.insertAdjacentHTML("afterend", mealsCard(ph));
        meals = document.querySelector(".hzm-meals");
      } else if (meals.getAttribute("data-hzm-phase") !== ph) meals.outerHTML = mealsCard(ph);
      if (!document.querySelector(".hzm-shop")) { var m2 = document.querySelector(".hzm-meals"); if (m2) m2.insertAdjacentHTML("afterend", shopCard()); }
      filterPhaseText();
    }
  } catch (x) { if (window.__hzDebug) console.error(x); }
  finally { busy = false; try { obs.takeRecords(); } catch (y) { } }
}
function refreshMeals() { var m = document.querySelector(".hzm-meals"); if (m) m.outerHTML = mealsCard(m.getAttribute("data-hzm-phase")); }

function setDiet(k) {
  try { localStorage.setItem(DK, k); } catch (e) { }
  applyDiet();
  try { if (D().closeSheet) D().closeSheet(true); } catch (e) { }
  [].slice.call(document.querySelectorAll(".hzm-card")).forEach(function (el) { el.parentNode.removeChild(el); });
  decorate(); refreshHomeBtns();
  toast("Showing foods for: " + DIETS[k]);
}
function tickFood(f) {
  var b = document.querySelector('[data-nfood="' + f + '"][aria-pressed="false"]');
  if (b) { b.click(); return; }
  try {
    var o = JSON.parse(localStorage.getItem("hz_nut") || "{}"); if (!o.days) o.days = {};
    var k = dkey(), r = o.days[k] || (o.days[k] = { foods: [] });
    if (r.foods.indexOf(f) < 0) r.foods.push(f);
    localStorage.setItem("hz_nut", JSON.stringify(o));
  } catch (e) { }
}

document.addEventListener("click", function (e) {
  var t = e.target; if (!t.closest) return;
  var el = t.closest("[data-hzm-diet]");
  if (el) { setDiet(el.getAttribute("data-hzm-diet")); return; }
  el = t.closest("[data-hzm-open]"); if (el) { openSheet(el.getAttribute("data-hzm-open")); return; }
  el = t.closest("[data-hzm-eat]");
  if (el) {
    var box = el.closest(".hzm-meals"), ph = box && box.getAttribute("data-hzm-phase"), m = mealList(ph, curDiet())[+el.getAttribute("data-hzm-eat")];
    if (m) { m.f.forEach(tickFood); try { HZN().refresh(); } catch (x) { } refreshMeals(); }
    return;
  }
  el = t.closest("[data-hzm-add]");
  if (el) {
    var bx = el.closest(".hzm-meals"), p2 = bx && bx.getAttribute("data-hzm-phase"), mm = mealList(p2, curDiet())[+el.getAttribute("data-hzm-add")];
    if (mm) { var n = addIngredients(mm.i); refreshShop(); toast(n ? "Added " + n + " item" + (n === 1 ? "" : "s") + " to your shopping list" : "Already on your list"); }
    return;
  }
  el = t.closest("[data-hzm-shop]");
  if (el) {
    var nm = el.getAttribute("data-hzm-shop"), o = loadShop();
    o.items.forEach(function (x) { if (x.n === nm) x.d = x.d ? 0 : 1; });
    saveShop(o); refreshShop(); return;
  }
  el = t.closest("[data-hzm-act]");
  if (el) {
    var a = el.getAttribute("data-hzm-act"), o2 = loadShop();
    if (a === "cleardone") { o2.items = o2.items.filter(function (x) { return !x.d; }); saveShop(o2); refreshShop(); }
    else if (a === "clearall") { saveShop({ items: [] }); refreshShop(); }
    else if (a === "copy") {
      var txt = shopText();
      if (!txt) { toast("Nothing to copy yet"); return; }
      try { navigator.clipboard.writeText(txt).then(function () { toast("Shopping list copied"); }, function () { toast("Could not copy. Try selecting the items"); }); } catch (x) { toast("Could not copy. Try selecting the items"); }
    }
    return;
  }
  if (t.closest("[data-nfood]")) setTimeout(refreshMeals, 30);
});

var css = [
  ".hzm-meal{border-top:1px solid var(--line);padding:12px 0 6px}",
  ".hzm-meal.done{opacity:.8}",
  ".hzm-slot{display:block;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:2px}",
  ".hzm-cov{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 2px}",
  ".hzm-cv{font-size:12.5px;background:var(--accent-soft);color:var(--ink);font-weight:600;border-radius:999px;padding:3px 10px}",
  ".hzm-btns{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 6px}",
  ".hzm-btns .chip{min-height:40px;font-size:14px}",
  ".hzm-aisle{margin:14px 0 6px;font-size:15px}",
  ".hzm-items{display:flex;flex-direction:column;gap:6px}",
  ".hzm-item{display:flex;align-items:center;gap:10px;min-height:44px;text-align:left;background:var(--surface);border:1.5px solid var(--line);border-radius:14px;padding:6px 12px;font:inherit;color:inherit;cursor:pointer}",
  ".hzm-item[aria-pressed=true]{text-decoration:line-through;opacity:.6}",
  ".hzm-box{width:22px;height:22px;border-radius:7px;border:2px solid var(--line);display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:700;flex:0 0 22px}",
  ".hzm-item[aria-pressed=true] .hzm-box{background:var(--sage-ink,#2F5A47);border-color:var(--sage-ink,#2F5A47)}",
  ".hzm-dietcard .hzn-warn ul{margin:6px 0 8px;padding-left:20px}"
].join("\n");
var st = document.createElement("style"); st.id = "hzm-css"; st.textContent = css; document.head.appendChild(st);

window.HZM = { diet: curDiet, meals: mealList, shopCount: shopCount };

var app0 = document.getElementById("app");
if (app0) { obs = new MutationObserver(decorate); obs.observe(app0, { childList: true, subtree: true }); }
window.addEventListener("hashchange", function () { setTimeout(decorate, 60); });
setTimeout(function () { applyDiet(); decorate(); }, 80);
})();
