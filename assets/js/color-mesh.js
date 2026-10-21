(() => {
  const canvas = document.getElementById('mesh-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  const palette = [[201,243,107],[255,137,95],[120,163,133],[218,183,126],[140,149,101],[190,118,101],[153,181,128]];
  const extracted = new Map();
  let width = 0, height = 0, active = 0, raf = 0, ambientColor = palette[0];
  const resize = () => { const ratio = Math.min(window.devicePixelRatio || 1, 1.5); width = canvas.clientWidth; height = canvas.clientHeight; canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio); context.setTransform(ratio,0,0,ratio,0,0); };
  const extractDominant = (source) => {
    const sample = document.createElement('canvas');
    sample.width = 96; sample.height = 54;
    const sampleContext = sample.getContext('2d', {willReadFrequently:true});
    sampleContext.drawImage(source,0,0,sample.width,sample.height);
    const pixels = sampleContext.getImageData(0,0,sample.width,sample.height).data;
    const bins = new Map();
    for(let i=0;i<pixels.length;i+=16){
      if(pixels[i+3]<180) continue;
      const r=pixels[i],g=pixels[i+1],b=pixels[i+2];
      const max=Math.max(r,g,b),min=Math.min(r,g,b),saturation=max===0?0:(max-min)/max;
      const key=`${r>>4},${g>>4},${b>>4}`;
      const bin=bins.get(key)||{count:0,saturation:0,red:0,green:0,blue:0};
      bin.count++;bin.saturation+=saturation;bin.red+=r;bin.green+=g;bin.blue+=b;bins.set(key,bin);
    }
    const dominant=[...bins.values()].sort((a,b)=>b.count*(.2+b.saturation/b.count*3)-a.count*(.2+a.saturation/a.count*3))[0];
    return dominant?[Math.round(dominant.red/dominant.count),Math.round(dominant.green/dominant.count),Math.round(dominant.blue/dominant.count)]:null;
  };
  const makeThumbnail = (card, index) => {
    const art = card.querySelector('.project-art');
    const cover = art.querySelector('.project-art-image');
    if (cover) {
      const extractCover = () => { try { const dominant = extractDominant(cover); if (dominant) extracted.set(card.dataset.project, dominant); } catch (error) { extracted.set(card.dataset.project, palette[index % palette.length]); } };
      if (cover.complete && cover.naturalWidth) extractCover();
      else cover.addEventListener('load', extractCover, { once: true });
      return;
    }
    const thumb = document.createElement('canvas');
    thumb.width = 240; thumb.height = 180; thumb.className = 'thumbnail-canvas'; thumb.setAttribute('aria-hidden','true');
    art.prepend(thumb);
    const ctx = thumb.getContext('2d', {willReadFrequently:true});
    const color = palette[index % palette.length];
    ctx.fillStyle = `rgb(${Math.round(color[0]*.23)},${Math.round(color[1]*.23)},${Math.round(color[2]*.23)})`;
    ctx.fillRect(0,0,thumb.width,thumb.height);
    for(let i=0;i<9;i++){
      const x=25+(i*61)%210, y=22+(i*47)%155, radius=12+(i*17)%55;
      const glow=ctx.createRadialGradient(x,y,0,x,y,radius);
      glow.addColorStop(0,`rgba(${color[0]},${color[1]},${color[2]},${.42-(i%3)*.1})`);
      glow.addColorStop(1,`rgba(${color[0]},${color[1]},${color[2]},0)`);
      ctx.fillStyle=glow;ctx.fillRect(0,0,thumb.width,thumb.height);
    }
    try { const dominant=extractDominant(thumb); if(dominant)extracted.set(card.dataset.project,dominant); } catch(error) { extracted.set(card.dataset.project,color); }
  };
  const draw = (time) => { context.clearRect(0,0,width,height); const color = ambientColor; for (let i=0;i<5;i++){const x=width*(.18+((i*37)%70)/100)+Math.sin(time*.00013+i*2)*width*.08;const y=height*(.22+((i*23)%58)/100)+Math.cos(time*.00011+i)*height*.08;const radius=Math.max(width,height)*(.16+(i%3)*.045);const g=context.createRadialGradient(x,y,0,x,y,radius);g.addColorStop(0,`rgba(${color[0]},${color[1]},${color[2]},${i===0?.18:.09})`);g.addColorStop(1,`rgba(${color[0]},${color[1]},${color[2]},0)`);context.fillStyle=g;context.fillRect(0,0,width,height);} raf=requestAnimationFrame(draw); };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observedCards = new WeakSet();
  const meshObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const id=entry.target.dataset.meshSource==='hero'?'hero':entry.target.dataset.project;const color=extracted.get(id);if(color)ambientColor=color;}),{threshold:.35}) : null;
  const observeCards = () => document.querySelectorAll('.project-card').forEach((card,index)=>{if(!card.querySelector('.thumbnail-canvas'))makeThumbnail(card,index);if(meshObserver&&!observedCards.has(card)){meshObserver.observe(card);observedCards.add(card);}});
  const cardObserver = new MutationObserver(observeCards);
  cardObserver.observe(document.getElementById('featured-grid'),{childList:true});
  observeCards();
  const heroVisual=document.querySelector('[data-mesh-source="hero"]');
  const heroImage=document.getElementById('hero-anchor');
  heroVisual.addEventListener('pointerenter',()=>{const color=extracted.get('hero');if(color)ambientColor=color;});
  const extractHero=()=>{try{const color=extractDominant(heroImage);if(color){extracted.set('hero',color);if(meshObserver)meshObserver.observe(heroVisual);else ambientColor=color;}}catch(error){heroVisual.classList.add('mesh-unavailable');}};
  if(heroImage.complete&&heroImage.naturalWidth)extractHero();else heroImage.addEventListener('load',extractHero,{once:true});
  heroImage.addEventListener('error',()=>heroVisual.classList.add('mesh-unavailable'),{once:true});
  resize(); window.addEventListener('resize',resize,{passive:true}); if (!reduced) draw(0);
  window.addEventListener('scroll',()=>{if(!meshObserver){const visible=[...document.querySelectorAll('[data-mesh-source="hero"],.project-card')].find(item=>{const box=item.getBoundingClientRect();return box.top<window.innerHeight*.65&&box.bottom>window.innerHeight*.35;});if(visible){const id=visible.dataset.meshSource==='hero'?'hero':visible.dataset.project;ambientColor=extracted.get(id)||ambientColor;} }},{passive:true});
  window.ColorMesh = {activate(id) { const cards=[...document.querySelectorAll('.project-card')];const index=cards.findIndex(card=>card.dataset.project===id);if(index>=0){active=index;ambientColor=extracted.get(id)||palette[active%palette.length];} },stop() { cancelAnimationFrame(raf);if(meshObserver)meshObserver.disconnect();cardObserver.disconnect(); }};
})();
