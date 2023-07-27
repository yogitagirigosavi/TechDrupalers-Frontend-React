import './productCatelog.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { encode } from 'base-64';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router';


const ProductCatalog = ({ user }) => 
{
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [wishlistExists, setWishlistExists] = useState(false);

  const navigate = useNavigate();

  const username = localStorage.getItem('Username');
  const password = localStorage.getItem('Password');

  useEffect(() => 
  {
    fetchToken();
    fetchProducts();
    fetchUserData();
  }, []);

  const fetchToken = async () => {
    try {
      const response = await axios.get('http://localhost/TechDrupalers/web/session/token');
      const fetchedToken = response.data;
      setToken(fetchedToken);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = () => {
    fetch('http://localhost/TechDrupalers/web/api/buyer/product-catelog?_format=json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  };

  const createWishlist = (product_variation_UUID) => 
  {
    const user = username;
    const pass = password;

    const authHeader = 'Basic ' + encode(`${user}:${pass}`);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Authorization: authHeader,
        'X-CSRF-Token': token, // Include the XCSR Token header
      },
      body: JSON.stringify({
        "data": {
          "type": "commerce_wishlist--default",
          "attributes": {
            "name": "Wishlist"
          },
          "relationships": {
            "commerce_wishlist_type": {
              "data": {
                "type": "commerce_wishlist_type--commerce_wishlist_type",
                "id": "e5815e5c-311a-4d86-aa5d-ef987591aaa3"
              }
            }
          }
        }
      }),
    };

    fetch('http://localhost/TechDrupalers/web/jsonapi/commerce_wishlist/default', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Wishlist Created:', data);
        setWishlistExists(true);
        localStorage.setItem('UserWishlistUUID', data.data.id); // Store wishlist UUID in localStorage
        const wishlistuuid = localStorage.getItem('UserWishlistUUID');
        additeminthewishlist(wishlistuuid, product_variation_UUID);
      })
      .catch(error => console.error(error));
  }

  const additeminthewishlist = (WUUID,PUUID) => 
  {
    const user = username;
    const pass = password;

    const authHeader = 'Basic ' + encode(`${user}:${pass}`);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Authorization: authHeader,
        'X-CSRF-Token': token, // Include the XCSR Token header
      },
      body: JSON.stringify({
        "data": {
          "type": "commerce_wishlist_item--commerce_product_variation",
          "relationships": {
            "wishlist_id": {
              "data": {
                "type": "commerce_wishlist--default",
                "id": WUUID
              }
            },
            "purchasable_entity": {
              "data": {
                "type": "commerce_product_variation--default",
                "id": PUUID
              }
            }
          }
        }
      }),
    };

    fetch('http://localhost/TechDrupalers/web/jsonapi/commerce_wishlist_item/commerce_product_variation', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Item added to wishlist:', data);
        toast.success('Item added to wishlist'); // Display success toast message
      })
      .catch(error => console.error(error));
  }

  const wishlistuuid = localStorage.getItem('UserWishlistUUID');

  const addtowishlist = (wishlist_uuid, product_variation_UUID) => 
  {
    if (wishlistExists) 
    {
      console.log("Wishlist exists.");
      additeminthewishlist(wishlist_uuid, product_variation_UUID);
    } 
    else 
    {
      console.log("Wishlist does not exist.");
      createWishlist(product_variation_UUID);
    }
  };

  const fetchUserData = () => 
  {
    axios
      .get(`http://localhost/TechDrupalers/web/api/user_view/${user && user.uid}?_format=json`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const userData = response.data;
        setUserData(userData);
        console.log(userData);
        //setWishlistExists(userData && userData[0] && userData[0].relationships && userData[0].relationships.commerce_wishlist);
        if(userData[0].uuid === null)
        {
          setWishlistExists(false);
        }
        else
        {
          const WishlistID = userData[0].uuid;
          localStorage.setItem('UserWishlistUUID', WishlistID);
          setWishlistExists(true);
        }
      })
      .catch(error => console.error(error));
  };

  const productDetails = (product_id) => 
  {
    fetch(`http://localhost/TechDrupalers/web/api/view-product/${product_id}?_format=json`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('productData', JSON.stringify(data));
        navigate('/buyersdashboard/products');
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <ToastContainer />
      <div className='product-pagetitle'>
        <h2>Product Catalog</h2>
      </div>
      <input type='text' placeholder='Search here...' className='buyers-products-search' onChange={e => setQuery(e.target.value)}></input>
      <table id='buyers-products-table'>
        <thead>
          <tr>
            <td>ProductID</td>
            <td>Product Name</td>
            <td>HSN Code</td>
            <td>Category</td>
            <td>Link to Product</td>
            <td colSpan="2">More Links</td>
          </tr>
        </thead>
        <tbody>
          {products.filter(product => product.field_pro.toLowerCase().includes(query)).map(product => (
            <tr key={product.uuid_1}>
              <td>{product.field_product_id}</td>
              <td>{product.field_pro}</td>
              <td>{product.field_hs}</td>
              <td>{product.field_select_category_1}</td>
              <td><input className="buyer-view_details-button" type="submit" value="View More Details" onClick={() => productDetails(product.field_product_id)}></input></td>
              <td><input className="add-to-wishlist-button" type="submit" value="Add to Wishlist" onClick={() => addtowishlist(wishlistuuid,product.uuid)}></input></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductCatalog;
