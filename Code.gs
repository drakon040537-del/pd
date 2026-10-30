// ---------- СЕССИИ (v41) ----------
// Каждая сессия — отдельное Script Property «sess_<токен>» = { u, exp }.
// Создание/чистка/гашение — под LockService; ошибка записи НЕ проглатывается (вход честно скажет «не удалось»).
// Старое общее хранилище «SESSIONS» (один JSON на всех) только читается — уже вошедшие не вылетают
// после обновления; разовый перенос — функция migrateSessions() (см. DEPLOY.md).
var SESSIONS_KEY = "SESSIONS"; // устаревшее общее хранилище (только чтение/миграция)
var SESS_PREFIX = "sess_";
var SESSION_TTL = 7 * 24 * 3600 * 1000; // 7 дней, продлевается при активности
var __memo = {}; // кэш на время ОДНОГО выполнения (каждый doPost — новое выполнение)
function props_(){ return PropertiesService.getScriptProperties(); }
function validToken_(t){ return /^[0-9a-f]{64}$/.test(String(t || "")); }
function withScriptLock_(ms, fn){
  const lock = LockService.getScriptLock();
  lock.waitLock(ms);
  try { return fn(); } finally { try { lock.releaseLock(); } catch (e) {} }
}
function legacySessions_(){
  try { return JSON.parse(props_().getProperty(SESSIONS_KEY) || "{}"); } catch (err) { return {}; }
}
// v6 (исправление 2): Script Properties — общий лимит ~500 КБ на ВСЁ (пользователи, сессии, настройки).
// Каждый вход добавлял сессию на 7 дней без ограничения → при частых входах хранилище переполнялось и вход ломался.
// Теперь у логина не больше SESSION_MAX_PER_USER живых сессий: при новом входе самые старые гаснут.
var SESSION_MAX_PER_USER = 5;
function sessionsToDrop_(all, now, user, keep){ // чистая: какие ключи сессий удалить (истёкшие + лишние у user)
  const drop = [], mine = [];
  Object.keys(all).forEach(function (k) {
    if (k.indexOf(SESS_PREFIX) !== 0) return;
    let s = null; try { s = JSON.parse(all[k]); } catch (e) { s = null; }
    if (!s || !s.exp || s.exp < now) { drop.push(k); return; }
    if (user && s.u === user) mine.push({ k: k, t: Number(s.c || s.exp - SESSION_TTL || 0) });
  });
  if (user && mine.length > keep) {
    mine.sort(function (a, b) { return a.t - b.t; }); // старые первыми
    mine.slice(0, mine.length - keep).forEach(function (x) { drop.push(x.k); });
  }
  return drop;
}
function sessionsCleanup_(user){ // вызывать под локом: убрать истёкшие сессии (и лишние у user — оставить место под новую)
  const all = props_().getProperties();
  sessionsToDrop_(all, Date.now(), user, SESSION_MAX_PER_USER - 1).forEach(function (k) {
    try { props_().deleteProperty(k); } catch (e) {}
  });
}
function sessionCreate_(user){
  const token = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
  withScriptLock_(10000, function () {
    try { sessionsCleanup_(user); } catch (e) { console.warn("sessionsCleanup_: " + e); }
    const now = Date.now();
    props_().setProperty(SESS_PREFIX + token, JSON.stringify({ u: user, exp: now + SESSION_TTL, c: now }));
  });
  return token; // запись не удалась → исключение уходит в auth_, токен НЕ выдаётся
}
function sessionUser_(token){
  token = String(token || "");
  if (!validToken_(token)) return null;
  if (__memo.sessTok === token) return __memo.sess; // в рамках запроса читаем один раз
  let s = null, legacy = false;
  try { s = JSON.parse(props_().getProperty(SESS_PREFIX + token) || "null"); } catch (err) { s = null; }
  if (!s) { const o = legacySessions_(); if (o[token]) { s = o[token]; legacy = true; } }
  let res = null;
  if (s && s.exp && s.exp >= Date.now()) {
    const base = usersRaw_().find(function (x) { return x.u === s.u; });
    if (base) {
      res = { login: s.u, u: base };
      if (legacy || s.exp - Date.now() < SESSION_TTL - 3600 * 1000) { // продлеваем не чаще раза в час
        try { props_().setProperty(SESS_PREFIX + token, JSON.stringify({ u: s.u, exp: Date.now() + SESSION_TTL, c: s.c || Date.now() })); }
        catch (err) { console.warn("продление сессии не записалось: " + err); }
      }
    }
  } else if (s && !legacy) {
    try { props_().deleteProperty(SESS_PREFIX + token); } catch (e) {}
  }
  __memo.sessTok = token; __memo.sess = res;
  return res;
}
// погасить ВСЕ сессии логина (смена пароля); вызывать под локом
function sessionsKillUser_(login){
  const all = props_().getProperties();
  Object.keys(all).forEach(function (k) {
    if (k.indexOf(SESS_PREFIX) !== 0) return;
    let s = null; try { s = JSON.parse(all[k]); } catch (e) { s = null; }
    if (!s || s.u === login) props_().deleteProperty(k);
  });
  const o = legacySessions_();
  let changed = false;
  Object.keys(o).forEach(function (t) { if (!o[t] || o[t].u === login) { delete o[t]; changed = true; } });
  if (changed) props_().setProperty(SESSIONS_KEY, JSON.stringify(o));
  __memo.sessTok = null; __memo.sess = null;
}
// разовый перенос старых сессий из общего «SESSIONS» в отдельные свойства (запустить вручную один раз)
function migrateSessions(){
  withScriptLock_(30000, function () {
    const o = legacySessions_();
    const now = Date.now();
    let moved = 0;
    Object.keys(o).forEach(function (t) {
      if (!validToken_(t) || !o[t] || !o[t].exp || o[t].exp < now) return;
      if (!props_().getProperty(SESS_PREFIX + t)) { props_().setProperty(SESS_PREFIX + t, JSON.stringify({ u: o[t].u, exp: o[t].exp })); moved++; }
    });
    props_().deleteProperty(SESSIONS_KEY);
    console.log("migrateSessions: перенесено сессий: " + moved + "; старое свойство SESSIONS удалено");
  });
}

// ---------- ВХОД: лимит попыток + один общий ответ (без подсказок, какой логин существует) ----------
var LOGIN_MAX_FAILS = 5;      // на логин за 15 минут
// v6 (исправление 1): общий лимит на ВСЕ логины убран — 100 неверных входов с публичного адреса /exec
// закрывали вход всем пользователям на 15 минут. Остаётся лимит на один логин; общий счётчик только пишется
// в журнал ошибок (вкладка «Состояние»), когда перебор заметен.
var LOGIN_FAILS_ALL_ALERT = 100;
function lfKey_(login){ return "lf_" + Utilities.base64EncodeWebSafe(String(login).toLowerCase()).slice(0, 200); }
function loginBlocked_(login){
  try {
    const c = CacheService.getScriptCache();
    return Number(c.get(lfKey_(login)) || 0) >= LOGIN_MAX_FAILS;
  } catch (e) { return false; }
}
function loginFail_(login){
  try {
    const c = CacheService.getScriptCache();
    c.put(lfKey_(login), String(Number(c.get(lfKey_(login)) || 0) + 1), 900);
    const all = Number(c.get("lf__all") || 0) + 1;
    c.put("lf__all", String(all), 900);
    if (all === LOGIN_FAILS_ALL_ALERT) errLog_("auth", "много неудачных входов за 15 минут: " + all + " (возможен перебор)");
  } catch (e) {}
}
function loginOk_(login){ try { CacheService.getScriptCache().remove(lfKey_(login)); } catch (e) {} }
function auth_(p){ // POST: { action:"auth", user, pass } → токен + профиль в ответе
  const user = String(p.user || "").trim().slice(0, 80);
  const pass = String(p.pass || "");
  const GENERIC = "Неверный логин или пароль";
  if (!user || !pass) return { error: GENERIC };
  if (loginBlocked_(user)) { loginLog_(user, "блок (много попыток)", p.dev); return { error: "Слишком много неудачных попыток входа — подожди 15 минут и попробуй снова" }; }
  const cfg = usersRaw_();
  if (!cfg.length) { console.error("auth_: список пользователей пуст или не читается (Script Properties)"); return { error: "Вход временно недоступен — сообщи администратору" }; }
  const uu = cfg.find(function (x) { return x.u === user; });
  let ok = false;
  if (uu) ok = verifyUser_(user, pass);
  else hashIter_("x", pass, pwIter_()); // одинаковая работа для несуществующего логина
  if (!ok) { loginFail_(user); loginLog_(user, uu ? "неверный пароль" : "нет такого логина", p.dev); return { error: GENERIC }; }
  loginOk_(user);
  loginLog_(user, "вход", p.dev);
  let token;
  try { token = sessionCreate_(user); }
  catch (err) {
    console.error("sessionCreate_: " + err);
    return { error: /lock|timed out|занят/i.test(String(err)) ? "Сервер занят — попробуй войти ещё раз через минуту" : "Не удалось создать сессию — попробуй войти ещё раз" };
  }
  return { ok: true, token: token, editor: !!uu.edit, name: uu.name || user,
    cities: uu.cities === "all" ? ["all"] : uu.cities, prod: !!uu.prod, admin: isAdmin_({ login: user, edit: !!uu.edit }) };
}
// v6.1: смена своего пароля с сайта (любой вошедший). Нужен текущий пароль; все входы гаснут, этому устройству выдаётся новый токен.
function chpass_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const oldp = String(p.old || ""), np = String(p.pass || "");
  if (loginBlocked_(u.login)) return { error: "Слишком много неверных попыток — подожди 15 минут" };
  if (np.length < 8) return { error: "Новый пароль — не короче 8 символов" };
  if (np.length > 200) return { error: "Слишком длинный пароль" };
  if (np === oldp) return { error: "Новый пароль совпадает со старым" };
  if (!verifyUser_(u.login, oldp)) { loginFail_(u.login); return { error: "Текущий пароль неверный" }; }
  loginOk_(u.login);
  if (!setPasswordCore_(u.login, np)) return { error: "Не удалось сохранить пароль — попробуй ещё раз" };
  let token;
  try { token = sessionCreate_(u.login); } catch (e) { return { ok: true, relogin: true }; }
  return { ok: true, token: token };
}
function logout_(p){
  const t = String(p.token || "");
  if (!validToken_(t)) return { ok: true };
  try { props_().deleteProperty(SESS_PREFIX + t); } catch (e) {}
  try {
    const o = legacySessions_();
    if (o[t]) withScriptLock_(5000, function () { const o2 = legacySessions_(); delete o2[t]; props_().setProperty(SESSIONS_KEY, JSON.stringify(o2)); });
  } catch (e) { console.warn("logout legacy: " + e); }
  return { ok: true };
}

function doGet(e) {
  // v41: GET ничего не отдаёт и не пишет — ни токенов, ни ответов. Всё — через POST в doPost.
  // Обновление 4: сайт сам GET не шлёт; сюда попадает POST, который переадресация Google (302 на /exec)
  // превратила в GET и потеряла тело. doPost при этом НЕ выполнялся, поэтому клиенту безопасно повторить —
  // отдаём машинный код NEED_POST, по нему клиент молча повторяет запрос POST-ом с паузой.
  const a = String((e && e.parameter && e.parameter.a) || (e && e.parameter && e.parameter.action) || "").slice(0, 30);
  return out({ error: "эта операция выполняется через POST", code: "NEED_POST", retry: true, action: a });
}

var WEEK_NAME_RE = /^\d{1,2}(\.\d{1,2})?-\d{1,2}\.\d{1,2}(\.\d{2,4})?$/;
function isTeamSheet_(name){ return writableSheet_(name) && SERVICE_SHEETS.indexOf(String(name).trim()) < 0; }
// D5: создаём неделю ТОЛЬКО если её ещё нет нигде; существующие листы никогда не чистятся.
function copyweek_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "создавать недели может только редактор" };
  const base = String(p.base || "").trim();
  const name = String(p.name || "").trim();
  if (!base || !name) return { error: "укажи базовую и новую недели" };
  if (!WEEK_NAME_RE.test(name)) return { error: "название недели должно быть вида «28-04.10» или «28.09-04.10» — ничего не создано" };
  if (name === base) return { error: "новая неделя совпадает с базовой — ничего не создано" };
  const lock = LockService.getScriptLock();
  const created = [];
  try {
    lock.waitLock(30000);
    const ss = SpreadsheetApp.getActive();
    const sheets = ss.getSheets();
    if (sheets.some(function (sh) { return sh.getName().indexOf("(" + name + ")") !== -1; }))
      return { error: "неделя «" + name + "» уже существует — ничего не изменено (если нужно пересоздать — сначала удали её)" };
    const src = sheets.filter(function (sh) { const nm = sh.getName(); return nm.indexOf("(" + base + ")") !== -1 && isTeamSheet_(nm) && allowedCity_(u, nm); });
    if (!src.length) return { error: "листы базовой недели «" + base + "» не найдены" };
    src.forEach(function (sh) {
      const copy = sh.copyTo(ss);
      copy.setName(sh.getName().replace("(" + base + ")", "(" + name + ")"));
      created.push(copy);
      const last = copy.getLastRow();
      if (last < 2) return;
      const rng = copy.getRange(2, 1, last - 1, 3).getValues();
      const ranges = [];
      let runStart = -1;
      rng.forEach(function (r, i) {
        const a = String(r[0] || "").trim();
        const rowN = i + 2;
        if (a && !blockHead_(r)) { if (runStart < 0) runStart = rowN; } // строка команды: D..U чистим (v6.9: заголовок — по blockHead_)
        else if (runStart > 0) { ranges.push("D" + runStart + ":U" + (rowN - 1)); runStart = -1; }
      });
      if (runStart > 0) ranges.push("D" + runStart + ":U" + last);
      // D..U: категории, комментарий, статус, «Обновлено», скрин, оценка, вердикт, рекомендации, ссылки — одной пачкой
      if (ranges.length) copy.getRangeList(ranges).clearContent();
    });
    return { ok: true, created: created.length };
  } catch (err) {
    // частично созданная неделя хуже, чем никакая: убираем листы, созданные ЭТИМ вызовом
    created.forEach(function (sh) { try { SpreadsheetApp.getActive().deleteSheet(sh); } catch (e3) {} });
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// ---------- ЗАГРУЗКА СКРИНА (Ctrl+V на сайте) ----------
// POST с JSON: { key, user, pass, sheet, row, data(base64 jpeg) }
// Сохраняет картинку на Диск (папка «Продюсеры — скрины»), открывает доступ по ссылке,
// вписывает прямую ссылку в колонку P «Скрин» и ставит метку «Обновлено».
const SCREEN_FOLDER = "Продюсеры — скрины";
// D: папка по id из Script Property SCREEN_FOLDER_ID; если свойства нет — поиск по имени (как раньше), и найденный id запоминается
function screenFolder_(){
  const pr = props_();
  const id = String(pr.getProperty("SCREEN_FOLDER_ID") || "").trim();
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  const it = DriveApp.getFoldersByName(SCREEN_FOLDER);
  const f = it.hasNext() ? it.next() : DriveApp.createFolder(SCREEN_FOLDER);
  try { pr.setProperty("SCREEN_FOLDER_ID", f.getId()); } catch (e2) {}
  return f;
}
// D: ограничения загрузки — только JPEG, полный ≤ 6 МБ, мини ≤ 1 МБ
var UPLOAD_MAX_FULL = 6 * 1024 * 1024, UPLOAD_MAX_MINI = 1024 * 1024;
function jpegBytes_(b64, max){
  if (typeof b64 !== "string" || !b64) return { error: "нет картинки" };
  if (b64.length > Math.ceil(max * 4 / 3) + 8) return { error: "файл слишком большой (максимум " + Math.round(max / 1048576) + " МБ)" };
  let bytes;
  try { bytes = Utilities.base64Decode(b64); } catch (e) { return { error: "повреждённая картинка" }; }
  if (bytes.length > max) return { error: "файл слишком большой (максимум " + Math.round(max / 1048576) + " МБ)" };
  const kind = imgKind_(bytes);
  if (!kind) return { error: "можно загружать только JPEG или WebP" };
  return { bytes: bytes, mime: kind.mime, ext: kind.ext };
}
// v6.6: формат картинки по первым байтам (а не по расширению/заявленному типу)
function imgKind_(b){
  const u = function (i) { return b[i] & 255; };
  if (!b || b.length < 4) return null;
  if (u(0) === 0xFF && u(1) === 0xD8 && u(2) === 0xFF) return { mime: "image/jpeg", ext: "jpg" };
  if (b.length >= 12 && u(0) === 0x52 && u(1) === 0x49 && u(2) === 0x46 && u(3) === 0x46 && u(8) === 0x57 && u(9) === 0x45 && u(10) === 0x42 && u(11) === 0x50) return { mime: "image/webp", ext: "webp" };
  return null;
}
// v6.6: короткое видео (MP4/MOV/WebM) — до 10 МБ
var UPLOAD_MAX_VIDEO = 10 * 1024 * 1024;
function vidKind_(b){
  const u = function (i) { return b[i] & 255; };
  if (!b || b.length < 12) return null;
  if (u(4) === 0x66 && u(5) === 0x74 && u(6) === 0x79 && u(7) === 0x70) { // «ftyp»
    const brand = String.fromCharCode(u(8), u(9), u(10), u(11));
    if (!/^(isom|iso[2-9a-z]|mp41|mp42|avc1|M4V |M4VP|qt  |3gp[4-6]|dash|mmp4|MSNV|f4v )$/.test(brand)) return null; // HEIC/AVIF-фото — не видео
    return brand === "qt  " ? { mime: "video/quicktime", ext: "mov" } : { mime: "video/mp4", ext: "mp4" };
  }
  if (u(0) === 0x1A && u(1) === 0x45 && u(2) === 0xDF && u(3) === 0xA3) return { mime: "video/webm", ext: "webm" };
  return null;
}
function videoBytes_(b64){
  if (typeof b64 !== "string" || !b64) return { error: "нет видео" };
  if (b64.length > Math.ceil(UPLOAD_MAX_VIDEO * 4 / 3) + 8) return { error: "видео больше 10 МБ — сними короче (10–20 с) или в меньшем качестве" };
  let bytes;
  try { bytes = Utilities.base64Decode(b64); } catch (e) { return { error: "повреждённое видео" }; }
  if (bytes.length > UPLOAD_MAX_VIDEO) return { error: "видео больше 10 МБ — сними короче (10–20 с) или в меньшем качестве" };
  const k = vidKind_(bytes);
  if (!k) return { error: "можно загружать видео MP4, MOV или WebM" };
  return { bytes: bytes, mime: k.mime, ext: k.ext };
}
// данные загрузки: картинка или (kind:"video") видео + обложка-картинка → { full, small, type } | { error }
function uploadParts_(p){
  const isVideo = String(p.kind || "") === "video";
  const full = isVideo ? videoBytes_(p.data) : jpegBytes_(p.data, UPLOAD_MAX_FULL);
  if (full.error) return { error: full.error };
  const small = p.small ? jpegBytes_(p.small, UPLOAD_MAX_MINI) : null;
  if (small && small.error) return { error: (isVideo ? "обложка видео: " : "мини-версия: ") + small.error };
  if (isVideo && !small) return { error: "нет обложки видео — обнови страницу" };
  return { full: full, small: small, type: isVideo ? "video" : "" };
}
// D: id файла Диска из ссылки — точное сравнение вместо поиска подстроки
function driveIdOf_(link){ const m = String(link || "").match(/[?&]id=([\w-]+)/); return m ? m[1] : ""; }

// v41: ВСЕ операции (чтение и записи) — только POST; ответ читается прямо из ответа POST.
var POST_ACTIONS = ["auth","aiq","read","upload","check","screens","thumb","save","add","delrow","delteam","delweek","setoper","touch","setcolor","setplan","delscreen","copyweek","logout","thumbs","resetreq","resetlist","resetok","resetno","resetdo","suggest","suggestlist","suggestdel","suggestset","scrub","taskadd","taskdone","taskreopen","taskdel","ping","suggestreply","mysuggest","sched","users","useradmin","status","tpl","rowfull","pmread","pmsave","pmhide","pmunhide","pmstatus","pmupload","pmdelscreen","chpass","video","mark","newbie","askadd","asklist","askdone","loginlog","selfcheck","editscreen","nskfmt"];
// действия, после успешного выполнения которых сбрасывается кэш чтения (bump — ПОСЛЕ записи)
var WRITE_ACTIONS = ["nskfmt","editscreen","mark","newbie","upload","save","add","delrow","delteam","delweek","setoper","touch","setcolor","setplan","delscreen","copyweek","resetreq","resetok","resetno","resetdo","scrub","taskadd","taskdone","taskreopen","taskdel"];
var VIEWAS_READ_ACTIONS = ["video","asklist","read","rowfull","ping","check","thumbs","thumb","screens","sched","mysuggest","suggestlist","resetlist","status","users","aiq","pmread","logout"];
var ACTIONS = {
  auth: function (p) { return auth_(p); }, aiq: function (p) { return aiq_(p); }, read: function (p) { return read_(p); },
  upload: function (p) { return uploadPost_(p); }, check: function (p) { return check_(p); }, screens: function (p) { return screens_(p); },
  thumb: function (p) { return thumb_(p); }, thumbs: function (p) { return thumbs_(p); }, save: function (p) { return save_(p); },
  add: function (p) { return add_(p); }, delrow: function (p) { return delrow_(p); }, delteam: function (p) { return delteam_(p); },
  delweek: function (p) { return delweek_(p); }, setoper: function (p) { return setoper_(p); }, touch: function (p) { return touch_(p); },
  setcolor: function (p) { return setcolor_(p); }, setplan: function (p) { return setplan_(p); }, delscreen: function (p) { return delscreen_(p); },
  copyweek: function (p) { return copyweek_(p); }, logout: function (p) { return logout_(p); }, resetreq: function (p) { return resetreq_(p); },
  resetlist: function (p) { return resetlist_(p); }, resetok: function (p) { return resetok_(p); }, resetno: function (p) { return resetno_(p); },
  resetdo: function (p) { return resetdo_(p); }, suggest: function (p) { return suggest_(p); }, suggestlist: function (p) { return suggestlist_(p); },
  suggestdel: function (p) { return suggestdel_(p); }, suggestset: function (p) { return suggestset_(p); }, scrub: function (p) { return scrub_(p); },
  taskadd: function (p) { return taskadd_(p); }, taskdone: function (p) { return taskdone_(p); }, taskreopen: function (p) { return taskreopen_(p); },
  taskdel: function (p) { return taskdel_(p); }, users: function (p) { return users_(p); }, useradmin: function (p) { return useradmin_(p); }, status: function (p) { return status_(p); }, tpl: function (p) { return tpl_(p); },
  ping: function (p) { return ping_(p); }, suggestreply: function (p) { return suggestreply_(p); }, mysuggest: function (p) { return mysuggest_(p); },
  sched: function (p) { return sched_(p); }, rowfull: function (p) { return rowfull_(p); },
  pmread: function (p) { return pmread_(p); }, pmsave: function (p) { return pmsave_(p); }, pmhide: function (p) { return pmhide_(p); },
  pmunhide: function (p) { return pmunhide_(p); }, pmstatus: function (p) { return pmstatus_(p); }, pmupload: function (p) { return pmupload_(p); },
  pmdelscreen: function (p) { return pmdelscreen_(p); }, editscreen: function (p) { return editscreen_(p); }, nskfmt: function (p) { return nskfmt_(p); }, chpass: function (p) { return chpass_(p); },
  video: function (p) { return video_(p); }, mark: function (p) { return mark_(p); }, newbie: function (p) { return newbie_(p); },
  askadd: function (p) { return askadd_(p); }, asklist: function (p) { return asklist_(p); }, askdone: function (p) { return askdone_(p); },
  loginlog: function (p) { return loginlog_(p); }, selfcheck: function (p) { return selfcheckAction_(p); }
};
function doPost(e) {
  __memo = {}; // кэш одного запроса (в Apps Script каждый запрос — новое выполнение; так же и при повторном использовании среды)
  let p;
  try { p = JSON.parse((e && e.postData && e.postData.contents) || "{}"); }
  catch (err) { return out({ error: "неверный формат запроса" }); }
  if (!p || typeof p !== "object") p = {};
  // Обновление 4: имя действия принимаем и из тела, и из адреса (?a= / ?action=) — сайт дублирует его в URL
  // для диагностики. Из адреса берём ТОЛЬКО имя действия: токен, пароль и данные — только из тела POST.
  const prm = (e && e.parameter) || {};
  // AUDIT4 P2-4: пустое тело (переадресация потеряла его) — не выполняем действие по ?a= (без токена это
  // «требуется вход» и выход из сессии), а просим клиента повторить
  if (!(e && e.postData && e.postData.contents) || !Object.keys(p).length) return out({ error: "эта операция выполняется через POST", code: "NEED_POST", retry: true });
  const action = String(p.action || prm.action || prm.a || "");
  if (POST_ACTIONS.indexOf(action) < 0 || !ACTIONS[action]) return out({ error: "неизвестное действие «" + action.slice(0, 30) + "» — обнови страницу" });
  // v6 (исправление 10): режим «глазами» теперь проверяет и сервер — сайт помечает такие запросы viewAs:1,
  // и любые действия, кроме чтения, отклоняются (раньше запрет был только на сайте)
  if (p.viewAs && VIEWAS_READ_ACTIONS.indexOf(action) < 0) return out({ error: "в режиме «глазами …» изменения отключены — выйди из режима" });
  let res;
  const t0 = Date.now();
  try { res = ACTIONS[action](p); }
  catch (err) { res = { error: errText_(err) }; }
  statBump_("req");
  statTime_(action === "read" ? "read:" + (res && res.same ? "same" : (__memo.readSrc || "build")) : action, Date.now() - t0);
  if (res && res.error && !/требуется вход|неизвестное действие/.test(String(res.error))) errLog_(action, res.error);
  if (WRITE_ACTIONS.indexOf(action) >= 0 && res && !res.error) {
    const g0 = dataGen_();
    bumpDataGen_();
    // v6.3: сохранение разбора правит строку в общем снимке — остальным не нужно ждать пересборки
    if (SNAP_PATCH_ACTIONS.indexOf(action) >= 0 && snapEnabled_()) snapPatchAfter_(action, p, g0, dataGen_());
  }
  if (NOTIF_ACTIONS.indexOf(action) >= 0 && res && !res.error) bumpNotif_(); // задача 3: уведомления — отдельно от кэша данных
  statFlush_();
  return out(res);
}

function uploadPost_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "загружать скрины может только редактор" };
  if (!writableSheet_(p.sheet)) return { error: "в этот лист писать нельзя" };
  if (!allowedCity_(u, p.sheet)) return { error: "нет доступа к этой компании" };
  const up = uploadParts_(p); if (up.error) return up;
  const row = parseInt(p.row, 10);
  if (!row || row < 2) return { error: "неверная строка" };
  // v6.5: файлы на Диск пишем ДО блокировки (это самая долгая часть, 1–3 с) — остальные сохранения не ждут загрузку.
  // Если дальше строка не сойдётся — созданные файлы уходят в корзину.
  let files;
  try { files = driveSaveShot_("screen_" + String(p.sheet).replace(/[^0-9A-Za-zА-Яа-я]+/g, "_") + "_r" + row + "_" + Date.now().toString(36), up.full, up.small); }
  catch (errF) { return { error: errText_(errF) }; }
  const lock = LockService.getScriptLock();
  let done = false;
  try {
    lock.waitLock(30000);
    const sh = SpreadsheetApp.getActive().getSheetByName(p.sheet);
    if (!sh) return { error: "лист не найден" };
    const kerr = rowKeyError_(sh, row, p);
    if (kerr) return { error: kerr };
    prepSheet_(sh);
    // стабильный ключ: «лист|ник|модель» — строки сдвигаются, фото остаётся у своей команды
    const brow = sh.getRange(row, 1, 1, 3).getValues()[0];
    const skey = sh.getName() + "|" + String(brow[0] || "").trim() + "|" + String(brow[2] || "").trim();
    sh.getRange(row, FIELDS.screen).setValue(files.link);
    appendScreen_(skey, String(p.cat || ""), files.link, files.mini, true, up.type);
    const stamp = stampFor_(u);
    sh.getRange(row, FIELDS.updated).setValue(stamp);
    done = true;
    __memo.upl = { key: skey, cat: String(p.cat || ""), link: files.link, mini: files.mini, ts: nowTxt_(), type: up.type }; // для правки снимка в doPost
    // клиент сразу показывает скрин по этому ответу (без опроса action=screens)
    return { ok: true, link: files.link, mini: files.mini, key: skey, cat: String(p.cat || ""), ts: __memo.upl.ts, stamp: stamp, type: up.type };
  } catch (err) {
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
    if (!done) driveTrashShot_(files);
  }
}
// сохранить скрин (+ мини) в папку скринов → ссылки; файлы приватные
function driveSaveShot_(nameBase, full, small){ // full/small: { bytes, mime, ext } (картинка JPEG/WebP или видео)
  const folder = screenFolder_();
  const file = folder.createFile(Utilities.newBlob(full.bytes, full.mime || "image/jpeg", nameBase + "_full." + (full.ext || "jpg")));
  let mini = null;
  try { if (small) mini = folder.createFile(Utilities.newBlob(small.bytes, small.mime || "image/jpeg", nameBase + "_mini." + (small.ext || "jpg"))); }
  catch (e) { try { file.setTrashed(true); } catch (e2) {} throw e; }
  return { file: file, miniFile: mini, link: "https://drive.google.com/uc?export=view&id=" + file.getId(),
    mini: mini ? "https://drive.google.com/uc?export=view&id=" + mini.getId() : "" };
}
function driveTrashShot_(f){
  if (!f) return;
  try { f.file.setTrashed(true); } catch (e) {}
  try { if (f.miniFile) f.miniFile.setTrashed(true); } catch (e2) {}
}

// ---------- ПОЛЬЗОВАТЕЛИ (Script Properties; в коде никого нет) ----------
function usersRaw_(){
  if (__memo.users) return __memo.users;
  try { __memo.users = usersLoadFresh_(); }
  catch (err) { console.error("USERS_JSON не читается: " + err); __memo.users = []; }
  return __memo.users;
}
// Обновление 6: хранение пользователей кусками — USERS_JSON (+ USERS_JSON_1…USERS_JSON_9), каждый ≤ USERS_CHUNK символов
// (лимит одного свойства ~9 КБ). Старый формат (всё в USERS_JSON) читается как раньше.
var USERS_CHUNK = 8500, USERS_MAX_CHUNKS = 10;
function usersLoadFresh_(){
  const pp = props_();
  let all = JSON.parse(pp.getProperty("USERS_JSON") || "[]");
  if (!Array.isArray(all)) all = [];
  for (let i = 1; i < USERS_MAX_CHUNKS; i++) {
    const v = pp.getProperty("USERS_JSON_" + i);
    if (!v) break;
    const part = JSON.parse(v);
    if (Array.isArray(part)) all = all.concat(part);
  }
  return all;
}
function usersSplit_(users){ // чистая: массив → куски JSON, каждый ≤ USERS_CHUNK
  const chunks = []; let cur = [];
  users.forEach(function (x) {
    const next = cur.concat([x]);
    if (cur.length && JSON.stringify(next).length > USERS_CHUNK) { chunks.push(JSON.stringify(cur)); cur = [x]; }
    else cur = next;
  });
  chunks.push(JSON.stringify(cur));
  chunks.forEach(function (c) { if (c.length > USERS_CHUNK + 600) throw new Error("запись пользователя слишком большая"); });
  if (chunks.length > USERS_MAX_CHUNKS) throw new Error("слишком много пользователей для Script Properties — вынеси в лист");
  return chunks;
}
function usersSave_(users){
  const chunks = usersSplit_(users);
  const pp = props_();
  pp.setProperty("USERS_JSON", chunks[0]);
  for (let i = 1; i < USERS_MAX_CHUNKS; i++) {
    if (i < chunks.length) pp.setProperty("USERS_JSON_" + i, chunks[i]);
    else if (pp.getProperty("USERS_JSON_" + i)) pp.deleteProperty("USERS_JSON_" + i);
  }
  __memo.users = users;
}
// миграция формата хэша: под локом и по СВЕЖЕМУ USERS_JSON (не перетирает параллельную смену пароля)
function saveUserHash_(login, oldH, newH){ // true — новый хэш записан
  let done = false;
  try {
    withScriptLock_(5000, function () {
      const users = usersLoadFresh_();
      const x = users.find(function (q) { return q.u === login; });
      if (x && String(x.h || "") === oldH) { x.h = newH; usersSave_(users); __memo.users = users; done = true; }
    });
  } catch (err) { console.warn("миграция хэша отложена до следующего входа: " + err); }
  return done;
}
var LEGACY_SALT = "pd-salt-2026-x7K"; // только для миграции хэшей v34
function hashHex_(salt, pass) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + pass, Utilities.Charset.UTF_8);
  return bytes.map(function (b) { return ((b & 0xFF) + 0x100).toString(16).slice(1); }).join("");
}
// v6 (исправление 5): пароли — многократный SHA-256 («v2$итерации$соль$хэш»). Один проход SHA-256 подбирается
// перебором очень быстро, если хэши когда-нибудь утекут. Число итераций — Script Property PW_ITER (по умолчанию 500),
// хранится в самом хэше, поэтому смена PW_ITER не ломает уже выданные пароли.
// Старые форматы («соль$хэш», голый хэш, pw_*) по-прежнему принимаются и при успешном входе переводятся в v2.
var PW_ITER_DEFAULT = 500;
function pwIter_(){
  let n = 0; try { n = parseInt(props_().getProperty("PW_ITER") || "", 10); } catch (e) {}
  return (n >= 100 && n <= 20000) ? n : PW_ITER_DEFAULT;
}
function bytesHex_(bytes){ return bytes.map(function (b) { return ((b & 0xFF) + 0x100).toString(16).slice(1); }).join(""); }
function hashIter_(salt, pass, iter){
  const D = Utilities.DigestAlgorithm.SHA_256;
  const saltB = Utilities.newBlob(String(salt)).getBytes();
  let h = Utilities.computeDigest(D, salt + pass, Utilities.Charset.UTF_8);
  for (let i = 1; i < iter; i++) h = Utilities.computeDigest(D, h.concat(saltB));
  return bytesHex_(h);
}
function makeHash_(pass){ // новый хэш для сохранения
  const salt = Utilities.getUuid().replace(/-/g, "");
  const it = pwIter_();
  return "v2$" + it + "$" + salt + "$" + hashIter_(salt, pass, it);
}
function safeEq_(a, b){ // сравнение строк за время, не зависящее от места первого расхождения
  a = String(a); b = String(b);
  let d = a.length ^ b.length;
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) d |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return d === 0;
}
// h пользователя: "соль$хэш" (v40), либо старый голый хэш (мигрируем при первом успешном входе)
function verifyUser_(login, pass) {
  const users = usersRaw_();
  const u = users.find(function (x) { return x.u === login; });
  if (!u || u.off) return false; // Обновление 6: отключённый пользователь не входит
  const h = String(u.h || "");
  // 0) v6: "v2$итерации$соль$хэш"
  if (h.indexOf("v2$") === 0) {
    const q = h.split("$");
    const it = parseInt(q[1], 10);
    if (q.length !== 4 || !(it >= 1 && it <= 50000)) return false;
    return safeEq_(hashIter_(q[2], pass, it), q[3]);
  }
  // 1) формат v40 "соль$хэш" — совпало → переводим в v2
  if (h.indexOf("$") > 0) {
    const parts = h.split("$");
    if (!safeEq_(hashHex_(parts[0], pass), parts[1])) return false;
    saveUserHash_(login, h, makeHash_(pass));
    return true;
  }
  // 2) старый формат: голый хэш + соль из PWSALT (совпало — мигрируем в новый)
  let salt = "";
  try { salt = PropertiesService.getScriptProperties().getProperty("PWSALT") || ""; } catch (e) {}
  if (salt && /^[0-9a-f]{64}$/i.test(h) && safeEq_(hashHex_(salt, pass), h)) {
    saveUserHash_(login, h, makeHash_(pass));
    return true;
  }
  // 3) легаси v34: хэш в pw_<логин>
  try {
    const old = PropertiesService.getScriptProperties().getProperty("pw_" + login);
    if (old && /^[0-9a-f]{64}$/i.test(old) && safeEq_(old, hashHex_(LEGACY_SALT, pass))) {
      if (saveUserHash_(login, h, makeHash_(pass)))
        try { PropertiesService.getScriptProperties().deleteProperty("pw_" + login); } catch (e4) {} // D: перенесён — старый хэш не нужен
      return true;
    }
  } catch (e3) {}
  return false;
}
// ---------- АДМИН-ФУНКЦИИ (запускать вручную из редактора Apps Script; в журнал секреты НЕ пишутся) ----------
// Сводка по форматам паролей: сколько «соль$хэш», сколько старых голых хэшей (PWSALT), сколько легаси pw_*.
function auditPasswords(){
  const users = usersRaw_();
  const all = props_().getProperties();
  let v2 = 0, salted = 0, bare = 0, other = 0, legacyPw = 0;
  users.forEach(function (x) {
    const h = String(x.h || "");
    if (h.indexOf("v2$") === 0) v2++; else if (h.indexOf("$") > 0) salted++; else if (/^[0-9a-f]{64}$/i.test(h)) bare++; else other++;
    if (all["pw_" + x.u]) legacyPw++;
  });
  console.log("Пользователей: " + users.length + "; v2 (многократный хэш): " + v2 + "; «соль$хэш»: " + salted + "; голый хэш (PWSALT): " + bare +
    "; без пароля/другое: " + other + "; легаси pw_*: " + legacyPw + "; размер USERS_JSON: " + String(all.USERS_JSON || "").length + " символов (лимит ~9000)");
}
// Массовая смена паролей: временно положи в Script Properties свойство PW_NEW = {"логин":"новый пароль", ...},
// запусти adminSetPasswords() — пароли запишутся как «соль$хэш» (своя соль у каждого), сессии этих логинов
// погаснут, PW_NEW удалится. Пароли в журнал не пишутся.
function adminSetPasswords(){
  withScriptLock_(30000, function () {
    let map = null;
    try { map = JSON.parse(props_().getProperty("PW_NEW") || "null"); } catch (e) { map = null; }
    if (!map || typeof map !== "object") { console.log("PW_NEW не задано или не JSON — ничего не сделано"); return; }
    const users = usersLoadFresh_();
    let changed = 0; const missing = [], short = [];
    Object.keys(map).forEach(function (login) {
      const np = String(map[login] || "");
      const x = users.find(function (q) { return q.u === login; });
      if (!x) { missing.push(login); return; }
      if (np.length < 8) { short.push(login); return; }
      x.h = makeHash_(np);
      changed++;
    });
    if (changed) {
      usersSave_(users);
      __memo.users = users;
      Object.keys(map).forEach(function (login) {
        if (missing.indexOf(login) >= 0 || short.indexOf(login) >= 0) return;
        try { props_().deleteProperty("pw_" + login); } catch (e) {}
        sessionsKillUser_(login);
      });
    }
    props_().deleteProperty("PW_NEW");
    console.log("Паролей обновлено: " + changed + (missing.length ? "; нет таких логинов: " + missing.length : "") + (short.length ? "; короче 8 символов (пропущены): " + short.length : "") + ". PW_NEW удалено.");
  });
}
// ---------- v6 (исправления 8 и 9): чистка Диска от скринов, на которые больше ничего не ссылается ----------
// Запуск ТОЛЬКО вручную из редактора Apps Script, в два шага:
//   1) driveCleanupReport() — ничего не меняет: пишет в журнал, сколько файлов-сирот и сколько места они занимают,
//      плюс сколько строк «Скрины» ссылаются на команды, которых уже нет (после delteam/переименований).
//   2) driveCleanupRun() — переносит файлы-сироты в КОРЗИНУ Диска (30 дней можно восстановить), до 300 за запуск.
// Сирота = файл в папке скринов, id которого нет ни в листе «Скрины» (колонки C/E), ни в колонке P листов недель
// (основная таблица и архив недель), и который старше 3 дней (свежие загрузки не трогаем).
var CLEAN_MIN_AGE_DAYS = 3, CLEAN_MAX_PER_RUN = 300;
function driveRefIds_(){
  const ids = {};
  const addLink = function (v) { const id = driveIdOf_(v); if (id) ids[id] = 1; };
  const scanBook = function (ss) {
    ss.getSheets().forEach(function (sh) {
      const nm = sh.getName(), last = sh.getLastRow();
      if (last < 2) return;
      if (nm === "Скрины") { sh.getRange(2, 1, last - 1, 5).getDisplayValues().forEach(function (r) { addLink(r[2]); addLink(r[4]); }); return; }
      if (/(Томск|Новосибирск|Онлайн)\s*\(/i.test(nm) && sh.getLastColumn() >= FIELDS.screen)
        sh.getRange(2, FIELDS.screen, last - 1, 1).getDisplayValues().forEach(function (r) { addLink(r[0]); });
    });
  };
  scanBook(SpreadsheetApp.getActive());
  try { const aid = String(props_().getProperty("ARCHIVE_SS_ID") || "").trim(); if (aid) scanBook(SpreadsheetApp.openById(aid)); } catch (e) { console.warn("архив недель не прочитан: " + e); }
  return ids;
}
function driveOrphans_(limit){
  const ids = driveRefIds_();
  const minAge = Date.now() - CLEAN_MIN_AGE_DAYS * 864e5;
  const it = screenFolder_().getFiles();
  const list = []; let total = 0, bytes = 0;
  const t0 = Date.now();
  while (it.hasNext() && Date.now() - t0 < 240000) {
    const f = it.next(); total++;
    if (ids[f.getId()] || f.getDateCreated().getTime() > minAge) continue;
    bytes += f.getSize();
    if (list.length < limit) list.push(f);
  }
  return { list: list, total: total, bytes: bytes, refs: Object.keys(ids).length };
}
function screenRowsOrphanCount_(){ // строки «Скрины», чья команда (лист|ник|модель) больше нигде не встречается
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName("Скрины");
  if (!sh || sh.getLastRow() < 2) return 0;
  const teams = {};
  ss.getSheets().forEach(function (t) {
    if (!isTeamSheet_(t.getName()) || t.getLastRow() < 2) return;
    t.getRange(2, 1, t.getLastRow() - 1, 3).getDisplayValues().forEach(function (r) {
      if (String(r[0] || "").trim()) teams[t.getName() + "|" + String(r[0]).trim() + "|" + String(r[2] || "").trim()] = 1;
    });
  });
  let n = 0;
  sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().forEach(function (r) {
    const k = String(r[0] || "").trim();
    if (!k || k.indexOf(PM_SCREEN_PREFIX) === 0) return; // скрины мониторинга продюсеров живут по своим ключам
    if (k.split("|").length === 3 && !teams[k]) n++;
  });
  return n;
}
function driveCleanupReport(){
  const r = driveOrphans_(0);
  console.log("Файлов в папке скринов: " + r.total + "; ссылок в таблицах: " + r.refs + "; файлов-сирот (старше " + CLEAN_MIN_AGE_DAYS +
    " дн.): ~" + Math.round(r.bytes / 1048576) + " МБ. Строк «Скрины» без команды (после удаления/переименования): " + screenRowsOrphanCount_() +
    ". Ничего не изменено. Чтобы убрать сирот в корзину — driveCleanupRun().");
}
function driveCleanupRun(){
  const r = driveOrphans_(CLEAN_MAX_PER_RUN);
  let moved = 0;
  r.list.forEach(function (f) { try { f.setTrashed(true); moved++; } catch (e) {} });
  console.log("В корзину Диска перенесено: " + moved + " (лимит за запуск " + CLEAN_MAX_PER_RUN + "). Восстановить можно из корзины в течение 30 дней." +
    (moved >= CLEAN_MAX_PER_RUN ? " Остались ещё — запусти повторно." : ""));
}
// ---------- v6: смена логина (запуск вручную из редактора) ----------
// 1) Свойства скрипта: RENAME_LOGIN = {"from":"старый","to":"новый"}; по желанию сразу и PW_NEW = {"новый":"новый пароль"}.
// 2) Запусти adminRenameLogin(). Переносится всё, что привязано к логину: запись пользователя (роль, имя, компании, пароль),
//    ADMIN_LOGINS, личные шаблоны (лист «Шаблоны», колонка A), авторство предложений (лист «Предложения», колонка K).
//    Входы со старым логином гаснут. RENAME_LOGIN удаляется; если задан PW_NEW — следом выполняется adminSetPasswords().
// Пароль в коде не хранится и в журнал не пишется. Имя в штампах («(Дима)») не меняется — оно берётся из поля «Имя».
function adminRenameLogin(){
  let map = null;
  try { map = JSON.parse(props_().getProperty("RENAME_LOGIN") || "null"); } catch (e) { map = null; }
  const from = map && String(map.from || "").trim(), to = map && String(map.to || "").trim();
  if (!from || !to) { console.log("RENAME_LOGIN не задано или неверно — нужно {\"from\":\"старый\",\"to\":\"новый\"}; ничего не сделано"); return; }
  const msg = renameLoginCore_(from, to);
  console.log(msg.text);
  if (msg.ok && props_().getProperty("PW_NEW")) adminSetPasswords();
}
// v6: меню в самой таблице «продюсеры» — когда в «Свойствах скрипта» больше 50 свойств и добавить новое через
// интерфейс нельзя. Пароль вводится в окне таблицы и нигде не сохраняется открытым текстом (ни в коде, ни в свойствах).
function onOpen(){
  try {
    SpreadsheetApp.getUi().createMenu("🔧 Дашборд")
      .addItem("Сменить логин и пароль…", "adminRenameLoginUi")
      .addItem("Задать пароль пользователю…", "adminSetPasswordUi")
      .addItem("Убрать истёкшие сессии", "adminCleanSessionsUi")
      .addItem("Ускорение: включить прогрев (раз в минуту)", "snapTriggerOnUi")
      .addItem("Ускорение: выключить прогрев", "snapTriggerOffUi")
      .addItem("Ускорение: выключить совсем / включить обратно", "snapToggleUi")
      .addItem("Самопроверка: включить (раз в час)", "selfCheckOnUi")
      .addItem("Админы (журнал входов, пользователи)…", "adminLoginsUi")
      .addItem("Пороги оценки (норма / критично / перепроверка)…", "verdictRulesUi")
      .addToUi();
  } catch (e) {}
}
function uiAsk_(ui, title, text){
  const r = ui.prompt(title, text, ui.ButtonSet.OK_CANCEL);
  return r.getSelectedButton() === ui.Button.OK ? String(r.getResponseText() || "").trim() : null;
}
function adminRenameLoginUi(){
  const ui = SpreadsheetApp.getUi();
  const from = uiAsk_(ui, "Сменить логин", "Старый логин:"); if (!from) return;
  const to = uiAsk_(ui, "Сменить логин", "Новый логин (латиница, цифры, . _ @ -):"); if (!to) return;
  const pass = uiAsk_(ui, "Новый пароль", "Новый пароль для «" + to + "» (не короче 8 символов). Оставь пустым — пароль не меняется:");
  if (pass === null) return;
  if (pass && pass.length < 8) { ui.alert("Пароль короче 8 символов — ничего не изменено."); return; }
  const res = renameLoginCore_(from, to);
  if (!res.ok) { ui.alert(res.text); return; }
  let pw = "";
  if (pass) pw = setPasswordCore_(to, pass) ? " Пароль обновлён." : " Пароль НЕ обновлён — задай его через «Задать пароль пользователю…».";
  ui.alert(res.text + pw + " Входи с новым логином.");
}
function adminSetPasswordUi(){
  const ui = SpreadsheetApp.getUi();
  const login = uiAsk_(ui, "Задать пароль", "Логин:"); if (!login) return;
  const pass = uiAsk_(ui, "Задать пароль", "Новый пароль для «" + login + "» (не короче 8 символов):"); if (!pass) return;
  if (pass.length < 8) { ui.alert("Пароль короче 8 символов — ничего не изменено."); return; }
  ui.alert(setPasswordCore_(login, pass) ? "Пароль для «" + login + "» обновлён, его старые входы погашены." : "Логина «" + login + "» нет — ничего не изменено.");
}
function snapTriggerOnUi(){ SpreadsheetApp.getUi().alert(installSnapTrigger()); }
function snapToggleUi(){
  const off = props_().getProperty("SNAP_OFF") === "1";
  if (off) props_().deleteProperty("SNAP_OFF"); else props_().setProperty("SNAP_OFF", "1");
  SpreadsheetApp.getUi().alert(off ? "Ускорение снова включено." : "Ускорение выключено: сайт читает листы как раньше.");
}
function snapTriggerOffUi(){ SpreadsheetApp.getUi().alert(removeSnapTrigger()); }
function adminCleanSessionsUi(){
  const before = Object.keys(props_().getProperties()).length;
  withScriptLock_(30000, function () { sessionsCleanup_(); });
  const after = Object.keys(props_().getProperties()).length;
  SpreadsheetApp.getUi().alert("Свойств было: " + before + ", стало: " + after + " (убраны истёкшие сессии).");
}
function setPasswordCore_(login, pass){ // true — записано
  let ok = false;
  withScriptLock_(30000, function () {
    const users = usersLoadFresh_();
    const x = users.find(function (q) { return q.u === login; });
    if (!x) return;
    x.h = makeHash_(pass);
    usersSave_(users); __memo.users = users;
    try { props_().deleteProperty("pw_" + login); } catch (e) {}
    sessionsKillUser_(login);
    ok = true;
  });
  return ok;
}
function renameLoginCore_(from, to){ // → { ok, text }
  if (!USER_LOGIN_RE.test(to)) return { ok: false, text: "Новый логин: только латиница, цифры и . _ @ -, от 2 до 40 символов; ничего не сделано." };
  let res = { ok: false, text: "" };
  withScriptLock_(30000, function () {
    const users = usersLoadFresh_();
    const x = users.find(function (q) { return q.u === from; });
    if (!x) { res.text = "Логина «" + from + "» нет; ничего не сделано."; return; }
    if (users.some(function (q) { return q.u === to; })) { res.text = "Логин «" + to + "» уже занят; ничего не сделано."; return; }
    x.u = to;
    usersSave_(users); __memo.users = users;
    const adm = adminLogins_();
    if (adm.indexOf(from) >= 0) props_().setProperty("ADMIN_LOGINS", adm.map(function (a) { return a === from ? to : a; }).join(","));
    const legacy = props_().getProperty("pw_" + from);
    if (legacy) { props_().setProperty("pw_" + to, legacy); props_().deleteProperty("pw_" + from); }
    const ss = SpreadsheetApp.getActive();
    let tpl = 0, sug = 0;
    const ts = ss.getSheetByName("Шаблоны");
    if (ts && ts.getLastRow() >= 2) {
      const rng = ts.getRange(2, 1, ts.getLastRow() - 1, 1), v = rng.getValues();
      v.forEach(function (r) { if (String(r[0]).trim() === from) { r[0] = to; tpl++; } });
      if (tpl) rng.setValues(v);
    }
    const gs = ss.getSheetByName("Предложения");
    if (gs && gs.getLastRow() >= 2 && gs.getLastColumn() >= 11) {
      const rng = gs.getRange(2, 11, gs.getLastRow() - 1, 1), v = rng.getValues();
      v.forEach(function (r) { if (String(r[0]).trim() === from) { r[0] = to; sug++; } });
      if (sug) rng.setValues(v);
    }
    sessionsKillUser_(from);
    try { props_().deleteProperty("RENAME_LOGIN"); } catch (e) {}
    res = { ok: true, text: "Логин «" + from + "» → «" + to + "». Шаблонов перенесено: " + tpl + ", предложений: " + sug + ". Старые входы погашены." };
  });
  return res;
}
// Разовый перенос старых ключей скринов «лист|строка» → «лист|ник|модель» (по текущему содержимому строк).
function migrateLegacyScreenKeys(){
  withScriptLock_(30000, function () {
    const ss = SpreadsheetApp.getActive();
    const sh = ss.getSheetByName("Скрины");
    if (!sh || sh.getLastRow() < 2) { console.log("Скрины: пусто"); return; }
    const rng = sh.getRange(2, 1, sh.getLastRow() - 1, 1);
    const kv = rng.getValues();
    const cache = {};
    let moved = 0, left = 0;
    kv.forEach(function (r) {
      const k = String(r[0] == null ? "" : r[0]).trim();
      const m = k.match(/^(.+)\|(\d+)$/);
      if (!m || k.split("|").length !== 2) { r[0] = notFormula_(k); return; }
      const name = m[1], row = +m[2];
      if (!cache[name]) { const s2 = ss.getSheetByName(name); cache[name] = s2 && s2.getLastRow() >= 2 ? s2.getRange(1, 1, s2.getLastRow(), 3).getDisplayValues() : []; }
      const v = cache[name][row - 1];
      if (v && String(v[0] || "").trim() && !blockHead_(v)) { r[0] = notFormula_(name + "|" + String(v[0]).trim() + "|" + String(v[2] || "").trim()); moved++; }
      else { r[0] = notFormula_(k); left++; }
    });
    rng.setValues(kv);
    bumpDataGen_(); bumpScrGen_();
    console.log("Скрины: перенесено ключей " + moved + ", не удалось сопоставить " + left);
  });
}

// Обновление 7: разовый backfill мини-копий для старых скринов (колонка E «Мини» пуста).
// Без мини фронт показывал такие скрины через публичный drive-превью (403 для приватных) → битая картинка.
// Мини пробуем взять через Drive thumbnail (лёгкая копия); если не вышло — кладём сам файл (виден, но не легче).
// Запустить один раз вручную из редактора Apps Script (аналог migrateLegacyScreenKeys).
function migrateLegacyMini(){
  withScriptLock_(30000, function () {
    const ss = SpreadsheetApp.getActive();
    const sh = ss.getSheetByName("Скрины");
    if (!sh || sh.getLastRow() < 2) { console.log("Скрины: пусто"); return; }
    const last = sh.getLastRow();
    const vals = sh.getRange(2, 1, last - 1, 5).getValues();
    let made = 0, had = 0, fail = 0;
    for (let i = 0; i < vals.length; i++) {
      const link = String(vals[i][2] || "");
      const mini = String(vals[i][4] || "");
      const id = driveIdOf_(link);
      if (mini || !id) { had++; continue; }
      try {
        const file = DriveApp.getFileById(id);
        let blob = null;
        try {
          const r = UrlFetchApp.fetch("https://drive.google.com/thumbnail?id=" + encodeURIComponent(id) + "&sz=w480", {
            headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() }, muteHttpExceptions: true });
          if (r.getResponseCode() === 200) {
            const b = r.getBlob().getBytes();
            if (b.length >= 4 && (b[0] & 255) === 0xFF && (b[1] & 255) === 0xD8) blob = r.getBlob(); // настоящий JPEG, не HTML
          }
        } catch (e) {}
        if (!blob) blob = file.getBlob(); // запасной вариант: сам файл
        let folder = null;
        try { const ps = file.getParents(); folder = ps.hasNext() ? ps.next() : null; } catch (e2) {}
        if (!folder) folder = screenFolder_();
        const mf = folder.createFile(blob.setName(file.getName().replace(/\.\w+$/, "") + "_mini.jpg"));
        sh.getRange(i + 2, 5).setValue("https://drive.google.com/uc?export=view&id=" + mf.getId());
        made++;
      } catch (err) { fail++; }
    }
    bumpDataGen_(); bumpScrGen_();
    console.log("migrateLegacyMini: создано мини " + made + ", уже было " + had + ", не удалось " + fail);
  });
}

// v40: авторизация ТОЛЬКО по токену сессии. ВАЖНО: prod — ИМЯ продюсера (для фильтра команд)
function getUser_(p) {
  const s = sessionUser_(p && p.token);
  if (!s) return null;
  const u = usersRaw_().find(function (x) { return x.u === s.login; });
  if (!u || u.off) return null;
  return { login: s.login, name: u.name || s.login, edit: !!u.edit, cities: u.cities || (u.prod ? [] : "all"), prod: u.prod || "" }; // v6.9: продюсер без компаний — ничего, а не «все»
}
// «=», «+», «-», «@» в начале значения таблица может принять за формулу — экранируем апострофом
// (апостроф в ячейке не виден и не возвращается getValues/getDisplayValues)
// C: в сообщениях пользователю — названия компаний (имена листов в таблице не меняются)
function sheetLabel_(name){
  const L = { "Томск": "ArtLife", "Новосибирск": "VVCAM", "Онлайн": "DIAMOND" };
  return String(name || "").replace(/Томск|Новосибирск|Онлайн/g, function (m) { return L[m]; });
}
function notFormula_(s) {
  s = String(s == null ? "" : s);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
// B: штампы времени — с ГОДОМ и в часовом поясе скрипта (сайт получает пояс в ответе read: tz)
function nowTxt_(){ return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd.MM.yyyy HH:mm"); }
function stampFor_(u){ return nowTxt_() + " (" + String(u.name || u.login || "").replace(/[()]/g, "") + ")"; }
function textCell_(s){ return "'" + s; } // апостроф: Таблица не превратит «05.10.2026 14:30» в дату
// удалить строки по условию: группами подряд и снизу вверх (вместо deleteRow в цикле).
// Если удалить нельзя (все незакреплённые строки) — очищаем содержимое.
function deleteRowsWhere_(sh, firstRow, vals, pred){
  let removed = 0, i = vals.length - 1;
  while (i >= 0) {
    if (!pred(vals[i], i)) { i--; continue; }
    let j = i;
    while (j - 1 >= 0 && pred(vals[j - 1], j - 1)) j--;
    const cnt = i - j + 1;
    try { sh.deleteRows(firstRow + j, cnt); }
    catch (err) { sh.getRange(firstRow + j, 1, cnt, Math.max(1, sh.getLastColumn())).clearContent(); }
    removed += cnt; i = j - 1;
  }
  if (removed && sh.getName() === "Скрины") bumpScrGen_(); // после удаления — индекс скринов пересоберётся
  return removed;
}
// человеческий текст ошибки; подробности — в журнал выполнений Apps Script
function errText_(err){
  const s = String(err && err.message || err);
  if (/lock|timed out|блокировк/i.test(s)) return "таблица занята другим действием — попробуй ещё раз через минуту";
  console.error(err && err.stack ? err.stack : s);
  return "ошибка сервера: " + s.replace(/^Exception:\s*/, "").slice(0, 160);
}
// D1: строка адресуется номером из последней загрузки — ПЕРЕД записью сверяем ключ команды
// (ник + модель, а при пустых — опер), который видел фронт. Не совпало → отказ, ничего не пишем.
function rowKeyError_(sh, row, p){
  if (p.knick === undefined || p.kmodel === undefined) return "страница устарела — обнови её (Ctrl+F5) и повтори; ничего не записано";
  const raw = sh.getRange(row, 1, 1, 3);
  const kn = String(p.knick).trim(), km = String(p.kmodel).trim(), ko = p.kop === undefined ? null : String(p.kop).trim();
  const ok = function (v) { return v[0] === kn && v[2] === km && (kn || km || ko === null || v[1] === ko); };
  const trimAll = function (arr) { return arr.map(function (x) { return String(x == null ? "" : x).trim(); }); };
  // v6.5: сначала одно чтение (то, что видно в ячейке — так же читает сайт); второе — только если не совпало
  const dv = trimAll(raw.getDisplayValues()[0]);
  if (blockHead_(dv)) return "это строка-заголовок продюсера — ничего не записано";
  if (ok(dv)) return "";
  const vv = trimAll(raw.getValues()[0]);
  if (blockHead_(vv)) return "это строка-заголовок продюсера — ничего не записано";
  return ok(vv) ? "" : "строка в таблице сдвинулась или изменилась (кто-то добавил/удалил строки) — обнови данные и повтори; ничего не записано";
}
function allowedCity_(u, sheetName) {
  const m = String(sheetName || "").match(/Томск|Новосибирск|Онлайн/i);
  const city = m ? m[0] : "";
  if (u.cities === "all") return city;
  const hit = u.cities.find(function (c) { return city.toLowerCase() === c.toLowerCase(); });
  return hit ? city : null;
}

const FIELDS = {
  oko: 4, model: 5, membrs: 7, goly: 8, show: 9, playlist: 10,
  sites: 11, kadr: 12, room: 13,
  comment: 14, status: 15, updated: 16, screen: 17,
  score: 18,   // R Оценка (вручную)
  verdict: 19, // S Вердикт (вручную)
  recs: 20,    // T Рекомендации (вручную, видит команда)
  links: 21    // U Ссылки (per строка, «Название = URL»)
};

// ---------- ЧТО МОЖНО ПИСАТЬ (белый список; всё остальное — только чтение) ----------
// Листы команд — только формата «Город (дд-дд.мм)»; служебные — по точным именам.
// Листы расписания команд и дохода в эту таблицу не входят, но запрет явный — на случай,
// если их добавят внутрь: запись в них запрещена по именам ниже.
var SERVICE_SHEETS = ["Цвета", "Планы", "Чек", "Рекомендации", "Скрины", "Сбросы", "Предложения", "Итог", "Задачи"];
var FORBIDDEN_SHEETS = ["Расписание команд", "Расписание", "Доход", "Доходы"]; // ← впиши точные имена, если отличаются
function writableSheet_(name) {
  name = String(name || "").trim();
  if (FORBIDDEN_SHEETS.indexOf(name) >= 0) return false;
  if (/расписан|доход/i.test(name)) return false; // листы расписания команд и дохода — только чтение, при любом имени
  if (SERVICE_SHEETS.indexOf(name) >= 0) return true;
  return /(Томск|Новосибирск|Онлайн)\s*\(/i.test(name);
}

// ---------- ПОКОЛЕНИЕ ДАННЫХ (кэш чтения и Gemini сбрасываются любой записью) ----------
// C: если счётчик вытеснен из кэша — начинаем с текущего времени (а не с «1»: иначе мог всплыть старый кэш «rd_1_…»)
function dataGen_(){
  if (__memo.gen) return __memo.gen;
  try {
    const c = CacheService.getScriptCache();
    let g = c.get("datagen");
    if (!g) { g = String(Date.now()); c.put("datagen", g, 21600); }
    __memo.gen = g; return g;
  } catch (err) { return String(Date.now()); }
}
function bumpDataGen_(){
  // v6.5: метка времени + случайный хвост — две записи в одну миллисекунду (с разных устройств) больше не получают одно поколение
  try { const g = String(Date.now()) + "." + Math.random().toString(36).slice(2, 8); CacheService.getScriptCache().put("datagen", g, 21600); __memo.gen = g; } catch (err) {}
}
// C: ответ чтения бывает больше лимита одной записи CacheService (100 КБ) — тогда кэш молча не работал.
// Сжимаем (gzip+base64) и режем на части по 90 КБ; не влезло — просто без кэша.
function cachePutBig_(key, str, ttl){
  try {
    const c = CacheService.getScriptCache();
    const z = Utilities.base64Encode(Utilities.gzip(Utilities.newBlob(str, "application/json")).getBytes());
    const parts = [];
    for (let i = 0; i < z.length; i += 90000) parts.push(z.slice(i, i + 90000));
    if (parts.length > 20) return false;
    const obj = {}; parts.forEach(function (p2, i) { obj[key + "_" + i] = p2; });
    obj[key] = "z" + parts.length;
    c.putAll(obj, ttl);
    return true;
  } catch (err) { console.warn("cachePutBig_: " + err); return false; }
}
function cacheGetBig_(key){
  try {
    const c = CacheService.getScriptCache();
    const head = c.get(key);
    if (!head || head.charAt(0) !== "z") return null;
    const n = parseInt(head.slice(1), 10);
    const keys = []; for (let i = 0; i < n; i++) keys.push(key + "_" + i);
    const got = c.getAll(keys);
    let z = "";
    for (let i = 0; i < n; i++) { if (!got[keys[i]]) return null; z += got[keys[i]]; }
    return Utilities.ungzip(Utilities.newBlob(Utilities.base64Decode(z), "application/x-gzip")).getDataAsString();
  } catch (err) { return null; }
}
function roleSig_(u){
  return (u.edit ? "E" : "V") + (u.prod ? "|P" + u.prod : "") + "|" + (u.cities === "all" ? "all" : String(u.cities.join(",")));
}
// конец недели «дд-дд.мм» — для выбора открытой недели
// год можно указать явно («28.12-03.01.27»); без года — ближайший, не дальше 45 дней в будущее (как на сайте)
function weekEndDateServer_(w){
  const m = String(w || "").match(/(\d{1,2})(?:\.(\d{1,2}))?-(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?/);
  if (!m) return null;
  if (m[5]) { let y = +m[5]; if (y < 100) y += 2000; return new Date(y, +m[4] - 1, +m[3]); }
  const d = new Date(new Date().getFullYear(), +m[4] - 1, +m[3]);
  if (d - new Date() > 45 * 864e5) d.setFullYear(d.getFullYear() - 1);
  return d;
}

// ---------- ЧТЕНИЕ (только разрешённые города; кэш 90 с) ----------
// p.week: «latest» (по умолчанию — только открытая неделя), «all» (все недели) или точное название недели
function read_(p, e) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const weekSel = String(p.week || "latest").slice(0, 40);
  const lite = weekSel === "all" && !!p.lite;
  const gen = dataGen_();
  // v6: «ничего не менялось» — без чтения листов (gen из прошлого ответа совпал; роль и неделя — те же, сайт шлёт gen только для них)
  if (p.gen && String(p.gen) === gen + "|" + roleSig_(u) + "|" + weekSel + (lite ? "|L" : "")) { statBump_("readsame"); return { same: true, gen: String(p.gen) }; }
  // v6.3: общий снимок недели (один на всех) + фильтр прав на лету — вместо чтения листов для каждой роли
  let payload = null;
  if (snapEnabled_()) {
    try { payload = payloadFromSnap_(u, weekSel); } catch (err) { console.warn("снимок не сработал, читаю листы: " + err); payload = null; }
  }
  if (!payload) { statBump_("readmiss"); __memo.readSrc = "build"; payload = readPayload_(u, weekSel); }
  if (payload && !payload.error) {
    if (lite) { payload.rows = payload.rows.map(function (r) { return r.week === payload.latest ? r : liteRow_(r); }); payload.lite = true; }
    payload.gen = dataGen_() + "|" + roleSig_(u) + "|" + weekSel + (lite ? "|L" : "");
    payload.rules = verdictRules_(); // v7.2: пороги вердикта (меню «🔧 Дашборд → Пороги оценки»)
    statMark_("lastread");
  }
  return payload;
}

function check_(p) {
  const s = sessionUser_(p && p.token);
  if (!s) return { error: "требуется вход" };
  const u = s.u;
  return { ok: true, editor: !!u.edit, name: u.name || s.login, cities: u.cities === "all" ? ["all"] : u.cities, prod: !!u.prod, admin: isAdmin_({ login: s.login, edit: !!u.edit }) };
}

// ===================== v6.3: УСКОРЕНИЕ СЕРВЕРА — ОБЩИЙ СНИМОК НЕДЕЛИ =====================
// Раньше: кэш ответа на 2 минуты отдельно для каждой роли; любая запись сбрасывала его всем, и следующий читатель
// ждал, пока сервер перечитает все листы недели и весь лист «Скрины».
// Теперь:
//  • снимок недели собирается ОДИН РАЗ для всех (полные данные всех компаний), права каждого накладываются
//    при выдаче — это быстро, листы не читаются;
//  • «сохранить разбор» и «проверено сегодня» не сбрасывают снимок, а правят в нём одну строку;
//  • таймер snapWarm() раз в минуту заранее пересобирает снимок открытой недели, если что-то менялось
//    (или он старше SNAP_TTL_MS — так подхватываются правки руками прямо в таблице);
//  • выключить без правки кода: свойство SNAP_OFF = 1 (тогда всё читается как раньше).
var SNAP_TTL_MS = 5 * 60 * 1000, SNAP_CACHE_S = 900;
var SNAP_SUPER = { login: "__snapshot", name: "", edit: true, cities: "all", prod: "" };
function snapEnabled_(){ try { return props_().getProperty("SNAP_OFF") !== "1"; } catch (e) { return true; } }
function snapKey_(week){ return "snap|" + hashHex_("snap", String(week)).slice(0, 24); }
// листы недель: имя → компания и неделя (без чтения ячеек; кэш 60 с, сбрасывается любой записью через gen)
function snapMeta_(){
  if (__memo.meta) return __memo.meta;
  const ck = "snapmeta|" + dataGen_();
  try { const hit = CacheService.getScriptCache().get(ck); if (hit) { __memo.meta = JSON.parse(hit); return __memo.meta; } } catch (e) {}
  const list = [];
  SpreadsheetApp.getActive().getSheets().forEach(function (sh) {
    const nm = sh.getName();
    const city = allowedCity_(SNAP_SUPER, nm);
    if (!city) return;
    const w = (nm.match(/\((.+?)\)/) || [, ""])[1];
    if (!w) return;
    const d = weekEndDateServer_(w);
    list.push({ name: nm, city: city, week: w, t: d ? d.getTime() : 0 });
  });
  __memo.meta = list;
  try { CacheService.getScriptCache().put(ck, JSON.stringify(list), 60); } catch (e) {}
  return list;
}
function snapUserWeeks_(u){ // как в readPayload_: недели только доступных пользователю листов
  const weeks = {};
  snapMeta_().forEach(function (m) { if (allowedCity_(u, m.name)) weeks[m.week] = m.t; });
  const list = Object.keys(weeks).sort(function (a, b) { return weeks[a] - weeks[b]; });
  return { list: list, latest: list.length ? list[list.length - 1] : "", has: weeks };
}
function snapGet_(week){
  let snap = null;
  try { snap = JSON.parse(cacheGetBig_(snapKey_(week)) || "null"); } catch (e) { snap = null; }
  if (snap && snap.gen === dataGen_() && Date.now() - snap.built < SNAP_TTL_MS) return snap;
  return null;
}
function snapFresh_(week, marginMs){ // снимок есть, актуален и проживёт ещё marginMs
  const s = snapGet_(week);
  return !!(s && Date.now() - s.built < SNAP_TTL_MS - (marginMs || 0));
}
function snapBuild_(week){ // полные данные недели (все компании) → кэш
  const t0 = Date.now();
  // поколение берём ДО чтения листов: если пока читали, кто-то записал, снимок окажется «старым» и пересоберётся,
  // а не будет выдаваться как свежий без этой правки
  const g = dataGen_();
  const snap = readPayload_(SNAP_SUPER, week);
  if (!snap || snap.error) return null;
  snap.gen = g; snap.built = Date.now(); snap.sel = week;
  snap.hdr = {}; // заголовки листов: если лист поменял раскладку колонок — снимок не правим, а пересобираем
  const ss = SpreadsheetApp.getActive();
  Object.keys(snapSheetsOf_(snap)).forEach(function (nm) { const sh = ss.getSheetByName(nm); if (sh) snap.hdr[nm] = snapHdr_(sh); });
  cachePutBig_(snapKey_(week), JSON.stringify(snap), SNAP_CACHE_S);
  statBump_("snapbuild"); statTime_("snapbuild", Date.now() - t0);
  return snap;
}
function snapSheetsOf_(snap){ const o = {}; (snap.rows || []).forEach(function (r) { o[r._sheet] = 1; }); return o; }
function snapHdr_(sh){ return sh.getRange(1, 1, 1, Math.max(21, sh.getLastColumn())).getDisplayValues()[0].join("\u0001"); }
// права пользователя поверх общего снимка — ровно те же правила, что в readPayload_ (тест: tests/server.test.js)
function snapFilter_(snap, u, weekSel, uw){
  const keep = weekSel === "all" ? null : snap.week;
  const okSheet = function (nm) { return !!allowedCity_(u, nm); };
  const allRows = snap.rows.filter(function (r) { return okSheet(r._sheet); });
  let rows = allRows;
  if (u.prod) rows = rows.filter(function (r) { return r.producer === u.prod; });
  const kf = function (m) {
    const o = {};
    Object.keys(m || {}).forEach(function (k) {
      if (u.cities !== "all" && !allowedCity_(u, k.split("|")[0])) return;
      if (u.prod && String(k).split("|")[1] !== u.prod) return;
      o[k] = m[k];
    });
    return o;
  };
  const okRows = u.prod ? prodOwnKeys_(allRows, u.prod, srvRowKey_) : null;
  const screens = {};
  Object.keys(snap.screens || {}).forEach(function (k) {
    if (!okSheet(String(k).split("|")[0])) return;
    if (u.prod) { if (!okRows[k]) return; const l = snap.screens[k].filter(function (x) { return !x._lg; }); if (l.length) screens[k] = l; return; }
    screens[k] = snap.screens[k];
  });
  const tasks = prodTasks_(u, (snap.tasks || []).filter(function (t) {
    if (u.prod) return !t.orphan; // кому видна — решает prodTasks_ по текущему блоку продюсера
    return u.cities === "all" || !!allowedCity_(u, String(t.key || "").split("|")[0]);
  }));
  let colors = snap.colors;
  if (u.prod) { colors = {}; if (snap.colors && Object.prototype.hasOwnProperty.call(snap.colors, u.prod)) colors[u.prod] = snap.colors[u.prod]; }
  const pblocks = (snap.pblocks || []).filter(function (b) { return okSheet(b.sheet) && (!u.prod || b.producer === u.prod); });
  return { rows: rows, pblocks: pblocks, colors: colors, plans: kf(snap.plans), checks: kf(snap.checks), recs: kf(snap.recs), screens: screens,
    itog: (!u.prod && (u.edit || u.cities === "all")) ? snap.itog : [], tasks: tasks,
    resetPending: u.edit ? snap.resetPending : 0, suggestions: u.edit ? snap.suggestions : 0,
    marks: marksFor_(snap.marks, u, allRows, srvTeamKey_), newbies: marksFor_(snap.newbies, u, allRows, srvOpKey_),
    weeks: uw.list, week: keep === null ? "all" : keep, latest: uw.latest, tz: snap.tz };
}
function payloadFromSnap_(u, weekSel){
  const uw = snapUserWeeks_(u);
  let week = weekSel;
  if (weekSel === "latest") week = uw.latest;
  else if (weekSel !== "all" && !Object.prototype.hasOwnProperty.call(uw.has, weekSel))
    return { error: "недели «" + weekSel + "» нет (удалена или переименована) — выбери другую", weeks: uw.list, latest: uw.latest };
  if (!week) return null; // недель нет — пусть отработает обычное чтение
  if (week === "all") { try { CacheService.getScriptCache().put("snapuse|all", "1", 1800); } catch (e) {} } // v6.9: «все недели» нужны — прогрев будет держать их тёплыми
  let snap = snapGet_(week), src = "snap";
  if (!snap) { snap = snapBuild_(week); src = "build"; }
  if (!snap) return null;
  __memo.readSrc = src;
  statBump_(src === "snap" ? "readhit" : "readmiss");
  return snapFilter_(snap, u, weekSel, uw);
}
// «сохранить разбор», «проверено сегодня», загрузка и удаление скрина: правим снимки на месте (вместо сброса всем)
var SNAP_PATCH_ACTIONS = ["save", "touch", "upload", "delscreen", "mark", "newbie", "editscreen"];
function snapPatch_(sheetName, genOld, genNew, fn){ // fn(snap, sh) → true (поправлено) | false (не трогать — пусть пересоберётся)
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(3000)) return false;
  try {
    const sh = SpreadsheetApp.getActive().getSheetByName(sheetName);
    if (!sh) return false;
    const week = (sheetName.match(/\((.+?)\)/) || [, ""])[1];
    let patched = 0, hdr = null;
    [week, "all"].forEach(function (wk) {
      let snap = null;
      try { snap = JSON.parse(cacheGetBig_(snapKey_(wk)) || "null"); } catch (e) { snap = null; }
      if (!snap || snap.gen !== genOld || Date.now() - snap.built >= SNAP_TTL_MS) return;
      if (hdr === null) hdr = snapHdr_(sh);
      if (snap.hdr && snap.hdr[sheetName] !== undefined && snap.hdr[sheetName] !== hdr) return; // раскладка листа поменялась — пусть пересоберётся
      if (!fn(snap, sh)) return;
      snap.gen = genNew;
      cachePutBig_(snapKey_(wk), JSON.stringify(snap), SNAP_CACHE_S);
      patched++;
    });
    if (patched) statBump_("snappatch");
    return patched > 0;
  } catch (e) { console.warn("snapPatch_: " + e); return false; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
function snapRowFn_(rowN, sheetName){ // перечитать строку в снимке
  let v = null;
  return function (snap, sh) {
    const i = snap.rows.findIndex(function (r) { return r._sheet === sheetName && r._row === rowN; });
    if (i < 0) return false;
    const old = snap.rows[i];
    if (!v) v = sh.getRange(rowN, 1, 1, Math.max(21, sh.getLastColumn())).getDisplayValues()[0];
    const nr = rowObj_(v, sheetName, rowN, old.city, old.week, old.producer);
    if (nr.opNick !== old.opNick || String(nr.model).trim() !== String(old.model).trim()) return false; // ключ команды сменился — пересборка
    snap.rows[i] = nr;
    return true;
  };
}
// v6.6: правка всех закэшированных снимков (метки и новички общие для всех недель)
function snapPatchAll_(genOld, genNew, fn){
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(3000)) return false;
  try {
    const keys = { all: 1 };
    try { snapMeta_().forEach(function (m) { keys[m.week] = 1; }); } catch (e) {}
    let patched = 0;
    Object.keys(keys).forEach(function (wk) {
      let snap = null;
      try { snap = JSON.parse(cacheGetBig_(snapKey_(wk)) || "null"); } catch (e) { snap = null; }
      if (!snap || snap.gen !== genOld || Date.now() - snap.built >= SNAP_TTL_MS) return;
      fn(snap); snap.gen = genNew;
      cachePutBig_(snapKey_(wk), JSON.stringify(snap), SNAP_CACHE_S);
      patched++;
    });
    if (patched) statBump_("snappatch");
    return patched > 0;
  } catch (e) { console.warn("snapPatchAll_: " + e); return false; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
function snapPatchAfter_(action, p, genOld, genNew){
  if (action === "editscreen" && __memo.edscr) { // v6.8: размеченный скрин встал на место старого
    const e = __memo.edscr;
    return snapPatchAll_(genOld, genNew, function (snap) {
      Object.keys(snap.screens || {}).forEach(function (k) { (snap.screens[k] || []).forEach(function (x) { if (x.link === e.old) { x.link = e.link; x.mini = e.mini; } }); });
    });
  }
  if (action === "mark" || action === "newbie") {
    const ss = SpreadsheetApp.getActive();
    const all = action === "mark" ? marksAll_(ss) : newbiesAll_(ss);
    return snapPatchAll_(genOld, genNew, function (snap) {
      if (action === "mark") snap.marks = marksFor_(all, SNAP_SUPER, snap.rows, srvTeamKey_);
      else snap.newbies = marksFor_(all, SNAP_SUPER, snap.rows, srvOpKey_);
    });
  }
  const sheet = String(p.sheet || ""), row = parseInt(p.row, 10);
  if (action === "save" || action === "touch") return snapPatch_(sheet, genOld, genNew, snapRowFn_(row, sheet));
  if (action === "upload" && __memo.upl) {
    const it = __memo.upl, rowFn = snapRowFn_(row, sheet);
    return snapPatch_(sheet, genOld, genNew, function (snap, sh) {
      if (!rowFn(snap, sh)) return false;
      const arr = snap.screens[it.key] = snap.screens[it.key] || [];
      if (!arr.some(function (x) { return x.link === it.link; })) { const o = { cat: it.cat, link: it.link, ts: it.ts, mini: it.mini }; if (it.type === "video") o.type = "video"; arr.push(o); }
      return true;
    });
  }
  if (action === "delscreen") {
    const key = String(p.bkey || "").trim(), link = String(p.link || "").trim();
    const sh0 = key.split("|")[0];
    if (!key || !link || key.split("|").length !== 3) return false;
    return snapPatch_(sh0, genOld, genNew, function (snap) {
      Object.keys(snap.screens || {}).forEach(function (k) { snap.screens[k] = snap.screens[k].filter(function (x) { return x.link !== link; }); if (!snap.screens[k].length) delete snap.screens[k]; });
      return true;
    });
  }
  return false;
}
// таймер (раз в минуту): заранее собрать снимок открытой недели, если он устарел. Ночью (02–08) не работает — экономим квоту.
function snapWarm(){
  __memo = {};
  if (!snapEnabled_()) return;
  const h = Number(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "H"));
  if (h >= 2 && h < 8) return;
  const latest = {};
  snapMeta_().forEach(function (m) { if (!latest[m.city] || m.t > latest[m.city].t) latest[m.city] = m; });
  const weeks = {}; Object.keys(latest).forEach(function (c) { weeks[latest[c].week] = 1; });
  try { if (CacheService.getScriptCache().get("snapuse|all")) weeks.all = 1; } catch (e) {} // v6.9: и «все недели», если их открывали последние 30 мин
  // v6.9: пересобираем ЗАРАНЕЕ — за 70 с до устаревания, чтобы читатели не попадали на сборку (было: только когда уже устарел)
  Object.keys(weeks).forEach(function (w) { if (!snapFresh_(w, 70000)) snapBuild_(w); });
  statFlush_();
}
function installSnapTrigger(){ // один раз: Выполнить → installSnapTrigger (или меню таблицы «🔧 Дашборд»)
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === "snapWarm") ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger("snapWarm").timeBased().everyMinutes(1).create();
  return "Прогрев снимка включён: раз в минуту (кроме 02:00–08:00).";
}
function removeSnapTrigger(){
  let n = 0;
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === "snapWarm") { ScriptApp.deleteTrigger(t); n++; } });
  return "Прогрев выключен (таймеров удалено: " + n + ").";
}
// v6.6: сколько времени сэкономил кэш за день (оценка по замерам этого же дня)
function cacheSaved_(c, day){
  const tm = function (n) { const v = String(c.get("tm|" + day + "|" + n) || "0,0").split(","); const k = Number(v[1]) || 0; return k ? Number(v[0]) / k : null; };
  const cnt = function (n) { return Number(c.get("st|" + day + "|" + n) || 0); };
  const build = tm("read:build") || tm("snapbuild") || 3000, snap = tm("read:snap") || 800, same = tm("read:same") || 300, fetch1 = tm("thumbfetch") || 400;
  const ms = cnt("readhit") * Math.max(0, build - snap) + cnt("readsame") * Math.max(0, snap - same) + cnt("thumbhit") * fetch1 + cnt("snappatch") * Math.max(0, build - snap);
  return { ms: Math.round(ms), readhit: cnt("readhit"), readsame: cnt("readsame"), thumbhit: cnt("thumbhit"), snappatch: cnt("snappatch"), estimated: !tm("read:build") };
}
// время ответа: сумма и количество за день по типам — для вкладки «Состояние»
function statTime_(name, ms){ const b = statBuf_(); const v = b.t[name] || (b.t[name] = [0, 0]); v[0] += ms; v[1] += 1; }
var TIME_NAMES = ["read:snap", "read:build", "read:same", "snapbuild", "save", "touch", "upload", "thumbs", "pmsave", "pmread", "pmupload", "ping", "auth"];

// строка листа недели → объект для сайта (одна раскладка колонок для read и rowfull)
function rowObj_(r, sheetName, rowN, city, week, producer){
  const a = String(r[0] || "").trim();
  const fmt = sheetFmt_(sheetName);
  return {
    _sheet: sheetName, _row: rowN, fmt: fmt,
    city: city, week: week,
    producer: producer,
    opNick: a, opName: String(r[1] || ""), model: String(r[2] || ""),
    cats: [r[3], r[4], r[6], r[7], r[8], r[9], r[10], r[11], r[12]].map(String),
    obs: String(r[13] || ""),
    status: String(r[14] || ""),
    updated: String(r[15] || ""),
    scoreM: String(r[17] || ""),
    verdictM: String(r[18] || ""),
    reco: String(r[19] || ""),
    linksTxt: String(r[20] || "")
  };
}

// ---------- v6: облегчённое чтение ----------
// 1) Автообновление присылает gen — «поколение» данных из прошлого ответа. Если с тех пор через сайт ничего не
//    записывали (gen тот же), сервер отвечает {same:true} без чтения листов и без пересылки данных.
//    Правки руками прямо в таблице gen не меняют — поэтому сайт раз в LITE_FULL_MIN минут читает полностью.
// 2) История («все недели», lite:1): для прошлых недель тексты категорий/комментариев урезаются до LITE_TXT
//    символов, а состояние каждой категории (ок/замечание) считает сервер по тем же правилам, что и сайт
//    (_st) — оценки, вердикты, тренды и карта не меняются. Полный текст карточки подгружается при раскрытии (rowfull).
//    Открытая (последняя) неделя всегда приходит полностью — её можно править.
var LITE_TXT = 160;
var SRV_OK_RE = new RegExp("(^|[\\s,.!?])(все хорошо|все отлично|все нравится|работа есть|работает хорошо|нравится|молодец|старается|отлично|активное|хорошая|хорошо|поддерживает|вовлечена|сработаны)", "i");
var SRV_NEG_RE = new RegExp("(^|[^а-яёА-ЯЁ])(не|нет)(?![а-яёА-ЯЁ])", "i");
var SRV_NEG_NOUNS = "замечаний|ошибок|проблем|нареканий|претензий|косяков|нарушений|замечание|ошибки|проблемы";
var SRV_NN_D = "[\\s,.!?;:()\\-—]";
var SRV_NN_FOUND = "(обнаружено|обнаружены|выявлено|выявлены|найдено|найдены|замечено|замечены)";
var SRV_NN_RE = [
  [new RegExp("(^|" + SRV_NN_D + ")(нет|без)\\s+(" + SRV_NEG_NOUNS + ")(?=" + SRV_NN_D + "|$)", "gi"), "$1все хорошо"],
  [new RegExp("(^|" + SRV_NN_D + ")(" + SRV_NEG_NOUNS + ")\\s+нет(?=" + SRV_NN_D + "|$)", "gi"), "$1все хорошо"],
  [new RegExp("(^|" + SRV_NN_D + ")(" + SRV_NEG_NOUNS + ")\\s+не\\s+" + SRV_NN_FOUND + "(?=" + SRV_NN_D + "|$)", "gi"), "$1все хорошо"],
  [new RegExp("(^|" + SRV_NN_D + ")не\\s+" + SRV_NN_FOUND + "\\s+(" + SRV_NEG_NOUNS + ")(?=" + SRV_NN_D + "|$)", "gi"), "$1все хорошо"],
  [new RegExp("(^|" + SRV_NN_D + ")(ок|окей|ok|okay|норм|нормально|норма)(?=" + SRV_NN_D + "|$)", "gi"), "$1все хорошо"],
  [/👍+/g, " все хорошо "]
];
function srvCatState_(t){ // копия catState() сайта — менять только вместе с ней (тест: tests/catstate.test.js)
  let s = String(t || "").trim();
  SRV_NN_RE.forEach(function (p) { s = s.replace(p[0], p[1]); });
  if (!s) return null;
  if (s.charAt(0) === "✅") return "ok";
  if (s.charAt(0) === "⚠" || s.indexOf("🟠") === 0) return "warn"; // v7.2: замечание — не провал
  if (s.charAt(0) === "❌" || s.indexOf("🔴") === 0) return "bad";
  if (SRV_NEG_RE.test(s)) return "bad";
  const m = s.match(SRV_OK_RE);
  if (!m) return "bad";
  const idx = s.toLowerCase().indexOf(m[0].toLowerCase());
  const pre = s.slice(Math.max(0, idx - 4), idx).toLowerCase();
  if (/не\s*$|нет\s*$|не-$/.test(pre)) return "bad";
  return "ok";
}
function liteCut_(t){ t = String(t || ""); return t.length > LITE_TXT ? t.slice(0, LITE_TXT) + "…" : t; }
function liteRow_(r){ // чистая: облегчённая копия строки прошлой недели
  const o = {}; Object.keys(r).forEach(function (k) { o[k] = r[k]; });
  o._st = r.cats.map(srvCatState_);
  o.cats = r.cats.map(liteCut_);
  o._advN = String(r.reco || "").split(/\r?\n/).filter(function (l) { return DASH_CATS.concat(DASH_CATS_NSK).some(function (c) { return l.indexOf("💡 " + c + ":") === 0 || l.indexOf("💡" + c + ":") === 0; }); }).length; // v7.4: число советов по полному тексту
  o.obs = liteCut_(r.obs); o.reco = liteCut_(r.reco);
  o._lite = 1;
  return o;
}
// полный текст одной строки (раскрытие карточки облегчённой недели)
// v6.9: строка-заголовок блока продюсера → имя продюсера, иначе "".
// Заголовок: в B «Опер»/«опер»/«Оператор…», ИЛИ заполнена только A (B и C пусты — например, A:B объединены).
// Так команды следующего продюсера не «прилипают» к предыдущему, если заголовок оформлен чуть иначе.
// Заголовок, если: (1) A — известный продюсер (USERS_JSON prod или лист «Цвета»), при любых B и C;
// (2) в B «Опер/опер/Оператор», или «Оп./оп» без модели; (3) B и C пусты, а A похоже на фамилию (не ник вроде «n0»/«Котик»).
// Строка только с ником (латиница/цифры, B и C пусты) — ни заголовок, ни команда: пропускается, продюсер блока не меняется.
function knownProds_(){
  if (__memo.knownProds) return __memo.knownProds;
  const o = {};
  try { usersRaw_().forEach(function (x) { const n = String(x.prod || "").trim().toLowerCase(); if (n) o[n] = String(x.prod).trim(); }); } catch (e) {}
  try { const cs = SpreadsheetApp.getActive().getSheetByName("Цвета"); if (cs && cs.getLastRow() >= 2) cs.getRange(2, 1, cs.getLastRow() - 1, 1).getValues().forEach(function (r) { const n = String(r[0] || "").trim(); if (n && !o[n.toLowerCase()]) o[n.toLowerCase()] = n; }); } catch (e) {}
  return (__memo.knownProds = o);
}
function blockHead_(r){
  let a = String(r[0] == null ? "" : r[0]).trim(); if (!a) return "";
  const b = String(r[1] == null ? "" : r[1]).trim(), c = String(r[2] == null ? "" : r[2]).trim();
  const kp = knownProds_(), an = a.replace(/[:：]+$/, "").trim();
  if (kp[an.toLowerCase()]) return kp[an.toLowerCase()]; // имя как в аккаунте (регистр в листе мог отличаться)
  if (/^опер/i.test(b)) return a;
  if (/^оп\.?$/i.test(b) && !c) return a; // «Оп.»/«оп» — только если модели нет (иначе это опер с коротким именем «Оп»)
  // неизвестное имя без опера и модели — заголовок, только если похоже на фамилию (Смирнова, Ким Анна, Петров-Водкин);
  // ник одним словом («Котик», «n0») — это команда, а не продюсер
  if (!b && !c && /^[А-ЯЁ][а-яё\-]+(\s+[А-ЯЁ][а-яё\-.]+)*$/.test(an) && (/\s/.test(an) || /(ов|ев|ёв|ин|ын|ова|ева|ёва|ина|ына|ский|ская|цкий|цкая|ых|их|ко|ук|юк|ян|енко)$/i.test(an))) return an;
  return "";
}
// v7.6: блок продюсера в листе недели. Продюсер «есть в компании», только когда в листе есть строка-заголовок с его фамилией.
function prodBlockRow_(sh, prod){ // строка заголовка блока (с 1) или 0
  const last = sh.getLastRow(); if (last < 1) return 0;
  const want = String(prod || "").trim().toLowerCase(); if (!want) return 0;
  const a = sh.getRange(1, 1, last, 3).getValues();
  for (let i = 0; i < last; i++) { const h = blockHead_(a[i]); if (h && h.toLowerCase() === want) return i + 1; }
  return 0;
}
function prodNameOk_(prod){ prod = String(prod || "").trim(); return prod.length >= 2 && prod.length <= 60 && !/^[=+\-@]/.test(prod) && /[A-Za-zА-Яа-яЁё]/.test(prod); }
// вызывать ПОД script-lock: добавляет в конец листа заголовок блока «Фамилия | Опер | Модель» (оформление — как у первого блока)
function ensureProdBlockNoLock_(sh, prod){
  prod = String(prod || "").trim();
  const have = prodBlockRow_(sh, prod); if (have) return { row: have, created: false };
  if (!prodNameOk_(prod)) return { error: "имя продюсера: 2–60 символов, буквы" };
  const last = Math.max(1, sh.getLastRow()), row = last + 1;
  sh.getRange(row, 1, 1, 3).setValues([[notFormula_(prod), "Опер", "Модель"]]);
  try { // оформление строки-заголовка берём у существующего блока
    const a = sh.getRange(1, 1, last, 3).getValues();
    for (let i = 1; i < last; i++) { if (blockHead_(a[i])) { sh.getRange(i + 1, 1, 1, sh.getLastColumn()).copyFormatToRange(sh, 1, sh.getLastColumn(), row, row); break; } }
  } catch (e) {}
  return { row: row, created: true };
}
// последний (открытый) лист недели компании
function latestCitySheet_(city){
  let best = null, bt = -1;
  SpreadsheetApp.getActive().getSheets().forEach(function (sh) {
    const nm = sh.getName(); if (!isTeamSheet_(nm)) return;
    const m = nm.match(/Томск|Новосибирск|Онлайн/i); if (!m || m[0].toLowerCase() !== String(city).toLowerCase()) return;
    const w = (nm.match(/\((.+?)\)/) || [, ""])[1]; if (!w) return;
    const d = weekEndDateServer_(w), t = d ? d.getTime() : 0;
    if (t >= bt) { bt = t; best = sh; }
  });
  return best;
}
// v6.9: ключи, которые принадлежат ТОЛЬКО этому продюсеру (если такой же ключ есть у другого — продюсеру его не отдаём)
function prodOwnKeys_(allRows, prod, keyFn){
  const mine = {}, other = {};
  allRows.forEach(function (r) { const k = keyFn(r); if (r.producer === prod) mine[k] = 1; else other[k] = 1; });
  const out = {}; Object.keys(mine).forEach(function (k) { if (!other[k]) out[k] = 1; });
  return out;
}
function srvRowKey_(r){ return r._sheet + "|" + String(r.opNick || "").trim() + "|" + String(r.model || "").trim(); }
function rowfull_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const name = String(p.sheet || "");
  if (!isTeamSheet_(name)) return { error: "нет такого листа" };
  const city = allowedCity_(u, name);
  if (!city) return { error: "нет доступа к этой компании" };
  const sh = SpreadsheetApp.getActive().getSheetByName(name);
  if (!sh) return { error: "лист не найден (неделя удалена?)" };
  const row = parseInt(p.row, 10);
  if (!row || row < 2 || row > sh.getLastRow()) return { error: "неверная строка" };
  const head = sh.getRange(1, 1, row, 3).getDisplayValues();
  let producer = "";
  for (let i = row - 2; i >= 0; i--) { const h = blockHead_(head[i]); if (h) { producer = h; break; } }
  if (u.prod && (producer !== u.prod || blockHead_(head[row - 1]))) return { error: "нет доступа к этой команде" }; // v6.9: до сверки ключа — без подсказок о чужих строках
  const kerr = rowKeyError_(sh, row, p);
  if (kerr) return { error: kerr };
  const maxCol = Math.max(21, sh.getLastColumn());
  const r = sh.getRange(row, 1, 1, maxCol).getDisplayValues()[0];
  const week = (name.match(/\((.+?)\)/) || [, ""])[1];
  return { ok: true, row: rowObj_(r, name, row, city, week, producer) };
}

// срез данных по доступным пользователю городам (каждый лист — ОДИН getDataRange)
function readPayload_(u, weekSel) {
  const ss = SpreadsheetApp.getActive();
  // первый проход: список листов-городов с их неделями (без чтения)
  const citySheets = [];
  const weeks = {};
  ss.getSheets().forEach(function (sh) {
    const name = sh.getName();
    const city = allowedCity_(u, name);
    if (!city) return;
    const week = (name.match(/\((.+?)\)/) || [, ""])[1];
    if (!week) return;
    citySheets.push({ sh: sh, name: name, city: city, week: week });
    weeks[week] = weekEndDateServer_(week) ? weekEndDateServer_(week).getTime() : 0;
  });
  // какую неделю отдаём: последняя по дате, все или точную
  // D14: неизвестная неделя — ошибка (раньше молча отдавалась последняя, и клиент считал её выбранной)
  const weekList = Object.keys(weeks).sort(function (a, b) { return weeks[a] - weeks[b]; });
  const latestWeek = weekList.length ? weekList[weekList.length - 1] : "";
  let keep = null;
  if (weekSel !== "all") {
    if (weekSel !== "latest" && !Object.prototype.hasOwnProperty.call(weeks, weekSel))
      return { error: "недели «" + weekSel + "» нет (удалена или переименована) — выбери другую", weeks: weekList, latest: latestWeek };
    keep = weekSel === "latest" ? latestWeek : weekSel;
  }
  const rows = [];
  const pblocks = []; // v7.6: все блоки продюсеров, в том числе пока без команд
  citySheets.forEach(function (it) {
    if (keep !== null && it.week !== keep) return;
    const last = it.sh.getLastRow();
    if (last < 2) return;
    const maxCol = Math.max(21, it.sh.getLastColumn());
    // B: getDisplayValues — текст ровно как в ячейке (даты/числа не превращаются в «Mon Oct 05 2026 …»)
    let values = it.sh.getRange(1, 1, last, maxCol).getDisplayValues(); // ОДНО чтение листа
    // чтение НИЧЕГО не меняет: если у листа ещё нет колонки «Плейлист» — один раз создаём её
    // отдельной функцией под LockService и перечитываем (после этого путь не выполняется)
    const hdr = values[0] || [];
    sheetFmt_(it.name, hdr); // v7.7: формат листа по шапке (без лишнего чтения)
    if (!hdr.some(function (h) { return /плейлист/i.test(String(h || "")); })) {
      fixPlaylistColumnUnderLock_(it.sh);
      values = it.sh.getRange(1, 1, last, maxCol).getDisplayValues();
    }
    let producer = "";
    values.forEach(function (r, idx) {
      const a = String(r[0] || "").trim();
      const b = String(r[1] || "").trim();
      const h = blockHead_(r); if (h) { producer = h; if (idx > 0) pblocks.push({ sheet: it.name, city: it.city, week: it.week, producer: h, fmt: sheetFmt_(it.name) }); return; } // строка 1 — шапка листа, не продюсер
      if (!a || !b) return;
      rows.push(rowObj_(r, it.name, idx + 1, it.city, it.week, producer)); // колонку P (ссылку скрина) не шлём — скрины идут из листа «Скрины»
    });
  });
  // заметки: «Планы» (план работ), «Чек» (план повышения чека), «Рекомендации»
  const plans = {}, checks = {}, recs = {};
  [["Планы", plans], ["Чек", checks], ["Рекомендации", recs]].forEach(function (pair) {
    const sh2 = ss.getSheetByName(pair[0]);
    if (sh2 && sh2.getLastRow() >= 2) {
      const pv = sh2.getRange(2, 1, sh2.getLastRow() - 1, 2).getDisplayValues();
      pv.forEach(function (r) {
        const k = String(r[0] || "").trim();
        if (!k) return;
        // B: ключ «Компания|Продюсер» — чужие компании не отдаём
        if (u.cities !== "all" && !allowedCity_(u, k.split("|")[0])) return;
        pair[1][k] = String(r[1] || "");
      });
    }
  });
  // цвета команд (лист «Цвета»)
  const cs = ss.getSheetByName("Цвета");
  const colors = {};
  if (cs && cs.getLastRow() >= 2) {
    const cv = cs.getRange(2, 1, cs.getLastRow() - 1, 2).getValues();
    cv.forEach(function (r) {
      const nm = String(r[0] || "").trim();
      if (nm) colors[nm] = String(r[1] || "");
    });
  }
  // лист «Ссылки» больше не читаем и не шлём: ссылки живут в колонке U строк (linksTxt)
  // скрины (лист «Скрины»: A ключ, B категория, C ссылка, D время, E мини) — D/B: только для ЗАГРУЖЕННЫХ
  // листов и своих компаний. Старые ключи «лист|строка» переводятся по текущим строкам загруженных листов
  // (разовый перенос всех старых ключей — функция migrateLegacyScreenKeys(), см. DEPLOY.md)
  const loadedSheets = {};
  citySheets.forEach(function (it) { if (keep === null || it.week === keep) loadedSheets[it.name] = 1; });
  const skey = {};
  rows.forEach(function (r) { skey[r._sheet + "|" + r._row] = r._sheet + "|" + String(r.opNick || "").trim() + "|" + String(r.model || "").trim(); });
  const screens2 = {}, seenLinks = {};
  const ssh2 = ss.getSheetByName("Скрины");
  if (ssh2 && ssh2.getLastRow() >= 2) {
    const sv = ssh2.getRange(2, 1, ssh2.getLastRow() - 1, scrCols_(ssh2)).getDisplayValues();
    sv.forEach(function (r) {
      const k = String(r[0] || "").trim();
      if (!k) return;
      if (!loadedSheets[k.split("|")[0]]) return;
      const nk = skey[k] || k;
      const link = String(r[2] || "");
      if (seenLinks[nk + "\u0000" + link]) return; // пропуск дублей (одна загрузка — одна запись)
      seenLinks[nk + "\u0000" + link] = 1;
      if (!screens2[nk]) screens2[nk] = [];
      const it0 = scrItem_(r); if (nk !== k) it0._lg = 1; // v6.9: старый ключ «лист|строка» — продюсерам не отдаём
      screens2[nk].push(it0);
    });
  }
  // продюсер видит только свои команды
  const allRows = rows.slice(); // v6.9: все строки доступных компаний — чтобы отсечь ключи, совпадающие с чужими
  if (u.prod) {
    const frows = rows.filter(function (r) { return r.producer === u.prod; });
    rows.length = 0; frows.forEach(function (r) { rows.push(r); });
    const fpb = pblocks.filter(function (b) { return b.producer === u.prod; }); pblocks.length = 0; fpb.forEach(function (b) { pblocks.push(b); });
    const kf = function (m) { const o2 = {}; Object.keys(m).forEach(function (k) { if (String(k).split("|")[1] === u.prod) o2[k] = m[k]; }); return o2; };
    const fplans = kf(plans), fchecks = kf(checks), frecs = kf(recs);
    Object.keys(plans).forEach(function (k) { delete plans[k]; }); Object.keys(fplans).forEach(function (k) { plans[k] = fplans[k]; });
    Object.keys(checks).forEach(function (k) { delete checks[k]; }); Object.keys(fchecks).forEach(function (k) { checks[k] = fchecks[k]; });
    Object.keys(recs).forEach(function (k) { delete recs[k]; }); Object.keys(frecs).forEach(function (k) { recs[k] = frecs[k]; });
    const okRows = prodOwnKeys_(allRows, u.prod, srvRowKey_); // v6.9: ключ есть и у другого продюсера — не отдаём
    Object.keys(screens2).forEach(function (k) { if (!okRows[k]) { delete screens2[k]; return; } screens2[k] = screens2[k].filter(function (x) { return !x._lg; }); if (!screens2[k].length) delete screens2[k]; });
    Object.keys(colors).forEach(function (nm) { if (nm !== u.prod) delete colors[nm]; }); // v6.9: цвета — только свой
  }
  // лист «Итог» — итоги дня по сверке карточек/смен (пишут другие чаты, сайт ТОЛЬКО читает)
  const itog = [];
  if (!u.prod && (u.edit || u.cities === "all")) {
    const ish = ss.getSheetByName("Итог");
    if (ish && ish.getLastRow() >= 2) {
      const iv = ish.getRange(2, 1, ish.getLastRow() - 1, 4).getDisplayValues(); // A дата, B что за сверка, C итог, D когда/кто
      iv.forEach(function (r) {
        const t = String(r[2] || "").trim();
        if (!t) return;
        itog.push({ date: String(r[0] || "").trim(), title: String(r[1] || "").trim() || "Итог дня", text: t, when: String(r[3] || "").trim() });
      });
    }
  }
  const tasks = prodTasks_(u, tasksFor_(u, ss));
    let resetPending = 0;
  if (u.edit) {
    const rsh = ss.getSheetByName("Сбросы");
    if (rsh && rsh.getLastRow() >= 2) {
      const rv = rsh.getRange(2, 1, rsh.getLastRow() - 1, 4).getValues();
      rv.forEach(function (r) { if (String(r[3] || "") === "ожидает") resetPending++; });
    }
  }
  let suggestions = 0; // C: только непрочитанные
  if (u.edit) {
    const gsh = ss.getSheetByName("Предложения");
    if (gsh && gsh.getLastRow() >= 2) {
      gsh.getRange(2, 1, gsh.getLastRow() - 1, 6).getDisplayValues().forEach(function (r) { if (String(r[2] || "").trim() && !String(r[5] || "").trim()) suggestions++; });
    }
  }
  // v6.6: общие метки/закрепление команд и метки «новичок» (только своих компаний; продюсеру — по его командам)
  const marks = marksFor_(marksAll_(ss), u, allRows, srvTeamKey_), newbies = marksFor_(newbiesAll_(ss), u, allRows, srvOpKey_);
  return { rows: rows, pblocks: pblocks, colors: colors, plans: plans, checks: checks, recs: recs, screens: screens2, itog: itog, tasks: tasks, resetPending: resetPending, suggestions: suggestions,
    marks: marks, newbies: newbies,
    weeks: weekList, week: keep === null ? "all" : keep, latest: latestWeek,
    tz: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "Z") }; // пояс штампов «Обновлено» (например +0700)
}

// (старый action=login удалён в v34: вход только через auth/authpoll с токеном)

// ---------- ЗАПИСЬ (только редактор + его город) ----------
function save_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "править может только редактор" };
  if (!writableSheet_(p.sheet)) return { error: "в этот лист писать нельзя" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const city = allowedCity_(u, p.sheet);
    if (!city) return { error: "нет доступа к этому городу" };
    const sh = SpreadsheetApp.getActive().getSheetByName(p.sheet);
    if (!sh) return { error: "лист не найден" };
    const row = parseInt(p.row, 10);
    if (!row || row < 2) return { error: "неверная строка" };
    const kerr = rowKeyError_(sh, row, p);
    if (kerr) return { error: kerr };
    prepSheet_(sh);
    // пачка: собираем все поля, одним чтением диапазона применяем и одним setValues пишем
    // пишем ТОЛЬКО переданные ячейки (группами подряд идущих колонок): соседние ячейки,
    // в т.ч. формулы и колонки вне списка, больше не перезаписываются прочитанными значениями
    const byCol = {};
    for (let i = 1; i <= 20; i++) {
      const f = p["f" + i], v = p["v" + i];
      if (f === undefined || f === "") continue;
      const col = FIELDS[f];
      if (!col || col === FIELDS.updated || col === FIELDS.screen) continue; // штамп/скрин клиент не пишет
      byCol[col] = notFormula_(String(v == null ? "" : v).slice(0, 20000));
    }
    const colsSorted = Object.keys(byCol).map(Number).sort(function (a, b) { return a - b; });
    const saved = colsSorted.length;
    let stamp = "";
    if (saved) {
      // B: смена ТОЛЬКО статуса — не «проверка», штамп «Обновлено» (и 7-дневный отсчёт) не трогаем
      const onlyStatus = colsSorted.length === 1 && colsSorted[0] === FIELDS.status;
      if (!onlyStatus) { stamp = stampFor_(u); byCol[FIELDS.updated] = stamp; colsSorted.push(FIELDS.updated); colsSorted.sort(function (a, b) { return a - b; }); }
      let runStart = colsSorted[0], runVals = [byCol[colsSorted[0]]];
      for (let i = 1; i <= colsSorted.length; i++) {
        const c = colsSorted[i];
        if (i < colsSorted.length && c === colsSorted[i - 1] + 1) { runVals.push(byCol[c]); continue; }
        sh.getRange(row, runStart, 1, runVals.length).setValues([runVals]);
        if (i < colsSorted.length) { runStart = c; runVals = [byCol[c]]; }
      }
    }
    return { ok: true, saved: saved, stamp: stamp };
  } catch (err) {
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// ---------- НОВАЯ СМЕНА (только редактор + его город) ----------
function add_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "добавлять мониторинги может только редактор" };
  if (!writableSheet_(p.sheet)) return { error: "в этот лист писать нельзя" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const city = allowedCity_(u, p.sheet);
    if (!city) return { error: "нет доступа к этому городу" };
    const sh = SpreadsheetApp.getActive().getSheetByName(p.sheet);
    if (!sh) return { error: "лист не найден" };
    prepSheet_(sh);
    const last = sh.getLastRow();
    const a = sh.getRange(1, 1, last, 3).getValues();
    let start = -1, end = -1;
    for (let i = 0; i < last; i++) {
      const ai = String(a[i][0] || "").trim();
      const bi = String(a[i][1] || "").trim();
      const hi = blockHead_(a[i]);
      if (hi && ai === p.producer && start < 0) { start = i + 1; continue; }
      if (start > 0 && hi) { end = i; break; }
    }
    let blockMade = false;
    if (start < 0) { // v7.6: нового продюсера нет на листе — создаём его блок в конце листа
      const eb = ensureProdBlockNoLock_(sh, p.producer);
      if (eb.error) return { error: "продюсер «" + p.producer + "» не найден на листе " + sheetLabel_(p.sheet) + " (" + eb.error + ")" };
      start = eb.row; end = eb.row; blockMade = eb.created;
    }
    // C: повтор того же запроса после таймаута (тот же rid) не добавляет вторую строку
    const rid = /^[A-Za-z0-9]{6,40}$/.test(String(p.rid || "")) ? "addrid_" + p.rid : "";
    if (rid) { const prev = CacheService.getScriptCache().get(rid); if (prev) return { ok: true, row: Number(prev), dup: true }; }
    if (end < 0) end = last;
    // защита от дублей при ретрае: идентичная строка уже есть в блоке — не создаём вторую
    for (let i = start; i < end; i++) {
      if ((String(p.nick||"").trim() || String(p.model||"").trim()) &&
          String(a[i][0]||"").trim() === String(p.nick||"").trim() &&
          String(a[i][1]||"").trim() === String(p.opname||"").trim() &&
          String(a[i][2]||"").trim() === String(p.model||"").trim()) {
        return { ok: true, row: i + 1, existed: true };
      }
    }
    sh.insertRowAfter(end);
    sh.getRange(end + 1, 1, 1, 3).setValues([[notFormula_(p.nick || ""), notFormula_(p.opname || ""), notFormula_(p.model || "")]]);
    if (rid) { try { CacheService.getScriptCache().put(rid, String(end + 1), 3600); } catch (e3) {} }
    return { ok: true, row: end + 1, newProducer: blockMade };
  } catch (err) {
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// ---------- ЦВЕТА КОМАНД (лист «Цвета»: A продюсер, B цвет) ----------
function ensureColorsSheet_(ss) {
  let sh = ss.getSheetByName("Цвета");
  if (!sh) {
    sh = ss.insertSheet("Цвета");
    sh.getRange(1, 1, 1, 2).setValues([["Продюсер", "Цвет"]]);
  }
  return sh;
}

function setcolor_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "цвет может поменять только редактор" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const producer = String(p.producer || "").trim();
    const color = String(p.color || "").trim();
    if (!producer || !/^#[0-9A-Fa-f]{6}$/.test(color)) return { error: "неверный цвет" };
    const ss = SpreadsheetApp.getActive();
    const sh = ensureColorsSheet_(ss);
    const last = sh.getLastRow();
    let row = -1;
    if (last >= 2) {
      const names = sh.getRange(2, 1, last - 1, 1).getValues();
      for (let i = 0; i < names.length; i++) {
        if (String(names[i][0]).trim().toLowerCase() === producer.toLowerCase()) { row = i + 2; break; }
      }
    }
    if (row === -1) sh.appendRow([notFormula_(producer), color]);
    else sh.getRange(row, 2).setValue(color);
    return { ok: true };
  } catch (err) {
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// ---------- ПЛАНЫ РАБОТ (лист «Планы») ----------
function ensureSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sh;
}
// строка листа «Скрины» → объект для сайта; type есть только у видео (картинки — как раньше)
function scrItem_(r){ const o = { cat: String(r[1] || ""), link: String(r[2] || ""), ts: String(r[3] || ""), mini: String(r[4] || "") }; if (String(r[5] || "") === "video") o.type = "video"; return o; }
function scrCols_(sh){ return Math.min(6, Math.max(5, sh.getLastColumn())); }
function appendScreen_(key, cat, link, mini, fresh, type) {
  const ss = SpreadsheetApp.getActive();
  const sh = ensureSheet_(ss, "Скрины", ["Ключ","Категория","Ссылка","Время","Мини","Тип"]);
  const ck = "scrhdr6";
  let c = null; try { c = CacheService.getScriptCache(); } catch (e) {}
  if (!(c && c.get(ck))) {
    const h = sh.getRange(1, 5, 1, 2).getValues()[0];
    if (!String(h[0] || "").trim() || !String(h[1] || "").trim()) sh.getRange(1, 5, 1, 2).setValues([["Мини", "Тип"]]); // F «Тип»: пусто — картинка, «video» — видео
    try { if (c) c.put(ck, "1", 21600); } catch (e) {}
  }
  // идемпотентность: тот же ключ+ссылка уже есть — не пишем дубль (фикс дублирования скринов).
  // v6.5: для только что созданного файла (fresh) ссылка заведомо новая — весь лист «Скрины» не перечитываем.
  const last = fresh ? 0 : sh.getLastRow();
  if (last >= 2) {
    const vals = sh.getRange(2, 1, last - 1, 3).getValues();
    for (let i = 0; i < vals.length; i++) {
      if (String(vals[i][0] || "").trim() === key && String(vals[i][2] || "").trim() === link) return;
    }
  }
  sh.appendRow([notFormula_(key), notFormula_(cat), link, textCell_(nowTxt_()), mini || "", type === "video" ? "video" : ""]);
  bumpScrGen_(); // ПОСЛЕ записи: индекс скринов пересоберётся уже с этой строкой
}
// перенос ключа команды в «Скринах» и «Задачах» (после смены ника/модели); вызывать под локом
function moveTeamKey_(oldKey, newKey){
  const ss = SpreadsheetApp.getActive();
  let n = 0;
  ["Скрины", "Задачи"].forEach(function (name) {
    const sh = ss.getSheetByName(name);
    if (!sh || sh.getLastRow() < 2) return;
    const rng = sh.getRange(2, 1, sh.getLastRow() - 1, 1);
    const kv = rng.getValues();
    let changed = false;
    // остальные значения пишутся обратно как есть, но с тем же экранированием «=+-@»
    kv.forEach(function (r) { const s = String(r[0] == null ? "" : r[0]); if (s.trim() === oldKey) { r[0] = notFormula_(newKey); changed = true; n++; } else r[0] = notFormula_(s); });
    if (changed) { rng.setValues(kv); if (name === "Скрины") bumpScrGen_(); }
  });
  return n;
}
function delscreen_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "удалять скрины может только редактор" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const key = String(p.bkey || "").trim(), link = String(p.link || "").trim(); // bkey: «key» занят секретным
    if (!key || !link) return { error: "нет ключа или ссылки" };
    const ss = SpreadsheetApp.getActive();
    const sh = ss.getSheetByName("Скрины");
    if (!sh || sh.getLastRow() < 2) return { ok: true, removed: 0 };
    const vals = sh.getRange(2, 1, sh.getLastRow() - 1, 3).getValues();
    // B: только скрины своей компании (ключ начинается с имени листа компании)
    const own = vals.filter(function (r) { return String(r[2] || "").trim() === link; });
    if (own.some(function (r) { return !allowedCity_(u, String(r[0] || "").split("|")[0]); })) return { error: "нет доступа к этой компании" };
    const removed = deleteRowsWhere_(sh, 2, vals, function (r) { return String(r[2] || "").trim() === link; }); // по ссылке: ключи легаси и новые различаются
    return { ok: true, removed: removed };
  } catch (err) { return { error: errText_(err) }; } finally { try { lock.releaseLock(); } catch (e2) {} }
}

function setplan_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "план может сохранить только редактор" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const key = String(p.bkey || "").trim(); // бизнесс-ключ в bkey: «key» занят секретным
    if (!key || key.indexOf("|") === -1) return { error: "неверный ключ" };
    const sheetName = ["Планы","Чек","Рекомендации"].indexOf(String(p.sheet||"")) >= 0 ? String(p.sheet) : "Планы";
    // B: ключ «Компания|Продюсер» — писать можно только в свои компании (продюсеру — только своё)
    if (u.cities !== "all" && !allowedCity_(u, key.split("|")[0])) return { error: "нет доступа к этой компании" };
    const ss = SpreadsheetApp.getActive();
    const sh = ensureSheet_(ss, sheetName, ["Ключ","План"]);
    const last = sh.getLastRow();
    let row = -1;
    if (last >= 2) {
      const keys = sh.getRange(2, 1, last - 1, 1).getValues();
      for (let i = 0; i < keys.length; i++) {
        if (String(keys[i][0]).trim() === key) { row = i + 2; break; }
      }
    }
    if (row === -1) sh.appendRow([notFormula_(key), notFormula_(p.plan || "")]);
    else sh.getRange(row, 2).setValue(notFormula_(p.plan || ""));
    return { ok: true };
  } catch (err) {
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// ---------- УДАЛЕНИЕ КОМАНДЫ (только редактор + город) ----------
// action=delteam&sheet=...&producer=...&all=0|1
// all=0 — удалить блок команды только с указанного листа (недели);
// all=1 — удалить со всех недельных листов того же города.
function delteam_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "удалять команды может только редактор" };
  if (!writableSheet_(p.sheet)) return { error: "в этот лист писать нельзя" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    const producer = String(p.producer || "").trim();
    if (!producer) return { error: "не указан продюсер" };
    const ss = SpreadsheetApp.getActive();
    const targets = [];
    if (String(p.all) === "1") {
      const baseCity = allowedCity_(u, p.sheet);
      if (!baseCity) return { error: "нет доступа к этому городу" };
      ss.getSheets().forEach(function (sh) {
        // только недельные листы команд этой компании (расписание/доход и служебные — никогда)
        if (!isTeamSheet_(sh.getName())) return;
        const c2 = allowedCity_(u, sh.getName());
        if (c2 && String(c2).toLowerCase() === String(baseCity).toLowerCase()) targets.push(sh);
      });
    } else {
      const city = allowedCity_(u, p.sheet);
      if (!city) return { error: "нет доступа к этому городу" };
      if (!isTeamSheet_(p.sheet)) return { error: "в этот лист писать нельзя" };
      const sh = ss.getSheetByName(p.sheet);
      if (!sh) return { error: "лист не найден" };
      targets.push(sh);
    }
    let removed = 0;
    targets.forEach(function (sh) {
      const last = sh.getLastRow();
      if (last < 2) return;
      const vals = sh.getRange(2, 1, last - 1, 3).getValues();
      let start = -1, next = -1;
      for (let i = 0; i < vals.length; i++) {
        const a = String(vals[i][0] || "").trim();
        const h = blockHead_(vals[i]);
        if (h && a === producer && start < 0) { start = i + 2; continue; }
        if (start > 0 && h) { next = i + 2; break; }
      }
      if (start < 0) return;
      const count = (next > 0 ? next : last + 1) - start;
      sh.deleteRows(start, count);
      removed++;
    });
    if (!removed) return { error: "команда «" + producer + "» не найдена" };
    return { ok: true, removed: removed };
  } catch (err) {
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// ---------- УДАЛЕНИЕ ОДНОЙ СМЕНЫ (только редактор + город) ----------
function delrow_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "удалять мониторинги может только редактор" };
  if (!writableSheet_(p.sheet)) return { error: "в этот лист писать нельзя" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const city = allowedCity_(u, p.sheet);
    if (!city) return { error: "нет доступа к этому городу" };
    const sh = SpreadsheetApp.getActive().getSheetByName(p.sheet);
    if (!sh) return { error: "лист не найден" };
    const row = parseInt(p.row, 10);
    if (!row || row < 2) return { error: "неверная строка" };
    const hdr = sh.getRange(row, 1, 1, 3).getValues()[0];
    if (blockHead_(hdr)) return { error: "это заголовок блока продюсера — удалять его нельзя" };
    const kerr = rowKeyError_(sh, row, p);
    if (kerr) return { error: kerr };
    sh.deleteRow(row);
    return { ok: true };
  } catch (err) {
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// ---------- СМЕНА ОПЕРАТОРА/МОДЕЛИ В СТРОКЕ (только редактор + город) ----------
// Перезаписывает A (ник), B (опер) и C (модель) указанной строки.
function setoper_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "менять оператора может только редактор" };
  if (!writableSheet_(p.sheet)) return { error: "в этот лист писать нельзя" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const city = allowedCity_(u, p.sheet);
    if (!city) return { error: "нет доступа к этому городу" };
    const sh = SpreadsheetApp.getActive().getSheetByName(p.sheet);
    if (!sh) return { error: "лист не найден" };
    const row = parseInt(p.row, 10);
    if (!row || row < 2) return { error: "неверная строка" };
    const nick = String(p.nick || "").trim();
    const opname = String(p.opname || "").trim();
    const model = String(p.model || "").trim();
    if (!nick && !opname && !model) return { error: "заполни хотя бы одно поле" };
    const kerr = rowKeyError_(sh, row, p);
    if (kerr) return { error: kerr };
    const vals = sh.getRange(row, 1, 1, 3).getValues()[0];
    const nv = [notFormula_(nick || vals[0]), notFormula_(opname || vals[1]), notFormula_(model || vals[2])];
    sh.getRange(row, 1, 1, 3).setValues([nv]);
    prepSheet_(sh);
    const stamp = stampFor_(u);
    sh.getRange(row, FIELDS.updated).setValue(stamp);
    const res = { ok: true, nick: String(nv[0]).replace(/^'/, ""), opname: String(nv[1]).replace(/^'/, ""), model: String(nv[2]).replace(/^'/, ""), stamp: stamp };
    // B: скрины и задачи команды привязаны к «лист|ник|модель» — переносим на новый ключ,
    // если в листе не осталось другой строки со старым ключом (иначе неоднозначно — не трогаем)
    const oldKey = p.sheet + "|" + String(vals[0] || "").trim() + "|" + String(vals[2] || "").trim();
    const newKey = p.sheet + "|" + res.nick.trim() + "|" + res.model.trim();
    if (oldKey !== newKey) {
      const last = sh.getLastRow();
      const av = last >= 2 ? sh.getRange(2, 1, last - 1, 3).getValues() : [];
      const still = av.some(function (r, i) { return i + 2 !== row && p.sheet + "|" + String(r[0] || "").trim() + "|" + String(r[2] || "").trim() === oldKey; });
      if (!still) res.moved = moveTeamKey_(oldKey, newKey);
    }
    return res;
  } catch (err) {
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// Обновление 7: архив недель перед удалением — отдельная таблица (Script Property ARCHIVE_SS_ID, создаётся сама).
// Основная таблица не засоряется, и листы архива не попадают в чтение дашборда (они в другой таблице).
function archiveSpreadsheet_(){
  const pr = props_();
  const id = String(pr.getProperty("ARCHIVE_SS_ID") || "").trim();
  if (id) { try { return SpreadsheetApp.openById(id); } catch (e) {} }
  const name = "Дашборд — архив недель";
  const it = DriveApp.getFilesByName(name);
  let ss = null;
  if (it.hasNext()) { try { ss = SpreadsheetApp.open(it.next()); } catch (e) { ss = null; } }
  if (!ss) ss = SpreadsheetApp.create(name);
  try { pr.setProperty("ARCHIVE_SS_ID", ss.getId()); } catch (e2) {}
  return ss;
}

// ---------- УДАЛЕНИЕ НЕДЕЛИ (только редактор) ----------
// action=delweek&week=21-27.09 — удаляет все недельные листы «Город (неделя)»
// в городах, доступных пользователю. Служебные листы («Цвета», «Планы») не трогает.
function delweek_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "удалять недели может только редактор" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    const week = String(p.week || "").trim();
    if (!week) return { error: "не указана неделя" };
    const ss = SpreadsheetApp.getActive();
    const toDelete = [];
    ss.getSheets().forEach(function (sh) {
      const name = sh.getName();
      if (!isTeamSheet_(name)) return; // только недельные листы команд (служебные/расписание/доход не трогаем)
      if (name.indexOf("(" + week + ")") === -1) return;
      if (!allowedCity_(u, name)) return; // нет доступа к городу
      toDelete.push(sh);
    });
    if (!toDelete.length) return { error: "листы недели «" + week + "» не найдены" };
    const deadNames = toDelete.map(function (sh) { return sh.getName(); });
    const isDead = function (r) { const k = String(r[0] || ""); return deadNames.some(function (n) { return k.indexOf(n + "|") === 0; }); };
    // B: удаляем и скрины, и задачи этой недели — группами, а не по одной строке
    // (файлы скринов на Диске не удаляются — см. CHANGELOG «Не сделано»)
    let scrRemoved = 0, tasksRemoved = 0;
    const scr = ss.getSheetByName("Скрины");
    if (scr && scr.getLastRow() >= 2) scrRemoved = deleteRowsWhere_(scr, 2, scr.getRange(2, 1, scr.getLastRow() - 1, 1).getValues(), isDead);
    const tsh = ss.getSheetByName("Задачи");
    if (tsh && tsh.getLastRow() >= 2) tasksRemoved = deleteRowsWhere_(tsh, 2, tsh.getRange(2, 1, tsh.getLastRow() - 1, 1).getValues(), isDead);
    // Обновление 7: перед удалением — копия листов в «Дашборд — архив недель» (страховка от необратимости).
    let archived = 0;
    try {
      const arch = archiveSpreadsheet_();
      toDelete.forEach(function (sh) {
        const base = sh.getName();
        let nm = base;
        try { if (arch.getSheetByName(nm)) nm = base + " (архив " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyMMdd-HHmm") + ")"; } catch (e3) {}
        sh.copyTo(arch).setName(nm);
        archived++;
      });
    } catch (errA) { console.warn("архив недели не создался (удаление продолжается): " + errA); }
    toDelete.forEach(function (sh) { ss.deleteSheet(sh); });
    return { ok: true, removed: toDelete.length, screens: scrRemoved, tasks: tasksRemoved, archived: archived };
  } catch (err) {
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// ---------- ОТМЕТКА «ПРОВЕРЕНО СЕГОДНЯ» (без правок контента) ----------
function touch_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "отмечать проверку может только редактор" };
  if (!writableSheet_(p.sheet)) return { error: "в этот лист писать нельзя" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const city = allowedCity_(u, p.sheet);
    if (!city) return { error: "нет доступа к этому городу" };
    const sh = SpreadsheetApp.getActive().getSheetByName(p.sheet);
    if (!sh) return { error: "лист не найден" };
    const row = parseInt(p.row, 10);
    if (!row || row < 2) return { error: "неверная строка" };
    const kerr = rowKeyError_(sh, row, p);
    if (kerr) return { error: kerr };
    prepSheet_(sh);
    const stamp = stampFor_(u);
    sh.getRange(row, FIELDS.updated).setValue(stamp);
    return { ok: true, stamp: stamp };
  } catch (err) {
    return { error: errText_(err) };
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

// колонка J «Плейлист / музыка». ВАЖНО (D16): в Apps Script releaseLock() снимает лок выполнения целиком,
// поэтому из-под лока записи вызывается fixPlaylistColumn_ (без своего лока), а с пути чтения —
// fixPlaylistColumnUnderLock_ (берёт лок сам).
function fixPlaylistColumn_(sh) {
  const h = sh.getRange(1, 9, 1, 2).getValues()[0]; // I и J одним чтением
  if (/шоу/i.test(String(h[0] || "")) && !/плейлист/i.test(String(h[1] || ""))) {
    sh.insertColumnAfter(9);
    sh.getRange(1, 10).setValue("Плейлист / музыка");
    bumpDataGen_();
  }
}
function fixPlaylistColumnUnderLock_(sh) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    fixPlaylistColumn_(sh);
  } catch (err) { console.warn("fixPlaylistColumn: " + err); } finally { try { lock.releaseLock(); } catch (e2) {} }
}

// v6.5: проверка раскладки листа перед записью — одно чтение заголовка вместо двух, и только раз в 6 часов на лист
// (результат «заголовок в порядке» кэшируется; вставка колонки «Плейлист» или новых заголовков сбрасывает отметку).
function prepSheet_(sh){
  const ck = "hdrok|" + hashHex_("h", sh.getName()).slice(0, 24);
  let c = null; try { c = CacheService.getScriptCache(); if (c.get(ck)) return; } catch (e) {}
  fixPlaylistColumn_(sh);
  ensureServiceColumns_(sh);
  try { if (c) c.put(ck, "1", 21600); } catch (e) {}
}
// служебные колонки (после вставки J: O..S)
function ensureServiceColumns_(sh) {
  const titles = { 15: "Статус", 16: "Обновлено", 17: "Скрин", 18: "Оценка (вручную)", 19: "Вердикт (вручную)", 20: "Рекомендации", 21: "Ссылки" };
  // D: одно чтение и (если нужно) одна запись вместо 7+7 обращений
  const rng = sh.getRange(1, 15, 1, 7);
  const cur = rng.getValues()[0];
  let changed = false;
  for (let c = 0; c < 7; c++) { if (!String(cur[c]).trim()) { cur[c] = titles[15 + c]; changed = true; } }
  if (changed) rng.setValues([cur]);
}

// ---------- ЛЁГКАЯ ВЫДАЧА СКРИНОВ (для подтверждения загрузки на фронте) ----------
// ключи команд, доступных пользователю (для прод-фильтра скринов)
function teamKeysFor_(u, onlySheets) { // D: onlySheets {имя:1} — читать только нужные листы
  const set = {}, other = {};
  const ss = SpreadsheetApp.getActive();
  ss.getSheets().forEach(function (sh) {
    if (onlySheets && !onlySheets[sh.getName()]) return;
    if (!isTeamSheet_(sh.getName()) || !allowedCity_(u, sh.getName())) return;
    const last = sh.getLastRow();
    if (last < 2) return;
    const vals = sh.getRange(1, 1, last, 3).getValues();
    let producer = "";
    vals.forEach(function (r) {
      const a = String(r[0] || "").trim(), b = String(r[1] || "").trim();
      const h = blockHead_(r); if (h) { producer = h; return; }
      if (!a || !b) return;
      const k = sh.getName() + "|" + a + "|" + String(r[2] || "").trim();
      if (u.prod && producer !== u.prod) { other[k] = 1; return; }
      set[k] = 1;
    });
  });
  if (u.prod) Object.keys(other).forEach(function (k) { delete set[k]; }); // v6.9: такой же ник+модель у другого продюсера — не считаем своей
  return set;
}
function screens_(p, e) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName("Скрины");
  const screens = {};
  if (sh && sh.getLastRow() >= 2) {
    const sv = sh.getRange(2, 1, sh.getLastRow() - 1, scrCols_(sh)).getValues();
    let allow = null;
    if (u.prod) { // продюсер: только свои команды; читаем лишь листы, на которые ссылаются скрины
      const need = {}; sv.forEach(function (r) { const k = String(r[0] || ""); if (k) need[k.split("|")[0]] = 1; });
      allow = teamKeysFor_(u, need);
    }
    sv.forEach(function (r) {
      const k = String(r[0] || "").trim();
      if (!k) return;
      if (u.prod) { if (!allow[k]) return; }
      else if (!allowedCity_(u, String(k).split("|")[0])) return; // чужие города не отдаём
      if (!screens[k]) screens[k] = [];
      screens[k].push(scrItem_(r));
    });
  }
  return { screens: screens };
}

// ---------- СМЕНА ПАРОЛЯ С ОДОБРЕНИЕМ РЕДАКТОРА ----------
// 1) resetreq: пользователь без входа просит смену (заявка в лист «Сбросы», не более одной активной)
// 2) resetlist/resetok/resetno: редактор видит заявки, «Разрешить» выдаёт одноразовый код на 15 минут
// 3) resetdo: пользователь вводит код + новый пароль → «соль$хэш» в USERS_JSON, все его сессии гасятся
// B: заявки без подсказки, существует ли логин; код хранится только хэшем; попытки ввода кода ограничены;
// после смены пароля все сессии пользователя гасятся.
var RESET_GENERIC_OK = "Если такой логин есть, заявка отправлена смотрящему — жди код";
var RESET_GENERIC_ERR = "Неверный логин или код, либо код истёк — попроси новый";
function resetPepper_(){ // секрет для хэша кодов; создаётся сам при первом одобрении (вызывать под локом)
  let pp = props_().getProperty("RESET_PEPPER");
  if (!pp) { pp = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, ""); props_().setProperty("RESET_PEPPER", pp); }
  return pp;
}
function resetCodeHash_(login, code){ return "h:" + hashHex_(resetPepper_(), String(login) + "|" + String(code)); }
function resetreq_(p, e) {
  const login = String(p.login || "").trim().slice(0, 80);
  if (!login) return { error: "Введи логин" };
  if (!rateOk_("rsq|" + login.toLowerCase(), 3, 3600) || !rateOk_("rsq|__all", 30, 3600))
    return { error: "Слишком много заявок — попробуй позже" };
  if (!usersRaw_().some(function (x) { return x.u === login; })) return { ok: true, msg: RESET_GENERIC_OK }; // тот же ответ
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = ensureSheet_(SpreadsheetApp.getActive(), "Сбросы", ["Логин","Код","Создано","Статус","ГоденДо"]);
    const last = sh.getLastRow();
    if (last >= 2) {
      const vals = sh.getRange(2, 1, last - 1, 4).getValues();
      for (let i = 0; i < vals.length; i++) {
        if (String(vals[i][0]||"").trim() === login && String(vals[i][3]||"") === "ожидает")
          return { ok: true, msg: RESET_GENERIC_OK };
      }
    }
    sh.appendRow([notFormula_(login), "", textCell_(nowTxt_()), "ожидает", ""]);
    return { ok: true, msg: RESET_GENERIC_OK };
  } catch (err) {
    return { error: errText_(err) };
  } finally { try { lock.releaseLock(); } catch (e2) {} }
}
function resetlist_(p, e) {
  const u = getUser_(p);
  if (!u || !u.edit) return { error: "только редактор" };
  const sh = SpreadsheetApp.getActive().getSheetByName("Сбросы");
  const list = [];
  if (sh && sh.getLastRow() >= 2) {
    const rv = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getDisplayValues();
    rv.forEach(function (r, i) {
      if (String(r[3] || "") === "ожидает") list.push({ row: i + 2, login: String(r[0]||""), created: String(r[2]||"") });
    });
  }
  return { list: list };
}
function resetok_(p, e) {
  const u = getUser_(p);
  if (!u || !u.edit) return { error: "только редактор" };
  const row = parseInt(p.row, 10);
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = SpreadsheetApp.getActive().getSheetByName("Сбросы");
    if (!sh || !row || row < 2 || row > sh.getLastRow()) return { error: "заявка не найдена" };
    const r = sh.getRange(row, 1, 1, 4).getValues()[0];
    const login = String(r[0] || "").trim();
    if (p.login !== undefined && String(p.login).trim() !== login) return { error: "список заявок изменился — открой его заново" };
    if (String(r[3] || "").trim() !== "ожидает") return { error: "заявка уже закрыта" };
    // код из криптостойкого UUID (а не Math.random); в таблицу — только хэш
    const rnd = parseInt(Utilities.getUuid().replace(/-/g, "").slice(0, 12), 16);
    const code = String(100000 + (rnd % 900000));
    sh.getRange(row, 2).setValue(resetCodeHash_(login, code));
    sh.getRange(row, 4, 1, 2).setValues([["одобрен", String(Date.now() + 15 * 60000)]]);
    return { ok: true, code: code, login: login };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
function resetno_(p, e) {
  const u = getUser_(p);
  if (!u || !u.edit) return { error: "только редактор" };
  const row = parseInt(p.row, 10);
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = SpreadsheetApp.getActive().getSheetByName("Сбросы");
    if (!sh || !row || row < 2 || row > sh.getLastRow()) return { error: "заявка не найдена" };
    if (p.login !== undefined && String(sh.getRange(row, 1).getValue() || "").trim() !== String(p.login).trim()) return { error: "список заявок изменился — открой его заново" };
    sh.getRange(row, 4).setValue("отклонён");
    return { ok: true };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
function resetdo_(p, e) {
  const login = String(p.login || "").trim().slice(0, 80);
  const code = String(p.code || "").trim().slice(0, 20);
  const np = String(p.newpass || "");
  if (!login || !code) return { error: RESET_GENERIC_ERR };
  if (np.length < 8) return { error: "пароль слишком короткий (минимум 8 символов)" };
  if (np.length > 200) return { error: "пароль слишком длинный" };
  // не больше 5 попыток ввода кода на логин за 15 минут (и общий потолок)
  if (!rateOk_("rsd|" + login.toLowerCase(), 5, 900) || !rateOk_("rsd|__all", 50, 900))
    return { error: "Слишком много попыток — подожди 15 минут" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = SpreadsheetApp.getActive().getSheetByName("Сбросы");
    if (!sh || sh.getLastRow() < 2) return { error: RESET_GENERIC_ERR };
    const rv = sh.getRange(2, 1, sh.getLastRow() - 1, 5).getValues();
    for (let i = 0; i < rv.length; i++) {
      const r = rv[i];
      if (String(r[0]||"").trim() !== login || String(r[3]||"") !== "одобрен") continue;
      if (!r[4] || Number(r[4]) < Date.now()) continue;
      const stored = String(r[1] || "").trim();
      // новый формат — хэш; коды, выданные до обновления, хранятся открыто (совместимость)
      const ok = stored.indexOf("h:") === 0 ? stored === resetCodeHash_(login, code) : (stored !== "" && stored === code);
      if (!ok) continue;
      const users2 = usersLoadFresh_(); // свежий список, под локом
      const uu2 = users2.find(function (x) { return x.u === login; });
      if (!uu2) return { error: RESET_GENERIC_ERR };
      uu2.h = makeHash_(np);
      usersSave_(users2); // ошибка записи → исключение, «использован» не ставится
      __memo.users = users2;
      try { props_().deleteProperty("pw_" + login); } catch (e3) {} // старый легаси-пароль больше не действует
      sh.getRange(i + 2, 2).setValue("");
      sh.getRange(i + 2, 4).setValue("использован");
      sessionsKillUser_(login); // все входы с этим логином гаснут
      return { ok: true };
    }
    return { error: RESET_GENERIC_ERR };
  } catch (err) {
    return { error: errText_(err) };
  } finally { try { lock.releaseLock(); } catch (e2) {} }
}

// ---------- ПРЕДЛОЖЕНИЯ (идеи/ошибки от любого аккаунта, видит редактор) ----------
// простой счётчик частоты в CacheService (true — можно)
function rateOk_(key, max, ttlSec){
  try {
    const c = CacheService.getScriptCache();
    const k = "rt_" + Utilities.base64EncodeWebSafe(String(key)).slice(0, 200);
    const n = Number(c.get(k) || 0);
    if (n >= max) return false;
    c.put(k, String(n + 1), ttlSec);
    return true;
  } catch (err) { return true; }
}
function suggest_(p, e) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const text = String(p.text || "").trim().slice(0, 1000);
  if (!text) return { error: "пустое предложение" };
  if (!rateOk_("sug|" + u.login, 10, 3600)) return { error: "слишком много предложений за час — попробуй позже" };
  const kind = ["баг", "идея"].indexOf(String(p.kind || "").trim().toLowerCase()) >= 0 ? String(p.kind).trim().toLowerCase() : "";
  const lock = LockService.getScriptLock();
  // задача 3: короткое ожидание лока — лучше честное «повтори», чем 10 с тишины
  if (!lock.tryLock(5000)) return { error: "сервер занят — повтори через пару секунд" };
  try {
    const sh = suggestSheet_();
    // B8: всё, что ввёл пользователь, — через notFormula_ (никаких формул из предложений)
    // K «Логин автора» — по нему автор видит ответы (имя в A не уникально)
    sh.appendRow([notFormula_(u.name || u.login), textCell_(nowTxt_()),
      notFormula_(text), kind, notFormula_(String(p.title || "").trim().slice(0, 80)), "", "", "", "", "", notFormula_(u.login)]);
    return { ok: true };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
// ---------- задача 3: уведомления и ответы на предложения ----------
// колонки «Предложения»: A Кто, B Когда, C Текст, D Тип, E Заголовок, F Прочитано (смотрящим),
// G Ответ, H Кто ответил, I Когда ответил, J Прочитано автором, K Логин автора
var SUGGEST_HEADERS = ["Кто","Когда","Текст","Тип","Заголовок","Прочитано","Ответ","Кто ответил","Когда ответил","Прочитано автором","Логин автора"];
function suggestSheet_(){ // вызывать под локом: создаёт лист и недостающие заголовки одним чтением/записью
  const sh = ensureSheet_(SpreadsheetApp.getActive(), "Предложения", SUGGEST_HEADERS);
  const c = CacheService.getScriptCache();
  if (c.get("sgHdr11")) return sh;
  const rng = sh.getRange(1, 1, 1, SUGGEST_HEADERS.length);
  const cur = rng.getValues()[0];
  let changed = false;
  for (let k = 0; k < SUGGEST_HEADERS.length; k++) { if (!String(cur[k] || "").trim()) { cur[k] = SUGGEST_HEADERS[k]; changed = true; } }
  if (changed) rng.setValues([cur]);
  try { c.put("sgHdr11", "1", 21600); } catch (e) {}
  return sh;
}
// suggestlist/mysuggest сбрасывают счётчики сами — только если что-то пометили прочитанным
var NOTIF_ACTIONS = ["suggest","suggestset","suggestdel","suggestreply","resetreq","resetok","resetno","resetdo","pmsave","pmhide","pmunhide","pmstatus","askadd","askdone"]; // v6: мониторинг продюсера и просьбы — бейджи 🔔
function notifGen_(){ try { return CacheService.getScriptCache().get("notifGen") || "0"; } catch (e) { return "0"; } }
function bumpNotif_(){ try { CacheService.getScriptCache().put("notifGen", String(Date.now()) + "." + Math.random().toString(36).slice(2, 8), 21600); } catch (e) {} __memo.nb = null; }
// v6.5: общая для всех основа уведомлений (одно чтение листов на всех, а не на каждого пользователя);
// кэш до любого действия из NOTIF_ACTIONS (ключ — notifGen), не дольше 10 минут
function notifBase_(){
  if (__memo.nb) return __memo.nb;
  const c = CacheService.getScriptCache();
  const ck = "nbase|" + notifGen_();
  try { const hit = c.get(ck); if (hit) { __memo.nb = JSON.parse(hit); return __memo.nb; } } catch (e) {}
  const ss = SpreadsheetApp.getActive();
  const b = { reset: 0, sug: 0, ans: {}, pm: [], ask: [] };
  const rsh = ss.getSheetByName("Сбросы");
  if (rsh && rsh.getLastRow() >= 2)
    rsh.getRange(2, 4, rsh.getLastRow() - 1, 1).getValues().forEach(function (r) { if (String(r[0] || "") === "ожидает") b.reset++; });
  const gsh = ss.getSheetByName("Предложения");
  if (gsh && gsh.getLastRow() >= 2) {
    const w = Math.min(11, Math.max(6, gsh.getLastColumn()));
    gsh.getRange(2, 1, gsh.getLastRow() - 1, w).getDisplayValues().forEach(function (r) {
      if (!String(r[2] || "").trim()) return;
      if (!String(r[5] || "").trim()) b.sug++;
      const lg = String(r[10] || "").trim();
      if (lg && String(r[6] || "").trim() && !String(r[9] || "").trim()) b.ans[lg] = (b.ans[lg] || 0) + 1;
    });
  }
  try {
    pmAll_(pmSheet_(false)).forEach(function (x) {
      const o = pmObj_(x.v);
      if (o.status === "возврат" || o.status === "отправлено") b.pm.push([o.city, o.producer, o.status]);
    });
  } catch (e) {}
  try { askAll_().forEach(function (a) { if (a.status !== "сделано") b.ask.push([a.city, a.producer]); }); } catch (e) {}
  try { c.put(ck, JSON.stringify(b), 600); } catch (e2) {}
  __memo.nb = b;
  return b;
}
function notifCounts_(u){
  const b = notifBase_();
  let pmReturned = 0, pmSent = 0;
  b.pm.forEach(function (x) {
    const o = { city: x[0], producer: x[1] };
    if (!pmCanSee_(u, o)) return;
    if (u.prod && x[2] === "возврат") pmReturned++;
    if (u.edit && x[2] === "отправлено") pmSent++;
  });
  let asks = 0;
  if (u.edit) (b.ask || []).forEach(function (x) { if (u.cities === "all" || allowedCity_(u, x[0])) asks++; });
  const res = { resetPending: u.edit ? b.reset : 0, suggestions: u.edit ? b.sug : 0, myAnswers: b.ans[u.login] || 0, pmReturned: pmReturned, pmSent: pmSent, asks: asks };
  if (u.edit) { const h = healthGet_(); if (h) res.health = { ok: !!h.ok, t: h.t || "", problems: (h.problems || []).slice(0, 5) }; } // v6.6: плашка самопроверки
  return res;
}
// лёгкий опрос уведомлений (сайт — раз в 60 с, и при черновиках): кэш 30 с, сбрасывается любым действием из NOTIF_ACTIONS
function ping_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  return notifCounts_(u); // v6.5: основа общая и закэширована (notifBase_), подсчёт под пользователя — в памяти
}
// смотрящий отвечает на предложение; ответ увидит только автор (по логину в K)
function suggestreply_(p){
  const u = getUser_(p);
  if (!u || !u.edit) return { error: "отвечать может только смотрящий" };
  const text = String(p.text || "").trim().slice(0, 2000);
  if (!text) return { error: "пустой ответ" };
  const row = parseInt(p.row, 10);
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = suggestSheet_();
    const serr = suggestRowError_(sh, row, p);
    if (serr) return { error: serr };
    const when = nowTxt_();
    sh.getRange(row, 7, 1, 4).setValues([[notFormula_(text), notFormula_(u.name || u.login), textCell_(when), ""]]);
    const login = String(sh.getRange(row, 11).getDisplayValue() || "").trim();
    return { ok: true, answeredBy: u.name || u.login, answeredAt: when, author: !!login };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
// автор видит только свои предложения (по логину) и ответы; просмотренные ответы помечаются прочитанными
function mysuggest_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const sh = SpreadsheetApp.getActive().getSheetByName("Предложения");
  const list = [];
  if (!sh || sh.getLastRow() < 2 || sh.getLastColumn() < 11) return { list: list };
  const sv = sh.getRange(2, 1, sh.getLastRow() - 1, 11).getDisplayValues();
  const toMark = [];
  sv.forEach(function (r, i) {
    if (String(r[10] || "").trim() !== u.login || !String(r[2] || "").trim()) return;
    const answer = String(r[6] || "");
    const unread = !!answer.trim() && !String(r[9] || "").trim();
    if (unread) toMark.push(i + 2);
    list.push({ when: String(r[1] || ""), text: String(r[2] || ""), kind: String(r[3] || ""), title: String(r[4] || ""),
      answer: answer, answeredBy: String(r[7] || ""), answeredAt: String(r[8] || ""), unread: unread });
  });
  if (toMark.length) {
    const lock = LockService.getScriptLock();
    if (lock.tryLock(5000)) {
      try {
        // перечитываем под локом и помечаем только свои строки, где ответ всё ещё не прочитан
        toMark.forEach(function (row) {
          if (row > sh.getLastRow()) return;
          const v = sh.getRange(row, 1, 1, 11).getDisplayValues()[0];
          if (String(v[10] || "").trim() === u.login && String(v[6] || "").trim() && !String(v[9] || "").trim()) sh.getRange(row, 10).setValue("да");
        });
        bumpNotif_();
      } finally { try { lock.releaseLock(); } catch (e2) {} }
    }
  }
  list.reverse(); // свежие сверху
  return { list: list };
}
// C: список отдаётся редактору и помечает предложения прочитанными (колонка F «Прочитано»);
// счётчик на колокольчике — только непрочитанные
function suggestlist_(p, e) {
  const u = getUser_(p);
  if (!u || !u.edit) return { error: "только редактор" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = SpreadsheetApp.getActive().getSheetByName("Предложения");
    const list = [];
    if (sh && sh.getLastRow() >= 2) {
      const n = sh.getLastRow() - 1;
      const w = Math.min(11, Math.max(6, sh.getLastColumn()));
      const sv = sh.getRange(2, 1, n, w).getDisplayValues();
      const unreadRows = [];
      sv.forEach(function (r, i) {
        if (!String(r[2] || "").trim()) return;
        const unread = !String(r[5] || "").trim();
        if (unread) unreadRows.push(i + 2);
        list.push({ row: i + 2, who: String(r[0]||""), when: String(r[1]||""), text: String(r[2]||""), kind: String(r[3]||""), title: String(r[4]||""), unread: unread,
          answer: String(r[6] || ""), answeredBy: String(r[7] || ""), answeredAt: String(r[8] || ""), hasLogin: !!String(r[10] || "").trim() });
      });
      // задача 3: «Прочитано» — только в изменившиеся ячейки (подряд идущие — одной записью)
      if (unreadRows.length) {
        suggestSheet_();
        let a = 0;
        while (a < unreadRows.length) {
          let b = a; while (b + 1 < unreadRows.length && unreadRows[b + 1] === unreadRows[b] + 1) b++;
          const cnt = b - a + 1, vals = []; for (let q = 0; q < cnt; q++) vals.push(["да"]);
          sh.getRange(unreadRows[a], 6, cnt, 1).setValues(vals);
          a = b + 1;
        }
        bumpNotif_();
      }
    }
    return { list: list };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
// строка «Предложений» адресуется номером — сверяем автора и время (список мог сдвинуться после удаления)
function suggestRowError_(sh, row, p){
  if (!sh || !row || row < 2 || row > sh.getLastRow()) return "не найдено";
  if (p.who === undefined || p.when === undefined) return "страница устарела — обнови её (Ctrl+F5)";
  const r = sh.getRange(row, 1, 1, 2).getDisplayValues()[0];
  return (String(r[0]).trim() === String(p.who).trim() && String(r[1]).trim() === String(p.when).trim()) ? "" : "список изменился — открой его заново";
}
// редактор правит тип (баг/идея) и заголовок предложения вручную
function suggestset_(p, e) {
  const u = getUser_(p);
  if (!u || !u.edit) return { error: "только редактор" };
  const row = parseInt(p.row, 10);
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = SpreadsheetApp.getActive().getSheetByName("Предложения");
    const serr = suggestRowError_(sh, row, p);
    if (serr) return { error: serr };
    const kind = ["баг", "идея"].indexOf(String(p.kind || "")) >= 0 ? String(p.kind) : "";
    if (kind) sh.getRange(row, 4).setValue(kind);
    if (p.title !== undefined) sh.getRange(row, 5).setValue(notFormula_(String(p.title || "").slice(0, 80)));
    return { ok: true };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
function suggestdel_(p, e) {
  const u = getUser_(p);
  if (!u || !u.edit) return { error: "только редактор" };
  const row = parseInt(p.row, 10);
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = SpreadsheetApp.getActive().getSheetByName("Предложения");
    const serr = suggestRowError_(sh, row, p);
    if (serr) return { error: serr };
    sh.deleteRow(row);
    return { ok: true };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
// v6.5: индекс листа «Скрины» (id файла → ключ команды, плюс скрины мониторинга продюсеров по ключу) в кэше.
// Раньше КАЖДЫЙ запрос миниатюр перечитывал весь лист «Скрины» (он растёт каждый день). Индекс пересобирается,
// только когда лист меняется (bumpScrGen_ во всех местах записи в «Скрины»).
function scrGen_(){ try { const c = CacheService.getScriptCache(); let g = c.get("scrgen"); if (!g) { g = String(Date.now()); c.put("scrgen", g, 21600); } return g; } catch (e) { return String(Date.now()); } }
function bumpScrGen_(){ try { CacheService.getScriptCache().put("scrgen", String(Date.now()) + Math.random().toString(36).slice(2, 6), 21600); } catch (e) {} __memo.scrIdx = null; }
function scrIndex_(){
  if (__memo.scrIdx) return __memo.scrIdx;
  const ck = "scridx|" + scrGen_();
  let idx = null;
  try { idx = JSON.parse(cacheGetBig_(ck) || "null"); } catch (e) { idx = null; }
  if (!idx) {
    idx = { byId: {}, pm: {}, video: {} };
    const sh = SpreadsheetApp.getActive().getSheetByName("Скрины");
    if (sh && sh.getLastRow() >= 2) {
      sh.getRange(2, 1, sh.getLastRow() - 1, scrCols_(sh)).getDisplayValues().forEach(function (r) {
        const k = String(r[0] || "").trim(); if (!k) return;
        [driveIdOf_(r[2]), driveIdOf_(r[4])].forEach(function (id) { if (id && !idx.byId[id]) idx.byId[id] = k; });
        if (String(r[5] || "") === "video") { const vid = driveIdOf_(r[2]); if (vid) idx.video[vid] = 1; }
        if (k.indexOf(PM_SCREEN_PREFIX) === 0) (idx.pm[k] = idx.pm[k] || []).push(scrItem_(r));
      });
    }
    cachePutBig_(ck, JSON.stringify(idx), 21600);
  }
  idx.video = idx.video || {};
  __memo.scrIdx = idx;
  return idx;
}
// миниатюра/скрин через сервер: файлы приватные, доступ только своим
// D: владелец скрина по точному id файла; доступ — как у screens_
function screenAccess_(u, ids){
  const out = {};
  const byId = scrIndex_().byId;
  const owner = {};
  ids.forEach(function (id) { if (byId[id]) owner[id] = byId[id]; });
  let allow = null;
  const memo = {};
  if (u.prod) { const need = {}; Object.keys(owner).forEach(function (id) { if (owner[id].indexOf(PM_SCREEN_PREFIX) !== 0) need[owner[id].split("|")[0]] = 1; }); allow = Object.keys(need).length ? teamKeysFor_(u, need) : {}; }
  Object.keys(owner).forEach(function (id) {
    const k = owner[id];
    if (k.indexOf(PM_SCREEN_PREFIX) === 0) { if (pmScreenAllowed_(u, k, memo)) out[id] = k; return; } // v6: скрины мониторинга продюсера
    if (!allowedCity_(u, k.split("|")[0])) return;
    if (allow && !allow[k]) return;
    out[id] = k;
  });
  return out;
}
// Обновление 7: облегчённая копия для просмотра (Drive thumbnail, владелец = скрипт). Не вышло — сам файл.
function resizedBlob_(id, w){
  try {
    const r = UrlFetchApp.fetch("https://drive.google.com/thumbnail?id=" + encodeURIComponent(id) + "&sz=w" + w, {
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() }, muteHttpExceptions: true });
    statBump_("urlfetch");
    if (r.getResponseCode() === 200) {
      const b = r.getBlob().getBytes();
      if (b.length >= 4 && (b[0] & 255) === 0xFF && (b[1] & 255) === 0xD8) return r.getBlob(); // реальный JPEG, не HTML
    }
  } catch (e) {}
  try { return DriveApp.getFileById(id).getBlob(); } catch (e2) { return null; }
}
function thumb_(p, e) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const id = String(p.id || "").trim();
  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) return { error: "нет файла" };
  if (!screenAccess_(u, [id])[id]) return { error: "скрин не найден или нет доступа" };
  if (isVideoId_(id)) return { error: "это видео — открой его через просмотр видео" };
  try {
    // просмотр по умолчанию — до 1600 px (телефон не тянет 5–6 МБ в память); оригинал — только по full:true
    const w = Math.max(1, Math.min(2560, parseInt(p.w, 10) || 1600));
    const blob = String(p.full) === "1" ? DriveApp.getFileById(id).getBlob() : (resizedBlob_(id, w) || DriveApp.getFileById(id).getBlob());
    return { d: Utilities.base64Encode(blob.getBytes()) };
  } catch (err) {
    return { error: "файл недоступен" };
  }
}
// D: пачка миниатюр за один запрос (до 30 файлов, ~8 МБ на ответ)
function thumbs_(p, e) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const ids = (Array.isArray(p.ids) ? p.ids : []).map(String).filter(function (x) { return /^[A-Za-z0-9_-]{10,100}$/.test(x); }).slice(0, 30);
  if (!ids.length) return { d: {} };
  const acc = screenAccess_(u, ids);
  const d = {}, miss = [];
  let total = 0;
  // v6.5: миниатюры (до ~95 КБ) кэшируются на 6 ч — повторный показ и другие пользователи не ходят в Диск.
  // Доступ проверен выше по индексу (screenAccess_), кэш отдаётся только после этой проверки.
  let cache = null, hit = {};
  try { cache = CacheService.getScriptCache(); hit = cache.getAll(ids.filter(function (id) { return acc[id]; }).map(function (id) { return "th|" + id; })); } catch (e) { hit = {}; }
  const put = {};
  let hits = 0;
  ids.forEach(function (id) {
    if (!acc[id] || isVideoId_(id)) { miss.push(id); return; } // v6.6: видео — только через action video
    if (total > 8 * 1024 * 1024) return; // остальное клиент дозапросит
    const cached = hit["th|" + id];
    if (cached) { d[id] = cached; total += cached.length; hits++; return; }
    const tf = Date.now();
    try { const b = Utilities.base64Encode(DriveApp.getFileById(id).getBlob().getBytes()); total += b.length; d[id] = b; if (b.length < 95000) put["th|" + id] = b; statTime_("thumbfetch", Date.now() - tf); }
    catch (err) { miss.push(id); }
  });
  if (cache && Object.keys(put).length) { try { cache.putAll(put, 21600); } catch (e2) {} }
  if (hits) statBump_("thumbhit", hits);
  return { d: d, miss: miss };
}

// v6.6: просмотр видео (файл приватный — отдаём через сервер тем же, кому видны скрины команды)
function video_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const id = String(p.id || "").trim();
  if (!/^[A-Za-z0-9_-]{10,100}$/.test(id)) return { error: "нет файла" };
  if (!scrIndex_().video[id]) return { error: "это не видео" };
  if (!screenAccess_(u, [id])[id]) return { error: "видео не найдено или нет доступа" };
  try {
    const blob = DriveApp.getFileById(id).getBlob();
    const bytes = blob.getBytes();
    if (bytes.length > UPLOAD_MAX_VIDEO + 1024 * 1024) return { error: "видео слишком большое для просмотра" };
    const k = vidKind_(bytes);
    const CH = VIDEO_CHUNK, parts = Math.max(1, Math.ceil(bytes.length / CH));
    const part = Math.max(0, Math.min(parts - 1, parseInt(p.part, 10) || 0));
    return { d: Utilities.base64Encode(bytes.slice(part * CH, (part + 1) * CH)), part: part, parts: parts, size: bytes.length, mime: k ? k.mime : (blob.getContentType() || "video/mp4") };
  } catch (err) { return { error: "файл недоступен" }; }
}
var VIDEO_CHUNK = 4 * 1024 * 1024; // v6.6: видео отдаём кусками
function isVideoId_(id){ try { return !!scrIndex_().video[id]; } catch (e) { return false; } }

// ---------- GEMINI: единая функция, ключ только в Script Properties ----------
// C: лимиты длины текста — те же, что режет сайт (раньше сервер обрезал verdict/tonecheck сильнее, чем слал сайт)
var AI_TASKS = { screendraft: 10, verdict: 7000, summary: 4000, classify: 2000, framedraft: 0, weekgroup: 10000, chekdraft: 6000, search: 12000, weeklydelta: 6000, fullaudit: 8000, teamdelta: 8000, opadvice: 4000, tonecheck: 8000, catadvice: 2000 };
// C: запас токенов ответа (обрезанный JSON = «нестандартный ответ»)
var AI_OUT_TOKENS = { fullaudit: 4096, tonecheck: 2048, search: 2048, summary: 1536, weekgroup: 2048, teamdelta: 2048, weeklydelta: 1536, chekdraft: 2048, opadvice: 1536, framedraft: 1024, screendraft: 1536, verdict: 768, classify: 512 };
function geminiKey_() {
  try { return PropertiesService.getScriptProperties().getProperty("GEMINI_KEY") || ""; } catch (err) { return ""; }
}
function aiAllowed_(u, task) {
  if (!(task in AI_TASKS)) return false;
  if (task === "classify") return true; // «Предложение» доступно всем аккаунтам
  return !!u.edit; // остальные задачи — только редактор
}
function aiRateMax_(){ // v6.9: по умолчанию 200 вызовов в час на пользователя и задачу (было 20 — пакетный разбор упирался); свойство AI_RATE_HOUR меняет
  try { const v = parseInt(props_().getProperty("AI_RATE_HOUR"), 10); if (v > 0) return Math.min(v, 5000); } catch (e) {}
  return 200;
}
function aiRate_(user, task) { // защита от случайного зацикливания; реальный предел — суточная квота Google
  try {
    const c = CacheService.getScriptCache();
    const k = "aicnt_" + Utilities.base64EncodeWebSafe(String(user)).slice(0, 100) + "_" + task;
    const n = Number(c.get(k) || 0);
    if (n >= aiRateMax_()) return false;
    c.put(k, String(n + 1), 3600);
    return true;
  } catch (err) { return true; }
}
// список моделей можно переопределить свойством GEMINI_MODELS (через запятую); последняя — запасная
var AI_MODELS_DEFAULT = ["gemini-flash-latest", "gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-lite-latest"]; // v6.9: сначала Flash (умнее), при лимите — Flash-Lite
function aiModels_(){
  try {
    const v = String(props_().getProperty("GEMINI_MODELS") || "").split(",").map(function (x) { return x.trim(); }).filter(function (x) { return /^[\w.\-]+$/.test(x); });
    if (v.length) return v;
  } catch (e) {}
  return AI_MODELS_DEFAULT;
}
function geminiCall_(parts, isJson, maxKey) {
  const key = geminiKey_();
  if (!key) return { error: "ключ Gemini не настроен (Script Properties → GEMINI_KEY)" };
  const body = { contents: [{ parts: parts }], generationConfig: { temperature: 0.3, maxOutputTokens: (AI_OUT_TOKENS[maxKey] || 1024) } };
  if (isJson) body.generationConfig.responseMimeType = "application/json";
  const models = aiModels_();
  const t0 = Date.now();
  let lastErr = "";
  // C: перебор моделей: перегрузка/лимит — следующая; «модель не найдена»/400 — тоже следующая (раньше перебор обрывался);
  // общий бюджет ~55 с, чтобы уложиться во время ответа сайта
  for (let attempt = 0; attempt < models.length * 2; attempt++) {
    if (Date.now() - t0 > 55000) { lastErr = lastErr || "Gemini: нет ответа за 55 с"; break; }
    const model = models[attempt % models.length];
    try {
      // ключ — в заголовке, а не в адресе (адреса попадают в журналы)
      statBump_("ai"); statBump_("urlfetch");
      const r = UrlFetchApp.fetch("https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent", {
        method: "post", contentType: "application/json", payload: JSON.stringify(body), muteHttpExceptions: true,
        headers: { "x-goog-api-key": key }
      });
      const code = r.getResponseCode();
      if (code === 200) {
        const j = JSON.parse(r.getContentText());
        const cand = (j.candidates || [])[0] || {};
        const txt = ((cand.content || {}).parts || []).map(function (x) { return x.text || ""; }).join("");
        if (!txt) { lastErr = "Gemini: пустой ответ" + (cand.finishReason ? " (" + cand.finishReason + ")" : ""); continue; }
        return { text: txt };
      }
      lastErr = "Gemini: HTTP " + code + " — " + r.getContentText().slice(0, 100);
      if (code === 401 || code === 403) break; // ключ неверный — другие модели не помогут
      if (code !== 503 && code !== 429 && code !== 500 && attempt >= models.length - 1) break; // не перегрузка: каждую модель — один раз
      if (code !== 503 && code !== 429 && code !== 500) continue;
    } catch (err) { lastErr = "Gemini: " + String(err).slice(0, 120); }
    Utilities.sleep(1500);
  }
  return { error: lastErr };
}
// ===================== Обновление 6: провайдер ИИ и шаблоны промптов =====================
// AI_PROVIDER = gemini | grok (Script Property). Grok — xAI, OpenAI-совместимый /v1/chat/completions, ключ GROK_KEY,
// модель GROK_MODEL. Нет GROK_KEY — всегда Gemini. Ключи только в Script Properties, вызовы только с сервера.
// AI_PROMPTS — JSON {"задача":"шаблон"} переопределяет инструкцию задачи; {{text}} — место данных (нет — данные в конце);
// {{cats}} — список категорий. Шаблон обязан сохранить формат JSON-ответа задачи.
var DASH_CATS = ["Работа с ОКО","Общение с моделью","Общение с мемберами","Работа с голами","Шоу","Плейлист","Работа с сайтами / раскладка","Кадр / картинка","Комната"];
// v7.7: чек-лист НСК (VVCAM) — с недели, где в шапке листа стоят эти названия (включается кнопкой на сайте, новые недели наследуют шапку)
var DASH_CATS_NSK = ["Свет и кадр","Ловенс","Голы (5–10 подряд)","Боты","Блокнот и микрофон","Рабочие позиции (4+)","Посты в ленту (2+/день)","Модель ↔ мемберы","Оператор ↔ мемберы (1–5)"];
var CAT_COLS = [3, 4, 6, 7, 8, 9, 10, 11, 12]; // D, E, G..M — колонки 9 категорий (с 0)
function aiCats_(){ return __memo.aiSet === "nsk" ? DASH_CATS_NSK : DASH_CATS; }
// формат листа: "nsk" — новый чек-лист НСК (в шапке есть «Ловенс»), иначе ""
function sheetFmt_(name, hdrRow){
  __memo.fmt = __memo.fmt || {};
  if (Object.prototype.hasOwnProperty.call(__memo.fmt, name)) return __memo.fmt[name];
  let f = "";
  if (/Новосибирск/i.test(String(name))) {
    try {
      const h = hdrRow || SpreadsheetApp.getActive().getSheetByName(name).getRange(1, 1, 1, 21).getDisplayValues()[0];
      if (/ловенс/i.test(h.join(" "))) f = "nsk";
    } catch (e) {}
  }
  __memo.fmt[name] = f; return f;
}
var GROK_MODEL_DEFAULT = "grok-4";
var AI_PROVIDER_FORCE = ""; // на время одного вызова (режим сравнения); Apps Script выполняет запрос в одном потоке
function grokKey_(){ try { return props_().getProperty("GROK_KEY") || ""; } catch (e) { return ""; } }
function aiProvider_(){
  let v = ""; try { v = String(props_().getProperty("AI_PROVIDER") || "").trim().toLowerCase(); } catch (e) {}
  return (v === "grok" && grokKey_()) ? "grok" : "gemini";
}
function aiPrompts_(){
  if (__memo.aiPrompts) return __memo.aiPrompts;
  let o = {}; try { o = JSON.parse(props_().getProperty("AI_PROMPTS") || "{}") || {}; } catch (e) { o = {}; }
  __memo.aiPrompts = (o && typeof o === "object" && !Array.isArray(o)) ? o : {};
  return __memo.aiPrompts;
}
function aiPromptFill_(tpl, text){ // чистая
  const cats = aiCats_().map(function (c, i) { return i + " — " + c; }).join("; ");
  let s = String(tpl).split("{{cats}}").join(cats);
  if (s.indexOf("{{text}}") >= 0) s = s.split("{{text}}").join(String(text || ""));
  else if (text) s = s + " Данные: " + text;
  return s;
}
function aiPromptFor_(task, builtDefault, text){
  const o = aiPrompts_();
  const tpl = o[task];
  if (typeof tpl === "string" && tpl.trim().length >= 20) return aiPromptFill_(tpl.slice(0, 6000), text);
  return builtDefault;
}
function aiCall_(parts, isJson, maxKey){
  const pv = AI_PROVIDER_FORCE || aiProvider_();
  if (pv === "grok" && grokKey_()) {
    const r = grokCall_(parts, isJson, maxKey);
    if (!r.error || AI_PROVIDER_FORCE) return r;
    if (geminiKey_()) { const g = geminiCall_(parts, isJson, maxKey); if (!g.error) { g.fallback = "gemini"; return g; } }
    return r;
  }
  return geminiCall_(parts, isJson, maxKey);
}
function grokMessages_(parts){ // чистая: части Gemini → content OpenAI
  const content = [];
  (parts || []).forEach(function (x) {
    if (x.text) content.push({ type: "text", text: String(x.text) });
    else if (x.inlineData) content.push({ type: "image_url", image_url: { url: "data:" + (x.inlineData.mimeType || "image/jpeg") + ";base64," + x.inlineData.data, detail: "high" } });
  });
  return [{ role: "user", content: content }];
}
function grokCall_(parts, isJson, maxKey){
  const key = grokKey_();
  if (!key) return { error: "ключ Grok не настроен (Script Properties → GROK_KEY)" };
  let model = GROK_MODEL_DEFAULT; try { const m = String(props_().getProperty("GROK_MODEL") || "").trim(); if (/^[\w.\-]{2,60}$/.test(m)) model = m; } catch (e) {}
  const body = { model: model, messages: grokMessages_(parts), temperature: 0.3, max_tokens: (AI_OUT_TOKENS[maxKey] || 1024) };
  if (isJson) body.response_format = { type: "json_object" };
  let last = "";
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      statBump_("ai"); statBump_("urlfetch");
      const r = UrlFetchApp.fetch("https://api.x.ai/v1/chat/completions", { method: "post", contentType: "application/json",
        payload: JSON.stringify(body), muteHttpExceptions: true, headers: { Authorization: "Bearer " + key } });
      const code = r.getResponseCode();
      if (code === 200) {
        const j = JSON.parse(r.getContentText());
        const txt = String((((j.choices || [])[0] || {}).message || {}).content || "");
        if (!txt) { last = "Grok: пустой ответ"; continue; }
        return { text: txt };
      }
      last = "Grok: HTTP " + code + " — " + scrubSecrets_(r.getContentText().slice(0, 100));
      if (code === 400 && body.response_format) { delete body.response_format; continue; } // модель без json_object
      if (code === 401 || code === 403 || (code !== 429 && code < 500)) break;
    } catch (err) { last = "Grok: " + scrubSecrets_(String(err)); }
    Utilities.sleep(1500);
  }
  return { error: last };
}
// строгая нормализация черновика по скрину: ровно 9 категорий, состояние ok|warn|bad|unknown, замечание ≤ 160
function screenDraftNorm_(j){
  if (!j || typeof j !== "object") return null;
  const arr = Array.isArray(j.cats) ? j.cats : Array.isArray(j.categories) ? j.categories : null;
  if (!arr) return null;
  const CL = aiCats_();
  const out = CL.map(function (c, i) { return { i: i, cat: c, state: "unknown", remark: "" }; });
  arr.forEach(function (x, k) {
    if (!x || typeof x !== "object") return;
    let i = parseInt(x.i != null ? x.i : x.index, 10);
    if (isNaN(i)) { const nm = String(x.cat || x.name || ""); i = CL.indexOf(nm); if (i < 0) i = k; }
    if (i < 0 || i >= CL.length) return;
    const st = String(x.state || x.status || "").toLowerCase();
    out[i].state = /^(ok|норм|хорош)/.test(st) ? "ok" : /^(warn|замеч|недоч|мелоч)/.test(st) ? "warn" : /^(bad|плох|ошиб|проблем|крит)/.test(st) ? "bad" : "unknown";
    out[i].remark = String(x.remark || x.comment || "").replace(/\s+/g, " ").trim().slice(0, 160);
  });
  return { cats: out, summary: String(j.summary || "").slice(0, 300) };
}
var SCREEN_DRAFT_PROMPT = "Ты помогаешь смотрящему вебкам-студии разбирать работу команды оператор+модель по СКРИНУ трансляции. " +
  "Категории (номер — название): {{cats}}. По каждой категории оцени только то, что реально видно на скрине: " +
  "state = ok (видно, что всё хорошо), warn (замечание: мелочь, есть что поправить, но работа идёт), bad (плохо: явная ошибка или нарушение), unknown (по скрину не понять — например плейлист или работа с ОКО). " +
  "remark — одно короткое замечание по-русски (до 15 слов), без выдумок; для unknown — пусто. " +
  'Ответ строго JSON: {"cats":[{"i":0,"state":"ok|warn|bad|unknown","remark":"..."}],"summary":"одна фраза"} — ровно 9 элементов, i от 0 до 8.';
// ---------- ИИ: POST { action:"aiq", task, text?, id?, ckey? } → ответ сразу в теле ----------
function aiq_(p) {
  __memo.aiSet = String(p && p.set || "") === "nsk" ? "nsk" : ""; // v7.7: категории НСК для черновика по скрину
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const task = String(p.task || "");
  if (!aiAllowed_(u, task)) return { error: "нет доступа к этой задаче" };
  const ckey = String(p.ckey || "").slice(0, 300);
  const cacheKey = ckey ? "aic_" + hashHex_("ai", task + "|" + u.login + "|" + ckey).slice(0, 40) : "";
  if (cacheKey) {
    try {
      const hit = CacheService.getScriptCache().get(cacheKey);
      if (hit) return JSON.parse(hit); // C: ответ из кэша не тратит часовой лимит
    } catch (err) {}
  }
  if (!aiRate_(u.login, task)) return { error: "лимит ИИ на час исчерпан — попробуй позже" };
  const cap = AI_TASKS[task];
  const text = cap ? String(p.text || "").slice(0, cap) : "";
  const res = aiRun_(u, task, text, String(p.id || ""));
  if (!res.error && cacheKey) {
    try { CacheService.getScriptCache().put(cacheKey, JSON.stringify(res), 600); } catch (err) {}
  }
  return res;
}


function aiRun_(u, task, text, id) {
  // авторизация и лимит — в aiq_; u, задача и обрезанный текст приходят готовыми
  const id2 = id || "";
  const J = function (s) {
    try { return JSON.parse(s); } catch (err) {}
    // Gemini иногда оборачивает JSON в ```json ... ``` — вытаскиваем
    const m = String(s).match(/```(?:json)?\s*([\s\S]*?)```/);
    if (m) { try { return JSON.parse(m[1].trim()); } catch (err2) {} }
    // последний шанс: найти первый { и последний }
    const a = String(s).indexOf("{"), b = String(s).lastIndexOf("}");
    if (a >= 0 && b > a) { try { return JSON.parse(s.slice(a, b + 1)); } catch (err3) {} }
    return null;
  };
  if (task === "verdict") {
    if (!text) return { error: "нет текста" };
    const prompt = aiPromptFor_(task, "Ты помощник руководителя вебкам-студии. По тексту проверки команды определи вердикт: норма, замечание или критично. Пометка «⚠️» у категории — замечание (мелочь), «❌» — плохо (ошибка), «✅» — норма. " +
      "ВАЖНО: русское отрицание сильнее похвалы: «не», «нет», «нехорошо» делают текст плохим, «не хорошо» — НЕ зелёное. Но «нет замечаний», «без ошибок», «нет проблем» — это НОРМА. " +
      'Ответ строго JSON: {\"verdict\":\"норма|замечание|критично\",\"why\":\"одна короткая фраза почему\"}. Текст проверки: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !j.verdict) return { error: "Gemini: нестандартный ответ" };
    return { verdict: String(j.verdict), why: String(j.why || "") };
  }
  if (task === "summary") {
    if (!text) return { error: "нет цифр" };
    const prompt = aiPromptFor_(task, "Это уже посчитанные цифры по городу за неделю. Составь РОВНО 5 коротких строк «что горит» — только на основе этих цифр, " +
      'не придумывай новые числа и факты. Ответ строго JSON: {\"lines\":[\"...\",\"...\",\"...\",\"...\",\"...\"]}. Цифры: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !Array.isArray(j.lines)) return { error: "Gemini: нестандартный ответ" };
    return { lines: j.lines.slice(0, 5).map(String) };
  }
  if (task === "classify") {
    if (!text) return { error: "нет текста" };
    const prompt = aiPromptFor_(task, "Предложение пользователя дашборда. Определи: это баг (что-то сломалось или не работает) или идея (улучшение/пожелание). " +
      'Ответ строго JSON: {\"kind\":\"баг|идея\",\"title\":\"короткий заголовок до 6 слов\"}. Текст: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !j.kind) return { error: "Gemini: нестандартный ответ" };
    return { kind: String(j.kind), title: String(j.title || "") };
  }
  if (task === "screendraft") {
    const idv = String(id2 || "").trim();
    if (!idv || !/^[A-Za-z0-9_-]+$/.test(idv)) return { error: "нет скрина" };
    if (!screenAccess_(u, [idv])[idv]) return { error: "скрин не найден или нет доступа" };
    if (isVideoId_(idv)) return { error: "ИИ-разбор работает по скринам, не по видео" };
    let b64 = "", mime = "image/jpeg";
    try { const bb = DriveApp.getFileById(idv).getBlob().getBytes(); const kk = imgKind_(bb); if (kk) mime = kk.mime; b64 = Utilities.base64Encode(bb); }
    catch (err) { return { error: "файл недоступен" }; }
    const prompt = aiPromptFor_(task, aiPromptFill_(SCREEN_DRAFT_PROMPT, ""), "");
    const parts = [{ text: prompt }, { inlineData: { mimeType: mime, data: b64 } }];
    const one = function (pv) {
      AI_PROVIDER_FORCE = pv || "";
      try {
        const r = aiCall_(parts, true, task);
        if (r.error) return { error: r.error };
        const n = screenDraftNorm_(J(r.text));
        if (!n) return { error: "ИИ: нестандартный ответ" };
        n.provider = r.fallback || pv || aiProvider_();
        return n;
      } finally { AI_PROVIDER_FORCE = ""; }
    };
    return one("");
  }
  if (task === "framedraft") {
    const idv = String(id2 || "").trim();
    if (!idv || !/^[A-Za-z0-9_-]+$/.test(idv)) return { error: "нет скрина" };
    if (!screenAccess_(u, [idv])[idv]) return { error: "скрин не найден или нет доступа" };
    const sh = SpreadsheetApp.getActive().getSheetByName("Скрины");
    const sv = sh.getRange(2, 1, sh.getLastRow() - 1, 5).getValues();
    let b64 = "", miniLink = "";
    for (let i2 = 0; i2 < sv.length; i2++) {
      if (driveIdOf_(sv[i2][2]) === idv || driveIdOf_(sv[i2][4]) === idv) { miniLink = String(sv[i2][4] || ""); break; }
    }
    if (isVideoId_(idv)) return { error: "ИИ-разбор работает по скринам, не по видео" };
    let fmime = "image/jpeg";
    try { const bb = DriveApp.getFileById(idv).getBlob().getBytes(); const kk = imgKind_(bb); if (kk) fmime = kk.mime; b64 = Utilities.base64Encode(bb); }
    catch (err) { return { error: "файл недоступен" }; }
    const prompt = aiPromptFor_(task, "Скрин трансляции модели. Кратко перечисли (до 4 пунктов), что не так с КАДРОМ: темно, обрезано, неудачный ракурс, модели нет в кадре, плохой свет/цвет. " +
      "Не оценивай работу продюсера и не придумывай того, чего нет в кадре. Ответ строго JSON: {\"issues\":[\"...\"]}.", text);
    let r = aiCall_([{ text: prompt }, { inlineData: { mimeType: fmime, data: b64 } }], true, task);
    if (r.error && miniLink) { // запаска: мини-файл легче
      const miniId = miniLink.split("id=")[1] || "";
      if (miniId) {
        try { const bm = DriveApp.getFileById(miniId).getBlob().getBytes(); const km = imgKind_(bm); if (km) fmime = km.mime; b64 = Utilities.base64Encode(bm); } catch (err2) {}
        r = aiCall_([{ text: prompt }, { inlineData: { mimeType: fmime, data: b64 } }], true, task);
      }
    }
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !Array.isArray(j.issues)) return { error: "Gemini: нестандартный ответ" };
    return { issues: j.issues.slice(0, 4).map(String) };
  }
  if (task === "weekgroup") {
    if (!text) return { error: "нет замечаний" };
    const prompt = aiPromptFor_(task, "Это замечания по командам города за неделю, по одной на строку. Сгруппируй ПОХОЖИЕ темы: не перечисляй каждое отдельно, " +
      'объедини в 3-5 тем. count бери только из данных. Ответ строго JSON: {\"groups\":[{\"title\":\"короткая тема\",\"count\":N}]}. Строки: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !Array.isArray(j.groups)) return { error: "Gemini: нестандартный ответ" };
    return { groups: j.groups.slice(0, 5) };
  }
  if (task === "chekdraft") {
    if (!text) return { error: "нет критичных пунктов" };
    const prompt = aiPromptFor_(task, "Это критичные пункты проверки команды. Составь короткий черновик плана повышения чека: 2-4 конкретных пункта. " +
      'Ответ строго JSON: {\"text\":\"черновик\"} (можно с переносами строк). Пункты: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !j.text) return { error: "Gemini: нестандартный ответ" };
    return { text: String(j.text) };
  }
  if (task === "search") {
    if (!text) return { error: "нет запроса" };
    const prompt = aiPromptFor_(task, "Первая строка — смысловой запрос по проверкам команд, дальше пронумерованные строки команд с их текстами проверок. " +
      'Найди команды, подходящие по СМЫСЛУ запроса (например «плохо общается, но шоу нормальное»). Только из списка, максимум 5. ' +
      'Ответ строго JSON: {\"matches\":[{\"i\":номер_строки,\"why\":\"коротко почему подходит\"}]}. Данные: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !Array.isArray(j.matches)) return { error: "Gemini: нестандартный ответ" };
    return { matches: j.matches.slice(0, 5) };
  }
  if (task === "weeklydelta") {
    if (!text) return { error: "нет цифр" };
    const prompt = aiPromptFor_(task, "Это уже посчитанные цифры по каждой компании за ЭТУ неделю и за ПРОШЛУЮ. Перескажи ТОЛЬКО на основе этих цифр, " +
      "что изменилось по каждой компании — до 5 коротких строк. Новые числа и факты НЕ придумывай. " +
      'Если прошлой недели нет — так и напиши. Ответ строго JSON: {\"lines\":[\"...\",\"...\",\"...\",\"...\",\"...\"]}. Цифры: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !Array.isArray(j.lines)) return { error: "Gemini: нестандартный ответ" };
    return { lines: j.lines.slice(0, 5).map(String) };
  }
    if (task === "fullaudit") {
    if (!text) return { error: "нет текста" };
    const prompt = aiPromptFor_(task, "Ты помогаешь руководителю вебкам-студии проверять команды. Вот текст проверки команды по категориям, общий комментарий и рекомендации. " +
      "Найди ВСЕ ошибки и проблемы в любом из полей. КАТЕГОРИИ (используй только их): Работа с ОКО; Общение с моделью; Общение с мемберами; Работа с голами; Шоу; Плейлист; Работа с сайтами / раскладка; Кадр / картинка; Комната; Общий комментарий; Рекомендации. " +
      "ВАЖНО: русское отрицание сильнее похвалы («не», «нет» делают текст плохим), но «нет замечаний», «без ошибок», «нет проблем» — это НОРМА, не ошибка. " +
      "Для каждой ошибки: категория из списка, КОРОТКАЯ цитата из текста, почему это проблема, что конкретно поправить. " +
      "Затем перепиши общий комментарий коротко и по делу (пустая строка — если комментария не было). " +
      'Ответ строго JSON: {"errors":[{"category":"...","quote":"...","why":"...","fix":"..."}],"general_comment":"..."}. Ошибок нет — errors: []. Текст: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !Array.isArray(j.errors)) return { error: "Gemini: нестандартный ответ" };
    return { errors: j.errors.slice(0, 20).map(function (e2) { return { category: String(e2.category || ""), quote: String(e2.quote || ""), why: String(e2.why || ""), fix: String(e2.fix || "") }; }), general_comment: String(j.general_comment || "") };
  }
  if (task === "teamdelta") {
    if (!text) return { error: "нет текста" };
    const prompt = aiPromptFor_(task, "Сравни проверки ОДНОЙ команды за эту неделю и за прошлую (текст ниже). Отвечай ТОЛЬКО на основе данных, ничего не придумывай. «Нет замечаний» — норма. " +
      'Ответ строго JSON: {"better":["..."],"worse":["..."],"same":["..."],"missing":false}. Прошлой недели нет — {"missing":true}. Текст: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j) return { error: "Gemini: нестандартный ответ" };
    if (j.missing) return { missing: true };
    const A = function (x) { return Array.isArray(x) ? x.map(String).slice(0, 6) : []; };
    return { better: A(j.better), worse: A(j.worse), same: A(j.same) };
  }
  if (task === "opadvice") {
    if (!text) return { error: "нет текста" };
    const prompt = aiPromptFor_(task, "Это замечания по работе оператора команды. Дай 3 коротких совета оператору простыми словами: без оценок, без цифр и без внутренних терминов дашборда, по делу и уважительно. " +
      'Ответ строго JSON: {"tips":["...","...","..."]}. Замечания: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !Array.isArray(j.tips)) return { error: "Gemini: нестандартный ответ" };
    return { tips: j.tips.map(String).slice(0, 3) };
  }
  if (task === "catadvice") { // v7.3: совет команде по одной категории — для заметки «💡 Совет» под категорией
    if (!text) return { error: "нет текста" };
    const prompt = aiPromptFor_(task, "Ты опытный продюсер вебкам-студии. Ниже — категория разбора команды оператор+модель и что увидел смотрящий. " +
      "Напиши ОДИН совет команде: что конкретно делать иначе, 1–2 коротких предложения, простыми словами, на «вы» или безлично, без оценок, без цифр и без слов «замечание», «плохо», «смотрящий». " +
      "Если в тексте есть пример правильной формулировки — используй его. " +
      'Ответ строго JSON: {"tip":"..."}. Данные: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j || !String(j.tip || "").trim()) return { error: "ИИ: нестандартный ответ" };
    return { tip: String(j.tip).replace(/\s+/g, " ").trim().slice(0, 400) };
  }
  if (task === "tonecheck") {
    if (!text) return { error: "нет текста" };
    const prompt = aiPromptFor_(task, "Проверь ТОН общего комментария к проверке команды (ниже; после «КАТЕГОРИИ:» — краткий разбор по категориям для проверки противоречий). " +
      "Найди: оскорбления/грубость; общие слова без конкретики («плохо», «не очень») без объяснения; противоречия с разбором по категориям. " +
      "Для каждого места: цитата, почему проблема, вариант переписанной фразы. Затем предложи переписанный ВЕСЬ комментарий (пустая строка — если менять нечего). " +
      'Ответ строго JSON: {"issues":[{"quote":"...","why":"...","suggestion":"..."}],"rewritten":"..."}. Всё хорошо — issues: [], rewritten: "". Текст: ' + text, text);
    const r = aiCall_([{ text: prompt }], true, task);
    if (r.error) return { error: r.error };
    const j = J(r.text);
    if (!j) return { error: "Gemini: нестандартный ответ" };
    return { issues: Array.isArray(j.issues) ? j.issues.slice(0, 10) : [], rewritten: String(j.rewritten || "") };
  }
    return { error: "неизвестная задача" };
}

// ---------- МОИ ЗАДАЧИ (лист «Задачи»: продюсер видит только свои) ----------
// A ключ «лист|ник|модель», B город, C продюсер, D ник, E модель, F что исправить,
// G от кого, H когда поставлена, I статус (открыта/сделана), J когда сделано
function ensureTasksSheet_(ss) {
  return ensureSheet_(ss, "Задачи", ["Ключ","Компания","Продюсер","Ник","Модель","Что исправить","От кого","Когда","Статус","Сделано"]);
}
function taskadd_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "задачи ставит только редактор" };
  if (!writableSheet_("Задачи")) return { error: "в этот лист писать нельзя" };
  const text = String(p.text || "").trim().slice(0, 500);
  if (!text) return { error: "пустая задача" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const ss = SpreadsheetApp.getActive();
    const sh = ensureTasksSheet_(ss);
    if (!writableSheet_(p.sheet) || !isTeamSheet_(p.sheet)) return { error: "не указана команда" };
    const key = String(p.sheet || "") + "|" + String(p.nick || "").trim() + "|" + String(p.model || "").trim();
    if (key.indexOf("|") < 2) return { error: "не указана команда" };
    const city = allowedCity_(u, p.sheet);
    if (!city) return { error: "нет доступа к этой компании" };
    // одна открытая задача на команду: если есть — дописываем текст отдельной строкой нельзя, обновляем
    const last = sh.getLastRow();
    if (last >= 2) {
      const vals = sh.getRange(2, 1, last - 1, 9).getValues();
      for (let i = 0; i < vals.length; i++) {
        if (String(vals[i][0]).trim() === key && String(vals[i][8]) === "открыта") {
          // B: открытая задача НЕ перезаписывается молча — клиент спрашивает: дописать или заменить
          const mode = String(p.mode || "");
          if (mode !== "append" && mode !== "replace")
            return { conflict: true, existing: { text: String(vals[i][5] || ""), from: String(vals[i][6] || ""), when: String(vals[i][7] || "") } };
          const newText = mode === "append" ? (String(vals[i][5] || "") + "\n" + text).slice(0, 2000) : text;
          sh.getRange(i + 2, 6, 1, 3).setValues([[notFormula_(newText), notFormula_(u.name || u.login), textCell_(nowTxt_())]]);
          return { ok: true, updated: true };
        }
      }
    }
    sh.appendRow([notFormula_(key), city, notFormula_(String(p.producer || "")), notFormula_(String(p.nick || "")), notFormula_(String(p.model || "")), notFormula_(text),
      notFormula_(u.name || u.login), textCell_(nowTxt_()), "открыта", ""]);
    return { ok: true };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
// задачи адресуются номером строки листа «Задачи» — сверяем ключ команды задачи (tkey), чтобы не закрыть чужую
function taskRowError_(vals, p){
  if (p.tkey === undefined) return "страница устарела — обнови её (Ctrl+F5)";
  return String(vals[0] || "").trim() === String(p.tkey).trim() ? "" : "список задач изменился — обнови данные и повтори";
}
function taskdone_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit && !u.prod) return { error: "закрыть задачу может только её продюсер или редактор" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const ss = SpreadsheetApp.getActive();
    const sh = ensureTasksSheet_(ss);
    const row = parseInt(p.row, 10);
    if (!row || row < 2 || row > sh.getLastRow()) return { error: "задача не найдена" };
    const vals = sh.getRange(row, 1, 1, 9).getValues()[0];
    const terr = taskRowError_(vals, p);
    if (terr) return { error: terr };
    const tk = String(vals[0] || "").trim(), tsh = tk.split("|")[0], need = {}; need[tsh] = 1;
    const own = !!u.prod && !!teamKeysFor_(u, need)[tk]; // v6.9: закрыть может продюсер, чья команда сейчас (как и видимость задачи)
    const editorOfCity = !!u.edit && !!allowedCity_(u, String(vals[0] || "").split("|")[0]);
    if (!own && !editorOfCity) return { error: u.prod ? "это не твоя задача" : "нет доступа к этой компании" };
    sh.getRange(row, 9, 1, 2).setValues([["сделана", textCell_(nowTxt_())]]);
    return { ok: true };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
function taskreopen_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "вернуть в работу может только редактор" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const ss = SpreadsheetApp.getActive();
    const sh = ensureTasksSheet_(ss);
    const row = parseInt(p.row, 10);
    if (!row || row < 2 || row > sh.getLastRow()) return { error: "задача не найдена" };
    const vals = sh.getRange(row, 1, 1, 9).getValues()[0];
    const terr = taskRowError_(vals, p);
    if (terr) return { error: terr };
    if (!allowedCity_(u, String(vals[0] || "").split("|")[0])) return { error: "нет доступа к этой компании" };
    sh.getRange(row, 9).setValue("открыта");
    sh.getRange(row, 10).setValue("");
    return { ok: true };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
// задача 2a: «сирота» — задача, чьей команды (лист|ник|модель) больше нет в таблице.
// Ничего не удаляется автоматически: продюсеру сироты не отдаются, смотрящий видит их с пометкой и удаляет сам (taskdel).
function teamKeySetLc_(sheetsNeed){
  const set = {};
  Object.keys(teamKeysFor_({ cities: "all", prod: "" }, sheetsNeed)).forEach(function (k) { set[k.toLowerCase()] = 1; });
  return set;
}
function prodTasks_(u, list){ // v6.9: задача видна продюсеру, только если команда сейчас в ЕГО блоке (и ни у кого больше)
  if (!u.prod || !list.length) return list;
  const need = {}; list.forEach(function (t) { const sh = String(t.key || "").split("|")[0]; if (sh) need[sh] = 1; });
  const own = teamKeysFor_(u, need);
  return list.filter(function (t) { return own[String(t.key || "").trim()]; });
}
function tasksFor_(u, ss) {
  const out2 = [];
  const sh = ss ? ss.getSheetByName("Задачи") : null;
  const last = sh ? sh.getLastRow() : 0;
  if (sh && last >= 2) {
    const tv = sh.getRange(2, 1, last - 1, 10).getDisplayValues();
    tv.forEach(function (r, i) {
      if (!String(r[5] || "").trim()) return; // пустые строки не отдаём
      const status = String(r[8] || "").trim() || "открыта";
      // v6.9: продюсеру — по тому, чья команда СЕЙЧАС (prodTasks_), а не по колонке «Продюсер» (она могла устареть или быть пустой)
      const tkey = String(r[0] || "").trim();
      if (!u.prod && u.cities !== "all" && !allowedCity_(u, tkey.split("|")[0])) return; // B6: только свои компании
      out2.push({ row: i + 2, key: tkey, sheet: tkey.split("|")[0], city: String(r[1] || ""), producer: String(r[2] || ""),
        nick: String(r[3] || ""), model: String(r[4] || ""), text: String(r[5] || ""),
        from: String(r[6] || ""), when: String(r[7] || ""), status: status, done: String(r[9] || "") });
    });
  }
  if (out2.length) {
    let exist = null;
    try {
      const need = {}; out2.forEach(function (t) { if (t.sheet) need[t.sheet] = 1; });
      exist = teamKeySetLc_(need);
    } catch (e) { exist = null; } // не смогли проверить — никого не прячем
    if (exist) out2.forEach(function (t) { t.orphan = t.key.split("|").length !== 3 || !exist[t.key.toLowerCase()]; });
  }
  return u.prod ? out2.filter(function (t) { return !t.orphan; }) : out2;
}
// задача 2a: удалить ОДНУ задачу — только редактор, со сверкой ключа строки и компании (вызывается после confirm на сайте)
function taskdel_(p) {
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "удалять задачи может только редактор" };
  if (!writableSheet_("Задачи")) return { error: "в этот лист писать нельзя" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = SpreadsheetApp.getActive().getSheetByName("Задачи");
    const row = parseInt(p.row, 10);
    if (!sh || !row || row < 2 || row > sh.getLastRow()) return { error: "задача не найдена" };
    const vals = sh.getRange(row, 1, 1, 10).getDisplayValues()[0];
    const terr = taskRowError_(vals, p);
    if (terr) return { error: terr };
    const city = String(vals[0] || "").split("|")[0];
    if (u.cities !== "all" && !allowedCity_(u, city)) return { error: "нет доступа к этой компании" };
    sh.deleteRow(row);
    return { ok: true };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}
// разовая чистка дублей в «Скринах» (редактор): одинаковые ключ+ссылка — остаётся последняя
function scrub_(p, e) {
  const u = getUser_(p);
  if (!u || !u.edit) return { error: "только редактор" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sh = SpreadsheetApp.getActive().getSheetByName("Скрины");
    if (!sh || sh.getLastRow() < 2) return { ok: true, removed: 0 };
    const sv = sh.getRange(2, 1, sh.getLastRow() - 1, 3).getValues();
    const seen = {}, dup = {};
    for (let i = sv.length - 1; i >= 0; i--) { // остаётся последняя запись
      const k = String(sv[i][0] || "").trim() + "|" + String(sv[i][2] || "").trim();
      if (seen[k]) dup[i] = 1; else seen[k] = 1;
    }
    const removed = deleteRowsWhere_(sh, 2, sv, function (r, i) { return !!dup[i]; });
    return { ok: true, removed: removed };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} }
}

// ---------- ВЫВОД (JSON / JSONP) ----------
// ---------- задача 5: РАСПИСАНИЯ КОМАНД (3 отдельные таблицы) ----------
// КАТЕГОРИЧЕСКИ ТОЛЬКО ЧТЕНИЕ. К таблицам расписаний обращается только обёртка schedRO_ — в ней есть лишь методы чтения,
// сырые Spreadsheet/Sheet наружу не выходят. Проверка: grep блока между маркерами не должен находить ни одного метода записи.
// id таблиц — Script Property SCHEDULE_IDS (JSON {"Онлайн":"…","Новосибирск":"…","Томск":"…"}), раскладка — SCHED_DEFAULT,
// переопределение — Script Property SCHEDULE_CONFIG (JSON по компаниям).
// === РАСПИСАНИЯ (ТОЛЬКО ЧТЕНИЕ) — начало ===
var SCHED_DEFAULT = {
  "Онлайн":      { layout: "grid4w", opCol: 2, colsPerDay: 3, dateRow: 0, firstDataRow: 0, legendStartRow: 0, skipHidden: true },
  "Новосибирск": { layout: "stacked", sheet: "КОМАНДЫ ", dateCol: 1, labelCol: 0, firstPairCol: 3, lastCol: 88, skipHidden: true },
  "Томск":       { layout: "stacked", sheet: "Расписание 26", dateCol: 1, labelCol: 0, firstPairCol: 3, lastCol: 88, skipHidden: true }
};
var SCHED_TTL = 300; // 5 минут: таблицы правят в течение дня
function schedIds_(){ try { return JSON.parse(props_().getProperty("SCHEDULE_IDS") || "{}") || {}; } catch (e) { return {}; } }
function schedCfg_(company){
  let o = {};
  try { o = (JSON.parse(props_().getProperty("SCHEDULE_CONFIG") || "{}") || {})[company] || {}; } catch (e) { o = {}; }
  return Object.assign({}, SCHED_DEFAULT[company] || {}, o);
}
function schedRO_(company){
  const id = String(schedIds_()[company] || "").trim();
  if (!/^[\w-]{20,}$/.test(id)) throw new Error("не задан id расписания для " + sheetLabel_(company) + " (Script Properties → SCHEDULE_IDS)");
  if (id === SpreadsheetApp.getActive().getId()) throw new Error("SCHEDULE_IDS указывает на таблицу дашборда — так нельзя");
  let ss;
  try { ss = SpreadsheetApp.openById(id); }
  catch (e) { throw new Error("нет доступа к таблице расписания " + sheetLabel_(company) + " — проверь доступ владельца скрипта"); }
  const memo = {};
  const sh = function (name) {
    if (memo[name]) return memo[name];
    const s = ss.getSheetByName(name);
    if (!s) throw new Error("лист «" + name + "» не найден в расписании " + sheetLabel_(company));
    memo[name] = s; return s;
  };
  return {
    fileId: id, // для комментариев Drive (только чтение)
    sheetNames: function () { return ss.getSheets().map(function (s) { return s.getName(); }); },
    lastRow:    function (n) { return sh(n).getLastRow(); },
    lastCol:    function (n) { return sh(n).getLastColumn(); },
    display:    function (n, r, c, nr, nc) { return sh(n).getRange(r, c, nr, nc).getDisplayValues(); },
    fontLines:  function (n, r, c, nr, nc) { return sh(n).getRange(r, c, nr, nc).getFontLines(); },
    hidden:     function (n, r) { const s = sh(n); return s.isRowHiddenByUser(r) || s.isRowHiddenByFilter(r); }
  };
}
// C: причины отписок из комментариев к файлу расписания (Drive API v3, только чтение).
// Если нет scope / 403 — тихий пустой список, страница не падает.
// Обновление 5 (AUDIT4 P1-3): комментарии Drive — постранично (pageToken), только изменённые в окне вокруг
// запрошенных дат (startModifiedTime), с бюджетом времени и компактным кэшем по кускам (cachePutBig_).
var SCHED_COMMENT_PAGES = 15, SCHED_COMMENT_BUDGET_MS = 12000, SCHED_COMMENT_BEFORE_DAYS = 14;
function schedCommentsWindow_(dates){
  const ds = (dates || []).filter(Boolean).slice().sort();
  if (!ds.length) return null;
  const from = schedParseYmd_(ds[0]); if (!from) return null;
  from.setDate(from.getDate() - SCHED_COMMENT_BEFORE_DAYS);
  return Utilities.formatDate(from, "UTC", "yyyy-MM-dd") + "T00:00:00Z";
}
function schedComments_(fileId, dates){
  const since = schedCommentsWindow_(dates) || "";
  const key = "schc2|" + hashHex_("schc", String(fileId) + "|" + since).slice(0, 32);
  try { const hit = cacheGetBig_(key); if (hit) return JSON.parse(hit); } catch (e) {}
  const list = [];
  const t0 = Date.now();
  let token = "", pages = 0, complete = true;
  try {
    do {
      if (Date.now() - t0 > SCHED_COMMENT_BUDGET_MS) { complete = false; break; }
      const url = "https://www.googleapis.com/drive/v3/files/" + encodeURIComponent(fileId)
        + "/comments?fields=nextPageToken,comments(content,quotedFileContent/value,createdTime,modifiedTime)&pageSize=100&includeDeleted=false"
        + (since ? "&startModifiedTime=" + encodeURIComponent(since) : "")
        + (token ? "&pageToken=" + encodeURIComponent(token) : "");
      statBump_("urlfetch");
      const r = UrlFetchApp.fetch(url, { method: "get", headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() }, muteHttpExceptions: true });
      if (r.getResponseCode() !== 200) { complete = false; break; }
      const j = JSON.parse(r.getContentText() || "{}");
      (j.comments || []).forEach(function (x) {
        const c = String(x.content || "").replace(/\s+/g, " ").trim();
        if (!c) return;
        const t = String(x.modifiedTime || x.createdTime || "");
        if (since && t && t < since) return; // на случай, если фильтр API не сработал
        list.push({ q: x.quotedFileContent ? String(x.quotedFileContent.value || "").trim().slice(0, 80) : "", c: c.slice(0, 200), t: t.slice(0, 10) });
      });
      token = String(j.nextPageToken || "");
      pages++;
    } while (token && pages < SCHED_COMMENT_PAGES);
    if (token) complete = false;
  } catch (e2) { complete = false; }
  const res = { list: list, complete: complete, pages: pages };
  try { cachePutBig_(key, JSON.stringify(res), SCHED_TTL); } catch (e3) {}
  return res;
}
function schedDayDiff_(a, b){
  const x = schedParseYmd_(a), y = schedParseYmd_(b);
  if (!x || !y) return 999;
  return Math.round(Math.abs(x.getTime() - y.getTime()) / 864e5);
}
function schedNameIn_(hay, name){
  const n = String(name || "").toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!n) return false;
  return new RegExp("(^|[^а-яёa-z])" + n + "(?![а-яёa-z])", "i").test(String(hay || "").toLowerCase());
}
// привязать reason к зачёркнутым сменам: нужна цитата с фамилией И дата комментария не дальше 3 дней от дня смены
function schedAttachReasons_(shifts, comments, ymd){
  const list = Array.isArray(comments) ? comments : (comments && comments.list) || [];
  if (!shifts || !list.length) return;
  shifts.forEach(function (s) {
    if (!s.struck || s.reason) return;
    const raw = String(s.raw || "").toLowerCase();
    const names = (s.names || []).map(function (n) { return String(n).toLowerCase(); });
    let best = "", bestScore = 0;
    list.forEach(function (c) {
      const q = String(c.q != null ? c.q : c.quoted || "").toLowerCase();
      const body = String(c.c != null ? c.c : c.content || "");
      if (!body || !q) return;
      let score = 0;
      if (raw && schedNameIn_(q, raw)) score += 4;
      else if (names.some(function (n) { return schedNameIn_(q, n); })) score += 3;
      else return; // без цитаты с фамилией — слишком неуверенно
      const t = String(c.t || c.modifiedTime || c.createdTime || "").slice(0, 10);
      const dd = ymd ? schedDayDiff_(t, ymd) : 999;
      if (dd > 3) return; // AUDIT4 P2-1: старые комментарии не прилипают к новым отпискам
      score += dd === 0 ? 3 : dd === 1 ? 2 : 1;
      if (score > bestScore) { bestScore = score; best = body; }
    });
    if (best) s.reason = best.slice(0, 200);
  });
}
// «Бубенцова 2/5» → {names:["Бубенцова"], shiftNo:"2/5"}; «Тришина/Воронина» — одна смена на двоих; «NEW» — новенькая
function schedNames_(raw){
  let s = String(raw || "").replace(/\s+/g, " ").trim(); if (!s) return null;
  const isNew = /(^|[^A-Za-z])NEW([^A-Za-z]|$)/i.test(s);
  s = s.replace(/(^|[^A-Za-z])NEW(?=[^A-Za-z]|$)/ig, "$1").trim();
  const m = s.match(/\s+(\d+(?:\/\d+)?)\s*$/); const shiftNo = m ? m[1] : "";
  if (m) s = s.slice(0, m.index).trim();
  const names = s.split("/").map(function (x) { return x.replace(/\s+\d+(?:\/\d+)?$/, "").trim(); }).filter(Boolean);
  return names.length ? { names: names, shiftNo: shiftNo, isNew: isNew } : null;
}
function schedYmd_(d){ return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function schedParseYmd_(s){ const m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})$/); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }
// дата из ячейки: «26.09.2026», «26.09.26», «26.09» (без года — year по умолчанию) → "yyyy-mm-dd" или ""
function schedCellDate_(v, year){
  const m = String(v || "").match(/(^|[^\d])(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?(?![\d])/);
  if (!m) return "";
  const d = +m[2], mo = +m[3];
  if (d < 1 || d > 31 || mo < 1 || mo > 12) return "";
  let y = m[4] ? (m[4].length === 2 ? 2000 + +m[4] : +m[4]) : (year || 0);
  if (!y) return "";
  return y + "-" + ("0" + mo).slice(-2) + "-" + ("0" + d).slice(-2);
}
// DIAMOND: лист 4-недельного периода по имени «дд.мм-дд.мм», в который попадает дата (с переходом через Новый год)
function schedPeriodSheet_(names, target){
  for (let i = 0; i < names.length; i++) {
    const m = String(names[i]).trim().match(/^(\d{1,2})\.(\d{1,2})\s*-\s*(\d{1,2})\.(\d{1,2})$/);
    if (!m) continue;
    const ys = [target.getFullYear(), target.getFullYear() - 1];
    for (let k = 0; k < ys.length; k++) {
      const a = new Date(ys[k], +m[2] - 1, +m[1]);
      let b = new Date(ys[k], +m[4] - 1, +m[3]);
      if (b < a) b = new Date(ys[k] + 1, +m[4] - 1, +m[3]);
      if (target >= a && target <= b) return { name: names[i], start: a, end: b };
    }
  }
  return null;
}
// лист для «стопочной» раскладки: точное имя → без пробелов/регистра → первый лист, где в колонке A есть даты
function schedStackedSheet_(ro, cfg){
  const names = ro.sheetNames();
  const want = String(cfg.sheet || "");
  if (want && names.indexOf(want) >= 0) return want;
  const norm = function (x) { return String(x).trim().toLowerCase().replace(/ё/g, "е"); };
  for (let i = 0; i < names.length; i++) if (want && norm(names[i]) === norm(want)) return names[i];
  for (let j = 0; j < names.length; j++) {
    const lr = ro.lastRow(names[j]); if (lr < 3) continue;
    const col = ro.display(names[j], 1, cfg.dateCol || 1, Math.min(lr, 400), 1);
    let hits = 0;
    for (let r = 0; r < col.length && hits < 3; r++) if (schedCellDate_(col[r][0], 0)) hits++;
    if (hits >= 3) return names[j];
  }
  return "";
}
var SCHED_TIME_RE = /\d{1,2}[:.]\d{2}/;
// Обновление 5: «время смены» — и «21:00–04:00», и «21-04» / «9 - 18»
function schedHasTime_(t){ const s = String(t || ""); return SCHED_TIME_RE.test(s) || /\d{1,2}\s*[-–—]\s*\d{1,2}/.test(s); }
var SCHED_HDR_RE = /^(модел|фамил|время|смена|смены|статус|оператор|дата)/i; // подписи шапки — не фамилии
// подписи статусов легенды DIAMOND в 3-й колонке дня (не реальные смены)
var SCHED_LEGEND_STATUS_RE = /^(отписк|невыход|больничн|выходн|отпуск|замен|появл|нет на смене|на смене|перерыв|смен[аы])(?![а-яёa-z])/i;
var SCHED_LEGEND_NAME_RE = /^матвеева(?![а-яёa-z0-9])/i; // шаблон легенды ( в JS не работает с кириллицей)
// строка легенды: подпись статуса без времени/смены ИЛИ «Матвеева» без времени; реальная смена (время + фамилия) — не легенда
function schedIsLegendRow_(v, r, dayCols, per, opc){
  let anyReal = false, legendHit = false, caps = 0;
  for (let q = 0; q < dayCols.length; q++) {
    const c0 = dayCols[q];
    const time = String(v[r][c0] || "").trim();
    const name = String(v[r][c0 + 1] || "").trim();
    const st = per > 2 ? String(v[r][c0 + 2] || "").trim() : "";
    const hasTime = schedHasTime_(time);
    // шаблон «Матвеева» без времени — легенда (не путать с реальной сменой)
    if (name && SCHED_LEGEND_NAME_RE.test(name) && !hasTime) legendHit = true;
    else if (name && (hasTime || schedNames_(name))) anyReal = true;
    if (st && SCHED_LEGEND_STATUS_RE.test(st) && !hasTime) {
      if (!name || SCHED_LEGEND_NAME_RE.test(name) || !schedNames_(name)) { legendHit = true; caps++; }
    }
  }
  if (anyReal) return false;
  if (legendHit) return true;
  return caps >= 2;
}
function schedGrid_(ro, cfg, dates){
  const out = { days: [], sheets: [] };
  const names = ro.sheetNames();
  const groups = {}; // лист → даты
  const order = [];
  dates.forEach(function (d) {
    const p = schedPeriodSheet_(names, d);
    const ymd = schedYmd_(d);
    if (!p) { out.days.push({ date: ymd, shifts: [], error: "нет листа периода, в который попадает " + ymd.split("-").reverse().join(".") }); return; }
    if (!groups[p.name]) { groups[p.name] = { p: p, ds: [] }; order.push(p.name); }
    groups[p.name].ds.push(d);
  });
  order.forEach(function (name) {
    const g = groups[name];
    out.sheets.push(name);
    const lr = ro.lastRow(name), lc = Math.min(ro.lastCol(name), 400);
    if (lr < 2 || lc < 3) { g.ds.forEach(function (d) { out.days.push({ date: schedYmd_(d), shifts: [], error: "лист «" + name + "» пустой" }); }); return; }
    const v = ro.display(name, 1, 1, lr, lc);
    const fl = ro.fontLines(name, 1, 1, lr, lc);
    // строка дат: из конфига или первая из 8 строк, где ≥3 ячеек-дат
    let dateRow = (cfg.dateRow || 0) - 1;
    if (dateRow < 0) {
      for (let r = 0; r < Math.min(8, lr); r++) {
        let n = 0; for (let c = 0; c < lc; c++) if (/^\s*\d{1,2}\.\d{1,2}/.test(v[r][c])) n++;
        if (n >= 3) { dateRow = r; break; }
      }
    }
    if (dateRow < 0) { g.ds.forEach(function (d) { out.days.push({ date: schedYmd_(d), shifts: [], error: "в листе «" + name + "» не найдена строка с датами — задай dateRow в SCHEDULE_CONFIG" }); }); return; }
    const colOf = {}; // "yyyy-mm-dd" → колонка (0-based) ячейки с датой
    for (let c = 0; c < lc; c++) {
      const raw = v[dateRow][c];
      if (!/^\s*\d{1,2}\.\d{1,2}/.test(raw)) continue;
      // год берём из периода листа: месяц раньше месяца начала → следующий год
      const mm = +String(raw).trim().split(".")[1];
      const yr = (mm < g.p.start.getMonth() + 1) ? g.p.start.getFullYear() + 1 : g.p.start.getFullYear();
      const ymd = schedCellDate_(raw, yr);
      if (ymd && colOf[ymd] === undefined) colOf[ymd] = c;
    }
    // первая строка данных и смещение «время/фамилия/статус» относительно ячейки даты — по тому, где чаще стоит время
    let first = (cfg.firstDataRow || 0) - 1;
    if (first < 0) first = dateRow + 1;
    const anyCol = Object.keys(colOf).map(function (k) { return colOf[k]; })[0];
    let off = 0;
    if (anyCol !== undefined) {
      let best = -1;
      [0, -1, 1, -2].forEach(function (o) {
        const c = anyCol + o; if (c < 0 || c >= lc) return;
        let n = 0; for (let r = first; r < Math.min(lr, first + 60); r++) if (SCHED_TIME_RE.test(v[r][c])) n++;
        if (n > best) { best = n; off = o; }
      });
      if (best <= 0) off = 0;
    }
    const per = cfg.colsPerDay || 3, opc = (cfg.opCol || 2) - 1;
    const dayCols = Object.keys(colOf).map(function (k) { return colOf[k] + off; });
    // граница легенды: из конфига ИЛИ по содержимому («Матвеева» / подписи статусов).
    // Пустые строки ВНУТРИ блока НЕ останавливают разбор (между группами операторов бывают пробелы).
    let stop = lr;
    if (cfg.legendStartRow) stop = Math.min(lr, cfg.legendStartRow - 1);
    else {
      let seen = false;
      for (let r = first; r < lr; r++) {
        let has = !!String(v[r][opc] || "").trim();
        for (let q = 0; q < dayCols.length && !has; q++) for (let w = 0; w < per; w++) if (String(v[r][dayCols[q] + w] || "").trim()) { has = true; break; }
        if (has) seen = true;
        if (seen && schedIsLegendRow_(v, r, dayCols, per, opc)) { stop = r; break; }
      }
    }
    // скрытые строки (видны через API, но не в интерфейсе) — пропускаем
    const hid = {};
    if (cfg.skipHidden !== false) for (let r = first; r < stop; r++) { try { if (ro.hidden(name, r + 1)) hid[r] = 1; } catch (e) {} }
    g.ds.forEach(function (d) {
      const ymd = schedYmd_(d);
      if (colOf[ymd] === undefined) { out.days.push({ date: ymd, shifts: [], error: "в листе «" + name + "» нет колонки на эту дату" }); return; }
      const c0 = colOf[ymd] + off;
      const shifts = [];
      let op = "";
      for (let r = first; r < stop; r++) {
        if (String(v[r][opc] || "").trim()) op = String(v[r][opc]).trim(); // объединённая «ОПЕРАТОРЫ» — протягиваем вниз
        if (hid[r]) continue;
        const rawName = String(v[r][c0 + 1] || "").trim();
        if (SCHED_HDR_RE.test(rawName)) continue;
        // AUDIT4 P1-2: «Матвеева» — легенда, только если в этой ячейке нет времени смены; настоящая смена со временем остаётся
        if (SCHED_LEGEND_NAME_RE.test(rawName) && !schedHasTime_(v[r][c0])) continue;
        const pn = schedNames_(rawName);
        if (!pn) continue; // фамилию без времени всё равно берём (бывает пустое время)
        shifts.push({ part: "", time: String(v[r][c0] || "").trim(), names: pn.names, shiftNo: pn.shiftNo, isNew: pn.isNew,
          raw: rawName, status: per > 2 ? String(v[r][c0 + 2] || "").trim() : "",
          struck: fl[r][c0 + 1] === "line-through", operator: op });
      }
      out.days.push({ date: ymd, sheet: name, shifts: shifts });
    });
  });
  return out;
}
function schedStacked_(ro, cfg, dates){
  const out = { days: [], sheets: [] };
  const name = schedStackedSheet_(ro, cfg);
  if (!name) throw new Error("не найден лист расписания: «" + String(cfg.sheet || "") + "» нет и ни в одном листе нет дат в колонке A — задай sheet в SCHEDULE_CONFIG");
  out.sheets.push(name);
  const lr = ro.lastRow(name);
  const lc = Math.min(ro.lastCol(name), cfg.lastCol || 88);
  const colA = ro.display(name, 1, cfg.dateCol || 1, lr, 1);
  const rowOf = {};
  const wantSet = {}; dates.forEach(function (d) { wantSet[schedYmd_(d)] = 1; });
  for (let r = 0; r < colA.length; r++) { const ymd = schedCellDate_(colA[r][0], 0); if (ymd && wantSet[ymd]) rowOf[ymd] = r + 1; } // при повторе — последнее
  const rows = Object.keys(rowOf).map(function (k) { return rowOf[k]; });
  if (!rows.length) { dates.forEach(function (d) { out.days.push({ date: schedYmd_(d), shifts: [], error: "даты нет в колонке A листа «" + name + "»" }); }); return out; }
  const r0 = Math.min.apply(null, rows), r1 = Math.min(lr, Math.max.apply(null, rows) + 1);
  const v = ro.display(name, r0, 1, r1 - r0 + 1, lc);
  const fl = ro.fontLines(name, r0, 1, r1 - r0 + 1, lc);
  const labelOf = function (row) { // DAY/NIGHT: в labelCol или в колонках 1–3
    const cells = cfg.labelCol ? [v[row][cfg.labelCol - 1]] : [v[row][0], v[row][1], v[row][2]];
    for (let i = 0; i < cells.length; i++) {
      const t = String(cells[i] || "").trim().toUpperCase();
      if (/^(DAY|ДЕНЬ)$/.test(t)) return "DAY";
      if (/^(NIGHT|НОЧЬ)$/.test(t)) return "NIGHT";
    }
    return "";
  };
  dates.forEach(function (d) {
    const ymd = schedYmd_(d);
    if (!rowOf[ymd]) { out.days.push({ date: ymd, shifts: [], error: "даты нет в колонке A листа «" + name + "»" }); return; }
    const shifts = [];
    [0, 1].forEach(function (k) {
      const sr = rowOf[ymd] + k; if (sr > r1) return;
      const i = sr - r0;
      if (cfg.skipHidden !== false) { try { if (ro.hidden(name, sr)) return; } catch (e) {} }
      const part = labelOf(i) || (k === 0 ? "DAY" : "NIGHT");
      for (let c = (cfg.firstPairCol || 3) - 1; c + 1 < lc; c += 2) {
        if (SCHED_HDR_RE.test(String(v[i][c + 1] || "").trim())) continue;
        const pn = schedNames_(v[i][c + 1]);
        if (!pn) continue;
        shifts.push({ part: part, time: String(v[i][c] || "").trim(), names: pn.names, shiftNo: pn.shiftNo, isNew: pn.isNew,
          raw: String(v[i][c + 1] || "").trim(), status: "", struck: fl[i][c + 1] === "line-through", operator: "" });
      }
    });
    out.days.push({ date: ymd, sheet: name, shifts: shifts });
  });
  return out;
}
function schedRead_(company, date, days){
  const cfg = schedCfg_(company);
  const ro = schedRO_(company);
  const start = schedParseYmd_(date);
  const dates = [];
  for (let i = 0; i < days; i++) dates.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  const res = cfg.layout === "grid4w" ? schedGrid_(ro, cfg, dates) : schedStacked_(ro, cfg, dates);
  res.company = company;
  // причины отписок — из комментариев файла (кэш 5 мин общий с расписанием по TTL)
  try {
    const hasStruck = (res.days || []).some(function (d) { return (d.shifts || []).some(function (s) { return s.struck; }); });
    if (hasStruck) {
      const comments = schedComments_(ro.fileId, (res.days || []).map(function (d) { return d.date; }));
      if (comments && comments.complete === false) res.commentsPartial = true;
      (res.days || []).forEach(function (d) { schedAttachReasons_(d.shifts, comments, d.date); });
    }
  } catch (e) {} // комментарии недоступны — показываем «зачёркнута» без причины
  return res;
}
function sched_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "расписание доступно только смотрящему" };
  const company = String(p.company || "");
  if (!SCHED_DEFAULT[company]) return { error: "неизвестная компания" };
  if (u.cities !== "all" && !allowedCity_(u, company)) return { error: "нет доступа к этой компании" };
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(p.date || "")) && schedParseYmd_(p.date) ? String(p.date) : Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const days = Math.max(1, Math.min(7, parseInt(p.days, 10) || 1));
  const key = "sch|" + company + "|" + date + "|" + days;
  if (!p.refresh) { try { const hit = cacheGetBig_(key); if (hit) return JSON.parse(hit); } catch (e) {} }
  else if (!rateOk_("schref|" + u.login, 20, 3600)) return { error: "слишком часто обновляешь — подожди пару минут" };
  try {
    const res = schedRead_(company, date, days);
    res.updated = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "HH:mm");
    try { cachePutBig_(key, JSON.stringify(res), SCHED_TTL); } catch (e2) {}
    return res;
  } catch (err) { return { error: errText_(err) }; }
}
// === РАСПИСАНИЯ (ТОЛЬКО ЧТЕНИЕ) — конец ===
// Запустить один раз в редакторе Apps Script (выдать доступ к чужим таблицам и проверить раскладку).
// В журнал идут только имена листов и количества — значения ячеек не печатаются.
function schedSelfTest(){
  Object.keys(SCHED_DEFAULT).forEach(function (c) {
    try {
      const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
      const r = schedRead_(c, today, 1);
      const d = r.days[0] || {};
      console.log(sheetLabel_(c) + ": лист «" + (r.sheets || []).join(", ") + "», смен сегодня: " + (d.shifts || []).length + (d.error ? " — " + d.error : ""));
    } catch (e) { console.log(sheetLabel_(c) + ": " + e.message); }
  });
}

function out(obj) { // D: только JSON (JSONP-ветка удалена вместе с GET-опросом)
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ===================== Обновление 6: управление пользователями (только админ) =====================
// Админ = редактор, чей логин перечислен в Script Property ADMIN_LOGINS (через запятую). Нет свойства — админов нет.
// Хэши паролей наружу не отдаются никогда. Каждое изменение — строка в листе «Журнал пользователей».
function adminLogins_(){
  try { return String(props_().getProperty("ADMIN_LOGINS") || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean); }
  catch (e) { return []; }
}
function isAdmin_(u){ return !!(u && u.edit && adminLogins_().indexOf(u.login) >= 0); }
var USER_LOGIN_RE = /^[A-Za-z0-9._@-]{2,40}$/;
function userPublic_(x){ // без хэша
  return { u: String(x.u || ""), name: String(x.name || ""), edit: !!x.edit, prod: String(x.prod || ""),
    cities: x.cities === "all" ? "all" : (Array.isArray(x.cities) ? x.cities.slice() : []), off: !!x.off, admin: adminLogins_().indexOf(String(x.u)) >= 0 };
}
function userNormFields_(p, x){ // чистая проверка полей роли
  const out = {};
  if (p.name !== undefined) out.name = String(p.name || "").trim().slice(0, 60);
  if (p.edit !== undefined) out.edit = !!p.edit;
  if (p.prod !== undefined) out.prod = String(p.prod || "").trim().slice(0, 60);
  if (p.cities !== undefined) {
    if (p.cities === "all" || (Array.isArray(p.cities) && p.cities.indexOf("all") >= 0)) out.cities = "all";
    else if (Array.isArray(p.cities)) {
      const ok = ["Томск", "Новосибирск", "Онлайн"];
      out.cities = p.cities.map(String).filter(function (c) { return ok.indexOf(c) >= 0; });
    } else return { error: "неверный список компаний" };
  }
  if (out.edit && out.prod) return { error: "продюсер не может быть редактором — выбери одну роль" };
  return { fields: out };
}
function userTempPass_(){
  const abc = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const raw = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
  let s = "";
  for (let i = 0; i < 12; i++) s += abc.charAt(parseInt(raw.substr(i * 2, 2), 16) % abc.length);
  return s;
}
function userAudit_(who, what, target, details){
  try {
    const ss = SpreadsheetApp.getActive();
    let sh = ss.getSheetByName("Журнал пользователей");
    if (!sh) { sh = ss.insertSheet("Журнал пользователей"); sh.appendRow(["Когда", "Кто", "Действие", "Логин", "Подробности"]); try { sh.hideSheet(); } catch (e) {} }
    sh.appendRow([textCell_(nowTxt_()), notFormula_(who), notFormula_(what), notFormula_(target), notFormula_(String(details || "").slice(0, 300))]);
  } catch (e2) { console.warn("журнал пользователей: " + e2); }
}
// после изменения должен остаться хотя бы один ВКЛЮЧЁННЫЙ редактор-админ
function usersKeepsAdmin_(users){
  const adm = adminLogins_();
  return users.some(function (x) { return adm.indexOf(x.u) >= 0 && x.edit && !x.off; });
}
function users_(p){
  const u = getUser_(p);
  if (!isAdmin_(u)) return { error: "нет доступа" };
  const list = usersLoadFresh_().map(userPublic_);
  // v7.1: «Последний вход» — из журнала входов (последняя успешная строка по логину)
  try {
    const lsh = SpreadsheetApp.getActive().getSheetByName(LOGIN_SHEET);
    if (lsh && lsh.getLastRow() >= 2) {
      const last = {}, v = lsh.getRange(2, 1, lsh.getLastRow() - 1, 3).getDisplayValues();
      for (let i = v.length - 1; i >= 0; i--) { const lg = String(v[i][1] || ""); if (v[i][2] === "вход" && lg && !last[lg]) last[lg] = String(v[i][0] || ""); }
      list.forEach(function (x) { if (last[x.u]) x.last = last[x.u]; });
    }
  } catch (e) {}
  let size = 0; try { size = String(props_().getProperty("USERS_JSON") || "").length; } catch (e) {}
  return { list: list, adminsConfigured: adminLogins_().length, sizeMain: size, chunkLimit: USERS_CHUNK };
}
// v7.6: у продюсера с компаниями — блок в открытой неделе каждой компании (иначе его «нет в компании» и команды не добавить)
function prodBlocksForUser_(x){
  const out = [];
  if (!x || !x.prod || x.off) return out;
  const cities = x.cities === "all" ? ["Томск", "Новосибирск", "Онлайн"] : (x.cities || []);
  __memo.knownProds = null; // список продюсеров изменился — пересчитать
  cities.forEach(function (c) {
    try {
      const sh = latestCitySheet_(c); if (!sh) { out.push({ city: c, error: "нет листа недели" }); return; }
      const r = ensureProdBlockNoLock_(sh, x.prod);
      out.push({ city: c, sheet: sh.getName(), created: !!r.created, error: r.error || "" });
    } catch (e) { out.push({ city: c, error: String(e).slice(0, 120) }); }
  });
  if (out.some(function (b) { return b.created; })) bumpDataGen_();
  return out;
}
function useradmin_(p){
  const u = getUser_(p);
  if (!isAdmin_(u)) return { error: "нет доступа" };
  const op = String(p.op || "");
  const login = String(p.login || "").trim();
  if (!USER_LOGIN_RE.test(login)) return { error: "логин: 2–40 символов, латиница/цифры/._@-" };
  if (!rateOk_("uadm|" + u.login, 60, 3600)) return { error: "слишком много изменений — подожди" };
  return withScriptLock_(15000, function () {
    const users = usersLoadFresh_();
    const x = users.find(function (q) { return q.u === login; });
    let temp = "", what = op, details = "";
    if (op === "add") {
      if (x) return { error: "такой логин уже есть" };
      const nf = userNormFields_(p, null); if (nf.error) return nf;
      const nu = Object.assign({ u: login, name: login, edit: false, cities: [] }, nf.fields);
      temp = userTempPass_();
      nu.h = makeHash_(temp);
      users.push(nu);
      details = JSON.stringify(userPublic_(nu));
    } else {
      if (!x) return { error: "нет такого пользователя" };
      if (op === "set") {
        const nf = userNormFields_(p, x); if (nf.error) return nf;
        const before = JSON.stringify(userPublic_(x));
        Object.keys(nf.fields).forEach(function (k) { x[k] = nf.fields[k]; });
        if (x.edit && x.prod) return { error: "продюсер не может быть редактором — выбери одну роль" };
        details = before + " → " + JSON.stringify(userPublic_(x));
      } else if (op === "reset") {
        temp = userTempPass_();
        x.h = makeHash_(temp);
        details = "временный пароль выдан";
      } else if (op === "off" || op === "on") {
        if (op === "off" && login === u.login) return { error: "нельзя отключить самого себя" };
        x.off = op === "off";
        details = x.off ? "отключён" : "включён";
      } else return { error: "неизвестная операция" };
    }
    if (!usersKeepsAdmin_(users)) return { error: "нельзя: не останется ни одного включённого администратора" };
    usersSave_(users);
    if (op === "reset" || op === "off" || (op === "set" && p.cities !== undefined) || (op === "set" && (p.edit !== undefined || p.prod !== undefined))) {
      try { sessionsKillUser_(login); } catch (e) {} // права или пароль поменялись — пусть войдёт заново
    }
    try { props_().deleteProperty("pw_" + login); } catch (e2) {}
    userAudit_(u.login, what, login, details);
    const fin = users.find(function (q) { return q.u === login; });
    const blocks = (op === "add" || op === "set") ? prodBlocksForUser_(fin) : [];
    const res = { ok: true, user: userPublic_(fin) };
    if (blocks.length) res.blocks = blocks;
    if (temp) res.tempPass = temp; // показывается один раз; в журнал не пишется
    return res;
  });
}

// ===================== Обновление 6: «Состояние» (смотрящий/редактор) =====================
// Счётчики — в CacheService (до 6 ч, приблизительные), журнал ошибок — последние 30, без секретов и токенов.
var SERVER_VER = "2026-10-30.78";
function statDay_(){ return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd"); }
// v6.5: счётчики копятся в памяти запроса и пишутся в кэш ОДНИМ getAll + putAll в конце doPost (statFlush_).
// Раньше каждый счётчик = отдельные get+put в CacheService: 6–8 обращений (~100–200 мс) на каждый запрос.
function statBuf_(){ return __memo.st || (__memo.st = { n: {}, t: {}, m: {} }); }
function statBump_(name, n){ const b = statBuf_(); b.n[name] = (b.n[name] || 0) + (n || 1); }
function statMark_(name){ statBuf_().m[name] = 1; }
function statFlush_(){
  const b = __memo.st; if (!b) return;
  __memo.st = null;
  try {
    const c = CacheService.getScriptCache(), day = statDay_();
    const keys = [];
    Object.keys(b.n).forEach(function (k) { keys.push("st|" + day + "|" + k); });
    Object.keys(b.t).forEach(function (k) { keys.push("tm|" + day + "|" + k); });
    const cur = keys.length ? c.getAll(keys) : {};
    const outp = {};
    Object.keys(b.n).forEach(function (k) { const kk = "st|" + day + "|" + k; outp[kk] = String(Number(cur[kk] || 0) + b.n[k]); });
    Object.keys(b.t).forEach(function (k) { const kk = "tm|" + day + "|" + k; const v = String(cur[kk] || "0,0").split(","); outp[kk] = (Number(v[0]) + b.t[k][0]) + "," + (Number(v[1]) + b.t[k][1]); });
    Object.keys(b.m).forEach(function (k) { outp["st|" + k] = nowTxt_(); });
    if (Object.keys(outp).length) c.putAll(outp, 21600);
  } catch (e) {}
}
function scrubSecrets_(s){ // токены, ключи, длинные base64/hex — вырезаем
  return String(s || "").replace(/(key|token|pass|bearer|authorization)\s*[:=]?\s*\S+/gi, "$1=…").replace(/[A-Za-z0-9_\-+/=]{24,}/g, "…").slice(0, 160);
}
function errLog_(action, msg){
  try {
    const c = CacheService.getScriptCache();
    let list = []; try { list = JSON.parse(c.get("st|errs") || "[]"); } catch (e) { list = []; }
    list.unshift({ t: nowTxt_(), ms: Date.now(), a: String(action || "").slice(0, 30), m: scrubSecrets_(msg) });
    c.put("st|errs", JSON.stringify(list.slice(0, 30)), 21600);
  } catch (e2) {}
}
var STATUS_PROP_NAMES = ["USERS_JSON", "PWSALT", "GEMINI_KEY", "GEMINI_MODELS", "AI_PROVIDER", "GROK_KEY", "GROK_MODEL", "AI_PROMPTS", "ADMIN_LOGINS", "SCHEDULE_IDS", "PW_ITER", "SECRET_KEY", "ARCHIVE_SS_ID", "SCREEN_FOLDER_ID"];  // v6: SECRET_KEY — должно быть «нет» (старый ключ, см. DEPLOY)
function status_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "состояние доступно смотрящему/редактору" };
  const c = CacheService.getScriptCache();
  const day = statDay_();
  const counters = {};
  ["req", "readhit", "readmiss", "readsame", "snapbuild", "snappatch", "thumbhit", "ai", "urlfetch"].forEach(function (k) { counters[k] = Number(c.get("st|" + day + "|" + k) || 0); });
  let errors = []; try { errors = JSON.parse(c.get("st|errs") || "[]"); } catch (e) {}
  const all = props_().getProperties();
  const present = {};
  STATUS_PROP_NAMES.forEach(function (n) { present[n] = !!all[n]; }); // только наличие, значения не отдаём
  let userChunks = 0; Object.keys(all).forEach(function (k) { if (/^USERS_JSON_\d+$/.test(k)) userChunks++; });
  let sessions = 0, totalSize = 0;
  Object.keys(all).forEach(function (k) { totalSize += k.length + String(all[k]).length; if (k.indexOf(SESS_PREFIX) === 0) sessions++; });
  const sched = {};
  if (p.deep) {
    ["Онлайн", "Новосибирск", "Томск"].forEach(function (co) {
      if (u.cities !== "all" && !allowedCity_(u, co)) return;
      try { const ro = schedRO_(co); sched[sheetLabel_(co)] = "ok · листов: " + ro.sheetNames().length; }
      catch (e3) { sched[sheetLabel_(co)] = errText_(e3); }
    });
  }
  return { ver: SERVER_VER, now: nowTxt_(), lastRead: c.get("st|lastread") || "", counters: counters, errors: errors,
    props: present, userChunks: userChunks, sessions: sessions, propsSizeKB: Math.round(totalSize / 102.4) / 10, propsLimitKB: 500,
    usersSize: String(all.USERS_JSON || "").length, aiProvider: aiProvider_(), sched: sched,
    times: (function () { const o = {}; TIME_NAMES.forEach(function (n) { const v = String(c.get("tm|" + day + "|" + n) || "0,0").split(","); const k = Number(v[1]) || 0; if (k) o[n] = { avg: Math.round(Number(v[0]) / k), n: k }; }); return o; })(),
    saved: cacheSaved_(c, day),
    health: healthGet_(),
    snap: { on: snapEnabled_(), warm: (function () { try { return ScriptApp.getProjectTriggers().some(function (t) { return t.getHandlerFunction() === "snapWarm"; }); } catch (e) { return null; } })() } };
}

// ===================== Обновление 6: шаблоны замечаний по категориям (лист «Шаблоны») =====================
// Личные шаблоны смотрящего (логин) + общие (логин «*», заводятся вручную в листе). Лист — служебный в таблице дашборда.
var TPL_CODES = ["oko","model","membrs","goly","show","playlist","sites","kadr","room"], TPL_MAX_PER_CAT = 30;
function tplSheet_(create){
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName("Шаблоны");
  if (!sh && create) { sh = ss.insertSheet("Шаблоны"); sh.appendRow(["Логин", "Категория", "Текст", "Когда"]); try { sh.hideSheet(); } catch (e) {} }
  return sh;
}
function tpl_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "шаблоны — для смотрящего/редактора" };
  const op = String(p.op || "list");
  if (op === "list") {
    const sh = tplSheet_(false);
    const out = {};
    if (sh && sh.getLastRow() >= 2) {
      sh.getRange(2, 1, sh.getLastRow() - 1, 3).getDisplayValues().forEach(function (r) {
        const who = String(r[0] || "").trim(), code = String(r[1] || "").trim(), t = String(r[2] || "").trim();
        if ((who !== u.login && who !== "*") || TPL_CODES.indexOf(code) < 0 || !t) return;
        const L = out[code] = out[code] || [];
        if (L.indexOf(t) < 0 && L.length < TPL_MAX_PER_CAT) L.push(t);
      });
    }
    return { tpl: out };
  }
  const code = String(p.code || ""), text = String(p.text || "").replace(/\s+/g, " ").trim().slice(0, 300);
  if (TPL_CODES.indexOf(code) < 0 || !text) return { error: "неверный шаблон" };
  return withScriptLock_(10000, function () {
    const sh = tplSheet_(true);
    const n = sh.getLastRow();
    const vals = n >= 2 ? sh.getRange(2, 1, n - 1, 3).getDisplayValues() : [];
    const mine = []; vals.forEach(function (r, i) { if (String(r[0]).trim() === u.login && String(r[1]).trim() === code) mine.push({ row: i + 2, t: String(r[2]).trim() }); });
    if (op === "add") {
      if (mine.some(function (m) { return m.t === text; })) return { ok: true };
      if (mine.length >= TPL_MAX_PER_CAT) return { error: "в категории уже " + TPL_MAX_PER_CAT + " шаблонов — удали лишние" };
      sh.appendRow([notFormula_(u.login), code, notFormula_(text), textCell_(nowTxt_())]);
      return { ok: true };
    }
    if (op === "del") {
      const rowsDel = mine.filter(function (m) { return m.t === text; }).map(function (m) { return m.row; }).sort(function (a, b) { return b - a; });
      rowsDel.forEach(function (r) { sh.deleteRow(r); });
      return { ok: true, removed: rowsDel.length };
    }
    return { error: "неизвестная операция" };
  });
}

// ===================== v6: МОНИТОРИНГ ПРОДЮСЕРА =====================
// Продюсер ведёт СВОЙ мониторинг своих команд — отдельно от разборов смотрящего. Всё хранится в листе
// «Мониторинг продюсеров»; листы недель, разборы смотрящего, «Задачи» и т.п. эти действия НЕ трогают.
// Скрины — в общем листе «Скрины» с ключом «PM|<id>» (в чтение недель они не попадают).
// Права:
//   продюсер — только свои записи (колонка «Продюсер» = его prod), только последняя (открытая) неделя,
//              нельзя править «принято»; может добавить свою команду, скрыть/вернуть команду из недели,
//              удалить добавленную им самим, менять опера/модель/ссылки в СВОЕЙ записи;
//   смотрящий (редактор) — все записи своих компаний: правка, «принять», «вернуть с замечанием», «снова открыть».
// Статусы: черновик → отправлено → принято | возврат (с текстом смотрящего) ; «скрыта» — команда убрана продюсером.
var PM_SHEET = "Мониторинг продюсеров";
var PM_SCREEN_PREFIX = "PM|";
var PM_HEAD = ["id","Компания","Неделя","Продюсер","База","Ник опера","Опер","Модель",
  "Работа с ОКО","Общение с моделью","Общение с мемберами","Работа с голами","Шоу","Плейлист","Работа с сайтами / раскладка","Кадр / картинка","Комната",
  "Комментарий","Ссылки","Статус","Ответ смотрящего","Обновлено","Кто правил","Создано","Версия"];
var PM_C = { id: 0, city: 1, week: 2, prod: 3, base: 4, nick: 5, opname: 6, model: 7, cat0: 8, comment: 17, links: 18, status: 19, note: 20, upd: 21, who: 22, created: 23, rev: 24 };
var PM_STATUSES = ["черновик", "отправлено", "принято", "возврат", "скрыта"];
var PM_TXT_MAX = 2000, PM_ACTIONS_W = ["pmsave","pmhide","pmunhide","pmstatus","pmupload","pmdelscreen"];
var PM_CITIES = ["Томск", "Новосибирск", "Онлайн"];

function pmSheet_(create){
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(PM_SHEET);
  if (!sh && create) {
    sh = ss.insertSheet(PM_SHEET);
    sh.getRange(1, 1, 1, PM_HEAD.length).setValues([PM_HEAD]);
    sh.setFrozenRows(1);
  }
  return sh;
}
function pmAll_(sh){ // все записи: [{rowN, v:[...]}]
  if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, PM_HEAD.length).getDisplayValues().map(function (v, i) { return { rowN: i + 2, v: v }; })
    .filter(function (x) { return String(x.v[PM_C.id] || "").trim(); });
}
function pmObj_(v){ // строка листа → объект для сайта
  const cats = []; for (let j = 0; j < 9; j++) cats.push(String(v[PM_C.cat0 + j] || ""));
  return { id: String(v[PM_C.id]).trim(), city: String(v[PM_C.city] || ""), week: String(v[PM_C.week] || ""), producer: String(v[PM_C.prod] || ""),
    base: String(v[PM_C.base] || ""), nick: String(v[PM_C.nick] || ""), opName: String(v[PM_C.opname] || ""), model: String(v[PM_C.model] || ""),
    cats: cats, comment: String(v[PM_C.comment] || ""), linksTxt: String(v[PM_C.links] || ""),
    status: String(v[PM_C.status] || "черновик") || "черновик", note: String(v[PM_C.note] || ""),
    updated: String(v[PM_C.upd] || ""), who: String(v[PM_C.who] || ""), created: String(v[PM_C.created] || ""), rev: Number(v[PM_C.rev] || 0) || 0 };
}
// последняя (открытая) неделя среди листов, доступных пользователю; city — только листы этой компании
// (у компаний открытая неделя может отличаться — права на правку считаем по компании записи)
function pmLatestWeek_(u, city){
  let best = "", bestT = -1;
  SpreadsheetApp.getActive().getSheets().forEach(function (sh) {
    const nm = sh.getName();
    if (!isTeamSheet_(nm) || !allowedCity_(u, nm)) return;
    if (city && nm.indexOf(city) < 0) return;
    const w = (nm.match(/\((.+?)\)/) || [, ""])[1];
    const d = weekEndDateServer_(w);
    const t = d ? d.getTime() : 0;
    if (w && t > bestT) { bestT = t; best = w; }
  });
  return best;
}
// чистая: может ли пользователь видеть запись
function pmCanSee_(u, o){
  if (!o || PM_CITIES.indexOf(o.city) < 0) return false;
  if (u.cities !== "all" && !allowedCity_(u, o.city)) return false;
  if (u.prod) return o.producer === u.prod;
  return true;
}
// чистая: может ли пользователь менять запись (latest — открытая неделя)
function pmCanEdit_(u, o, latest){
  if (!pmCanSee_(u, o)) return "нет доступа к этой записи";
  if (u.edit) return "";
  if (!u.prod) return "мониторинг ведут продюсер и смотрящий";
  if (o.week !== latest) return "править можно только открытую неделю (" + (latest || "—") + ")";
  if (o.status === "принято") return "запись принята смотрящим — правки закрыты";
  if (o.status === "скрыта") return "команда скрыта — сначала верни её";
  return "";
}
function pmTxt_(s, max){ return notFormula_(String(s == null ? "" : s).slice(0, max || PM_TXT_MAX)); }
function pmNewId_(){ return "p" + Utilities.getUuid().replace(/-/g, "").slice(0, 15); }
function pmStampWho_(u){ return String(u.name || u.login || "").replace(/[()]/g, ""); }

function pmread_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit && !u.prod) return { error: "мониторинг продюсеров доступен продюсерам и смотрящему" };
  const latest = pmLatestWeek_(u);
  const week = String(p.week || "").trim().slice(0, 40) || latest;
  const sh = pmSheet_(false);
  const all = pmAll_(sh).map(function (x) { return pmObj_(x.v); }).filter(function (o) { return pmCanSee_(u, o); });
  const weeksSet = {}; all.forEach(function (o) { if (o.week) weeksSet[o.week] = 1; }); if (latest) weeksSet[latest] = 1;
  const items = all.filter(function (o) { return o.week === week; });
  // скрины записей этой недели
  const ids = {}; items.forEach(function (o) { ids[PM_SCREEN_PREFIX + o.id] = 1; });
  const screens = {};
  if (items.length) { const pmIdx = scrIndex_().pm; Object.keys(ids).forEach(function (k) { if (pmIdx[k]) screens[k] = pmIdx[k]; }); } // v6.5: из индекса, без чтения листа
  const weeks = Object.keys(weeksSet).sort(function (a, b) { const da = weekEndDateServer_(a), db = weekEndDateServer_(b); return (da ? da.getTime() : 0) - (db ? db.getTime() : 0); });
  // v6.6: просьбы «посмотри команду» — продюсеру свои, смотрящему открытые его компаний
  let asks = [];
  try { asks = askAll_().filter(function (a) { return askCanSee_(u, a); }).filter(function (a) { return u.prod || a.status !== "сделано"; }).slice(-40).reverse(); } catch (e) {}
  return { ok: true, week: week, latest: latest, weeks: weeks, items: items, screens: screens, editable: week === latest || !!u.edit, asks: asks };
}

// сохранить запись (создать, если нет id). p: { id?, base?, city, week?, nick, opname, model, cats[9], comment, links, send?, rev? }
function pmsave_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit && !u.prod) return { error: "мониторинг ведут продюсер и смотрящий" };
  const cats = Array.isArray(p.cats) ? p.cats : [];
  if (cats.length !== 9) return { error: "страница устарела — обнови её; ничего не записано" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sh = pmSheet_(true);
    const all = pmAll_(sh);
    const id = String(p.id || "").trim();
    let rowN = -1, o = null;
    if (id) {
      const hit = all.find(function (x) { return String(x.v[PM_C.id]).trim() === id; });
      if (!hit) return { error: "запись не найдена (удалена?) — обнови страницу" };
      rowN = hit.rowN; o = pmObj_(hit.v);
      const err = pmCanEdit_(u, o, pmLatestWeek_(u, o.city)); if (err) return { error: err };
      if (p.rev !== undefined && Number(p.rev) !== o.rev) return { error: "запись уже изменил " + (o.who || "кто-то") + (o.updated ? " (" + o.updated + ")" : "") + " — обнови и повтори; ничего не записано" };
    } else {
      // новая запись: только продюсер, только открытая неделя
      if (!u.prod) return { error: "новую запись мониторинга создаёт продюсер" };
      const city = String(p.city || "").trim();
      if (PM_CITIES.indexOf(city) < 0 || (u.cities !== "all" && !allowedCity_(u, city))) return { error: "нет доступа к этой компании" };
      const latest = pmLatestWeek_(u, city);
      if (!latest) return { error: "открытая неделя не найдена" };
      const base = String(p.base || "").trim();
      if (base) {
        const sheetName = base.split("|")[0];
        if ((sheetName.match(/Томск|Новосибирск|Онлайн/) || [""])[0] !== city || (sheetName.match(/\((.+?)\)/) || [, ""])[1] !== latest)
          return { error: "команда не из открытой недели — обнови страницу" };
        if (!teamKeysFor_(u, (function () { const o2 = {}; o2[sheetName] = 1; return o2; })())[base]) return { error: "это не твоя команда (или её переименовали) — обнови страницу" };
        if (all.some(function (x) { const ox = pmObj_(x.v); return ox.base === base && ox.week === latest && ox.producer === u.prod; }))
          return { error: "мониторинг этой команды уже начат — обнови страницу" };
      } else if (!String(p.nick || "").trim() && !String(p.opname || "").trim() && !String(p.model || "").trim()) {
        return { error: "укажи опера или модель" };
      }
      o = { id: pmNewId_(), city: city, week: latest, producer: u.prod, base: base, status: "черновик", note: "", created: nowTxt_(), rev: 0 };
    }
    // v6.1: продюсер ничего не «отправляет» — любое его сохранение с текстом сразу видно смотрящему как «новое» (отправлено);
    // пустая запись остаётся черновиком. Правка смотрящего статус не меняет.
    const hasText = cats.some(function (c) { return String(c || "").trim(); }) || String(p.comment || "").trim();
    const status = u.prod ? (hasText ? "отправлено" : "черновик") : (o.status || "черновик");
    const row = [o.id, o.city, o.week, o.producer, o.base,
      pmTxt_(p.nick, 80), pmTxt_(p.opname, 80), pmTxt_(p.model, 80)]
      .concat(cats.map(function (c) { return pmTxt_(c); }))
      .concat([pmTxt_(p.comment), pmTxt_(p.links, 1500), status, pmTxt_(o.note, PM_TXT_MAX), textCell_(nowTxt_()), pmTxt_(pmStampWho_(u), 60), textCell_(o.created || nowTxt_()), o.rev + 1]);
    if (rowN > 0) sh.getRange(rowN, 1, 1, PM_HEAD.length).setValues([row]);
    else sh.appendRow(row);
    return { ok: true, id: o.id, rev: o.rev + 1, status: status, updated: nowTxt_(), who: pmStampWho_(u), created: !id, base: o.base, city: o.city, week: o.week, producer: o.producer };
  } catch (err) { return { error: errText_(err) }; } finally { try { lock.releaseLock(); } catch (e2) {} }
}

// продюсер убирает команду: команда из недели → «скрыта» (можно вернуть); добавленная им самим → удаляется
function pmhide_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.prod) return { error: "скрывать команды может продюсер" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sh = pmSheet_(true);
    const all = pmAll_(sh);
    const id = String(p.id || "").trim(), base = String(p.base || "").trim();
    let hit = id ? all.find(function (x) { return String(x.v[PM_C.id]).trim() === id; }) : null;
    if (id && !hit) return { error: "запись не найдена — обнови страницу" };
    const baseWeek = (base.split("|")[0].match(/\((.+?)\)/) || [, ""])[1];
    if (!hit && base) hit = all.find(function (x) { const ox = pmObj_(x.v); return ox.base === base && ox.week === baseWeek && ox.producer === u.prod; }) || null;
    if (hit) {
      const o = pmObj_(hit.v);
      const err = pmCanEdit_(u, o, pmLatestWeek_(u, o.city)); if (err) return { error: err };
      if (!o.base) { // добавленная продюсером — удаляем строку и её скрины (строки «Скрины»; файлы на Диске остаются)
        sh.deleteRow(hit.rowN);
        pmDropScreens_(PM_SCREEN_PREFIX + o.id);
        return { ok: true, deleted: true };
      }
      sh.getRange(hit.rowN, PM_C.status + 1).setValue("скрыта");
      sh.getRange(hit.rowN, PM_C.upd + 1, 1, 2).setValues([[textCell_(nowTxt_()), pmTxt_(pmStampWho_(u), 60)]]);
      sh.getRange(hit.rowN, PM_C.rev + 1).setValue(o.rev + 1);
      return { ok: true, hidden: true };
    }
    // команда недели без записи — создаём «скрытую» запись
    if (!base) return { error: "нет команды" };
    const sheetName = base.split("|")[0];
    const city = (sheetName.match(/Томск|Новосибирск|Онлайн/) || [""])[0];
    const latest = city ? pmLatestWeek_(u, city) : "";
    if (!city || (sheetName.match(/\((.+?)\)/) || [, ""])[1] !== latest) return { error: "команда не из открытой недели — обнови страницу" };
    const own = {}; own[sheetName] = 1;
    if (!teamKeysFor_(u, own)[base]) return { error: "это не твоя команда — обнови страницу" };
    const parts = base.split("|");
    const blank = []; for (let j = 0; j < 9; j++) blank.push("");
    sh.appendRow([pmNewId_(), city, latest, u.prod, base, pmTxt_(parts[1], 80), "", pmTxt_(parts[2], 80)].concat(blank)
      .concat(["", "", "скрыта", "", textCell_(nowTxt_()), pmTxt_(pmStampWho_(u), 60), textCell_(nowTxt_()), 1]));
    return { ok: true, hidden: true };
  } catch (err) { return { error: errText_(err) }; } finally { try { lock.releaseLock(); } catch (e2) {} }
}
function pmunhide_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.prod && !u.edit) return { error: "нет доступа" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sh = pmSheet_(true);
    const hit = pmAll_(sh).find(function (x) { return String(x.v[PM_C.id]).trim() === String(p.id || "").trim(); });
    if (!hit) return { error: "запись не найдена — обнови страницу" };
    const o = pmObj_(hit.v);
    if (!pmCanSee_(u, o)) return { error: "нет доступа к этой записи" };
    if (o.status !== "скрыта") return { ok: true };
    if (!u.edit && o.week !== pmLatestWeek_(u, o.city)) return { error: "вернуть можно только в открытой неделе" };
    sh.getRange(hit.rowN, PM_C.status + 1).setValue("черновик");
    sh.getRange(hit.rowN, PM_C.upd + 1, 1, 2).setValues([[textCell_(nowTxt_()), pmTxt_(pmStampWho_(u), 60)]]);
    sh.getRange(hit.rowN, PM_C.rev + 1).setValue(o.rev + 1);
    return { ok: true };
  } catch (err) { return { error: errText_(err) }; } finally { try { lock.releaseLock(); } catch (e2) {} }
}
// смотрящий: op = accept | return (note обязателен) | reopen
function pmstatus_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "принимать и возвращать может только смотрящий" };
  const op = String(p.op || "");
  const note = String(p.note || "").trim();
  if (["accept", "return", "reopen"].indexOf(op) < 0) return { error: "неизвестная операция" };
  if (op === "return" && !note) return { error: "напиши, что исправить" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sh = pmSheet_(true);
    const hit = pmAll_(sh).find(function (x) { return String(x.v[PM_C.id]).trim() === String(p.id || "").trim(); });
    if (!hit) return { error: "запись не найдена — обнови страницу" };
    const o = pmObj_(hit.v);
    if (!pmCanSee_(u, o)) return { error: "нет доступа к этой компании" };
    if (p.rev !== undefined && Number(p.rev) !== o.rev) return { error: "запись уже изменил " + (o.who || "кто-то") + " — обнови и повтори" };
    const st = op === "accept" ? "принято" : op === "return" ? "возврат" : "черновик";
    sh.getRange(hit.rowN, PM_C.status + 1, 1, 2).setValues([[st, op === "return" ? pmTxt_(note) : (op === "accept" ? "" : o.note)]]);
    sh.getRange(hit.rowN, PM_C.upd + 1, 1, 2).setValues([[textCell_(nowTxt_()), pmTxt_(pmStampWho_(u), 60)]]);
    sh.getRange(hit.rowN, PM_C.rev + 1).setValue(o.rev + 1);
    return { ok: true, status: st, rev: o.rev + 1 };
  } catch (err) { return { error: errText_(err) }; } finally { try { lock.releaseLock(); } catch (e2) {} }
}
function pmDropScreens_(key){ // строки «Скрины» с этим ключом (под локом вызывающего)
  const ssh = SpreadsheetApp.getActive().getSheetByName("Скрины");
  if (!ssh || ssh.getLastRow() < 2) return 0;
  const vals = ssh.getRange(2, 1, ssh.getLastRow() - 1, 3).getValues();
  return deleteRowsWhere_(ssh, 2, vals, function (r) { return String(r[0] || "").trim() === key; });
}
function pmFindForWrite_(u, id){ // → { sh, hit, o } | { error }
  const sh = pmSheet_(true);
  const hit = pmAll_(sh).find(function (x) { return String(x.v[PM_C.id]).trim() === String(id || "").trim(); });
  if (!hit) return { error: "запись не найдена — сначала сохрани мониторинг" };
  const o = pmObj_(hit.v);
  const err = pmCanEdit_(u, o, pmLatestWeek_(u, o.city)); if (err) return { error: err };
  return { sh: sh, hit: hit, o: o };
}
function pmupload_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit && !u.prod) return { error: "нет доступа" };
  const up = uploadParts_(p); if (up.error) return up;
  const cat = String(p.cat || "");
  if (cat && CAT_NAMES_PM_.indexOf(cat) < 0 && DASH_CATS_NSK.indexOf(cat) < 0) return { error: "неизвестная категория" };
  // v6.5: права проверяем заранее, файлы пишем до блокировки (как у основной загрузки), под блокировкой — перепроверка
  const pre = pmFindForWrite_(u, p.id); if (pre.error) return pre;
  let files;
  try { files = driveSaveShot_("pm_" + pre.o.id + "_" + Date.now().toString(36), up.full, up.small); }
  catch (errF) { return { error: errText_(errF) }; }
  const lock = LockService.getScriptLock();
  let done = false;
  try {
    lock.waitLock(30000);
    const f = pmFindForWrite_(u, p.id); if (f.error) return f;
    appendScreen_(PM_SCREEN_PREFIX + f.o.id, cat, files.link, files.mini, true, up.type);
    f.sh.getRange(f.hit.rowN, PM_C.upd + 1, 1, 2).setValues([[textCell_(nowTxt_()), pmTxt_(pmStampWho_(u), 60)]]);
    done = true;
    return { ok: true, key: PM_SCREEN_PREFIX + f.o.id, link: files.link, mini: files.mini, cat: cat, ts: nowTxt_(), type: up.type };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} if (!done) driveTrashShot_(files); }
}
var CAT_NAMES_PM_ = ["Работа с ОКО","Общение с моделью","Общение с мемберами","Работа с голами","Шоу","Плейлист","Работа с сайтами / раскладка","Кадр / картинка","Комната"];
function pmdelscreen_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const link = String(p.link || "").trim();
  if (!link) return { error: "нет ссылки" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const f = pmFindForWrite_(u, p.id); if (f.error) return f;
    const ssh = SpreadsheetApp.getActive().getSheetByName("Скрины");
    if (!ssh || ssh.getLastRow() < 2) return { ok: true, removed: 0 };
    const key = PM_SCREEN_PREFIX + f.o.id;
    const vals = ssh.getRange(2, 1, ssh.getLastRow() - 1, 3).getValues();
    const removed = deleteRowsWhere_(ssh, 2, vals, function (r) { return String(r[0] || "").trim() === key && String(r[2] || "").trim() === link; });
    return { ok: true, removed: removed };
  } catch (err) { return { error: errText_(err) }; } finally { try { lock.releaseLock(); } catch (e2) {} }
}
// v6.8: разметка уже загруженного скрина — новый файл встаёт на место старого (старый — в корзину Диска, 30 дней)
// v7.7: включить/выключить новый чек-лист НСК для недели — переписывает названия 9 категорий в шапке листа.
// Данные в строках не трогает; следующие недели (копия листа) наследуют шапку.
function nskfmt_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "переключать чек-лист может только редактор" };
  const name = String(p.sheet || "");
  if (!/Новосибирск/i.test(name) || !isTeamSheet_(name)) return { error: "новый чек-лист — только для недель VVCAM" };
  if (!allowedCity_(u, name)) return { error: "нет доступа к этой компании" };
  const on = String(p.on) !== "0";
  return withScriptLock_(10000, function () {
    const sh = SpreadsheetApp.getActive().getSheetByName(name);
    if (!sh) return { error: "лист не найден" };
    const names = on ? DASH_CATS_NSK : DASH_CATS;
    CAT_COLS.forEach(function (c, i) { sh.getRange(1, c + 1).setValue(names[i]); });
    __memo.fmt = {};
    bumpDataGen_();
    return { ok: true, fmt: on ? "nsk" : "" };
  });
}
function editscreen_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  const old = String(p.link || "").trim();
  if (!old) return { error: "нет ссылки" };
  const up = uploadParts_(p); if (up.error) return up;
  if (up.type === "video") return { error: "видео не размечается" };
  const sh = SpreadsheetApp.getActive().getSheetByName("Скрины");
  if (!sh || sh.getLastRow() < 2) return { error: "скрин не найден — обнови страницу" };
  const find = function () { // все строки с этой ссылкой (бывают дубли) — первая для прав, остальные правятся вместе
    const v = sh.getRange(2, 1, sh.getLastRow() - 1, 6).getValues();
    let hit = null;
    for (let i = 0; i < v.length; i++) if (String(v[i][2] || "").trim() === old) {
      const o = { row: i + 2, key: String(v[i][0] || "").trim(), mini: String(v[i][4] || "").trim(), type: String(v[i][5] || ""), time: v[i][3] };
      if (!hit) { hit = o; hit.all = []; }
      hit.all.push(o);
    }
    return hit;
  };
  const allowed = function (hit) {
    if (!hit) return { error: "скрин не найден — обнови страницу" };
    if (hit.type === "video") return { error: "видео не размечается" };
    if (hit.key.indexOf(PM_SCREEN_PREFIX) === 0) { const f = pmFindForWrite_(u, hit.key.slice(PM_SCREEN_PREFIX.length)); return f.error ? f : { ok: true }; }
    if (!u.edit) return { error: "размечать скрины может только редактор" };
    if (!allowedCity_(u, hit.key.split("|")[0])) return { error: "нет доступа к этой компании" };
    return { ok: true };
  };
  const pre = allowed(find()); if (pre.error) return pre;
  let files = null, done = false;
  try { files = driveSaveShot_("edit_" + Date.now().toString(36), up.full, up.small); }
  catch (err) { return { error: "не удалось сохранить на Диск: " + errText_(err) }; }
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const hit = find(); const a = allowed(hit); if (a.error) return a;
    for (let i = 1; i < hit.all.length; i++) { const ai = allowed(hit.all[i]); if (ai.error) return ai; }
    hit.all.forEach(function (o) { sh.getRange(o.row, 3, 1, 3).setValues([[files.link, o.time, files.mini || ""]]); }); // C–E одной записью
    // ссылка «Скрин» в строке недели (колонка Q) — тоже на новый файл
    if (hit.key.indexOf(PM_SCREEN_PREFIX) !== 0) { try {
      const wsh = SpreadsheetApp.getActive().getSheetByName(hit.key.split("|")[0]);
      if (wsh && wsh.getLastRow() >= 2 && wsh.getLastColumn() >= FIELDS.screen) {
        const q = wsh.getRange(2, FIELDS.screen, wsh.getLastRow() - 1, 1).getValues();
        q.forEach(function (r, i) { if (String(r[0] || "").trim() === old) wsh.getRange(i + 2, FIELDS.screen).setValue(files.link); });
      } } catch (e) { console.warn("editscreen Q: " + e); } }
    bumpScrGen_();
    done = true;
    __memo.edscr = { old: old, link: files.link, mini: files.mini };
    [old].concat(hit.all.map(function (o) { return o.mini; })).forEach(function (lk) { const m = String(lk || "").match(/[?&]id=([\w-]+)/); if (m) { try { DriveApp.getFileById(m[1]).setTrashed(true); } catch (e) {} } });
    return { ok: true, link: files.link, mini: files.mini, old: old, key: hit.key };
  } catch (err) { return { error: errText_(err) }; }
  finally { try { lock.releaseLock(); } catch (e2) {} if (!done) driveTrashShot_(files); }
}
// доступ к скрину мониторинга продюсера (для thumb/thumbs): ключ «PM|<id>»
function pmScreenAllowed_(u, key, memo){
  if (!memo.pm) { memo.pm = {}; pmAll_(pmSheet_(false)).forEach(function (x) { const o = pmObj_(x.v); memo.pm[PM_SCREEN_PREFIX + o.id] = o; }); }
  return pmCanSee_(u, memo.pm[key]);
}

// ===================== v6.6: МЕТКИ И ЗАКРЕПЛЕНИЕ КОМАНД, НОВИЧКИ, ПРОСЬБЫ, ЖУРНАЛ ВХОДОВ, САМОПРОВЕРКА =====================
// Ключ команды для меток — как teamKey() на сайте: «компания|опер (или ник)|модель» без регистра — переживает смену недель.
function srvTeamKey_(r){ return r.city + "|" + String(r.opName || r.opNick || "").trim().toLowerCase() + "|" + String(r.model || "").trim().toLowerCase(); }
function srvOpKey_(r){ return r.city + "|" + String(r.opName || r.opNick || "").trim().toLowerCase(); }
var MARK_SHEET = "Метки", NEWBIE_SHEET = "Новички", ASK_SHEET = "Просьбы", LOGIN_SHEET = "Журнал входов";
var MARK_COLORS = ["", "#e5655f", "#e5b455", "#3ecf8e", "#5b9dff", "#b07cff", "#9aa3b2"];
function marksAll_(ss){
  const o = {}, sh = ss.getSheetByName(MARK_SHEET);
  if (sh && sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, 4).getDisplayValues().forEach(function (r) {
    const k = String(r[0] || "").trim(); if (!k) return;
    const m = { c: String(r[1] || ""), t: String(r[2] || ""), p: String(r[3] || "") === "1" ? 1 : 0 };
    if (m.c || m.t || m.p) o[k] = m;
  });
  return o;
}
function newbiesAll_(ss){
  const o = {}, sh = ss.getSheetByName(NEWBIE_SHEET);
  if (sh && sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, 4).getDisplayValues().forEach(function (r) {
    const k = String(r[0] || "").trim(); if (!k) return;
    const d = parseInt(r[2], 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(String(r[1] || "").trim()) && d > 0) o[k] = { s: String(r[1]).trim(), d: d };
  });
  return o;
}
// чистая: метки/новички — только своих компаний; продюсеру — только по его командам
function marksFor_(all, u, allRows, keyFn){ // allRows — все строки доступных компаний (не только продюсера)
  const okKeys = u.prod ? prodOwnKeys_(allRows, u.prod, keyFn) : {};
  const out = {};
  Object.keys(all || {}).forEach(function (k) {
    if (u.cities !== "all" && !allowedCity_(u, k.split("|")[0])) return;
    if (u.prod && !okKeys[k]) return;
    out[k] = all[k];
  });
  return out;
}
function mark_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "метки ставит смотрящий" };
  const k = String(p.tkey || "").trim().toLowerCase().slice(0, 200);
  const parts = k.split("|");
  if (parts.length !== 3 || ["томск", "новосибирск", "онлайн"].indexOf(parts[0]) < 0) return { error: "неверная команда" };
  const key = parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + "|" + parts[1] + "|" + parts[2]; // компания — как в листах
  if (!allowedCity_(u, key.split("|")[0])) return { error: "нет доступа к этой компании" };
  const color = String(p.color || "");
  if (MARK_COLORS.indexOf(color) < 0) return { error: "неверный цвет" };
  const text = String(p.text || "").trim().slice(0, 30);
  const pin = p.pin ? "1" : "";
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = ensureSheet_(SpreadsheetApp.getActive(), MARK_SHEET, ["Команда", "Цвет", "Метка", "Закреплена", "Кто", "Когда"]);
    const last = sh.getLastRow();
    let row = -1;
    if (last >= 2) { const ks = sh.getRange(2, 1, last - 1, 1).getDisplayValues(); for (let i = 0; i < ks.length; i++) if (String(ks[i][0]).trim() === key) { row = i + 2; break; } }
    const vals = [notFormula_(key), color, notFormula_(text), pin, notFormula_(pmStampWho_(u)), textCell_(nowTxt_())];
    if (!color && !text && !pin) { if (row > 0) sh.deleteRow(row); return { ok: true, key: key, cleared: true }; }
    if (row > 0) sh.getRange(row, 1, 1, 6).setValues([vals]); else sh.appendRow(vals);
    return { ok: true, key: key };
  } catch (err) { return { error: errText_(err) }; } finally { try { lock.releaseLock(); } catch (e2) {} }
}
// «новый оператор»: метка 🌱 на период адаптации (по умолчанию 14 дней); оценки считаются как обычно
function newbie_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "отмечает смотрящий" };
  const city = String(p.city || "").trim();
  if (PM_CITIES.indexOf(city) < 0 || !allowedCity_(u, city)) return { error: "нет доступа к этой компании" };
  const op = String(p.op || "").trim().toLowerCase().slice(0, 80);
  if (!op) return { error: "не указан оператор" };
  const key = city + "|" + op;
  const start = String(p.start || "").trim() || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start)) return { error: "дата начала — ГГГГ-ММ-ДД" };
  const days = Math.max(1, Math.min(90, parseInt(p.days, 10) || 14));
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = ensureSheet_(SpreadsheetApp.getActive(), NEWBIE_SHEET, ["Оператор", "С даты", "Дней", "Кто", "Когда"]);
    const last = sh.getLastRow();
    let row = -1;
    if (last >= 2) { const ks = sh.getRange(2, 1, last - 1, 1).getDisplayValues(); for (let i = 0; i < ks.length; i++) if (String(ks[i][0]).trim() === key) { row = i + 2; break; } }
    if (p.off) { if (row > 0) sh.deleteRow(row); return { ok: true, off: true }; }
    const vals = [notFormula_(key), textCell_(start), days, notFormula_(pmStampWho_(u)), textCell_(nowTxt_())];
    if (row > 0) sh.getRange(row, 1, 1, 5).setValues([vals]); else sh.appendRow(vals);
    return { ok: true, key: key, s: start, d: days };
  } catch (err) { return { error: errText_(err) }; } finally { try { lock.releaseLock(); } catch (e2) {} }
}
// ---------- просьбы продюсера «посмотри эту команду» ----------
// A id, B компания, C продюсер, D ключ команды (лист|ник|модель), E ник, F модель, G текст, H когда, I статус, J ответ, K кто ответил, L когда ответил, M логин автора
var ASK_HEAD = ["id", "Компания", "Продюсер", "Команда", "Ник", "Модель", "Просьба", "Когда", "Статус", "Ответ", "Кто ответил", "Когда ответил", "Логин"];
function askObj_(v, rowN){ return { row: rowN, id: String(v[0]), city: String(v[1] || ""), producer: String(v[2] || ""), key: String(v[3] || ""), nick: String(v[4] || ""), model: String(v[5] || ""),
  text: String(v[6] || ""), when: String(v[7] || ""), status: String(v[8] || "открыта") || "открыта", answer: String(v[9] || ""), by: String(v[10] || ""), at: String(v[11] || ""), login: String(v[12] || "") }; }
function askAll_(){
  const sh = SpreadsheetApp.getActive().getSheetByName(ASK_SHEET);
  if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, ASK_HEAD.length).getDisplayValues().map(function (v, i) { return askObj_(v, i + 2); }).filter(function (a) { return a.id; });
}
function askCanSee_(u, a){
  if (u.cities !== "all" && !allowedCity_(u, a.city)) return false;
  if (u.prod) return a.producer === u.prod;
  return !!u.edit;
}
function askadd_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.prod) return { error: "просьбу отправляет продюсер" };
  const key = String(p.skey || "").trim();
  const text = String(p.text || "").trim().slice(0, 1000);
  if (!text) return { error: "напиши, на что посмотреть" };
  const sheetName = key.split("|")[0];
  if (key.split("|").length !== 3 || !isTeamSheet_(sheetName)) return { error: "неверная команда" };
  if (!rateOk_("ask|" + u.login, 20, 3600)) return { error: "слишком много просьб за час — попробуй позже" };
  const own = {}; own[sheetName] = 1;
  if (!teamKeysFor_(u, own)[key]) return { error: "это не твоя команда — обнови страницу" };
  const city = allowedCity_(u, sheetName);
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = ensureSheet_(SpreadsheetApp.getActive(), ASK_SHEET, ASK_HEAD);
    const parts = key.split("|");
    const id = "a" + Utilities.getUuid().replace(/-/g, "").slice(0, 12);
    sh.appendRow([id, city, notFormula_(u.prod), notFormula_(key), notFormula_(parts[1]), notFormula_(parts[2]), notFormula_(text), textCell_(nowTxt_()), "открыта", "", "", "", notFormula_(u.login)]);
    return { ok: true, id: id };
  } catch (err) { return { error: errText_(err) }; } finally { try { lock.releaseLock(); } catch (e2) {} }
}
function asklist_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit && !u.prod) return { list: [] };
  const list = askAll_().filter(function (a) { return askCanSee_(u, a); });
  // открытые — все; закрытые — последние 30
  const open = list.filter(function (a) { return a.status !== "сделано"; });
  const done = list.filter(function (a) { return a.status === "сделано"; }).slice(-30);
  return { list: open.concat(done).reverse() };
}
function askdone_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "закрывает смотрящий" };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const a = askAll_().find(function (x) { return x.id === String(p.id || ""); });
    if (!a) return { error: "просьба не найдена — обнови список" };
    if (!askCanSee_(u, a)) return { error: "нет доступа к этой компании" };
    if (a.status === "сделано") return { error: "уже закрыта: " + (a.by || "") + (a.answer ? " — «" + a.answer.slice(0, 60) + "»" : "") };
    const sh = SpreadsheetApp.getActive().getSheetByName(ASK_SHEET);
    sh.getRange(a.row, 9, 1, 4).setValues([["сделано", notFormula_(String(p.answer || "").trim().slice(0, 1000)), notFormula_(pmStampWho_(u)), textCell_(nowTxt_())]]);
    return { ok: true };
  } catch (err) { return { error: errText_(err) }; } finally { try { lock.releaseLock(); } catch (e2) {} }
}
// ---------- журнал входов (видит админ) ----------
var LOGIN_LOG_MAX = 6000, LOGIN_LOG_TRIM = 1000;
// v6.6: неудачи не засоряют журнал — по одному логину не чаще раза в 10 мин, «нет такого логина» — не больше 30 строк в час на всех
function loginLogAllowed_(login, result){
  if (result === "вход") return true;
  try {
    const c = CacheService.getScriptCache(), lg = String(login || "").toLowerCase().slice(0, 60);
    const k1 = "ll|" + lg + "|" + result;
    if (c.get(k1)) return false;
    if (result === "нет такого логина") {
      const k2 = "ll|unk|" + Math.floor(Date.now() / 3600000), n = Number(c.get(k2) || 0);
      if (n >= 30) return false;
      c.put(k2, String(n + 1), 3700);
    }
    c.put(k1, "1", 600);
  } catch (e) {}
  return true;
}
function loginLog_(login, result, dev){
  try {
    if (!loginLogAllowed_(login, result)) return;
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(3000)) return;
    try {
      const sh = ensureSheet_(SpreadsheetApp.getActive(), LOGIN_SHEET, ["Когда", "Логин", "Результат", "Устройство"]);
      sh.appendRow([textCell_(nowTxt_()), notFormula_(String(login || "").slice(0, 60)), result, notFormula_(String(dev || "").replace(/[\r\n]+/g, " ").slice(0, 120))]);
      if (sh.getLastRow() > LOGIN_LOG_MAX) sh.deleteRows(2, LOGIN_LOG_TRIM); // под той же блокировкой — двойной обрезки не будет
    } finally { lock.releaseLock(); }
  } catch (e) { console.warn("журнал входов: " + e); }
}
function loginlog_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!isAdmin_(u)) return { error: "журнал входов видит админ" };
  const sh = SpreadsheetApp.getActive().getSheetByName(LOGIN_SHEET);
  if (!sh || sh.getLastRow() < 2) return { list: [] };
  const n = Math.min(300, sh.getLastRow() - 1);
  const v = sh.getRange(sh.getLastRow() - n + 1, 1, n, 4).getDisplayValues();
  return { list: v.reverse().map(function (r) { return { t: r[0], u: r[1], r: r[2], d: r[3] }; }) };
}
// ---------- самопроверка (таймер раз в час; результат видит смотрящий плашкой на сайте и во «Состоянии») ----------
function selfCheck(e){
  if (e && e.triggerUid) { // запуск по таймеру: ночью (02–08) не тратим квоту, как и прогрев снимка
    const h = Number(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "H"));
    if (h >= 2 && h < 8) return null;
  }
  __memo = {};
  const problems = [], info = [];
  const step = function (name, fn) {
    const t0 = Date.now();
    try { const r = fn(); info.push(name + ": ок" + (r ? " (" + r + ")" : "") + ", " + (Date.now() - t0) + " мс"); }
    catch (e) { problems.push(name + ": " + String(e && e.message || e).slice(0, 160)); }
  };
  step("пользователи", function () { const n = usersLoadFresh_().length; if (!n) throw new Error("список пользователей пуст или не читается"); return n + " шт"; });
  step("хранилище свойств", function () {
    const all = props_().getProperties(); let size = 0; Object.keys(all).forEach(function (k) { size += k.length + String(all[k]).length; });
    const kb = Math.round(size / 1024);
    if (kb > 420) throw new Error("занято " + kb + " КБ из ~500 — убери истёкшие сессии (меню «🔧 Дашборд»)");
    return kb + " КБ";
  });
  step("кэш", function () { const c = CacheService.getScriptCache(); const v = String(Date.now()); c.put("selfchk", v, 60); if (c.get("selfchk") !== v) throw new Error("кэш не отвечает"); });
  step("снимок недели", function () {
    const meta = snapMeta_(); if (!meta.length) throw new Error("не найдено ни одного листа недели");
    const t0 = Date.now();
    const latest = {}; meta.forEach(function (m) { if (!latest[m.city] || m.t > latest[m.city].t) latest[m.city] = m; });
    const w = latest[Object.keys(latest)[0]].week;
    const snap = snapGet_(w) || snapBuild_(w);
    if (!snap) throw new Error("снимок не собирается");
    const ms = Date.now() - t0;
    if (ms > 25000) throw new Error("сборка снимка слишком долгая: " + Math.round(ms / 1000) + " с");
    return w;
  });
  step("индекс скринов", function () { return Object.keys(scrIndex_().byId).length + " файлов"; });
  step("папка скринов", function () { return screenFolder_().getName(); });
  step("мониторинг продюсеров", function () { pmAll_(pmSheet_(false)); });
  step("расписания", function () {
    const ids = schedIds_(); const names = Object.keys(ids || {});
    names.forEach(function (co) { schedRO_(co).sheetNames(); });
    return names.length ? names.length + " табл." : "не настроены";
  });
  step("ошибки за час", function () {
    let list = []; try { list = JSON.parse(CacheService.getScriptCache().get("st|errs") || "[]"); } catch (e) {}
    const recent = list.filter(function (x) { return Number(x.ms || 0) > Date.now() - 3600000; });
    if (recent.length >= 10) throw new Error(recent.length + " ошибок за час (последняя: " + recent[0].a + " — " + recent[0].m + ")");
    return recent.length;
  });
  const res = { ok: !problems.length, t: nowTxt_(), problems: problems, info: info, ver: SERVER_VER };
  try { CacheService.getScriptCache().put("health", JSON.stringify(res), 21600); } catch (e) {}
  try { props_().setProperty("HEALTH_LAST", JSON.stringify({ ok: res.ok, t: res.t, problems: problems.slice(0, 5) })); } catch (e) {}
  statFlush_();
  return res;
}
function healthGet_(){
  try { const c = CacheService.getScriptCache().get("health"); if (c) return JSON.parse(c); } catch (e) {}
  try { const v = props_().getProperty("HEALTH_LAST"); if (v) return JSON.parse(v); } catch (e) {}
  return null;
}
function selfcheckAction_(p){
  const u = getUser_(p);
  if (!u) return { error: "требуется вход" };
  if (!u.edit) return { error: "самопроверка доступна смотрящему" };
  // не чаще раза в 2 минуты — проверка собирает снимок и открывает таблицы расписаний
  try { const c = CacheService.getScriptCache(); if (c.get("selfcheck|busy")) { const h = c.get("health"); if (h) return JSON.parse(h); } c.put("selfcheck|busy", "1", 120); } catch (e) {}
  return selfCheck();
}
function installSelfCheckTrigger(){
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === "selfCheck") ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger("selfCheck").timeBased().everyHours(1).create();
  selfCheck();
  return "Самопроверка включена: раз в час. Если что-то сломается, смотрящий увидит плашку на сайте.";
}
function selfCheckOnUi(){ SpreadsheetApp.getUi().alert(installSelfCheckTrigger()); }
// v6.9: ADMIN_LOGINS через меню (в «Свойствах скрипта» больше 50 записей — руками не добавить)
// v7.2: пороги вердикта команды. Норма — нет «плохо» и замечаний не больше okWarn;
// критично — «плохо» + ½·замечания ≥ crit; recheckCrit — через сколько дней перепроверять критичную команду (обычная — 7).
var VRULES_DEFAULT = { okWarn: 1, crit: 3, recheckCrit: 3 };
function verdictRules_(){
  if (__memo.vrules) return __memo.vrules; // одно чтение свойств на запрос
  const o = { okWarn: VRULES_DEFAULT.okWarn, crit: VRULES_DEFAULT.crit, recheckCrit: VRULES_DEFAULT.recheckCrit };
  try { const j = JSON.parse(props_().getProperty("VERDICT_RULES") || "null"); if (j && typeof j === "object") ["okWarn", "crit", "recheckCrit"].forEach(function (k) { const v = parseFloat(j[k]); if (isFinite(v)) o[k] = v; }); } catch (e) {}
  __memo.vrules = o; return o;
}
function verdictRulesUi(){
  const ui = SpreadsheetApp.getUi(), cur = verdictRules_();
  const r = ui.prompt("Пороги оценки",
    "Три числа через пробел (сейчас: " + cur.okWarn + " " + cur.crit + " " + cur.recheckCrit + "):\n" +
    "1) сколько замечаний (⚠️) ещё считается «нормой», если нет «плохо» — по умолчанию 1;\n" +
    "2) с какого балла «критично»: «плохо» = 1, замечание = 0,5 — по умолчанию 3;\n" +
    "3) через сколько дней перепроверять критичную команду (обычная — 7) — по умолчанию 3.\n" +
    "Пусто — вернуть по умолчанию.", ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  const t = String(r.getResponseText() || "").trim().replace(/,/g, ".");
  if (!t) { props_().deleteProperty("VERDICT_RULES"); bumpDataGen_(); ui.alert("Пороги по умолчанию: 1 · 3 · 3. Обнови сайт."); return; }
  const a = t.split(/\s+/).map(parseFloat);
  if (a.length !== 3 || a.some(function (x) { return !isFinite(x); }) || a[0] < 0 || a[0] > 9 || a[1] < 0.5 || a[1] > 9 || a[2] < 1 || a[2] > 7) { ui.alert("Нужно три числа: 0–9, 0,5–9 и 1–7. Ничего не изменено."); return; }
  props_().setProperty("VERDICT_RULES", JSON.stringify({ okWarn: a[0], crit: a[1], recheckCrit: Math.round(a[2]) }));
  bumpDataGen_();
  ui.alert("Сохранено: норма — до " + a[0] + " замечаний без «плохо»; критично — от " + a[1] + " баллов; критичных перепроверять через " + Math.round(a[2]) + " дн. Обнови сайт.");
}
function adminLoginsUi(){
  const ui = SpreadsheetApp.getUi();
  const cur = adminLogins_().join(", ");
  const r = ui.prompt("Админы", "Логины админов через запятую (сейчас: " + (cur || "никого") + "). Админ видит «Пользователи» и «Журнал входов». Пусто — убрать всех.", ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  const known = usersRaw_().map(function (x) { return x.u; });
  const list = String(r.getResponseText() || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
  const bad = list.filter(function (x) { return known.indexOf(x) < 0; });
  if (bad.length) { ui.alert("Таких логинов нет: " + bad.join(", ") + ". Ничего не изменено."); return; }
  if (list.length) props_().setProperty("ADMIN_LOGINS", list.join(",")); else props_().deleteProperty("ADMIN_LOGINS");
  ui.alert(list.length ? "Админы: " + list.join(", ") + ". Обнови сайт." : "Админов нет.");
}
