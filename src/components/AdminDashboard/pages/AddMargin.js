import React, { useState } from "react";
import "./AddMargin.css";

const AddMargin = () => 
{
  const [actual_rate, actual_rate_change] = useState("");
  const [quoted_rate,quoted_rate_change] = useState("")
  const [to_pune_freight, to_pune_freight_change] = useState("");
  const [inner_package_material, inner_package_material_change] = useState("");
  const [outer_package_material, outer_package_material_change] = useState("");
  const [manual_package, manual_package_change] = useState("");
  const [machine_package, machine_package_change] = useState("");
  const [local_transport, local_transport_change] = useState("");
  const [fumigation, fumigation_change] = useState("");
  const [total_rate, total_rate_change] = useState("");

  const calculateTotalRate = () => 
  {
    // Perform the calculation using the input field values
    const calculatedTotalRate =
      parseFloat(actual_rate) +
      parseFloat(quoted_rate) +
      parseFloat(to_pune_freight) +
      parseFloat(inner_package_material) +
      parseFloat(outer_package_material) +
      parseFloat(manual_package) +
      parseFloat(machine_package) +
      parseFloat(local_transport) +
      parseFloat(fumigation);

    // Set the calculated total rate
    total_rate_change(calculatedTotalRate.toFixed(2));
  };

  const handlesubmit = (e) => 
  {
    e.preventDefault();
    let regobj = {
      actual_rate,
      quoted_rate,
      to_pune_freight,
      inner_package_material,
      outer_package_material,
      manual_package,
      machine_package,
      local_transport,
      fumigation,
      total_rate,
    };
    console.log(regobj);
    clearForm();
  };

  const clearForm = () => 
  {
    actual_rate_change("");
    quoted_rate_change("");
    to_pune_freight_change("");
    inner_package_material_change("");
    outer_package_material_change("");
    manual_package_change("");
    machine_package_change("");
    local_transport_change("");
    fumigation_change("");
    total_rate_change("");
  };

  // Calculate the total rate whenever any of the input fields change
  React.useEffect(() => 
  {
    calculateTotalRate();
  }, [
    actual_rate,
    quoted_rate,
    to_pune_freight,
    inner_package_material,
    outer_package_material,
    manual_package,
    machine_package,
    local_transport,
    fumigation,
  ]);

  return (
    <>
      <div className="add-margin-pagetitle">
        <h2>Add Margin</h2>
      </div>

      <form className="add-margin-form" onSubmit={handlesubmit}>
        <label>Actual Rate</label>
        <input
          type="text"
          value={actual_rate}
          onChange={(e) => actual_rate_change(e.target.value)}
        />

        <label>Quoted Rate</label>
        <input
          type="text"
          value={quoted_rate}
          onChange={(e) => quoted_rate_change(e.target.value)}
        />

        <label>To Pune Freight</label>
        <input
          type="text"
          value={to_pune_freight}
          onChange={(e) => to_pune_freight_change(e.target.value)}
        />

        <label>Inner Package Material</label>
        <input
          type="text"
          value={inner_package_material}
          onChange={(e) => inner_package_material_change(e.target.value)}
        />

        <label>Outer Package Material</label>
        <input
          type="text"
          value={outer_package_material}
          onChange={(e) => outer_package_material_change(e.target.value)}
        />

        <label>Manual Package</label>
        <input
          type="text"
          value={manual_package}
          onChange={(e) => manual_package_change(e.target.value)}
        />

        <label>Machine Package</label>
        <input
          type="text"
          value={machine_package}
          onChange={(e) => machine_package_change(e.target.value)}
        />

        <label>Local Transport</label>
        <input
          type="text"
          value={local_transport}
          onChange={(e) => local_transport_change(e.target.value)}
        />

        <label>Fumigation</label>
        <input
          type="text"
          value={fumigation}
          onChange={(e) => fumigation_change(e.target.value)}
        />

        <label>Total Rate</label>
        <input
          type="text"
          value={total_rate}
          onChange={(e) => total_rate_change(e.target.value)}
        />

        <input type="submit" value="Save Margins" />
      </form>
    </>
  );
};

export default AddMargin;
