import React from "react";

import { useSelector } from "react-redux";

import { selectLoveModeSettings } from "../../../settings/data/selectors";

const LoveOwnerContent = () => {
  const {
    includeYourName,
    yourName,
    includeTargetName,
    targetName,
    goal,
    dateDetails,
  } = useSelector(selectLoveModeSettings);

  return (
    <div className="pt-3">
      {includeTargetName ? (
        <p className="text-5xl pt-3">Hey, {targetName}! </p>
      ) : (
        <p className="text-5xl pt-3 ">Congratulations </p>
      )}
      {includeYourName ? (
        <p className="text-xl mt-3 text-slate-200">
          {yourName} thinks you are super cute.
        </p>
      ) : (
        <p className="text-xl mt-3 text-slate-200">You are cute.</p>
      )}
      {goal === "date" ? (
        <p className="text-xl text-slate-200 pb-3">
          Would you like to {dateDetails}?
        </p>
      ) : (
        <p className="text-xl text-slate-200 pb-3">
          Can I get your phone number?
        </p>
      )}
    </div>
  );
};

export default LoveOwnerContent;
