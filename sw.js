// Обновление 6 (10): service worker — кэширует ТОЛЬКО статическую оболочку сайта.
// Ответы API (script.google.com / googleusercontent), токены, POST и любые запросы с параметрами не кэшируются никогда.
// Пути относительные — работает на GitHub Pages под /pd/.
const SHELL_VER = "shell-2026-10-08.70";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./icon-32.png", "./favicon.ico"];
self.addEventListener("install", (e) => {
  // v6.9: по одному файлу — если какую-то иконку забыли загрузить, оболочка всё равно кэшируется
  e.waitUntil(caches.open(SHELL_VER).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== SHELL_VER).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
function isShell(url) {
  if (url.origin !== self.location.origin) return false; // чужие домены (API) — мимо кэша
  if (url.search) return false; // любые параметры — мимо кэша
  const scope = new URL(self.registration.scope);
  if (!url.pathname.startsWith(scope.pathname)) return false;
  const rel = "./" + url.pathname.slice(scope.pathname.length);
  return SHELL.includes(rel) || rel === "./";
}
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return; // POST к серверу — только сеть
  const url = new URL(req.url);
  if (!isShell(url)) return; // всё остальное — браузер сам, без SW
  // сеть первой (чтобы новая версия приходила сразу), кэш — только при отсутствии сети
  e.respondWith(
    fetch(req).then((res) => {
      if (res && res.ok && res.type === "basic") { const copy = res.clone(); caches.open(SHELL_VER).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then((m) => m || caches.match("./index.html")))
  );
});
