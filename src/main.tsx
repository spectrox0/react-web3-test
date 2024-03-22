import { ThemeProvider, ToastProvider } from "@providers";
import "@styles/index.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind"; // 🥵 128.1k gzipped: 18.7k <- This library is heavy
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// The strick mode is not necessary, but it's a good practice to use it in the root of the app to catch potential issues
// We need use always cleaner function in useEffect, useMemo, useCallback, etc. to avoid memory leaks
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <ToastProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ToastProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
