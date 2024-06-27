import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LayersProvider } from "./context/LayersContext";
import { InteractiveProvider } from "./context/InteractiveContext";
import { EditorProvider } from "./context/EditorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <LayersProvider>
    <InteractiveProvider>
      <EditorProvider>
        <App />
      </EditorProvider>
    </InteractiveProvider>
  </LayersProvider>
  </React.StrictMode>
);
