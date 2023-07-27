import React, { useEffect, useState } from "react";
import "./CustomerWishlist.css";
import { useNavigate } from 'react-router-dom';

const CustomerWishlist = () => {
  
  const [custwishlist, setCustwishlist] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => 
  {
    fetch("http://localhost/TechDrupalers/web/api/admin-side-customer-wishlist?_format=json")
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check the data received from the API
        setCustwishlist(data);
      })
      .catch(error => console.error(error));
  }, []);
  

  console.log(query);

  // Filter unique wishlist owners
  const uniqueWishlistOwners = Array.from(
    new Set(custwishlist.map(item => item.uid_1))
  );

  const view_wishlist_items = (user_id) => 
  {
    fetch(`http://localhost/TechDrupalers/web/api/customer-own-wishlist/${user_id}?_format=json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('wishlistData', JSON.stringify(data));
        navigate('/admindashboard/wishlist_details');
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="cust-wishlist-pagetitle">
        <h2>Customer Wishlist</h2>
      </div>
      <input
        type="text"
        placeholder="Search here..."
        className="cust-wishlist-search"
        onChange={e => setQuery(e.target.value)}
      ></input>
      <table id="cust-wishlist-table">
        <thead>
          <tr>
            <td>Wishlist ID</td>
            <td>Wishlist Owner</td>
            <td>Link to Wishlist</td>
          </tr>
        </thead>
        <tbody>
          {uniqueWishlistOwners.map(owner => {
            const wishlistItems = custwishlist.filter(
              item => item.uid_1 === owner
            );
            const firstItem = wishlistItems[0];

            return (
              <tr key={firstItem.field_product_id}>
                <td>{firstItem.wishlist_id}</td>
                <td>{firstItem.uid_1}</td>
                <td>
                  <input
                    type="submit"
                    className="wishlist_details_button"
                    value="View Wishlist"
                    onClick={() => view_wishlist_items(firstItem.uid)}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CustomerWishlist;
