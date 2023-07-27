import React, { useState, useEffect } from "react";
import "./Wishlist_Details.css";
import { encode } from "base-64";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Wishlist_Details = () => 
{
  const [token, setToken] = useState("");
  const authusername = localStorage.getItem("Username");
  const authpassword = localStorage.getItem("Password");
  const wish = JSON.parse(localStorage.getItem("wishlistData"));
  const [margins, setMargins] = useState(wish ? wish.map(() => "") : []);
  const [actualRate, setActualRate] = useState(wish ? wish.map(() => "") : []);
  const [additionalRates, setAdditionalRates] = useState(
    wish ? wish.map((item) => item.field_to) : []
  );
  const [fetchedRates, setFetchedRates] = useState([]);
  const [vendorRatesData, setVendorRatesData] = useState({});



  useEffect(() => 
  {
    fetch(`http://localhost/TechDrupalers/web/api/final_rates_view?_format=json`)
      .then((response) => response.json())
      .then((data) => {
        setFetchedRates(data); // Save the fetched rates in state
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // ...
  
    // Fetch vendor rates
    fetch("http://localhost/TechDrupalers/web/api/admin-side-rates-view?_format=json")
      .then((response) => response.json())
      .then((data) => {
        const ratesByProduct = {};
  
        data.forEach((rate) => {
          const { field_product_id, field_pro, field_rate } = rate;
          const key = `${field_product_id}-${field_pro}`;
  
          if (!ratesByProduct[key]) {
            ratesByProduct[key] = [];
          }
  
          ratesByProduct[key].push(field_rate);
        });
  
        setVendorRatesData(ratesByProduct); // Update the state variable
      })
      .catch((error) => console.error(error));
  }, []);
  
  
  useEffect(() => 
  {
    // After fetching rates, set the actual rate and margin values for corresponding products
    if (fetchedRates.length > 0) {
      const updatedActualRate = [...actualRate];
      const updatedMargins = [...margins];

      wish.forEach((item, index) => {
        const fetchedRate = fetchedRates.find(
          (rate) =>
            rate.field_product_id === item.field_product_id &&
            rate.field_prod === item.field_pro
        );

        if (fetchedRate) {
          updatedActualRate[index] = fetchedRate.field_actual_rate;
          updatedMargins[index] = fetchedRate.field_margin;
        }
      });

      setActualRate(updatedActualRate);
      setMargins(updatedMargins);
    }
  }, [fetchedRates]);

  const handleMarginChange = (index, value) => 
  {
    const updatedMargins = [...margins];
    updatedMargins[index] = value;
    setMargins(updatedMargins);
  };

  const handleActualRateChange = (index, value) => 
  {
    const updatedActualRate = [...actualRate];
    updatedActualRate[index] = value;
    setActualRate(updatedActualRate);
  };

  const save_rates = (pID, pName, qnt, actRt, mar, unitRt, totRt, pUUID, pvUUID) => 
  {
    update_actual_rate(actRt, pUUID);
    update_price_pv(unitRt, pvUUID);
    addRates(pID, pName, qnt, mar, unitRt, totRt, pUUID);

    const updatedActualRate = [...actualRate];
    const updatedMargins = [...margins];
    updatedActualRate.fill("");
    updatedMargins.fill("");
    setActualRate(updatedActualRate);
    setMargins(updatedMargins);

    // Set the saved values in the respective textboxes
    handleActualRateChange(
      wish.findIndex((item) => item.field_product_id === pID),
      actRt
    );
    handleMarginChange(
      wish.findIndex((item) => item.field_product_id === pID),
      mar
    );
  };

  const update_actual_rate = (actRat, pUUID) => 
  {
    const requestBody = {
      data: {
        type: "commerce_product--default",
        id: pUUID,
        attributes: {
          field_actual_rate: actRat,
        },
      },
    };

    // Convert the request body to a JSON string
    const requestBodyString = JSON.stringify(requestBody);

    // Define the API URL
    const apiUrl = `http://localhost/TechDrupalers/web/jsonapi/commerce_product/default/${pUUID}`;

    // Define the headers for the request
    const headers = {
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
        console.log("Product Updated Successfully " + data); // Log the response data
        //toast.success("Rate added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to add rate!");
      });
  };

  const addRates = (prodName, quan, margin, untRate, totRate, PUUID) => 
  {
    var title = "Final Rate of " + prodName;

    const requestBody = 
    {
      "data": 
      {
        "type": "node--final_rates",
        "attributes": 
        {
          "title": title,
          "field_wishlist_quantity": quan,
          "field_margin": margin,
          "field_to": totRate,
          "field_unit_rate": untRate
        },

        "relationships": 
        {
          "field_product_id": 
          {
            "data": 
            {
              "type": "commerce_product--default",
              "id": PUUID
            }
          },

          "field_pro": 
          {
            "data": 
            {
              "type": "commerce_product--default",
              "id": PUUID
            }
          },

          "field_actual_rate": 
          {
            "data": 
            {
              "type": "commerce_product--default",
              "id": PUUID,
            },
          },

          "field_add": 
          {
            "data": 
            {
              "type": "commerce_product--default",
              "id": PUUID,
            },
          },
        },
      },
    };

    // Convert the request body to a JSON string
    const requestBodyString = JSON.stringify(requestBody);

    // Define the API URL
    const apiUrl = "http://localhost/TechDrupalers/web/jsonapi/node/final_rates";

    // Define the headers for the request
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'Authorization': "Basic " + encode(`${authusername}:${authpassword}`),
      'X-CSRF-Token': token
    };

    // Send the POST request
    fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: requestBodyString,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data); // Log the response data
        toast.success("Rate added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to add rate!");
      });
  };

  const update_price_pv = (urate, prodVUUID) =>
  {
    console.log(prodVUUID);
    const requestBody = 
    {
      "data":
      {
        "type": "commerce_product_variation--default",
        "id": prodVUUID,
        "attributes": 
        {
          "price":
          {
            "number": urate,
            "currency_code": "INR",
            "formatted": urate
          }
        }
    
      }
    };

    // Convert the request body to a JSON string
    const requestBodyString = JSON.stringify(requestBody);

    // Define the API URL
    const apiUrl = `http://localhost/TechDrupalers/web/jsonapi/commerce_product_variation/default/${prodVUUID}`;

    // Define the headers for the request
    const headers = {
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
        console.log("Product Variation Updated Successfully " + data); // Log the response data
        //toast.success("Rate added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to add price!");
      });
  }


  const delete_rates = (uuid) =>
  {   
    console.log(uuid);
    fetch(`http://localhost/TechDrupalers/web/jsonapi/node/final_rates/${uuid}`, {
            method: 'DELETE',
    })
    .then(response => 
    {
        if (response.ok) 
        {
          //console.log('Rate removed successfully');
          toast.success("Rate removed successfully");
          window.location.reload();
        } 
        else 
        {
          //console.log('Failed to remove rate');
          toast.error("Failed to remove rate");
          // Handle the error or display an error message
        }
      })
      .catch(error =>
      {
        //console.log('Error removing rate :', error);
        toast.error("Error removing rate");
      });
  }

  return (
    <>
      <ToastContainer />
      <div className="wishlist_details-pagetitle">
        <h2>Wishlist Items</h2>
      </div>
      <div>
        {wish ? (
          <table className="wishlist_details">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Vendor Rates</th>
                <th>Actual Rate</th>
                <th>Additional Rate</th>
                <th>Margin %</th>
                <th>Unit Rate</th>
                <th>Total Rate</th>
                <th colSpan={2}>Options</th>
              </tr>
            </thead>
            <tbody>
            {wish.map((item, index) => 
            {
              const totalRate =
              (parseFloat(actualRate[index]) || 0) +
              (parseFloat(additionalRates[index]) || 0) +
              (parseFloat(margins[index]) || 0) / 100;

              const unitRate = totalRate;
              const finalRates = unitRate * item.quantity;

              // Get the vendor rates for the current item
              const vendorRates = vendorRatesData[`${item.field_product_id}-${item.field_pro}`];

              return (
                <tr key={item.field_product_id}>
                  <td>{item.field_product_id}</td>
                  <td>{item.field_pro}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {vendorRates && vendorRates.map((rate, i) => (
                      <td key={i}>{rate}</td>
                    ))}
                  </td>

                  <td>
                    <input
                      type="text"
                      className="actual-rate"
                      value={actualRate[index]}
                      onChange={(e) =>
                        handleActualRateChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td>{additionalRates[index]}</td>
                  <td>
                    <input
                      type="text"
                      className="margin"
                      value={margins[index]}
                      onChange={(e) =>
                        handleMarginChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td>{unitRate.toFixed(2)}</td>
                  <td>{finalRates.toFixed(2)}</td>
                  <td>
                    <input
                      type="submit"
                      value="Save"
                      onClick={() =>
                        save_rates(
                          item.field_pro,
                          item.quantity,
                          actualRate[index],
                          margins[index],
                          unitRate,
                          finalRates,
                          item.uuid_2,
                          item.uuid_4
                        )
                      }
                    ></input>
                  </td>
                  <td>
                    <input
                      type="submit"
                      value="Remove"
                      onClick={() => delete_rates(item.uuid_3)}
                    ></input>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
        ) : (
          <p>No wishlist data available.</p>
        )}
      </div>
    </>
  );
};

export default Wishlist_Details;