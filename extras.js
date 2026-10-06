/* Her A–Z: calendar reminders, home nudges, install help and offline support. Loaded after personal.js. Everything stays on this device. */
(function(){
"use strict";
const KEY="hz_rem";
let rem=(function(){let v=null;try{v=store.get(KEY)}catch(e){}return v&&typeof v==="object"?v:{}})();
const saveRem=()=>{try{store.set(KEY,rem)}catch(e){}};

/* ---------- Offline + install ---------- */
if("serviceWorker" in navigator&&location.protocol==="https:"){
 window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})});
}
let deferred=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;run()});
window.addEventListener("appinstalled",()=>{deferred=null;toast("Installed")});
const standalone=()=>(window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone===true;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);

/* ---------- Dates and prediction from the Track log ---------- */
const DAY=86400000;
const pad=n=>(n<10?"0":"")+n;
const key=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const toN=s=>{const p=s.split("-");return Date.UTC(+p[0],+p[1]-1,+p[2])/DAY};
const fromN=n=>{const d=new Date(n*DAY);return new Date(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())};
const fmt=d=>d.toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"});
function track(){let T=null;try{T=store.get("hz_track")}catch(e){}return T&&T.log?T:{log:{}}}
function predict(){
 const L=track().log,days=Object.keys(L).sort();
 const isP=d=>(L[d].flow||0)>=2;
 const starts=[];let prev=null;days.filter(isP).forEach(d=>{if(prev===null||toN(d)-toN(prev)>3)starts.push(d);prev=d});
 if(starts.length<3)return null;
 const lens=[];for(let i=1;i<starts.length;i++)lens.push(toN(starts[i])-toN(starts[i-1]));
 const good=lens.filter(l=>l>=15&&l<=90);if(good.length<2)return null;
 const avg=Math.round(good.reduce((a,b)=>a+b,0)/good.length);
 const next=toN(starts[starts.length-1])+avg;
 const now=new Date(),today=toN(key(now));
 return {date:fromN(next),diff:next-today,avg:avg};
}
const loggedToday=()=>!!track().log[key(new Date())];

/* ---------- Calendar files (.ics): real reminders, even when the app is closed ---------- */
const ics=s=>String(s).replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g," ");
const stamp=d=>d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+"T"+pad(d.getHours())+pad(d.getMinutes())+"00";
function download(name,body){
 const blob=new Blob([body],{type:"text/calendar;charset=utf-8"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();
 setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);
}
function event(label,start,minutes,repeat,alarmBefore){
 const uid=Date.now()+"-"+Math.floor(Math.random()*1e6)+"@her-a-z";
 const utc=new Date().toISOString().replace(/[-:]|\.\d{3}/g,"");
 return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Her A-Z//Reminders//EN","CALSCALE:GREGORIAN","BEGIN:VEVENT","UID:"+uid,"DTSTAMP:"+utc,"DTSTART:"+stamp(start),"DURATION:PT"+minutes+"M"].concat(repeat?["RRULE:"+repeat]:[],["SUMMARY:"+ics(label),"DESCRIPTION:"+ics("Added from Her A-Z. Everything stays on your device."),"BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:"+ics(label),"TRIGGER:-PT"+(alarmBefore||0)+"M","END:VALARM","END:VEVENT","END:VCALENDAR"]).join("\r\n")+"\r\n";
}
function labelVal(){const el=document.querySelector("#hz-rlabel");const v=(el&&el.value||"").trim();return v||"Reminder"}
function dailyReminder(){
 const t=(document.querySelector("#hz-rtime")||{}).value||"08:00";const hm=t.split(":");
 const now=new Date(),start=new Date(now.getFullYear(),now.getMonth(),now.getDate(),+hm[0],+hm[1],0);
 if(start<=now)start.setDate(start.getDate()+1);
 download("her-a-z-daily-reminder.ics",event(labelVal(),start,10,"FREQ=DAILY",0));
 toast("Open the file to add it to your calendar");
}
function periodReminder(){
 const p=predict();const out=document.querySelector("#hz-rmsg");
 if(!p){if(out)out.textContent="Log at least three periods in Track first, then I can estimate your next one.";return}
 const start=new Date(p.date.getFullYear(),p.date.getMonth(),p.date.getDate()-2,9,0,0);
 if(start<=new Date()){if(out)out.textContent="Your next estimated date ("+fmt(p.date)+") is too close for a reminder. Log your latest period and try again after it starts.";return}
 download("her-a-z-period-reminder.ics",event(labelVal(),start,30,"",0));
 if(out)out.textContent="Added a reminder for "+fmt(start)+", two days before your estimated "+fmt(p.date)+". Cycles vary, so treat it as a guide.";
}

/* ---------- Me tab card ---------- */
function installBlock(){
 if(standalone())return `<p class="hz-small">You are using the installed app.</p>`;
 if(deferred)return `<button class="btn" id="hz-install" type="button">Install on this device</button>`;
 if(isIOS())return `<p class="hz-small"><b>Install on iPhone or iPad:</b> tap the Share button, then "Add to Home Screen".</p>`;
 return `<p class="hz-small"><b>Install:</b> use your browser menu and choose "Install app" or "Add to Home screen". Once installed, the guides open even without signal.</p>`;
}
function remCard(){
 return `<section id="hz-rem" class="hz-box"><h2>Reminders and app</h2>
  <label class="hz-l" for="hz-rlabel" style="margin-top:4px">Reminder name</label>
  <input class="search" id="hz-rlabel" maxlength="40" value="Reminder" autocomplete="off" aria-describedby="hz-rhint">
  <p class="hz-small" id="hz-rhint" style="margin:6px 0 0">This is what shows on your calendar. Keep it discreet if you share your phone or calendar.</p>
  <label class="hz-l" for="hz-rtime">Daily reminder (for example a pill or medicine)</label>
  <input class="search" type="time" id="hz-rtime" value="08:00">
  <button class="btn" id="hz-rdaily" type="button" style="margin-top:10px">Add daily reminder to my calendar</button>
  <div class="hz-l">Before my next period</div>
  <button class="btn" id="hz-rperiod" type="button">Add a reminder before my next period</button>
  <p class="hz-small" id="hz-rmsg" role="status" style="margin:8px 0 0"></p>
  <label class="hz-toggle" style="margin-top:14px"><input type="checkbox" id="hz-rnudge" ${rem.nudge?"checked":""}><span>Nudge me on Home when I have not logged today</span></label>
  <div class="hz-l">Use it like an app</div><div id="hz-instbox">${installBlock()}</div>
  <p class="hz-small">Calendar reminders are made on your device and work when the app is closed. Nothing is sent to us.</p></section>`;
}
document.addEventListener("click",e=>{
 const b=e.target.closest&&e.target.closest("#hz-rem button");if(!b)return;
 if(b.id==="hz-rdaily")dailyReminder();
 else if(b.id==="hz-rperiod")periodReminder();
 else if(b.id==="hz-install"&&deferred){deferred.prompt();deferred.userChoice.finally(()=>{deferred=null;run()})}
});
document.addEventListener("change",e=>{if(e.target&&e.target.id==="hz-rnudge"){rem.nudge=e.target.checked;saveRem();toast(rem.nudge?"Nudge on":"Nudge off")}});

/* ---------- Home banners ---------- */
function banners(){
 const out=[];const p=predict();
 if(p){
  if(p.diff>=0&&p.diff<=4)out.push(`Your next period is estimated around <b>${esc(fmt(p.date))}</b>${p.diff===0?" (today)":p.diff===1?" (tomorrow)":""}.`);
  else if(p.diff<0&&p.diff>=-7)out.push(`Your period was estimated around <b>${esc(fmt(p.date))}</b>. Cycles vary, so log it when it starts and Track will adjust.`);
 }
 if(rem.nudge&&!loggedToday())out.push(`You have not logged today. <a href="#/track">Log it in 10 seconds</a>`);
 return out;
}
function decorate(){
 const app=document.querySelector("#app");if(!app||typeof profile==="undefined")return;
 const h=location.hash||"";
 if((h===""||h==="#/"||h==="#")&&profile){
  const hero=app.querySelector(".hero");
  if(hero&&!app.querySelector("#hz-bnr")){const b=banners();if(b.length)hero.insertAdjacentHTML("afterend",`<div id="hz-bnr" class="hz-box" style="margin-top:10px">${b.map(x=>`<p style="margin:4px 0">${x}</p>`).join("")}</div>`)}
 }else if(h.indexOf("#/me")===0){
  const h1=app.querySelector("h1");
  if(h1&&/Your profile/.test(h1.textContent)){
   const old=app.querySelector("#hz-rem");
   if(!old){const after=app.querySelector("#hz-mine")||app.querySelector(".privacy")||h1;after.insertAdjacentHTML("afterend",remCard())}
   else{const bx=old.querySelector("#hz-instbox");const nb=installBlock();if(bx&&bx.innerHTML!==nb)bx.innerHTML=nb}
  }
 }
}
let busy=false;
function run(){if(busy)return;busy=true;try{decorate()}catch(e){}finally{busy=false;try{obs.takeRecords()}catch(e){}}}
const obs=new MutationObserver(run);
obs.observe(document.querySelector("#app"),{childList:true,subtree:true});
if(store.clearAll){const _c=store.clearAll;store.clearAll=function(){_c.call(store);try{localStorage.removeItem(KEY)}catch(e){}rem={}}}
run();
})();
