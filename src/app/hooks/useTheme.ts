import { useCallback, useEffect } from "react";
import { useUiState } from "src/states/uiState";

export function useTheme() {
  const theme = useUiState((s) => s.theme);
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    useUiState.setState((s) => ({
      ...s,
      theme: s.theme === "dark" ? "light" : "dark",
    }));
  }, []);

  return { theme, isDark, toggle };
}
