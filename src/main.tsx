import 'regenerator-runtime/runtime';  // Polyfill for async functions
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";  // Chakra UI components and theming
import { Provider } from 'react-redux';
import store from './store/store';
import "./index.css";  // Global CSS styles including Tailwind CSS

const lightThemeColors = {  // Custom color palette for the light theme
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const darkThemeColors = {  // Custom color palette for the dark theme
  brand: {
    900: "#0d1b2a",
    800: "#1b263b",
    700: "#415a77",
  },
};

const lightTheme = extendTheme({  // Extend Chakra UI theme with custom light colors
  colors: lightThemeColors,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  } as ThemeConfig,
});

const darkTheme = extendTheme({  // Extend Chakra UI theme with custom dark colors
  colors: darkThemeColors,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  } as ThemeConfig,
});

const Root = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.config.initialColorMode === "light" ? darkTheme : lightTheme);
  };

  return (
    <React.StrictMode>  // Enable strict mode for highlighting potential problems
      <ChakraProvider theme={theme}>  // Provide Chakra UI theme to the app
        <Provider store={store}>  // Provide Redux store to the app
          <App toggleTheme={toggleTheme} />  // Main application component with theme toggle
        </Provider>  // Wrap the app with Provider to apply the Redux store
      </ChakraProvider>  // Wrap the app with ChakraProvider to apply the theme
    </React.StrictMode>  // End of strict mode
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);  // Initialize React app and render it to the DOM