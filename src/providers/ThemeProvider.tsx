import { FCC } from "@types";
import localForage from "localforage";
import { createContext, useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";
// list all possibles themes
const themes: readonly Theme[] = ["light", "dark"] as const;
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const ThemeProvider: FCC = ({ children }) => {
  const getInitialTheme = async (): Promise<Theme> => {
    return localForage
      .getItem<Theme | undefined>("theme")
      .then(
        value =>
          themes.find(a => value === a) ||
          (window?.matchMedia?.("(prefers-color-scheme: dark)")?.matches
            ? "dark"
            : "light")
      );
  };
  const [theme, setTheme] = useState<Theme>("dark");
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === "light" ? "dark" : "light";
      localForage.setItem("theme", newTheme);
      return newTheme;
    });
  };
  useLayoutEffect(() => {
    const root = document.getElementsByTagName("html")[0];
    const isDark = root.classList.contains("dark");
    if (!isDark && theme === "dark") {
      root.classList.add("dark");
    } else if (isDark && theme === "light") {
      root.classList.remove("dark");
    }
  }, [theme]);

  useLayoutEffect(() => {
    (async () => {
      await getInitialTheme().then(setTheme);
      setLoading(false);
    })();
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {loading ? null : children}
    </ThemeContext.Provider>
  );
};
