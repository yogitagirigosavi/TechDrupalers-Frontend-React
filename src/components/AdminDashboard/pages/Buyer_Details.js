import React from "react";
import './Buyer_Details.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const  Buyer_Details = () => 
{
    const navigate = useNavigate();
    const cust = JSON.parse(localStorage.getItem('custData'));

    const deleteBuyer = (buyerUUID) => 
    {
        fetch(`http://localhost/TechDrupalers/web/jsonapi/user/user/${buyerUUID}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) 
            {
                // Product deleted successfully, perform any additional tasks if needed
                //console.log('Product deleted successfully');
                toast.success("Buyer deleted successfully");
                navigate("/admindashboard/buyer-customer");
                // Refresh the page or update the UI as desired
            } 
            else 
            {
                console.log('Failed to delete buyer');
                toast.error("Failed to delete buyer");
                // Handle the error or display an error message
            }
        })
        .catch(error => {
            console.log('Error deleting buyer:', error);
            toast.error("Error deleting buyer");
            // Handle the error or display an error message
        });
    }

    const editBuyer = (buyerUID) => 
    {
        //console.log(buyerUID);
        fetch(`http://localhost/TechDrupalers/web/api/specific_customer/${buyerUID}?_format=json`)
        .then((response) => response.json())
        .then((data) => 
        {
            console.log(data);
            localStorage.setItem('Buyer Data', JSON.stringify(data));
            navigate("/admindashboard/editbuyer");
        })
        .catch((error) => console.error(error));
       
    }

    return (
        <><div className="buyer_details-pagetitle">
            <h2>Buyer/Customer Details</h2>
        </div>
        <div>
            {cust ? (
                    <table className="buyer_details">
                        <tbody>
                            <tr>
                                <td><h4>ID</h4></td>
                                <td><p>{cust[0].uid}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Name</h4></td>
                                <td><p>{cust[0].name}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Email</h4></td>
                                <td><p>{cust[0].mail}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Company Name</h4></td>
                                <td><p>{cust[0].field_company_name}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Roles</h4></td>
                                <td><p>{cust[0].roles_target_id}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Created</h4></td>
                                <td><p>{cust[0].created}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Accessed</h4></td>
                                <td><p>{cust[0].access}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Login</h4></td>
                                <td><p>{cust[0].login}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Locality</h4></td>
                                <td><p>{cust[0].field_address_locality}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Administrative Area</h4></td>
                                <td><p>{cust[0].field_address_administrative_area}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Address</h4></td>
                                <td><p>{cust[0].field_address_address_line1}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Country Code</h4></td>
                                <td><p>{cust[0].field_address_country_code}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Postal Code</h4></td>
                                <td><p>{cust[0].field_address_postal_code}</p></td>
                            </tr>

                        </tbody>
                    </table>
                ) : (
                    <p>No customer data available.</p>
                )}
            </div><table className="edit-remove-buttons-buyers">
                <tbody>
                    <tr>
                        <td><input type="submit" value="Edit Buyer" onClick={() => editBuyer(cust[0].uid)}></input></td>
                        <td><input type="submit" value="Delete Buyer" onClick={() => deleteBuyer(cust[0].uuid)}></input></td>
                    </tr>
                </tbody>
            </table></>
        
    );
};

export default Buyer_Details;