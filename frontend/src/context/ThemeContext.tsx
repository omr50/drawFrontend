import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  createTheme,
  PaletteOptions,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";

type ExtendedTheme = Theme & {
  palette: PaletteOptions & {
    revPrimary: {
      main: string;
    };
  };
};

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: ExtendedTheme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedDarkMode);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    if (storedDarkMode !== darkMode) {
      setDarkMode(storedDarkMode);
    }
  }, [darkMode]);

  const baseTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#FF8C00" : "#1976D2",
      },
      secondary: {
        main: darkMode ? "#FF4081" : "#2196F3",
      },
      error: {
        main: darkMode ? "#FF1744" : "#f44336",
      },
      success: {
        main: darkMode ? "#4CAF50" : "#00C853",
      },
      warning: {
        main: darkMode ? "#FFC107" : "#FFD600",
      },
      info: {
        main: darkMode ? "#2196F3" : "#64B5F6",
      },
    },
  });

  const theme: ExtendedTheme = {
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      revPrimary: {
        main: darkMode ? "#1976D2" : "#FF8C00",
      },
    },
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
