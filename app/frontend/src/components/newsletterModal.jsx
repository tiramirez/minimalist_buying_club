import React, { useEffect, useState } from "react";
import './newsletterModal.css';
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
        })
        // .catch((error) => {
        //     error && setContent("Place Holder");
        //     setIsLoading(false);
        // })
        ;
    }

    if (!show | !newsletterContent) {
        return null;
    } 
    
    return (
        <div className="Modal-Box inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full mx-auto my-5 bg-white p-6 rounded-lg shadow-lg relative lg:w-2/3">
            {isLoading ? (
                <h2>Loading ...</h2>
            ) : (
                <div>
                    <button className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-green-700" onClick={onCloseButtonClick}>Close Newsletter</button>
                    <div className="py-2">{parse(newsletterContent)}</div>
                </div>
                )
            } 
            </div>
        </div>
    );
};
export default Newsletter;