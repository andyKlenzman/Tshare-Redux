import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCurrentUserPid } from "../../features/authentification/data/selectors";
import logoFull from "../../app/assets/logoFull.png";
import logoSmall from "../../app/assets/logoSmall.png";
import { isFulfilled } from "@reduxjs/toolkit";
import {
  AiOutlineEye,
  AiOutlineShopping,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";

/* Purpose of the user header is for logged in users to navigate the website,
 * including their profile, other profiles, and the landing page.
 */

const UserHeader = () => {
  const pid = useSelector(selectCurrentUserPid);
  const navigate = useNavigate();

  const handleClickHome = () => navigate(`/home/${pid}`);
  const handleClickView = () => navigate(`/view/${pid}`);
  const handleClickShop = () => navigate(`/shop`);
  const handleClickQuestions = () => navigate(`/`);

  return (
    <Navbar className="sticky bg-[color:var(--theme-bg-color)]  border-white backdrop-blur">
      <Navbar.Brand onClick={handleClickHome} className="ml-3 ">
        <img src={logoFull} className="h-9 " />
      </Navbar.Brand>
      {/* <Navbar.Brand onClick={handleClickHome} className="ml-3 ">
        <img src={logoSmall} className="h-10 invisible md:visible " />
      </Navbar.Brand> */}

      <Nav className="mr-3 -mb-3 ms-auto">
        <div
          className=" mr-4 transition duration-150 border-b-8 border-transparent text-slate-300 hover:text-orange-500 flex flex-col "
          onClick={handleClickHome}
        >
          <BiHomeAlt size={32} className="mx-auto" />
          <p className="text-sm lowercase">Home</p>
        </div>
        <div
          className=" mr-4 transition duration-150 border-b-8 border-transparent text-slate-300 hover:text-red-500 flex flex-col "
          onClick={handleClickView}
        >
          <AiOutlineEye size={32} className="mx-auto" />
          <p className="text-sm lowercase">View</p>
        </div>

        
        <div
          className="  mr-4  transition duration-150 border-b-8  border-transparent  text-slate-300 hover:text-purple-500"
          onClick={handleClickQuestions}
        >
          <AiOutlineQuestionCircle size={32} className="mx-auto" />
          <p className="text-sm lowercase">About</p>
        </div>
        <div
          className=" mr-4  transition duration-150 border-b-8  border-transparent text-slate-300 hover:text-green-500"
          onClick={handleClickShop}
        >
          <AiOutlineShopping size={32} className="mx-auto" />
          <p className="text-sm lowercase">Shop</p>
        </div>
        {/* <Nav.Link
          className="transition duration-150 border-b-8  border-transparent  text-white hover:text-yellow-400 ml-auto"
          onClick={handleClickQuestions}
        >
          <CgProfile size={40} className="mx-auto" />
          
        </Nav.Link> */}
      </Nav>
    </Navbar>
  );
};

export default UserHeader;
