// eslint-disable-next-line import/prefer-default-export
export const mergeArrayWithObject = (arr, obj) =>
  arr && arr.map((t) => (t.id === obj.id ? obj : t));
