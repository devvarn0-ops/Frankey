const KEY='zxkai_demo_result';
const fileInput=document.getElementById('script');
if(fileInput){
  const drop=document.getElementById('drop'), name=document.getElementById('fileName');
  drop.addEventListener('click',()=>fileInput.click());
  fileInput.addEventListener('change',()=>{name.textContent=fileInput.files[0]?.name||'Upload Script File'});
  document.getElementById('go').addEventListener('click',async()=>{
    const file=fileInput.files[0];
    if(!file){alert('Please choose a script/config file.');return;}
    const text=await file.text();
    const matches=text.match(/(?<!\d)(?:\+?\d[\d\s().-]{7,}\d)(?!\d)/g)||[];
    const nums=[...new Set(matches.map(x=>x.trim()).filter(x=>{const d=x.replace(/\D/g,'');return d.length>=8&&d.length<=15;}))];
    sessionStorage.setItem(KEY,JSON.stringify({filename:file.name,numbers:nums}));
    location.href='/result.html';
  });
}
if(document.getElementById('numbersList')){
  const data=JSON.parse(sessionStorage.getItem(KEY)||'{}');
  document.getElementById('filename').textContent=data.filename||'Uploaded script';
  const nums=data.numbers||[];
  document.getElementById('count').textContent=nums.length+' number(s) found';
  const list=document.getElementById('numbersList');
  if(!nums.length) list.innerHTML='<div class="device"><p>No phone-like numbers were found in the uploaded file.</p></div>';
  nums.forEach((n,i)=>{
    const el=document.createElement('div');el.className='number-card';
    el.innerHTML='<div><small>NUMBER #'+(i+1)+'</small><b></b></div><button>Copy</button>';
    el.querySelector('b').textContent=n;
    el.querySelector('button').onclick=async()=>{try{await navigator.clipboard.writeText(n);el.querySelector('button').textContent='Copied'}catch{alert(n)}};
    list.appendChild(el);
  });
}
