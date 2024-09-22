import { extendBaseTheme } from "@chakra-ui/react";

const theme = extendBaseTheme({
  fonts: {
    heading: `'Helvetica75', sans-serif, 'Inter','Platypi' `,
    body: `'Helvetica75', sans-serif, 'Inter' ,'Platypi'`,
  },
  styles: {
    global: {
      body: {
        color: "#ffffff",
        bg: "#000",
      },
    },
  },
});

export default theme;
