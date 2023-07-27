import ProductCatelog from "./pages/productCatelog";
import Orders from "./pages/Orders";
import Invoices from "./pages/Invoices";
import Wishlist from "./pages/Wishlist";
import MyCart from "./pages/MyCart";
import { Route,Routes} from 'react-router-dom';
import Footer from './Footer';
import Sidebar from "./BuyerSidebar";
import Header from "./Header";
import UserProfile from './UserProfile';
import React, { useEffect, useState } from 'react';
import Product from "./pages/Product";
import OrderDetails from "./pages/OrderDetails";
import UpdatedRates from "./pages/UpdatedRates";
import BillingNDShipping from "./pages/BillingNDShipping";

function BuyersDashboard() {

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
            <Route path='/mycart' element={<MyCart user={user}/>}></Route>
            <Route path='/wishlist' element={<Wishlist user={user}/>}></Route>
            <Route path='/orders' element={<Orders user={user}/>}></Route>
            <Route path='/invoices' element={<Invoices user={user}/>}></Route>
            <Route path='/profile' element={<UserProfile user={user}/>}></Route>
            <Route path='/products' element={<Product/>}></Route>
            <Route path='/order_details' element={<OrderDetails/>}></Route>
            <Route path='/updatedrates' element={<UpdatedRates user={user}/>}></Route>
            <Route path='/orderinfo' element={<BillingNDShipping/>}></Route>
          </Routes>
        </Sidebar>
      <Footer />
    </div>
  );
}

export default BuyersDashboard;
