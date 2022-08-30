import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
