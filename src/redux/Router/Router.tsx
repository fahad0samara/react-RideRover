import {Route, Routes} from "react-router-dom";

import Layout from "./NavSide/Layout";
import CreateProductForm from "../../CreactPost";
import ProductAddedConfirmation from "../../ProductAddedConfirmation";
import List from "../../List";
import UserProducts from "../../UserProducts";


const Router = () => {
  return (
    <Layout>
   <Routes>
            <Route path="/" element={<CreateProductForm />} />
            <Route path="/ProductAddedConfirmation" element={<ProductAddedConfirmation />} />
            <Route path="/List" element={<List />} />

            <Route path="/UserProducts" element={<UserProducts />} />
            </Routes>
    </Layout>
  );
};

export default Router;
