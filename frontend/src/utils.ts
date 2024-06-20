export const trim = (arr: any[], index?: number) => {
  if (index !== undefined) {
    return [...arr.slice(0, index)];
  }
  return arr.slice(0, arr.length - 1);
};
