// theme.js
import { Theme as ChakraTheme, theme as baseTheme } from '@chakra-ui/react';

export const PPTheme = {
  colors: {
    ...baseTheme.colors,
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    greenGlassAlpha: "rgba(120,169,227,0.1)",
    greenGlassAlpha: "rgba(38,52,20,0.7)",
    //     greenGlassAlpha: "rgba(120,169,227,0.3)",
    // greenGlassAlpha: "rgba(38,52,20,0.3)",
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
    },
    "cyan": {
      "50": "#E5FCFF",
      "100": "#B8F8FF",
      "200": "#8AF3FF",
      "300": "#5CEFFF",
      "400": "#2EEAFF",
      "500": "#00E5FF",
      "600": "#00B8CC",
      "700": "#008A99",
      "800": "#005C66",
      "900": "#002E33"
    },
    "blue": {
      "50": "#EAF2FB",
      "100": "#C4D9F3",
      "200": "#9EC1EB",
      "300": "#78A9E3",
      "400": "#5291DB",
      "500": "#2C79D3",
      "600": "#2361A9",
      "700": "#1B487E",
      "800": "#123054",
      "900": "#09182A"
    },
        "purple": {
      "50": "#EDE7FD",
      "100": "#CCBCFB",
      "200": "#AB91F8",
      "300": "#8B66F5",
      "400": "#6A3BF2",
      "500": "#4910EF",
      "600": "#3B0DBF",
      "700": "#2C0A8F",
      "800": "#1D0660",
      "900": "#0F0330"
    }
    // ...
  }

}