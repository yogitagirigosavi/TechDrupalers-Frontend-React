import React from "react";
import './EditProduct.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { json } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const EditProduct = () => 
{
    const [ctg, setCtg] = useState([]);
    const [crt, setCrt] = useState([]);
    const [vendors, setVendors] = useState([]);

    useEffect(() => 
    {
        const fetchCategoryData = () => 
        {
            fetch('http://localhost/TechDrupalers/web/api/category?_format=json')
            .then(response => response.json())
            .then((data) => {
                setCtg(data);
            })
            .catch(error => {
                console.error(error);
            });
        };

        const fetchCertificationData = () => 
        {
            fetch('http://localhost/TechDrupalers/web/api/certificates?_format=json')
            .then(response => response.json())
            .then((data) => {
                setCrt(data);
                //console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
        };

        const fetchVendorData = () => 
        {
            fetch('http://localhost/TechDrupalers/web/api/vendors_only?_format=json')
                .then(response => response.json())
                .then(data => {
                    setVendors(data);
                    //console.log(data)
                })
                .catch(error => {
                    console.error(error);
                });
        };

        const selectedVendorIds = product.flatMap(prod => prod.uuid_3.split(','));
        setSelectedVendors(selectedVendorIds);

        fetchCategoryData();
        fetchCertificationData();
        fetchVendorData();
        //fetchAdminData();
        //fetchStoreData();
        //fetchToken();
    }, []);

    const product = JSON.parse(localStorage.getItem("New Product"));
    //console.log(product);
    //console.log(product[0].uuid);
    const product_uuid = product[0].uuid;
    const product_variation_uuid = product[0].uuid_4;
    //console.log(product_uuid);

    const [activeTab, setActiveTab] = useState(1);
    const [productId, setProductId] = useState(product[0].field_product_id || "");
    const [productName, setProductName] = useState(product[0].field_pro || "");
    const [scientificName, setScientificName] = useState(product[0].field_product_scientific_name || "");
    const [hsnCode, setHsnCode] = useState(product[0].field_hs || "");
    const [category, setCategory] = useState(product[0].uuid_1 || "");
    const [toPuneFright, setToPuneFright] = useState(product[0].field_t || "");
    const [innerPackageMaterial, setInnerPackageMaterial] = useState(product[0].field_inner_package_material_amo || "");
    const [outerPackageMaterial, setOuterPackageMaterial] = useState(product[0].field_ou || "");
    const [manualPackage, setManualPackage] = useState(product[0].field_m || "");
    const [machinePackage, setMachinePackage] = useState(product[0].field_mac || "");
    const [localTransport, setLocalTransport] = useState(product[0].field_local_transport || "");
    const [fumigation, setFumigation] = useState(product[0].field_fumigation || "");
    const [totalRate, setTotalRate] = useState(product[0].field_to || "");
    const [grossWeight, setGrossWeight] = useState(product[0].field_gross_weight_per_pack_ || "");
    const [bumper, setBumper] = useState(product[0].field_1_bumper______pounches || "");
    const [boxBag, setBoxBag] = useState(product[0].field_1 || "");
    const [ingredients, setIngredients] = useState(product[0].field_ingredients || "");
    const [manufacturingProcess, setManufacturingProcess] = useState(product[0].field_manufacturing_process || "");
    const [dairyDeclaration, setDairyDeclaration] = useState(product[0].field_d || "");
    const [isProductForHumanConsumption, setIsProductForHumanConsumption] = useState(product[0].field_is_this_product_form_human || "");
    const [certification, setCertification] = useState(product[0].uuid_2 || "");
    const [sku, setSku] = useState(product[0].sku || "");
    const [price, setPrice] = useState(product[0].price__number || "");
    const [selectedVendors, setSelectedVendors] = useState([]);

    const getVendorName = (uuid) => 
    {
        const vendor = vendors.find(vendor => vendor.uuid === uuid);
        return vendor ? vendor.name : "";
    };

    const handleNext = () => 
    {
        setActiveTab(activeTab + 1);
        if(activeTab === 3)
        {
            update_product_variation(product_variation_uuid);
        }
    };
    
    const handlePrevious = () => 
    {
        setActiveTab(activeTab - 1);
    };

    const handleVendorSelect = (selectedOptions) => {
        const selectedVendorIds = selectedOptions.map((option) => option.value);
        setSelectedVendors(selectedVendorIds);
    };

    const handleDairyDeclarationChange = (e) => 
    {
        setDairyDeclaration(e.target.checked);
    };
          
    const handleProductForHumanConsumptionChange = (e) => 
    {
        setIsProductForHumanConsumption(e.target.checked);
    };


    const calculateTotalRate = () => 
    {
        // Perform the calculation using the input field values
        const calculatedTotalRate =
            parseFloat(toPuneFright) +
            parseFloat(innerPackageMaterial) +
            parseFloat(outerPackageMaterial) +
            parseFloat(manualPackage) +
            parseFloat(machinePackage) +
            parseFloat(localTransport) +
            parseFloat(fumigation);

        // Set the calculated total rate
        setTotalRate(calculatedTotalRate.toFixed(2));
    };

    React.useEffect(() => 
    {
        calculateTotalRate();
    }, [
            toPuneFright,
            innerPackageMaterial,
            outerPackageMaterial,
            manualPackage,
            machinePackage,
            localTransport,
            fumigation,
        ]);

    const handleSubmit = (event) => 
    {
        event.preventDefault();
        let regobj = {
        productId,
        productName,
        scientificName,
        hsnCode,
        category,
        toPuneFright,
        innerPackageMaterial,
        outerPackageMaterial,
        manualPackage,
        machinePackage,
        localTransport,
        fumigation,
        totalRate,
        grossWeight,
        bumper,
        boxBag,
        sku,
        price,
        ingredients,
        manufacturingProcess,
        dairyDeclaration,
        isProductForHumanConsumption,
        certification,
        vendors: selectedVendors
        };
        //console.log(regobj);
        update_product(product_uuid);
    };
    
    const clearFormData = () => 
    {
        setProductId("");
        setProductName("");
        setScientificName("");
        setHsnCode("");
        setCategory("");
        setToPuneFright("");
        setInnerPackageMaterial("");
        setOuterPackageMaterial("");
        setManualPackage("");
        setMachinePackage("");
        setLocalTransport("");
        setFumigation("");
        setTotalRate("");
        setGrossWeight("");
        setBumper("");
        setBoxBag("");
        setSku("");
        setPrice("");
        setIngredients("");
        setManufacturingProcess("");
        setDairyDeclaration(false);
        setIsProductForHumanConsumption(false);
        setCertification("");
        setSelectedVendors([]);
          
    };

    const update_product = (produuid) =>
    {
        const requestBody = 
        {
            "data": 
            {
                "type": "commerce_product--default",
                "id": produuid,
                "attributes": 
                {
                    "field_pro": productName,
                    "field_hs": hsnCode,
                    "field_1": boxBag,
                    "field_1_bumper______pounches": bumper,
                    "field_fumigation": fumigation,
                    "field_gross_weight_per_pack_": grossWeight,
                    "field_ingredients": ingredients,
                    "field_inner_package_material_amo": innerPackageMaterial,
                    "field_local_transport": localTransport,
                    "field_m": manualPackage,
                    "field_mac": machinePackage,
                    "field_manufacturing_process": manufacturingProcess,
                    "field_ou": outerPackageMaterial,
                    "field_product_id": productId,
                    "field_product_scientific_name": scientificName,
                    "field_t": toPuneFright,
                    "field_to": totalRate
                },

                "relationships": 
                {
                    "field_select_category": 
                    {
                        "data": 
                        {
                            "type": "node--category",
                            "id": category
                        }
                    },

                    "field_select_certification": 
                    {
                        "data": 
                        {
                            "type": "node--certificate",
                            "id": certification
                        }
                    },

                    "field_vendor": 
                    {
                        "data" : selectedVendors.map((vendorId) => ( 
                        {
                            "type": "user--user",
                            "id": vendorId
                        }))
                    },
                }
            }
        };
      
        // Convert the request body to a JSON string
        const requestBodyString = JSON.stringify(requestBody);
      
        // Define the API URL
        const apiUrl = `http://localhost/TechDrupalers/web/jsonapi/commerce_product/default/${produuid}`;
      
        // Define the headers for the request
        const headers = 
        {
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json",
        };
      
          
        // Send the POST request
        fetch(apiUrl, 
        {
            method: "PATCH",
            headers: headers,
            body: requestBodyString,
        })
        .then((response) => response.json())
        .then((data) => 
        {
            console.log("Product Updated Successfully " + data); // Log the response data
            toast.success("Product Updated Successfully!");
            clearFormData();
        })
        .catch((error) => 
        {
            console.error("Error:", error);
            toast.error("Failed to update product!");
        });
    }

    const update_product_variation = (prodVUUID) =>
    {
        console.log(prodVUUID);
        const requestBody = 
        {
            "data":
            {
                "type": "commerce_product_variation--default",
                "id": prodVUUID,
                "attributes": 
                {
                    "sku": sku,
                    "price":
                    {
                        "number": price,
                        "currency_code": "INR",
                        "formatted": price
                    }
                }

            }
        };

        // Convert the request body to a JSON string
        const requestBodyString = JSON.stringify(requestBody);

        // Define the API URL
        const apiUrl = `http://localhost/TechDrupalers/web/jsonapi/commerce_product_variation/default/${prodVUUID}`;

        // Define the headers for the request
        const headers = 
        {
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json",
        };

        // Send the POST request
        fetch(apiUrl, 
        {
            method: "PATCH",
            headers: headers,
            body: requestBodyString,
        })
        .then((response) => response.json())
        .then((data) => 
        {
            console.log("Product Variation Updated Successfully " + data); // Log the response data
            //toast.success("Product Updated Successfully!");
        })
        .catch((error) => 
        {
            console.error("Error:", error);
            toast.error("Failed to update product!");
        });
    }

    return (
        <>
            <ToastContainer/>
            <div className="edit-product-pagetitle">
                <h2>Edit Product</h2>
            </div>

            <form onSubmit={handleSubmit} className="edit-product-form">
                <div className="tabs">
                    <button
                            className={activeTab === 1 ? "active" : ""}
                            onClick={() => setActiveTab(1)}
                        >
                        Product Basic Details
                    </button>

                    <button
                            className={activeTab === 2 ? "active" : ""}
                            onClick={() => setActiveTab(2)}
                        >
                        Price Details
                    </button>

                    <button
                            className={activeTab === 3 ? "active" : ""}
                            onClick={() => setActiveTab(3)}
                        >
                        Packaging Details
                    </button>

                    <button
                            className={activeTab === 4 ? "active" : ""}
                            onClick={() => setActiveTab(4)}
                        >
                        Declaration Details
                    </button>

                </div>

                <div className="tab-content-1">
                    {activeTab === 1 && (

                        <div>
                            <label>Product ID</label>
                            <input
                                    type="text"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)} />
                                
                            <label>Product Name</label>
                            <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)} />

                            <label>Scientific Name</label>
                            <input
                                    type="text"
                                    value={scientificName}
                                    onChange={(e) => setScientificName(e.target.value)} />

                            <label>HSN Code</label>
                            <input
                                    type="text"
                                    value={hsnCode}
                                    onChange={(e) => setHsnCode(e.target.value)} />

                            <label>Select Category</label>
                            <select
                                className="category-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            <option value="-Select-" key="-Select-">- Select -</option>
                            {ctg.map((cat) => (
                                <option key={cat.title} value={cat.uuid}>{cat.title}</option>
                            ))}
                            </select>

                            <div className="button">
                                <input
                                        type="submit"
                                        value="Next"
                                        onClick={() => handleNext()} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="tab-content-2">
                    {activeTab === 2 && (
                        <div>
                            
                            <label>To Pune Freight</label>
                            <input
                                    type="text"
                                    value={toPuneFright}
                                    onChange={(e) => setToPuneFright(e.target.value)} />

                            <label>Inner Package Material</label>
                            <input
                                    type="text"
                                    value={innerPackageMaterial}
                                    onChange={(e) => setInnerPackageMaterial(e.target.value)} />

                            <label>Outer Package Material</label>
                            <input
                                    type="text"
                                    value={outerPackageMaterial}
                                    onChange={(e) => setOuterPackageMaterial(e.target.value)} />

                            <label>Manual Package</label>
                            <input
                                    type="text"
                                    value={manualPackage}
                                    onChange={(e) => setManualPackage(e.target.value)} />

                            <label>Machine Package</label>
                            <input
                                    type="text"
                                    value={machinePackage}
                                    onChange={(e) => setMachinePackage(e.target.value)} />

                            <label>Local Transport</label>
                            <input
                                    type="text"
                                    value={localTransport}
                                    onChange={(e) => setLocalTransport(e.target.value)} />

                            <label>Fumigation</label>
                            <input
                                    type="text"
                                    value={fumigation}
                                    onChange={(e) => setFumigation(e.target.value)} />

                            <label>Total Rate</label>
                            <input
                                    type="text"
                                    value={totalRate}
                                    onChange={(e) => setTotalRate(e.target.value)} />

                            <div className="button">
                                <input
                                        type="submit"
                                        value="Previous"
                                        onClick={() => handlePrevious()} />

                            </div>

                            <div className="button">
                                <input
                                        type="submit"
                                        value="Next"
                                        onClick={() => handleNext()} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="tab-content-3">
                    {activeTab === 3 && (
                        <>
                            <div>
                                <label>Gross Weight</label>
                                <input
                                    type="text"
                                    value={grossWeight}
                                    onChange={(e) => setGrossWeight(e.target.value)} />

                                <label>1 Bumper = _____ Pounches</label>
                                <input
                                    type="text"
                                    value={bumper}
                                    onChange={(e) => setBumper(e.target.value)} />

                                <label>1 Box / Bag = _____ Bumpers</label>
                                <input
                                    type="text"
                                    value={boxBag}
                                    onChange={(e) => setBoxBag(e.target.value)} />

                                <label>SKU</label>
                                <input 
                                    type="text" 
                                    value={sku} 
                                    onChange={(e) => setSku(e.target.value)}></input>

                                <label>Price</label>
                                <input 
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}></input>

                                <div className="button">
                                    <input
                                        type="submit"
                                        value="Previous"
                                        onClick={() => handlePrevious()} />
                                </div>

                                <div className="button">
                                    <input
                                        type="submit"
                                        value="Next"
                                        onClick={() => handleNext()} />
                                </div>

                            </div>
                            </>
                    )}
                </div>
                
                
                <div className="tab-content-4">
                    {activeTab === 4 && (
                        <div>
                            <label>Ingredients</label>
                            <input
                                    type="text"
                                    value={ingredients}
                                    onChange={(e) => setIngredients(e.target.value)} />

                            <label>Manufacturing Process</label>
                            <input
                                    type="text"
                                    value={manufacturingProcess}
                                    onChange={(e) => setManufacturingProcess(e.target.value)} />

                            <label>Vendor</label>
                            <Select
                                value={selectedVendors.map(uuid => ({ value: uuid, label: getVendorName(uuid) }))}
                                options={vendors.map(vendor => ({ value: vendor.uuid, label: vendor.name }))}
                                isMulti
                                onChange={handleVendorSelect}
                                className="add-vendors"
                            />


                            <label>Dairy Declaration Required</label>
                            <input
                                type="checkbox"
                                checked={dairyDeclaration}
                                onChange={handleDairyDeclarationChange}
                            />
                                
                            <br></br>

                            <label>Is this product for human consumption</label>
                            <input
                                type="checkbox"
                                checked={isProductForHumanConsumption}
                                onChange={handleProductForHumanConsumptionChange}
                            />

                                
                            <br></br>

                            <br></br>

                            <label>Select Certification</label>
                            <select
                                    className="select-certification"
                                    value={certification}
                                    onChange={(e) => setCertification(e.target.value)}
                                >
                                <option value="-Select-" key="-Select-">- Select -</option>
                                {crt.map((cer) => (
                                    <option key={cer.title} value={cer.uuid}>{cer.title}</option>
                                ))}
                            </select>

                            <div className="button">
                                    <input type="submit" value="Update Prouct"/>
                            </div>

                        </div>
                    )}
                </div>

            </form>
        </>

    );
};

export default EditProduct;