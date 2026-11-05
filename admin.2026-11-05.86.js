function renderStatus(){
  document.getElementById("pbar").innerHTML = "";
  const box = document.getElementById("content");
  const st = state.statusPg = state.statusPg || { d: null, err: "", loading: false, deep: false };
  const d = st.d;
  const c = d ? (d.counters || {}) : {};
  const yes = v => v ? '<span style="color:var(--ok)">есть</span>' : '<span style="color:var(--faint)">нет</span>';
  const kv = (k, v) => `<div class="st7-kv"><span>${esc(k)}</span><b>${v}</b></div>`;
  const chip = !d ? (st.err ? ["bad", "Сервер не ответил"] : ["dim", "Загрузка…"]) : (d.health && !d.health.ok) ? ["bad", "Есть проблемы"] : ["ok", "Всё работает"];
  let body = "";
  if (d){
    const hitN = (+c.readhit || 0) + (+c.readmiss || 0);
    const tiles = [["Последнее чтение", esc(d.lastRead || "—"), "кэш до 6 ч"],
      ["Запросов сегодня", o7Fmt(c.req), hitN ? Math.round((+c.readhit || 0) * 100 / hitN) + "% из кэша" : "приблизительно"],
      ["Вызовов ИИ", o7Fmt(c.ai), esc(d.aiProvider || "")],
      ["Активных сессий", o7Fmt(d.sessions), "входы пользователей"]];
    const lim = [["UrlFetch — ИИ и Drive", +c.urlfetch || 0, 20000, o7Fmt(+c.urlfetch || 0) + " из ~20 000", "в сутки"],
      ["Script Properties", d.propsSizeKB, d.propsLimitKB, (d.propsSizeKB != null ? d.propsSizeKB + " КБ из " + d.propsLimitKB + " КБ" : "—"), "хранилище настроек"],
      ["Список пользователей", d.usersSize, 9000, (d.usersSize != null ? o7Fmt(d.usersSize) + " из ~9 000 симв." : "—"), d.userChunks ? "USERS_JSON + кусков: " + d.userChunks : "USERS_JSON · дальше — следующий блок автоматически"]];
    const h = d.health;
    const step = (ok, t) => `<div class="st7-step${ok?"":" bad"}">${ok ? O7_IC_OK : O7_IC_BAD}<span>${esc(t)}</span></div>`;
    const selfHtml = (st.selfRun ? `<div class="st7-step"><span class="st7-spin"></span><span>Проверяю сервер… (до минуты)</span></div>` : "")
      + (h ? ((h.problems||[]).map(x=>step(false, x)).join("") + (h.info||[]).map(x=>step(true, x)).join("") + (!(h.problems||[]).length && !(h.info||[]).length ? step(!!h.ok, h.ok ? "Всё в порядке" : "Есть проблемы") : "")
          + `<span class="o7-hint">Последняя проверка: ${esc(h.t || "—")}</span>`)
        : (st.selfRun ? "" : '<div class="o7-hint">Ещё не запускалась — включи в таблице «Дашборд → Самопроверка» или нажми «Проверить сейчас».</div>'));
    const TN = {"read:snap":"чтение из снимка","read:build":"чтение со сборкой","read:same":"автообновление «без изменений»","snapbuild":"сборка снимка","save":"сохранение разбора","touch":"«проверено сегодня»","upload":"загрузка скрина","thumbs":"миниатюры","pmsave":"мониторинг продюсера: сохранение","pmread":"мониторинг продюсера: чтение","pmupload":"мониторинг продюсера: скрин","ping":"уведомления","auth":"вход"};
    const times = Object.keys(d.times || {});
    body = `
    <div class="st7-tiles">${tiles.map(t=>`<div class="o7-card st7-tile"><span>${t[0]}</span><b>${t[1]}</b><small>${t[2]}</small></div>`).join("")}</div>
    <div class="st7-two">
      <section class="o7-card st7-box"><h2>Лимиты Google</h2>${lim.map(l=>{ const p = l[2] ? (+l[1] || 0) * 100 / l[2] : 0; const col = p > 80 ? "var(--bad)" : p > 60 ? "var(--warn)" : "var(--ok)"; return `<div class="st7-lim"><div><span>${esc(l[0])}</span><b>${esc(l[3])}</b></div><span class="st7-bar"><i style="width:${Math.min(100, Math.max(1.5, p)).toFixed(1)}%;background:${col}"></i></span><small>${esc(l[4])}</small></div>`; }).join("")}</section>
      <section class="o7-card st7-box"><h2>Самопроверка</h2>${selfHtml}</section>
    </div>
    <section class="o7-card st7-errs"><div class="st7-eh"><h2>Последние ошибки</h2><span class="st7-cnt">${d.errors.length}</span></div>
      ${d.errors.length ? d.errors.map(e=>`<div class="st7-er"><span>${esc(e.t)}</span><b>${esc(e.a)}</b><span>${esc(e.m)}</span></div>`).join("") : '<div class="o7-empty">Ошибок нет</div>'}</section>
    <details class="o7-card st7-more" id="st7-more"${st.more ? " open" : ""}><summary>Подробно: кэш, время ответа, свойства скрипта</summary>
      <div class="st7-two">
        <div class="st7-col"><h3>Сегодня (приблизительно, кэш ≤ 6 ч)</h3>
          ${kv("чтение из кэша / с листов", (c.readhit||0) + " / " + (c.readmiss||0))}${kv("автообновлений без изменений", c.readsame||0)}${kv("снимок: собран / поправлен", (c.snapbuild||0) + " / " + (c.snappatch||0))}${kv("миниатюр из кэша сервера", c.thumbhit||0)}${d.saved ? kv("кэш сэкономил сегодня", "≈ " + (d.saved.ms >= 60000 ? Math.floor(d.saved.ms/60000) + " мин " + Math.round((d.saved.ms%60000)/1000) + " с" : Math.round(d.saved.ms/1000) + " с") + ` <small>(чтений из снимка ${d.saved.readhit}, без изменений ${d.saved.readsame}, правок снимка ${d.saved.snappatch}, миниатюр ${d.saved.thumbhit}${d.saved.estimated ? "; оценка — замеров сборки сегодня ещё нет" : ""})</small>`) : ""}${kv("ускорение (снимок)", d.snap ? (d.snap.on ? "включено" : "выключено (SNAP_OFF)") + (d.snap.warm === true ? " · прогрев раз в минуту" : d.snap.warm === false ? " · прогрев не включён" : "") : "—")}${kv("провайдер ИИ", esc(d.aiProvider || "—"))}${kv("сессий", o7Fmt(d.sessions))}
          ${times.length ? `<h3>Среднее время ответа сервера сегодня</h3>` + times.map(k=>kv(TN[k]||k, (d.times[k].avg/1000).toFixed(2) + " с · " + d.times[k].n + " раз")).join("") : ""}</div>
        <div class="st7-col"><h3>Свойства скрипта (только наличие)</h3>${Object.keys(d.props).map(k=>kv(k, yes(d.props[k]))).join("") || '<div class="o7-hint">—</div>'}
          ${Object.keys(d.sched||{}).length ? `<h3>Расписания</h3>${Object.keys(d.sched).map(k=>kv(k, esc(d.sched[k]))).join("")}` : ""}</div>
      </div></details>`;
  }
  box.innerHTML = `<div class="o7pg">
    <div class="o7-head"><h1>Состояние</h1><span class="st7-chip ${chip[0]}"><i></i>${chip[1]}</span><span class="o7-sub">сайт ${esc(CONFIG.VER)}${d ? " · сервер " + esc(d.ver) : ""}</span><span class="o7-sp"></span>
      <button class="o7-btn" id="stp-ref">Обновить</button> <button class="o7-btn" id="stp-deep" title="открыть таблицы расписаний (только чтение)">Доступ к расписаниям</button> <button class="o7-pri" id="stp-self"${st.selfRun ? " disabled" : ""}>Проверить сейчас</button></div>
    ${d && d.ver !== CONFIG.VER ? `<section class="st7-ban"><b>Версии разные</b><span>сайт ${esc(CONFIG.VER)} · сервер ${esc(d.ver)} — обнови Code.gs или страницу.</span></section>` : ""}
    ${st.err ? `<section class="st7-ban bad"><b>Ошибка</b><span>${esc(st.err)}</span></section>` : ""}
    ${performancePanel85()}
    ${!d ? '<div class="o7-card o7-empty">Загружаю…</div>' : body}
  </div>`;
  const load = deep => { st.loading = true; st.err = ""; wp({ action:"status", deep: !!deep }, 60000).then(r=>{ if (r && r.error) throw new Error(r.error); r = r || {}; r.counters = r.counters || {}; r.errors = Array.isArray(r.errors) ? r.errors : []; r.props = r.props || {}; st.d = r; }).catch(e=>{ st.err = e.message; }).finally(()=>{ st.loading = false; if (state.tab==="Состояние") renderStatus(); }); };
  if (!d && !st.loading && !st.err) load(false);
  document.getElementById("stp-ref").onclick = ()=>{ st.d = null; load(false); renderStatus(); };
  document.getElementById("stp-deep").onclick = ()=>{ load(true); toast("проверяю доступ…"); };
  const more = document.getElementById("st7-more"); if (more) more.ontoggle = ()=>{ st.more = more.open; };
  const sc = document.getElementById("stp-self"); if (sc) sc.onclick = async ()=>{ sc.disabled = true; st.selfRun = true; if (state.tab==="Состояние") renderStatus(); toast("Проверяю сервер… (до минуты)"); try { const r = await wp({ action:"selfcheck" }, 120000); healthShow(r); st.d = null; load(false); toast(r.ok ? "Всё в порядке" : "Найдены проблемы", !r.ok); } catch(e){ toast(e.message, true); } finally { sc.disabled = false; st.selfRun = false; if (state.tab==="Состояние") renderStatus(); } };
}
function renderUsers(){
  document.getElementById("pbar").innerHTML = "";
  const box = document.getElementById("content");
  const st = state.usersAdm = state.usersAdm || { list: null, err: "", temp: null };
  st.tab = st.tab || "list";
  const list = st.list || [];
  const hasLast = list.some(x=>x.last || x.lastLogin);
  const coChips = x => (x.cities==="all" ? CITY_ORDER : (x.cities||[])).map(c=>`<span class="o7-co"><i style="background:${O7_CVAR[c]||"var(--faint)"}"></i>${esc(CO_LABEL[c]||c)}</span>`).join("") || '<span class="o7-co">—</span>';
  const rowsHtml = list.map(x=>{
    const rl = O7_ROLES.find(r=>r[0]===o7RoleOf(x));
    return `<tr class="us7-r${x.off?" uoff":""}">
      <td><div class="us7-who"><span class="us7-av" aria-hidden="true">${esc(String(x.name||x.u||"?").trim().charAt(0).toUpperCase())}</span><div><b>${esc(x.name||x.u)}${x.admin?' <span class="us7-adm" title="в ADMIN_LOGINS">админ</span>':""}${x.off?' <span class="us7-offt">отключён</span>':""}</b><small>${esc(x.u)}</small></div></div></td>
      <td><span class="us7-role" title="${esc(userRoleText(x))}">${rl ? rl[1] : esc(userRoleText(x))}</span>${typeof x.prod === "string" && x.prod ? `<small class="us7-pn">«${esc(x.prod)}»</small>` : ""}</td>
      <td><div class="us7-cos">${coChips(x)}</div></td>
      ${hasLast ? `<td class="us7-last">${x.off ? "отключён" : esc(x.last || x.lastLogin || "—")}</td>` : ""}
      <td><button class="us7-sw${x.off?"":" on"}" role="switch" aria-checked="${x.off?"false":"true"}" aria-label="Доступ: ${esc(x.u)}" title="${x.off?"включить":"отключить"}" data-uoff="${esc(x.u)}" data-on="${x.off?"1":""}"><i></i></button></td>
      <td class="us7-act"><button class="o7-btn sm" data-uedit="${esc(x.u)}">Изменить</button> <button class="o7-btn sm" data-ureset="${esc(x.u)}" title="выдать временный пароль">Пароль</button></td></tr>`;
  }).join("");
  const ncol = hasLast ? 6 : 5;
  box.innerHTML = `<div class="o7pg">
    <div class="o7-head"><h1>Пользователи</h1><span class="o7-sub" title="Новый или сброшенный пароль показывается один раз. Все изменения пишутся в скрытый лист «Журнал пользователей».">права проверяет сервер · пароли здесь не видны · изменения пишутся в журнал</span><span class="o7-sp"></span>
      <div class="o7-seg" role="tablist" aria-label="Раздел"><button role="tab" class="${st.tab==="list"?"on":""}" data-utab="list" aria-selected="${st.tab==="list"}">Список</button><button role="tab" class="${st.tab==="log"?"on":""}" data-utab="log" aria-selected="${st.tab==="log"}">Журнал входов</button></div>
      <button class="o7-pri" id="u-new">+ Пользователь</button></div>
    ${st.err ? `<section class="st7-ban"><b>Внимание</b><span>${esc(st.err)}</span></section>` : ""}
    <div class="us7-wrap" id="u-pane-list"${st.tab==="list" ? "" : " hidden"}>
      <section class="o7-card us7-tbl"><div class="o7-scroll"><table class="us7-t"><thead><tr><th>Пользователь</th><th>Роль</th><th>Компании</th>${hasLast?"<th>Последний вход</th>":""}<th>Доступ</th><th></th></tr></thead><tbody>${st.list ? (rowsHtml || `<tr><td colspan="${ncol}" class="o7-empty">Пользователей нет</td></tr>`) : `<tr><td colspan="${ncol}" class="o7-empty">Загружаю…</td></tr>`}</tbody></table></div></section>
      <aside class="o7-card us7-form" id="u-form">
        ${st.temp ? `<div class="us7-temp"><b>Временный пароль для ${esc(st.temp.u)}</b><div><code id="u-temp">${esc(st.temp.p)}</code><button class="o7-btn" id="u-copy">Копировать</button></div><span>Передай лично — больше он не покажется. <button class="us7-link" id="u-tempx">Скрыть</button></span></div>` : ""}
        <b class="us7-ft" id="u-formtitle">Новый пользователь</b>
        <div class="us7-2"><label>Логин<input id="u-login" placeholder="латиница" autocomplete="off"></label><label>Имя<input id="u-name" placeholder="как в таблице" autocomplete="off"></label></div>
        <span class="us7-lb">Роль</span>
        <select id="u-role" hidden><option value="view">просмотр</option><option value="dir">директор (все компании, просмотр)</option><option value="edit">смотрящий/редактор</option><option value="prod">продюсер</option></select>
        <div class="us7-roles">${O7_ROLES.map(r=>`<button type="button" class="us7-rc" data-urole="${r[0]}" aria-pressed="false"><b>${r[1]}</b><span>${r[2]}</span></button>`).join("")}</div>
        <label class="us7-prodl" id="u-prodwrap">Имя продюсера<input id="u-prod" placeholder="как в таблице" autocomplete="off"></label>
        <span class="us7-lb">Компании <small id="u-dirnote">— директор видит все</small></span>
        <div class="us7-cpick ucities">${CITY_ORDER.map(c=>`<label class="us7-cc"><input type="checkbox" class="u-city" value="${c}"><i style="background:${O7_CVAR[c]}"></i>${CO_LABEL[c]}</label>`).join("")}</div>
        <button class="o7-pri us7-go" id="u-add">Добавить пользователя</button>
        <button class="o7-pri us7-go" id="u-save" hidden>Сохранить изменения</button>
      </aside>
    </div>
    <section class="o7-card us7-log" id="u-pane-log"${st.tab==="log" ? "" : " hidden"}>
      <div class="us7-logh"><span>Кто, когда и с какого устройства входил (и неудачные попытки). IP-адреса Google Apps Script не передаёт — видно тип устройства и браузер.</span><button class="o7-btn sm" id="u-loglist">Показать последние 300</button></div>
      <div id="u-logbox"></div></section>
  </div>`;
  if (!st.list && !st.loading){
    st.loading = true;
    wp({ action:"users" }).then(r=>{ st.list = r.list || []; st.err = r.adminsConfigured ? "" : "ADMIN_LOGINS не задан"; if (r.sizeMain > r.chunkLimit * 0.85) st.err = "USERS_JSON близок к лимиту — следующие записи уйдут в USERS_JSON_1…"; })
      .catch(e=>{ st.err = e.message; st.list = []; }).finally(()=>{ st.loading = false; if (state.tab==="Пользователи") renderUsers(); });
  }
  let editU = "";
  const syncForm = ()=>{
    const role = document.getElementById("u-role").value;
    box.querySelectorAll("[data-urole]").forEach(b=>{ const on = b.dataset.urole === role; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on ? "true" : "false"); });
    document.getElementById("u-prodwrap").hidden = role !== "prod";
    box.querySelector(".us7-cpick").classList.toggle("all", role === "dir");
    document.getElementById("u-dirnote").hidden = role !== "dir";
    document.getElementById("u-add").hidden = !!editU; document.getElementById("u-save").hidden = !editU;
    document.getElementById("u-formtitle").textContent = editU ? "Изменить: " + editU : "Новый пользователь";
  };
  syncForm();
  const form = ()=>{
    const role = document.getElementById("u-role").value;
    const cities = role==="dir" ? "all" : [...document.querySelectorAll(".u-city:checked")].map(x=>x.value);
    return { login: document.getElementById("u-login").value.trim(), name: document.getElementById("u-name").value.trim(),
      edit: role==="edit", prod: role==="prod" ? document.getElementById("u-prod").value.trim() : "", cities: cities };
  };
  const run = (body, okMsg)=> wp(Object.assign({ action:"useradmin" }, body)).then(r=>{
      if (r.tempPass) st.temp = { u: body.login, p: r.tempPass };
      st.list = null;
      const bl = r.blocks || [], made = bl.filter(b=>b.created), bad = bl.filter(b=>b.error); // v7.6: блок продюсера в компаниях
      toast(okMsg + (made.length ? " · продюсер добавлен в " + made.map(b=>clabel(b.city)).join(", ") : "") + (bad.length ? " · не удалось: " + bad.map(b=>clabel(b.city) + " — " + b.error).join("; ") : ""), !!bad.length);
      if (made.length) setTimeout(()=>load({ force: true }), 600);
      renderUsers();
    }).catch(e=>toast(e.message, true));
  box.querySelectorAll("[data-urole]").forEach(b=>b.onclick=()=>{ document.getElementById("u-role").value = b.dataset.urole; syncForm(); });
  const prodCityOk = f=>{ if (document.getElementById("u-role").value !== "prod") return true; if (f.prod === ""){ toast("укажи фамилию продюсера — как в таблице", true); return false; } if (!Array.isArray(f.cities) || !f.cities.length){ toast("отметь компанию продюсера — иначе он ничего не увидит", true); return false; } return true; };
  document.getElementById("u-add").onclick = ()=>{ const f = form(); if (!prodCityOk(f)) return; run(Object.assign({ op:"add" }, f), "пользователь добавлен"); };
  document.getElementById("u-save").onclick = ()=>{ const f = form(); if (!f.login) return toast("выбери пользователя (Изменить)", true); if (!prodCityOk(f)) return; run(Object.assign({ op:"set" }, f), "сохранено — пользователю нужно войти заново"); };
  const tx = document.getElementById("u-tempx"); if (tx) tx.onclick = ()=>{ st.temp = null; renderUsers(); };
  const showTab = t=>{
    st.tab = t;
    box.querySelectorAll("[data-utab]").forEach(b=>{ const on = b.dataset.utab === t; b.classList.toggle("on", on); b.setAttribute("aria-selected", on ? "true" : "false"); });
    document.getElementById("u-pane-list").hidden = t !== "list"; document.getElementById("u-pane-log").hidden = t !== "log";
    if (t === "log" && !document.getElementById("u-logbox").innerHTML) loginLogLoad(document.getElementById("u-logbox"));
  };
  box.querySelectorAll("[data-utab]").forEach(b=>b.onclick=()=>showTab(b.dataset.utab));
  if (st.tab === "log") showTab("log");
  document.getElementById("u-new").onclick = ()=>{
    editU = ""; showTab("list");
    ["u-login","u-name","u-prod"].forEach(id=>{ document.getElementById(id).value = ""; });
    document.getElementById("u-role").value = "view"; document.querySelectorAll(".u-city").forEach(c=>{ c.checked = false; });
    syncForm(); const f = document.getElementById("u-form"); if (f.scrollIntoView) f.scrollIntoView({ block: "nearest", behavior: "smooth" }); document.getElementById("u-login").focus();
  };
  const ll = document.getElementById("u-loglist"); if (ll) ll.onclick = ()=>loginLogLoad(document.getElementById("u-logbox")); // v6.6
  const cp = document.getElementById("u-copy"); if (cp) cp.onclick = ()=>{ try{ navigator.clipboard.writeText(st.temp.p); toast("скопировано"); }catch(e){} };
  box.querySelectorAll("[data-uedit]").forEach(b=>b.onclick=()=>{
    const x = (st.list||[]).find(q=>q.u===b.dataset.uedit); if (!x) return;
    editU = x.u;
    document.getElementById("u-login").value = x.u; document.getElementById("u-name").value = x.name||"";
    document.getElementById("u-role").value = o7RoleOf(x);
    document.getElementById("u-prod").value = x.prod||"";
    document.querySelectorAll(".u-city").forEach(c=>{ c.checked = x.cities==="all" || (x.cities||[]).includes(c.value); });
    syncForm(); const f = document.getElementById("u-form"); if (f.scrollIntoView) f.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
  box.querySelectorAll("[data-ureset]").forEach(b=>b.onclick=()=>{ if (confirm("Выдать новый временный пароль для «"+b.dataset.ureset+"»? Старый перестанет работать, все входы погаснут.")) run({ op:"reset", login:b.dataset.ureset }, "пароль сброшен"); });
  box.querySelectorAll("[data-uoff]").forEach(b=>b.onclick=()=>{ const on = !!b.dataset.on; if (on || confirm("Отключить «"+b.dataset.uoff+"»? Вход и все сессии будут закрыты.")) run({ op: on?"on":"off", login:b.dataset.uoff }, on?"включён":"отключён"); });
}
