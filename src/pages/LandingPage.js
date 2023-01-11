import React from "react";
import logoFull from "../app/assets/logoFull.png";
import { useNavigate } from "react-router";
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className=" mx-auto  md:rounded-xl bg-[color:var(--theme-bg-color)] mt-5 py-4 p-3">
      <img className="mx-auto  h-20 " src={logoFull}></img>
        
        <p className="text-2xl font-display font-bold">
        where fashion meets technology
        </p>

        <p className="max-w-screen-md text-2xl m-4 mx-auto align-text-center">
        Our t-shirts are more than just a fashion statement - they're a wearable, interactive experience. Each shirt features a QR code that connects to a unique, customizable webpage, allowing you to share your personal brand, promote a message, or just have some fun.
        </p>

        <div>
          <button
            className="text-xl m-2 h-14 rounded-lg px-5  rounded-lg h-14 bg-purple-500 transition-all"
            onClick={() => navigate("/signup")}
          >
            Join us
          </button>
        </div>

        {/* <p className="text-2xl font-display font-bold">
        Wear your brand or message on your chest
        </p>
        <p className="max-w-screen-md text-2xl m-4 mx-auto align-text-center">
        Wear your brand or message on your chest: With a tshare shirt, you can showcase your personal brand or promote a message you believe in, all while looking fashionable.
        </p>

        <p className="text-2xl font-display font-bold">
        Make a connection
        </p>
        <p className="max-w-screen-md text-2xl m-4 mx-auto align-text-center">
 Use the QR code on your t-shirt to connect with others and exchange information in a unique and memorable way.        </p>
        <p className="text-2xl font-display font-bold">
        Stand out in a crowd
        </p>
        <p className="max-w-screen-md text-2xl m-4 mx-auto align-text-center">
        A tshare shirt is guaranteed to make you stand out from the crowd, whether you're at a conference, a party, or just out and about.
        </p>
        <p className="text-2xl font-display font-bold">
        Stay ahead of the curve
        </p>
        <p className="max-w-screen-md text-2xl m-4 mx-auto align-text-center">
        As wearable technology becomes more popular, a tshare shirt puts you at the forefront of this exciting trend.

        </p>
        <p className="text-2xl font-display font-bold">
        Get creative
        </p>
        <p className="max-w-screen-md text-2xl m-4 mx-auto align-text-center">
        The customizable webpage associated with your t-shirt allows you to express your creativity and personality in a unique and dynamic way.
        </p> */}

        <div></div>
      </div>

      {/* <div className="container  mx-auto bg-[color:var(--theme-bg-color)] m-5 rounded-xl backdrop-blur-xl mt-5 py-4">
        
        <p className="text-5xl font-display font-bold">Here it is.</p>
        

        <p className="text-2xl m-4">It is just as comfy as it is useful.</p>

        <div>
          <button className="text-xl m-2 h-14 rounded-lg  border-black border-white px-5 rounded-lg h-14 hover:bg-[color:var(--hover-menu-bg)] transition-all">
            Shop
          </button>
          <button className="text-xl m-2 h-14 rounded-lg  bg-black px-5  rounded-lg h-14 hover:bg-[color:var(--hover-menu-bg)] transition-all">
            Sign Up Free
          </button>
        </div>
      </div>

      <div className="container  mx-auto bg-[color:var(--theme-bg-color)] m-5 rounded-xl backdrop-blur-xl mt-5 py-4">
        <img className="mx-auto  h-28" src={logoFull}></img>
        <p className="text-5xl">Here is what it can do</p>

        <p className="text-2xl m-4">
          They scan the QR code on your shirt. You blow their mind.
        </p>

        <div>
          <button className="text-xl m-2 h-14 rounded-lg  border-black border-white px-5 rounded-lg h-14 hover:bg-[color:var(--hover-menu-bg)] transition-all">
            Shop
          </button>
          <button className="text-xl m-2 h-14 rounded-lg  bg-black px-5  rounded-lg h-14 hover:bg-[color:var(--hover-menu-bg)] transition-all">
            Sign Up Free
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default LandingPage;
