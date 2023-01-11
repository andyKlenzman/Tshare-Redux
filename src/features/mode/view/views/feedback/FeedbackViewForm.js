import { useFormik } from "formik";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addFeedbackInput } from "../../../settings/data/asyncThunks";
import {
  selectAllSettings,
  selectFeedbackModeSettings,
} from "../../../settings/data/selectors";
import { useSelector } from "react-redux";
import { Slider } from "@mui/material";
import { BiLoaderAlt } from "react-icons/bi";
import { selectUtilsSettingChange } from "../../../settings/data/selectors";
import { useState } from "react";

import { selectViewerSettings } from "../../../settings/data/selectors";

/*
Purpose: Collect viewer feedback mode information

Notes:
- Form conditional rendering is not working, will touch that up later
- Focus on the submission

*/

const FeedbackViewForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectViewerSettings);
  const { pid } = useParams();
  const { promptQuestion, ratingQuestion, askForContactInfo } = useSelector(
    selectFeedbackModeSettings
  );

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (values) => {
    let errors = {};

    if (!values.promptResponse) {
      errors.promptResponse = "Required";
    }
    if (values.promptResponse.length > 400) {
      errors.promptResponse = "Too long";
    }

    setErrors(errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      ratingResponse: "50",
      contactInfo: "",
      name: "",
      pid,
      promptResponse: "",
      provideContactInfo: false,
      promptQuestion,
      ratingQuestion,
    },
    onSubmit: (values, { resetForm }) => {
      const err = validate(values);
      if (Object.keys(err).length !== 0) {
        return;
      }

      dispatch(addFeedbackInput(values));

      setIsSubmitted(true);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-screen-sm flex flex-col px-4 text-start mx-auto pt-4"
    >
      <p className="ml-3 text-4xl font-bold font-display my-3 pb-1 border-b">
        Send Feedback
      </p>
      <label htmlFor="ratingResponse" className="ml-3 ">
        {ratingQuestion}
      </label>
      <Slider
        size="large"
        defaultValue={50}
        valueLabelDisplay="auto"
        type="text"
        onChange={formik.handleChange}
        id="ratingResponse"
        name="ratingResponse"
        className="text-white m-2 "
      />

      <label
        htmlFor="promptResponse"
        className="ml-3 mt-4 pt-4 border-t border-slate-500"
      >
        {promptQuestion}
        {errors.promptResponse && (
          <p className="text-red-400 text-start">{errors.promptResponse}</p>
        )}
      </label>
      <input
        name="promptResponse"
        type="text"
        onChange={formik.handleChange}
        className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white"
        value={formik.values.promptResponse}
      />
      {askForContactInfo && (
        <div>
          <div className="flex mt-2 border-t mt-4 pt-4 border-slate-500">
            <label htmlFor="provideContactInfo" className="ml-3 ">
              Would you speak to me again?
            </label>
            <input
              id="provideContactInfo"
              name="provideContactInfo"
              type="checkbox"
              checked={formik.values.provideContactInfo}
              onChange={formik.handleChange}
              className="w-20 -ml-4 "
            />
          </div>
          <label
            htmlFor="contactInfo"
            className="ml-3 mt-4"
            hidden={!formik.values.provideContactInfo}
          >
            Then put your money where your mouth is and give me your number{" "}
          </label>
          <input
            id="contactInfo"
            name="contactInfo"
            type="phone"
            onChange={formik.handleChange}
            hidden={!formik.values.provideContactInfo}
            className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white"
          />
        </div>
      )}

      <div className="flex mb-5">
        <button
          className="mt-3 flex-start rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 transition ml-3 border-black h-11 content-start w-28 hover:opacity-75 disabled:opacity-75"
          type="submit"
          disabled={isSubmitted}
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
          {isSubmitted && (
            <p className="text-white">
              Thank you for your input! Our HR department will review your
              response and respond accordingly
            </p>
          )}
          {loading.errMsg && <p>{loading.errMsg}</p>}
        </div>
      </div>
    </form>
  );
};

export default FeedbackViewForm;
