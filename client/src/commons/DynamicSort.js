export const dynamicSort = (property) => {
  var sortOrder = 1;
  let key = property.split('.');
  if (key[0][0] === '-') {
    sortOrder = -1;
    key[0] = key[0].substr(1);
  }
  return function (a, b) {
    var result = null;
    if (key[1]) {
      result =
        a[key[0]][key[1]] < b[key[0]][key[1]]
          ? -1
          : a[key[0]][key[1]] > b[key[0]][key[1]]
          ? 1
          : 0;
    } else {
      result = a[key[0]] < b[key[0]] ? -1 : a[key[0]] > b[key[0]] ? 1 : 0;
    }
    return result * sortOrder;
  };
};
