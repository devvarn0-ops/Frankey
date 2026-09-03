const view = document.getElementById("app-view");
const toast = document.getElementById("toast");

const devices = [
  ["ffbabf5d6d5ea4e","Offline","41%"],
  ["ff18b5c228d9ae76","Online","46%"],
  ["fe916b6df3610171","Offline","44%"],
  ["fe589fd08f4dabe5","Offline","70%"],
  ["fcc4004a73b3bb3f","Offline","36%"]
];

function notify(msg){
  toast.textContent = msg; toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2200);
}
function setClock(){
  const d=new Date(); document.getElementById("clock").textContent=d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",hour12:false});
}
setClock(); setInterval(setClock,1000);

function landing(){
  view.innerHTML = `
  <section class="hero">
    <div class="shield">♢</div>
    <div class="logo"><span class="z">Z</span>XKAI</div>
    <div class="subtitle">Device Management Console</div>
    <div class="panel saved">
      <div class="panel-head"><div class="panel-title">⌁ &nbsp; Saved Accounts</div><div class="count">0 accounts</div></div>
      <div class="empty"><div class="wifi">⌁</div><p>No saved accounts</p></div>
      <button class="new-account" onclick="accountModal()">＋ &nbsp; New Account</button>
    </div>
    <div class="footer">ZXKAI Admin Console · v2.1</div>
  </section>`;
}
function accountModal(){
  const wrap=document.createElement("div"); wrap.className="modal-backdrop"; wrap.id="modal";
  wrap.innerHTML=`
  <div class="modal">
    <h2><button class="back" onclick="closeModal()">‹</button> New Firebase Account</h2>
    <label class="section-label">EXTRACT FROM APK (OPTIONAL)</label>
    <div class="upload" onclick="notify('APK extraction is demo-only in this static build.')">
      <div><div class="upload-icon">⇧</div><strong>Upload APK File</strong><span>Auto-extracts Firebase URL &amp; API Key</span></div>
    </div>
    <label class="section-label">FRIENDLY LABEL (OPTIONAL)</label>
    <input class="input" id="friendly" placeholder="e.g. My Project — shown instead of">
    <p class="help">Real database URL is never exposed in share links or the saved list.</p>
    <label class="section-label">FIREBASE DATABASE URL</label>
    <input class="input" id="dburl" placeholder="https://your-project.firebas...">
    <label class="section-label">AUTHENTICATION KEY / SECRET</label>
    <input class="input" id="secret" type="password" placeholder="Your Firebase secret key">
    <div class="modal-actions"><button class="primary" onclick="saveAccount()">ϟ &nbsp; Save &amp; Connect</button><button class="secondary" onclick="closeModal()">Cancel</button></div>
  </div>`;
  document.body.appendChild(wrap);
}
function closeModal(){document.getElementById("modal")?.remove()}
function saveAccount(){
  const label=document.getElementById("friendly").value.trim() || "My Firebase Account";
  closeModal(); notify(label+" connected (demo)");
  dashboard();
}
function card(d){
  const online=d[1]==="Online";
  return `<article class="device ${online?"online":""}" onclick="detail('${d[0]}')">
    <div class="device-head"><div class="device-icon">⌁</div><div><div class="device-name">${d[0]}</div><div class="device-id">${d[0]}</div></div><div class="dots">⋮</div></div>
    <div class="device-info"><div><div class="label">ANDROID</div><div class="value">—</div></div><div><div class="label">BATTERY</div><div class="value battery">▰ &nbsp;${d[2]}</div></div><div><div class="label">NUMBER</div><div class="value">—</div></div></div>
    <div class="${online?"online-dot":"offline-dot"}">● &nbsp;${d[1]}</div>
  </article>`;
}
function dashboard(){
  view.innerHTML=`
  <section class="dashboard">
    <div class="stats"><div class="stat"><small>Total</small><strong>535</strong></div><div class="stat"><small>Online</small><strong class="green">81</strong></div><div class="stat"><small>Offline</small><strong>454</strong></div><div class="stat"><small>Bank SMS</small><strong class="green">0</strong></div></div>
    <div class="filters"><button class="filter active">All</button><button class="filter">Online</button><button class="filter">Offline</button><button class="filter">Upi</button><button class="filter">Bank</button><select class="sort"><option>Newest</option><option>Oldest</option></select><button class="sort" onclick="notify('Refreshed')">⟳</button></div>
    <div style="color:#666;margin:12px 0 18px">◌ Loading SMS data...</div>
    <div class="device-grid">${devices.map(card).join("")}</div>
  </section>`;
}
function detail(id){
  const d=devices.find(x=>x[0]===id)||devices[1];
  view.innerHTML=`
  <div class="detail-wrap">
    <div class="blur-list">${devices.map(card).join("")}</div>
    <aside class="detail">
      <div class="detail-head"><div class="device-icon ${d[1]==="Online"?"":"offline"}">⌁</div><div><b>${d[0]}</b><div class="device-id">${d[0]}</div></div><button class="detail-close icon-btn" onclick="dashboard()">×</button></div>
      <div class="detail-status"><span class="${d[1]==="Online"?"green":""}">● ${d[1]}</span>&nbsp;&nbsp; Bat <b>${d[2]}</b></div>
      <div class="tabs"><button class="tab active">Info</button><button class="tab">Bank (0)</button><button class="tab">SMS (0)</button><button class="tab">Send</button></div>
      <div class="detail-content"><div class="label" style="margin-bottom:12px">DEVICE</div>
      ${["Phone Number","Network","Android","IP Address","Storage","CPU Arch","SDK Version"].map(x=>`<div class="detail-row"><span>${x}</span><b>—</b></div>`).join("")}
      <div class="detail-row"><span>SIM Cards</span><b>0 SIM(s)</b></div></div>
    </aside>
  </div>`;
}
landing();
window.accountModal=accountModal; window.closeModal=closeModal; window.saveAccount=saveAccount; window.dashboard=dashboard; window.detail=detail; window.notify=notify;
