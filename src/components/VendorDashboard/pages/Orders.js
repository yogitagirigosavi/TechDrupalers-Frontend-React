import React from "react";
import './Orders.css';
import { useEffect,useState } from "react";

const  Orders = () => {

    const [vendor_orders, setVendor_orders] = useState([]);

    useEffect(() => {
        fetch('http://localhost/TechDrupalers/web/api/vendor-orders?_format=json')
        .then(response => response.json())
        .then(data => setVendor_orders(data))
        .catch(error => console.error(error));
    }, []);

    const [query, setQuery] = useState("");
    console.log(query);


    return (
        <><div className="vendor-orders-pagetitle">
            <h2>Orders</h2>
        </div><input type='text' placeholder='Search here...' className='vendor-orders-search' onChange={e => setQuery(e.target.value)}></input>
        <table id="vendor-orders-table">
                <thead>
                    <tr>
                        <td>ORDER NUMBER</td>
                        <td>CONTACT EMAIL</td>
                        <td>CUSTOMER</td>
                        <td>PLACED</td>
                        <td>STATE</td>
                        <td>TOTAL PRICE</td>
                        
                    </tr>
                </thead>
                <tbody>
                    {vendor_orders.filter(vendor_orders => vendor_orders.order_number.toLowerCase().includes(query)).map(item => 
                    <tr key={item.field_product_id}>
                        <td>{item.order_number}</td>
                        <td>{item.mail}</td>
                        <td>{item.uid_1}</td>
                        <td>{item.placed_1}</td>
                        <td>{item.state}</td>
                        <td>{item.total_price__number_1}</td>
                        
                    </tr>
                    )}
                </tbody>
            </table></>
        
    );
};

export default Orders;