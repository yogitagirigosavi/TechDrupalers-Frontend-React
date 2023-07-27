import React from "react";
import './EditVendor.css';
import { useState, useEffect } from 'react';
import { encode } from 'base-64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  EditVendor = () => 
{
    const[roles, setRoles] = useState([]);

    const vendor = JSON.parse(localStorage.getItem("New Vendor"));
    const vendorUUID = vendor[0].uuid;

    const[email, emailchange] = useState(vendor[0].mail || "");
    const[username, usernamechange] = useState(vendor[0].name || "");
    const[password, passwordchange] = useState(vendor[0].pass || "");
    const[confpassword, confpasswordchange] = useState(vendor[0].pass || "");
    const[compname, compnamechange] = useState(vendor[0].field_company_name || "");
    const[countries, countrieschange] = useState(vendor[0].field_address_country_code || "");
    const[streetadd, streeetaddchange] = useState(vendor[0].field_address_address_line1 || "");
    const[city,citychange] = useState(vendor[0].field_address_locality || "");
    const[pincode,pincodechange] = useState(vendor[0].field_address_postal_code || "");
    const[state,statechange] = useState(vendor[0].field_address_administrative_area || "");

    const authusername = localStorage.getItem('Username');
    const authpassword = localStorage.getItem('Password');

    useEffect(() => 
    {

        const fetchData = () => 
        {
            const credentials = `${authusername}:${authpassword}`;
            const encodedCredentials = encode(credentials);
        
            fetch('http://localhost/TechDrupalers/web/jsonapi/user_role/user_role', 
               {
                    method: 'GET',
                    headers: 
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + encodedCredentials
                    }
                })
                .then(response => response.json())
                .then(jsonData => 
                {
                        setRoles(jsonData.data.map(role => ({
                        ...role,
                        checked: false
                        //console.log(jsonData.data);
                    })));
                })
                .catch(error => 
                {
                        console.error(error);
                });
        };
        
        fetchData();

    }, []);


    const handleCheckboxChange = (index) => 
    {
        setRoles(prevRoles => 
        {
                    const updatedRoles = [...prevRoles];
                    updatedRoles[index].checked = !updatedRoles[index].checked;
                    return updatedRoles;
        });
    };

    const handlesubmit = (e) => 
    {

        e.preventDefault();
        let regobj = {
                        email,
                        username,
                        password,
                        confpassword,
                        roles: roles.filter(role => role.checked).map(role => role.attributes.label),
                        compname,
                        countries,
                        streetadd,
                        city,
                        pincode,
                        state
                    }
        //console.log(regobj);
        updateVendor(vendorUUID);
    }

    const updateVendor = (uuidvendor) =>
    {
        const requestBody = 
        {
            "data": 
            {
                "type": "user--user",
                "id": uuidvendor,
                "attributes": 
                {
                    "name": username,
                    "mail": email,
                    "field_company_name": compname
                }//,

                /*"relationships": 
                {
                    "roles": 
                    {
                        "data": 
                        {
                            "type": "user_role--user_role",
                            "id": "59dae5a3-4978-44ba-bd85-69f0546f991c"
                        }
                    }
                }*/
            }
        };
      
        // Convert the request body to a JSON string
        const requestBodyString = JSON.stringify(requestBody);
      
        // Define the API URL
        const apiUrl = `http://localhost/TechDrupalers/web/jsonapi/user/user/${uuidvendor}`;
      
        // Define the headers for the request
        const headers = 
        {
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json",
        };
      
          
        // Send the POST request
        fetch(apiUrl, 
        {
            method: "PATCH",
            headers: headers,
            body: requestBodyString,
        })
        .then((response) => response.json())
        .then((data) => 
        {
            //console.log("User Updated Successfully " + data); // Log the response data
            toast.success("User Updated Successfully!");
            clearForm();
            //navigate('/admindashboard/buyer-customer')
        })
        .catch((error) => 
        {
            console.error("Error:", error);
            toast.error("Failed to update user!");
        });
    }

    const clearForm = () => 
    {
        emailchange("");
        usernamechange("");
        passwordchange("");
        confpasswordchange("");
        compnamechange("");
        countrieschange("");
        streeetaddchange("");
        citychange("");
        pincodechange("");
        statechange("");
        setRoles(prevRoles => prevRoles.map(role => ({ ...role, checked: false })));
    };

    return (
        <>
            <ToastContainer /> {/* Add the toast container component */}
            <div className="edit-vendor-pagetitle">
                <h2>Edit User</h2>
            </div>
            <div className="form-container">
                <form onSubmit={handlesubmit}>
                    <div className="field-label">
                        <label>Email</label>
                    </div>
                    <div>
                        <input type="email" value={email} onChange={e => emailchange(e.target.value)}></input>
                    </div>
                    <div className="field-label">
                        <label>Username</label>
                    </div>
                    <div>
                        <input type="text" value={username} onChange={e => usernamechange(e.target.value)}></input>
                    </div>
                    <div className="field-label">
                        <label>Password</label>
                    </div>
                    <div>
                        <input type="password" value={password} onChange={e => passwordchange(e.target.value)}></input>
                    </div>
                    <div className="field-label">
                        <label>Confirm Password</label>
                    </div>
                    <div>
                        <input type="password" value={confpassword} onChange={e => confpasswordchange(e.target.value)}></input>
                    </div>
                    <div className="field-label">
                        <label>Roles</label>
                    </div>
                    <div>
                            {roles.map((role,index) => (
                               <div key={role.attributes.weight}>
                                        <input
                                            type="checkbox"
                                            value={role.attributes.label}
                                            checked={role.checked}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        {role.attributes.label}
                                </div>
                            ))}
    
                    </div>
                    <div className="field-label-company-name">
                        <label>Company Name</label>
                    </div>
                    <div>
                        <input type="text" value={compname} onChange={e => compnamechange(e.target.value)}></input>
                    </div>
                    <div>
                        <div className="field-address">
                            <div className="address">
                                <label>Address</label>
                            </div>
                            <div className="address-field-labels">
                                <label>Country</label>
                            </div>
                            <div className="field-select">
                                <select value={countries} onChange={e => countrieschange(e.target.value)}>
                                    <option value="">- select -</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div className="address-field-labels">
                                <label>Street Address</label>
                            </div>
                            <div>
                                <input type="text" value={streetadd} onChange={e => streeetaddchange(e.target.value)}></input>
                            </div>
                            <div className="address-field-labels">
                                <label>City</label>
                            </div>
                            <div>
                                <input type="text" value={city} onChange={e => citychange(e.target.value)}></input>
                            </div>
                            <div className="address-field-labels">
                                <label>Pin Code</label>
                            </div>
                            <div>
                                <input type="text" value={pincode} onChange={e => pincodechange(e.target.value)}></input>
                            </div>
                            <div className="address-field-labels">
                                <label>State</label>
                            </div>
                            <div className="field-select">
                                <select value={state} onChange={e => statechange(e.target.value)}>
                                    <option>- Select -</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Andaman & Nicobar">Andaman & Nicobar</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Dadra & Nagar Haveli and Daman & Diu">Dadra & Nagar Haveli and Daman & Diu</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Ladakh">Ladakh</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Puducherry">Puducherry</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Update Info" />
                    </div>
                </form>
            </div></> 
        
    );
};

export default EditVendor;