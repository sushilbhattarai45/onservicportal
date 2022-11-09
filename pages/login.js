import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { GoogleFonts } from "next-google-fonts";
import Image from "next/image";
import SideBar from "./sidebar";
import NavComponent from "./nav";
import Script from "next/script";

export default function LoginComponent() {
  const validateForm = async (event) => {
    event.preventDefault();
    const phone = event.target.phone.value;
    const pin = event.target.pin.value;
    if (pin.length != 6 || phone.length != 10) {
      alert("Invalid Phone Number or PIN");
    } else {
      if (isNaN(phone)) {
        alert("Phone Number must be numberic");
      } else {
        alert("You are done " + phone + pin);
      }
    }
  };
  return (
    <div className="loginmain">
      <div className="logins1">
        <div className="s1">
          {/* <p>Hello</p> */}
          <img src="/elon.jpg" width={100} height={150} />
        </div>
        <div className="s2">
          <form onSubmit={validateForm}>
            <center>
              <img
                className="loginimg"
                src="/elon.jpg"
                width={50}
                height={50}
              />

              <p className="loginmainheader">OnServic</p>
            </center>

            <p className="loginheader">Please Login to Proceed</p>

            <div>
              {/* <label>Phone Number</label><br /> */}
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                maxLength={10}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="PIN"
                name="pin"
                maxLength={6}
              />
            </div>

            <div className="remembersection">
              <div className="r1">
                {" "}
                <p></p>{" "}
              </div>{" "}
              <div className="r2">
                {" "}
                <p>Forgot PIN?</p>{" "}
              </div>{" "}
            </div>

            <div className="buttondiv">
              <button type="Submit">Login</button>
            </div>
          </form>{" "}
        </div>
      </div>
      {/* <div className="loginsecondary">

 
            </div> */}
    </div>
  );
}
