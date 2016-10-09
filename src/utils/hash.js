import Vue from 'vue';

export const hash = {
  data: {},
};

function getHash() {
  const data = location.hash.slice(1).split('&')
  .reduce((res, piece) => {
    const parts = piece.split('=');
    const key = decodeURIComponent(parts[0]);
    let value;
    if (key) {
      if (parts.length > 1) {
        value = decodeURIComponent(parts[1]);
      }
      res[key] = value;
    }
    return res;
  }, {});
  Vue.set(hash, 'data', data);
}

export function setHash(data) {
  location.hash = Object.keys(data).map(key => {
    const value = data[key];
    key = encodeURIComponent(key);
    return value == null ? key : `${key}=${encodeURIComponent(value)}`;
  }).filter(i => i).join('&');
}

window.addEventListener('hashchange', getHash, false);
getHash();
