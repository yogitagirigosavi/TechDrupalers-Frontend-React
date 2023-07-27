import React from "react";
import './Product.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => 
{
    const navigate = useNavigate();
    const product = JSON.parse(localStorage.getItem('productData'));


    const delete_ = (uuid_of_vendor_rate_content, uuid_of_final_rate_content, productUUID) => 
    {
        deleteproduct(productUUID);        
    };

    const deletevendorrates = (uuid_vendor_rate) =>
    {
        fetch(`http://localhost/TechDrupalers/web/jsonapi/node/vendor_quoted_rate_/${uuid_vendor_rate}`, {
            method: 'DELETE',
        })
        .then(response => 
        {
            if (response.ok) 
            {
                console.log('Product vendor rate deleted successfully');
            } else 
            {
                console.log('Failed to delete vendor rate of product');
                toast.error("Failed to delete vendor rate of product");
            }
        })
        .catch(error => 
        {
            console.log('Error while deleting final rate of product:', error);
            toast.error("Error while deleting final rate of product");
        });
    }

    const deletefinalrate = (uuid_final_rate, ) =>
    {
        fetch(`http://localhost/TechDrupalers/web/jsonapi/node/final_rates/${uuid_final_rate}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) 
            {
                console.log('Product Final Rate deleted successfully');
            } else 
            {
                console.log('Failed to delete final rate of product');
                toast.error("Failed to delete final rate of product");
            }
        })
        .catch(error => 
        {
            console.log('Error while deleting final rate of product:', error);
            toast.error("Error while deleting final rate of product");
        });
    }

    const deleteproduct = (prodUUID) =>
    {
        fetch(`http://localhost/TechDrupalers/web/jsonapi/commerce_product/default/${prodUUID}`, {
            method: 'DELETE',
        })
        .then(response => 
        {
            if (response.ok) 
            {
                toast.success("Product deleted successfully");
                navigate("/admindashboard/productCatelog");
            } 
            else 
            {
                console.log('Failed to delete product');
                toast.error("Failed to delete product");
            }
        })
        .catch(error => 
        {
            console.log('Error deleting product:', error);
            toast.error("Error deleting product");

        });
    }


    const editproduct = (prodID) => 
    {
        //console.log(prodID); 
        fetch(`http://localhost/TechDrupalers/web/api/view-product/${prodID}?_format=json`)
        .then(response => response.json())
        .then(data => 
        {
            //console.log(data);
            localStorage.setItem('New Product', JSON.stringify(data));
            navigate('/admindashboard/editproduct');
        })
      .catch(error => console.error(error));
    } 

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
                                <td><h4>To Pune Freight</h4></td>
                                <td><p>{product[0].field_t}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Inner Package Material(Amount/Kg)</h4></td>
                                <td><p>{product[0].field_inner_package_material_amo}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Outer Package Material(Amount/Kg)</h4></td>
                                <td><p>{product[0].field_ou}</p></td>
                            </tr>
                        
                            <tr>
                                <td><h4>Manual Package</h4></td>
                                <td><p>{product[0].field_m}</p></td>
                            </tr>

                            <tr>
                                <td><h4>Machine Package</h4></td>
                                <td><p>{product[0].field_mac}</p></td>
                            </tr>
                            
                            <tr>
                                <td><h4>Local Transport</h4></td>
                                <td><p>{product[0].field_local_transport}</p></td>
                            </tr>
                        
                            <tr>
                                <td><h4>Fumigation</h4></td>
                                <td><p>{product[0].field_fumigation}</p></td>
                            </tr>
                            
                            <tr>
                                <td><h4>Total Rate</h4></td>
                                <td><p>{product[0].field_to}</p></td>
                            </tr>
                            
                            <tr>
                                <td><h4>Gross Weight(per pack)</h4></td>
                                <td><p>{product[0].field_gross_weight_per_pack_}</p></td>
                            </tr>
                            
                            <tr>
                                <td><h4>1 Bumper =_____Pounches</h4></td>
                                <td><p>{product[0].field_1_bumper______pounches}</p></td>
                            </tr>
                        
                            <tr>
                                <td><h4>1 Box/Bag = _____ Bumpers</h4></td>
                                <td><p>{product[0].field_1}</p></td>
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
                                <td><h4>Vendor</h4></td>
                                <td><p>{product[0].field_vendor}</p></td>
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

            <table className="edit-remove-buttons">
                <tbody>
                    <tr>
                            <td><input type="submit" value="Edit Product" onClick={() => editproduct(product[0].field_product_id)}></input></td>
                            <td><input type="submit" value="Delete Product" onClick={() => delete_(product[0].uuid_6, product[0].uuid_5, product[0].uuid)}></input></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Product;
