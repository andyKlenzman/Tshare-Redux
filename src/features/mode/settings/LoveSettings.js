import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup } from "react-bootstrap";
import { selectLoveModeSettings } from "./data/selectors";
import { updateLove } from "./data/asyncThunks";
import { selectCurrentUserPid } from "../../authentification/data/selectors";
import { BiLoaderAlt } from "react-icons/bi";
import { selectUtilsSettingChange } from "./data/selectors";
import ViewButton from "../../../components/Header/ViewButton";
import { useState } from "react";
/**
 * The purpose is to render the app's settings and allow user to change them.
 *
 * Reflections:
 * i feel like a lot of this is repetitive and could be abstracted. Maybe
 * a component for all settings and input values to customize.
 *
 * Choosing to use pid from user state as another layer of security if someone breaks through the conditional render in settingsPage (if they can do that they can probably change their pid....lol. Can use security rules in firebase)
 *
 */

const LoveSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectLoveModeSettings);
  const currentUserPid = useSelector(selectCurrentUserPid);
  const loading = useSelector(selectUtilsSettingChange);



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...settings, pid: currentUserPid },
    onSubmit: (values) => {
      dispatch(updateLove(values));
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className=" p-4 m-2 rounded-lg justify-center mx-auto "
      >
        <div className="flex flex-col text-start">
          <div className="flex mt-2">
            <label className=" ml-3" htmlFor="includeYourName">
              Your Name
            </label>
            <input
              id="includeYourName"
              name="includeYourName"
              type="checkbox"
              checked={formik.values.includeYourName}
              onChange={formik.handleChange}
              className="w-20 -ml-4 "
            />
          </div>
          <input
            id="yourName"
            name="yourName"
            type="text"
            disabled={!formik.values.includeYourName}
            onChange={formik.handleChange}
            value={formik.values.yourName}
            className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white disabled:text-slate-600"
          />
        </div>
        <div className="flex flex-col text-start">
          <div className="flex mt-2">
            <label className="ml-3" htmlFor="includeTargetName">
              Target Name
            </label>
            <input
              id="includeTargetName"
              name="includeTargetName"
              type="checkbox"
              checked={formik.values.includeTargetName}
              onChange={formik.handleChange}
              className="w-20 -ml-4 "
            />
          </div>
          <input
            id="targetName"
            name="targetName"
            type="text"
            disabled={!formik.values.includeTargetName}
            onChange={formik.handleChange}
            value={formik.values.targetName}
            className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white disabled:text-slate-600"
          />
        </div>

        <div className="flex flex-col text-start">
          <label className=" ml-3" htmlFor="goal">
            Goal
          </label>
          <select
            id="goal"
            name="goal"
            type="select"
            checked={formik.values.goal}
            onChange={formik.handleChange}
            value={formik.values.goal}
            className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white"
          >
            <option value="phone">Get Phone Number</option>
            <option value="date">Ask on Date</option>
          </select>
        </div>

        <div
          hidden={formik.values.goal === "phone"}
          className="flex flex-col text-start"
        >
          <label className=" ml-3" htmlFor="dateDetails">
            Date details
          </label>
          <input
            id="dateDetails"
            name="dateDetails"
            type="text"
            checked={formik.values.dateDetails}
            onChange={formik.handleChange}
            value={formik.values.dateDetails}
            className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white"
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

export default LoveSettings;
