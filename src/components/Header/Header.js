import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router";
import ViewerHeader from "./ViewerHeader";
import UserHeader from "./UserHeader";
import { selectCurrentUser } from "../../features/authentification/data/selectors";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleClickLogin = () => navigate("/login");
  const handleClickSignup = () => navigate("/signup");
  const handleClickWelcome = () => navigate("/welcome");

  return (
    <>
      {user.userArray.pid === undefined || user.userArray.pid === null ? (
        <ViewerHeader />
      ) : (
        <UserHeader />
      )}
    </>
  );
};

export default Header;
