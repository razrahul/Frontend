// 1. Import the extendTheme function
import * as React from "react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Provider } from "react-redux";
import store from "./redux/store";
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

// 3. Pass the `theme` prop to the `ChakraProvider`

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeSwitcher />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
