import React, { useState } from "react";
import newsletterContent from './../static/sample_newsletter.json';
import './newsletterModal.css';




function Newsletter({ show, onCloseButtonClick }) {
    const { title, body, products, footer } = newsletterContent['content'];
    console.log(newsletterContent);
    console.log( newsletterContent['content   ']);

    if (!show) {
        return null;
    } 
    
    return (
        <div className="Modal-Box">
            <div className="Modal-Content">
                <h2>{ title }</h2>
                <p>{ body }</p>
                <ul>{products.map((item)=> <li>{item}</li>)}</ul>
                <p>{ footer }</p>
                <button onClick={onCloseButtonClick}>Close Newsletter</button>
            </div>
        </div>
    );
};
export default Newsletter;