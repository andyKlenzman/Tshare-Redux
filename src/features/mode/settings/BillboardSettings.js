import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectBillboardModeSettings } from "./data/selectors";
import { updateBillboard } from "./data/asyncThunks";
import { selectCurrentUserPid } from "../../authentification/data/selectors";
import { selectUtilsSettingChange } from "./data/selectors";
import { BiLoaderAlt } from "react-icons/bi";
import { useState } from "react";
import ViewButton from "../../../components/Header/ViewButton";

/**
 * The purpose is to render the app's settings and allow user to change them.
 *
 * Reflections:
 *- should validate if value has changes to avoid unnecessary calls. 
 */

const BillboardSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectBillboardModeSettings);
  const currentUserPid = useSelector(selectCurrentUserPid);
  const loading = useSelector(selectUtilsSettingChange);
  const [errors, setErrors] = useState({});



  const validate = (values) => {
    let errors = {};
    if(!values.billboardText){
      errors.billboardText = "Required"
    }
    if(values.billboardText>200){
      errors.billboardText = "Too long"
    }

    setErrors(errors);
    return errors;
  };


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...settings, pid: currentUserPid },
    onSubmit: (values) => {
      const err = validate(values);
      if (Object.keys(err).length !== 0) {
        return;
      }
      dispatch(updateBillboard(values));
    },
  });

  return (
    <div className=" p-4 m-2 rounded-lg justify-center mx-auto ">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col text-start">
          <label className="flex ml-3" htmlFor="billboardText">
            What would do the people need to know?
            {errors.billboardText && (
            <p className="text-red-400 text-start text-sm ml-3 mt-1">
              {errors.billboardText}
            </p>
          )}
          </label>

          <input
            id="billboardText"
            name="billboardText"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.billboardText}
            className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white disabled:text-slate-600"
          />
        </div>

        <div className="flex">
          <button
            className="mt-3 flex-start rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 transition ml-3 border-black h-11 content-start w-28 hover:opacity-75 disabled:opacity-75"
            type="submit"
            disabled={loading.isLoading}
          >
            Save
          </button>
          <div className="ml-3 mt-3">
            {loading.isLoading && (
              <BiLoaderAlt
                className="animate-spin text-sky-500 opacity-75"
                size={40}
              />
            )}
            {loading.errMsg && <p>fds{loading.errMsg}</p>}
          </div>
          <div className="ml-auto mt-2 mr-2">
            <ViewButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BillboardSettings;
