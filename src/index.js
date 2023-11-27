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


// instructor ka my course wale ka top part responsive krna h
// catalogue ka last section ka pics sahi krna h
// delete all wala button ka controller likhna h- idea - delele all pe api call krne k time usme saare course data send krdenge phir controller me uska use kr k delete kr denge

// logog gayab ho rha h small screeen pe




// responsive krna h
// review me stars nhi aa rhe hain uske sahi krna 
// my Course me delete All  ka button add krna h aur saare course ko ek saath delete krne ka controller banana padega
// course page k catalogue me New pe click krne se recently add courses dikhane hain




// yeh dono error saffa se ko dikhana h 
// payment  service me verify payment mei cart epmty wala function nhi chl rha h
// slice me completed wale array me koi value nhi aarhi h ... uske wajha se progress baar me koi reflection nhi ho rha h













// last me krna h
// instructor ko myCourse me time duration ko sahi krna  h
// instructor k myCourse mai deleteAll ka button add krna h aur deleteAll ka controller likhna







 

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