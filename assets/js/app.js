(() => {
  'use strict';
  const cfg = window.CAVERNA_CONFIG || {};
  const target = Date.parse(cfg.launchISO || '2026-11-19T00:00:00-03:00');
  const pad = v => String(v).padStart(2, '0');
  function draw() {
    const ms = Math.max(0, target - Date.now());
    const n = Math.ceil(ms / 1000);
    const days = Math.floor(n / 86400);
    const hours = Math.floor((n % 86400) / 3600);
    const minutes = Math.floor((n % 3600) / 60);
    const seconds = n % 60;
    const reached = Date.now() >= target;
    for (const timer of document.querySelectorAll('[data-countdown]')) {
      for (const [key,value] of Object.entries({days,hours,minutes,seconds})) {
        const node = timer.querySelector('[data-part="'+key+'"]');
        if (node && node.textContent !== pad(value)) node.textContent = pad(value);
      }
      timer.setAttribute('aria-label', reached ? 'Chegou o dia do lançamento de GTA VI' : `Faltam ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`);
    }
    document.querySelectorAll('[data-days-label]').forEach(node => {
      const label = reached ? 'CHEGOU O GRANDE DIA!' : days===0 ? 'É HOJE!' : `FALTAM ${days} ${days===1?'DIA':'DIAS'}`;
      if (node.textContent !== label) node.textContent=label;
    });
    document.querySelectorAll('[data-launch-status]').forEach(node => {
      const text = reached ? 'O GRANDE DIA CHEGOU. BEM-VINDO A LEONIDA!' : '19 NOV 2026 · 00H00 · HORÁRIO DE BRASÍLIA';
      if (node.textContent !== text) node.textContent=text;
    });
  }
  draw();
  setInterval(draw, 1000);
  window.addEventListener('focus', draw);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) draw(); });

  const menu = document.getElementById('mobile-menu');
  const shade = document.getElementById('mobile-shade');
  const rail = document.getElementById('side-rail');
  function toggle(open) {
    if (!menu || !rail || !shade) return;
    rail.classList.toggle('rail-open',open);
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
    shade.hidden=!open;
    document.body.classList.toggle('menu-open',open);
  }
  if(menu && rail && shade) {
    menu.addEventListener('click',() => toggle(!rail.classList.contains('rail-open')));
    shade.addEventListener('click',() => toggle(false));
    rail.querySelectorAll('a').forEach(a => a.addEventListener('click',() => toggle(false)));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
  }
  document.querySelectorAll('[data-calendar-download]').forEach(btn=>btn.addEventListener('click',()=>{
    const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Caverna do Torresmo//Countdown GTA VI//PT-BR','BEGIN:VEVENT','UID:gta-vi-20261119@cavernadotorresmo','DTSTAMP:20261115T030000Z','DTSTART:20261119T030000Z','DTEND:20261119T040000Z','SUMMARY:GTA VI - Lançamento / Caverna do Torresmo','DESCRIPTION:Lançamento GTA VI - meia-noite no horário de Brasília.','URL:https://www.rockstargames.com/VI','END:VEVENT','END:VCALENDAR'].join('\r\n');
    const url=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'}));
    const a=document.createElement('a'); a.href=url;a.download='GTA-VI-Caverna-do-Torresmo.ics';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  }));
})();
