
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );
};

export default ThemeToggle;
