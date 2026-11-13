import Keycloak from './vendor/keycloak-js/keycloak.js';

const cloud = 'https://cloud.dartlink.fr';
const accountUrl = cloud + '/compte/';
const keycloak = new Keycloak({ url: 'https://auth.dartlink.fr', realm: 'dartlink', clientId: 'dartlink-website' });
const redirectUri = location.origin + '/';
let profile;
let avatar;
let generation = 0;
let refreshing = false;
const intentKey = 'dartlink:open-account';
function clear() {
  generation++;
  profile = undefined;
  if (avatar) URL.revokeObjectURL(avatar);
  avatar = undefined;
  draw();
}
function draw() {
  const slot = document.querySelector('#player-navigation');
  if (!slot) return;
  slot.replaceChildren();
  const link = document.createElement('a');
  link.className = 'button';
  link.href = accountUrl;
  const label = document.createElement('span');
  label.textContent = keycloak.authenticated ? 'Mon compte' : 'Connexion';
  link.append(label);
  // Keep a working Cloud link if SSO is unavailable or blocked by the browser.
  if (!keycloak.authenticated && ready) link.onclick = event => {
    event.preventDefault();
    try { sessionStorage.setItem(intentKey, '1'); } catch { location.assign(accountUrl); return; }
    void keycloak.login({ redirectUri }).catch(() => location.assign(accountUrl));
  };
  if (keycloak.authenticated && profile) {
    if (avatar) {
      const image = new Image(30, 30);
      image.className = 'player-avatar'; image.alt = ''; image.src = avatar;
      image.onerror = () => image.remove();
      link.prepend(image);
    }
    const name = document.createElement('span');
    name.className = 'player-name'; name.textContent = profile.nickname;
    link.append(name);
  }
  slot.append(link);
  if (keycloak.authenticated) {
    const logout = document.createElement('button');
    logout.type = 'button'; logout.className = 'player-logout'; logout.textContent = 'Se déconnecter';
    logout.onclick = () => { clear(); void keycloak.logout({ redirectUri, logoutMethod: 'POST' }); };
    slot.append(logout);
  }
}
async function refresh(force = false) {
  if (!keycloak.authenticated || refreshing) { draw(); return; }
  refreshing = true;
  const current = ++generation;
  try {
    await keycloak.updateToken(force ? -1 : 30);
    const response = await fetch(cloud + '/api/v1/me', { headers: { Authorization: 'Bearer ' + keycloak.token }, cache: 'no-store' });
    if (!response.ok) throw new Error('profile_unavailable');
    const result = await response.json();
    if (current !== generation) return;
    profile = result.profile;
    if (avatar) URL.revokeObjectURL(avatar);
    avatar = undefined;
    draw();
    if (profile.avatarUrl === '/api/v1/profiles/' + profile.id + '/avatar') {
      const image = await fetch(cloud + profile.avatarUrl, { headers: { Authorization: 'Bearer ' + keycloak.token }, cache: 'no-store' });
      if (!image.ok || image.headers.get('content-type')?.split(';')[0] !== 'image/png') return;
      const url = URL.createObjectURL(await image.blob());
      const decoded = new Image(); decoded.src = url;
      try { await decoded.decode(); } catch { URL.revokeObjectURL(url); return; }
      if (current !== generation) { URL.revokeObjectURL(url); return; }
      avatar = url; draw();
    }
  } catch {
    clear();
    // A valid session can still reach the account page when the API is unavailable.
    if (!keycloak.token) keycloak.clearToken();
  } finally { refreshing = false; }
}
let ready = false;
window.addEventListener('dartlink:navigation', draw);
window.addEventListener('focus', () => { if (ready) void refresh(true); });
window.addEventListener('pageshow', event => { if (event.persisted && ready) void refresh(true); });
keycloak.onAuthLogout = clear;
keycloak.onAuthRefreshError = () => { keycloak.clearToken(); clear(); };
try {
  // A static same-origin callback keeps public pages readable without a full-page SSO redirect.
  await keycloak.init({ onLoad: 'check-sso', pkceMethod: 'S256', responseMode: 'query',
    redirectUri, silentCheckSsoRedirectUri: location.origin + '/silent-check-sso.html',
    silentCheckSsoFallback: false, checkLoginIframe: true, enableLogging: false, logoutMethod: 'POST' });
  ready = true;
  let openAccount = false;
  try { openAccount = sessionStorage.getItem(intentKey) === '1'; sessionStorage.removeItem(intentKey); } catch {}
  if (keycloak.authenticated && openAccount) location.replace(accountUrl);
  else { draw(); await refresh(); }
} catch { ready = false; clear(); }
