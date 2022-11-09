import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { GoogleFonts } from "next-google-fonts";
import Image from "next/image";

export default function NavComponent() {
  return (
    <div>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,500;0,600;1,100;1,200;1,300;1,600&display=swap" />

      <nav className="navbar">
        <div className="logo">
          <span>OnServic</span>{" "}
        </div>
        {/* <div className="logo">
          <img className="profimg" src="/elon.jpg" width={50} height={50} />
        </div> */}

        <ul className="nav-links">
          <input type="checkbox" id="checkbox_toggle" />
          <label for="checkbox_toggle" className="hamburger">
            &#9776;
          </label>
          <div className="menu">
            <li>
              <a href="/">Logout</a>
            </li>
            {/* <li>
              <a href="/">About</a>
            </li> */}
            {/* <li className="services">
              <a href="/">Services</a>
              <ul className="dropdown">
                <li>
                  <a href="/">Dropdown 1 </a>
                </li>
                <li>
                  <a href="/">Dropdown 2</a>
                </li>
                <li>
                  <a href="/">Dropdown 2</a>
                </li>
                <li>
                  <a href="/">Dropdown 3</a>
                </li>
                <li>
                  <a href="/">Dropdown 4</a>
                </li> */}
            {/* </ul>
            </li> */}
            {/* <li>
              <a href="/">Pricing</a>
            </li> */}
            {/* <li className="cv">
              <a className="cvtxt" href="/">
                Download CV
              </a>
            </li> */}
          </div>
        </ul>
      </nav>
    </div>
  );
}
