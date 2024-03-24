//@ts-nocheck

import { useState } from "react";
import axios from "axios";
import API_URL from "./apiConfig";
import { FaImage } from "react-icons/fa"; // Import image icon
import Switch from 'react-switch';
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";
import { useDarkMode } from "./hooks/useDarkMode";
const CreateProductForm = () => {

  const pageTitle = "Create Product";
  const isDarkMode = useDarkMode()
  const pageDescription = "Create a new product with this form.";


  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: string;
originalPrice: string;
    discountPercentage: string;
    image: File | string;
    flavor: string;
    isNewProduct: boolean; 

  }>({
    name: "",
    description: "",
    price: "",

    originalPrice: "",
    discountPercentage: "",
    image: "",
    flavor: "",
    isNewProduct: false,
  });
  const [productAdded, setProductAdded] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  //saucss meassge


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFormData({
            ...formData,
            image: file, // Set the image file object
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("originalPrice", formData.originalPrice);
    formDataToSend.append("discountPercentage", formData.discountPercentage);
    formDataToSend.append("flavor", formData.flavor);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("isNewProduct", String(formData.isNewProduct)); 

    try {
      const response = await axios.post(`${API_URL}/products`, formDataToSend);
      console.log(response.data);
      // Reset form data after successful submission
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        discountPercentage: "",
        image: "",
        flavor: "",
        isNewProduct: false,
      });
  console.log("Product added successfully", response.data);
  
   
      navigate("/ProductAddedConfirmation");
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        console.error("Error creating product:", error.response.data);
        // Provide error message to the user
        alert(
          "An error occurred while creating the product. Please try again later."
        );
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        // Provide error message to the user
        alert(
          "No response received from the server. Please check your internet connection and try again."
        );
      } else {
        // Something else happened while setting up the request
        console.error("Error setting up the request:", error.message);
        // Provide error message to the user
        alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  const handleImageDelete = () => {
    // Reset the image in the form data
    setFormData({
      ...formData,
      image: "",
    });

    // Reset the file input
    const input = document.getElementById("image-upload") as HTMLInputElement;
    if (input) {
      input.value = ""; // Reset the input value
    }
  };

  return (

    <div    className={` ${
      isDarkMode ? "bg-black text-white" : "bg-white text-black"
    }`}
  >
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <meta name="description" content={pageDescription} />
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          <div
            className={`w-full ${
              formData.image
                ? "lg:w-3/4 flex"
                : "xl:w-full lg:w-11/12"
            } `}
          >
            <div className="w-full lg:w-2/4 md:w-1/2 bg-cover rounded-l-lg relative md:block hidden">
              {formData.image && (
                <div
                  className="h-full w-full bg-cover rounded-l-lg"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(
                      formData.image
                    )})`,
                  }}
                >
                  <button
                    onClick={handleImageDelete}
                    className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 focus:outline-none focus:shadow-outline"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-center items-center h-full ">
              <div
  className={`
  max-w-5xl
  p-6
  rounded-xl
  lg:rounded-l-none
  ${formData.image ? "ml-auto" : "mx-auto"}
  ${formData.image ? "order-1 lg:order-2" : ""}
  ${isDarkMode ? "bg-gray-800 text-white shadow-xl" : "bg-gray-200 text-black shadow-md"}
`}
              >
                <h3 className="py-4 text-2xl text-center ">
                  Create a New Product
                </h3>
                {loading && (
                  <div className="flex justify-center mb-4">
                    <div className="loader"></div>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="px-4 pt-6 pb-4 mb-4 rounded"
                >
                  <div className="flex flex-wrap -mx-2 mb-4">
                    {formData.image && (
                      <div className="w-full px-2 mb-4 flex justify-center md:hidden">
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Product"
                            className="object-cover rounded-full"
                            style={{ width: "200px", height: "200px" }}
                          />
                          <button
                            onClick={handleImageDelete}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center -mt-2 -mr-2 focus:outline-none"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="w-full sm:w-1/2 px-2 mb-4">
                      <label
                        htmlFor="name"
                        className="block mb-1 "
                      >
                        Product Name
                      </label>
                      <input
  type="text"
  id="name"
  name="name"
  placeholder="Enter product name"
  value={formData.name}
  onChange={handleInputChange}
  className={`
    w-full
    px-4
    py-2
    border
    rounded-md
    ${isDarkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}
  `}
  required
/>

                    </div>
                    <div className="w-full sm:w-1/2 px-2 mb-4">
  <label htmlFor="image" className="block mb-1">
    Product Image
  </label>
  <div className={`
    flex
    items-center
    border
    border-gray-400
    rounded-md
    p-2
    ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}
  `}>
    <label
      htmlFor="image-upload"
      className={`cursor-pointer mr-2 ${isDarkMode ? "text-blue-300" : "text-blue-500"}`}
    >
      <FaImage  />
    </label>
    <input
      type="file"
      id="image-upload"
      name="image"
      onChange={handleImageChange}
      className="hidden"
      required
    />
    <span className={`text-gray-600 ${isDarkMode ? "text-white" : "text-black"}`}>
      {formData.image instanceof File
        ? formData.image.name
: "Select an image"
      }
        
    </span>
  </div>
</div>



                    <div className="w-full px-2 mb-4">
                      <label
                        htmlFor="description"
                        className="block mb-1 "
                      >
                        Product Description
                      </label>
                      <textarea
                        placeholder="Enter product description"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={`
                        w-full
                        px-4
                        py-2
                        border
                        rounded-md
                        ${isDarkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}
                      `}
                        required
                      ></textarea>
                    </div>
                    <div className="w-full sm:w-1/2 px-2 mb-4">
                      <label
                        htmlFor="price"
                        className="block mb-1 "
                      >
                        Price
                      </label>
                      <input
                      placeholder="Enter product price"
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={`
                        w-full
                        px-4
                        py-2
                        border
                        rounded-md
                        ${isDarkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}
                      `}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="w-full sm:w-1/2 px-2 mb-4">
                      <label
                        htmlFor="flavor"
                        className="block mb-1 "
                      >
                        Flavor
                      </label>
                      <input
                        placeholder="Enter product flavor"
                        type="text"
                        id="flavor"
                        name="flavor"
                        value={formData.flavor}
                        onChange={handleInputChange}
                        className={`
    w-full
    px-4
    py-2
    border
    rounded-md
    ${isDarkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}
  `}
                        required
                      />
                    </div>
                    <div className="w-full px-2 mb-4 flex items-center">
                    <div className="w-full px-2 mb-4 flex items-center">
  <label htmlFor="isNewProduct" className="mr-4">
    Is the product new?
    <span className="ml-2">{formData.isNewProduct ? "Yes" : "No"}</span>
  </label>
  <Switch
    id="isNewProduct" 
    onChange={() => setFormData({ ...formData, isNewProduct: !formData.isNewProduct })}
    checked={formData.isNewProduct}
  />
</div>

      </div>

                    <div className="w-full px-2 mb-4 flex items-center">
  <label className="mr-4" 
  htmlFor="showAdditionalFields"
  >
    Do you want to add discount to the product?
    <span className="ml-2">{showAdditionalFields ?
      "Yes" : "No"
      
    
      
    }</span>
    {showAdditionalFields && (
      <span className="ml-4">
        Fill in the discount price and discount percentage.
      </span>
    )}
  </label>
  <Switch
    id="showAdditionalFields"
    onChange={() => setShowAdditionalFields(!showAdditionalFields)}
    checked={showAdditionalFields}
  />
</div>

    {showAdditionalFields && (
                    <div className="w-full sm:w-1/2 px-2 mb-4">
                      <label
                        htmlFor="originalPrice"
                        className="block mb-1 "
                      >
                      discount price 
                      </label>
                      <input
                        placeholder="Enter product original price"
                        type="number"
                        id="originalPrice"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        className={`
                        w-full
                        px-4
                        py-2
                        border
                        rounded-md
                        ${isDarkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}
                      `}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    )}
                    {showAdditionalFields && (
                    <div className="w-full sm:w-1/2 px-2 mb-4">
                      <label
                        htmlFor="discountPercentage"
                        className="block mb-1 "
                      >
                        Discount Percentage
                      </label>
                      <input
                        placeholder="Enter product discount percentage"
                        type="number"
                        id="discountPercentage"
                        name="discountPercentage"
                        value={formData.discountPercentage}
                        onChange={handleInputChange}
                        className={`
                        w-full
                        px-4
                        py-2
                        border
                        rounded-md
                        ${isDarkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}
                      `}
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                    )}
                  </div>

                  <div className="w-full px-2 mb-4 flex justify-center items-center">
  {loading ? (
    <div className="text-center">
      <span className="animate-spin inline-flex rounded-full h-8 w-8 border-b-2 border-gray-900"></span>
      <span className="block mt-2 text-2xl font-bold">Creating product...</span>
    </div>
  ) : (
    <button
      type="submit"
      className="bg-green-500 text-white px-4 py-2 rounded-md text-2xl font-bold"
    >
      Create Product
    </button>
  )}
</div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductForm;
