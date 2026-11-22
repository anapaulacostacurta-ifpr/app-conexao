import {safeLink} from './spark-model.js';
export const MATERIAL_TYPES=[['auto','Detectar automaticamente'],['video','Vídeo'],['image','Imagem'],['pdf','PDF'],['link','Somente link']];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hosts=(host,allowed)=>allowed.includes(host);
export function materialSource(material){
 const original=safeLink(material.url),u=new URL(original),host=u.hostname.toLowerCase(),path=u.pathname;
 const requested=MATERIAL_TYPES.some(([v])=>v===material.type)?material.type:'auto';
 if(requested==='link')return {kind:'link',original};
 let embed='',provider='',inferred='';
 if(hosts(host,['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com','youtu.be'])){
  const v=host==='youtu.be'?path.split('/')[1]:u.searchParams.get('v')||path.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1];
  if(v&&/^[\w-]{11}$/.test(v)){embed=`https://www.youtube-nocookie.com/embed/${v}`;provider='YouTube';inferred='video';}
 }else if(hosts(host,['vimeo.com','www.vimeo.com','player.vimeo.com'])){
  const match=path.match(/^\/(?:video\/)?(\d+)(?:\/([\w]+))?\/?$/);if(match){embed=`https://player.vimeo.com/video/${match[1]}`;const hash=u.searchParams.get('h')||match[2];if(hash&&/^[\w]+$/.test(hash))embed+='?h='+encodeURIComponent(hash);provider='Vimeo';inferred='video';}
 }else if(host==='drive.google.com'){
  const driveId=path.match(/^\/file\/d\/([\w-]+)/)?.[1]||u.searchParams.get('id');
  if(driveId&&/^[\w-]+$/.test(driveId)){embed=`https://drive.google.com/file/d/${driveId}/preview`;const key=u.searchParams.get('resourcekey');if(key)embed+='?resourcekey='+encodeURIComponent(key);provider='Google Drive';inferred='document';}
 }
 if(!inferred){if(/\.(?:png|jpe?g|gif|webp|avif|svg)$/i.test(path))inferred='image';else if(/\.pdf$/i.test(path))inferred='pdf';else if(/\.(?:mp4|webm|ogv)$/i.test(path))inferred='video';}
 const kind=requested==='auto'?(inferred||'link'):requested;
 if(provider&&((kind==='video'&&inferred==='video')||provider==='Google Drive'))return {kind,original,embed,provider};
 if(kind==='image')return {kind,original,image:original};
 if(kind==='pdf')return {kind,original,embed:original,provider:''};
 if(kind==='video'&&/\.(?:mp4|webm|ogv)$/i.test(path))return {kind,original,video:original};
 return {kind:'link',original,note:kind==='video'?'Este serviço não foi reconhecido para reprodução incorporada. Abra o vídeo no site de origem.':''};
}
const icon=`<svg viewBox="0 0 32 40" aria-hidden="true" width="32" height="40"><path d="M5 1h15l9 9v28H5z" fill="currentColor" opacity=".13"/><path d="M20 1v10h9M5 1h15l9 9v28H5zM10 20h14M10 25h14M10 30h9" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;
function frame(src,title,cls,provider){return `<iframe class="${cls}" src="${esc(src)}" title="${esc(title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" sandbox="${provider?'allow-scripts allow-same-origin allow-presentation allow-popups':'allow-same-origin allow-downloads'}" allow="fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>`;}
export function renderMaterial(material,{primary=false}={}){
 if(!material?.url)return '';
 let source;try{source=materialSource(material);}catch{return '<div class="material-card"><p>O link deste material é inválido. Edite o conteúdo para corrigi-lo.</p></div>';}
 const title=material.title||'Material da aula',description=material.description||'',{kind,original}=source;
 const kindLabel={video:'Vídeo',image:'Imagem',pdf:'PDF',document:'Documento',link:'Material complementar'}[kind]||'Material';
 const a=`<a class="material-open" href="${esc(original)}" target="_blank" rel="noopener noreferrer">Abrir em nova aba <span aria-hidden="true">↗</span></a>`;
 let visual='';
 if(kind==='video'&&source.embed)visual=`<div class="video-frame">${frame(source.embed,title,'',source.provider)}</div>`;
 else if(source.video)visual=`<video controls playsinline preload="metadata" aria-label="${esc(title)}"><source src="${esc(source.video)}">Seu navegador não reproduziu este vídeo. Use o link abaixo.</video>`;
 else if(kind==='image'&&source.image)visual=`<figure class="material-visual"><a href="${esc(original)}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar imagem: ${esc(title)}"><img class="material-image" src="${esc(source.image)}" alt="${esc(description||title)}" loading="lazy" referrerpolicy="no-referrer"></a><p class="image-fallback" hidden>Não foi possível carregar a imagem. Use o link para abrir no site de origem.</p></figure>`;
 else if(source.embed)visual=`<details class="document-reader"><summary>${kind==='pdf'?'Ler PDF nesta página':kind==='image'?'Visualizar imagem nesta página':'Visualizar documento nesta página'}</summary>${frame(source.embed,title,'document-frame',source.provider)}<p class="media-note">Se a visualização não abrir, use “Abrir em nova aba”.</p></details>`;
 return `<section class="material-card material-${kind}${primary?' material-primary':''}"><div class="material-heading"><span class="material-icon">${icon}</span><div><span class="material-kind">${esc(kindLabel)}${primary?' · MATERIAL PRINCIPAL':''}</span><h4>${esc(title)}</h4></div></div>${description?`<p class="material-description">${esc(description)}</p>`:''}${visual}<div class="material-links">${a}</div>${source.note?`<p class="media-note">${esc(source.note)}</p>`:''}${source.embed?'<p class="media-note">Disponibilidade e permissões de acesso dependem do serviço de origem.</p>':''}</section>`;
}
