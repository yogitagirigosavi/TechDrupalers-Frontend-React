import React from "react";
import './OrderDetails.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const OrderDetails = () => 
{
    
    const order = JSON.parse(localStorage.getItem('OrderDetails'));
    const [query, setQuery] = useState("");
    //console.log(order[0].total_price__number_3)

    return (
        <>
            <div className="buyer-order-details-pagetitle">
                <h2>Order Details</h2>
            </div>
            <div>
                <input type='text' placeholder='Search here...' className='buyer-order-details-search' onChange={e => setQuery(e.target.value)}></input>
                <table id='buyer-order-details-table'>
                    <thead>
                        <tr>
                            <td>Product ID</td>
                            <td>Product Name</td>
                            <td>Quantity</td>
                            <td>Unit Price</td>
                            <td>Total Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {order.filter(ord => ord.quantity.toLowerCase().includes(query)).map(ord => (
                        <tr key={ord.field_product_id}>
                            <td>{ord.field_product_id}</td>
                            <td>{ord.field_pro}</td>
                            <td>{ord.quantity}</td>
                            <td>{ord.unit_price__number_1}</td>
                            <td>{ord.total_price__number_2}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total-price">
                    <h6>Total Price</h6>
                    <label>{order[0].total_price__number_3}</label>
                </div>
            </div>
        </>
    );
}

export default OrderDetails;
