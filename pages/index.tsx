import { ThemeProvider } from "styled-components";
import MainPage from "components";
import themes from "styles/themes";
import { useState } from "react";
import { SvgSun, SvgMoon } from "@/public/media/icons";

export default function Home() {
  const [theme, setTheme] = useState<"defaultTheme" | "lightTheme">(
    "defaultTheme"
  );
  return (
    <main>
      <nav className="upper-nav">
        <button
          type="button"
          onClick={() =>
            setTheme((prev) =>
              prev === "defaultTheme" ? "lightTheme" : "defaultTheme"
            )
          }
        >
          {theme === "defaultTheme" ? <SvgSun /> : <SvgMoon />}
        </button>
      </nav>
      <ThemeProvider theme={themes[theme]}>
        <MainPage />
      </ThemeProvider>
    </main>
  );
}
