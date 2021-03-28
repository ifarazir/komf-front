import { createContext, ReactNode, useContext, useState } from "react";

const defaultTheme = { mainColor: "#3498db", secondaryColor: "#ecf0f1" };

const ThemeContext = createContext(defaultTheme);

export const ThemeProvider = ({ children }: { children?: ReactNode }) => {
    const [theme, setTheme] = useState(defaultTheme);

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    return theme;
};