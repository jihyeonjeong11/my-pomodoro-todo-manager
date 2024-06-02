import { type DefaultTheme } from "styled-components";
import colors from "styles/colors";

const defaultTheme: DefaultTheme = {
  colors,
} as const;

const themes = { defaultTheme };

export type ThemeName = keyof typeof themes;

export default themes as Record<ThemeName, DefaultTheme>;
