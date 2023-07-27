import React, { useState, useEffect } from 'react';
import './vendor.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Vendors = () => 
{
  const navigate = useNavigate(); // Add this line to import the useNavigate hook

  const [vendors, setVendors] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost/TechDrupalers/web/api/vendors?_format=json')
      .then(response => response.json())
      .then(data => setVendors(data))
      .catch(error => console.error(error));
  }, []);

  console.log(vendors);
  console.log(query);

  const view_ven_details = (venID) => 
  {
      fetch(`http://localhost/TechDrupalers/web/api/specific_vendor/${venID}?_format=json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('venData', JSON.stringify(data));
        navigate('/admindashboard/vendor_details');
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <ToastContainer />
      <div className='pagetitle'>
        <h2>Vendors</h2>
      </div>
      <input
        type='text'
        placeholder='Search here...'
        className='vendor-search'
        onChange={e => setQuery(e.target.value)}
      ></input>
      <table id='vendors-table'>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Operation</td>
          </tr>
        </thead>
        <tbody>
          {vendors &&
            vendors.filter((vendor) => vendor.name.toLowerCase().includes(query)).map(vendor => (
              <tr key={vendor.uid}>
                <td>{vendor.uid}</td>
                <td>{vendor.name}</td>
                <td>
                  <input
                    className='vendor_details_button'
                    type='submit'
                    value='View More Details'
                    onClick={() => view_ven_details(vendor.uid)} // Wrap the onClick function in an arrow function
                  ></input>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Vendors;
