import React, { useEffect, useState } from "react";
import './newsletterModal.css';
import fetchData from '../api/fetchITems';
import parse from 'html-react-parser';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'




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
        <Dialog open={show} onClose={onCloseButtonClick} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-4 sm:pb-4">
                            <div className="flex-col items-end justify-end">
                                <button
                                    className="absolute right-4 h-8 max-h-[32px] w-8 max-w-[32px] rounded-lg text-right bg-blue-500 transition-all hover:bg-blue-800"
                                    type="button"
                                    onClick={onCloseButtonClick}
                                >
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform hover:bg-blue-gray-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="white"
                                            strokeWidth="2"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                                {isLoading ? (
                                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Loading ...
                                    </DialogTitle>
                                ) : (
                                    <div>
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Newsletter
                                        </DialogTitle>
                                        {parse(newsletterContent)}
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};
export default Newsletter;