
//@ts-nocheck

import { useDarkMode } from "./hooks/useDarkMode";




const ViewItem = ({ item, onClose }) => {
  const isDarkMode = useDarkMode();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
      <div
        className={`rounded-lg shadow-lg bg-white text-black ${
          isDarkMode ? "dark-mode" : ""
        }`}
      >
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold mb-2">Product Details</h2>
          <p className="text-base mb-4">Here are the details of the selected item:</p>
          <hr className="border-gray-300 mb-4" />
          <div>
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-base mb-4">{item.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-xl font-semibold mr-2">${item.price}</span>
              <span className="text-gray-500">Free Shipping</span>
            </div>
            <div className="flex justify-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="max-h-64 max-w-full object-contain"
              />
            </div>
            <p className="text-sm mb-4">Category: {item.category?.name}</p>
            {item.isNew && (
              <p className="text-sm mb-4">New Arrival!</p>
            )}
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default ViewItem;