import { createContext, ReactNode, useContext, useState } from "react";

const defaultTheme = { mainColor: "#7868e6", secondaryColor: "#edeef7", mainDark: "#34495e", mainLight: "#b8b5ff" };

const ThemeContext = createContext(defaultTheme);

export const ThemeProvider = ({ children }: { children?: ReactNode }) => {
    const [theme, setTheme] = useState(defaultTheme);

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    return theme;
};
