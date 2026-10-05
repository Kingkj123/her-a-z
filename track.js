/* Her A–Z: Track tab (cycle and symptom diary), topic browsing, and tab bar. Everything stays on this device. */
(function(){
"use strict";
const KEY="hz_track";
const FLOW=["None","Spotting","Light","Medium","Heavy"];
const PAIN=["None","Mild","Moderate","Strong","Severe"];
const ENERGY=["Drained","Low","OK","Good","Great"];
const SLEEP=["Under 5 hrs","5 to 6 hrs","7 to 8 hrs","9+ hrs"];
const MOOD=["Calm","Happy","Motivated","Anxious","Low","Irritable","Tearful","Overwhelmed"];
const HAB=["Exercised","Took pill or medicine","Alcohol"];
const SX=[
 ["Body",["Cramps","Back pain","Headache","Migraine","Breast tenderness","Bloating","Nausea","Dizziness","Joint aches","Hot flush","Night sweats"]],
 ["Gut and bladder",["Constipation","Diarrhoea","Bladder urgency","Burning when peeing"]],
 ["Skin and hair",["Acne","Hair shedding","Itching"]],
 ["Intimate",["Spotting","Unusual discharge","Vaginal dryness","Painful sex","Low libido"]],
 ["Mind and energy",["Brain fog","Poor sleep","Fatigue","Anxiety"]]
];
const GUIDE={ "Cramps":"period-pain","Bloating":"bloating","Headache":"migraine-hormones","Migraine":"migraine-hormones","Breast tenderness":"breast-pain","Acne":"hormonal-acne","Hot flush":"hot-flushes-night-sweats","Night sweats":"hot-flushes-night-sweats","Low libido":"low-sex-drive","Painful sex":"painful-sex","Bladder urgency":"overactive-bladder","Burning when peeing":"recurrent-uti","Constipation":"constipation","Diarrhoea":"ibs","Hair shedding":"hair-loss","Joint aches":"joint-aches-hormones","Brain fog":"brain-fog","Fatigue":"fatigue-tiredness","Poor sleep":"insomnia-sleep","Anxiety":"anxiety-hormones","Vaginal dryness":"vaginal-dryness-gsm","Itching":"vulval-itching","Spotting":"bleeding-between-periods","Unusual discharge":"bleeding-between-periods"};

const pad=n=>String(n).padStart(2,"0");
const ymd=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const parse=s=>{const a=s.split("-").map(Number);return new Date(a[0],a[1]-1,a[2])};
const addDays=(s,n)=>{const d=parse(s);d.setDate(d.getDate()+n);return ymd(d)};
const diff=(a,b)=>Math.round((parse(b)-parse(a))/864e5);
const today=()=>ymd(new Date());
const fmt=(s,o)=>parse(s).toLocaleDateString("en-GB",o||{weekday:"short",day:"numeric",month:"short"});
const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;

let st={tab:"log",day:today(),month:today().slice(0,7)};

function load(){let v=null;try{v=store.get(KEY)}catch(e){}return v&&v.log?v:{log:{}}}
function save(d){store.set(KEY,d)}
function empty(r){return !r||((r.flow==null)&&(r.pain==null)&&(r.energy==null)&&(r.sleep==null)&&!(r.mood&&r.mood.length)&&!(r.sx&&r.sx.length)&&!(r.hab&&r.hab.length)&&!(r.note&&r.note.trim()))}
function setField(day,k,v,multi){
  const T=load();const r=T.log[day]||{};
  if(multi){const a=r[k]||[];const i=a.indexOf(v);if(i>=0)a.splice(i,1);else a.push(v);r[k]=a}
  else{r[k]=(r[k]===v)?null:v}
  if(empty(r))delete T.log[day];else T.log[day]=r;
  save(T);
}

/* ---------- analysis ---------- */
function analyse(T){
  const days=Object.keys(T.log).sort();
  const pd=days.filter(d=>(T.log[d].flow||0)>=2);
  const starts=[];let prev=null;
  pd.forEach(d=>{if(prev===null||diff(prev,d)>3)starts.push(d);prev=d});
  const lens=[];for(let i=1;i<starts.length;i++)lens.push(diff(starts[i-1],starts[i]));
  const good=lens.filter(l=>l>=15&&l<=90);
  const plen=starts.map((s,i)=>{const end=starts[i+1]||addDays(s,10);return pd.filter(d=>diff(s,d)>=0&&diff(d,end)>0&&diff(s,d)<10).length});
  const heavyDays=days.filter(d=>T.log[d].flow===4).length;
  return {days,pd,starts,lens,good,avgCycle:avg(good),avgPeriod:avg(plen.filter(x=>x>0)),plen,heavyDays};
}
function counts(T,since,key){
  const c={};Object.keys(T.log).forEach(d=>{if(d>=since){(T.log[d][key]||[]).forEach(x=>{c[x]=(c[x]||0)+1})}});
  return Object.entries(c).sort((a,b)=>b[1]-a[1]);
}
function phaseTable(T,A){
  if(!A.starts.length)return null;
  const B=[["Days 1 to 5",1,5],["Days 6 to 13",6,13],["Days 14 to 21",14,21],["Day 22 onwards",22,60]];
  const rows=B.map(b=>({name:b[0],pain:[],energy:[],sx:{},mood:{},n:0}));
  A.days.forEach(d=>{
    let s=null;A.starts.forEach(x=>{if(x<=d)s=x});if(!s)return;
    const cd=diff(s,d)+1;const i=B.findIndex(b=>cd>=b[1]&&cd<=b[2]);if(i<0)return;
    const r=T.log[d],R=rows[i];R.n++;
    if(r.pain!=null)R.pain.push(r.pain);if(r.energy!=null)R.energy.push(r.energy+1);
    (r.sx||[]).forEach(x=>R.sx[x]=(R.sx[x]||0)+1);
  });
  return rows;
}

/* ---------- views ---------- */
const seg=(k,label)=>`<button class="trk-seg" data-trk="tab" data-v="${k}" ${st.tab===k?'aria-pressed="true"':'aria-pressed="false"'}>${label}</button>`;
const chip=(k,v,on,label)=>`<button class="trk-chip" data-trk="${k}" data-v="${esc(v)}" aria-pressed="${on?'true':'false'}">${esc(label||v)}</button>`;

function head(){
  return `<div class="brand"><i></i>Her A–Z</div>
  <h1 style="font-size:30px;margin-bottom:6px">Track</h1>
  <p class="privacy">Your diary stays on this device only. Nothing is sent to a server, and clearing your browser data will erase it. Estimates here are not a form of contraception or a diagnosis.</p>
  <div class="trk-segs" role="group" aria-label="Track sections">${seg("log","Log")}${seg("cal","Calendar")}${seg("pat","Patterns")}</div>`;
}

function viewLog(T,A){
  const day=st.day,r=T.log[day]||{},t=today();
  const isToday=day===t;
  const label=isToday?"Today":(day===addDays(t,-1)?"Yesterday":fmt(day));
  const single=(k,arr)=>arr.map((x,i)=>chip(k,String(i),r[k]===i,x)).join("");
  const multi=(k,arr)=>arr.map(x=>chip(k,x,(r[k]||[]).includes(x))).join("");
  let tips="";
  if(r.flow===4)tips+=`<p class="trk-tip">Soaking through a pad or tampon every hour for two hours or more, or passing large clots, is worth getting medical advice for. <a href="#/entry/heavy-periods">Read about heavy periods</a></p>`;
  if(r.pain>=4)tips+=`<p class="trk-tip">Severe pain that doesn't ease with your usual pain relief deserves a check. <a href="#/entry/period-pain">Period pain</a> · <a href="#/entry/endometriosis">Endometriosis</a></p>`;
  if(r.mood&&(r.mood.includes("Low")||r.mood.includes("Overwhelmed"))&&(r.mood.length>=1)){tips+=`<p class="trk-tip">If low mood is lasting more than a couple of weeks, you can talk to your GP or self-refer to NHS Talking Therapies. <a href="#/entry/depression-low-mood">Low mood guide</a></p>`}
  const next=day<t?"":'disabled';
  return `<div class="trk-card">
   <div class="trk-day"><button class="trk-nav" data-trk="day" data-v="-1" aria-label="Previous day">‹</button>
    <div><b>${label}</b><span>${fmt(day,{weekday:"long",day:"numeric",month:"long"})}</span></div>
    <button class="trk-nav" data-trk="day" data-v="1" aria-label="Next day" ${next}>›</button></div>
   <h2>Period flow</h2><div class="trk-chips">${single("flow",FLOW)}</div>
   <h2>Pain</h2><div class="trk-chips">${single("pain",PAIN)}</div>
   <h2>Energy</h2><div class="trk-chips">${single("energy",ENERGY)}</div>
   <h2>Sleep last night</h2><div class="trk-chips">${single("sleep",SLEEP)}</div>
   <h2>Mood</h2><div class="trk-chips">${multi("mood",MOOD)}</div>
   ${SX.map(g=>`<h2>${g[0]}</h2><div class="trk-chips">${multi("sx",g[1])}</div>`).join("")}
   <h2>Habits</h2><div class="trk-chips">${multi("hab",HAB)}</div>
   ${tips}
   <h2>Notes</h2>
   <textarea id="trk-note" class="trk-note" maxlength="400" rows="3" placeholder="Anything else worth remembering for this day">${esc(r.note||"")}</textarea>
   <p class="muted trk-auto">Changes save automatically on this device.</p>
  </div>`;
}

function viewCal(T,A){
  const [y,m]=st.month.split("-").map(Number);
  const first=new Date(y,m-1,1);const dim=new Date(y,m,0).getDate();
  const off=(first.getDay()+6)%7;
  const t=today();
  const pred=new Set();
  if(A.avgCycle&&A.starts.length>=2){
    const last=A.starts[A.starts.length-1],len=Math.round(A.avgCycle),pl=Math.max(2,Math.round(A.avgPeriod||5));
    for(let n=1;n<=3;n++){const s=addDays(last,len*n);for(let i=0;i<pl;i++){const d=addDays(s,i);if(d>t)pred.add(d)}}
  }
  let cells="";
  for(let i=0;i<off;i++)cells+=`<span class="trk-cell blank"></span>`;
  for(let d=1;d<=dim;d++){
    const key=y+"-"+pad(m)+"-"+pad(d);const r=T.log[key];const f=r&&r.flow!=null?r.flow:null;
    const cls=["trk-cell"];
    if(f>=2)cls.push("f"+f);else if(f===1)cls.push("f1");
    if(pred.has(key)&&!(f>=2))cls.push("pred");
    if(key===t)cls.push("today");
    const mark=r&&((r.sx&&r.sx.length)||(r.mood&&r.mood.length)||r.note||r.pain>=1)?'<i class="dot"></i>':"";
    cells+=`<button class="${cls.join(" ")}" data-trk="pick" data-v="${key}" aria-label="${fmt(key,{weekday:"long",day:"numeric",month:"long"})}">${d}${mark}</button>`;
  }
  const title=first.toLocaleDateString("en-GB",{month:"long",year:"numeric"});
  return `<div class="trk-card">
   <div class="trk-day"><button class="trk-nav" data-trk="month" data-v="-1" aria-label="Previous month">‹</button><div><b>${title}</b></div><button class="trk-nav" data-trk="month" data-v="1" aria-label="Next month">›</button></div>
   <div class="trk-grid"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>${cells}</div>
   <div class="trk-legend"><span><i class="k f2"></i>Light</span><span><i class="k f3"></i>Medium</span><span><i class="k f4"></i>Heavy</span><span><i class="k f1"></i>Spotting</span><span><i class="k pred"></i>Estimated</span><span><i class="k dotk"></i>Notes or symptoms</span></div>
   <p class="muted trk-auto">Tap a day to log or edit it.${pred.size?"":" Estimates appear after you've logged a few periods."}</p>
  </div>`;
}

function viewPat(T,A){
  const t=today(),since=addDays(t,-90);
  const logged=A.days.filter(d=>d>=since).length;
  let h="";
  if(!A.days.length){
    return `<div class="trk-card"><div class="empty">Nothing logged yet. Add a few days in the Log tab and your patterns will appear here.</div></div>`;
  }
  const n=A.good.length;
  const range=n?`${Math.min.apply(null,A.good)} to ${Math.max.apply(null,A.good)} days`:"Not enough yet";
  let est="Log at least three periods";
  if(A.avgCycle&&A.starts.length>=2){const nx=addDays(A.starts[A.starts.length-1],Math.round(A.avgCycle));est=fmt(nx,{weekday:"short",day:"numeric",month:"short"})+(nx<t?" (overdue or not logged)":"")}
  h+=`<div class="trk-card"><h2 style="margin-top:0">Your cycle</h2>
   <div class="trk-stats">
    <div><b>${A.avgCycle?Math.round(A.avgCycle):"–"}</b><span>average cycle (days)</span></div>
    <div><b>${A.avgPeriod?A.avgPeriod.toFixed(1).replace(".0",""):"–"}</b><span>average period (days)</span></div>
    <div><b>${A.starts.length}</b><span>periods logged</span></div>
   </div>
   <p class="muted" style="margin:10px 0 0">Cycle range: ${range}. Next period estimate: <b>${est}</b>.</p>`;
  const odd=A.good.some(l=>l<21||l>35);
  if(odd)h+=`<p class="trk-tip">Some of your cycles were outside the typical 21 to 35 day range. If that keeps happening, mention it to your GP. <a href="#/entry/irregular-periods">Irregular periods</a></p>`;
  if(A.heavyDays>=3)h+=`<p class="trk-tip">You've logged heavy flow on ${A.heavyDays} days. Heavy bleeding is common but treatable, and it can cause low iron. <a href="#/entry/heavy-periods">Heavy periods</a> · <a href="#/entry/iron-deficiency-anaemia">Iron deficiency</a></p>`;
  h+=`</div>`;

  const sx=counts(T,since,"sx").slice(0,8),moods=counts(T,since,"mood").slice(0,5);
  h+=`<div class="trk-card"><h2 style="margin-top:0">Last 90 days</h2><p class="muted" style="margin:0 0 8px">${logged} day${logged===1?"":"s"} logged</p>`;
  if(sx.length){
    const max=sx[0][1];
    h+=sx.map(([name,c])=>`<div class="trk-bar"><span>${GUIDE[name]?`<a href="#/entry/${GUIDE[name]}">${esc(name)}</a>`:esc(name)}</span><div><i style="width:${Math.max(6,Math.round(c/max*100))}%"></i></div><b>${c}</b></div>`).join("");
  }else h+=`<div class="empty">No symptoms logged in this time.</div>`;
  if(moods.length)h+=`<p class="muted" style="margin:12px 0 0">Most common moods: ${moods.map(m=>esc(m[0].toLowerCase())+" ("+m[1]+")").join(", ")}</p>`;
  h+=`</div>`;

  const rows=phaseTable(T,A);
  if(rows&&rows.some(r=>r.n>=3)){
    const word=(v,arr,off)=>v==null?"–":arr[Math.min(arr.length-1,Math.round(v)-off)];
    h+=`<div class="trk-card"><h2 style="margin-top:0">By days since your period started</h2><div class="trk-table">
     <div class="hd"><span></span><span>Pain</span><span>Energy</span><span>Common</span></div>`+
     rows.map(R=>{const top=Object.entries(R.sx).sort((a,b)=>b[1]-a[1])[0];
       return `<div><span>${R.name}</span><span>${R.n>=3?word(avg(R.pain),PAIN,0):"–"}</span><span>${R.n>=3?word(avg(R.energy),ENERGY,1):"–"}</span><span>${R.n>=3&&top?esc(top[0]):"–"}</span></div>`}).join("")+`</div></div>`;
  }

  h+=`<div class="trk-card"><h2 style="margin-top:0">Take it to your appointment</h2>
   <p class="muted" style="margin:0 0 12px">A short summary of the last 90 days that you can print, copy or show your GP.</p>
   <pre class="trk-summary" id="trk-summary">${esc(summaryText(T,A))}</pre>
   <div class="trk-actions"><button class="btn" data-trk="copy">Copy</button><button class="btn trk-ghost" data-trk="print">Print</button></div></div>
  <div class="trk-card"><h2 style="margin-top:0">Your data</h2>
   <div class="trk-actions"><button class="btn trk-ghost" data-trk="backup">Download a backup</button><button class="btn trk-ghost trk-danger" data-trk="wipe">Delete my tracker data</button></div></div>`;
  return h;
}

function summaryText(T,A){
  const t=today(),since=addDays(t,-90);
  const L=[];
  L.push("Her A–Z symptom summary");
  L.push("Covers "+fmt(since,{day:"numeric",month:"short",year:"numeric"})+" to "+fmt(t,{day:"numeric",month:"short",year:"numeric"}));
  L.push("");
  const st6=A.starts.slice(-6);
  L.push("Period start dates: "+(st6.length?st6.map(s=>fmt(s,{day:"numeric",month:"short"})).join(", "):"none logged"));
  if(A.good.length)L.push("Cycle lengths (days): "+A.lens.slice(-6).join(", ")+" (average "+Math.round(A.avgCycle)+")");
  if(A.avgPeriod)L.push("Average period length: "+A.avgPeriod.toFixed(1).replace(".0","")+" days");
  const recent=A.days.filter(d=>d>=since);
  const heavy=recent.filter(d=>T.log[d].flow===4).length;
  if(heavy)L.push("Days with heavy flow: "+heavy);
  const pains=recent.map(d=>T.log[d].pain).filter(x=>x!=null);
  if(pains.length){const c=pains.filter(x=>x>=3).length;L.push("Pain logged on "+pains.filter(x=>x>=1).length+" days; strong or severe on "+c)}
  const sx=counts(T,since,"sx").slice(0,8);
  L.push("Most common symptoms: "+(sx.length?sx.map(s=>s[0]+" ("+s[1]+" days)").join(", "):"none logged"));
  const notes=recent.filter(d=>T.log[d].note&&T.log[d].note.trim()).slice(-8);
  if(notes.length){L.push("");L.push("Notes:");notes.forEach(d=>L.push("- "+fmt(d,{day:"numeric",month:"short"})+": "+T.log[d].note.trim().replace(/\s+/g," ")))}
  L.push("");L.push("Self-recorded information. Not a diagnosis.");
  return L.join("\n");
}

window.viewTrack=function(){
  const T=load(),A=analyse(T);
  const body=st.tab==="cal"?viewCal(T,A):st.tab==="pat"?viewPat(T,A):viewLog(T,A);
  $("#app").innerHTML=`<div class="wrap trk">${head()}${body}<p class="disclaimer">${DISCLAIMER}</p></div>`;
};
function rerender(keepScroll){const y=window.scrollY;window.viewTrack();tabs();if(keepScroll)window.scrollTo(0,y)}

/* ---------- events ---------- */
document.addEventListener("click",e=>{
  const el=e.target.closest("[data-trk]");if(!el||!document.querySelector(".trk"))return;
  const a=el.getAttribute("data-trk"),v=el.getAttribute("data-v");
  if(a==="tab"){st.tab=v;rerender(false);window.scrollTo(0,0)}
  else if(a==="flow"||a==="pain"||a==="energy"||a==="sleep"){setField(st.day,a,Number(v),false);rerender(true)}
  else if(a==="mood"||a==="sx"||a==="hab"){setField(st.day,a,v,true);rerender(true)}
  else if(a==="day"){const n=addDays(st.day,Number(v));if(n<=today()){st.day=n;rerender(false)}}
  else if(a==="month"){const p=st.month.split("-").map(Number);const d=new Date(p[0],p[1]-1+Number(v),1);st.month=d.getFullYear()+"-"+pad(d.getMonth()+1);rerender(true)}
  else if(a==="pick"){st.day=v;st.tab="log";rerender(false);window.scrollTo(0,0)}
  else if(a==="copy"){const tx=document.getElementById("trk-summary").textContent;(navigator.clipboard?navigator.clipboard.writeText(tx):Promise.reject()).then(()=>toast("Copied"),()=>toast("Couldn't copy. Select the text instead."))}
  else if(a==="print"){document.body.classList.add("trk-printing");window.print();setTimeout(()=>document.body.classList.remove("trk-printing"),500)}
  else if(a==="backup"){
    const blob=new Blob([JSON.stringify(load(),null,2)],{type:"application/json"});
    const u=URL.createObjectURL(blob);const l=document.createElement("a");l.href=u;l.download="her-a-z-tracker-backup.json";document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);
  }
  else if(a==="wipe"){if(confirm("Delete everything you've logged in the tracker? This can't be undone.")){save({log:{}});toast("Tracker data deleted");rerender(false)}}
});
let nt=null;
document.addEventListener("input",e=>{
  if(!e.target||e.target.id!=="trk-note")return;
  clearTimeout(nt);const val=e.target.value;const day=st.day;
  nt=setTimeout(()=>{const T=load();const r=T.log[day]||{};r.note=val;if(empty(r))delete T.log[day];else T.log[day]=r;save(T)},350);
});

/* ---------- clear-all also removes tracker data ---------- */
const _clear=store.clearAll;
store.clearAll=function(){_clear.call(store);try{localStorage.removeItem(KEY)}catch(e){}delete mem[KEY]};

/* ---------- tab bar with Track ---------- */
ICON.track='<svg viewBox="0 0 24 24"><path d="M12 3c3.2 4 6 6.8 6 10.2A6 6 0 0 1 6 13.2C6 9.8 8.8 7 12 3z"/><path d="M9.5 14a2.6 2.6 0 0 0 2.5 2.4"/></svg>';
window.tabs=function(){
  const h=location.hash||"#/";
  const cur=h.startsWith("#/browse")||h.startsWith("#/area")?"browse":h.startsWith("#/ask")?"ask":h.startsWith("#/supps")?"supps":h.startsWith("#/track")?"track":(h.startsWith("#/saved")||h.startsWith("#/me"))?"me":"home";
  const t=(k,href,label,ic)=>`<button class="tab" ${cur===k?'aria-current="page"':""} onclick="location.hash='${href}'">${ic}<span>${label}</span></button>`;
  $("#tabs").innerHTML=`<nav class="tabs" aria-label="Main"><div class="in">${t("home","#/","Home",ICON.home)}${t("browse","#/browse","A to Z",ICON.az)}${t("ask","#/ask","Ask",ICON.ask)}${t("supps","#/supps","Supplements",ICON.pill)}${t("track","#/track","Track",ICON.track)}${t("me","#/me","Me",ICON.me)}</div></nav>`;
};

/* ---------- route #/track and topic browsing ---------- */
const _home=window.viewHome;
function topicChips(active){
  return Object.keys(AREAS).map(k=>`<a class="chip" href="#/area/${k}" ${active===k?'aria-current="true"':""}>${esc(AREAS[k])}</a>`).join("");
}
window.viewHome=function(){
  if((location.hash||"").startsWith("#/track")){window.viewTrack();return}
  _home();
  const c=document.querySelector("#main .cards");
  if(c)c.insertAdjacentHTML("afterend",`<div class="sec"><h2 style="font-size:21px;margin-bottom:12px">Browse by topic</h2><div class="chips">${topicChips()}</div></div>`);
};
const _browse=window.viewBrowse;
window.viewBrowse=function(area){
  _browse(area);
  const q=document.getElementById("bq");
  if(q)q.insertAdjacentHTML("beforebegin",`<div class="chips" style="margin:12px 0 4px"><a class="chip" href="#/browse" ${!area?'aria-current="true"':""}>All</a>${topicChips(area)}</div>`);
};

route();
})();
