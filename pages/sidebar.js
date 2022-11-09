import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { GoogleFonts } from "next-google-fonts";
import Image from "next/image";
import Link from "next/link";

export default function sideBar() {
  return (
    <div className="side-main">
      <div className="side-secondary">
        <nav className="mainsidenav">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/users">Users</Link>
            </li>
            <li>
              <a>Categories</a>
            </li>
            <li>Serivce Providers</li>
            <li>
              <Link href="./login">Login</Link>
            </li>
            <li>App's Storage</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
