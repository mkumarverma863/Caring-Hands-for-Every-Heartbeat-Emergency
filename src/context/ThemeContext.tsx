import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'black-purple' | 'black-white' | 'minimal-light';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('elderguard_theme') as ThemeMode;
    if (saved && ['black-purple', 'black-white', 'minimal-light'].includes(saved)) {
      return saved;
    }
    return 'black-purple'; // Default to the requested Black Purple theme!
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('elderguard_theme', newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'black-purple') setTheme('black-white');
    else if (theme === 'black-white') setTheme('minimal-light');
    else setTheme('black-purple');
  };

  const isDark = theme === 'black-purple' || theme === 'black-white';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-black-purple', 'theme-black-white', 'theme-minimal-light', 'dark');
    root.classList.add(`theme-${theme}`);
    if (isDark) {
      root.classList.add('dark');
    }
    root.setAttribute('data-theme', theme);
  }, [theme, isDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
