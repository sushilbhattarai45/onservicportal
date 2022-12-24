import React from "react";

function Bill({ name, contact, billId, image, date, address, paid }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "450px",
        margin: "2rem auto 1rem auto",
        backgroundColor: "#eee",
      }}
    >
      <img src={image} alt="Error loading image" width="150" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginLeft: "15px",
        }}
      >
        <p>
          ID: <strong>{billId}</strong>
        </p>
        <p>Name: {name}</p>
        <p>Contact: {contact}</p>
        <p>Address: {address}</p>
        <p>Registered on: {date}</p>
        {paid && <p>Paid: Rs. 1000</p>}
      </div>
    </div>
  );
}

export default Bill;
