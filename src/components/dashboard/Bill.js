import React from "react";

function Bill({ name, contact, billId, image, date, address }) {
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
        margin: "0 auto",
        marginBottom: "1rem",
        backgroundColor: "#eee",
      }}
    >
      <img src={image} />
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
      </div>
    </div>
  );
}

export default Bill;
