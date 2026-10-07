/* Her A–Z: illustrations, cycle wheel, body symptom finder, quick log, breathing exercise and gentle animations. Loaded last. Everything stays on this device. */
(function(){
"use strict";

/* ---------- Helpers ---------- */
const q=(s,r)=>(r||document).querySelector(s);
const qa=(s,r)=>Array.prototype.slice.call((r||document).querySelectorAll(s));
const e=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const buzz=n=>{try{if(navigator.vibrate)navigator.vibrate(n||10)}catch(x){}};
const reduced=()=>window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
const pad=n=>(n<10?"0":"")+n;
const dkey=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const DAY=86400000;
const toN=s=>{const p=s.split("-");return Date.UTC(+p[0],+p[1]-1,+p[2])/DAY};
const fromN=n=>{const d=new Date(n*DAY);return new Date(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())};
const fmt=d=>d.toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"});
const hash=()=>location.hash||"#/";
const isHome=()=>{const h=hash();return h==="#/"||h==="#"};

/* ---------- Illustrations (original line art) ---------- */
const SV=(inner,cls)=>`<svg class="${cls||"hz-svg"}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
const F='fill="var(--hz-fill)"';
const star=(x,y,r)=>`<path d="M${x} ${y-r}C${x+r*.2} ${y-r*.2} ${x+r*.2} ${y-r*.2} ${x+r} ${y}C${x+r*.2} ${y+r*.2} ${x+r*.2} ${y+r*.2} ${x} ${y+r}C${x-r*.2} ${y+r*.2} ${x-r*.2} ${y+r*.2} ${x-r} ${y}C${x-r*.2} ${y-r*.2} ${x-r*.2} ${y-r*.2} ${x} ${y-r}Z" ${F}/>`;
const ART={
 repro:`<path ${F} d="M14 15c3-2 6-3 10-3s7 1 10 3c0 8-3 12-6 15v8h-8v-8c-3-3-6-7-6-15z"/><path d="M14 15c-3 0-5 2-6 5M34 15c3 0 5 2 6 5"/><circle cx="8" cy="22" r="2.6" ${F}/><circle cx="40" cy="22" r="2.6" ${F}/>`,
 horm:`<path d="M5 27c5-9 10-9 15 0s10 9 15 0 6-6 8-4"/><circle cx="13" cy="15" r="3.4" ${F}/><circle cx="33" cy="36" r="3.4" ${F}/><circle cx="36" cy="13" r="2.4" ${F}/>`,
 preg:`<ellipse cx="17" cy="30" rx="5.5" ry="8.5" ${F}/><circle cx="14" cy="18.5" r="1.6"/><circle cx="18" cy="17.8" r="1.6"/><circle cx="21.5" cy="19.2" r="1.4"/><ellipse cx="32" cy="22" rx="5.5" ry="8.5" ${F}/><circle cx="29" cy="10.5" r="1.6"/><circle cx="33" cy="9.8" r="1.6"/><circle cx="36.5" cy="11.2" r="1.4"/>`,
 heart:`<path ${F} d="M24 41s-15-8.5-15-20a7.5 7.5 0 0 1 15-3 7.5 7.5 0 0 1 15 3c0 11.5-15 20-15 20z"/><path d="M12 25h7l3-5 4 9 3-4h7"/>`,
 breast:`<path ${F} d="M24 7c-5 0-7.5 3.5-7.5 7.5 0 5.5 6 12 10.5 20l4.5 7.5 4-2.5-5-8.5M24 7c5 0 7.5 3.5 7.5 7.5 0 5.5-6 12-10.5 20L16.5 42l-4-2.5 5-8.5"/>`,
 urinary:`<path ${F} d="M24 7c6 9 12.5 15 12.5 22.5a12.5 12.5 0 0 1-25 0C11.5 22 18 16 24 7z"/><path d="M18 30a6 6 0 0 0 5 6"/>`,
 sexual:`<path ${F} d="M24 6l14 5v10c0 10-6 17-14 21-8-4-14-11-14-21V11z"/><path d="M24 31s-6.5-3.8-6.5-8.5a3.2 3.2 0 0 1 6.5-1 3.2 3.2 0 0 1 6.5 1c0 4.7-6.5 8.5-6.5 8.5z"/>`,
 cancer:`<circle cx="21" cy="21" r="12" ${F}/><path d="M30 30l10 10M15.5 21l4 4 7-8"/>`,
 bone:`<path ${F} d="M17.5 13.5a4.5 4.5 0 1 0-6.5 5.5 4.5 4.5 0 1 0 5.5 6.5l13 13a4.5 4.5 0 1 0 6.5-5.5 4.5 4.5 0 1 0-5.5-6.5z" transform="rotate(0 24 24)"/>`,
 mind:`<path ${F} d="M29 41v-6h4a3 3 0 0 0 3-3v-5l3.5-1.5L36 19c0-8-6-13-13.5-13S9 11.5 9 19.5c0 5 2 8.5 5 11.5V41z"/><path d="M22 27v-4c0-4 2.5-7 7-8M22 23c0-3-2.5-5-6-5"/>`,
 skin:star(19,22,10)+star(34,32,6)+star(35,12,4),
 gut:`<path ${F} d="M20 6v8c0 4-9 7-9 17 0 7 5.5 11 13 11 9.5 0 15-6.5 15-14 0-6.5-4.5-9.5-9.5-9.5-3.5 0-5.5 2.2-5.5 5.2"/>`,
 head:`<circle cx="24" cy="23" r="15" ${F}/><path d="M14 24l4-4.5 4 7 4-7 4 7 4-4.5"/>`,
 energy:`<path ${F} d="M30 8a15 15 0 1 0 10 25A12 12 0 0 1 30 8z"/>`+star(38,13,3.5),
 everyday:`<path ${F} d="M10 11h28a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H23l-8 7v-7h-5a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z"/><path d="M24 27s-5-3-5-6.5a2.5 2.5 0 0 1 5-.8 2.5 2.5 0 0 1 5 .8c0 3.5-5 6.5-5 6.5z"/>`,
 /* life stages */
 teen:`<path d="M24 41V25M15 41h18"/><path ${F} d="M24 27c0-7.5-5-11.5-12.5-11.5 0 7.5 5 11.5 12.5 11.5zM24 23c0-6.5 4.5-10.5 11.5-10.5 0 6.5-4.5 10.5-11.5 10.5z"/>`,
 st_repro:`<path d="M24 41V27"/><path d="M24 34c3-4 7-5 10-4-2 4-6 5-10 4z" ${F}/>`+[0,72,144,216,288].map(a=>`<ellipse cx="24" cy="12.5" rx="4.6" ry="7" ${F} transform="rotate(${a} 24 19)"/>`).join("")+`<circle cx="24" cy="19" r="3.2" fill="var(--surface)"/>`,
 meno:`<path d="M6 34h36M12 40h24"/><path ${F} d="M13 34a11 11 0 0 1 22 0z"/><path d="M24 14v4M11.5 19.5l2.8 2.8M36.5 19.5l-2.8 2.8M7 28h3M38 28h3"/>`,
 later:`<path d="M24 41V27M18 41h12M24 31l-5-4M24 29l5-4"/><path ${F} d="M24 6c-6 0-10 4-10 8.5-3 1.5-5 4-5 7.5 0 5 4 8 9 8h12c5 0 9-3 9-8 0-3.5-2-6-5-7.5C34 10 30 6 24 6z"/>`,
 breathe:`<circle cx="24" cy="24" r="16" ${F}/><path d="M14 24c3-4 6-4 10 0s7 4 10 0M16 31c2.5-2 5-2 8 0s5.5 2 8 0"/>`,
 track:`<circle cx="24" cy="24" r="15" ${F}/><path d="M24 15v9l6 4"/>`
};
const STAGE_ART={teen:"teen",repro:"st_repro",preg:"preg",meno:"meno",later:"later"};
const art=(k,cls)=>ART[k]?SV(ART[k],cls):"";

/* ---------- Mood faces ---------- */
const FACE={
 Happy:`<path d="M17 27c2 4 4.5 6 7 6s5-2 7-6"/><circle cx="18.5" cy="20" r="1.8" fill="currentColor"/><circle cx="29.5" cy="20" r="1.8" fill="currentColor"/>`,
 Calm:`<path d="M18 29c2 2 4 3 6 3s4-1 6-3M15.5 20.5c1.5 1.5 4 1.5 5.5 0M27 20.5c1.5 1.5 4 1.5 5.5 0"/>`,
 Motivated:`<path d="M17 27c2 4 4.5 6 7 6s5-2 7-6"/><path d="M15.5 19.5l3-2 3 2M26.5 19.5l3-2 3 2"/>`,
 Low:`<path d="M18 32c2-3 4-4 6-4s4 1 6 4"/><circle cx="18.5" cy="21" r="1.8" fill="currentColor"/><circle cx="29.5" cy="21" r="1.8" fill="currentColor"/>`,
 Anxious:`<path d="M17 31c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0"/><path d="M15.5 17l4.5-1.5M32.5 17L28 15.5"/><circle cx="18.5" cy="22" r="1.8" fill="currentColor"/><circle cx="29.5" cy="22" r="1.8" fill="currentColor"/>`,
 Irritable:`<path d="M18 31h12M15.5 17l5 2.5M32.5 17l-5 2.5"/><circle cx="18.5" cy="22.5" r="1.8" fill="currentColor"/><circle cx="29.5" cy="22.5" r="1.8" fill="currentColor"/>`,
 Tearful:`<path d="M18 32c2-3 4-4 6-4s4 1 6 4"/><circle cx="18.5" cy="21" r="1.8" fill="currentColor"/><circle cx="29.5" cy="21" r="1.8" fill="currentColor"/><path d="M31 25c-1 2-1 3.5 0 4s2-1 0-4z" fill="#9CC9F0" stroke="#5D9BD0" stroke-width="1.2"/>`,
 Overwhelmed:`<path d="M18 31.5c2-2 4-2 6 0s4 2 6 0"/><path d="M16 19l4 3M20 19l-4 3M28 19l4 3M32 19l-4 3"/><path d="M36 13c1 2 1 3.5 0 4s-2-1 0-4z" fill="#9CC9F0" stroke="#5D9BD0" stroke-width="1.2"/>`
};
const face=(m,cls)=>FACE[m]?SV(`<circle cx="24" cy="24" r="17" ${F}/>`+FACE[m],cls||"hz-face"):"";
const drop=(n)=>SV(`<path d="M24 8c6 9 12 15 12 22a12 12 0 0 1-24 0c0-7 6-13 12-22z" ${n?'fill="var(--accent)" fill-opacity="'+(0.18+n*0.2)+'"':'fill="none"'}/>${n===0?'<path d="M15 36L33 18"/>':""}`,"hz-drop");

/* ---------- Track data ---------- */
const FLOW=["None","Spotting","Light","Medium","Heavy"],PAIN=["None","Mild","Moderate","Strong","Severe"];
const QMOODS=["Happy","Calm","Low","Anxious","Irritable"];
function loadT(){let T=null;try{T=store.get("hz_track")}catch(x){}return T&&T.log?T:{log:{}}}
function saveT(T){try{store.set("hz_track",T)}catch(x){}}
function emptyRec(r){return !r||((r.flow==null)&&(r.pain==null)&&(r.energy==null)&&(r.sleep==null)&&!(r.mood&&r.mood.length)&&!(r.sx&&r.sx.length)&&!(r.hab&&r.hab.length)&&!(r.note&&r.note.trim()))}
function setToday(k,v,multi){
 const T=loadT(),day=dkey(new Date()),r=T.log[day]||{};
 if(multi){const a=(r[k]||[]).slice(),i=a.indexOf(v);if(i>-1)a.splice(i,1);else a.push(v);r[k]=a}
 else r[k]=(r[k]===v)?null:v;
 if(emptyRec(r))delete T.log[day];else T.log[day]=r;
 saveT(T);return r;
}
function cycle(){
 const L=loadT().log,days=Object.keys(L).sort(),isP=d=>(L[d].flow||0)>=2;
 const starts=[];let prev=null;days.filter(isP).forEach(d=>{if(prev===null||toN(d)-toN(prev)>3)starts.push(d);prev=d});
 if(!starts.length)return null;
 const lens=[];for(let i=1;i<starts.length;i++)lens.push(toN(starts[i])-toN(starts[i-1]));
 const good=lens.filter(l=>l>=15&&l<=60);
 const len=good.length?Math.round(good.reduce((a,b)=>a+b,0)/good.length):28;
 const runs=starts.map(s=>{let n=0,d=toN(s);for(;;){const k=dkey(fromN(d));if(L[k]&&(L[k].flow||0)>=1){n++;d++}else if(L[dkey(fromN(d+1))]&&isP(dkey(fromN(d+1)))){n++;d++}else break}return n}).filter(n=>n>=2&&n<=12);
 const plen=Math.max(2,Math.min(10,runs.length?Math.round(runs.reduce((a,b)=>a+b,0)/runs.length):5));
 const last=toN(starts[starts.length-1]),today=toN(dkey(new Date()));
 const cd=today-last+1;
 const ov=Math.max(plen+3,len-14),fs=Math.max(plen+1,ov-5),fe=Math.min(len,ov+1);
 return {len:len,plen:plen,cd:cd,ov:ov,fs:fs,fe:fe,next:fromN(last+len),estimated:good.length<2,late:cd>len};
}
const PHASES={
 period:{n:"Period",c:"var(--accent)",t:"Your period. Energy can dip and cramps are common in the first days. Heat, rest, gentle movement and pain relief can all help."},
 foll:{n:"Follicular",c:"#F7BACB",t:"After your period, oestrogen rises. Many people notice more energy, a brighter mood and clearer skin."},
 fert:{n:"Fertile window",c:"#8FCDB0",t:"Around ovulation (an estimate). Some people notice clearer, stretchy discharge or a one-sided twinge. Not reliable as contraception."},
 lut:{n:"Luteal",c:"#CDB8EC",t:"After ovulation, progesterone rises. Bloating, sore breasts, cravings or mood changes before a period (PMS) are common."}
};
function phaseOf(c,day){if(day<=c.plen)return "period";if(day<c.fs)return "foll";if(day<=c.fe)return "fert";return "lut"}

/* ---------- Cycle wheel ---------- */
function wheel(compact){
 const c=cycle();
 if(!c){
  return `<div class="hz-wheel-empty">${art("track","hz-svg hz-big")}<div><b>See your cycle at a glance</b><p class="hz-small" style="margin:4px 0 10px">Log the first day of your period and your cycle wheel appears here.</p><button class="btn small" type="button" data-hz="log-period">My period started today</button></div></div>`;
 }
 const R=62,CIRC=2*Math.PI*R,L=c.len,segs=[["period",1,c.plen],["foll",c.plen+1,c.fs-1],["fert",c.fs,c.fe],["lut",c.fe+1,L]].filter(s=>s[2]>=s[1]);
 const gap=CIRC*0.006;
 let arcs="";segs.forEach(s=>{const a=(s[1]-1)/L*CIRC,len=(s[2]-s[1]+1)/L*CIRC-gap;arcs+=`<circle class="hz-arc" data-phase="${s[0]}" r="${R}" cx="80" cy="80" fill="none" stroke="${PHASES[s[0]].c}" stroke-width="18" stroke-dasharray="${Math.max(1,len).toFixed(2)} ${CIRC.toFixed(2)}" stroke-dashoffset="${(-a).toFixed(2)}" transform="rotate(-90 80 80)"><title>${PHASES[s[0]].n}</title></circle>`});
 const day=Math.min(c.cd,L),ang=((day-0.5)/L)*2*Math.PI-Math.PI/2,mx=80+R*Math.cos(ang),my=80+R*Math.sin(ang);
 const ph=c.late?"period":phaseOf(c,day);
 const daysTo=c.len-c.cd+1;
 const sub=c.late?`Period estimated ${c.cd-c.len} day${c.cd-c.len===1?"":"s"} ago`:(daysTo<=1?"Period may start today":`Next period in about ${daysTo} days`);
 const legend=["period","foll","fert","lut"].map(k=>`<button type="button" class="hz-leg${k===ph?" on":""}" data-phase="${k}"><i style="background:${PHASES[k].c}"></i>${PHASES[k].n}</button>`).join("");
 return `<div class="hz-wheel${compact?" compact":""}">
  <svg viewBox="0 0 160 160" class="hz-ring" role="img" aria-label="Cycle day ${c.cd}, ${PHASES[ph].n.toLowerCase()} phase. ${sub}.">
   <circle r="${R}" cx="80" cy="80" fill="none" stroke="var(--line)" stroke-width="18"/>${arcs}
   <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="11" fill="var(--surface)" stroke="var(--ink)" stroke-width="3" class="hz-today"/>
   <text x="80" y="70" text-anchor="middle" class="hz-w1">Day</text>
   <text x="80" y="96" text-anchor="middle" class="hz-w2">${c.cd}</text>
  </svg>
  <div class="hz-wtxt"><b>${e(c.late?"Period expected":PHASES[ph].n)}</b><span>${e(sub)}</span>${c.estimated?`<span class="hz-small">Estimated using a 28-day cycle until you have logged more.</span>`:""}</div>
  ${compact?`<a class="btn small ghost" href="#/track" style="margin-top:8px">Open Track</a>`:`<div class="hz-legend">${legend}</div><p class="hz-phase" role="status">${e(PHASES[ph].t)}</p><p class="hz-small" style="margin:6px 0 0">Everyone is different. This is an estimate from what you log, not medical advice or contraception.</p>`}
 </div>`;
}

/* ---------- Body symptom finder ---------- */
const BODY={
 head:{n:"Head",areas:["head","mind"],ask:["Headaches or migraines","Brain fog","Dizziness","Headaches around my period"]},
 chest:{n:"Chest and breasts",areas:["breast","heart"],ask:["Breast pain or tenderness","A breast lump or change","Heart racing or palpitations"],urgent:"Chest pain that spreads to your arm, jaw or back, or comes with breathlessness or sweating: call your local emergency number now."},
 tummy:{n:"Tummy",areas:["gut"],ask:["Bloating that won't go away","Constipation or diarrhoea","Nausea","Tummy pain"]},
 pelvis:{n:"Pelvis and periods",areas:["repro","sexual"],ask:["Really painful periods","Heavy periods","Pelvic pain","Pain during sex","Unusual discharge","Irregular periods"]},
 bladder:{n:"Bladder",areas:["urinary"],ask:["Burning when I wee","Needing to wee all the time","Leaking when I cough or laugh"]},
 joints:{n:"Bones and joints",areas:["bone"],ask:["Joint aches","Back pain","Worried about bone health"]},
 skin:{n:"Skin and hair",areas:["skin"],ask:["Acne around my period","Hair thinning","Itchy skin"]},
 mind:{n:"Mood, sleep and energy",areas:["mind","energy"],ask:["Always tired","Can't sleep","Low mood","Anxiety","Mood swings before my period"]}
};
function bodyHtml(){
 const spot=(k,x,y)=>`<g class="hz-spot" data-body="${k}" tabindex="0" role="button" aria-label="${e(BODY[k].n)}"><circle cx="${x}" cy="${y}" r="15" class="hz-spot-ring"/><circle cx="${x}" cy="${y}" r="6" class="hz-spot-dot"/></g>`;
 return `<section class="hz-box hz-bodybox" id="hz-body"><h2>Where's it bothering you?</h2><p class="hz-small" style="margin:0 0 6px">Tap the body or a button to see common symptoms and guides.</p>
 <div class="hz-bodywrap"><svg viewBox="0 0 200 290" class="hz-bodysvg" aria-hidden="false" role="group" aria-label="Body map">
  <g class="hz-fig"><path d="M77 80c-12 5-18 13-25 30l-14 38c-2 6 5 9 8 4l15-30v45c0 6 3 9 6 10l2 92c0 8 12 8 13 0l6-82h4l6 82c1 8 13 8 13 0l2-92c3-1 6-4 6-10v-45l15 30c3 5 10 2 8-4l-14-38c-7-17-13-25-25-30z"/><circle cx="100" cy="42" r="24"/><path d="M92 64h16v12H92z"/></g>
  ${spot("head",100,40)}${spot("chest",100,98)}${spot("tummy",100,130)}${spot("pelvis",100,160)}${spot("skin",44,150)}${spot("joints",86,232)}
 </svg>
 <div class="hz-bodybtns">${Object.keys(BODY).map(k=>`<button type="button" class="chip" data-body="${k}">${e(BODY[k].n)}</button>`).join("")}</div></div></section>`;
}

/* ---------- Bottom sheet ---------- */
let lastFocus=null;
function sheet(html,label){
 closeSheet(true);lastFocus=document.activeElement;
 const w=document.createElement("div");w.className="hz-sheetwrap";w.innerHTML=`<div class="hz-scrim" data-hz="close"></div><div class="hz-sheet" role="dialog" aria-modal="true" aria-label="${e(label)}"><div class="hz-grab"></div><button class="hz-x" type="button" data-hz="close" aria-label="Close">×</button>${html}</div>`;
 document.body.appendChild(w);requestAnimationFrame(()=>w.classList.add("open"));
 const f=q(".hz-sheet button:not(.hz-x),.hz-sheet a",w);if(f)setTimeout(()=>f.focus(),60);
}
function closeSheet(now){
 const w=q(".hz-sheetwrap");if(!w)return;
 if(now||reduced()){w.remove()}else{w.classList.remove("open");setTimeout(()=>w.remove(),220)}
 if(lastFocus&&lastFocus.focus&&!now){try{lastFocus.focus()}catch(x){}}
}
function bodySheet(k){
 const b=BODY[k];if(!b)return;
 const areas=b.areas.filter(a=>typeof AREAS!=="undefined"&&AREAS[a]);
 sheet(`<div class="hz-sheethead">${art(b.areas[0],"hz-svg hz-mid")}<h2>${e(b.n)}</h2></div>
  <p class="hz-small" style="margin:0 0 8px">What's going on? Tap one to check it in Ask.</p>
  <div class="hz-chips">${b.ask.map(t=>`<button type="button" class="chip" data-ask="${e(t)}">${e(t)}</button>`).join("")}</div>
  ${b.urgent?`<p class="hz-urgent">${e(b.urgent)}</p>`:""}
  <div class="hz-l" style="margin-top:14px">Read the guides</div>
  <div class="hz-chips">${areas.map(a=>`<a class="chip" href="#/area/${a}" data-hz="close">${art(a,"hz-ic")}${e(AREAS[a])}</a>`).join("")}</div>`,b.n);
}

/* ---------- Quick log ---------- */
function quickHtml(){
 const r=loadT().log[dkey(new Date())]||{},mood=r.mood||[];
 return `<h2 style="margin:0 0 2px">How are you today?</h2><p class="hz-small" style="margin:0 0 12px">${e(fmt(new Date()))}. Tap to log, tap again to undo. Saved on this device.</p>
 <div class="hz-l" style="margin-top:0">Mood</div>
 <div class="hz-faces">${QMOODS.map(m=>`<button type="button" class="hz-facebtn" data-q="mood" data-v="${m}" aria-pressed="${mood.indexOf(m)>-1}">${face(m)}<span>${m}</span></button>`).join("")}</div>
 <div class="hz-l">Period</div>
 <div class="hz-faces">${FLOW.map((f,i)=>`<button type="button" class="hz-facebtn" data-q="flow" data-v="${i}" aria-pressed="${r.flow===i}">${drop(i)}<span>${f}</span></button>`).join("")}</div>
 <div class="hz-l">Pain</div>
 <div class="hz-pain">${PAIN.map((p,i)=>`<button type="button" class="hz-pbtn" data-q="pain" data-v="${i}" aria-pressed="${r.pain===i}"><i style="--n:${i}"></i>${p}</button>`).join("")}</div>
 <div class="hz-sheetbtns"><a class="btn ghost" href="#/track" data-hz="close">More in Track</a><button class="btn" type="button" data-hz="close">Done</button></div>`;
}
function fab(){
 const show=typeof profile!=="undefined"&&profile&&!q("#hz-setup")&&!q(".ob")&&hash().indexOf("#/breathe")!==0;
 let b=q(".hz-fab");
 if(show&&!b){b=document.createElement("button");b.className="hz-fab";b.type="button";b.setAttribute("aria-label","Quick log for today");b.innerHTML=`<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`;b.onclick=()=>{buzz(8);sheet(quickHtml(),"Quick log")};document.body.appendChild(b)}
 else if(!show&&b)b.remove();
}

/* ---------- Breathing exercise ---------- */
const PATTERNS=[
 {k:"calm",n:"Calm",d:"Stress, anxiety or trouble sleeping",steps:[["Breathe in",4],["Breathe out slowly",6]]},
 {k:"pain",n:"Cramps and pain",d:"Slow belly breathing to ease tension",steps:[["Breathe in",4],["Hold gently",2],["Breathe out slowly",6]]},
 {k:"flush",n:"Hot flush",d:"Slow, paced breathing (about 6 breaths a minute)",steps:[["Breathe in",5],["Breathe out",5]]}
];
let bState={p:"calm",min:2,run:false,t:null,end:0,buzz:false};
function stopBreathe(){bState.run=false;if(bState.t)clearTimeout(bState.t);bState.t=null}
function renderBreathe(){
 stopBreathe();
 const app=q("#app");
 app.innerHTML=`<div class="wrap" id="hz-breathe"><button class="back" type="button" onclick="history.length>1?history.back():location.hash='#/'">← Back</button>
  <h1 style="font-size:30px;margin:6px 0 4px">Breathe</h1><p class="muted" style="margin:0 0 14px">A few minutes of slow breathing can help you feel calmer and ease tension. Stop if you feel dizzy.</p>
  <div class="hz-l" style="margin-top:0">What is it for?</div>
  <div class="opts" id="hz-bp">${PATTERNS.map(p=>`<button class="opt" type="button" data-bp="${p.k}" aria-pressed="${bState.p===p.k}"><b>${e(p.n)}</b><br><span class="hz-small">${e(p.d)}</span></button>`).join("")}</div>
  <div class="hz-l">How long?</div>
  <div class="hz-chips" id="hz-bm">${[1,2,5].map(m=>`<button class="chip" type="button" data-bm="${m}" aria-pressed="${bState.min===m}">${m} min</button>`).join("")}</div>
  <div class="hz-orbbox"><div class="hz-orb" id="hz-orb"></div><div class="hz-cue" id="hz-cue" aria-live="polite">Ready when you are</div><div class="hz-small" id="hz-left"></div></div>
  <label class="hz-toggle"><input type="checkbox" id="hz-bbuzz" ${bState.buzz?"checked":""}><span>Gentle vibration at each change (on phones that support it)</span></label>
  <button class="btn block" type="button" id="hz-bgo">Start</button>
 </div>`;
}
function stepBreathe(i){
 if(!bState.run)return;
 const p=PATTERNS.find(x=>x.k===bState.p),s=p.steps[i%p.steps.length],orb=q("#hz-orb"),cue=q("#hz-cue"),left=q("#hz-left");
 if(!orb){stopBreathe();return}
 const remain=Math.max(0,Math.round((bState.end-Date.now())/1000));
 if(remain<=0){finishBreathe();return}
 cue.textContent=s[0];left.textContent=Math.floor(remain/60)+":"+pad(remain%60)+" left";
 const scale=/in/i.test(s[0])?1:(/Hold/.test(s[0])?null:0.55);
 if(scale!==null){orb.style.transitionDuration=s[1]+"s";orb.style.transform="scale("+scale+")"}
 if(bState.buzz)buzz(30);
 bState.t=setTimeout(()=>stepBreathe(i+1),s[1]*1000);
}
function finishBreathe(){stopBreathe();const cue=q("#hz-cue"),go=q("#hz-bgo"),orb=q("#hz-orb");if(cue)cue.textContent="Well done. Notice how you feel now.";if(go)go.textContent="Start again";if(orb){orb.style.transitionDuration="1.2s";orb.style.transform="scale(.75)"}const l=q("#hz-left");if(l)l.textContent="";buzz([20,60,20])}

/* ---------- Decorating existing screens ---------- */
function decorate(){
 const app=q("#app");if(!app)return;
 fab();
 const h=hash();
 if(h.indexOf("#/breathe")===0){if(!q("#hz-breathe"))renderBreathe();return}
 /* topic chips get icons */
 qa('a.chip[href^="#/area/"]',app).forEach(a=>{if(q(".hz-ic",a))return;const k=a.getAttribute("href").split("/")[2];if(ART[k])a.insertAdjacentHTML("afterbegin",art(k,"hz-ic"))});
 /* life-stage ribbon gets illustrations */
 qa("button.stage",app).forEach(b=>{const d=q(".dot",b);if(!d||d.classList.contains("hz-ill"))return;const k=STAGE_ART[b.dataset.stage];if(k){d.classList.add("hz-ill");d.innerHTML=art(k,"hz-svg")}});
 if(isHome()&&typeof profile!=="undefined"&&profile){
  const main=q("#main",app);
  if(main&&!q("#hz-body",main)){
   main.insertAdjacentHTML("afterbegin",bodyHtml());
   const c=cycle();if(c&&!q("#hz-wheelhome",main))main.insertAdjacentHTML("afterbegin",`<section class="hz-box" id="hz-wheelhome"><h2>Your cycle</h2>${wheel(true)}</section>`);
  }
  const cards=q(".cards",app);
  if(cards&&!q(".hz-breathecard",cards))cards.insertAdjacentHTML("beforeend",`<a class="card hz-breathecard" href="#/breathe"><b>${art("breathe","hz-ic")} Breathe</b><span>A short guided exercise for cramps, stress or hot flushes.</span></a>`);
 }
 else if(h.indexOf("#/entry/")===0){
  const wrap=q(".wrap.entry",app);
  if(wrap&&!q(".hz-art",wrap)){
   const id=h.split("/")[2],en=(typeof ENTRIES!=="undefined")&&ENTRIES.find(x=>x.id===id);
   const k=en&&(en.areas||[]).find(a=>ART[a]);
   const back=q(".back",wrap);
   if(k)(back||wrap).insertAdjacentHTML(back?"afterend":"afterbegin",`<div class="hz-art" data-area="${k}">${art(k,"hz-svg hz-hero-ill")}<span class="hz-blob a"></span><span class="hz-blob b"></span></div>`);
   const acts=q(".actions",wrap);
   if(acts&&en&&(en.areas||[]).some(a=>["repro","mind","horm","energy","head"].indexOf(a)>-1)&&!q(".hz-breathebtn",acts))acts.insertAdjacentHTML("beforeend",`<a class="btn small ghost hz-breathebtn" href="#/breathe">Breathing exercise</a>`);
  }
 }
 else if(h.indexOf("#/area/")===0){
  const k=h.split("/")[2],h1=q("h1",app);
  if(h1&&ART[k]&&!q(".hz-art",app))h1.insertAdjacentHTML("beforebegin",`<div class="hz-art small" data-area="${k}">${art(k,"hz-svg hz-hero-ill")}<span class="hz-blob a"></span><span class="hz-blob b"></span></div>`);
 }
 else if(h.indexOf("#/track")===0){
  /* faces on mood chips */
  qa('.trk-chip[data-trk="mood"]',app).forEach(c=>{if(!q(".hz-face",c))c.insertAdjacentHTML("afterbegin",face(c.dataset.v,"hz-face sm"))});
  /* wheel above the log */
  const day=q(".trk-day",app);
  if(day&&!q("#hz-wheeltrack",app)){const card=day.closest(".trk-card");if(card)card.insertAdjacentHTML("beforebegin",`<div class="trk-card" id="hz-wheeltrack">${wheel(false)}</div>`)}
 }
 else if(h.indexOf("#/ask")===0&&pendingAsk){
  const ta=q("#askin",app),form=q("#askform",app);
  if(ta&&form){ta.value=pendingAsk;pendingAsk=null;setTimeout(()=>{try{form.requestSubmit?form.requestSubmit():form.dispatchEvent(new Event("submit",{cancelable:true,bubbles:true}))}catch(x){}},60)}
 }
 if(enterNext){const w=q(".wrap",app);if(w&&!reduced()){w.classList.remove("hz-enter");void w.offsetWidth;w.classList.add("hz-enter")}enterNext=false}
}
let pendingAsk=null,enterNext=false;

/* ---------- Events ---------- */
document.addEventListener("click",ev=>{
 const t=ev.target;if(!t.closest)return;
 const close=t.closest('[data-hz="close"]');
 const bodyEl=t.closest("[data-body]");
 if(bodyEl&&!t.closest(".hz-sheet")){buzz(8);bodySheet(bodyEl.dataset.body);return}
 const ask=t.closest("[data-ask]");
 if(ask){pendingAsk=ask.dataset.ask;closeSheet(true);if(hash().indexOf("#/ask")===0){run()}else location.hash="#/ask";return}
 const qb=t.closest("[data-q]");
 if(qb){const k=qb.dataset.q,v=k==="mood"?qb.dataset.v:+qb.dataset.v;const r=setToday(k,v,k==="mood");buzz(10);
  const sh=q(".hz-sheet");if(sh){qa("[data-q]",sh).forEach(b=>{const kk=b.dataset.q,vv=kk==="mood"?b.dataset.v:+b.dataset.v;b.setAttribute("aria-pressed",String(kk==="mood"?(r.mood||[]).indexOf(vv)>-1:r[kk]===vv))});qb.classList.remove("hz-pop");void qb.offsetWidth;qb.classList.add("hz-pop")}
  if(hash().indexOf("#/track")===0&&window.viewTrack){const y=window.scrollY;window.viewTrack();if(window.tabs)window.tabs();window.scrollTo(0,y)}
  else if(isHome()){const wh=q("#hz-wheelhome");if(wh)wh.remove();const bd=q("#hz-body");if(bd)bd.remove();run()}
  return}
 if(close){closeSheet();if(close.tagName!=="A")ev.preventDefault();return}
 const leg=t.closest(".hz-leg,.hz-arc");
 if(leg){const k=leg.dataset.phase,w=leg.closest(".hz-wheel");if(w&&PHASES[k]){qa(".hz-leg",w).forEach(b=>b.classList.toggle("on",b.dataset.phase===k));const p=q(".hz-phase",w);if(p)p.textContent=PHASES[k].t;buzz(6)}return}
 const lp=t.closest('[data-hz="log-period"]');
 if(lp){const T=loadT(),d=dkey(new Date()),r=T.log[d]||{};r.flow=3;T.log[d]=r;saveT(T);buzz(15);if(typeof toast==="function")toast("Logged: period started today");if(hash().indexOf("#/track")===0&&window.viewTrack){window.viewTrack();if(window.tabs)window.tabs()}else{const m=q("#main");if(m){const a=q("#hz-wheelhome");if(a)a.remove();const b=q("#hz-body");if(b)b.remove()}run()}return}
 /* breathing controls */
 const bp=t.closest("[data-bp]");if(bp){bState.p=bp.dataset.bp;qa("[data-bp]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.bp===bState.p)));return}
 const bm=t.closest("[data-bm]");if(bm){bState.min=+bm.dataset.bm;qa("[data-bm]").forEach(b=>b.setAttribute("aria-pressed",String(+b.dataset.bm===bState.min)));return}
 if(t.closest("#hz-bgo")){const go=q("#hz-bgo");if(bState.run){stopBreathe();go.textContent="Start";q("#hz-cue").textContent="Paused";return}bState.buzz=!!(q("#hz-bbuzz")||{}).checked;bState.run=true;bState.end=Date.now()+bState.min*60000;go.textContent="Stop";const ob=q("#hz-orb");if(ob&&ob.scrollIntoView)ob.scrollIntoView({behavior:reduced()?"auto":"smooth",block:"center"});stepBreathe(0);return}
 /* feedback on existing buttons */
 const sv=t.closest("#save,#have");if(sv){buzz(12);heart(sv)}
 if(t.closest(".trk-chip,.trk-seg,.opt,.stage"))buzz(6);
});
document.addEventListener("keydown",ev=>{
 if(ev.key==="Escape"&&q(".hz-sheetwrap")){closeSheet();return}
 if((ev.key==="Enter"||ev.key===" ")&&ev.target.closest&&ev.target.closest("g.hz-spot")){ev.preventDefault();bodySheet(ev.target.closest("g.hz-spot").dataset.body)}
});
function heart(btn){
 if(reduced())return;const r=btn.getBoundingClientRect();
 for(let i=0;i<5;i++){const h=document.createElement("span");h.className="hz-heart";h.textContent="♥";h.style.left=(r.left+r.width/2-8+(i-2)*10)+"px";h.style.top=(r.top-4)+"px";h.style.animationDelay=(i*60)+"ms";document.body.appendChild(h);setTimeout(()=>h.remove(),1100)}
}

/* ---------- Styles ---------- */
const css=document.createElement("style");
css.textContent=`:root{--hz-fill:#FFE1E9}
.hz-svg{width:100%;height:100%;color:var(--accent);display:block}
.hz-ic{width:20px;height:20px;color:var(--accent);flex:none;vertical-align:-4px;margin-right:6px;display:inline-block}
.chip .hz-ic{margin-right:6px}
.card b .hz-ic{width:22px;height:22px;margin-right:4px}
.hz-big{width:72px;height:72px;flex:none}
.hz-mid{width:52px;height:52px;flex:none}
.ribbon .stage .dot.hz-ill::before,.ribbon .stage .dot.hz-ill::after{display:none!important}
.ribbon .stage .dot.hz-ill{transform:none!important;width:48px;height:48px;border-radius:50%!important;background:var(--surface);border:2px solid var(--line);padding:7px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(208,53,106,.10)}
.ribbon .stage[aria-pressed="true"] .dot.hz-ill{border-color:var(--accent);background:var(--accent-soft)}
.hz-art{position:relative;height:150px;margin:6px 0 12px;border-radius:30px 30px 30px 10px;background:linear-gradient(150deg,var(--accent-soft),#FFF6F8 70%);display:flex;align-items:center;justify-content:center;overflow:hidden}
.hz-art.small{height:110px}
.hz-hero-ill{width:104px;height:104px;position:relative;z-index:1;--hz-fill:#FFFFFF;filter:drop-shadow(0 6px 14px rgba(208,53,106,.15))}
.hz-art.small .hz-hero-ill{width:76px;height:76px}
.hz-blob{position:absolute;border-radius:50%;opacity:.55}
.hz-blob.a{width:120px;height:120px;background:#FFD3DF;left:-30px;bottom:-40px}
.hz-blob.b{width:80px;height:80px;background:#D9EFE3;right:-18px;top:-22px}
.hz-wheel{display:grid;grid-template-columns:150px 1fr;gap:14px;align-items:center}
.hz-wheel.compact{grid-template-columns:120px 1fr}
.hz-ring{width:100%;height:auto;overflow:visible}
.hz-arc{cursor:pointer;transition:stroke-width .15s}
.hz-arc:hover{stroke-width:21}
.hz-w1{font:700 12px var(--body);fill:var(--muted);text-transform:uppercase;letter-spacing:.08em}
.hz-w2{font:700 34px var(--display);fill:var(--ink)}
.hz-wtxt{display:flex;flex-direction:column;gap:3px}
.hz-wtxt b{font-family:var(--display);font-size:20px}
.hz-legend{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:6px}
.hz-leg{display:inline-flex;align-items:center;gap:6px;border:1.5px solid var(--line);background:var(--surface);border-radius:999px;padding:7px 12px;font:700 13.5px var(--body);color:var(--ink);cursor:pointer;min-height:38px}
.hz-leg i{width:12px;height:12px;border-radius:50%;display:inline-block}
.hz-leg.on{border-color:var(--accent);background:var(--accent-soft)}
.hz-phase{grid-column:1/-1;margin:2px 0 0;background:var(--bg);border-radius:16px;padding:10px 12px;font-size:15px;line-height:1.5}
.hz-wheel .hz-small{grid-column:1/-1}
.hz-wheel.compact .hz-wtxt .hz-small,.hz-wheel.compact .btn{grid-column:auto}
.hz-wheel-empty{display:flex;gap:14px;align-items:center}
.hz-bodywrap{display:grid;grid-template-columns:minmax(120px,170px) 1fr;gap:12px;align-items:center}
.hz-bodysvg{width:100%;height:auto}
.hz-fig path,.hz-fig circle{fill:#FFE6EC;stroke:#E9B5C4;stroke-width:2}
.hz-spot{cursor:pointer;outline:none}
.hz-spot-ring{fill:rgba(208,53,106,.10);stroke:var(--accent);stroke-width:2;transform-box:fill-box;transform-origin:center}
.hz-spot-dot{fill:var(--accent)}
.hz-spot:hover .hz-spot-ring,.hz-spot:focus .hz-spot-ring{fill:rgba(208,53,106,.25)}
.hz-spot:focus .hz-spot-ring{stroke-width:3.5}
.hz-bodybtns{display:flex;flex-wrap:wrap;gap:7px}
.hz-bodybtns .chip,.hz-chips .chip{cursor:pointer;font:inherit;font-size:14px}
.hz-chips{display:flex;flex-wrap:wrap;gap:8px}
.hz-chips .chip[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
.hz-sheetwrap{position:fixed;inset:0;z-index:50}
.hz-scrim{position:absolute;inset:0;background:rgba(43,34,48,.35);opacity:0;transition:opacity .2s}
.hz-sheet{position:absolute;left:0;right:0;bottom:0;max-height:88vh;overflow:auto;background:var(--surface);border-radius:28px 28px 0 0;padding:10px 18px calc(22px + env(safe-area-inset-bottom,0px));box-shadow:0 -10px 30px rgba(43,34,48,.18);transform:translateY(100%);transition:transform .25s cubic-bezier(.2,.8,.2,1);max-width:640px;margin:0 auto}
.hz-sheetwrap.open .hz-scrim{opacity:1}
.hz-sheetwrap.open .hz-sheet{transform:none}
.hz-grab{width:42px;height:5px;border-radius:9px;background:var(--line);margin:0 auto 10px}
.hz-x{position:absolute;right:12px;top:10px;width:40px;height:40px;border-radius:50%;border:0;background:var(--bg);font-size:24px;line-height:1;color:var(--muted);cursor:pointer}
.hz-sheethead{display:flex;align-items:center;gap:10px;margin:0 0 6px}
.hz-sheethead h2{margin:0;font-size:22px}
.hz-urgent{background:var(--alert);color:var(--alert-ink);border:1px solid var(--alert-line);border-radius:14px;padding:10px 12px;font-size:14.5px;margin:12px 0 0}
.hz-faces{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.hz-facebtn{display:flex;flex-direction:column;align-items:center;gap:4px;border:1.5px solid transparent;background:none;border-radius:18px;padding:6px 2px;font:700 12px var(--body);color:var(--muted);cursor:pointer;min-height:44px}
.hz-facebtn .hz-face,.hz-facebtn .hz-drop{width:44px;height:44px;color:var(--ink)}
.hz-facebtn[aria-pressed="true"]{background:var(--accent-soft);border-color:var(--accent);color:var(--accent)}
.hz-facebtn[aria-pressed="true"] .hz-face{--hz-fill:#FFC7D6}
.hz-drop{color:var(--accent)!important}
.hz-pain{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.hz-pbtn{border:1.5px solid var(--line);background:var(--surface);border-radius:14px;padding:8px 2px;font:700 12px var(--body);color:var(--ink);display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;min-height:52px}
.hz-pbtn i{width:calc(8px + var(--n)*5px);height:6px;border-radius:9px;background:var(--accent);opacity:calc(.25 + var(--n)*.18)}
.hz-pbtn[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
.hz-pbtn[aria-pressed="true"] i{background:#fff;opacity:1}
.hz-sheetbtns{display:flex;gap:10px;margin-top:18px}
.hz-sheetbtns>*{flex:1;text-align:center}
.hz-fab{position:fixed;right:16px;bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:25;width:58px;height:58px;border-radius:50%;border:0;background:var(--accent);color:var(--accent-ink);box-shadow:0 10px 24px rgba(208,53,106,.35);display:flex;align-items:center;justify-content:center;cursor:pointer}
.hz-fab:active{transform:scale(.92)}
.trk-chip .hz-face.sm{width:22px;height:22px;vertical-align:-6px;margin-right:5px;color:var(--ink);display:inline-block}
.hz-orbbox{position:relative;height:260px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:18px 0 8px}
.hz-orb{width:200px;height:200px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFFFFF 0,#FFD3DF 45%,var(--accent) 100%);opacity:.85;transform:scale(.55);transition:transform 4s ease-in-out;box-shadow:0 0 0 18px rgba(208,53,106,.08),0 0 0 40px rgba(143,205,176,.10)}
.hz-cue{position:absolute;font:700 20px var(--display);color:var(--ink);text-align:center;padding:0 20px;text-shadow:0 1px 8px #fff}
#hz-left{position:absolute;bottom:0}
#hz-bp .opt{text-align:left}
.hz-breathebtn,.hz-wheel a.btn,.hz-sheetbtns a.btn,#hz-foryou a.btn{text-decoration:none}
.hz-heart{position:fixed;z-index:60;color:var(--accent);font-size:18px;pointer-events:none;animation:hzHeart 1s ease-out forwards}
@keyframes hzHeart{0%{transform:translateY(0) scale(.6);opacity:0}20%{opacity:1}100%{transform:translateY(-60px) scale(1.2);opacity:0}}
@media (prefers-reduced-motion:no-preference){
 .hz-enter{animation:hzIn .28s ease both}
 @keyframes hzIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
 .btn,.chip,.opt,.card,.row,.tab,.trk-chip,.trk-seg,.stage,.hz-facebtn,.hz-pbtn,.hz-leg{transition:transform .12s ease,box-shadow .15s ease,background-color .15s ease,border-color .15s ease}
 .btn:active,.chip:active,.opt:active,.card:active,.row:active,.tab:active,.trk-chip:active,.trk-seg:active,.stage:active,.hz-facebtn:active,.hz-pbtn:active,.hz-leg:active{transform:scale(.96)}
 .card:hover,.row:hover{transform:translateY(-2px)}
 .hz-pop{animation:hzPop .4s ease}
 @keyframes hzPop{0%{transform:scale(1)}40%{transform:scale(1.12)}100%{transform:scale(1)}}
 .hz-spot-ring{animation:hzPulse 2.4s ease-in-out infinite}
 @keyframes hzPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
 .hz-fab{animation:hzIn .35s ease both}
 .hz-today{animation:hzToday 2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
 @keyframes hzToday{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
}
@media (prefers-reduced-motion:reduce){.hz-orb{transition:none!important;transform:scale(.8)!important}.hz-sheet,.hz-scrim{transition:none}}
@media (max-width:420px){.hz-wheel{grid-template-columns:120px 1fr}.hz-bodywrap{grid-template-columns:120px 1fr}.hz-art{height:130px}}`;
document.head.appendChild(css);

/* ---------- Wiring ---------- */
let busy=false;
function run(){if(busy)return;busy=true;try{decorate()}catch(x){if(window.__hzDebug)console.error(x)}finally{busy=false;try{obs.takeRecords()}catch(x){}}}
const obs=new MutationObserver(run);
obs.observe(q("#app"),{childList:true,subtree:true});
window.addEventListener("hashchange",()=>{enterNext=true;closeSheet(true);if(hash().indexOf("#/breathe")!==0)stopBreathe();setTimeout(run,0)});
run();
})();
