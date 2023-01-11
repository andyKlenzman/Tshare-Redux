import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFeedbackModeSettings,
  selectUtilsSettingChange,
} from "./data/selectors";
import { selectCurrentUserPid } from "../../authentification/data/selectors";
import { updateFeedback } from "./data/asyncThunks";
import { BiLoaderAlt } from "react-icons/bi";
import ViewButton from "../../../components/Header/ViewButton";
import { useState } from "react";



const FeedbackSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectFeedbackModeSettings);
  const currentUserPid = useSelector(selectCurrentUserPid);
  const loading = useSelector(selectUtilsSettingChange);
  const [errors, setErrors] = useState({});





  const validate = (values) => {
    let errors = {};
    if(values.promptQuestion.length > 200){
      errors.promptQuestion = "Too long"
    }
    if(!values.promptQuestion){
      errors.promptQuestion = "Required"
    }
    if(values.promptQuestion.length < 3){
      errors.promptQuestion = "Too Short"
    }
    if(values.ratingQuestion.length > 200){
      errors.ratingQuestion = "Too long"
    }
    if(!values.ratingQuestion){
      errors.ratingQuestion = "Required"
    }
    if(values.ratingQuestion.length < 3){
      errors.ratingQuestion = "Too short"
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
      dispatch(updateFeedback(values));
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className=" p-4 m-2 rounded-lg justify-center mx-auto "
      >
        <div className="flex flex-col text-start">
          <label htmlFor="ratingQuestion " className="flex ml-3">
            Linear Scale Question
            {errors.ratingQuestion && (
            <p className="text-red-400 text-start text-sm ml-3 mt-1">
              {errors.ratingQuestion}
            </p>
          )}
          </label>

          <input
            id="ratingQuestion"
            name="ratingQuestion"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.ratingQuestion}
            className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white"
          />
        </div>
        <div className="flex flex-col text-start">
          <label htmlFor="promptQuestion " className="ml-3 flex">
            Short answer question
            {errors.ratingQuestion && (
            <p className="text-red-400 text-start text-sm ml-3 mt-1">
              {errors.ratingQuestion}
            </p>
          )}
          </label>

          <input
            id="promptQuestion"
            name="promptQuestion"
            type="text"
            className=" bg-[color:var(--hover-menu-bg)]  m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] text-slate-300 focus:text-white"
            onChange={formik.handleChange}
            value={formik.values.promptQuestion}
          />
        </div>

        <div className="flex mt-2 ml-3">
          <label htmlFor="askForContactInfo">Ask for Contact Info</label>
          <input
            id="askForContactInfo"
            name="askForContactInfo"
            type="checkbox"
            checked={formik.values.askForContactInfo}
            onChange={formik.handleChange}
            className="w-24 -ml-6 "
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

export default FeedbackSettings;
