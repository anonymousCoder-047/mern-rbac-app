
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material";

export const ThemeConfig = ({ children }) => {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#05445E",
      },
      secondary: { main: "#FFFFFF" },
    },
    typography: {
      fontFamily: "Noto Sans JP, sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  });

  theme = responsiveFontSizes(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};