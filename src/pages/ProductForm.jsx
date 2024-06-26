import { Button, Form } from "react-bootstrap";
import "./productForm.css";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ProductForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialProduct = location.state
    ? {
      ...location.state,
      images: location.state.images.join(" "),
    }
    : {
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: "",
      category: "",
      images:
        "https://faculty.iiit.ac.in/~indranil.chakrabarty/images/empty.png",
    };
  const [newProduct, setNewProduct] = useState(initialProduct);
  const handleChange = (e) => {
    setNewProduct((old) => ({ ...old, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.state) {
      const { id, ...productWithoutId } = newProduct;
      try {
        await axios.put(`http://localhost:3000/products/${id}`, {
          ...productWithoutId,
          images: newProduct.images.split(" "),
        });
        toast.success("Product Edited Successfully");
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        await axios.post("http://localhost:3000/products", {
          ...newProduct,
          images: newProduct.images.split(" "),
        });
        toast.success("Product Added Successfully");
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="addProduct-form-container">
      <h1 className="addProduct-header">
        {location.state ? "Edit Product" : "Add Product"}
      </h1>
      <Form onSubmit={handleSubmit} className="addProduct-form">
        <Form.Group
          className="add-product-form-group mb-3"
          controlId="formBasicTitle"
        >
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="title"
            value={newProduct.title}
            type="text"
            placeholder="Enter product title"
          />
        </Form.Group>

        <Form.Group
          className="add-product-form-group  mb-3"
          controlId="formBasicdescription"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="description"
            value={newProduct.description}
            type="text"
            placeholder="Enter product description"
          />
        </Form.Group>

        <Form.Group
          className="add-product-form-group mb-3"
          controlId="formBasicPrice"
        >
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="price"
            value={newProduct.price}
            type="number"
            placeholder="Enter product price"
          />
        </Form.Group>

        <Form.Group
          className="add-product-form-group mb-3"
          controlId="formBasicDiscount"
        >
          <Form.Label>Discount</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="discountPercentage"
            value={newProduct.discountPercentage}
            type="number"
            placeholder="Enter product discount"
          />
        </Form.Group>

        <Form.Group
          className="add-product-form-group mb-3"
          controlId="formBasicRating"
        >
          <Form.Label>Rating</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="rating"
            value={newProduct.rating}
            type="number"
            min="0"
            max="5"
            step="0.01"
            placeholder="Enter product rating"
          />
        </Form.Group>

        <Form.Group
          className="add-product-form-group mb-3"
          controlId="formBasicStock"
        >
          <Form.Label>Stock</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="stock"
            value={newProduct.stock}
            type="number"
            placeholder="Enter product stock"
          />
        </Form.Group>

        <Form.Group
          className="add-product-form-group mb-3"
          controlId="formBasicBrand"
        >
          <Form.Label>Brand</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="brand"
            value={newProduct.brand}
            type="text"
            placeholder="Enter product brand"
          />
        </Form.Group>

        <Form.Group
          className="add-product-form-group mb-3"
          controlId="formBasicCategory"
        >
          <Form.Label>Category</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="category"
            value={newProduct.category}
            type="text"
            placeholder="Enter product category"
          />
        </Form.Group>

        <Form.Group
          className="add-product-form-group"
          controlId="formBasicImages"
        >
          <Form.Label>Images</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="images"
            value={newProduct.images}
            type="text"
            placeholder="Enter product images"
          />
        </Form.Group>

        <Button className="addProduct-submit" variant="primary" type="submit">
          {location.state ? "Edit" : "Add"}
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;
