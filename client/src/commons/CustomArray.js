Array.prototype.limit = function limit(c) {
  return this.filter((x, i) => {
    if (i <= c - 1) {
      return true;
    }
  });
};

Array.prototype.skip = function skip(c) {
  return this.filter((x, i) => {
    if (i > c - 1) {
      return true;
    }
  });
};

//EX array.findAndRemove(value,key)
//EX array.findAndRemove(value)
Array.prototype.findAndRemove = function (value, key = null) {
  const index = this.findIndex((obj) =>
    !!obj[key] ? obj[key] === value : obj === value
  );
  return index >= 0
    ? [...this.slice(0, index), ...this.slice(index + 1)]
    : this;
};

//Ex with array array.distinct()
//Ex with array object array.distinct(obj=>obj.id)
Array.prototype.distinct = function (selector) {
  
  if (selector === 'undefined') {
    return [...new Set(this)];
  }

  if (typeof selector !== 'function') {
    throw new Error(
      `Expecting selector to be a function, but received ${typeof selector} instead.`
    );
  }

  let found = new Set();
  return this.filter((element) => {
    if (found.has(selector(element))) {
      return false;
    } else {
      found.add(selector(element));
      return true;
    }
  });
};

Array.prototype.mapKeys = function (key = null) {
  let obj = null;
  if ((key === true)) {
    obj = this.reduce((result, item) => ({ ...result, [item]: item }), {});
  } else if (key) {
    obj = this.reduce((result, item) => ({ ...result, [item[key]]: item }), {});
  } else {
    obj = Object.assign({}, this);
  }
  return obj;
};
