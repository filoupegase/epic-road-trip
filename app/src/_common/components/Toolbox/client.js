export function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name + "=" + encodeURIComponent(value) + "; expires=" + expires;
}

export function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function isAnonymous(user) {
  return !(user?.privilege_level > 0 && user?.privilege_level <= 3);
}

export function isAdmin(user) {
  return user?.privilege_level === 1;
}
