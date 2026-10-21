/* Videos de YouTube livianos: en lugar de cargar el reproductor completo (cerca de 1 MB por video)
   se muestra la miniatura. El reproductor se carga solo cuando alguien hace clic. */
(function(){
 'use strict';
 var ID=/youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/;
 function facade(frame){
  if(frame.dataset.lite)return;
  var m=ID.exec(frame.getAttribute('src')||'');
  if(!m)return;
  var b=document.createElement('button');
  b.type='button';b.className='yt-lite';
  b.dataset.src=frame.getAttribute('src');
  b.dataset.title=frame.title||'Video';
  b.setAttribute('aria-label','Reproducir: '+(frame.title||'video'));
  b.style.backgroundImage='url(https://i.ytimg.com/vi/'+m[1]+'/hqdefault.jpg)';
  var t=document.createElement('span');t.textContent=frame.title||'';b.append(t);
  frame.replaceWith(b);
 }
 function scan(root){(root.querySelectorAll?root:document).querySelectorAll('iframe[src*="youtube"]').forEach(facade);}
 document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('.yt-lite');
  if(!b)return;
  var f=document.createElement('iframe');
  f.className='yt-frame';f.dataset.lite='1';
  f.src=b.dataset.src+(b.dataset.src.indexOf('?')<0?'?':'&')+'autoplay=1';
  f.title=b.dataset.title;
  f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  f.referrerPolicy='strict-origin-when-cross-origin';
  f.allowFullscreen=true;
  b.replaceWith(f);f.focus();
 });
 function start(){
  scan(document);
  // Las páginas que dibujan contenido con JavaScript (Estadística) también reciben la versión liviana.
  new MutationObserver(function(list){for(var i=0;i<list.length;i++)for(var n of list[i].addedNodes)if(n.nodeType===1)scan(n.tagName==='IFRAME'?n.parentNode:n);}).observe(document.body,{childList:true,subtree:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
