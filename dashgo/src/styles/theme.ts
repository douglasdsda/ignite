import { extendTheme, useColorModeValue } from "@chakra-ui/react";

 

const bg = useColorModeValue("white", "gray.900")
const color = useColorModeValue("gray.900", "gray.50")

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5c6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
          bg: bg,
         color: color,
        // bg: "gray.900",
        // color: "gray.50",
      },
    },
  },
});
