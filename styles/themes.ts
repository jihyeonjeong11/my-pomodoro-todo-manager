import { type DefaultTheme } from "styled-components";
import colors from "@/styles/colors";
import sizes from "@/styles/sizes";

const defaultTheme: DefaultTheme = {
  colors,
  sizes,
} as const;

const themes = { defaultTheme };

export type ThemeName = keyof typeof themes;

export default themes as Record<ThemeName, DefaultTheme>;
