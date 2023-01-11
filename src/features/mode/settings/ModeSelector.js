import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMode } from "./data/selectors";
import { MODEDESCRIPTIONS } from "../../../app/assets/modeDescriptions";
import "./styles/modeSelectorStyles.css";
import { updateMode } from "./data/asyncThunks";
import { useParams } from "react-router";
import { selectUtils } from "./data/selectors";
import {BiLoader} from 'react-icons/bi'
import { useState } from "react";
import logoSmall from '../../../app/assets/logoSmall.png'
/**
 * Purpose of this file is to provide a UI for selecting applications,
 * including highlighting the selectedMode and changing with one click or tap
 *
 * Notes: the style does not change. Implement styles with state later
 */

const ModeSelector = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector(selectMode);
  const utils = useSelector(selectUtils);
  const { pid } = useParams();
  const handleClick = (modeId) => {
    setSelected(modeId)
    dispatch(updateMode({ pid, modeId }));
  };
  const [selected, setSelected ] = useState("")

  return (
    <div className="max-w-screen-lg">
    <p className="font-display font-bold text-4xl pt-4 pb-2">What's your shirt do?</p>
    <div className="  mx-4 grid lg:grid-cols-4 grid-cols-2 gap-4 max-w-screen-md pt-3 mx-auto">
      
      
      {MODEDESCRIPTIONS.map((mode, idx) => {
        if (`${currentMode}` === mode.id) {
          return (
   
              <div
                key={idx}
                value={mode.id}
                onClick={() => handleClick(mode.id)}
                className=" text-2xl grid place-items-center  m-1 rounded-xl bg-[color:var(--select-bg-color)] bg-gradient-to-r from-emerald-500 to-sky-500 bg-opacity-75 border-4 border-sky-300	"
              >
                <p className="text-center">{mode.modeSelection}</p>
              
                
              </div>
              
          );
        } 

        if (selected === mode.id){
          return (
            <div
              key={idx}
              value={mode.id}
              onClick={() => handleClick(mode.id)}
              className=" animate-pulse text-2xl grid place-items-center h-40   m-1 rounded-xl bg-[color:var(--theme-bg-color)] transition hover:bg-transparent hover:border text-slate-300 hover:text-white"
            >
              <p className="text-center">{mode.modeSelection}</p>
             
              {/* <BiLoader className="animate-spin"/> */}
              {/* <img src={logoSmall} className="animate-bounce h-14"/> */}
            </div>
          );
        }

          
         
          return (
            <div
              key={idx}
              value={mode.id}
              onClick={() => handleClick(mode.id)}
              className="  text-2xl grid place-items-center h-40   m-1 rounded-xl bg-[color:var(--theme-bg-color)] transition hover:bg-transparent hover:border text-slate-300 hover:text-white"
            >
              <p className="text-center">{mode.modeSelection}</p>
            </div>
          );
        
      })}
    </div>
    </div>
  );
};

export default ModeSelector;
