import React from "react";
import './Product.css';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => 
{
    
    const product = JSON.parse(localStorage.getItem('productData'));

    return (
        <>
            <div className="product-details-pagetitle">
                <h2>Product Details</h2>
            </div>
            <div>
                {product ? (
                    <table className="product-details">
                        <tbody>
                            <tr>
                                <td> <h4>Product ID</h4></td>
                                <td><p>{product[0].field_product_id}</p></td>
                            </tr>
                       
                            <tr>
                                <td><h4>Product Name</h4></td>
                                <td><p>{product[0].field_pro}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Product Scientific Name</h4></td>
                                <td><p>{product[0].field_product_scientific_name}</p></td>
                            </tr>

                        
                            <tr>
                                <td><h4>HSN Code</h4></td>
                                <td><p>{product[0].field_hs}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Product Category</h4></td>
                                <td><p>{product[0].field_select_category}</p></td>
                            </tr>
                        
                            
                            <tr>
                                <td><h4>Total Rate</h4></td>
                                <td><p>{product[0].field_to}</p></td>
                            </tr>
                            

                            <tr>
                                <td><h4>Ingredients</h4></td>
                                <td><p>{product[0].field_ingredients}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Manufacturing Process</h4></td>
                                <td><p>{product[0].field_manufacturing_process}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Certification</h4></td>
                                <td><p>{product[0].field_select_certification}</p></td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No product data available.</p>
                )}
            </div>
        </>
    );
}

export default Product;
