import React, { useState, useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    // console.log(orderItems);

    let orderData = {
      address: data.street,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={data.email}
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={data.street}
          type="text"
          placeholder="Street Address"
          required
        />
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            name="city"
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            name="zipCode"
            value={data.zipCode}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="phone"
          value={data.phone}
          type="text"
          placeholder="Phone No"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
