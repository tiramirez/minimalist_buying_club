import axios from 'axios';
import React, { useState } from "react";
import './placeOrderBtn.css';



// function retieveItems() {
//     // Query all items which value is greater than 0
//     const emailtextarea = document.getElementById("email");
//     const passwordtextarea = document.getElementById("password");

//     const email = emailtextarea.value;
//     const password = passwordtextarea.value;
// };



export default function PlaceOrderBtn({ productsList }) {
  const [answerEmail, updateEmail] = useState("");

  function handleChange(event) {
    // console.log(event.target.value);
    updateEmail(event.target.value);
  }

  function submitOrder() {
    const api = process.env.REACT_APP_API_ITEMS
    const endpoint = 'test_fast_api/';
    const api_url = api + endpoint

    const content = {
      'email': answerEmail,
      'products': JSON.stringify(productsList.filter(item => item.product_quantity !== 0))
    }
    console.log(content)
    // axios.post(api_url, content )
    //   .then((response) => {
    //     console.log(response);
    //   });
  };


  return (
    <div>
      <textarea key="textareaEmail" onChange={handleChange}> Your Email.</textarea>
      <button onClick={submitOrder}>Place Order</button>
    </div>
  )

};