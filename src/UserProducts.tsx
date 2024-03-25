import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./apiConfig";
import { useDarkMode } from "./hooks/useDarkMode";
import {Helmet} from "react-helmet";
interface Bike {
  _id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  
}

const UserProducts: React.FC = () => {
  const pageTitle = "User Bikes";
  const isDarkMode = useDarkMode();
  const [userBikes, setUserBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserBikes();
  }, []);

  const fetchUserBikes = async () => {
    try {
      const response = await axios.get<Bike[]>(`${API_URL}/bikes/all`);
      setUserBikes(response.data.products);
      setLoading(false);
      setError(null);
      console.log(response.data);
      
    } catch (error) {
      setError("Error fetching user bikes");
      setLoading(false);
      setUserBikes([]); // Set userBikes to an empty array in case of an error
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
                    {userBikes.length === 0 ? (
                      "You haven't added any bikes yet."
                    ) : (
                      <>
                        Here are the bikes that you've added{" "}
                        <span className=" text-green-400  text-xl font-bold  ">
                          {userBikes.length}{" "}
                          {userBikes.length === 1 ? "bike" : "bikes"}
                        </span>
                      </>
                    )}
                  </p>

                  <p className="text-gray-400 text-lg mb-4 font-semibold">
                    Thank you for your help! 💖
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ml-10 ">
                  {userBikes.map((bike) => (
                    <div
                      key={bike._id}
                      className="w-72 bg-white shadow-xl rounded-2xl duration-500 hover:scale-105 hover:shadow-xl"
                    >
                      <a href="#">
                        <img
                          src={bike.image}
                          alt={bike.name}
                          className="h-80 w-72 object-cover rounded-t-xl"
                        />
                        <div className="px-4 py-3 w-72">
                          <p className="text-lg font-bold text-black truncate block capitalize">
                            {bike.name}
                          </p>
                          <span className="text-black mr-3 uppercase text-xs">
                            Category: {bike.category}
                          </span>
                          <div className="flex items-center">
                            <p className="text-lg font-semibold text-black cursor-auto my-3">
                              ${bike.price}
                            </p>
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
