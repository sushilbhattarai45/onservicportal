import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { GoogleFonts } from "next-google-fonts";
import Image from "next/image";
import SideBar from "./sidebar";
import NavComponent from "./nav";
import Link from "next/link";
export default function userComponent() {
  return (
    <div className="usercomponentmain">
      <NavComponent />

      <div className="useru1">
        <div className="u1">
          {" "}
          <SideBar />
        </div>
        <div className="u2">
          <div className="u2-1">
            <p className="tablehead">Users</p>{" "}
            <input type="search" placeholder="Enter Mobile Number" />
            <button type="Submit">Search</button>
          </div>
          <table border={1} color="black">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Contact</th>

                <th>City</th>

                <th>Gender</th>

                <th>Joined On</th>

                <th>Verified</th>
                <th>Detailed Profile</th>
              </tr>
              <tr>
                <td>Sushil Bhattarai</td>
                <td>9742993345</td>
                <td>Sydney</td>
                <td>Male</td>
                <td>9th ,Oct 22</td>
                <td>False</td>
                <td>
                  <Link href="/userProfile">
                    <a>
                      {" "}
                      <button> See More </button>
                    </a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Sushil Bhattarai</td>
                <td>9742993345</td>
                <td>Sydney</td>
                <td>Male</td>
                <td>9th ,Oct 22</td>
                <td>False</td>
                <td>
                  <Link href="/userProfile">
                    <a>
                      {" "}
                      <button> See More </button>
                    </a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Sushil Bhattarai</td>
                <td>9742993345</td>
                <td>Sydney</td>
                <td>Male</td>
                <td>9th ,Oct 22</td>
                <td>False</td>
                <td>
                  <Link href="/userProfile">
                    <a>
                      {" "}
                      <button> See More </button>
                    </a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Sushil Bhattarai</td>
                <td>9742993345</td>
                <td>Sydney</td>
                <td>Male</td>
                <td>9th ,Oct 22</td>
                <td>False</td>
                <td>
                  <Link href="/userProfile">
                    <a>
                      {" "}
                      <button> See More </button>
                    </a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Sushil Bhattarai</td>
                <td>9742993345</td>
                <td>Sydney</td>
                <td>Male</td>
                <td>9th ,Oct 22</td>
                <td>False</td>
                <td>
                  <Link href="/userProfile">
                    <a>
                      {" "}
                      <button> See More </button>
                    </a>
                  </Link>
                </td>
              </tr>

              <tr>
                <td>Sushil Bhattarai</td>
                <td>9742993345</td>
                <td>Sydney</td>
                <td>Male</td>
                <td>9th ,Oct 22</td>
                <td>False</td>
                <td>
                  <Link href="/userProfile">
                    <a>
                      {" "}
                      <button> See More </button>
                    </a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Sushil Bhattarai</td>
                <td>9742993345</td>
                <td>Sydney</td>
                <td>Male</td>
                <td>9th ,Oct 22</td>
                <td>False</td>
                <td>
                  <Link href="/userProfile">
                    <a>
                      {" "}
                      <button> See More </button>
                    </a>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
