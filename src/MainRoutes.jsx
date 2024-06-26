import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import ProductForm from './pages/ProductForm'
import Cart from "./pages/Cart";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="product/:id" element={<SingleProduct />} />
      <Route path="addProduct" element={<ProductForm />} />
      <Route path="editProduct" element={<ProductForm />} />
    </Routes>
  );
};

export default MainRoutes;
