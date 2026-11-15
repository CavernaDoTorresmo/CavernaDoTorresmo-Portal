/* Caverna do Torresmo: "Noite em Leonida" - trilha original criada por síntese Web Audio.
   Nenhuma música, sample ou biblioteca externa. Reprodução inicia somente por clique,
   respeitando as regras de autoplay dos navegadores. NÃO roda na tela obs.html:
   nessa tela o áudio deve vir de uma Fonte de Mídia local no OBS. */
(()=>{
  'use strict';
  if(document.body.classList.contains('obs-body'))return;
  const pathname=location.pathname.toLowerCase();
  if(!(/\/$|\/index\.html$|\/countdown\.html$/.test(pathname)))return;
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC)return;
  const css=document.createElement('style');
  css.textContent='.music-pill{position:fixed;bottom:18px;right:18px;z-index:110;display:flex;gap:9px;align-items:center;max-width:calc(100vw - 32px);padding:7px 11px 7px 7px;border-radius:15px;border:1px solid #ff65c486;background:#110c20ee;box-shadow:0 0 22px #e831982f;backdrop-filter:blur(12px);color:#fff2fa;font:600 11px/1.2 system-ui,sans-serif}.music-pill button{background:linear-gradient(110deg,#f52a8c,#9137c8);color:white;font:800 11px system-ui,sans-serif;border:0;border-radius:10px;padding:10px 12px;cursor:pointer}.music-pill .music-copy{display:flex;flex-direction:column;gap:2px;min-width:98px}.music-pill small{font-size:9px;color:#e7aecf}.music-pill input{width:70px;accent-color:#ff42a7;cursor:pointer}@media(max-width:580px){.music-pill{right:8px;bottom:8px;padding:5px;gap:5px}.music-pill button{padding:8px;font-size:10px}.music-pill .music-copy{min-width:70px;font-size:9px}.music-pill input{width:42px}}';
  document.head.appendChild(css);
  const ui=document.createElement('div');ui.className='music-pill';ui.setAttribute('role','group');ui.setAttribute('aria-label','Música de fundo');
  ui.innerHTML='<button type="button" aria-label="Reproduzir música de fundo">♫ Ouvir</button><span class="music-copy"><b>Noite em Leonida</b><small>Trilha original · loop</small></span><input type="range" min="0" max="100" value="40" aria-label="Volume da música">';
  document.body.appendChild(ui);
  const btn=ui.querySelector('button'),msg=ui.querySelector('small'),vol=ui.querySelector('input');
  const chords=[
   [45,[57,60,64,67,71]],[41,[57,60,64,67,69]],[48,[60,64,67,71,74]],[43,[59,62,64,67,71]],
   [38,[57,60,65,69,72]],[41,[57,60,64,67,72]],[40,[59,62,64,67,71]],[43,[59,62,67,69,74]]
  ];
  const melody=[76,79,81,79,76,74,72,74,76,79,83,81,79,76,74,72];
  const freq=n=>440*Math.pow(2,(n-69)/12),step=.375;
  let ctx=null,gain=null,playing=false,timer=null,stepIdx=0,nextTime=0;
  function tone(note,t,dur,amp=0.02,type='sine',attack=.02){
    const o=ctx.createOscillator(),f=ctx.createBiquadFilter(),g=ctx.createGain();
    o.type=type;o.frequency.setValueAtTime(freq(note),t);f.type='lowpass';f.frequency.value=type==='triangle'?950:2100;
    o.connect(f);f.connect(g);g.connect(gain);
    g.gain.setValueAtTime(.00001,t);g.gain.exponentialRampToValueAtTime(Math.max(amp,.00002),t+attack);
    g.gain.exponentialRampToValueAtTime(.00001,t+dur);
    o.start(t);o.stop(t+dur+.02);
  }
  function tick(){
    if(!ctx||!playing||ctx.state!=='running')return;
    if(nextTime<ctx.currentTime-.4)nextTime=ctx.currentTime+.06;
    while(nextTime<ctx.currentTime+1.05){
      const bar=Math.floor(stepIdx/8),c=chords[bar%8],s=stepIdx%8,t=nextTime;
      if(s===0){
        c[1].slice(0,4).forEach((n,j)=>tone(n,t,3.1,.012+(j===0?.004:0),'triangle',.4));
        tone(c[0],t,1.18,.068,'sine',.02);tone(c[0]+12,t,.83,.008,'triangle',.03);
      }
      if(s===4)tone(c[0]+(bar%2?7:0),t,1.05,.034,'sine',.01);
      if(s%2===1)tone(c[1][[0,2,3,1][(s-1)/2]]+12,t,.57,.019,'sine',.008);
      if(s===6&&bar%2===0)tone(melody[(bar/2)%16],t,1.3,.012,'sine',.015);
      stepIdx=(stepIdx+1)%256;nextTime+=step;
    }
  }
  async function start(){
    try{
      ctx=new AC({latencyHint:'playback'});
      gain=ctx.createGain();gain.gain.value=+vol.value/100*.62;
      const limiter=ctx.createDynamicsCompressor();limiter.threshold.value=-16;limiter.ratio.value=2;
      gain.connect(limiter);limiter.connect(ctx.destination);
      await ctx.resume();
      if(ctx.state!=='running'){msg.textContent='Clique de novo para ativar';return;}
      stepIdx=0;nextTime=ctx.currentTime+.06;playing=true;tick();timer=setInterval(tick,220);
      btn.textContent='❚❚ Pausar';msg.textContent='Tocando · loop contínuo';
    }catch(e){msg.textContent='Áudio indisponível';}
  }
  async function stop(){
    playing=false;if(timer){clearInterval(timer);timer=null;}
    if(gain&&ctx){gain.gain.setTargetAtTime(.00001,ctx.currentTime,.07);const old=ctx;setTimeout(()=>old.close().catch(()=>{}),350);}
    ctx=null;gain=null;btn.textContent='♫ Ouvir';msg.textContent='Pausada · em loop';
  }
  btn.addEventListener('click',()=>playing?stop():start());
  vol.addEventListener('input',()=>{if(playing&&gain&&ctx)gain.gain.setTargetAtTime(+vol.value/100*.62,ctx.currentTime,.07)});
})();
