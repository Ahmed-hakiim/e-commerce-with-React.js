import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CounterContext } from "../context/CounterContext";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let cartPath = () => {
    navigate('/cart')
  }
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await axios
        .get("http://localhost:3000/products")
        .then((res) => {
          setFetchedData(res.data);
          setLoading(false);
          toast.success("Products Fetched Successfully");
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
          toast.error(err.message);
          console.log(err)
        });
    };
    fetchProducts();
  }, []);

  const handleDelete = async (e, P_ID) => {
    e.stopPropagation();
    try {
      const res = await axios.delete(`http://localhost:3000/products/${P_ID}`);
      if (res.status === 200) {
        setFetchedData((data) => data.filter((item) => item.id !== P_ID));
        toast.success("Product Deleted Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = async (e, product) => {
    e.stopPropagation();
    navigate("/editProduct", { state: { ...product } });
  };

  useEffect(() => {
    setFilteredProducts(
      fetchedData &&
      fetchedData.filter((item) =>
        Object.entries(filters).every(([key, value]) => {
          if (key === "title") {
            return item[key]
              .toLowerCase()
              .includes(value.trim().toLowerCase());
          } else if (key === "rating") {
            return +item[key] >= +value;
          }
        })
      )
    );
  }, [filters, fetchedData]);

  useEffect(() => {
    if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  const handleSearchedProduct = () => {
    if (selectedItem) {
      navigate(`/product/${selectedItem}`);
    }
  };
  let { count } = useContext(CounterContext);
  return (
    <>
      <div className="addProduct-btn-header-container">
        <h1 className="products-header">All Products</h1>
        <button className="btn btn-success " style={{ 'color': 'darkblue' }} onClick={cartPath}> My Cart : {count}</button >
        {fetchedData.length && !loading ? (
          <button
            onClick={() => navigate("/addProduct")}
            className="addProduct-btn"
          >
            Add Product
          </button>
        ) : null}
      </div>
      {fetchedData.length && !loading ? (
        <div className="search-filter-sort-container">
          <div className="search-container">
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              <option value="" selected disabled>
                select product
              </option>
              {filteredProducts.length &&
                filteredProducts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
            </select>
            <button onClick={handleSearchedProduct}>Search</button>
          </div>
          <div className="filter-container">
            <input
              type="text"
              placeholder="product title"
              name="title"
              onChange={handleFilters}
            />
            <input
              type="number"
              min="0"
              max="5"
              step="0.01"
              placeholder="product rating"
              name="rating"
              onChange={handleFilters}
            />
          </div>
          <div className="price-sort-container">
            <select onChange={(e) => setSort(e.target.value)}>
              <option value="newest" disabled selected>
                newest
              </option>
              <option value="asc">Price (asc)</option>
              <option value="desc">Price (desc)</option>
            </select>
          </div>
        </div>
      ) : null}
      <div className="allproducts-container">
        {!fetchedData.length && loading ? (
          <div className="text-center w-100">
            <Spinner animation="border" className="spinn" />
          </div>
        ) : null}
        {!fetchedData.length && !loading && error ? (
          <div className="text-center w-100">
            <span className="text-danger">{error}</span>
          </div>
        ) : null}
        {filteredProducts.length && fetchedData.length && !loading
          ? filteredProducts.map((data) => {
            return (
              <div
                onClick={() => navigate(`/product/${data.id}`)}
                className="product-box"
                key={data.id}
              >
                <div className="product-image">
                  <img src={data.images[0]} alt="product_image" />
                  <div className="edit-delete-container">
                    <button onClick={(e) => handleDelete(e, data.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-trash3 delete-icon"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                      </svg>
                    </button>
                    <button onClick={(e) => handleEdit(e, data)}>
                      <svg
                        className="icon icon-tabler icon-tabler-edit edit-icon"
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
                </div>
                <div className="product-details">
                  <div className="product-title">{data.title}</div>
                  <div className="product-desc">{data.description}</div>
                  <div className="price-rating-discount">
                    <div className="product-price"> {data.price}$</div>
                    <div className="product-rating-stars-container">
                      <span className="product-rating-home">
                        {data.rating}
                      </span>
                      <div className="product-details-star-rating-outer-home">
                        <div
                          className="product-details-star-rating-inner-home"
                          style={{
                            width: `${(data.rating / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="product-discount">
                      -{data.discountPercentage}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          : null}
      </div>
    </>
  );
};
export default Home;
