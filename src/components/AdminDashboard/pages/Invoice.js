import React, { useEffect, useState } from "react";
import './Invoice.css';
import { encode } from 'base-64';

const Invoice = () => 
{
    const [invoice, setInvoice] = useState("");
    const ordID = localStorage.getItem('Order ID');
    const username = localStorage.getItem('Username');
    const password = localStorage.getItem('Password');
    const [token, setToken] = useState("");

    useEffect (() =>
    {
        fetch(`http://localhost/TechDrupalers/web/api/admin-side-invoice-view/${ordID}?_format=json`)
            .then(response => response.json())
            .then((data) => 
            {
                setInvoice(data);
                //console.log(data);
            })
            .catch(error => 
            {
                console.error(error);
            });
    },[]);

    const generateInvoice = (orderUUID, storeUUID, userUUID) =>
    {
        //console.log(index);
       // for(var i = 0; i< index; i++)
        //{
            //invoice_product_variation(orderUUID);
            console.log("Hi");
       // }
    }

    const invoice_product_variation = (ordUUID) =>
    {
        const credentials = encode(`${username}:${password}`);

        const endpoint = 'http://localhost/TechDrupalers/web/jsonapi/commerce_invoice_item/commerce_product_variation';

        const productData = 
        {
            "data": 
            {
                "type": "commerce_invoice_item--commerce_product_variation",
                "attributes": 
                {
                    "title": "Product_4",
                    "quantity": "1.00",
                    "unit_price": 
                    {
                        "number": "796.120000",
                        "currency_code": "INR",
                        "formatted": "₹796.12"
                    },

                    "total_price": 
                    {
                        "number": "796.120000",
                        "currency_code": "INR",
                        "formatted": "₹796.12"
                    }
                },

                "relationships": 
                {
                    "order_item_id": 
                    {
                        "data": 
                        {
                            "type": "commerce_order_item--default",
                            "id": "24ae0133-8e1c-4961-a7f9-ebee18d77fdf"
                        }   
                    }
                }
            }
        }
            

        fetch(endpoint, 
        {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    Authorization: `Basic ${credentials}`,
                    'X-CSRF-Token': token
                },
                body: JSON.stringify(productData),
        })
        .then(response => response.json())
        .then(data => 
        {
            console.log('Invoice Product Variation Added:', data);
        })
        .catch(error => 
        {
            console.error('Error adding invoice product variation:', error);
        });
    }


    return (
        <>
          <div className="generate-invoice-pagetitle">
            <h2>Generate Invoice</h2>
          </div>
          <div>
            {invoice ? (
              <>
                <table className="generate-invoice_details">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.map (item => (

                            <tr key={item.title}>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unit_price__number_1}</td>
                                <td>{item.total_price__number_1}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="generate-invoice-button">
                    <input type="submit" value="Generate Invoice" onClick={() => generateInvoice(invoice.uuid, invoice.uuid_1, invoice.uuid_2)}></input>
                </div>
            </>
            ) : (
              <p>No order data available.</p>
            )}
          </div>
        </>
      );
};

export default Invoice;