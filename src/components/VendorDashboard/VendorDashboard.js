import ProductCatelog from "./pages/productCatelog";
import Orders from "./pages/Orders";
import Invoices from "./pages/Invoices";
import AddQuotation from "./pages/AddQuotation";
import { Route,Routes} from 'react-router-dom';
import Footer from './Footer';
import Sidebar from "./VendorSidebar";
import Header from "./Header";
import UserProfile from './UserProfile';
import React, { useEffect, useState } from 'react';
import Rates from "./pages/Rates";


function AdminDashboard() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile data or retrieve it from localStorage
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const parsedProfile = JSON.parse(userProfile);
      setUser(parsedProfile);
    }
  }, []); 

  return (
    <div>
      <Header/>
        <Sidebar>
          <Routes>
            <Route path='/productCatelog' element={<ProductCatelog user={user}/>}></Route>
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/invoices' element={<Invoices />}></Route>
            <Route path='/add_quotation' element={<AddQuotation/>}></Route>
            <Route path='/profile' element={<UserProfile user={user}/>}></Route>
            <Route path='/rates' element={<Rates user={user}/>}></Route>
          </Routes>
        </Sidebar>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
