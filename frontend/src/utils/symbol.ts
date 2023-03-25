export const getSymbol = () => {
  let characters = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
  return `/img/symbol${characters.charAt(
    Math.floor(Math.random() * characters.length)
  )}.svg`;
};
