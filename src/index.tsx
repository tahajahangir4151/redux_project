import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { fetchAllCategories, fetchAllProducts } from "./store/slices/productsSlice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
store.dispatch(fetchAllProducts());
store.dispatch(fetchAllCategories());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
