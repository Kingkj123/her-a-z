/* Her A–Z: friendlier "today-first" Home, tidier Learn (A to Z) page and a bolder, colourful look. Loaded last. Everything stays on this device. */
(function(){
"use strict";
const q=(s,r)=>(r||document).querySelector(s);
const qa=(s,r)=>Array.prototype.slice.call((r||document).querySelectorAll(s));
const e=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const D=()=>window.HZD||{};
const art=(k,c)=>(D().art?D().art(k,c||"hz-svg"):"");
const hash=()=>location.hash||"#/";
const isHome=()=>{const h=hash();return h==="#/"||h==="#"};
const me=()=>(window.HZme?window.HZme():{})||{};
const day=()=>Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/86400000);

/* ---------- Words (warm big-sister tone) ---------- */
function hello(){
 const h=new Date().getHours(),n=me().name;
 const g=h<12?"Good morning":h<18?"Good afternoon":"Good evening";
 return n?`${g}, ${n}.`:`${g}.`;
}
const SUBS=["How's your body feeling today? Let's take it one thing at a time.","No question is too small or too awkward here.","Whatever's going on, you're not the only one. Let's figure it out together.","Check in, look something up, or just breathe. Your call."];
const TIPS={
 period:["Cramps? A hot water bottle on your tummy or lower back can really take the edge off.","Feeling wiped out? Iron-rich foods like beans, lentils and leafy greens help top you back up."],
 foll:["Energy often picks up after your period. A great week to try something new or get moving.","Your skin and mood often feel brighter around now. Enjoy it."],
 fert:["Noticing clear, stretchy discharge? That's a normal sign you're around ovulation.","A one-sided twinge mid-cycle is common. If it's severe or doesn't settle, get it checked."],
 lut:["Bloated or snappy before your period? Totally common. Gentle movement, less salt and more sleep can help.","Craving sweet things? Your body's working hard. Regular meals help keep energy steady."]
};
const GENERAL=["Logging how you feel, not just your period, helps you spot your own patterns.","Headaches and tiredness can sometimes just be mild dehydration. Keep a water bottle handy.","Pain that stops you living your life isn't something to put up with. It's worth talking to a doctor.","Cervical screening checks for changes early. Do you know when yours is due?","Get to know how your breasts normally look and feel, so you notice anything new.","Pelvic floor exercises take a few minutes a day and help with leaks at any age.","Sleep, stress and hormones are all connected. A wind-down routine can make a real difference.","Strength training a couple of times a week helps protect your bones for later life."];

/* ---------- Home pieces ---------- */
function miniRing(c){
 const R=34,C=2*Math.PI*R,f=Math.min(1,c.cd/c.len);
 return `<svg viewBox="0 0 84 84" class="rd-ring" aria-hidden="true"><circle cx="42" cy="42" r="${R}" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="9"/><circle cx="42" cy="42" r="${R}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-dasharray="${(C*f).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 42 42)"/><text x="42" y="38" text-anchor="middle" class="rd-r1">DAY</text><text x="42" y="58" text-anchor="middle" class="rd-r2">${c.cd}</text></svg>`;
}
function todayCard(){
 const d=D(),c=d.cycle?d.cycle():null;
 const T=d.loadT?d.loadT():{log:{}},rec=T.log[d.dkey?d.dkey(new Date()):""]||{},mood=rec.mood||[];
 let top;
 if(c){
  const ph=c.late?"period":d.phaseOf(c,Math.min(c.cd,c.len)),P=d.PHASES[ph];
  const left=c.len-c.cd+1;
  const sub=c.late?"Your period's a little late. Cycles vary, so log it when it comes.":(left<=1?"Your period may start today.":`Next period in about ${left} days.`);
  top=`<a class="rd-cyc" href="#/track">${miniRing(c)}<div><span class="rd-kick">Your cycle</span><b>${e(c.late?"Period expected":P.n)}</b><span>${e(sub)}</span></div></a>`;
 }else{
  top=`<div class="rd-cyc"><div class="rd-ringph">${art("track")}</div><div><span class="rd-kick">Your cycle</span><b>Start tracking</b><span>Tell us when your period starts and we'll show where you are each day.</span><button class="rd-mini" type="button" data-hz="log-period">My period started today</button></div></div>`;
 }
 const moods=["Happy","Calm","Low","Anxious","Irritable"];
 const done=mood.length?thanks(mood):"";
 return `<section class="rd-today">${top}<div class="rd-check"><b>How are you feeling today?</b><div class="rd-moods">${moods.map(m=>`<button type="button" class="rd-mood" data-q="mood" data-v="${m}" aria-pressed="${mood.indexOf(m)>-1}">${d.face?d.face(m,"hz-face"):""}<span>${m}</span></button>`).join("")}</div><p class="rd-thanks" role="status">${done}</p></div></section>`;
}
function thanks(m){
 if(m.some(x=>x==="Anxious"))return `Thanks for telling me. A slow breath can help. <a href="#/breathe">Try 1 minute</a>`;
 if(m.some(x=>x==="Low"||x==="Irritable"))return "Thanks for checking in. Be gentle with yourself today.";
 return "Love that. Logged for today.";
}
function tiles(){
 return `<div class="rd-tiles">
  <button type="button" class="rd-tile t1" data-rd="body"><span class="rd-ill">${art("everyday")}</span><b>Something feels off?</b><span>Tap where it bothers you</span></button>
  <button type="button" class="rd-tile t2" data-rd="log"><span class="rd-ill">${art("track")}</span><b>Log today</b><span>Period, pain and mood in seconds</span></button>
  <a class="rd-tile t3" href="#/browse"><span class="rd-ill">${art("mind")}</span><b>Learn about your body</b><span>Plain-English guides</span></a>
  <a class="rd-tile t4" href="#/breathe"><span class="rd-ill">${art("breathe")}</span><b>Take a breather</b><span>Calm cramps, stress or flushes</span></a>
 </div>`;
}
function tip(){
 const d=D(),c=d.cycle?d.cycle():null;let list=GENERAL;
 if(c&&!c.late){const ph=d.phaseOf(c,Math.min(c.cd,c.len));list=TIPS[ph].concat(GENERAL.slice(0,2))}
 const t=list[day()%list.length];
 return `<section class="rd-tip"><span class="rd-tipbadge">Tip for today</span><p>${e(t)}</p></section>`;
}
const PICKCOL=["#FFE1EA","#FFE7D9","#EFE6FF","#E1F3E8"];
function picks(){
 if(typeof ENTRIES==="undefined")return "";
 const M=me(),stage=typeof profile!=="undefined"&&profile?profile.stage:null;
 const map={cycle:["repro","horm"],conceive:["repro","preg"],pregnancy:["preg"],menopause:["horm","bone"],sexual:["sexual","breast"],mind:["mind","energy"],symptoms:["repro","gut"],learn:[]};
 let areas=[];(M.goals||[]).forEach(g=>areas=areas.concat(map[g]||[]));
 let pool=ENTRIES.slice();
 if(areas.length)pool=pool.filter(x=>(x.areas||[]).some(a=>areas.indexOf(a)>-1));
 if(stage){const s=pool.filter(x=>x.stages.indexOf(stage)>-1);if(s.length)pool=s}
 const heavy=["cancer"].concat((M.goals||[]).indexOf("sexual")>-1?[]:["sexual"]);
 const soft=pool.filter(x=>!(x.areas||[]).some(a=>heavy.indexOf(a)>-1));if(soft.length>=4)pool=soft;
 const easy=/period|pms|bloat|acne|sleep|stress|mood|migraine|flush|thrush|fatigue|tired|iron|cramp|breast-pain|ovulation|discharge/;
 pool.sort((a,b)=>(easy.test(b.id)?1:0)-(easy.test(a.id)?1:0));
 const top=pool.filter(x=>easy.test(x.id));if(top.length>=4)pool=top;
 const off=day()%Math.max(1,pool.length-3);pool=pool.slice(off,off+4);
 if(!pool.length)return "";
 return `<section class="rd-picks"><div class="rd-head"><h2>Picked for you</h2><a href="#/browse">See all</a></div><div class="rd-scroll">${pool.map((x,i)=>{const k=(x.areas||[]).find(a=>D().ART&&D().ART[a])||"repro";return `<a class="rd-pick" href="#/entry/${x.id}" style="--pc:${PICKCOL[i%4]}"><span class="rd-pill">${art(k)}</span><b>${e(x.name)}</b><span>${e(x.short)}</span></a>`}).join("")}</div></section>`;
}
function setupCard(){
 const M=me();if(M.done)return "";
 return `<a class="rd-setup" href="#/setup"><span class="rd-ill">${art("st_repro")}</span><div><b>Make it yours</b><span>Add your name, country and what you care about. Takes a minute.</span></div><span class="rd-arrow" aria-hidden="true">→</span></a>`;
}
function renderHome(){
 const app=q("#app");if(!app)return;
 const longDate=new Date().toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"});
 app.innerHTML=`<div class="wrap rd" id="rd-home">
  <div class="rd-top"><div class="brand"><i></i>Her A–Z</div><button class="rd-helpbtn" type="button" data-rd="help">Get help</button></div>
  <section class="rd-hello"><span class="rd-blob b1"></span><span class="rd-blob b2"></span><span class="rd-blob b3"></span>
   <p class="rd-date">${e(longDate)}</p>
   <h1>${e(hello())}</h1>
   <p class="rd-sub">${e(SUBS[day()%SUBS.length])}</p>
   <label class="rd-search"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="rd-q" type="search" placeholder="Symptom or condition" aria-label="Search a symptom or condition" autocomplete="off"></label>
  </section>
  <div id="rd-results" hidden></div>
  <div id="rd-sections">${setupCard()}${todayCard()}${tiles()}${tip()}${picks()}
   <p class="rd-foot">Plain information, not a diagnosis. If you're worried, talk to a doctor or nurse.</p></div>
 </div>`;
 const inp=q("#rd-q");
 inp.addEventListener("input",()=>{
  const v=inp.value.trim(),res=q("#rd-results"),sec=q("#rd-sections");
  if(!v){res.hidden=true;sec.hidden=false;return}
  const hits=ENTRIES.filter(x=>matches(x,v)).slice(0,20);
  res.innerHTML=hits.length?`<p class="rd-kick" style="margin:6px 4px">${hits.length} result${hits.length>1?"s":""}</p><div class="list">${hits.map(rowHtml).join("")}</div>`:`<div class="empty">Nothing found for "${e(v)}". Try different words, or <a href="#/ask">describe it in Ask</a>.</div>`;
  res.hidden=false;sec.hidden=true;
 });
}
function refreshToday(){const t=q(".rd-today");if(t){t.outerHTML=todayCard()}}

/* ---------- Learn (A to Z) page ---------- */
const STAGE_COL={teen:"#FFE1EA",repro:"#FFE7D9",preg:"#E1F3E8",meno:"#EFE6FF",later:"#FFF1D6"};
let stageFilter=null;
function decorateBrowse(app){
 const w=q(".wrap",app);if(!w||w.dataset.rdx)return;w.dataset.rdx="1";
 const h1=q("h1",w),p=q("p.muted",w),bq=q("#bq",w);
 if(h1)h1.textContent="Learn about your body";
 if(p)p.textContent="Plain-English guides for every stage of life. Pick where you are, choose a topic, or search.";
 const chips=qa(":scope > .chips",w);
 if(chips[1]){chips[1].hidden=true;const h2=chips[1].previousElementSibling;if(h2&&h2.tagName==="H2")h2.hidden=true}
 if(bq){bq.placeholder="Search guides";(p||h1).after(bq)}
 const stages=typeof STAGES!=="undefined"?STAGES:[];
 const sec=document.createElement("section");sec.className="rd-stagesec";
 sec.innerHTML=`<h2>Where are you in life?</h2><div class="rd-stages">${stages.map(s=>`<button type="button" class="rd-stage" data-rdstage="${s.k}" aria-pressed="${stageFilter===s.k}" style="--sc:${STAGE_COL[s.k]||"#FFE1EA"}"><span class="rd-sill">${art((D().STAGE_ART||{})[s.k]||"teen")}</span><b>${e(s.n)}</b></button>`).join("")}</div><p class="rd-kick" id="rd-stagenote" aria-live="polite"></p><h2>Or pick a topic</h2>`;
 (bq||p||h1).after(sec);
 if(chips[0]){chips[0].classList.add("rd-topics");sec.after(chips[0])}
 applyStage();
}
function applyStage(){
 const list=q("#azlist");if(!list)return;
 let n=0;
 qa(".row",list).forEach(r=>{const id=(r.getAttribute("href")||"").split("/")[2];const en=ENTRIES.find(x=>x.id===id);const ok=!stageFilter||(en&&en.stages.indexOf(stageFilter)>-1);r.hidden=!ok;if(ok)n++});
 qa(":scope > .list",list).forEach(g=>{const any=qa(".row",g).some(r=>!r.hidden);g.hidden=!any;const h=g.previousElementSibling;if(h&&h.classList.contains("az-letter")){let nx=h.nextElementSibling,vis=false;while(nx&&nx.classList.contains("list")){if(!nx.hidden){vis=true;break}nx=nx.nextElementSibling}h.hidden=!vis}});
 const note=q("#rd-stagenote");
 if(note)note.innerHTML=stageFilter?`Showing ${n} guides for ${e((STAGES.find(s=>s.k===stageFilter)||{}).n||"")}. <button type="button" class="rd-link" data-rdstage="${stageFilter}">Show all</button>`:"";
 const jump=q(".jump");if(jump)jump.hidden=!!stageFilter;
}

/* ---------- Wiring ---------- */
document.addEventListener("click",ev=>{
 const t=ev.target;if(!t.closest)return;
 const rd=t.closest("button[data-rd]");
 if(rd){
  const k=rd.dataset.rd,d=D();if(d.buzz)d.buzz(8);
  if(k==="body"&&d.sheet)d.sheet(`<h2 style="margin:0 0 4px">Where's it bothering you?</h2>${d.bodyHtml().replace('<h2>Where\'s it bothering you?</h2>','')}<a class="btn block ghost" href="#/ask" data-hz="close" style="margin-top:6px;text-decoration:none">Or describe it in your own words</a>`,"Body map");
  else if(k==="log"&&d.sheet)d.sheet(d.quickHtml(),"Quick log");
  else if(k==="help"&&d.sheet)d.sheet(`<h2 style="margin:0 0 6px">Get help</h2><p class="hz-small" style="margin:0 0 4px">You don't have to deal with this alone.</p>${window.HZhelp?window.HZhelp():""}<a class="btn block ghost" href="#/breathe" data-hz="close" style="margin-top:12px;text-decoration:none">Take a breather first</a>`,"Get help");
  return;
 }
 const st=t.closest("[data-rdstage]");
 if(st){stageFilter=stageFilter===st.dataset.rdstage?null:st.dataset.rdstage;qa(".rd-stage").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.rdstage===stageFilter)));applyStage();return}
 if(t.closest("[data-q],[data-hz=\"log-period\"]")&&isHome())setTimeout(()=>{if(q("#rd-home"))refreshToday()},60);
});
function decorate(){
 const app=q("#app");if(!app)return;
 const h=hash();
 document.body.classList.toggle("rd-on-home",isHome());
 document.body.classList.toggle("rd-on-browse",h.indexOf("#/browse")===0);
 document.body.classList.toggle("rd-on-area",h.indexOf("#/area/")===0);
 if(isHome()&&typeof profile!=="undefined"&&profile&&!q(".ob",app)&&!q("#rd-home",app)&&!q("#hz-setup",app)){renderHome();return}
 if(h.indexOf("#/browse")===0&&q("#azlist",app))decorateBrowse(app);
}
let busy=false;
function run(){if(busy)return;busy=true;try{decorate()}catch(x){if(window.__hzDebug)console.error(x)}finally{busy=false;try{obs.takeRecords()}catch(x){}}}

/* ---------- Bold, colourful look ---------- */
const css=document.createElement("style");
css.textContent=`:root,:root:not([data-theme="light"]),:root[data-theme="dark"]{--display:"Bricolage Grotesque","Avenir Next","Segoe UI",system-ui,sans-serif;--peach:#FFE7D9;--lilac:#EFE6FF;--mint:#E1F3E8;--rose:#FFE1EA}
body{background:radial-gradient(520px 380px at 105% -4%,#FFD3E0 0,transparent 62%),radial-gradient(460px 360px at -12% 26%,#E3F4EA 0,transparent 62%),radial-gradient(520px 420px at 108% 78%,#EEE4FF 0,transparent 62%),radial-gradient(420px 320px at -8% 102%,#FFE6D6 0,transparent 62%),var(--bg) no-repeat fixed}
h1,h2,h3{font-family:var(--display);letter-spacing:-.02em;font-weight:700}
.brand{font-family:var(--display)}
.rd-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}
body:has(.hz-exit) .rd-top{padding-right:112px}
.rd-helpbtn{border:1.5px solid var(--alert-line);background:var(--alert);color:var(--alert-ink);border-radius:999px;padding:8px 14px;font:800 13.5px var(--body);min-height:40px;cursor:pointer}
.rd-hello{position:relative;overflow:hidden;border-radius:36px 36px 36px 12px;padding:22px 20px 20px;background:linear-gradient(140deg,#E2477A 0,#CC3468 50%,#B0285A 100%);color:#fff;box-shadow:0 18px 40px rgba(208,53,106,.25)}
.rd-hello h1{color:#fff;font-size:clamp(28px,7vw,40px);line-height:1.05;margin:2px 0 8px;position:relative}
.rd-date{margin:0;font:800 12.5px var(--body);letter-spacing:.08em;text-transform:uppercase;opacity:.9;position:relative}
.rd-sub{margin:0 0 16px;font-size:16.5px;line-height:1.45;opacity:.95;max-width:30ch;position:relative}
.rd-blob{position:absolute;border-radius:50%;pointer-events:none}
.rd-blob.b1{width:190px;height:190px;right:-60px;top:-70px;background:#FFC2D3;opacity:.55}
.rd-blob.b2{width:120px;height:120px;right:40px;bottom:-60px;background:#FFD9C4;opacity:.5}
.rd-blob.b3{width:70px;height:70px;left:-24px;bottom:30px;background:#E9DCFF;opacity:.45}
a.btn{text-decoration:none}
.rd-search{position:relative;display:flex;align-items:center;gap:8px;background:#fff;color:var(--muted);border-radius:999px;padding:4px 6px 4px 16px;box-shadow:0 8px 20px rgba(120,20,60,.18)}
.rd-search input{flex:1;border:0;outline:0;background:none;font:600 16px var(--body);color:var(--ink);padding:12px 6px;min-width:0}
.rd-search:focus-within{outline:3px solid #fff;outline-offset:2px}
#rd-results{margin-top:14px}
.rd-setup{display:flex;align-items:center;gap:12px;margin:14px 0 0;padding:14px 16px;border-radius:24px;background:var(--lilac);color:var(--ink);text-decoration:none;border:1.5px dashed #CDB8EC}
.rd-setup b{display:block;font-family:var(--display);font-size:18px}
.rd-setup span{font-size:14.5px;color:var(--muted)}
.rd-setup .rd-ill{width:44px;height:44px;flex:none}
.rd-arrow{margin-left:auto;font-size:22px;color:var(--accent)!important}
.rd-today{margin:14px 0 0;border-radius:30px 30px 30px 10px;background:var(--surface);box-shadow:0 10px 30px rgba(208,53,106,.10);overflow:hidden;border:1px solid var(--line)}
.rd-cyc{display:flex;align-items:center;gap:14px;padding:16px;background:linear-gradient(120deg,#368C6B,#2A6E53);color:#fff;text-decoration:none}
.rd-cyc b{display:block;font-family:var(--display);font-size:22px;line-height:1.1}
.rd-cyc span{display:block;font-size:14.5px;opacity:.95}
.rd-cyc .rd-kick{color:#fff;opacity:.85}
.rd-ring{width:76px;height:76px;flex:none}
.rd-r1{font:800 10px var(--body);fill:#fff;letter-spacing:.08em}
.rd-r2{font:700 24px var(--display);fill:#fff}
.rd-ringph{width:64px;height:64px;flex:none;background:#fff;border-radius:50%;padding:10px}
.rd-mini{margin-top:8px;border:0;border-radius:999px;background:#fff;color:#2F7A5C;font:800 13.5px var(--body);padding:9px 14px;min-height:40px;cursor:pointer}
.rd-kick{font:800 12px var(--body);letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}
.rd-check{padding:14px 16px 16px}
.rd-check>b{font-family:var(--display);font-size:18px}
.rd-moods{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:10px}
.rd-mood{display:flex;flex-direction:column;align-items:center;gap:4px;border:1.5px solid transparent;background:var(--bg);border-radius:18px;padding:8px 2px;font:700 12px var(--body);color:var(--muted);cursor:pointer;min-height:44px}
.rd-mood .hz-face{width:40px;height:40px;color:var(--ink)}
.rd-mood[aria-pressed="true"]{background:var(--accent-soft);border-color:var(--accent);color:var(--accent)}
.rd-thanks{margin:10px 2px 0;font-size:14.5px;color:var(--muted);min-height:1em}
.rd-thanks:empty{display:none}
.rd-tiles{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:14px 0 0}
.rd-tile{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;border:0;border-radius:28px 28px 28px 10px;padding:16px 14px 16px;min-height:150px;text-decoration:none;color:var(--ink);font:inherit;cursor:pointer;overflow:hidden;box-shadow:0 8px 20px rgba(43,34,48,.06)}
.rd-tile b{font-family:var(--display);font-size:19px;line-height:1.15;margin-top:auto}
.rd-tile>span:not(.rd-ill){font-size:14px;color:var(--muted);line-height:1.35}
.rd-tile .rd-ill{width:50px;height:50px;background:rgba(255,255,255,.75);border-radius:18px;padding:8px}
.rd-tile.t1{background:linear-gradient(150deg,#FFB3C8,#FF7FA3)}
.rd-tile.t1 b,.rd-tile.t1>span:not(.rd-ill){color:#4A0F24}
.rd-tile.t2{background:var(--peach)}
.rd-tile.t3{background:var(--lilac)}
.rd-tile.t4{background:var(--mint)}
.rd-tile::after{content:"";position:absolute;right:-30px;bottom:-30px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.35)}
.rd-tip{margin:14px 0 0;padding:16px;border-radius:24px;background:#FFF6D9;border:1px solid #F3DE9C}
.rd-tip p{margin:8px 0 0;font-size:16px;line-height:1.5}
.rd-tipbadge{display:inline-block;background:#F6C744;color:#4A3500;font:800 12px var(--body);letter-spacing:.06em;text-transform:uppercase;border-radius:999px;padding:4px 10px}
.rd-picks{margin:20px 0 0}
.rd-head{display:flex;align-items:baseline;justify-content:space-between}
.rd-head h2{font-size:21px;margin:0}
.rd-head a{font-weight:800;color:var(--accent);text-decoration:none}
.rd-scroll{display:flex;gap:12px;overflow-x:auto;padding:10px 2px 6px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
.rd-pick{flex:0 0 72%;max-width:240px;scroll-snap-align:start;background:var(--pc);border-radius:24px 24px 24px 8px;padding:14px;text-decoration:none;color:var(--ink);display:flex;flex-direction:column;gap:4px}
.rd-pick b{font-family:var(--display);font-size:17px;line-height:1.2}
.rd-pick span:last-child{font-size:13.5px;color:var(--muted);line-height:1.4;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.rd-pill{width:42px;height:42px;background:rgba(255,255,255,.8);border-radius:14px;padding:7px;margin-bottom:6px}
.rd-foot{margin:22px 4px 0;font-size:13.5px;color:var(--muted);text-align:center}
.rd-on-home .hz-fab{display:none}
/* Learn page */
.rd-stagesec h2{font-size:20px;margin:18px 0 10px}
.rd-stages{display:flex;gap:10px;overflow-x:auto;padding:2px 2px 6px;scroll-snap-type:x mandatory}
.rd-stage{flex:0 0 auto;scroll-snap-align:start;display:flex;flex-direction:column;align-items:center;gap:6px;width:108px;border:2px solid transparent;background:var(--sc);border-radius:24px 24px 24px 8px;padding:12px 8px;font:inherit;color:var(--ink);cursor:pointer}
.rd-stage b{font:700 14px var(--display);text-align:center;line-height:1.2}
.rd-stage .rd-sill{width:46px;height:46px;background:rgba(255,255,255,.8);border-radius:50%;padding:7px}
.rd-stage[aria-pressed="true"]{border-color:var(--accent);box-shadow:0 6px 16px rgba(208,53,106,.2)}
.rd-link{border:0;background:none;color:var(--accent);font:800 13px var(--body);cursor:pointer;text-decoration:underline;padding:0 4px}
#rd-stagenote{margin:8px 2px 0;text-transform:none;letter-spacing:0;font-size:14px}
#rd-stagenote:empty{display:none}
.rd-topics{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px!important;margin-bottom:18px}
.rd-topics .chip{display:flex;align-items:center;gap:8px;border-radius:20px 20px 20px 8px;padding:12px;min-height:58px;font-weight:700;line-height:1.25;background:var(--surface);border:1.5px solid var(--line);text-decoration:none}
.rd-topics .chip .hz-ic{width:30px;height:30px;flex:none;background:var(--rose);border-radius:10px;padding:4px;margin:0}
.rd-topics .chip:nth-child(4n+2) .hz-ic{background:var(--peach)}
.rd-topics .chip:nth-child(4n+3) .hz-ic{background:var(--lilac)}
.rd-topics .chip:nth-child(4n) .hz-ic{background:var(--mint)}
.rd-topics .chip[href="#/browse"]{display:none}
.rd-on-browse #bq{margin:14px 0 4px}
@media (max-width:380px){.rd-tile{min-height:136px;padding:14px 12px}.rd-tile b{font-size:17px}.rd-moods .hz-face{width:34px;height:34px}}
@media (prefers-reduced-motion:no-preference){.rd-tile,.rd-pick,.rd-stage,.rd-mood,.rd-setup{transition:transform .14s ease,box-shadow .2s ease}.rd-tile:active,.rd-pick:active,.rd-stage:active,.rd-mood:active,.rd-setup:active{transform:scale(.97)}.rd-tile:hover,.rd-pick:hover{transform:translateY(-3px)}.rd-blob.b1{animation:rdFloat 9s ease-in-out infinite}.rd-blob.b2{animation:rdFloat 11s ease-in-out infinite reverse}@keyframes rdFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(-12px,10px)}}}`;
document.head.appendChild(css);
if(typeof window.tabs==="function"&&!window.tabs.__rd){const _t=window.tabs;window.tabs=function(){_t.apply(this,arguments);qa("#tabs .tab span").forEach(sp=>{if(sp.textContent==="A to Z")sp.textContent="Learn"})};window.tabs.__rd=true;try{if(q("#tabs .tab"))window.tabs()}catch(x){}}
const obs=new MutationObserver(run);
obs.observe(q("#app"),{childList:true,subtree:true});
window.addEventListener("hashchange",()=>{stageFilter=null;setTimeout(run,0)});
run();
})();
