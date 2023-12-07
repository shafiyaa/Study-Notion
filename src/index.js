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



// android aur AI k 4 course  course banane hain

// catalogue ka last section ka pics sahi krna h




// course page k catalogue me New pe click krne se recently add courses dikhane hain




// yeh error saffa se ko dikhana h 
// logo gayab ho rha h small screeen
// payment  service me verify payment mei cart epmty wala function nhi chl rha h
// slice me completed wale array me koi value nhi aarhi h ... uske wajha se progress baar me koi reflection nhi ho rha h













// last me krna h
// instructor ko myCourse me time duration ko sahi krna  h







 

// category k model course update nhi ho rha h



//  problems


// Loading ka toast remove krna h (profile and setting API se)

// navbar k catalog ko style krna h hover krne pe neeche line aani chahiye 



// moving code ki style sahi krna h
// lazy loading add krna




// --------------backend----
//
// remoive all console



// -----------------yeh sab last mai krna h----------------
// saare pages ko responsive krna h last mai 
// learn useRef  and useOnCkickOutside function
// lean calc()
// @apply in Css?

//--------------- optionals---------------

// phone number wali input field me text type ho rha firefox mai agr sahi hoga toh karo