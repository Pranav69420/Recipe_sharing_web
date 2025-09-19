import React from "react";
import Modal from "./Modal";
import InputForm from "./inputForm";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  let token = localStorage.getItem("token");
  const [islogin, setIslogin] = React.useState(token ? false: true);

  useEffect(() => {
    setIslogin(token ? true : false);
  }, [token]);

  // Place the checkLogin function here, inside the component
  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIslogin(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <header>
        <h2>Recipe Blog</h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li onClick={() => islogin && setIsOpen(false)}>
           <NavLink to={ !islogin ? "/" : "/myRecipe"}>My Recipe</NavLink>
          </li>
          <li onClick={() => islogin && setIsOpen(false)}>
            <NavLink to={ !islogin ? "/" : "/favRecipe"}>Favorites</NavLink>
          </li>
          <li onClick={checkLogin}>
            <p className="login">{islogin ? "Logout" : "Login"}</p>
          </li>
        </ul>
      </header>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
