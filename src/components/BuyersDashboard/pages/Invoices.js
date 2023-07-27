import React from "react";
import './Invoices.css';
import { useState, useEffect} from "react";

const  Invoices = ({ user }) => 
{
    const [query, setQuery] = useState("");
    const  invoice = JSON.parse(localStorage.getItem('Invoice'));
    
    return (
        <>
            <div className="invoices-pagetitle">
                <h2>Invoices</h2>
            </div>
            <div>
                <input type='text' placeholder='Search here...' className='invoices-search' onChange={e => setQuery(e.target.value)}></input>
                <table id='invoices-table'>
                    <thead>
                        <tr>
                            <td>Invoice Number</td>
                            <td>Date</td>
                            <td>Language</td>
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
                                <td>{inv.state}</td>
                                <td><input type="submit" value="Pay Invoice"></input></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>     
        </>          
    );
};

export default Invoices;