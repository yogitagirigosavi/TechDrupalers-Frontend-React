import './productCatelog.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const ProductCatalog = ({ user }) => 
{

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const storedData = localStorage.getItem('userProfile');
  const parsedData = JSON.parse(storedData);
  const name = parsedData.name;
  //console.log(name);

  const redirect_quotation_page = (productuuid) => 
  {
    localStorage.setItem('Product UUID',productuuid);
    localStorage.setItem('VendorName',name);
    navigate('/vendordashboard/add_quotation');
  }

  useEffect(() => 
  {
    
    fetch(`http://localhost/TechDrupalers/web/api/vendor/product_catelogue/${user && user.uid}?_format=json`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const [query, setQuery] = useState("");
  console.log(query);

  return (
    <><div className='products-pagetitle'>
      <h2>Product Catelog</h2>
    </div><input type='text' placeholder='Search here...' className='vendors-products-search' onChange={e => setQuery(e.target.value)}></input>
    <table id='vendors-products-table'>
        <thead>
          <tr>
            <td>Product ID</td>
            <td>Product Name</td>
            <td>Category</td>
            <td>Link to Product</td>
          </tr>
        </thead>
        <tbody>
          {products.filter(product => product.field_pro.toLowerCase().includes(query)).map(product => (
            <tr key={product.field_product_id}>
              <td>{product.field_product_id}</td>
              <td>{product.field_pro}</td>
              <td>{product.field_select_category_1}</td>
              <td><input type="submit" value="Add Quoted Rate" className="vendor-view-details-button" onClick={()=> redirect_quotation_page(product.uuid)}></input></td>
            </tr>
          ))}
        </tbody>
      </table></>


  );
};

export default ProductCatalog;