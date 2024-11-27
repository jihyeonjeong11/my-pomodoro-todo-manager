import { type DefaultTheme } from "styled-components";
import { colors, lightColors } from "@/styles/colors";
import sizes from "@/styles/sizes";

const defaultTheme: DefaultTheme = {
  colors,
  sizes,
} as const;

const lightTheme: DefaultTheme = {
  colors: lightColors,
  sizes,
} as const;

const themes = { defaultTheme, lightTheme };

export type ThemeName = keyof typeof themes;

export default themes as Record<ThemeName, DefaultTheme>;
