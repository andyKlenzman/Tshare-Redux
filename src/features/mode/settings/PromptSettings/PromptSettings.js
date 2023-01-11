import React from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { FormGroup } from "react-bootstrap";
import { selectPromptModeSettings } from "./../data/selectors";
import CreatePrompt from "./CreatePrompt";
import SelectPrompt from "./SelectPrompt";

const PromptSettings = () => {
  const settings = useSelector(selectPromptModeSettings);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...settings, actionType: false },
  });

  return (
    <div className="p-4 m-2">
      <div className="ml-3 flex flex-col text-start">
        <div className="flex">
          <label htmlFor="actionType" className="ml-3">Create New Prompt? </label>
          <input
            id="actionType"
            name="actionType"
            type="checkbox"
            className="w-20 -ml-4 "
            checked={formik.values.actionType}
            onChange={formik.handleChange}
          />
        </div>
        {formik.values.actionType ? <CreatePrompt /> : <SelectPrompt />}
      </div>
    </div>
  );
};

export default PromptSettings;
