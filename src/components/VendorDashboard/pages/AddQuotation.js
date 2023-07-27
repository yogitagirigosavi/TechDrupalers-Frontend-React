import React, { useState, useEffect} from "react";
import './AddQuotation.css';
import axios from 'axios';
import { encode } from 'base-64';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const AddQuotation = () => 
{
  const [quotedRate, quotedRateChange] = useState("");
  const [token, setToken] = useState("");
  const authusername = localStorage.getItem("Username");
  const authpassword = localStorage.getItem("Password");

  useEffect(() => 
  {
    fetchToken();
  }, []);

  const fetchToken = async () => 
  {
    try {
      const response = await axios.get('http://localhost/TechDrupalers/web/session/token');
      const fetchedToken = response.data;
      setToken(fetchedToken);
    } catch (error) {
      console.error(error);
    }
  };

  const addrate = () => 
  {
      const productUUID = localStorage.getItem("Product UUID");
      const vendorName = localStorage.getItem("VendorName");

      var title = "Rate By "+vendorName;

      const requestBody = 
      {
        "data": 
        {
          "type": "node--vendor_quoted_rate_",
          "attributes": 
          {
            "title": title,
            "field_rate": quotedRate,
            "field_venodr": vendorName
          },

          "relationships":
          {

            "field_p": 
            {
                "data": 
                {
                    "type": "commerce_product--default",
                    "id": productUUID
                }
            },

            "field_product_name_vendor_rates": 
            {
              
              "data": 
              {
                "type": "commerce_product--default",
                "id": productUUID
              }
            }
          }
        }
      }
      
      // Convert the request body to a JSON string
      const requestBodyString = JSON.stringify(requestBody);

      // Define the API URL
      const apiUrl = "http://localhost/TechDrupalers/web/jsonapi/node/vendor_quoted_rate_";

      // Define the headers for the request
      
      const headers = 
      {
          "Content-Type": "application/vnd.api+json",
          "Accept": "application/vnd.api+json",
          Authorization: "Basic " + encode(`${authusername}:${authpassword}`),
          'X-CSRF-Token': token
      };

      // Send the POST request
      fetch(apiUrl, {
          method: "POST",
          headers: headers,
          body: requestBodyString
      })
      .then(response => response.json())
      .then(data => {
              //console.log(data); // Log the response data
              toast.success("Rate added successfully!");
              clearInputBox();
      })
      .catch(error => {
              console.error("Error:", error);
              toast.error("Failed to add rate!");
      });
  };
  

  const clearInputBox = () => 
  {
    quotedRateChange("");
  };

  return (
    <>
      <ToastContainer/>
      <div className="add-quotation-pagetitle">
        <h2>Add Quotation</h2>
      </div>

      <label className="quoted-rate">Quoted Rate</label>

      <input
        type="text"
        className="add-quoted-rate"
        value={quotedRate}
        onChange={(e) => quotedRateChange(e.target.value)}
      />

      <input
        type="submit"
        value="Add"
        className="add-quotation-button"
        onClick={() => addrate()}
      />
    </>
  );
};

export default AddQuotation;
