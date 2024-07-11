import React, { useEffect, useState } from "react";
import './newsletterModal.css';
import fetchData, { ItemObject } from '../api/fetchITems';




function Newsletter({ show, onCloseButtonClick }) {
    const [newsletterContent, setContent] = useState({});

    useEffect(() => {
        fetchNewsletter()
      }, []);

    function fetchNewsletter() {
        fetchData('sample_newsletter.json')
          .then((data) => {
            console.log("FETCH NEWSLETTER", data);
            data && setContent(JSON.parse(data));
            // console.log(products);
          });
      }        

    if (!show) {
        return null;
    } 
    
    return (
        <div className="Modal-Box">
            <div className="Modal-Content">
                <h2>{ newsletterContent.content.title }</h2>
                <p>{ newsletterContent.content.body }</p>
                <ul>{newsletterContent.content.products.map((item)=> <li>{item}</li>)}</ul>
                <p>{ newsletterContent.content.footer }</p>
                <button onClick={onCloseButtonClick}>Close Newsletter</button>
            </div>
        </div>
    );
};
export default Newsletter;