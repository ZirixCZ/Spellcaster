export default (url: string) => {
  let urlSplit: Array<string> = url.split('/');
  return urlSplit[urlSplit.length - 1];
};
