import React from "react";
import './ViewInvoice.css';
import { useState, useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer} from "react-toastify";

const ViewInvoice = () => 
{
    const [query, setQuery] = useState("");
    const  invoice = JSON.parse(localStorage.getItem('Invoice'));
    const navigate = useNavigate();

    const remove_invoice = (invoiceUUID) =>
    {
        fetch(`http://localhost/TechDrupalers/web/jsonapi/commerce_invoice/default/${invoiceUUID}`, {
            method: 'DELETE',
        })
        .then(response => 
        {
            if (response.ok) 
            {
                //console.log('Invoice deleted successfully');
                toast.success("Invoice deleted successfully");
                navigate("/admindashboard/order_details");
            } 
            else 
            {
                console.log('Failed to delete invoice');
                toast.error("Failed to delete invoice");
            }
        })
        .catch(error => 
        {
            console.log('Error deleting invoice :', error);
            toast.error("Error deleting invoice");
        });
    }
    
    return (
        <>
            <ToastContainer/>
            <div className="admin-view-invoice-pagetitle">
                <h2>Invoice</h2>
            </div>
            <div>
                <input type='text' placeholder='Search here...' className='admin-view-invoice-search' onChange={e => setQuery(e.target.value)}></input>
                <table id='admin-view-invoice-table'>
                    <thead>
                        <tr>
                            <td>Invoice Number</td>
                            <td>Date</td>
                            <td>Language</td>
                            <td>Customer</td>
                            <td>State</td>
                            <td colSpan="2">More Links</td>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.filter(inv => inv.state.toLowerCase().includes(query)).map(inv => (
                            <tr key={inv.invoice_number}>
                                <td>{inv.invoice_number}</td>
                                <td>{inv.invoice_date_1}</td>
                                <td>{inv.langcode_1}</td>
                                <td>{inv.uid_1}</td>
                                <td>{inv.state}</td>
                                <td><input type="submit" value="Remove" onClick={() => remove_invoice(inv.uuid)}></input></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>     
        </>          
    );
};

export default ViewInvoice;