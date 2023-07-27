import React, { useState, useEffect } from "react";
import "./MyCart.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const MyCart = ({ user }) => {
  const [mycart, setMycart] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost/TechDrupalers/web/api/mycart/${user && user.uid}?_format=json`)
      .then((response) => response.json())
      .then((data) => setMycart(data))
      .catch((error) => console.error(error));
  }, []);

  const removeItem = (orderID, order_item_UUID) => {
    fetch(`http://localhost/TechDrupalers/web/jsonapi/carts/${orderID}/items`, {
      method: "DELETE",
      headers: {
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          relationship: {
            type: "commerce_order_item--default",
            id: order_item_UUID,
          },
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Item removed successfully");
        } else {
          toast.error("Failed to remove item");
        }
      })
      .catch((error) => {
        console.log("Error while removing item:", error);
        toast.error("Error while removing item");
      });
  };

  const updateItem = (qnt, orderID, orderItemID, order_item_UUID) => {
    const url = `http://localhost/TechDrupalers/web/jsonapi/carts/${orderID}/items/${orderItemID}`;
    const data = {
      data: {
        type: "commerce_order_item--default",
        id: order_item_UUID,
        attributes: {
          quantity: qnt,
        },
      },
    };

    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update item");
        }
        toast.success("Item updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error:", error.message);
        toast.error("Failed to update item");
      });
  };

  const handleQuantityChange = (itemIndex, event) => {
    const updatedMycart = [...mycart];
    updatedMycart[itemIndex].updatedQnt = event.target.value;
    setMycart(updatedMycart);
  };

  const redirect_to_order_info = (OrderID, orderUUID) =>
  {
    localStorage.setItem('Order ID',OrderID);
    localStorage.setItem('Order UUID',orderUUID);
    navigate('/buyersdashboard/orderinfo');
  }

  return (
    <>
      <ToastContainer />
      <div className="mycarts-pagetitle">
        <h2>My Cart</h2>
      </div>
      <input
        type="text"
        placeholder="Search here..."
        className="mycart-search"
        onChange={(e) => setQuery(e.target.value)}
      />
      <table id="mycart-table">
        <thead>
          <tr>
            <td>ID</td>
            <td>Purchased Entity</td>
            <td>Unit Price</td>
            <td>Total Price</td>
            <td>Quantity</td>
            <td>Quantity Text Field</td>
            <td colSpan={2}>Options</td>
          </tr>
        </thead>
        <tbody>
          {mycart
            .filter((mycarts) =>
              mycarts.purchased_entity_1.toLowerCase().includes(query)
            )
            .map((mycarts, index) => (
              <tr key={mycarts.order_item_id}>
                <td>{mycarts.order_item_id}</td>
                <td>{mycarts.purchased_entity_1}</td>
                <td>{mycarts.unit_price__number_1}</td>
                <td>{mycarts.total_price__number_1}</td>
                <td>{mycarts.quantity}</td>
                <td>
                  <input
                    type="text"
                    value={mycarts.updatedQnt || mycarts.quantity}
                    onChange={(e) => handleQuantityChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="submit"
                    value="Update"
                    onClick={() =>
                      updateItem(
                        mycarts.updatedQnt,
                        mycarts.order_id,
                        mycarts.order_item_id,
                        mycarts.uuid
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="submit"
                    value="Remove"
                    onClick={() =>
                      removeItem(mycarts.order_id, mycarts.uuid)
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="update-checkout-buttons">
        <input type="submit" value="Checkout" onClick={() => redirect_to_order_info(mycart[0].order_id, mycart[0].uuid_1)}/>
      </div>
    </>
  );
};

export default MyCart;
