import { ThemeProvider } from "styled-components";
import MainPage from "components";
import themes from "styles/themes";
import { useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState("defaultTheme");
  console.log(themes);
  return (
    <main>
      <ThemeProvider theme={themes[theme]}>
        <MainPage />
        <button
          onClick={() =>
            setTheme((prev) =>
              prev === "defaultTheme" ? "lightTheme" : "defaultTheme"
            )
          }
        >
          current {theme}
        </button>
      </ThemeProvider>
    </main>
  );
}
