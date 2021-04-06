const addComma = (num) => {
  let val = num.toString();
  const len = val.length;
  for (let i = len; i >= 0; i--) {
    if (i != 0 && len - i != 0 && (len - i) % 3 === 0) {
      val = val.substr(0, i) + "," + val.substr(i);
    }
  }
  return val;
};

export default addComma;
