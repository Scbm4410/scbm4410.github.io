(function(){
  const PDF_URL="assets/portfolio.pdf";
  const pdfjs=window.pdfjsLib;
  pdfjs.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const viewport=document.getElementById("viewport");
  const under=document.getElementById("under-page");
  const sheet=document.getElementById("turn-sheet");
  const front=document.getElementById("front-face");
  const back=document.getElementById("back-face");
  const mediaLayer=document.getElementById("media-layer");
  const count=document.getElementById("page-count");
  const range=document.getElementById("page-range");
  const prev=document.getElementById("prev"), next=document.getElementById("next");
  let pdf=null, pages=[], current=1, busy=false, zoom=1, gallery=[], galleryIndex=0;
  const slots=window.PORTFOLIO_MEDIA||[];

  async function loadPDF(){
    const task=pdfjs.getDocument(PDF_URL);
    pdf=await task.promise;
    range.max=pdf.numPages;
    count.textContent=`1 / ${pdf.numPages}`;
    // Renderizado a resolución suficiente para pantalla; el PDF original permanece en el repositorio.
    for(let n=1;n<=pdf.numPages;n++){
      const page=await pdf.getPage(n);
      const vp=page.getViewport({scale:1.25});
      const canvas=document.createElement("canvas");
      canvas.width=Math.ceil(vp.width); canvas.height=Math.ceil(vp.height);
      await page.render({canvasContext:canvas.getContext("2d"),viewport:vp}).promise;
      pages.push(canvas);
    }
    setPage(1);
  }
  function pageHTML(n){
    const c=pages[n-1];
    if(!c)return "";
    return `<canvas width="${c.width}" height="${c.height}"></canvas>`;
  }
  function paintFace(el,n){
    el.innerHTML="";
    const c=pages[n-1];
    if(!c)return;
    const copy=document.createElement("canvas");
    copy.width=c.width;copy.height=c.height;
    copy.getContext("2d").drawImage(c,0,0);
    copy.style.width="100%";copy.style.height="100%";
    el.appendChild(copy);
  }
  function setPage(n){
    current=Math.max(1,Math.min(pdf.numPages,n));
    paintFace(under,current);
    paintFace(front,current);
    paintFace(back,Math.min(pdf.numPages,current+1));
    sheet.className="page turn-sheet";
    renderMedia();
    updateControls();
  }
  function updateControls(){
    count.textContent=`${current} / ${pdf.numPages}`;
    range.value=current;
    prev.disabled=current===1;next.disabled=current===pdf.numPages;
  }
  function renderMedia(){
    mediaLayer.innerHTML="";
    slots.filter(s=>s.page===current).forEach(s=>{
      const box=document.createElement("div");
      box.className="media-slot";
      box.style.left=s.x+"%";box.style.top=s.y+"%";box.style.width=s.w+"%";box.style.height=s.h+"%";
      if(s.type==="empty"){
        const b=document.createElement("button");b.className="slot-placeholder";
        b.textContent="CONTENIDO MULTIMEDIA";
        b.title="Añade un GIF, vídeo o galería editando media.js";
        b.addEventListener("click",()=>alert("Para añadir contenido, sigue la guía INSTRUCCIONES.md y edita media.js. No necesitas modificar viewer.js."));
        box.appendChild(b);
      }else if(s.type==="gif"){
        const img=document.createElement("img");img.src=s.src;img.alt=s.alt||"Animación";box.appendChild(img);
      }else if(s.type==="video"){
        const v=document.createElement("video");v.src=s.src;v.controls=true;v.playsInline=true;v.preload="metadata";
        if(s.poster)v.poster=s.poster;box.appendChild(v);
      }else if(s.type==="gallery"){
        const b=document.createElement("button");b.className="gallery-trigger";
        const img=document.createElement("img");img.src=(s.images||[])[0]||"";img.alt="Abrir galería";
        b.appendChild(img);b.addEventListener("click",()=>openGallery(s.images||[]));box.appendChild(b);
      }
      mediaLayer.appendChild(box);
    });
  }
  function turn(dir){
    if(busy||!pdf)return;
    const target=current+dir;
    if(target<1||target>pdf.numPages)return;
    busy=true;
    document.getElementById("page-stage").classList.add("is-turning");
    // La página que queda debajo es la de destino; el reverso de la hoja también la muestra.
    paintFace(under,target);
    paintFace(front,current);
    paintFace(back,target);
    sheet.className="page turn-sheet "+(dir>0?"flipping-forward":"flipping-backward");
    const finish=()=>{
      sheet.removeEventListener("animationend",finish);
      current=target;
      sheet.className="page turn-sheet";
      paintFace(under,current);paintFace(front,current);paintFace(back,Math.min(pdf.numPages,current+1));
      renderMedia();updateControls();document.getElementById("page-stage").classList.remove("is-turning");busy=false;
    };
    sheet.addEventListener("animationend",finish);
  }
  function setZoom(z){
    zoom=Math.max(.75,Math.min(2.2,z));
    viewport.style.transform=`scale(${zoom})`;
    document.getElementById("zoom-reset").textContent=Math.round(zoom*100)+"%";
  }
  function openGallery(images){
    if(!images.length)return;
    gallery=images;galleryIndex=0;showGallery();
    document.getElementById("lightbox").classList.add("open");
  }
  function showGallery(){
    document.getElementById("lightbox-image").src=gallery[galleryIndex];
    document.getElementById("gallery-count").textContent=`${galleryIndex+1} / ${gallery.length}`;
  }
  prev.addEventListener("click",()=>turn(-1));next.addEventListener("click",()=>turn(1));
  document.getElementById("zoom-in").addEventListener("click",()=>setZoom(zoom+.15));
  document.getElementById("zoom-out").addEventListener("click",()=>setZoom(zoom-.15));
  document.getElementById("zoom-reset").addEventListener("click",()=>setZoom(1));
  document.getElementById("fullscreen").addEventListener("click",()=>{
    if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  });
  range.addEventListener("input",()=>{if(!busy)setPage(Number(range.value));});
  document.getElementById("close-lightbox").addEventListener("click",()=>document.getElementById("lightbox").classList.remove("open"));
  document.getElementById("gallery-prev").addEventListener("click",()=>{galleryIndex=(galleryIndex-1+gallery.length)%gallery.length;showGallery();});
  document.getElementById("gallery-next").addEventListener("click",()=>{galleryIndex=(galleryIndex+1)%gallery.length;showGallery();});
  document.addEventListener("keydown",e=>{
    if(e.key==="ArrowRight")turn(1);if(e.key==="ArrowLeft")turn(-1);
    if(e.key==="Escape")document.getElementById("lightbox").classList.remove("open");
  });
  let touchX=null;
  viewport.addEventListener("touchstart",e=>{touchX=e.changedTouches[0].clientX;},{passive:true});
  viewport.addEventListener("touchend",e=>{
    if(touchX===null)return;const dx=e.changedTouches[0].clientX-touchX;
    if(Math.abs(dx)>45)turn(dx<0?1:-1);touchX=null;
  },{passive:true});
  loadPDF().catch(err=>{
    console.error(err);
    document.getElementById("page-stage").innerHTML='<p style="color:white;text-align:center">No se ha podido cargar el PDF. Comprueba que existe assets/portfolio.pdf y que has abierto la web desde GitHub Pages o un servidor local.</p>';
  });
})();