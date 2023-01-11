import React from "react";
import logoSmall from '../app/assets/logoSmall.png'
import { useNavigate } from "react-router";
const ShopPage = () => {
  const navigate= useNavigate()
  return (
    <div>
      <div className="  bg-[color:var(--theme-bg-color)] m-5 rounded-xl backdrop-blur-xl mt-5 py-4">
        <div className="flex justify-center">
          
          <img className="h-20" src={logoSmall}></img>
          <p className="text-7xl mt-2 font-display font-extrabold">store</p>
        </div>

        <p className="text-2xl m-4 max-w-screen-md mx-auto text-slate-300">
          Our store is currently under construction. In the meantime, speak to our CEO if you would like a shirt. You can also make an account now and link your Tshare later.
        </p>

        <div>
          
        {/* <button
            className="text-xl m-2 h-14 rounded-lg   px-5 rounded-lg h-14 hover:bg-[color:var(--hover-menu-bg)] transition-all bg-purple-600  hover:border"
            onClick={() => navigate("/signup")}
          >
            Sign Up Free
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
