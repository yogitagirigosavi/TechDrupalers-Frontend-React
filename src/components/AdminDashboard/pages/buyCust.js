import React, { useState, useEffect } from 'react';
import './buyCust.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const BuyCust = () => {
  const navigate = useNavigate();

  const [buyers, setBuyers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost/TechDrupalers/web/api/buyers?_format=json')
      .then((response) => response.json())
      .then((data) => setBuyers(data))
      .catch((error) => console.error(error));
  }, []);

  const view_cust_details = (custID) => 
  {
    fetch(`http://localhost/TechDrupalers/web/api/specific_customer/${custID}?_format=json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('custData', JSON.stringify(data));
        navigate('/admindashboard/buyer_details');
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <ToastContainer />
      <div className="pagetitle">
        <h2>Customers</h2>
      </div>
      <input type="text" placeholder="Search here..." className="search" onChange={(e) => setQuery(e.target.value)} />
      <table id="buyers-table">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Operation</td>
          </tr>
        </thead>
        <tbody>
          {buyers.filter((buyer) => buyer.name.toLowerCase().includes(query)).map((buyer) => (
            <tr key={buyer.uid}>
              <td>{buyer.uid}</td>
              <td>{buyer.name}</td>
              <td>
                <input className="customer_details_button" type="submit" value="View More Details" onClick={() => view_cust_details(buyer.uid)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BuyCust;
