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
  darkAccent: '79, 249, 255',

  lightBase: '255,255,255',
  lightMain: '0,0,0',
  lightAccent: '79, 249, 255',
} as const;

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  @font-face {
    font-family: 'Cica';
    font-style: normal;
    src: url('/fonts/Cica-Regular.ttf');
  }
  @font-face {
    font-family: 'Cica';
    font-style: italic;
    src: url('/fonts/Cica-RegularItalic.ttf');
  }
  @font-face {
    font-family: 'Cica';
    font-style: Bold;
    src: url('/fonts/Cica-Bold.ttf');
  }

  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
  }

  body {
    background-color: rgb(${props => props.theme.global.bg});
    color: rgb(${props => props.theme.global.color});
    font-family: Cica;
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
