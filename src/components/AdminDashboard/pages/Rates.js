import React, { useState, useEffect } from "react";
import './Rates.css';

const Rates = () => 
{
  const [ratedProducts, setRatedProducts] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => 
  {
    fetch("http://localhost/TechDrupalers/web/api/admin-side-rates-view?_format=json")
      .then(response => response.json())
      .then(data => {
        setRatedProducts(data);
        const uniqueVendors = [...new Set(data.map(rpro => rpro.field_venodr))];
        setVendors(uniqueVendors);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <div className="rates-pagetitle">
        <h2>Rates</h2>
      </div>

      <table id="rates-table">
        <thead>
          <tr>
            <td>Vendor Name</td>
            <td>Product Name</td>
            <td>Rates</td>
          </tr>
        </thead>
        <tbody>
          {vendors.map(vendor => {
            const vendorProducts = ratedProducts.filter(rpro => rpro.field_venodr === vendor);
            return (
              <React.Fragment key={vendor}>
                <tr>
                  <td rowSpan={vendorProducts.length}>{vendor}</td>
                  <td>{vendorProducts[0].field_pro}</td>
                  <td>{vendorProducts[0].field_rate}</td>
                </tr>
                {vendorProducts.slice(1).map(rpro => (
                  <tr key={rpro.field_p}>
                    <td>{rpro.field_pro}</td>
                    <td>{rpro.field_rate}</td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Rates;
