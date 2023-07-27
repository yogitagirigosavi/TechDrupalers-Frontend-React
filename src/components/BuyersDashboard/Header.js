import React, { useState } from 'react';
import './Header.css';
import { FiLogOut } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  function logout() 
  {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('userProfile');
    setUser(null);

    localStorage.removeItem('Username');
    localStorage.removeItem('Password');

    localStorage.removeItem('productData');
  
    localStorage.removeItem('cartToken');

    localStorage.removeItem('OrderDetails');
    localStorage.removeItem('UserWishlistUUID');

    localStorage.removeItem('User Data');
    localStorage.removeItem('Invoice');
    localStorage.removeItem('Order Total');
    localStorage.removeItem('Order UUID');
    localStorage.removeItem('Order ID');

    navigate('/login');
    window.location.reload();
  }

  function userprofile() {
    navigate('/buyersdashboard/profile');
  }

  return (
    <div className='header'>
      <div className='sitelogo'>
        <h1>Export Portal</h1>
      </div>
      <div className='tabs'>
        <FaUser onClick={userprofile} />
        <FiLogOut onClick={logout} />
      </div>
    </div>
  );
};

export default Header;
