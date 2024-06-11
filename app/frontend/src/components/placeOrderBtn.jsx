import axios from 'axios';
import React from "react";
import './placeOrderBtn.css';



// function retieveItems() {
//     // Query all items which value is greater than 0
//     const emailInput = document.getElementById("email");
//     const passwordInput = document.getElementById("password");

//     const email = emailInput.value;
//     const password = passwordInput.value;
// };

function submitOrder() {
  axios.post("/placeOrder/", {
      email: 'test@email.com',
      products:{'prod1':0,'prod2':3}
    })
    .then((response) => {
      console.log(response);
    });
};


export default function PlaceOrderBtn(){
    return(
        <div>
            <button onClick={submitOrder}>Place Order</button>
        </div>
    )

};