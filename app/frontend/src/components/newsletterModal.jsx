import React, { useEffect, useState } from "react";
import fetchData from '../api/fetchITems';
import parse from 'html-react-parser';
import { LayoutComponent } from './layout/modal'




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
        <LayoutComponent show={show} updateShow={onCloseButtonClick}>
            {isLoading ? (
                <h2 className="text-xl font-bold text-center">Loading ...</h2>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Newsletter
                    </h2>
                    {parse(newsletterContent)}
                </div>
            )}
        </LayoutComponent >
    );
};
export default Newsletter;