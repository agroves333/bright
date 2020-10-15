import theme from "@rebass/preset"

const myTheme = {
  ...theme,
  colors: {
    primary: "#07c",
    secondary: "tomato",
    lightgray: "#eaeaea",
    mediumgray: "#cdcdcd",
    danger: "#970d0d",
  },
  fonts: {
    body: "Roboto, system-ui, sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  buttons: {
    primary: {
      color: "white",
      bg: "primary",
      cursor: "pointer",
    },
  },
  variants: {
    nav: {
      color: "lightgray",
      "&:hover": {
        color: "white",
      },
      textDecoration: "none",
      cursor: "pointer",
      fontWeight: "bold",
    },
  },
}

export default myTheme
