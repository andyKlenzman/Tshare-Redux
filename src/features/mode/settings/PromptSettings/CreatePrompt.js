import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup } from "react-bootstrap";
import { selectPromptModeSettings } from "./../data/selectors";
import { selectCurrentUserPid } from "../../../authentification/data/selectors";
import { createPrompt } from "./../data/asyncThunks";
import { selectUtilsSettingChange } from "./../data/selectors";
import { BiLoaderAlt } from "react-icons/bi";
import ViewButton from "../../../../components/Header/ViewButton";
import { useState } from "react";

/*
Component for configuring and dispatching an action to create a new prompt for the promptApp

Reflections:
 - When explaining the purpose of an app, do not explain it's broader context. Explain the purpose of the component, that is it. Confining a component to the apps current config is a limiting defintion to the reusable components

 - There are bugs with the inital values for promptType, hopefull not breaking≥
*/

const CreatePrompt = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectPromptModeSettings);
  const currentUserPid = useSelector(selectCurrentUserPid);
  const loading = useSelector(selectUtilsSettingChange);
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let errors = {};
    if(values.promptDetails.promptType===null){
      errors.promptType = "Required"
    }

    if (!values.promptDetails.promptTitle) {
      errors.title = "Required";
    } else if (values.promptDetails.promptTitle.length > 50) {
      errors.title = "Too long";
    }

    if (values.promptDetails.promptType === "custom") {
      if (!values.promptDetails.customPrompt) {
        errors.customPrompt = "Required";
      } else if (values.promptDetails.customPrompt.length > 200) {
        errors.customPrompt = "Too long";
      }
    }

    setErrors(errors);
    return errors;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...settings,
      actionType: false,
      pid: currentUserPid,
      newId: settings.allPrompts?.length || 0,
    },
    onSubmit: (values) => {
      const err = validate(values);
      if (Object.keys(err).length !== 0) {
        return;
      }
      dispatch(createPrompt(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col text-start mt-3">
        <label className=" ml-3 flex" htmlFor="promptDetails.promptType">
          Start a new prompt:
          {errors.promptType && (
            <p className="text-red-400 text-start text-sm ml-3 mt-1">
              {errors.promptType}
            </p>
          )}
        </label>
        <select
          id="promptDetails.promptType"
          name="promptDetails.promptType"
          type="select"
          onChange={formik.handleChange}
          value={null}
          className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white"
        >
          <option value={null}>Select Type</option>
          <option value="custom">Custom Prompt</option>
          <option value="story">Template: Communal Story</option>
          <option value="poem">Template: Communal Poem</option>
        </select>
      </div>
      <div className="flex flex-col text-start">
        <label className=" ml-3 flex">
          Title
          {errors.title && (
            <p className="text-red-400 text-start text-sm ml-3 mt-1">
              {errors.title}
            </p>
          )}
        </label>
        <input
          id="promptDetails.promptTitle"
          name="promptDetails.promptTitle"
          type="text"
          onChange={formik.handleChange}
          placeholder="Example: The tale of the three piglets"
          className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-700 pl-[14px] focus:text-white"
        />
      </div>
      <div
        className="flex flex-col text-start"
        hidden={formik.values.promptDetails.promptType !== "custom"}
      >
        <label className=" ml-3 flex">
          Prompt
          {errors.customPrompt && (
            <p className="text-red-400 text-start text-sm ml-3 mt-1">
              {errors.customPrompt}
            </p>
          )}
        </label>
        <input
          id="promptDetails.customPrompt"
          name="promptDetails.customPrompt"
          type="text"
          onChange={formik.handleChange}
          placeholder="Example: Spin a tale about the three piglets if they were addicts"
          className="placeholder:text-slate-700 bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px] focus:text-white"
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
  );
};

export default CreatePrompt;
