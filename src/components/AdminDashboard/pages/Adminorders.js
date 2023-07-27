import './Adminorders.css';
import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';

const Adminorders = () => {

    const [admin_orders, setAdmin_orders] = useState([]);
    const [uniqueCustomers, setUniqueCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => 
    {
        fetch('http://localhost/TechDrupalers/web/api/admin-orders?_format=json')
          .then(response => response.json())
          .then(data => {
            setAdmin_orders(data);
            const uniqueCustomerIDs = Array.from(new Set(data.map(item => item.uid_1)));
            setUniqueCustomers(uniqueCustomerIDs);
          })
          .catch(error => console.error(error));
      }, []);
      


    const view_order_details = (UID) => {

        fetch(`http://localhost/TechDrupalers/web/api/specific_order/${UID}?_format=json`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem('orderData', JSON.stringify(data));
            navigate('/admindashboard/order_details');
        })
        .catch((error) => console.error(error));
        
    }

    const [query, setQuery] = useState("");
    console.log(query);

    return (
                <><div className='admins-orders-pagetitle'>
                        <h2>Orders</h2>
                   </div>
                   <input type='text' placeholder='Search here...' className='admin-orders-search' onChange={e => setQuery(e.target.value)}></input>
                   <table id="admin-orders-table">
                        <thead>
                            <tr>
                                <td>Order ID</td>
                                <td>Customer Name</td>
                                <td>Contact Email</td>
                                <td>Link to Details</td>

                            </tr>
                        </thead>
                        <tbody>
                            {uniqueCustomers.map(customerID => {
                            const order = admin_orders.find(item => item.uid_1 === customerID);

                            return (
                                        <tr key={order.order_id}>
                                            <td>{order.order_id}</td>
                                            <td>{order.uid_1}</td>
                                            <td>{order.mail}</td>
                                            <td><input type="submit" value="View Orders" className="order_details_button"
                                                    onClick={() => view_order_details(order.uid)}
                                                ></input>
                                            </td>
                                        </tr>
                                    );
                            })}
                        </tbody>

                    </table></>
            )
}

export default Adminorders;