import React, { useEffect, useState } from "react";

function AlertModal({ show, onCloseButtonClick, message}) {
    const [isLoading, setIsLoading] = useState(false);

    if (!show) {
        return null;
    }

    return (
        <div className="Modal-Box inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="Modal-Content bg-white p-6 rounded-lg shadow-lg w-full relative">
            {isLoading ? (
              <h2 className="text-xl font-bold text-center">Loading ...</h2>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">{message.title}</h2>
                <div className="mb-6">
                    <h4>{message.body}</h4>
                </div>
                <div className="flex justify-end space-x-4">
                  <button className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-700" onClick={onCloseButtonClick}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
export default AlertModal;