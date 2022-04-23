// theme.js
import { Theme as ChakraTheme, theme as baseTheme } from '@chakra-ui/react';

export const PPTheme = {
  colors: {
    ...baseTheme.colors,
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      "green": {
        "50": "#F3F8ED",
        "100": "#DEEBCC",
        "200": "#C8DEAB",
        "300": "#B3D18A",
        "400": "#9EC469",
        "500": "#88B748",
        "600": "#6D923A",
        "700": "#526E2B",
        "800": "#37491D",
        "900": "#1B250E"
      }
      // ...
  }

}