import { FCC } from "@types";
import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const ThemeProvider: FCC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle("dark");
  };

  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];
    const isDark = root.classList.contains("dark");
    if (!isDark) {
      setTheme("light");
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
