import React from "react";
import './addProducts.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { encode } from 'base-64';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

const AddProducts = () => 
{
        const [ctg, setCtg] = useState([]);
        const [crt, setCrt] = useState([]);
        const [vendors, setVendors] = useState([]);
        const [selectedVendors, setSelectedVendors] = useState([]);

        const username = localStorage.getItem('Username');
        const password = localStorage.getItem('Password');
        const [token, setToken] = useState("");
        
        const navigate = useNavigate();
        //console.log(username);
        //console.log(password);
        //console.log(uuidAdmin);

        useEffect(() => 
        {
                const fetchCategoryData = () => 
                {
                    fetch('http://localhost/TechDrupalers/web/api/category?_format=json')
                    .then(response => response.json())
                    .then((data) => {
                        setCtg(data);
                        //console.log(data);
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

                const fetchAdminData = () => 
                {
                    fetch('http://localhost/TechDrupalers/web/api/admin_user_view?_format=json')
                        .then(response => response.json())
                        .then(admindata => {
                            //console.log(data[0].uuid);
                            const adminuuid = admindata[0].uuid;
                            localStorage.setItem("AdminUUID",adminuuid);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                };

                const fetchStoreData = () => 
                {
                    fetch('http://localhost/TechDrupalers/web/api/store_data?_format=json')
                        .then(response => response.json())
                        .then(storedata => {
                            //console.log(storedata[0].uuid);
                            const storeuuid = storedata[0].uuid;
                            localStorage.setItem("StoreUUID",storeuuid);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                };

                const fetchToken = async () => {
                    try {
                      const response = await axios.get('http://localhost/TechDrupalers/web/session/token');
                      const fetchedToken = response.data;
                      setToken(fetchedToken);
                    } catch (error) {
                      console.error(error);
                    }
                };

                fetchCategoryData();
                fetchCertificationData();
                fetchVendorData();
                fetchAdminData();
                fetchStoreData();
                fetchToken();
        }, []);

        const fetchProductVariationUUID = () => 
        {
            fetch('http://localhost/TechDrupalers/web/api/product-variation?_format=json')
                .then(response => response.json())
                .then(pvuuid => {
                    //console.log(pvuuid[0].uuid);
                    const pvariuuid = pvuuid[0].uuid;
                    localStorage.setItem("ProductVariationUUID",pvariuuid);
                })
                .catch(error => {
                        console.error(error);
                });
        };

        const handleVendorSelect = (selectedOptions) => 
        {
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

        const [activeTab, setActiveTab] = useState(1);
        const [productId, setProductId] = useState("");
        const [productName, setProductName] = useState("");
        const [scientificName, setScientificName] = useState("");
        const [hsnCode, setHsnCode] = useState("");
        const [category, setCategory] = useState("");
        const [toPuneFright, setToPuneFright] = useState("");
        const [innerPackageMaterial, setInnerPackageMaterial] = useState("");
        const [outerPackageMaterial, setOuterPackageMaterial] = useState("");
        const [manualPackage, setManualPackage] = useState("");
        const [machinePackage, setMachinePackage] = useState("");
        const [localTransport, setLocalTransport] = useState("");
        const [fumigation, setFumigation] = useState("");
        const [totalRate, setTotalRate] = useState("");
        const [grossWeight, setGrossWeight] = useState("");
        const [bumper, setBumper] = useState("");
        const [boxBag, setBoxBag] = useState("");
        const [ingredients, setIngredients] = useState("");
        const [manufacturingProcess, setManufacturingProcess] = useState("");
        const [dairyDeclaration, setDairyDeclaration] = useState(false);
        const [isProductForHumanConsumption, setIsProductForHumanConsumption] = useState(false);
        const [certification, setCertification] = useState("");
        const [sku, setSku] = useState("");
        const [price, setPrice] = useState("");

        const uuidAdmin = localStorage.getItem('AdminUUID');
        const uuidStore = localStorage.getItem('StoreUUID');  

        const productvariation = (userUUID) => 
        {
            const credentials = encode(`${username}:${password}`); // Replace 'username' and 'password' with actual credentials
            const endpoint = 'http://localhost/TechDrupalers/web/jsonapi/commerce_product_variation/default';

            const productVariationData = 
            {
                "data": 
                {
                    "type": "commerce_product_variation--default",
                    "attributes": 
                    {
                        "sku": sku,
                        "price": 
                        {
                            "number": price,
                            "currency_code": "INR",
                            "formatted": price
                        }
                    },

                    "relationships": 
                    {
                        "uid":
                        {
                            "data": 
                            {
                                "type": "user--user",
                                "id": userUUID
                            }
                        }
                    }
                }
            }
        
            
            fetch(endpoint, 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    Authorization: `Basic ${credentials}`,
                    'X-CSRF-Token': token
                },
                body: JSON.stringify(productVariationData),
            })
            .then(response => response.json())
            .then(data => 
            {
                console.log('Product Variation added:', data);
                fetchProductVariationUUID();
                //const productvariationuuid = data.id;
                //console.log(productvariationuuid);
                //localStorage.setItem("Product Variation",productvariationuuid);
            })
            .catch(error => 
            {
                console.error('Error adding product variation:', error);
            });
        };

        const addproduct = (storeUUID,userUUID,category_uuid,certificate_uuid,PVuuid) => 
        {
            const credentials = encode(`${username}:${password}`); // Replace 'username' and 'password' with actual credentials
            const endpoint = 'http://localhost/TechDrupalers/web/jsonapi/commerce_product/default';

            const productData = 
            {
                "data": 
                {
                    "type": "commerce_product--default",
                    "attributes": 
                    {
                        "title": productName,
                      
                        "field_product_id": productId,
                        "field_pro": productName,
                        "field_product_scientific_name": scientificName,
                        "field_hs": hsnCode,
                      
                        "field_t": toPuneFright,
                        "field_inner_package_material_amo": innerPackageMaterial, 
                        "field_ou": outerPackageMaterial, 
                        "field_m": manualPackage,
                        "field_mac": machinePackage, 
                        "field_local_transport": localTransport,
                        "field_fumigation": fumigation,
                        "field_to": totalRate,
                      
                        "field_gross_weight_per_pack_": grossWeight,
                        "field_1_bumper______pounches": bumper,
                        "field_1": boxBag,
                                          
                        "field_ingredients": ingredients,
                        "field_manufacturing_process": manufacturingProcess
                                          
                    },
                      
                    "relationships": 
                    {
                        "stores": 
                        {
                            "data":
                            {
                                "type": "commerce_store--online",
                                "id": storeUUID
                            }
                        },

                        "uid": 
                        {
                            "data": 
                            {
                                "type": "user--user",
                                "id": userUUID
                            }
                        },

                        "field_select_category": 
                        {
                            "data": 
                            {
                                "type": "node--category",
                                "id": category_uuid
                            }
                        },

                        "field_select_certification": 
                        {
                            "data": 
                            {
                                "type": "node--certificate",
                                "id": certificate_uuid
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
                      
                        "variations": 
                        {
                            "data": 
                            {
                                "type": "commerce_product_variation--default",
                                "id": PVuuid
                            }
                                  
                        }
                    }    
                }
            }
                

            fetch(endpoint, 
            {
                    method: 'POST',
                    headers: 
                    {
                        'Content-Type': 'application/vnd.api+json',
                        Authorization: `Basic ${credentials}`,
                        'X-CSRF-Token': token
                    },
                    body: JSON.stringify(productData),
            })
            .then(response => response.json())
            .then(data => 
            {
                //console.log('Product added:', data);
                clearFormData();
                navigate('/admindashboard/productCatelog');
                toast.success("Product added successfully!");
            })
            .catch(error => 
            {
                console.error('Error adding product:', error);
            });
        };
        
        const handleNext = () => 
        {
            setActiveTab(activeTab + 1);
            if(activeTab === 3)
            {
                productvariation(uuidAdmin);
            }
        };
    
        const handlePrevious = () => 
        {
            setActiveTab(activeTab - 1);
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

    
        const uuidPV = localStorage.getItem('ProductVariationUUID');

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
            console.log(regobj);
            addproduct(uuidStore,uuidAdmin,category,certification,uuidPV);
        };
      
        return (
                <>
                    <div className="add-product-pagetitle">
                        <h2>Add Product</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="add-product-form">
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
                                        value={selectedVendors.map((vendorId) => ({
                                            value: vendorId,
                                            label: vendors.find((vendor) => vendor.uuid === vendorId)?.name,
                                        }))}
                                        options={vendors.map((vendor) => ({
                                            value: vendor.uuid,
                                            label: vendor.name,
                                        }))}
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
                                            <input type="submit" value="Submit"/>
                                    </div>

                                </div>
                            )}
                        </div>

                    </form></>
        
    );
};

export default AddProducts;