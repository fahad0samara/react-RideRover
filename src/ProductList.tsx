// ProductList.tsx
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from "./apiConfig";
const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (page: number, pageSize: number) => {
    try {
      const response = await axios.get(`${API_URL}/products?page=${page}&pageSize=${pageSize}`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, 10); // You can adjust the page size as needed
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
          // Adjust the above line based on your product structure
        ))}
      </ul>

      <div>
        <p>Page {currentPage} of {totalPages}</p>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ProductList;
