/* Her A–Z: nutrition through the menstrual cycle. Shown as the "Nutrition" tab inside Track.
   Needs track.js (tab) and delight.js (window.HZD). Everything stays on this device. */
(function () {
"use strict";
var KEYS = ["period", "foll", "fert", "lut"];
var EVL = { s: ["Strong evidence", "hzn-s"], m: ["Some evidence", "hzn-m"], l: ["Limited evidence", "hzn-l"] };
var sel = null;

function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
}

var P = {
  period: {
    name: "Menstrual phase", pill: "Menstrual",
    blurb: "The first days of your cycle, when you bleed. Day 1 is the first day of bleeding.",
    hormones: [
      ["Oestrogen", "Low", "Oestrogen and progesterone fall sharply at the end of the previous cycle. That drop is what makes the womb lining shed, which is your period."],
      ["Progesterone", "Low", "Stays low through your period."],
      ["FSH", "Starting to rise", "Follicle-stimulating hormone begins to rise towards the end of your period. It wakes up a group of follicles, each holding an egg, to start the next cycle."],
      ["LH", "Low", "Luteinising hormone stays low until just before ovulation."],
      ["Prostaglandins", "High", "Not a sex hormone, but chemicals made by the womb lining. They make the womb contract to shed the lining. High levels are linked with stronger cramps, and they can loosen your bowels."]
    ],
    feel: ["Tiredness and lower energy, especially if bleeding is heavy", "Cramps, lower back ache and headaches", "Looser poo for some people", "Wanting to rest. Many people feel relief as PMS symptoms ease once bleeding starts"],
    needs: [
      ["Iron", "You lose iron in period blood. Heavy periods can lead to iron-deficiency anaemia. The UK recommendation for women aged 19 to 50 is 14.8 mg a day.", "s", "Red meat, lentils, beans, tofu, fortified breakfast cereals, dark green leafy veg, eggs, dried apricots"],
      ["Vitamin C with your iron", "Vitamin C helps your body absorb iron from plant foods. Tea and coffee within an hour of a meal can reduce how much you absorb.", "s", "Oranges, kiwi, peppers, strawberries, broccoli"],
      ["Ginger", "A few small trials found ginger eased period pain about as well as common painkillers. More research is needed.", "m", "Fresh ginger tea, ginger in cooking"],
      ["Omega-3 fats", "Some small studies suggest omega-3 may ease period pain. The studies are not strong.", "l", "Oily fish such as salmon, mackerel and sardines (aim for 1 portion a week), walnuts, flaxseed"],
      ["Magnesium", "May help cramps and headaches for some people, but the evidence is limited.", "l", "Nuts, seeds, wholegrains, beans, dark leafy greens"]
    ],
    warn: "Heavy bleeding (soaking a pad or tampon every hour, or periods lasting more than 7 days), looking pale, or feeling very tired or breathless: ask your GP for an iron blood test before taking iron tablets. Too much iron is harmful.",
    links: [["heavy-periods", "Heavy periods"], ["iron-deficiency-anaemia", "Iron-deficiency anaemia"], ["period-pain", "Period pain"]]
  },
  foll: {
    name: "Follicular phase", pill: "Follicular",
    blurb: "From the end of your period until ovulation. Your body is getting ready to release an egg.",
    hormones: [
      ["FSH", "Rising, then falling", "Stimulates follicles to grow. One usually becomes the dominant follicle that will release an egg."],
      ["Oestrogen", "Rising", "Climbs steadily as the follicle grows. It rebuilds the womb lining after your period."],
      ["Progesterone", "Low", "Stays low until after ovulation."],
      ["LH", "Low, then rising", "Starts to rise towards the end of this phase."]
    ],
    feel: ["Energy often returns as your period ends", "Mood and focus may lift. Research on mood across the cycle is mixed, and everyone is different", "Skin often looks clearer", "Appetite is often steady or lower"],
    needs: [
      ["Iron and vitamin B12", "Replace what you lost during your period. B12 is found mainly in animal foods, so it needs extra attention if you are vegan.", "s", "Meat, fish, eggs, dairy, fortified foods, plus the iron foods from your period"],
      ["Folate", "Supports cell growth. If you could become pregnant, the NHS advises 400 micrograms of folic acid a day.", "s", "Leafy greens, broccoli, peas, chickpeas, fortified bread and cereals, oranges"],
      ["Protein", "Keeps you full and supports muscle. Some research suggests muscles may respond well to training in this phase, but the evidence is limited.", "l", "Eggs, chicken, fish, tofu, beans, Greek yoghurt"],
      ["Fibre and fermented foods", "A healthy gut helps your body clear used oestrogen. Whether food changes your hormone levels is not proven.", "l", "Oats, wholegrains, vegetables, live yoghurt, kefir, sauerkraut"]
    ],
    warn: "Eat to your appetite. Cutting calories too far can stop ovulation and your periods.",
    links: [["irregular-periods", "Irregular periods"], ["pcos", "PCOS"], ["hormonal-acne", "Hormonal acne"]]
  },
  fert: {
    name: "Fertile window and ovulation", pill: "Fertile window",
    blurb: "The few days around ovulation, when an egg is released. App estimates are only a guide.",
    hormones: [
      ["Oestrogen", "Peak", "Reaches its highest level just before ovulation."],
      ["LH", "Surge", "A sharp rise in luteinising hormone triggers the egg to be released about 24 to 36 hours later."],
      ["FSH", "Small peak", "A brief rise alongside the LH surge."],
      ["Progesterone", "Starting to rise", "Begins to climb after the egg is released. It lifts your body temperature slightly."],
      ["Testosterone", "Small rise", "May lift energy and sex drive for some people."]
    ],
    feel: ["Higher energy and sex drive for some", "Clear, stretchy discharge", "A one-sided twinge in the lower tummy (ovulation pain)", "Appetite is often lowest around now. Studies suggest this, though not for everyone"],
    needs: [
      ["Colourful fruit and veg", "Rich in vitamins C and E and other antioxidants. Linked with better health in general. A direct fertility benefit is not proven.", "l", "Berries, peppers, tomatoes, spinach, citrus fruit, carrots"],
      ["Zinc", "Needed for normal reproduction. Most women get enough from food, and extra supplements are not needed.", "s", "Shellfish, meat, pumpkin seeds, chickpeas, cheese"],
      ["Mediterranean-style fats", "Diets rich in olive oil, nuts, fish and wholegrains are linked with better fertility in studies.", "m", "Olive oil, nuts, oily fish, avocado, seeds, wholegrains"],
      ["Folic acid if you are trying for a baby", "Take 400 micrograms a day from before you conceive until week 12 of pregnancy. A higher dose is available on prescription for some women. Ask your GP or pharmacist.", "s", "Leafy greens, fortified cereals, plus a folic acid supplement"],
      ["Water and fibre", "Staying hydrated and eating fibre supports digestion and steady energy.", "l", "Water, herbal tea, fruit, veg, oats, pulses"]
    ],
    warn: "The fertile window shown in the app is an estimate. It is not contraception. If you are trying to conceive, see the fertility guide.",
    links: [["infertility", "Fertility problems"], ["irregular-periods", "Irregular periods"]]
  },
  lut: {
    name: "Luteal phase", pill: "Luteal",
    blurb: "From ovulation until your next period. This is when PMS symptoms can appear.",
    hormones: [
      ["Progesterone", "High", "Peaks about a week after ovulation. It prepares the womb lining, can make you sleepy and slow your gut, and raises your body temperature slightly."],
      ["Oestrogen", "Second smaller rise, then falling", "Both hormones fall in the last days of the cycle if you are not pregnant. This drop is linked with PMS symptoms in people who are sensitive to the change."],
      ["FSH and LH", "Low", "Stay low until the next cycle begins."],
      ["Brain chemicals", "Changing", "Hormone shifts can affect serotonin and other brain chemicals linked with mood and sleep. This is a leading explanation for PMS, not fully proven."]
    ],
    feel: ["Bloating, sore breasts and constipation", "Cravings and bigger appetite. Some studies suggest the body burns a little more energy now", "Tiredness, poor sleep, irritability or low mood", "Headaches or migraine for some people"],
    needs: [
      ["Calcium", "In some trials, around 1,000 mg of calcium a day eased PMS symptoms such as mood changes and cramps. The UK recommendation is 700 mg.", "m", "Milk, yoghurt, cheese, calcium-fortified plant milks, tinned sardines with bones, tofu set with calcium, kale"],
      ["Vitamin B6", "Small trials suggest it may help some PMS symptoms. Do not take more than 10 mg a day as a supplement unless a doctor advises. High doses can damage nerves.", "l", "Chicken, fish, potatoes, bananas, chickpeas, fortified cereals"],
      ["Magnesium", "May help with bloating, mood and headaches for some people, but the evidence is limited.", "l", "Nuts, seeds, wholegrains, beans, dark leafy greens, a little dark chocolate"],
      ["Slow-release carbs and fibre", "Steady blood sugar may help with cravings and low mood, and fibre eases constipation caused by progesterone.", "l", "Oats, wholemeal bread, brown rice, sweet potato, beans, fruit"],
      ["Less salt, caffeine and alcohol", "Less salt may reduce bloating. Caffeine and alcohol can make breast tenderness, anxiety and poor sleep worse for some people.", "l", "Herbal or decaf drinks, cooking with herbs and spices instead of salt"]
    ],
    warn: "If PMS or low mood in the week before your period is severe or affects your life, see your GP. It could be PMDD, which is treatable.",
    links: [["pms-pmdd", "PMS and PMDD"], ["bloating", "Bloating"], ["constipation", "Constipation"], ["breast-pain", "Breast pain"]]
  }
};

function dayText(c, k) {
  var a, b;
  if (!c) {
    var gen = { period: [1, 5], foll: [6, 11], fert: [12, 16], lut: [17, 28] }[k];
    return "About days " + gen[0] + " to " + gen[1] + " of a 28-day cycle";
  }
  var pl = (c.estimated || c.plen < 3) ? Math.max(c.plen, 5) : c.plen;
  if (k === "period") { a = 1; b = pl; }
  else if (k === "foll") { a = pl + 1; b = Math.max(a, c.fs - 1); }
  else if (k === "fert") { a = Math.max(c.fs, pl + 1); b = Math.max(a, c.fe); }
  else { a = Math.max(c.fe, pl + 1) + 1; b = Math.max(a, c.len); }
  if (b < a) return "Very short in your cycle";
  return "Days " + a + " to " + b + " of your cycle (estimate)";
}

function html() {
  var D = window.HZD || {};
  var c = D.cycle ? D.cycle() : null;
  var cur = null;
  if (c && D.phaseOf) cur = D.phaseOf(c, Math.min(c.cd, c.len));
  if (!sel || KEYS.indexOf(sel) < 0) sel = cur || "period";
  var p = P[sel];
  var col = (D.PHASES && D.PHASES[sel] && D.PHASES[sel].c) || "var(--accent)";
  var h = "";
  h += '<div class="trk-card"><h2 style="margin-top:0">Eating through your menstrual cycle</h2>';
  h += '<p>Your hormones change across the month, and so can your appetite, energy and what your body needs. Pick a phase to see what is happening and which nutrients and foods may help.</p>';
  h += '<div class="hzn-note"><b>How strong is the science?</b> The hormone facts here are well established. Advice on eating different foods in different phases is popular, but there is little proof it changes how you feel. Treat the food ideas as things to try on top of a balanced diet, and check the evidence label on each one.</div>';
  if (!c) h += '<p class="hzn-small">Log the first day of your period in the Log tab and this page will show the phase you are in today.</p>';
  h += '<div class="hzn-pills" role="group" aria-label="Cycle phase">';
  KEYS.forEach(function (k) {
    h += '<button type="button" class="chip" data-nut="' + k + '" aria-pressed="' + (k === sel ? "true" : "false") + '">' + esc(P[k].pill) + (k === cur ? " · today" : "") + "</button>";
  });
  h += "</div></div>";

  try { if (window.HZN && window.HZN.checklistCard) h += window.HZN.checklistCard(); } catch (e) { }

  h += '<div class="trk-card hzn-card" style="--hzn:' + col + '">';
  h += '<h2 style="margin-top:0">' + esc(p.name) + "</h2>";
  h += '<p class="hzn-small"><b>' + esc(dayText(c, sel)) + "</b></p>";
  h += "<p>" + esc(p.blurb) + "</p>";

  h += "<h3>What your hormones are doing</h3>";
  p.hormones.forEach(function (x) {
    h += '<div class="hzn-row"><span class="hzn-lvl">' + esc(x[1]) + '</span><div><b>' + esc(x[0]) + "</b><br>" + esc(x[2]) + "</div></div>";
  });

  h += "<h3>How you may feel</h3><ul>";
  p.feel.forEach(function (x) { h += "<li>" + esc(x) + "</li>"; });
  h += "</ul>";

  h += "<h3>What your body needs</h3>";
  p.needs.forEach(function (n) {
    var ev = EVL[n[2]];
    h += '<div class="hzn-need"><b>' + esc(n[0]) + '</b><span class="hzn-ev ' + ev[1] + '">' + ev[0] + "</span><p>" + esc(n[1]) + '</p><p class="hzn-foods"><b>Foods to try:</b> ' + esc(n[3]) + "</p></div>";
  });

  h += '<div class="hzn-warn">' + esc(p.warn) + "</div>";
  h += '<p class="hzn-small">Read more: ';
  h += p.links.map(function (l) { return '<a href="#/entry/' + l[0] + '">' + esc(l[1]) + "</a>"; }).join(" · ");
  h += "</p></div>";

  h += '<div class="trk-card"><h2 style="margin-top:0">The basics matter more than the phase</h2><ul>';
  h += "<li>Aim for 5 portions of fruit and veg a day, wholegrains, some protein at each meal, and 2 portions of fish a week (one oily).</li>";
  h += "<li>Eat enough overall. Very restrictive diets or under-eating can stop ovulation and periods.</li>";
  h += "<li>From October to March, the NHS suggests considering 10 micrograms of vitamin D a day.</li>";
  h += "<li>Check with a pharmacist before starting supplements, especially if you are pregnant, breastfeeding or take other medicines.</li>";
  h += '<li>Periods that are irregular, missing or very painful are worth a GP visit. See also <a href="#/entry/eating-disorders">Eating disorders</a> if food feels stressful.</li>';
  h += "</ul></div>";
  return h;
}

window.hzNutrition = html;

var css = [
  ".hzn-note{background:var(--sage);color:var(--sage-ink);border-radius:14px;padding:12px 14px;font-size:14.5px;line-height:1.5;margin:10px 0}",
  ".hzn-small{font-size:14px;color:var(--muted)}",
  ".hzn-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}",
  ".hzn-card{border-left:6px solid var(--hzn,var(--accent))}",
  ".hzn-card h3{margin:20px 0 8px}",
  ".hzn-row{display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid var(--line);line-height:1.45}",
  ".hzn-row:first-of-type{border-top:0}",
  ".hzn-lvl{flex:0 0 92px;text-align:center;font-weight:700;font-size:12.5px;line-height:1.25;padding:5px 6px;border-radius:10px;background:var(--accent-soft);color:var(--accent)}",
  ".hzn-need{border-top:1px solid var(--line);padding:12px 0 4px}",
  ".hzn-need p{margin:6px 0}",
  ".hzn-foods{font-size:14.5px}",
  ".hzn-ev{display:inline-block;margin-left:8px;font-size:12px;font-weight:700;border-radius:999px;padding:2px 10px;white-space:nowrap;vertical-align:middle}",
  ".hzn-s{background:var(--sage);color:var(--sage-ink)}",
  ".hzn-m{background:var(--accent-soft);color:var(--accent)}",
  ".hzn-l{background:rgba(240,180,40,.22);color:var(--ink)}",
  ".hzn-warn{background:var(--alert);color:var(--alert-ink);border-radius:14px;padding:12px 14px;margin:14px 0 8px;font-size:14.5px;line-height:1.5}"
].join("\n");
var s = document.createElement("style");
s.id = "hzn-css";
s.textContent = css;
document.head.appendChild(s);

document.addEventListener("click", function (e) {
  var el = e.target.closest ? e.target.closest("[data-nut]") : null;
  if (!el || !document.querySelector(".trk")) return;
  sel = el.getAttribute("data-nut");
  var y = window.scrollY;
  if (window.viewTrack) window.viewTrack();
  window.scrollTo(0, y);
});
})();
