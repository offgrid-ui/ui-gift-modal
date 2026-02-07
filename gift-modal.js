(()=>{async function a(a){const b=new URLSearchParams;b.set("search_username",a);const c=await fetch("/search?mode=searchuser",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},body:b.toString(),credentials:"same-origin"}),d=await c.text(),e=new DOMParser().parseFromString(d,"text/html"),f=e.querySelector("select[name=\"username_list\"]");if(!f)return[];const g=Array.from(f.querySelectorAll("option")).map(a=>(a.value||a.textContent||"").trim()).filter(Boolean);return[...new Set(g)]}async function b(b){if(i.has(b))return i.get(b);const c=`/memberlist?username=${encodeURIComponent(b)}&mode=username&order=ASC`,d=await fetch(c,{credentials:"same-origin"}),e=await d.text(),f=new DOMParser().parseFromString(e,"text/html");let g="";const h=f.querySelector("#memberlist");if(h){const a=Array.from(h.querySelectorAll("td.avatar-mini a[href^=\"/u\"]")),c=a=>(a||"").replace(/\s+/g," ").trim(),d=a.find(d=>c(d.textContent)===c(b));if(d&&(g=d.getAttribute("href")||""),!g){const d=c(b).toLowerCase(),e=a.find(b=>c(b.textContent).toLowerCase().includes(d));e&&(g=e.getAttribute("href")||"")}}g||(g=`/u?username=${encodeURIComponent(b)}`);const j=g.startsWith("http")?g:location.origin+g;return i.set(b,j),j}function c(a,{title:b="Aviso",okText:c="Aceptar"}={}){const d=document.createElement("div");d.className="gift-modal gift-modal--alert",d.innerHTML=`
      <div class="gift-modal__backdrop" data-close="1"></div>
      <div class="gift-modal__box" role="dialog" aria-modal="true">
        <h2 class="gift-modal__title">${t(b)}</h2>
        <div class="gift-modal__hint gift-modal__msg">${t(a)}</div>

        <div class="gift-modal__actions">
          <button type="button" class="gift-modal__btn gift-modal__ok">${t(c)}</button>
        </div>
      </div>
    `,document.body.appendChild(d);const g=()=>d.remove(),h=a=>{("Escape"===a.key||"Enter"===a.key)&&(document.removeEventListener("keydown",h),g())};document.addEventListener("keydown",h),d.addEventListener("click",a=>{a.target?.dataset?.close&&(document.removeEventListener("keydown",h),g())}),f(".gift-modal__ok",d).addEventListener("click",()=>{document.removeEventListener("keydown",h),g()}),f(".gift-modal__ok",d)?.focus()}function d(d){const e=document.createElement("div");e.className="gift-modal",e.innerHTML=`
      <div class="gift-modal__backdrop" data-close="1"></div>
      <div class="gift-modal__box" role="dialog" aria-modal="true">
        <h2 class="gift-modal__title">Regalar a…</h2>

        <label class="gift-modal__label">Usuario</label>
        <input class="gift-modal__input" type="text" placeholder="Escribe el usuario (ej: Dream)" />
        <div class="gift-modal__suggest"></div>

        <div class="gift-modal__actions">
          <button type="button" class="gift-modal__btn" data-close="1">Cancelar</button>
          <button type="button" class="gift-modal__btn gift-modal__ok">Seleccionar</button>
        </div>
      </div>
    `,document.body.appendChild(e);const g=f(".gift-modal__input",e),h=f(".gift-modal__suggest",e);let i="",j=null;const k=()=>e.remove(),l=a=>{"Escape"===a.key&&(document.removeEventListener("keydown",l),k())};document.addEventListener("keydown",l),e.addEventListener("click",a=>{a.target?.dataset?.close&&k()}),h.addEventListener("click",a=>{const c=a.target.closest(".gift-modal__pill");c&&(i=c.dataset.u||"",g.value=i,h.innerHTML="")}),g.addEventListener("input",()=>{i="",h.innerHTML="";const b=g.value.trim();2>b.length||(clearTimeout(j),j=setTimeout(async()=>{try{const c=await a(b);if(!c.length)return void(h.innerHTML=`<div class="gift-modal__hint">Sin coincidencias.</div>`);h.innerHTML=c.slice(0,10).map(a=>`<button type="button" class="gift-modal__pill" data-u="${v(a)}">${t(a)}</button>`).join("")}catch{h.innerHTML=`<div class="gift-modal__hint">Error buscando usuarios.</div>`}},250))}),f(".gift-modal__ok",e).addEventListener("click",async()=>{const a=g.value.trim(),e=i||a;if(!e)return c("Elige un usuario.",{title:"Falta un dato"});const f=await b(e);d({name:e,url:f}),document.removeEventListener("keydown",l),k()}),g?.focus()}function e({itemName:a,recipientName:b},c){const d=document.createElement("div");d.className="gift-modal",d.innerHTML=`
      <div class="gift-modal__backdrop" data-close="1"></div>
      <div class="gift-modal__box" role="dialog" aria-modal="true">
        <h2 class="gift-modal__title">Añadir regalo</h2>

        <div class="gift-modal__hint">
          <b>Regalo:</b>\u00A0 ${t(a)}<br>
          <b>Para:</b>\u00A0 ${t(b)}
        </div>

        <label class="gift-modal__label">Mensaje / Leyenda</label>
        <textarea class="gift-modal__textarea" rows="4" placeholder="Dedícale algo..."></textarea>

        <label class="gift-modal__check">
          <input type="checkbox" class="gift-modal__cb">
          Usar esta leyenda para los próximos regalos
        </label>

        <div class="gift-modal__actions">
          <button type="button" class="gift-modal__btn" data-close="1">Cancelar</button>
          <button type="button" class="gift-modal__btn gift-modal__ok">Añadir</button>
        </div>
      </div>
    `,document.body.appendChild(d);const e=f(".gift-modal__textarea",d),g=f(".gift-modal__cb",d);e&&(e.value=l?k||"":""),g&&(g.checked=l);const h=()=>d.remove(),i=a=>{"Escape"===a.key&&(document.removeEventListener("keydown",i),h())};document.addEventListener("keydown",i),d.addEventListener("click",a=>{a.target?.dataset?.close&&h()}),f(".gift-modal__ok",d).addEventListener("click",()=>{const a=(e?.value||"").trim();l=!!g?.checked,a&&(k=a),c({note:a}),document.removeEventListener("keydown",i),h()}),e?.focus()}const f=(a,b=document)=>b.querySelector(a),g=a=>(+a).toFixed(2),h=a=>+(a+"").replace(/[^\d.,]/g,"").replace(",",".")||0,i=new Map;let j=null,k="",l=!1;const m=()=>f("#quick_reply")||document.querySelector("form[action*=\"/post\"]"),n=(a,b)=>{const c=f("#text_editor_textarea")||a.querySelector("textarea[name=\"message\"]"),d=a.querySelector(".sceditor-container textarea");c&&(c.value=b),d&&(d.value=b)},o=a=>{const b=new Map;for(const c of a){const a=c.recipientName||"Sin destinatario";b.has(a)||b.set(a,[]),b.get(a).push(c)}return b},p=a=>{const b=o(a),c=[];for(const[d,e]of b.entries()){const a=e[0]?.recipientUrl||"",b=a?`[url=${a}]${d}[/url]`:d;c.push(`[b]Para quien:[/b]\u00A0 ${b}`),c.push("");for(const a of e)c.push(`[b]Regalo:[/b]\u00A0 ${a.name} \u00A0(${a.priceTxt})`),c.push(`[b]Leyenda:[/b]\u00A0 ${a.note||"-"}`),c.push("");c.push("")}return c.join("\n").trim()},q=a=>{const b=a.closest(".grid-tienda");if(!b)return{name:"Sin zona",icon:""};let c=b.previousElementSibling;for(;c&&!c.classList.contains("titulo-zona");)c=c.previousElementSibling;if(!c)return{name:"Sin zona",icon:""};const d=Array.from(c.childNodes).filter(a=>a.nodeType===Node.TEXT_NODE).map(a=>a.textContent).join("").trim()||c.textContent.trim()||"Sin zona",e=c.querySelector("i, svg");return{name:d,icon:e?e.outerHTML:""}},r=a=>{const b=a.closest(".item"),c=b?f("h3",b):null,d=c?f(".precio",c):null,e=(d?.textContent||"").trim(),i=q(a),j=c?(c.childNodes[0]?.textContent||c.textContent).trim()||"Sin nombre":"Sin nombre",k=h(e);return{name:j,price:k,priceTxt:e||`$${g(k)}`,zone:i.name,zoneIcon:i.icon}},t=a=>(a+"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("'","&#039;"),v=a=>t(a).replaceAll("`","&#096;"),w=()=>{const a=document.querySelector(".zona-tienda");if(!a)return;if(document.querySelector(".pedido-wrap"))return;const b=document.createElement("div");b.className="pedido-wrap",b.innerHTML=`
      <input id="pedido-toggle" class="pedido-check" type="checkbox">

      <label class="pedido-toggle" for="pedido-toggle">
        <i class="fa-solid fa-gift"></i>
        <span>Regalos</span>
      </label>

      <aside class="pedido-panel">
        <div class="pedido-head">
          <h1 class="pedido-title">Tus regalos</h1>
        </div>

        <div class="pedido-recipient">
          <div class="pedido-recipient__label">Regalando a:</div>
          <div class="pedido-recipient__value"><i>Nadie</i></div>
          <div class="pedido-recipient__actions">
            <button type="button" class="pedido-recipient__btn pedido-recipient__change">Cambiar</button>
            <button type="button" class="pedido-recipient__btn pedido-recipient__clear">Quitar</button>
          </div>
        </div>

        <div class="pedido-list"><i>Vacío</i></div>

        <div class="pedido-actions">
          <button type="button" class="pedido-send">Enviar</button>
          <button type="button" class="pedido-clear">Vaciar</button>
          <button type="button" class="pedido-note-reset" hidden>Quitar leyenda automática</button>
        </div>

        <div class="pedido-mini">
          Pulsa\u00A0“Adquirir”\u00A0para\u00A0añadir.
        </div>
      </aside>
    `,document.body.appendChild(b);const g=[],h=f(".pedido-list",b),i=f(".pedido-recipient__value",b),q=f(".pedido-note-reset",b),s=()=>{if(q){const a=!!k||!!l;q.hidden=!a}},u=()=>i?j?void(i.innerHTML=`<a href="${v(j.url)}" target="_blank" rel="noopener">${t(j.name)}</a>`):void(i.innerHTML="<i>Nadie</i>"):void 0,w=()=>{if(!h)return;if(!g.length)return h.innerHTML="<i>Vac\xEDo</i>",void s();const a=o(g),b=[];for(const[c,d]of a.entries()){const a=d[0]?.recipientUrl||"",e=a?`<a href="${v(a)}" target="_blank" rel="noopener">${t(c)}</a>`:t(c);b.push(`<div class="pedido-zone"><span>${e}</span></div>`),b.push(d.map(a=>{const b=g.indexOf(a);return`
                <div class="pedido-item" data-idx="${b}">
                  — ${t(a.name)}<small>\u00A0 (${t(a.priceTxt)})</small><br>
                  <small>${t(a.note||"-")}</small>
                  <button type="button" class="pedido-del" data-idx="${b}">✕</button>
                </div>
              `}).join("")),b.push("<hr>")}b.pop(),h.innerHTML=b.join(""),s()};f(".pedido-recipient__change",b)?.addEventListener("click",()=>{d(a=>{j&&j.name===a.name||(l=!1,k="",s()),j=a,u()})}),f(".pedido-recipient__clear",b)?.addEventListener("click",()=>{j=null,u(),l=!1,k="",s()}),q?.addEventListener("click",()=>{l=!1,k="",s(),c("Listo: se quit\xF3 la leyenda autom\xE1tica.",{title:"Hecho"})}),a.addEventListener("click",a=>{const c=a.target.closest("button[id^='item-']");if(!c)return;const b=r(c),f=a=>j?a(j):void d(b=>{j=b,u(),a(b)});f(a=>l&&k?(g.push({...b,recipientName:a.name,recipientUrl:a.url,note:k}),void w()):void e({itemName:b.name,recipientName:a.name},({note:c})=>{g.push({...b,recipientName:a.name,recipientUrl:a.url,note:c}),w()}))}),h?.addEventListener("click",a=>{const b=a.target.closest(".pedido-del");if(b){const a=+b.dataset.idx;Number.isFinite(a)&&(g.splice(a,1),w())}}),f(".pedido-clear",b)?.addEventListener("click",()=>{g.length=0,w()}),f(".pedido-send",b)?.addEventListener("click",()=>{const a=m();return a?g.length?void(n(a,p(g)),a.submit()):c("Lista vac\xEDa.",{title:"Aviso"}):c("No encuentro el formulario para enviar.",{title:"Error"})}),u(),w(),s()};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",w):w()})();