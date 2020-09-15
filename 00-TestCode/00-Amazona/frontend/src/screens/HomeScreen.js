import React, { useEffect } from "react";
// axios : replace HTTPSRequst !!!!!!!!!!!
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
// import data from "../data";

function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  //Run after randered
  useEffect(() => {
    dispatch(listProducts());
    // const fetchData = async () => {
    //   // frontend package.json ---> "proxy": "http://127.0.0.1:5000", so "/" will access backend Server
    //   const { data } = await axios.get("/api/products");
    //   setProducts(data);
    // };
    // fetchData();
    return () => {
      //
    };
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className="products">
      {products.map((product, i) => (
        <li key={i}>
          <div className="product">
            <Link to={"/products/" + product._id}>
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
            </Link>
            <div className="product-name">
              <Link to={"/products/" + product._id}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">{product.price}</div>
            <div className="product-rating">
              {product.rating} Stars ({product.numReviews} Reviews)
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default HomeScreen;
