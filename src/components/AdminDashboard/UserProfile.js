import React from "react";
import './UserProfile.css';

const UserProfile = ({ user }) => 
{
  return (
    <>
    <div className="profile-page-title">
      <h2>My Profile</h2>
    </div>
    <table className="profile-details">
      <tbody>
          <tr>
            <td><h4>ID</h4></td> 
            <td>{user && user.uid}</td>
          </tr>

          <tr>
            <td><h4>Name</h4></td>
            <td>{user && user.name}</td>
          </tr>

          <tr>
            <td><h4>Role</h4></td>
            <td>{user && user.roles[0]}, {user && user.roles[1]}</td> 
          </tr>
        </tbody>
      </table></>
  );
};

export default UserProfile;
