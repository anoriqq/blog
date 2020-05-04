'use strict';

import { createGlobalStyle, DefaultTheme } from 'styled-components';

export interface Theme extends DefaultTheme {
  isDark?: boolean;
  global: {
    bg: string;
    color: string;
    link: string;
  };
  palette: Palette;
}

export interface Palette {
  darkBase: typeof palette.darkBase | string;
  darkMain: typeof palette.darkMain | string;
  darkAccent: typeof palette.darkAccent | string;

  lightBase: typeof palette.lightBase | string;
  lightMain: typeof palette.lightMain | string;
  lightAccent: typeof palette.lightAccent | string;
}

export const palette = {
  darkBase: '0,0,0',
  darkMain: '255,255,255',
  darkAccent: '0, 122, 204',

  lightBase: '255,255,255',
  lightMain: '0,0,0',
  lightAccent: '0, 122, 204',
} as const;

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  html, body {
    width: 100%;
    margin: 0;
  }

  * {
    font-family: 'Noto Sans JP', sans-serif, Cica, メイリオ !important;
  }

  body {
    background-color: rgb(${props => props.theme.global.bg});
    color: rgb(${props => props.theme.global.color});
  }

  a {
    color: rgb(${props => props.theme.global.link});
  }
`;

const baseTheme = {
  palette,
};

export const darkTheme: Theme = {
  ...baseTheme,
  global: {
    bg: palette.darkBase,
    color: palette.darkMain,
    link: palette.darkAccent,
  },
};

export const lightTheme: Theme = {
  ...baseTheme,
  global: {
    bg: palette.lightBase,
    color: palette.lightMain,
    link: palette.lightAccent,
  },
};
