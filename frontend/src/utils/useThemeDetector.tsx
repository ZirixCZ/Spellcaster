import * as React from "react";

// returns false for dark theme
const useThemeDetector = () => {
  const getCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkTheme, setIsDarkTheme] = React.useState(getCurrentTheme());
  const mqListener = (e: any) => {
    setIsDarkTheme(e.matches);
  };

  React.useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);
  return !isDarkTheme;
};

export default useThemeDetector;
