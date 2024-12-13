import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useLocalStorage } from "../hooks";

type TTheme = "dark" | "light";

type TThemeType = {
  theme: TTheme;
  setTheme: Dispatch<SetStateAction<TTheme>>;
};

const Context = createContext<TThemeType | null>(null);

export const useTheme = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useTheme must be wrapped in Theme Context Provider");

  return { ...context, isDark: context.theme === "dark" };
};

function ThemeContextProvider({ children }: Readonly<PropsWithChildren>) {
  const [theme, setTheme] = useLocalStorage<TTheme>(
    window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light",
    "app-theme"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [setTheme, theme]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default ThemeContextProvider;
