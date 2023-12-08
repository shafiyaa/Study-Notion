import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
   // find the items 
   totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,

   // find the total price
   totalPrice: localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0,

   // find the course in the cart
   cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
}

const cartSlice = createSlice({
   name: "cart",
   initialState: initialState,
   reducers: {

      //  HW- add toast to this function
      // add to CART
      addToCart: (state, value) => {
         const course = value.payload
         const index = state.cart.findIndex((item) => (item._id === course._id)
         )

         //   (agr course pehle se cart me h toh kuch nhi krna h)
         // -------------------------
         // if there is an error check the code!!
         if (index >= 0) {
            toast.error("Course is already in the Cart")
            return;
         }

         // update the cart after adding the course
         state.cart.push(course)
         state.totalItems++
         state.totalPrice += course?.price

         // update localStorage
         localStorage.setItem("cart", JSON.stringify(state.cart))
         localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
         localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice))

         toast.success("Course Added to Cart")

      },
      // remove from Cart
      removeFromCart: (state, value) => {
         const courseId = value.payload
         const index = state.cart.findIndex((item) => (
            item._id === courseId
         ))

         // course is found in cart
         if (index >= 0) {

            state.totalItems--
            state.totalPrice -= state.cart[index].price
            state.cart.splice(index, 1)
         }
         // update the local Storage
         localStorage.setItem("cart", JSON.stringify(state.cart))
         localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice))
         localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

         toast.success("Course removed from the Cart")

      },
      // reset CArt
      resetCart: (state) => {
         console.log("emptying the cart ")
         state.cart = []
         state.totalItems = 0
         state.totalPrice = 0

         localStorage.removeItem("cart")
         localStorage.removeItem("totalItems")
         localStorage.removeItem("totalPrice")
      }

   }
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer
