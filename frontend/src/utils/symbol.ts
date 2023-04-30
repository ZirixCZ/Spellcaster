export const getSymbol = (pathname?: string) => {
  if (pathname === "/welcome" && !localStorage.getItem("welcomeSymbol")) {
    localStorage.setItem("welcomeSymbol", "true");
    return "/img/symbolS.svg";
  }

  if (pathname === "/login" && !localStorage.getItem("loginSymbol")) {
    localStorage.setItem("loginSymbol", "true");
    return "/img/symbolV.svg";
  }

  if (pathname === "/register" && !localStorage.getItem("registerSymbol")) {
    localStorage.setItem("registerSymbol", "true");
    return "/img/symbolO.svg";
  }

  if (pathname === "/" && !localStorage.getItem("homeSymbol")) {
    localStorage.setItem("homeSymbol", "true");
    return "/img/symbolN.svg";
  }

  let characters = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
  return `/img/symbol${characters.charAt(
    Math.floor(Math.random() * characters.length)
  )}.svg`;
};
