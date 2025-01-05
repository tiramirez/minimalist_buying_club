import React, { useState } from "react";
import { LayoutComponent } from './layout/modal'

function AlertModal({ show, onCloseButtonClick, message }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!show) {
    return null;
  }

  return (
    <LayoutComponent show={show} updateShow={updateShow}>
      {isLoading ? (
        <h2 className="text-xl font-bold text-center">Loading ...</h2>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {message.title}
          </h2>
          <div className="text-xl mb-6">
            <p>{message.body}</p>
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-gray-700"
              onClick={onCloseButtonClick}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </LayoutComponent>
  );
}
export default AlertModal;