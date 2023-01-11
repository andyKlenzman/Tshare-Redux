import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPromptModeSettings,
  
} from "./../data/selectors";

import { selectPrompt } from "./../data/asyncThunks";
import { selectCurrentUserPid } from "../../../authentification/data/selectors";
import { selectUtilsSettingChange } from "./../data/selectors";
import { BiLoaderAlt } from "react-icons/bi";
import ViewButton from "../../../../components/Header/ViewButton";
/*
This component handles the display of all user prompts, their selection, and dispatches their change

*/
const SelectPrompt = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectPromptModeSettings);
  const currentUserPid = useSelector(selectCurrentUserPid);
  const loading = useSelector(selectUtilsSettingChange);
 


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...settings, actionType: false, pid: currentUserPid },
    onSubmit: (values) => {
      dispatch(selectPrompt(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} hidden={formik.values.actionType}>
      <div className="flex flex-col text-start mt-3">
        
        <label
          htmlFor="promptDetails.currentPromptId"
          className="ml-3"
        >
          Select a previous prompt:{" "}
        </label>
        <select
          id="promptDetails.currentPromptId"
          name="promptDetails.currentPromptId"
          type="select"
          onChange={formik.handleChange}
          className="bg-[color:var(--hover-menu-bg)] text-slate-300 m-2 h-9 rounded-lg placeholder:text-gray-200 pl-[14px]  focus:text-white"
          value={formik.values.promptDetails.currentPromptId}
        >
          {settings.allPrompts &&
            settings.allPrompts.map((prompt, idx) => {
              return (
                <option key={idx} value={idx}>
                  {prompt}
                </option>
              );
            })}
        </select>
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

export default SelectPrompt;
