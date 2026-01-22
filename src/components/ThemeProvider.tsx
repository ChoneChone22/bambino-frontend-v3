"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const response = await fetch("/theme/data.json");
        const data = await response.json();
        console.log("Loaded theme data:", data);

        if (!data?.theme || !Array.isArray(data.theme)) {
          return;
        }

        const selectedTheme = data.theme.find(
          (t: { selected: boolean }) => t.selected === true,
        );

        const themeToApply = selectedTheme || data.theme[0];

        if (themeToApply?.colors) {
          applyTheme(themeToApply.colors);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    loadTheme();
  }, []);

  return <>{children}</>;
}

function applyTheme(colors: Record<string, string>) {
  Object.entries(colors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--color-${key}`, value);
  });
}
