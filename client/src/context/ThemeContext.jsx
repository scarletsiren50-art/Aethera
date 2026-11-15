
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("aethera-theme");

    return savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("aethera-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within ThemeProvider"
    );
  }

  return context;
};
