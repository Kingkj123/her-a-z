/* Her A–Z: personalisation (name, goals, country-aware emergency wording), inclusive options and personal cycle insights. Loaded after track.js. Everything stays on this device. */
(
function main(){
"use strict";
const KEY="hz_me";
const FIND="https://findahelpline.com";

/* ---------- Country data (numbers can change: the app says so) ---------- */
const C={
 GB:{n:"United Kingdom",em:"999",gp:"GP",ed:"A&E",urgent:"NHS 111",crisis:"Samaritans on 116 123",dv:"Refuge National Domestic Abuse Helpline on 0808 2000 247"},
 IE:{n:"Ireland",em:"999 or 112",gp:"GP",ed:"the emergency department",urgent:"your GP or out-of-hours GP service",crisis:"Samaritans on 116 123",dv:"Women's Aid on 1800 341 900"},
 US:{n:"United States",em:"911",gp:"doctor",ed:"the emergency room",urgent:"your doctor or an urgent care clinic",crisis:"the 988 Suicide & Crisis Lifeline (call or text 988)",dv:"the National Domestic Violence Hotline on 1-800-799-7233"},
 CA:{n:"Canada",em:"911",gp:"doctor",ed:"the emergency department",urgent:"your doctor or a health advice line (811 in most provinces)",crisis:"the 988 Suicide Crisis Helpline (call or text 988)"},
 AU:{n:"Australia",em:"000",gp:"GP",ed:"the emergency department",urgent:"healthdirect on 1800 022 222",crisis:"Lifeline on 13 11 14",dv:"1800RESPECT on 1800 737 732"},
 NZ:{n:"New Zealand",em:"111",gp:"GP",ed:"the emergency department",urgent:"Healthline on 0800 611 116",crisis:"1737 (call or text, free)",dv:"Women's Refuge on 0800 733 843"},
 IN:{n:"India",em:"112",gp:"doctor",ed:"the emergency department",urgent:"your doctor or nearest hospital",crisis:"Tele-MANAS on 14416",dv:"the Women Helpline on 181"},
 ZA:{n:"South Africa",em:"10177 (ambulance) or 112 from a mobile",gp:"doctor",ed:"the emergency department",urgent:"your doctor or nearest clinic",crisis:"SADAG on 0800 567 567",dv:"the GBV Command Centre on 0800 428 428"},
 SG:{n:"Singapore",em:"995 (ambulance)",gp:"doctor",ed:"the emergency department",urgent:"your doctor or a nearby clinic",crisis:"the Samaritans of Singapore on 1767"},
 PH:{n:"Philippines",em:"911",gp:"doctor",ed:"the emergency room",urgent:"your doctor or nearest health centre",crisis:"the NCMH Crisis Hotline on 1553"},
 DE:{n:"Germany",em:"112",gp:"doctor",ed:"the emergency department",urgent:"your doctor or the on-call medical service (116 117)",crisis:"Telefonseelsorge on 0800 111 0 111",dv:"the Hilfetelefon on 116 016"},
 FR:{n:"France",em:"15 (medical) or 112",gp:"doctor",ed:"the emergency department",urgent:"your doctor or SOS Médecins",crisis:"3114",dv:"3919"},
 ES:{n:"Spain",em:"112",gp:"doctor",ed:"the emergency department",urgent:"your doctor or health centre",crisis:"024",dv:"016"},
 IT:{n:"Italy",em:"112 (or 118 for an ambulance)",gp:"doctor",ed:"the emergency department",urgent:"your doctor or the guardia medica",dv:"1522"},
 NL:{n:"Netherlands",em:"112",gp:"doctor",ed:"the emergency department",urgent:"your huisarts (GP) or the out-of-hours GP service",crisis:"113 Zelfmoordpreventie (0800-0113)",dv:"Veilig Thuis on 0800-2000"},
 NG:{n:"Nigeria",em:"112",gp:"doctor",ed:"the emergency department",urgent:"your doctor or nearest clinic"},
 KE:{n:"Kenya",em:"999 or 112",gp:"doctor",ed:"the emergency department",urgent:"your doctor or nearest clinic"},
 AE:{n:"United Arab Emirates",em:"998 (ambulance) or 999",gp:"doctor",ed:"the emergency department",urgent:"your doctor or a nearby clinic"},
 XX:{n:"Another country",em:"your local emergency number (112 works on many mobile networks)",gp:"doctor",ed:"the emergency department",urgent:"your doctor or local urgent care"}
};
const NOCRISIS="a local crisis line (free services worldwide are listed at findahelpline.com)";

/* ---------- Goals ---------- */
const GOALS=[
 {k:"symptoms",t:"Understand my symptoms",href:"#/ask",label:"Check my symptoms",areas:[]},
 {k:"cycle",t:"Track my cycle",href:"#/track",label:"Track my cycle",areas:["repro","horm"]},
 {k:"conceive",t:"Trying to conceive",href:"#/area/repro",label:"Fertility and conceiving",areas:["repro","preg"]},
 {k:"pregnancy",t:"Pregnancy and birth",href:"#/area/preg",label:"Pregnancy and birth",areas:["preg"]},
 {k:"menopause",t:"Perimenopause and menopause",href:"#/area/horm",label:"Perimenopause and menopause",areas:["horm","bone","heart"],stage:"meno"},
 {k:"sexual",t:"Sexual and reproductive health",href:"#/area/sexual",label:"Sexual health",areas:["sexual","breast","cancer"]},
 {k:"mind",t:"Mental wellbeing",href:"#/area/mind",label:"Mental wellbeing",areas:["mind","energy"]},
 {k:"learn",t:"Just learning",href:"#/browse",label:"Browse A to Z",areas:[]}
];

/* ---------- My details (stored on this device only) ---------- */
let me=(function(){let v=null;try{v=store.get(KEY)}catch(e){}return v&&typeof v==="object"?v:{}})();
function saveMe(){try{store.set(KEY,me)}catch(e){}}
const cinfo=()=>(me.country&&C[me.country])||null;

/* ---------- Local wording (999, NHS 111, GP, A&E etc.) ---------- */
function put(t,tok,v){return t.replace(new RegExp(tok,"g"),(m,off,str)=>{const b=str.slice(0,off).replace(/\s+$/,"");const start=b===""||/[.!?:]$/.test(b);return start?v.charAt(0).toUpperCase()+v.slice(1):v})}
function localise(s){
 const c=cinfo();
 if(!c||me.country==="GB")return s;
 if(!/999|111|A&E|GP|Samaritans|smear/.test(s))return s;
 let t=s.replace(/Samaritans on 116 123/g,"@@CR@@").replace(/\bNHS 111\b/g,"@@UR@@").replace(/\bA&E\b/g,"@@ED@@").replace(/\b999\b/g,"@@EM@@").replace(/\b111\b/g,"@@UR@@");
 if(c.gp!=="GP"){t=t.replace(/\bGP surgery\b/g,"doctor's office").replace(/\bGPs\b/g,"doctors").replace(/\bGP\b/g,c.gp)}
 if(me.country==="US"||me.country==="CA"){t=t.replace(/\b[Ss]mear tests?\b/g,"Pap test")}
 t=put(t,"@@EM@@",c.em);t=put(t,"@@UR@@",c.urgent);t=put(t,"@@ED@@",c.ed);t=put(t,"@@CR@@",c.crisis||NOCRISIS);
 return t.replace(/\bthe the\b/g,"the").replace(/\ba a\b/g,"a");
}
function incl(t){return t.replace(/\bWomen's\b/g,"People's").replace(/\bwomen's\b/g,"people's").replace(/\bWomen\b/g,"People").replace(/\bwomen\b/g,"people").replace(/\bWoman\b/g,"Person").replace(/\bwoman\b/g,"person")}
function skipIncl(n){const p=n.parentElement;return !p||!!p.closest(".hero,.brand,h1,.tabs,#hz-setup,.hz-exit")}
const seen=new WeakMap();
function walk(root){
 if(!cinfo()&&!me.inclusive)return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){const p=n.parentNode;return(!p||/^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(p.nodeName))?2:1}});
 const nodes=[];let n;while((n=w.nextNode()))nodes.push(n);
 nodes.forEach(n=>{
  const cur=n.nodeValue;const rec=seen.get(n);const orig=(rec&&rec.out===cur)?rec.orig:cur;
  let out=localise(orig);
  if(me.inclusive&&/[Ww]om[ae]n/.test(out)&&!skipIncl(n))out=incl(out);
  if(out!==cur)n.nodeValue=out;
  seen.set(n,{orig:orig,out:out});
 });
}

/* ---------- Help block ---------- */
function helpHtml(){
 const c=cinfo();
 if(!c)return `<div class="hz-help"><b>Local help.</b> Choose your country to see the right emergency number and support lines. <a href="#/setup">Choose country</a></div>`;
 const em=c.em,ur=c.urgent,cr=c.crisis||NOCRISIS;
 return `<div class="hz-help"><b>In an emergency, call ${esc(em)}.</b><br>Urgent but not an emergency: ${esc(ur)}.<br>Feeling overwhelmed or unsafe: ${esc(cr)}.${c.dv?`<br>If you are afraid of someone: ${esc(c.dv)}.`:""}<br><span class="hz-small">Numbers can change, so check with your local services. Free helplines worldwide: <a href="${FIND}" target="_blank" rel="noopener">findahelpline.com</a>. <a href="#/setup">Change country</a></span></div>`;
}

/* ---------- Setup screen ---------- */
let draft=null;
function renderSetup(){
 const app=$("#app");const t=$("#tabs");if(t)t.innerHTML="";
 draft={goals:(me.goals||[]).slice(),stage:profile?profile.stage:null};
 const keys=Object.keys(C).filter(k=>k!=="XX").sort((a,b)=>C[a].n.localeCompare(C[b].n)).concat("XX");
 app.innerHTML=`<div class="wrap" id="hz-setup">
  <div class="brand"><i></i>Her A–Z</div>
  <h1 style="font-size:30px;margin-bottom:6px">Make it yours</h1>
  <p class="privacy">Everything you enter here stays on this device. Nothing is sent anywhere, and every question is optional.</p>
  <label class="hz-l" for="hz-name">What should we call you?</label>
  <input class="search" id="hz-name" maxlength="40" autocomplete="off" placeholder="Your name or a nickname" value="${esc(me.name||"")}">
  <label class="hz-l" for="hz-country">Where are you? (so emergency numbers and wording fit your country)</label>
  <select class="search" id="hz-country"><option value="">Choose your country</option>${keys.map(k=>`<option value="${k}" ${me.country===k?"selected":""}>${esc(C[k].n)}</option>`).join("")}</select>
  <div class="hz-l">What brings you here? Pick any.</div>
  <div class="opts" id="hz-goals">${GOALS.map(g=>`<button class="opt" type="button" data-goal="${g.k}" aria-pressed="${draft.goals.indexOf(g.k)>-1}">${esc(g.t)}</button>`).join("")}</div>
  <div class="hz-l">Which life stage fits you right now?</div>
  <div class="opts" id="hz-stage">${STAGES.map(s=>`<button class="opt" type="button" data-stage="${s.k}" aria-pressed="${draft.stage===s.k}">${esc(s.n)}</button>`).join("")}</div>
  <div class="hz-l">Comfort and privacy</div>
  <label class="hz-toggle"><input type="checkbox" id="hz-incl" ${me.inclusive?"checked":""}><span>Use gender-inclusive wording (for example "people" instead of "women") in the guides</span></label>
  <label class="hz-toggle"><input type="checkbox" id="hz-exit" ${me.quickExit?"checked":""}><span>Show a Quick exit button that leaves this site straight away (press Esc twice also works)</span></label>
  <button class="btn block" id="hz-save" style="margin-top:18px">Save</button>
  <div style="text-align:center;margin-top:10px"><button class="link" id="hz-skip">Skip for now</button></div>
 </div>`;
 window.scrollTo(0,0);
}
document.addEventListener("click",e=>{
 const el=e.target.closest&&e.target.closest("#hz-setup button");if(!el||!draft)return;
 if(el.dataset.goal){const k=el.dataset.goal,i=draft.goals.indexOf(k);if(i>-1)draft.goals.splice(i,1);else draft.goals.push(k);el.setAttribute("aria-pressed",String(i<0))}
 else if(el.dataset.stage){draft.stage=draft.stage===el.dataset.stage?null:el.dataset.stage;document.querySelectorAll("#hz-stage .opt").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.stage===draft.stage)))}
 else if(el.id==="hz-save"){
  me.name=($("#hz-name").value||"").trim();me.country=$("#hz-country").value||"";me.goals=draft.goals.slice();
  me.inclusive=$("#hz-incl").checked;me.quickExit=$("#hz-exit").checked;me.done=true;saveMe();
  if(profile&&draft.stage!==profile.stage){profile.stage=draft.stage;viewStage=draft.stage;saveProfile()}
  toast("Saved");leaveSetup();
 }
 else if(el.id==="hz-skip"){me.skipped=true;saveMe();leaveSetup()}
});
function leaveSetup(){draft=null;if(location.hash!=="#/"){location.hash="#/"}else{window.viewHome();window.tabs()}}

/* ---------- Home, Me, entries, Track ---------- */
function forYou(){
 const goals=(me.goals||[]).map(k=>GOALS.find(g=>g.k===k)).filter(Boolean);
 let h=`<section id="hz-foryou" class="hz-box"><h2>For you</h2>`;
 if(goals.length){
  h+=`<div class="hz-links">${goals.map(g=>`<a class="opt hz-a" href="${g.href}">${esc(g.label)}</a>`).join("")}</div>`;
  const areas=[].concat.apply([],goals.map(g=>g.areas));const stage=profile&&profile.stage;
  let pool=ENTRIES.filter(e=>areas.some(a=>(e.areas||[]).indexOf(a)>-1));
  if(stage){const st=pool.filter(e=>e.stages.indexOf(stage)>-1);if(st.length)pool=st}
  pool=pool.slice(0,3);
  if(pool.length)h+=`<div class="list" style="margin-top:10px">${pool.map(rowHtml).join("")}</div>`;
 }else{
  h+=`<p style="margin:0 0 6px">Tell us a little about you and we will show what matters first.</p><a class="btn" href="#/setup">Make it yours</a>`;
 }
 return h+helpHtml()+`</section>`;
}
function decorateHome(app){
 const hero=app.querySelector(".hero");if(!hero||!profile)return;
 const h1=hero.querySelector("h1"),p=hero.querySelector("p");
 if(me.name&&h1&&!h1.dataset.hz){h1.textContent="Hi "+me.name+", welcome.";if(p)p.textContent=profile.stage?"Showing guides for "+stageName(profile.stage)+" first.":"Search for anything, or pick up where you left off.";h1.dataset.hz="1"}
 if(!app.querySelector("#hz-foryou"))hero.insertAdjacentHTML("afterend",forYou());
}
function decorateMe(app){
 const h1=app.querySelector("h1");if(!h1||!/Your profile/.test(h1.textContent)||app.querySelector("#hz-mine"))return;
 const c=cinfo();const goals=(me.goals||[]).map(k=>(GOALS.find(g=>g.k===k)||{}).t).filter(Boolean);
 const box=`<section id="hz-mine" class="hz-box"><h2>Your details</h2><p style="margin:0 0 8px">Name: <b>${esc(me.name||"not set")}</b><br>Country: <b>${esc(c?c.n:"not set")}</b><br>Interests: <b>${esc(goals.join(", ")||"not set")}</b></p><a class="btn" href="#/setup">Edit my details</a>${helpHtml()}</section>`;
 const after=app.querySelector(".privacy")||h1;after.insertAdjacentHTML("afterend",box);
}
function decorateEntry(app){
 const c=cinfo();if(!c||me.country==="GB"||app.querySelector("#hz-note"))return;
 const h1=app.querySelector("h1");if(!h1)return;
 h1.insertAdjacentHTML("afterend",`<p id="hz-note" class="hz-small" style="margin:6px 0 10px">Emergency numbers and wording are adjusted for ${esc(c.n)}. Some guidance and sources come from UK services such as the NHS.</p>`);
}
/* Track: personal insights from your own log */
const DAY=86400000,PAIN=["None","Mild","Moderate","Strong","Severe"];
const toN=s=>{const p=s.split("-");return Date.UTC(+p[0],+p[1]-1,+p[2])/DAY};
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
function insights(){
 let T=null;try{T=store.get("hz_track")}catch(e){}
 if(!T||!T.log)return null;const L=T.log,days=Object.keys(L).sort();if(!days.length)return null;
 const isP=d=>(L[d].flow||0)>=2;
 const starts=[];let prev=null;days.filter(isP).forEach(d=>{if(prev===null||toN(d)-toN(prev)>3)starts.push(d);prev=d});
 const lens=[];for(let i=1;i<starts.length;i++)lens.push(toN(starts[i])-toN(starts[i-1]));
 const good=lens.filter(l=>l>=15&&l<=90);
 const by={};let si=-1;
 days.forEach(d=>{while(si+1<starts.length&&toN(starts[si+1])<=toN(d))si++;if(si<0)return;const cd=toN(d)-toN(starts[si])+1;if(cd>45)return;const p=L[d].pain;if(p==null)return;(by[cd]=by[cd]||[]).push(p)});
 const items=[],flags=[];
 let best=null;Object.keys(by).forEach(k=>{if(by[k].length>=2){const a=mean(by[k]);if(!best||a>best.a)best={d:+k,a:a}}});
 if(best&&best.a>=1.5)items.push(`Your pain has been highest around cycle day <b>${best.d}</b> (about ${PAIN[Math.min(4,Math.round(best.a))].toLowerCase()} on average).`);
 const last=toN(days[days.length-1]),recent=days.filter(d=>last-toN(d)<90);
 const cnt={};recent.forEach(d=>(L[d].sx||[]).forEach(s=>cnt[s]=(cnt[s]||0)+1));
 const top=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]).slice(0,3).filter(k=>cnt[k]>=2);
 if(top.length)items.push(`Most logged symptoms in the last 3 months: <b>${top.map(esc).join(", ")}</b>.`);
 const mc={};recent.forEach(d=>(L[d].mood||[]).forEach(m=>mc[m]=(mc[m]||0)+1));
 const tm=Object.keys(mc).sort((a,b)=>mc[b]-mc[a])[0];if(tm&&mc[tm]>=3)items.push(`The mood you log most often is <b>${esc(tm.toLowerCase())}</b>.`);
 if(starts.length>=2){const early=[],rest=[];let s2=-1;days.forEach(d=>{while(s2+1<starts.length&&toN(starts[s2+1])<=toN(d))s2++;if(s2<0||L[d].energy==null)return;((toN(d)-toN(starts[s2])+1)<=5?early:rest).push(L[d].energy)});
  if(early.length>=3&&rest.length>=3){const a=mean(early),b=mean(rest);if(b-a>=0.7)items.push("Your energy tends to dip in the first few days of your period.");}}
 if(good.length>=2){const av=mean(good);if(av<21||av>38)flags.push(`Your logged cycles average about ${Math.round(av)} days. Cycles outside 21 to 38 days can have many causes, so it may be worth mentioning to a doctor, especially if this is new for you.`)}
 const plen=starts.map(s=>{let n=0,d=toN(s);while(L[new Date(d*DAY).toISOString().slice(0,10)]&&isP(new Date(d*DAY).toISOString().slice(0,10))){n++;d++}return n});
 if(plen.length>=2&&mean(plen)>8)flags.push("Your logged periods are lasting more than 8 days on average. That is worth raising with a doctor.");
 const strong=recent.filter(d=>(L[d].pain||0)>=3).length;
 if(strong>=3)flags.push(`You logged strong or severe pain on ${strong} days in the last 3 months. You do not have to put up with that. Your doctor can help look for causes and treatments.`);
 const stage=profile&&profile.stage,teen=stage==="teen"||(profile&&profile.age==="Under 18");
 let note="";if(teen)note="Cycles often take a few years to settle after a first period, so some irregularity is common.";else if(stage==="meno")note="Changing or irregular cycles are expected in perimenopause. Keep logging, as your history can help a doctor.";
 if(!items.length&&!flags.length&&!note)return null;
 return {items:items,flags:flags,note:note,few:starts.length<3};
}
function decorateTrack(app){
 const stats=app.querySelector(".trk-stats");if(!stats||app.querySelector("#hz-insights"))return;
 const card=stats.closest(".trk-card");if(!card)return;const r=insights();if(!r)return;
 card.insertAdjacentHTML("beforebegin",`<div class="trk-card" id="hz-insights"><h2 style="margin-top:0">Just for you${me.name?", "+esc(me.name):""}</h2>${r.items.map(i=>`<p class="hz-ins">${i}</p>`).join("")}${r.flags.map(f=>`<p class="hz-flag">${esc(f)}</p>`).join("")}${r.note?`<p class="hz-ins">${esc(r.note)}</p>`:""}<p class="hz-small">${r.few?"These are early patterns and will get more reliable as you log more. ":""}They are based only on what you have logged, and are not a diagnosis. If something worries you, talk to a doctor or nurse.</p></div>`);
}

/* ---------- Quick exit ---------- */
let lastEsc=0;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&me.quickExit){const t=Date.now();if(t-lastEsc<700)quickExit();lastEsc=t}});
function quickExit(){location.replace("https://www.google.com")}
function exitBtn(){
 const b=document.querySelector(".hz-exit");
 if(me.quickExit&&!b){const x=document.createElement("button");x.className="hz-exit";x.type="button";x.textContent="Quick exit";x.setAttribute("aria-label","Quick exit: leave this site now");x.onclick=quickExit;document.body.appendChild(x)}
 else if(!me.quickExit&&b)b.remove();
}

/* ---------- Wiring ---------- */
let redirected=false,busy=false;
function decorate(){
 const app=$("#app");if(!app)return;
 exitBtn();
 const h=location.hash||"";
 if(h==="#/setup"&&!app.querySelector("#hz-setup")&&!app.querySelector(".ob")){renderSetup();return}
 if(profile&&!me.done&&!me.skipped&&!redirected&&(h===""||h==="#/"||h==="#")&&!app.querySelector(".ob")&&app.querySelector(".hero")){redirected=true;location.hash="#/setup";return}
 if(profile){
  if(h===""||h==="#/"||h==="#")decorateHome(app);
  else if(h.indexOf("#/me")===0)decorateMe(app);
  else if(h.indexOf("#/entry")===0)decorateEntry(app);
  else if(h.indexOf("#/track")===0)decorateTrack(app);
 }
 walk(app);
}
function run(){if(busy)return;busy=true;try{decorate()}catch(e){}finally{busy=false;try{obs.takeRecords()}catch(e){}}}
const css=document.createElement("style");
css.textContent=`.hz-box{background:var(--surface);border:1px solid var(--line);border-radius:24px 24px 24px 8px;padding:16px;margin:14px 0}
.hz-box h2{font-size:19px;margin:0 0 8px}
.hz-links{display:flex;flex-wrap:wrap;gap:8px}
.hz-a{text-decoration:none;display:inline-block}
.hz-help{background:var(--alert);color:var(--alert-ink);border:1px solid var(--alert-line);border-radius:18px;padding:12px 14px;font-size:15px;line-height:1.55;margin:14px 0 2px}
.hz-help a{color:inherit;font-weight:800}
.hz-small{font-size:13.5px;line-height:1.5;color:var(--muted)}
.hz-help .hz-small{color:inherit;opacity:.9}
.hz-l{display:block;font-weight:800;margin:18px 0 8px}
.hz-toggle{display:flex;gap:10px;align-items:flex-start;margin:10px 0;line-height:1.45}
.hz-toggle input{margin-top:4px;width:20px;height:20px;accent-color:var(--accent);flex:none}
.hz-ins{border-left:4px solid var(--accent);padding:2px 0 2px 12px;margin:10px 0}
.hz-flag{background:var(--amber);color:var(--amber-ink);border:1px solid var(--amber-line);border-radius:14px;padding:10px 12px;margin:10px 0;font-size:15px}
.hz-exit{position:fixed;top:10px;right:10px;z-index:30;background:var(--accent);color:var(--accent-ink);border:0;border-radius:999px;padding:9px 15px;font-weight:800;font-size:13px;min-height:40px;box-shadow:0 4px 14px rgba(0,0,0,.18);cursor:pointer}
#hz-setup select.search{width:100%}`;
document.head.appendChild(css);
const obs=new MutationObserver(run);
obs.observe($("#app"),{childList:true,subtree:true});
window.addEventListener("hashchange",()=>{if((location.hash||"")==="#/setup")setTimeout(run,0)});
if(store.clearAll){const _c=store.clearAll;store.clearAll=function(){_c.call(store);try{localStorage.removeItem(KEY)}catch(e){}me={};redirected=true}}
run();
}
)();
