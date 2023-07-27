import React, { useEffect, useState } from "react";
import './BillingNDShipping.css';
import { useNavigate } from "react-router";
import { encode } from 'base-64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BillingNDShipping = () =>
{
    const [orderSummary, setOrderSummary] = useState([]);
    const navigate = useNavigate();
    const orderID = localStorage.getItem('Order ID');

    useEffect (() => {

        fetch(`http://localhost/TechDrupalers/web/api/my_checkout_order_summary/${orderID}?_format=json`)
        .then(response => response.json())
        .then(data => {
                        setOrderSummary(data);
                        //console.log(data);
                        localStorage.setItem('Order Total',data[0].total_price__number_2);
        })
        .catch(error => console.error(error));
    },[]);


    const goback = () =>
    {
        navigate('/buyersdashboard/mycart');
    }

    const complete_checkout = (orderID, orderUUID) =>
    {
        const user = localStorage.getItem('Username');
        const pass = localStorage.getItem('Password');

        initialize_gateway(user, pass, orderID, orderUUID);
    }

    const initialize_gateway = (username, password, oid, orderuuid) =>
    {
        const authHeader = 'Basic ' + encode(`${username}:${password}`);

        const requestOptions = 
        {
            method: 'PATCH',
            headers: 
            {
                "Content-Type": "application/vnd.api+json",
                "Accept": "application/vnd.api+json",
                "Authorization": authHeader,
                //'X-CSRF-Token': token, // Include the XCSR Token header
            },

            body: JSON.stringify(
            {
                "data":
                {
                    "type": "commerce_order--default",
                    "id": orderuuid,
                    "attributes": 
                    {
                        "payment_instrument": 
                        {
                            "payment_gateway_id": "payment"
                        }
                    }
                }
            }),
        };

        fetch(`http://localhost/TechDrupalers/web/jsonapi/checkout/${oid}`, requestOptions)
        .then(response => response.json())
        .then(data => 
        {
            console.log('Gateway initialized successfully!!!');
            continue_to_checkout(username, password, oid);
        })
        .catch(error => console.error(error));
    }

    const continue_to_checkout = (username, password, ordid) =>
    {
        const authHeader = 'Basic ' + encode(`${username}:${password}`);

        const requestOptions = 
        {
            method: 'POST',
            headers: 
            {
                "Content-Type": "application/vnd.api+json",
                "Accept": "application/vnd.api+json",
                "Authorization": authHeader,
                //'X-CSRF-Token': token, // Include the XCSR Token header
            },

            body: JSON.stringify(
            {
                "data":
                {
                    "type": "commerce_payment--payment_default",
                    "attributes": 
                    {
                        "capture": true
                    }
                }
            }),
        };

        fetch(`http://localhost/TechDrupalers/web/jsonapi/checkout/${ordid}/payment`, requestOptions)
        .then(response => response.json())
        .then(data => 
        {
            //console.log('Checkout Process is done');
            toast.success('Checkout process is done'); // Display success toast message
            //navigate('/buyersdashboard/productCatelog');
        })
        .catch(error => console.error(error));
    }

    const total = localStorage.getItem('Order Total');
    const OrdID = localStorage.getItem('Order ID');
    const orduuid = localStorage.getItem('Order UUID');

    return(
        <>
            <ToastContainer/>
            <div className="order-summery">
                <h2>Order Summary</h2>
            </div>
            <table id='order-summary-table'>
                <thead>
                    <tr>                            
                        <td>Product Name</td>
                        <td>Quantity</td>
                        <td>Total Price</td>
                    </tr>
                </thead>
                <tbody>
                    {orderSummary.map(osum => (
                        <tr key={osum.purchased_entity}>
                            <td>{osum.purchased_entity}</td>
                            <td>{osum.quantity}</td>
                            <td>{osum.total_price__number_1}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <div className="total"><h4>Total : {total}</h4></div>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div className="complete-checkout-back-button">
                    <input type="submit" value="Go Back" onClick={() => goback()}></input>
                    <input type="submit" value="Complete Checkout" onClick={() => complete_checkout(OrdID, orduuid)}></input>
            </div>
        </>
        
    )
};

export default BillingNDShipping;