import React from "react";
import "./Wishlist.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Wishlist = ({ user }) => {
  const [wishlist, setWishlist] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost/TechDrupalers/web/api/customer-own-wishlist/${
        user && user.uid
      }?_format=json`
    )
      .then((response) => response.json())
      .then((data) => setWishlist(data))
      .catch((error) => console.error(error));
  }, []);

  const remove_item = (wishlistItemUUID) => {
    fetch(
      `http://localhost/TechDrupalers/web/jsonapi/commerce_wishlist_item/commerce_product_variation/${wishlistItemUUID}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.success("Item removed successfully");
          // Filter out the removed item from the wishlist state
          const updatedWishlist = wishlist.filter(
            (item) => item.wishlist_item_uuid !== wishlistItemUUID
          );
          setWishlist(updatedWishlist);
        } else {
          toast.error("Failed to remove item");
        }
      })
      .catch((error) => {
        console.log("Error while removing item:", error);
        toast.error("Error while removing item");
      });
  };


  const update_item = (Qnt, Wishlist_item_UUID) => {
    const url = `http://localhost/TechDrupalers/web/jsonapi/commerce_wishlist_item/commerce_product_variation/${Wishlist_item_UUID}`;
    const data = {
      "data": {
        "type": "commerce_wishlist_item--commerce_product_variation",
        "id": Wishlist_item_UUID,
        "attributes": {
          "quantity": Qnt
        }
      }
    };

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update item');
        }
        toast.success('Item updated successfully');
      })
      .catch(error => {
        console.log('Error:', error.message);
        toast.error('Failed to update item');
      });
  };

  const handleQuantityChange = (e, item) => {
    const newQuantity = e.target.value !== null ? e.target.value : '';
    const updatedItem = { ...item, quantity: newQuantity };
    const updatedWishlist = wishlist.map(wlItem => (wlItem.wishlist_item_uuid === item.wishlist_item_uuid ? updatedItem : wlItem));
    setWishlist(updatedWishlist);
  };

  const handleUpdateQuantity = (item) => {
    update_item(item.quantity, item.wishlist_item_uuid);
  };

  const share_wishlist = (wishlistUUID) => {
    console.log(wishlistUUID);
    const requestBody = {
      "data": {
        "type": "commerce_wishlist--default",
        "id": wishlistUUID,
        "attributes": {
          "field_wishlist_share_status": "share"
        }
      }
    };

    // Convert the request body to a JSON string
    const requestBodyString = JSON.stringify(requestBody);

    // Define the API URL
    const apiUrl = `http://localhost/TechDrupalers/web/jsonapi/commerce_wishlist/default/${wishlistUUID}`;

    // Define the headers for the request
    const headers = {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    };

    // Send the POST request
    fetch(apiUrl, {
      method: "PATCH",
      headers: headers,
      body: requestBodyString,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Wishlist Shared Successfully " + data); // Log the response data
        toast.success("Wishlist Shared Successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to share wishlist!");
      });
  }

  return (
    <>
      <ToastContainer />
      <div className="wishlist-pagetitle">
        <h2>Wishlist</h2>
      </div>
      <input
        type="text"
        placeholder="Search here..."
        className="wishlist-search"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <table id="wishlist-table">
        <thead>
          <tr>
            <td>Product ID</td>
            <td>Product Name</td>
            <td>Quantity</td>
            <td>Edit Quantity</td>
            <td colSpan={2}>Options</td>
          </tr>
        </thead>
        <tbody>
          {wishlist
            .filter((wishlistItem) =>
              wishlistItem.uid_1.toLowerCase().includes(query)
            )
            .map((item) => (
              <tr key={item.field_product_id}>
                <td>{item.field_product_id}</td>
                <td>{item.field_pro}</td>
                <td>{item.quantity}</td>
                <td>
                  <input
                    type="text"
                    value={item.quantity || ""}
                    onChange={(e) => handleQuantityChange(e, item)}
                  />
                </td>
                <td>
                  <input
                    type="submit"
                    value="Update"
                    onClick={() => handleUpdateQuantity(item)}
                  />
                </td>
                <td>
                  <input
                    type="submit"
                    value="Remove"
                    onClick={() => remove_item(item.wishlist_item_uuid)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="share-button">
        <input
          type="submit"
          value="Share Wishlist"
          onClick={() => share_wishlist(wishlist[0].wishlist_uuid)}
        ></input>
      </div>
    </>
  );
};

export default Wishlist;
