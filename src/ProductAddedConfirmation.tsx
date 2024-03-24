// ProductAddedConfirmation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductAddedConfirmation: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Product Added Successfully!</h2>
      {/* Display the product information or any other details you want to show */}
      {/* You can include an image, text, or any other relevant information */}
        <p className="text-lg">Product Name: Product 1</p>
      
      <div className="mt-4">
        <Link to="/CreateProductForm" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">
          Add Another Product
        </Link>
        <Link to="/List" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Go to Products
        </Link>
        
      </div>
    </div>
  );
};

export default ProductAddedConfirmation;
