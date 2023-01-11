import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup } from "react-bootstrap";
import { loginUser } from "../data/asyncThunks/loginUser";
import { selectCurrentUser } from "../data/selectors";
import LogoutButton from "../logout/LogoutButton";
import { useNavigate } from "react-router";
import { addAlert } from "../../../components/alerts/alertSlice";
import logoSmall from "../../../app/assets/logoSmall.png";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { utils, userArray } = useSelector(selectCurrentUser);

  const validate = (values) => {
    let errors = {};

    if (userArray.pid !== null) {
      errors.user = "Already signed in";
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

  const loginUserAndRedirect = (values) => {
    validate(values);
    const err = validate(values);
    if (Object.keys(err).length !== 0) {
      return;
    }
    dispatch(loginUser(values))
      .unwrap()
      .then((pid) => {
        navigate(`/home/${pid}`);
      })
      .catch((err) => {
        
      });
      setIsSubmitted(true);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      loginUserAndRedirect(values);
    },
  });

  return (
    <>
      {utils.authChange.isLoading ? (
        <div className="text-white mx-auto">
          <BiLoaderAlt
            className="mt-9 mx-auto animate-spin text-sky-500 opacity-75"
            size={52}
          />
        </div>
      ) : (
        <div className="bg-[color:var(--theme-bg-color)] max-w-screen-md m-auto py-5 my-4 rounded-xl flex flex-col justify-center">
          <div className="flex flex-col justify-center mb-2">
            <img
              src={logoSmall}
              className="object-scale-down h-14 mb-1  rounded-3xl"
            />
            <p>Sign in to Tshare</p>
          </div>

          <form
            className="flex flex-col w-96 justify-center mx-auto"
            onSubmit={formik.handleSubmit}
          >
            <div className="bg-[color:var(--hover-menu-bg)] p-4 m-2 rounded-lg border">
              <div className="flex flex-col text-start">
                <label className="mx-3 flex" htmlFor="email">
                  Email address
                  {errors.email && (
                    <p className="text-red-400 text-sm text-start ml-3 mt-1">
                      {errors.email}
                    </p>
                  )}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="  bg-[color:var(--hover-menu-bg)] border m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px]"
                  autoComplete="username"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex flex-col text-start">
                <label className="mx-3 flex" htmlFor="current-password">
                  Password
                  {errors.password && (
                    <p className="text-red-400 text-sm text-start ml-3 mt-1">
                      {errors.password}
                    </p>
                  )}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="  bg-[color:var(--hover-menu-bg)] border m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px]"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <button
              className="rounded-lg bg-green-600  transition m-2 border-black h-9 hover:bg-purple-600 border "
              type="submit"
            >
              Sign in
            </button>
            {errors.user && (
              <p className="text-red-400 text-sm text-start ml-3 mt-1">
                {errors.user}
              </p>
            )}
            {isSubmitted && userArray.pid == null && (
                <p className="rounded-lg text-red-400 text-center text-sm m-2 bg-[color:var(--hover-menu-bg)]">
                  There was a problem with your login. Use a different email
                  or password, check your internet connection, and keep trying. If
                  this does not work, tell the CEO. It is probably his fault.
                </p>
              )}
          </form>

          <p className="mt-4" onClick={() => navigate("/signup")}>
            New to Tshare? Create an account ->
          </p>
        </div>
      )}
    </>
  );
};

export default LoginForm;
