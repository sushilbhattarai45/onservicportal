import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavComponent from "./nav";
import SideBar from "./sidebar";
import UserComponent from "./users";
import LoginComponent from "./login";
import UserProfile from "./userProfile";

export default function Home() {
  return (
    <div>
      <NavComponent />
      <SideBar />
    </div>
  );
}
