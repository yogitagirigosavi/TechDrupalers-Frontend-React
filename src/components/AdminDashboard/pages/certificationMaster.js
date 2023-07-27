import React from "react";
import './certificationMaster.css';
import { useState } from "react";
import { encode } from 'base-64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CertificationMaster = () => {

        const [certification_name, certification_namechange] = useState("");
        const [description, descriptionchange] = useState("");

        const handlesubmit = (e) => {

            e.preventDefault();
            //let regobj = { certification_name, description};
            //console.log(regobj);

            // Define the request body
            const requestBody = {
                data: {
                    type: "node--certificate",
                    attributes: {
                        title: certification_name,
                        field_description: description
                    }
                }
            };

            // Convert the request body to a JSON string
            const requestBodyString = JSON.stringify(requestBody);

            // Define the API URL
            const apiUrl = "http://localhost/TechDrupalers/web/jsonapi/node/certificate";

            const username = localStorage.getItem('Username');
            const password = localStorage.getItem('Password');

            const headers = {
                "Content-Type": "application/vnd.api+json",
                "Accept": "application/vnd.api+json",
                Authorization: "Basic " + encode(`${username}:${password}`)
            };

            // Send the POST request
            fetch(apiUrl, {
                method: "POST",
                headers: headers,
                body: requestBodyString
            })
            .then(response => response.json())
            .then(data => {
                    //console.log(data); // Log the response data
                    toast.success("Data added successfully!");
                    clearForm();
            })
            .catch(error => {
                    console.error("Error:", error);
                    toast.error("Failed to add data!");
            });
        };

        const clearForm = () => {
            certification_namechange("");
            descriptionchange("");
        };

    return (
        <>
            <ToastContainer /> {/* Add the toast container component */}
            <div className="certification-master-pagetitle">
                <h2>Certification Master</h2>
            </div>
            <div className="certification-master-form-container">
                <form onSubmit={handlesubmit}>
                    <div>
                        <label>Certification Name</label>
                    </div>
                    <div>
                        <input type="text" value={certification_name} onChange={e => certification_namechange(e.target.value)}></input>
                    </div>

                    <div>
                        <label>Description</label>
                    </div>
                    <div>
                        <textarea value={description} onChange={e => descriptionchange(e.target.value)}></textarea>
                    </div>

                    <div>
                        <input type="submit" value="Save"></input>
                    </div>
                </form>
            </div></>
    );
};

export default CertificationMaster;