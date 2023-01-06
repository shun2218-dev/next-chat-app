export const isAllIncludes = (arr: string[], target: string) => {
  return arr.every((e) => target.includes(e));
};
