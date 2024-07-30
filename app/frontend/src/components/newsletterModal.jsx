import React, { useEffect, useState } from "react";
// import './newsletterModal.css';
import fetchData from '../api/fetchITems';
import parse from 'html-react-parser';




function Newsletter({ show, onCloseButtonClick }) {
    const [newsletterContent, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchNewsletter();
      }, []);

    function fetchNewsletter() {
        setIsLoading(true);
        fetchData('newsletter.json')
            .then((data) => {
                data && setContent(JSON.parse(data).Body);
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
                    <button onClick={onCloseButtonClick}>Close Newsletter</button>
                    {parse(newsletterContent)}
                </div>
                )
            } 
            </div>
        </div>
    );
};
export default Newsletter;