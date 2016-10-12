Object.assign = Object.assign || function (obj, ...args) {
  args.forEach(arg => {
    Object.keys(arg).forEach(key => obj[key] = arg[key]);
  });
  return obj;
};

Array.prototype.includes = Array.prototype.includes || function (item) {
  return !!~this.indexOf(item);
};
