import React, { useState, useEffect } from "react";
import './Rates.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Rates = ({ user }) => 
{
  const [ratedProducts, setRatedProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => 
  {
    fetch(`http://localhost/TechDrupalers/web/api/vendor-side-rates-view/${user && user.name}?_format=json`)
      .then(response => response.json())
      .then(data => {
        setRatedProducts(data);
      })
      .catch(error => console.error(error));
  }, []);

  const send_rate = (uuid) =>
  {
    //console.log(uuid);
    const requestBody = 
    {
      "data":
      {
        "type": "node--vendor_quoted_rate_",
        "id": uuid,
        "attributes": 
        {
            "field_status": "share"
        }
      }
    };

    // Convert the request body to a JSON string
    const requestBodyString = JSON.stringify(requestBody);

    // Define the API URL
    const apiUrl = `http://localhost/TechDrupalers/web/jsonapi/node/vendor_quoted_rate_/${uuid}`;

    // Define the headers for the request
    const headers = 
    {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    };

    // Send the POST request
    fetch(apiUrl, {
      method: "PATCH",
      headers: headers,
      body: requestBodyString,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Rate Send Successfully " + data); // Log the response data
        toast.success("Rate Send Successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to send rate!");
      });
  }

  const unsend_rate = (uuid) => 
  {
    const requestBody = 
    {
      "data":
      {
        "type": "node--vendor_quoted_rate_",
        "id": uuid,
        "attributes": 
        {
            "field_status": "hide"
        }
      }
    };

    // Convert the request body to a JSON string
    const requestBodyString = JSON.stringify(requestBody);

    // Define the API URL
    const apiUrl = `http://localhost/TechDrupalers/web/jsonapi/node/vendor_quoted_rate_/${uuid}`;

    // Define the headers for the request
    const headers = 
    {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    };

    // Send the POST request
    fetch(apiUrl, {
      method: "PATCH",
      headers: headers,
      body: requestBodyString,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Rate Unsend Successfully " + data); // Log the response data
        toast.success("Rate Unsend Successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to unsend rate!");
      });
  }

  const remove = (uuid) =>
  {
    fetch(`http://localhost/TechDrupalers/web/jsonapi/node/vendor_quoted_rate_/${uuid}`, {
      method: 'DELETE',
    })
    .then(response =>
    {
        if (response.ok) 
        {
          toast.success("Rate removed successfully");
          window.location.reload();
        } 
        else 
        {
          toast.error("Failed to remove rate");
        }
    })
    .catch(error =>
    {
        console.log('Error while removing rate:', error);
        toast.error("Error while removing rate");
    });
  }

  return (
    <>
      <ToastContainer/>
      <div className="vendor-rates-pagetitle">
        <h2>Rates</h2>
      </div>
      <input type='text' placeholder='Search here...' className='vendors-rates-search' onChange={e => setQuery(e.target.value)}></input>
      <table id="vendor-rates-table">
        <thead>
          <tr>
            <td>Product ID</td>
            <td>Product Name</td>
            <td>Quoted Rate</td>
            <td colSpan={3}>Option</td>
          </tr>
        </thead>
        <tbody>
        {ratedProducts.filter(products => products.field_pro.toLowerCase().includes(query)).map(products => (
            <tr key={products.field_product_id}>
              <td>{products.field_product_id}</td>
              <td>{products.field_pro}</td>
              <td>{products.field_rate}</td>
              <td><input type="submit" value="Send Rate" onClick={() => send_rate(products.uuid)}></input></td>
              <td><input type="submit" value="Unsend Rate" onClick={() => unsend_rate(products.uuid)}></input></td>
              <td><input type="submit" value="Remove" onClick={() => remove(products.uuid)}></input></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Rates;
