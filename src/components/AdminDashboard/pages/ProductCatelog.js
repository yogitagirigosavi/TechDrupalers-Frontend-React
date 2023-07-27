import './ProductCatelog.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const ProductCatalog = () => 
{
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => 
    {
        fetch('http://localhost/TechDrupalers/web/api/product_catelogue?_format=json')
        .then(response => {
                              if (!response.ok) 
                              {
                                  throw new Error(response.status);
                              }
                              return response.json();
            })
        .then(data => {
        if (Array.isArray(data)) 
        {
            setProducts(data);
        } 
        else if (data.hasOwnProperty('data')) 
        {
            setProducts(data.data);
        }
      })
      .catch(error => console.error(error));
    
    }, []);

     console.log(query);

    const productDetails = (product_id) => 
    {
        fetch(`http://localhost/TechDrupalers/web/api/view-product/${product_id}?_format=json`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            localStorage.setItem('productData', JSON.stringify(data));
            navigate('/admindashboard/products');
        })
      .catch(error => console.error(error));
    }
  
  return (
    <>
      <ToastContainer />
      <div className='pagetitle'>
        <h2>Product Catalog</h2>
      </div>
      <input type='text' placeholder='Search here...' className='admin-products-search' onChange={e => setQuery(e.target.value)}></input>
      <table id='admins-products-table'>
        <thead>
          <tr>
            <td>Product ID</td>
            <td>Product Name</td>
            <td>HSN Code</td>
            <td>Category</td>
            <td>Link to Product</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.filter((product) => product.field_pro.toLowerCase().includes(query)).map((product) => (
            <tr key={product.field_product_id}>
              <td>{product.field_product_id}</td>
              <td>{product.field_pro}</td>
              <td>{product.field_hs}</td>
              <td>{product.field_select_category_3}</td>
              <td><input className="view_details_button" type="submit" value="View More Details" onClick={() => productDetails(product.field_product_id)}></input></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductCatalog;
