import React, { useState } from 'react';
import './Header.css';
import { FiLogOut } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  function logout() {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('userProfile');

    localStorage.removeItem('Username');
    localStorage.removeItem('Password');

    localStorage.removeItem('ProductID');
    localStorage.removeItem('ProductName');
    localStorage.removeItem('VendorName');

    setUser(null);
    navigate('/login');
    window.location.reload();
  }

  function userprofile() {
    navigate('/vendordashboard/profile');
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
