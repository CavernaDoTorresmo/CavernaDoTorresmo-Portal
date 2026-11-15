/* Single seamless full-height mural in each exterior gutter; no changes to site pages. */
(()=>{
  if(document.body.classList.contains('obs-body'))return;
  if(!document.querySelector('.site-shell'))return;
  for(const side of ['left','right']){
    const panel=document.createElement('aside');
    panel.className=`neon-margin ${side}`;
    panel.setAttribute('aria-hidden','true');
    document.body.appendChild(panel);
  }
})();
