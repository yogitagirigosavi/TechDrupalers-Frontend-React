import React, { useState } from 'react';
import './Header.css';
import { FiLogOut } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => 
{
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  function logout() 
  {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('userProfile');
    setUser(null);

    localStorage.removeItem('Username');
    localStorage.removeItem('Password');

    localStorage.removeItem('AdminUUID');
    localStorage.removeItem('StoreUUID');

    localStorage.removeItem('productData');
    localStorage.removeItem('custData');
    localStorage.removeItem('wishlistData');
    localStorage.removeItem('venData');
    localStorage.removeItem('orderData');
    localStorage.removeItem('ProductVariationUUID');
    localStorage.removeItem('New Product');
    localStorage.removeItem('Buyer Data');
    localStorage.removeItem('New Vendor');
    localStorage.removeItem('Invoice');
    
    navigate('/login');
    window.location.reload();
  }

  function userprofile() 
  {
    navigate('/admindashboard/profile');
  }

  return (
    <div className='admin-dashboard-header'>
      <div className='admin-dashboard-header-sitelogo'>
        <h1>Export Portal</h1>
      </div>
      <div className='admin-dashboard-header-tabs'>
        <FaUser onClick={userprofile} />
        <FiLogOut onClick={logout} />
      </div>
    </div>
  );
};

export default Header;
