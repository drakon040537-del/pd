function renderSummary(rows, st){
  document.getElementById("pbar").innerHTML = "";
  const allR = state.rows;
  const allS = allR.map(rowStats);
  const weeks = [...new Set(allR.map(r=>r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b));
  const cities = tabs().filter(c=>CITY_ORDER.includes(c));
  const dyn = weeks.map(w=>{
    const cells = cities.map(c=>{
      const idx = allR.map((r,i)=>(r.week===w&&r.city===c)?i:-1).filter(i=>i>=0);
      const cs = idx.map(i=>allS[i]);
      return { c, tot: idx.length,
        ok: cs.filter(x=>x.verdict==="норма").length,
        warn: cs.filter(x=>x.verdict==="замечание").length,
        bad: cs.filter(x=>x.verdict==="критично").length,
        checked: cs.filter(x=>x.score!==null).length };
    });
    return { w, cells };
  });
  const topCats = catNamesFor(rows).map(n=>({n, c: rows.filter(r=>isDev(stByName(r, rowStats(r).st, n))).length}))
    .sort((a,b)=>b.c-a.c).slice(0,5);
  const mx = Math.max(1,...topCats.map(x=>x.c));
  const gm = {};
  allR.forEach((r,i)=>{
    const k = teamKey(r); // команда, а не строка недели
    if (!gm[k]) gm[k] = {city:r.city, producer:r.producer||"—", tot:0, none:0};
    gm[k].tot++; if (allS[i].score===null) gm[k].none++;
  });
  const nogoods = Object.values(gm).filter(g=>g.none===g.tot).sort((a,b)=>b.tot-a.tot);
  document.getElementById("content").innerHTML = `
    <div class="grid">
      <div class="card" style="grid-column:1/-1"><h2>Динамика средней оценки по неделям</h2>${(()=>{ 
        const W=560,H=110,P=24;
        const pts = weeks.map(w=>{ const rs = allR.filter(r=>r.week===w); const ss = rs.map(rowStats).filter(x=>x.score!==null); return { w, avg: ss.length? ss.reduce((a,x)=>a+x.score,0)/ss.length : null }; });
        const valid = pts.filter(x=>x.avg!==null);
        if (!valid.length) return '<div class="empty">Нет проверенных команд</div>';
        const xs = i => valid.length>1 ? P + i*((W-2*P)/(valid.length-1)) : W/2;
        const ys = v => (H-20-v*((H-34)/MAX_SCORE)).toFixed(1);
        const pl = valid.map((p,i)=>xs(i).toFixed(1)+","+ys(p.avg)).join(" ");
        return '<svg width="'+W+'" height="'+H+'" style="max-width:100%">' +
          '<polyline points="'+pl+'" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
          valid.map((p,i)=>'<circle cx="'+xs(i).toFixed(1)+'" cy="'+ys(p.avg)+'" r="3.5" fill="var(--accent)"/><text x="'+xs(i).toFixed(1)+'" y="'+(H-6)+'" text-anchor="middle" font-size="10" fill="var(--faint)">'+esc(p.w)+'</text><text x="'+xs(i).toFixed(1)+'" y="'+(parseFloat(ys(p.avg))-7).toFixed(1)+'" text-anchor="middle" font-size="10" fill="var(--ink)">'+p.avg.toFixed(1)+'</text>').join("") +
          '</svg>';
      })()}</div>
      <div class="card" style="grid-column:1/-1"><h2>Динамика компаний по неделям</h2>
        ${dyn.length?`<table><thead><tr><th>Неделя</th>${cities.map(c=>`<th>${esc(clabel(c))}</th>`).join("")}</tr></thead><tbody>${
          dyn.map(d=>`<tr><td style="font-weight:600">${esc(d.w)}</td>${d.cells.map(x=>`<td ${x.tot?`data-cw="${esc(d.w)}" data-cc="${esc(x.c)}" style="cursor:pointer"`:""}>${x.tot?`<span style="color:var(--ok)">${x.ok}</span> / <span style="color:var(--warn)">${x.warn}</span> / <span style="color:var(--bad)">${x.bad}</span> <span style="color:var(--faint);font-size:11px">(${x.checked}/${x.tot} пров.)</span>`:'<span style="color:var(--faint)">—</span>'}</td>`).join("")}</tr>`).join("")
        }</tbody></table>
        <div style="color:var(--faint);font-size:11.5px;margin-top:8px">формат ячейки: нормально / есть замечания / критично (проверено/всего)</div>`
      : `<div class="empty">Нет недель</div>`}
      </div>
      <div class="card"><h2>Топ-5 проблем (${esc(document.getElementById("weeklabel").textContent)})</h2>
        ${topCats.map((x,i)=>`<div class="bar-row"><span class="lbl">${x.n}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.round(x.c/mx*100)}%;background:${i===0&&x.c>0?"var(--bad)":"#8a5560"}"></div></div><span class="val">${x.c}</span></div>`).join("")}
      </div>
      <div class="card"><h2>Команды без проверок</h2>
        ${nogoods.length?nogoods.map(g=>`<div class="drow"><b>${esc(g.producer)}</b><span style="color:var(--dim)">${clabel(g.city)} · команд: ${g.tot}</span></div>`).join(""):`<div class="empty">Все команды проверены 🎉</div>`}
      </div>
    </div>`;
  document.querySelectorAll("[data-cw]").forEach(td=>td.onclick=()=>{ state.week=td.dataset.cw; state.tab=td.dataset.cc; state.search=""; state.quick=""; state.page=1; render(); toast("Фильтр: "+clabel(td.dataset.cc)+" · "+td.dataset.cw); });
}
function renderCompare(rows, st){
  const weeks = [...new Set(rows.map(r=>r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b));
  if (!weeks.length){ document.getElementById("content").innerHTML = '<div class="card"><div class="empty">Нет недель</div></div>'; return; }
  const a = state.cmpA || weeks[weeks.length-2] || weeks[0];
  const b = state.cmpB || weeks[weeks.length-1];
  const teamsOf = w=>{ // уникальные команды недели, а не строки-копии
    const seen = {};
    rows.forEach(r=>{ if (r.week!==w) return; const k=teamKey(r); seen[k]=r; }); // D: с городом — одноимённые команды разных компаний не склеиваются
    return Object.values(seen);
  };
  const comparePairs=reviewPairs(teamsOf(b),teamsOf(a));
  const comparedTeams=w=>comparePairs.map(p=>w===a?p[1]:p[0]);
  const agg = w=>{
    const uRows = comparedTeams(w);
    const checked = uRows.map(r=>rowStats(r)).filter(x=>x.score!==null);
    return { total: teamsOf(w).length, checked: teamsOf(w).filter(r=>rowStats(r).score!==null).length,
      ok: checked.filter(x=>x.verdict==="норма").length,
      warn: checked.filter(x=>x.verdict==="замечание").length,
      bad: checked.filter(x=>x.verdict==="критично").length,
      avg: checked.length ? checked.reduce((s,x)=>s+x.score,0)/checked.length : null };
  };
  const A = agg(a), B = agg(b);
  const fmt = v => v===null ? "–" : v;
  const rowsM = [ // m[3]: направление «хорошо» (1 — рост хорош, -1 — рост плох, 0 — нейтрально)
    ["команд всего", A.total, B.total, 0],
    ["проверено", A.checked, B.checked, 0],
    ["🟢 нормально", A.ok, B.ok, 1, {ok:A.ok,warn:A.warn,bad:A.bad}, {ok:B.ok,warn:B.warn,bad:B.bad}],
    ["🟠 есть замечания", A.warn, B.warn, -1, {ok:A.ok,warn:A.warn,bad:A.bad}, {ok:B.ok,warn:B.warn,bad:B.bad}],
    ["🔴 критично", A.bad, B.bad, -1, {ok:A.ok,warn:A.warn,bad:A.bad}, {ok:B.ok,warn:B.warn,bad:B.bad}],
    ["средняя оценка", A.avg===null?null:A.avg, B.avg===null?null:B.avg, 1, null, null, "pct"]
  ];
  const catRows = catNamesFor(teamsOf(a).concat(teamsOf(b))).map(n=>({ n, a: comparedTeams(a).filter(r=>isDev(stByName(r, rowStats(r).st, n))).length, b: comparedTeams(b).filter(r=>isDev(stByName(r, rowStats(r).st, n))).length })).filter(x=>x.a||x.b).sort((x,y)=>(y.b-y.a)-(x.b-x.a));
  document.getElementById("content").innerHTML = `
    <div class="card"><h2>Сравнение недель</h2><p>${comparePairs.length ? "Оценки и проблемы сопоставлены по " + comparePairs.length + " одинаковым командам с заполненными пунктами. Охват указан отдельно." : "Недостаточно сопоставимых проверок. Нули не означают улучшение."}</p>
      <div class="filters">
        <select id="cmp-a">${weeks.map(w=>`<option ${w===a?"selected":""}>${esc(w)}</option>`).join("")}</select>
        <span style="color:var(--faint)">против</span>
        <select id="cmp-b">${weeks.map(w=>`<option ${w===b?"selected":""}>${esc(w)}</option>`).join("")}</select>
      </div>
      <table><thead><tr><th>Метрика</th><th>${esc(a)}</th><th>${esc(b)}</th><th>Δ</th></tr></thead><tbody>
      ${rowsM.map(m=>{
        const va = typeof m[1]==="number"?m[1]:null, vb = typeof m[2]==="number"?m[2]:null;
        const d = (va!==null&&vb!==null && (!m[3] || comparePairs.length)) ? vb-va : null;
        const good = (d===null || d===0 || !m[3]) ? null : (m[3]>0 ? d>0 : d<0);
        const dc = good===null ? "var(--faint)" : (good ? "var(--ok)" : "var(--bad)");
        const ar = d===null ? "" : (d>0?"▲":d<0?"▼":"—");
        const disp = v => m[6]==="pct" ? (v===null?"–":pct(v)+"%") : fmt(v);
        const show = d===null ? "–" : (m[6]==="pct" ? ar+Math.abs(pct(d))+"%" : ar+Math.abs(d));
        return `<tr><td>${m[0]}</td><td>${disp(m[1])}${m[4]?miniBar(m[4]):""}</td><td>${disp(m[2])}${m[5]?miniBar(m[5]):""}</td><td style="color:${dc};font-weight:600">${show}</td></tr>`;
      }).join("")}
      </tbody></table>
      <h2 style="margin-top:16px">Проблемные категории (недели A → B)</h2>
      ${catRows.length?`<table><thead><tr><th>Категория</th><th>${esc(a)}</th><th>${esc(b)}</th><th>Δ</th></tr></thead><tbody>${catRows.map(x=>{ const d=x.b-x.a; return `<tr><td>${esc(x.n)}</td><td>${x.a}</td><td>${x.b}</td><td style="color:${d>0?"var(--bad)":d<0?"var(--ok)":"var(--faint)"};font-weight:600">${d>0?"+":""}${d}</td></tr>`; }).join("")}</tbody></table>`:`<div class="empty">${comparePairs.length ? "У сопоставленных команд проблемных категорий нет" : "Недостаточно сопоставимых проверок"}</div>`}
      <p style="color:var(--faint);font-size:12px;margin-top:10px">Новые недели добавляются сами (лист компании) или кнопкой 🗓 Новая неделя.</p>
    </div>`;
  const sa=document.getElementById("cmp-a"), sb=document.getElementById("cmp-b");
  sa.onchange=e=>{state.cmpA=e.target.value;renderCompare(rows,st);};
  sb.onchange=e=>{state.cmpB=e.target.value;renderCompare(rows,st);};
}
function renderOperators(rows, st){
  document.getElementById("pbar").innerHTML = "";
  const O = state.opsUi = state.opsUi || { co: "", per: "all", sort: "avg", dir: -1 };
  const allWeeks = [...new Set(rows.map(r=>r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b));
  const coList = AUTH.prod ? [] : CITY_ORDER.filter(c=>rows.some(r=>r.city===c));
  if (O.co && !coList.includes(O.co)) O.co = "";
  const perOpts = [["all", allWeeks.length > 1 ? allWeeks.length + " " + o7Wk(allWeeks.length) : "Все проверки"]];
  if (allWeeks.length > 1) perOpts.push(["last", "Последняя неделя"]);
  if (allWeeks.length > 4) perOpts.push(["4", "Последние 4 недели"]);
  if (!perOpts.some(p=>p[0]===O.per)) O.per = "all";
  const keepW = O.per==="last" ? allWeeks.slice(-1) : O.per==="4" ? allWeeks.slice(-4) : null;
  const map = {};
  rows.forEach((r,i)=>{
    if (O.co && r.city !== O.co) return;
    if (keepW && !keepW.includes(r.week)) return;
    const name = (r.opName || r.opNick || "").trim() || "—";
    const s = st[i];
    if (!map[name]) map[name] = {checks:0, sum:0, scored:0, crit:0, cities:new Set(), prods:new Set(), rows:[]};
    const o = map[name];
    o.checks++;
    if (s.score!==null){ o.sum += s.score; o.scored++; }
    if (s.verdict==="критично") o.crit++;
    o.cities.add(r.city); o.prods.add(r.producer||"—");
    o.rows.push({r, s});
  });
  const selRows = [].concat(...Object.values(map).map(o=>o.rows));
  const weeks = [...new Set(selRows.map(x=>x.r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b));
  const ops = Object.entries(map).map(([name,o])=>{
    const perWeek = weeks.map(w=>{
      const rs = o.rows.filter(x=>x.r.week===w && x.s.score!==null);
      return rs.length ? rs.reduce((a,x)=>a+x.s.score,0)/rs.length : null;
    });
    const known = perWeek.filter(v=>v!==null);
    const trend = known.length>=2 ? (known[known.length-1] - known[known.length-2]) : 0;
    const scored = o.rows.filter(x=>x.s.score!==null);
    const best = scored.length ? Math.max.apply(null, scored.map(x=>x.s.score)) : null;
    const worst = scored.length ? Math.min.apply(null, scored.map(x=>x.s.score)) : null;
    const catNames = catNamesFor(o.rows); // v7.7: по названию — у НСК свой чек-лист
    const catBad = catNames.map(n=>o.rows.filter(x=>x.s.st && isDev(stByName(x.r, x.s.st, n))).length); // сколько раз отклонение (замечание или плохо)
    const catW = catNames.map(n=>o.rows.filter(x=>x.s.st && stByName(x.r, x.s.st, n)==="bad").length + 0.5 * o.rows.filter(x=>x.s.st && stByName(x.r, x.s.st, n)==="warn").length); // вес для «слабого места»
    const mxBad = Math.max.apply(null, catW.concat([0]));
    const weak = mxBad > 0 ? catNames[catW.indexOf(mxBad)] : "";
    const nickRow = o.rows.find(x=>x.r.opNick);
    return { name, nick: nickRow ? nickRow.r.opNick : "", checks:o.checks, avg: o.scored ? o.sum/o.scored : null, best, worst,
      crit:o.crit, cities:[...o.cities], prods:[...o.prods], rows:o.rows, perWeek, trend, known, catBad, catNames, weak };
  });
  const val = (o,k)=> k==="name" ? o.name : k==="weak" ? o.weak : k==="avg" ? (o.avg ?? -1) : k==="trend" ? (o.known.length>=2 ? o.trend : -99) : k==="checks" ? o.checks : o.crit;
  ops.sort((a,b)=>{ const x = val(a,O.sort), y = val(b,O.sort); const c = typeof x==="string" ? String(x).localeCompare(String(y), "ru") : (x - y); return (c * O.dir) || ((b.avg ?? -1) - (a.avg ?? -1)); });
  const trendHead = weeks.length > 1 ? weeks.length + " " + o7Wk(weeks.length) : "Тренд";
  const heads = [["name","Оператор",""],["avg","Средняя оценка",""],["trend",trendHead,""],["weak","Слабое место",""],["checks","Проверок","r"],["crit","Критичных","r"]];
  const spark = o=>{
    const pv = o.perWeek.map((v,i)=>v===null?null:[i,v]).filter(Boolean);
    if (pv.length < 2) return `<span class="op7-tnone">—</span>`;
    const vs = pv.map(p=>p[1]), mn = Math.min.apply(null, vs), mx = Math.max.apply(null, vs), sp = (mx - mn) || 1, n = Math.max(1, o.perWeek.length - 1);
    const pts = pv.map(p=>(3 + p[0]*(58/n)).toFixed(1) + "," + (19 - (p[1]-mn)/sp*16).toFixed(1)).join(" ");
    const up = o.trend > 0.2, dn = o.trend < -0.2;
    const c = up ? "var(--ok)" : dn ? "var(--bad-t)" : "var(--dim)";
    const t = up ? "▲ +" + fmtSc(o.trend) : dn ? "▼ " + fmtSc(o.trend) : (Math.abs(o.trend) < 0.05 ? "— 0" : "— " + (o.trend > 0 ? "+" : "") + fmtSc(o.trend));
    return `<svg class="spark" width="64" height="22" viewBox="0 0 64 22" aria-hidden="true"><polyline points="${pts}" style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round"></polyline></svg><span style="color:${c}">${t}</span>`;
  };
  const sub = weeks.length ? "рейтинг за " + weeks.length + " " + o7Wk(weeks.length, true) + " · " + o7Range(weeks) : "рейтинг по проверкам";
  document.getElementById("content").innerHTML = `<div class="o7pg">
    <div class="o7-head"><h1>Операторы</h1><span class="o7-sub">${esc(sub)}</span><span class="o7-sp"></span>
      ${coList.length > 1 ? `<div class="o7-seg" role="group" aria-label="Компания"><button class="${O.co?"":"on"}" data-opco=""><i style="background:var(--dim)"></i>Все</button>${coList.map(c=>`<button class="${O.co===c?"on":""}" data-opco="${esc(c)}"><i style="background:${O7_CVAR[c]||"var(--faint)"}"></i>${esc(clabel(c))}</button>`).join("")}</div>` : ""}
      ${perOpts.length > 1 ? `<select class="o7-sel" id="op7-per" aria-label="Период">${perOpts.map(p=>`<option value="${p[0]}"${p[0]===O.per?" selected":""}>${esc(p[1])}</option>`).join("")}</select>` : ""}
    </div>
    <section class="o7-card op7-card">${ops.length ? `<div class="o7-scroll"><table class="op7-t"><thead><tr><th class="op7-n">#</th>${heads.map(h=>{ const on = O.sort===h[0]; return `<th class="${h[2]==="r"?"r":""}" aria-sort="${on?(O.dir>0?"ascending":"descending"):"none"}"><button class="op7-sort${on?" on":""}" data-opsort="${h[0]}">${esc(h[1])}${on?(O.dir>0?" ↑":" ↓"):""}</button></th>`; }).join("")}<th class="op7-goh"><span class="sr">история</span></th></tr></thead><tbody>${
      ops.map((o,i)=>{
        const c = o7ScVar(o.avg);
        const catsTop = o.catBad.map((v,j)=>[o.catNames[j], v]).filter(x=>x[1] > 0).sort((a,b)=>b[1]-a[1]);
        return `<tr class="op op7-r" data-i="${i}" tabindex="0" aria-expanded="false">
          <td class="op7-n">${i+1}</td>
          <td><div class="op7-who"><b>${esc(o.name)} <span>${esc(o.nick)}</span></b>${AUTH.prod ? "" : `<span class="op7-cos">${o.cities.map(c=>o7CoChip(c, true)).join("")}</span>`}</div></td>
          <td><div class="op7-sc">${o.avg!==null ? `<span class="op7-bar"><i style="width:${(o.avg*100/MAX_SCORE).toFixed(1)}%;background:${c}"></i></span><b style="color:${c}">${fmtSc(o.avg)}/${MAX_SCORE}</b><span class="op7-pct">${pct(o.avg)}%</span>` : `<span class="op7-tnone">не проверено</span>`}</div></td>
          <td><div class="op7-tr">${spark(o)}</div></td>
          <td class="op7-weak">${o.weak ? esc(o.weak) : '<span class="op7-tnone">—</span>'}</td>
          <td class="r op7-num">${o.checks}</td>
          <td class="r op7-num" style="color:${o.crit>0?"var(--bad-t)":"var(--dim)"}">${o.crit}</td>
          <td class="op7-go"><button class="op7-ic" data-opgo="${esc(o.name)}" title="показать все проверки оператора" aria-label="все проверки: ${esc(o.name)}">${O7_IC_SEARCH}</button></td></tr>
        <tr class="opdet" data-o="${i}" style="display:none"><td colspan="8" class="op7-det"><div class="op7-detin">
          <div class="op7-dcol"><b class="op7-dh">Замечания и «плохо» по категориям${weeks.length>1?" за "+weeks.length+" "+o7Wk(weeks.length, true):""}</b>${catsTop.length ? catsTop.map(k=>`<div class="op7-kr"><span>${esc(k[0])}</span><span class="op7-kb"><i style="width:${Math.round(k[1]*100/Math.max(1,o.checks))}%"></i></span><b>${k[1]}</b></div>`).join("") : '<span class="op7-tnone">провалов нет</span>'}
            <div class="op7-meta">Продюсеры: ${o.prods.map(esc).join(", ")}${AUTH.prod ? "" : " · Компании: " + o.cities.map(c=>esc(clabel(c))).join(", ")}</div></div>
          <div class="op7-dcol op7-hist"><b class="op7-dh">Проверки (${o.rows.length})</b>${
            o.rows.map(x=>`<div class="drow"><b${x.s.score!==null?(x.s.score===o.best?' style="color:var(--ok)"':(x.s.score===o.worst&&o.best!==o.worst?' style="color:var(--bad-t)"':"")):""}>${x.r.week?esc(x.r.week)+" · ":""}${esc(x.r.producer||"—")} · ${esc(x.r.model||"—")}${coLbl(x.r.city)?" · "+esc(coLbl(x.r.city)):""} · ${x.s.verdict?esc(VLBL[x.s.verdict]||x.s.verdict):"не проверено"}${x.s.score!==null?" · "+fmtSc(x.s.score)+"/"+MAX_SCORE:""}</b><span>${esc(x.r.cats.map((c,j)=>c?("["+catsOf(x.r)[j]+"] "+c):"").filter(Boolean).join("  |  ") || (x.r.obs||""))}</span></div>`).join("")
          }</div></div></td></tr>`;
      }).join("")}</tbody></table></div>` : `<div class="o7-empty">Нет данных</div>`}
    </section>
    <div class="o7-hint">Клик по строке — история оператора. Клик по заголовку — сортировка. Лупа — все проверки оператора в «Обзоре».</div>
  </div>`;
  const toggle = tr=>{
    const d = document.querySelector(`tr.opdet[data-o="${tr.dataset.i}"]`);
    const open = d.style.display === "none";
    d.style.display = open ? "" : "none"; tr.classList.toggle("open", open); tr.setAttribute("aria-expanded", open ? "true" : "false");
  };
  document.querySelectorAll("tr.op").forEach(tr=>{ tr.onclick = ()=>toggle(tr); tr.onkeydown = ev=>{ if (ev.key==="Enter" || ev.key===" "){ ev.preventDefault(); toggle(tr); } }; });
  document.querySelectorAll("[data-opgo]").forEach(b=>b.onclick=(ev)=>{
    ev.stopPropagation();
    state.search = b.dataset.opgo; state.tab = "Обзор"; state.page = 1; state.quick = "";
    render(); toast("Фильтр по оператору: " + b.dataset.opgo);
  });
  document.querySelectorAll("[data-opsort]").forEach(b=>b.onclick=()=>{
    const k = b.dataset.opsort;
    if (O.sort === k) O.dir = -O.dir; else { O.sort = k; O.dir = (k==="name" || k==="weak") ? 1 : -1; }
    renderOperators(rows, st);
  });
  document.querySelectorAll("[data-opco]").forEach(b=>b.onclick=()=>{ O.co = b.dataset.opco; renderOperators(rows, st); });
  const per = document.getElementById("op7-per"); if (per) per.onchange = ()=>{ O.per = per.value; renderOperators(rows, st); };
}
