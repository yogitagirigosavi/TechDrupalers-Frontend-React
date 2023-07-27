import React from "react";
import './categoryMaster.css';
import { useState } from "react";
import { encode } from 'base-64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryMaster = () => 
{
    const [category_name, category_namechange] = useState("");
    const [description, descriptionchange] = useState("");
    const [parent_category, parent_categorychange] = useState("");

    const handlesubmit = (e) => 
    {

        e.preventDefault();
        //let regobj = { category_name, description, parent_category };
        //console.log(regobj);

        // Define the request body
        const requestBody = 
        {
            data: {
                type: "node--category",
                attributes: {
                    title: category_name,
                    field_c_description: description,
                    field_parent_category: parent_category
                }
            }
        };

        // Convert the request body to a JSON string
        const requestBodyString = JSON.stringify(requestBody);

        // Define the API URL
        const apiUrl = "http://localhost/TechDrupalers/web/jsonapi/node/category";

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
        category_namechange("");
        descriptionchange("");
        parent_categorychange("");
    };

    return (
        <>
            <ToastContainer /> {/* Add the toast container component */}
            <div className="category-master-pagetitle">
                <h2>Category Master</h2>
            </div>
            <div className="category-master-form-container">
                <form onSubmit={handlesubmit}>
                    <div>
                        <label>Category Name</label>
                    </div>
                    <div>
                        <input type="text" value={category_name} onChange={e => category_namechange(e.target.value)}></input>
                    </div>

                    <div>
                        <label>Description</label>
                    </div>
                    <div>
                        <textarea value={description} onChange={e => descriptionchange(e.target.value)}></textarea>
                    </div>

                    <div>
                        <label>Parent Category</label>
                    </div>
                    <div>
                        <input type="text" value={parent_category} onChange={e => parent_categorychange(e.target.value)}></input>
                    </div>

                    <div>
                        <input type="submit" value="Save"></input>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CategoryMaster;