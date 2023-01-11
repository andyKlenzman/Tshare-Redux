import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router";
import logoFull from "../../app/assets/logoFull.png";

const ViewerHeader = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => navigate("/login");
  const handleClickSignup = () => navigate("/signup");
  const handleClickWelcome = () => navigate("/");
  const handleClickShop = () => navigate("/shop");

  return (
    <Navbar className=" sticky bg-[color:var(--theme-bg-color)]  border-white backdrop-blur" >

        <Navbar.Brand onClick={handleClickWelcome}>
          <img src={logoFull} className="h-10 ml-3" />
        </Navbar.Brand>
          <Nav className="ml-auto mr-3">
          {/* <Nav.Link
                className="transition duration-150 border-b-8 text-white border-transparent hover:border-green-500 "
                onClick={handleClickShop}
              >
                Shop
              </Nav.Link> */}
              <Nav.Link
              className="transition duration-150 border-b-8 text-white border-transparent hover:border-orange-500 "
              onClick={handleClickSignup}
            >
              Sign Up
            </Nav.Link>
            <Nav.Link
              className="transition duration-150 border-b-8 text-white border-transparent hover:border-purple-500 "
              href=""
              onClick={handleClickLogin}
            >
              Login
            </Nav.Link>
            
          </Nav>
      
    </Navbar>
  );
};

export default ViewerHeader;
