import React from "react";
import './OrderDetails.css';
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";

const OrderDetails = () => 
{
  const ord = JSON.parse(localStorage.getItem('orderData'));
  const navigate = useNavigate();

  const gotogenerateinvoice = (orderID) =>
  {
    localStorage.setItem('Order ID', orderID);
    navigate('/admindashboard/invoice');
  }

  const view_invoice = (orderID) => 
  {
    fetch(`http://localhost/TechDrupalers/web/api/invoices/buyer/${orderID}?_format=json`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('Invoice', JSON.stringify(data));
        navigate('/admindashboard/viewinvoice');
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <div className="order_details-pagetitle">
        <h2>Order Details</h2>
      </div>
      <div>
        {ord ? (
          <table className="order_details">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Created On</th>
                <th>Placed On</th>
                <th>State</th>
                <th>Total Price</th>
                <th colSpan={2}>Options</th>
              </tr>
            </thead>
            <tbody>
              {ord.map(item => (
                <tr key={item.order_id}>
                  <td>{item.order_id}</td>
                  <td>{item.created}</td>
                  <td>{item.placed_2}</td>
                  <td>{item.state}</td>
                  <td>{item.total_price__number_2}</td>
                  <td>
                    {item.state === 'completed' && item.invoice_id && (
                          <input type="submit" value="View Invoice" onClick={() => view_invoice(item.order_id)}/>
                    )}
                    {item.state === 'completed' && !item.invoice_id && (
                      <input type="submit" value="Generate Invoice" onClick={() => gotogenerateinvoice(item.order_id)} />
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No order data available.</p>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
