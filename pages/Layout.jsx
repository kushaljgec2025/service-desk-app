import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function Layout({ children: content }) {
  return (
    <div className="Layout flex flex-col justify-center items-center text-center min-h-screen">
      <Navbar />
      <div className="">{content}</div>
      <Footer />
    </div>
  );
}
export default Layout;
