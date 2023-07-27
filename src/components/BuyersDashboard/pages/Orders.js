import React from "react";
import './Orders.css';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Orders = ({ user }) => 
{
  const navigate = useNavigate();
  const [buyers_orders, setBuyers_orders] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => 
  {
    fetch(`http://localhost/TechDrupalers/web/api/specific_order/${user && user.uid}?_format=json`)
      .then(response => response.json())
      .then(data => setBuyers_orders(data))
      .catch(error => console.error(error));
  }, []);

  const viewOrderDetails = (orderID) =>
  {
      //console.log(orderID);
      fetch(`http://localhost/TechDrupalers/web/api/buyer/order_details/${orderID}?_format=json`)
      .then(response => response.json())
      .then(data => {
            console.log(data);
            localStorage.setItem('OrderDetails', JSON.stringify(data));
            navigate('/buyersdashboard/order_details');
      })
      .catch(error => console.error(error));
  }


  const removeOrder = (orderUUID) => 
  {
    fetch(`http://localhost/TechDrupalers/web/jsonapi/commerce_order/default/${orderUUID}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          toast.success("Order deleted successfully");
        } else {
          toast.error("Failed to delete order");
        }
      })
      .catch(error => {
        console.log('Error deleting order:', error);
        toast.error("Error deleting order");
      });
  }

  const view_invoice = (orderID) => 
  {
    fetch(`http://localhost/TechDrupalers/web/api/invoices/buyer/${orderID}?_format=json`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('Invoice', JSON.stringify(data));
        navigate('/buyersdashboard/invoices');
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <ToastContainer />
      <div className="buyers-orders-pagetitle">
        <h2>Orders</h2>
      </div>
      <input type='text' placeholder='Search here...' className='buyers-orders-search' onChange={e => setQuery(e.target.value)}></input>
      <table id="buyers-orders-table">
        <thead>
          <tr>
            <td>Order ID</td>
            <td>Created On</td>
            <td>Placed On</td>
            <td>State</td>
            <td>Total Price</td>
            <td colSpan={3}>Options</td>
          </tr>
        </thead>
        <tbody>
          {buyers_orders.filter(buyers_orders => buyers_orders.order_id.toLowerCase().includes(query)).map(item => (
            <tr key={item.field_product_id}>
              <td>{item.order_id}</td>
              <td>{item.created}</td>
              <td>{item.placed_2}</td>
              <td>{item.state}</td>
              <td>{item.total_price__number_2}</td>
              <td><input type="submit" value="View" onClick={() => viewOrderDetails(item.order_id)}></input></td>
              <td><input type="submit" value="Remove" onClick={() => removeOrder(item.uuid_1)}></input></td>
              {item.state === 'completed' && (
                <td><input type="submit" value="Invoices" onClick={() => view_invoice(item.order_id)}></input></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
