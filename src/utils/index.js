export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function debounce(func, time) {
  function exec(thisObj, args) {
    timer = null;
    func.apply(thisObj, args);
  }
  var timer;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(exec, time, this, args);
  };
}
