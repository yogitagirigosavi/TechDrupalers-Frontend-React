import React from "react";
import './Vendor_Details.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const  Vendor_Details = () => 
{
    const navigate = useNavigate();
    const ven = JSON.parse(localStorage.getItem('venData'));

    const deleteVendor = (vendorUUID) => 
    {
        fetch(`http://localhost/TechDrupalers/web/jsonapi/user/user/${vendorUUID}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) 
            {
                // Product deleted successfully, perform any additional tasks if needed
                //console.log('Product deleted successfully');
                toast.success("Vendor deleted successfully");
                navigate("/admindashboard/vendor");
                // Refresh the page or update the UI as desired
            } 
            else 
            {
                console.log('Failed to delete vendor');
                toast.error("Failed to delete vendor");
                // Handle the error or display an error message
            }
        })
        .catch(error => {
            console.log('Error deleting vendor:', error);
            toast.error("Error deleting vendor");
            // Handle the error or display an error message
        });
    }

    const editVendor = (vendorUID) => 
    {
        console.log(vendorUID);
        fetch(`http://localhost/TechDrupalers/web/api/specific_vendor/${vendorUID}?_format=json`)
        .then((response) => response.json())
        .then((data) => 
        {
            //console.log(data);
            localStorage.setItem('New Vendor', JSON.stringify(data));
            navigate("/admindashboard/editvendor");
        })
        .catch((error) => console.error(error));
    }

    return (
        <><div className="vendor_details-pagetitle">
            <h2>Vendor Details</h2>
        </div>
        <div>
            {ven ? (
                    <table className="vendor_details">
                        <tbody>
                            <tr>
                                <td><h4>ID</h4></td>
                                <td><p>{ven[0].uid}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Name</h4></td>
                                <td><p>{ven[0].name}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Email</h4></td>
                                <td><p>{ven[0].mail}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Company Name</h4></td>
                                <td><p>{ven[0].field_company_name}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Roles</h4></td>
                                <td><p>{ven[0].roles_target_id}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Created</h4></td>
                                <td><p>{ven[0].created}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Last Access</h4></td>
                                <td><p>{ven[0].access}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Last Login</h4></td>
                                <td><p>{ven[0].login}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Locality</h4></td>
                                <td><p>{ven[0].field_address_locality}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Administrative Area</h4></td>
                                <td><p>{ven[0].field_address_administrative_area}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Address</h4></td>
                                <td><p>{ven[0].field_address_address_line1}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Country Code</h4></td>
                                <td><p>{ven[0].field_address_country_code}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Postal Code</h4></td>
                                <td><p>{ven[0].field_address_postal_code}</p></td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No vendor data available.</p>
                )}
            </div><table className="edit-remove-buttons-vendors">
                <tbody>
                    <tr>
                        <td><input type="submit" value="Edit Vendor" onClick={() => editVendor(ven[0].uid)}></input></td>
                        <td><input type="submit" value="Delete Vendor" onClick={() => deleteVendor(ven[0].uuid)}></input></td>
                    </tr>
                </tbody>
            </table></>
        
    );
};

export default Vendor_Details;