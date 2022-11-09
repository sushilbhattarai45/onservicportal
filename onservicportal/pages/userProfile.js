import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { GoogleFonts } from "next-google-fonts";
import Image from "next/image";
import SideBar from "./sidebar";
import NavComponent from "./nav";
import Script from "next/script";

export default function userProfile() {
  return (
    <div className="maindivup">
      <NavComponent />

      <div className="useru1">
        <div className="u1">
          <SideBar />
        </div>
        <div className="u2">
          <p className="header">User Profile- Sushil Bhattarai</p>

          <div className="up1">
            <div>
              <center>
                <img src="/elon.jpg" width={200} height={200} />
              </center>
              <button className="buttonedit">Edit this Profile </button>
            </div>
            <div className="up1-1">
              <div className="up1-11">
                <p>Personal Information</p>
                <br />
                <p> Name: Sushil Bhattarai</p>

                <p> Gender : Male</p>
                <p> Email : bhattarai@gmail.com</p>
                <p>Contact : 9742993345</p>
                <p> Address: Butwal, Rupandehi</p>
              </div>
              <div className="up1-12">
                <p>Account Information</p>
                <br />

                <p>Joined on : 9th Oct 22</p>

                <p> Status : Active</p>
              </div>
              <div className="up1-13">
                <p>Account Status</p>
                <br />

                <button className="buttonsuspend">Suspend</button>
                <br />
                <button className="buttondisable">Disable</button>
                <br />
                <button className="buttonreset">Reset PIN</button>
                <br />
                <button className="buttondelete">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
