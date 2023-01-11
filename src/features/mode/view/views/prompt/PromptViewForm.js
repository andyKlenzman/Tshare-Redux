import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPromptDetails } from "../../../settings/data/selectors";
import { useFormik } from "formik";
import { addPromptInput } from "../../../settings/data/asyncThunks";
import { useParams } from "react-router";
import { BiLoaderAlt } from "react-icons/bi";
import { selectViewerSettings } from "../../../settings/data/selectors";
import { useState } from "react";


const PromptViewForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectViewerSettings);
  const { pid } = useParams();
  const [errors, setErrors] = useState({});

  const {
    currentPromptId: promptId,
    responses,
    customPrompt,
    promptTitle,
  } = useSelector(selectPromptDetails);

  const validate = (values) => {
    let errors = {};

    if (!values.text) {
      errors.text = "Required";
    }

    setErrors(errors);
    return errors;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      text: "",
      isAnonymous: false,
      promptId,
      pid,
      responses,
    },
    onSubmit: (values, { resetForm }) => {
      const err = validate(values);
      if (Object.keys(err).length !== 0) {
        return;
      }
      dispatch(addPromptInput(values));
      resetForm({
        values: {
          text: "",
        },
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="md:pl-9  flex flex-col max-w-screen-sm mx-auto"
      >
        <label className="ml-3 text-start flex" htmlFor="text">
          Your contribution{" "}
          {errors.text && (
            <p className="text-red-400 text-start ml-3">{errors.text}</p>
          )}
        </label>
        <input
          id="text"
          name="text"
          type="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white disabled:text-slate-600"
        />
        <label className="ml-3 text-start" htmlFor="name">
          Pen name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white disabled:text-slate-600"
        />
        <div className="flex mb-5">
          <button
            className="mt-3 flex-start rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 transition ml-3 border-black h-11 content-start w-28 hover:opacity-75 disabled:opacity-75"
            type="submit"
            disabled={loading.isLoading}
          >
            Submit
          </button>
          <div className="ml-3 mt-3">
            {loading.isLoading && (
              <BiLoaderAlt
                className="animate-spin text-sky-500 opacity-75"
                size={40}
              />
            )}
            {loading.errMsg && <p>{loading.errMsg}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptViewForm;
