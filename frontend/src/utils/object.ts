export const removeEmptyStrings = <O extends Record<string, any>>(
  obj: O,
): O => {
  const newObj = {} as Record<string, any>;
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] !== '') {
      newObj[prop] = obj[prop];
    }
  });

  return newObj as O;
};


export const getNumOfDiff = <O extends Record<string, any>>(
  obj1: O,
  obj2: O,
): number => {
  const entries = Object.entries(obj1);
  const diff = entries.filter((prop) => {
    const key = prop[0];
    const value = prop[1];
    if (Array.isArray(value)) {
      return value.length !== obj2[key].length;
    }
    const o1 = obj2[key];
    return JSON.stringify(o1) !== JSON.stringify(value);
  });

  return diff.length;
};
