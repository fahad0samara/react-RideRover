import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./apiConfig";
import { useDarkMode } from "./hooks/useDarkMode";
import {Helmet} from "react-helmet";
interface Product {
  _id: string;
  image: string;
  name: string;
  isNewProduct: boolean;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
}

const UserProducts: React.FC = () => {
  const pageTitle = "User Products";
    const isDarkMode = useDarkMode();
    const [userProducts, setUserProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get<{ userIP: string }>(
            `${API_URL}/get-user-ip`
          );
          const userIP = response.data.userIP; // Store userIP if needed later
          await fetchUserProducts(userIP);
          setLoading(false);
        } catch (error) {
          setError("Error fetching user data");
          setLoading(false);
        }
      };
  
      fetchData();
    }, []); // No need to include userIP as a dependency
  
    const fetchUserProducts = async (userIP: string) => {
      try {
        const response = await axios.get<Product[]>(
          `${API_URL}/products/user/${userIP}`
        );
        setUserProducts(response.data);
      } catch (error) {
        setError("Error fetching user products");
      }
    };

  return (
    <div
      className={`${
        isDarkMode ? "bg-black text-white antialiased" : "bg-white text-black"
      }`}
    >
         <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-center text-3xl font-bold text-green-400">
          Hello,
        </h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <>
                <div className="text-center mx-auto px-4">
                <p className="mb-4 text-xl">
                    {userProducts.length === 0 ? (
                      "You haven't added any products yet."
                    ) : (
                      <>
                        Here are the products that you've added{" "}
                        <span className=" text-green-400  text-xl font-bold  ">
                          {userProducts.length}{" "}
                          {userProducts.length === 1 ? "product" : "products"}
                        </span>
                      </>
                    )}
                  </p>

                  <p className="text-gray-400 text-lg mb-4 font-semibold">
                    Thank you for your help! 💖
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ml-10 ">
                  {userProducts.map((product) => (
                    <div
                      key={product._id}
                      className="w-72 bg-white shadow-xl rounded-2xl duration-500 hover:scale-105 hover:shadow-xl"
                    >
                      <a href="#">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-80 w-72 object-cover rounded-t-xl"
                        />
                        <div className="px-4 py-3 w-72">
                          {product.isNewProduct && (
                            <div className="mb-2">
                              <span className="inline-block bg-teal-200 text-teal-800 py-1 px-3 text-xs rounded-full uppercase font-semibold tracking-wide">
                                New
                              </span>
                            </div>
                          )}
                          <span className="text-black mr-3 uppercase text-xs">
                            Brand
                          </span>
                          <p className="text-lg font-bold text-black truncate block capitalize">
                            {product.name}
                          </p>
                          <div className="flex items-center">
                            <p className="text-lg font-semibold text-black cursor-auto my-3">
                              ${product.price}
                            </p>
                            {product.originalPrice && (
                              <del>
                                <p className="text-sm text-gray-600 cursor-auto ml-2">
                                  ${product.originalPrice}
                                </p>
                              </del>
                            )}
                            <div className="ml-auto">
                              {product.discountPercentage && (
                                <div className="mb-2">
                                  <span className="inline-block bg-yellow-200 text-yellow-800 py-1 px-3 text-xs rounded-full uppercase font-semibold tracking-wide">
                                    {product.discountPercentage}% Off
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProducts;
