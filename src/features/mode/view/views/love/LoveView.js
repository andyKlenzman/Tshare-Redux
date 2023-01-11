import React from "react";
import { useSelector } from "react-redux";
import LoveOwnerContent from "./LoveOwnerContent";
import LoveViewForm from "./LoveViewForm";
import { useDispatch } from "react-redux";
import { selectViewerSettings } from "../../../settings/data/selectors";

const LoveView = () => {
  // const dispatch = useDispatch();
  // const utils = useSelector(selectViewerSettings)

  return (
    <div className="">
      <LoveOwnerContent />
      <LoveViewForm />
    </div>
  );
};

export default LoveView;
