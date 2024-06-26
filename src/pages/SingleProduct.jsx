import { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./singleProduct.css";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CounterContext } from "../context/CounterContext";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const timeRef = useRef(null);
  const [addToCartCount, setAddToCartCount] = useState(0);
  const [removeFromCartCount, setRemoveFromCartCount] = useState(0);


  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(res.data);
      setLoading(false);
      toast.success("Product Fetched Successfully");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  }, [id]);
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const moveForward = useCallback(() => {
    let newIndex = imgIndex === product?.images.length - 1 ? 0 : imgIndex + 1;
    setImgIndex(newIndex);
  }, [imgIndex, product]);

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      moveForward();
    }, 3000);
    return () => clearTimeout(timeRef.current);
  }, [moveForward]);

  // edit-delete

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/products/${product.id}`
      );
      if (res.status === 200) {
        toast.success("Product Deleted Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = async () => {
    navigate("/editProduct", { state: { ...product } });
  };
  let { increase, count, decrease, createCartItem } = useContext(CounterContext);
  const handleAddToCartClick = () => {
    setAddToCartCount(addToCartCount + 1);
    { increase() }
    toast.success('Item added to cart.');
  };

  const handleRemoveFromCartClick = () => {
    if (removeFromCartCount < addToCartCount) {

      setRemoveFromCartCount(removeFromCartCount + 1);
      { decrease() }
      toast.success('Item removed from cart.');
    } else {
      toast.error("there's no matched items in cart");
    }
  };
  return (
    <>
      <div style={{ 'display': 'flex' }}>
        <h1 className="single-product-header">Product Details</h1>
        <h3 className="count">My Cart : {count}</h3>
      </div>
      {!product && loading && !error ? (
        <div
          style={{ color: "darkblue", fontSize: "18px", marginTop: "50px" }}
          className="text-center w-100"
        >
          loading...
        </div>
      ) : null}
      {!product && !loading && error ? (
        <div className="text-center w-100">
          <span className="text-danger">{error}</span>
        </div>
      ) : null}
      {!error && !loading && product ? (
        <>
          <div className="single-product-container">
            <div className="product-imgView-container">
              <div className="product-thumbnails">
                {product &&
                  product.images.map((prd, prdIndex) => (
                    <img
                      onClick={() => setImgIndex(prdIndex)}
                      key={prdIndex}
                      className={`product-thumbnails-img ${imgIndex === prdIndex ? "active-thumbnail" : null
                        }`}
                      src={prd}
                      alt="product img"
                    />
                  ))}
              </div>
              <div className="Product-active-imgContainer">
                <img
                  className="Product-active-img"
                  src={product && product.images[imgIndex]}
                  alt="product img"
                />
              </div>
            </div>
            <div className="product-details-container">
              <p className="product-details-desc">
                {product && product.description}
              </p>
              <h2 className="product-details-title">
                {product && product.title}
              </h2>
              <span className="product-details-rating">
                {product && product.rating}
              </span>
              <div className="product-details-star-rating-outer">
                <div
                  className="product-details-star-rating-inner"
                  style={{ width: `${(product && product.rating / 5) * 100}%` }}
                ></div>
              </div>
              <p className="product-details-discount-price">
                <span className="product-details-discount">
                  -{product && product.discountPercentage}%
                </span>
                <span className="product-details-price">
                  {product && product.price}$
                </span>
              </p>
              <div className="product-details-category">
                <span>Category</span>
                <span>{product && product.category}</span>
              </div>
              <div className="product-details-brand">
                <span>Brand</span>
                <span>{product && product.brand}</span>
              </div>
              <div className="product-details-stock">
                <span>Stock</span>
                <span>{product && product.stock}</span>
              </div>
              {/* delete-edit */}
              <div className="edit-delete-container-single">
                <button onClick={handleDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-trash3 delete-icon-single"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </button>
                <button onClick={handleEdit}>
                  <svg
                    className="icon icon-tabler icon-tabler-edit edit-icon-single"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
                    <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                    <line x1="16" x2="19" y1="5" y2="8" />
                  </svg>
                </button>
              </div>
              <div class='container'>
                <button class='btn btn-outline-success p-2 mt-3 ' onClick={() => createCartItem(product)}>Add to Cart</button>
                {/* <form action="" onSubmit={getCartItems}> </form> */}
                <NavLink to="/" className="btn btn-outline-dark p-2 mt-3" style={{ 'marginLeft': '10px' }}>Go Back</NavLink>
                <button class='btn btn-outline-danger p-2 mt-3 ' style={{ 'marginLeft': '10px' }} onClick={handleRemoveFromCartClick}>Remove from Cart</button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SingleProduct;
