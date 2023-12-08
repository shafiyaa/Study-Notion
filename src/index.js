import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux";
import rootReducer from "./reducers/reducer"
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast"

const store = configureStore({
  reducer: rootReducer,

})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster></Toaster>
      </BrowserRouter>
    </Provider>

  </React.StrictMode>
);













// yeh error saffa se ko dikhana h 
// logo gayab ho rha h small screeen
// payment  service me verify payment mei cart epmty wala function nhi chl rha h
// slice me completed wale array me koi value nhi aarhi h ... uske wajha se progress baar me koi reflection nhi ho rha h
// instructor ko myCourse me time duration ko sahi krna  h









// --------------backend----
//
// remoive all console



