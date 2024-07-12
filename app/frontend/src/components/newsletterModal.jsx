import React, { useEffect, useState } from "react";
import './newsletterModal.css';
import fetchData from '../api/fetchITems';




function Newsletter({ show, onCloseButtonClick }) {
    const [newsletterContent, setContent] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchNewsletter()
      }, []);

    function fetchNewsletter() {
        setIsLoading(true);
        fetchData('sample_newsletter.json')
            .then((data) => {
                data && setContent(JSON.parse(data).content);
                setIsLoading(false);
            });
    }

    if (!show) {
        return null;
    } 
    
    return (
        <div className="Modal-Box">
            <div className="Modal-Content">
            {isLoading ? (
                <h2>Loading ...</h2>
            ) : (
                <div>

                    <h2>{newsletterContent.title}</h2>
                    <p>{newsletterContent.body}</p>
                    <ul>{newsletterContent.products?.map((item) => { return <li key={item}>{item}</li> })}</ul>
                    <p>{newsletterContent.footer}</p>
                    <button onClick={onCloseButtonClick}>Close Newsletter</button>
                </div>
                )
            } 
            </div>
        </div>
    );
};
export default Newsletter;