
// ================== v7: новый дизайн — иконки, тема, профиль, большое поле, движение ==================
// Только оформление и удобство: данные, запросы к серверу и права не меняются.
var V7P = {"cal": "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4", "bell": "M6 16V11a6 6 0 0112 0v5l1.5 2h-15zM10 20.5a2 2 0 004 0", "sun": "M12 17a5 5 0 100-10 5 5 0 000 10zM12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4", "moon": "M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z", "plus": "M12 5v14M5 12h14", "key": "M15 9a4 4 0 11-1.2-2.8M14 10l7 7v3h-3v-2h-2v-2h-2", "bulb": "M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0012 3z", "screen": "M3 5h18v11H3zM8 20h8M12 16v4", "week": "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4M12 13v4M10 15h4", "eye": "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z", "out": "M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10", "help": "M12 21a9 9 0 100-18 9 9 0 000 18zM9.5 9a2.5 2.5 0 114 2c-.9.6-1.5 1.1-1.5 2.2M12 17h.01", "spark": "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"};
function v7svg(p, w){ return '<svg class="v7i" viewBox="0 0 24 24" width="' + (w||17) + '" height="' + (w||17) + '" aria-hidden="true"><path d="' + p + '"/></svg>'; }
var V7TAB = {
  "Обзор": "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  "Итог": "M6 3h9l4 4v14H6zM9 12h7M9 16h7M9 8h4",
  "Операторы": "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5M16 4.5a3.5 3.5 0 010 6.5M18 14.8c2 .7 3.3 2.5 3.5 5.2",
  "Рекомендации": "M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0012 3z",
  "Мои задачи": "M5 4h14v16H5zM9 9l2 2 4-4M9 15h6",
  "Мониторинг продюсеров": "M9 4h6v3H9zM7 5.5H5V21h14V5.5h-2M8.5 12l2 2 4-4M8.5 17h7",
  "Мой мониторинг": "M9 4h6v3H9zM7 5.5H5V21h14V5.5h-2M8.5 12l2 2 4-4M8.5 17h7",
  "Лента": "M3 12h4l3-8 4 16 3-8h4",
  "Смены": "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4",
  "Расписание": "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  "Карта": "M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z",
  "Состояние": "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  "Пользователи": "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c.8-4 4-6 8-6s7.2 2 8 6",
  "Сравнение": "M12 4v16M5 8h14M5 8l-3 6a3 3 0 006 0zM19 8l-3 6a3 3 0 006 0z",
  "Сводка": "M4 20V10M10 20V4M16 20v-7M22 20H2",
  "Чек": "M4 20V10M10 20V4M16 20v-7M22 20H2"
};
var V7_USER = "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c.8-4 4-6 8-6s7.2 2 8 6";
var V7I = {
  bell: v7svg(V7P.bell, 18),
  bulb: v7svg(V7P.bulb),
  spark: '<svg class="v7i" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" style="display:inline-block;vertical-align:-2px;stroke:var(--accent)"><path d="' + V7P.spark + '"/></svg>',
  r: {
    companies: v7svg("M4 21V5l8-2v18M12 8h8v13M8 8v.01M8 12v.01M8 16v.01M16 12v.01M16 16v.01", 15),
    users: v7svg(V7TAB["Операторы"], 15),
    tools: v7svg("M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z", 15),
    cal: v7svg(V7TAB["Смены"], 15),
    clock: v7svg(V7TAB["Расписание"], 15),
    user: v7svg(V7_USER, 15),
    collapse: v7svg("M15 6l-6 6 6 6", 16),
    expand: v7svg("M9 6l6 6-6 6", 16)
  }
};
function v7RailIcon(c){
  var co = { "Томск": "var(--art)", "Новосибирск": "var(--vv)", "Онлайн": "var(--dia)" };
  if (co[c]) return '<i class="v7co" style="background:' + co[c] + '"></i>';
  return v7svg(V7TAB[c] || V7_USER);
}
function v7esc(t){ return String(t == null ? "" : t).replace(/[&<>"]/g, function(ch){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]; }); }
function v7Think(text){ return '<div class="v7think" role="status"><i></i><i></i><i></i><span>' + v7esc(String(text).replace(/^🤖\s*/, "")) + '</span></div>'; }
function v7CatState(val){ var st = (typeof catState === "function") ? catState(val) : null; return st === "ok" || st === "warn" || st === "bad" ? st : ""; }

// ---------- тема ----------
function v7ThemeGet(){ try { return localStorage.getItem("dash_theme") || "dark"; } catch(e){ return "dark"; } }
function v7ThemeApply(t, anim){
  var light = t === "auto" ? !!(window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches) : t === "light";
  var h = document.documentElement;
  if (anim){ h.classList.add("theme-anim"); setTimeout(function(){ h.classList.remove("theme-anim"); }, 450); }
  h.setAttribute("data-theme", light ? "light" : "dark");
  var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute("content", light ? "#f4f5f7" : "#191c21");
  var tb = document.getElementById("themebtn");
  if (tb){ tb.innerHTML = v7svg(light ? V7P.moon : V7P.sun, 18); tb.title = light ? "Тёмная тема" : "Светлая тема"; tb.setAttribute("aria-label", tb.title); }
  document.querySelectorAll(".pm-theme button").forEach(function(b){ b.classList.toggle("on", b.dataset.theme === t); });
}
function v7ThemeSet(t){ try { localStorage.setItem("dash_theme", t); } catch(e){} v7ThemeApply(t, true); }
v7ThemeApply(v7ThemeGet(), false);
document.getElementById("themebtn").onclick = function(){ v7ThemeSet(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light"); };
document.querySelectorAll(".pm-theme button").forEach(function(b){ b.onclick = function(ev){ ev.stopPropagation(); v7ThemeSet(b.dataset.theme); }; });
try { matchMedia("(prefers-color-scheme: light)").addEventListener("change", function(){ if (v7ThemeGet() === "auto") v7ThemeApply("auto", true); }); } catch(e){}

// ---------- профиль ----------
function v7Profile(nm){
  var ok = AUTH.ok();
  var name = ok ? (nm || AUTH.name || AUTH.user || "") : "Вход";
  var role = !ok ? "" : state.viewAs ? "режим просмотра" : AUTH.edit ? "смотрящий" : AUTH.prod ? "продюсер"
    : (AUTH.cities || []).includes("all") ? "директор · просмотр" : (clabel((AUTH.cities || [])[0] || "") + " · просмотр");
  document.getElementById("prof-name").textContent = name;
  document.getElementById("prof-role").textContent = role;
  document.getElementById("prof-av").textContent = (String(name).trim()[0] || "?").toUpperCase();
}
(function(){
  var wrap = document.getElementById("tbprof"), btn = document.getElementById("profbtn"), menu = document.getElementById("profmenu");
  function setOpen(o){ wrap.classList.toggle("open", o); btn.setAttribute("aria-expanded", o ? "true" : "false"); }
  btn.onclick = function(ev){ ev.stopPropagation(); setOpen(!wrap.classList.contains("open")); };
  menu.addEventListener("click", function(ev){
    if (ev.target.closest(".pm-theme") || ev.target.closest("select") || ev.target.closest(".pm-item")) return;
    if (ev.target.closest("button")) setOpen(false);
  });
  document.addEventListener("click", function(ev){ if (!ev.target.closest("#tbprof")) setOpen(false); });
  document.addEventListener("keydown", function(ev){ if (ev.key === "Escape") setOpen(false); });
  document.getElementById("viewas").addEventListener("change", function(){ setOpen(false); });
})();

// ---------- категории: состояние, счётчик, авто-высота ----------
function v7CatSync(ta){
  if (!/^ed.+_\d$/.test(ta.id || "")) return; // v7.3: поле совета (adv…) не меняет статус категории
  var f = ta.closest(".f.cat"); if (!f) return;
  var ns = v7CatState(ta.value), changed = f.dataset.st !== ns;
  f.dataset.st = ns; v7AriaSeg(f); const legacy=f.querySelector(".nsk-legacy"); if(legacy)legacy.hidden=ns!=="warn";
  if (f.querySelector(".qsc")){ var sc = scaleOf(ta.value); f.querySelectorAll(".qsc").forEach(function(b){ b.setAttribute("aria-pressed", String(+b.dataset.sc === sc)); }); } if (changed && ns) fxClass(f, "stflash", 700);
  var l = f.querySelector(".ta-len"); if (l) l.textContent = ta.value.length ? ta.value.length + " симв." : "";
  if (!("fieldSizing" in ta.style)){ ta.style.height = "auto"; ta.style.height = Math.min(Math.max(ta.scrollHeight + 2, 56), 300) + "px"; }
}
document.addEventListener("input", function(ev){
  var t = ev.target;
  if (t && t.tagName === "TEXTAREA" && t.closest(".f.cat")) v7CatSync(t);
}, true);

// ---------- большой редактор ----------
var v7Big = null;
function v7BigOpen(id){
  var ta = document.getElementById(id); if (!ta) return;
  var m = /^ed(.+)_(\d)$/.exec(id); if (!m) return;
  v7Big = { key: m[1], j: +m[2] };
  var x = state.lastView && state.lastView[m[1]];
  document.getElementById("be-num").textContent = (+m[2] + 1);
  document.getElementById("be-title").textContent = (x ? catsOf(x.r) : CATS)[+m[2]] || "";
  document.getElementById("be-team").textContent = x ? [(x.r.opName || x.r.opNick || ""), (x.r.model || "")].filter(Boolean).join(" · ") : "";
  var be = document.getElementById("be-ta"); be.value = ta.value;
  v7BigMeta();
  openModal("bigedit");
  setTimeout(function(){ be.focus(); var n = be.value.length; try { be.setSelectionRange(n, n); } catch(e){} }, 60);
}
function v7BigMeta(){
  if (!v7Big) return;
  var be = document.getElementById("be-ta"), st = v7CatState(be.value), chip = document.getElementById("be-chip");
  chip.className = "chip " + (st === "bad" ? "c-bad" : st === "warn" ? "c-warn" : st === "ok" ? "c-ok" : "");
  chip.textContent = ST_LBL[st] || "";
  chip.style.display = st ? "" : "none";
  document.getElementById("be-meta").textContent = be.value.length + " симв. · всё сразу пишется в черновик карточки";
}
document.getElementById("be-ta").addEventListener("input", function(){
  if (!v7Big) return;
  var ta = document.getElementById("ed" + v7Big.key + "_" + v7Big.j); if (!ta) return;
  ta.value = this.value; ta.dispatchEvent(new Event("input", { bubbles: true }));
  v7BigMeta();
});
function v7BigStep(d){ if (!v7Big) return; var j = (v7Big.j + d + 9) % 9; v7BigOpen("ed" + v7Big.key + "_" + j); }
document.getElementById("be-prev").onclick = function(){ v7BigStep(-1); };
document.getElementById("be-next").onclick = function(){ v7BigStep(1); };
document.getElementById("be-ok").onclick = document.getElementById("be-x").onclick = function(){ closeModal("bigedit"); };
document.addEventListener("click", function(ev){
  var b = ev.target.closest && ev.target.closest(".ta-exp"); if (!b) return;
  ev.stopPropagation(); ev.preventDefault(); v7BigOpen(b.dataset.exp);
}, true);

// ---------- появление экрана и «набегающие» цифры ----------
var v7LastTab = null;
function v7CountUp(root){
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.querySelectorAll(".tile .n").forEach(function(el){
    var m = /^(\d+)(%?)$/.exec(el.textContent.trim()); if (!m) return;
    var to = +m[1], suf = m[2], t0 = performance.now(), dur = 800;
    if (to < 2) return;
    (function step(t){ var k = Math.min(1, (t - t0) / dur); var e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(to * e) + suf; if (k < 1) requestAnimationFrame(step); })(t0);
  });
}
(function(){
  var c = document.getElementById("content"); if (!c || !window.MutationObserver) return;
  new MutationObserver(function(){
    var tab = (typeof state !== "undefined") ? state.tab + "|" + (state.producer || "") : "";
    if (tab === v7LastTab) return;
    v7LastTab = tab;
    c.classList.remove("v7anim"); void c.offsetWidth; c.classList.add("v7anim");
    v7CountUp(c);
    clearTimeout(c._v7t); c._v7t = setTimeout(function(){ c.classList.remove("v7anim"); }, 900);
  }).observe(c, { childList: true });
})();
// неверный вход — карточка «встряхивается»
(function(){
  var msg = document.getElementById("l-msg"); if (!msg || !window.MutationObserver) return;
  new MutationObserver(function(){
    if (/Неверн|Введи/.test(msg.textContent)){ var g = document.querySelector(".gate-card"); g.classList.remove("shake"); void g.offsetWidth; g.classList.add("shake"); }
  }).observe(msg, { childList: true, characterData: true, subtree: true });
})();
// заголовок страницы = открытый раздел
function v7Title(){
  var h1 = document.querySelector("header h1"); if (!h1) return;
  if (state.viewAs){ h1.textContent = "Глазами: " + (state.viewAs.type === "dir" ? "директор" : state.viewAs.type === "city" ? clabel(state.viewAs.name) : state.viewAs.name); return; }
  var c = state.tab;
  var t = c === "Смены" ? "Расписание" : c === "Расписание" ? "Расписание проверок" : clabel(c);
  if (c === "Обзор" && state.producer) t = "Обзор · " + state.producer;
  if (state.search) t = "Поиск: " + state.search;
  h1.textContent = t;
}

// неделя в верхней панели видна всегда: выбранная неделя, даже если на вкладке нет строк недели
function v7WeekLabel(el, wl){
  el.style.visibility = "";
  if (!wl.length){
    const all = (typeof rememberWeeks === "function") ? rememberWeeks() : [];
    el.textContent = state.week === "all" ? "Все недели" : state.week === "__month__" ? "Месяц" : state.week && state.week !== "latest" ? "Неделя " + state.week : (all.length ? "Неделя " + all[all.length - 1] : "Неделя");
  } else if (wl.length === 1) el.textContent = "Неделя " + wl[0];
}

// ================== v7: оболочка по макету — меню, неделя, поиск, «глазами», телефон, окна ==================
function v7TabLabel(c){
  if (nskAccount() && c === "Новосибирск") return "VVCAM просмотр";
  if (c === NSK_EDITOR_TAB) return "VVCAM редактор";
  if (c === "Смены") return "Смены";
  if (c === "Расписание") return "Расписание проверок";
  if (c === "Мои задачи") return AUTH.prod ? "Мои задачи" : "Задачи";
  if (c === PM_TAB_ED) return "Продюсеры";
  if (c === "Итог") return "Итог дня";
  return clabel(c);
}
function v7IsTableTab(t){ return t === "Обзор" || CITY_ORDER.includes(t) || (AUTH.prod && t === prodTabName()); }
// --- неделя в верхней панели ---
function v7WeekClose(){ const d = document.getElementById("v7wdrop"); if (d) d.remove(); const b = document.getElementById("tb-week"); if (b) b.setAttribute("aria-expanded", "false"); }
function v7WeekOpen(){
  if (document.getElementById("v7wdrop")){ v7WeekClose(); return; }
  if (!AUTH.ok()) return;
  const btn = document.getElementById("tb-week");
  const wks = rememberWeeks().slice().reverse();
  const item = (w, label, sub) => `<button class="v7w-i${state.week === w ? " on" : ""}" data-v7w="${esc(w)}" role="menuitemradio" aria-checked="${state.week === w}"><b>${esc(label)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</button>`;
  const d = document.createElement("div");
  d.id = "v7wdrop"; d.className = "v7wdrop"; d.setAttribute("role", "menu");
  d.innerHTML = item("latest", "Последняя неделя", wks[0] || "")
    + wks.slice(0, 12).map(w => item(w, w, "")).join("")
    + '<div class="v7w-sep"></div>' + item("__month__", "Месяц", "последние 4–5 недель") + item("all", "Все недели", "история")
    + ((AUTH.edit && !viewAsActive() && !nskAccount()) ? '<div class="v7w-sep"></div><button class="v7w-i v7w-new" data-v7new="1"><b>＋ Новая неделя…</b><small>создать или удалить неделю</small></button>' : "");
  document.body.appendChild(d);
  const r = btn.getBoundingClientRect();
  d.style.top = (r.bottom + 6) + "px";
  d.style.left = Math.max(8, Math.min(r.left, window.innerWidth - d.offsetWidth - 8)) + "px";
  btn.setAttribute("aria-expanded", "true");
  d.querySelectorAll("[data-v7w]").forEach(b => b.onclick = ()=>{ v7WeekClose(); railPickWeek(b.dataset.v7w); });
  const nw = d.querySelector("[data-v7new]"); if (nw) nw.onclick = ()=>{ v7WeekClose(); document.getElementById("weekbtn").click(); };
}
document.getElementById("tb-week").onclick = (ev)=>{ ev.stopPropagation(); v7WeekOpen(); };
document.addEventListener("click", ev=>{ if (!ev.target.closest("#v7wdrop") && !ev.target.closest("#tb-week")) v7WeekClose(); });
document.addEventListener("keydown", ev=>{ if (ev.key === "Escape") v7WeekClose(); });
window.addEventListener("resize", v7WeekClose);
// --- поиск в верхней панели ---
let v7SemOn = false, v7QT = null;
function v7Search(v, sem){
  let moved = false;
  if (v && !v7IsTableTab(state.tab)){
    if (anyDirty() && !confirm("Есть несохранённые правки. Правки уже в черновике и не пропадут. Перейти к поиску?")) return;
    state.tab = AUTH.prod ? prodTabName() : "Обзор"; moved = true;
  }
  state.search = v; state.page = 1; state.railSkipOnce = !moved && !!document.getElementById("railtoggle");
  render();
  const fs = document.getElementById("f-search"); if (fs && fs.value !== v) fs.value = v;
  if (sem && v){ const ai = document.getElementById("aisearch"); if (ai) ai.click(); }
}
(function(){
  const q = document.getElementById("tb-q"), sem = document.getElementById("tb-sem");
  q.addEventListener("input", ()=>{ clearTimeout(v7QT); if (v7SemOn) return; v7QT = setTimeout(()=>v7Search(q.value.trim(), false), 250); });
  q.addEventListener("keydown", ev=>{
    if (ev.key === "Enter"){ ev.preventDefault(); clearTimeout(v7QT); v7Search(q.value.trim(), v7SemOn); }
    if (ev.key === "Escape"){ q.value = ""; v7Search("", false); q.blur(); }
  });
  sem.onclick = ()=>{
    v7SemOn = !v7SemOn; sem.classList.toggle("on", v7SemOn); sem.setAttribute("aria-pressed", v7SemOn ? "true" : "false");
    q.placeholder = v7SemOn ? "Своими словами: кто не пишет первым новым — Enter" : (AUTH.edit ? "Поиск: опер, модель, ник, текст" : "Поиск: опер, модель, ник");
    q.focus();
  };
  document.addEventListener("keydown", ev=>{
    if (ev.key !== "/" || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const t = ev.target; if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
    const box = document.getElementById("tb-search"); if (!box || box.style.display === "none") return;
    ev.preventDefault(); q.focus(); q.select();
  });
})();
// --- после перестройки меню: шапка, «глазами», нижнее меню ---
function v7AfterRail(){
  const ok = AUTH.ok();
  const sb = document.getElementById("tb-search"); if (sb) sb.style.display = ok ? "" : "none";
  const sem = document.getElementById("tb-sem"); if (sem) sem.style.display = (AUTH.edit && !viewAsActive()) ? "" : "none";
  const q = document.getElementById("tb-q"); if (q && document.activeElement !== q && q.value !== (state.search || "")) q.value = state.search || "";
  const ws = document.getElementById("tb-wst");
  if (ws){ const open = state.week === "latest" && AUTH.edit && !viewAsActive(); ws.textContent = open ? "открыта" : state.week === "all" ? "все" : state.week === "__month__" ? "месяц" : ""; ws.className = "tb-wst" + (open ? " open" : ""); ws.style.display = ws.textContent ? "" : "none"; }
  const va = document.getElementById("v7va");
  if (va){
    va.style.display = state.viewAs ? "" : "none";
    if (state.viewAs) document.getElementById("v7va-t").textContent = "Режим просмотра: глазами " + (state.viewAs.type === "dir" ? "директора" : state.viewAs.type === "city" ? clabel(state.viewAs.name) : state.viewAs.name) + " · только просмотр, ничего не сохраняется";
  }
  document.body.classList.toggle("v7-viewas", !!state.viewAs);
  v7BottomNav();
}
document.getElementById("v7va-x").onclick = ()=>startViewAs("");
// --- телефон: нижнее меню и меню «Ещё» шторкой ---
function v7BottomNav(){
  const nav = document.getElementById("v7bn"); if (!nav) return;
  if (!AUTH.ok()){ nav.innerHTML = ""; return; }
  const T = tabs();
  const want = AUTH.prod ? [prodTabName(), PM_TAB_PROD, "Мои задачи"] : ["Обзор", "Лента", "Мои задачи", PM_TAB_ED];
  const list = want.filter(t => T.includes(t)).slice(0, 4);
  if (!AUTH.prod && list.length < 4){ const c = T.find(t => CITY_ORDER.includes(t)); if (c && !list.includes(c)) list.splice(1, 0, c); }
  // v7.1: бейдж — только сигнал «надо сделать» (задачи 📌, возвраты/новые ↩📥, просрочки ⏰), а не общее число команд
  const cnt = t => { const b = document.querySelector('#tabs .tab[data-t="' + CSS.escape(t) + '"] .cnt.due'); const n = b ? b.textContent.replace(/[^\d]/g, "") : ""; return n && n !== "0" ? `<span class="bdg">${esc(n)}</span>` : ""; };
  nav.innerHTML = list.slice(0, 4).map(t => `<button class="v7bn-i${activeNavTab() === t ? " on" : ""}" data-v7t="${esc(t)}" aria-current="${activeNavTab() === t ? "page" : "false"}">${v7RailIcon(t)}<span>${esc(AUTH.prod && t === prodTabName() ? "Главная" : t === PM_TAB_PROD ? "Мониторинг" : v7TabLabel(t))}</span>${cnt(t)}</button>`).join("")
    + `<button class="v7bn-i" data-v7more="1" aria-label="Все разделы">${v7svg("M5 12h.01M12 12h.01M19 12h.01", 20)}<span>Ещё</span></button>`;
  nav.querySelectorAll("[data-v7t]").forEach(b => b.onclick = ()=>{ v7Sheet(false); switchTab(b.dataset.v7t); window.scrollTo({ top: 0, behavior: "smooth" }); });
  nav.querySelector("[data-v7more]").onclick = ()=>v7Sheet(!document.body.classList.contains("v7rail-open"));
}
document.addEventListener("keydown", ev=>{ // v7.1: с клавиатуры — Enter/пробел раскрывают группу продюсера и нажимают плитки
  if ((ev.key === "Enter" || ev.key === " ") && ev.target && ev.target.matches && ev.target.matches('[role="button"][tabindex]:not(button)')){ ev.preventDefault(); ev.target.click(); }
});
function v7AriaSeg(box){ if (!box) return; const st = box.dataset.st; [["ok", ".qok,.pmx-ok"], ["warn", ".qwarn"], ["bad", ".qbad"]].forEach(([k, sel])=>box.querySelectorAll(sel).forEach(b=>b.setAttribute("aria-pressed", st === k ? "true" : "false"))); }
function v7Sheet(on){ document.body.classList.toggle("v7rail-open", !!on); }
document.addEventListener("keydown", ev=>{ if (ev.key === "Escape" && document.body.classList.contains("v7rail-open")) v7Sheet(false); }); // v7.1
document.getElementById("v7sheet-ov").onclick = ()=>v7Sheet(false);
document.getElementById("tabs").addEventListener("click", ev=>{ if (ev.target.closest(".tab, .ritem")) v7Sheet(false); });
// --- окна: шапка со значком, без эмодзи; компания и продюсер кнопками в «Новом мониторинге» ---
(function(){
  const ICON = { addmodal: "plus", weekmodal: "week", opmodal: "users", cammodal: "cam", resetmodal: "key", pwmodal: "key", rsreqmodal: "bell", sugmodal: "bulb",
    uplmodal: "cam", markmodal: "tag", vidmodal: "screen", annmodal: "pen", delmodal: "trash", taskmodal: "task", planmodal: "cal" };
  const EXTRA = { users: "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5M16 4.5a3.5 3.5 0 010 6.5M18 14.8c2 .7 3.3 2.5 3.5 5.2",
    cam: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 100-8 4 4 0 000 8z", tag: "M3 12V4h8l9 9-8 8zM7.5 7.5h.01", pen: "M4 20l4-1 11-11-3-3L5 16zM14 6l3 3",
    trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13", task: "M5 4h14v16H5zM9 9l2 2 4-4M9 15h6" };
  const SUB = { addmodal: "команда появится в таблице текущей недели", weekmodal: "создать новую неделю из текущей или удалить старую", opmodal: "новый опер или модель в этой команде",
    pwmodal: "после смены остальные входы погаснут", taskmodal: "появится у продюсера в «Мои задачи»", planmodal: "план работ по команде продюсера на неделю",
    markmodal: "цвет, подпись и закрепление — видят все", delmodal: "действие необратимо", uplmodal: "Ctrl+V, перетаскивание или файлы", sugmodal: "идея, неудобство или ошибка — смотрящий увидит" };
  document.querySelectorAll(".modal-ov").forEach(ov=>{
    const h = ov.querySelector(".modal > h3"); if (!h || ov.id === "bigedit") return;
    // убираем ведущий эмодзи в первом текстовом узле
    const tn = [...h.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
    if (tn) tn.textContent = tn.textContent.replace(/^\s*[^\wА-Яа-яЁё«(]+\s*/u, "");
    const k = ICON[ov.id] || "spark";
    const path = (typeof V7P !== "undefined" && V7P[k]) || EXTRA[k] || V7P.spark;
    const wrap = document.createElement("div"); wrap.className = "v7mh";
    wrap.innerHTML = `<span class="v7mh-i">${v7svg(path, 18)}</span><div class="v7mh-t"></div>`;
    h.parentNode.insertBefore(wrap, h);
    wrap.querySelector(".v7mh-t").appendChild(h);
    if (SUB[ov.id]){ const s = document.createElement("div"); s.className = "v7mh-s"; s.textContent = SUB[ov.id]; wrap.querySelector(".v7mh-t").appendChild(s); }
  });
  // «Новый мониторинг»: компании и продюсеры кнопками (поверх тех же select — логика прежняя)
  const city = document.getElementById("a-city"), prod = document.getElementById("a-prod");
  if (city && prod){
    const mk = (sel, cls) => { const box = document.createElement("div"); box.className = "v7chips " + cls; sel.insertAdjacentElement("afterend", box); sel.classList.add("v7hide"); return box; };
    const cb = mk(city, "v7chips-co"), pb = mk(prod, "v7chips-pr");
    const COL = { "Томск": "var(--art)", "Новосибирск": "var(--vv)", "Онлайн": "var(--dia)" };
    const paint = ()=>{
      cb.innerHTML = [...city.options].map(o => `<button type="button" class="v7chip${o.value === city.value ? " on" : ""}" data-v="${esc(o.value)}"><i style="background:${COL[o.value] || "var(--accent)"}"></i>${esc(o.textContent)}</button>`).join("");
      pb.innerHTML = [...prod.options].filter(o => o.value).map(o => `<button type="button" class="v7chip${o.value === prod.value ? " on" : ""}" data-v="${esc(o.value)}">${esc(o.textContent.replace(/^[＋+]\s*/, "+ "))}</button>`).join("");
      cb.querySelectorAll("button").forEach(b => b.onclick = ()=>{ city.value = b.dataset.v; city.dispatchEvent(new Event("change", { bubbles: true })); paint(); });
      pb.querySelectorAll("button").forEach(b => b.onclick = ()=>{ prod.value = b.dataset.v; prod.dispatchEvent(new Event("change", { bubbles: true })); paint(); });
    };
    paint();
    new MutationObserver(paint).observe(prod, { childList: true, subtree: true });
    city.addEventListener("change", paint); prod.addEventListener("change", paint);
  }
})();

// ================== НАСТРОЙКИ ==================
const CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbxmWb1EW8be1Y-6WFMM_ZIRFN7lt4c06GJoamKwxOloWR4xg4XyYZJmFwbbkGQ5OZ3q/exec",
  REFRESH_MIN: 5,
  VER: "2026-11-05.86"
};

try{ localStorage.removeItem("dash_key"); }catch(e){} // ключ больше не используется — вход по логину


// Пароль больше нигде не хранится и не пересылается: при входе сервер выдаёт токен сессии,
// дальше все запросы ходят с token. Токен живёт 7 дней, продлевается при активности.
// v6.5: чтение localStorage не должно ронять весь сайт (приватный режим/запрет хранилища во встроенных браузерах)
function lsGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
function lsJson(k, def){ try { const v = JSON.parse(lsGet(k) || "null"); return v == null ? def : v; } catch(e){ return def; } }
const AUTH = {
  user: lsGet("dash_user") || "",
  token: lsGet("dash_token") || "",
  name: lsGet("dash_name") || "",
  edit: lsGet("dash_edit") === "1" && lsGet("dash_user") !== "nsk",
  nskCanEdit: lsGet("dash_edit") === "1",
  cities: lsJson("dash_cities", []),
  prod: lsGet("dash_prod") === "1",
  admin: lsGet("dash_admin") === "1", // Обновление 6: админ (ADMIN_LOGINS на сервере) — только для показа меню; права проверяет сервер
  ok(){ return !!(this.user && this.token); },
  set(u,tok,edit,cities,name){ this.user=u; this.token=tok; this.nskCanEdit=!!edit; this.edit=edit && (u !== "nsk" || (!!state.nskEditing && state.tab === "Новосибирск")); this.cities=cities; this.name=name||u;
    try{ localStorage.setItem("dash_user",u); localStorage.setItem("dash_token",tok);
    localStorage.setItem("dash_edit",edit?"1":"0"); localStorage.setItem("dash_cities",JSON.stringify(cities));
    localStorage.setItem("dash_name",this.name); }catch(e){} // приватный режим iOS — хранилище может бросать
    return true; },
  clear(){ try{ ["dash_user","dash_token","dash_edit","dash_cities","dash_name","dash_prod","dash_admin"].forEach(k=>localStorage.removeItem(k)); sessionStorage.removeItem("dash_pass"); localStorage.removeItem("dash_pass_keep"); }catch(e){}
    this.user=""; this.token=""; this.edit=false; this.nskCanEdit=false; state.nskEditing=false; this.cities=[]; this.name=""; this.prod=false; }
};


const CATS = ["Работа с ОКО","Общение с моделью","Общение с мемберами","Работа с голами","Шоу","Плейлист","Работа с сайтами / раскладка","Кадр / картинка","Комната"];
const FIELDCODES = ["oko","model","membrs","goly","show","playlist","sites","kadr","room"];
// v7.7: чек-лист VVCAM (НСК) — с недели, где в шапке листа новые названия (r.fmt === "nsk"); прошлые недели — по-старому
const CATS_NSK = ["Свет и кадр","Ловенс","Голы (5–10 подряд)","Боты","Блокнот и микрофон","Рабочие позиции (4+)","Посты в ленту (2+/день)","Модель ↔ мемберы","Оператор ↔ мемберы (1–5)"];
const NSK_HINT = ["Скриншот: как настроены свет и кадр","Скриншот: как настроен ловенс","5–10 голов подряд: цена и онлайн в момент установки гола","Есть ли боты и адекватно ли они настроены","Работает ли команда с блокнотом и микрофоном","Скриншоты минимум 4 рабочих позиций","Выгружается ли хотя бы 2 поста в ленту каждый день","Есть ли взаимодействие модели с мемберами","Насколько активно оператор общается с мемберами — от 1 до 5"];
const NSK_SHOTS = { 0: 1, 1: 1, 5: 4 }; // сколько скринов нужно в пункте
const NSK_GOALS = 2, NSK_SCALE = 8;      // особые пункты: таблица голов и шкала 1–5
const CATS_ALL = CATS.concat(CATS_NSK);
const isNskRow = r => !!(r && r.fmt === "nsk");
const catsOf = r => isNskRow(r) ? CATS_NSK : CATS;
// список категорий для набора строк: один формат — его список; смешанные — оба (сводки считают по названию, не по номеру)
function catNamesFor(rows){ let n = false, o = false; (rows||[]).forEach(x=>{ const r = x && x.r ? x.r : x; if (isNskRow(r)) n = true; else o = true; }); return n && o ? CATS_ALL : n ? CATS_NSK : CATS; }
function stByName(r, st, name){ const i = catsOf(r).indexOf(name); return i < 0 ? undefined : (st||[])[i]; }
function phCode(r, j){ return isNskRow(r) ? "n" + j : FIELDCODES[j]; } // свои шаблоны — отдельно для чек-листа НСК
const PH = {
  oko: ["не отписал шапку","не отписал конец брейка","нет скрина рабочего стола"],
  model: ["блокнот не используется","микрофон выключен","общение не ведётся","модель не управляется"],
  membrs: ["не пишет первым","сухие сообщения без крючка","не обновляет список зрителей","не цепляется за новых"],
  goly: ["голы не меняются","не следит за пробитием","цели скучные","гол не виден в раскладке"],
  show: ["шоу не ведётся","шоу однотипное","модель не вовлечена"],
  playlist: ["плохой плейлист","музыка не подходит","плейлист не обновляется"],
  sites: ["работы нет","работает не на всех сайтах","не видна статистика гола","внешний переводчик"],
  kadr: ["кадр не меняется","обрезано лицо","картинка не настроена","плохой свет"],
  room: ["пустая комната","перегруженный фон","не подходит команде","плохой свет/оттенки"]
};
// v7.2: шаблоны, которые сразу ставят «✕ Плохо» (остальные — «! Замечание»)
const PH_BAD = new Set(["микрофон выключен","модель не управляется","общение не ведётся","шоу не ведётся","работы нет","обрезано лицо","пустая комната"]);
const phLv = p => PH_BAD.has(p) ? "bad" : (PH_NSK_LV[p] || "warn");
// шаблоны чек-листа НСК: [текст, уровень]
const PH_NSK = [
  [["свет тусклый","warn"],["лицо в тени","warn"],["кадр обрезан","warn"],["кадр не настроен","bad"]],
  [["ловенс не подключён","bad"],["нет таблицы уровней","warn"],["уровни не настроены","warn"]],
  [["меньше 5 голов","warn"],["цены не растут","warn"],["голы не ставятся","bad"]],
  [["ботов нет","bad"],["боты спамят","warn"],["настройки ботов неадекватные","warn"]],
  [["блокнот не используется","bad"],["микрофон выключен","bad"],["не работают с блокнотом и микрофоном","bad"]],
  [["меньше 4 позиций","warn"],["позиции однотипные","warn"]],
  [["постов нет","bad"],["1 пост в день","warn"],["посты не каждый день","warn"]],
  [["модель не общается","bad"],["общается мало","warn"],["не обращается по никам","warn"]],
  [["не пишет первым","warn"],["сухие сообщения","warn"],["не цепляется за новых","warn"]]
];
const PH_NSK_LV = {}; PH_NSK.forEach(l=>l.forEach(([t, lv])=>{ PH_NSK_LV[t] = lv; }));
const phList = (r, j) => isNskRow(r) ? (PH_NSK[j]||[]).map(x=>x[0]) : (PH[FIELDCODES[j]]||[]);
// три кнопки уровня для категории (карточка смотрящего и мониторинг продюсера — одна разметка)
function segBtns(taAttr, st, extraCls){
  const c = extraCls || "";
  return `<button class="qbtn ${c} qok${c ? " pmx-ok" : ""}" ${taAttr} data-v="✅ всё хорошо" title="норма — всё хорошо (клавиша 1)" aria-pressed="${st==="ok"}">✓ Норма</button>`
    + `<button class="qbtn ${c} qwarn${c ? " pmx-warn" : ""}" ${taAttr} data-mk="warn" title="замечание — есть что поправить, но не провал (клавиша 2). Допиши, что именно" aria-pressed="${st==="warn"}">! Замечание</button>`
    + `<button class="qbtn ${c} qbad${c ? " pmx-bad" : ""}" ${taAttr} data-mk="bad" title="плохо — ошибка, провал категории (клавиша 3). Допиши, что именно" aria-pressed="${st==="bad"}">✕ Плохо</button>`;
}
// клик по кнопке уровня или шаблону: новое значение поля
function segApply(ta, b){
  if (b.dataset.choice !== undefined) return nskChoiceApply(ta.value, +b.dataset.choice, b.dataset.level);
  if (b.dataset.sc) return scaleApply(ta.value, +b.dataset.sc); // v7.7: шкала 1–5
  if (b.dataset.mk) return markAs(ta.value, b.dataset.mk);
  return b.dataset.v;
}
function chipApply(v, p, lv){
  const v0 = String(v||"").replace(/\s+$/, ""), st0 = catState(v0), body = markBody(v0);
  if (!lv && catState(p) === "ok") return body ? v0 + ", " + p : p; // своя фраза-похвала — без метки, как раньше
  const lvl = st0 === "bad" ? "bad" : (lv || "warn"); // уровень не понижаем: шаблон-замечание не делает «плохо» замечанием
  return markAs(body ? body + ", " + p : p, lvl);
}
const OK_RE = new RegExp("(^|[\\s,.!?])(все хорошо|все отлично|все нравится|работа есть|работает хорошо|нравится|молодец|старается|отлично|активное|хорошая|хорошо|поддерживает|вовлечена|сработаны)", "i");
const NEG_RE = new RegExp("(^|[^а-яёА-ЯЁ])(не|нет)(?![а-яёА-ЯЁ])", "i"); // «нет», «не …» как отдельные слова

// отображение компаний (внутри везде ключи городов — данные и таблица не трогаются)
const CITY_LABEL = { "Томск":"ArtLife", "Новосибирск":"VVCAM", "Онлайн":"DIAMOND" };
const clabel = c => CITY_LABEL[c] || c;
// шкала оценки: категорий 9 → оценка 0–9 везде (ручной выбор, авто-оценка, проценты)
const MAX_SCORE = 9;
const pct = v => Math.round(v * 100 / MAX_SCORE);
const state = { aiBox:{}, panels:{}, fieldOkSeq:{}, serverLatest:"", tab:"Обзор", producer:"", search:"", lastView:[], rows:[], colors:{}, quick:"", grpOpen:{}, page:1, plans:{}, week:"latest", cmpA:"", cmpB:"", schedCity:"", schedV:"", railMini:false, lastCheck:0, cityOrder:null, viewAs:null, thumbData:{}, fullLoaded:false, fullLoading:false, itog:[], dataFp:"", optimistic:{}, failedSaves:{}, knownWeeks:[] };
try{ state.knownWeeks = JSON.parse(localStorage.getItem("dash_weeks")||"[]"); }catch(e){}
function rememberWeeks(){ // список недель держим даже когда загружена только открытая
  const now = [...new Set(state.rows.map(r=>r.week).filter(Boolean))];
  const merged = [...new Set(state.knownWeeks.concat(now))].sort((a,b)=>weekKey(a)-weekKey(b));
  if (merged.join("|") !== state.knownWeeks.join("|")){
    state.knownWeeks = merged;
    try{ localStorage.setItem("dash_weeks", JSON.stringify(merged)); }catch(e){}
  }
  return state.knownWeeks;
}
try{ state.railMini = localStorage.getItem("rail_mini")==="1"; }catch(e){}
try{ state.cityOrder = JSON.parse(localStorage.getItem("dash_cityorder")||"null"); }catch(e){}
// v7.1: на телефоне меню — шторка с подписями; свёрнутое «в иконки» с ПК там не применяем
function railMiniOn(){ try { return !!state.railMini && !window.matchMedia("(max-width:700px)").matches; } catch(e){ return !!state.railMini; } }
try{ document.getElementById("tabs").classList.toggle("mini", railMiniOn()); }catch(e){}
try{ window.matchMedia("(max-width:700px)").addEventListener("change", ()=>{ const t = document.getElementById("tabs"); if (t) t.classList.toggle("mini", railMiniOn()); }); }catch(e){}

// у продюсера вкладка называется ЕГО ИМЕНЕМ (а не городом), внутри — его команды
function prodTabName(){ return (state.viewAs && state.viewAs.type==="prod") ? state.viewAs.name : (AUTH.name || AUTH.user); } // 2b: в «глазами» — имя продюсера, а не смотрящего
const NSK_EDITOR_TAB = "VVCAM редактор";
function nskAccount(){ return AUTH.user === "nsk" && !viewAsActive(); }
function activeNavTab(){ return nskAccount() && state.nskEditing && state.tab === "Новосибирск" ? NSK_EDITOR_TAB : state.tab; }
function syncNskView(){
  if (nskAccount()) { AUTH.edit = !!AUTH.nskCanEdit && !!state.nskEditing && state.tab === "Новосибирск"; AUTH.prod = false; AUTH.admin = false; }
  document.body.classList.toggle("nsk-account",nskAccount());
}
function tabs(){
  if (nskAccount()) return ["Обзор","Новосибирск",NSK_EDITOR_TAB,"Операторы","Рекомендации","Карта"];
  if (AUTH.prod) return [prodTabName(), PM_TAB_PROD, "Мои задачи", "Рекомендации"]; // v6: «📋 Мой мониторинг»
  let cities = AUTH.cities.includes("all")
    ? ["Томск","Новосибирск","Онлайн"]
    : AUTH.cities.filter(c=>CITY_ORDER.includes(c));
  if (state.cityOrder) cities = cities.slice().sort((a,b)=>{ const ia=state.cityOrder.indexOf(a), ib=state.cityOrder.indexOf(b); return (ia<0?99:ia)-(ib<0?99:ib); });
  const tools = ["Операторы","Рекомендации"];
  if (AUTH.edit) tools.push("Мои задачи");
  if (AUTH.edit && !viewAsActive()) tools.push(PM_TAB_ED); // v6: мониторинг, который ведут продюсеры // свод задач продюсерам (ставит редактор)
  if (AUTH.edit && !viewAsActive()) tools.push("Лента"); // Обновление 6 (12): мобильная лента сегодняшних смен — только смотрящему
  if (AUTH.edit && !viewAsActive()) tools.push("Смены"); // задача 5: «Расписание» смен моделей — только смотрящему
  if (AUTH.edit || AUTH.cities.includes("all")) tools.push("Итог"); // итоги дня по сверкам — смотрящему/директору
  tools.push("Карта"); // Обновление 6: тепловая карта категорий (команды × 9 категорий) — в пределах своих компаний
  if (AUTH.edit && !viewAsActive()) tools.push("Состояние"); // Обновление 6: здоровье сервера — смотрящему/редактору
  if (AUTH.admin && AUTH.edit && !viewAsActive()) tools.push("Пользователи"); // Обновление 6: только админ (сервер проверяет ADMIN_LOGINS)
  return ["Обзор"].concat(cities).concat(tools);
}
const CITY_ORDER = ["Томск","Новосибирск","Онлайн"];

// «нет замечаний», «без ошибок», «проблем нет» — это ХОРОШО, а не отрицание
// B: «норм», «ок», «👍», «ошибок не обнаружено», «замечаний не выявлено» — тоже хорошо
// (граница слова — пробел/знак препинания/скобка/тире; «не норм», «не ок» остаются замечанием через NEG_RE)
const NEG_NOUNS = "замечаний|ошибок|проблем|нареканий|претензий|косяков|нарушений|замечание|ошибки|проблемы";
const NN_D = "[\\s,.!?;:()\\-—]";
const NN_FOUND = "(обнаружено|обнаружены|выявлено|выявлены|найдено|найдены|замечено|замечены)";
const NN_RE = [
  [new RegExp("(^|" + NN_D + ")(нет|без)\\s+(" + NEG_NOUNS + ")(?=" + NN_D + "|$)", "gi"), "$1все хорошо"],
  [new RegExp("(^|" + NN_D + ")(" + NEG_NOUNS + ")\\s+нет(?=" + NN_D + "|$)", "gi"), "$1все хорошо"],
  [new RegExp("(^|" + NN_D + ")(" + NEG_NOUNS + ")\\s+не\\s+" + NN_FOUND + "(?=" + NN_D + "|$)", "gi"), "$1все хорошо"],
  [new RegExp("(^|" + NN_D + ")не\\s+" + NN_FOUND + "\\s+(" + NEG_NOUNS + ")(?=" + NN_D + "|$)", "gi"), "$1все хорошо"],
  [new RegExp("(^|" + NN_D + ")(ок|окей|ok|okay|норм|нормально|норма)(?=" + NN_D + "|$)", "gi"), "$1все хорошо"],
  [/👍+/g, " все хорошо "]
];
function normNeg(s){
  let t = String(s||"");
  NN_RE.forEach(p=>{ t = t.replace(p[0], p[1]); });
  return t;
}
// v7.2: три уровня. Кнопки «! Замечание» (⚠️) и «✕ Плохо» (❌): ставят метку в начало поля; текст сохраняется, «✅ всё хорошо» убирается
const MARK = { warn: "⚠️ ", bad: "❌ " };
const MARK_RE = /^\s*(✅\s*(всё хорошо|все хорошо)?|❌|⚠️?|🟠|🔴)\s*/i;
function markAs(v, kind){ const t = String(v||"").replace(MARK_RE, ""); return (MARK[kind] || MARK.bad) + t; }
function markBad(v){ return markAs(v, "bad"); }
function markWarn(v){ return markAs(v, "warn"); }
// текст без метки — есть ли что-то, кроме метки (для «опиши, что не так»)
function markBody(v){ return String(v||"").replace(MARK_RE, "").trim(); }
// v7.3: советы по категориям живут в колонке «Рекомендации команде»: сначала общий текст, затем блоки «💡 Категория: совет».
//   Строки после «💡 Категория:» до следующего «💡 …:» — продолжение этого совета (совет может быть в несколько строк).
const ADV_RE = new RegExp("^💡\\s*(" + CATS_ALL.map(c=>c.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&")).join("|") + ")\\s*:\\s?(.*)$");
function recoSplit(t, list){ // чистая; list — категории строки (по умолчанию стандартные)
  const L = list || CATS, gen = [], adv = L.map(()=>""); let cur = -1;
  String(t||"").replace(/\r\n?/g, "\n").split("\n").forEach(line=>{ const m = line.match(ADV_RE);
    if (m && L.indexOf(m[1]) >= 0){ cur = L.indexOf(m[1]); adv[cur] = adv[cur] ? adv[cur] + "\n" + m[2] : m[2]; }
    else if (m){ cur = -1; gen.push(line); } // совет к категории другого чек-листа — остаётся в общем тексте
    else if (cur >= 0) adv[cur] += "\n" + line; else gen.push(line); });
  return { gen: gen.join("\n").replace(/\s+$/, ""), adv: adv.map(a=>a.replace(/\s+$/, "")) };
}
function recoJoin(gen, adv, list){ // чистая
  const parts = (list || CATS).map((n,j)=>{ const a = String((adv||[])[j]||"").trim(); return a ? "💡 " + n + ": " + a : ""; }).filter(Boolean);
  return [String(gen||"").replace(/\s+$/, "")].concat(parts).filter(Boolean).join("\n");
}
// v7.3: короткие эффекты (перезапуск анимации классом; при «уменьшить движение» CSS их гасит)
function fxClass(el, cls, ms){ if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); clearTimeout(el["_fx" + cls]); el["_fx" + cls] = setTimeout(()=>el.classList.remove(cls), ms || 600); }
function fxPop(b){ fxClass(b, "pop", 340); }
function recoHtml(t, list){ const sp = recoSplit(t, list); return (sp.gen ? `<span class="utext">${esc(sp.gen)}</span>` : "") + (list || CATS).map((n,j)=>sp.adv[j] ? `<div class="adv-ro"><b>💡 ${esc(n)}</b><span class="utext">${esc(sp.adv[j])}</span></div>` : "").join(""); }
// v7.4: фото к совету — обычный скрин строки с категорией «💡 Название категории»
const ADV_CAT = n => "💡 " + n;
const isAdvCat = c => String(c||"").indexOf("💡 ") === 0;
function advCount(t, list){ return recoSplit(t, list).adv.filter(Boolean).length; }
// ---------- v7.7: особые пункты чек-листа НСК ----------
// «Голы (5–10 подряд)»: в ячейке — комментарий (с меткой уровня), ниже строки «🎯 гол | 99 тк | 120 онл»
const GOAL_RE = /^\s*🎯\s*/;
function goalsParse(v){ // чистая
  const head = [], goals = [];
  String(v||"").replace(/\r/g, "").split("\n").forEach(l=>{
    if (GOAL_RE.test(l)){ const p = l.replace(GOAL_RE, "").split("|").map(x=>x.trim()); goals.push({ g: p[0]||"", p: (p[1]||"").replace(/\s*(тк|ток\w*)\.?$/i, ""), o: (p[2]||"").replace(/\s*(онл\w*|онлайн)\.?$/i, "") }); }
    else head.push(l);
  });
  return { head: head.join("\n").replace(/\s+$/, ""), goals };
}
function goalsJoin(head, goals){ // чистая
  const gl = (goals||[]).filter(x=>x.g || x.p || x.o).map(x=>"🎯 " + [x.g || "—", x.p ? x.p + " тк" : "—", x.o ? x.o + " онл" : "—"].join(" | "));
  const h = String(head||"").replace(/\s+$/, "");
  return (h ? [h] : []).concat(gl).join("\n");
}
function goalsEditor(key, goals){
  const rows = (goals && goals.length ? goals : []).concat([]);
  while (rows.length < 5) rows.push({ g: "", p: "", o: "" });
  const n = (goals||[]).filter(x=>x.g || x.p || x.o).length;
  return `<div class="nsk-goals" data-gk="${key}"><div class="ng-h"><span>Гол</span><span>Цена, тк</span><span>Онлайн</span><span></span></div>`
    + rows.map((x, i)=>`<div class="ng-r"><span class="ng-n">${i+1}</span><input class="ng-g" value="${esc(x.g)}" placeholder="что за гол" aria-label="гол ${i+1}"><input class="ng-p" value="${esc(x.p)}" inputmode="numeric" placeholder="0" aria-label="цена гола ${i+1}"><input class="ng-o" value="${esc(x.o)}" inputmode="numeric" placeholder="0" aria-label="онлайн при голе ${i+1}"><button type="button" class="ng-x" data-ngx="${i}" title="убрать строку" aria-label="убрать гол ${i+1}">✕</button></div>`).join("")
    + `<div class="ng-f"><button type="button" class="ng-add"${rows.length >= 10 ? " disabled" : ""}>＋ гол</button><span class="ng-cnt ${n >= 5 ? "ok" : "miss"}">${n >= 5 ? "✓" : "!"} голов: ${n} (нужно 5–10)</span></div></div>`;
}
// только просмотр: таблица голов и оценка 1–5 — наглядно; остальное — текстом
const NSK_CHOICES = {
  4: [["ok","работает с блокнотом"],["warn","мало использует блокнот"],["bad","не работает с блокнотом"]],
  6: [["ok","два поста в день есть"],["warn","посты выставляются редко"],["bad","постов нет"]],
  7: [["ok","да"],["bad","нет"]]
};
function nskChoiceButtons(j, taId, st){
  return (j === 7 ? `<span class="co-hint nsk-legacy"${st === "warn" ? "" : " hidden"}>Старая оценка: замечание — выбери да или нет</span>` : "") + NSK_CHOICES[j].map(([level,label])=>`<button type="button" class="qbtn q${level}" data-ta="${taId}" data-choice="${j}" data-level="${level}" aria-pressed="${st===level}">${esc(label)}</button>`).join("");
}
function nskChoiceApply(value, j, level){
  const choices = NSK_CHOICES[j], choice = choices && choices.find(x=>x[0]===level);
  if (!choice) return value;
  let body = markBody(value).trim();
  const first = body.split("\n")[0];
  if (choices.some(x=>x[1]===first) || first === "всё хорошо") body = body.slice(first.length).trim();
  return (level === "ok" ? "✅ " : MARK[level]) + choice[1] + (body ? "\n" + body : "");
}
function botsParse(value){
  const head=[], bots=[];
  String(value||"").replace(/\r/g,"").split("\n").forEach(line=>{
    if (line.startsWith("🤖 ")) {
      try { const row=JSON.parse(line.slice(3)); if (typeof row.bot==='string' && typeof row.comment==='string'){ bots.push(row); return; } } catch(e){}
    }
    head.push(line);
  });
  return {head:head.join("\n").trimEnd(),bots};
}
function botsJoin(head,bots){
  return [String(head||"").trimEnd(),...bots.filter(x=>x.bot.trim()||x.comment.trim()).map(x=>"🤖 "+JSON.stringify({bot:x.bot,comment:x.comment}))].filter(Boolean).join("\n");
}
function botsEditor(key, bots){
  const rows=bots.length ? bots : [{bot:"",comment:""}];
  return `<div class="nsk-bots" data-bk="${key}"><div class="nb-head"><b>Какой бот</b><b>Комментарий</b></div>${rows.map((r,i)=>`<div class="nb-row"><input class="nb-name" list="bot-names-${esc(key)}" value="${esc(r.bot)}" placeholder="Название бота" aria-label="Бот ${i+1}"><textarea class="nb-comment" placeholder="Как настроен и что исправить" aria-label="Комментарий к боту ${i+1}">${esc(r.comment)}</textarea><button type="button" class="nb-del" data-index="${i}" aria-label="Удалить бота ${i+1}">✕</button></div>`).join("")}<button type="button" class="nb-add">＋ бот</button>${botCatalogHtml(key)}</div>`;
}
function botsFromDom(box){return [...box.querySelectorAll('.nb-row')].map(r=>({bot:r.querySelector('.nb-name').value,comment:r.querySelector('.nb-comment').value}));}
let botsBusy=false;
function botsCompose(key){
  const box=document.querySelector('.nsk-bots[data-bk="'+key+'"]'),hid=document.getElementById('ed'+key+'_3'),vis=document.getElementById('edb'+key+'_3');
  if(!box||!hid||!vis)return;
  hid.value=botsJoin(vis.value,botsFromDom(box));
}
function botsPush(key){
  botsCompose(key);const hid=document.getElementById('ed'+key+'_3');if(!hid)return;
  botsBusy=true;try{hid.dispatchEvent(new Event('input',{bubbles:true}));}finally{botsBusy=false;}
}
function botsFill(key){
  const hid=document.getElementById('ed'+key+'_3'),vis=document.getElementById('edb'+key+'_3'),box=document.querySelector('.nsk-bots[data-bk="'+key+'"]');
  if(!hid||!vis||!box)return;const p=botsParse(hid.value);vis.value=p.head;box.outerHTML=botsEditor(key,p.bots);v7CatSync(vis);
}
document.addEventListener('input',ev=>{
  const t=ev.target,box=t.closest&&t.closest('.nsk-bots');
  if(box){botsPush(box.dataset.bk);return;}
  if(/^edb.+_3$/.test(t.id||'')){botsCompose(t.id.slice(3,-2));return;}
  if(!botsBusy&&t.hidden&&/^ed.+_3$/.test(t.id||''))botsFill(t.id.slice(2,-2));
},true);
document.addEventListener('click',ev=>{
  const t=ev.target,button=t.closest&&t.closest('.nb-add,.nb-del');if(!button)return;
  const box=button.closest('.nsk-bots'),key=box.dataset.bk,rows=botsFromDom(box);ev.stopPropagation();
  if(button.classList.contains('nb-add'))rows.push({bot:'',comment:''});else rows.splice(Number(button.dataset.index),1);
  box.outerHTML=botsEditor(key,rows);botsPush(key);
},true);

function nskRoBody(r, j, t, hlf){
  const H = hlf || esc;
  if (isNskRow(r) && j === 3){ const p=botsParse(t); return (p.head ? `<span class="utext">${H(p.head)}</span>` : "") + (p.bots.length ? `<table class="ng-ro nb-ro"><thead><tr><th>Бот</th><th>Комментарий</th></tr></thead><tbody>${p.bots.map(x=>`<tr><td>${H(x.bot)}</td><td>${H(x.comment)}</td></tr>`).join("")}</tbody></table>` : ""); }
  if (isNskRow(r) && j === NSK_GOALS){ const gp = goalsParse(t), g = gp.goals.filter(x=>x.g || x.p || x.o);
    return (gp.head ? `<span class="utext">${H(gp.head)}</span>` : "") + (g.length ? `<table class="ng-ro"><thead><tr><th>#</th><th>Гол</th><th>Цена</th><th>Онлайн</th></tr></thead><tbody>${g.map((x,i)=>`<tr><td>${i+1}</td><td>${esc(x.g)}</td><td>${esc(x.p)}${x.p ? " тк" : ""}</td><td>${esc(x.o)}</td></tr>`).join("")}</tbody></table><span class="ng-cnt ${g.length >= 5 ? "ok" : "miss"}">голов: ${g.length} (нужно 5–10)</span>` : (t ? "" : `<span class="utext">—</span>`)); }
  if (isNskRow(r) && j === NSK_SCALE){ const k = scaleOf(t); return (k ? `<span class="nsk-sc sc${k}" title="активность оператора">${k}/5</span>` : "") + `<span class="utext">${H(markBody(t).replace(SCALE_RE, "").trim() || (k ? "" : t))}</span>`; }
  return `<span class="utext">${H(t)}</span>`;
}
// чего не хватает в разборе НСК: скринов в пунктах, голов (5+), оценки оператора
function nskGaps(x, key){
  const out = [], scr = (state.screens||{})[skey(x.r)] || [];
  Object.keys(NSK_SHOTS).forEach(j=>{ const have = scr.filter(s=>String(s.cat)===CATS_NSK[j]).length, need = NSK_SHOTS[j]; if (have < need) out.push(CATS_NSK[j] + ": скрин " + have + " из " + need); });
  const hid = document.getElementById("ed" + key + "_" + NSK_GOALS); const g = goalsParse(hid ? hid.value : x.r.cats[NSK_GOALS]).goals.filter(z=>z.g || z.p || z.o).length;
  if (g < 5) out.push("голов " + g + " из 5");
  const sc = document.getElementById("ed" + key + "_" + NSK_SCALE); if (!scaleOf(sc ? sc.value : x.r.cats[NSK_SCALE])) out.push("оценка оператора 1–5");
  return out;
}
function goalsFromDom(box){ return [...box.querySelectorAll(".ng-r")].map(r=>({ g: r.querySelector(".ng-g").value.trim(), p: r.querySelector(".ng-p").value.trim(), o: r.querySelector(".ng-o").value.trim() })); }
// собрать скрытое поле «Голов» из комментария и таблицы; без метки уровня и с голами — ставим её сами (5+ — норма, меньше — замечание)
function goalsCompose(key){
  const box = document.querySelector('.nsk-goals[data-gk="' + key + '"]'), hid = document.getElementById("ed" + key + "_" + NSK_GOALS), vis = document.getElementById("edc" + key + "_" + NSK_GOALS);
  if (!box || !hid || !vis) return;
  const goals = goalsFromDom(box), n = goals.filter(x=>x.g || x.p || x.o).length;
  if (n && !/^\s*(✅|❌|⚠|🟠|🔴)/.test(vis.value)){ vis.value = (n >= 5 ? "✅ " : MARK.warn) + vis.value.replace(/^\s+/, ""); v7CatSync(vis); }
  hid.value = goalsJoin(vis.value, goals);
  const c = box.querySelector(".ng-cnt"); if (c){ c.className = "ng-cnt " + (n >= 5 ? "ok" : "miss"); c.textContent = (n >= 5 ? "✓" : "!") + " голов: " + n + " (нужно 5–10)"; }
}
// разложить скрытое поле обратно (после «не восстанавливать черновик», ответа ИИ и т. п.)
function goalsFill(key){
  const hid = document.getElementById("ed" + key + "_" + NSK_GOALS), vis = document.getElementById("edc" + key + "_" + NSK_GOALS), box = document.querySelector('.nsk-goals[data-gk="' + key + '"]');
  if (!hid || !vis || !box) return;
  const gp = goalsParse(hid.value); vis.value = gp.head; v7CatSync(vis);
  box.outerHTML = goalsEditor(key, gp.goals);
}
// «Оператор ↔ мемберы (1–5)»: «✅ Оценка 4/5. текст»; 4–5 — норма, 3 — замечание, 1–2 — плохо
const SCALE_RE = /Оценка\s*([1-5])\s*\/\s*5\.?\s*/i;
function scaleOf(v){ const m = String(v||"").match(SCALE_RE); return m ? +m[1] : 0; }
function scaleApply(v, n){ // чистая
  const lvl = n >= 4 ? "ok" : n === 3 ? "warn" : "bad";
  const rest = markBody(v).replace(SCALE_RE, "").trim();
  return (lvl === "ok" ? "✅ " : MARK[lvl]) + "Оценка " + n + "/5" + (rest ? ". " + rest : "");
}
let _goalsBusy = false;
function goalsPush(key){ // собрать и отдать черновику/«есть изменения» (обработчик карточки слушает скрытое поле)
  goalsCompose(key);
  const hid = document.getElementById("ed" + key + "_" + NSK_GOALS); if (!hid) return;
  _goalsBusy = true; try { hid.dispatchEvent(new Event("input", { bubbles: true })); } finally { _goalsBusy = false; }
}
document.addEventListener("input", ev=>{
  const t = ev.target; if (!t) return;
  const box = t.closest && t.closest(".nsk-goals");
  if (box){ goalsPush(box.dataset.gk); return; }
  if (t.id && /^edc.+_\d$/.test(t.id)){ const key = t.id.slice(3, t.id.lastIndexOf("_")); goalsCompose(key); return; } // фаза захвата: скрытое поле готово раньше черновика
  if (!_goalsBusy && t.id && t.hidden && /^ed.+_\d$/.test(t.id) && +t.id.slice(t.id.lastIndexOf("_") + 1) === NSK_GOALS){ const key = t.id.slice(2, t.id.lastIndexOf("_")); if (document.getElementById("edc" + t.id.slice(2))) goalsFill(key); } // поле поменяли программно (ИИ и т. п.)
}, true);
document.addEventListener("click", ev=>{
  const t = ev.target; if (!t || !t.closest) return;
  const add = t.closest(".ng-add"), del = t.closest(".ng-x"); if (!add && !del) return;
  ev.stopPropagation();
  const box = t.closest(".nsk-goals"), key = box.dataset.gk;
  const goals = goalsFromDom(box);
  if (add){ if (goals.length >= 10) return; goals.push({ g: "", p: "", o: "" }); }
  else goals.splice(+del.dataset.ngx, 1);
  box.outerHTML = goalsEditor(key, goals);
  goalsPush(key);
  if (add){ const nb = document.querySelector('.nsk-goals[data-gk="' + key + '"]'); const ins = nb ? nb.querySelectorAll(".ng-g") : []; if (ins.length) ins[ins.length - 1].focus(); }
}, true);
// блок «💡 Совет» под категорией (карточка смотрящего): кнопка + заметка; совет есть — открыта сразу
function advBtn(key, j, val, nPh){
  const has = !!String(val||"").trim() || nPh > 0, id = key + "_" + j;
  return `<button type="button" class="adv-btn${has ? " has" : ""}" data-adv="${id}" aria-haspopup="dialog" title="написать совет команде и приложить скриншот"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/></svg>Совет<span class="adv-ok" aria-hidden="true">✓</span></button>`;
}
// под категорией — только предпросмотр (текст + фото); писать и вставлять скрины — в окне «Совет команде». Скрытое поле adv… хранит текст.
function advBlock(key, j, n, val, thumbsHtml){
  const has = !!String(val||"").trim() || !!thumbsHtml, id = key + "_" + j;
  return `<div class="adv-wrap${has ? " open" : ""}" id="advw${id}"><textarea id="adv${id}" class="adv-ta" hidden aria-hidden="true" tabindex="-1">${esc(val||"")}</textarea>`
    + `<div class="adv-prev" data-advopen="${id}" role="button" tabindex="0" title="открыть совет"><b>💡 Совет команде</b><span class="adv-prev-t">${esc(val||"")}</span>${thumbsHtml || ""}<span class="adv-prev-e">изменить</span></div></div>`;
}
// собрать полное значение колонки «Рекомендации» из общего поля и советов (скрытое поле ed…_reco — его читают черновик, сохранение и «есть изменения»)
function advCompose(key){
  const h = document.getElementById("ed" + key + "_reco"); if (!h) return;
  const g = document.getElementById("recg" + key);
  const xr = state.lastView[key], L = xr ? catsOf(xr.r) : CATS;
  h.value = recoJoin(g ? g.value : "", L.map((n,j)=>{ const a = document.getElementById("adv" + key + "_" + j); return a ? a.value : ""; }), L);
}
// разложить полное значение обратно по полям (после «не восстанавливать черновик» и т. п.)
function advFill(key){
  const h = document.getElementById("ed" + key + "_reco"); if (!h) return;
  const xr = state.lastView[key], L = xr ? catsOf(xr.r) : CATS;
  const sp = recoSplit(h.value, L), g = document.getElementById("recg" + key); if (g) g.value = sp.gen;
  L.forEach((n,j)=>{ const a = document.getElementById("adv" + key + "_" + j); if (a){ a.value = sp.adv[j]; advMark(key + "_" + j); } });
}
// кнопка ✓ и предпросмотр под категорией — по текущему тексту и фото
function advMark(id){
  const a = document.getElementById("adv" + id), b = document.querySelector('[data-adv="' + id + '"]'), w = document.getElementById("advw" + id); if (!a) return;
  const has = !!a.value.trim() || !!(w && w.querySelector(".adv-prev .sthumb"));
  if (b) b.classList.toggle("has", has);
  if (w){ w.classList.toggle("open", has); const t = w.querySelector(".adv-prev-t"); if (t) t.textContent = a.value; }
}
// ---------- окно «Совет команде» ----------
let advM = null; // { id, key, j }
function advOpen(id){
  const key = id.replace(/_\d$/, ""), j = +id.slice(id.lastIndexOf("_") + 1), x = state.lastView[key];
  const a = document.getElementById("adv" + id); if (!x || !a) return;
  advM = { id, key, j };
  const CLa = catsOf(x.r); advM.n = CLa[j];
  document.getElementById("advm-title").textContent = "Совет команде · " + CLa[j];
  document.getElementById("advm-sub").textContent = [(x.r.opName || x.r.opNick || ""), (x.r.model || "")].filter(Boolean).join(" · ") + " · видит продюсер";
  const ta = document.getElementById("ed" + key + "_" + j), v = ta ? ta.value : (x.r.cats[j]||""), st = catState(v);
  document.getElementById("advm-issue").innerHTML = markBody(v)
    ? `<span class="chip ${st==="bad"?"c-bad":st==="warn"?"c-warn":st==="ok"?"c-ok":"ov-nochip"}">${ST_LBL[st]||"не отмечено"}</span><span class="utext">${esc(markBody(v).slice(0, 600))}</span>`
    : `<span class="advm-noissue">По этой категории замечание не написано — совет можно дать и так.</span>`;
  const mt = document.getElementById("advm-ta"); mt.value = a.value;
  uplTarget = rowEditable(x.r) ? { x: x, catIdx: j, adv: true } : null; // вставка Ctrl+V и перетаскивание — фото к этому совету
  advModalThumbs();
  openModal("advmodal");
  setTimeout(()=>focusEnd(mt), 60);
}
function advModalThumbs(){
  const box = document.getElementById("advm-thumbs"); if (!box) return;
  if (!advM){ box.innerHTML = ""; return; }
  const x = state.lastView[advM.key]; if (!x){ box.innerHTML = ""; return; }
  const dsk = skey(x.r), list = ((state.screens||{})[dsk] || []).filter(s=>String(s.cat) === ADV_CAT(advM.n || CATS[advM.j]));
  box.innerHTML = list.map(s=>`<span class="sthumb${s.type==="video"?" isvid":""}"><img loading="lazy" decoding="async" src="${esc((state.thumbData||{})[s.mini||s.link] || (s.mini ? BLANK : driveThumb(s.link,thumbPx(160))))}" data-tk="${esc(s.mini||s.link)}" data-full="${esc(s.link)}" data-advview="1" alt="фото к совету"><span class="sqx" data-advdel="${esc(s.link)}" title="удалить фото" role="button" aria-label="удалить фото">✕</span></span>`).join("");
  setTimeout(ensureThumbs, 30);
  // предпросмотр под категорией: фото могли добавиться или удалиться
  const id = advM.id, w = document.getElementById("advw" + id); if (w) advMark(id);
}
function advClose(){ closeModal("advmodal"); }
// ввод в совет или в общие рекомендации: сначала собираем скрытое поле (фаза захвата — раньше обработчика черновика)
document.addEventListener("input", ev=>{ const t = ev.target; if (!t || !t.id) return;
  if (t.id === "advm-ta"){ if (!advM) return; const a = document.getElementById("adv" + advM.id); if (!a){ toast("Карточка закрылась — открой команду и нажми «Совет» ещё раз", true); return; } a.value = t.value; a.dispatchEvent(new Event("input", { bubbles: true })); return; }
  let m = t.id.match(/^adv(.+_\d)$/); if (m){ advMark(m[1]); advCompose(m[1].replace(/_\d$/, "")); return; }
  m = t.id.match(/^recg(.+)$/); if (m) advCompose(m[1]); }, true);
document.addEventListener("click", ev=>{
  const b = ev.target && ev.target.closest ? ev.target.closest("[data-adv], [data-advopen]") : null; if (!b) return;
  if (ev.target.closest(".sthumb")) return; // фото в предпросмотре — открывается просмотр, а не окно совета
  ev.stopPropagation(); fxPop(b); advOpen(b.dataset.adv || b.dataset.advopen);
}, true);
document.addEventListener("keydown", ev=>{ const t = ev.target; if ((ev.key === "Enter" || ev.key === " ") && t && t.matches && t.matches("[data-advopen]")){ ev.preventDefault(); advOpen(t.dataset.advopen); } });
document.getElementById("advm-x").onclick = advClose;
document.getElementById("advm-ok").onclick = advClose;
document.getElementById("advmodal").addEventListener("click", ev=>{ if (ev.target.id === "advmodal") advClose(); });
// Esc: окно совета закрывает общий обработчик окон (closeModal сбрасывает advM) — карточка при этом не закрывается
const advDrop = document.getElementById("advm-drop"), advFile = document.getElementById("advm-file");
advDrop.onclick = ()=>{ if (!uplTarget){ toast("Скрины добавляются только в открытой неделе", true); return; } advFile.click(); };
advDrop.onkeydown = ev=>{ if (ev.key === "Enter" || ev.key === " "){ ev.preventDefault(); advDrop.click(); } };
advFile.onchange = function(){ const f = uplImagesFrom(this.files); if (f.length && uplTarget) doUpload(f); this.value = ""; };
["dragenter","dragover"].forEach(t=>document.getElementById("advmodal").addEventListener(t, e=>{ if (advM && uplTarget){ e.preventDefault(); advDrop.classList.add("drag"); } }));
["dragleave","drop"].forEach(t=>document.getElementById("advmodal").addEventListener(t, e=>{ advDrop.classList.remove("drag"); if (t === "drop" && advM && uplTarget){ e.preventDefault(); const f = uplImagesFrom(e.dataTransfer && e.dataTransfer.files); if (f.length) doUpload(f); else toast("Это не картинка и не видео", true); } }));
document.getElementById("advm-thumbs").addEventListener("click", ev=>{
  const d = ev.target.closest("[data-advdel]"); const x = advM && state.lastView[advM.key];
  if (d){ ev.stopPropagation(); if (x) scrDelete(skey(x.r), d.dataset.advdel); return; }
  const im = ev.target.closest("img[data-advview]"); if (!im) return;
  document.getElementById("cam-ai").style.display = "none"; document.getElementById("cam-aiout").style.display = "none";
  camShow(im.getAttribute("src") || BLANK, true); document.getElementById("cam-title").textContent = "💡 Совет · " + (advM.n || CATS[advM.j]);
  openModal("cammodal"); camLoadFull(driveId(im.getAttribute("data-full") || ""));
});
document.getElementById("advm-ai").onclick = async function(){
  if (!advM) return; const b = this, j = advM.j, key = advM.key;
  const ta = document.getElementById("ed" + key + "_" + j); const st = ta ? catState(ta.value) : null, body = ta ? markBody(ta.value) : "";
  if (!body || st === "ok"){ toast("Сначала отметь «Замечание» или «Плохо» и опиши, что не так — по этому тексту ИИ и подскажет", true); return; }
  if (b.classList.contains("busy")) return;
  b.classList.add("busy"); const old = b.innerHTML; b.innerHTML = '<span class="v7spin"></span>думаю…';
  try {
    const text = "Категория: " + (advM.n || CATS[j]) + (isNskRow((state.lastView[key]||{}).r) ? " (" + NSK_HINT[j] + ")" : "") + ". Уровень: " + (st === "bad" ? "плохо" : "замечание") + ". Что увидел смотрящий: " + body.slice(0, 1500);
    const res = await aiAsk("catadvice", { text: text, ckey: "adv|" + strHash(text) });
    if (res.error) throw new Error(res.error);
    const tip = String(res.tip || "").trim(); if (!tip) throw new Error("ИИ не предложил совет");
    const mt = document.getElementById("advm-ta"); if (!advM || !mt) return;
    mt.value = mt.value.trim() ? mt.value.replace(/\s+$/, "") + "\n" + tip : tip;
    mt.dispatchEvent(new Event("input", { bubbles: true })); fxClass(mt, "adv-new", 1200); focusEnd(mt);
  } catch(e){ toast("ИИ: " + (e.message || e), true); }
  finally { b.classList.remove("busy"); b.innerHTML = old; }
};
// v7.2: при «Замечании» и «Плохо» текст обязателен — какие категории без пояснения
function needText(vals){ return (vals||[]).map((v,j)=>{ const st = catState(v); return (st === "warn" || st === "bad") && !markBody(v).replace(SCALE_RE, "").trim() ? j : -1; }).filter(j=>j >= 0); } // оценка «3/5» без пояснения — тоже просим текст
function markNeed(tas){
  document.querySelectorAll(".need-text").forEach(el=>{ el.classList.remove("need-text"); const m = el.querySelector(".need-msg"); if (m) m.remove(); });
  tas.filter(Boolean).forEach((ta, i)=>{ const box = ta.closest(".f.cat, .pmx-cat"); if (!box) return; box.classList.add("need-text"); fxClass(box, "shake", 450);
    if (!box.querySelector(".need-msg")){ const m = document.createElement("div"); m.className = "need-msg"; m.setAttribute("role", "alert"); m.textContent = "Опиши, что именно не так — без текста не сохранится"; const anchor = ta.parentElement && ta.parentElement.classList.contains("cat-ta") ? ta.parentElement : ta; anchor.insertAdjacentElement("afterend", m); }
    if (i === 0){ try { ta.scrollIntoView({ block: "center", behavior: "smooth" }); } catch(e){} focusEnd(ta); } });
}
// v7.2: уровень с клавиатуры — Alt+1/2/3 в поле категории или 1/2/3 на кнопках уровня
document.addEventListener("keydown", ev=>{
  // только верхний ряд цифр (не цифровой блок: Alt+0171 и т. п. в Windows), без Shift/Ctrl/Cmd; на Mac Option+цифра — это символы, поэтому в поле только на кнопках
  const k = ev.code === "Digit1" ? 0 : ev.code === "Digit2" ? 1 : ev.code === "Digit3" ? 2 : ev.code === "Digit4" ? 3 : ev.code === "Digit5" ? 4 : -1;
  if (k < 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey) return;
  const t = ev.target; if (!t || !t.closest) return;
  const box = t.closest(".f.cat, .pmx-cat"); if (!box) return;
  const inText = t.tagName === "TEXTAREA" || t.tagName === "INPUT";
  const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || "");
  if (inText ? (!ev.altKey || mac) : (ev.altKey || !t.closest(".cat-seg, .pmx-segbtn"))) return;
  const b = box.querySelectorAll(".cat-seg .qbtn, .pmx-segbtn .qbtn")[k]; if (!b) return; // у шкалы 1–5 — пять кнопок, у остальных — три
  ev.preventDefault(); b.click();
});
document.addEventListener("input", ev=>{ const t = ev.target; if (!t || t.tagName !== "TEXTAREA" || !/^(ed.+_\d|pm.+_\d)$/.test(t.id || "")) return; const box = t.closest(".need-text"); if (box && (markBody(t.value) || !isDev(catState(t.value)))){ box.classList.remove("need-text"); const m = box.querySelector(".need-msg"); if (m) m.remove(); } });
function focusEnd(ta){ try { ta.focus(); const n = ta.value.length; ta.setSelectionRange(n, n); } catch(e){} }
// v6.9: продюсеру название компании не показываем нигде — только смотрящему и директору
function coLbl(c){ return AUTH.prod ? "" : clabel(c); }
function catState(t){
  const s = normNeg((t||"").trim());
  if (!s) return null;
  if (s.charAt(0) === "✅") return "ok";
  if (s.charAt(0) === "⚠" || s.indexOf("🟠") === 0) return "warn"; // v7.2: «! Замечание» — есть что поправить, но не провал
  if (s.charAt(0) === "❌" || s.indexOf("🔴") === 0) return "bad"; // «✕ Плохо» — ошибка, даже если дальше «ок»
  if (NEG_RE.test(s)) return "bad"; // «нет …», «не …» — замечание (кроме «нет замечаний» — см. normNeg)
  const m = s.match(OK_RE);
  if (!m) return "bad";
  const idx = s.toLowerCase().indexOf(m[0].toLowerCase());
  const pre = s.slice(Math.max(0, idx - 4), idx).toLowerCase();
  if (/не\s*$|нет\s*$|не-$/.test(pre)) return "bad"; // «не хорошо», «не-нравится» — отрицание перед хорошим словом
  return "ok";
}
// Обновление 6 (7): rowStats запоминается по «отпечатку» строки (тексты категорий + ручная оценка/вердикт);
// правка в строке меняет отпечаток — пересчёт. Результат нельзя менять снаружи (только читать).
let _rsMemo = (typeof WeakMap === "function") ? new WeakMap() : null;
function _rsMemoReset(){ _rsMemo = new WeakMap(); }
function rowFp(r){ return (r._lite ? "L" : "") + (r.cats||[]).join("\u0001") + "\u0002" + String(r.scoreM==null?"":r.scoreM) + "\u0002" + String(r.verdictM==null?"":r.verdictM); }
function rowStats(r){
  if (!_rsMemo || !r || typeof r !== "object") return rowStatsRaw(r);
  const fp = rowFp(r), m = _rsMemo.get(r);
  if (m && m.fp === fp) return m.v;
  const v = rowStatsRaw(r); _rsMemo.set(r, { fp, v });
  return v;
}
function rowStatsRaw(r){
  const st = (r._lite && Array.isArray(r._st) && r._st.length === 9) ? r._st.slice() : r.cats.map(catState); // v6: у облегчённой строки состояния посчитал сервер по полному тексту
  const ok = st.filter(x=>x==="ok").length;
  const warn = st.filter(x=>x==="warn").length;
  const bad = st.filter(x=>x==="bad").length;
  const evalN = st.filter(x=>x!==null).length;
  let score = null, verdict = "";
  if (evalN > 0){
    score = ok + warn * 0.5; // v7.2: замечание — полбалла
    verdict = verdictOf(bad, warn);
    // ручная оценка: число и строка читаются одинаково («7", " 7 ", 7 → 7)
    const mScore = String(r.scoreM == null ? "" : r.scoreM).trim().replace(",",".").match(/^(\d+(?:\.\d+)?)$/);
    if (mScore){ const n = Math.min(MAX_SCORE, Math.max(0, parseFloat(mScore[1]))); score = n; }
    if (r.verdictM) verdict = r.verdictM;
  }
  return {st, ok, warn, bad, score, verdict};
}
// v7.2: пороги вердикта — из таблицы («🔧 Дашборд → Пороги оценки»), приходят с данными; по умолчанию:
//   норма — нет «плохо» и не больше 1 замечания; критично — «плохо» + ½·замечания ≥ 3; иначе — есть замечания.
//   Старые недели (только ✅/❌) считаются ровно как раньше: норма = без ❌, критично = 3+ ❌.
let VRULES = { okWarn: 1, crit: 3, recheck: 7, recheckCrit: 3 };
function setVRules(r){ if (!r || typeof r !== "object") return; const n = (v, d, lo, hi) => { const x = parseFloat(v); return isFinite(x) ? Math.min(hi, Math.max(lo, x)) : d; };
  const nv = { okWarn: n(r.okWarn, 1, 0, 9), crit: n(r.crit, 3, 0.5, 9), recheck: 7, recheckCrit: Math.round(n(r.recheckCrit, 3, 1, 7)) };
  if (JSON.stringify(nv) !== JSON.stringify(VRULES)){ VRULES = nv; try { if (_rsMemo) _rsMemoReset(); } catch(e){} } }
try { setVRules(JSON.parse(localStorage.getItem("dash_vrules") || "null")); } catch(e){}
function verdictOf(bad, warn){ return (bad + warn * 0.5 >= VRULES.crit) ? "критично" : (bad === 0 && warn <= VRULES.okWarn) ? "норма" : "замечание"; } // сначала «критично»: большой порог нормы не перекроет его
// оценка с половинками: 7.5 → «7,5»
function ruPl(n, a, b, c){ const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) ? b : c; }
function fmtSc(n){ if (n === null || n === undefined || n === "") return "–"; const x = Math.round(+n * 10) / 10; return String(x).replace(".", ","); }
// пороги цвета — те же доли шкалы, что раньше (6/8 = 75%, 3/8 = 37.5%), теперь от 9
const scoreCls = n => n/MAX_SCORE>=0.75 ? "score-ok" : n/MAX_SCORE>=0.375 ? "score-warn" : "score-bad";
const scoreFill = n => n/MAX_SCORE>=0.75 ? "sf-g" : n/MAX_SCORE>=0.375 ? "sf-y" : "sf-r";
const chipCls = {"норма":"c-ok","замечание":"c-warn","критично":"c-bad"};
const VLBL = { "норма":"нормально", "замечание":"есть замечания", "критично":"критично" };
function animNum(el, to, suffix){
  const from = parseFloat(el.dataset.v || "0") || 0;
  el.dataset.v = to;
  const t0 = performance.now(), dur = 600;
  function step(t){
    const k = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(from + (to - from) * k) + (suffix || "");
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function hl(t){
  const s = esc(t||"");
  if (!state.search) return s;
  const q = esc(state.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  try { return s.replace(new RegExp(q, "gi"), m => "<mark>" + m + "</mark>"); } catch(e){ return s; }
}
function esc(s){ s = (s==null?"":String(s)); return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;").split("'").join("&#39;"); } // v6: и апостроф — безопасно в любых атрибутах
// на «все недели» и «месяц» менять/добавлять/удалять нельзя — только просмотр (п.6)
function weekPinned(){ return state.week === "all" || state.week === "__month__"; }
// D3/D12: «последняя» = неделя с максимальной датой (сервер присылает её имя), даже если загружена вся история
function realRows(){ return (viewAsActive() && realData) ? realData.rows : state.rows; }
function latestWeekName(){
  if (state.serverLatest) return state.serverLatest;
  return [...new Set(realRows().map(r=>r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b)).pop() || "";
}
// открытая (редактируемая) неделя: выбранная конкретная или последняя; на «все/месяц» — никакая
function openWeekName(){
  if (weekPinned()) return "";
  return (!state.week || state.week === "latest") ? latestWeekName() : state.week;
}
function weekOpen_(r){ const w = openWeekName(); return !!w && r.week === w; }
// строку можно править: редактор, не режим «глазами», строка из открытой недели
function rowEditable(r){ return (!nskAccount() || (state.nskEditing && state.tab === "Новосибирск" && r.city === "Новосибирск")) && AUTH.edit && !viewAsActive() && weekOpen_(r) && !r._lite; } // v6: облегчённую (урезанную) строку править нельзя — сначала полный текст
// ---------- v6.6: общие метки и закрепление команд (ставит смотрящий, видят все), метка «новичок» ----------
const MARK_COLORS = ["", "#e5655f", "#e5b455", "#3ecf8e", "#5b9dff", "#b07cff", "#9aa3b2"];
function markOf(r){ return (r && (state.marks||{})[teamKey(r)]) || null; }
function newbieOf(r, now){ // → { day, total } пока идёт период адаптации
  const n = r && (state.newbies||{})[r.city + "|" + String(r.opName||r.opNick||"").trim().toLowerCase()];
  if (!n) return null;
  const m = String(n.s||"").match(/^(\d{4})-(\d{2})-(\d{2})$/); if (!m) return null;
  const start = new Date(+m[1], +m[2]-1, +m[3]); const t = now || new Date();
  const day = Math.floor((new Date(t.getFullYear(), t.getMonth(), t.getDate()) - start) / 864e5) + 1;
  return (day >= 1 && day <= n.d) ? { day, total: n.d } : null;
}
function teamBadges(r){
  const m = markOf(r), nb = newbieOf(r);
  return (m && m.p ? '<span class="tpin" title="закреплена">📌</span>' : "")
    + (m && (m.t || m.c) ? `<span class="tmark" style="background:${esc(m.c||"#9aa3b2")}" title="метка смотрящего">${esc(m.t || "●")}</span>` : "")
    + (nb ? `<span class="tnew" title="новый оператор: период адаптации">🌱 ${nb.day}/${nb.total}</span>` : "");
}
// недели: «latest» (по умолчанию — сервер отдал только открытую), «all», «__month__» или точное название
function rowsOf(tab){
  if (tab === NSK_EDITOR_TAB) tab = "Новосибирск";
  let rs;
  if (AUTH.prod){ rs = state.rows; } // сервер уже отдал только его команды
  else rs = (tab==="Обзор"||tab==="Сводка"||tab==="Расписание"||tab==="Операторы"||tab==="Сравнение") ? state.rows : state.rows.filter(r=>r.city===tab);
  if (state.week === "__month__"){ rs = rs.filter(r=>weekInCurrentMonth(r.week)); return rs; }
  // конкретная старая неделя: фильтруем на фронте (все недели уже загружены)
  if (state.week && state.week !== "latest" && state.week !== "all") rs = rs.filter(r=>r.week===state.week);
  // «последняя»: после догрузки истории в state.rows все недели — показываем только последнюю (кроме вкладок истории)
  else if ((!state.week || state.week === "latest") && !HISTORY_TABS.includes(tab)){ const lw = latestWeekName(); if (lw) rs = rs.filter(r=>r.week===lw); }
  return rs;
}
// вкладки, которым нужна вся история (тренды, динамика, сравнение, freshest-строки)
const HISTORY_TABS = ["Сводка","Сравнение","Операторы","Расписание"];
let fullWaiters = [];
function ensureFull(opts){
  const silent = !!(opts && opts.silent); // v6.6: фоновая предзагрузка — без всплывающих сообщений
  if (state.fullLoaded || state.fullLoading) {
    return state.fullLoading ? new Promise(res => fullWaiters.push(res)) : Promise.resolve();
  }
  state.fullLoading = true;
  if (!silent) toast("Грузим все недели…");
  let tries = 0;
  const get = ()=>{ const s0 = writeSeq; return wp({ action:"read", week:"all", lite: 1 }, 90000).then(j=>{ // v6: прошлые недели — облегчённо (полный текст по раскрытию)
    if (j.error) throw Object.assign(new Error(j.error), {code:j.code,conflicts:j.conflicts});
    if (s0 !== writeSeq && ++tries < 3) return get(); // пока грузили, была запись — ответ устарел, берём свежий
    return j;
  }); };
  return get().then(j=>{
    applyData(j, true);
    state.fullLoaded = true;
    state.fullLoading = false;
    state.dataFp = "";
    // после полной загрузки список недель — точный (сервер прислал weeks; запасной вариант — по строкам)
    if (!Array.isArray(j.weeks)){
      state.knownWeeks = [...new Set(state.rows.map(r=>r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b));
      try{ localStorage.setItem("dash_weeks", JSON.stringify(state.knownWeeks)); }catch(e){}
    }
    if (!silent) toast("История загружена"); else softRender();
    fullWaiters.splice(0).forEach(f=>f());
  }).catch(e=>{
    state.fullLoading = false;
    if (!silent) toast("История не загрузилась: " + e.message, true);
    fullWaiters.splice(0).forEach(f=>f());
  });
}

// ---------- черновики ----------
// D7: ключ = «лист|ник|модель#строка» (команда + строка), а не номер строки или индекс на экране.
// Строки сдвинулись → черновик команды переезжает за ней, только если такая команда в листе ОДНА.
function rk(r){ return skey(r) + "#" + r._row; }
const dKey = r => "draft2:" + rk(r);
const dKeyOld = r => "draft:" + r._sheet + ":" + r._row; // формат до v41 (без ключа команды)
let _dc = null; // кэш черновиков на одну перерисовку (F3)
let _dcIdx = null; // v6.5: ключи черновиков «draft2:<команда>#…» — одним проходом по localStorage на перерисовку (раньше — проход на КАЖДУЮ строку)
function draftCacheReset(){ _dc = null; _dcIdx = null; }
function draftIndex(){
  if (_dcIdx) return _dcIdx;
  _dcIdx = {};
  try {
    for (let i=0;i<localStorage.length;i++){
      const kk = localStorage.key(i); if (!kk || kk.indexOf("draft2:") !== 0) continue;
      const p = kk.lastIndexOf("#"); if (p < 0) continue;
      const sk = kk.slice(7, p);
      (_dcIdx[sk] = _dcIdx[sk] || []).push(kk);
    }
  } catch(e){}
  return _dcIdx;
}
function getDraft(r){
  const k = rk(r);
  if (_dc && k in _dc) return _dc[k];
  let d = null;
  try {
    const raw = localStorage.getItem(dKey(r));
    if (raw){ const x = JSON.parse(raw); d = (x && (!x.u || x.u === AUTH.user)) ? x : null; }
    else {
      const old = localStorage.getItem(dKeyOld(r));
      if (old){ const x = JSON.parse(old); if (x){ x.__legacy = 1; d = x; } }
      else {
        const cand = (draftIndex()[skey(r)] || []).filter(kk=>kk !== dKey(r));
        if (cand.length === 1 && realRows().filter(x=>skey(x)===skey(r)).length === 1){
          const x = JSON.parse(localStorage.getItem(cand[0]) || "null");
          if (x && (!x.u || x.u === AUTH.user)){ localStorage.setItem(dKey(r), JSON.stringify(x)); localStorage.removeItem(cand[0]); d = x; }
        }
      }
    }
  } catch(e){ d = null; }
  if (!_dc) _dc = {};
  _dc[k] = d;
  return d;
}
function setDraft(r, d){
  d.ts = Date.now(); d.u = AUTH.user; delete d.__legacy;
  try { localStorage.setItem(dKey(r), JSON.stringify(d)); localStorage.removeItem(dKeyOld(r)); } catch(e){}
  draftCacheReset();
}
function draftTime(d){ try { return new Date(d.ts).toLocaleString("ru-RU", {day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}); } catch(e){ return ""; } }
function clearDraft(r){ try { localStorage.removeItem(dKey(r)); localStorage.removeItem(dKeyOld(r)); } catch(e){} draftCacheReset(); }
function draftVal(r, j){ const d = getDraft(r); return d && d["f"+j] !== undefined ? d["f"+j] : (r.cats[j]||""); }
function draftIsDirty(r){ return !!getDraft(r); }
// при смене ника/модели (setoper) ключ строки меняется — переносим черновик/ошибки/ИИ-блок
function renameRowKey(oldRk, newRk){
  if (oldRk === newRk) return;
  try { const v = localStorage.getItem("draft2:" + oldRk); if (v){ localStorage.setItem("draft2:" + newRk, v); localStorage.removeItem("draft2:" + oldRk); } } catch(e){}
  [state.failedSaves, state.optimistic, state.fieldOkSeq].forEach(m=>{ if (m && m[oldRk]){ m[newRk] = m[oldRk]; delete m[oldRk]; } });
  const oid = "k" + strHash(oldRk), nid = "k" + strHash(newRk);
  if (state.aiBox[oid]){ state.aiBox[nid] = state.aiBox[oid]; delete state.aiBox[oid]; }
  draftCacheReset();
}
// параметры адресации строки для сервера: лист+строка И ключ команды (сервер сверяет перед записью)
function rowKeyParams(r){ return { sheet: r._sheet, row: String(r._row), knick: String(r.opNick||"").trim(), kmodel: String(r.model||"").trim(), kop: String(r.opName||"").trim() }; }
function rowDirty(key){
  const x = state.lastView[key]; if (!x) return false;
  for (let j=0;j<9;j++){
    const el = document.getElementById("ed"+key+"_"+j);
    if (el && el.value !== (x.r.cats[j]||"")) return true;
  }
  const c = document.getElementById("ed"+key+"_comment");
  if (c && c.value !== (x.r.obs||"")) return true;
  const rc = document.getElementById("ed"+key+"_reco");
  if (rc && rc.value !== (x.r.reco||"")) return true;
  const lk = document.getElementById("lk"+key);
  if (lk && normLinks(lk.value) !== normLinks(x.r.linksTxt||"")) return true;
  return false;
}
function anyDirty(){
  if ([...document.querySelectorAll("#content textarea[data-orig]")].some(t=>t.value !== t.dataset.orig)) return true;
  return [...document.querySelectorAll("tr.detail.open")].some(d=>rowDirty(d.dataset.d));
}
// есть ли отправки, которые ещё не подтвердил сервер
function pendingWrites(){ return Object.keys(saveQueue).length + inflightSaves; }

// ---------- ИИ-блоки и панели, переживающие перерисовку ----------
// state.aiBox[id] = функция, рисующая содержимое aibox строки; после render() вызывается заново
function aiShow(key, build){
  state.aiBox[key] = build;
  const box = document.getElementById("aibox" + key);
  if (box){ box.style.display = ""; build(box); }
}
function aiMsg(key, text){ aiShow(key, b=>{ if (/думает/.test(text)) b.innerHTML = v7Think(text); else b.textContent = text; }); }
function aiHide(key){ delete state.aiBox[key]; const box = document.getElementById("aibox" + key); if (box) box.style.display = "none"; }
function panelShow(id, build){ state.panels[id] = build; const o = document.getElementById(id); if (o) build(o); }
function panelMsg(id, text){ panelShow(id, o=>{ if (/думает/.test(text)) o.innerHTML = v7Think(text); else o.textContent = text; }); }

// перерисовка с сохранением фокуса/каретки, открытых карточек, ИИ-блоков и несохранённого текста заметок
function captureUi(){
  const ui = { focus:null, dirty:{} };
  const a = document.activeElement;
  if (a && a.id && /^(TEXTAREA|INPUT|SELECT)$/.test(a.tagName) && a.closest && a.closest("#content")){
    let s = null, e = null; try { s = a.selectionStart; e = a.selectionEnd; } catch(err){}
    ui.focus = { id:a.id, val:a.value, s:s, e:e, st:a.scrollTop };
  }
  document.querySelectorAll("#content textarea[data-orig]").forEach(t=>{ if (t.id && t.value !== t.dataset.orig) ui.dirty[t.id] = t.value; });
  return ui;
}
function restoreUi(ui){
  Object.keys(ui.dirty).forEach(id=>{ const t = document.getElementById(id); if (t && t.dataset.orig !== undefined && t.value === t.dataset.orig) t.value = ui.dirty[id]; });
  Object.keys(state.aiBox||{}).forEach(k=>{ const b = document.getElementById("aibox"+k); if (b){ b.style.display = ""; try { state.aiBox[k](b); } catch(e){} } });
  Object.keys(state.panels||{}).forEach(id=>{ const o = document.getElementById(id); if (o){ try { state.panels[id](o); } catch(e){} } });
  const f = ui.focus; if (!f) return;
  const el = document.getElementById(f.id); if (!el) return;
  if (el.tagName === "TEXTAREA" && el.value !== f.val) el.value = f.val;
  try { el.focus({preventScroll:true}); } catch(e){ try { el.focus(); } catch(e2){} }
  try { if (f.s !== null && f.s !== undefined && el.setSelectionRange) el.setSelectionRange(f.s, f.e); } catch(e){}
  if (f.st) el.scrollTop = f.st;
}
function render(){
  syncNskView();
  if (nskAccount()) updateLoginBtn();
  const ui = captureUi();
  draftCacheReset();
  renderMain();
  restoreUi(ui);
}
// фоновые события (ответ сервера, загрузка скрина) не перерисовывают экран посреди набора текста:
// перерисовка откладывается до ухода фокуса из поля
let pendingRender = false;
function typingNow(){ const a = document.activeElement; return !!(a && a.closest && a.closest("#content") && (a.tagName === "TEXTAREA" || (a.tagName === "INPUT" && /^(text|search|)$/.test(a.type||"")))); }
function softRender(){ if (typingNow()){ pendingRender = true; return; } pendingRender = false; render(); }
document.addEventListener("focusout", ()=>{ if (pendingRender) setTimeout(()=>{ if (pendingRender && !typingNow()){ pendingRender = false; render(); } }, 80); });

// C: горячие клавиши действуют на строку, в которой стоит курсор (или на единственную открытую)
function focusedDetail(){
  const a = document.activeElement;
  const d = a && a.closest ? a.closest("tr.detail.open") : null;
  if (d) return d;
  const open = document.querySelectorAll("tr.detail.open");
  return open.length === 1 ? open[0] : null;
}
// C: почему список пуст — подсказка вместо «Нет данных»
function emptyReason(){
  if (!state.rows.length) return AUTH.prod ? "Твоих команд в загруженных данных нет — проверь неделю или попроси смотрящего добавить" : "Данные ещё не загружены или нет доступа к компаниям этого аккаунта";
  const why = [];
  if (state.search) why.push("поиск «" + state.search + "»");
  if (state.quick) why.push("быстрый фильтр");
  if (state.producer) why.push("продюсер «" + state.producer + "»");
  if (state.week && state.week !== "latest" && state.week !== "all") why.push(state.week === "__month__" ? "только текущий месяц" : "неделя " + state.week);
  if (state.week === "latest" && latestWeekName()) why.push("показана только последняя неделя (" + latestWeekName() + ")");
  if (viewAsActive()) why.push("режим «глазами …»");
  return "Ничего не найдено" + (why.length ? ": " + why.join(", ") + " — сбрось фильтры или выбери «все недели»" : "");
}
let toastTimer = null, searchTimer = null;
function toast(msg, isErr){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "toast show" + (isErr ? " err" : "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.className = "toast", 3500);
}

function openModal(id){ document.getElementById(id).classList.add("show"); }
function closeModal(id){ document.getElementById(id).classList.remove("show"); if (id === "advmodal" && typeof advM !== "undefined" && advM){ advM = null; uplTarget = null; } if (id === "vidmodal"){ const v = document.querySelector("#vid-box video"); if (v){ try { v.pause(); } catch(e){} } vidSeq++; document.getElementById("vid-box").innerHTML = ""; } if (id === "annmodal" && typeof annOnClose === "function"){ const f = annOnClose; annOnClose = null; f(); } }
let annOnClose = null; // Обновление 6: закрытие окна разметки фоном/Esc = «не загружать этот скрин», очередь идёт дальше
document.addEventListener("click", e=>{
  document.querySelectorAll(".modal-ov.show").forEach(ov=>{ if (e.target === ov) closeModal(ov.id); });
});
document.addEventListener("keydown", e=>{
  if (e.key === "Escape"){
    const open = document.querySelectorAll(".modal-ov.show");
    if (open.length){ closeModal(open[open.length - 1].id); return; } // v7.5: закрываем только верхнее окно (фото поверх совета — сначала фото)
    const det = focusedDetail();
    if (det){ if (!rowDirty(det.dataset.d) || confirm("Есть несохранённые правки (черновик сохранён). Закрыть?")) det.classList.remove("open"); }
  }
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)){
    const det = focusedDetail();
    if (det){ e.preventDefault(); const btn = document.getElementById("sv"+det.dataset.d); if (btn) btn.click(); }
  }
});

// Ctrl+Z в текстовых полях: своя история (перерендеры ломают родную).
// История привязана к КОМАНДЕ (город|ник|модель), а не к номеру строки на экране —
// номер меняется при каждой перерисовке, и откат уводил в чужое поле.
// Первым в историю кладётся ИСХОДНЫЙ текст поля (то, что было при открытии строки).
const taHist = {};
// skey содержит «|», поэтому поле склеиваем через редкий разделитель и НЕ парсим ключ обратно
function taInfo(el){
  const det = el.closest ? el.closest("tr.detail") : null;
  const x = det ? state.lastView[det.dataset.d] : null;
  if (!x) return null;
  const am = el.id.match(/^adv.+_(\d)$/); // v7.3: совет и общие рекомендации — своя история (не путать с категорией)
  const cm = el.id.match(/^edc.+_(\d)$/);
  const field = am ? "adv" + am[1] : cm ? "c" + cm[1] : /^recg/.test(el.id) ? "recg" : /^lk/.test(el.id) ? "links" : el.id.slice(el.id.indexOf("_") + 1);
  return { x: x, field: field, key: rk(x.r) + "\u0000" + field };
}
function taHistKey(el){ const i = taInfo(el); return i ? i.key : null; }
function taBaseline(x, field){ // что было в поле при открытии строки (с учётом черновика)
  const d = getDraft(x.r) || {};
  if (/^\d+$/.test(field)) return d["f"+field] !== undefined ? d["f"+field] : (x.r.cats[+field]||"");
  if (field === "comment") return d.comment !== undefined ? d.comment : (x.r.obs||"");
  if (field === "reco") return d.reco !== undefined ? d.reco : (x.r.reco||"");
  if (field === "recg" || /^adv\d$/.test(field)){ const sp = recoSplit(d.reco !== undefined ? d.reco : (x.r.reco||""), catsOf(x.r)); return field === "recg" ? sp.gen : sp.adv[+field.slice(3)]; }
  if (/^c\d$/.test(field)){ const j = +field.slice(1); return goalsParse(d["f"+j] !== undefined ? d["f"+j] : (x.r.cats[j]||"")).head; } // комментарий к голам
  if (field === "links") return d.lk !== undefined ? d.lk : (x.r.linksTxt||"");
  return "";
}
document.addEventListener("input", function(e){
  const el = e.target;
  if (el && el.tagName === "TEXTAREA" && el.id){
    const i = taInfo(el);
    if (!i) return;
    const h = taHist[i.key] = taHist[i.key] || [];
    if (!h.length) h.push(taBaseline(i.x, i.field));
    if (h[h.length-1] !== el.value){ h.push(el.value); if (h.length > 60) h.shift(); }
  }
}, true);
document.addEventListener("keydown", function(e){
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (e.key === "z" || e.key === "я") && e.target && e.target.tagName === "TEXTAREA"){
    const key = taHistKey(e.target);
    const h = key ? taHist[key] : null;
    if (h && h.length > 1){
      e.preventDefault(); e.stopPropagation();
      h.pop();
      e.target.value = h[h.length-1];
      e.target.dispatchEvent(new Event("input", {bubbles:true}));
    } else if (h && h.length === 1){
      e.preventDefault(); e.stopPropagation();
    }
  }
}, true);

// ---------- режим «посмотреть глазами» (только для редактора) ----------
function viewAsActive(){ return !!state.viewAs; }
function filterViewData(){
  if (!state.viewAs) return;
  const src = realData || snapData();
  state.rows = src.rows.slice(); state.plans = src.plans; state.checks = src.checks; state.recs = src.recs;
  state.screens = src.screens; state.tasks = (src.tasks||[]).slice(); state.itog = (src.itog||[]).slice();
  if (state.viewAs.type==="prod"){
    const name = state.viewAs.name;
    state.rows = state.rows.filter(r=>r.producer===name);
    const cities = [...new Set(state.rows.map(r=>r.city).filter(Boolean))];
    AUTH.cities = cities.length ? cities : ["all"];
    const kf = m => { const o={}; Object.keys(m||{}).forEach(k=>{ if (String(k).split("|")[1]===name) o[k]=m[k]; }); return o; };
    state.plans = kf(state.plans); state.checks = kf(state.checks); state.recs = kf(state.recs);
    state.tasks = state.tasks.filter(t=>t.producer===name && !t.orphan); // видны только его задачи (сироты продюсеру не видны — как на сервере)
    state.itog = [];
  } else if (state.viewAs.type==="city"){
    const c = state.viewAs.name;
    state.rows = state.rows.filter(r=>r.city===c);
    AUTH.cities = [c];
    const kf = m => { const o={}; Object.keys(m||{}).forEach(k=>{ if (String(k).split("|")[0]===c) o[k]=m[k]; }); return o; };
    state.plans = kf(state.plans); state.checks = kf(state.checks); state.recs = kf(state.recs);
    state.tasks = state.tasks.filter(t=>t.city===c || String(t.sheet||"").indexOf(c) >= 0);
    state.itog = [];
  } else { return; }
  const okRows = {}; state.rows.forEach(r=>okRows[skey(r)]=1);
  const sc = {}; Object.keys(state.screens||{}).forEach(k=>{ if (okRows[k]) sc[k]=state.screens[k]; });
  state.screens = sc;
}
function snapData(){ return { rows: state.rows.slice(), plans: state.plans, checks: state.checks, recs: state.recs, screens: state.screens, tasks: (state.tasks||[]).slice(), itog: (state.itog||[]).slice() }; }
function startViewAs(mode){ // "" — свой вид, "dir" — директор, "prod:Имя" — продюсер
  state.pmOpen = {}; state.pmFilter = "all";
  state.prodMode = "overview"; // «глазами продюсера» тоже открывается на обзоре
  if (!AUTH.edit && !viewAsActive()) return; // из режима «глазами» выходить можно всегда
  if (!mode){
    if (!viewAsActive()) return;
    Object.assign(AUTH, realAuthSnap); // вернуть настоящий доступ
    state.viewAs = null;
    // U4: вернуть ПОЛНЫЕ данные редактора (а не отфильтрованные) и заставить следующую загрузку примениться
    if (realData){ state.rows = realData.rows.slice(); state.plans = realData.plans; state.checks = realData.checks; state.recs = realData.recs; state.screens = realData.screens; state.tasks = (realData.tasks||[]).slice(); state.itog = (realData.itog||[]).slice(); }
    realData = null;
    state.dataFp = "";
    // вернуть экран, где был до входа в режим; фильтры проду и недели сбросить
    state.tab = realAuthSnap.tab || "Обзор";
    state.producer = ""; state.week = "latest"; state.quick = ""; state.page = 1;
    if (!tabs().includes(state.tab)) state.tab = tabs()[0];
    toast("Вернулся в свой режим");
    const lt = document.getElementById("livetext");
    if (lt) lt.textContent = AUTH.prod ? "режим продюсера · видишь только свои команды" : "";
    render(); updateLoginBtn(); updateViewAs();
    load();
    return;
  }
  if (!viewAsActive()){
    realAuthSnap = { user:AUTH.user, token:AUTH.token, edit:AUTH.edit, cities:AUTH.cities.slice(), prod:AUTH.prod, name:AUTH.name, tab:state.tab };
    realData = snapData();
  }
  if (mode === "dir"){
    state.viewAs = { type:"dir" };
    AUTH.edit = false; AUTH.prod = false; AUTH.cities = ["all"];
    toast("👁 Вид: Директор — только просмотр");
  } else if (mode.slice(0,5) === "city:"){
    state.viewAs = { type:"city", name: mode.slice(5) };
    AUTH.edit = false; AUTH.prod = false;
    toast("👁 Вид: " + clabel(state.viewAs.name) + " — только просмотр");
  } else {
    state.viewAs = { type:"prod", name: mode.slice(5) };
    AUTH.edit = false; AUTH.prod = true;
    toast("👁 Вид: " + state.viewAs.name + " — только просмотр");
  }
  filterViewData();
  const lt = document.getElementById("livetext");
  if (lt) lt.textContent = state.viewAs.type==="prod" ? "режим продюсера · видишь только свои команды" : state.viewAs.type==="city" ? "режим компании · только просмотр" : "режим директора · только просмотр";
  render(); updateLoginBtn(); updateViewAs();
}
function updateViewAs(){
  const sel = document.getElementById("viewas");
  if (!sel) return;
  const vw = document.getElementById("viewaswrap"); if (vw) vw.style.display = (!AUTH.edit && !viewAsActive()) ? "none" : "";
  if (!AUTH.edit && !viewAsActive()){ sel.style.display = "none"; return; } // в режиме «глазами» селектор остаётся — им же выходим
  const srcRows = (viewAsActive() && realData) ? realData.rows : state.rows; // список продюсеров — из полных данных
  // продюсеры сгруппированы по компаниям: ArtLife → её продюсеры, затем VVCAM, DIAMOND
  const byCity = {};
  const seen = {};
  srcRows.forEach(r=>{
    if (!r.producer || seen[r.producer]) return;
    seen[r.producer] = 1;
    (byCity[r.city] = byCity[r.city] || []).push(r.producer);
  });
  let prodsHtml = "";
  CITY_ORDER.forEach(c=>{
    const list = (byCity[c]||[]).sort();
    if (!list.length) return;
    prodsHtml += `<optgroup label="${esc(clabel(c))}">` + list.map(p=>`<option value="prod:${esc(p)}">👤 как ${esc(p)}</option>`).join("") + "</optgroup>";
  });
  Object.keys(byCity).forEach(c=>{ // компании вне основного списка (на всякий случай)
    if (CITY_ORDER.includes(c)) return;
    prodsHtml += `<optgroup label="${esc(clabel(c))}">` + byCity[c].sort().map(p=>`<option value="prod:${esc(p)}">👤 как ${esc(p)}</option>`).join("") + "</optgroup>";
  });
  sel.innerHTML = ['<option value="">я (редактор)</option>']
    .concat(['<option value="city:Томск">🏙 как ArtLife</option><option value="city:Новосибирск">🏙 как VVCAM</option><option value="city:Онлайн">🔵 как DIAMOND</option>'])
    .concat([prodsHtml])
    .concat(['<option value="dir">🎩 как Директор (просмотр)</option>']).join("");
  sel.style.display = "";
  sel.value = state.viewAs ? (state.viewAs.type==="dir" ? "dir" : state.viewAs.type==="city" ? "city:"+state.viewAs.name : "prod:"+state.viewAs.name) : "";
}
document.getElementById("viewas").onchange = function(){ startViewAs(this.value); };
let realAuthSnap = null, realData = null;
function updateLoginBtn(){
  const h1 = document.querySelector("header h1");
  if (h1) h1.textContent = state.viewAs
    ? "Мониторинг — глазами " + (state.viewAs.type==="dir" ? "директора" : state.viewAs.type==="city" ? clabel(state.viewAs.name) : state.viewAs.name)
    : AUTH.prod ? ("Мониторинг — " + (AUTH.name || AUTH.user)) : "Мониторинг команд";
  const nm = state.viewAs ? (state.viewAs.type==="dir" ? "Директор (просмотр)" : state.viewAs.name + " (просмотр)") : (AUTH.name || AUTH.user);
  document.getElementById("loginlbl").textContent = AUTH.ok() ? (state.viewAs ? "Выйти из режима просмотра" : "Выйти") : "Войти";
  v7Profile(nm);
  const ab = document.getElementById("addbtn");
  if (ab) ab.style.display = AUTH.edit ? "" : "none";
  const wb = document.getElementById("weekbtn");
  if (wb) wb.style.display = AUTH.edit && !nskAccount() ? "" : "none";
  const pb = document.getElementById("pwbtn"); // v6.1: смена своего пароля — любому вошедшему, не в режиме «глазами»
  if (pb) pb.style.display = AUTH.ok() && !state.viewAs ? "" : "none";
  const prb = document.getElementById("presbtn"); // v6.6: презентация — смотрящему и директору
  if (prb) prb.style.display = AUTH.ok() && !AUTH.prod && (AUTH.edit || AUTH.cities.includes("all")) ? "" : "none";
}
document.getElementById("pwbtn").onclick = ()=>{
  ["pw-old","pw-new","pw-new2"].forEach(id=>{ document.getElementById(id).value = ""; });
  document.getElementById("pw-msg").textContent = "";
  openModal("pwmodal");
  setTimeout(()=>document.getElementById("pw-old").focus(), 50);
};
document.getElementById("pw-x").onclick = ()=>closeModal("pwmodal");
document.getElementById("pw-go").onclick = async ()=>{
  const o = document.getElementById("pw-old").value, n = document.getElementById("pw-new").value, n2 = document.getElementById("pw-new2").value;
  const msg = document.getElementById("pw-msg");
  if (!o || !n){ msg.textContent = "Заполни все поля"; return; }
  if (n.length < 8){ msg.textContent = "Новый пароль — не короче 8 символов"; return; }
  if (n !== n2){ msg.textContent = "Новые пароли не совпадают"; return; }
  const btn = document.getElementById("pw-go"); btn.disabled = true; msg.textContent = "меняю…";
  try {
    const r = await postJSON({ action:"chpass", token: AUTH.token, old: o, pass: n }, 45000); // без wp: ошибка «неверный пароль» не должна выкидывать из сессии
    if (r.error) throw new Error(r.error);
    if (r.token){ AUTH.token = r.token; try { localStorage.setItem("dash_token", r.token); } catch(e){} }
    ["pw-old","pw-new","pw-new2"].forEach(id=>{ document.getElementById(id).value = ""; });
    closeModal("pwmodal");
    toast("🔑 Пароль изменён" + (r.relogin ? " — войди заново" : ""));
    if (r.relogin){ AUTH.clear(); showGate(); }
  } catch(e){ msg.textContent = "⚠ " + e.message; }
  finally { btn.disabled = false; }
};

function renderMain(){
  if (!tabs().includes(state.tab)) state.tab = tabs()[0]; // сохранённая вкладка может быть скрыта
  setTimeout(ensureThumbs, 30); // миниатюры через сервер (после отрисовки DOM)
  const openDet = new Set([...document.querySelectorAll("tr.detail.open")].map(d=>d.dataset.d)); // открытые редакторы переживают перерисовку (считаем ДО очистки DOM)
  const wdOpen = !!document.getElementById("weekdrop"); // открытый список недель тоже переживает перерисовку
  try{ localStorage.setItem("dash_filters", JSON.stringify({tab:state.tab, producer:state.producer, quick:state.quick, week:state.week==="latest"?"latest":state.week})); }catch(e){}
  const wks = rememberWeeks(); // полный список недель — не только загруженная
  // Обновление 6 (7): при вводе в поиск меню слева не перестраивается — только содержимое (state.railSkipOnce)
  const railSkip = !!state.railSkipOnce && !!document.getElementById("railtoggle"); state.railSkipOnce = false;
  if (!railSkip){
  const icons = Object.assign({"Лента":"📱","Обзор":"📊","Сводка":"🧭","Расписание":"📅","Томск":"🟠","Новосибирск":"🟢","Онлайн":"🔵","Операторы":"👥","Сравнение":"⚖️","Чек":"📈","Рекомендации":"💡","Итог":"🧾","Мои задачи":"📌","Смены":"📅","Пользователи":"🔑","Состояние":"🩺","Карта":"🌡","Мой мониторинг":"📋","Мониторинг продюсеров":"📋"}, AUTH.prod ? (()=>{ const o={}; o[prodTabName()]="👤"; return o; })() : {});
  // панель: секции + красная метка на вкладках с критичными сменами
  // AUDIT4 P3-1: у вкладок-инструментов число команд не показываем (у «Мои задачи» — бейдж 📌 открытых задач)
  const NO_TEAM_COUNT_TABS = ["Состояние","Пользователи","Карта","Лента","Мои задачи","Рекомендации","Итог","Смены","Расписание",PM_TAB_PROD,PM_TAB_ED];
  const tabBtn = c=>{
    const raw = rowsOf(c);
    const rs = (c==="Сравнение") ? raw : dedupeRows(raw); // счётчик вкладки всегда по КОМАНДАМ, не по строкам недель
    const n = rs.length;
    const crit = rs.reduce((a,r)=>a+(rowStats(r).verdict==="критично"?1:0),0);
    let badge = "";
    if (c==="Расписание"){ const od = overdueCount(); if (od) badge = `<span class="cnt due" title="просрочено перепроверок: ${od}">⏰${od}</span>`; }
    else if (pmIsTab(c)){ const nb = state.pmBadge || 0; if (nb) badge = `<span class="cnt due" title="${AUTH.prod ? "вернули на доработку" : "новые записи продюсеров"}: ${nb}">${AUTH.prod ? "↩" : "📥"}${nb}</span>`; } // v6
    else if (c==="Мои задачи"){ const nt = (state.tasks||[]).filter(t=>t.status!=="сделана" && !t.orphan).length; if (nt) badge = `<span class="cnt due" title="открытых задач: ${nt}">📌${nt}</span>`; }
    else if (CITY_ORDER.includes(c)){ const od = overdueCount(c); if (od) badge = `<span class="cnt due" title="просрочено перепроверок в компании: ${od}">⏰${od}</span>`; }
    return `<button class="tab ${activeNavTab()===c?"on":""}" data-t="${c}" ${CITY_ORDER.includes(c)?`draggable="true" data-city="${c}"`:""} title="${clabel(c)}: ${n} команд${crit?" · критичных "+crit:""}"><span>${v7RailIcon(c)}</span><span>${v7TabLabel(c)}</span><span class="cnt ${crit?"crit":""}" ${crit?`title="критичных: ${crit}"`:""}>${(NO_TEAM_COUNT_TABS.includes(c) ? "" : n) || ""}</span>${badge}</button>`;
  };
  const sect = t => `<div class="rsect">${t}</div>`;
  // Обновление 4: CRM-меню — группы сворачиваются (состояние в localStorage), в свёрнутом рельсе группа открывает всплывающий список.
  // Состав вкладок — ровно tabs() (роли и «глазами» как раньше), новых доступов нет.
  const T = tabs();
  const prodTabs = AUTH.prod ? [prodTabName()] : []; // 2b: закреплённая кнопка продюсера
  const mainTabs = T.filter(c=>["Обзор","Итог"].includes(c));
  const cityTabs = T.filter(c=>CITY_ORDER.includes(c) || c === NSK_EDITOR_TAB);
  const toolTabs = T.filter(c=>!prodTabs.includes(c) && !mainTabs.includes(c) && !cityTabs.includes(c));
  const weekLabel = state.week==="latest" ? "последняя" : state.week==="all" ? "все" : state.week==="__month__" ? "месяц" : state.week;
  const RG = railGroups();
  const grp = (key, icon, title, body, badge) => {
    if (!body) return "";
    const open = !!RG[key];
    return `<div class="rgrp${open?" open":""}" data-g="${key}"><button class="rghead" data-g="${key}" title="${esc(title)}${state.railMini?" — открыть список":open?" — свернуть":" — развернуть"}"><span>${icon}</span><span>${esc(title)}</span>${badge||""}<span class="rgcar">${open?"▾":"▸"}</span></button><div class="rgbody">${body}</div></div>`;
  };
  const critTotal = cityTabs.reduce((a,c)=>a+dedupeRows(rowsOf(c)).reduce((x,r)=>x+(rowStats(r).verdict==="критично"?1:0),0),0);
  const prodNames = (AUTH.edit && !AUTH.prod && T.includes("Обзор")) ? [...new Set(state.rows.map(r=>r.producer).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ru")) : [];
  const ritem = (attrs, icon, label, cnt, on) => `<button class="ritem${on?" on":""}" ${attrs} title="${esc(label)}${cnt?" · "+esc(cnt):""}"><span>${icon}</span><span>${esc(label)}</span>${cnt?`<span class="cnt">${esc(cnt)}</span>`:""}</button>`;
  const wDesc = wks.slice().reverse(); // последняя сверху
  const weekBody = wks.length
    ? ritem('data-w="latest"', V7I.r.cal, "последняя", wDesc[0] || "", state.week==="latest")
      + ritem('data-w="__month__"', V7I.r.cal, "месяц", "", state.week==="__month__")
      + ritem('data-w="all"', V7I.r.cal, "все недели", "", state.week==="all")
      + wDesc.map(w=>ritem(`data-w="${esc(w)}"`, "·", w, "", state.week===w)).join("")
    : "";
  const weekBadge = `<span class="cnt">${esc(weekLabel)}</span>`;
  let railHtml = `<button class="rtoggle" id="railtoggle" title="${state.railMini?"развернуть панель":"свернуть в иконки"}" aria-label="${state.railMini?"развернуть панель":"свернуть панель"}">${state.railMini?V7I.r.expand:V7I.r.collapse}</button>`;
  const rec = recentList();
  const recentBody = rec.map(x=>ritem(`data-recent="${esc(x.k)}"`, "·", x.l, "", false)).join("");
  if (AUTH.prod){ // компактное меню продюсера: его имя, Мои задачи, Рекомендации
    railHtml += prodTabs.map(tabBtn).join("") + toolTabs.map(tabBtn).join("")
      + grp("recent", V7I.r.clock, "Недавние", recentBody, rec.length ? `<span class="cnt">${rec.length}</span>` : "");
  } else if (true){ // v7: разделы как в макете — Компании / Работа / Аналитика / Система
    const SECT = { "Лента":"w", "Смены":"w", "Мои задачи":"w", "Рекомендации":"w", "Чек":"w", "Расписание":"w", "Сводка":"a", "Сравнение":"a", "Операторы":"a", "Карта":"a", [PM_TAB_ED]:"a", "Пользователи":"s", "Состояние":"s" };
    const ORD = ["Лента","Смены","Мои задачи","Рекомендации","Чек","Расписание","Операторы","Карта",PM_TAB_ED,"Сводка","Сравнение","Пользователи","Состояние"];
    const oi = c => { const i = ORD.indexOf(c); return i < 0 ? 99 : i; };
    const part = k => toolTabs.filter(c=>(SECT[c]||"w")===k).sort((a,b)=>oi(a)-oi(b)).map(tabBtn).join("");
    const pw = part("w"), pa = part("a"), ps = part("s");
    railHtml += mainTabs.map(tabBtn).join("")
      + (cityTabs.length ? sect("Компании") + cityTabs.map(tabBtn).join("") : "")
      + (pw ? sect("Работа") + pw : "") + (pa ? sect("Аналитика") + pa : "") + (ps ? sect("Система") + ps : "")
      + grp("recent", V7I.r.clock, "Недавние", recentBody, rec.length ? `<span class="cnt">${rec.length}</span>` : "");
    void critTotal; void prodNames; void weekBody; void weekBadge;
  } else {
    railHtml += (mainTabs.length ? sect("главное") + mainTabs.map(tabBtn).join("") : "")
      + grp("companies", V7I.r.companies, "Компании", cityTabs.map(tabBtn).join(""), critTotal ? `<span class="cnt crit" title="критичных смен: ${critTotal}">${critTotal}</span>` : "")
      + grp("producers", V7I.r.users, "Продюсеры", prodNames.map(p=>ritem(`data-prodgo="${esc(p)}"`, V7I.r.user, p, "", state.tab==="Обзор" && state.producer===p)).join(""), prodNames.length ? `<span class="cnt">${prodNames.length}</span>` : "")
      + grp("tools", V7I.r.tools, "Инструменты", toolTabs.map(tabBtn).join(""), "")
      + grp("weeks", V7I.r.cal, "Недели", weekBody, weekBadge)
      + grp("recent", V7I.r.clock, "Недавние", recentBody, rec.length ? `<span class="cnt">${rec.length}</span>` : "");
  }
  document.getElementById("tabs").innerHTML = railHtml;
  document.getElementById("tabs").classList.toggle("mini", railMiniOn());
  if (wdOpen) toggleWeekDrop(); // пересобрать открытый список недель (список мог обновиться после догрузки)
  document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>switchTab(b.dataset.t));
  let dragCity = null;
  document.querySelectorAll('.tab[data-city]').forEach(b=>{
    b.ondragstart = ()=>{ dragCity = b.dataset.city; };
    b.ondragover = (ev)=>{ ev.preventDefault(); };
    b.ondrop = (ev)=>{ ev.preventDefault(); const to = b.dataset.city; if (!dragCity || dragCity===to) return;
      const order = (state.cityOrder && state.cityOrder.slice()) || CITY_ORDER.slice();
      if (!order.includes(dragCity) || !order.includes(to)) return;
      order.splice(order.indexOf(dragCity),1); order.splice(order.indexOf(to),0,dragCity);
      state.cityOrder = order;
      try{ localStorage.setItem("dash_cityorder", JSON.stringify(order)); }catch(e){}
      dragCity=null; render();
    };
  });
  bindRail(document.getElementById("tabs"));
  v7AfterRail();
  const rt = document.getElementById("railtoggle");
  if (rt) rt.onclick = ()=>{
    state.railMini = !state.railMini;
    try{ localStorage.setItem("rail_mini", state.railMini?"1":"0"); }catch(e){}
    render();
  };
  } // конец перестройки рельса

  let rows = rowsOf(state.tab);
  if (state.search) rows = state.rows.slice(); // глобальный поиск: все города и недели
  // «все недели» и «месяц»: одна строка на команду (самая свежая), иначе команды удваиваются копиями
  // (вкладка «Операторы» на «все» показывает историю по неделям — её не схлопываем)
  if ((!state.week || state.week==="__month__" || state.week==="all") && state.tab!=="Сравнение" && !(state.week==="all" && state.tab==="Операторы")) rows = dedupeRows(rows);
  const st = rows.map(rowStats);
  const withScore = st.filter(x=>x.score!==null);
  { const wl = [...new Set(rows.map(r=>r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b)); const el = document.getElementById("weeklabel");
    el.textContent = wl.length > 2 ? wl[0] + " … " + wl[wl.length-1] + " (" + wl.length + " нед.)" : wl.join(" · ") || "—";
    el.title = wl.join(" · "); el.style.visibility = wl.length ? "" : "hidden"; v7WeekLabel(el, wl); v7Title(); } // v6.8: без «—» на вкладках без недели, длинный список — кратко

  if (pmIsTab(state.tab)){ renderPM(); return; } // v6: мониторинг продюсера
  if (state.tab==="Расписание"){ renderSchedule(); return; }
  if (state.tab==="Сводка"){ renderSummary(rows, st); return; }
  if (state.tab==="Операторы"){ renderOperators(rows, st); return; }
  if (state.tab==="Сравнение"){ renderCompare(rows, st); return; }
  if (state.tab==="Чек"){ renderNotes("check"); return; }
  if (state.tab==="Рекомендации"){ renderNotes("recs"); return; }
  if (state.tab==="Итог"){ renderItog(); return; }
  if (state.tab==="Мои задачи"){ renderMyTasks(); return; }
  if (state.tab==="Лента"){ renderFeed(); return; }
  if (state.tab==="Смены"){ renderShifts(); return; }
  if (state.tab==="Пользователи"){ renderUsers(); return; }
  if (state.tab==="Состояние"){ renderStatus(); return; }
  if (state.tab==="Карта"){ renderHeat(); return; }
  // Обновление 4: по умолчанию — обзор (карточки, прогресс, проблемы, вердикты); «Разборы» — только по явному переключателю.
  // Раньше условие было «prodMode !== "table"», и при первом рендере (prodMode ещё undefined) открывались разборы,
  // а после клика «Таблица» — обзор: два разных экрана для одного состояния.
  if (AUTH.prod && state.tab===prodTabName() && prodModeGet()!=="reviews" && !state.search && !state.prodHomeTable){ renderProdHome(dedupeRows(rows)); return; }
  if (AUTH.prod && state.tab===prodTabName() && prodModeGet()==="reviews" && !state.search){ renderProdReviews(dedupeRows(rows)); return; }
  // ===== v7: обзор и вкладка компании (макеты Scr_Overview / Scr_Company) — только вид, данные те же =====
  const OVC = { "Томск":"var(--art)", "Новосибирск":"var(--vv)", "Онлайн":"var(--dia)" };
  const ovIc = (p, w) => `<svg class="v7i" viewBox="0 0 24 24" width="${w||15}" height="${w||15}" aria-hidden="true"><path d="${p}"/></svg>`;
  const OVP = { car: "M9 6l6 6-6 6", users: "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5M16 4.5a3.5 3.5 0 010 6.5M18 14.8c2 .7 3.3 2.5 3.5 5.2",
    trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3", screen: "M3 5h18v11H3zM8 20h8M12 16v4", cam: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 100-8 4 4 0 000 8z",
    pin: "M9 3h6l-1 6 3 3v2H7v-2l3-3zM12 14v7", x: "M6 6l12 12M18 6L6 18", search: "M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4", list: "M4 6h16M4 12h16M4 18h16" };
  const ovPl = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) ? b : c; };
  const VLX = { "норма":"норма", "замечание":"замечания", "критично":"критично" };
  const vcls = v => v==="норма" ? "ok" : v==="замечание" ? "warn" : v==="критично" ? "bad" : "";
  const isOv = state.tab === "Обзор";
  const isCityTab = CITY_ORDER.includes(state.tab);
  const ovCities = tabs().filter(c=>CITY_ORDER.includes(c));
  const showCo = isOv && !AUTH.prod && ovCities.length > 1; // переключатель компаний и блок «Компании» — тем, кто видит больше одной компании
  const ovCo = (showCo && !state.search && ovCities.includes(state.ovCo)) ? state.ovCo : ""; // фильтр обзора по компании (только вид)
  if (ovCo) rows = rows.filter(r=>r.city===ovCo);
  const S = ovCo ? rows.map(rowStats) : st;
  const WS = S.filter(x=>x.score!==null);
  const checkedN = WS.length;
  document.getElementById("pbar").innerHTML = ""; // прогресс проверки — в полосе «Проверено» ниже

  const prods = [...new Set(rows.map(r=>r.producer).filter(Boolean))].sort();
  const sel = `<select id="f-prod"${AUTH.prod ? ' style="display:none"' : ""} aria-label="продюсер"><option value="">все продюсеры</option>${prods.map(p=>`<option ${state.producer===p?"selected":""}>${esc(p)}</option>`).join("")}</select>`;

  const nOk = WS.filter(x=>x.verdict==="норма").length, nWarn = WS.filter(x=>x.verdict==="замечание").length, nBad = WS.filter(x=>x.verdict==="критично").length, nNone = rows.length - checkedN;
  const avgOf = ss => { const w = ss.filter(x=>x.score!==null); return w.length ? pct(w.reduce((a,x)=>a+x.score,0)/w.length) : null; };
  const avgNow = avgOf(S);
  // динамика: недели по порядку дат, текущая — неделя на экране (если она одна)
  const ovScope = r => isCityTab ? r.city===state.tab : (ovCo ? r.city===ovCo : true);
  const allW = [...new Set(state.rows.map(r=>r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b));
  const curWs = [...new Set(rows.map(r=>r.week).filter(Boolean))];
  const curW = (!state.search && curWs.length === 1) ? curWs[0] : "";
  const serW = curW ? allW.filter(w=>weekKey(w) <= weekKey(curW)).slice(-6) : [];
  const wStat = rs => { const ss = rs.map(rowStats), ws = ss.filter(x=>x.score!==null);
    return { rs, ss, n: rs.length, ok: ws.filter(x=>x.verdict==="норма").length, warn: ws.filter(x=>x.verdict==="замечание").length, bad: ws.filter(x=>x.verdict==="критично").length, avg: avgOf(ss), cat: Object.fromEntries(CATS_ALL.map(n=>[n, rs.filter((r,i)=>isDev(stByName(r, ss[i].st, n))).length])) }; }; // v7.7: по названию категории (у НСК свой чек-лист)
  const ser = serW.map(w=> w===curW ? wStat(rows) : wStat(dedupeRows(state.rows.filter(r=>r.week===w && ovScope(r)))));
  const prevS = ser.length > 1 ? ser[ser.length-2] : null;
  const comparisonPairs = prevS ? reviewPairs(rows,prevS.rs) : [];
  const pairedNow = comparisonPairs.length ? wStat(comparisonPairs.map(p=>p[0])) : null;
  const pairedPrev = comparisonPairs.length ? wStat(comparisonPairs.map(p=>p[1])) : null;
  const comparisonNote = comparisonPairs.length ? "Сравнение: " + comparisonPairs.length + " одинаковых команд с заполненными пунктами; охват сейчас " + checkedN + "/" + rows.length + ", раньше " + prevS.ss.filter(s=>s.score!==null).length + "/" + prevS.n : "Недостаточно сопоставимых проверок для сравнения недель";
  const ovD = (d, goodUp, unit) => { if (d===null || d===undefined || isNaN(d)) return ""; if (!d) return `<span class="ov-d">— 0</span>`; const good = goodUp ? d > 0 : d < 0; return `<span class="ov-d ${good?"up":"down"}">${d>0?"▲ +":"▼ −"}${Math.abs(d)}${unit||""}</span>`; };
  const ovSpark = (arr, col) => { const v = arr.filter(x=>x!==null && x!==undefined); if (v.length < 2) return ""; const mn = Math.min(...v), mx = Math.max(...v), sp = (mx-mn) || 1;
    return `<svg class="ov-spark" width="104" height="32" viewBox="0 0 104 32" aria-hidden="true"><polyline points="${v.map((x,i)=>(4+i*96/(v.length-1)).toFixed(1)+","+(28-(x-mn)/sp*24).toFixed(1)).join(" ")}" style="stroke:${col}"/></svg>`; };
  const catList = catNamesFor(rows); // v7.7: один чек-лист — его 9 пунктов; ArtLife/DIAMOND вместе с НСК — оба списка
  const catNow = catList.map(n=>rows.filter((r,i)=>isDev(stByName(r, S[i].st, n))).length);
  const catBadN = catList.map(n=>rows.filter((r,i)=>stByName(r, S[i].st, n)==="bad").length);
  const catCounts = catList.map((n,i)=>({n, i, c: catNow[i], b: catBadN[i], w: catNow[i] - catBadN[i], d: pairedPrev && pairedPrev.cat[n] !== undefined ? pairedNow.cat[n] - pairedPrev.cat[n] : null})).filter(x=>catList.length === 9 || rows.some(r=>catsOf(r).includes(x.n))).sort((a,b)=>b.b-a.b || b.c-a.c);
  const taskDays = t => { const s = String(t.when||""); const d = /^\d{4}-\d{2}-\d{2}/.test(s) ? new Date(s.slice(0,10)+"T12:00:00") : parseUpd(s); return d ? Math.max(0, Math.floor((Date.now()-d)/864e5)) : null; };
  const scopeCity = isCityTab ? state.tab : ovCo;
  const openTasks = (state.tasks||[]).filter(t=>t.status!=="сделана" && !t.orphan && (!scopeCity || t.city===scopeCity || String(t.sheet||"").indexOf(scopeCity) >= 0));
  const canPresent = AUTH.ok() && !AUTH.prod && (AUTH.edit || AUTH.cities.includes("all")); // как у кнопки «Режим планёрки» в меню профиля
  const roView = !AUTH.edit || viewAsActive();
  const pmOn = AUTH.edit && !viewAsActive() && !!(state.pm && state.pm.items);
  const pmOf = r => pmOn ? state.pm.items.find(x=>x.base===skey(r) && x.status!=="скрыта") : null;
  const qBtn = (q, cls, inner) => `<button class="ov-q ${cls||""}${state.quick===q?" on":""}" data-q="${q}" aria-pressed="${state.quick===q}">${inner}</button>`;
  const ovGo = []; // действия кнопок «Открыть»

  // ---- шапка ----
  let head = "";
  if (state.search){
    head = `<div class="ov-head"><span class="ov-hic">${ovIc(OVP.search, 20)}</span><h1>Поиск</h1><span class="ov-meta">«${esc(state.search)}» · по всем компаниям и неделям</span><span class="sp"></span><button class="ov-btn" id="ov-clr">${ovIc(OVP.x, 14)} Сбросить поиск</button></div>`;
  } else if (isOv){
    const one = ovCities.length === 1 && !AUTH.prod ? ovCities[0] : "";
    head = `<div class="ov-head">${one ? `<span class="ov-sq" style="background:${OVC[one]}"></span>` : ""}<h1>${one ? esc(clabel(one)) : "Обзор"}</h1>${roView ? '<span class="ov-ro">только просмотр</span>' : ""}
      ${showCo ? `<div class="ov-sw" role="tablist" aria-label="Компания">${[""].concat(ovCities).map(c=>`<button role="tab" class="${ovCo===c?"on":""}" aria-selected="${ovCo===c}" data-ovco="${esc(c)}"><i style="background:${c ? OVC[c] : "var(--dim)"}"></i>${c ? esc(clabel(c)) : "Все"}</button>`).join("")}</div>` : ""}
      ${state.producer ? `<button class="ov-pchip" id="ov-prodx" title="показать всех продюсеров">Продюсер: <b>${esc(state.producer)}</b> ${ovIc(OVP.x, 12)}</button>` : ""}
      <span class="sp"></span>${canPresent ? `<button class="ov-btn" id="ov-pres">${ovIc(OVP.screen, 16)} Режим планёрки</button>` : ""}</div>`;
  } else {
    const np = prods.length;
    const title = AUTH.prod ? "Мои команды" : clabel(state.tab);
    const meta = (AUTH.prod && curW ? "неделя " + curW + " · " : "") + rows.length + " " + ovPl(rows.length, "команда", "команды", "команд") + (AUTH.prod ? "" : " · " + np + " " + ovPl(np, "продюсер", "продюсера", "продюсеров")) + (avgNow!==null ? " · средняя " + avgNow + "%" : "");
    const chips = [["", "Все"], ["crit", "Критично"], ["ok", "Норма"]].concat(pmOn ? [["pmno", "Продюсер не проверил"]] : []);
    head = `<div class="ov-head">${isCityTab ? `<span class="ov-sq" style="background:${OVC[state.tab]}"></span>` : ""}<h1>${esc(title)}</h1><span class="ov-meta">${esc(meta)}</span>${roView && !AUTH.prod ? '<span class="ov-ro">только просмотр</span>' : ""}
      <span class="sp"></span><div class="ov-chips">${chips.map(c=>`<button class="ov-q ov-chip${state.quick===c[0]?" on":""}" data-q="${c[0]}" aria-pressed="${state.quick===c[0]}">${c[1]}</button>`).join("")}</div>
      ${AUTH.prod && state.tab===prodTabName() ? '<button class="ov-btn" id="pr-rev" title="переключить на разборы смотрящего карточками">Разборы</button>' : ""}
      ${isCityTab && AUTH.edit ? `<div class="aimenu ov-aim"><button class="ov-btn" data-aim="co" aria-haspopup="menu">${V7I.spark} ИИ по компании <span class="car">▾</span></button><div class="aimpop" role="menu">
        <button id="aibatch0" title="ИИ смотрит скрины непроверенных команд и пишет черновики разбора по 9 категориям — в таблицу попадёт только после «Сохранить»"><b>Разобрать все непроверенные</b><small>ИИ смотрит скрины и пишет черновики по 9 категориям</small></button>
        <button id="aibatch1" title="ИИ перепроверяет вердикт и тон комментария у проверенных команд — тоже черновиками"><b>Перепроверить проверенные</b><small>сверяет вердикт и тон комментария — тоже черновиками</small></button>
        <div class="ov-mnote">Результат — только черновики. В таблицу уходит по «Сохранить».</div></div></div>` : ""}</div>
      ${isCityTab && AUTH.edit ? `<div id="aisumout" class="ov-aisum">${aiBatchHtml()}</div>` : ""}${state.tab === "Новосибирск" ? nskFmtBar() : ""}`;
  }

  // ---- полоса «Проверено» ----
  const W = v => rows.length ? (v*100/rows.length).toFixed(2) + "%" : "0";
  const topCats = catCounts.filter(x=>x.c > 0).slice(0, 3);
  const strip = `<p class="co-hint">${esc(comparisonNote)}</p><section class="ov-strip">
    <div class="ov-chk"><span>Проверено${curW ? " за неделю" : ""}</span><b>${checkedN} <small>из ${rows.length} ${ovPl(rows.length, "команды", "команд", "команд")}</small></b></div>
    <div class="ov-chkbar"><div class="ov-bar" role="img" aria-label="норма ${nOk}, замечания ${nWarn}, критично ${nBad}, не проверено ${nNone}"><i class="o" style="width:${W(nOk)}"></i><i class="w" style="width:${W(nWarn)}"></i><i class="b" style="width:${W(nBad)}"></i></div>
      <div class="ov-leg">${qBtn("ok", "", `<b class="ok">${nOk}</b> норма`)}${qBtn("warn", "", `<b class="warn">${nWarn}</b> с замечаниями`)}${qBtn("crit", "", `<b class="bad">${nBad}</b> критично`)}${qBtn("none", "", `<b>${nNone}</b> не проверено`)}${!isOv && topCats.length ? `<span class="ov-top">чаще всего: ${topCats.map(x=>esc(x.n)+" "+x.c).join(" · ")}</span>` : ""}</div></div>
  </section>`;

  // ---- обзор: «что горит», плитки, «где ошибаются», компании, продюсеры ----
  let dash = "";
  if (isOv && !state.search){
    // что горит сейчас: сначала критичное
    const byProd = {};
    rows.forEach((r,i)=>{ const k = r.city+"|"+(r.producer||"—"); (byProd[k] = byProd[k] || { k, city:r.city, p:r.producer||"—", items:[] }).items.push({ r, s:S[i] }); });
    const alerts = [];
    const prevProd = (g) => { if (!prevS || reviewPairs(g.items.map(x=>x.r),prevS.rs.filter(r=>r.city===g.city && r.producer===g.p)).length !== g.items.length) return null; const ss = prevS.ss.filter((x,i)=>prevS.rs[i].city===g.city && (prevS.rs[i].producer||"—")===g.p && x.score!==null); return ss.length ? ss.reduce((a,x)=>a+x.score,0)/ss.length : null; };
    const allCritP = new Set();
    Object.values(byProd).forEach(g=>{
      const ch = g.items.filter(x=>x.s.score!==null);
      if (ch.length >= 2 && ch.every(x=>x.s.verdict==="критично")){
        allCritP.add(g.k);
        const a = ch.reduce((s,x)=>s+x.s.score,0)/ch.length, pa = prevProd(g);
        ovGo.push(()=>{ state.grpOpen[g.k] = true; state.producer = ""; state.quick = ""; if (state.tab === g.city) render(); else switchTab(g.city); });
        alerts.push({ lv:"bad", w:0, title: `${g.p}: ${ch.length===2?"обе":"все"} ${ch.length} ${ovPl(ch.length,"команда","команды","команд")} критично`, city:g.city, meta:`средняя ${fmtSc(a)}/9${pa!==null ? " · было " + fmtSc(pa) + "/9" : ""}`, go: ovGo.length-1 });
      }
    });
    rows.map((r,i)=>({r, s:S[i]})).filter(x=>x.s.verdict==="критично").sort((a,b)=>a.s.score-b.s.score).slice(0, 3).forEach(x=>{
      const nm = (x.r.opName||x.r.opNick||"—") + " / " + (x.r.model||"—");
      ovGo.push(()=>gotoRow(x.r._sheet+"|"+x.r._row));
      alerts.push({ lv:"bad", w:1, title: `${nm} — ${fmtSc(x.s.score)}/9, плохо в ${x.s.bad} ${ovPl(x.s.bad,"категории","категориях","категориях")}${x.s.warn ? ", замечаний " + x.s.warn : ""}`, city:x.r.city, meta: AUTH.prod ? "" : "продюсер " + (x.r.producer||"—"), go: ovGo.length-1 });
    });
    const tc = catCounts[0];
    if (tc && tc.b >= 2){ // v7.2: «горит» — только «плохо», замечания не шумят
      const cs = [...new Set(rows.filter((r,i)=>stByName(r, S[i].st, tc.n)==="bad").map(r=>r.city))];
      if (tabs().includes("Карта")) ovGo.push(()=>switchTab("Карта"));
      alerts.push({ lv:"warn", w:2, title: `«${tc.n}» — плохо у ${tc.b} ${ovPl(tc.b,"команды","команд","команд")}`, city: cs[0], meta: cs.length > 1 && !AUTH.prod ? `и ещё ${cs.length-1} ${ovPl(cs.length-1,"компания","компании","компаний")}` : "", go: tabs().includes("Карта") ? ovGo.length-1 : -1 });
    }
    const oldT = openTasks.map(t=>({t, d:taskDays(t)})).filter(x=>x.d!==null && x.d >= 3).sort((a,b)=>b.d-a.d)[0];
    if (oldT){
      if (tabs().includes("Мои задачи")) ovGo.push(()=>switchTab("Мои задачи"));
      alerts.push({ lv:"warn", w:3, title: `${oldT.t.producer||"Продюсер"}: задача без ответа ${oldT.d} ${ovPl(oldT.d,"день","дня","дней")}`, city: oldT.t.city || "", meta: String(oldT.t.text||"").slice(0, 80), go: tabs().includes("Мои задачи") ? ovGo.length-1 : -1 });
    }
    const alertsHtml = alerts.slice(0, 5).map(a=>`<div class="ov-alert"><span class="chip ${a.lv==="bad"?"c-bad":"c-warn"}">${a.lv==="bad"?"критично":"внимание"}</span><div class="ov-at"><b>${esc(a.title)}</b><span>${a.city && coLbl(a.city) ? `<em style="color:${OVC[a.city]||"var(--dim)"}"><i style="background:${OVC[a.city]||"var(--dim)"}"></i>${esc(coLbl(a.city))}</em>` : ""}${esc(a.meta)}</span></div>${a.go >= 0 ? `<button class="ov-open" data-ovgo="${a.go}">Открыть</button>` : ""}</div>`).join("")
      || `<div class="ov-empty">${checkedN ? "В проверенных командах критичных проблем и долгих задач не найдено" : "Команды ещё не проверены — данных о проблемах пока нет"}${nNone ? " · осталось проверить " + nNone : ""}</div>`;
    // плитки
    const tile = (o) => `<div class="tile ov-tile${o.q ? " click" + (state.quick===o.q ? " on" : "") : ""}${o.tab ? " ov-tlink" : ""}"${o.q ? ` data-q="${o.q}" role="button" tabindex="0" aria-pressed="${state.quick===o.q}"` : ""}${o.tab ? ` data-ovtab="${esc(o.tab)}" role="button" tabindex="0"` : ""}><div class="ov-th"><div class="n" style="color:${o.col}">${o.n}</div>${o.sp}</div><div class="l">${o.l}</div><div class="ov-tdl">${o.d || `<span class="ov-d">${o.sub || comparisonNote}</span>`}${o.d ? ' <span class="ov-dl">по сопоставимым командам</span>' : ""}</div></div>`;
    const prevAvg = pairedPrev ? pairedPrev.avg : null;
    const oldN = openTasks.filter(t=>{ const d = taskDays(t); return d!==null && d >= 3; }).length;
    const tilesHtml = [
      tile({ n: avgNow!==null ? avgNow + "%" : "–", l:"Средняя оценка", col:"var(--ink)", sp: ovSpark(ser.map(s=>s.avg), "var(--ink)"), d: (prevAvg!==null && avgNow!==null) ? ovD(pairedNow.avg - prevAvg, true, " п.п.") : "" }),
      tile({ n: nBad, l:"Команд критично", col:"var(--bad-t)", q:"crit", sp: "", d: pairedPrev ? ovD(pairedNow.bad - pairedPrev.bad, false) : "" }),
      tile({ n: nOk, l:"Команд в норме", col:"var(--ok)", q:"ok", sp: "", d: pairedPrev ? ovD(pairedNow.ok - pairedPrev.ok, true) : "" }),
      tile({ n: openTasks.length, l:"Задач продюсерам в работе", col:"var(--warn)", tab: tabs().includes("Мои задачи") ? "Мои задачи" : "", sp:"", d:"", sub: oldN ? "без ответа 3+ дня: " + oldN : "открытые задачи" })
    ].join("");
    // где ошибаются
    const mxc = Math.max(1, ...catCounts.map(x=>x.c));
    const catsHtml = catCounts.map((x,i)=>`<div class="ov-cat"><span class="ov-cn" title="${esc(x.n)}">${esc(x.n)}</span><span class="bar-track ov-stk" title="${esc(x.n)}: плохо — ${x.b}, замечание — ${x.w}"><span class="bar-fill" style="width:${Math.round(x.b/mxc*100)}%;background:var(--bad)"></span><span class="bar-fill" style="width:${Math.round(x.w/mxc*100)}%;background:var(--warn-f)"></span></span><b>${x.c}</b>${x.d===null ? "<span></span>" : x.d ? `<span class="ov-d ${x.d>0?"down":"up"}">${x.d>0?"▲ +":"▼ −"}${Math.abs(x.d)}</span>` : '<span class="ov-d">—</span>'}</div>`).join("");
    // компании
    let coHtml = "";
    if (showCo){
      coHtml = (ovCo ? [ovCo] : ovCities).map(c=>{
        const ix = rows.map((r,i)=>i).filter(i=>rows[i].city===c), ss = ix.map(i=>S[i]), n = ix.length;
        const o = ss.filter(x=>x.verdict==="норма").length, w = ss.filter(x=>x.verdict==="замечание").length, b = ss.filter(x=>x.verdict==="критично").length, av = avgOf(ss);
        const cp = comparisonPairs.filter(p=>p[0].city===c), pav=cp.length?avgOf(cp.map(p=>rowStats(p[1]))):null, cav=cp.length?avgOf(cp.map(p=>rowStats(p[0]))):null;
        const ww = v => n ? (v*100/n).toFixed(2) + "%" : "0";
        return `<button class="ov-co" data-ovtab="${esc(c)}"><span class="ov-coh"><i style="background:${OVC[c]}"></i><b>${esc(clabel(c))}</b><small>${n} ${ovPl(n,"команда","команды","команд")}</small><span class="sp"></span><b class="${av===null?"":av>=75?"ok":av>=60?"warn":"bad"}">${av===null?"–":av+"%"}</b>${(av!==null && pav!==null) ? ovD(cav-pav, true, " п.п.") : ""}</span>
          <span class="ov-bar"><i class="o" style="width:${ww(o)}"></i><i class="w" style="width:${ww(w)}"></i><i class="b" style="width:${ww(b)}"></i></span>
          <small>норма ${o}${w ? " · замечания " + w : ""} · критично ${b}${n-o-w-b ? " · не проверено " + (n-o-w-b) : ""}</small></button>`;
      }).join("");
    }
    // продюсеры
    const pf = state.ovPf || "all";
    const prRows = Object.values(byProd).map(g=>{
      const ss=g.items.map(x=>x.s),av=avgOf(ss),cp=comparisonPairs.filter(p=>p[0].city===g.city && p[0].producer===g.p && p[1].producer===g.p),pav=cp.length?avgOf(cp.map(p=>rowStats(p[1]))):null,cav=cp.length?avgOf(cp.map(p=>rowStats(p[0]))):null;
      const nt = (state.tasks||[]).filter(t=>t.status!=="сделана" && !t.orphan && t.producer===g.p && (!t.city || t.city===g.city || String(t.sheet||"").indexOf(g.city) >= 0)).length;
      return Object.assign({}, g, { ss, av, d: (av!==null && pav!==null) ? cav - pav : null, nt, hasBad: ss.some(x=>x.verdict==="критично") });
    }).sort((a,b)=>(a.av===null?999:a.av)-(b.av===null?999:b.av));
    const pfDefs = [["all","Все",prRows.length],["bad","Есть критичные",prRows.filter(x=>x.hasBad).length],["down","Падение",prRows.filter(x=>x.d!==null && x.d<0).length],["task","С задачами",prRows.filter(x=>x.nt).length]];
    const prShown = prRows.filter(x=>pf==="all" || (pf==="bad" && x.hasBad) || (pf==="down" && x.d!==null && x.d<0) || (pf==="task" && x.nt));
    const canGrp = AUTH.edit;
    const prHtml = prShown.map((g,i)=>{
      const o = g.ss.filter(x=>x.verdict==="норма").length, b = g.ss.filter(x=>x.verdict==="критично").length, w = g.ss.filter(x=>x.verdict==="замечание").length;
      const segsP = g.items.slice().sort((a,c)=>(c.s.score===null?-1:c.s.score)-(a.s.score===null?-1:a.s.score)).map(x=>`<i class="${vcls(x.s.verdict)}" title="${esc((x.r.opName||x.r.opNick||"—")+" / "+(x.r.model||"—"))}: ${x.s.score===null?"не проверено":fmtSc(x.s.score)+"/9"}"></i>`).join("");
      const gk = esc(g.k);
      return `<div class="ov-pr" style="--pc:${OVC[g.city]||"var(--dim)"}"><div class="ov-pn"><i></i><span><b>${esc(g.p)}</b>${coLbl(g.city) ? `<small>${esc(coLbl(g.city))}</small>` : ""}</span></div>
        <div class="ov-pt"><span class="ov-psegs">${segsP}</span><small>${o} норма${w ? " · " + w + " замеч." : ""} · ${b} критично</small></div>
        <b class="ov-pa ${g.av===null?"":g.av>=75?"ok":g.av>=60?"warn":"bad"}">${g.av===null?"–":g.av+"%"}</b>
        <span class="ov-pd">${g.d===null ? '<span class="ov-d">—</span>' : ovD(g.d, true, " п.п.")}</span>
        <span class="ov-ptk">${g.nt ? g.nt + " в работе" : "—"}</span>
        <span class="ov-pact"><button class="ov-sbtn" data-ovprod="${esc(g.p)}" data-ovgk="${gk}">Открыть</button>${canGrp ? `<span class="aimenu ov-more"><button class="ov-sbtn ov-dots" data-aim="pr${i}" aria-label="Ещё: план, команда, удалить" title="ещё">⋯</button><span class="aimpop" role="menu">
          <button class="planbtn" data-plan="${gk}"><b>План работ на неделю</b><small>${esc(g.p)}</small></button>
          <button class="addg" data-addg="${gk}" ${weekPinned()?"disabled title=\"сначала выбери конкретную неделю\"":""}><b>Добавить команду</b><small>неделя ${esc(openWeekName()||"—")}</small></button>
          <button class="delbtn ov-danger" data-del="${gk}" ${weekPinned()?"disabled title=\"сначала выбери конкретную неделю\"":""}><b>Удалить команды…</b></button></span></span>` : ""}</span></div>`;
    }).join("") || '<div class="ov-empty">Под этот фильтр продюсеров нет</div>';
    dash = `<div class="ov-row2">
      <section class="ov-card ov-fire"><div class="ov-ch"><span class="ov-live"></span><h2>Что горит сейчас</h2><small>сначала критичное</small><span class="sp"></span>${AUTH.edit ? `<button class="ov-btn ov-btn-s" id="aidelta" title="ИИ сравнит эту неделю с прошлой">${V7I.spark} Что изменилось за неделю</button>` : ""}</div>
        ${AUTH.edit ? '<div id="aideltaout" class="ov-aiout" aria-live="polite"></div>' : ""}${alertsHtml}</section>
      <section class="ov-tiles">${tilesHtml}</section>
    </div>
    <div class="ov-row2">
      <section class="ov-card"><div class="ov-ch"><h2>Где ошибаются</h2><small>команд с отклонением${pairedPrev ? " · изменение по сопоставимым командам" : " · без сравнения недель"}</small><span class="ov-lg2"><i style="background:var(--bad)"></i>плохо <i style="background:var(--warn-f)"></i>замечание</span></div><div class="ov-cats">${catsHtml}</div></section>
      ${showCo ? `<section class="ov-card"><div class="ov-ch"><h2>Компании</h2></div><div class="ov-cos">${coHtml}</div></section>` : ""}
    </div>
    <section class="ov-card ov-prs"><div class="ov-ch"><h2>Продюсеры</h2><div class="ov-pfs">${pfDefs.map(f=>`<button class="ov-chip${pf===f[0]?" on":""}" data-ovpf="${f[0]}" aria-pressed="${pf===f[0]}">${f[1]} ${f[2]}</button>`).join("")}</div></div>
      <div class="ov-prl"><div class="ov-pr ov-prh"><span>Продюсер</span><span>Команды</span><span>Средняя</span><span>Изменение</span><span>Задачи</span><span></span></div>${prHtml}</div></section>`;
  }

  // ---- «Команды»: поиск, фильтры, таблица ----
  const plainTeams = !isOv && !state.search; // на вкладке компании группы идут сразу, без общей карточки
  const chipDefs = [
    ["crit","критично", S.filter(x=>x.verdict==="критично").length, "bad"],
    ["warn","есть замечания", S.filter(x=>x.verdict==="замечание").length, "warn"],
    ["none","не проверено", S.filter(x=>x.score===null).length, ""],
    ["ok","нормально", S.filter(x=>x.verdict==="норма").length, "ok"],
    ["fresh","правленые сегодня", rows.filter(isFresh).length, ""],
    ["due","к перепроверке", rows.filter(isDue).length, ""],
    ["draft","черновики", rows.filter(draftIsDirty).length, ""]
  ].filter(c=>!(plainTeams && (c[0]==="crit" || c[0]==="ok"))); // на компании «критично/норма» — в шапке
  const teams = `<section class="${plainTeams ? "ov-teams plain" : "ov-card ov-teams"}" id="ov-teams">
      ${plainTeams ? "" : `<div class="ov-ch"><h2>Команды</h2><small>клик по строке — детали${AUTH.edit?" и редактирование":""}</small></div>`}
      <div class="filters ov-filters"><button class="gbtn${document.body.classList.contains("compact")?" on":""}" id="f-compact" title="компактная таблица — больше строк на экране" aria-label="компактная таблица">${ovIc(OVP.list, 15)}</button>${sel}<span class="ov-srch">${ovIc(OVP.search, 15)}<input id="f-search" placeholder="поиск по оперу, модели, тексту — по всем компаниям и неделям…" value="${esc(state.search)}" aria-label="поиск"></span>
        <button class="abtn2" id="aisearch" title="поиск по смыслу (ИИ)" style="${AUTH.edit?"":"display:none"}">${V7I.spark} смысл</button>
        <span class="count" id="f-count"></span>
      </div>
      <div id="chipsrow" class="ov-chipsrow"></div>
      <div id="aisearchout" class="ov-aiout"></div>
      <div id="table"></div>
    </section>`;
  document.getElementById("content").innerHTML = `<div class="ov-page${isOv ? " ov-is-ov" : " ov-is-co"}">${head}${strip}${dash}${teams}</div>`;

  // фильтры: плитки, легенда полосы, чипы шапки и строки чипов — один и тот же state.quick
  document.querySelectorAll("#content .ov-q, #content .tile.click").forEach(t=>{
    const go = ()=>{ const q = t.dataset.q || ""; state.quick = (q && state.quick===q) ? "" : q; state.page=1; render(); };
    t.onclick = go; t.onkeydown = ev=>{ if (ev.key==="Enter" || ev.key===" "){ ev.preventDefault(); go(); } };
  });
  document.querySelectorAll("#content [data-ovtab]").forEach(t=>{ const go = ()=>switchTab(t.dataset.ovtab); t.onclick = go; t.onkeydown = ev=>{ if (ev.key==="Enter"){ ev.preventDefault(); go(); } }; });
  document.querySelectorAll("#content [data-ovco]").forEach(b=>b.onclick=()=>{ state.ovCo = b.dataset.ovco; state.page = 1; render(); });
  document.querySelectorAll("#content [data-ovpf]").forEach(b=>b.onclick=()=>{ state.ovPf = b.dataset.ovpf; render(); });
  document.querySelectorAll("#content [data-ovgo]").forEach(b=>b.onclick=()=>{ const f = ovGo[+b.dataset.ovgo]; if (f) f(); });
  document.querySelectorAll("#content [data-ovprod]").forEach(b=>b.onclick=()=>{
    state.grpOpen[b.dataset.ovgk] = true; railPickProducer(b.dataset.ovprod);
    setTimeout(()=>{ const t = document.getElementById("ov-teams"); if (t) t.scrollIntoView({behavior:"smooth", block:"start"}); }, 80);
  });
  const ovPres = document.getElementById("ov-pres"); if (ovPres) ovPres.onclick = ()=>presOpen();
  const ovPx = document.getElementById("ov-prodx"); if (ovPx) ovPx.onclick = ()=>{ state.producer = ""; state.page = 1; render(); };
  const ovClr = document.getElementById("ov-clr"); if (ovClr) ovClr.onclick = ()=>{ state.search = ""; state.page = 1; render(); };
  const cr = document.getElementById("chipsrow");
  if (cr){
    cr.innerHTML = chipDefs.map(c=>`<button class="fchip ${state.quick===c[0]?"on":""}" data-q="${c[0]}" aria-pressed="${state.quick===c[0]}">${c[3] ? `<i class="ov-dot ${c[3]}"></i>` : ""}${c[1]} · ${c[2]}</button>`).join("");
    cr.querySelectorAll(".fchip").forEach(b=>b.onclick=()=>{ state.quick = state.quick===b.dataset.q ? "" : b.dataset.q; state.page=1; render(); });
  }
  document.getElementById("f-prod").onchange = e=>{state.producer=e.target.value;state.page=1;render();};
  const fc = document.getElementById("f-compact"); if (fc) fc.onclick = ()=>setCompact(!document.body.classList.contains("compact"));
  // Обновление 7: батч-ИИ по компании. «Непроверенные» — черновик по скрину (если есть скрин); «проверенные» — авто-вердикт + тон комментария.
  // Результат только в черновики (localStorage): в таблицу уходит по «Сохранить». Последовательно, стоп на лимите ИИ (20/час на задачу).
  const runBatchAi = async (checkedOnly)=>{
    if (state.aiBatch && state.aiBatch.running){ toast("Разбор уже идёт", true); return; }
    const teams = dedupeRows(rows).filter(r => r.opName || r.opNick || r.model);
    const target = teams.filter(r => checkedOnly ? rowStats(r).score !== null : rowStats(r).score === null);
    const B = state.aiBatch = { city: state.tab, kind: checkedOnly ? "проверенные" : "непроверенные", running: true, stop: false, i: 0, n: target.length, items: [], skip: 0, fail: 0, msg: "" };
    const paint = ()=>{ const o = document.getElementById("aisumout"); if (o) o.innerHTML = aiBatchHtml(); };
    if (!target.length){ B.running = false; B.msg = checkedOnly ? "проверенных команд нет" : "непроверенных команд нет"; paint(); return; }
    for (let i = 0; i < target.length; i++){
      if (B.stop){ B.msg = "остановлено"; break; }
      const r = target[i]; B.i = i + 1; paint();
      const name = (r.opName || r.opNick || "—") + " / " + (r.model || "—"), go = r._sheet + "|" + r._row;
      try {
        if (!checkedOnly){
          const scr = aiPickScreen((state.screens || {})[skey(r)] || []);
          const id = scr ? driveId(scr.link || scr.mini || "") : "";
          if (!id){ B.skip++; B.items.push({ name, go, note: "нет скрина — пропущено", skip: 1 }); continue; }
          const res = await aiAsk("screendraft", { id: id, text: "", set: isNskRow(r) ? "nsk" : "", ckey: "batch|" + (isNskRow(r) ? "n|" : "") + id });
          if (res.error) throw new Error(res.error);
          const d = getDraft(r) || {};
          const filled = [];
          (res.cats || []).forEach(it => {
            const v = aiDraftMerge(d["f" + it.i] || "", aiDraftText(it));
            if (v !== (d["f" + it.i] || "").trim()){ d["f" + it.i] = v; filled.push((it.state === "bad" ? "❌ " : it.state === "warn" ? "⚠️ " : it.state === "ok" ? "✅ " : "") + catsOf(r)[it.i]); }
          });
          if (filled.length){ setDraft(r, d); B.items.push({ name, go, note: "черновик: " + filled.length + " из 9 категорий", detail: filled.join(" · "), bad: (res.cats||[]).filter(c=>c.state==="bad").length }); }
          else { B.skip++; B.items.push({ name, go, note: "ИИ ничего не добавил", skip: 1 }); }
        } else {
          const text = catsOf(r).map((n,j)=>{ const v = (r.cats[j] || "").trim(); return v ? n + ": " + v : ""; }).filter(Boolean).join("; ").slice(0, 6000) + (r.obs ? "; доп: " + r.obs.slice(0, 500) : "");
          if (!text.trim()){ B.skip++; B.items.push({ name, go, note: "нет текста — пропущено", skip: 1 }); continue; }
          const res = await aiAsk("verdict", { text: text, ckey: skey(r) + "|batch|" + strHash(text) });
          if (res.error) throw new Error(res.error);
          const d = getDraft(r) || {};
          const was = rowStats(r).verdict, notes = [];
          if (["норма","замечание","критично"].includes(res.verdict)){ d.verdict = res.verdict; notes.push(res.verdict === was ? "вердикт тот же: " + res.verdict : "вердикт: " + was + " → " + res.verdict); }
          if ((r.obs || "").trim()){
            try {
              const t = await aiAsk("tonecheck", { text: ("КОММЕНТАРИЙ: " + r.obs).slice(0, 8000), ckey: skey(r) + "|tone|" + strHash(r.obs) });
              if (!t.error && t.rewritten && t.rewritten.trim() !== r.obs.trim()){ d.comment = t.rewritten; notes.push("комментарий переписан мягче"); }
            } catch(e){}
          }
          setDraft(r, d);
          B.items.push({ name, go, note: notes.join(" · ") || "без изменений", changed: notes.some(n=>/→|переписан/.test(n)) });
        }
      } catch(e){
        const m = String(e && e.message || e);
        if (/лимит|исчерпан|429/.test(m)){ B.msg = "стоп: " + m + " — продолжи позже, уже сделанное сохранено в черновиках"; break; }
        B.fail++; B.items.push({ name, go, note: "ошибка: " + m.slice(0, 80), skip: 1 });
      }
    }
    B.running = false; paint(); softRender();
  };
  const aib0 = document.getElementById("aibatch0");
  if (aib0) aib0.onclick = ()=>runBatchAi(false);
  const aib1 = document.getElementById("aibatch1");
  if (aib1) aib1.onclick = ()=>runBatchAi(true);

  const aid = document.getElementById("aidelta");
  if (aid) aid.onclick = async ()=>{
    const out = document.getElementById("aideltaout");
    try {
      if (!state.fullLoaded){ out.textContent = "грузим историю недель…"; await ensureFull(); }
      // C: неделя, которая ещё не началась (создана заранее), в сравнение не попадает
      const wksAll = [...new Set(state.rows.map(r=>r.week).filter(Boolean))].filter(w=>weekKey(w) - 6*864e5 <= Date.now()).sort((a,b)=>weekKey(a)-weekKey(b));
      const cur = wksAll[wksAll.length-1], prev = wksAll[wksAll.length-2];
      if (!cur){ out.textContent = "нет данных за неделю"; return; }
      if (!prev){ out.innerHTML = '<div class="empty">прошлой недели нет — сравнивать не с чем</div>'; return; }
      out.innerHTML = v7Think("🤖 ИИ думает… (до минуты)");
      const parts = ["неделя сейчас: " + cur, "неделя раньше: " + prev];
      CITY_ORDER.forEach(c=>{
        const mk = w => {
          const rs = dedupeRows(state.rows.filter(r=>r.week===w && r.city===c));
          const ss = rs.map(rowStats).filter(x=>x.score!==null);
          return "компания " + clabel(c) + ": команд " + rs.length + ", проверено " + ss.length +
            ", норма " + ss.filter(x=>x.verdict==="норма").length + ", замечания " + ss.filter(x=>x.verdict==="замечание").length +
            ", критично " + ss.filter(x=>x.verdict==="критично").length + ", средняя " + (ss.length ? pct(ss.reduce((a,x)=>a+x.score,0)/ss.length)+"%" : "–");
        };
        parts.push(mk(cur)); parts.push(mk(prev));
      });
      const res = await aiAsk("weeklydelta", { text: parts.join("\n"), ckey: "delta|" + cur + "|" + prev + "|" + strHash(parts.join("|")) });
      if (res.error) throw new Error(res.error);
      out.innerHTML = "<ol style=\"margin:6px 0 0 18px\">" + res.lines.map(l=>"<li>"+esc(l)+"</li>").join("") + "</ol>";
    } catch(e){ out.textContent = "🤖 " + e.message; }
  };
  const aisearch = document.getElementById("aisearch");
  if (aisearch) aisearch.onclick = async ()=>{
    if (!state.search.trim()){ toast("Сначала напиши, что ищешь (например: плохо общается, но шоу нормальное)", true); return; }
    const out = document.getElementById("aisearchout");
    out.textContent = "🤖 ищу по смыслу…";
    try {
      // ищем по ВСЕМ командам: сервер режет текст на 12000 символов, поэтому команды
      // уходят пачками (каждая пачка — свой вызов ИИ), результаты склеиваются
      const lines = rows.map((r,i)=>{
        const t = r.cats.map((c,j)=>c?catsOf(r)[j]+": "+c:"").filter(Boolean).join("; ") + (r.obs ? " | " + r.obs : "");
        return i+"|"+(r.opName||r.opNick||"—")+"/"+(r.model||"—")+" ["+clabel(r.city)+"]: "+t.slice(0,200);
      });
      const chunks = [];
      let cur = [], curLen = 0;
      lines.forEach(l=>{
        if (curLen + l.length > 8500 && cur.length){ chunks.push(cur); cur = []; curLen = 0; }
        cur.push(l); curLen += l.length + 1;
      });
      if (cur.length) chunks.push(cur);
      const ms = [];
      for (let ci=0; ci<chunks.length; ci++){
        const offset = lines.indexOf(chunks[ci][0]);
        out.innerHTML = v7Think("🤖 ИИ думает… (блок " + (ci+1) + " из " + chunks.length + ", команд всего " + rows.length + ")");
        const res = await aiAsk("search", { text: state.search.trim() + "\n" + chunks[ci].join("\n"), ckey: strHash(state.search.trim() + "\n" + chunks[ci].join("\n")) }); // C: кэш по запросу И данным
        if (res.error) throw new Error(res.error);
        (res.matches || []).forEach(m=>{
          const gi = Number(m.i);
          if (gi >= 0 && gi < chunks[ci].length) ms.push({ i: offset + gi, why: m.why || "" });
        });
      }
      if (!ms.length){ out.innerHTML = '<div class="empty">🤖 подходящих по смыслу не нашлось</div>'; return; }
      out.innerHTML = ms.map(m=>{
        const x = rows[m.i]; if (!x) return "";
        return '<button class="abtn2" data-aii="'+m.i+'">'+esc((x.opName||x.opNick||"—"))+" / "+esc(x.model||"—")+" · "+esc(clabel(x.city))+"</button> <span style=\"color:var(--dim);font-size:12px\">"+esc(m.why||"")+"</span><br>";
      }).join("");
      out.querySelectorAll("[data-aii]").forEach(b=>b.onclick=()=>{
        const x = rows[Number(b.dataset.aii)]; if (!x) return;
        state.tab = x.city; state.search = x.opNick || x.opName || ""; state.quick = ""; state.page = 1; render();
      });
    } catch(e){ out.textContent = "🤖 " + e.message; }
  };
  
  const prv = document.getElementById("pr-rev");
  if (prv) prv.onclick = ()=>{ prodModeSet("reviews"); render(); };
  const fs=document.getElementById("f-search");
  fs.oninput = e=>{
    state.search = e.target.value;
    clearTimeout(searchTimer); // перерисовка не на каждый символ, а 200мс после паузы
    searchTimer = setTimeout(()=>{
      state.page = 1; state.railSkipOnce = true; render(); // C: фокус и позицию каретки сохраняет render() (раньше каретка прыгала в конец)
    }, 200);
  };


  let view = rows.map((r,i)=>({r, s:S[i]}));
  if (state.producer) view = view.filter(x=>x.r.producer===state.producer);
  if (state.quick==="crit") view = view.filter(x=>x.s.verdict==="критично");
  else if (state.quick==="warn") view = view.filter(x=>x.s.verdict==="замечание");
  else if (state.quick==="none") view = view.filter(x=>x.s.score===null);
  else if (state.quick==="ok") view = view.filter(x=>x.s.verdict==="норма");
  else if (state.quick==="fresh") view = view.filter(x=>isFresh(x.r));
  else if (state.quick==="due") view = view.filter(x=>isDue(x.r));
  else if (state.quick==="draft") view = view.filter(x=>draftIsDirty(x.r));
  else if (state.quick==="pmno") view = view.filter(x=>!pmChecked(pmOf(x.r))); // v7: «продюсер не проверил» — по мониторингу продюсеров
  if (state.search){ const q=state.search.toLowerCase(); view=view.filter(x=>[x.r.producer,x.r.opName,x.r.opNick,x.r.model,x.r.obs].concat(x.r.cats).join(" ").toLowerCase().includes(q)); }
  const pinOf = x=>{ const m = markOf(x.r); return m && m.p ? 0 : 1; }; // v6.6: закреплённые — наверх
  view.sort((a,b)=>(pinOf(a)-pinOf(b)) || ((a.s.score===null?99:a.s.score)-(b.s.score===null?99:b.s.score)));
  // D2/D8/U1: DOM-ключ строки — стабильный id из «лист|ник|модель#строка», а не индекс в отсортированном виде:
  // после пересортировки/перерисовки кнопки, черновики, ошибки сохранения и ИИ-ответы остаются у СВОЕЙ команды
  const usedIds = {};
  view.forEach(x=>{ let id = "k" + strHash(rk(x.r)); while (usedIds[id]) id += "x"; usedIds[id] = 1; x.id = id; });
  state.lastView = {}; view.forEach(x=>{ state.lastView[x.id] = x; });
  state.lastViewList = view;

  // группы по продюсерам
  const groupsMap = {};
  view.forEach((x)=>{
    const key = x.id;
    const gk = x.r.city+"|"+(x.r.producer||"—");
    if (!groupsMap[gk]) groupsMap[gk] = {city:x.r.city, producer:x.r.producer||"—", items:[], ok:0, warn:0, bad:0, none:0};
    const g = groupsMap[gk];
    g.items.push({x,key});
    if (x.s.verdict==="норма") g.ok++;
    else if (x.s.verdict==="замечание") g.warn++;
    else if (x.s.verdict==="критично") g.bad++;
    else g.none++;
  });
  let groups = Object.keys(groupsMap).map(k=>Object.assign({key:k}, groupsMap[k]));
  const filterActive = state.search || state.quick;
  const gPin = g=>g.items.some(it=>pinOf(it.x)) ? 0 : 1; // группа с закреплённой командой — выше
  groups.sort((a,b)=>(gPin(a)-gPin(b)) || ((b.bad*3+b.warn)-(a.bad*3+a.warn)));
  const PAGE = 12;
  const shown = groups.slice(0, state.page*PAGE);
  const hidden = groups.length - shown.length;
  // «показано N из M» — N по реально видимым строкам (открытые группы), M — все под фильтр
  const shownN = shown.reduce((a,g)=>a+g.items.length,0);
  document.getElementById("f-count").textContent = "показано " + shownN + " из " + view.length + (hidden>0 ? " · ещё группы: " + hidden : "");

  const showCoCol = (state.tab==="Обзор"||state.search) && !AUTH.prod;
  const ncols = 5 + (showCoCol ? 1 : 0) + (pmOn ? 1 : 0);
  const PMLBL = { "черновик":"начат", "отправлено":"отправлен", "принято":"принят", "возврат":"возврат" };
  const segRow = (sts, cls, texts, names) => `<span class="ov-segs ${cls||""}">${sts.map((v,j)=>`<i class="${v==="ok"?"o":v==="warn"?"w":v==="bad"?"b":""}" title="${esc((names||CATS)[j])} — ${ST_LBL[v]||"не отмечено"}${texts && markBody(texts[j]) ? ": " + esc(markBody(texts[j]).slice(0, 240)) : ""}"></i>`).join("")}</span>`; // v7.1: при наведении — сам текст замечания
  // крупная оценка в карточке: по текущему тексту полей + ручные оценка/вердикт (как rowStats)
  const ovScore = (vals, msc, mvd, stsIn, names) => { // stsIn — готовые состояния (у облегчённой строки истории их посчитал сервер по полному тексту)
    const sts = stsIn || vals.map(catState), ok = sts.filter(v=>v==="ok").length, warn = sts.filter(v=>v==="warn").length, bad = sts.filter(v=>v==="bad").length, n = sts.filter(v=>v!==null).length;
    let score = n ? ok + warn * 0.5 : null, verdict = n ? verdictOf(bad, warn) : "";
    const m = String(msc==null ? "" : msc).trim().replace(",",".").match(/^(\d+(?:\.\d+)?)$/);
    if (n && m) score = Math.min(MAX_SCORE, Math.max(0, parseFloat(m[1])));
    if (n && mvd) verdict = mvd;
    return `<div class="ov-big"><b class="${vcls(verdict)}">${fmtSc(score)}<small>/${MAX_SCORE}</small></b>${verdict ? `<span class="chip ${chipCls[verdict]||""}">${VLX[verdict]||esc(verdict)}</span>` : '<span class="chip ov-nochip">не отмечено</span>'}</div>${segRow(sts, "big", null, names)}`;
  };
  const ovBadges = r => { const m = markOf(r), nb = newbieOf(r);
    return (m && m.p ? `<span class="ov-pin" title="закреплена наверху">${ovIc(OVP.pin, 12)}</span>` : "")
      + (m && (m.t || m.c) ? `<span class="tmark" style="background:${esc(m.c||"#9aa3b2")}" title="метка смотрящего">${esc(m.t || "●")}</span>` : "")
      + (nb ? `<span class="ov-new" title="новый оператор: период адаптации">новичок ${nb.day}/${nb.total}</span>` : ""); };
  document.getElementById("table").innerHTML = groups.length ? shown.map(g=>{
    const open = filterActive || state.grpOpen[g.key];
    const gkeyEsc = esc(g.key);
    const rowsHtml = g.items.map(({x,key})=>{
      const buildDetail86 = openDet.has(String(key));
      const canEdit = rowEditable(x.r);
      const dr = getDraft(x.r);
      const rowScreens = (state.screens||{})[skey(x.r)] || [];
      const rowLinks = linksArrFromText(null, x.r.linksTxt||"").filter(l=>/^https?:\/\//i.test(l.url));
      const linksCell = rowLinks.map(l=>`<a class="rlink" href="${esc(l.url)}" target="_blank" rel="noopener" title="${esc(l.url)}">${esc(l.title||"ссылка")}</a>`).join("");
      const scrThumbs = (scr,n,del)=>scr.length?`<div class="scrow">${scr.map(s=>`<span class="sthumb" title="${esc(s.ts||"")}"><img loading="lazy" decoding="async" src="${esc((state.thumbData||{})[s.mini||s.link] || (s.mini ? BLANK : driveThumb(s.link,thumbPx(96))))}" data-tk="${esc(s.mini||s.link)}" data-full="${esc(s.link)}" alt="скрин: ${esc(n)}" data-cat="${esc(n)}">${del?`<span class="sqx" data-dsk="${esc(skey(x.r))}" data-dlink="${esc(s.link)}" title="удалить скрин">✕</span>`:""}</span>`).join("")}</div>`:"";
      const genScreens = rowScreens.filter(s=>!CATS_ALL.includes(String(s.cat)) && !isAdvCat(s.cat)); // фото советов — в своих заметках
      const plan = (state.plans||{})[x.r.city+"|"+x.r.producer] || "";
      const pmBlk = pmBlockFor(x.r); // v6: мониторинг продюсера по этой команде (статус, расхождения)
      const teamTools = (AUTH.edit && !viewAsActive()) ? `<button class="ov-tbtn" data-mark="${key}" title="цвет, подпись и закрепление наверху — видят все">Метка</button><button class="ov-tbtn${newbieOf(x.r) ? " on" : ""}" data-newbie="${key}" title="новый оператор: метка «новичок» на период адаптации">${newbieOf(x.r) ? "Снять «новичок»" : "Новичок"}</button>` : "";
      // --- только просмотр ---
      const readDet = buildDetail86 && !canEdit ? `<div class="co-main"><div class="co-tools"><span class="co-hint">Разбор смотрящего · только просмотр</span><span class="sp"></span>${teamTools}</div>`
        + catsOf(x.r).map((n,j)=>{
          const t = (x.r.cats[j]||"").trim(), s0 = x.s.st[j], adv = recoSplit(x.r.reco, catsOf(x.r)).adv[j], advScr = rowScreens.filter(s=>String(s.cat)===ADV_CAT(n));
          const scr = rowScreens.filter(s=>String(s.cat)===n);
          return `<div class="co-rcat ${s0?"st-"+s0:""}"><span class="cnum">${j+1}</span><b>${esc(n)}</b><span class="chip ${s0==="bad"?"c-bad":s0==="warn"?"c-warn":s0==="ok"?"c-ok":"ov-nochip"}">${ST_LBL[s0]||"не отмечено"}</span>${isNskRow(x.r) ? `<span class="nsk-hint ro">${esc(NSK_HINT[j])}</span>` : ""}${nskRoBody(x.r, j, t, hl)}${isNskRow(x.r) && NSK_SHOTS[j] ? `<span class="nsk-shots ${scr.length >= NSK_SHOTS[j] ? "ok" : "miss"}">скрин ${scr.length} из ${NSK_SHOTS[j]}</span>` : ""}${scrThumbs(scr,n,false)}${adv || advScr.length ? `<div class="adv-ro"><b>💡 Совет</b>${adv ? `<span class="utext">${hl(adv)}</span>` : ""}${scrThumbs(advScr, ADV_CAT(n), false)}</div>` : ""}</div>`;
        }).join("")
        + (genScreens.length ? `<div class="drow"><b>Общее фото / видео</b>${scrThumbs(genScreens,"общее фото",false)}</div>` : "")
        + (x.r.obs ? `<div class="drow"><b>Комментарий / наблюдение</b><span class="utext">${hl(x.r.obs)}</span></div>` : "")
        + (recoSplit(x.r.reco).gen ? `<div class="drow"><b>Рекомендации команде</b><span class="utext">${hl(recoSplit(x.r.reco).gen)}</span></div>` : "")
        + (plan ? `<div class="drow"><b>План работ</b><span class="utext">${esc(plan)}</span></div>` : "")
        + (rowLinks.length ? `<div class="drow"><b>Ссылки</b><span>${linksCell}</span></div>` : "")
        + `</div><aside class="co-side">${ovScore(x.r.cats.map(c=>c||""), x.r.scoreM, x.r.verdictM, x.r._lite ? rowStats(x.r).st : null, catsOf(x.r))}<div class="co-hint">${x.r.updated ? "Оценка смотрящего · последняя проверка " + esc(fmtDay(x.r.updated)) : "Смотрящий ещё не проверял"}</div>${pmBlk ? `<div class="co-pm">${pmBlk}</div>` : ""}</aside>` : "";
      // --- редактор ---
      const vals0 = CATS.map((n,j)=> dr && dr["f"+j] !== undefined ? dr["f"+j] : (x.r.cats[j]||""));
      const lv0 = liveEval(vals0);
      const scV = String(dr&&dr.score!==undefined?dr.score:(x.r.scoreM??"")).trim().replace(",",".");
      const vdV = (dr&&dr.verdict!==undefined?dr.verdict:(x.r.verdictM||""));
      const comV = dr && dr.comment !== undefined ? dr.comment : (x.r.obs||"");
      const lkV = dr && dr.lk !== undefined ? dr.lk : (x.r.linksTxt||"");
      const xo = state.ovX || (state.ovX = {});
      const recoV = dr && dr.reco !== undefined ? dr.reco : (x.r.reco||""), rsp = recoSplit(recoV, catsOf(x.r)); // v7.3: общие рекомендации + советы по категориям
      const CL = catsOf(x.r), nsk = isNskRow(x.r);
      const editDet = buildDetail86 && canEdit ? CL.map((n,j)=>{
        const val = dr && dr["f"+j] !== undefined ? dr["f"+j] : (x.r.cats[j]||"");
        const goals = nsk && j === NSK_GOALS, bots = nsk && j === 3, scale = nsk && j === NSK_SCALE;
        const bp = bots ? botsParse(val) : null;
        const gp = goals ? goalsParse(val) : null;
        const taId = goals ? `edc${key}_${j}` : bots ? `edb${key}_${j}` : `ed${key}_${j}`; // у «Голов» видимое поле — комментарий, полное значение собирается в скрытом ed…
        const st0 = v7CatState(val), code = phCode(x.r, j);
        const shotsNeed = nsk ? (NSK_SHOTS[j] || 0) : 0, shotsHave = rowScreens.filter(s=>String(s.cat)===n).length;
        const seg = scale ? `<span class="cat-seg cat-scale" role="group" aria-label="${esc(n)}: оценка от 1 до 5">${[1,2,3,4,5].map(k=>`<button class="qbtn qsc sc${k}" data-ta="${taId}" data-sc="${k}" title="${["","не общается","очень слабо","средне — есть что поправить","хорошо","очень активно"][k]}" aria-pressed="${scaleOf(val)===k}">${k}</button>`).join("")}</span>`
          : nsk && NSK_CHOICES[j] ? `<span class="cat-seg nsk-choices" role="group" aria-label="${esc(n)}">${nskChoiceButtons(j,taId,st0)}</span>` : `<span class="cat-seg" role="group" aria-label="${esc(n)}: уровень">${segBtns(`data-ta="${taId}"`, st0)}</span>`;
        return `<div class="f cat${nsk ? " nsk" : ""}" data-st="${st0}" data-j="${j}"><div class="cat-h"><span class="cnum">${j+1}</span><b class="cname">${esc(n)}</b>${seg}<span class="sp"></span>`
          + (shotsNeed ? `<span class="nsk-shots ${shotsHave >= shotsNeed ? "ok" : "miss"}" title="нужно скринов: ${shotsNeed}">${shotsHave >= shotsNeed ? "✓" : "!"} скрин ${Math.min(shotsHave, 99)} из ${shotsNeed}</span>` : "")
          + `<button class="qbtn cat-ib" data-upl="${key}_${j}" title="прикрепить скрин к «${esc(n)}»" aria-label="прикрепить скрин к «${esc(n)}»"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg></button><button class="qbtn qclr cat-ib" data-ta="${taId}" data-v="" title="очистить поле" aria-label="очистить поле «${esc(n)}»"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M9 6h11v12H9l-6-6z"/><path d="M12.5 9.5l5 5M17.5 9.5l-5 5"/></svg></button></div>`
          + (nsk ? `<div class="nsk-hint">${esc(NSK_HINT[j])}</div>` : "")
          + `<div class="cat-ta"><textarea id="${taId}" data-j="${j}" rows="2" placeholder="${bots ? "Общий комментарий; ниже добавь ботов по одному" : goals ? "комментарий к голам (необязательно)" : scale ? "что видно в общении — при 1–3 опиши, что не так" : "что увидел — при замечании или «плохо» опиши, что именно"}" aria-label="Комментарий: ${esc(n)}">${esc(goals ? gp.head : bots ? bp.head : val)}</textarea><div class="ta-meta"><span class="ta-len">${val.length ? val.length + " симв." : ""}</span>${goals || bots ? "" : `<button class="ta-exp" data-exp="ed${key}_${j}" data-n="${esc(n)}" data-num="${j+1}" title="развернуть на весь экран">⤢ развернуть</button>`}</div></div>`
          + (goals ? `<textarea id="ed${key}_${j}" hidden aria-hidden="true" tabindex="-1">${esc(val)}</textarea>${goalsEditor(key, gp.goals)}` : bots ? `<textarea id="ed${key}_${j}" hidden aria-hidden="true" tabindex="-1">${esc(val)}</textarea>${botsEditor(key,bp.bots)}` : "")
          + `<div class="chips">${advBtn(key, j, rsp.adv[j], rowScreens.filter(s=>String(s.cat)===ADV_CAT(n)).length)}${(nsk && NSK_CHOICES[j] ? [] : getPhrases(code)).map(p=>`<span class="qchip myq" data-ta="${taId}" data-p="${esc(p)}" title="своя фраза — клик добавит, ✕ удалит">${esc(p)}<span class="qx" data-qx="${esc(p)}" data-code="${code}">✕</span></span>`).join("")}${(nsk && NSK_CHOICES[j] ? [] : phList(x.r, j)).map(p=>`<span class="qchip lv-${phLv(p)}" data-ta="${taId}" data-p="${esc(p)}" data-lv="${phLv(p)}" title="${phLv(p)==="bad"?"добавит и поставит «✕ Плохо»":"добавит и поставит «! Замечание»"}">+ ${esc(p)}</span>`).join("")}${nsk && NSK_CHOICES[j] ? '<span class="co-hint">Выбери ответ выше; пояснение напиши в поле.</span>' : `<span class="qchip myadd" data-add="${key}_${j}" data-code="${code}" data-n="${esc(n)}">＋ своя</span>`}</div>${scrThumbs(rowScreens.filter(s=>String(s.cat)===n),n,true)}${advBlock(key, j, n, rsp.adv[j], scrThumbs(rowScreens.filter(s=>String(s.cat)===ADV_CAT(n)), ADV_CAT(n), false))}</div>`;
      }).join("") : "";
      const failInfo = state.failedSaves[rk(x.r)];
      const failBar = canEdit && failInfo ? `<div class="failbar">Не сохранилось: ${esc(failInfo.msg)} <button class="abtn2" id="retry${key}">${failInfo.code==="SAVE_CONFLICT"?"Сравнить версии":"↻ Повторить"}</button> <span style="color:var(--faint);font-size:11px">правка осталась в строке</span></div>` : "";
      const roNote = (AUTH.edit && !canEdit && !viewAsActive()) ? `<div class="editlive co-ro">Только просмотр: неделя «${esc(x.r.week||"—")}» не открыта для правок${weekPinned()?" (на «все недели»/«месяц» правки отключены)":""} — выбери её в списке недель</div>` : "";
      const inner = !buildDetail86 ? "" : canEdit ? `${reviewTools({...x.r,cats:vals0},key)}<div class="co-card">
        <div class="co-main">${failBar}
          <div class="co-tools"><span class="co-hint">Отметь каждую категорию — оценка и вердикт считаются сами</span><span class="sp"></span>${teamTools}<button class="ov-tbtn rbtn-op" data-rop="${key}" title="сменить оператора/модель">Сменить опера / модель</button><button class="ov-tbtn ov-allok" data-allok="${key}" title="поставить «всё хорошо» во все 9 категорий">✓ Всё хорошо по всем</button></div>
          <div class="edit-grid v7">${editDet}</div>
          <div class="co-extra">
            <div class="co-xbtns"><button class="co-xbtn${(comV || xo[key+"c"]) ? " on" : ""}" data-oxt="${key}c" aria-expanded="${(comV || xo[key+"c"]) ? "true" : "false"}">+ Комментарий / наблюдение</button><button class="co-xbtn${(lkV || xo[key+"l"]) ? " on" : ""}" data-oxt="${key}l" aria-expanded="${(lkV || xo[key+"l"]) ? "true" : "false"}">+ Ссылки на сайты</button><button class="co-xbtn" data-upl="${key}_G" title="прикрепить общее фото или видео без категории">+ Общее фото / видео</button></div>
            <div class="co-xf${(comV || xo[key+"c"]) ? " on" : ""}" data-oxf="${key}c"><label class="co-lbl" for="ed${key}_comment">Комментарий / наблюдение</label><textarea id="ed${key}_comment" placeholder="что ещё заметил на смене">${esc(comV)}</textarea></div>
            <div class="co-xf${(lkV || xo[key+"l"]) ? " on" : ""}" data-oxf="${key}l"><label class="co-lbl" for="lk${key}">Ссылки (одна в строке: «Название = URL»; сохраняются кнопкой «Сохранить»)</label>${linksCell ? `<div class="co-links">${linksCell}</div>` : ""}<textarea id="lk${key}" placeholder="CB = https://chaturbate.com/... — можно просто вставить ссылку или «Название: ссылка» (одна в строке)">${esc(lkV)}</textarea></div>
          </div>
          ${genScreens.length ? `<div class="co-gen"><b>Общее фото / видео</b>${scrThumbs(genScreens,"общее фото",true)}</div>` : ""}
        </div>
        <aside class="co-side">
          <div class="co-score" id="ovsc${key}">${ovScore(vals0, scV, vdV, null, catsOf(x.r))}</div>
          <div class="co-hint">Считается само: норма — 1 балл, замечание — ½, плохо — 0. Вручную — оценка и вердикт ниже.</div>
          <div class="editlive" id="live${key}" hidden>${lv0}</div>
          ${pmBlk ? `<div class="co-pm">${pmBlk}</div>` : ""}
          <label class="co-lbl" for="recg${key}">Рекомендации команде (видит продюсер)</label><textarea id="recg${key}" class="co-reco" placeholder="общие рекомендации; советы по категориям — кнопкой «💡 Совет» под категорией">${esc(rsp.gen)}</textarea><textarea id="ed${key}_reco" hidden aria-hidden="true" tabindex="-1">${esc(recoV)}</textarea>
          <div class="co-man"><label>Оценка вручную<select id="ed${key}_score"><option value="">авто</option>${Array.from({length:MAX_SCORE*2+1},(_,n)=>n/2).map(n=>`<option ${(scV===String(n))?"selected":""}>${n}</option>`).join("")}</select></label><label>Вердикт вручную<select id="ed${key}_verdict"><option value="">авто</option>${["норма","замечание","критично"].map(v=>`<option ${(vdV===v)?"selected":""}>${v}</option>`).join("")}</select></label></div>
          <button class="savebtn" id="sv${key}">Сохранить сейчас</button>
          <div class="co-2"><button class="abtn2" id="tc${key}" title="поставить штамп «Обновлено» без правок">Проверено сегодня</button><button class="abtn2" id="tsk${key}" title="поставить задачу продюсеру (появится в «Мои задачи»)">Поручить продюсеру</button></div>
          <div class="aimenu"><button class="abtn2 aimbtn" data-aim="${key}" title="все функции ИИ для этой команды">${V7I.spark} ИИ-помощник <span class="car">▾</span></button>
          <div class="aimpop" id="aimp${key}">
            <div class="aisec">Разбор</div><button id="aiv${key}"><b>Разобрать</b><small>вердикт по тексту проверки — применяется только «принять»</small></button>
            <button id="aifull${key}"><b>Полный разбор</b><small>все ошибки по всем полям + новый комментарий</small></button>
            ${rowScreens.length?`<button id="aiscr${key}"><b>Черновик по скрину</b><small>9 категорий по скрину — в текст только то, что примешь</small></button>`:""}
            <div class="aisec">Черновики и динамика</div><button id="aicmp${key}"><b>Сравнить с прошлой неделей</b><small>что стало лучше и хуже</small></button>
            <button id="aich${key}"><b>Черновик чека</b><small>план в «Чек» по критичным пунктам</small></button>
            <div class="aisec">Оператору</div><button id="aiodv${key}"><b>Совет оператору</b><small>3 совета простыми словами — только копирует</small></button>
            <button id="aitone${key}"><b>Тон комментария</b><small>проверка тона общего комментария</small></button>
          </div></div>
          <div class="aibox" id="aibox${key}" style="display:none"></div>
          <div class="co-draft"><i class="${dr ? "w" : "o"}" id="ovdd${key}"></i><span id="ovds${key}">${dr ? "Есть неотправленные изменения — сохранение при следующей правке или кнопкой" : "Все изменения сохранены"}</span><span id="svmsg${key}" class="co-svmsg"></span></div>
        </aside></div>`
        : roNote + reviewTools(x.r,key) + `<div class="co-card ro">${readDet}</div>`;
      const cityCell = showCoCol ? `<td class="ov-cocell"><span style="color:${OVC[x.r.city]||"var(--dim)"}">${esc(clabel(x.r.city))}</span>${(!state.week||state.week==="all")&&x.r.week?` <span style="color:var(--faint);font-size:10.5px;white-space:nowrap">· ${esc(x.r.week)}</span>`:""}</td>` : "";
      const draftMark = canEdit && dr ? ' <span class="draftmark">черновик</span>' : "";
      const icons = ((x.r.obs||"").trim() ? `<span class="ov-ico" title="${esc(x.r.obs)}">комм.</span>` : "") + (()=>{ const sp = recoSplit(x.r.reco, catsOf(x.r)), na = x.r._lite && x.r._advN != null ? +x.r._advN : sp.adv.filter(Boolean).length; /* у облегчённой строки число советов посчитал сервер */ return (sp.gen ? '<span class="ov-ico" title="есть рекомендации">реком.</span>' : "") + (na ? `<span class="ov-ico ov-adv" title="советы по категориям: ${esc(CATS.filter((n,j)=>sp.adv[j]).join(", "))}">советы ${na}</span>` : ""); })() + (x.r.scoreM ? `<span class="ov-ico" title="оценка выставлена вручную: ${esc(x.r.scoreM)}/${MAX_SCORE}">вручную</span>` : "");
      const updCell = (()=>{ const u = dueInfo(x.r); if (!u) return '<span style="color:var(--faint);font-size:11.5px">—</span>';
        const nx = String(u.nextDay).padStart(2,"0")+"."+String(u.nextMonth).padStart(2,"0");
        const lab = u.days>=u.per ? '<span style="color:var(--bad-t);font-weight:600">к перепроверке</span>' : u.days>=u.per-1 ? '<span style="color:var(--warn);font-weight:600">скоро</span>' : '<span style="color:var(--ok)">'+(u.days===0?"сегодня":u.days+" дн. назад")+'</span>';
        return `<div class="ov-upd"><b>${esc(fmtDay(x.r.updated))}</b><div>${lab} · след. ${nx}</div></div>`;
      })();
      const pmIt = pmOf(x.r);
      const pmCell = pmOn ? (()=>{ if (!pmIt) return '<span class="ov-pmst">не начат</span>'; const d = pmDiff(pmIt.cats, x.s.st), nd = d.miss.length + d.strict.length;
        const cls = pmIt.status==="возврат" || nd ? "warn" : pmIt.status==="принято" ? "ok" : pmIt.status==="отправлено" ? "ink" : "";
        return `<span class="ov-pmst ${cls}" title="${nd ? "расхождений с тобой: " + nd + " (" + esc(d.miss.concat(d.strict).map(j=>catsOf(x.r)[j]).join(", ")) + ")" : "мониторинг продюсера"}">${PMLBL[pmIt.status]||"не начат"}${nd ? " · ≠" + nd : ""}</span>`; })() : "";
      const mk = markOf(x.r);
      const op = x.r.opName || x.r.opNick || "";
      const nick = x.r.opName && x.r.opNick ? x.r.opNick : "";
      return `<tr class="r${state.failedSaves[rk(x.r)]?" savefail":""}" data-i="${key}"${mk && mk.c ? ` style="box-shadow:inset 4px 0 0 ${esc(mk.c)}"` : ""}><td class="ov-tc"><div class="ov-team"><span class="ov-car">${ovIc(OVP.car, 12)}</span><b>${hl(op)}${x.r.model ? `<span class="ov-sep"> · </span>${hl(x.r.model)}` : ""}</b>${nick ? `<span class="ov-nick">${hl(nick)}</span>` : ""}${ovBadges(x.r)}${icons}${draftMark}</div>${linksCell ? `<div class="ov-links">${linksCell}</div>` : ""}</td>${cityCell}<td><div class="ov-sc">${segRow(x.s.st, "", x.r.cats, catsOf(x.r))}<b class="${x.s.score===null ? "" : vcls(x.s.verdict)}">${x.s.score===null ? "–" : fmtSc(x.s.score) + "/" + MAX_SCORE}</b></div></td><td>${x.s.verdict?`<span class="chip ${chipCls[x.s.verdict]||""}">${VLX[x.s.verdict]||esc(x.s.verdict)}</span>`:'<span class="chip ov-nochip">не проверено</span>'}</td><td class="pcol">${updCell}</td>${pmOn ? `<td>${pmCell}</td>` : ""}<td class="ov-act">${canEdit?`<button class="schipbtn" data-stc="${key}" title="клик — сменить статус (ново → в работе → исправлено)">${x.r.status?`<span class="chip ${chipCls[x.r.status]||"c-warn"}">${esc(x.r.status)}</span>`:`<span class="chip ov-nochip">статус</span>`}</button><span class="rowbtns"><button class="rbtn" data-rop="${key}" title="сменить оператора/модель" aria-label="сменить оператора или модель">${ovIc(OVP.users, 15)}</button><button class="rbtn rbtn-del" data-rdel="${key}" title="удалить смену" aria-label="удалить смену">${ovIc(OVP.trash, 15)}</button></span>`:(x.r.status?`<span class="chip ${chipCls[x.r.status]||"c-warn"}">${esc(x.r.status)}</span>`:"")}</td></tr>
      <tr class="detail${openDet.has(String(key))?" open":""}" data-d="${key}" data-ready="${buildDetail86?"1":"0"}"><td colspan="${ncols}"><div class="detail-in">${inner}</div></td></tr>`;
    }).join("");
    const pcol = state.colors[g.producer]||"#566070";
    const gsegs = g.items.map(({x})=>`<i class="${vcls(x.s.verdict)}" title="${esc((x.r.opName||x.r.opNick||"—")+" / "+(x.r.model||"—"))}: ${x.s.score===null?"не проверено":fmtSc(x.s.score)+"/"+MAX_SCORE}"></i>`).join("");
    const gplan = (state.plans||{})[g.key] || "";
    return `<div class="pgroup ov-grp ${open?"open":""}" data-g="${gkeyEsc}">
      <div class="phead" data-g="${gkeyEsc}" role="button" tabindex="0" aria-expanded="${open?"true":"false"}">
        <span class="arrow">${ovIc(OVP.car, 14)}</span>
        <span class="cdot" data-prod="${esc(g.producer)}" style="background:${esc(pcol)}" title="цвет продюсера"></span><b>${esc(g.producer)}</b>
        <span class="ov-gsegs">${gsegs}</span>
        <span class="ov-gsum">${g.ok} норма${g.warn ? " · " + g.warn + " замеч." : ""} · ${g.bad} критично${g.none ? " · не проверено " + g.none : ""}</span>
        ${showCoCol?`<span class="ov-gco" style="color:${OVC[g.city]||"var(--faint)"}">${esc(clabel(g.city))}</span>`:""}
        <span class="sp"></span>
        ${gplan ? `<span class="ov-plan" title="${esc(gplan)}">План: ${esc(gplan)}</span>` : ""}
        ${AUTH.edit?`<button class="gbtn planbtn" data-plan="${gkeyEsc}" title="план работ">План работ</button><button class="gbtn addg" data-addg="${gkeyEsc}" ${weekPinned()?"disabled title=\"сначала выбери конкретную неделю\"":"title=\"добавить мониторинг этому продюсеру (неделя "+esc(openWeekName())+")\""}>+ Команда</button><button class="gbtn delbtn ov-gdel" data-del="${gkeyEsc}" aria-label="удалить команду" ${weekPinned()?"disabled title=\"сначала выбери конкретную неделю\"":"title=\"удалить команду (неделя "+esc(openWeekName())+")\""}>${ovIc(OVP.trash, 14)}</button>`:""}
      </div>
      <div class="pbody"><table><thead><tr><th>Опер · модель</th>${showCoCol?"<th>Компания</th>":""}<th>Оценка по 9 категориям</th><th>Вердикт</th><th class="pcol">Проверено</th>${pmOn?"<th>Мониторинг продюсера</th>":""}<th><span class="ov-vh">действия</span></th></tr></thead><tbody>${rowsHtml}</tbody></table></div>
    </div>`;
  }).join("") + (hidden>0 ? `<div style="text-align:center;margin-top:12px"><button class="abtn2" id="morebtn">Показать ещё команды (${hidden})</button></div>` : "") + emptyProdsHtml(groups)
    : (emptyProdsHtml(groups) || `<div class="empty ov-empty">${esc(emptyReason())}</div>`);

  document.querySelectorAll(".phead").forEach(h=>h.onclick=()=>{
    state.grpOpen[h.dataset.g] = !state.grpOpen[h.dataset.g];
    h.parentElement.classList.toggle("open");
    h.setAttribute("aria-expanded", h.parentElement.classList.contains("open") ? "true" : "false");
  });
  document.querySelectorAll(".planbtn").forEach(b=>b.onclick=(ev)=>{
    ev.stopPropagation();
    const parts = b.dataset.plan.split("|");
    document.getElementById("pl-prod").textContent = parts[1] || "—";
    document.getElementById("pl-city").textContent = clabel(parts[0] || "");
    document.getElementById("pl-text").value = (state.plans||{})[b.dataset.plan] || "";
    document.getElementById("pl-text").dataset.key = b.dataset.plan;
    openModal("planmodal");
  });
  document.querySelectorAll(".delbtn").forEach(b=>b.onclick=(ev)=>{
    ev.stopPropagation();
    if (!AUTH.edit){ toast("Удалять команды может только редактор", true); return; }
    const parts = b.dataset.del.split("|");
    const ov = document.getElementById("delmodal");
    ov.dataset.key = b.dataset.del;
    document.getElementById("d-prod").textContent = parts[1] || "—";
    document.getElementById("d-city").textContent = clabel(parts[0] || "");
    document.getElementById("d-msg").textContent = "";
    openModal("delmodal");
  });
  document.querySelectorAll(".addg").forEach(b=>b.onclick=(ev)=>{
    ev.stopPropagation();
    if (!AUTH.edit){ toast("Добавлять команды может только редактор", true); return; }
    if (weekPinned()){ toast("Сначала выбери конкретную неделю в списке недель", true); return; }
    const parts = b.dataset.addg.split("|");
    document.getElementById("a-city").value = parts[0] || "Томск";
    updateProdList();
    const sel = document.getElementById("a-prod");
    const want = parts[1] || "";
    if ([...sel.options].some(o=>o.textContent===want)) sel.value = want;
    else { sel.value = "__new"; document.getElementById("a-newrow").style.display = ""; document.getElementById("a-prod-new").value = want; }
    document.getElementById("a-msg").textContent = "";
    try{ localStorage.setItem("dash_addlast", JSON.stringify({city:parts[0], prod:parts[1]})); }catch(e){}
    openModal("addmodal");
  });
  document.querySelectorAll("[data-stc]").forEach(b=>b.onclick=async (ev)=>{
    ev.stopPropagation();
    const x = state.lastView[b.dataset.stc]; if (!x) return;
    const L = ["ново","в работе","исправлено"];
    const cur = (x.r.status||"").trim().toLowerCase();
    let next;
    if (!cur) next = L[0];
    else { const i = L.indexOf(cur); next = (i>=0 && i < L.length-1) ? L[i+1] : (i===-1 ? L[0] : ""); }
    try {
      const res = await wp(Object.assign({ action:"save", f1:"status", v1:next }, rowKeyParams(x.r)));
      if (res.error) throw new Error(res.error);
      x.r.status = next;
      if (res.stamp) x.r.updated = res.stamp;
      toast(next ? "Статус: "+next : "Статус сброшен");
      render();
    } catch(e){ toast("Ошибка: "+e.message, true); }
  });
  document.querySelectorAll(".qx[data-code]").forEach(x=>x.onclick=(ev)=>{ ev.stopPropagation(); delPhrase(x.dataset.code, x.dataset.qx); render(); });
  document.querySelectorAll("[data-upl]").forEach(b=>b.onclick=(ev)=>{
    ev.stopPropagation();
    const parts = b.dataset.upl.split("_");
    const x = state.lastView[parts[0]]; if (!x) return;
    if (/^A\d$/.test(parts[1])){ const ai = +parts[1].slice(1); openUpload(x, ai, "💡 совет · " + catsOf(x.r)[ai], true); return; } // v7.4: фото к совету
    const catIdx = parts[1]==="G" ? undefined : parseInt(parts[1],10); // G = общее фото без категории
    openUpload(x, catIdx, catIdx===undefined ? "общее фото" : catsOf(x.r)[catIdx]);
  });
  document.querySelectorAll(".sthumb img").forEach(im=>{
    im.onclick=()=>{
      const cai = document.getElementById("cam-ai");
      const cout = document.getElementById("cam-aiout");
      cai.style.display = ""; cout.style.display = "none"; cout.textContent = "";
      cai.onclick = async ()=>{
        cout.style.display = ""; cout.innerHTML = v7Think("🤖 ИИ думает… (подсказка по кадру, не оценка)");
        try {
          const fid = camOrigId || driveId(im.getAttribute("data-full") || ""); // после разметки — уже новый файл
          const res = await aiAsk("framedraft", { id: fid, ckey: "frame|" + fid });
          if (res.error) throw new Error(res.error);
          cout.innerHTML = res.issues.map(i2=>"• "+esc(i2)).join("<br>");
        } catch(e){ cout.textContent = "🤖 " + e.message; }
      };
      camShow(im.getAttribute("src") || BLANK, true); // сразу миниатюра как заглушка, следом — оригинал
      document.getElementById("cam-title").textContent = (im.getAttribute("data-cat") || "скрин");
      openModal("cammodal");
      const full = im.getAttribute("data-full") || "";
      camLoadFull(driveId(full));
    };
  });
  document.querySelectorAll("[data-dsk]").forEach(x=>x.onclick=(ev)=>{ ev.stopPropagation(); scrDelete(x.dataset.dsk, x.dataset.dlink); });
  document.querySelectorAll(".myadd").forEach(b=>b.onclick=(ev)=>{ ev.stopPropagation(); const cur = (document.getElementById("ed"+b.dataset.add)||{}).value || ""; const v=prompt("Шаблон замечания для «"+b.dataset.n+"» (сохранится у тебя на всех устройствах):", cur.trim().split("\n").pop().slice(0,300)); if(v && v.trim()){ addPhrase(b.dataset.code, v.trim()); render(); } });
  document.querySelectorAll(".rbtn[data-rop]").forEach(b=>b.onclick=(ev)=>{
    ev.stopPropagation();
    const x = state.lastView[b.dataset.rop]; if (!x) return;
    const ov = document.getElementById("opmodal");
    // D8: модалка держит САМУ строку и её ключ на момент открытия (а не индекс на экране)
    opTarget = { r: x.r, keys: rowKeyParams(x.r), rk: rk(x.r) };
    document.getElementById("o-who").textContent = (x.r.opName||x.r.opNick||"—")+" · "+clabel(x.r.city)+(x.r.week?" · "+x.r.week:"");
    document.getElementById("o-nick").value = x.r.opNick||"";
    document.getElementById("o-opname").value = x.r.opName||"";
    document.getElementById("o-model").value = x.r.model||"";
    document.getElementById("o-msg").textContent = "";
    openModal("opmodal");
  });
  document.querySelectorAll(".rbtn-del").forEach(b=>b.onclick=async (ev)=>{
    ev.stopPropagation();
    const x = state.lastView[b.dataset.rdel]; if (!x) return;
    if (!rowEditable(x.r)){ toast("Удалять можно только в открытой неделе", true); return; }
    if (!confirm("Удалить мониторинг "+(x.r.opName||x.r.opNick||"—")+" / "+(x.r.model||"—")+" ("+clabel(x.r.city)+", неделя "+(x.r.week||"—")+", строка "+x.r._row+")? Действие необратимо.")) return;
    try {
      const res = await wp(Object.assign({ action:"delrow" }, rowKeyParams(x.r)));
      if (res.error) throw new Error(res.error);
      toast("✔ Мониторинг удалён");
      setTimeout(load, 600);
    } catch(e){ toast("Ошибка: " + e.message + " — мониторинг мог быть уже удалён, обновляю данные", true); setTimeout(load, 500); }
  });
  document.querySelectorAll("[data-allok]").forEach(b=>b.onclick=(ev)=>{
    ev.stopPropagation();
    const key = b.dataset.allok;
    const tas = CATS.map((n,j)=>document.getElementById("ed"+key+"_"+j)).filter(Boolean);
    const nBadTxt = tas.filter(ta=>isDev(catState(ta.value))).length;
    if (nBadTxt && !confirm("В " + nBadTxt + " " + ovPl(nBadTxt, "категории", "категориях", "категориях") + " стоит «замечание» или «плохо». Заменить их на «всё хорошо»? (Ctrl+Z в поле вернёт текст)")) return;
    tas.forEach(ta=>{ if (ta.value === "✅ всё хорошо") return; const j=+ta.id.slice(ta.id.lastIndexOf("_")+1),row=state.lastView[key] && state.lastView[key].r;
      if(row && isNskRow(row) && j===3){const p=botsParse(ta.value);ta.value=botsJoin("✅ всё хорошо",p.bots);}
      else if(row && isNskRow(row) && j===NSK_GOALS){const p=goalsParse(ta.value);ta.value=goalsJoin("✅ всё хорошо",p.goals);}
      else ta.value=row && isNskRow(row) && NSK_CHOICES[j] ? nskChoiceApply(ta.value,j,"ok") : "✅ всё хорошо"; ta.dispatchEvent(new Event("input", {bubbles:true})); }); // как кнопки ✓ у категорий: черновик, история, оценка
    toast("Все 9 категорий — «всё хорошо». Не забудь «Сохранить в таблицу»");
  });
  document.querySelectorAll("[data-oxt]").forEach(b=>b.onclick=(ev)=>{ // «+ Комментарий», «+ Ссылки»: поле в DOM всегда (черновик, Ctrl+Z), кнопка только показывает его
    ev.stopPropagation();
    const f = document.querySelector(`[data-oxf="${b.dataset.oxt}"]`); if (!f) return;
    const on = !f.classList.contains("on"); f.classList.toggle("on", on); b.classList.toggle("on", on); b.setAttribute("aria-expanded", on ? "true" : "false");
    (state.ovX = state.ovX || {})[b.dataset.oxt] = on;
    if (on){ const ta = f.querySelector("textarea"); if (ta) focusEnd(ta); }
  });
  const mb = document.getElementById("morebtn");
  if (mb) mb.onclick = ()=>{ state.page++; render(); };

  document.querySelectorAll("tr.r").forEach(tr=>tr.onclick=()=>{
    let d = document.querySelector(`tr.detail[data-d="${tr.dataset.i}"]`);
    if (d.classList.contains("open") && rowDirty(tr.dataset.i) && !confirm("Есть несохранённые правки (они сохранены в черновик и не пропадут). Закрыть?")) return;
    d.classList.toggle("open");
    if(d.classList.contains("open") && d.dataset.ready!=="1"){render();d=document.querySelector(`tr.detail[data-d="${tr.dataset.i}"]`);if(!d)return;}
    else if(!d.classList.contains("open")){render();return;}
    if (d.classList.contains("open")){ d.classList.add("fresh"); setTimeout(()=>d.classList.remove("fresh"), 900); } // v7.3: категории появляются по очереди — только при раскрытии, не при автообновлении
    if (d.classList.contains("open")) setTimeout(ensureThumbs, 60); // скрины карточки — по раскрытию
    if (d.classList.contains("open")){ const xr = state.lastView[tr.dataset.i]; if (xr) recentPush(xr.r); } // v6.6: недавние карточки
    // v6: карточка прошлой недели пришла облегчённой — догружаем полный текст и перерисовываем
    if (d.classList.contains("open")){ const xl = state.lastView[tr.dataset.i]; if (xl && xl.r && xl.r._lite){ ensureRowFull(xl.r).then(()=>softRender()).catch(e=>toast("Полный текст не загрузился: " + e.message, true)); } }
    if (d.classList.contains("open")){
      // п.12: черновик прошлого сеанса — спрашиваем, восстановить ли его
      const x0 = state.lastView[tr.dataset.i];
      const dr = x0 ? getDraft(x0.r) : null;
      if (dr && dr.ts && !dr.__asked){
        dr.__asked = 1;
        const legacyNote = dr.__legacy ? "\n\nВнимание: черновик сохранён до обновления сайта и привязан только к номеру строки — проверь, что он про ЭТУ команду (" + (x0.r.opName||x0.r.opNick||"—") + " / " + (x0.r.model||"—") + ")." : "";
        if (confirm("Есть черновик этой проверки от " + draftTime(dr) + " — восстановить его?" + legacyNote)){
          setDraft(x0.r, dr); // оставляем
        } else {
          clearDraft(x0.r); // сбрасываем поля на значения из таблицы
          for (let j=0;j<9;j++){ const el = document.getElementById("ed"+tr.dataset.i+"_"+j); if (el) el.value = x0.r.cats[j]||""; }
          goalsFill(tr.dataset.i);
          botsFill(tr.dataset.i);
          const c = document.getElementById("ed"+tr.dataset.i+"_comment"); if (c) c.value = x0.r.obs||"";
          const rc = document.getElementById("ed"+tr.dataset.i+"_reco"); if (rc){ rc.value = x0.r.reco||""; advFill(tr.dataset.i); }
          const lk = document.getElementById("lk"+tr.dataset.i); if (lk) lk.value = x0.r.linksTxt||"";
          const sc = document.getElementById("ed"+tr.dataset.i+"_score"); if (sc) sc.value = x0.r.scoreM||"";
          const vd = document.getElementById("ed"+tr.dataset.i+"_verdict"); if (vd) vd.value = x0.r.verdictM||"";
        }
      }
      d.scrollIntoView({behavior:"smooth", block:"nearest"});
    }
  });
  document.querySelectorAll("a.rlink").forEach(a=>a.onclick=(ev)=>ev.stopPropagation()); // клик по ссылке не открывает/не закрывает редактор
  document.querySelectorAll(".qbtn").forEach(b=>{
    if (b.dataset.upl) return; // кнопке фото нужен СВОЙ обработчик: раньше этот блок перезаписывал его — кнопки «не работали»
    b.onclick=(ev)=>{
      ev.stopPropagation();
      const ta = document.getElementById(b.dataset.ta); if (!ta) return;
      ta.value = segApply(ta, b);
      ta.dispatchEvent(new Event("input", {bubbles:true})); // ✅/⚠️/❌/⌫ тоже в истории Ctrl+Z и в черновике
      fxPop(b);
      if (b.dataset.mk) focusEnd(ta);
    };
  });
  document.querySelectorAll(".qchip").forEach(b=>{ if (b.classList.contains("myadd")) return; b.onclick=(ev)=>{ // «＋ своя» — свой обработчик выше (раньше этот его затирал — кнопка не работала)
    ev.stopPropagation();
    const ta = document.getElementById(b.dataset.ta); if (!ta) return;
    ta.value = chipApply(ta.value, b.dataset.p, b.dataset.lv || "");
    ta.dispatchEvent(new Event("input", {bubbles:true}));
  }; });

  document.querySelectorAll(".detail textarea, .detail input, .detail select").forEach(el=>{
    el.oninput = el.onchange = function(){
      const det = this.closest("tr.detail");
      if (!det) return;
      const x = state.lastView[det.dataset.d]; if (!x) return;
      const d = getDraft(x.r) || {};
      CATS.forEach((n,j)=>{ const ta = document.getElementById("ed"+det.dataset.d+"_"+j); if (ta) d["f"+j] = ta.value; });
      const c = document.getElementById("ed"+det.dataset.d+"_comment"); if (c) d.comment = c.value;
      const rc = document.getElementById("ed"+det.dataset.d+"_reco"); if (rc) d.reco = rc.value;
      const lk = document.getElementById("lk"+det.dataset.d); if (lk) d.lk = lk.value;
      const sc = document.getElementById("ed"+det.dataset.d+"_score"); if (sc) d.score = sc.value;
      const vd = document.getElementById("ed"+det.dataset.d+"_verdict"); if (vd) d.verdict = vd.value;
      const lv = document.getElementById("live"+det.dataset.d);
      if (lv){
        const vals = [];
        for (let j=0;j<9;j++){ const ta=document.getElementById("ed"+det.dataset.d+"_"+j); vals.push(ta?ta.value:""); }
        lv.textContent = liveEval(vals);
        const ovb = document.getElementById("ovsc"+det.dataset.d); // v7: крупная оценка справа — живьём
        if (ovb){ const sc0 = document.getElementById("ed"+det.dataset.d+"_score"), vd0 = document.getElementById("ed"+det.dataset.d+"_verdict"); const was = (ovb.querySelector(".ov-big b")||{}).textContent; ovb.innerHTML = ovScore(vals, sc0 ? sc0.value : "", vd0 ? vd0.value : "", null, catsOf(x.r)); const nb = ovb.querySelector(".ov-big b"); if (nb && was !== undefined && was !== nb.textContent) fxClass(nb, "bump", 500); }
        const ods = document.getElementById("ovds"+det.dataset.d); if (ods) ods.textContent = "Сохраняется автоматически…";
        const odd = document.getElementById("ovdd"+det.dataset.d); if (odd) odd.className = "w";
      }
      setDraft(x.r, d);
      if(rowEditable(x.r) && !x.r._lite) saveRow(x,det.dataset.d,true);
    };
  });
  view.forEach((x)=>{
    const key = x.id;
    if (!rowEditable(x.r)) return; // строки только для просмотра — без кнопок правки
    const btn = document.getElementById("sv"+key);
    if (btn) btn.onclick = ()=>saveRow(x, key);
    const rt = document.getElementById("retry"+key);
    if (rt) rt.onclick = (ev)=>{
      ev.stopPropagation();
      const f = state.failedSaves[rk(x.r)]; if (!f) return;
      if (f.code === "SAVE_CONFLICT") { reviewConflict(x,key); return; }
      delete state.failedSaves[rk(x.r)];
      toast("Повторяю отправку…");
      queueRowSave(x, key, Object.entries(f.fields).map(c=>[c[0], c[1], (f.expected || {})[c[0]]]));
    };
    // U1: ИИ-ответ рисуется через aiShow(key, …): после await элементы ищутся ЗАНОВО по стабильному key,
    // а сам блок переживает перерисовку (state.aiBox). Ничего не сохраняется без «принять»/«заменить».
    const edVal = id => { const el = document.getElementById(id); return el ? el.value.trim() : ""; };
    const aisc = document.getElementById("aiscr"+key);
    if (aisc) aisc.onclick = ()=>aiScreenDraft(key, x);
    const aiv = document.getElementById("aiv"+key);
    if (aiv) aiv.onclick = async ()=>{
      aiMsg(key, "🤖 ИИ думает… (до минуты)");
      try {
        let text = catsOf(x.r).map((n,j)=>{ const v = edVal("ed"+key+"_"+j); return v ? n+": "+v : ""; }).filter(Boolean).join("; ").slice(0, 6000);
        const comV = edVal("ed"+key+"_comment"); if (comV) text += "; доп: " + comV.slice(0,500);
        const res = await aiAsk("verdict", { text: text, ckey: skey(x.r) + "|" + strHash(text) });
        if (res.error) throw new Error(res.error);
        aiShow(key, box=>{
          box.innerHTML = "🤖 <b>"+esc(res.verdict)+"</b> — "+esc(res.why)+" <button class=\"abtn2\" id=\"aiok"+key+"\">✅ принять</button> <button class=\"abtn2\" id=\"aino"+key+"\">✕</button>";
          document.getElementById("aiok"+key).onclick = ()=>{
            const sel = document.getElementById("ed"+key+"_verdict");
            if (sel && ["норма","замечание","критично"].includes(res.verdict)){ sel.value = res.verdict; sel.dispatchEvent(new Event("change", {bubbles:true})); } // красится только после «Сохранить»
            aiMsg(key, "🤖 принято: " + res.verdict + " — не забудь «Сохранить в таблицу»");
          };
          document.getElementById("aino"+key).onclick = ()=>aiHide(key);
        });
      } catch(e){ aiMsg(key, "🤖 " + e.message); }
    };
    const aich = document.getElementById("aich"+key);
    if (aich) aich.onclick = async ()=>{
      aiMsg(key, "🤖 ИИ думает… (до минуты)");
      try {
        const crit = catsOf(x.r).map((n,j)=>{ const v = edVal("ed"+key+"_"+j), cs = v ? catState(v) : null; return isDev(cs) ? n + (cs==="bad" ? " (плохо)" : " (замечание)") + ": " + markBody(v) : ""; }).filter(Boolean).join("; ").slice(0, 6000);
        if (!crit){ aiMsg(key, "🤖 критичных пунктов в этой проверке нет"); return; }
        const res = await aiAsk("chekdraft", { text: crit, ckey: skey(x.r) + "|" + strHash(crit) });
        if (res.error) throw new Error(res.error);
        // подтверждение перед записью: показываем, ЧТО будет заменено (старый план не затирается молча)
        const ckey = x.r.city+"|"+(x.r.producer||"");
        aiShow(key, box=>{
          const curPlan = (state.checks||{})[ckey] || "";
          box.innerHTML = "<div style=\"white-space:pre-wrap\">" + esc(res.text) + "</div>"
            + "<div style=\"margin-top:8px;padding:8px 10px;background:var(--panel);border:1px solid var(--line);border-radius:8px;white-space:pre-wrap;font-size:12px;color:var(--dim)\"><b style=\"color:var(--warn)\">Будет заменён текущий «Чек»</b> команды «"+esc(clabel(x.r.city)+" | "+(x.r.producer||"—"))+"»: " + (curPlan ? esc(curPlan) : "<i>сейчас пусто — просто запишется</i>") + "</div>"
            + "<div style=\"margin-top:8px\"><button class=\"abtn2\" id=\"aisv"+key+"\">💾 заменить на черновик</button> <button class=\"abtn2\" id=\"aicn"+key+"\">отмена — оставить старый</button></div>";
          document.getElementById("aisv"+key).onclick = async (ev)=>{
            ev.target.disabled = true;
            try {
              const sp = await wp({ action:"setplan", sheet:"Чек", bkey: ckey, plan: res.text });
              if (sp.error) throw new Error(sp.error);
              state.checks[ckey] = res.text;
              aiMsg(key, "✔ Черновик записан в «Чек»");
              toast("✔ Черновик ИИ записан в «Чек»");
            } catch(e){ ev.target.disabled = false; toast("Ошибка: "+e.message, true); }
          };
          document.getElementById("aicn"+key).onclick = ()=>aiMsg(key, "Отменено — старый «Чек» не тронут");
        });
      } catch(e){ aiMsg(key, "🤖 " + e.message); }
    };
    // — 🤖 полный разбор (п.13) —
    const aifull = document.getElementById("aifull"+key);
    if (aifull) aifull.onclick = async ()=>{
      aiMsg(key, "🤖 ИИ думает… (до минуты)");
      try {
        const parts = [];
        catsOf(x.r).forEach((n,j)=>{ const v = edVal("ed"+key+"_"+j); if (v) parts.push(n+": "+v); });
        const oldCom = edVal("ed"+key+"_comment");
        if (oldCom) parts.push("Общий комментарий: " + oldCom);
        const recV = edVal("ed"+key+"_reco"); if (recV) parts.push("Рекомендации: " + recV);
        const text = parts.join("\n").slice(0, 8000);
        const res = await aiAsk("fullaudit", { text: text, ckey: skey(x.r) + "|" + strHash(text) });
        if (res.error) throw new Error(res.error);
        aiShow(key, box=>{
          const list = (res.errors||[]).map(e2=>`<div class="drow"><b>❌ ${esc(e2.category||"—")}</b><span>«${esc(e2.quote||"")}» — ${esc(e2.why||"")}<br><span style="color:var(--ok)">исправить: ${esc(e2.fix||"")}</span></span></div>`).join("") || '<div class="empty">Ошибок не нашёл</div>';
          const newCom = res.general_comment || "";
          const newComHtml = "<div class=\"drow\"><b>✍️ переписанный комментарий</b><span style=\"white-space:pre-wrap\">" + esc(newCom || "(менять нечего)") + "</span></div>";
          const oldHtml = "<div class=\"drow\"><b>текущий комментарий</b><span style=\"white-space:pre-wrap;color:var(--dim)\">" + esc(oldCom || "(пусто)") + "</span></div>";
          box.innerHTML = "<b>🤖 нашёл ошибок: " + (res.errors||[]).length + "</b>" + list + oldHtml + newComHtml +
            (newCom ? '<button class=\"abtn2\" id=\"aiokc'+key+'\">✅ принять в комментарий</button> <button class=\"abtn2\" id=\"ainoc'+key+'\">отмена</button>' : '');
          const okc = document.getElementById("aiokc"+key);
          if (okc) okc.onclick = ()=>{ const com = document.getElementById("ed"+key+"_comment"); if (com){ com.value = newCom; com.dispatchEvent(new Event("input", {bubbles:true})); } aiMsg(key, "🤖 принято — не забудь «Сохранить в таблицу»"); };
          const noc = document.getElementById("ainoc"+key);
          if (noc) noc.onclick = ()=>aiMsg(key, "Отменено — комментарий не тронут");
        });
      } catch(e){ aiMsg(key, "🤖 " + e.message); }
    };
    // — 🤖 сравнить с прошлой неделей (п.14) —
    const aicmp = document.getElementById("aicmp"+key);
    if (aicmp) aicmp.onclick = async ()=>{
      aiMsg(key, "🤖 ИИ думает… (до минуты)");
      try {
        if (!state.fullLoaded){ aiMsg(key, "грузим историю недель…"); await ensureFull(); }
        const cur = x.r;
        // C: «прошлая» — только неделя РАНЬШЕ текущей строки (не будущая)
        const cand = state.rows.filter(r=>r.city===cur.city && (r.opNick||"")===(cur.opNick||"") && (r.model||"")===(cur.model||"") && r.week!==cur.week && weekKey(r) < weekKey(cur));
        const prev = cand.sort((a,b)=>weekKey(b)-weekKey(a))[0];
        if (!prev){ aiMsg(key, "прошлой недели у этой команды нет — сравнивать не с чем"); return; }
        if (prev._lite) await ensureRowFull(prev); // v6: для сравнения нужен полный текст прошлой недели
        const dump = r => catsOf(r).map((n,j)=>{ const v=(r.cats[j]||"").trim(); return v ? n+": "+v : ""; }).filter(Boolean).join("; ") + (r.obs?" | комментарий: "+r.obs:"");
        const text = ("ПРОШЛАЯ НЕДЕЛЯ (" + prev.week + "): " + dump(prev) + "\nЭТА НЕДЕЛЯ (" + cur.week + "): " + dump(cur)).slice(0, 8000);
        const res = await aiAsk("teamdelta", { text: text, ckey: skey(cur) + "|" + prev.week + "|" + strHash(text) });
        if (res.error) throw new Error(res.error);
        if (res.missing){ aiMsg(key, "прошлой недели нет — сравнивать не с чем"); return; }
        const sec = (t, arr) => arr.length ? `<div class="drow"><b>${t}</b><span>${arr.map(z=>"• "+esc(z)).join("<br>")}</span></div>` : "";
        aiShow(key, box=>{
          box.innerHTML = "<b>🤖 " + esc(cur.week) + " против " + esc(prev.week) + "</b>" +
            sec("🟢 стало лучше", res.better) + sec("🔴 стало хуже", res.worse) + sec("⚪ без изменений", res.same) +
            '<div style="color:var(--faint);font-size:11px;margin-top:6px">только по данным, ничего не придумано</div>';
        });
      } catch(e){ aiMsg(key, "🤖 " + e.message); }
    };
    // — 💬 совет оператору (п.15): показать + копировать, ничего не отправляет —
    const aiodv = document.getElementById("aiodv"+key);
    if (aiodv) aiodv.onclick = async ()=>{
      aiMsg(key, "🤖 ИИ думает… (до минуты)");
      try {
        // C: совет — по тому, что сейчас в редакторе (включая ещё не сохранённое)
        const crit = catsOf(x.r).map((n,j)=>{ const el = document.getElementById("ed"+key+"_"+j); const v = String(el ? el.value : (x.r.cats[j]||"")).trim(), cs = v ? catState(v) : null; return isDev(cs) ? n + (cs==="bad" ? " (плохо)" : " (замечание)") + ": " + markBody(v) : ""; }).filter(Boolean).join("; ").slice(0, 4000);
        if (!crit){ aiMsg(key, "🤖 замечаний по категориям нет — совета не нужно"); return; }
        const res = await aiAsk("opadvice", { text: crit, ckey: skey(x.r) + "|" + strHash(crit) });
        if (res.error) throw new Error(res.error);
        aiShow(key, box=>{
          box.innerHTML = "<b>💬 советы оператору</b><ol style=\"margin:6px 0 0 18px\">" + res.tips.map(t=>"<li>"+esc(t)+"</li>").join("") + "</ol>" +
            '<button class=\"abtn2\" id=\"odvcp'+key+'\">📋 скопировать</button> <span style=\"color:var(--faint);font-size:11px\">ничего не отправляется</span>';
          document.getElementById("odvcp"+key).onclick = ()=>{
            const txt = res.tips.map((t,i)=>(i+1)+". "+t).join("\n");
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(()=>toast("📋 Скопировано")).catch(()=>{});
            else prompt("Скопируй:", txt);
          };
        });
      } catch(e){ aiMsg(key, "🤖 " + e.message); }
    };
    // — 🧐 тон комментария (п.16) —
    const aitone = document.getElementById("aitone"+key);
    if (aitone) aitone.onclick = async ()=>{
      const oldCom = edVal("ed"+key+"_comment");
      if (!oldCom){ aiMsg(key, "🧐 общий комментарий пуст — проверять тон нечего"); return; }
      aiMsg(key, "🤖 ИИ думает… (до минуты)");
      try {
        const catsTxt = catsOf(x.r).map((n,j)=>{ const el = document.getElementById("ed"+key+"_"+j); const v = String(el ? el.value : (x.r.cats[j]||"")).trim(); return v ? n+" — "+v : ""; }).filter(Boolean).join("; ").slice(0,3000);
        const text = ("КОММЕНТАРИЙ: " + oldCom + "\nКАТЕГОРИИ: " + catsTxt).slice(0, 8000);
        const res = await aiAsk("tonecheck", { text: text, ckey: skey(x.r) + "|" + strHash(text) });
        if (res.error) throw new Error(res.error);
        aiShow(key, box=>{
          const list = (res.issues||[]).map(i2=>`<div class="drow"><b>⚠ ${esc(i2.quote||"")}</b><span>${esc(i2.why||"")}<br><span style="color:var(--ok)">вариант: ${esc(i2.suggestion||"")}</span></span></div>`).join("") || '<div class="empty">Тон в порядке — проблем не нашёл</div>';
          const rw = res.rewritten || "";
          box.innerHTML = "<b>🧐 тон комментария</b>" + list +
            (rw ? '<div class="drow"><b>✍️ переписанный целиком</b><span style="white-space:pre-wrap">' + esc(rw) + '</span></div><button class="abtn2" id="toneok'+key+'">✅ принять в комментарий</button> <button class="abtn2" id="toneno'+key+'">отмена</button>' : '');
          const tok = document.getElementById("toneok"+key);
          if (tok) tok.onclick = ()=>{ const com = document.getElementById("ed"+key+"_comment"); if (com && rw){ com.value = rw; com.dispatchEvent(new Event("input", {bubbles:true})); } aiMsg(key, "🧐 принято — не забудь «Сохранить в таблицу»"); };
          const tno = document.getElementById("toneno"+key);
          if (tno) tno.onclick = ()=>aiMsg(key, "Отменено — комментарий не тронут");
        });
      } catch(e){ aiMsg(key, "🤖 " + e.message); }
    };
    // — 📌 поручить продюсеру (п.11) —
    const tsk = document.getElementById("tsk"+key);
    if (tsk) tsk.onclick = ()=>{
      document.getElementById("tk-team").textContent = (x.r.opName||x.r.opNick||"—") + " / " + (x.r.model||"—") + " · " + clabel(x.r.city);
      document.getElementById("tk-text").value = "";
      document.getElementById("tk-msg").textContent = "";
      document.getElementById("tk-text").dataset.sheet = x.r._sheet;
      document.getElementById("tk-text").dataset.nick = x.r.opNick || "";
      document.getElementById("tk-text").dataset.model = x.r.model || "";
      document.getElementById("tk-text").dataset.producer = x.r.producer || "";
      const lt = (state.tasks||[]).filter(t=>t.key===skey(x.r));
      document.getElementById("tk-list").innerHTML = lt.length ? lt.map(t=>`<div class="drow"><b>${t.status==="сделана"?"✅":"📌"} ${esc(t.when||"")} · от ${esc(t.from||"—")}</b><span class="utext">${esc(t.text)}${t.status==="сделана"?" <button class=\"qbtn tk-reopen\" data-row=\""+t.row+"\" data-tkey=\""+esc(t.key)+"\" title=\"вернуть в работу\">вернуть в работу</button>":""}</span></div>`).join("") : "";
      document.querySelectorAll(".tk-reopen").forEach(b2=>b2.onclick=async (ev)=>{
        ev.stopPropagation();
        try { const r2 = await wp({ action:"taskreopen", row: b2.dataset.row, tkey: b2.dataset.tkey }); if (r2.error) throw new Error(r2.error); toast("↩ Вернул в работу"); setTimeout(load, 600); } catch(e2){ toast("Ошибка: "+e2.message, true); }
      });
      openModal("taskmodal");
    };
    const tc = document.getElementById("tc"+key);
    if (tc) tc.onclick = async ()=>{
      try {
        const res = await wp(Object.assign({ action:"touch" }, rowKeyParams(x.r)));
        if (res.error) throw new Error(res.error);
        x.r.updated = res.stamp || x.r.updated;
        toast("✔ Отмечено проверенной сегодня");
        render();
      } catch(e){ toast("Ошибка: " + e.message, true); }
    };
  });
}

function aimPlace(m){ // меню над кнопкой, а если сверху мало места — под ней; по горизонтали не вылезает за экран
  const pop = m.querySelector(".aimpop"); if (!pop) return;
  const bn = document.getElementById("v7bn"), bnH = bn && getComputedStyle(bn).display !== "none" ? bn.offsetHeight : 0, maxB = innerHeight - bnH; // v7.1: не под нижним меню телефона
  pop.style.maxHeight = (maxB - 16) + "px";
  const r = m.getBoundingClientRect(), h = pop.offsetHeight, w = pop.offsetWidth;
  const top = r.top - h - 6 >= 8 ? r.top - h - 6 : Math.min(r.bottom + 6, maxB - h - 8);
  pop.style.top = Math.max(8, top) + "px"; pop.style.left = Math.max(8, Math.min(r.left, innerWidth - w - 8)) + "px";
}
window.addEventListener("scroll", ()=>{ const o = document.querySelector(".aimenu.open"); if (o) aimPlace(o); }, true);
window.addEventListener("resize", ()=>{ const o = document.querySelector(".aimenu.open"); if (o) aimPlace(o); });
// v6.8: меню «🤖 ИИ» в карточке — открывается по кнопке, закрывается по выбору пункта, клику мимо и Esc
document.addEventListener("click", ev=>{
  const b = ev.target && ev.target.closest ? ev.target.closest("[data-aim]") : null;
  const opened = document.querySelector(".aimenu.open");
  if (b){ ev.stopPropagation(); const m = b.parentElement; const was = m.classList.contains("open"); if (opened) opened.classList.remove("open"); if (!was){ m.classList.add("open"); aimPlace(m); } return; }
  if (opened && (!ev.target.closest || !ev.target.closest(".aimpop") || ev.target.closest(".aimpop button"))) setTimeout(()=>opened.classList.remove("open"), 0);
}, true);
document.addEventListener("keydown", ev=>{ if (ev.key === "Escape"){ const o = document.querySelector(".aimenu.open"); if (o) o.classList.remove("open"); } });
// v6.9: результат пакетного ИИ-разбора — постоянная панель (переживает автообновление): что сделано по каждой команде
function aiBatchHtml(){
  const B = state.aiBatch; if (!B || B.city !== state.tab) return "";
  const head = B.running ? `<span class="v7spin"></span> ИИ разбирает ${esc(B.kind)}… <b>${B.i} из ${B.n}</b> <button class="gbtn" data-aibstop="1">⏹ остановить</button><span class="v7prog"><i style="width:${B.n ? Math.round(B.i / B.n * 100) : 0}%"></i></span>`
    : `🤖 готово (${esc(B.kind)}): черновиков <b>${B.items.filter(x=>!x.skip).length}</b>${B.skip ? ", пропущено " + B.skip : ""}${B.fail ? ", ошибок " + B.fail : ""}${B.msg ? " · " + esc(B.msg) : ""}`;
  const list = B.items.slice().reverse().map(x=>`<div class="aib-row${x.skip ? " skip" : ""}"><button class="gbtn" data-aibgo="${esc(x.go)}">открыть</button><b>${esc(x.name)}</b><span>${esc(x.note)}${x.detail ? `<small>${esc(x.detail)}</small>` : ""}</span></div>`).join("");
  return `<div class="aib">${head}${!B.running && B.items.some(x=>!x.skip) ? ` <button class="abtn2" data-aibdrafts="1">📝 показать все черновики в таблице</button>` : ""} <button class="gbtn" data-aibx="1" title="скрыть отчёт (черновики останутся)">✕</button>
    <div class="aib-hint">Ничего не записано в таблицу: это черновики. Открой команду, проверь и нажми «💾 Сохранить в таблицу».</div>
    ${list ? `<div class="aib-list">${list}</div>` : ""}</div>`;
}
document.addEventListener("click", ev=>{
  const t = ev.target && ev.target.closest ? ev.target.closest("[data-aibgo],[data-aibstop],[data-aibdrafts],[data-aibx]") : null; if (!t) return;
  ev.stopPropagation();
  if (t.dataset.aibgo) gotoRow(t.dataset.aibgo);
  else if (t.dataset.aibstop){ if (state.aiBatch) state.aiBatch.stop = true; t.disabled = true; t.textContent = "останавливаю…"; }
  else if (t.dataset.aibdrafts){ state.quick = "draft"; state.page = 1; render(); }
  else if (t.dataset.aibx){ if (state.aiBatch && !state.aiBatch.running) state.aiBatch = null; render(); }
});
let nskProfileRequest = null;
function refreshNskProfile(){
  if (nskProfileRequest) return nskProfileRequest;
  const user = AUTH.user, token = AUTH.token;
  nskProfileRequest = wp({action:"check"}).then(res=>{
    if (AUTH.user !== user || AUTH.token !== token) return false;
    AUTH.set(user, token, !!res.editor, res.cities || [], res.name || user);
    AUTH.prod = !!res.prod; AUTH.admin = !!res.admin;
    state.lastCheck = Date.now(); updateLoginBtn();
    if (!AUTH.nskCanEdit) {
      toast(res.serverVersion === CONFIG.VER ? "Право редактора отключено в настройках аккаунта" : "Сервер ещё не обновлён: установи новый Code.gs и разверни новую версию Apps Script",true);
      return false;
    }
    return true;
  }).catch(e=>{toast("Не удалось проверить права: " + e.message,true);return false;})
    .finally(()=>{nskProfileRequest=null;});
  return nskProfileRequest;
}
function switchTab(t){
  if (activeNavTab() !== t && anyDirty() && !confirm("Есть несохранённые правки. Правки уже в черновике и не пропадут. Переключить вкладку?")) return;
  if (nskAccount()) {
    if (t === NSK_EDITOR_TAB && !AUTH.nskCanEdit) {
      const from = activeNavTab(), token = AUTH.token;
      toast("Проверяю права редактора…");
      return refreshNskProfile().then(ok=>{ if(ok && AUTH.token === token && activeNavTab() === from) switchTab(NSK_EDITOR_TAB); });
    }
    state.nskEditing = t === NSK_EDITOR_TAB;
    if (state.nskEditing) t = "Новосибирск";
  }
  state.tab = t; state.page = 1;
  if (pmIsTab(t) && state.pm && state.pm.at && !state.pm.loading && Date.now() - state.pm.at > 3000) loadPM({ quiet: true }); // v6.6: при входе во вкладку — свежие записи
  if (HISTORY_TABS.includes(t) && !state.fullLoaded){ render(); ensureFull().then(render); return; }
  render();
}

// ---------- «Операторы» ----------
// v7: общие мелочи четырёх экранов
const O7_CVAR = { "Томск":"var(--art)", "Новосибирск":"var(--vv)", "Онлайн":"var(--dia)" };
const O7_CSHORT = { "Свет и кадр":"Свет/кадр", "Ловенс":"Ловенс", "Голы (5–10 подряд)":"Голы 5–10", "Боты":"Боты", "Блокнот и микрофон":"Блокнот", "Рабочие позиции (4+)":"Позиции", "Посты в ленту (2+/день)":"Посты", "Модель ↔ мемберы":"Модель↔м", "Оператор ↔ мемберы (1–5)":"Опер 1–5", "Работа с ОКО":"ОКО", "Общение с моделью":"Модель", "Общение с мемберами":"Мемберы", "Работа с голами":"Голы", "Шоу":"Шоу", "Плейлист":"Плейлист", "Работа с сайтами / раскладка":"Сайты", "Кадр / картинка":"Кадр", "Комната":"Комната" };
function o7Short(n){ return O7_CSHORT[n] || String(n||"").replace("Работа с ", "").replace("Общение с ", "").replace(" / раскладка", "").replace(" / картинка", ""); }
function o7CoChip(c, colored){ const n = coLbl(c); if (!n) return ""; const v = O7_CVAR[c] || "var(--faint)"; return colored ? `<span class="o7-co tx" style="color:${v}">${esc(n)}</span>` : `<span class="o7-co"><i style="background:${v}"></i>${esc(n)}</span>`; }
function o7ScVar(v){ if (v == null) return "var(--faint)"; const k = v / MAX_SCORE; return k >= 0.75 ? "var(--ok)" : k >= 0.375 ? "var(--warn)" : "var(--bad-t)"; }
function o7Fmt(n){ return (n == null || n === "") ? "—" : Number(n).toLocaleString("ru-RU"); }
function o7Wk(n, acc){ const a = n % 10, b = n % 100; return (a === 1 && b !== 11) ? (acc ? "неделю" : "неделя") : (a >= 2 && a <= 4 && (b < 12 || b > 14)) ? "недели" : "недель"; }
function o7Range(ws){ // «21-27.09», «05-11.10» → «21.09–11.10»
  if (!ws.length) return "";
  const m0 = String(ws[0]).match(/^(\d{1,2})(?:\.(\d{1,2}))?\s*[-–]\s*(\d{1,2})\.(\d{1,2})/), m1 = String(ws[ws.length-1]).match(/^(\d{1,2})(?:\.(\d{1,2}))?\s*[-–]\s*(\d{1,2})\.(\d{1,2})/);
  if (!m0 || !m1) return ws.length > 1 ? ws[0] + " … " + ws[ws.length-1] : ws[0];
  return m0[1] + "." + (m0[2] || m0[4]) + "–" + m1[3] + "." + m1[4];
}
const O7_IC_SEARCH = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4" style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round"/></svg>';
const O7_IC_OK = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12l5 5 9-10" style="fill:none;stroke:var(--ok);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/></svg>';
const O7_IC_BAD = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" style="fill:none;stroke:var(--bad-t);stroke-width:2.6;stroke-linecap:round"/></svg>';

// ---------- «Операторы» ----------
function renderOperators(...args){return loadFeature86('analytics',()=>renderOperators(...args));}

// ---------- «Расписание» — кто и когда на перепроверку ----------
const VMAP = {"норма":"ok","замечание":"warn","критично":"bad"};
function schedChip(x){
  const r = x.r, u = dueInfo(r);
  const lastTxt = u ? (u.days===0?"сегодня":u.days+" дн. назад") : "не проверялась";
  const oldCls = (u && u.days >= 14) ? " v-old" : "";
  const vd = x.s.verdict ? "v-"+(VMAP[x.s.verdict]||"none") : "v-none";
  return `<div class="schip click ${oldCls} ${vd}" data-goto="${esc(r._sheet)}|${r._row}" title="последняя проверка/правка: ${esc(fmtDay(r.updated)||"—")} — нажми, чтобы открыть правки">
    <div class="sc-top"><b>${esc(r.opName||r.opNick||"—")}</b> / ${esc(r.model||"—")}</div>
    <div class="sc-sub">${esc(r.producer||"—")} · ${esc(clabel(r.city))}</div>
    <div class="sc-sub">🕐 ${lastTxt}${x.s.verdict?" · "+esc(VLBL[x.s.verdict]||x.s.verdict):""}</div>
    ${AUTH.edit?`<button class="sbtn" data-sch-touch="${esc(r._sheet)}|${r._row}">✅ сегодня</button>`:""}
  </div>`;
}
function renderSchedule(){
  document.getElementById("pbar").innerHTML = "";
  // команда = город+опер+модель; берём строку с самой свежей датой «Обновлено»
  const map = {};
  state.rows.forEach(function(r){
    if (!(r.opName||r.opNick||r.model)) return;
    const key = teamKey(r);
    const prev = map[key];
    if (!prev){ map[key] = r; return; }
    const a = parseUpd(r.updated), b = parseUpd(prev.updated);
    if ((a && !b) || (a && b && a > b)) map[key] = r;
  });
  let teams = Object.values(map).map(r=>({r, s: rowStats(r)}));
  if (state.search){ const q = state.search.toLowerCase(); teams = teams.filter(x=>[x.r.producer,x.r.opName,x.r.opNick,x.r.model,x.r.obs].concat(x.r.cats).join(" ").toLowerCase().includes(q)); }
  if (state.schedCity) teams = teams.filter(x=>x.r.city===state.schedCity);
  if (state.schedV==="problems") teams = teams.filter(x=>x.s.verdict==="замечание"||x.s.verdict==="критично");
  else if (state.schedV==="bad") teams = teams.filter(x=>x.s.verdict==="критично");
  const citiesAvail = tabs().filter(c=>c!=="Обзор"&&c!=="Сводка"&&c!=="Расписание"&&c!=="Операторы"&&c!=="Сравнение");
  const today = new Date(); today.setHours(0,0,0,0);
  const overdue = [], later = [], never = [], buckets = {};
  teams.forEach(function(x){
    const d = parseUpd(x.r.updated);
    if (!d){ never.push(x); return; }
    d.setHours(0,0,0,0);
    const next = new Date(d.getTime() + recheckDays(x.r)*864e5);
    const off = Math.round((next - today)/864e5);
    if (off <= 0) overdue.push(x); // порог везде один: 7 дней после проверки = «к перепроверке»/«просрочено»
    else if (off <= 6){ (buckets[off] = buckets[off] || []).push(x); }
    else later.push(x);
  });
  const byAge = (a,b)=>{ const da = parseUpd(a.r.updated), db = parseUpd(b.r.updated); return (da?da.getTime():0) - (db?db.getTime():0); };
  overdue.sort(byAge); later.sort(byAge);
  Object.keys(buckets).forEach(k=>buckets[k].sort(byAge));
  const dn = ["вс","пн","вт","ср","чт","пт","сб"];
  const days = [];
  for (let i=0;i<7;i++){
    const d = new Date(today.getTime() + i*864e5);
    days.push({ i, label: dn[d.getDay()]+" "+String(d.getDate()).padStart(2,"0")+"."+String(d.getMonth()+1).padStart(2,"0") });
  }
  const colGroups = list => {
    if (!list.length) return "";
    const groups = [];
    list.forEach(x=>{ const p = x.r.producer || "—"; const g = groups.find(g=>g.p===p); if (g) g.items.push(x); else groups.push({p, items:[x]}); });
    return groups.map(g=>`<div class="sgrp"><b>${esc(g.p)}</b>${g.items.length>1&&AUTH.edit?`<button class="sbtn allday" data-grptouch="${g.items.map(x=>x.r._sheet+"|"+x.r._row).join(";")}" title="отметить все команды продюсера проверенными сегодня">✅ все</button>`:""}</div>${g.items.map(schedChip).join("")}`).join("");
  };
  const col = (title, list, cls, key) => `<div class="sday ${cls||""}"><h3>${title} <span class="cnt">${list.length||""}</span>${key&&list.length&&AUTH.edit?` <button class="sbtn allday" data-daytouch="${key}" title="отметить всех в колонке проверенными сегодня">✅ всё</button>`:""}</h3>${colGroups(list)}</div>`;
  document.getElementById("content").innerHTML = `
    <div class="card" style="margin-bottom:14px"><h2>Расписание проверок</h2>
      <div style="color:var(--faint);font-size:12px">команд всего: ${teams.length} · 🔴 просрочено: ${overdue.length} · ⚪ никогда не проверялись: ${never.length} · ✅ проверены сегодня: ${teams.filter(x=>{const u=dueInfo(x.r);return u&&u.days===0;}).length}</div>
      <div style="margin-top:10px">${[""].concat(citiesAvail).map(c=>`<button class="fchip ${state.schedCity===c?"on":""}" data-sc="${esc(c)}">${c===""?"Все компании":clabel(c)}</button>`).join("")}<span style="display:inline-block;width:14px"></span>${[["","все"],["problems","⚠ проблемные"],["bad","🔴 только критично"]].map(v=>`<button class="fchip ${state.schedV===v[0]?"on":""}" data-sv="${v[0]}">${v[1]}</button>`).join("")}</div>
      <div style="color:var(--faint);font-size:11.5px;margin-top:8px">нажми на команду — откроются её правки на вкладке компании</div>
      <button class="abtn2" id="plan-copy" style="margin-top:10px">📋 План на сегодня — скопировать</button>
    </div>
    <div class="schedwrap"><div class="schedrow">
      ${col("🔴 просрочено", overdue, "oday", "ov")}
      ${days.map(d=>col((d.i===0?"СЕГОДНЯ · ":"")+d.label, buckets[d.i]||[], d.i===0?"today":"", String(d.i))).join("")}
    </div></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px" class="twocol">
      <div class="card"><h2>⚪ Никогда не проверялись (${never.length})</h2>${never.length?never.map(schedChip).join(""):'<div class="empty">Все команды проверены 🎉</div>'}</div>
      <div class="card"><h2>🗓 Позже этой недели (${later.length})</h2>${later.length?later.map(schedChip).join(""):'<div class="empty">Нет команд</div>'}</div>
    </div>`;
  document.querySelectorAll("[data-sc]").forEach(b=>b.onclick=()=>{ state.schedCity = b.dataset.sc; renderSchedule(); });
  document.querySelectorAll("[data-sv]").forEach(b=>b.onclick=()=>{ state.schedV = b.dataset.sv; renderSchedule(); });
  const pc = document.getElementById("plan-copy");
  if (pc) pc.onclick = ()=>{
    const lines = [];
    const push = (title, list) => { if (list.length){ lines.push(title); list.forEach(x=>lines.push("• "+(x.r.producer||"—")+" — "+(x.r.opName||x.r.opNick||"—")+" / "+(x.r.model||"—")+" ["+x.r.city+"]")); } };
    push("🔴 ПРОСРОЧЕНО:", overdue);
    push("🟡 СЕГОДНЯ:", buckets[0]||[]);
    if (!lines.length){ toast("Сегодня проверок не запланировано 🎉", true); return; }
    const text = lines.join("\n");
    const showCopy = (t)=>{ prompt("Скопируй план:", t); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(()=>toast("📋 План скопирован — вставь в Discord")).catch(()=>showCopy(text));
    else showCopy(text);
  };
  document.querySelectorAll("[data-daytouch]").forEach(b=>b.onclick=async (ev)=>{
    ev.stopPropagation();
    if (!AUTH.edit){ toast("Отмечать может только редактор", true); return; }
    const key = b.dataset.daytouch;
    const list = key==="ov" ? overdue : (buckets[key]||[]);
    if (!list.length) return;
    if (!confirm("Отметить проверенными сегодня все команды из колонки ("+list.length+" шт)?")) return;
    let ok=0;
    for (const x of list){
      try {
        const res = await wp(Object.assign({ action:"touch" }, rowKeyParams(x.r)));
        if (!res.error){ ok++; if (res.stamp) x.r.updated = res.stamp; }
      } catch(e){}
    }
    toast(ok===list.length ? "✔ Отмечено: "+ok+" команд" : "Отмечено "+ok+" из "+list.length, ok!==list.length);
    renderSchedule();
  });
  document.querySelectorAll("[data-grptouch]").forEach(b=>b.onclick=async (ev)=>{
    ev.stopPropagation();
    const rows = b.dataset.grptouch.split(";").map(s=>s.split("|"));
    if (!confirm("Отметить проверенными сегодня все команды продюсера ("+rows.length+" шт)?")) return;
    let ok=0;
    for (const r of rows){
      try{
        const rr = state.rows.find(x=>x._sheet===r[0]&&String(x._row)===r[1]); if (!rr) continue;
        const res = await wp(Object.assign({ action:"touch" }, rowKeyParams(rr)));
        if (!res.error){ ok++; if (res.stamp) rr.updated = res.stamp; }
      }catch(e){}
    }
    toast(ok===rows.length?"✔ Отмечено: "+ok:"Отмечено "+ok+" из "+rows.length, ok!==rows.length);
    renderSchedule();
  });
  document.querySelectorAll(".schip[data-goto]").forEach(ch=>ch.onclick=(ev)=>{
    if (ev.target.closest("button")) return;
    gotoRow(ch.dataset.goto);
  });
  document.querySelectorAll("[data-sch-touch]").forEach(b=>b.onclick=async (ev)=>{
    ev.stopPropagation();
    const parts = b.dataset.schTouch.split("|");
    try {
      const r = state.rows.find(x=>x._sheet===parts[0] && String(x._row)===parts[1]);
      if (!r) throw new Error("строка не найдена — обнови данные");
      const res = await wp(Object.assign({ action:"touch" }, rowKeyParams(r)));
      if (res.error) throw new Error(res.error);
      if (res.stamp) r.updated = res.stamp;
      toast("✔ Отмечено проверенной сегодня — следующая перепроверка через " + recheckDays(r) + " " + ruPl(recheckDays(r), "день", "дня", "дней"));
      renderSchedule();
    } catch(e){ toast("Ошибка: " + e.message, true); }
  });
}

// ---------- выпадающий список недель ----------
// Обновление 4: состояние групп меню (открыта/закрыта) — localStorage
const RAIL_GROUPS_DEFAULT = { companies:true, producers:false, tools:true, weeks:false };
function railGroups(){
  let g = null; try{ g = JSON.parse(localStorage.getItem("rail_groups") || "null"); }catch(e){}
  return Object.assign({}, RAIL_GROUPS_DEFAULT, (g && typeof g === "object") ? g : {});
}
function railGroupToggle(key){
  const g = railGroups(); g[key] = !g[key];
  try{ localStorage.setItem("rail_groups", JSON.stringify(g)); }catch(e){}
}
function railPickWeek(w){
  closeRailFly(); closeWeekDrop(); pickWeek85(w);
}
function railPickProducer(p){
  if (state.tab !== "Обзор" && anyDirty() && !confirm("Есть несохранённые правки. Правки уже в черновике и не пропадут. Переключить вкладку?")) return;
  closeRailFly();
  state.tab = "Обзор"; state.producer = p; state.page = 1; state.quick = "";
  render();
}
function closeRailFly(){ const f = document.getElementById("railfly"); if (f) f.remove(); }
function openRailFly(head){
  const was = document.getElementById("railfly");
  const key = head.dataset.g;
  closeRailFly();
  if (was && was.dataset.g === key) return; // повторный клик — закрыть
  const body = head.parentElement.querySelector(".rgbody");
  if (!body) return;
  const r = head.getBoundingClientRect();
  const f = document.createElement("div");
  f.id = "railfly"; f.className = "rflyout"; f.dataset.g = key;
  f.innerHTML = `<div class="rfltitle">${esc(head.querySelector("span:nth-child(2)").textContent)}</div>` + body.innerHTML;
  document.body.appendChild(f);
  // AUDIT4 P2-7: всплывающий список не уходит за край экрана; на узком экране — под иконкой
  const fw = f.offsetWidth, fh = f.offsetHeight, W = window.innerWidth, Hh = window.innerHeight;
  let left = r.right + 8, top = r.top;
  if (W <= 820 || left + fw > W - 8){ left = r.left; top = r.bottom + 4; }
  left = Math.max(8, Math.min(left, W - fw - 8));
  top = Math.max(8, Math.min(top, Hh - fh - 8));
  f.style.left = left + "px"; f.style.top = top + "px";
  f.querySelectorAll("[draggable]").forEach(x=>x.removeAttribute("draggable"));
  bindRailItems(f);
}
function bindRailItems(root){
  root.querySelectorAll("[data-w]").forEach(b=>b.onclick=()=>railPickWeek(b.dataset.w));
  root.querySelectorAll("[data-prodgo]").forEach(b=>b.onclick=()=>railPickProducer(b.dataset.prodgo));
  root.querySelectorAll("[data-recent]").forEach(b=>b.onclick=()=>{ if (root.id === "railfly") closeRailFly(); recentOpen(b.dataset.recent); }); // v6.6
  if (root.id === "railfly") root.querySelectorAll(".tab[data-t]").forEach(b=>b.onclick=()=>{ closeRailFly(); switchTab(b.dataset.t); });
}
function bindRail(rail){
  if (!rail) return;
  rail.querySelectorAll(".rghead").forEach(h=>h.onclick=(ev)=>{
    ev.stopPropagation();
    if (railMiniOn()){ openRailFly(h); return; }
    railGroupToggle(h.dataset.g); render();
  });
  bindRailItems(rail);
}
document.addEventListener("click", e=>{
  if (!document.getElementById("railfly")) return;
  if (e.target.closest("#railfly") || e.target.closest(".rghead")) return;
  closeRailFly();
});
document.addEventListener("keydown", e=>{ if (e.key === "Escape") closeRailFly(); });
function closeWeekDrop(){ const e = document.getElementById("weekdrop"); if (e) e.remove(); }
function toggleWeekDrop(){
  const ex = document.getElementById("weekdrop");
  if (ex){ ex.remove(); return; }
  const btn = document.getElementById("weekdrop-btn");
  if (!btn) return;
  const wks = rememberWeeks();

  if (!wks.length) return;
  const tabs = document.getElementById("tabs");
  const tr = tabs.getBoundingClientRect(), br = btn.getBoundingClientRect();
  const div = document.createElement("div");
  div.id = "weekdrop"; div.className = "wdrop";
  div.style.top = (br.bottom - tr.top + 4) + "px";
  div.style.left = (br.left - tr.left) + "px";
  const wlab = w => w===state.week ? "on" : "";
  div.innerHTML = `<button class="witem ${wlab("all")}" data-w="all">все недели</button>`
    + `<button class="witem ${wlab("latest")}" data-w="latest">последняя неделя</button>`
    + `<button class="witem ${wlab("__month__")}" data-w="__month__">🗓 месяц</button>`
    + wks.map(w=>`<button class="witem ${wlab(w)}" data-w="${esc(w)}">${esc(w)}</button>`).join("");
  tabs.appendChild(div);
  div.querySelectorAll(".witem").forEach(b=>b.onclick=()=>{
    closeWeekDrop(); pickWeek85(b.dataset.w);
  });
}
document.addEventListener("click", e=>{
  const d = document.getElementById("weekdrop");
  if (!d) return;
  if (e.target.closest("#weekdrop") || e.target.closest("#weekdrop-btn")) return;
  closeWeekDrop();
});

// переход из «Расписания» к правкам конкретного мониторинга
function gotoRow(goto){
  const parts = goto.split("|");
  const r = state.rows.find(x=>x._sheet===parts[0] && String(x._row)===parts[1]);
  if (!r){ toast("Мониторинг не найден — обнови данные", true); return; }
  recentPush(r); // v6.6: переход из поиска, уведомлений и «недавних» — тоже в «Недавние»
  state.tab = r.city; state.week = r.week; state.search = ""; state.quick = ""; state.producer = "";
  if (AUTH.prod){ state.tab = prodTabName(); state.prodHomeTable = true; try { prodModeSet("overview"); } catch(e){} } // v7.1: у продюсера — таблица его команд, а не главная (иначе карточка не открывалась)
  state.page = 999;
  state.grpOpen[r.city+"|"+(r.producer||"—")] = true;
  render();
  // прыжок к строке: ждём завершения рендера (может занять больше 60мс)
  let jumpTries = 0;
  (function jump(){
    const hit = (state.lastViewList||[]).find(x=>x.r._sheet===r._sheet && String(x.r._row)===String(r._row));
    if (!hit){ if (++jumpTries < 20) setTimeout(jump, 60); return; }
    const idx = hit.id;
    const det = document.querySelector(`tr.detail[data-d="${idx}"]`);
    const rowTr = document.querySelector(`tr.r[data-i="${idx}"]`);
    if (det) det.classList.add("open");
    if (rowTr) rowTr.scrollIntoView({behavior:"smooth", block:"center"});
  })();
}

// ---------- «Сводка» (для смотрящего) ----------
function renderSummary(...args){return loadFeature86('analytics',()=>renderSummary(...args));}

// ---------- «Мои задачи» (п.11): прод видит свои, отмечает «сделано»; редактор возвращает в работу ----------
function renderMyTasks(){
  document.getElementById("pbar").innerHTML = "";
  const all = (state.tasks||[]).slice();
  const tms = s => { const d = parseUpd(s); return d ? d.getTime() : 0; }; // C: сортировка по дате, а не по строке «дд.мм»
  const prods = [...new Set(all.map(t=>t.producer).filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),"ru"));
  if (state.tkProd && !prods.includes(state.tkProd)) state.tkProd = "";
  const list = (AUTH.edit && state.tkProd) ? all.filter(t=>t.producer===state.tkProd) : all; // фильтр только отображения
  const open = list.filter(t=>t.status!=="сделана").sort((a,b)=>tms(b.when)-tms(a.when));
  const done = list.filter(t=>t.status==="сделана").sort((a,b)=>tms(b.done)-tms(a.done));
  const CO = { "Томск":"var(--art)", "Новосибирск":"var(--vv)", "Онлайн":"var(--dia)" };
  const cityOf = t => t.city || CITY_ORDER.find(c=>String(t.sheet||"").indexOf(c) >= 0) || "";
  const plural = (n,a,b,c) => { const m10 = n%10, m100 = n%100; return m10===1&&m100!==11 ? a : (m10>=2&&m10<=4&&(m100<10||m100>=20)) ? b : c; };
  const today0 = new Date(); today0.setHours(0,0,0,0);
  const lateOf = t => {
    if (t.status==="сделана" || t.orphan) return "";
    const d = parseUpd(t.when); if (!d) return "";
    d.setHours(0,0,0,0);
    const n = Math.round((today0 - d)/864e5);
    if (n < 1) return "";
    return `<span class="tk-chip${n>=3?" warn":""}">${n} ${plural(n,"день","дня","дней")} без ответа</span>`;
  };
  const rowOf = t => t.key && !t.orphan ? (state.rows||[]).find(r=>skey(r)===t.key) : null;
  const card = t => {
    const c = cityOf(t), isDone = t.status==="сделана", r = rowOf(t);
    return `<article class="tk-card">
      <div class="tk-meta">${AUTH.prod ? "" : `<i class="tk-sq" style="background:${CO[c]||"var(--faint)"}" title="${esc(clabel(c))}"></i><b>${esc(t.producer||"—")}</b>`}<span class="tk-team">${esc(t.nick||"—")} · ${esc(t.model||"—")}</span></div>
      <div class="tk-text">${esc(t.text)}</div>
      <div class="tk-from">от ${esc(t.from||"—")} · ${esc(fmtUpd(t.when)||t.when||"")}${isDone ? `<span class="tk-chip ok">сделано${t.done?" "+esc(fmtUpd(t.done)||t.done):""}</span>` : lateOf(t)}</div>
      ${t.orphan?`<div class="tk-orph" title="${esc(t.key||"")}">Команда не найдена в таблице (удалена или переименована) — продюсер эту задачу не видит</div>`:""}
      <div class="tk-btns">
        ${!isDone&&!t.orphan?`<button class="tk-b${AUTH.edit?"":" pri"} tk-done" data-row="${t.row}" data-tkey="${esc(t.key||"")}">Сделано</button>`:""}
        ${AUTH.edit&&isDone?`<button class="tk-b tk-re" data-row="${t.row}" data-tkey="${esc(t.key||"")}">Вернуть в работу</button>`:""}
        ${r?`<button class="tk-b tk-goto" data-goto="${esc(r._sheet+"|"+r._row)}">Открыть команду</button>`:""}
        ${AUTH.edit&&t.orphan?`<button class="tk-b bad tk-del" data-row="${t.row}" data-tkey="${esc(t.key||"")}" data-txt="${esc(String(t.text||"").slice(0,60))}">Удалить задачу</button>`:""}
      </div>
    </article>`;
  };
  const cols = AUTH.edit
    ? [[open, "В работе", "var(--warn)", "ждём продюсера", "Открытых задач нет"], [done, "Сделано", "var(--ok)", "отметил продюсер · можно вернуть в работу", "Пока пусто"]]
    : [[open, "Нужно сделать", "var(--warn)", "от смотрящего", "Открытых задач нет — всё сделано"], [done, "Сделано", "var(--ok)", "смотрящий увидит", "Пока пусто"]];
  document.getElementById("content").innerHTML = `
    <div class="tk-head"><h1>${AUTH.edit?"Задачи продюсерам":"Мои задачи"}</h1>
      <span class="tk-sub">${AUTH.edit?"ставятся из карточки команды — «Поручить продюсеру»":"что попросил смотрящий · отмечай «Сделано», когда исправишь"}</span>
      <div class="tk-sp"></div>
      ${AUTH.edit && prods.length ? `<select class="tk-prod" aria-label="Продюсер"><option value="">Все продюсеры</option>${prods.map(p=>`<option value="${esc(p)}"${state.tkProd===p?" selected":""}>${esc(p)}</option>`).join("")}</select>` : ""}
    </div>
    <div class="tk-board">${cols.map(c=>`<section class="tk-col">
      <div class="tk-ch"><i style="background:${c[2]}"></i><b>${c[1]}</b><span class="tk-n">${c[0].length}</span><span class="tk-hint">${c[3]}</span></div>
      ${c[0].length ? c[0].map(card).join("") : `<div class="tk-empty">${c[4]}</div>`}
    </section>`).join("")}</div>`;
  const sel = document.querySelector("#content .tk-prod");
  if (sel) sel.onchange = ()=>{ state.tkProd = sel.value; renderMyTasks(); };
  document.querySelectorAll(".tk-goto").forEach(b=>b.onclick=(ev)=>{ ev.stopPropagation(); gotoRow(b.dataset.goto); });
  document.querySelectorAll(".tk-done").forEach(b=>b.onclick=async (ev)=>{
    ev.stopPropagation();
    try { const r = await wp({ action:"taskdone", row: b.dataset.row, tkey: b.dataset.tkey }); if (r.error) throw new Error(r.error); toast("✅ Отмечено сделанным"); setTimeout(load, 500); }
    catch(e){ toast("Ошибка: "+e.message, true); }
  });
  document.querySelectorAll(".tk-del").forEach(b=>b.onclick=async (ev)=>{
    ev.stopPropagation();
    if (!confirm("Удалить задачу «" + b.dataset.txt + "»? Строка будет удалена из листа «Задачи», отменить нельзя.")) return;
    try { const r = await wp({ action:"taskdel", row: b.dataset.row, tkey: b.dataset.tkey }); if (r.error) throw new Error(r.error); toast("🗑 Задача удалена"); setTimeout(load, 500); }
    catch(e){ toast("Ошибка: "+e.message, true); }
  });
  document.querySelectorAll(".tk-re").forEach(b=>b.onclick=async (ev)=>{
    ev.stopPropagation();
    try { const r = await wp({ action:"taskreopen", row: b.dataset.row, tkey: b.dataset.tkey }); if (r.error) throw new Error(r.error); toast("↩ Вернул в работу"); setTimeout(load, 500); }
    catch(e){ toast("Ошибка: "+e.message, true); }
  });
}

// ---------- задача 5/3: «Расписание» — смены моделей (сервер только читает таблицы) ----------
function schedNorm(s){
  return String(s||"").toLowerCase().replace(/ё/g,"е")
    .replace(/(^|[^a-z])new(?=[^a-z]|$)/g, "$1")
    .replace(/\d+(\/\d+)?/g, " ")
    .replace(/[^a-zа-я\- ]/g, " ").replace(/\s+/g, " ").trim();
}
function ymdLocal(d){ return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0"); }
function ymdShift(ymd, n){ const p = ymd.split("-").map(Number); return ymdLocal(new Date(p[0], p[1]-1, p[2] + n)); }
const WD_RU = ["вс","пн","вт","ср","чт","пт","сб"];
// Обновление 5: ссылки на страницу модели берутся из колонки «Ссылки» (U → r.linksTxt) её строки мониторинга.
// Строки «Название = URL» или просто URL; только http/https; chaturbate — первой; дубли убираются.
const MODEL_SITES = [["chaturbate.com","CB"],["stripchat.com","SC"],["bongacams","BC"],["camsoda.com","CS"],["myfreecams.com","MFC"],["livejasmin.com","LJ"],["cam4.","C4"],["onlyfans.com","OF"],["flirt4free.com","F4F"],["xlovecam.com","XLC"]];
function safeHttpUrl(u){
  const s = String(u || "").trim();
  if (!/^https?:\/\//i.test(s)) return "";
  try { const x = new URL(s); return (x.protocol === "http:" || x.protocol === "https:") && x.hostname ? x.href : ""; } catch(e){ return ""; }
}
function shiftModelLinks(teams){
  const seen = {}, out = [];
  (teams || []).forEach(r => String((r && r.linksTxt) || "").split("\n").forEach(line => {
    const m = line.match(/^(.+?)\s*=\s*(\S+)\s*$/);
    const url = safeHttpUrl(m ? m[2] : line.trim());
    if (!url || seen[url]) return;
    seen[url] = 1;
    let host = ""; try { host = new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch(e){}
    const site = MODEL_SITES.find(p => host.indexOf(p[0]) >= 0);
    out.push({ url: url, host: host, label: site ? site[1] : host.split(".")[0].slice(0, 6).toUpperCase(), title: m ? m[1].trim() : host, cb: host.indexOf("chaturbate.com") >= 0 });
  }));
  return out.sort((a, b) => (b.cb ? 1 : 0) - (a.cb ? 1 : 0));
}
function shiftTeamsIndex(company){
  const lw = latestWeekName(), idx = {};
  realRows().forEach(r=>{
    if (r.city !== company || (lw && r.week !== lw)) return;
    const k = schedNorm(r.model); if (!k) return;
    (idx[k] = idx[k] || []).push(r);
  });
  return idx;
}
// день/ночь: из part сервера, иначе эвристика по часу начала (онлайн)
function shiftPartOf(s){
  if (s.part === "DAY" || s.part === "NIGHT") return s.part;
  const m = String(s.time||"").match(/(\d{1,2})[:.](\d{2})/);
  if (!m) return "";
  const h = +m[1];
  return (h >= 5 && h < 17) ? "DAY" : "NIGHT";
}
function shiftMatched(s, idx){ return (s.names||[]).some(n => (idx[schedNorm(n)]||[]).length); }
function shiftOrphan(s, idx){ return !shiftMatched(s, idx); }
// сводка дня: запланировано = все смены (вкл. зачёркнутые), на смене = не зачёркнутые, отписок = зачёркнутые,
// без мониторинга = вышедшие на смену без своей строки в дашборде (orphanFn подменяется в тестах)
function shiftDaySummary(shifts, idx, orphanFn){
  const all = Array.isArray(shifts) ? shifts : [];
  const of = orphanFn || shiftOrphan;
  const act = all.filter(s=>s && !s.struck), off = all.filter(s=>s && s.struck);
  return { planned: act.length + off.length, act: act.length, off: off.length, orphan: act.filter(s=>of(s, idx)).length };
}
function shiftSummaryText(st, sep){
  sep = sep || " · ";
  return "запланировано " + st.planned + sep + "на смене " + st.act + sep + "отписок " + st.off + sep + "без мониторинга " + st.orphan;
}
function teamCheckedThisWeek(r){ return !!parseUpd(r && r.updated); } // строка уже из последней недели
async function loadShifts(force){
  const sh = state.shift;
  const key = sh.company + "|" + sh.date + "|" + sh.days;
  state.schedCache = state.schedCache || {};
  if (!force && state.schedCache[key] && (state.schedCache[key].data || state.schedCache[key].loading)) return;
  state.schedCache[key] = { loading: true };
  if (state.tab === "Смены") renderShifts();
  try {
    const res = await wp({ action:"sched", company: sh.company, date: sh.date, days: sh.days, refresh: !!force }, 90000);
    if (res.error) throw new Error(res.error);
    state.schedCache[key] = { data: res };
  } catch(e){ state.schedCache[key] = { error: e.message }; }
  if (state.tab === "Смены") renderShifts();
}
// Обновление 6 (12): действия меню смены вынесены — их же зовёт «Лента сегодняшних смен»
async function shDoAct(b, name){
    const act = b.dataset.act;
  if (act === "goto") gotoRow(b.dataset.sheet + "|" + b.dataset.row);
  else if (act === "scr") openShiftScreens(b.dataset.key, name);
  else if (act === "task"){
    document.getElementById("tk-team").textContent = b.dataset.label;
    document.getElementById("tk-text").value = "";
    document.getElementById("tk-msg").textContent = "";
    const ta = document.getElementById("tk-text");
    ta.dataset.sheet = b.dataset.sheet; ta.dataset.nick = b.dataset.nick;
    ta.dataset.model = b.dataset.model; ta.dataset.producer = b.dataset.producer;
    const lt = (state.tasks||[]).filter(t=>t.key === b.dataset.sheet+"|"+b.dataset.nick+"|"+b.dataset.model);
    document.getElementById("tk-list").innerHTML = lt.length ? lt.map(t=>`<div class="drow"><b>${t.status==="сделана"?"✅":"📌"} ${esc(t.when||"")}</b><span class="utext">${esc(t.text)}</span></div>`).join("") : '<div class="empty">Открытых задач нет</div>';
    openModal("taskmodal");
  } else if (act === "add"){
    if (weekPinned()){ toast("Сначала выбери конкретную неделю", true); return; }
    document.getElementById("a-msg").textContent = "";
    document.getElementById("a-city").value = b.dataset.city;
    updateProdList();
    document.getElementById("a-model").value = b.dataset.model || "";
    document.getElementById("a-opname").value = b.dataset.op || "";
    document.getElementById("a-nick").value = "";
    openModal("addmodal");
  }
}
// ===== Обновление 6 (12): «Лента сегодняшних смен» =====
// чистая: смены дня → карточки (по одной на фамилию), зачёркнутые в конце, затем по времени
function feedItems(day, idx){
  const out = [];
  ((day && day.shifts) || []).forEach(s=>{
    (s.names || []).forEach(nm=>{
      out.push({ name: nm, time: s.time || "", operator: s.operator || "", struck: !!s.struck, reason: s.reason || "", raw: s.raw || "", teams: (idx && idx[schedNorm(nm)]) || [] });
    });
  });
  out.sort((a, b)=> (a.struck - b.struck) || String(a.time).localeCompare(String(b.time)) || String(a.name).localeCompare(String(b.name)));
  return out;
}
// v7: общие мелочи «Ленты» и «Смен»
const FD_WD = ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"];
const FD_CO_VAR = { "Томск":"var(--art)", "Новосибирск":"var(--vv)", "Онлайн":"var(--dia)" };
const FD_ICO = {
  ref: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M20 11a8 8 0 10-2.3 5.7M20 4v7h-7"/></svg>',
  chev: '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  sun: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 17a5 5 0 100-10 5 5 0 000 10z"/></svg>',
  moon: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/></svg>',
  list: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 6h16v14H4zM4 10h16M9 3v4M15 3v4"/></svg>',
  search: '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4"/></svg>'
};
function fdCoSwitch(comps, cur, attr){
  return `<div class="fd-cos" role="tablist">${comps.map(c=>`<button role="tab" aria-selected="${c===cur}" class="fd-co${c===cur?" on":""}" ${attr}="${esc(c)}"><span class="fd-cosq" style="background:${FD_CO_VAR[c]||"var(--accent)"}"></span>${esc(clabel(c))}</button>`).join("")}</div>`;
}
// «08:00-16:00» → минуты от начала дня; конец через полночь — +24 ч
function fdSpan(time){
  const m = String(time||"").match(/(\d{1,2})[:.](\d{2})\s*[-–—]\s*(\d{1,2})[:.](\d{2})/);
  if (m){ const s = (+m[1])*60 + (+m[2]); let e = (+m[3])*60 + (+m[4]); if (e <= s) e += 1440; return { s, e }; }
  const o = String(time||"").match(/(\d{1,2})[:.](\d{2})/);
  return o ? { s: (+o[1])*60 + (+o[2]), e: null } : null;
}
function fdHM(min){ min = ((min % 1440) + 1440) % 1440; return String(Math.floor(min/60)).padStart(2,"0") + ":" + String(min%60).padStart(2,"0"); }
function fdScoreHtml(r){
  if (!r) return "";
  const s = rowStats(r); if (s.score == null) return "";
  const k = s.score / MAX_SCORE, cls = k >= 0.75 ? "ok" : k >= 0.375 ? "warn" : "bad";
  return `<span class="fd-score ${cls}" title="оценка последнего разбора">${fmtSc(s.score)}/${MAX_SCORE}</span>`;
}
function renderFeed(){
  document.getElementById("pbar").innerHTML = "";
  const box = document.getElementById("content");
  const comps = CITY_ORDER.filter(c=>AUTH.cities.includes("all") || AUTH.cities.includes(c));
  const now = new Date();
  const today = ymdLocal(now);
  state.feed = state.feed || { company: comps[0] || "Онлайн" };
  const f = state.feed;
  if (!comps.includes(f.company) && comps.length) f.company = comps[0];
  const key = f.company + "|" + today + "|1";
  state.schedCache = state.schedCache || {};
  const ent = state.schedCache[key];
  const load = async (force)=>{
    state.schedCache[key] = { loading: true }; if (state.tab === "Лента") renderFeed();
    try { const res = await wp({ action:"sched", company: f.company, date: today, days: 1, refresh: !!force }, 90000); if (res.error) throw new Error(res.error); state.schedCache[key] = { data: res }; }
    catch(e){ state.schedCache[key] = { error: e.message }; }
    if (state.tab === "Лента") renderFeed();
  };
  if (!ent){ setTimeout(()=>load(false), 0); }
  const idx = shiftTeamsIndex(f.company);
  const day = ent && ent.data ? ((ent.data.days || []).find(d=>d.date === today) || (ent.data.days || [])[0]) : null;
  const items = feedItems(day, idx);
  // доп. поля для оформления: № смены, NEW — из той же смены расписания
  const shOf = {};
  ((day && day.shifts) || []).forEach(s=>(s.names||[]).forEach(nm=>{ shOf[nm + "|" + (s.time||"") + "|" + (s.operator||"")] = s; }));
  const nowMin = now.getHours()*60 + now.getMinutes();
  items.forEach(it=>{
    const s = shOf[it.name + "|" + it.time + "|" + it.operator] || {};
    it.shiftNo = s.shiftNo || ""; it.isNew = !!s.isNew;
    const sp = fdSpan(it.time); it.sp = sp;
    it.st = it.struck ? "off" : !sp ? "soon" : nowMin < sp.s ? "soon" : (sp.e == null || nowMin < sp.e) ? "on" : "done";
    it.prog = it.st === "on" && sp && sp.e ? Math.max(2, Math.min(100, Math.round((nowMin - sp.s) / (sp.e - sp.s) * 100))) : 0;
    it.orphan = !it.struck && !it.teams.length;
  });
  const cnt = {
    all: items.filter(x=>!x.struck).length,
    on: items.filter(x=>x.st === "on").length,
    orphan: items.filter(x=>x.orphan).length,
    off: items.filter(x=>x.struck).length
  };
  const flt = f.filter || "";
  const pass = it => !flt || (flt === "on" && it.st === "on") || (flt === "orphan" && it.orphan) || (flt === "off" && it.struck);
  const tile = (id, n, lab, cls) => `<button class="fd-tile ${cls}${(flt||"all")===id?" on":""}" data-fdf="${id}" aria-pressed="${(flt||"all")===id}"><b>${n}</b><span>${lab}</span></button>`;
  const startOf = it => it.sp ? fdHM(it.sp.s) : (it.time || "—");
  const card = (it, i) => {
    const t = it.teams[0];
    const tags = [];
    if (it.st === "on") tags.push('<span class="fd-tag ok">на смене</span>');
    if (it.isNew) tags.push('<span class="fd-tag acc">NEW</span>');
    if (it.orphan) tags.push('<span class="fd-tag warn">без мониторинга</span>');
    if (it.struck) tags.push('<span class="fd-tag bad">отписка</span>');
    const btns = [];
    if (t) btns.push(`<button class="fd-b" data-fd="goto" data-i="${i}">Открыть разбор</button>`);
    else btns.push(`<button class="fd-b pri" data-fd="add" data-i="${i}">+ Мониторинг</button>`);
    btns.push(`<button class="fd-b" data-fd="scr" data-i="${i}"${t?"":" disabled title=\"нет команды на дашборде\""}>Скрин</button>`);
    btns.push(`<button class="fd-b" data-fd="task" data-i="${i}"${t?"":" disabled title=\"нет команды на дашборде\""}>Задача</button>`);
    const showBtns = !it.struck || t; // отписка без команды — действий нет (как в макете)
    const meta = (it.operator ? "оператор " + esc(it.operator) : "оператор не указан")
      + (t ? " · продюсер " + esc(t.producer||"—") + (it.teams.length > 1 ? ` <span class="fd-more" title="${esc(it.teams.map(r=>(r.producer||"—")+" / "+(r.opName||r.opNick||"—")).join("\n"))}">+${it.teams.length-1}</span>` : "") : " · команды на дашборде нет");
    return `<div class="fd-row st-${it.st}">
      <div class="fd-tm">${esc(startOf(it))}</div>
      <div class="fd-rl"><span class="fd-dot"></span><span class="fd-ln"></span></div>
      <article class="fd-card">
        <div class="fd-h"><b class="fd-nm">${esc(it.name)}</b><span class="fd-time">${esc(it.time||"—")}${it.shiftNo?" · смена "+esc(it.shiftNo):""}</span>${tags.join("")}<span class="fd-sp"></span>${fdScoreHtml(t)}</div>
        <div class="fd-meta">${meta}</div>
        ${it.st === "on" && it.prog ? `<div class="fd-prog" title="прошло ${it.prog}% смены"><i style="width:${it.prog}%"></i></div>` : ""}
        ${it.struck ? `<div class="fd-reason">Отписка${it.reason ? ": " + esc(it.reason) : ""}</div>` : ""}
        ${showBtns ? `<div class="fd-btns">${btns.join("")}</div>` : ""}
      </article></div>`;
  };
  const nowLine = `<div class="fd-now"><span class="fd-tm">${fdHM(nowMin)}</span><span class="fd-rl"><span class="fd-nd"></span></span><span class="fd-nl"></span><span class="fd-nt">сейчас</span></div>`;
  const shown = items.map((it, i)=>({ it, i })).filter(x=>pass(x.it));
  let list = "";
  if (shown.length){
    let placed = !!flt; // линию «сейчас» — только в полной ленте
    shown.forEach(({ it, i })=>{
      if (!placed && (it.struck || (it.sp && it.sp.s > nowMin))){ list += nowLine; placed = true; }
      list += card(it, i);
    });
    if (!placed) list += nowLine;
  }
  // «Кого проверить сегодня»: на смене (не отписка), есть команда, на этой неделе без отметки
  const toCheck = [];
  items.filter(it=>!it.struck).forEach(it=>it.teams.forEach(r=>{ if (!teamCheckedThisWeek(r) && !toCheck.some(x=>x.r===r)) toCheck.push({ r, it }); }));
  const dd = now;
  const sub = `сегодня, ${FD_WD[dd.getDay()]} ${String(dd.getDate()).padStart(2,"0")}.${String(dd.getMonth()+1).padStart(2,"0")} · смены по расписанию`;
  let stateMsg = "";
  if (!ent || ent.loading) stateMsg = '<div class="fd-empty">Загружаю расписание…</div>';
  else if (ent.error) stateMsg = `<div class="fd-empty bad">${esc(ent.error)}</div>`;
  else if (!items.length) stateMsg = '<div class="fd-empty">Сегодня смен нет</div>';
  else if (!shown.length) stateMsg = '<div class="fd-empty">Под этот фильтр смен нет</div>';
  box.innerHTML = `<div class="fd7">
    <div class="fd-head"><h1>Лента</h1><span class="fd-sub">${sub}</span><span class="fd-fill"></span>
      ${fdCoSwitch(comps, f.company, "data-fc")}
      <button class="fd-ref${ent && ent.loading ? " spin" : ""}" id="fd-ref" title="перечитать расписание" aria-label="Перечитать расписание">${FD_ICO.ref}</button></div>
    <div class="fd-tiles">${tile("all", cnt.all, "запланировано", "")}${tile("on", cnt.on, "на смене сейчас", "ok")}${tile("orphan", cnt.orphan, "без мониторинга", "warn")}${tile("off", cnt.off, "отписка", "bad")}</div>
    <div class="fd-cols">
      <section class="fd-line">${stateMsg}${list}</section>
      <aside class="fd-side">
        <section class="fd-box"><div class="fd-bh"><h2>Кого проверить сегодня</h2><span class="fd-cnt">${toCheck.length}</span></div>
          <span class="fd-note">на смене, но на этой неделе ещё без отметки «проверено»</span>
          ${toCheck.length ? toCheck.map(x=>`<button class="fd-chk" data-fdgo="${esc(x.r._sheet)}|${x.r._row}"><span class="fd-cd"></span><span class="fd-ct"><b>${esc(x.it.name)}</b><span>${esc(x.it.sp ? fdHM(x.it.sp.s) : x.it.time)} · ${esc(x.r.producer||"—")} / ${esc(x.r.opName||x.r.opNick||"—")}</span></span>${FD_ICO.chev}</button>`).join("")
            : `<div class="fd-note">${ent && ent.data ? "Все сегодняшние смены с мониторингом уже отмечены" : "—"}</div>`}
        </section>
        <section class="fd-box fd-help"><b>Как читать ленту</b>
          <span><i class="fd-k on"></i> на смене — полоска показывает, сколько смены прошло</span>
          <span><i class="fd-k soon"></i> скоро начнётся</span>
          <span><i class="fd-k done"></i> смена уже закончилась</span>
          <span><i class="fd-k off"></i> отписка — внизу ленты</span>
          <span>Расписание кэшируется на 5 минут; кнопка справа вверху перечитывает таблицу. Таблица смен только читается.</span>
        </section>
      </aside>
    </div></div>`;
  box.querySelectorAll("[data-fc]").forEach(b=>b.onclick=()=>{ f.company = b.dataset.fc; renderFeed(); });
  box.querySelectorAll("[data-fdf]").forEach(b=>b.onclick=()=>{ const v = b.dataset.fdf === "all" ? "" : b.dataset.fdf; f.filter = f.filter === v ? "" : v; renderFeed(); });
  box.querySelectorAll("[data-fdgo]").forEach(b=>b.onclick=()=>gotoRow(b.dataset.fdgo));
  const rb = document.getElementById("fd-ref"); if (rb) rb.onclick = ()=>load(true);
  box.querySelectorAll("[data-fd]").forEach(b=>b.onclick=()=>{
    const it = items[+b.dataset.i]; if (!it) return;
    const r = it.teams[0], act = b.dataset.fd;
    const ds = (o)=>({ dataset: o });
    if (act === "goto" && r) shDoAct(ds({ act:"goto", sheet: r._sheet, row: String(r._row) }), it.name);
    else if (act === "add") shDoAct(ds({ act:"add", model: it.name, op: it.operator, city: f.company }), it.name);
    else if (act === "scr" && r) openUpload({ r: r }, undefined, "общее фото · " + it.name);
    else if (act === "task" && r) shDoAct(ds({ act:"task", sheet: r._sheet, nick: r.opNick||"", model: r.model||"", producer: r.producer||"", label: (r.opName||r.opNick||"—")+" / "+(r.model||"—") }), it.name);
  });
}
function closeShMenu(){ const m = document.getElementById("sh-menu"); if (m) m.remove(); }
function openShMenu(ev, payload){
  closeShMenu();
  const m = document.createElement("div");
  m.id = "sh-menu"; m.className = "shmenu";
  const { name, shift: s, teams, company } = payload;
  let html = `<div style="padding:4px 10px 6px;color:var(--dim);font-size:11.5px">${esc(name)}${s.struck?' · <span style="color:var(--bad)">зачёркнута</span>':""}${s.reason?" · "+esc(s.reason):""}</div>`;
  if (teams.length){
    teams.forEach(r=>{
      html += `<button data-act="goto" data-sheet="${esc(r._sheet)}" data-row="${r._row}">Открыть разбор · ${esc(r.producer||"—")} / ${esc(r.opName||r.opNick||"—")}</button>`;
      html += `<button data-act="scr" data-key="${esc(skey(r))}">Скрины</button>`;
      if (AUTH.edit) html += `<button data-act="task" data-sheet="${esc(r._sheet)}" data-nick="${esc(r.opNick||"")}" data-model="${esc(r.model||"")}" data-producer="${esc(r.producer||"")}" data-label="${esc((r.opName||r.opNick||"—")+" / "+(r.model||"—")+" · "+clabel(r.city))}">Задача продюсеру</button>`;
    });
  } else if (AUTH.edit){
    html += `<button data-act="add" data-model="${esc(name)}" data-op="${esc(s.operator||"")}" data-city="${esc(company)}">+ Мониторинг (фамилия в форму)</button>`;
  } else {
    html += `<div style="padding:6px 10px;color:var(--faint)">нет команды на дашборде</div>`;
  }
  m.innerHTML = html;
  document.body.appendChild(m);
  const x = Math.min(ev.clientX, window.innerWidth - 220), y = Math.min(ev.clientY, window.innerHeight - 160);
  m.style.left = x + "px"; m.style.top = y + "px";
  m.onclick = (e)=>{
    const b = e.target.closest("button[data-act]"); if (!b) return;
    closeShMenu();
    shDoAct(b, name);
  };

  setTimeout(()=>document.addEventListener("click", function once(ev){ if (!ev.target.closest("#sh-menu")){ closeShMenu(); document.removeEventListener("click", once); } }), 0);
}
function openShiftScreens(key, title){
  const arr = (state.screens||{})[key] || [];
  if (!arr.length){ toast("Скринов у этой команды нет", true); return; }
  document.getElementById("cam-title").textContent = (title || "скрины");
  document.getElementById("cam-ai").style.display = "none";
  document.getElementById("cam-aiout").style.display = "none";
  const first = arr.find(s=>s.type !== "video" && !isAdvCat(s.cat)) || arr.find(s=>s.type !== "video") || arr[0];
  if (first.type === "video"){ openVideo(first.link); return; }
  camShow((state.thumbData||{})[first.mini||first.link] || BLANK, !!(state.thumbData||{})[first.mini||first.link]);
  openModal("cammodal");
  // Обновление 5: в большом окне — ОРИГИНАЛ (раньше сюда грузилась мини-копия 480 px — отсюда «мыло»)
  const id = (first.link||first.mini||"");
  if (id) camLoadFull(driveId(id));
  setTimeout(ensureThumbs, 30);
}
// ===== Обновление 6: тепловая карта категорий =====
function heatOrder(items){ // чистая: сначала больше замечаний, затем ниже оценка, затем по продюсеру
  return items.slice().sort((a,b)=> (b.bad - a.bad) || ((a.score==null?99:a.score) - (b.score==null?99:b.score)) || String(a.producer).localeCompare(String(b.producer), "ru"));
}
function heatColTotals(items, n){ // чистая: по каждой категории — сколько ✅/⚠️/❌/пусто
  const t = Array.from({length:n}, ()=>({ ok:0, warn:0, bad:0, none:0 }));
  items.forEach(it => it.st.forEach((s,j)=>{ if (j < n && s !== "na") t[j][s==="ok"||s==="warn"||s==="bad" ? s : "none"]++; })); // na — пункта нет в чек-листе этой строки
  return t;
}
function renderHeat(){
  document.getElementById("pbar").innerHTML = "";
  const comps = AUTH.prod ? [""] : CITY_ORDER.filter(c=>AUTH.cities.includes("all") || AUTH.cities.includes(c));
  state.heatCo = comps.includes(state.heatCo) ? state.heatCo : (comps[0] || "");
  const co = state.heatCo;
  const rows = dedupeRows(AUTH.prod ? rowsOf(prodTabName()) : rowsOf(co));
  const HN = catNamesFor(rows); // v7.7: колонки — пункты чек-листа (у НСК свои; смешанные недели — оба набора)
  const items = heatOrder(rows.map((r,i)=>{ const s = rowStats(r), L = catsOf(r); return { i, r, st: HN.map(n=>stByName(r, s.st, n) || null), ci: HN.map(n=>L.indexOf(n)), bad: s.bad, score: s.score, verdict: s.verdict, producer: r.producer||"" }; }));
  const tot = heatColTotals(items.map(it=>Object.assign({}, it, { st: it.st.map((v,j)=>it.ci[j] < 0 ? "na" : v) })), HN.length);
  const hl = (typeof state.heatHl === "number" && state.heatHl < HN.length) ? state.heatHl : -1;
  tot.forEach(t=>{ t.w8 = t.bad + t.warn * 0.5; }); // v7.2: худшая категория — по «плохо» + ½ замечаний
  const mx0 = Math.max.apply(null, tot.map(t=>t.w8).concat([0])), mn0 = Math.min.apply(null, tot.map(t=>t.w8));
  const mx = mx0 > mn0 ? mx0 : -1; // выделяем худшую категорию, только если она одна из отличающихся
  const wks = [...new Set(rows.map(r=>r.week).filter(Boolean))];
  const wk = wks.length === 1 ? wks[0] : (document.getElementById("weeklabel").textContent || "").trim();
  const cell = (it, s, j)=>{
    if (it.ci[j] < 0) return `<span class="mp7-c mp7-na" title="${esc(HN[j])}: нет в чек-листе этой недели" aria-hidden="true"></span>`;
    const tip = HN[j] + (s ? " — " + ST_LBL[s] : "") + ": " + ((it.r.cats[it.ci[j]]||"").slice(0,160) || "не заполнено");
    return `<button class="mp7-c mp7-${s==="ok"||s==="warn"||s==="bad"?s:"none"}${hl>=0&&hl!==j?" dim":""}" data-hgo="${it.i}" title="${esc(tip)}" aria-label="${esc((it.r.opName||it.r.opNick||"—") + " / " + (it.r.model||"—") + " · " + tip)}">${s==="bad"?"✕":s==="warn"?"!":s==="ok"?"":"·"}</button>`;
  };
  document.getElementById("content").innerHTML = `<div class="o7pg">
    <div class="o7-head"><h1>Карта ошибок</h1><span class="o7-sub">команды × ${HN.length} ${ruPl(HN.length, "категория", "категории", "категорий")}${wk && wk!=="—" ? " · неделя " + esc(wk) : ""} · команд: ${items.length} · худшие сверху</span><span class="o7-sp"></span>
      ${comps.filter(Boolean).length ? `<div class="o7-seg" role="group" aria-label="Компания">${comps.filter(Boolean).map(c=>`<button class="${c===co?"on":""}" data-hco="${c}"><i style="background:${O7_CVAR[c]||"var(--faint)"}"></i>${esc(clabel(c))}</button>`).join("")}</div>` : ""}
    </div>
    <section class="o7-card mp7-card">${items.length ? `<div class="o7-scroll"><div class="mp7-grid" style="--mp7-n:${HN.length}">
      <div class="mp7-row mp7-hd"><span class="mp7-lb">Продюсер · опер / модель</span>${HN.map((n,j)=>`<button class="mp7-h${hl===j?" on":""}${mx>0&&tot[j].w8===mx&&hl!==j?" mx":""}" data-hcol="${j}" aria-pressed="${hl===j}" title="${esc(n)}: норма ${tot[j].ok} · замечаний ${tot[j].warn} · плохо ${tot[j].bad} · не заполнено ${tot[j].none}">${esc(o7Short(n))}</button>`).join("")}<span class="mp7-lb mp7-scl">Оценка</span></div>
      ${items.map(it=>`<div class="mp7-row"><button class="mp7-name hm-name" data-hgo="${it.i}" title="открыть карточку команды"><b>${esc(it.producer||"—")}</b> <span>· ${esc(it.r.opName||it.r.opNick||"—")} / ${esc(it.r.model||"—")}</span></button>${it.st.map((s,j)=>cell(it, s, j)).join("")}<b class="mp7-sc" style="color:${o7ScVar(it.score)}">${it.score==null?"–":fmtSc(it.score)+"/"+MAX_SCORE}</b></div>`).join("")}
      <div class="mp7-row mp7-tot"><span class="mp7-lb">Плохо · замечаний</span>${tot.map((t,j)=>`<b class="${hl===j?"on":mx>0&&t.w8===mx?"mx":""}" title="плохо — ${t.bad}, замечание — ${t.warn}">${t.bad}${t.warn ? `<small class="mp7-tw">+${t.warn}</small>` : ""}</b>`).join("")}<span></span></div>
    </div></div>` : '<div class="o7-empty">Нет команд за эту неделю</div>'}</section>
    <div class="mp7-leg"><span><i class="mp7-k mp7-bad">✕</i>плохо</span><span><i class="mp7-k mp7-warn">!</i>замечание</span><span><i class="mp7-k mp7-ok"></i>норма</span><span><i class="mp7-k mp7-none"></i>не заполнено</span><span>Клик по заголовку — подсветить категорию · по клетке — карточка команды</span></div>
  </div>`;
  document.querySelectorAll("[data-hco]").forEach(b=>b.onclick=()=>{ state.heatCo = b.dataset.hco; renderHeat(); });
  document.querySelectorAll("[data-hcol]").forEach(b=>b.onclick=()=>{ const j = +b.dataset.hcol; state.heatHl = state.heatHl === j ? -1 : j; renderHeat(); });
  document.querySelectorAll("[data-hgo]").forEach(td=>td.onclick=()=>{
    const r = rows[+td.dataset.hgo]; if (!r) return;
    state.tab = AUTH.prod ? prodTabName() : r.city; state.search = r.opNick || r.opName || r.model || ""; state.quick = ""; state.page = 1;
    render();
  });
}
// ===== Обновление 6: «Состояние» — только чтение, значения свойств сервер не отдаёт (только «есть/нет») =====
function renderStatus(...args){return loadFeature86('admin',()=>renderStatus(...args));}
// ===== Обновление 6: управление пользователями (админ). Хэши сервер не отдаёт; временный пароль показывается один раз =====
const CO_LABEL = { "Томск":"ArtLife", "Новосибирск":"VVCAM", "Онлайн":"DIAMOND" };
function userRoleText(x){
  if (x.prod) return "продюсер «" + x.prod + "»";
  if (x.edit) return "смотрящий/редактор";
  return (x.cities === "all") ? "директор (просмотр)" : "просмотр";
}
const O7_ROLES = [["edit","Смотрящий","всё, правки"],["dir","Директор","все компании, просмотр"],["view","Компания","своя компания, просмотр"],["prod","Продюсер","только свои команды"]];
function o7RoleOf(x){ return x.prod ? "prod" : x.edit ? "edit" : x.cities==="all" ? "dir" : "view"; }
function renderUsers(...args){return loadFeature86('admin',()=>renderUsers(...args));}
function renderShifts(){
  document.getElementById("pbar").innerHTML = "";
  closeShMenu();
  const comps = CITY_ORDER.filter(c=>AUTH.cities.includes("all") || AUTH.cities.includes(c));
  const today = ymdLocal(new Date());
  state.shift = state.shift || { company: comps[0] || "Онлайн", date: today, days: 1, q: "", filter: "", expand: "", panel: "" };
  const sh = state.shift;
  if (!comps.includes(sh.company) && comps.length) sh.company = comps[0];
  const key = sh.company + "|" + sh.date + "|" + sh.days;
  const ent = (state.schedCache||{})[key];
  if (!ent){ setTimeout(()=>loadShifts(false), 0); }
  const idx = shiftTeamsIndex(sh.company);
  const q = schedNorm(sh.q);
  const filt = sh.filter || "";
  const ddmm = ymd => { const p = ymd.split("-"); return p[2] + "." + p[1]; };
  const dOf = ymd => { const p = ymd.split("-"); return new Date(+p[0], +p[1]-1, +p[2]); };

  const passFilt = s => {
    if (filt === "struck" && !s.struck) return false;
    if (filt === "orphan" && !shiftOrphan(s, idx)) return false;
    if (filt === "new" && !s.isNew) return false;
    if (q && !(s.names||[]).some(n=>schedNorm(n).includes(q)) && !schedNorm(s.operator).includes(q)) return false;
    return true;
  };
  const nameHtml = (nm, s) => {
    const k = schedNorm(nm);
    const teams = idx[k] || [];
    const orphan = !teams.length;
    return `<span class="sh7-nmw"><span class="shname${s.struck?" struck":""}${q && k.includes(q)?" shhit":""}" data-shn="${esc(nm)}" data-shr="${esc(s.raw||nm)}" title="действия: разбор, скрины, задача">${esc(nm)}</span>`
      + (s.isNew?'<span class="sh7-tag acc">NEW</span>':"")
      + (s.struck?'<span class="sh7-tag bad" title="'+esc(s.reason||"зачёркнута в таблице")+'">отписка</span>':"")
      + (orphan && !s.struck?'<span class="sh7-tag warn">без мониторинга</span>':"") + "</span>";
  };
  const teamsCell = s => {
    const seen = new Set(), teams = [];
    (s.names||[]).forEach(nm=>(idx[schedNorm(nm)]||[]).forEach(r=>{ if (!seen.has(r)){ seen.add(r); teams.push(r); } }));
    return teams.map(r=>`<span class="sh7-team">${esc(r.producer||"—")} · ${esc(r.opName||r.opNick||"—")}</span>`).join("")
      + shiftModelLinks(teams).slice(0, 6).map(l=>`<a class="sh7-lnk" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer" title="${esc(l.title + " — " + l.url)}">${esc(l.label)}</a>`).join("");
  };
  const shiftsTable = (list) => {
    if (!list.length) return '<div class="sh7-empty">Смен нет</div>';
    const byPart = { DAY: [], NIGHT: [], "": [] };
    list.forEach(s=>{ byPart[shiftPartOf(s) || ""].push(s); });
    const parts = [];
    if (byPart.DAY.length || byPart.NIGHT.length){
      if (byPart.DAY.length) parts.push(["День", FD_ICO.sun, byPart.DAY]);
      if (byPart.NIGHT.length) parts.push(["Ночь", FD_ICO.moon, byPart.NIGHT]);
      if (byPart[""].length) parts.push(["Смены", FD_ICO.list, byPart[""]]);
    } else {
      parts.push(["Смены", FD_ICO.list, list]);
    }
    const plural = n => n % 10 === 1 && n % 100 !== 11 ? "смена" : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? "смены" : "смен";
    return parts.map(([title, ico, rows]) => {
      const act = rows.filter(s=>!s.struck), off = rows.filter(s=>s.struck);
      const row = s => {
        const orphanNm = !s.struck && AUTH.edit ? (s.names||[]).find(n=>!(idx[schedNorm(n)]||[]).length) : null;
        return `<tr class="${s.struck?"sh7-off":""}" data-shraw="${esc(s.raw||"")}" data-shop="${esc(s.operator||"")}" data-shstruck="${s.struck?"1":""}" data-shreason="${esc(s.reason||"")}">
        <td class="sh7-c-t">${esc(s.time||"—")}${s.shiftNo?`<small>смена ${esc(s.shiftNo)}</small>`:""}</td>
        <td class="sh7-c-m"><div class="sh7-nms">${(s.names||[]).map(n=>nameHtml(n,s)).join('<span class="sh7-sl">/</span>')}</div>${s.struck && s.reason ? `<div class="sh7-reason">${esc(s.reason)}</div>` : ""}</td>
        <td class="sh7-c-tm"><div class="sh7-tms">${teamsCell(s)}</div></td>
        <td class="sh7-c-o">${esc(s.operator||"")}</td>
        <td class="sh7-c-a">${orphanNm ? `<button class="sh7-add" data-shadd="${esc(orphanNm)}" data-shop2="${esc(s.operator||"")}">+ Мониторинг</button>` : ""}</td></tr>`;
      };
      return `<div class="sh7-ph">${ico}<b>${title}</b><span>${rows.length} ${plural(rows.length)}${off.length?" · отписок "+off.length:""}</span></div>
        <div class="sh7-tw"><table class="sh7-t"><thead><tr><th class="sh7-c-t">Время</th><th>Модель</th><th>Команда на дашборде</th><th>Оператор</th><th></th></tr></thead>
        <tbody>${act.map(row).join("")}${off.map(row).join("")}</tbody></table></div>`;
    }).join("");
  };
  const dayStats = (shifts) => shiftDaySummary(shifts, idx);
  const weekCard = (d, maxN) => {
    const dt = dOf(d.date);
    const st = dayStats(d.shifts||[]);
    const h = n => Math.round(n / maxN * 56) + "px";
    return `<button class="sh7-wc shweekcard${d.date===today?" today":""}${sh.expand===d.date?" on":""}" data-shexp="${esc(d.date)}" aria-pressed="${sh.expand===d.date}">
      <span class="sh7-wh"><b>${WD_RU[dt.getDay()]}</b><span>${esc(ddmm(d.date))}</span>${d.date===today?'<em>сегодня</em>':""}</span>
      <span class="sh7-bars" aria-hidden="true"><i class="ok" style="height:${h(Math.max(0, st.act - st.orphan))}"></i><i class="warn" style="height:${h(st.orphan)}"></i><i class="bad" style="height:${st.off ? h(st.off) : "2px"}"></i></span>
      <span class="sh7-wl"><span>смен <b>${st.planned}</b></span><span>на смене <b>${st.act}</b></span><span>без мониторинга <b class="warn">${st.orphan}</b></span><span>отписок <b class="bad">${st.off}</b></span></span>
      ${d.error?`<span class="sh7-werr">${esc(d.error)}</span>`:""}
    </button>`;
  };
  const dayBlock = (d) => {
    const st = dayStats(d.shifts||[]);
    const shifts = (d.shifts||[]).filter(passFilt);
    return `<section class="sh7-sec shday${d.date===today?" today":""}" data-shday="${esc(d.date)}">
      <div class="sh7-sum"><b>${FD_WD[dOf(d.date).getDay()].replace(/^./, c=>c.toUpperCase())}, ${esc(ddmm(d.date))}</b>${d.date===today?'<span class="sh7-tag ok">сегодня</span>':""}<span>${esc(shiftSummaryText(st))}</span></div>
      ${d.error?`<div class="sh7-empty bad">${esc(d.error)}</div>`:""}
      ${shiftsTable(shifts)}
    </section>`;
  };

  // «Кого проверить сегодня»
  const todayDay = ((ent && ent.data && ent.data.days)||[]).find(d=>d.date===today) || ((ent && ent.data && ent.data.days)||[]).find(d=>d.date===sh.date);
  const toCheck = [];
  if (todayDay){
    (todayDay.shifts||[]).filter(s=>!s.struck).forEach(s=>{
      (s.names||[]).forEach(nm=>{
        (idx[schedNorm(nm)]||[]).forEach(r=>{
          if (!teamCheckedThisWeek(r) && !toCheck.some(x=>x.r===r)) toCheck.push({ r, name: nm, time: s.time||"", operator: s.operator||"" });
        });
      });
    });
  }
  // сравнение
  const cmpDate = (sh.days===1 ? sh.date : (sh.expand || today));
  const cmpDay = ((ent && ent.data && ent.data.days)||[]).find(d=>d.date===cmpDate);
  const inSched = new Set(), onDash = new Set();
  Object.keys(idx).forEach(k=>onDash.add(k));
  const onlySched = [], onlyDash = [];
  if (cmpDay){
    (cmpDay.shifts||[]).filter(s=>!s.struck).forEach(s=>{
      (s.names||[]).forEach(nm=>{
        const k = schedNorm(nm); inSched.add(k);
        if (!idx[k] || !idx[k].length) onlySched.push({ name: nm, operator: s.operator||"", time: s.time||"" });
      });
    });
    Object.keys(idx).forEach(k=>{ if (!inSched.has(k)) idx[k].forEach(r=>onlyDash.push(r)); });
  }

  let body = "";
  if (!ent || ent.loading) body = '<section class="sh7-sec"><div class="sh7-empty">Загружаю расписание…</div></section>';
  else if (ent.error) body = `<section class="sh7-sec"><div class="sh7-empty bad">Не удалось прочитать расписание: ${esc(ent.error)}</div></section>`;
  else {
    const data = ent.data;
    const days = data.days || [];
    const sheets = [...new Set(days.map(d=>d.sheet).filter(Boolean))];
    const foot = `<div class="sh7-foot">Обновлено в ${esc(data.updated||"—")} · кэш до 5 минут${sheets.length?" · лист "+sheets.map(x=>"«"+esc(x)+"»").join(", "):""} · таблица расписания только читается</div>`;
    if (sh.days === 7){
      const maxN = Math.max(1, ...days.map(d=>(d.shifts||[]).length));
      body = `<div class="sh7-week shweek">${days.map(d=>weekCard(d, maxN)).join("")}</div>`;
      const d = sh.expand ? days.find(x=>x.date===sh.expand) : null;
      body += d ? dayBlock(d).replace("</section>", foot + "</section>") : `<section class="sh7-sec"><div class="sh7-empty">Выбери день, чтобы увидеть смены</div>${foot}</section>`;
    } else {
      body = days.length ? days.map(d=>dayBlock(d)).join("").replace(/<\/section>$/, foot + "</section>") : `<section class="sh7-sec"><div class="sh7-empty">Смен нет</div>${foot}</section>`;
    }
  }

  const dt0 = dOf(sh.date);
  const dateLabel = sh.days === 7
    ? "Неделя " + ddmm(sh.date) + " – " + ddmm(ymdShift(sh.date, 6))
    : FD_WD[dt0.getDay()].replace(/^./, c=>c.toUpperCase()) + ", " + dt0.getDate() + "." + String(dt0.getMonth()+1).padStart(2,"0") + (sh.date === today ? " · сегодня" : "");
  const filtBtn = (id, lab) => `<button class="sh7-pill shfilt${filt===id?" on":""}" data-shf="${id}" aria-pressed="${filt===id}">${lab}</button>`;
  document.getElementById("content").innerHTML = `<div class="sh7">
    <div class="fd-head"><h1>Смены</h1><span class="fd-sub">расписание моделей · таблица только читается</span><span class="fd-fill"></span>
      ${fdCoSwitch(comps, sh.company, "data-shc")}</div>
    <section class="sh7-bar">
      <div class="sh7-nav"><button class="sh7-ib" id="sh-prev" title="назад" aria-label="Назад">‹</button><button class="sh7-tb" id="sh-today">Сегодня</button><button class="sh7-ib" id="sh-next" title="вперёд" aria-label="Вперёд">›</button></div>
      <b class="sh7-date">${esc(dateLabel)}</b>
      <input type="date" id="sh-date" class="sh7-dp" value="${esc(sh.date)}" title="выбрать дату" aria-label="Выбрать дату">
      <div class="sh7-seg" role="group" aria-label="Режим">${sh.days===7
        ? `<button id="sh-mode" title="показать один день">День</button><button class="on" aria-pressed="true">Неделя</button>`
        : `<button class="on" aria-pressed="true">День</button><button id="sh-mode" title="показать неделю">Неделя</button>`}</div>
      <label class="sh7-q">${FD_ICO.search}<input id="sh-q" placeholder="Фамилия модели или оператора" value="${esc(sh.q)}" aria-label="Поиск по фамилии"></label>
      <button class="fd-ref${ent && ent.loading ? " spin" : ""}" id="sh-ref" title="перечитать таблицу (минуя кэш)" aria-label="Перечитать таблицу">${FD_ICO.ref}</button>
      <div class="sh7-fl">
        ${filtBtn("","Все")}${filtBtn("struck","Только отписки")}${filtBtn("orphan","Без мониторинга")}${filtBtn("new","Только NEW")}
        <span class="fd-fill"></span>
        <button class="sh7-pill sh7-pb${sh.panel==="check"?" on":""}" id="sh-check" aria-pressed="${sh.panel==="check"}">Кого проверить${toCheck.length?" · "+toCheck.length:""}</button>
        <button class="sh7-pill sh7-pb${sh.panel==="compare"?" on":""}" id="sh-cmp" aria-pressed="${sh.panel==="compare"}">Сверка с дашбордом</button>
      </div>
    </section>
    ${sh.panel==="check" ? `<section class="sh7-pan shpanel"><b class="sh7-pt">Кого проверить сегодня — на смене, но без отметки на этой неделе</b>
      ${toCheck.length ? `<div class="sh7-chks">${toCheck.map(x=>`<button class="sh7-chk" data-shgoto="${esc(x.r._sheet)}|${x.r._row}"><b>${esc(x.name)}</b><span>${esc(x.time)} · ${esc(x.r.producer||"—")} / ${esc(x.r.opName||x.r.opNick||"—")}</span></button>`).join("")}</div>` : '<div class="sh7-empty">Все сегодняшние смены с мониторингом уже отмечены</div>'}
    </section>` : ""}
    ${sh.panel==="compare" ? `<section class="sh7-pan sh7-cmp shpanel">
        <div><b class="sh7-pt warn">В расписании, но нет на дашборде · ${onlySched.length} <small>${esc(ddmm(cmpDate))}</small></b>
          ${onlySched.length?onlySched.map(x=>`<div class="sh7-cr"><b>${esc(x.name)}</b><span>${esc(x.time)}${x.operator?" · оператор "+esc(x.operator):""}</span>${AUTH.edit?`<button class="sh7-add pri" data-shadd="${esc(x.name)}" data-shop2="${esc(x.operator)}">+ Мониторинг</button>`:""}</div>`).join(""):'<div class="sh7-empty">пусто</div>'}</div>
        <div><b class="sh7-pt dim">На дашборде, но в этот день не в смене · ${onlyDash.length}</b>
          ${onlyDash.length?onlyDash.map(r=>`<div class="sh7-cr"><button class="sh7-lb" data-shgoto="${esc(r._sheet)}|${r._row}">${esc(r.model)}</button><span>${esc(r.producer||"—")} · ${esc(r.opName||r.opNick||"—")}</span></div>`).join(""):'<div class="sh7-empty">пусто</div>'}</div>
    </section>` : ""}
    ${body}</div>`;

  const go = (date, days)=>{ sh.date = date; if (days) sh.days = days; if (days===1) sh.expand = ""; renderShifts(); };
  document.querySelectorAll("[data-shc]").forEach(b=>b.onclick=()=>{ sh.company = b.dataset.shc; sh.expand = ""; renderShifts(); });
  document.getElementById("sh-prev").onclick = ()=>go(ymdShift(sh.date, -sh.days));
  document.getElementById("sh-next").onclick = ()=>go(ymdShift(sh.date, sh.days));
  document.getElementById("sh-today").onclick = ()=>go(today);
  document.getElementById("sh-date").onchange = e=>{ if (/^\d{4}-\d{2}-\d{2}$/.test(e.target.value)) go(e.target.value); };
  document.getElementById("sh-mode").onclick = ()=>go(sh.date, sh.days===7 ? 1 : 7);
  document.getElementById("sh-ref").onclick = ()=>loadShifts(true);
  document.querySelectorAll("[data-shf]").forEach(b=>b.onclick=()=>{ sh.filter = b.dataset.shf; renderShifts(); });
  document.getElementById("sh-check").onclick = ()=>{ sh.panel = sh.panel==="check" ? "" : "check"; renderShifts(); };
  document.getElementById("sh-cmp").onclick = ()=>{ sh.panel = sh.panel==="compare" ? "" : "compare"; renderShifts(); };
  document.querySelectorAll("[data-shexp]").forEach(b=>b.onclick=()=>{ sh.expand = sh.expand===b.dataset.shexp ? "" : b.dataset.shexp; renderShifts(); });
  document.querySelectorAll("[data-shgoto]").forEach(b=>b.onclick=()=>gotoRow(b.dataset.shgoto));
  document.querySelectorAll("[data-shadd]").forEach(b=>b.onclick=(ev)=>{
    ev.stopPropagation();
    if (!AUTH.edit) return;
    if (weekPinned()){ toast("Сначала выбери конкретную неделю", true); return; }
    document.getElementById("a-city").value = sh.company; updateProdList();
    document.getElementById("a-model").value = b.dataset.shadd;
    document.getElementById("a-opname").value = b.dataset.shop2 || "";
    document.getElementById("a-nick").value = "";
    openModal("addmodal");
  });
  const qi = document.getElementById("sh-q");
  qi.oninput = ()=>{ sh.q = qi.value; const pos = qi.selectionStart; renderShifts(); const q2 = document.getElementById("sh-q"); if (q2){ q2.focus(); try { q2.setSelectionRange(pos, pos); } catch(e){} } };
  // клик по фамилии → меню действий (в т.ч. внутри таблицы)
  document.querySelectorAll(".shday .shname[data-shn], .shpanel .shname[data-shn]").forEach(el=>{
    el.onclick = (ev)=>{
      ev.stopPropagation();
      const tr = el.closest("tr");
      const raw = tr ? tr.dataset.shraw : el.dataset.shn;
      const nm = el.dataset.shn;
      const teams = idx[schedNorm(nm)] || [];
      const fake = { raw: raw, operator: tr ? tr.dataset.shop : "", struck: tr ? tr.dataset.shstruck==="1" : false, reason: tr ? tr.dataset.shreason : "", names: [nm] };
      openShMenu(ev, { name: nm, shift: fake, teams: teams, company: sh.company });
    };
  });
}

// ---------- v7 (50_pm): общие кусочки экранов продюсера и мониторинга ----------
const PMX_CO = { "Томск":"var(--art)", "Новосибирск":"var(--vv)", "Онлайн":"var(--dia)" };
const PMX_SHORT = ["ОКО","модель","мемберы","голы","шоу","плейлист","сайты","кадр","комната"];
const NSK_SHORT = ["свет и кадр","ловенс","голы","боты","блокнот и микрофон","позиции","посты","модель ↔ мемберы","оператор 1–5"];
const pmxShort = r => isNskRow(r) ? NSK_SHORT : PMX_SHORT;
// v7.7: чек-лист для мониторинга продюсера — как у команды недели; новая команда НСК — по формату открытой недели
// v7.7: полоса на вкладке VVCAM — включён ли новый чек-лист для открытой недели (переключает редактор)
function nskLatestSheet(){ const r = (state.rows||[]).find(r=>r.city==="Новосибирск" && r.week===state.serverLatest); if (r) return r._sheet; const b = (state.pblocks||[]).find(b=>b.city==="Новосибирск" && b.week===state.serverLatest); return b ? b.sheet : ""; }
function nskFmtBar(){
  if (AUTH.prod || viewAsActive()) return "";
  const sh = nskLatestSheet(); if (!sh) return "";
  const wk = state.serverLatest || "", on = nskLatestOn();
  if (on) return `<div class="nsk-bar on"><b>Чек-лист VVCAM</b><span>неделя ${esc(wk)}: свет и кадр, ловенс, голы 5–10, боты, блокнот и микрофон, 4 позиции, посты, модель и оператор ↔ мемберы</span>${AUTH.edit ? `<button class="nsk-off" data-nskfmt="${esc(sh)}" data-on="0">вернуть прежние категории</button>` : ""}</div>`;
  if (!AUTH.edit) return "";
  const filled = (state.rows||[]).filter(r=>r._sheet === sh && r.cats.some(c=>String(c||"").trim())).length;
  return `<div class="nsk-bar"><b>Новый чек-лист VVCAM</b><span>9 пунктов: скрин света и кадра, скрин ловенса, 5–10 голов с ценой и онлайном, боты, блокнот и микрофон, 4 рабочие позиции, 2+ поста в день, модель и оператор ↔ мемберы (1–5).${filled ? ` <b class="nsk-warn">В неделе уже заполнено команд: ${filled} — их тексты покажутся под новыми названиями.</b>` : ""}</span><button class="abtn" data-nskfmt="${esc(sh)}" data-on="1">Включить для недели ${esc(wk)}</button></div>`;
}
document.addEventListener("click", async ev=>{
  const b = ev.target && ev.target.closest ? ev.target.closest("[data-nskfmt]") : null; if (!b) return;
  ev.stopPropagation();
  const on = b.dataset.on !== "0";
  if (!confirm(on ? "Включить новый чек-лист VVCAM для этой недели? Следующие недели получат его автоматически. Прошлые недели не меняются." : "Вернуть прежние 9 категорий для этой недели? Уже написанные тексты останутся, но покажутся под старыми названиями.")) return;
  b.disabled = true;
  try { const r = await wp({ action: "nskfmt", sheet: b.dataset.nskfmt, on: on ? "1" : "0" }); if (r.error) throw new Error(r.error); toast(on ? "✔ Новый чек-лист VVCAM включён" : "✔ Прежние категории возвращены"); load({ force: true }); }
  catch(e){ toast("Не получилось: " + e.message, true); b.disabled = false; }
}, true);
function nskLatestOn(){ return (state.pblocks||[]).some(b=>b.city==="Новосибирск" && b.week===state.serverLatest && b.fmt==="nsk") || (state.rows||[]).some(r=>r.city==="Новосибирск" && r.week===state.serverLatest && isNskRow(r)); }
function pmListFor(it, br){ if (br) return catsOf(br); return (it && it.city === "Новосибирск" && nskLatestOn()) ? CATS_NSK : CATS; }
function pmListK(k){ const c = typeof pmFindCard === "function" ? pmFindCard(k) : null; return c ? pmListFor(c.it, c.br) : CATS; }
const PMX_CHEV = '<svg class="pmx-chev" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
const PMX_EYE = '<svg class="pmx-eye" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z"/></svg>';
const PMX_TICK = '<svg class="pmx-tick" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';
function pmxStrip(t){ return String(t||"").replace(/^\s*(✅|❌|⚠️?|🟠|🔴)\s*/, "").trim(); }
function pmxSegs(cats, sts, wide, names){
  return '<span class="pmx-segs' + (wide ? " wide" : "") + '" aria-hidden="true">' + (names || CATS).map((n,j)=>{ const s = sts ? sts[j] : catState((cats||[])[j]||""); return '<i class="' + (s ? "s-" + s : "") + '" title="' + esc(n) + (s ? " — " + ST_LBL[s] : "") + '"></i>'; }).join("") + '</span>';
}
function pmxIco(s){ return s==="ok" ? '<b class="pmx-i ok" title="норма">✓</b>' : s==="warn" ? '<b class="pmx-i warn" title="замечание">!</b>' : s==="bad" ? '<b class="pmx-i bad" title="плохо">✕</b>' : '<b class="pmx-i">—</b>'; }
function pmxVk(v){ return v ? (VMAP[v]||"warn") : "none"; }
function pmxVl(v){ return v==="замечание" ? "замечания" : (v || "не проверено"); }
function pmxTeams(n){ const a = n % 10, b = n % 100; return a===1 && b!==11 ? "команда" : a>=2 && a<=4 && (b<12 || b>14) ? "команды" : "команд"; }
function pmxName(r){ return (r.opName||r.opNick||"—") + " · " + (r.model||"—"); }
function pmxThumbClicks(sel){
  document.querySelectorAll(sel).forEach(im=>{
    if (im.onclick) return;
    im.onclick = ()=>{
      document.getElementById("cam-title").textContent = (im.getAttribute("data-cat") || "скрин");
      const ai = document.getElementById("cam-ai"); if (ai) ai.style.display = "none";
      const ao = document.getElementById("cam-aiout"); if (ao) ao.style.display = "none";
      camShow(im.getAttribute("src") || BLANK, true);
      openModal("cammodal");
      camLoadFull(driveId(im.getAttribute("data-full") || ""));
    };
  });
}

// ---------- 2b: «Разборы» продюсера — что смотрящий написал по его командам (только чтение) ----------
function renderProdReviews(rows){
  document.getElementById("pbar").innerHTML = "";
  const tms = r => { const d = parseUpd(r.updated); return d ? d.getTime() : 0; };
  const list = rows.filter(r=>r.opName||r.opNick||r.model).slice().sort((a,b)=>tms(b)-tms(a));
  const thumbs = r => {
    const scr = ((state.screens||{})[skey(r)] || []).filter(s=>!isAdvCat(s.cat)); // фото советов — под своими категориями
    return scr.length ? `<div class="scrow">${scr.map(s=>`<span class="sthumb" title="${esc((s.cat?s.cat+" · ":"")+(s.ts||""))}"><img loading="lazy" decoding="async" src="${esc((state.thumbData||{})[s.mini||s.link] || (s.mini ? BLANK : driveThumb(s.link,thumbPx(96))))}" data-tk="${esc(s.mini||s.link)}" data-full="${esc(s.link)}" data-cat="${esc(s.cat||"скрин")}" alt="скрин"></span>`).join("")}</div>` : "";
  };
  const card = r => {
    const s = rowStats(r), vk = pmxVk(s.verdict);
    const rsp = recoSplit(r.reco, catsOf(r));
    const allScr = (state.screens||{})[skey(r)] || [];
    const cats = catsOf(r).map((n,j)=>{ const t = (r.cats[j]||"").trim(), aScr = allScr.filter(x=>String(x.cat)===ADV_CAT(n)); if (!t && !rsp.adv[j] && !aScr.length) return "";
      const aTh = aScr.length ? `<div class="scrow">${aScr.map(x=>`<span class="sthumb" title="${esc(x.ts||"")}"><img loading="lazy" decoding="async" src="${esc((state.thumbData||{})[x.mini||x.link] || (x.mini ? BLANK : driveThumb(x.link,thumbPx(96))))}" data-tk="${esc(x.mini||x.link)}" data-full="${esc(x.link)}" alt="фото к совету: ${esc(n)}" data-cat="${esc(ADV_CAT(n))}"></span>`).join("")}</div>` : "";
      return `<div class="pmx-rv-row" data-st="${s.st[j]||""}">${pmxIco(s.st[j])}<b>${esc(n)}</b><div class="pmx-rv-content">${isNskRow(r) ? nskRoBody(r, j, t, esc) : `<span class="utext">${esc(pmxStrip(t) || (s.st[j]==="ok" ? "всё хорошо" : ST_LBL[s.st[j]] || "не отмечено"))}</span>`}</div>${rsp.adv[j] || aScr.length ? `<div class="adv-ro"><b>💡 Совет</b>${rsp.adv[j] ? `<span class="utext">${esc(rsp.adv[j])}</span>` : ""}${aTh}</div>` : ""}</div>`; }).join("");
    const extra = (r.obs ? `<div class="pmx-rv-x"><b>Доп. комментарий</b><span class="utext">${esc(r.obs)}</span></div>` : "")
      + (rsp.gen ? `<div class="pmx-rv-x reco"><b>Рекомендации</b><span class="utext">${esc(rsp.gen)}</span></div>` : "");
    return `<article class="pmx-rv" data-skey="${esc(skey(r))}">
      <div class="pmx-rv-h"><b class="pmx-pname">${teamBadges(r)}${esc(pmxName(r))}</b><span class="pmx-faint">${esc([r.opName ? r.opNick : "", coLbl(r.city), r.week || ""].filter(Boolean).join(" · "))}</span>
        <span class="pmx-vd v-${vk}">${esc(pmxVl(s.verdict))}</span><span class="pmx-sp"></span>
        ${s.score!==null ? pmxSegs(null, s.st, false, catsOf(r)) + `<b class="pmx-score v-${vk}">${fmtSc(s.score)}/${MAX_SCORE}</b>` : ""}</div>
      <div class="pmx-faint pmx-rv-when">${r.updated ? "разбор смотрящего · " + esc(fmtDay(r.updated)) : "ещё не проверялась"}</div>
      ${cats || extra ? `<div class="pmx-rv-b">${cats}${extra}</div>` : '<div class="empty">Разбора пока нет</div>'}
      ${thumbs(r)}
    </article>`;
  };
  document.getElementById("content").innerHTML = `
    <div class="pmx-head"><h1>Разборы смотрящего</h1><span class="pmx-sub">команд: ${list.length} · свежие сверху</span><span class="pmx-sp"></span>
      <button class="pmx-sec" id="pr-table" title="вернуться на главную">Главная</button><button class="pmx-sec" id="pr-tbl" title="таблица команд с фильтрами и поиском">Таблица и поиск</button></div>
    ${list.length ? `<div class="pmx-rvlist">${list.map(card).join("")}</div>` : `<div class="empty">${esc(emptyReason())}</div>`}`;
  const tb = document.getElementById("pr-table");
  if (tb) tb.onclick = ()=>{ state.prodHomeTable = false; prodModeSet("overview"); render(); };
  const tt = document.getElementById("pr-tbl");
  if (tt) tt.onclick = ()=>{ state.prodHomeTable = true; prodModeSet("overview"); render(); };
  // Обновление 5: в «Разборах» продюсера миниатюры открываются в полном размере
  pmxThumbClicks("#main .sthumb img[data-full], .maincol .sthumb img[data-full], #content .pmx-rv .sthumb img[data-full]");
  if (state.prodRevFocus){
    const f = state.prodRevFocus; state.prodRevFocus = "";
    const el = [...document.querySelectorAll("#content .pmx-rv")].find(x=>x.dataset.skey===f);
    if (el){ el.classList.add("pmx-flash"); setTimeout(()=>el.scrollIntoView({ block: "start", behavior: "smooth" }), 30); }
  }
  setTimeout(ensureThumbs, 30);
}

// ---------- v7: главная продюсера («Мои команды») ----------
function renderProdHome(rows){
  document.getElementById("pbar").innerHTML = "";
  const box = document.getElementById("content");
  const teams = rows.filter(r=>r.opName||r.opNick||r.model);
  const wl = [...new Set(teams.map(r=>r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b));
  const curW = wl[wl.length-1] || "";
  const S = teams.map(r=>({ r, s: rowStats(r) }));
  const withS = S.filter(x=>x.s.score!==null);
  const avg = withS.length ? pct(withS.reduce((a,x)=>a+x.s.score,0)/withS.length) : null;
  let delta = "";
  const allW = [...new Set((state.rows||[]).map(r=>r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b));
  const wi = allW.indexOf(curW);
  if (wl.length === 1 && wi > 0 && avg !== null){
    const pS = dedupeRows((state.rows||[]).filter(r=>r.week===allW[wi-1] && (r.opName||r.opNick||r.model))).map(rowStats).filter(x=>x.score!==null);
    if (pS.length){ const d = avg - pct(pS.reduce((a,x)=>a+x.score,0)/pS.length);
      delta = d ? `<span class="${d>0?"up":"down"}">${d>0?"▲ +":"▼ −"}${Math.abs(d)} п.</span> к прошлой неделе` : "как на прошлой неделе"; }
  }
  const nCrit = withS.filter(x=>x.s.verdict==="критично").length, nOk = withS.filter(x=>x.s.verdict==="норма").length, nNone = S.length - withS.length;
  // мой мониторинг: покрытие недели (данные — то же чтение pmread)
  const pm = state.pm || {};
  if (pmCanUse() && !pm.at && !pm.loading && !state.pmxHomeTried){
    state.pmxHomeTried = true;
    loadPM({ quiet: true }).then(()=>{ if (AUTH.prod && state.tab===prodTabName() && prodModeGet()!=="reviews") softRender(); });
  }
  const cv = pm.at ? pmCoverage(pmBaseTeams(pm.week), pm.items||[]) : null;
  const cpc = cv && cv.total ? Math.round(cv.done*100/cv.total) : 0;
  // что исправить
  const todo = [];
  (state.tasks||[]).filter(t=>t.status!=="сделана" && !t.orphan).forEach(t=>todo.push({ kind:"задача", k:"warn", title: t.text,
    meta: [t.nick || t.model ? (t.nick||"—") + " · " + (t.model||"—") : (t.team||""), (t.from||t.by) ? "от " + (t.from||t.by) : "", t.when ? fmtDay(t.when) : ""].filter(Boolean).join(" · "),
    btn: `<button class="pmx-pri" data-phdone="1" data-row="${esc(t.row)}" data-tkey="${esc(t.key||"")}">Сделано</button>` }));
  (pm.items||[]).filter(it=>it.status==="возврат").forEach(it=>todo.push({ kind:"возврат", k:"warn",
    title: (it.opName||it.nick||"—") + " · " + (it.model||"—") + " — доделать разбор", meta: it.note ? "смотрящий: «" + it.note + "»" : "смотрящий вернул мониторинг",
    btn: `<button class="pmx-sec" data-phmon="${esc(pmCardKey(it))}">Доделать</button>` }));
  S.filter(x=>x.s.verdict==="критично").forEach(x=>{ const f = pmxShort(x.r).filter((n,j)=>x.s.st[j]==="bad");
    todo.push({ kind:"критично", k:"bad", title: pmxName(x.r) + " — " + fmtSc(x.s.score) + "/" + MAX_SCORE, meta: f.length ? "плохо: " + f.join(", ") : "",
      btn: `<button class="pmx-sec" data-phrev="${esc(skey(x.r))}">Разбор</button>` }); });
  const bcNames = catNamesFor(withS); // v7.7: по названию
  const badCnt = bcNames.map(n=>withS.filter(x=>isDev(stByName(x.r, x.s.st, n))).length);
  const mx = Math.max(0, ...badCnt);
  if (mx >= 2){ const j = badCnt.indexOf(mx);
    todo.push({ kind:"совет", k:"acc", title: "Чаще всего проваливают «" + bcNames[j] + "»", meta: mx + " " + pmxTeams(mx) + " из " + withS.length + " · подсказки в «Рекомендациях»",
      btn: `<button class="pmx-sec" data-phgo="Рекомендации">Читать</button>` }); }
  const todoHtml = todo.map(t=>`<div class="pmx-todo-i"><span class="pmx-kind k-${t.k}">${esc(t.kind)}</span><span class="pmx-todo-t"><b>${esc(t.title)}</b>${t.meta ? `<span>${esc(t.meta)}</span>` : ""}</span>${t.btn}</div>`).join("");
  // карточки команд: критичные сверху
  const vOrd = { "критично":0, "замечание":1, "норма":2 };
  const cards = S.slice().sort((a,b)=>((a.s.verdict in vOrd ? vOrd[a.s.verdict] : 3) - (b.s.verdict in vOrd ? vOrd[b.s.verdict] : 3)) || pmxName(a.r).localeCompare(pmxName(b.r), "ru")).map(x=>{
    const r = x.r, s = x.s, vk = pmxVk(s.verdict);
    const fails = pmxShort(r).filter((n,j)=>s.st[j]==="bad"), warns = pmxShort(r).filter((n,j)=>s.st[j]==="warn");
    return `<article class="pmx-tm">
      <div class="pmx-tm-h"><b class="pmx-pname">${teamBadges(r)}${esc(pmxName(r))}</b>${r.opName && r.opNick ? `<span class="pmx-faint">${esc(r.opNick)}</span>` : ""}<span class="pmx-sp"></span><span class="pmx-vd v-${vk}">${esc(pmxVl(s.verdict))}</span></div>
      <div class="pmx-tm-bar">${pmxSegs(null, s.st, true, catsOf(r))}<b class="pmx-score v-${vk}">${s.score!==null ? fmtSc(s.score) + "/" + MAX_SCORE : "—"}</b></div>
      <div class="pmx-tm-f">${s.score===null ? "ещё не проверялась" : fails.length || warns.length ? [fails.length ? "плохо: " + esc(fails.join(", ")) : "", warns.length ? "замечания: " + esc(warns.join(", ")) : ""].filter(Boolean).join(" · ") : "без замечаний"}</div>
      <div class="pmx-tm-reco">${r.reco ? recoHtml(r.reco, catsOf(r)) : "Рекомендаций нет"}</div>
      <div class="pmx-tm-foot"><span>${r.updated ? "разбор смотрящего · " + esc(fmtDay(r.updated)) : "разбора ещё нет"}</span><button class="pmx-sec" data-phrev="${esc(skey(r))}">Открыть разбор</button></div>
    </article>`;
  }).join("");
  box.innerHTML = `
    <div class="pmx-head"><h1>Мои команды</h1>${curW ? `<span class="pmx-sub">неделя ${esc(curW)}</span>` : ""}<span class="pmx-sp"></span>
      <button class="pmx-sec" data-phrevall="1" title="все разборы смотрящего карточками">Все разборы</button><button class="pmx-sec" data-phtable="1" title="таблица команд с фильтрами и поиском">Таблица и поиск</button></div>
    <div class="pmx-hgrid">
      <section class="pmx-todo"><div class="pmx-todo-h"><span class="pmx-dot${todo.length ? "" : " ok"}"></span><h2>Что исправить на этой неделе</h2></div>
        ${todoHtml || '<div class="pmx-emptybox">Исправлять нечего — задач, возвратов и критичных команд нет</div>'}</section>
      <section class="pmx-side">
        <div class="pmx-kpis">
          <div class="pmx-kpi"><div class="n">${avg!==null ? avg + "%" : "–"}</div><div class="l">Средняя оценка</div><div class="d">${delta}</div></div>
          <div class="pmx-kpi"><div class="n${nCrit ? " bad" : ""}">${nCrit} <small>из ${S.length}</small></div><div class="l">Команд критично</div><div class="d">${nOk} в норме${nNone ? " · " + nNone + " не проверено" : ""}</div></div>
        </div>
        ${pmCanUse() ? `<button class="pmx-moncard" data-phmon=""><span class="pmx-mc-h"><b>Мой мониторинг</b><span class="pmx-faint">${cv ? `проверено мной ${cv.done} из ${cv.total}` : pm.err ? "не загрузился" : "загружаю…"}</span><span class="pmx-mc-go">Продолжить →</span></span><span class="pmx-bar"><i style="width:${cpc}%"></i></span></button>` : ""}
      </section>
    </div>
    ${cards ? `<section class="pmx-tms">${cards}</section>` : `<div class="empty">${esc(emptyReason())}</div>`}`;
  box.querySelectorAll("[data-phrev]").forEach(b=>b.onclick=()=>{ state.prodRevFocus = b.dataset.phrev; prodModeSet("reviews"); render(); });
  box.querySelectorAll("[data-phrevall]").forEach(b=>b.onclick=()=>{ prodModeSet("reviews"); render(); });
  box.querySelectorAll("[data-phtable]").forEach(b=>b.onclick=()=>{ state.prodHomeTable = true; render(); });
  box.querySelectorAll("[data-phmon]").forEach(b=>b.onclick=()=>{ const k = b.dataset.phmon; if (k){ state.pmOpen = state.pmOpen || {}; state.pmOpen[k] = true; state.pmFilter = "all"; } switchTab(PM_TAB_PROD); });
  box.querySelectorAll("[data-phgo]").forEach(b=>b.onclick=()=>switchTab(b.dataset.phgo));
  box.querySelectorAll("[data-phdone]").forEach(b=>b.onclick=async (ev)=>{ // то же действие, что «сделано» в «Мои задачи»
    ev.stopPropagation();
    try { const r = await wp({ action:"taskdone", row: b.dataset.row, tkey: b.dataset.tkey }); if (r.error) throw new Error(r.error); toast("✅ Отмечено сделанным"); setTimeout(load, 500); }
    catch(e){ toast("Ошибка: "+e.message, true); }
  });
}
// «Таблица и поиск» на главной продюсера живёт до перехода на вкладку заново
switchTab = (function(orig){ return function(t){ if (AUTH.prod && t === prodTabName()) state.prodHomeTable = false; return orig.apply(this, arguments); }; })(switchTab);

// ===================== v6: МОНИТОРИНГ ПРОДЮСЕРА =====================
// Продюсер ведёт свой мониторинг своих команд («📋 Мой мониторинг»), смотрящий видит его во вкладке
// «📋 Мониторинг продюсеров»: правит, принимает, возвращает с замечанием. Разборы смотрящего и листы недель не меняются.
// Данные — сервер (pmread/pmsave/...), набранный текст живёт в state.pmEdits + localStorage, пока не сохранён.
const PM_TAB_PROD = "Мой мониторинг", PM_TAB_ED = "Мониторинг продюсеров";
const PM_ST_CLS = { "черновик":"", "отправлено":"pt-warn", "принято":"pt-ok", "возврат":"pt-bad", "скрыта":"" };
const PM_ST_LBL_ED = { "черновик":"начат (пусто)", "отправлено":"новый", "принято":"принято", "возврат":"возврат", "скрыта":"скрыта" };
const PM_ST_LBL_PR = { "черновик":"черновик", "отправлено":"видно смотрящему", "принято":"принято", "возврат":"возврат", "скрыта":"скрыта" };
function pmStLbl(st){ return (AUTH.prod ? PM_ST_LBL_PR : PM_ST_LBL_ED)[st] || "не начат"; }
function pmTabName(){ return AUTH.prod ? PM_TAB_PROD : PM_TAB_ED; }
function pmIsTab(t){ return t === PM_TAB_PROD || t === PM_TAB_ED; }
function pmCanUse(){ return AUTH.prod || AUTH.edit; }
// чистая: ключ карточки — id записи или «b:<ключ команды недели>», пока записи ещё нет
function pmCardKey(it, baseKey){ const b = baseKey || (it && it.base) || ""; return b ? "b:" + b : (it && it.id) || ""; } // v6.1: ключ не меняется после первого сохранения
// чистая: есть ли в записи хоть одна заполненная категория
function pmChecked(it){ return !!(it && it.status !== "скрыта" && (it.cats||[]).some(c=>String(c||"").trim())); }
// чистая: полнота разбора — сколько из 9 категорий заполнено и каких не хватает
function pmFill(cats, list){
  const miss = [], L = list || CATS;
  for (let j = 0; j < 9; j++) if (!String((cats||[])[j]||"").trim()) miss.push(L[j] || ("№" + (j+1)));
  return { n: 9 - miss.length, miss, full: miss.length === 0 };
}
function pmFillTag(cats){
  const f = pmFill(cats);
  if (!f.n) return '<span class="ptag">не проверено</span>';
  if (f.full) return '<span class="ptag pt-ok" title="заполнены все 9 категорий">✅ полный разбор</span>';
  return `<span class="ptag pt-warn" title="не заполнено: ${esc(f.miss.join(", "))}">⏳ не доделано ${f.n}/9</span>`;
}
// чистая: расхождения продюсера со смотрящим по 9 категориям (оба поставили оценку, и она разная)
//   miss — продюсер мягче смотрящего (недосмотрел: «норма» при «замечании», «замечание» при «плохо»); strict — строже
const ST_RANK = { ok: 0, warn: 1, bad: 2 };
const isDev = v => v === "warn" || v === "bad"; // v7.2: отклонение — замечание или плохо
const ST_LBL = { ok: "норма", warn: "замечание", bad: "плохо" };
function pmDiff(pmCats, mineSt){
  const out = { miss: [], strict: [] };
  for (let j = 0; j < 9; j++){
    const a = catState((pmCats||[])[j] || ""), b = (mineSt||[])[j] || null;
    if (!a || !b || a === b) continue;
    (ST_RANK[a] < ST_RANK[b] ? out.miss : out.strict).push(j);
  }
  return out;
}
// чистая: покрытие недели — сколько команд продюсера проверено им самим
//   base: [{key}] команды недели; items: записи мониторинга
function pmCoverage(base, items){
  const byBase = {}; (items||[]).forEach(it=>{ if (it.base) byBase[it.base] = it; });
  let total = 0, done = 0;
  (base||[]).forEach(b=>{ const it = byBase[b.key]; if (it && it.status === "скрыта") return; total++; if (pmChecked(it)) done++; });
  (items||[]).forEach(it=>{ if (it.status === "скрыта") return; if (it.base && (base||[]).some(b=>b.key===it.base)) return; total++; if (pmChecked(it)) done++; });
  return { done, total };
}
// команды недели по продюсерам (из основного чтения): [{key, r}]
function pmBaseTeams(week, producer){
  const src = (viewAsActive() && realData && !AUTH.prod) ? realData.rows : state.rows;
  const seen = {}, out = [];
  src.forEach(r=>{
    if (r.week !== week) return;
    if (producer && r.producer !== producer) return;
    const k = skey(r); if (seen[k]) return; seen[k] = 1;
    out.push({ key: k, r });
  });
  return out;
}
function pmMineRow(baseKey){ return baseKey ? (state.rows.find(r=>skey(r)===baseKey) || (realData && realData.rows || []).find(r=>skey(r)===baseKey) || null) : null; }

// ---------- загрузка ----------
async function loadPM(opts){
  opts = opts || {};
  if (!AUTH.ok() || !pmCanUse()) return;
  const pm = state.pm = state.pm || {};
  if (pm.loading) return pm.loading;
  const week = opts.week !== undefined ? opts.week : (pm.week || "");
  pm.loading = wp({ action:"pmread", week: week }, 60000).then(r=>{
    pm.week = r.week; pm.latest = r.latest; pm.weeks = r.weeks || []; pm.items = r.items || []; pm.screens = r.screens || {}; pm.asks = r.asks || [];
    pm.editable = !!r.editable; pm.err = ""; pm.at = Date.now(); state.pmNoAuto = {}; // свежие данные — автосохранение снова можно
    pmBadgeFromItems();
  }).catch(e=>{ pm.err = e.message; }).finally(()=>{ pm.loading = null; if (!opts.quiet || pmIsTab(state.tab)) softRender(); });
  return pm.loading;
}
function pmBadgeFromItems(){
  const it = (state.pm && state.pm.items) || [];
  if (AUTH.prod) state.pmBadge = it.filter(x=>x.status==="возврат").length;
  else if (AUTH.edit) state.pmBadge = it.filter(x=>x.status==="отправлено").length;
}
// ---------- черновики формы (не теряются при автообновлении и перезагрузке) ----------
function pmEditKey(k){ return "pmdraft:" + AUTH.user + ":" + k; }
function pmGetEdit(k){
  state.pmEdits = state.pmEdits || {};
  if (k in state.pmEdits) return state.pmEdits[k];
  let d = null; try { d = JSON.parse(localStorage.getItem(pmEditKey(k)) || "null"); } catch(e){}
  state.pmEdits[k] = d; return d;
}
function pmSetEdit(k, d){
  state.pmEdits = state.pmEdits || {}; state.pmEdits[k] = d;
  try { if (d) localStorage.setItem(pmEditKey(k), JSON.stringify(d)); else localStorage.removeItem(pmEditKey(k)); } catch(e){}
}
function pmFormVals(k, it, br){ // значения формы: черновик → запись → команда недели
  const d = pmGetEdit(k);
  const src = it || {};
  const base = br || {};
  const v = {
    nick: src.id ? src.nick : (base.opNick || ""), opname: src.id ? src.opName : (base.opName || ""), model: src.id ? src.model : (base.model || ""),
    links: src.id ? src.linksTxt : (base.linksTxt || ""), comment: src.comment || "", cats: (src.cats || []).slice()
  };
  while (v.cats.length < 9) v.cats.push("");
  if (d){ ["nick","opname","model","links","comment"].forEach(f=>{ if (d[f] !== undefined) v[f] = d[f]; }); for (let j=0;j<9;j++) if (d["f"+j] !== undefined) v.cats[j] = d["f"+j]; }
  return v;
}
function pmDirty(k){ return !!pmGetEdit(k); }

// ---------- отрисовка (v7) ----------
// поля формы мониторинга (id полей — как раньше: pm<hash>_<0..8|nick|opname|model|links|comment>)
function pmxForm(c, v, k, kid, canEdit, mineSt, dif, scr, it){
  const dis = canEdit ? "" : "disabled";
  const inp = (id, val, ph) => `<input id="${id}" ${dis} value="${esc(val)}" placeholder="${esc(ph)}" aria-label="${esc(ph)}">`;
  const mk = "m:" + k;
  const meta = `<details class="pmx-meta" data-pmedit="${esc(mk)}" ${(state.pmEditOpen||{})[mk] ? "open" : ""}><summary>Команда и ссылки <span class="pmx-faint">${esc([v.nick, v.opname, v.model].filter(Boolean).join(" · ") || "не указано")}</span></summary>
    <div class="pmx-inps">${inp("pm"+kid+"_nick", v.nick, "ник опера")}${inp("pm"+kid+"_opname", v.opname, "опер")}${inp("pm"+kid+"_model", v.model, "модель")}</div>
    <label class="pmx-lbl" for="pm${kid}_links">Ссылки — одна в строке: «CB = https://chaturbate.com/…»</label><textarea id="pm${kid}_links" class="pmx-ta" rows="1" ${dis} placeholder="CB = https://chaturbate.com/имя">${esc(v.links)}</textarea></details>`;
  const pmL2 = pmListFor(it, c && c.br), nskF = pmL2 === CATS_NSK;
  const cats = pmL2.map((n,j)=>{
    const id = "pm" + kid + "_" + j, val = v.cats[j] || "";
    const myS = catState(val), hisS = mineSt ? mineSt[j] : null;
    const miss = dif.miss.includes(j), strict = dif.strict.includes(j);
    const hint = hisS && (miss || strict) ? `<span class="pmx-hint${miss ? " miss" : strict ? " strict" : ""}">смотрящий: ${ST_LBL[hisS] || "—"}${miss ? " · продюсер пропустил" : strict ? " · продюсер строже" : ""}</span>` : "";
    const sc = scr.filter(s=>String(s.cat)===n);
    return `<div class="pmx-cat" data-j="${j}" data-st="${myS||""}"${miss ? ' data-dif="miss"' : strict ? ' data-dif="strict"' : ""}>
      <div class="pmx-cat-h"><span class="pmx-num">${j+1}</span><b class="pmx-cname">${esc(n)}${hint}</b>
      ${canEdit ? `<span class="pmx-segbtn" role="group" aria-label="${esc(n)}: уровень">${segBtns(`data-pmta="${id}"`, myS, "pmq")}</span><button class="qbtn pmq qclr pmx-clr" data-pmta="${id}" data-v="" title="очистить поле" aria-label="очистить поле">⌫</button>` : `<span class="pmx-ro">${pmxIco(myS)}</span>`}
      <span class="pmx-sp"></span>
      ${canEdit ? `<button class="pmx-shot" data-pmupl="${esc(k)}" data-pmc="${j}" title="прикрепить скрин к «${esc(n)}»">Скрин</button>` : ""}</div>
      ${nskF ? `<div class="nsk-hint pm">${esc(NSK_HINT[j])}${j === NSK_GOALS ? " · строки: «🎯 гол | цена тк | онлайн онл»" : j === NSK_SCALE ? " · напиши «Оценка N/5»" : ""}</div>` : ""}
      <textarea id="${id}" class="pmx-ta" rows="2" ${dis} placeholder="что увидел — пиши подробно, поле растёт" aria-label="Комментарий: ${esc(n)}">${esc(val)}</textarea>
      ${pmThumbs(sc, it, canEdit)}</div>`;
  }).join("");
  const gen = `<div class="pmx-cat pmx-gen"><div class="pmx-cat-h"><b class="pmx-cname">Общий комментарий${canEdit ? '<span class="pmx-hint">скрин можно вставить Ctrl+V прямо в поле категории — он встанет в неё</span>' : ""}</b><span class="pmx-sp"></span>${canEdit ? `<button class="pmx-shot" data-pmupl="${esc(k)}" data-pmc="G">Общее фото</button>` : ""}</div>
    <textarea id="pm${kid}_comment" class="pmx-ta" rows="2" ${dis} placeholder="общее по команде" aria-label="Общий комментарий">${esc(v.comment)}</textarea>
    ${pmThumbs(scr.filter(s=>!CATS_ALL.includes(String(s.cat))), it, canEdit)}</div>`;
  return meta + `<div class="pmx-cats">${cats}${gen}</div>`;
}
function pmCardHtml(c, canEdit, isEd){
  const it = c.it, br = c.br, k = c.k;
  const v = pmFormVals(k, it, br);
  const st = (it && it.status) || "не начат";
  const mine = pmMineRow(it ? it.base : c.baseKey);
  const mineSt = mine ? rowStats(mine).st : null;
  const dif = pmDiff(v.cats, mineSt);
  const nDif = dif.miss.length + dif.strict.length;
  const open = !!(state.pmOpen||{})[k];
  const scr = it && it.id ? ((state.pm.screens||{})["PM|" + it.id] || []) : [];
  const pmL = pmListFor(it, br);
  const fill = pmFill(v.cats, pmL);
  const kid = strHash(k);
  const city = (it && it.city) || (br && br.city) || "";
  const isAdded = it ? !it.base : !c.baseKey;
  const hidden = !!(it && it.status === "скрыта");
  const chip = `<span class="pmx-st" data-s="${esc(st)}">${esc(pmStLbl(st))}</span>`;
  const dirty = pmDirty(k) ? '<span class="pmx-dirty" title="есть несохранённые правки (они в черновике)">✎</span>' : "";
  const segs = pmxSegs(v.cats, null, false, pmL) + `<small class="pmx-fn">${fill.n} из 9</small>`;
  const badges = (br || mine) ? teamBadges(br || mine) : "";
  const form = pmxForm(c, v, k, kid, canEdit, mineSt, dif, scr, it);
  if (isEd){
    const title = (v.opname || v.nick || "—") + " / " + (v.model || "—");
    const sub = [city ? `<span class="pmx-co" style="color:${PMX_CO[city]||"var(--dim)"}">${esc(coLbl(city))}</span>` : "", it && it.producer ? esc(it.producer) : "", isAdded ? "своя команда" : ""].filter(Boolean).join(" · ");
    const upd = it && it.updated ? esc(fmtDay(it.updated)) + (it.who ? `<small>${esc(it.who)}</small>` : "") : '<span class="pmx-faint">—</span>';
    const difCell = nDif ? `<span class="pmx-dif" title="категорий, где оценки продюсера и твои разные">≠ ${nDif}</span>` : (mine && fill.n ? '<span class="pmx-faint">совпадает</span>' : '<span class="pmx-faint">—</span>');
    const head = `<div class="pmhead pmx-row${open ? " on" : ""}" data-pmk="${esc(k)}" title="${open ? "свернуть" : "открыть разбор"}">
      <span class="pmx-c-team"><b>${badges}${esc(title)}</b><small>${sub}</small></span>
      <span class="pmx-c-st">${chip}</span>
      <span class="pmx-c-fill">${segs}</span>
      <span class="pmx-c-dif">${difCell}${dirty}</span>
      <span class="pmx-c-upd">${upd}</span>
      <span class="pmx-c-btn"><button class="pmx-link" data-pmtoggle="${esc(k)}">${open ? "свернуть" : "открыть"}</button></span></div>`;
    if (!open) return `<div class="pmcard pmx-erow">${head}</div>`;
    const note = st === "возврат" && it && it.note ? `<div class="pmx-note"><b>↩ Ты вернул:</b> <span class="utext">${esc(it.note)}</span></div>` : "";
    const cmp = `<div class="pmx-cmp"><div class="pmx-cr pmx-ch"><span>Категория</span><span>Продюсер${it && it.producer ? " · " + esc(it.producer) : ""}</span><span>Твой разбор</span></div>` + pmL.map((n,j)=>{
      const pS = catState(v.cats[j]||""), mS = mineSt ? mineSt[j] : null;
      const miss = dif.miss.includes(j), strict = dif.strict.includes(j);
      const pT = pmxStrip(v.cats[j]) || (pS==="ok" ? "всё хорошо" : ST_LBL[pS] || "не заполнено");
      const mT = !mine ? "нет разбора" : (pmxStrip(mine.cats[j]) || (ST_LBL[mS] || "не проверено"));
      return `<div class="pmx-cr${miss ? " miss" : strict ? " strict" : ""}"><span class="pmx-cn">${esc(n)}${miss ? "<small>продюсер пропустил</small>" : strict ? "<small>продюсер строже</small>" : ""}</span><span class="pmx-cv">${pmxIco(pS)}<span class="utext">${esc(pT)}</span></span><span class="pmx-cv">${pmxIco(mS)}<span class="utext">${esc(mT)}</span></span></div>`;
    }).join("") + (String(v.comment||"").trim() ? `<div class="pmx-cr pmx-cgen"><span class="pmx-cn">Общий комментарий</span><span class="pmx-cv utext">${esc(v.comment)}</span></div>` : "") + `</div>`;
    const canAct = AUTH.edit && !viewAsActive() && it && it.status !== "скрыта";
    const retBox = it ? `<div id="pmret${esc(it.id)}" class="pmx-retbox" style="display:${pmBoxOpen("ret"+it.id) ? "" : "none"}"><textarea id="pmretta${strHash(it.id)}" data-pmbox="ret${esc(it.id)}" class="pmx-ta" ${canEdit ? "" : "disabled"} placeholder="Что доделать продюсеру — он увидит это в карточке">${esc(pmBoxVal("ret"+it.id, it.note||""))}</textarea><button class="pmx-pri" data-pmretgo="${esc(it.id)}">Отправить возврат</button></div>` : "";
    const acts = `<div class="pmx-acts">${canAct ? (it.status !== "принято" ? `<button class="pmx-pri" data-pmacc="${esc(it.id)}">Принять</button>` : `<button class="pmx-sec" data-pmreopen="${esc(it.id)}">Открыть снова</button>`)
        + `<button class="pmx-sec" data-pmret="${esc(it.id)}">Вернуть с комментарием</button>`
        + (mine ? `<button class="pmx-sec" data-pmtake="${esc(k)}" title="перенести оценки продюсера в ТВОЙ разбор этой команды как черновик (в таблицу — только по «Сохранить»)">Взять в свой разбор</button>` : "") : ""}
      <span class="pmx-sp"></span><span class="pmfoot"><button class="pmx-ghost" data-pmtoggle="${esc(k)}">Свернуть</button></span></div>`;
    const ek = "e:" + k;
    const edit = `<details class="pmx-edit" data-pmedit="${esc(ek)}" ${(state.pmEditOpen||{})[ek] ? "open" : ""}><summary>${canEdit ? "Править запись продюсера" : "Запись продюсера целиком"}</summary>${form}${canAct ? `<div class="pmx-acts"><button class="pmx-pri" data-pmsave="${esc(k)}">Сохранить правки</button><span class="pmx-faint">продюсер увидит правки у себя</span></div>` : ""}</details>`;
    return `<div class="pmcard pmx-erow open" data-pmcard="${esc(k)}">${head}<div class="pmx-ebody">${note}${cmp}${pmThumbs(scr, it, false)}${retBox}${acts}${edit}</div></div>`;
  }
  // продюсер: карточка команды с формой по 9 категориям
  const name = (v.opname || v.nick || "—") + " · " + (v.model || "—");
  const head = `<div class="pmhead pmx-phead" data-pmk="${esc(k)}" title="${open ? "свернуть" : "открыть"}" aria-expanded="${open}">${PMX_CHEV}<b class="pmx-pname">${badges}${esc(name)}</b>${v.opname && v.nick ? `<span class="pmx-faint">${esc(v.nick)}</span>` : ""}${chip}${isAdded ? '<span class="pmx-faint">своя команда</span>' : ""}${nDif ? `<span class="pmx-dif" title="категорий, где твоя оценка и оценка смотрящего разные">≠ ${nDif}</span>` : ""}${dirty}<span class="pmx-sp"></span><span class="pmx-pfill">${segs}</span></div>`;
  if (!open) return `<section class="pmcard pmx-pcard">${head}</section>`;
  const note = st === "возврат" && it && it.note ? `<div class="pmx-note"><b>↩ Смотрящий вернул:</b> <span class="utext">${esc(it.note)}</span></div>` : "";
  const prodBtns = canEdit ? `<button class="pmx-pri" data-pmsave="${esc(k)}">${fill.full ? "Сохранить" : "Сохранить (" + fill.n + " из 9)"}</button>
      ${!isAdded && c.baseKey ? `<button class="pmx-sec" data-pmask="${esc(k)}" title="попросить смотрящего посмотреть эту команду">Попросить смотрящего посмотреть</button>` : ""}
      <span class="pmx-save">${PMX_TICK}<span id="pmas${esc(kid)}">${pmDirty(k) ? "есть несохранённое — сохранится само через пару секунд" : "сохраняется само" + (it && it.updated ? " · последнее " + esc(fmtDay(it.updated)) : "")}</span></span>
      <span class="pmx-sp"></span>
      ${isAdded ? `<button class="pmx-ghost" data-pmhide="${esc(k)}" data-del="1">Удалить команду</button>` : `<button class="pmx-ghost" data-pmhide="${esc(k)}">Убрать из моего мониторинга</button>`}`
    : `<span class="pmx-faint">${hidden ? "команда убрана из твоего мониторинга" : st === "принято" ? "смотрящий принял — правки закрыты" : "только просмотр"}</span><span class="pmx-sp"></span>`;
  const unhide = it && hidden && AUTH.prod && !viewAsActive() && state.pm.week === state.pm.latest ? `<button class="pmx-sec" data-pmunhide="${esc(it.id)}">Вернуть в мой мониторинг</button>` : "";
  const askBox = AUTH.prod && c.baseKey ? `<div id="pmaskbox${esc(kid)}" class="pmx-askbox" style="display:${pmBoxOpen("ask"+kid) ? "" : "none"}"><textarea id="pmaskta${esc(kid)}" data-pmbox="ask${esc(kid)}" class="pmx-ta" placeholder="на что посмотреть — например «проверь шоу вечером, модель жалуется»">${esc(pmBoxVal("ask"+kid, ""))}</textarea><button class="pmx-pri" data-pmasksend="${esc(k)}">Отправить смотрящему</button></div>` : "";
  return `<section class="pmcard pmx-pcard open" data-pmcard="${esc(k)}">${head}<div class="pmx-pbody">${note}${form}<div class="pmx-acts">${prodBtns}${unhide}<span class="pmfoot"><button class="pmx-ghost" data-pmtoggle="${esc(k)}">Свернуть</button></span></div>${askBox}</div></section>`;
}
// v6.6: открытые поля «попросить посмотреть» и «вернуть с замечанием» с текстом переживают автообновление
function pmBoxOpen(k){ return !!(state.pmBox && k in state.pmBox); }
function pmBoxVal(k, def){ return state.pmBox && typeof state.pmBox[k] === "string" ? state.pmBox[k] : def; }
function pmBoxToggle(k, el){ state.pmBox = state.pmBox || {}; if (k in state.pmBox) delete state.pmBox[k]; else state.pmBox[k] = null; if (el) el.style.display = k in state.pmBox ? "" : "none"; }
function pmThumbs(list, it, canEdit){
  if (!list || !list.length) return "";
  return `<div class="scrow">${list.map(s=>`<span class="sthumb" title="${esc((s.cat?s.cat+" · ":"")+(s.ts||""))}"><img loading="lazy" decoding="async" src="${esc((state.thumbData||{})[s.mini||s.link] || BLANK)}" data-tk="${esc(s.mini||s.link)}" data-full="${esc(s.link)}" data-cat="${esc(s.cat||"скрин")}" alt="скрин">${canEdit && it ? `<span class="sqx" data-pmdel="${esc(it.id)}" data-link="${esc(s.link)}" title="удалить скрин">✕</span>` : ""}</span>`).join("")}</div>`;
}
function pmCards(){ // список карточек текущего вида
  const pm = state.pm || {};
  const items = (pm.items || []).filter(it=> !(viewAsActive() && state.viewAs && state.viewAs.type==="prod") || it.producer === state.viewAs.name);
  const isEd = !AUTH.prod;
  const prodF = isEd ? (state.pmProd || "") : "";
  const base = AUTH.prod ? pmBaseTeams(pm.week) : pmBaseTeams(pm.week, prodF || null);
  const cards = [];
  const used = {};
  if (AUTH.prod){
    base.forEach(b=>{ const it = items.find(x=>x.base===b.key); if (it) used[it.id] = 1; cards.push({ k: pmCardKey(it, b.key), it: it || null, br: b.r, baseKey: b.key }); });
    items.forEach(it=>{ if (!used[it.id]) cards.push({ k: pmCardKey(it), it, br: null, baseKey: it.base || "" }); });
  } else {
    items.forEach(it=>{ if (prodF && it.producer !== prodF) return; cards.push({ k: pmCardKey(it), it, br: pmMineRow(it.base), baseKey: it.base || "" }); });
  }
  return { cards, items, base };
}
function renderPM(){
  document.getElementById("pbar").innerHTML = "";
  const box = document.getElementById("content");
  const pm = state.pm || {};
  const isEd = !AUTH.prod;
  const title = AUTH.prod ? "Мой мониторинг" : "Мониторинг продюсеров";
  const subT = AUTH.prod ? "твои проверки своих команд — смотрящий видит их сразу" : "как продюсеры сами проверяют свои команды · сверка с твоими разборами";
  if (!pm.at && !pm.err){ box.innerHTML = `<div class="pmx-head"><h1>${title}</h1><span class="pmx-sub">${subT}</span></div><div class="pmx-emptybox"><span class="v7spin"></span> Загружаю мониторинг…</div>`; loadPM(); return; }
  if (pm.at && Date.now() - pm.at > 120000 && !pm.loading) loadPM({ quiet: true }); // фоновое обновление раз в 2 минуты при открытой вкладке
  const canWrite = AUTH.prod && !viewAsActive() && pm.week === pm.latest;
  const { cards, items, base } = pmCards();
  const f = state.pmFilter || "all";
  const statusOf = c => c.it ? c.it.status : "не начат";
  const filt = c => f === "all" ? statusOf(c) !== "скрыта"
    : f === "todo" ? !pmChecked(c.it) && statusOf(c) !== "скрыта"
    : f === "part" ? statusOf(c) !== "скрыта" && (()=>{ const x = pmFill(pmFormVals(c.k, c.it, c.br).cats); return x.n > 0 && !x.full; })()
    : f === "full" ? statusOf(c) !== "скрыта" && pmFill(pmFormVals(c.k, c.it, c.br).cats).full
    : f === "diff" ? (()=>{ const m = pmMineRow(c.baseKey || (c.it && c.it.base)); if (!m) return false; const d = pmDiff(pmFormVals(c.k, c.it, c.br).cats, rowStats(m).st); return d.miss.length + d.strict.length > 0; })()
    : statusOf(c) === f;
  const shown = cards.filter(filt);
  const cnt = s => cards.filter(c=>statusOf(c)===s).length;
  const chips = isEd
    ? [["all","Все"],["отправлено","Новые · "+cnt("отправлено")],["возврат","Возврат · "+cnt("возврат")],["принято","Принято · "+cnt("принято")],["diff","Есть расхождения"],["part","Не доделаны"],["todo","Не проверены"],["full","Полные"],["скрыта","Скрытые · "+cnt("скрыта")]]
    : [["all","Все"],["todo","Не проверены"],["part","Не доделаны"],["full","Полные"],["отправлено","Видно смотрящему · "+cnt("отправлено")],["возврат","Вернули · "+cnt("возврат")],["принято","Принято · "+cnt("принято")],["diff","Есть расхождения"],["скрыта","Скрытые · "+cnt("скрыта")]];
  // покрытие: у продюсера — полоса, у смотрящего — карточки продюсеров с кольцом
  let covHtml = "";
  if (AUTH.prod){
    const cv = pmCoverage(base, items);
    const pc = cv.total ? Math.round(cv.done*100/cv.total) : 0;
    covHtml = `<section class="pmx-cov"><div class="pmx-cov-n"><span>Проверено мной за неделю</span><b>${cv.done} <small>из ${cv.total} ${pmxTeams(cv.total)}</small></b></div>
      <div class="pmx-bar big" role="progressbar" aria-valuenow="${pc}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pc}%"></i></div>
      <span class="pmx-cov-t">${pm.week === pm.latest ? "Неделя " + esc(pm.week || "") + " открыта · прошлые недели — только просмотр" : "Прошлая неделя — только просмотр"}<br>Пиши по категориям и прикладывай скрины — всё сохраняется само</span></section>`;
  } else {
    const prods = [...new Set(pmBaseTeams(pm.week).map(b=>b.r.producer).concat(items.map(i=>i.producer)).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ru"));
    const C = 2 * Math.PI * 19;
    covHtml = prods.length ? `<section class="pmx-prods">` + prods.map(p=>{
      const its = items.filter(i=>i.producer===p);
      const bt = pmBaseTeams(pm.week, p);
      const cv = pmCoverage(bt, its);
      const nd = its.reduce((a,i)=>{ const m = pmMineRow(i.base); if (!m) return a; const d = pmDiff(i.cats, rowStats(m).st); return a + d.miss.length + d.strict.length; }, 0);
      const live = its.filter(i=>i.status!=="скрыта").map(i=>pmFill(i.cats));
      const nFull = live.filter(x=>x.full).length, nPart = live.filter(x=>x.n && !x.full).length;
      const city = (bt[0] && bt[0].r.city) || (its[0] && its[0].city) || "";
      const fr = cv.total ? cv.done / cv.total : 0;
      const col = fr >= 1 ? "var(--ok)" : fr >= .6 ? "var(--accent)" : "var(--warn)";
      const on = state.pmProd === p;
      return `<button class="pmx-prod${on ? " on" : ""}" data-pmprod="${esc(p)}" aria-pressed="${on}" title="проверено ${cv.done} из ${cv.total} · полных: ${nFull} · не доделано: ${nPart} · расхождений: ${nd}${on ? " · нажми ещё раз, чтобы показать всех" : " · показать только этого продюсера"}">
        <span class="pmx-ring"><svg viewBox="0 0 46 46" width="46" height="46" aria-hidden="true"><circle cx="23" cy="23" r="19" class="bg"/><circle cx="23" cy="23" r="19" class="fg" style="stroke:${col};stroke-dasharray:${(C*fr).toFixed(1)} ${C.toFixed(1)}"/></svg><b>${cv.done}/${cv.total}</b></span>
        <span class="pmx-prod-t"><b>${esc(p)}</b>${city ? `<span class="pmx-co" style="color:${PMX_CO[city]||"var(--dim)"}">${esc(coLbl(city))}</span>` : ""}<small>новых ${its.filter(i=>i.status==="отправлено").length} · возврат ${its.filter(i=>i.status==="возврат").length}</small></span>
      </button>`;
    }).join("") + `</section>` : "";
  }
  const weeks = (pm.weeks||[]).slice().reverse();
  const prodSel = isEd ? `<select id="pm-prod" class="pmx-sel" aria-label="продюсер"><option value="">все продюсеры</option>${[...new Set(items.map(i=>i.producer))].sort().map(p=>`<option ${state.pmProd===p?"selected":""}>${esc(p)}</option>`).join("")}</select>` : "";
  const addForm = canWrite ? `<section class="pmx-add" id="pm-add" style="${state.pmAddOpen ? "" : "display:none"}">
        ${(()=>{ const cs = AUTH.cities.includes("all") ? CITY_ORDER : AUTH.cities.filter(c=>CITY_ORDER.includes(c)); /* одна компания — выбирать нечего, поле скрыто */
          return `<select id="pma-city" class="pmx-sel" style="${cs.length < 2 ? "display:none" : ""}">${cs.map((c,i)=>`<option value="${esc(c)}">${esc(AUTH.prod ? "компания " + (i + 1) : clabel(c))}</option>`).join("")}</select>`; })()}
        <input id="pma-nick" placeholder="ник опера" aria-label="ник опера">
        <input id="pma-op" placeholder="опер" aria-label="опер">
        <input id="pma-model" placeholder="модель" aria-label="модель">
        <input id="pma-links" class="wide" placeholder="CB = https://chaturbate.com/…" aria-label="ссылка на сайт">
        <button class="pmx-pri" id="pma-go">Добавить</button></section>` : "";
  const asks = pm.asks || [], openA = asks.filter(a=>a.status!=="сделано"), doneA = asks.filter(a=>a.status==="сделано");
  const canAns = isEd && AUTH.edit && !viewAsActive();
  const asksBlock = isEd
    ? (openA.length ? `<section class="pmx-asks">${asksHtml(openA, canAns)}</section>` : "") + (doneA.length ? `<details class="pmx-asksdone"><summary>Закрытые просьбы продюсеров · ${doneA.length}</summary>${asksHtml(doneA, canAns)}</details>` : "")
    : (asks.length ? `<details class="pmx-asksdone"><summary>Мои просьбы смотрящему · ${openA.length} открыт.</summary>${asksHtml(asks, false)}</details>` : "");
  const empty = `<div class="pmx-emptybox">${f==="all" ? (AUTH.prod ? "На этой неделе у тебя нет команд — добавь свою кнопкой «+ Своя команда»" : "Продюсеры ещё не вели мониторинг на этой неделе") : "Под этот фильтр ничего нет"}</div>`;
  const list = !shown.length ? empty
    : isEd ? `<section class="pmx-table"><div class="pmx-row pmx-thead"><span>Команда</span><span>Статус</span><span>Заполнено</span><span>Расхождения</span><span>Обновлено</span><span></span></div>${shown.map(c=>pmCardHtml(c, pmCardCanEdit(c, canWrite), isEd)).join("")}</section>`
    : `<div class="pmx-plist">${shown.map(c=>pmCardHtml(c, pmCardCanEdit(c, canWrite), isEd)).join("")}</div>`;
  box.innerHTML = `
    <div class="pmx-head"><h1>${title}</h1><span class="pmx-sub">${subT}</span><span class="pmx-sp"></span>
      <span class="pmx-tools">
        <select id="pm-week" class="pmx-sel" aria-label="неделя">${weeks.map(w=>`<option ${w===pm.week?"selected":""} value="${esc(w)}">неделя ${esc(w)}${w===pm.latest?" (открытая)":""}</option>`).join("")}</select>
        ${prodSel}
        <button class="pmx-sec pmx-ic" id="pm-reload" title="обновить" aria-label="обновить">${pm.loading ? '<span class="v7spin"></span>' : "⟳"}</button>
        ${canWrite ? `<button class="pmx-sec" id="pmx-addbtn" aria-expanded="${!!state.pmAddOpen}">+ Своя команда</button>` : ""}
      </span></div>
    ${pm.err ? `<div class="failbar">⚠ ${esc(pm.err)}</div>` : ""}
    ${covHtml}
    ${addForm}
    ${asksBlock}
    <div class="pmx-chips">${chips.map(c=>`<button class="pmx-chip${f===c[0] ? " on" : ""}" data-pmf="${esc(c[0])}" aria-pressed="${f===c[0]}">${esc(c[1])}</button>`).join("")}</div>
    ${isEd && shown.length ? '<div class="pmx-legend"><span><i class="miss"></i>продюсер поставил «норма», а у тебя замечание</span><span><i class="strict"></i>продюсер строже тебя</span></div>' : ""}
    ${list}
`;
  pmBind();
  setTimeout(ensureThumbs, 30);
}
// продюсер — своя открытая неделя, кроме «принято»/«скрыта»; смотрящий — любая запись (кроме скрытой), не в режиме «глазами»
function pmCardCanEdit(c, canWrite){
  if (AUTH.prod) return !!canWrite && !(c.it && ["принято","скрыта"].includes(c.it.status));
  return !!(AUTH.edit && !viewAsActive() && c.it && c.it.status !== "скрыта");
}
function pmFindCard(k){ return pmCards().cards.find(c=>c.k===k); }
function pmCollect(k){ // значения формы из DOM (или из черновика, если карточка закрыта)
  const c = pmFindCard(k); if (!c) return null;
  const kid = strHash(k);
  const v = pmFormVals(k, c.it, c.br);
  const g = id => { const el = document.getElementById("pm"+kid+"_"+id); return el ? el.value : null; };
  ["nick","opname","model","links","comment"].forEach(f=>{ const x = g(f); if (x !== null) v[f] = x; });
  for (let j=0;j<9;j++){ const x = g(j); if (x !== null) v.cats[j] = x; }
  return { c, v };
}
// v6.1: сохранение без «отправки» — смотрящий видит запись сразу. auto=true — тихое автосохранение во время набора.
async function pmSave(k, auto){
  const got = pmCollect(k); if (!got) { if (!auto) toast("Карточка не найдена — обнови", true); return; }
  const { c, v } = got;
  const p = { action:"pmsave", nick: v.nick, opname: v.opname, model: v.model, links: v.links, comment: v.comment, cats: v.cats.slice() };
  if (c.it && c.it.id){ p.id = c.it.id; p.rev = c.it.rev; }
  else { p.base = c.baseKey; p.city = c.br ? c.br.city : ""; }
  const sent = JSON.stringify(pmGetEdit(k));
  const msg = document.getElementById("pmas" + strHash(k));
  try {
    if (!auto) toast("💾 Сохраняю…"); else if (msg) msg.textContent = "сохраняю…";
    const r = await wp(p, 45000);
    if (!auto) v.cats.forEach((t,j)=>acLearn(j, t)); // v6.6: свои формулировки — в автоподсказки
    // запись в памяти — без перезагрузки списка, чтобы не мешать набору
    const pm = state.pm; pm.items = pm.items || [];
    let it = c.it && c.it.id ? pm.items.find(x=>x.id===c.it.id) : null;
    if (!it){ it = { id: r.id, base: r.base || "", city: r.city || "", week: r.week || pm.week, producer: r.producer || "", note: "", created: r.updated }; pm.items.push(it); }
    Object.assign(it, { nick: v.nick, opName: v.opname, model: v.model, linksTxt: v.links, comment: v.comment, cats: v.cats.slice(), rev: r.rev, status: r.status, updated: r.updated, who: r.who || it.who });
    if (JSON.stringify(pmGetEdit(k)) === sent) pmSetEdit(k, null); // пока сохраняли, продолжили печатать — черновик оставляем
    if (msg) msg.textContent = pmDirty(k) ? "есть несохранённое — сохранится само" : "сохранено " + new Date().toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"}) + " · смотрящий видит";
    if (!auto){ toast("💾 Сохранено — смотрящий уже видит ✓"); }
    softRender();
    return r;
  } catch(e){
    if (msg) msg.textContent = "⚠ не сохранилось: " + e.message;
    if (/уже изменил/.test(e.message)) state.pmNoAuto = Object.assign(state.pmNoAuto||{}, { [k]: true });
    if (!auto || /уже изменил|нет доступа|принята/.test(e.message)) toast("Не сохранилось: " + e.message + " (текст остался в черновике)", true);
  }
}
// автосохранение продюсера: через 2,5 с тишины после ввода. ВСЕ сохранения карточки (авто, кнопка, перед скрином)
// идут строго по очереди — иначе два запроса с одной версией записи дают ложный конфликт или двойное создание.
const _pmAutoT = {}, _pmBusy = {}, _pmAgain = {};
function pmSaveQueued(k, auto){ // → Promise ответа последнего сохранения
  clearTimeout(_pmAutoT[k]);
  const prev = _pmBusy[k] || Promise.resolve();
  const next = prev.catch(()=>{}).then(()=> (auto && !pmDirty(k)) ? null : pmSave(k, auto));
  _pmBusy[k] = next;
  next.finally(()=>{ if (_pmBusy[k] === next) delete _pmBusy[k]; });
  return next;
}
function pmAutoSave(k){
  if (!AUTH.prod || viewAsActive() || (state.pmNoAuto||{})[k]) return;
  clearTimeout(_pmAutoT[k]);
  _pmAutoT[k] = setTimeout(()=>{ pmSaveQueued(k, true); }, 2500);
}
function pmPending(){ return Object.keys(_pmBusy).length + Object.keys(state.pmEdits||{}).filter(k=>state.pmEdits[k]).length; }
async function pmEnsureId(k){ // для скрина нужна запись — новую карточку сначала сохраняем (в общей очереди сохранений)
  if (_pmBusy[k]) await _pmBusy[k].catch(()=>{});
  const c = pmFindCard(k); if (!c) return null;
  if (c.it && c.it.id) return c.it.id;
  const r = await pmSaveQueued(k, false);
  return r && r.id;
}
// v6.2: скрины мониторинга идут через то же окно «📷 Фото», что и у смотрящего (Ctrl+V, перетаскивание пачкой, камера, разметка)
function pmOpenUpload(k, catIdx){
  uplTarget = { pm: k, catIdx: catIdx };
  document.getElementById("u-title").textContent = "📷 Фото — " + (catIdx === undefined ? "общее фото" : pmListK(k)[catIdx]);
  document.getElementById("u-msg").textContent = "";
  openModal("uplmodal");
}
async function pmUploadOne(blob, k, catIdx){ // → true | текст ошибки (для общей очереди загрузки)
  try {
    const isVid = isVideoBlob(blob);
    if (!isVid && blob && blob.type && !/^image\//.test(blob.type)) return "не картинка";
    const id = await pmEnsureId(k); if (!id) return "сначала сохрани мониторинг";
    const enc = isVid ? await videoEncode(blob) : await shotEncode(blob);
    const r = await wp({ action:"pmupload", id, data: enc.data, small: enc.small, kind: isVid ? "video" : "", cat: catIdx === undefined || catIdx === null ? "" : pmListK(k)[catIdx] }, isVid ? 180000 : 90000);
    const key = r.key || ("PM|" + id);
    state.pm.screens = state.pm.screens || {};
    const arr = state.pm.screens[key] = state.pm.screens[key] || [];
    const item = { cat: r.cat||"", link: r.link, mini: r.mini||"", ts: r.ts||"" }; if (r.type === "video") item.type = "video";
    if (!arr.some(x=>x.link===r.link)) arr.push(item);
    softRender();
    return true;
  } catch(e){ toast("Скрин не загрузился: " + e.message, true); return e.message || "ошибка"; }
}
function pmBind(){
  const box = document.getElementById("content");
  const pmTog = (k, ev)=>{
    state.pmOpen = state.pmOpen || {};
    const closing = !!state.pmOpen[k];
    if (closing) delete state.pmOpen[k]; else state.pmOpen[k] = true;
    render();
    const row = [...document.querySelectorAll(".pmhead")].find(x=>x.dataset.pmk===k);
    if (row && (closing ? row.getBoundingClientRect().top < 0 : true)) row.scrollIntoView({ block: closing ? "center" : "nearest", behavior: "smooth" });
  };
  box.querySelectorAll(".pmhead").forEach(h=>h.onclick=(ev)=>{
    if (ev.target.closest("select,input,textarea,a") || (ev.target.closest("button") && !ev.target.closest("[data-pmtoggle]"))) return;
    pmTog(h.dataset.pmk, ev);
  });
  box.querySelectorAll(".pmfoot [data-pmtoggle]").forEach(b=>b.onclick=(ev)=>{ ev.stopPropagation(); pmTog(b.dataset.pmtoggle, ev); });
  // ввод → черновик
  box.querySelectorAll(".pmcard[data-pmcard]").forEach(card=>{
    const k = card.dataset.pmcard;
    card.addEventListener("input", ev=>{
      const t = ev.target; if (!t || !t.id || !/^pm[a-z0-9]+_(\d|nick|opname|model|links|comment)$/.test(t.id)) return; // поле возврата и пр. — не черновик
      const got = pmCollect(k); if (!got) return;
      const d = { nick: got.v.nick, opname: got.v.opname, model: got.v.model, links: got.v.links, comment: got.v.comment };
      got.v.cats.forEach((x,j)=>{ d["f"+j] = x; });
      // черновик только если что-то отличается от сохранённого
      state.pmEdits = state.pmEdits || {}; const keep = state.pmEdits[k]; state.pmEdits[k] = null;
      const saved = pmFormVals(k, got.c.it, got.c.br); state.pmEdits[k] = keep;
      const same = ["nick","opname","model","links","comment"].every(f=>String(saved[f]||"")===String(d[f]||"")) && saved.cats.every((x,j)=>String(x||"")===String(d["f"+j]||""));
      pmSetEdit(k, same ? null : d);
      if (!same && card.querySelector("[data-pmsave]") && AUTH.prod) pmAutoSave(k); // v6.1: сохраняется само
    });
    card.addEventListener("paste", ev=>{
      const items = (ev.clipboardData && ev.clipboardData.items) ? [...ev.clipboardData.items] : [];
      const files = items.filter(i=>i.kind==="file" && /^image\//.test(i.type)).map(i=>i.getAsFile()).filter(Boolean);
      if (!files.length) return;
      if (!card.querySelector("[data-pmupl]")){ toast("Скрины здесь добавлять нельзя (только просмотр)", true); return; }
      const m = String((ev.target && ev.target.id) || "").match(/_(\d)$/); // вставили в поле категории — скрин в эту категорию
      ev.preventDefault(); ev.stopPropagation();
      uplTarget = { pm: k, catIdx: m ? +m[1] : undefined };
      doUpload(files);
      toast("📸 Скрин → " + (m ? pmListK(k)[+m[1]] : "общее фото"));
    });
  });
  box.querySelectorAll(".pmq").forEach(b=>b.onclick=()=>{ const id = b.dataset.pmta, ta = document.getElementById(id); if (!ta) return; ta.value = segApply(ta, b); ta.dispatchEvent(new Event("input", { bubbles: true })); softRender(); if (b.dataset.mk){ const t2 = document.getElementById(id); if (t2) focusEnd(t2); } });
  box.querySelectorAll("[data-pmf]").forEach(b=>b.onclick=()=>{ state.pmFilter = b.dataset.pmf; render(); });
  box.querySelectorAll("[data-pmprod]").forEach(tr=>tr.onclick=()=>{ state.pmProd = state.pmProd === tr.dataset.pmprod ? "" : tr.dataset.pmprod; render(); });
  const ws = document.getElementById("pm-week"); if (ws) ws.onchange = ()=>{ state.pmOpen = {}; loadPM({ week: ws.value }); };
  const ps = document.getElementById("pm-prod"); if (ps) ps.onchange = ()=>{ state.pmProd = ps.value; render(); };
  const rl = document.getElementById("pm-reload"); if (rl) rl.onclick = ()=>loadPM();
  box.querySelectorAll("[data-pmsave]").forEach(b=>b.onclick=()=>{ const k = b.dataset.pmsave, got = pmCollect(k);
    const was = got && got.c.it ? (got.c.it.cats || []) : [];
    const need = got ? needText(got.v.cats.map((v,j)=>v === (was[j]||"") ? "" : v)) : []; // v7.2: при «Замечании»/«Плохо» нужен текст (автосохранение черновика — без проверки)
    if (need.length){ const kid = strHash(k); markNeed(need.map(j=>document.getElementById("pm"+kid+"_"+j))); toast("Допиши, что не так: " + need.map(j=>pmListK(k)[j]).join(", "), true); return; }
    if (state.pmNoAuto) delete state.pmNoAuto[k]; pmSaveQueued(k, false); });
  box.querySelectorAll("[data-pmhide]").forEach(b=>b.onclick=async ()=>{
    const c = pmFindCard(b.dataset.pmhide); if (!c) return;
    const del = !!b.dataset.del;
    const name = (c.it ? (c.it.opName||c.it.nick) + " / " + c.it.model : (c.br ? (c.br.opName||c.br.opNick) + " / " + c.br.model : "команда"));
    if (!confirm(del ? "Удалить добавленную команду «" + name + "» вместе с её мониторингом и скринами? Отменить нельзя." : "Убрать «" + name + "» из твоего мониторинга? Вернуть можно в фильтре «скрытые». Разбор смотрящего не меняется.")) return;
    try { await wp(c.it ? { action:"pmhide", id: c.it.id } : { action:"pmhide", base: c.baseKey }); pmSetEdit(b.dataset.pmhide, null); toast(del ? "🗑 Удалено" : "🙈 Убрано"); loadPM(); }
    catch(e){ toast("Ошибка: " + e.message, true); }
  });
  box.querySelectorAll("[data-pmask]").forEach(b=>b.onclick=()=>{ const kid = strHash(b.dataset.pmask), el = document.getElementById("pmaskbox" + kid); if (el){ pmBoxToggle("ask" + kid, el); const t = el.querySelector("textarea"); if (t && el.style.display !== "none") t.focus(); } });
  box.querySelectorAll("textarea[data-pmbox]").forEach(t=>t.addEventListener("input", ()=>{ state.pmBox = state.pmBox || {}; state.pmBox[t.dataset.pmbox] = t.value; }));
  box.querySelectorAll("[data-pmasksend]").forEach(b=>b.onclick=async ()=>{
    const c = pmFindCard(b.dataset.pmasksend); if (!c || !c.baseKey) return;
    const ta = document.getElementById("pmaskta" + strHash(b.dataset.pmasksend)); const t = ta ? ta.value.trim() : "";
    if (!t){ toast("Напиши, на что посмотреть", true); return; }
    try { await askSend(c.baseKey, t); if (state.pmBox) delete state.pmBox["ask" + strHash(b.dataset.pmasksend)]; loadPM(); } catch(e){ toast("Ошибка: " + e.message, true); }
  });
  asksBind(box, ()=>loadPM());
  box.querySelectorAll("[data-pmunhide]").forEach(b=>b.onclick=async ()=>{ try { await wp({ action:"pmunhide", id: b.dataset.pmunhide }); toast("↩ Команда вернулась в мониторинг"); state.pmFilter = "all"; loadPM(); } catch(e){ toast("Ошибка: " + e.message, true); } });
  box.querySelectorAll("[data-pmacc]").forEach(b=>b.onclick=()=>pmStatus(b.dataset.pmacc, "accept"));
  box.querySelectorAll("[data-pmreopen]").forEach(b=>b.onclick=()=>pmStatus(b.dataset.pmreopen, "reopen"));
  box.querySelectorAll("[data-pmret]").forEach(b=>b.onclick=()=>{ const el = document.getElementById("pmret"+b.dataset.pmret); if (el) pmBoxToggle("ret" + b.dataset.pmret, el); });
  box.querySelectorAll("[data-pmretgo]").forEach(b=>b.onclick=()=>{ const ta = document.getElementById("pmretta"+strHash(b.dataset.pmretgo)); pmStatus(b.dataset.pmretgo, "return", ta ? ta.value.trim() : ""); });
  box.querySelectorAll("[data-pmtake]").forEach(b=>b.onclick=()=>pmTake(b.dataset.pmtake));
  box.querySelectorAll("[data-pmupl]").forEach(b=>b.onclick=(ev)=>{ ev.stopPropagation(); const c = b.dataset.pmc; pmOpenUpload(b.dataset.pmupl, c === "G" ? undefined : +c); /* ключ карточки сам содержит «|» */ });
  box.querySelectorAll("[data-pmdel]").forEach(x=>x.onclick=async (ev)=>{
    ev.stopPropagation();
    if (!confirm("Удалить этот скрин из мониторинга?")) return;
    try { await wp({ action:"pmdelscreen", id: x.dataset.pmdel, link: x.dataset.link }); const key = "PM|" + x.dataset.pmdel; state.pm.screens[key] = (state.pm.screens[key]||[]).filter(s=>s.link!==x.dataset.link); toast("Скрин удалён"); render(); }
    catch(e){ toast("Ошибка: " + e.message, true); }
  });
  const adb = document.getElementById("pmx-addbtn");
  if (adb) adb.onclick = ()=>{ state.pmAddOpen = !state.pmAddOpen; adb.setAttribute("aria-expanded", String(state.pmAddOpen)); const fm = document.getElementById("pm-add"); if (fm){ fm.style.display = state.pmAddOpen ? "" : "none"; if (state.pmAddOpen){ const i = document.getElementById("pma-nick"); if (i) i.focus(); } } };
  box.querySelectorAll("details[data-pmedit]").forEach(d=>d.addEventListener("toggle", ()=>{ state.pmEditOpen = state.pmEditOpen || {}; state.pmEditOpen[d.dataset.pmedit] = d.open; }));
  box.querySelectorAll(".pmx-cat[data-j] textarea").forEach(t=>t.addEventListener("input", ()=>{ const c = t.closest(".pmx-cat"); if (c) c.dataset.st = v7CatState(t.value); v7AriaSeg(c); }));
  const ag = document.getElementById("pma-go");
  if (ag) ag.onclick = async ()=>{
    const val = id => (document.getElementById(id)||{}).value || "";
    const p = { action:"pmsave", city: val("pma-city"), nick: val("pma-nick").trim(), opname: val("pma-op").trim(), model: val("pma-model").trim(), links: val("pma-links").trim(), comment: "", cats: ["","","","","","","","",""] };
    if (!p.nick && !p.opname && !p.model){ toast("Укажи опера или модель", true); return; }
    try { const r = await wp(p); state.pmOpen = state.pmOpen || {}; state.pmOpen[r.id] = true; state.pmAddOpen = false; toast("＋ Команда добавлена"); loadPM(); }
    catch(e){ toast("Ошибка: " + e.message, true); }
  };
  // клик по миниатюре — полный размер (как в разборах)
  box.querySelectorAll(".pmcard .sthumb img[data-full]").forEach(im=>{
    im.onclick = ()=>{
      document.getElementById("cam-title").textContent = (im.getAttribute("data-cat") || "скрин");
      const ai = document.getElementById("cam-ai"); if (ai) ai.style.display = "none";
      const ao = document.getElementById("cam-aiout"); if (ao) ao.style.display = "none";
      camShow(im.getAttribute("src") || BLANK, true);
      openModal("cammodal");
      camLoadFull(driveId(im.getAttribute("data-full") || ""));
    };
  });
}
async function pmStatus(id, op, note){
  const it = ((state.pm||{}).items||[]).find(x=>x.id===id); if (!it) return;
  if (op === "return" && !note){ toast("Напиши, что исправить", true); return; }
  try { await wp({ action:"pmstatus", id, op, note: note || "", rev: it.rev }); toast(op==="accept" ? "✅ Принято" : op==="return" ? "↩ Возвращено продюсеру" : "🔓 Открыто снова"); if (state.pmBox) delete state.pmBox["ret" + id]; loadPM(); }
  catch(e){ toast("Ошибка: " + e.message, true); }
}
// смотрящий: оценки продюсера → в СВОЙ разбор этой команды как черновик (только пустые категории; в таблицу — по «Сохранить»)
function pmTake(k){
  const c = pmFindCard(k); if (!c || !c.it) return;
  const r = pmMineRow(c.it.base);
  if (!r){ toast("Команда не найдена в неделе — обнови данные", true); return; }
  if (!rowEditable(r)){ toast("Твой разбор этой команды сейчас нельзя править (закрытая неделя или режим «глазами»)", true); return; }
  const d = Object.assign({}, getDraft(r) || {});
  let n = 0;
  for (let j=0;j<9;j++){
    const cur = d["f"+j] !== undefined ? d["f"+j] : (r.cats[j]||"");
    const pv = String(c.it.cats[j]||"").trim();
    if (pv && !String(cur||"").trim()){ d["f"+j] = pv; n++; }
  }
  if (!n){ toast("Переносить нечего: у тебя уже заполнены все категории, где писал продюсер", true); return; }
  setDraft(r, d);
  toast("📝 Перенесено в твой черновик: " + n + " катег. Открываю команду — проверь и нажми «Сохранить»");
  gotoRow(r._sheet + "|" + r._row);
}
// блок в карточке команды у смотрящего (основная таблица): статус мониторинга продюсера и расхождения
function pmBlockFor(r){
  if (!AUTH.edit || viewAsActive() || !state.pm || !state.pm.items) return "";
  const it = state.pm.items.find(x=>x.base===skey(r) && x.status !== "скрыта");
  if (!it) return "";
  const d = pmDiff(it.cats, rowStats(r).st);
  const nd = d.miss.length + d.strict.length;
  const txt = catsOf(r).map((n,j)=>{ const t = String((it.cats||[])[j]||"").trim(); if (!t) return ""; const st = catState(t); const m = d.miss.includes(j) ? ' style="color:var(--bad)"' : d.strict.includes(j) ? ' style="color:var(--warn)"' : "";
    return `<div${m}><b>${st==="ok"?"✅":st==="warn"?"⚠️":st==="bad"?"❌":"·"} ${esc(n)}:</b> <span class="utext">${esc(t)}</span></div>`; }).join("") + (String(it.comment||"").trim() ? `<div><b>💬</b> <span class="utext">${esc(it.comment)}</span></div>` : "");
  const nScr = ((state.pm.screens||{})["PM|" + it.id] || []).length;
  return `<div class="drow"><b>📋 Мониторинг продюсера${it.who ? " · " + esc(it.who) : ""}${it.updated ? " · " + esc(fmtDay(it.updated)) : ""}</b><span>${txt ? `<div style="font-size:12.5px;margin-bottom:6px">${txt}</div>` : ""}${nScr ? `<span style="color:var(--faint);font-size:11.5px">📸 скринов: ${nScr} · </span>` : ""}<span class="ptag ${PM_ST_CLS[it.status]||""}">${esc(pmStLbl(it.status))}</span> ${nd ? `<span class="ptag pt-bad">≠ ${nd}: ${esc(d.miss.concat(d.strict).map(j=>catsOf(r)[j]).join(", "))}</span>` : (pmChecked(it) ? '<span class="ptag pt-ok">оценки совпадают</span>' : "")} <button class="abtn2" data-pmgo="${esc(it.id)}">открыть</button></span></div>`;
}
document.addEventListener("click", ev=>{
  const b = ev.target && ev.target.closest ? ev.target.closest("[data-pmgo]") : null;
  if (!b) return;
  ev.stopPropagation();
  const it0 = ((state.pm||{}).items||[]).find(x=>x.id===b.dataset.pmgo);
  state.pmOpen = state.pmOpen || {}; state.pmOpen[it0 ? pmCardKey(it0) : b.dataset.pmgo] = true; state.pmFilter = "all"; state.pmProd = "";
  switchTab(PM_TAB_ED);
}, true);
// общий кодировщик скрина: оригинал до 2560 px и < 5,5 МБ + мини 480 px.
// v6.6: WebP там, где браузер умеет его сохранять (Chrome, Android, Edge, новые Safari) — тот же вид при меньшем весе;
// иначе JPEG как раньше. Сервер проверяет формат по первым байтам.
let _webpOk = null;
function canWebp(){
  if (_webpOk === null){ try { const c = document.createElement("canvas"); c.width = c.height = 2; _webpOk = c.toDataURL("image/webp", 0.8).indexOf("data:image/webp") === 0; } catch(e){ _webpOk = false; } }
  return _webpOk;
}
function canvasData(cv, quality){ // → base64 (без префикса) в WebP или JPEG
  const fmt = canWebp() ? "image/webp" : "image/jpeg";
  return cv.toDataURL(fmt, quality).split(",")[1];
}
async function shotEncode(blob){
  if (blob && blob.size > 25*1024*1024) throw new Error("файл больше 25 МБ");
  const img = await createImageBitmap(blob);
  if (blob.size <= 5.5*1024*1024 && /^image\/(png|jpeg|webp)$/.test(blob.type)) {
    try { return {data:await blobB64(blob),small:miniFrom(img,img.width,img.height)}; } finally { if(img.close)img.close(); }
  }
  const FULL_MAX_DIM = 4096, FULL_MAX_BYTES = 5.5*1024*1024;
  const scale = Math.min(1, FULL_MAX_DIM/Math.max(img.width, img.height));
  const cv = document.createElement("canvas");
  cv.width = Math.round(img.width*scale); cv.height = Math.round(img.height*scale);
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.drawImage(img, 0, 0, cv.width, cv.height);
  let data = "";
  const qs = [0.98, 0.95, 0.92, 0.88];
  for (const qv of qs){ data = canvasData(cv, qv); if (data.length * 3 / 4 <= FULL_MAX_BYTES) break; }
  if (data.length * 3 / 4 > 6*1024*1024) throw new Error("скрин слишком большой даже после сжатия");
  try { return { data, small: miniFrom(img, img.width, img.height) }; } finally { if(img.close)img.close(); }
}
function miniFrom(src, w, h){ // мини-копия 480 px (для картинки или кадра видео)
  const scale2 = Math.min(1, 960/Math.max(w, h));
  const cv2 = document.createElement("canvas");
  cv2.width = Math.max(1, Math.round(w*scale2)); cv2.height = Math.max(1, Math.round(h*scale2));
  const ctx2 = cv2.getContext("2d");
  ctx2.fillStyle = "#000"; ctx2.fillRect(0, 0, cv2.width, cv2.height);
  ctx2.drawImage(src, 0, 0, cv2.width, cv2.height);
  let data = canvasData(cv2, 0.92);
  if (data.length*3/4 > 1024*1024) data = canvasData(cv2, 0.8);
  return data;
}
// ---------- v6.6: короткое видео (10–20 с, до 10 МБ) ----------
const VIDEO_MAX_BYTES = 10*1024*1024, VIDEO_MAX_SEC = 25;
function isVideoBlob(b){ return !!(b && /^video\//.test(b.type || "")); }
function blobB64(blob){ return new Promise((res, rej)=>{ const r = new FileReader(); r.onload = ()=>res(String(r.result).split(",")[1] || ""); r.onerror = ()=>rej(new Error("файл не читается")); r.readAsDataURL(blob); }); }
async function videoEncode(blob){
  if (blob.size > VIDEO_MAX_BYTES) throw new Error("видео " + (blob.size/1048576).toFixed(1) + " МБ — максимум 10 МБ: сними 10–20 с или в качестве 720p");
  const url = URL.createObjectURL(blob);
  try {
    const v = document.createElement("video");
    v.muted = true; v.playsInline = true; v.preload = "auto"; v.src = url;
    await new Promise((res, rej)=>{ v.onloadedmetadata = res; v.onerror = ()=>rej(new Error("браузер не может открыть это видео — нужен MP4/MOV/WebM")); setTimeout(()=>rej(new Error("видео долго открывается")), 15000); });
    if (v.duration && isFinite(v.duration) && v.duration > VIDEO_MAX_SEC) throw new Error("видео " + Math.round(v.duration) + " с — нужно не длиннее " + VIDEO_MAX_SEC + " с");
    v.currentTime = Math.min(0.5, (v.duration || 1) / 3);
    await new Promise((res)=>{ v.onseeked = res; setTimeout(res, 4000); });
    const w = v.videoWidth || 640, h = v.videoHeight || 360;
    const small = miniFrom(v, w, h); // обложка-кадр
    return { data: await blobB64(blob), small };
  } finally { URL.revokeObjectURL(url); }
}
// видео приватные: проигрываем через сервер (проверка доступа как у скринов)
const videoLinks = new Set();
function noteVideos(list){ (list||[]).forEach(s=>{ if (s && s.type === "video" && s.link) videoLinks.add(s.link); }); }
function isVideoLink(lk){ return videoLinks.has(String(lk||"")); }
let vidUrl = "", vidSeq = 0;
function b64Bytes(d){ const bin = atob(d); const arr = new Uint8Array(bin.length); for (let i=0;i<bin.length;i++) arr[i] = bin.charCodeAt(i); return arr; }
async function openVideo(link){
  const id = driveId(link), my = ++vidSeq;
  const box = document.getElementById("vid-box");
  box.innerHTML = '<div class="empty">загружаю видео…</div>';
  openModal("vidmodal");
  const alive = ()=> my === vidSeq && document.getElementById("vidmodal").classList.contains("show"); // окно закрыли или открыли другое — ответ не нужен
  try {
    const parts = []; let r = null, part = 0;
    do { // сервер отдаёт по 4 МБ
      r = await wp({ action:"video", id, part }, 120000);
      if (!alive()) return;
      parts.push(b64Bytes(r.d)); part++;
      if (r.parts > 1) box.innerHTML = '<div class="empty">загружаю видео… ' + Math.round(part * 100 / r.parts) + '%</div>';
    } while (part < (r.parts || 1) && part < 8);
    if (vidUrl) URL.revokeObjectURL(vidUrl);
    vidUrl = URL.createObjectURL(new Blob(parts, { type: r.mime || "video/mp4" }));
    box.innerHTML = '<video controls autoplay playsinline style="max-width:100%;max-height:76vh;border-radius:8px;background:#000"></video>';
    box.querySelector("video").src = vidUrl;
  } catch(e){ if (alive()) box.innerHTML = '<div class="empty">⚠ ' + esc(e.message) + '</div>'; }
}
// клик по миниатюре видео — плеер вместо просмотра скрина (перехватываем раньше обработчиков картинок)
document.addEventListener("click", ev=>{
  const im = ev.target && ev.target.closest ? ev.target.closest("img[data-full]") : null;
  if (!im || !isVideoLink(im.getAttribute("data-full"))) return;
  ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation();
  openVideo(im.getAttribute("data-full"));
}, true);
// в фоне помечаем миниатюры видео значком ▶
function markVideoThumbs(){
  document.querySelectorAll(".sthumb img[data-full]").forEach(im=>{ const sp = im.parentElement; if (sp) sp.classList.toggle("isvid", isVideoLink(im.getAttribute("data-full"))); });
}
// данные миниатюры: тип по первым байтам (JPEG/WebP/PNG)
function b64Img(d){ const h = String(d||"").slice(0, 8); return "data:" + (h.indexOf("UklGR") === 0 ? "image/webp" : h.indexOf("iVBOR") === 0 ? "image/png" : "image/jpeg") + ";base64," + d; }

// ===================== v6.6: УДОБСТВО — метки, новички, недавние, компактный режим, презентация, автоподсказки, просьбы, журнал входов =====================
// ---------- компактный режим таблицы (запоминается в браузере) ----------
function setCompact(on){
  document.body.classList.toggle("compact", !!on);
  try { localStorage.setItem("dash_compact", on ? "1" : "0"); } catch(e){}
  const b = document.getElementById("f-compact"); if (b) b.classList.toggle("on", !!on);
}
try { if (lsGet("dash_compact") === "1") document.body.classList.add("compact"); } catch(e){}

// ---------- метка / закрепление (смотрящий) ----------
let markTarget = null;
function openMarkModal(r){
  markTarget = r;
  const m = markOf(r) || { c: "", t: "", p: 0 };
  document.getElementById("mk-title").textContent = "🏷 " + (r.opName || r.opNick || "—") + " / " + (r.model || "—");
  document.getElementById("mk-colors").innerHTML = MARK_COLORS.map(c=>`<button class="mkcol${c===(m.c||"")?" on":""}" data-mkc="${c}" style="background:${c||"transparent"}" title="${c?"цвет":"без цвета"}">${c?"":"✕"}</button>`).join("");
  document.getElementById("mk-text").value = m.t || "";
  document.getElementById("mk-pin").checked = !!m.p;
  document.getElementById("mk-msg").textContent = "";
  document.querySelectorAll("[data-mkc]").forEach(b=>b.onclick=()=>{ document.querySelectorAll("[data-mkc]").forEach(z=>z.classList.toggle("on", z===b)); });
  openModal("markmodal");
}
async function saveMark(clear){
  const r = markTarget; if (!r) return;
  const on = document.querySelector("[data-mkc].on");
  const body = clear ? { color: "", text: "", pin: 0 } : { color: on ? on.dataset.mkc : "", text: document.getElementById("mk-text").value.trim().slice(0, 30), pin: document.getElementById("mk-pin").checked ? 1 : 0 };
  const tk = teamKey(r);
  try {
    const res = await wp(Object.assign({ action:"mark", tkey: tk }, body));
    state.marks = state.marks || {};
    const k = res.key || tk;
    if (!body.color && !body.text && !body.pin) delete state.marks[k]; else state.marks[k] = { c: body.color, t: body.text, p: body.pin };
    if (realData && realData !== state) { /* в режиме «глазами» метки не меняются */ }
    closeModal("markmodal"); toast(clear || (!body.color && !body.text && !body.pin) ? "Метка снята" : "🏷 Метка сохранена — видят все"); render();
  } catch(e){ document.getElementById("mk-msg").textContent = "⚠ " + e.message; }
}
async function toggleNewbie(r){
  const nb = newbieOf(r);
  const op = String(r.opName || r.opNick || "").trim();
  if (!op){ toast("У команды не указан оператор", true); return; }
  try {
    if (nb){
      if (!confirm("Снять метку «новичок» с оператора «" + op + "»?")) return;
      await wp({ action:"newbie", city: r.city, op: op, off: 1 });
      delete (state.newbies||{})[r.city + "|" + op.toLowerCase()];
      toast("Метка «новичок» снята");
    } else {
      const d = prompt("Новый оператор «" + op + "»: сколько дней длится адаптация?", "14");
      if (d === null) return;
      const days = Math.max(1, Math.min(90, parseInt(d, 10) || 14));
      const res = await wp({ action:"newbie", city: r.city, op: op, days: days });
      state.newbies = state.newbies || {}; state.newbies[res.key || (r.city + "|" + op.toLowerCase())] = { s: res.s, d: res.d };
      toast("🌱 Отмечен новичком на " + days + " дн.");
    }
    render();
  } catch(e){ toast("Ошибка: " + e.message, true); }
}
document.addEventListener("click", ev=>{
  const b = ev.target && ev.target.closest ? ev.target.closest("[data-mark],[data-newbie]") : null;
  if (!b) return;
  ev.stopPropagation();
  const x = state.lastView[b.dataset.mark || b.dataset.newbie]; if (!x) return;
  if (b.dataset.mark) openMarkModal(x.r); else toggleNewbie(x.r);
}, true);

// ---------- недавние карточки (свои, в этом браузере) ----------
function recentKey(){ return "dash_recent:" + (AUTH.user || ""); }
function recentList(){ return lsJson(recentKey(), []).filter(x=>x && x.k).slice(0, 12); }
function recentPush(r){
  if (!r) return;
  const it = { k: skey(r), w: r.week || "", c: r.city || "", l: (r.opName || r.opNick || "—") + " / " + (r.model || "—"), t: Date.now() };
  const L = [it].concat(recentList().filter(x=>!(x.k === it.k))).slice(0, 12);
  try { localStorage.setItem(recentKey(), JSON.stringify(L)); } catch(e){}
}
function recentOpen(k){
  const it = recentList().find(x=>x.k===k);
  const parts = String(k).split("|");
  const src = realRows();
  // та же команда: сначала точная строка недели, затем эта команда в последней неделе (по оператору и модели)
  let r = src.find(x=>skey(x)===k);
  if (!r && it){ const lw = latestWeekName(); r = src.find(x=>x.city===it.c && x.week===lw && String(x.opNick||"").trim()===parts[1] && String(x.model||"").trim()===parts[2]); }
  if (!r){ toast("Команда не найдена в загруженных неделях — выбери «все недели»", true); return; }
  gotoRow(r._sheet + "|" + r._row);
}

// ---------- v6.8: режим «презентация» для планёрки — насыщенный и интерактивный ----------
// 9 слайдов: обложка, динамика, компании, где ошибаются (тепловая карта), продюсеры, рост и падение,
// критичные команды, новички и просьбы, фокус и задачи. Клик по графику → список команд → клик → карточка.
let presDrillSpec = "", presIdx = 0, presCity = "", presAuto = null, presT0 = 0, presTimerOn = false, presTimerAcc = 0, presTick = null, presAsks = null;
const PRES_COL = { "Томск": "#d27530", "Новосибирск": "#1fa293", "Онлайн": "#6f80f2" }; // проверено валидатором палитры (тёмный фон)
const PRES_SLIDES = [
  { id: "cover", t: "Неделя" }, { id: "trend", t: "Динамика" }, { id: "cos", t: "Компании" }, { id: "heat", t: "Где ошибаются" },
  { id: "prods", t: "Продюсеры" }, { id: "move", t: "Рост и падение" }, { id: "crit", t: "Критичные" }, { id: "news", t: "Новички и просьбы" }, { id: "focus", t: "Фокус недели" }
];
function presCities(){ return CITY_ORDER.filter(c=>AUTH.cities.includes("all") || AUTH.cities.includes(c)); }
function presWeeks(){ return [...new Set(realRows().map(r=>r.week).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b)); }
function presRows(w, city){ return dedupeRows(realRows().filter(r=>r.week === w && (!city || r.city === city))); }
function presStat(rows){
  const st = rows.map(rowStats), ws = st.filter(x=>x.score !== null);
  const v = k=>ws.filter(x=>x.verdict === k).length;
  return { n: rows.length, checked: ws.length, ok: v("норма"), warn: v("замечание"), crit: v("критично"), none: rows.length - ws.length,
    avg: ws.length ? ws.reduce((a,x)=>a + x.score, 0) / ws.length : null, st };
}
const presPct = v => v === null || v === undefined ? "–" : Math.round(v * 100 / MAX_SCORE) + "%";
function presDelta(a, b){ if (a === null || b === null || a === undefined || b === undefined) return ""; const d = Math.round((a - b) * 100 / MAX_SCORE); if (!d) return '<span class="pdelta">= как неделю назад</span>'; return `<span class="pdelta ${d>0?"up":"down"}">${d>0?"▲":"▼"} ${Math.abs(d)} п.</span>`; }
function presTeamName(r){ return (r.opName || r.opNick || "—") + " / " + (r.model || "—"); }
function presOpen(){
  presIdx = 0; presT0 = Date.now(); presTimerAcc = 0; presTimerOn = true;
  document.getElementById("present").classList.add("show");
  presRender();
  try { document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(()=>{}); } catch(e){}
  if (!state.fullLoaded) ensureFull({ silent: true }).then(()=>presLive() && presRender()); // история — для динамики и «роста и падения»
  if (pmCanUse() && !AUTH.prod && !(state.pm && state.pm.at)) loadPM({ quiet: true }).then(()=>presLive() && presRender());
  if (AUTH.edit) wp({ action:"asklist" }).then(r=>{ presAsks = (r.list||[]).filter(a=>a.status !== "сделано"); if (presLive()) presRender(); }).catch(()=>{});
  clearInterval(presTick); presTick = setInterval(presClock, 1000);
}
function presLive(){ const p = document.getElementById("present"); return !!(p && p.classList.contains("show")); }
document.addEventListener("fullscreenchange", ()=>{ // Esc в полном экране браузер забирает себе: если открыт список — закрываем только его
  if (document.fullscreenElement || !presLive()) return;
  const d = document.getElementById("pr-drill");
  if (d && d.classList.contains("show")){ d.classList.remove("show"); presDrillSpec = ""; return; }
  presClose();
});
function presClose(){
  document.getElementById("present").classList.remove("show"); presDrillSpec = "";
  clearInterval(presAuto); presAuto = null; clearInterval(presTick); presTick = null;
  try { if (document.fullscreenElement) document.exitFullscreen(); } catch(e){}
}
function presClock(){
  const el = document.getElementById("pr-clock"); if (!el) return;
  const s = Math.floor((presTimerAcc + (presTimerOn ? Date.now() - presT0 : 0)) / 1000);
  el.textContent = String(Math.floor(s/60)).padStart(2, "0") + ":" + String(s%60).padStart(2, "0");
}
function presGo(i){ presIdx = (i + PRES_SLIDES.length) % PRES_SLIDES.length; presDrillSpec = ""; presRender(); }
// ---- графики (SVG, без библиотек) ----
function presLineChart(series, weeks){ // series: [{name, color, vals:[avg|null]}]
  const W = 900, H = 340, L = 44, R = 150, T = 16, B = 34, iw = W - L - R, ih = H - T - B;
  const x = i => L + (weeks.length < 2 ? iw/2 : i * iw / (weeks.length - 1)), y = v => T + ih - (v / MAX_SCORE) * ih;
  let g = "";
  [0, 25, 50, 75, 100].forEach(p=>{ const yy = T + ih - p/100*ih; g += `<line x1="${L}" x2="${L+iw}" y1="${yy}" y2="${yy}" class="pgrid"/><text x="${L-8}" y="${yy+4}" class="paxis" text-anchor="end">${p}%</text>`; });
  weeks.forEach((w,i)=>{ g += `<text x="${x(i)}" y="${H-10}" class="paxis" text-anchor="middle">${esc(w)}</text>`; });
  const ends = [];
  series.forEach(s=>{
    let d = "", pen = false;
    s.vals.forEach((v,i)=>{ if (v === null){ pen = false; return; } d += (pen ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); pen = true; });
    g += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="pline"/>`;
    s.vals.forEach((v,i)=>{ if (v !== null) g += `<circle cx="${x(i)}" cy="${y(v)}" r="${i === s.vals.length-1 ? 5 : 3.5}" fill="${s.color}" stroke="var(--panel)" stroke-width="2"/>`; });
    const li = s.vals.map((v,i)=>v===null?-1:i).filter(i=>i>=0).pop();
    if (li !== undefined) ends.push({ y: y(s.vals[li]), x: x(li), s, v: s.vals[li] });
  });
  ends.sort((a,b)=>a.y-b.y); for (let i=1;i<ends.length;i++) if (ends[i].y - ends[i-1].y < 18) ends[i].y = ends[i-1].y + 18; // подписи не налезают
  ends.forEach(e=>{ g += `<circle cx="${L+iw+14}" cy="${e.y-4}" r="4" fill="${e.s.color}"/><text x="${L+iw+24}" y="${e.y}" class="plabel">${esc(e.s.name)} <tspan class="pval">${presPct(e.v)}</tspan></text>`; });
  weeks.forEach((w,i)=>{ const cw = weeks.length < 2 ? iw : iw/(weeks.length-1); g += `<rect x="${x(i)-cw/2}" y="${T}" width="${cw}" height="${ih}" fill="transparent" class="phit" data-tip="${esc("неделя " + w + "\n" + series.map(s=>s.name + ": " + presPct(s.vals[i])).join("\n"))}"/>`; });
  return `<svg viewBox="0 0 ${W} ${H}" class="pchart" role="img" aria-label="динамика средней оценки">${g}</svg>`;
}
function presStack(s, attrs){ // распределение вердиктов одной полосой
  const parts = [["норма", s.ok, "var(--ok)"], ["замечание", s.warn, "var(--warn-f)"], ["критично", s.crit, "var(--bad)"], ["не проверено", s.none, "#5c6370"]].filter(p=>p[1] > 0);
  const tot = s.n || 1;
  return `<div class="pstack" ${attrs||""}>${parts.map(p=>{ const w = p[1]*100/tot; return `<span class="pseg" data-grow="${w.toFixed(2)}" style="width:0;background:${p[2]}" title="${esc(p[0] + ": " + p[1])}">${w >= 9 ? p[1] : ""}</span>`; }).join("")}</div>`;
}
// ---- слайды ----
function presSlideHtml(id, D){
  const { city, wk, prevWk, rows, S, P } = D;
  if (id === "cover"){
    const tile = (n, lbl, col, extra) => `<div class="ptile"><b data-count="${n}" style="${col?"color:"+col:""}">0</b><span>${lbl}</span>${extra||""}</div>`;
    return `<div class="pcover"><div class="pkicker">планёрка · ${esc(city ? clabel(city) : "все компании")}</div><h1>Неделя ${esc(wk || "—")}</h1>
      <div class="phero"><div class="pbig"><b data-count="${S.avg===null?0:Math.round(S.avg*100/MAX_SCORE)}" data-suffix="%">0%</b><span>средняя оценка</span>${presDelta(S.avg, P ? P.avg : null)}</div>
      <div class="ptiles">${tile(S.checked, "проверено из " + S.n)}${tile(S.ok, "нормально", "var(--ok)")}${tile(S.warn, "есть замечания", "var(--warn)")}${tile(S.crit, "критично", "var(--bad)")}</div></div>
      <div class="pnote">${S.n ? presStack(S, 'data-drill="all"') + '<div class="plegend"><i style="background:var(--ok)"></i>норма <i style="background:var(--warn-f)"></i>замечание <i style="background:var(--bad)"></i>критично <i style="background:#5c6370"></i>не проверено · клик по полосе — список команд</div>' : "нет команд на этой неделе"}</div></div>`;
  }
  if (id === "trend"){
    const weeks = D.weeks.slice(-6);
    if (weeks.length < 2) return `<h2>Динамика средней оценки</h2><div class="pempty">${state.fullLoaded ? "Пока только одна неделя — динамика появится со следующей" : "Загружаю историю недель…"}</div>`;
    const cs = city ? [city] : presCities();
    const series = cs.map(c=>({ name: clabel(c), color: PRES_COL[c] || "var(--accent)", vals: weeks.map(w=>presStat(presRows(w, c)).avg) }));
    return `<h2>Динамика средней оценки <small>последние ${weeks.length} нед. · наведи на неделю — значения</small></h2>
      <div class="plegend big">${series.map(s=>`<i style="background:${s.color}"></i>${esc(s.name)}`).join(" ")}</div>${presLineChart(series, weeks)}`;
  }
  if (id === "cos"){
    const cs = city ? [city] : presCities();
    return `<h2>Компании <small>клик по компании — её команды</small></h2><div class="pcos">${cs.map(c=>{
      const s = presStat(presRows(wk, c)), p = prevWk ? presStat(presRows(prevWk, c)) : null;
      return `<div class="pco" data-drill="city:${esc(c)}"><div class="pco-h"><i style="background:${PRES_COL[c]||"var(--accent)"}"></i><b>${esc(clabel(c))}</b><span class="pco-n">${s.n} команд</span></div>
        <div class="pco-avg"><b data-count="${s.avg===null?0:Math.round(s.avg*100/MAX_SCORE)}" data-suffix="%">0%</b>${presDelta(s.avg, p ? p.avg : null)}</div>
        ${presStack(s)}<div class="pco-f"><span style="color:var(--ok)">● ${s.ok}</span><span style="color:var(--warn)">● ${s.warn}</span><span style="color:var(--bad)">● ${s.crit}</span><span style="color:var(--faint)">○ ${s.none}</span></div></div>`;
    }).join("")}</div>`;
  }
  if (id === "heat"){
    const cols = city ? [...new Set(rows.map(r=>r.producer || "—"))].sort((a,b)=>a.localeCompare(b,"ru")) : presCities();
    const pick = c => rows.filter(r=>city ? (r.producer || "—") === c : r.city === c);
    const PN = catNamesFor(rows); // v7.7: строки — пункты чек-листа (по названию)
    const cell = (j, c) => { const rs = pick(c), sts = rs.map(r=>stByName(r, rowStats(r).st, PN[j])); const ev = sts.filter(x=>x).length, bad = sts.filter(x=>x==="bad").length, warn = sts.filter(x=>x==="warn").length; return { ev, bad: bad + warn, nb: bad, nw: warn, v: ev ? (bad + warn * 0.5)/ev : 0 }; }; // v7.2: яркость — «плохо» + ½ замечаний
    let vmax = 0; PN.forEach((n,j)=>cols.forEach(c=>{ vmax = Math.max(vmax, cell(j, c).v); })); vmax = vmax || 1; // шкала от самой частой ошибки — контраст виден и при малых долях
    return `<h2>Где ошибаются <small>доля команд с замечанием или «плохо» · чем ярче, тем больше «плохо» · клик — какие команды</small></h2>
      <div class="pheat" style="grid-template-columns:minmax(150px,1.3fr) repeat(${cols.length}, minmax(70px,1fr))"><span></span>${cols.map(c=>`<span class="ph-h">${esc(city ? c : clabel(c))}</span>`).join("")}
      ${PN.map((n,j)=>`<span class="ph-r">${esc(n)}</span>` + cols.map(c=>{ const x = cell(j, c); const a = x.ev ? (x.bad ? 0.14 + 0.76*(x.v/vmax) : 0.04) : 0;
        return `<button class="ph-c" data-drill="cat:${CATS_ALL.indexOf(n)}:${esc(c)}" style="background:${x.ev ? `rgba(229,101,95,${a.toFixed(2)})` : "transparent"}" title="${esc(n + " · " + (city ? c : clabel(c)) + ": плохо " + x.nb + ", замечание " + x.nw + " из " + x.ev)}">${x.ev ? `<b>${Math.round(x.bad/x.ev*100)}%</b><small>${x.bad}/${x.ev}</small>` : "–"}</button>`; }).join("")).join("")}</div>
      <div class="plegend">светлее — реже, темнее — чаще · «–» — не проверяли</div>`;
  }
  if (id === "prods"){
    const pm = state.pm && state.pm.week === wk ? state.pm : null;
    const prods = [...new Set(rows.map(r=>r.producer).filter(Boolean))].map(p=>{
      const rs = rows.filter(r=>r.producer === p), s = presStat(rs);
      let cov = null, full = null;
      if (pm){ const its = (pm.items||[]).filter(i=>i.producer === p); const c = pmCoverage(pmBaseTeams(wk, p), its); cov = c.total ? c.done/c.total : 0; full = its.filter(i=>i.status !== "скрыта" && pmFill(i.cats).full).length; }
      return { p, s, cov, full };
    }).sort((a,b)=>(b.s.avg||0)-(a.s.avg||0));
    if (!prods.length) return `<h2>Продюсеры</h2><div class="pempty">нет данных</div>`;
    const bar = (v, col) => `<span class="pbar"><span data-grow="${Math.round((v||0)*100)}" style="width:0;background:${col}"></span></span>`;
    return `<h2>Продюсеры <small>средняя оценка команд · свой мониторинг · клик — команды продюсера</small></h2><div class="pprods">
      <div class="pp-h"><span>продюсер</span><span>команд</span><span>средняя оценка</span><span>критично</span><span>свой мониторинг</span><span>полных</span></div>
      ${prods.map(x=>`<div class="pp-r" data-drill="prod:${esc(x.p)}"><b>${esc(x.p)}</b><span>${x.s.n}</span><span class="pp-bar">${bar(x.s.avg===null?0:x.s.avg/MAX_SCORE, "var(--accent)")}<em>${presPct(x.s.avg)}</em></span><span style="color:${x.s.crit?"var(--bad)":"var(--faint)"}">${x.s.crit||"—"}</span><span class="pp-bar">${x.cov===null ? '<em class="muted">—</em>' : bar(x.cov, "var(--ok)") + `<em>${Math.round(x.cov*100)}%</em>`}</span><span>${x.full===null?"—":x.full}</span></div>`).join("")}</div>`;
  }
  if (id === "move"){
    if (!prevWk) return `<h2>Рост и падение</h2><div class="pempty">${state.fullLoaded ? "Нет прошлой недели для сравнения" : "Загружаю историю недель…"}</div>`;
    const prev = {}; presRows(prevWk, city).forEach(r=>{ const s = rowStats(r); if (s.score !== null) prev[teamKey(r)] = s.score; });
    const ch = rows.map(r=>({ r, s: rowStats(r) })).filter(x=>x.s.score !== null && prev[teamKey(x.r)] !== undefined).map(x=>({ r: x.r, now: x.s.score, was: prev[teamKey(x.r)], d: x.s.score - prev[teamKey(x.r)] }));
    const up = ch.filter(x=>x.d > 0).sort((a,b)=>b.d-a.d).slice(0, 6), dn = ch.filter(x=>x.d < 0).sort((a,b)=>a.d-b.d).slice(0, 6);
    const li = x => `<li data-go="${esc(x.r._sheet + "|" + x.r._row)}"><span>${esc(presTeamName(x.r))}<small>${esc(clabel(x.r.city))} · ${esc(x.r.producer||"")}</small></span><b class="${x.d>0?"up":"down"}">${x.was} → ${x.now} <em>${x.d>0?"▲":"▼"}${Math.abs(x.d)}</em></b></li>`;
    return `<h2>Рост и падение <small>${esc(prevWk)} → ${esc(wk)} · оценка из ${MAX_SCORE} · клик — карточка</small></h2><div class="pcols2">
      <div><h3 class="up">▲ выросли · ${ch.filter(x=>x.d>0).length}</h3><ol class="plist">${up.map(li).join("") || "<li class=pnone>никто</li>"}</ol></div>
      <div><h3 class="down">▼ упали · ${ch.filter(x=>x.d<0).length}</h3><ol class="plist">${dn.map(li).join("") || "<li class=pnone>никто 🎉</li>"}</ol></div></div>`;
  }
  if (id === "crit"){
    const cr = rows.map(r=>({ r, s: rowStats(r) })).filter(x=>x.s.verdict === "критично").slice(0, 9);
    if (!cr.length) return `<h2>Критичные команды</h2><div class="pempty big">Критичных нет 🎉</div>`;
    return `<h2>Критичные команды <small>${cr.length} · клик — карточка команды</small></h2><div class="pcrit">${cr.map(x=>{
      const sc = ((state.screens||{})[skey(x.r)] || []).find(s=>s.type !== "video" && !isAdvCat(s.cat)), tk = sc ? (sc.mini || sc.link) : "";
      const bad = catsOf(x.r).filter((n,j)=>x.s.st[j] === "bad").concat(catsOf(x.r).filter((n,j)=>x.s.st[j] === "warn")); // сначала «плохо», затем замечания
      return `<div class="pcard" data-go="${esc(x.r._sheet + "|" + x.r._row)}">${tk ? `<img loading="lazy" data-tk="${esc(tk)}" src="${esc((state.thumbData||{})[tk] || BLANK)}" alt="">` : '<div class="pnoimg">нет скрина</div>'}
        <div class="pcard-b"><b>${teamBadges(x.r)}${esc(presTeamName(x.r))}</b><small>${esc(clabel(x.r.city))} · ${esc(x.r.producer||"")} · ${fmtSc(x.s.score)}/${MAX_SCORE}</small><div class="ptags">${bad.slice(0,4).map(n=>`<span>${esc(n)}</span>`).join("")}${bad.length>4?`<span>+${bad.length-4}</span>`:""}</div></div></div>`;
    }).join("")}</div>`;
  }
  if (id === "news"){
    const nb = rows.map(r=>({ r, n: newbieOf(r) })).filter(x=>x.n);
    const asks = (presAsks || ((state.pm||{}).asks || []).filter(a=>a.status !== "сделано")).filter(a=>!city || a.city === city);
    return `<h2>Новички и просьбы продюсеров</h2><div class="pcols2">
      <div><h3>🌱 Новые операторы · ${nb.length}</h3><ol class="plist">${nb.map(x=>`<li data-go="${esc(x.r._sheet + "|" + x.r._row)}"><span>${esc(presTeamName(x.r))}<small>${esc(clabel(x.r.city))} · ${esc(x.r.producer||"")}</small></span><b><span class="pbar sm"><span data-grow="${Math.round(x.n.day*100/x.n.total)}" style="width:0;background:var(--ok)"></span></span><em>день ${x.n.day} из ${x.n.total}</em></b></li>`).join("") || "<li class=pnone>новичков нет</li>"}</ol></div>
      <div><h3>👀 Просьбы посмотреть · ${asks.length}</h3><ol class="plist">${asks.slice(0, 8).map(a=>`<li><span>${esc(a.nick||"")} / ${esc(a.model||"")}<small>${esc(a.producer||"")} · ${esc(a.when||"")}</small></span><b class="ptext">«${esc(String(a.text||"").slice(0, 90))}»</b></li>`).join("") || "<li class=pnone>открытых просьб нет</li>"}</ol></div></div>`;
  }
  if (id === "focus"){
    const cats = catNamesFor(rows).map(n=>({ n, k: rows.filter((r,i)=>stByName(r, S.st[i].st, n) === "bad").length + 0.5 * rows.filter((r,i)=>stByName(r, S.st[i].st, n) === "warn").length })).filter(x=>x.k).sort((a,b)=>b.k-a.k).slice(0, 3);
    const tasks = (state.tasks||[]).filter(t=>t.status !== "сделана" && !t.orphan && (!city || t.city === city || String(t.sheet||"").indexOf(city) >= 0));
    const byP = {}; tasks.forEach(t=>{ (byP[t.producer || "—"] = byP[t.producer || "—"] || []).push(t); });
    return `<h2>Фокус на неделю</h2><div class="pcols2">
      <div><h3>🎯 Главные зоны роста</h3><div class="pfocus">${cats.map((x,i)=>`<div class="pf" data-drill="cat:${CATS_ALL.indexOf(x.n)}:"><b>${i+1}</b><span>${esc(x.n)}<small>замечание у ${x.k} из ${S.checked} команд</small></span></div>`).join("") || '<div class="pnone">замечаний нет 🎉</div>'}</div></div>
      <div><h3>📌 Открытые задачи продюсерам · ${tasks.length}</h3><ol class="plist">${Object.keys(byP).sort((a,b)=>byP[b].length-byP[a].length).map(p=>`<li><span>${esc(p)}<small>${esc(byP[p].slice(0,2).map(t=>String(t.text||"").slice(0,60)).join(" · "))}</small></span><b>${byP[p].length}</b></li>`).join("") || "<li class=pnone>открытых задач нет</li>"}</ol></div></div>`;
  }
  return "";
}
function presDrill(spec){
  const D = presCtx(); let list = D.rows, title = "";
  if (spec === "all") title = "Все команды";
  else if (spec.indexOf("city:") === 0){ const c = spec.slice(5); list = presRows(D.wk, c); title = clabel(c); }
  else if (spec.indexOf("prod:") === 0){ const p = spec.slice(5); list = D.rows.filter(r=>r.producer === p); title = "Продюсер " + p; }
  else if (spec.indexOf("cat:") === 0){ const [, j, c] = spec.split(":");  list = D.rows.filter(r=>isDev(stByName(r, rowStats(r).st, CATS_ALL[+j])) && (!c || (D.city ? (r.producer||"—") === c : r.city === c))); title = CATS_ALL[+j] + (c ? " · " + (D.city ? c : clabel(c)) : "") + " — замечания"; }
  const ord = { "критично": 0, "замечание": 1, "норма": 2 };
  list = list.slice().sort((a,b)=>((ord[rowStats(a).verdict] ?? 3) - (ord[rowStats(b).verdict] ?? 3)));
  const box = document.getElementById("pr-drill");
  box.innerHTML = `<div class="pd-h"><b>${esc(title)}</b><span>${list.length}</span><button class="gbtn" id="pd-x">✕</button></div><div class="pd-l">${list.map(r=>{ const s = rowStats(r); return `<button data-go="${esc(r._sheet + "|" + r._row)}"><span>${teamBadges(r)}${esc(presTeamName(r))}<small>${esc(clabel(r.city))} · ${esc(r.producer||"")}</small></span><span class="chip ${chipCls[s.verdict]||""}">${s.score===null?"не проверено":fmtSc(s.score) + "/" + MAX_SCORE}</span></button>`; }).join("") || '<div class="pnone">пусто</div>'}</div>`;
  box.classList.add("show"); presDrillSpec = spec;
  document.getElementById("pd-x").onclick = ()=>{ box.classList.remove("show"); presDrillSpec = ""; };
}
function presCtx(){
  const weeks = presWeeks(), wk = latestWeekName() || weeks[weeks.length-1] || "";
  const i = weeks.indexOf(wk), prevWk = i > 0 ? weeks[i-1] : "";
  const rows = presRows(wk, presCity), S = presStat(rows), P = prevWk ? presStat(presRows(prevWk, presCity)) : null;
  return { city: presCity, weeks: weeks.slice(0, i >= 0 ? i + 1 : weeks.length), wk, prevWk, rows, S, P };
}
function presRender(){
  if (!presLive()) return;
  presIdx = (presIdx + PRES_SLIDES.length) % PRES_SLIDES.length;
  const sl = PRES_SLIDES[presIdx], D = presCtx(), cities = presCities();
  const box = document.getElementById("present");
  box.innerHTML = `<div class="ptop"><span class="plogo">📊 Планёрка</span>
      <div class="pchips">${cities.length > 1 ? `<button class="pchip ${!presCity?"on":""}" data-pc="">Все</button>` + cities.map(c=>`<button class="pchip ${presCity===c?"on":""}" data-pc="${esc(c)}"><i style="background:${PRES_COL[c]||"var(--accent)"}"></i>${esc(clabel(c))}</button>`).join("") : ""}</div>
      <span style="flex:1"></span>
      <button class="gbtn" id="pr-timer" title="таймер планёрки: пауза / продолжить">⏱ <span id="pr-clock">00:00</span></button>
      <button class="gbtn ${presAuto?"on":""}" id="pr-auto" title="автолистание каждые 20 секунд">${presAuto ? "⏸ авто" : "▶ авто"}</button>
      <button class="gbtn" id="pr-x" title="Esc">✕ выйти</button></div>
    <div class="pslide" data-s="${sl.id}">${presSlideHtml(sl.id, D)}</div>
    <aside id="pr-drill" class="pdrill"></aside>
    <div id="pr-tip" class="ptip"></div>
    <div class="pnav"><button class="gbtn" id="pr-prev">←</button><div class="pdots">${PRES_SLIDES.map((s,i)=>`<button class="pdot ${i===presIdx?"on":""}" data-pi="${i}" title="${i+1}. ${esc(s.t)}"><span>${i+1}</span><em>${esc(s.t)}</em></button>`).join("")}</div><button class="gbtn" id="pr-next">→</button>
      <span class="phelp">← → листать · 1–9 слайд · Esc выйти</span></div>`;
  presClock();
  // анимации: числа «набегают», полосы растут
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  box.querySelectorAll("[data-count]").forEach(el=>{ const to = +el.dataset.count || 0, suf = el.dataset.suffix || ""; if (reduce) el.textContent = to + suf; else { el.dataset.v = 0; animNum(el, to, suf); } });
  requestAnimationFrame(()=>requestAnimationFrame(()=>box.querySelectorAll("[data-grow]").forEach(el=>{ el.style.width = el.dataset.grow + "%"; })));
  // события
  box.querySelectorAll("[data-pc]").forEach(b=>b.onclick=()=>{ presCity = b.dataset.pc; presRender(); });
  box.querySelectorAll("[data-pi]").forEach(b=>b.onclick=()=>presGo(+b.dataset.pi));
  box.querySelectorAll("[data-drill]").forEach(b=>b.onclick=(ev)=>{ ev.stopPropagation(); presDrill(b.dataset.drill); });
  box.onclick = ev=>{ const g = ev.target.closest && ev.target.closest("[data-go]"); if (g){ const k = g.dataset.go; presClose(); gotoRow(k); } };
  document.getElementById("pr-prev").onclick = ()=>presGo(presIdx - 1);
  document.getElementById("pr-next").onclick = ()=>presGo(presIdx + 1);
  document.getElementById("pr-x").onclick = presClose;
  document.getElementById("pr-timer").onclick = ()=>{ if (presTimerOn){ presTimerAcc += Date.now() - presT0; presTimerOn = false; } else { presT0 = Date.now(); presTimerOn = true; } presClock(); };
  document.getElementById("pr-auto").onclick = ()=>{ if (presAuto){ clearInterval(presAuto); presAuto = null; } else presAuto = setInterval(()=>presGo(presIdx + 1), 20000); presRender(); };
  const tip = document.getElementById("pr-tip");
  box.querySelectorAll(".phit").forEach(h=>{
    h.onmousemove = ev=>{ tip.textContent = h.dataset.tip; tip.style.display = "block"; tip.style.left = Math.min(ev.clientX + 14, innerWidth - 220) + "px"; tip.style.top = (ev.clientY + 14) + "px"; };
    h.onmouseleave = ()=>{ tip.style.display = "none"; };
  });
  if (presDrillSpec){ const d = document.getElementById("pr-drill"); d.style.transition = "none"; presDrill(presDrillSpec); requestAnimationFrame(()=>{ d.style.transition = ""; }); } // фоновая перерисовка не закрывает открытый список
  setTimeout(ensureThumbs, 30);
}
document.addEventListener("keydown", e=>{
  if (!presLive()) return;
  if (e.key === "Escape"){ e.preventDefault(); e.stopPropagation(); const d = document.getElementById("pr-drill"); if (d && d.classList.contains("show")){ d.classList.remove("show"); presDrillSpec = ""; } else presClose(); }
  else if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown"){ e.preventDefault(); presGo(presIdx + 1); }
  else if (e.key === "ArrowLeft" || e.key === "PageUp"){ e.preventDefault(); presGo(presIdx - 1); }
  else if (/^[1-9]$/.test(e.key) && +e.key <= PRES_SLIDES.length){ e.preventDefault(); presGo(+e.key - 1); }
}, true);

// ---------- автоподсказка формулировки (из прошлых замечаний этой категории) ----------
// Словарь: тексты категории во всех загруженных неделях + шаблоны + свои сохранённые формулировки (в браузере).
// Показываем, когда начал фразу (от 2 букв): ↑↓ — выбор, Tab — вставить, Esc — закрыть.
const AC_MAX_OWN = 300;
let acDict = null, acDictSig = "", acState = null;
function acOwnKey(){ return "acown:" + (AUTH.user || ""); }
function acLearn(j, text){ // запомнить свои формулировки после сохранения
  const parts = acSplit(text); if (!parts.length) return;
  const own = lsJson(acOwnKey(), {});
  const L = (own[j] || []).filter(x=>!parts.includes(x));
  own[j] = parts.concat(L).slice(0, AC_MAX_OWN);
  try { localStorage.setItem(acOwnKey(), JSON.stringify(own)); } catch(e){}
  acDict = null;
}
function acSplit(text){ // чистая: текст → отдельные формулировки
  return String(text||"").split(/[\n;]+|\.\s+/).map(x=>x.trim().replace(/[.,;]+$/, "")).filter(x=>x.length >= 4 && x.length <= 90 && x.charAt(0) !== "✅");
}
function acBuild(){
  const src = realRows().concat(((state.pm||{}).items)||[]);
  const sig = src.length + "|" + (state.dataFp||"") + "|" + (((state.pm||{}).at)||0);
  if (acDict && sig === acDictSig) return acDict;
  const d = []; for (let j=0;j<9;j++) d.push({});
  const add = (j, t, w)=>{ const k = t.toLowerCase(); const o = d[j][k] || (d[j][k] = { t, n: 0 }); o.n += w; };
  src.forEach(r=>{ (r.cats||[]).forEach((t,j)=>{ if (j < 9 && !r._lite) acSplit(t).forEach(x=>add(j, x, 1)); }); });
  const own = lsJson(acOwnKey(), {});
  for (let j=0;j<9;j++){ (own[j]||[]).forEach(x=>add(j, x, 3)); (PH[FIELDCODES[j]]||[]).forEach(x=>add(j, x, 1)); try { getPhrases(FIELDCODES[j]).forEach(x=>add(j, x, 2)); } catch(e){} }
  acDict = d.map(o=>Object.values(o).sort((a,b)=>b.n-a.n)); acDictSig = sig;
  return acDict;
}
function acFragment(val, pos){ // чистая: начало текущей фразы до курсора
  const before = String(val||"").slice(0, pos);
  const m = before.match(/(?:^|[\n;,.]\s*)([^\n;,.]*)$/);
  const frag = m ? m[1] : before;
  return { frag: frag.replace(/^\s+/, ""), start: pos - frag.replace(/^\s+/, "").length };
}
function acMatch(list, frag){ // чистая: подходящие формулировки (по началу фразы или слова), до 6
  const f = frag.toLowerCase().trim(); if (f.length < 2) return [];
  const out = [];
  for (const o of list){
    const t = o.t.toLowerCase();
    if (t === f) continue;
    if (t.indexOf(f) === 0 || t.indexOf(" " + f) >= 0) out.push(o.t);
    if (out.length >= 6) break;
  }
  return out;
}
function acCatOf(el){ const m = el && el.id && el.id.match(/^(?:ed[\w]+|pm[a-z0-9]+)_(\d)$/); return m ? +m[1] : null; }
function acHide(){ const b = document.getElementById("acbox"); if (b) b.style.display = "none"; acState = null; }
function acShow(el, items, start){
  const box = document.getElementById("acbox"); if (!box) return;
  if (!items.length){ acHide(); return; }
  acState = { el, items, start, i: 0 };
  box.innerHTML = '<div class="ach">из прошлых замечаний · Tab — вставить</div>' + items.map((t,i)=>`<div data-aci="${i}" class="${i===0?"on":""}">${esc(t)}</div>`).join("");
  const r = el.getBoundingClientRect();
  box.style.left = (window.scrollX + r.left) + "px"; box.style.top = (window.scrollY + r.bottom + 2) + "px"; box.style.minWidth = Math.min(r.width, 420) + "px";
  box.style.display = "block";
}
function acAccept(i){
  const a = acState; if (!a) return;
  const el = a.el, t = a.items[i == null ? a.i : i]; if (!t) return;
  const pos = el.selectionStart || el.value.length;
  el.value = el.value.slice(0, a.start) + t + el.value.slice(pos);
  const np = a.start + t.length; try { el.setSelectionRange(np, np); } catch(e){}
  acHide();
  acSkip = el; // своё событие input — без новой подсказки (следующий Tab переведёт фокус дальше)
  el.dispatchEvent(new Event("input", { bubbles: true }));
}
let acSkip = null;
document.addEventListener("input", ev=>{
  const el = ev.target; if (acSkip === el){ acSkip = null; return; } acSkip = null;
  const j = acCatOf(el);
  if (j === null || el.disabled){ if (acState) acHide(); return; }
  const f = acFragment(el.value, el.selectionStart || 0);
  acShow(el, acMatch(acBuild()[j] || [], f.frag), f.start);
});
document.addEventListener("keydown", ev=>{
  if (!acState || ev.target !== acState.el) return;
  if (ev.key === "ArrowDown" || ev.key === "ArrowUp"){
    ev.preventDefault();
    acState.i = (acState.i + (ev.key === "ArrowDown" ? 1 : -1) + acState.items.length) % acState.items.length;
    document.querySelectorAll("#acbox [data-aci]").forEach((d,i)=>d.classList.toggle("on", i===acState.i));
  } else if (ev.key === "Tab" && !ev.shiftKey){ ev.preventDefault(); acAccept(); }
  else if (ev.key === "Escape"){ ev.preventDefault(); ev.stopPropagation(); acHide(); }
}, true);
document.addEventListener("mousedown", ev=>{
  const d = ev.target && ev.target.closest ? ev.target.closest("#acbox [data-aci]") : null;
  if (d){ ev.preventDefault(); acAccept(+d.dataset.aci); return; }
  if (acState && !(ev.target && ev.target.closest && ev.target.closest("#acbox"))) acHide();
}, true);
document.addEventListener("focusout", ev=>{ if (acState && ev.target === acState.el) setTimeout(()=>{ if (acState && document.activeElement !== acState.el) acHide(); }, 150); });

// ---------- просьбы «посмотри эту команду» ----------
async function askSend(baseKey, text){
  const r = await wp({ action:"askadd", skey: baseKey, text: text });
  toast("👀 Просьба отправлена смотрящему");
  return r;
}
function asksHtml(list, forEditor){
  if (!list || !list.length) return "";
  return list.map(a=>{
    const done = a.status === "сделано";
    const team = a.nick || a.model ? (a.nick||"—") + " / " + (a.model||"—") : (a.team || "—");
    const who = forEditor ? (a.producer || "Продюсер") + (done ? " просил посмотреть" : " просит посмотреть") : (done ? "Смотрящий посмотрел" : "Ты попросил посмотреть");
    return `<div class="pmx-ask${done ? " done" : ""}">${PMX_EYE}
      <span class="pmx-ask-t"><b>${esc(who)}</b> ${esc(team)}: «<span class="utext">${esc(a.text)}</span>» <span class="pmx-faint">· ${[coLbl(a.city), a.when ? fmtDay(a.when) : ""].filter(Boolean).map(esc).join(" · ")}</span>
        ${a.answer ? `<span class="pmx-ans">↩ ${esc(a.by||"смотрящий")}: <span class="utext">${esc(a.answer)}</span></span>` : ""}</span>
      ${forEditor && !done ? `<span class="pmx-ask-a"><input data-askans="${esc(a.id)}" placeholder="ответ продюсеру (необязательно)" aria-label="ответ продюсеру"><button class="pmx-sec" data-askgo="${esc(a.key)}">Открыть команду</button><button class="pmx-pri" data-askdone="${esc(a.id)}">Посмотрел</button></span>` : ""}
    </div>`;
  }).join("");
}
function asksBind(root, after){
  root.querySelectorAll("[data-askgo]").forEach(b=>b.onclick=(ev)=>{
    ev.stopPropagation();
    const k = b.dataset.askgo; const r = realRows().find(x=>skey(x)===k);
    if (!r){ toast("Команда не найдена в загруженной неделе", true); return; }
    document.querySelectorAll(".modal-ov.show").forEach(ov=>closeModal(ov.id));
    gotoRow(r._sheet + "|" + r._row);
  });
  root.querySelectorAll("[data-askdone]").forEach(b=>b.onclick=async (ev)=>{
    ev.stopPropagation();
    const inp = root.querySelector(`[data-askans="${b.dataset.askdone}"]`);
    try { await wp({ action:"askdone", id: b.dataset.askdone, answer: inp ? inp.value.trim() : "" }); toast("✅ Отмечено"); if (after) after(); }
    catch(e){ toast("Ошибка: " + e.message, true); }
  });
}

// ---------- журнал входов (админ, вкладка «Пользователи») ----------
async function loginLogLoad(box){
  box.innerHTML = '<div class="o7-empty">Загружаю…</div>';
  try {
    const r = await wp({ action:"loginlog" });
    const L = r.list || [];
    box.innerHTML = L.length ? `<div class="us7-lscroll">${L.map(x=>`<div class="us7-lr"><span>${esc(x.t)}</span><b>${esc(x.u)}</b><span class="us7-ld">${esc(x.d)}</span><b style="color:${x.r==="вход"?"var(--ok)":"var(--warn)"}">${esc(x.r)}</b></div>`).join("")}</div>` : '<div class="o7-empty">Записей пока нет</div>';
  } catch(e){ box.innerHTML = '<div class="o7-empty" style="color:var(--warn)">' + esc(e.message) + '</div>'; }
}
function devName(){ // «Windows · Chrome 129 · ПК» — без точных данных устройства
  const ua = navigator.userAgent || "";
  const os = /Android/i.test(ua) ? "Android" : /iPhone|iPad|iPod/i.test(ua) ? "iOS" : /Windows/i.test(ua) ? "Windows" : /Mac OS X/i.test(ua) ? "macOS" : /Linux/i.test(ua) ? "Linux" : "?";
  const br = (ua.match(/(Edg|OPR|YaBrowser|Chrome|Firefox|Version)\/(\d+)/) || []);
  const name = { Edg: "Edge", OPR: "Opera", YaBrowser: "Яндекс", Chrome: "Chrome", Firefox: "Firefox", Version: "Safari" }[br[1]] || "браузер";
  const mob = /Mobi|Android|iPhone/i.test(ua) ? "телефон" : "ПК";
  return os + " · " + name + (br[2] ? " " + br[2] : "") + " · " + mob;
}

// ---------- предзагрузка истории в фоне (переключение недель без ожидания) ----------
let prefetchT = null;
function schedulePrefetch(){ clearTimeout(prefetchT); }

// ---------- плашка самопроверки сервера (смотрящему) ----------
function healthShow(h){
  state.health = h || null;
  const bar = document.getElementById("healthbar"); if (!bar) return;
  if (!AUTH.edit || viewAsActive() || !h || h.ok){ bar.style.display = "none"; return; }
  bar.style.display = "block";
  bar.innerHTML = `⚠ <b>Самопроверка сервера (${esc(h.t||"")}) нашла проблему:</b><ul style="margin:4px 0 4px 18px">${(h.problems||[]).map(p=>`<li>${esc(p)}</li>`).join("")}</ul><button class="gbtn" id="hb-run">проверить снова</button> <button class="gbtn" id="hb-st">подробнее в «Состоянии»</button>`;
  document.getElementById("hb-run").onclick = async ()=>{ try { const r = await wp({ action:"selfcheck" }, 120000); healthShow(r); toast(r.ok ? "✅ Всё в порядке" : "⚠ Проблема осталась", !r.ok); } catch(e){ toast(e.message, true); } };
  document.getElementById("hb-st").onclick = ()=>switchTab("Состояние");
}

// ---------- «Итог» — последний итог дня по сверкам (лист «Итог», только чтение) ----------
function renderItog(){
  document.getElementById("pbar").innerHTML = "";
  const list = (state.itog || []).slice();
  const p2 = n => String(n).padStart(2,"0");
  const keyOfD = d => p2(d.getDate()) + "." + p2(d.getMonth()+1);
  const dateOf = x => { // дата итога: «дд.мм[.гггг] …» или ISO
    const s = String(x && x.date || ""); const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return new Date(+iso[1], +iso[2]-1, +iso[3], 12);
    return parseUpd(s);
  };
  const today = new Date(); today.setHours(12,0,0,0);
  const todayKey = keyOfD(today);
  const days = {}; // ключ дд.мм → {t, d}
  for (let i = 0; i < 7; i++){ const d = new Date(today); d.setDate(d.getDate()-i); days[keyOfD(d)] = { t: d.getTime(), d: d }; }
  const titles = ["Проверка карточек", "Сверка смен"];
  const byDay = {}; // ключ дня → {title → итог} (за день берётся последняя запись)
  const latest = {};
  list.forEach(x=>{
    const k = x.title || "Итог дня"; if (!titles.includes(k)) titles.push(k);
    const d = dateOf(x); if (!d) return;
    const dk = keyOfD(d);
    if (!days[dk]) days[dk] = { t: d.getTime(), d: d };
    (byDay[dk] = byDay[dk] || {})[k] = x;
    if (!latest[k] || d.getTime() >= latest[k].t) latest[k] = { t: d.getTime(), dk: dk };
  });
  const dayKeys = Object.keys(days).sort((a,b)=>days[b].t-days[a].t).slice(0, 14);
  if (!state.itogDay || !dayKeys.includes(state.itogDay)) state.itogDay = todayKey;
  const sel = state.itogDay;
  const ribbon = dayKeys.map(k=>{
    const has = byDay[k] || {};
    return `<button class="ig-day${k===sel?" on":""}" data-igday="${k}"><span>${k===todayKey?"сегодня":WD_RU[days[k].d.getDay()]}</span><b>${k}</b><span class="ig-dots">${titles.slice(0,4).map(t=>`<i class="${has[t]?"y":""}" title="${esc(t)}: ${has[t]?"итог есть":"итога нет"}"></i>`).join("")}</span></button>`;
  }).join("");
  const stats = text => {
    const out = [];
    String(text||"").split(/\n/).forEach(line=>{
      if (out.length >= 4) return;
      const l = line.trim().replace(/[.;,]+$/, "");
      let m = l.match(/^([^:\d\n]{2,40}?)\s*[:—–]\s*(\d+)(?![\d.:\/])/);
      if (m){ out.push({ v: +m[2], l: m[1].trim().toLowerCase() }); return; }
      m = l.match(/^([А-Яа-яЁёA-Za-z ]{0,30}?)\s*(\d+)\s+([А-Яа-яЁёA-Za-z ]{2,30})$/);
      if (m) out.push({ v: +m[2], l: (m[1] + " " + m[3]).trim().toLowerCase() });
    });
    return out;
  };
  const cards = titles.map(t=>{
    const x = (byDay[sel] || {})[t];
    if (!x){
      const lt = latest[t] && latest[t].dk !== sel ? latest[t].dk : "";
      return `<section class="ig-card"><div class="ig-ch"><h2>${esc(t)}</h2><span class="ig-tag warn">итога нет</span><span class="ig-when">${sel}</span></div>
        <div class="ig-none">За этот день итога нет.${lt?` <button class="ig-last" data-igday="${lt}">последний итог — ${lt}</button>`:""}</div></section>`;
    }
    const w = String(x.when||"").trim();
    const when = w ? (/^\d{1,2}:\d{2}$/.test(w) ? "записано в " + w + " · " + sel : "записано " + (fmtUpd(w)||w)) : sel;
    const st = stats(x.text);
    return `<section class="ig-card"><div class="ig-ch"><h2>${esc(t)}</h2><span class="ig-tag ok">${sel===todayKey?"итог за сегодня":"итог есть"}</span><span class="ig-when">${esc(when)}</span></div>
      ${st.length ? `<div class="ig-tiles">${st.map((s,i)=>`<div class="ig-tile"><b class="${i===0?"":s.v===0?"ok":"warn"}">${s.v}</b><div>${esc(s.l)}</div></div>`).join("")}</div>` : ""}
      <div class="ig-text${st.length?"":" solo"}">${esc(x.text)}</div></section>`;
  }).join("");
  document.getElementById("content").innerHTML = `
    <div class="tk-head"><h1>Итог дня</h1><span class="tk-sub">итоги сверок из чатов «Проверка карточек» и «Сверка смен» · только чтение</span></div>
    <div class="ig-days">${ribbon}</div>
    ${list.length ? `<div class="ig-grid">${cards}</div>` : '<div class="empty">Лист «Итог» пуст — итоги появятся, когда чаты сверок начнут их сюда записывать</div>'}`;
  document.querySelectorAll("#content [data-igday]").forEach(b=>b.onclick=()=>{ state.itogDay = b.dataset.igday; renderItog(); });
}

// ---------- «Чек» и «Рекомендации” ----------
function renderNotes(kind){
  document.getElementById("pbar").innerHTML = "";
  const map = kind==="check" ? (state.checks||{}) : (state.recs||{});
  const sheetName = kind==="check" ? "Чек" : "Рекомендации";
  const isC = kind==="check";
  const CO = { "Томск":"var(--art)", "Новосибирск":"var(--vv)", "Онлайн":"var(--dia)" };
  const teams = dedupeRows(state.rows).filter(r=>r.producer||r.city);
  const groups = [], byKey = {};
  teams.forEach(r=>{
    const key = r.city+"|"+r.producer;
    if (!byKey[key]){ byKey[key] = { key: key, r: r, rows: [] }; groups.push(byKey[key]); }
    byKey[key].rows.push(r);
  });
  state.noteOpen = state.noteOpen || {};
  state.noteFilt = state.noteFilt || {};
  const filt = state.noteFilt[kind] || "all";
  const nFull = groups.filter(g=>String(map[g.key]||"").trim()).length;
  const hintsOf = rows => { // «чаще всего проваливают» — категории с замечаниями по командам продюсера
    const HNn = catNamesFor(rows), cnt = HNn.map(()=>0); // v7.7: по названию
    rows.forEach(r=>{ try { const st = rowStats(r).st || []; HNn.forEach((n,i)=>{ if (isDev(stByName(r, st, n))) cnt[i]++; }); } catch(e){} });
    return cnt.map((n,i)=>({ n, c: HNn[i] })).filter(x=>x.n>0).sort((a,b)=>b.n-a.n).slice(0,3).map(x=>x.c);
  };
  const items = groups.map(g=>{
    const r = g.r, key = g.key;
    const val = map[key] || "";
    const full = !!String(val).trim();
    const co = CO[r.city] || "var(--faint)";
    const nid = "n" + (kind==="check"?"c":"r") + Math.abs([...key].reduce((a,c)=>(a*31+c.charCodeAt(0))|0,7));
    const op = AUTH.edit && !!state.noteOpen[nid];
    const empTxt = AUTH.edit ? (isC ? "нет плана" : "нет рекомендаций") : "смотрящий пока ничего не написал";
    const hints = AUTH.edit ? hintsOf(g.rows) : [];
    return `<div class="rc-item${op?" open":""}${AUTH.edit?"":" ro"}" data-rcf="${full?"full":"empty"}" data-nid="${nid}">
      <div class="rc-row">
        <div class="rc-who"><i style="background:${co}"></i><div><b>${esc(r.producer||"—")}</b><span style="color:${co}">${AUTH.prod ? "мои команды" : esc(clabel(r.city))}</span></div></div>
        <span class="rc-txt${full?"":" none"}" id="${nid}_v" title="${esc(val)}">${full ? esc(val) : empTxt}</span>
        ${AUTH.edit ? `<button class="rc-tog${full?"":" acc"}" data-nid="${nid}" data-full="${full?1:""}">${op ? "Свернуть" : full ? "Изменить" : "Написать"}</button>` : ""}
      </div>
      ${AUTH.edit ? `<div class="rc-ed">
        ${hints.length ? `<div class="rc-hints">Чаще всего проваливают: ${hints.map(h=>`<button class="rc-hint" data-nid="${nid}" data-h="${esc(h)}">+ ${esc(h)}</button>`).join("")}</div>` : ""}
        <textarea id="${nid}" data-orig="${esc(val)}" aria-label="${isC?"План повышения чека":"Рекомендация"}" placeholder="${kind==="check"?"план повышения чека для команды…":"общие рекомендации для команды…"}">${esc(val)}</textarea>
        <div class="rc-act"><button class="rc-save notebtn" data-nid="${nid}" data-sheet="${sheetName}" data-key="${esc(key)}" data-kind="${kind}">Сохранить</button><button class="rc-cancel" data-nid="${nid}">Отмена</button><span>Ctrl+Enter — сохранить · продюсер увидит сразу</span></div>
      </div>` : ""}
    </div>`;
  }).join("");
  const F = [["all","Все",groups.length],["empty","Пустые",groups.length-nFull],["full","Заполненные",nFull]];
  document.getElementById("content").innerHTML = `
    <div class="tk-head"><h1>${isC ? "План повышения чека" : "Рекомендации"}</h1>
      <span class="tk-sub">${AUTH.edit ? (isC ? "по продюсерам — продюсер видит у себя" : "общие советы — продюсер видит у себя") : (isC ? "план от смотрящего по твоим командам" : "что советует смотрящий по твоим командам")}</span>
      <div class="tk-sp"></div>
      ${AUTH.edit && groups.length ? `<div class="rc-fs">${F.map(f=>`<button class="rc-f${filt===f[0]?" on":""}" data-f="${f[0]}">${f[1]} <span>${f[2]}</span></button>`).join("")}</div>` : ""}
    </div>
    ${items ? `<section class="rc-list">${items}<div class="rc-nf">Под фильтр ничего не подходит</div></section>` : '<div class="empty">Нет команд</div>'}`;
  const box = document.getElementById("content");
  const applyF = ()=>{
    const f = (state.noteFilt[kind] || "all");
    let vis = 0;
    box.querySelectorAll(".rc-item").forEach(el=>{ const on = f==="all" || el.dataset.rcf===f || el.classList.contains("open"); el.style.display = on ? "" : "none"; if (on) vis++; });
    const nf = box.querySelector(".rc-nf"); if (nf) nf.style.display = vis ? "none" : "";
    const nF = box.querySelectorAll('.rc-item[data-rcf="full"]').length, nA = box.querySelectorAll(".rc-item").length;
    box.querySelectorAll(".rc-f").forEach(b=>{ b.classList.toggle("on", b.dataset.f===f); const s = b.querySelector("span"); if (s) s.textContent = b.dataset.f==="all" ? nA : b.dataset.f==="full" ? nF : nA - nF; });
  };
  const setOpen = (nid, on)=>{
    const it = box.querySelector(`.rc-item[data-nid="${nid}"]`); if (!it) return;
    if (on) state.noteOpen[nid] = 1; else delete state.noteOpen[nid];
    it.classList.toggle("open", !!on);
    const tb = it.querySelector(".rc-tog");
    if (tb) tb.textContent = on ? "Свернуть" : (it.dataset.rcf==="full" ? "Изменить" : "Написать");
    if (on){ const ta = document.getElementById(nid); if (ta) focusEnd(ta); }
  };
  box.querySelectorAll(".rc-f").forEach(b=>b.onclick=()=>{ state.noteFilt[kind] = b.dataset.f; applyF(); });
  box.querySelectorAll(".rc-tog").forEach(b=>b.onclick=()=>setOpen(b.dataset.nid, !state.noteOpen[b.dataset.nid]));
  box.querySelectorAll(".rc-cancel").forEach(b=>b.onclick=()=>{ const ta = document.getElementById(b.dataset.nid); if (ta) ta.value = ta.dataset.orig; setOpen(b.dataset.nid, false); applyF(); });
  box.querySelectorAll(".rc-hint").forEach(b=>b.onclick=()=>{ const ta = document.getElementById(b.dataset.nid); if (!ta) return; const v0 = ta.value.replace(/\s+$/,""); ta.value = v0 ? v0 + "\n" + b.dataset.h + ": " : b.dataset.h + ": "; focusEnd(ta); });
  box.querySelectorAll(".rc-ed textarea").forEach(ta=>ta.addEventListener("keydown", ev=>{
    if (ev.key==="Enter" && (ev.ctrlKey || ev.metaKey)){ ev.preventDefault(); const sb = box.querySelector(`.notebtn[data-nid="${ta.id}"]`); if (sb && !sb.disabled) sb.click(); }
  }));
  applyF();
  document.querySelectorAll(".notebtn").forEach(b=>b.onclick=async ()=>{
    const ta = document.getElementById(b.dataset.nid);
    const store = b.dataset.kind==="check" ? state.checks : state.recs;
    b.disabled = true;
    try {
      const res = await wp({ action:"setplan", sheet: b.dataset.sheet, bkey: b.dataset.key, plan: ta.value });
      if (res.error) throw new Error(res.error);
      store[b.dataset.key] = ta.value;
      ta.dataset.orig = ta.value; // больше не «несохранённое»: обновление данных его не перетрёт и не спросит при уходе
      toast("✔ Сохранено: " + b.dataset.key.split("|")[1]);
      // только отображение строки: новый текст, «заполнено/пусто», свернуть редактор
      const it = ta.closest(".rc-item"), v = document.getElementById(b.dataset.nid + "_v");
      if (it && v){
        const full = !!ta.value.trim();
        it.dataset.rcf = full ? "full" : "empty";
        v.textContent = full ? ta.value : (isC ? "нет плана" : "нет рекомендаций"); v.title = ta.value; v.classList.toggle("none", !full);
        const tb = it.querySelector(".rc-tog"); if (tb) tb.classList.toggle("acc", !full);
        setOpen(b.dataset.nid, false); applyF();
      }
    } catch(e){ toast("Ошибка: "+e.message, true); }
    b.disabled = false;
  });
}

// ---------- связь с таблицей ----------
function renderCompare(...args){return loadFeature86('analytics',()=>renderCompare(...args));}

function normLinks(text){
  // строка → «Название = URL»: нормализуем и голую ссылку, и URL справа от «=»
  // (раньше «CB = chaturbate.com/x» уходил на сервер без протокола — ссылка умирала).
  // ВАЖНО: голый URL с «=» в параметрах распознаём ДО разбора «Название = URL»,
  // иначе «https://site.com/x?y=1» режется по «=».
  return String(text||"").split("\n").map(l=>{
    let t = l.trim(); if (!t) return "";
    if (!/^https?:\/\//i.test(t) && /^[\w.-]+\.[a-z]{2,}([\/?#]\S*)?$/i.test(t)) t = "https://" + t;
    if (/^https?:\/\//i.test(t)) return t.replace(/^https?:\/\//i,"").split("/")[0] + " = " + t;
    const eq = t.match(/^(.+?)\s*=\s*(\S+)$/);
    if (eq){
      let url = eq[2];
      if (!/^https?:\/\//i.test(url) && /^[\w.-]+\.[a-z]{2,}([\/?#]\S*)?$/i.test(url)) url = "https://" + url;
      return eq[1].trim() + " = " + url;
    }
    // «CB: https://x.com» или «CB chaturbate.com/x» → «CB = https://x.com»
    const m2 = t.match(/^([^=\s][^=]*?)[\s:]+((?:https?:\/\/|[\w.-]+\.[a-z]{2,})\S*)$/i);
    if (m2){
      let url = m2[2];
      if (!/^https?:\/\//i.test(url) && /^[\w.-]+\.[a-z]{2,}/i.test(url)) url = "https://" + url;
      return m2[1].trim() + " = " + url;
    }
    return t;
  }).filter(Boolean).join("\n");
}
// «Обновлено» хранится как «dd.MM HH:mm (кто)» — на экране показываем только дату и время
// конец недели «дд-дд.мм» / «дд.мм-дд.мм» → дата (для сортировки и «месяца»)
// год можно указать явно: «28.12-03.01.27»; без года — ближайший, не дальше 45 дней в будущее
function weekEndDate(w){
  const m = String(w||"").match(/(\d{1,2})(?:\.(\d{1,2}))?-(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?/);
  if (!m) return null;
  if (m[5]){ let y = +m[5]; if (y < 100) y += 2000; return new Date(y, +m[4]-1, +m[3]); }
  const d = new Date(new Date().getFullYear(), +m[4]-1, +m[3]);
  if (d - new Date() > 45*864e5) d.setFullYear(d.getFullYear()-1); // декабрь → январь; «прошлая» неделя не уезжает в будущее
  return d;
}
function weekKey(w){ if (w && typeof w === "object") w = w.week; const d = weekEndDate(w); return d ? d.getTime() : 0; }
function weekInCurrentMonth(w){
  const d = weekEndDate(w);
  if (!d) return true;
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}
function fmtUpd(s){ // без «(кто)»; год текущего года не показываем
  return String(s||"").replace(/\s*\([^)]*\)\s*$/, "").trim()
    .replace(/^(\d{1,2}\.\d{1,2})\.(\d{4})/, (m0,a,y)=> +y === new Date().getFullYear() ? a : a + "." + y.slice(2));
}
// задача 4: дата проверки без времени — берём дату прямо из штампа (без пересчёта пояса, иначе около полуночи день съедет)
function fmtDay(s){
  const m = String(s||"").match(/(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?/);
  if (!m) return fmtUpd(s);
  const dd = m[1].padStart(2,"0"), mm = m[2].padStart(2,"0");
  const y = m[3] ? (m[3].length === 2 ? 2000 + +m[3] : +m[3]) : new Date().getFullYear();
  return y === new Date().getFullYear() ? dd + "." + mm : dd + "." + mm + "." + String(y).slice(2);
}
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
// Все запросы — POST с токеном в теле (никогда в адресе).
// Apps Script/Google echo иногда отдаёт сырые переводы строк ВНУТРИ JSON-строк
// (многострочный текст в ячейках) — строгий JSON.parse падает. Чиним перед разбором:
// выход JSON.stringify компактный, поэтому ЛЮБОЙ сырой перевод строки — внутри строки.
function safeJsonParse(t){
  return JSON.parse(String(t).trim() // хвостовой \n от Google — наружу
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t"));
}
// ЕДИНЫЙ транспорт: обычный POST, ответ читается как текст и разбирается здесь.
// U11: вместо JSON пришла HTML-страница (сбой/вход Google) — понятная русская ошибка, а не «Unexpected token <».
function parseServerText(t){
  const s = String(t == null ? "" : t).trim();
  if (!s) throw new Error("сервер вернул пустой ответ — попробуй ещё раз");
  if (s[0] === "<"){
    if (/accounts\.google|ServiceLogin|signin/i.test(s)) throw new Error("сервер Google просит вход — скрипт опубликован не для всех (сообщи администратору)");
    throw new Error("сервер вернул страницу вместо данных (сбой Google Apps Script) — подожди минуту и обнови страницу");
  }
  try { return JSON.parse(s); }
  catch(e){ try { return safeJsonParse(s); } catch(e2){ throw new Error("ответ сервера не читается — обнови страницу (Ctrl+F5)"); } }
}
// сетевые сбои и таймауты — по-русски (C: «Failed to fetch» / AbortError больше не показываются как есть)
function netErr(e, timeoutMs){
  const m = String(e && e.message || e || "");
  if (e && e.name === "AbortError") return new Error("сервер не ответил за " + Math.round((timeoutMs || 30000) / 1000) + " с — операция могла выполниться, проверь через минуту");
  if (/Failed to fetch|NetworkError|Load failed|network error|ERR_/i.test(m)) return new Error("нет связи с сервером — проверь интернет и попробуй ещё раз");
  return (e instanceof Error) ? e : new Error(m);
}
// Обновление 4: «эта операция выполняется через POST» — это ответ doGet. Сайт шлёт только POST, но переадресация
// Google на /exec иногда превращает его в GET без тела (doPost при этом не выполняется). Такие ответы, а также
// HTML-страницу вместо JSON, пустой ответ и обрыв сети считаем временным сбоем и повторяем с паузой.
function postOnce(body, ms){
  const ctl = ("AbortController" in window) ? new AbortController() : null;
  const to = ctl ? setTimeout(()=>ctl.abort(), ms) : null;
  const a = encodeURIComponent(String(body && body.action || "")); // в адресе — только имя действия (не секрет); токен — в теле
  const url = CONFIG.API_URL + (CONFIG.API_URL.indexOf("?") < 0 ? "?" : "&") + "a=" + a + "&_=" + Date.now().toString(36);
  return fetch(url, { method:"POST", redirect:"follow", cache:"no-store", credentials:"omit",
      headers:{ "Content-Type":"text/plain;charset=utf-8" },
      body: JSON.stringify(body), signal: ctl ? ctl.signal : undefined })
    .then(r => r.text())
    .then(t => {
      let j;
      try { j = parseServerText(t); }
      catch(e){ e.transient = true; e.htmlish = true; throw e; } // HTML/пусто/нечитаемо — сбой Google, не наш ответ
      if (j && (j.code === "NEED_POST" || /через POST/i.test(String(j.error || "")))){
        const e = new Error("нет связи с сервером — повторяю"); e.transient = true; e.needPost = true; throw e;
      }
      return j;
    })
    .catch(e => {
      if (e && e.transient) throw e;
      const n = netErr(e, ms);
      if (e && e.name === "AbortError") n.timeout = true;
      else if (/нет связи/.test(n.message)) n.transient = true;
      throw n;
    })
    .finally(() => { if (to) clearTimeout(to); });
}
// Обновление 5 (AUDIT4 P1-1): повтор на HTML/пусто/обрыв — ТОЛЬКО для явного списка чтений.
// Всё остальное (save, suggest, resetreq, resetdo, logout, auth, aiq, …) повторяется лишь на NEED_POST —
// тогда doPost точно не выполнялся и двойной записи быть не может.
const READ_RETRY_FE = ["status","users","read","ping","check","thumbs","thumb","screens","sched","mysuggest","suggestlist","resetlist"];
function postRetryable(e, action){
  if (!e || !e.transient) return false;
  if (e.needPost) return true;
  return READ_RETRY_FE.indexOf(action) >= 0;
}
const POST_BACKOFF_MS = [700, 2500];
function postJSON(body, timeoutMs){
  const ms = timeoutMs || 30000;
  const action = String(body && body.action || "");
  let attempt = 0;
  const go = () => postOnce(body, ms).catch(e => {
    if (attempt >= POST_BACKOFF_MS.length || !postRetryable(e, action)) throw e;
    const wait = POST_BACKOFF_MS[attempt++] + Math.floor(Math.random() * 300);
    return new Promise(r => setTimeout(r, wait)).then(go);
  });
  return go().catch(e => {
    if (e && e.needPost){ const n = new Error("нет связи с сервером — повторю чуть позже"); n.transient = true; throw n; } // текст «через POST» наружу не показываем
    throw e;
  });
}
// действия, меняющие таблицу: в режиме «глазами» они запрещены (там чужие права и отфильтрованные данные)
const WRITE_ACTIONS_FE = ["nskfmt","tpl","useradmin","suggest","resetreq","upload","save","add","delrow","delteam","delweek","setoper","touch","setcolor","setplan","delscreen","copyweek","resetok","resetno","suggestdel","suggestset","scrub","taskadd","taskdone","taskreopen","taskdel","suggestreply","mark","newbie","askadd","askdone","pmsave","pmupload","pmdelscreen","pmhide","pmunhide","pmstatus","chpass","editscreen"];
let writeSeq = 0; // v6.6: счётчик записей — фоновое чтение, начатое до записи, не затирает её результат
let sessionGone = false;
function sessionExpired(){ // C: сессия истекла/погашена — сразу окно входа (черновики остаются в браузере)
  if (sessionGone) return; sessionGone = true;
  const keepUser = AUTH.user;
  AUTH.clear();
  try{ sessionStorage.removeItem("dash_cache"); }catch(e){}
  showGate();
  try { document.getElementById("l-user").value = keepUser || ""; document.getElementById("l-msg").textContent = "Сессия истекла — войди снова (несохранённые черновики остались в этом браузере)"; } catch(e){}
  setTimeout(()=>{ sessionGone = false; }, 3000);
}
const readBases85=new Map(), readMetrics85=[];
function mergeDelta85(base,j){
  if(!base || base.base85!==j.from85)throw Error('DELTA_BASE_MISSING');
  const m=new Map((base.rows||[]).map(r=>[JSON.stringify([r._sheet,r._row]),r]));
  j.rows.forEach(r=>m.set(JSON.stringify([r._sheet,r._row]),r));
  const rows=j.order85.map(k=>{if(!m.has(k))throw Error('DELTA_ROW_MISSING');return m.get(k);});
  const result=Object.assign({},base,j.patch85,{rows,gen:j.gen,base85:j.base85});
  (j.unset85||[]).forEach(k=>delete result[k]);return result;
}
async function readTransport85(params,timeoutMs){
  if(params.action!=='read')return postJSON(params,timeoutMs);
  const key=JSON.stringify([params.token,params.viewAs||0,params.week||'latest',!!params.lite]);
  const base=readBases85.get(key), request=Object.assign({},params,{delta85:1});
  if(base)request.base85=base.base85;else delete request.gen;
  const t=performance.now();
  let j=await postJSON(request,timeoutMs);
  if(params.token!==AUTH.token)throw Error('Сессия изменилась, повторите загрузку');
  let bytes=new TextEncoder().encode(JSON.stringify(j)).length, mode=j.same?'без изменений':j.delta85?'изменения':'полный ответ';
  const perf=j.perf85;
  if(j.delta85){
    try{j=mergeDelta85(base,j);}catch(e){
      const retry=Object.assign({},params,{delta85:1});delete retry.gen;
      j=await postJSON(retry,timeoutMs);bytes+=new TextEncoder().encode(JSON.stringify(j)).length;mode='полный после сбоя кэша';
      if(params.token!==AUTH.token)throw Error('Сессия изменилась, повторите загрузку');
    }
  }
  if(j && !j.error && !j.same && Array.isArray(j.rows)){
    const clean=JSON.parse(JSON.stringify(j));delete clean.perf85;
    readBases85.delete(key);readBases85.set(key,clean);
    while(readBases85.size>3)readBases85.delete(readBases85.keys().next().value);
  }
  if(!j.error){readMetrics85.push({ms:Math.round(performance.now()-t),server:perf?perf.totalMs:null,handler:perf?perf.handlerMs:null,source:perf?perf.source:'',bytes,mode,week:params.week||'latest'});if(readMetrics85.length>20)readMetrics85.shift();}
  delete j.perf85;return j;
}
function performancePanel85(){
  const m=readMetrics85.slice(-5).reverse();
  return '<section class="o7-card"><h3>Скорость загрузки данных</h3><p>Последние запросы в этом браузере. Полное время включает сеть и ожидание Google. Размер — JSON-ответ, без сетевых заголовков.</p>'+(!m.length?'<p>Замеров пока нет.</p>':m.map(x=>'<p>'+esc(x.week)+' · '+esc(x.mode)+' · '+(x.ms/1000).toFixed(2)+' с всего · '+(x.server===null?'сервер: нет замера':(x.server/1000).toFixed(2)+' с на сервере')+' · '+(x.bytes/1024).toFixed(1)+' КБ · '+esc(x.source)+'</p>').join(''))+'</section>';
}
function pickWeek85(w){
  if(loadingNow){toast('Дождитесь завершения загрузки недели',true);return;}
  state.week=w;state.page=1;
  if(w==='all'||w==='__month__'){render();ensureFull().then(render);return;}
  // A specific week is fetched on demand. Do not download every other week.
  state.dataFp='';render();load();
}

const featureLoads86=new Map();
function loadFeature86(group,run){
  const tab=state.tab;
  if(!featureLoads86.has(group)){
    const promise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');script.src=group+'.2026-11-05.86.js';
      script.onload=resolve;script.onerror=()=>{script.remove();reject(Error('Не удалось загрузить раздел. Проверьте соединение и повторите.'));};document.head.appendChild(script);
    });featureLoads86.set(group,promise);promise.catch(()=>featureLoads86.delete(group));
  }
  const content=document.getElementById('content');if(content)content.innerHTML='<div class="empty">Загружаю раздел…</div>';
  return featureLoads86.get(group).then(()=>{if(state.tab===tab)return run();}).catch(e=>{if(state.tab===tab&&content){content.textContent=e.message;const retry=document.createElement('button');retry.textContent='Повторить';retry.onclick=()=>render();content.appendChild(retry);}});
}
function updateSafe86(){return !anyDirty() && !pendingWrites() && !Object.keys(state.failedSaves||{}).length && !(typeof pmPending==='function'&&pmPending());}
async function checkVersion86(){
  if(document.visibilityState!=='visible')return;
  try{
    const r=await fetch('version.json',{cache:'no-store',credentials:'omit'});if(!r.ok)return;const v=await r.json();
    if(!/^\d{4}-\d{2}-\d{2}\.\d+$/.test(v.version))return;
    const a=v.version.split('.'),b=CONFIG.VER.split('.');if(a[0]<b[0] || (a[0]===b[0] && Number(a[1])<=Number(b[1])))return;
    let box=document.getElementById('update86');if(box)return;
    box=document.createElement('div');box.id='update86';box.setAttribute('role','status');box.style.cssText='position:fixed;bottom:65px;right:16px;left:16px;z-index:99999;padding:12px;background:var(--panel);color:var(--ink);border:1px solid var(--accent);border-radius:10px;display:flex;gap:12px;flex-wrap:wrap;align-items:center';
    const text=document.createElement('span');text.textContent='Доступна новая версия '+v.version+'. Обновите страницу после сохранения правок.';box.appendChild(text);
    const button=document.createElement('button');button.textContent='Обновить страницу';button.onclick=()=>{if(!updateSafe86()){text.textContent='Есть неотправленные изменения. Дождитесь сохранения или разрешите конфликт перед обновлением.';return;}location.reload();};box.appendChild(button);document.body.appendChild(box);
  }catch(e){}
}
setTimeout(checkVersion86,15000);setInterval(checkVersion86,5*60*1000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')checkVersion86();});

function wp(params, timeoutMs){
  const a = String(params && params.action || "");
  if (viewAsActive() && WRITE_ACTIONS_FE.indexOf(a) >= 0) return Promise.reject(new Error("в режиме «глазами …» изменения отключены — выйди из режима"));
  // v6 (исправление 10): в режиме «глазами» запрос помечается — сервер тоже откажет в любой записи
  const isW = WRITE_ACTIONS_FE.indexOf(a) >= 0 && a !== "tpl"; if (isW) writeSeq++;
  return readTransport85(Object.assign({}, params, { token: AUTH.token }, viewAsActive() ? { viewAs: 1 } : {}), timeoutMs)
    .finally(() => { if (isW) writeSeq++; })
    .then(j => {
      if (j && j.error){
        if (/требуется вход/.test(j.error) && a !== "logout") sessionExpired();
        throw Object.assign(new Error(j.error), {code:j.code,conflicts:j.conflicts});
      }
      return j;
    });
}

// ===== Обновление 6: черновик разбора по скрину (Gemini/Grok на сервере). Ничего не сохраняется: «принять» только
// вписывает текст в поле категории (черновик), в таблицу уходит лишь по «Сохранить в таблицу». =====
function aiDraftText(item){ // чистая
  if (!item || item.state === "unknown" || !String(item.remark||"").trim()) return "";
  const r = String(item.remark).trim().replace(MARK_RE, "");
  return item.state === "ok" ? "✅ " + r : item.state === "warn" ? MARK.warn + r : MARK.bad + r; // v7.2: метка уровня, как от кнопок
}
function aiDraftMerge(existing, add){ // чистая: не дублируем и не затираем написанное человеком
  const e = String(existing || "").trim(), a = String(add || "").trim();
  if (!a) return e;
  if (!e) return a;
  const be = markBody(e), ba = markBody(a);
  if (be.toLowerCase().indexOf(ba.toLowerCase()) >= 0) return e;
  const se = catState(e), sa = catState(a);
  if (sa === "ok" || !sa) return e; // похвала ИИ не перебивает написанное
  const lv = se && se !== "ok" && ST_RANK[se] >= ST_RANK[sa] ? se : sa; // v7.2: уровень — строже из двух, метка одна в начале
  return markAs(be ? be + "\n" + ba : ba, lv);
}
function aiPickScreen(list){ // чистая: кадр/картинка → общее → первый
  const L = list || [];
  const M = L.filter(s=>!isAdvCat(s.cat)); // фото к совету — не разбор трансляции
  return M.find(s=>String(s.cat)==="Кадр / картинка") || M.find(s=>!s.cat) || M[0] || null;
}
function aiAcceptCat(key, item){
  const ta = document.getElementById("ed"+key+"_"+item.i);
  if (!ta) return false;
  const v = aiDraftMerge(ta.value, aiDraftText(item));
  if (v === ta.value.trim()) return false;
  ta.value = v; ta.dispatchEvent(new Event("input", {bubbles:true}));
  return true;
}
async function aiScreenDraft(key, x){
  const scr = aiPickScreen((state.screens||{})[skey(x.r)] || []);
  if (!scr){ aiMsg(key, "🤖 у команды нет скринов"); return; }
  const id = driveId(scr.link || scr.mini || "");
  aiMsg(key, "🤖 ИИ смотрит скрин… (до минуты)");
  try {
    const res = await aiAsk("screendraft", { id: id, text: "", set: isNskRow(x.r) ? "nsk" : "", ckey: "scr|" + (isNskRow(x.r) ? "n|" : "") + id });
    if (res.error) throw new Error(res.error);
    const icon = s => s==="ok" ? "✅" : s==="warn" ? "⚠️" : s==="bad" ? "❌" : "·";
    const col = (d, tag) => {
      if (!d || d.error) return `<div class="aidcol"><b>${esc(tag)}</b><div style="color:var(--warn)">${esc(d && d.error || "нет ответа")}</div></div>`;
      return `<div class="aidcol"><b>${esc(tag)}${d.provider?` <span style="color:var(--faint);font-weight:400">(${esc(d.provider)})</span>`:""}</b>
        ${d.summary?`<div style="color:var(--dim);margin:3px 0">${esc(d.summary)}</div>`:""}
        ${d.cats.map(c=>`<div class="aidrow">${icon(c.state)} <b>${esc(c.cat)}</b> <span>${esc(c.remark||"—")}</span>${aiDraftText(c)?` <button class="qbtn" data-aiacc="${esc(tag)}|${c.i}">принять</button>`:""}</div>`).join("")}
        <button class="abtn2" data-aiall="${esc(tag)}">✅ принять всё (${d.cats.filter(c=>aiDraftText(c)).length})</button></div>`;
    };
    const drafts = { "ИИ": res };
    aiShow(key, box=>{
      box.innerHTML = `<div style="color:var(--faint);font-size:11.5px;margin-bottom:4px">🤖 черновик по скрину${scr.cat?" «"+esc(scr.cat)+"»":""} — ничего не сохранено; «принять» вписывает текст в поле, в таблицу — только «Сохранить»</div>
        <div class="aidgrid">${Object.keys(drafts).map(t=>col(drafts[t], t)).join("")}</div> <button class="abtn2" data-aiclose="1">✕ закрыть</button>`;
      box.querySelectorAll("[data-aiacc]").forEach(b=>b.onclick=()=>{
        const [tag, i] = b.dataset.aiacc.split("|"); const d = drafts[tag]; const it = d && d.cats && d.cats[+i];
        if (it && aiAcceptCat(key, it)){ b.textContent = "✓ вписано"; b.disabled = true; }
      });
      box.querySelectorAll("[data-aiall]").forEach(b=>b.onclick=()=>{
        const d = drafts[b.dataset.aiall]; let n = 0;
        (d && d.cats || []).forEach(it=>{ if (aiAcceptCat(key, it)) n++; });
        aiMsg(key, "🤖 вписано категорий: " + n + " — проверь и нажми «Сохранить в таблицу»");
      });
      const cl = box.querySelector("[data-aiclose]"); if (cl) cl.onclick = ()=>aiHide(key);
    });
  } catch(e){ aiMsg(key, "🤖 " + e.message); }
}
function aiErrText(m){
  m = String(m || "");
  if (/429/.test(m)) return "лимит Gemini — попробуй через пару минут";
  if (/503|500|перегру/.test(m)) return "Gemini перегружен — попробуй ещё раз через минуту";
  return m;
}
function aiAsk(task, extra){
  return postJSON(Object.assign({ action:"aiq", task: task, token: AUTH.token }, extra || {}), 90000)
    .then(j => {
      if (j && j.error){ if (/требуется вход/.test(j.error)) sessionExpired(); throw new Error(aiErrText(j.error)); }
      return j;
    })
    .catch(e => { throw new Error(aiErrText(String(e && e.message || e))); });
}

function strHash(s){ let h = 7; const t = String(s||""); for (let i=0;i<t.length;i++) h = (h*31 + t.charCodeAt(i))|0; return Math.abs(h).toString(36); }
function skey(r){ return r._sheet+"|"+String(r.opNick||"").trim()+"|"+String(r.model||"").trim(); } // стабильный ключ команды
// D: один ключ «команды» для дублей, просрочек, расписания и сравнения недель (город + опер + модель, без регистра)
function teamKey(r){ return r.city+"|"+String(r.opName||r.opNick||"").trim().toLowerCase()+"|"+String(r.model||"").trim().toLowerCase(); }
function driveId(lk){ const m = String(lk||"").match(/[?&]id=([\w-]+)/); return m ? m[1] : String(lk||""); }
const thumbBusy = {}; // id → идёт запрос
// Обновление 6 (8): миниатюра «видна» — не в закрытой карточке, не скрыта и в пределах экрана + 800 px
function thumbVisibleRect(r, vh, margin){ return !!r && r.width > 0 && r.bottom > -margin && r.top < vh + margin; } // чистая
function thumbVisible(im){
  const det = im.closest ? im.closest("tr.detail") : null;
  if (det && !det.classList.contains("open")) return false;
  if (im.offsetParent === null && getComputedStyle(im).position !== "fixed") return false;
  return thumbVisibleRect(im.getBoundingClientRect(), window.innerHeight || 800, 800);
}
let thumbScrollT = null;
window.addEventListener("scroll", ()=>{ clearTimeout(thumbScrollT); thumbScrollT = setTimeout(ensureThumbs, 250); }, { passive: true });
function ensureThumbs(){ // миниатюры через сервер: приватные файлы, доступ только своим
  try { // v6.6: какие из ссылок — видео (значок ▶ и плеер по клику)
    Object.values(state.screens||{}).forEach(noteVideos);
    if (realData && realData.screens) Object.values(realData.screens).forEach(noteVideos);
    if (state.pm && state.pm.screens) Object.values(state.pm.screens).forEach(noteVideos);
    markVideoThumbs();
  } catch(e){}
  // D: одна пачка до 30 миниатюр на запрос вместо запроса на каждую картинку
  const need = {};
  document.querySelectorAll("img[data-tk]").forEach(im=>{
    const lk = im.getAttribute("data-tk"); if (!lk) return;
    if (state.thumbData && state.thumbData[lk]){ if (im.src !== state.thumbData[lk]) im.src = state.thumbData[lk]; return; }
    if (!thumbVisible(im)) return; // Обновление 6 (8): только видимые — закрытые карточки и то, что далеко ниже экрана, не грузим
    const id = driveId(lk);
    if (!/^[\w-]{10,100}$/.test(id) || thumbBusy[id]) return;
    need[id] = lk;
  });
  const ids = Object.keys(need);
  for (let i = 0; i < ids.length; i += 30){
    const part = ids.slice(i, i + 30);
    part.forEach(id=>{ thumbBusy[id] = 1; });
    wp({ action:"thumbs", ids: part }, 60000).then(res=>{
      const d = (res && res.d) || {};
      state.thumbData = state.thumbData || {};
      part.forEach(id=>{
        delete thumbBusy[id];
        if (!d[id]) return; // нет доступа/не влезло — попробуем при следующей отрисовке
        const lk = need[id];
        state.thumbData[lk] = b64Img(d[id]);
        document.querySelectorAll("img[data-tk]").forEach(x=>{ if (x.getAttribute("data-tk") === lk) x.src = state.thumbData[lk]; });
      });
    }).catch(()=>{ part.forEach(id=>{ delete thumbBusy[id]; }); });
  }
}
// Drive-ссылки: uc?export=view блокируется браузером (ORB) — показываем через thumbnail
// Обновление 5: размер миниатюры = размер на экране × devicePixelRatio (шаг 100 px, 200…1000)
function thumbPx(cssW){ const d = Math.min(3, Math.max(1, (typeof window !== "undefined" && window.devicePixelRatio) || 1)); return Math.min(1000, Math.max(200, Math.ceil((cssW||96) * d / 100) * 100)); }
function driveThumb(u, w){
  const m = String(u||"").match(/[?&]id=([\w-]+)/);
  return m ? "https://drive.google.com/thumbnail?id="+m[1]+"&sz=w"+(w||800) : String(u||"");
}
function linksArrFromText(key, text){
  return text.split("\n").map(l=>{ const m = l.match(/^(.+?)\s*=\s*(\S+)$/); return m ? { key: key, title: m[1].trim(), url: m[2] } : null; }).filter(Boolean).filter(l=>/^https?:\/\//i.test(l.url));
}
// ---------- оптимистичное сохранение: «Сохранено» сразу, отправка в фоне пачкой ----------
// правки подряд (1,5 с) склеиваются в один запрос; при ошибке строка краснеет, правка остаётся, есть «повторить»
// D10/B-ретрай: ключ очереди — rk (команда+строка). Черновик удаляется и «✔ Сохранено» показывается
// ТОЛЬКО после ответа сервера; повтор упавшей отправки не перетирает более новые правки того же поля.
let saveSeq = 0, inflightSaves = 0;
const saveQueue = {};
const rowSaveBusy = {};
// v6: облегчённая строка прошлой недели → полный текст с сервера (одна строка), подменяем поля на месте
const _fullReq = {};
function ensureRowFull(r){
  if (!r || !r._lite) return Promise.resolve(r);
  const k = rk(r);
  if (_fullReq[k]) return _fullReq[k];
  _fullReq[k] = wp(Object.assign({ action:"rowfull" }, rowKeyParams(r)), 30000).then(res=>{
    const f = res && res.row;
    if (!f) throw new Error("нет данных");
    const targets = [r].concat(realData && realData.rows ? realData.rows.filter(x=>x!==r && rk(x)===k) : []).concat(state.rows.filter(x=>x!==r && rk(x)===k));
    targets.forEach(t=>{ ["cats","obs","reco","linksTxt","status","updated","scoreM","verdictM","opName"].forEach(f2=>{ if (f[f2] !== undefined) t[f2] = Array.isArray(f[f2]) ? f[f2].slice() : f[f2]; }); delete t._lite; delete t._st; });
    return r;
  }).finally(()=>{ delete _fullReq[k]; });
  return _fullReq[k];
}
function rowByRk(k){ return state.rows.find(r=>rk(r)===k) || (realData ? realData.rows.find(r=>rk(r)===k) : null); }
function queueRowSave(x, key, changes){
  const qk = rk(x.r);
  const q = saveQueue[qk] = saveQueue[qk] || { r: x.r, fields: {}, expected: {}, timer: null, queuedAt: 0 };
  q.r = x.r; q.queuedAt = Date.now(); q.key = key;
  changes.forEach(c => { if (!(c[0] in q.fields) && c[2] !== undefined) q.expected[c[0]] = c[2]; q.fields[c[0]] = c[1]; });
  const opt = state.optimistic[qk] = state.optimistic[qk] || { fields: {} };
  Object.assign(opt.fields, q.fields);
  if (q.timer) clearTimeout(q.timer);
  q.timer = setTimeout(()=>flushRowSave(qk), 1500);
}
function flushAllSaves(){ Object.keys(saveQueue).forEach(qk=>{ const q = saveQueue[qk]; if (q.timer) clearTimeout(q.timer); flushRowSave(qk); }); }
async function flushRowSave(qk){
  if (rowSaveBusy[qk]) return;
  const q = saveQueue[qk]; if (!q) return;
  delete saveQueue[qk];
  const entries = Object.entries(q.fields);
  if (!entries.length) return;
  rowSaveBusy[qk] = true;
  if (q.timer) clearTimeout(q.timer);
  const seq = ++saveSeq;
  const fos = state.fieldOkSeq[qk] = state.fieldOkSeq[qk] || {};
  entries.forEach(c=>{ fos[c[0]] = seq; }); // последняя отправка каждого поля
  const isLatest = f => fos[f] === seq && !(saveQueue[qk] && f in saveQueue[qk].fields);
  const params = Object.assign({ action:"save" }, rowKeyParams(q.r));
  entries.forEach((c,i)=>{ params["f"+(i+1)] = c[0]; params["v"+(i+1)] = c[1]; if (q.expected && q.expected[c[0]] !== undefined) params["e"+(i+1)] = q.expected[c[0]]; });
  inflightSaves++;
  try {
    const res = await wp(params);
    if (res.error) throw new Error(res.error);
    if (res.historyWarning) toast(res.historyWarning,true);
    if (isNskRow(q.r) && q.fields[FIELDCODES[3]] !== undefined) botCatalogLearn(botsParse(q.fields[FIELDCODES[3]]).bots);
    const opt = state.optimistic[qk];
    if (opt){ entries.forEach(c=>{ if (isLatest(c[0])) delete opt.fields[c[0]]; }); if (!Object.keys(opt.fields).length) delete state.optimistic[qk]; }
    const fs = state.failedSaves[qk];
    if (fs){ entries.forEach(c=>{ delete fs.fields[c[0]]; }); if (!Object.keys(fs.fields).length) delete state.failedSaves[qk]; }
    const cur = rowByRk(qk) || q.r;
    if (res.stamp) cur.updated = res.stamp;
    const d = getDraft(cur);
    if (d && !q.preserveDraft && !(d.ts > q.queuedAt) && !saveQueue[qk]) clearDraft(cur); // правки после «Сохранить» остаются в черновике
    if (q.preserveDraft && !saveQueue[qk]) reviewPruneResolvedDraft(cur,q);
    autoSaveStatus84(q.key, saveQueue[qk] || getDraft(cur) ? "Есть изменения, ожидающие сохранения…" : "Сохранено");
    softRender();
    setTimeout(()=>{ try { const sb = q.key != null ? document.getElementById("sv" + q.key) : null; if (sb) fxClass(sb, "saved", 1200); } catch(e){} }, 90); // v7.3: вспышка «сохранено» — после перерисовки карточки
  } catch(e){
    const pending = saveQueue[qk];
    if (pending) entries.forEach(c=>{ if (c[0] in pending.fields && q.expected && q.expected[c[0]] !== undefined) pending.expected[c[0]] = q.expected[c[0]]; });
    const keep = {};
    entries.forEach(c=>{ if (isLatest(c[0])) keep[c[0]] = c[1]; });
    const opt = state.optimistic[qk];
    if (opt){ Object.keys(keep).forEach(f=>{ delete opt.fields[f]; }); if (!Object.keys(opt.fields).length) delete state.optimistic[qk]; }
    if (Object.keys(keep).length){
      const prev = state.failedSaves[qk];
      state.failedSaves[qk] = { fields: Object.assign({}, prev ? prev.fields : {}, keep), expected: Object.assign({}, prev ? prev.expected : {}, q.expected), msg: e.message, code: e.code };
    }
    if(pending){
      if(pending.timer) clearTimeout(pending.timer);
      const f=state.failedSaves[qk] || {fields:{},expected:{}};
      f.fields=Object.assign({},q.fields,pending.fields);
      f.expected=Object.assign({},pending.expected,q.expected); f.msg=e.message; f.code=e.code;
      state.failedSaves[qk]=f; delete saveQueue[qk];
    }
    autoSaveStatus84(q.key,e.code === "SAVE_CONFLICT" ? "Конфликт — сравните версии" : "Не сохранено — проверьте связь");
    toast("Не сохранилось: " + e.message + (e.code === "SAVE_CONFLICT" ? " — нажми «Сравнить версии»" : " — правка осталась в черновике, нажми «Повторить»"), true);
    softRender();
  } finally { inflightSaves--; delete rowSaveBusy[qk]; if (saveQueue[qk]) flushRowSave(qk); }
}
function applyOptimistic_(qk, fields){ // после обновления данных возвращаем несохранённые правки на место
  const r = state.rows.find(x=>rk(x)===qk);
  if (!r) return;
  Object.entries(fields||{}).forEach(([f,v])=>{
    const j = FIELDCODES.indexOf(f);
    if (j >= 0) r.cats[j] = v;
    else if (f === "comment") r.obs = v;
    else if (f === "score") r.scoreM = v;
    else if (f === "verdict") r.verdictM = v;
    else if (f === "recs") r.reco = v;
    else if (f === "links") r.linksTxt = v;
  });
}
async function saveRow(x, key, automatic=false){
  if (!AUTH.edit){ toast("Править может только редактор", true); return; }
  if (!rowEditable(x.r)){ toast("Эта неделя открыта только для просмотра — выбери её в списке недель", true); return; }
  if (state.failedSaves[rk(x.r)]?.code === "SAVE_CONFLICT") { if(!automatic) reviewConflict(x,key); return; }
  const btn = document.getElementById("sv"+key);
  const need = needText(CATS.map((n,j)=>{ const el = document.getElementById("ed"+key+"_"+j), v = el ? el.value : ""; return v === (x.r.cats[j]||"") ? "" : v; })); // проверяем только изменённые поля: старый голый «❌» в таблице не блокирует
  if (!automatic && need.length){ markNeed(need.map(j=>document.getElementById("ed"+key+"_"+j))); toast("Допиши, что не так: " + need.map(j=>catsOf(x.r)[j]).join(", "), true); return; }
  if (!automatic && isNskRow(x.r)){ const gaps = nskGaps(x, key); if (gaps.length) toast("Сохраняю, но в разборе не хватает: " + gaps.join("; "), true); } // v7.7: не блокируем — напоминаем
  const changes = [];
  for (let j=0;j<9;j++){
    const val = document.getElementById("ed"+key+"_"+j).value;
    if (val !== (x.r.cats[j]||"")) changes.push([FIELDCODES[j], val]);
  }
  const com = document.getElementById("ed"+key+"_comment").value;
  if (com !== (x.r.obs||"")) changes.push(["comment", com]);
  // ручная оценка/вердикт сравниваются с нормализованным значением сервера —
  // иначе «7» и " 7 " считались разными и сохранение чужого поля стирало оценку
  const sco = document.getElementById("ed"+key+"_score").value;
  if (sco !== String(x.r.scoreM == null ? "" : x.r.scoreM).trim().replace(",",".")) changes.push(["score", sco]);
  const ver = document.getElementById("ed"+key+"_verdict").value;
  if (ver !== String(x.r.verdictM == null ? "" : x.r.verdictM).trim()) changes.push(["verdict", ver]);
  const rec = document.getElementById("ed"+key+"_reco").value;
  if (rec !== (x.r.reco||"")) changes.push(["recs", rec]);
  // ссылки — per строка (колонка U «Ссылки»), сохраняются основным «Сохранить»
  const lkEl = document.getElementById("lk"+key);
  const linksNew = lkEl ? normLinks(lkEl.value) : "";
  if (lkEl && linksNew !== normLinks(x.r.linksTxt||"")) changes.push(["links", linksNew]);
  const failed84=state.failedSaves[rk(x.r)];
  if(failed84) Object.entries(failed84.fields).forEach(([f,v])=>{if(!changes.some(c=>c[0]===f)) changes.push([f,v]);});
  if (!changes.length){ if(!automatic) toast("Изменений нет", true); return; }
  changes.forEach(c=>{ const j = FIELDCODES.indexOf(c[0]); if (j >= 0) acLearn(j, c[1]); }); // v6.6: свои формулировки — в автоподсказки
  changes.forEach(c=>{ const j = FIELDCODES.indexOf(c[0]); const prop = {comment:"obs",score:"scoreM",verdict:"verdictM",recs:"reco",links:"linksTxt"}[c[0]]; const failed = state.failedSaves[rk(x.r)]; c[2] = failed && failed.expected && failed.expected[c[0]] !== undefined ? failed.expected[c[0]] : String((j >= 0 ? x.r.cats[j] : x.r[prop]) ?? ""); });
  // оптимистично: значения применяем сразу, «Сохранено» показываем сразу, отправка — фоном пачкой
  changes.forEach(c=>{
    const j = FIELDCODES.indexOf(c[0]);
    if (j >= 0) x.r.cats[j] = c[1];
    else if (c[0] === "comment") x.r.obs = c[1];
    else if (c[0] === "score") x.r.scoreM = c[1];
    else if (c[0] === "verdict") x.r.verdictM = c[1];
    else if (c[0] === "recs") x.r.reco = c[1];
    else if (c[0] === "links") x.r.linksTxt = c[1];
  });
  // черновик НЕ удаляем — он удалится после подтверждения сервера (flushRowSave)
  const fs = state.failedSaves[rk(x.r)];
  if (fs){ changes.forEach(c=>{ delete fs.fields[c[0]]; }); if (!Object.keys(fs.fields).length) delete state.failedSaves[rk(x.r)]; }
  if(!automatic) toast("⏳ Отправляю в таблицу…");
  queueRowSave(x, key, changes);
  autoSaveStatus84(key,"Сохраняется…");
  if(!automatic) render();
}

// v7.6: продюсеры компании из блоков листа (в том числе новые, у которых ещё нет команд)
function blockProds(city){
  const wk = state.serverLatest || "";
  return [...new Set((state.pblocks||[]).filter(b=>b.city===city && (!wk || b.week===wk)).map(b=>b.producer).filter(Boolean))];
}
// в компании: продюсеры без команд — чтобы новый продюсер был виден сразу и ему можно было добавить команду
function emptyProdsHtml(groups){
  if (!CITY_ORDER.includes(state.tab) || AUTH.prod || state.search || state.quick || state.producer) return "";
  const have = new Set((groups||[]).map(g=>g.producer));
  const list = blockProds(state.tab).filter(p=>!have.has(p)).sort((a,b)=>a.localeCompare(b, "ru"));
  if (!list.length) return "";
  return `<div class="pempty-prods">${list.map(p=>`<div class="pempty-p"><span class="cdot" style="background:${esc((state.colors||{})[p] || "#9aa3b2")}"></span><b>${esc(p)}</b><span class="pempty-t">команд пока нет</span><span class="sp"></span>${AUTH.edit ? `<button class="gbtn addg" data-addg="${esc(state.tab + "|" + p)}" ${weekPinned()?"disabled":""}>+ Команда</button>` : ""}</div>`).join("")}</div>`;
}
// ---------- форма нового мониторинга ----------
function updateProdList(){
  const city = document.getElementById("a-city").value;
  const list = [...new Set(state.rows.filter(r=>r.city===city).map(r=>r.producer).filter(Boolean).concat(blockProds(city)))].sort((a,b)=>a.localeCompare(b, "ru"));
  const sel = document.getElementById("a-prod");
  if (!sel) return;
  if (!list.length){
    sel.innerHTML = `<option value="__new">➕ Впиши нового продюсера…</option>`;
    sel.value = "__new";
    document.getElementById("a-newrow").style.display = "";
    return;
  }
  sel.innerHTML = `<option value="" disabled>— выбери продюсера (${esc(clabel(city))}) —</option>` +
    list.map(p=>`<option>${esc(p)}</option>`).join("") + `<option value="__new">➕ Другой продюсер…</option>`;
  sel.value = "";
  document.getElementById("a-newrow").style.display = "none";
  document.getElementById("a-prod-new").value = "";
}
document.getElementById("a-city").onchange = updateProdList;
document.getElementById("a-prod").onchange = e=>{
  document.getElementById("a-newrow").style.display = e.target.value==="__new" ? "" : "none";
};
document.getElementById("addbtn").onclick = ()=>{
  if (!AUTH.edit){ toast("Добавлять команды может только редактор — войди (🔑)", true); return; }
  if (weekPinned()){ toast("Сначала выбери конкретную неделю в списке недель (сейчас «все»/«месяц»)", true); return; }
  document.getElementById("a-msg").textContent = "";
  updateProdList();
  try{ const last = JSON.parse(localStorage.getItem("dash_addlast")||"null"); if (last && last.city){ document.getElementById("a-city").value = last.city; updateProdList(); const sel0=document.getElementById("a-prod"); if (last.prod && Array.from(sel0.options).some(o=>o.textContent===last.prod)) sel0.value = last.prod; } }catch(e){}
  openModal("addmodal");
};
document.getElementById("add-x").onclick = ()=>closeModal("addmodal");
document.getElementById("task-x").onclick = ()=>closeModal("taskmodal");
document.getElementById("tk-save").onclick = async ()=>{
  const ta = document.getElementById("tk-text");
  const msg = document.getElementById("tk-msg");
  const text = ta.value.trim();
  if (!text){ msg.textContent = "Напиши, что исправить"; return; }
  msg.textContent = "Ставлю…";
  try {
    const base = { action:"taskadd", sheet: ta.dataset.sheet, nick: ta.dataset.nick, model: ta.dataset.model, producer: ta.dataset.producer, text: text };
    let r = await wp(base);
    if (r.error) throw new Error(r.error);
    if (r.conflict){ // B: открытая задача не перетирается молча
      const ex = r.existing || {};
      const head = "У этой команды уже есть открытая задача" + (ex.from ? " от " + ex.from : "") + (ex.when ? " (" + ex.when + ")" : "") + ":\n«" + String(ex.text||"").slice(0, 300) + "»\n\n";
      let mode = "";
      if (confirm(head + "ОК — ДОПИСАТЬ новый текст к ней.\nОтмена — выбрать другое.")) mode = "append";
      else if (confirm(head + "ОК — ЗАМЕНИТЬ её текст новым.\nОтмена — ничего не менять.")) mode = "replace";
      if (!mode){ msg.textContent = "Отменено — задача не изменена"; return; }
      r = await wp(Object.assign({ mode: mode }, base));
      if (r.error) throw new Error(r.error);
    }
    msg.textContent = "✔ Задача поставлена — продюсер увидит во вкладке «Мои задачи»";
    ta.value = "";
    setTimeout(load, 500);
  } catch(e){ msg.textContent = "Ошибка: " + e.message; }
};
document.getElementById("plan-x").onclick = ()=>closeModal("planmodal");
document.getElementById("pl-save").onclick = async ()=>{
  const key = document.getElementById("pl-text").dataset.key;
  const msg = document.getElementById("pl-msg");
  msg.textContent = "Сохраняю…";
  const params = { action:"setplan", bkey: key, plan: document.getElementById("pl-text").value }; // bkey: «key» занят секретным ключом
  try {
    const res = await wp(params);
    if (res.error) throw new Error(res.error);
    state.plans[key] = document.getElementById("pl-text").value;
    closeModal("planmodal");
    toast("✔ План сохранён");
    render();
  } catch(e){ msg.textContent = "Ошибка: " + e.message; }
};
// U5: точки цвета рисуются при каждой перерисовке — обработчик делегирован (раньше вешался один раз при загрузке скрипта,
// когда точек ещё не было, и выбор цвета не открывался)
document.addEventListener("click", function(ev){
  const d = ev.target && ev.target.closest ? ev.target.closest(".cdot[data-prod]") : null;
  if (!d) return;
  ev.stopPropagation(); ev.preventDefault();
  if (!AUTH.edit || viewAsActive()){ toast("Цвет может поменять только редактор", true); return; }
  if (!d.dataset.prod) return;
  const cp = document.getElementById("colorpick");
  cp.dataset.prod = d.dataset.prod;
  cp.value = /^#[0-9a-f]{6}$/i.test(state.colors[d.dataset.prod]||"") ? state.colors[d.dataset.prod] : "#5b9dff";
  cp.click();
}, true);
document.getElementById("colorpick").onchange = async function(){
  if (!this.dataset.prod) return;
  try {
    const res = await wp({ action:"setcolor", producer: this.dataset.prod, color: this.value });
    if (res.error) throw new Error(res.error);
    state.colors[this.dataset.prod] = this.value; // сразу видно, без ожидания перезагрузки
    if (realData && realData.colors) realData.colors[this.dataset.prod] = this.value;
    toast("✔ Цвет команды «" + this.dataset.prod + "» сохранён");
    softRender();
  } catch(e){ toast("Ошибка: " + e.message, true); }
};
function nextWeekLabel(label){
  // «21-27.09» и «28.09-04.10» (раньше второй формат разбирался как «09-04.10» → неверная дата)
  const end = weekEndDate(label);
  if (!end) return "";
  const d2 = new Date(end.getTime()); d2.setDate(d2.getDate()+7);
  const d1 = new Date(d2.getTime()); d1.setDate(d1.getDate()-6);
  const f1 = d1.getDate(), m1 = d1.getMonth()+1, f2 = d2.getDate(), m2 = d2.getMonth()+1;
  const p2 = n => (n < 10 ? "0" : "") + n; // формат листов: «дд-дд.мм» (как «21-27.09»)
  return m1===m2 ? p2(f1)+"-"+p2(f2)+"."+p2(m2) : p2(f1)+"."+p2(m1)+"-"+p2(f2)+"."+p2(m2);
}
document.getElementById("weekbtn").onclick = ()=>{
  const weeks = [...new Set(realRows().map(r=>r.week).concat(state.knownWeeks||[]).filter(Boolean))].sort((a,b)=>weekKey(a)-weekKey(b));
  const sel = document.getElementById("w-base");
  sel.innerHTML = weeks.map(w=>`<option>${esc(w)}</option>`).join("") || "<option>— нет недель —</option>";
  const del = document.getElementById("w-del");
  del.innerHTML = weeks.map(w=>`<option>${esc(w)}</option>`).join("") || "<option value=\"\">— нет недель —</option>";
  document.getElementById("w-delmsg").textContent = "";
  document.getElementById("w-msg").textContent = "";
  if (weeks.length) sel.value = weeks[weeks.length-1];
  document.getElementById("w-name").value = nextWeekLabel(weeks[weeks.length-1] || "");
  openModal("weekmodal");
};
document.getElementById("week-x").onclick = ()=>closeModal("weekmodal");
document.getElementById("del-x").onclick = ()=>closeModal("delmodal");
async function doDelTeam(all){
  if (weekPinned()){ toast("Удаление — только с конкретной неделей: выбери её в списке недель", true); closeModal("delmodal"); return; }
  const ov = document.getElementById("delmodal");
  const parts = (ov.dataset.key||"").split("|");
  const city = parts[0]||"", prod = parts[1]||"";
  const msg = document.getElementById("d-msg");
  const any = state.rows.find(r=>r.city===city && r.producer===prod && weekOpen_(r)); // открытая неделя
  if (!any){ msg.textContent = "Команда не найдена"; return; }
  if (!confirm(all ? "Удалить команду «"+prod+"» со ВСЕХ недель компании "+clabel(city)+"? Действие необратимо." : "Удалить команду «"+prod+"» с недели "+(any.week||"—")+" компании "+clabel(city)+"? Действие необратимо.")) return;
  msg.textContent = "Удаляю…";
  try {
    const res = await wp({ action:"delteam", sheet: any._sheet, producer: prod, all: all?"1":"0" });
    if (res.error) throw new Error(res.error);
    closeModal("delmodal");
    toast("✔ Удалено листов: " + (res.removed||0));
    setTimeout(load, 800);
  } catch(e){ msg.textContent = "Ошибка: " + e.message; }
}
document.getElementById("d-one").onclick = ()=>doDelTeam(false);
document.getElementById("d-all").onclick = ()=>doDelTeam(true);
document.getElementById("op-x").onclick = ()=>closeModal("opmodal");
document.getElementById("cam-x").onclick = ()=>closeModal("cammodal");
document.getElementById("vid-x").onclick = ()=>closeModal("vidmodal");
document.getElementById("mk-x").onclick = ()=>closeModal("markmodal");
document.getElementById("mk-save").onclick = ()=>saveMark(false);
document.getElementById("mk-clear").onclick = ()=>saveMark(true);
document.getElementById("presbtn").onclick = ()=>presOpen();
// Обновление 5: просмотр скрина — заглушка-миниатюра, затем оригинал полного размера; клик — 1:1 / вписать
let camSeq = 0;
function camShow(src, isMini){
  const w = document.getElementById("cam-wrap"); if (w) w.classList.remove("zoom");
  document.getElementById("cam-img").src = src || BLANK;
  const q = document.getElementById("cam-q"); if (q) q.textContent = isMini ? "миниатюра · загружаю…" : "";
  const ob = document.getElementById("cam-orig"); if (ob) ob.style.display = "none";
}
// Обновление 7: просмотр — сначала облегчённая копия до 1600 px (сервер через Drive thumbnail),
// оригинал полного размера — только по кнопке «⚡ оригинал» (телефон не тянет 5–6 МБ в память).
let camOrigId = "";
function camLoadFull(id){
  const my = ++camSeq;
  camOrigId = id || "";
  const ob = document.getElementById("cam-orig"); if (ob) ob.style.display = id ? "" : "none";
  const eb = document.getElementById("cam-edit"); if (eb) eb.style.display = id && camCanEdit(id) ? "" : "none";
  if (!id) return;
  wp({ action:"thumb", id: id, full: "1" }, 90000).then(res=>{
    if (my !== camSeq) return; // уже открыт другой скрин
    const q = document.getElementById("cam-q");
    if (!res || res.error || !res.d){ if (q) q.textContent = "скрин недоступен — показана миниатюра"; return; }
    const im = document.getElementById("cam-img");
    im.onload = ()=>{ if (my === camSeq && q) q.textContent = im.naturalWidth ? (im.naturalWidth + "×" + im.naturalHeight) : ""; im.onload = null; };
    im.src = b64Img(res.d);
  }).catch(()=>{ const q = document.getElementById("cam-q"); if (my === camSeq && q) q.textContent = "нет связи — показана миниатюра"; });
}
function camLoadOrig(){ if(camOrigId)camLoadFull(camOrigId); }

document.getElementById("cam-wrap").onclick = ()=>document.getElementById("cam-wrap").classList.toggle("zoom");
document.getElementById("cam-orig").onclick = camLoadOrig;
// v6.8: разметка уже загруженного скрина. Права проверяет сервер; кнопку показываем, где правка возможна.
function camFindShot(id){
  const hit = (map, pm)=>{ for (const k of Object.keys(map||{})) for (const sc of map[k] || []) if (driveId(sc.link) === id) return { key: k, sc, pm }; return null; };
  return hit(state.screens, false) || hit((state.pm||{}).screens, true);
}
function camCanEdit(id){
  if (!AUTH.ok() || viewAsActive()) return false;
  const f = camFindShot(id); if (!f || f.sc.type === "video") return false;
  if (!f.pm) return !!AUTH.edit;
  const it = ((state.pm||{}).items||[]).find(x=>"PM|" + x.id === f.key);
  if (!it) return false;
  if (it.status === "скрыта") return !AUTH.prod && !!AUTH.edit;
  return AUTH.prod ? !["принято"].includes(it.status) && state.pm.week === state.pm.latest : !!AUTH.edit;
}
async function camEditShot(){
  const id = camOrigId, f = camFindShot(id); if (!id || !f) return;
  const btn = document.getElementById("cam-edit"), q = document.getElementById("cam-q");
  btn.disabled = true; if (q) q.textContent = "загружаю оригинал для разметки…";
  try {
    const res = await wp({ action:"thumb", id, full: "1" }, 90000);
    if (!res || !res.d) throw new Error("оригинал недоступен");
    const blob = new Blob([b64Bytes(res.d)], { type: b64Img(res.d).slice(5, b64Img(res.d).indexOf(";")) });
    const keepRow = document.getElementById("ann-keep").closest("label"); if (keepRow) keepRow.style.display = "none"; // «загрузить и оригинал» здесь не нужно
    let out = null;
    try { out = await annotateOne(blob, ""); } finally { if (keepRow) keepRow.style.display = ""; }
    if (!out || !out.marked){ if (q) q.textContent = ""; return; }
    if (q) q.textContent = "сохраняю…";
    const enc = await shotEncode(out.blob);
    const r = await wp({ action:"editscreen", link: f.sc.link, data: enc.data, small: enc.small }, 90000);
    const old = f.sc.link, oldMini = f.sc.mini;
    [state.screens, (state.pm||{}).screens, realData && realData.screens].forEach(m=>Object.values(m||{}).forEach(l=>l.forEach(sc=>{ if (sc.link === old){ sc.link = r.link; sc.mini = r.mini; } })));
    if (state.thumbData){ delete state.thumbData[old]; delete state.thumbData[oldMini]; }
    camOrigId = driveId(r.link);
    document.getElementById("cam-img").src = URL.createObjectURL(out.blob);
    if (q) q.textContent = "✓ размеченный скрин сохранён";
    toast("✏ Скрин заменён размеченным");
    softRender();
  } catch(e){ if (q) q.textContent = ""; toast("Не сохранилось: " + e.message, true); }
  finally { btn.disabled = false; }
}
document.getElementById("cam-edit").onclick = camEditShot;
// ---------- окно вставки фото (кнопка или Ctrl+V) ----------
let uplTarget = null;
function openUpload(x, catIdx, label, adv){
  uplTarget = { x: x, catIdx: catIdx, adv: !!adv };
  document.getElementById("u-title").textContent = "📷 Фото — " + label;
  document.getElementById("u-msg").textContent = "";
  openModal("uplmodal");
}
// Обновление 6 (6): разметка скрина перед загрузкой — рисуем в координатах картинки, на выходе JPEG того же размера
const ANN_COLORS = ["#ff3b30","#ffcc00","#34c759","#0a84ff","#ffffff"];
function annPoint(rect, cw, ch, clientX, clientY){ // чистая: экранные → координаты картинки
  const x = (clientX - rect.left) * cw / (rect.width || 1), y = (clientY - rect.top) * ch / (rect.height || 1);
  return { x: Math.max(0, Math.min(cw, x)), y: Math.max(0, Math.min(ch, y)) };
}
function annArrowHead(x1, y1, x2, y2, size){ // чистая: две точки «усиков» стрелки
  const a = Math.atan2(y2 - y1, x2 - x1), s = size || 20;
  return [{ x: x2 - s * Math.cos(a - Math.PI/7), y: y2 - s * Math.sin(a - Math.PI/7) }, { x: x2 - s * Math.cos(a + Math.PI/7), y: y2 - s * Math.sin(a + Math.PI/7) }];
}
function annDraw(ctx, img, shapes, W){
  ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
  const lw = Math.max(3, Math.round(W / 320));
  shapes.forEach(s=>{
    ctx.strokeStyle = ctx.fillStyle = s.c; ctx.lineWidth = lw; ctx.lineCap = "round"; ctx.lineJoin = "round";
    if (s.t === "rect"){ ctx.strokeRect(Math.min(s.x1,s.x2), Math.min(s.y1,s.y2), Math.abs(s.x2-s.x1), Math.abs(s.y2-s.y1)); }
    else if (s.t === "pen"){ const p = s.pts || []; if (p.length > 1){ ctx.beginPath(); ctx.moveTo(p[0].x, p[0].y); for (let i=1;i<p.length;i++) ctx.lineTo(p[i].x, p[i].y); ctx.stroke(); } }
    else if (s.t === "arrow"){
      ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
      const h = annArrowHead(s.x1, s.y1, s.x2, s.y2, lw * 5);
      ctx.beginPath(); ctx.moveTo(s.x2, s.y2); ctx.lineTo(h[0].x, h[0].y); ctx.lineTo(h[1].x, h[1].y); ctx.closePath(); ctx.fill();
    } else if (s.t === "text"){
      const fs = Math.max(18, Math.round(W / 40));
      ctx.font = "bold " + fs + "px sans-serif"; ctx.lineWidth = Math.max(3, fs / 6); ctx.strokeStyle = "rgba(0,0,0,.75)";
      ctx.strokeText(s.text, s.x1, s.y1); ctx.fillText(s.text, s.x1, s.y1);
    }
  });
}
// v6.6: обрезка — чистая функция прямоугольника (в координатах картинки, в пределах холста, не меньше 16 px)
function cropRect(c, W, H){
  if (!c) return null;
  const x = Math.max(0, Math.min(c.x1, c.x2)), y = Math.max(0, Math.min(c.y1, c.y2));
  const w = Math.min(W, Math.max(c.x1, c.x2)) - x, h = Math.min(H, Math.max(c.y1, c.y2)) - y;
  return (w >= 16 && h >= 16) ? { x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) } : null;
}
function annCropOverlay(ctx, c, W, H){ // затемнение всего, что будет обрезано
  const r = cropRect(c, W, H); if (!r) return;
  ctx.save(); ctx.fillStyle = "rgba(0,0,0,.55)";
  ctx.fillRect(0, 0, W, r.y); ctx.fillRect(0, r.y + r.h, W, H - r.y - r.h); ctx.fillRect(0, r.y, r.x, r.h); ctx.fillRect(r.x + r.w, r.y, W - r.x - r.w, r.h);
  ctx.strokeStyle = "#fff"; ctx.setLineDash([10, 6]); ctx.lineWidth = Math.max(2, W / 600); ctx.strokeRect(r.x, r.y, r.w, r.h); ctx.restore();
}
// очередь файлов на разметку: каждый — по очереди через окно; на выходе — размеченный JPEG (+ оригинал по галочке)
function annotateGate(files, enqueue){
  const on = document.getElementById("u-ann") && document.getElementById("u-ann").checked;
  const vids = files.filter(isVideoBlob); if (vids.length) enqueue(vids); // видео — без разметки
  files = files.filter(f=>!isVideoBlob(f));
  if (!files.length) return;
  if (!on){ enqueue(files); return; }
  const rest = files.slice();
  const next = async ()=>{
    const f = rest.shift(); if (!f) return;
    try {
      const res = await annotateOne(f, rest.length);
      if (res && res.keepOrig) enqueue([f], { tag: "оригинал" });
      if (res && res.blob) enqueue([res.blob], { tag: res.marked ? "с разметкой" : "" });
    } catch(e){ toast("Разметка: " + e.message, true); enqueue([f]); }
    next();
  };
  next();
}
function annotateOne(file, left){
  return new Promise(async (resolve)=>{
    const img = await createImageBitmap(file);
    const MAX = 2560, k = Math.min(1, MAX / Math.max(img.width, img.height));
    const cv = document.getElementById("ann-cv"); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
    const ctx = cv.getContext("2d");
    const shapes = []; let tool = "arrow", color = ANN_COLORS[0], cur = null, crop = null;
    document.querySelectorAll("[data-anntool]").forEach(b=>b.classList.toggle("on", b.dataset.anntool === "arrow")); // новый скрин — снова «стрелка»
    const unc = document.getElementById("ann-uncrop");
    const redraw = ()=>{
      annDraw(ctx, img, cur && cur.t !== "crop" ? shapes.concat([cur]) : shapes, cv.width);
      annCropOverlay(ctx, cur && cur.t === "crop" ? cur : crop, cv.width, cv.height);
      if (unc) unc.style.display = crop ? "" : "none";
    };
    if (unc) unc.onclick = ()=>{ crop = null; redraw(); };
    document.getElementById("ann-colors").innerHTML = ANN_COLORS.map(c=>`<button class="anncol${c===color?" on":""}" data-annc="${c}" style="background:${c}"></button>`).join("");
    document.querySelectorAll("[data-annc]").forEach(b=>b.onclick=()=>{ color = b.dataset.annc; document.querySelectorAll("[data-annc]").forEach(z=>z.classList.toggle("on", z===b)); });
    document.querySelectorAll("[data-anntool]").forEach(b=>b.onclick=()=>{ tool = b.dataset.anntool; document.querySelectorAll("[data-anntool]").forEach(z=>z.classList.toggle("on", z===b)); });
    document.getElementById("ann-left").textContent = left ? "после этого — ещё " + left : "";
    document.getElementById("ann-keep").checked = false;
    const pt = ev => annPoint(cv.getBoundingClientRect(), cv.width, cv.height, ev.clientX, ev.clientY);
    cv.onpointerdown = ev=>{
      ev.preventDefault(); const a = pt(ev);
      if (tool === "text"){ const t = prompt("Текст на скрине:"); if (t && t.trim()){ shapes.push({ t:"text", c:color, x1:a.x, y1:a.y, text:t.trim().slice(0,80) }); redraw(); } return; }
      cur = { t: tool, c: color, x1: a.x, y1: a.y, x2: a.x, y2: a.y }; if (tool === "pen") cur.pts = [a]; try { cv.setPointerCapture(ev.pointerId); } catch(e){}
    };
    cv.onpointermove = ev=>{ if (!cur) return; const a = pt(ev); cur.x2 = a.x; cur.y2 = a.y; if (cur.pts) cur.pts.push(a); redraw(); };
    cv.onpointerup = ()=>{
      if (!cur) return;
      if (cur.t === "crop") crop = cropRect(cur, cv.width, cv.height) ? cur : crop;
      else if (cur.t === "pen" ? (cur.pts && cur.pts.length > 2) : Math.hypot(cur.x2-cur.x1, cur.y2-cur.y1) > 6) shapes.push(cur);
      cur = null; redraw();
    };
    document.getElementById("ann-undo").onclick = ()=>{ if (shapes.length) shapes.pop(); else crop = null; redraw(); };
    document.getElementById("ann-clear").onclick = ()=>{ shapes.length = 0; crop = null; redraw(); };
    let done = false;
    annOnClose = ()=>finish(null);
    const finish = (val)=>{ if (done) return; done = true; annOnClose = null; closeModal("annmodal"); cv.onpointerdown = cv.onpointermove = cv.onpointerup = null; resolve(val); };
    document.getElementById("ann-ok").onclick = ()=>{
      const cr = cropRect(crop, cv.width, cv.height);
      if (!shapes.length && !cr){ finish({ blob: file, marked: false }); return; }
      const keep = document.getElementById("ann-keep").checked;
      annDraw(ctx, img, shapes, cv.width); // без затемнения обрезки
      let outCv = cv;
      if (cr){ outCv = document.createElement("canvas"); outCv.width = cr.w; outCv.height = cr.h; outCv.getContext("2d").drawImage(cv, cr.x, cr.y, cr.w, cr.h, 0, 0, cr.w, cr.h); }
      outCv.toBlob(b=>finish({ blob: b || file, marked: !!b, keepOrig: keep }), "image/jpeg", 0.95);
    };
    document.getElementById("ann-skip").onclick = ()=>finish({ blob: file, marked: false });
    document.getElementById("ann-x").onclick = ()=>finish(null); // закрыть — этот скрин не загружать
    redraw(); openModal("annmodal");
  });
}
// Обновление 6 (5): очередь загрузки — несколько скринов из буфера/перетаскивания/выбора, по одному, с прогрессом.
// Лимиты JPEG прежние (сжатие в uploadScreen). Окно можно закрыть — очередь догрузится, итог придёт тостом.
const uplQueue = { items: [], running: false };
function uplImagesFrom(list){ // чистая: из FileList/DataTransferItemList — картинки и (v6.6) короткие видео, не больше 20
  const out = [];
  for (let i = 0; i < (list ? list.length : 0); i++){
    const it = list[i]; if (!it) continue;
    const f = (typeof it.getAsFile === "function") ? (it.kind === "file" || /^(image|video)\//.test(it.type||"") ? it.getAsFile() : null) : it;
    if (f && (!f.type || /^(image|video)\//.test(f.type))) out.push(f);
    if (out.length >= 20) break;
  }
  return out;
}
function uplQueueText(items){ // чистая: «загружено 2 из 5 · ошибок 1»
  const done = items.filter(q=>q.st==="ok").length, bad = items.filter(q=>q.st==="err").length;
  return "загружено " + done + " из " + items.length + (bad ? " · ошибок " + bad : "");
}
function uplQueueDraw(){
  const el = document.getElementById("u-queue"); if (!el) return;
  const L = uplQueue.items;
  el.innerHTML = L.length ? `<div style="font-size:12px;color:var(--dim);margin:6px 0 3px">${esc(uplQueueText(L))}</div>` + L.slice(-12).map(q=>`<div class="upqi ${q.st}">${q.st==="ok"?"✅":q.st==="err"?"⚠":q.st==="run"?"⏳":"·"} ${esc(q.name)}${q.err?` — ${esc(q.err)}`:""}</div>`).join("") : "";
}
function uplEnqueue(files, opts){
  if (!uplTarget || !files.length) return;
  const t = { x: uplTarget.x, catIdx: uplTarget.catIdx, pm: uplTarget.pm, adv: !!uplTarget.adv }; // v6.2: pm — карточка мониторинга продюсера
  files.forEach((f,i)=>uplQueue.items.push({ blob: f, name: (f.name || ("скрин " + (uplQueue.items.length + 1))) + (opts && opts.tag ? " · " + opts.tag : ""), t: t, st: "wait" }));
  uplQueueDraw();
  uplRun();
}
async function uplRun(){
  if (uplQueue.running) return;
  uplQueue.running = true;
  try {
    for (;;){
      const q = uplQueue.items.find(z=>z.st==="wait"); if (!q) break;
      q.st = "run"; uplQueueDraw();
      const ok = q.t.pm ? await pmUploadOne(q.blob, q.t.pm, q.t.catIdx) : await uploadScreen(q.blob, q.t.x, q.t.catIdx, true, q.t.adv);
      q.st = ok === true ? "ok" : "err"; if (ok !== true) q.err = String(ok || "ошибка").slice(0, 80);
      q.blob = null; // память
      uplQueueDraw();
    }
  } finally { uplQueue.running = false; }
  const L = uplQueue.items;
  if (L.length > 1) toast("📸 " + uplQueueText(L), L.some(q=>q.st==="err"));
  setTimeout(()=>{ if (!uplQueue.running && uplQueue.items.every(q=>q.st!=="wait" && q.st!=="run")){ uplQueue.items = uplQueue.items.filter(q=>q.st==="err"); uplQueueDraw(); } }, 4000);
}
function doUpload(blobOrList){
  if (!uplTarget) return;
  const files = Array.isArray(blobOrList) ? blobOrList : [blobOrList];
  if (typeof annotateGate === "function") annotateGate(files, uplEnqueue); else uplEnqueue(files);
}
document.getElementById("u-file").onclick = ()=>{ document.getElementById("u-fileinp").click(); };
document.getElementById("u-zone").onclick = ()=>{ document.getElementById("u-fileinp").click(); };
// Обновление 6 (11): камера телефона → (разметка) → очередь в ту же категорию
document.getElementById("u-cam").onclick = ()=>{ document.getElementById("u-caminp").click(); };
document.getElementById("u-vid").onclick = ()=>{ document.getElementById("u-vidinp").click(); }; // v6.6: снять/выбрать видео
document.getElementById("u-vidinp").onchange = function(){ const f = uplImagesFrom(this.files); if (f.length) doUpload(f); this.value = ""; };
document.getElementById("u-caminp").onchange = function(){ const f = uplImagesFrom(this.files); if (f.length) doUpload(f); this.value = ""; };
document.getElementById("u-fileinp").onchange = function(){ const f = uplImagesFrom(this.files); if (f.length) doUpload(f); this.value = ""; };
(function(){ // перетаскивание нескольких файлов в окно фото
  const zone = document.getElementById("u-zone"), modal = document.getElementById("uplmodal");
  [zone, modal].forEach(el=>{
    el.addEventListener("dragover", e=>{ if (uplTarget){ e.preventDefault(); zone.classList.add("drag"); } });
    el.addEventListener("dragleave", ()=>zone.classList.remove("drag"));
    el.addEventListener("drop", e=>{ if (!uplTarget) return; e.preventDefault(); zone.classList.remove("drag"); const f = uplImagesFrom(e.dataTransfer && e.dataTransfer.files); if (f.length) doUpload(f); else toast("Это не картинки", true); });
  });
})();
document.getElementById("u-x").onclick = ()=>{ uplTarget = null; closeModal("uplmodal"); };
// ---------- смена пароля с одобрения редактора ----------
document.getElementById("l-forgot").onclick = ()=>{
  document.getElementById("rs-step1").style.display = "";
  document.getElementById("rs-step2").style.display = "none";
  document.getElementById("rs-msg").textContent = "";
  document.getElementById("rs-login").value = "";
  openModal("resetmodal");
};
document.getElementById("rsq-x").onclick = ()=>closeModal("rsreqmodal"); // крестик панели уведомлений
// клик по фону тоже закрывает панель (общий обработчик .modal-ov уже стоит)
document.getElementById("rs-x").onclick = ()=>closeModal("resetmodal");
document.getElementById("rs-send").onclick = async ()=>{
  const login = document.getElementById("rs-login").value.trim();
  const msg = document.getElementById("rs-msg");
  if (!login){ msg.textContent = "Введи логин"; return; }
  msg.textContent = "Отправляю заявку…";
  try {
    const res = await wp({ action:"resetreq", login: login });
    if (res.error) throw new Error(res.error);
    document.getElementById("rs-step1").style.display = "none";
    document.getElementById("rs-step2").style.display = "";
    document.getElementById("rs-login2").value = login;
    msg.textContent = res.msg || "Если такой логин есть, заявка отправлена смотрящему — жди код";
  } catch(e){ msg.textContent = "Ошибка: " + e.message; }
};
document.getElementById("rs-do").onclick = async ()=>{
  const login = document.getElementById("rs-login2").value.trim();
  const code = document.getElementById("rs-code").value.trim();
  const p1 = document.getElementById("rs-pass").value, p2 = document.getElementById("rs-pass2").value;
  const msg = document.getElementById("rs-msg");
  if (!login || !code){ msg.textContent = "Введи логин и код"; return; }
  if (p1 !== p2){ msg.textContent = "Пароли не совпадают"; return; }
  if (p1.length < 8){ msg.textContent = "Пароль слишком короткий (минимум 8 символов)"; return; }
  msg.textContent = "Меняю…";
  try {
    const res = await wp({ action:"resetdo", login: login, code: code, newpass: p1 });
    if (res.error) throw new Error(res.error);
    msg.textContent = "✔ Пароль изменён — все прежние входы с этим логином закрыты, войди с новым паролем";
    try { sessionStorage.removeItem("dash_pass"); localStorage.removeItem("dash_pass_keep"); } catch(e){}
    setTimeout(()=>closeModal("resetmodal"), 1800);
  } catch(e){ msg.textContent = "Ошибка: " + e.message; }
};
// колокольчик виден всегда у редактора (и без заявок) — открывает панель уведомлений
function updateResetBell(n){
  const b = document.getElementById("resetbell");
  if (!b) return;
  if (AUTH.edit && AUTH.ok()){ b.style.display = ""; b.innerHTML = V7I.bell + (n > 0 ? '<span class="bdg">' + n + '</span>' : ""); b.title = "уведомления" + (n ? ": " + n : ""); b.setAttribute("aria-label", b.title); }
  else { b.style.display = "none"; b.innerHTML = V7I.bell; }
}
document.getElementById("resetbell").onclick = async ()=>{
  openModal("rsreqmodal");
  const list = document.getElementById("rsq-list");
  list.textContent = "Загружаю…";
  try {
    const parts = await Promise.all([
      wp({ action:"resetlist" }).catch(()=>({list:[]})),
      wp({ action:"suggestlist" }).catch(()=>({list:[]})),
      wp({ action:"asklist" }).catch(()=>({list:[]}))
    ]);
    const rq = parts[0].list || [], sg = parts[1].list || [];
    const asks = (parts[2].list || []).filter(a=>a.status !== "сделано"); // v6.6: просьбы продюсеров «посмотри команду»
    const sgMeta = {}; sg.forEach(r=>{ sgMeta[r.row] = { who: r.who, when: r.when }; }); // сервер сверяет автора+время строки
    updateResetBell(rq.length + asks.length); // предложения теперь прочитаны — на колокольчике остаются заявки и просьбы
    if (!rq.length && !sg.length && !asks.length){ list.innerHTML = '<div class="empty">Новых заявок, просьб и предложений нет</div>'; return; }
    let html = "";
    if (asks.length) html += '<div style="color:var(--faint);font-size:12px;margin:4px 0">👀 просьбы продюсеров посмотреть команду</div>' + asksHtml(asks, true);
    if (rq.length){
      html += '<div style="color:var(--faint);font-size:12px;margin:4px 0">заявки на смену пароля</div>';
      html += rq.map(r=>`<div class="drow" style="align-items:center"><b>${esc(r.login)}</b><span style="color:var(--faint);font-size:11.5px">${esc(r.created)}</span><span><button class="abtn2 rsq-ok" data-row="${r.row}" data-login="${esc(r.login)}">✅ Разрешить</button> <button class="abtn2 rsq-no" data-row="${r.row}" data-login="${esc(r.login)}" title="отклонить">✕</button></span></div>`).join("");
    }
    if (sg.length){
      html += '<div style="color:var(--faint);font-size:12px;margin:10px 0 4px">предложения (пометку баг/идея и заголовок можно поменять вручную)</div>';
      html += sg.map(r=>`<div class="drow" style="align-items:flex-start"><b>${r.unread?"🆕 ":""}${esc(r.who)}</b><span style="white-space:pre-wrap"><button class="qbtn sg-kind" data-row="${r.row}" data-kind="${esc(r.kind||"")}" title="поменять пометку баг/идея">[${esc(r.kind||"—")}]</button> ${r.title ? "<b>"+esc(r.title)+"</b> — " : ""}${esc(r.when)}: ${esc(r.text)} <button class="qbtn sg-title" data-row="${r.row}" data-kind="${esc(r.kind||"")}" data-title="${esc(r.title||"")}" title="поменять заголовок">✏️</button><div class="sg-ans" style="${r.answer?"":"display:none;"}margin-top:4px;padding:5px 8px;background:var(--panel2);border-radius:6px;font-size:12px"><span style="color:var(--dim)">↩ ${esc(r.answeredBy||"")}${r.answeredAt?" · "+esc(fmtDay(r.answeredAt)):""}:</span> <span class="utext sg-anstext">${esc(r.answer||"")}</span></div><button class="qbtn sg-reply" data-row="${r.row}" title="${r.hasLogin?"ответ увидит автор":"старое предложение без логина автора — ответ сохранится, но автор его не увидит"}">↩ ${r.answer?"изменить ответ":"ответить"}${r.hasLogin?"":" ⚠"}</button><div class="sg-rbox" style="display:none;margin-top:4px"><textarea class="sg-rtext" style="width:100%;min-height:60px;background:var(--panel2);color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:6px;font:inherit;font-size:12.5px;box-sizing:border-box">${esc(r.answer||"")}</textarea><button class="abtn2 sg-rsend" data-row="${r.row}">Отправить ответ</button></div></span><span><button class="abtn2 sg-del" data-row="${r.row}" title="убрать из списка">✕</button></span></div>`).join("");
    }
    list.innerHTML = html;
    asksBind(list, ()=>document.getElementById("resetbell").onclick());
    list.querySelectorAll(".rsq-ok").forEach(b=>b.onclick=async (ev)=>{
      ev.stopPropagation();
      try {
        const res = await wp({ action:"resetok", row: b.dataset.row, login: b.dataset.login });
        if (res.error) throw new Error(res.error);
        const code = res.code || "";
        const rowEl = b.closest(".drow");
        rowEl.querySelector("span:last-child").innerHTML = '<b style="color:var(--ok)">код: ' + esc(code) + '</b> <span style="color:var(--faint);font-size:11px">— передай лично, годен 15 мин</span>';
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(()=>toast("Код скопирован — отправь пользователю")).catch(()=>{});
      } catch(e){ toast("Ошибка: "+e.message, true); }
    });
    list.querySelectorAll(".rsq-no").forEach(b=>b.onclick=async (ev)=>{
      ev.stopPropagation();
      try {
        const res = await wp({ action:"resetno", row: b.dataset.row, login: b.dataset.login });
        if (res.error) throw new Error(res.error);
        const rowEl = b.closest(".drow"); if (rowEl) rowEl.remove();
      } catch(e){ toast("Ошибка: "+e.message, true); }
    });
    list.querySelectorAll(".sg-kind").forEach(b=>b.onclick=async (ev)=>{
      ev.stopPropagation();
      const nk = b.dataset.kind === "баг" ? "идея" : (b.dataset.kind === "идея" ? "баг" : "баг");
      try {
        const res = await wp(Object.assign({ action:"suggestset", row: b.dataset.row, kind: nk }, sgMeta[b.dataset.row]));
        if (res.error) throw new Error(res.error);
        b.textContent = "[" + nk + "]"; b.dataset.kind = nk;
      } catch(e){ toast("Ошибка: "+e.message, true); }
    });
    list.querySelectorAll(".sg-reply").forEach(b=>b.onclick=(ev)=>{
      ev.stopPropagation();
      const box = b.parentNode.querySelector(".sg-rbox"); if (!box) return;
      box.style.display = box.style.display === "none" ? "" : "none";
      if (box.style.display === "") { const ta = box.querySelector("textarea"); if (ta) ta.focus(); }
    });
    list.querySelectorAll(".sg-rsend").forEach(b=>b.onclick=async (ev)=>{
      ev.stopPropagation();
      const wrap = b.parentNode, ta = wrap.querySelector(".sg-rtext");
      const text = (ta && ta.value || "").trim();
      if (!text){ toast("Напиши ответ", true); return; }
      b.disabled = true;
      try {
        const res = await wp(Object.assign({ action:"suggestreply", row: b.dataset.row, text: text }, sgMeta[b.dataset.row]), 30000);
        if (res.error) throw new Error(res.error);
        const span = wrap.parentNode;
        const ans = span.querySelector(".sg-ans"); if (ans){ ans.style.display = ""; const at = ans.querySelector(".sg-anstext"); if (at) at.textContent = text; }
        wrap.style.display = "none";
        toast(res.author === false ? "✔ Ответ сохранён (автор старого предложения его не увидит)" : "✔ Ответ отправлен автору");
      } catch(e){ toast("Ошибка: "+e.message, true); }
      finally { b.disabled = false; }
    });
    list.querySelectorAll(".sg-title").forEach(b=>b.onclick=async (ev)=>{
      ev.stopPropagation();
      const t = prompt("Заголовок предложения:", b.dataset.title || "");
      if (t === null) return;
      try {
        const res = await wp(Object.assign({ action:"suggestset", row: b.dataset.row, kind: b.dataset.kind, title: t.trim() }, sgMeta[b.dataset.row]));
        if (res.error) throw new Error(res.error);
        b.dataset.title = t.trim();
        b.previousSibling.textContent = t.trim() ? t.trim() + " — " : "";
        toast("✔ Заголовок обновлён");
      } catch(e){ toast("Ошибка: "+e.message, true); }
    });
    list.querySelectorAll(".sg-del").forEach(b=>b.onclick=async (ev)=>{
      ev.stopPropagation();
      try {
        const delRow = +b.dataset.row;
        const res = await wp(Object.assign({ action:"suggestdel", row: b.dataset.row }, sgMeta[b.dataset.row]));
        if (res.error) throw new Error(res.error);
        const rowEl = b.closest(".drow"); if (rowEl) rowEl.remove();
        // строки ниже удалённой сдвинулись на одну вверх — сдвигаем номера у оставшихся кнопок
        const meta2 = {};
        Object.keys(sgMeta).forEach(k=>{ const n = +k; if (n !== delRow) meta2[n > delRow ? n - 1 : n] = sgMeta[k]; });
        Object.keys(sgMeta).forEach(k=>delete sgMeta[k]); Object.assign(sgMeta, meta2);
        list.querySelectorAll(".sg-kind,.sg-title,.sg-del,.sg-reply,.sg-rsend").forEach(x=>{ const n = +x.dataset.row; if (n > delRow) x.dataset.row = String(n - 1); });
        if (!list.querySelectorAll(".drow").length) list.innerHTML = '<div class="empty">Новых заявок и предложений нет</div>';
      } catch(e){ toast("Ошибка: "+e.message, true); }
    });
  } catch(e){ list.textContent = "Ошибка: " + e.message; }
};
// предложение от любого аккаунта
function sugKind(text){ return /не работает|ошибк|сломал|не грузит|не открыва|не сохраня|баг|завис|пропал|глюч|вылета/i.test(String(text||"")) ? "баг" : "идея"; }
function updateSugBadge(n){
  const b = document.getElementById("sugbtn"); if (!b) return;
  b.innerHTML = V7I.bulb + " Предложение или ошибка" + (n > 0 ? ' <span class="chip c-wip" style="margin-left:auto">' + n + '</span>' : "");
  const pa = document.getElementById("prof-av"); if (pa) pa.classList.toggle("dotted", n > 0);
  b.title = n > 0 ? "есть ответы на твои предложения: " + n : "предложение или ошибка";
  state.sugAnswers = n || 0;
}
function sugTab(mine){
  document.getElementById("sg-new").style.display = mine ? "none" : "";
  document.getElementById("sg-mine").style.display = mine ? "" : "none";
  document.getElementById("sg-tab-new").classList.toggle("on", !mine);
  document.getElementById("sg-tab-mine").classList.toggle("on", !!mine);
}
async function loadMySuggest(){
  const box = document.getElementById("sg-mine");
  box.textContent = "Загружаю…";
  try {
    const res = await wp({ action:"mysuggest" }, 30000);
    if (res.error) throw new Error(res.error);
    const list = res.list || [];
    box.innerHTML = list.length ? list.map(s=>`<div class="drow">
        <b>${s.unread?"🆕 ":""}${esc(s.when)}${s.kind?" · "+esc(s.kind):""}${s.title?" · "+esc(s.title):""}</b>
        <span class="utext">${esc(s.text)}</span>
        ${s.answer ? `<div style="margin-top:6px;padding:6px 8px;background:var(--panel2);border-radius:6px"><div style="color:var(--dim);font-size:11.5px">↩ ответ: ${esc(s.answeredBy||"смотрящий")}${s.answeredAt?" · "+esc(fmtDay(s.answeredAt)):""}</div><span class="utext">${esc(s.answer)}</span></div>` : '<div style="color:var(--faint);font-size:11.5px;margin-top:4px">ответа пока нет</div>'}
      </div>`).join("") : '<div class="empty">Ты ещё не отправлял предложений (или они отправлены до появления ответов)</div>';
    updateSugBadge(0); // просмотренные ответы сервер пометил прочитанными
  } catch(e){ box.textContent = "Ошибка: " + e.message; }
}
document.getElementById("sugbtn").onclick = ()=>{
  document.getElementById("sg-text").value = "";
  document.getElementById("sg-msg").textContent = "";
  sugTab(state.sugAnswers > 0);
  openModal("sugmodal");
  if (state.sugAnswers > 0) loadMySuggest();
};
document.getElementById("sg-tab-new").onclick = ()=>sugTab(false);
document.getElementById("sg-tab-mine").onclick = ()=>{ sugTab(true); loadMySuggest(); };
document.getElementById("sg-x").onclick = ()=>closeModal("sugmodal");
document.getElementById("sg-send").onclick = async ()=>{
  const text = document.getElementById("sg-text").value.trim();
  const msg = document.getElementById("sg-msg");
  if (!text){ msg.textContent = "Напиши предложение или опиши ошибку"; return; }
  msg.textContent = "Отправляю…";
  try {
    // задача 3: отправляем сразу — без ожидания ИИ (раньше до 55 с); тип — по словам, смотрящий поправит вручную
    const kind = sugKind(text);
    const title = text.split(/\s+/).slice(0,6).join(" ").slice(0,80);
    const res = await wp({ action:"suggest", text: text, kind: kind, title: title }, 30000);
    if (res.error) throw new Error(res.error);
    msg.textContent = "✔ Отправлено — спасибо!";
    setTimeout(()=>closeModal("sugmodal"), 1200);
  } catch(e){ msg.textContent = "Ошибка: " + e.message; }
};
let opTarget = null; // D8: строка, для которой открыта модалка «сменить оператора»
document.getElementById("o-save").onclick = async ()=>{
  const t = opTarget; if (!t) return;
  const msg = document.getElementById("o-msg");
  const nick = document.getElementById("o-nick").value.trim();
  const opname = document.getElementById("o-opname").value.trim();
  const model = document.getElementById("o-model").value.trim();
  if (!nick && !opname && !model){ msg.textContent = "Заполни хотя бы одно поле"; return; }
  msg.textContent = "Сохраняю…";
  try {
    const res = await wp(Object.assign({ action:"setoper", nick: nick, opname: opname, model: model }, t.keys));
    if (res.error) throw new Error(res.error);
    // сервер вернул то, что реально записал (пустое поле = осталось прежним)
    const r = rowByRk(t.rk) || t.r;
    const oldRk = rk(r), oldSk = skey(r);
    r.opNick = res.nick !== undefined ? res.nick : (nick || r.opNick);
    r.opName = res.opname !== undefined ? res.opname : (opname || r.opName);
    r.model = res.model !== undefined ? res.model : (model || r.model);
    if (res.stamp) r.updated = res.stamp;
    const newSk = skey(r);
    renameRowKey(oldRk, rk(r));
    if (oldSk !== newSk){ // скрины и задачи команды переехали на новый ключ (сервер сделал то же в таблице)
      if (state.screens && state.screens[oldSk] && !state.screens[newSk]){ state.screens[newSk] = state.screens[oldSk]; delete state.screens[oldSk]; }
      (state.tasks||[]).forEach(tk=>{ if (tk.key === oldSk) tk.key = newSk; });
    }
    opTarget = null;
    closeModal("opmodal");
    toast("✔ Оператор/модель обновлены");
    render();
  } catch(e){ msg.textContent = "Ошибка: " + e.message; }
};
document.getElementById("w-go").onclick = async ()=>{
  const msg = document.getElementById("w-msg");
  const base = document.getElementById("w-base").value;
  const name = document.getElementById("w-name").value.trim();
  if (!name || !base){ msg.textContent = "Укажи название недели"; return; }
  // D6: существующую неделю не пересоздаём (сервер тоже откажет и ничего не очистит)
  if (name === base){ msg.textContent = "Новая неделя совпадает с базовой — укажи другое название"; return; }
  if (!/^\d{1,2}(\.\d{1,2})?-\d{1,2}\.\d{1,2}(\.\d{2,4})?$/.test(name)){ msg.textContent = "Формат названия: ДД.ММ-ДД.ММ или ДД-ДД.ММ (например 05-11.10)"; return; }
  if ((state.knownWeeks||[]).includes(name) || realRows().some(r=>r.week===name)){ msg.textContent = "Неделя «" + name + "» уже есть — ничего не создано"; return; }
  msg.textContent = "Создаю… (до минуты)";
  const btn = document.getElementById("w-go"); btn.disabled = true;
  try {
    const res = await wp({ action:"copyweek", base: base, name: name }, 90000);
    if (res.error) throw new Error(res.error);
    closeModal("weekmodal");
    toast("✔ Неделя " + name + " создана (" + res.created + " листов)");
    state.week = "latest";
    setTimeout(load, 800);
  } catch(e){
    msg.textContent = "Ошибка: " + e.message + (/время|сеть|связ/i.test(e.message) ? " — неделя могла всё же создаться, обновляю список" : "");
    setTimeout(load, 500);
  } finally { btn.disabled = false; }
};
document.getElementById("w-del-go").onclick = async ()=>{
  const week = document.getElementById("w-del").value;
  const msg = document.getElementById("w-delmsg");
  if (!week){ msg.textContent = "Выбери неделю"; return; }
  const nSheets = new Set(state.rows.filter(r=>r.week===week).map(r=>r._sheet)).size;
  const ans = prompt("Удалить неделю «"+week+"» ("+nSheets+" листов, все проверки)? Для подтверждения введи её название:");
  if (ans === null) return;
  if (ans.trim() !== week){ msg.textContent = "Название не совпало — удаление отменено"; return; }
  msg.textContent = "Удаляю… (до минуты)";
  try {
    const res = await wp({ action:"delweek", week: week }, 60000);
    if (res.error) throw new Error(res.error);
    state.week = "latest";
    state.knownWeeks = (state.knownWeeks||[]).filter(w=>w!==week);
    try{ localStorage.setItem("dash_weeks", JSON.stringify(state.knownWeeks)); }catch(e){}
    state.rows = state.rows.filter(r=>r.week!==week);
    if (state.serverLatest === week) state.serverLatest = "";
    state.dataFp = "";
    closeModal("weekmodal");
    toast("✔ Удалено листов: " + (res.removed||0) + (res.archived ? " · в архив: " + res.archived : ""));
    setTimeout(load, 800);
  } catch(e){
    msg.textContent = "Ошибка: " + e.message + " — неделя могла быть уже удалена, обновляю данные";
    state.week = "latest"; state.dataFp = "";
    setTimeout(load, 500);
  }
};

document.getElementById("a-save").onclick = async ()=>{
  if (!AUTH.edit){ toast("Добавлять команды может только редактор", true); return; }
  const msg = document.getElementById("a-msg");
  const city = document.getElementById("a-city").value;
  const prodSel = document.getElementById("a-prod").value;
  const prod = prodSel==="__new" ? document.getElementById("a-prod-new").value.trim() : prodSel;
  const nick = document.getElementById("a-nick").value.trim();
  const opname = document.getElementById("a-opname").value.trim();
  const model = document.getElementById("a-model").value.trim();
  if (!prod){ msg.textContent = "Укажи продюсера"; return; }
  if (!nick && !opname){ msg.textContent = "Укажи ник или имя оператора"; return; }
  if (weekPinned()){ msg.textContent = "Выбери конкретную неделю (на «все недели»/«месяц» добавлять нельзя)"; return; }
  const any = state.rows.find(r=>r.city===city && weekOpen_(r)) || (()=>{ const b = (state.pblocks||[]).find(b=>b.city===city && b.week===state.serverLatest); return b ? { _sheet: b.sheet } : null; })(); // открытая неделя (или лист с пустым блоком продюсера)
  if (!any){ msg.textContent = "Нет открытой недели " + clabel(city) + " — сначала создай неделю"; return; }
  msg.textContent = "Добавляю… (до минуты)";
  // один и тот же rid для повторного нажатия после таймаута: сервер не добавит строку второй раз
  const sig = [any._sheet, prod, nick, opname, model].join("|");
  const btn = document.getElementById("a-save");
  if (!addReq || addReq.sig !== sig) addReq = { sig: sig, rid: "a" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8) };
  btn.disabled = true;
  try {
    const res = await wp({ action:"add", sheet: any._sheet, producer: prod, nick: nick, opname: opname, model: model, rid: addReq.rid }, 60000);
    if (res.error) throw new Error(res.error);
    addReq = null;
    closeModal("addmodal");
    try{ localStorage.setItem("dash_addlast", JSON.stringify({city:city, prod:prod})); }catch(e){}
    toast("✔ Мониторинг добавлен в " + clabel(city) + (res.dup ? " (уже был добавлен этим запросом)" : " (строка " + res.row + ")") + (res.newProducer ? " · создан блок продюсера «" + prod + "»" : ""));
    ["a-nick","a-opname","a-model","a-prod-new"].forEach(id=>document.getElementById(id).value="");
    setTimeout(load, 800);
  } catch(e){
    msg.textContent = "Ошибка: " + e.message + (/не ответил|нет связи/.test(e.message) ? " — мониторинг мог добавиться; повторное «Добавить» дубль не создаст" : "");
    setTimeout(load, 500);
  } finally { btn.disabled = false; }
};
let addReq = null;

// ---------- вход ----------
function showGate(){
  const sp = document.getElementById("splash");
  if (sp) sp.classList.add("hide");
  document.getElementById("gate").classList.remove("hide");
  document.getElementById("l-pass").value = "";
  document.getElementById("l-msg").textContent = "";
  setTimeout(()=>document.getElementById("l-user").focus(), 100);
}
function hideGate(){ document.getElementById("gate").classList.add("hide"); }
// D: явный выход — с устройства убираются черновики, кэш данных, список недель, фильтры и последний логин
// (при истечении сессии НЕ вызывается: черновики нужны после повторного входа)
function clearLocalData(){
  try {
    const rm = [];
    for (let i = 0; i < localStorage.length; i++){ const k = localStorage.key(i); if (/^(draft2?|pmdraft):/.test(k)) rm.push(k); } // v6: и черновики мониторинга продюсера
    rm.concat(["dash_weeks","dash_filters","dash_addlast","dash_last_user"]).forEach(k=>localStorage.removeItem(k));
    sessionStorage.removeItem("dash_cache");
  } catch(e){}
  state.rows = []; state.plans = {}; state.checks = {}; state.recs = {}; state.screens = {}; state.tasks = []; state.thumbData = {};
  state.dataFp = ""; state.knownWeeks = []; state.failedSaves = {}; state.fullLoaded = false;
  state.pm = null; state.pmEdits = {}; state.pmOpen = {}; state.pmBadge = 0; state.gen = ""; // v6
  try { Object.keys(saveQueue).forEach(k=>delete saveQueue[k]); } catch(e){}
}
document.getElementById("loginbtn").onclick = ()=>{
  if (viewAsActive()){ startViewAs(""); return; } // в режиме «глазами» кнопка сначала выводит из режима
  if (AUTH.ok() && (anyDirty() || pendingWrites()) && !confirm("Есть несохранённые правки. При выходе черновики будут удалены с этого устройства. Выйти?")) return;
  if (AUTH.ok()){ wp({ action:"logout" }).catch(()=>{}); } // гасим токен сессии на сервере
  AUTH.clear(); clearLocalData(); showGate();
};
document.getElementById("l-go").onclick = doLogin;
document.getElementById("l-pass").onkeydown = e=>{ if (e.key==="Enter") doLogin(); };
document.getElementById("l-eye").onclick = ()=>{ const p = document.getElementById("l-pass"); p.type = p.type === "password" ? "text" : "password"; };
// вход: пароль уходит в теле POST (не в адресе запроса), сервер сразу отвечает токеном сессии
async function doLogin(){
  const u = document.getElementById("l-user").value.trim();
  const p = document.getElementById("l-pass").value;
  const msgEl = document.getElementById("l-msg");
  if (!u || !p){ msgEl.textContent = "Введи логин и пароль"; return; }
  msgEl.textContent = "Проверяю…";
  try {
    const res = await postJSON({ action:"auth", user:u, pass:p, dev: devName() }, 45000);
    if (res.error || !res.token){
      msgEl.textContent = res.error || "Неверный логин или пароль";
      return;
    }
    AUTH.set(u, res.token, !!res.editor, res.cities || [], res.name || u);
    AUTH.prod = !!res.prod; AUTH.admin = !!res.admin;
    try{ localStorage.setItem("dash_prod", res.prod?"1":"0"); localStorage.setItem("dash_admin", res.admin?"1":"0"); }catch(e){}
    state.lastCheck = Date.now();
    try{ localStorage.setItem("dash_last_user",u); }catch(e){}
    historyClean();
    // кэш прошлой сессии может содержать чужие/старые строки — на входе всегда сбрасываем
    try{ sessionStorage.removeItem("dash_cache"); }catch(e){}
    // после входа — всегда «Обзор» (или первая вкладка роли) с чистыми фильтрами
    state.tab = tabs().includes("Обзор") ? "Обзор" : tabs()[0];
    state.producer = ""; state.quick = ""; state.week = "latest"; state.page = 1; state.search = "";
    state.fullLoaded = false; state.dataFp = "";
    try{ localStorage.setItem("dash_filters", JSON.stringify({tab:state.tab, producer:"", quick:"", week:"latest"})); }catch(e){}
    hideGate();
    updateLoginBtn();
    toast("✔ Вход: " + (AUTH.name || u) + (AUTH.edit ? " · редактор" : " · просмотр"));
    load();
  } catch(e){
    const m = String(e && e.message || e);
    if (/не ответил|нет связи|страницу вместо данных/.test(m)){
      msgEl.innerHTML = 'Таблица не ответила. Если недавно сайт чинили — браузер мог держать старую версию: <button class="gbtn" id="hardref" style="margin-left:6px">⟳ обновить принудительно</button>';
      const hr = document.getElementById("hardref");
      if (hr) hr.onclick = ()=>{
        try{ sessionStorage.removeItem("dash_cache"); }catch(e2){}
        location.replace(location.href.split("#")[0].split("?")[0] + "?r=" + Date.now());
      };
    } else {
      msgEl.textContent = "Не удалось проверить: " + m;
    }
  }
}

function liveEval(vals){
  const st = vals.map(catState);
  const ok = st.filter(x=>x==="ok").length, warn = st.filter(x=>x==="warn").length, bad = st.filter(x=>x==="bad").length;
  const evalN = st.filter(x=>x!==null).length;
  if (!evalN) return "заполни категории — оценка посчитается сама";
  const verdict = verdictOf(bad, warn);
  return "оценка сейчас: " + fmtSc(ok + warn * 0.5) + "/" + MAX_SCORE + " · " + (VLBL[verdict]||verdict);
}
function getPhrases(code){ try{ return (JSON.parse(localStorage.getItem("dash_phrases")||"{}")[code]) || []; }catch(e){ return []; } }
// Обновление 6: шаблоны замечаний — локально (мгновенно) + лист «Шаблоны» на сервере (одинаково на всех устройствах)
const PHRASE_MAX = 30;
function phrasesMerge(local, server){ // чистая: объединение без дублей, не больше PHRASE_MAX на категорию
  const out = {};
  [local || {}, server || {}].forEach(src => Object.keys(src).forEach(k => {
    const L = out[k] = out[k] || [];
    (Array.isArray(src[k]) ? src[k] : []).forEach(t => { t = String(t || "").trim(); if (t && !L.includes(t) && L.length < PHRASE_MAX) L.push(t); });
  }));
  return out;
}
function addPhrase(code,v){ try{ const all=JSON.parse(localStorage.getItem("dash_phrases")||"{}"); const L=all[code]||[]; if(v && !L.includes(v)){ if (L.length >= PHRASE_MAX){ toast("в категории уже "+PHRASE_MAX+" шаблонов — удали лишние", true); return; } L.push(v); all[code]=L; localStorage.setItem("dash_phrases",JSON.stringify(all)); if (AUTH.edit && !viewAsActive()) wp({ action:"tpl", op:"add", code, text:v }).catch(e=>toast("шаблон сохранён только в браузере: "+e.message, true)); } }catch(e){} }
function delPhrase(code,v){ try{ const all=JSON.parse(localStorage.getItem("dash_phrases")||"{}"); all[code]=(all[code]||[]).filter(x=>x!==v); localStorage.setItem("dash_phrases",JSON.stringify(all)); if (AUTH.edit && !viewAsActive()) wp({ action:"tpl", op:"del", code, text:v }).catch(()=>{}); }catch(e){} }
let tplSynced = false;
function tplSync(){
  if (tplSynced || !AUTH.edit || viewAsActive()) return;
  tplSynced = true;
  wp({ action:"tpl", op:"list" }).then(r=>{
    let local = {}; try{ local = JSON.parse(localStorage.getItem("dash_phrases")||"{}"); }catch(e){}
    const merged = phrasesMerge(local, r.tpl || {});
    // локальные, которых нет на сервере (созданы до обновления), — один раз отправляем
    Object.keys(local).forEach(k => (local[k]||[]).forEach(t => { if (!((r.tpl||{})[k]||[]).includes(t)) wp({ action:"tpl", op:"add", code:k, text:t }).catch(()=>{}); }));
    try{ localStorage.setItem("dash_phrases", JSON.stringify(merged)); }catch(e){}
  }).catch(()=>{ tplSynced = false; });
}
function miniBar(g){ const t=(g.ok+g.warn+g.bad)||1; return '<div class="mini-gauge"><i style="width:'+Math.round(g.ok/t*100)+'%;background:var(--ok)"></i><i style="width:'+Math.round(g.warn/t*100)+'%;background:var(--warn-f)"></i><i style="width:'+Math.round(g.bad/t*100)+'%;background:var(--bad)"></i></div>'; }

function historyClean(){ try { const q2 = new URLSearchParams(location.search); q2.delete("u"); q2.delete("p"); history.replaceState(null, "", location.pathname + (q2.toString() ? "?" + q2.toString() : "")); } catch(e){} }

function isFresh(r){
  const d = parseUpd(r && r.updated);
  return !!d && d.toDateString() === new Date().toDateString();
}
// B: штамп «дд.мм[.гггг] [чч:мм] (кто)» — год, если есть, берём из штампа; время — в поясе сервера (state.serverTz)
function tzOffsetMin(){
  const m = String(state.serverTz||"").match(/^([+-])(\d{2})(\d{2})$/);
  return m ? (m[1]==="-" ? -1 : 1) * (+m[2]*60 + +m[3]) : -new Date().getTimezoneOffset();
}
function parseUpd(s){
  if (!s) return null;
  const m = String(s).match(/^\s*(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?(?:\s+(\d{1,2}):(\d{2}))?/);
  if (!m) return null;
  const now = new Date();
  const hh = m[4] ? +m[4] : 12, mi = m[5] ? +m[5] : 0; // без времени — полдень (дата не уезжает из-за пояса)
  const off = tzOffsetMin();
  const mk = y => new Date(Date.UTC(y, +m[2]-1, +m[1], hh, mi) - off*60000);
  if (m[3]){ const y = +m[3] < 100 ? 2000 + +m[3] : +m[3]; return mk(y); }
  let d = mk(now.getFullYear());
  if (d - now > 30*864e5) d = mk(now.getFullYear()-1); // старый штамп без года: правка в декабре, сейчас январь
  return d;
}
// сколько дней прошло с последней проверки/правки; перепроверка = +7 дней
function dueInfo(r){
  const d = parseUpd(r && r.updated);
  if (!d) return null;
  const today = new Date(); today.setHours(0,0,0,0);
  d.setHours(0,0,0,0);
  const days = Math.round((today - d)/864e5);
  const per = recheckDays(r);
  const next = new Date(d.getTime() + per*864e5);
  return { days, per, nextDay: next.getDate(), nextMonth: next.getMonth()+1 };
}
// v7.2: перепроверка — через 7 дней, критичная команда — через VRULES.recheckCrit (по умолчанию 3)
function recheckDays(r){ try { return rowStats(r).verdict === "критично" ? VRULES.recheckCrit : 7; } catch(e){ return 7; } }
function isDue(r){ const u = dueInfo(r); return !!u && u.days >= u.per; } // порог «к перепроверке» один для всех мест
// одна строка на команду (город+опер+модель): берём строку с самой свежей «Обновлено»
function dedupeRows(rows){
  const map = {}, out = [];
  rows.forEach(function(r){
    if (!(r.opName||r.opNick||r.model)){ out.push(r); return; }
    const key = teamKey(r);
    const prev = map[key];
    if (!prev){ map[key] = r; out.push(r); return; }
    const a = parseUpd(r.updated), b = parseUpd(prev.updated);
    if ((a && !b) || (a && b && a > b)){
      map[key] = r;
      out[out.indexOf(prev)] = r;
    }
  });
  return out;
}
// сколько команд просрочили перепроверку (дедупликация по всем неделям, как на доске «Расписание»)
function overdueCount(city){
  const map = {};
  state.rows.forEach(function(r){
    if (city && r.city !== city) return;
    if (!(r.opName||r.opNick||r.model)) return;
    const key = teamKey(r);
    const prev = map[key];
    if (!prev){ map[key] = r; return; }
    const a = parseUpd(r.updated), b = parseUpd(prev.updated);
    if ((a && !b) || (a && b && a > b)) map[key] = r;
  });
  const today = new Date(); today.setHours(0,0,0,0);
  let n = 0;
  Object.values(map).forEach(function(r){
    const d = parseUpd(r.updated);
    if (!d) return;
    d.setHours(0,0,0,0);
    if (Math.round((new Date(d.getTime()+recheckDays(r)*864e5) - today)/864e5) <= 0) n++; // срок перепроверки — как везде (recheckDays)
  });
  return n;
}

document.addEventListener("paste", function(e){
  if (!AUTH.edit && !(uplTarget && uplTarget.pm)) return; // v6.2: продюсер тоже вставляет в окно «📷 Фото» своего мониторинга
  const um = document.getElementById("uplmodal"), am = document.getElementById("advmodal");
  if (am && am.classList.contains("show") && !(um && um.classList.contains("show"))){ // v7.5: окно совета — скриншот из буфера прямо в совет
    const f = uplImagesFrom(e.clipboardData && e.clipboardData.items);
    if (f.length){ e.preventDefault(); if (uplTarget && uplTarget.adv) doUpload(f); else toast("Скрины добавляются только в открытой неделе", true); }
    return;
  }
  if (um && um.classList.contains("show") && uplTarget){ // окно фото открыто — вставка идёт туда
    const items = e.clipboardData && e.clipboardData.items;
    const f = uplImagesFrom(items);
    if (f.length){ e.preventDefault(); doUpload(f); }
  }
});

// удалить скрин команды: сразу с сайта, на сервере — в фоне с повторами; не вышло — вернуть на место
async function scrDelete(dsk, dlink){
    // мгновенно убираем с сайта; серверное удаление едет в фоне
    const arr0 = (state.screens||{})[dsk] || [];
    const was0 = arr0.find(s=>s.link===dlink) || {}; // v7.4: при откате вернуть в ту же категорию / совет
    if (arr0.some(s=>s.link===dlink)) { state.screens[dsk] = arr0.filter(s=>s.link!==dlink); toast("Скрин удалён"); render(); advModalThumbs(); }
    let lastErr = null;
    for (let a=0;a<4;a++){ // Apps Script бывает капризным сразу после загрузки — до 4 фоновых попыток
      try {
        const res = await wp({ action:"delscreen", bkey: dsk, link: dlink }, 30000);
        if (res.error) throw new Error(res.error);
        return; // сервер подтвердил удаление
      } catch(e){ lastErr = e; await new Promise(r=>setTimeout(r,3000)); }
    }
    // сервер так и не подтвердил — возвращаем скрин на место и честно говорим
    state.screens = state.screens || {};
    state.screens[dsk] = state.screens[dsk] || [];
    if (!state.screens[dsk].some(s=>s.link===dlink)) state.screens[dsk].push(Object.assign({}, was0, {cat: was0.cat || "", link:dlink, ts:"не удалён — попробуй ещё раз"}));
    toast("Скрин вернул на место — сервер не подтвердил удаление, попробуй ещё раз", true);
    render(); advModalThumbs();
}
async function uploadScreen(blob, x, catIdx, quiet, adv){ // → true | текст ошибки; adv — фото к совету категории
  try {
    if (!rowEditable(x.r)){ toast("Скрины добавляются только в открытой неделе", true); return "неделя закрыта"; }
    const isVid = isVideoBlob(blob);
    if (!isVid && blob && blob.size > 25*1024*1024){ toast("Файл слишком большой (больше 25 МБ)", true); return "больше 25 МБ"; }
    if (!isVid && blob && blob.type && !/^image\//.test(blob.type)){ toast("Это не картинка и не видео", true); return "не картинка"; }
    const catName = (catIdx!==undefined&&catIdx!==null) ? (adv ? ADV_CAT(catsOf(x.r)[catIdx]) : catsOf(x.r)[catIdx]) : "";
    const label = (isVid ? "🎬 Видео" : "📸 Скрин") + (catName ? " [" + catName + "]" : "");
    toast(label + ": " + (isVid ? "готовлю…" : "сжимаю…"));
    const enc = isVid ? await videoEncode(blob) : await shotEncode(blob); // v6.6: WebP, где браузер умеет; видео — с обложкой
    toast(label + ": загружаю на диск…");
    // ответ сервера читаем напрямую — он и есть подтверждение (без опроса action=screens и без полной перезагрузки)
    const j = await wp(Object.assign({ action:"upload", data: enc.data, small: enc.small, kind: isVid ? "video" : "",
        cat: catName }, rowKeyParams(x.r)), isVid ? 180000 : 90000);
    if (!j || !j.link) throw new Error("сервер не подтвердил загрузку");
    const k0 = j.key || skey(x.r);
    const item = { cat: j.cat||"", link: j.link, mini: j.mini||"", ts: j.ts||"" }; if (j.type === "video") item.type = "video";
    state.screens = state.screens || {};
    const arr = state.screens[k0] = state.screens[k0] || [];
    if (!arr.some(s=>s.link===j.link)) arr.push(item);
    if (realData && realData.screens && realData.screens !== state.screens){ const ra = realData.screens[k0] = realData.screens[k0] || []; if (!ra.some(s=>s.link===j.link)) ra.push(item); }
    if (j.stamp){ const cur = rowByRk(rk(x.r)); if (cur) cur.updated = j.stamp; }
    if (!quiet) toast(label + " загружен ✓");
    softRender(); // U11: вставка скрина не перерисовывает экран посреди набора текста и не перезагружает данные
    advModalThumbs(); // v7.5: окно совета открыто — сразу показать новое фото
    return true;
  } catch(err){ toast("Не загрузилось: " + err.message, true); return err.message || "ошибка"; }
}

function applyData(j, isHistory, mergeWeek){
  let rows = (j.rows||[]).filter(r=>r.opName||r.model||r.cats.some(c=>(c||"").trim()));
  // нормализуем ручную оценку/вердикт сразу: строка и число читаются одинаково
  rows.forEach(r=>{ r.scoreM = String(r.scoreM == null ? "" : r.scoreM).trim(); r.verdictM = String(r.verdictM == null ? "" : r.verdictM).trim(); });
  // A7: автообновление одной недели при загруженной истории — заменяем только эту неделю, история остаётся
  let screens = j.screens || {};
  if (mergeWeek){
    const base = realRows();
    const weekSheets = new Set(base.filter(r=>r.week===mergeWeek).map(r=>r._sheet).concat(rows.map(r=>r._sheet)));
    rows = base.filter(r=>r.week!==mergeWeek).concat(rows);
    const baseScr = (viewAsActive() && realData ? realData.screens : state.screens) || {};
    const merged = {};
    Object.keys(baseScr).forEach(k=>{ if (!weekSheets.has(String(k).split("|")[0])) merged[k] = baseScr[k]; });
    screens = Object.assign(merged, screens);
  }
  if (Array.isArray(j.pblocks)) state.pblocks = mergeWeek ? (state.pblocks||[]).filter(b=>b.week!==mergeWeek).concat(j.pblocks) : j.pblocks.slice(); // v7.6: блоки продюсеров
  if (j.rules){ setVRules(j.rules); try { localStorage.setItem("dash_vrules", JSON.stringify(j.rules)); } catch(e){} } // v7.2: пороги вердикта из таблицы
  state.rows = rows;
  if (Array.isArray(j.weeks)){ state.knownWeeks = j.weeks.slice(); try{ localStorage.setItem("dash_weeks", JSON.stringify(state.knownWeeks)); }catch(e){} }
  if (j.latest !== undefined) state.serverLatest = j.latest || "";
  // несохранённые правки (фон-отправка не подтвердилась) возвращаем на место после обновления данных
  Object.keys(state.optimistic||{}).forEach(k=>applyOptimistic_(k, (state.optimistic[k]||{}).fields));
  Object.keys(state.failedSaves||{}).forEach(k=>applyOptimistic_(k, (state.failedSaves[k]||{}).fields));
  state.colors = j.colors || {};
  state.plans = j.plans || {};
  state.checks = j.checks || {};
  state.recs = j.recs || {};
  state.links = j.links || []; // legacy, больше не приходит от сервера
  state.screens = screens;
  if (j.tz) state.serverTz = j.tz;
  state.itog = j.itog || []; // итоги дня по сверкам (лист «Итог», только чтение)
  state.marks = j.marks || {}; state.newbies = j.newbies || {}; // v6.6
  state.tasks = j.tasks || []; // «Мои задачи» (лист «Задачи»; прод видит только свои — фильтр на сервере)
  if (viewAsActive()){ realData = snapData(); realData.colors = state.colors; }
  filterViewData(); // если включён режим «глазами» — маскируем данные сразу после загрузки
  const dot=document.getElementById("livedot"),txt=document.getElementById("livetext");
  dot.className="dot-live";
  dot.title="Живые данные · обновлено "+new Date().toLocaleTimeString("ru-RU")+" · "+(AUTH.name||AUTH.user);
  txt.textContent = "обновлено " + new Date().toLocaleTimeString("ru-RU", {hour:"2-digit", minute:"2-digit"}) + (AUTH.prod ? " · только свои команды" : "");
  updateLoginBtn();
  updateViewAs();
  if (Date.now() - (state.lastPing||0) > 90000) updateResetBell((j.resetPending || 0) + (j.suggestions || 0)); // свежий ping точнее кэшированного чтения
  document.getElementById("sugbtn").style.display = AUTH.ok() ? "" : "none";
  render();
  if (document.getElementById("a-prod")) updateProdList();
  // v6: смотрящему — статусы мониторинга продюсеров для карточек команд (тихо, не чаще раза в 5 минут)
  if (AUTH.edit && !viewAsActive() && (!state.pm || !state.pm.at || Date.now() - state.pm.at > 5*60*1000)) setTimeout(()=>loadPM({ quiet: true }), 2500);
}
// ---------- 🐞 диагностика транспорта (вызывается с экрана загрузки) ----------
function runDiag(out){
  // D: диагностика без токена в адресе и без старого GET-опроса — два обычных POST
  out.innerHTML = "запускаю…";
  const lines = [];
  const put = t => { lines.push(t); out.innerHTML = lines.map(l=>"<div>· " + esc(l) + "</div>").join(""); };
  const t0 = Date.now();
  postJSON({ action:"check", token: AUTH.token }, 30000)
    .then(r1 => {
      put("1) связь с сервером: ✓ за " + ((Date.now()-t0)/1000).toFixed(1) + " с — " + (r1 && r1.error ? "ответ: " + r1.error : "вход действителен"));
      const t2 = Date.now();
      return postJSON({ action:"read", week:"latest", token: AUTH.token }, 120000).then(r2 => {
        put("2) чтение данных: " + (r2 && r2.error ? "✗ " + r2.error : "✓ за " + ((Date.now()-t2)/1000).toFixed(1) + " с, строк: " + ((r2 && r2.rows) ? r2.rows.length : "?")));
      });
    })
    .catch(e => put("✗ " + String(e && e.message || e).slice(0, 160)));
}

// режим вкладки продюсера: "overview" (по умолчанию) | "reviews"; выбор помнится только в пределах сессии вкладки
function prodModeGet(){
  if (state.prodMode !== "overview" && state.prodMode !== "reviews"){
    let m = ""; try{ m = sessionStorage.getItem("dash_prodmode") || ""; }catch(e){}
    state.prodMode = (m === "reviews") ? "reviews" : "overview";
  }
  return state.prodMode;
}
function prodModeSet(m){
  state.prodMode = (m === "reviews") ? "reviews" : "overview";
  try{ sessionStorage.setItem("dash_prodmode", state.prodMode); }catch(e){}
}
let loadingNow = false;
// v6: облегчённое чтение. Автообновление шлёт gen прошлого ответа — если через сайт ничего не меняли, сервер отвечает
// {same:true} без данных. Раз в LITE_FULL_MS читаем полностью (правки руками прямо в таблице gen не меняют).
const LITE_FULL_MS = 10*60*1000;
async function load(opts){
  const auto = !!(opts && opts.auto);
  if (loadingNow) return; // не запускать параллельные загрузки
  if (!AUTH.ok()){ showGate(); return; }
  loadingNow = true;
  try {
  hideGate(); // вход сохранён — после перезагрузки не показываем окно логина
  try{
    const f = JSON.parse(localStorage.getItem("dash_filters") || "null");
    if (f && !state.rows.length){
      const names = tabs();
      if (f.tab && names.includes(f.tab)) state.tab = f.tab;
      state.producer = f.producer || ""; state.quick = f.quick || "";
      // неделя: «» из старых сохранений = последняя; «all»/месяц/конкретная требуют полной загрузки
      state.week = "latest"; // Start with current week; archive is explicitly selected.
      if (state.week !== "latest") state.fullLoaded = false; // историю подтянет ensureFull
    }
  }catch(e){}
  const dot=document.getElementById("livedot"),txt=document.getElementById("livetext");
  // мгновенная отрисовка из кэша прошлой загрузки (свежие данные подтянутся следом)
  try{
    const cached = JSON.parse(sessionStorage.getItem("dash_cache") || "null");
    if (cached && cached.ver===CONFIG.VER && cached.user===AUTH.user && cached.week===state.week && cached.rows && cached.rows.length && !state.rows.length){
      state.rows = cached.rows; state.colors = cached.colors || {}; state.plans = cached.plans || {};
      state.itog = cached.itog || [];
      dot.className = "dot-off";
      txt.textContent = "кэш " + new Date(cached.ts).toLocaleTimeString("ru-RU") + " — обновляю…";
      render();
      if (document.getElementById("a-prod")) updateProdList();
    }
  }catch(e){}
  // по умолчанию сервер отдаёт только открытую неделю; историю просим явно
  const weekReq = state.week === "all" ? "all" : (state.week === "latest" ? "latest" : (state.week === "__month__" ? "all" : state.week));
  try{
    // холодное чтение может идти долго (опросы стоят в очереди за ним) — запас 120с,
    // а если не дождались — один автоповтор: сервер к этому моменту уже кэшировал ответ
    let j = null, lastErr = null, readAttempt = 0;
    while (readAttempt < 2 && !j){
      readAttempt++;
      try {
        const rq = {action:"read", week: weekReq};
        if (weekReq === "all") rq.lite = 1;
        if (auto && state.gen && state.genWeek === weekReq && Date.now() - (state.lastFullAt||0) < LITE_FULL_MS) rq.gen = state.gen;
        j = await wp(rq, 120000);
        if (j.error) throw Object.assign(new Error(j.error), {code:j.code,conflicts:j.conflicts});
      } catch(eRead){
        lastErr = eRead;
        if (readAttempt >= 2 || String(eRead.message).indexOf("сервер не ответил") < 0) throw eRead;
        txt.textContent = "сервер медленный — повторяю загрузку…";
        await new Promise(r=>setTimeout(r, 3000));
      }
    }
    if (!j) throw lastErr;
    state.lastLoadAt = Date.now();
    if (j.same){ // v6: сервер подтвердил — с прошлого раза ничего не менялось
      dot.className = "dot-live";
      txt.textContent = "";
    } else {
    state.gen = j.gen || ""; state.genWeek = weekReq; state.lastFullAt = Date.now();
    // автообновление не перерисовывает экран, если данные не изменились (отпечаток ВСЕГО ответа)
    const fp = weekReq + ":" + strHash(JSON.stringify(Object.assign({}, j, { gen: "" })));
    if (fp === state.dataFp){
      dot.className = "dot-live";
      txt.textContent = "";
    } else {
      const merge = (state.fullLoaded && weekReq !== "all" && j.week && j.week !== "all") ? j.week : "";
      applyData(j, false, merge);
      if (weekReq === "all") state.fullLoaded = true; // вся история уже здесь
      setTimeout(tplSync, 1500); // Обновление 6: шаблоны замечаний с сервера (один раз)
      if (!state.fullLoaded) schedulePrefetch(); // v6.6: прошлые недели — заранее, в фоне
      state.dataFp = fp;
      try{ sessionStorage.setItem("dash_cache", JSON.stringify({ ver:CONFIG.VER, user:AUTH.user, week:state.week, ts:Date.now(), rows:state.rows, colors:state.colors, plans:state.plans, itog:j.itog||[] })); }catch(e){ try{ sessionStorage.removeItem("dash_cache"); }catch(e2){} } // C: не влезло — старый кэш не оставляем
    }
    } // v6: конец «не same»
    // проверка ролей не чаще раза в 5 минут (после логина уже была)
    if (Date.now()-(state.lastCheck||0) > 5*60*1000 && !viewAsActive()){ // в режиме «глазами» не переобновляем права
      state.lastCheck = Date.now();
      wp({ action:"check" }).then(res=>{
        if (!res.error){
          AUTH.set(AUTH.user, AUTH.token, !!res.editor, res.cities || [], res.name || AUTH.user);
          AUTH.prod = !!res.prod; AUTH.admin = !!res.admin;
          try{ localStorage.setItem("dash_prod", res.prod?"1":"0"); localStorage.setItem("dash_admin", res.admin?"1":"0"); }catch(e){}
          updateLoginBtn();
          render();
        }
      }).catch(()=>{});
    }
  }catch(e){
    dot.className="dot-off";
    if (e && e.transient){ // Обновление 4: временный сбой связи — мягкое сообщение и тихий автоповтор
      txt.textContent = (state.rows.length ? "нет связи, повторю… (показаны данные " + (state.dataFp ? "последней загрузки" : "из кэша") + ")" : "нет связи с сервером, повторю через 20 с…");
      clearTimeout(state.softRetryT);
      state.softRetryT = setTimeout(()=>{ if (!loadingNow && !anyDirty()) load(); }, 20000); // AUDIT4 P2-3: при черновиках не трогаем экран
    } else {
      txt.textContent="Ошибка загрузки: "+String(e.message).replace(/эта операция выполняется через POST/gi, "сбой связи")+". Если повторяется — проверь сеть и обнови страницу.";
    }
    if (/^недели «/.test(String(e.message)) && state.week !== "latest"){ // неделю удалили/переименовали — вернуться к последней
      state.week = "latest"; state.dataFp = ""; toast(e.message, true); setTimeout(load, 200);
    }
  }
  const sp = document.getElementById("splash");
  if (sp && !sp.classList.contains("hide")) sp.classList.add("hide");
  loadingNow = false;
  } catch(e2){ loadingNow = false; throw e2; }
}
window.addEventListener("beforeunload", e=>{
  // D10: предупреждаем и пока отправка не подтверждена сервером (очередь/в пути/упавшие)
  if (pendingWrites()) flushAllSaves();
  // v6.4: мониторинг продюсера — недописанное сохраняем сразу и предупреждаем, пока запрос в пути
  try { Object.keys(state.pmEdits||{}).forEach(k=>{ if (state.pmEdits[k] && AUTH.prod && !viewAsActive()) pmSaveQueued(k, true); }); if (typeof pmPending === "function" && pmPending()){ e.preventDefault(); e.returnValue = ""; } } catch(err){}
  if (anyDirty() || pendingWrites() || Object.keys(state.failedSaves||{}).length){ e.preventDefault(); e.returnValue = ""; }
});
// сторожевой таймер: заставка не может висеть вечно (мягко, без красной паники)
setTimeout(function(){
  const sp = document.getElementById("splash");
  if (!sp || sp.classList.contains("hide")) return;
  if (state.rows && state.rows.length){ sp.classList.add("hide"); return; } // данные уже пришли — тихо убрать заставку
  if (!AUTH.ok()){ showGate(); return; }
  sp.querySelector(".stxt").innerHTML = 'Данные грузятся дольше обычного… <button class="gbtn" id="spl-retry" style="margin-left:8px">повторить</button> <button class="gbtn" id="spl-diag" style="margin-left:6px">🐞 диагностика</button><div id="spl-diagout" style="margin-top:10px;text-align:left;font-size:12px;max-width:520px;margin-left:auto;margin-right:auto"></div>';
  const rb = document.getElementById("spl-retry");
  if (rb) rb.onclick = function(){ sp.querySelector(".stxt").textContent = "Загружаем данные…"; load(); };
  const db = document.getElementById("spl-diag");
  if (db) db.onclick = function(){ runDiag(document.getElementById("spl-diagout")); };
}, 15000);
load();
// v6 (исправление 7): фоновая вкладка не дёргает сервер; вернулись на вкладку — обновим, если данные устарели
setInterval(()=>{ if (AUTH.ok() && !anyDirty() && document.visibilityState === "visible") load({ auto: true }); }, CONFIG.REFRESH_MIN*60*1000);
document.addEventListener("visibilitychange", ()=>{
  if (document.visibilityState === "visible" && AUTH.ok() && !anyDirty() && !loadingNow && Date.now() - (state.lastLoadAt||0) > CONFIG.REFRESH_MIN*60*1000) load({ auto: true });
});
// задача 3: лёгкий опрос уведомлений раз в 60 с — работает и при черновиках (полное обновление при них пропускается)
async function pingNotif(){
  if (!AUTH.ok() || viewAsActive() || document.visibilityState !== "visible") return;
  try {
    const r = await wp({ action:"ping" }, 20000);
    if (r && !r.error){
      state.lastPing = Date.now();
      updateResetBell((r.resetPending||0) + (r.suggestions||0) + (r.asks||0));
      if (AUTH.edit) healthShow(r.health); // v6.6: плашка самопроверки
      updateSugBadge(r.myAnswers||0);
      // v6: бейдж мониторинга продюсера (продюсеру — возвраты, смотрящему — ждут проверки)
      const nb = AUTH.prod ? (r.pmReturned||0) : (r.pmSent||0);
      if (nb !== (state.pmBadge||0)){ state.pmBadge = nb; softRender(); if (pmIsTab(state.tab)) loadPM({ quiet: true }); } // бейдж — сразу, список — следом
    }
  } catch(e){}
}
setInterval(pingNotif, 60000);
setTimeout(pingNotif, 4000);
document.addEventListener("visibilitychange", ()=>{ if (document.visibilityState === "visible" && Date.now() - (state.lastPing||0) > 60000) pingNotif(); });
// Обновление 6 (10): PWA — SW кэширует только оболочку (см. sw.js); на file:// и http не регистрируем
if (typeof navigator !== "undefined" && "serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")){
  window.addEventListener("load", ()=>{ navigator.serviceWorker.register("sw.js", { scope: "./" }).catch(()=>{}); });
}
// Release 83: review comparison, history, conflicts, completeness, bot names.
function reviewIdentity(r) {
  return JSON.stringify([r.city, r.opNick, r.opName, r.model].map(v=>String(v||'').trim().toLowerCase()));
}
function reviewPairs(now, before) {
  const index = rows => { const m=new Map(); rows.forEach(r=>{ const k=reviewIdentity(r); m.set(k,m.has(k)?null:r); }); return m; };
  const a=index(now), b=index(before), pairs=[];
  a.forEach((r,k)=>{ const p=b.get(k); if (!r || !p || catsOf(r).join('|')!==catsOf(p).join('|')) return;
    const x=rowStats(r), y=rowStats(p);
    if (x.st.length===9 && y.st.length===9 && x.st.every(Boolean) && y.st.every(Boolean)) pairs.push([r,p]);
  });
  return pairs;
}
function reviewValue(r,f) {
  const j=FIELDCODES.indexOf(f);
  return String((j>=0?r.cats[j]:r[({comment:'obs',score:'scoreM',verdict:'verdictM',recs:'reco',links:'linksTxt',status:'status'})[f]])??'');
}
function reviewFieldName(r,f) { const j=FIELDCODES.indexOf(f); return j>=0?catsOf(r)[j]:({comment:'Комментарий',score:'Оценка',verdict:'Вердикт',recs:'Рекомендации',links:'Ссылки',status:'Статус'})[f]||f; }
function reviewCurrent(r,key) {
  const c={...r,cats:r.cats.slice()};
  for(let j=0;j<9;j++){ const el=document.getElementById('ed'+key+'_'+j); if(el)c.cats[j]=el.value; }
  for(const [suffix,prop] of [['comment','obs'],['reco','reco']]){const el=document.getElementById('ed'+key+'_'+suffix);if(el)c[prop]=el.value;}
  return c;
}
function reviewGaps(r) {
  const gaps=[], st=rowStats(r).st;
  catsOf(r).forEach((n,j)=>{if(!st[j])gaps.push('Не отмечено: '+n);});
  if(isNskRow(r)){
    const shots=(state.screens||{})[skey(r)]||[];
    Object.entries(NSK_SHOTS).forEach(([j,n])=>{const have=shots.filter(s=>s.cat===CATS_NSK[j]).length;if(have<n)gaps.push(CATS_NSK[j]+': скриншоты '+have+' из '+n);});
    const g=goalsParse(r.cats[NSK_GOALS]).goals.filter(x=>x.g||x.p||x.o);
    if(g.length<5)gaps.push('Голы: '+g.length+' из 5');
    if(g.some(x=>!x.g||!x.p||!x.o))gaps.push('В голах есть незаполненные название, цена или онлайн');
    if(!scaleOf(r.cats[NSK_SCALE]))gaps.push('Не указана оценка оператора 1–5');
    if(catState(r.cats[7])==='warn')gaps.push('Модель ↔ мемберы: уточни старую оценку кнопкой «да» или «нет»');
    const bots=botsParse(r.cats[3]).bots;
    if(bots.some(x=>!x.bot.trim()||!x.comment.trim()))gaps.push('У каждого бота нужны название и комментарий');
  }
  return gaps;
}
function reviewCompleteness(r) {
  const gaps=reviewGaps(r);
  return `<details class="rv-complete"><summary>${gaps.length?'Разбор неполный · '+gaps.length:'Обязательные пункты заполнены'}</summary><p>Полнота заполнения не меняет оценку работы.</p>${gaps.length?'<ul>'+gaps.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':'<p>Пропусков по правилам чек-листа не найдено.</p>'}</details>`;
}
function reviewTools(r,key) {
  return `<div class="rv-tools"><button type="button" class="abtn2" data-rv-compare="${esc(key)}">Прошлый и текущий разбор</button><button type="button" class="abtn2" data-rv-history="${esc(key)}">История правок</button></div><div data-rv-complete="${esc(key)}">${reviewCompleteness(r)}</div>`;
}
function reviewDialog(title) {
  const old=document.getElementById('review-dialog');if(old)old.remove();
  const dialog=document.createElement('dialog');dialog.id='review-dialog';dialog.className='rv-dialog';
  dialog.setAttribute('aria-label',title);
  dialog.innerHTML='<div class="rv-dialog-head"><h2>'+esc(title)+'</h2><button type="button" class="abtn2" aria-label="Закрыть">Закрыть</button></div><div class="rv-body">Загружаю…</div>';
  document.body.appendChild(dialog);dialog.querySelector('.rv-dialog-head button').onclick=()=>dialog.close();
  dialog.addEventListener('keydown',ev=>ev.stopPropagation());
  dialog.addEventListener('close',()=>dialog.remove(),{once:true});dialog.showModal();return dialog;
}
function reviewScreens(r) {
  return ((state.screens||{})[skey(r)]||[]).filter(s=>!isAdvCat(s.cat)&&!isVideoLink(s.link)).map(s=>{
    const preview=(state.thumbData||{})[s.mini||s.link];
    return `<button type="button" class="abtn2 rv-shot" data-rv-shot="${esc(driveId(s.link)||'')}">${preview?'<img alt="Миниатюра" src="'+esc(preview)+'">':''}<span>${esc(s.cat||'Скриншот')} · открыть оригинал</span></button>`;
  }).join('')||'<p>Скриншотов нет</p>';
}
async function reviewCompare(r,key) {
  const current=reviewCurrent(r,key), user=AUTH.user, d=reviewDialog('Прошлый и текущий разбор'), box=d.querySelector('.rv-body');
  try{
    await ensureFull(); if(!d.isConnected || AUTH.user!==user)return;
    if(!state.fullLoaded)throw Error('История недель не загрузилась. Повтори позже.');
    const weeks=[...new Set(state.rows.filter(x=>x.city===r.city && weekKey(x.week)<weekKey(r.week)).map(x=>x.week))].sort((a,b)=>weekKey(b)-weekKey(a));
    const week=weeks[0];
    const found=state.rows.filter(x=>x.week===week&&reviewIdentity(x)===reviewIdentity(r));
    if(found.length!==1){box.textContent=found.length?'В прошлой неделе несколько совпадающих команд. Однозначное сравнение невозможно.':'Для этой команды нет разбора в предыдущей доступной неделе'+(week?' '+week:'')+'.';return;}
    const previous=await ensureRowFull(found[0]);if(!d.isConnected || AUTH.user!==user)return;
    const previousNames=catsOf(previous), same=catsOf(current).join('|')===previousNames.join('|');
    const cell=(row,j)=>j<0?'—':nskRoBody(row,j,row.cats[j]||'—');
    box.innerHTML=`<p>${esc(r.opName||r.opNick)} · ${esc(r.model)}. Справа — текущие поля, включая несохранённые изменения.</p>${same?'':'<p>Чек-листы различаются: сопоставлены только одинаковые названия пунктов.</p>'}<div class="rv-pair rv-head"><b>${esc(week)}</b><b>${esc(r.week)} · текущий разбор</b></div>`+catsOf(current).map((n,j)=>{
      const k=previousNames.indexOf(n), a=k>=0?catState(previous.cats[k]):null,b=catState(current.cats[j]);
      return `<section class="rv-section"><h3>${esc(n)}${a&&b&&a!=='ok'&&b!=='ok'?' <span class="chip c-warn">Повторное замечание</span>':''}</h3><div class="rv-pair"><div>${cell(previous,k)}</div><div>${cell(current,j)}</div></div></section>`;
    }).join('')+`<section class="rv-section"><h3>Общий комментарий</h3><div class="rv-pair"><div>${esc(previous.obs||'—')}</div><div>${esc(current.obs||'—')}</div></div></section><section class="rv-section"><h3>Скриншоты</h3><div class="rv-pair"><div>${reviewScreens(previous)}</div><div>${reviewScreens(current)}</div></div></section>`;
  }catch(e){if(d.isConnected)box.textContent=e.message;}
}
async function reviewHistory(r) {
  const user=AUTH.user,d=reviewDialog('История правок разбора'),box=d.querySelector('.rv-body');
  try{const res=await wp(Object.assign({action:'reviewhistory'},rowKeyParams(r)));if(!d.isConnected||AUTH.user!==user)return;
    box.innerHTML='<p>Последние 100 изменений полей этого разбора. Запись истории началась с версии 2026-11-05.86. Загрузка скриншотов и смена состава команды сюда не входят.</p>'+(res.items.length?res.items.map(x=>`<section class="rv-section"><h3>${esc(reviewFieldName(r,x.field))}</h3><p>${esc(x.when)} · ${esc(x.actor)}</p><div class="rv-pair"><div><b>Было</b><p>${esc(x.before||'—')}</p></div><div><b>Стало</b><p>${esc(x.after||'—')}</p></div></div></section>`).join(''):'<p>После обновления изменений этого разбора ещё нет.</p>');
  }catch(e){if(d.isConnected)box.textContent=e.message;}
}
async function reviewConflict(x,key) {
  const r=x.r,qk=rk(r),failure=state.failedSaves[qk];if(!failure)return;
  if(rowSaveBusy[qk]||saveQueue[qk]){toast('Дождись завершения отправки',true);return;}
  const user=AUTH.user,d=reviewDialog('Сравнить версии перед сохранением'),box=d.querySelector('.rv-body');
  try{
    const res=await wp(Object.assign({action:'rowfull'},rowKeyParams(r)));if(!d.isConnected||user!==AUTH.user)return;
    const fields=Object.keys(failure.fields), server=res.row;
    const mine=reviewCurrent(r,key);
    box.innerHTML='<p>Выбери значение для каждого поля. Новая отправка снова проверит, не изменил ли кто-то запись.</p>'+fields.map((f,i)=>{
      const value=FIELDCODES.includes(f)||['comment','recs'].includes(f)?reviewValue(mine,f):failure.fields[f];
      return `<section class="rv-section"><h3>${esc(reviewFieldName(r,f))}</h3><div class="rv-pair"><label><input type="radio" name="rv-conf-${i}" value="server" checked> Оставить серверное<p>${esc(reviewValue(server,f)||'—')}</p></label><label><input type="radio" name="rv-conf-${i}" value="mine"> Мой вариант<textarea data-rv-value="${i}">${esc(value)}</textarea></label></div></section>`;
    }).join('')+'<button type="button" class="savebtn" id="rv-resolve">Применить выбранные значения</button>';
    box.querySelector('#rv-resolve').onclick=()=>{
      if(user!==AUTH.user||!rowEditable(r)||state.failedSaves[qk]!==failure){toast('Состояние изменилось. Открой сравнение заново.',true);d.close();return;}
      const changes=[], draft=getDraft(r)||{}, adopted={};
      fields.forEach((f,i)=>{const useMine=box.querySelector(`input[name="rv-conf-${i}"]:checked`).value==='mine';const base=reviewValue(server,f),value=useMine?box.querySelector(`[data-rv-value="${i}"]`).value:base;
        adopted[f]=value;const j=FIELDCODES.indexOf(f),dk=j>=0?'f'+j:({comment:'comment',score:'score',verdict:'verdict',recs:'reco',links:'lk'})[f];if(dk)draft[dk]=value;
        if(value!==base)changes.push([f,value,base]);
      });
      delete state.failedSaves[qk];applyOptimistic_(qk,adopted);setDraft(r,draft);
      if(changes.length){queueRowSave(x,key,changes);saveQueue[qk].preserveDraft=true;saveQueue[qk].resolvedBase=server;}
      else reviewPruneResolvedDraft(r,{fields:adopted,resolvedBase:server});
      d.close();render();toast(changes.length?'Отправляю выбранные значения…':'Приняты серверные значения; остальные черновики сохранены');
    };
  }catch(e){if(d.isConnected)box.textContent=e.message;}
}
function reviewPruneResolvedDraft(r,q){
  const d=getDraft(r);if(!d)return;
  const mapping=Object.fromEntries(FIELDCODES.map((f,j)=>['f'+j,f]));
  Object.assign(mapping,{comment:'comment',score:'score',verdict:'verdict',reco:'recs',lk:'links'});
  Object.entries(mapping).forEach(([dk,f])=>{const expected=Object.hasOwn(q.fields,f)?q.fields[f]:reviewValue(q.resolvedBase,f);const normalize=v=>f==='score'?String(v??'').trim().replace(',','.'):String(v??'');if(normalize(d[dk])===normalize(expected))delete d[dk];});
  if(Object.keys(mapping).some(k=>Object.hasOwn(d,k)))setDraft(r,d);else clearDraft(r);
}
function botCatalogRead() {try{const x=JSON.parse(localStorage.getItem('dash_bot_names:'+AUTH.user)||'[]');return Array.isArray(x)?x.filter(v=>typeof v==='string').slice(0,80):[];}catch(e){return [];} }
function botCatalogLearn(bots) {
  const names=[...new Set(botCatalogRead().concat(bots.map(b=>b.bot.trim()).filter(Boolean)))].slice(-80);
  try{localStorage.setItem('dash_bot_names:'+AUTH.user,JSON.stringify(names));}catch(e){toast('Не удалось сохранить каталог в браузере',true);}
}
function botCatalogHtml(key) {
  return `<datalist id="bot-names-${esc(key)}">${botCatalogRead().map(n=>'<option value="'+esc(n)+'"></option>').join('')}</datalist><p class="co-hint">Названия запоминаются в этом браузере для твоего аккаунта. Комментарии заполняются заново. <button type="button" class="abtn2" data-rv-bot-catalog>Каталог ботов</button></p>`;
}
document.addEventListener('click',async ev=>{
  const button=ev.target.closest('[data-rv-compare],[data-rv-history],[data-rv-bot-catalog],[data-rv-shot]');if(!button)return;
  if(button.hasAttribute('data-rv-bot-catalog')){
    const d=reviewDialog('Мой каталог ботов'),box=d.querySelector('.rv-body');
    box.innerHTML='<p>Одно название в строке. Каталог хранится только в этом браузере и не меняет разборы.</p><textarea aria-label="Названия ботов" rows="12">'+esc(botCatalogRead().join('\n'))+'</textarea><button class="savebtn">Сохранить каталог</button>';
    box.querySelector('button').onclick=()=>{try{localStorage.setItem('dash_bot_names:'+AUTH.user,JSON.stringify([...new Set(box.querySelector('textarea').value.split('\n').map(s=>s.trim().slice(0,150)).filter(Boolean))].slice(0,80)));d.close();document.querySelectorAll('datalist[id^="bot-names-"]').forEach(l=>l.innerHTML=botCatalogRead().map(n=>'<option value="'+esc(n)+'"></option>').join(''));toast('Каталог сохранён');}catch(e){toast('Не удалось сохранить каталог',true);}};return;
  }
  if(button.hasAttribute('data-rv-shot')){
    if(!button.dataset.rvShot)return;button.disabled=true;
    try{const res=await wp({action:'thumb',id:button.dataset.rvShot,full:'1'},90000);if(!res.d)throw Error('Оригинал недоступен');if(button.isConnected){const im=document.createElement('img');im.src=b64Img(res.d);im.alt='Оригинал скриншота';im.className='rv-original';button.after(im);button.remove();}}
    catch(e){button.disabled=false;toast(e.message,true);}return;
  }
  const key=button.dataset.rvCompare??button.dataset.rvHistory,x=state.lastView[key];if(!x)return;
  if(button.hasAttribute('data-rv-compare'))reviewCompare(x.r,key);else reviewHistory(x.r);
});
document.addEventListener('input',ev=>{
  const m=/^ed(?:b|c)?(.+)_(\d)$/.exec(ev.target.id||'');if(!m)return;
  const x=state.lastView[m[1]],box=document.querySelector('[data-rv-complete="'+m[1]+'"]');
  if(x&&box){const open=box.querySelector('details')?.open;box.innerHTML=reviewCompleteness(reviewCurrent(x.r,m[1]));if(open)box.querySelector('details').open=true;}
});


function autoSaveStatus84(key,message){
  const el=document.getElementById('ovds'+key);if(el)el.textContent=message;
}
window.addEventListener('online',()=>{
  if(!AUTH.edit)return;
  Object.entries(state.failedSaves).forEach(([k,f])=>{
    const r=rowByRk(k);if(!r||!rowEditable(r)||f.code==='SAVE_CONFLICT')return;
    const x=Object.values(state.lastView).find(x=>rk(x.r)===k);
    if(x) saveRow(x,x.id,true);
  });
});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flushAllSaves();});
