import React from "react";
import { MODEDESCRIPTIONS } from "../../../app/assets/modeDescriptions";
import { useSelector } from "react-redux";
import { selectMode } from "./data/selectors";

const ModeDescriptor = () => {
  const currentMode = useSelector(selectMode);
  return (
    <div className="border-b pb-3 t px-4 my-4 transition">
      <p></p>
      {MODEDESCRIPTIONS.map((mode, idx) => {
        if (`${currentMode}` === mode.id) {
          return (
            <p className=" text-lg transition text-slate-300">
              {" "}
              {mode.description}
            </p>
          );
        }
      })}
    </div>
  );
};

export default ModeDescriptor;
