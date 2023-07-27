
import Footer from './Footer';
import Sidebar from "./AdminSidebar";
import Header from "./Header";
import { Route, Routes } from 'react-router-dom';
import ProductCatalog from './pages/ProductCatelog';
import AddProducts from './pages/addProducts';
import BuyerCustomer from './pages/buyCust';
import CustomerWishlist from './pages/CustomerWishlist';
import AddUser from './pages/addUser';
import Vendor from './pages/vendor';
import AdminOrders from './pages/Adminorders';
import Product from './pages/Product';
import CertificationMaster from './pages/certificationMaster';
import CategoryMaster from './pages/categoryMaster';
import BuyerDetails from './pages/Buyer_Details';
import VendorDetails from './pages/Vendor_Details';
import WishlistDetails from './pages/Wishlist_Details';
import OrderDetails from './pages/OrderDetails';
import UserProfile from './UserProfile';
import AddMargin from './pages/AddMargin';
import Rates from './pages/Rates';
import React, { useEffect, useState } from 'react';
import EditProduct from './pages/EditProduct';
import EditBuyer from './pages/EditBuyer';
import EditVendor from './pages/EditVendor';
import Invoice from './pages/Invoice';
import ViewInvoice from './pages/ViewInvoice';

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
                <Route path='/productCatelog' element={<ProductCatalog/>}></Route>
                <Route path='/addproducts' element={<AddProducts />}></Route>
                <Route path='/buyer-customer' element={<BuyerCustomer />}></Route>
                <Route path='/customerWishlist' element={<CustomerWishlist />}></Route>
                <Route path='/addUser' element={<AddUser />}></Route>
                <Route path='/vendor' element={<Vendor />}></Route>
                <Route path='/orders' element={<AdminOrders />}></Route>
                <Route path='/products' element={<Product />}></Route>
                <Route path='/certification' element={<CertificationMaster/>}></Route>
                <Route path='/category' element={<CategoryMaster/>}></Route>
                <Route path='/buyer_details' element={<BuyerDetails/>}></Route>
                <Route path='/vendor_details' element={<VendorDetails/>}></Route>
                <Route path='/wishlist_details' element={<WishlistDetails/>}></Route>
                <Route path='/order_details' element={<OrderDetails/>}></Route>
                <Route path='/profile' element={<UserProfile user={user}/>}></Route>
                <Route path='/addmargin' element={<AddMargin/>}></Route>
                <Route path='/rates' element={<Rates/>}></Route>
                <Route path='/editproduct' element={<EditProduct/>}></Route>
                <Route path='/editbuyer' element={<EditBuyer/>}></Route>
                <Route path='/editvendor' element={<EditVendor/>}></Route>
                <Route path='/invoice' element={<Invoice/>}></Route>
                <Route path='/viewinvoice' element={<ViewInvoice/>}></Route>
            </Routes>
        </Sidebar>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
