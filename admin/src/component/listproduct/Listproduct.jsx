import  { useEffect, useState } from "react";
import  './Listproduct.css';
import cross_icon from '../../assets/cross_icon.png';
const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchProducts = () => {
    fetch('http://localhost:8001/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:8001/removeproduct", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });
    fetchProducts();

  }
  return (
    <div className="listproduct">
    <h1>All Products List</h1>
    <div className="listproduct-format-main">
      <p>Products</p> <p>Title</p> <p>Old Price</p> <p>New Price</p> <p>Category</p> <p>Remove</p>
    </div>
    <div className="listproduct-allproducts">
      <hr />
      {allproducts.map((e, index) => (
        <div key={index}>
          <div className="listproduct-format-main listproduct-format">
            <img className="listproduct-product-icon" src={ 'http://localhost:8001'+e.image} alt="" />
            <p className="cartitems-product-title">{e.name}</p>
            <p>{}{e.old_price}</p>
            <p>{}{e.new_price}</p>
            <p>{e.category}</p>
            <img className="listproduct-remove-icon" onClick={() => { removeProduct(e.id) }} src={cross_icon} alt="" />
          </div>
          <hr />
        </div>
      ))}
    </div>
  </div>
  );
}

export default ListProduct;