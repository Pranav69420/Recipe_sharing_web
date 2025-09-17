import React from "react";
import Modal from "./Modal";
import InputForm from "./inputForm";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Place the checkLogin function here, inside the component
  const checkLogin = () => {
    console.log("Login clicked, isOpen before:", isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header>
        <h2>Recipe Blog</h2>
        <ul>
          <li>Home</li>
          <li>My Recipe</li>
          <li>Favourites</li>
          <li onClick={checkLogin} style={{ cursor: "pointer" }}>Login</li>
        </ul>
      </header>
      {isOpen && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)} /></Modal>}
    </>
  );
}
