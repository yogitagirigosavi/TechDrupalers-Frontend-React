import React from "react";
import './UpdatedRates.css';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { encode } from 'base-64';
import { toast } from 'react-toastify';

const UpdatedRates = ({ user }) => 
{
  const [updatedwishlist, setUpdatedWishlist] = useState([]);
  const [query, setQuery] = useState("");

  const username = localStorage.getItem('Username');
  const password = localStorage.getItem('Password');



  useEffect(() => 
  {
    fetch(`http://localhost/TechDrupalers/web/api/customer-side-final-rates/${user && user.uid}?_format=json`)
      .then(response => response.json())
      .then(data => setUpdatedWishlist(data))
      .catch(error => console.error(error));
  }, []);

  const addtocart = (product_variation_UUID) => 
  {
    const user = username;
    const pass = password;

    const authHeader = 'Basic ' + encode(`${user}:${pass}`);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        "data": {
          "relationship": {
            "type": "commerce_product_variation--default",
            "id": product_variation_UUID
          }
        }
      }),
    };

    fetch('http://localhost/TechDrupalers/web/jsonapi/cart/add', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Item added to cart:', data);
        toast.success('Item added to cart'); // Display success toast message
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <ToastContainer />
      <div className="updated-rates-pagetitle">
        <h2>Updated Rates</h2>
      </div>
      <input type='text' placeholder='Search here...' className='updated-rate-search' onChange={e => setQuery(e.target.value)}></input>
      <table id="updated-rate-table">
        <thead>
          <tr>
            <td>Product ID</td>
            <td>Product Name</td>
            <td>Quantity</td>
            <td>Unit Rate</td>
            <td>Total Rate</td>
            <td colSpan={2}>Options</td>
          </tr>
        </thead>
        <tbody>
          {updatedwishlist.filter(updatedwishlistItem => updatedwishlistItem.field_pro.toLowerCase().includes(query)).map( updatedwishlistItem => (
            <tr key={updatedwishlistItem.field_product_id}>
              <td>{updatedwishlistItem.field_product_id}</td>
              <td>{updatedwishlistItem.field_pro}</td>
              <td>{updatedwishlistItem.quantity}</td>
              <td>{updatedwishlistItem.field_unit_rate}</td>
              <td>{updatedwishlistItem.field_to}</td>
              <td><input className="add-to-cart-button" type="submit" value="Add to Cart" onClick={() => addtocart(updatedwishlistItem.product_variation_uuid)}></input></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UpdatedRates ;
