import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup } from "react-bootstrap";
import { createUser } from "../data/asyncThunks/createUser";
import { selectCurrentUrlPid, selectCurrentUser } from "../data/selectors";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import logoSmall from "../../../app/assets/logoSmall.png";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

/*
Purpose is to create a new user, including dispatching the action for firebase auth and creation of 
default documents, and to redirect them to their homepage. 


Notes 
- onSubmit creates the documents, then waits for the pid to change from null to a value before redirecting.


- I could redirect to a welcome page that gives them instuctions on how to use Tshare, then give them the deets....

*/

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { utils, userArray } = useSelector(selectCurrentUser);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createUserAndRedirect = (values) => {
    dispatch(createUser(values)).then(() => {
      setIsSubmitted(true);
    });
  };

  const validate = (values) => {
    let errors = {};
    if (userArray.pid !== null) {
      errors.user = "Already signed in";
    }
    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (values.password.length < 6) {
      errors.password = "Too short";
    }
    if (values.password.length > 30) {
      errors.password = "Too long";
    }

    setErrors(errors);
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const err = validate(values);
      if (Object.keys(err).length !== 0) {
        return;
      }

      createUserAndRedirect(values);
    },
  });

  if (isSubmitted && userArray.pid != null) {
    return (
      <div className="bg-[color:var(--theme-bg-color)] max-w-screen-md m-auto py-5 my-4 rounded-xl flex flex-col justify-center">
        <p className="font-display text-5xl text-green-500 font-bold">
          You're in!
        </p>
        <p className="font-display text-2xl border-b mb-2 mx-3 border-slate-400 pb-2">
          Explore the icons in the banner  ^^
        </p>
        <ol className="font-display text-xl text-slate-300">
          <li className="text-start ml-5 my-1">
            - "Home" is where you customize your QR code and see your viewer responses
          </li>
          <li className="text-start ml-5 my-1">
            - "View" is where you see what your QR code is currently displaying
          </li>
          
          <li className="text-start ml-5 my-1">
            - "About" is where you direct confused people 
          </li>
          <li className="text-start ml-5 my-1">
            - "Shop" is under construction. Talk to the CEO if you want a shirt
          </li>
        </ol>
      </div>
    );
  } else {
    return (
      <div>
        {utils.authChange.isLoading ? (
          <div className="text-white mx-auto">
            <BiLoaderAlt
              className="mt-9 mx-auto animate-spin text-sky-500 opacity-75"
              size={52}
            />
          </div>
        ) : (
          <div className="bg-[color:var(--theme-bg-color)] max-w-screen-md m-auto py-5 my-4 rounded-xl flex flex-col justify-center">
            <div className="flex flex-col mb-2 ">
              <img
                src={logoSmall}
                alt="logo"
                className="object-scale-down h-14 mb-1  rounded-3xl "
              />
              <p>Welcome to Tshare!</p>
              <p>Let's begin the adventure</p>
            </div>
            <form
              className="flex flex-col w-96 justify-center mx-auto"
              onSubmit={formik.handleSubmit}
            >
              <div className="bg-[color:var(--hover-menu-bg)] p-4 m-2 rounded-lg border">
                <div className="flex flex-col text-start">
                  <label className="mx-3 flex" htmlFor="name">
                    Name{" "}
                    {errors.name && (
                      <p className="text-red-400 text-sm text-start ml-3 mt-1">
                        {errors.name}
                      </p>
                    )}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    onChange={formik.handleChange}
                    className=" bg-[color:var(--hover-menu-bg)] border m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px]"
                  />
                </div>
                <div className="flex flex-col text-start">
                  <label className="mx-3 flex" htmlFor="email">
                    Email Address
                    {errors.email && (
                      <p className="text-red-400 text-start text-sm ml-3 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    className=" bg-[color:var(--hover-menu-bg)] border m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px]"
                  />
                </div>
                <div className="flex flex-col text-start">
                  <label className="mx-3 flex" htmlFor="password">
                    Password
                    {errors.password && (
                      <p
                        className="text-red-400 text-sm text-start ml-3 mt-1"
                        mt-1
                      >
                        {errors.password}
                      </p>
                    )}
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    className=" bg-[color:var(--hover-menu-bg)] border m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px]"
                  />
                </div>
              </div>

              <button
                className="rounded-lg bg-green-600  transition m-2 border-black h-9 hover:bg-purple-600 border  "
                disabled={utils.authChange.isLoading}
                type="submit"
              >
                Create Account
              </button>
              {errors.user && (
                <p className="text-red-400 text-start text-sm ml-3 mt-1">
                  {errors.user}
                </p>
              )}
              {isSubmitted && userArray.pid == null && (
                <p className="rounded-lg text-red-400 text-center text-sm m-2 bg-[color:var(--hover-menu-bg)]">
                  There was a problem with your sign up. Try a different email
                  address, check your internet connection, and try again. If
                  this does not work, tell the CEO. It is probably his fault.
                </p>
              )}
            </form>
            <p className="mt-4" onClick={() => navigate("/login")}>
              Already have an account? Sign in
            </p>
          </div>
        )}
      </div>
    );
  }
};

export default SignupForm;
