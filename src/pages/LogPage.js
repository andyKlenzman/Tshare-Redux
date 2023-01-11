import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllLogData } from "../features/log/data/selectors";
import { MODEDESCRIPTIONS } from "../app/assets/modeDescriptions.js";
import { getSelectedLogData } from "../features/log/data/asyncThunks/getSelectedLogData";
import { selectCurrentUserPid } from "../../src/features/authentification/data/selectors";
import { selectMode } from "../features/mode/settings/data/selectors";
import PrintObject from "../utils/PrintObject";
import { BiQrScan } from "react-icons/bi";
import { IoIosQrScanner } from "react-icons/io";

/*
Purpose is to display log categories, dispatch actions requesting more data, and display in the UI



Reflections: 
- useEffect is firing twice. I wonder why.
- had to use strange data transformation to send correct selectedLog data
- Revisit this. Shouldn't be too hard to figure out im just sick of this problem


*/

const LogPage = () => {
  const dispatch = useDispatch();
  const currentUserPid = useSelector(selectCurrentUserPid);
  const { logArray, utils } = useSelector(selectAllLogData);
  const mode = useSelector(selectMode);

  const handleClick = (selectedLog) => {
    dispatch(
      getSelectedLogData({
        pid: currentUserPid,
        selectedLog: `${selectedLog.toLowerCase()}Log`,
      })
    );
  };
  useEffect(() => {
    dispatch(
      getSelectedLogData({
        pid: currentUserPid,
        selectedLog: `${mode.toLowerCase()}Log`,
      })
    );
  }, [mode]);

  var logData = Object.values(logArray);

  return (
    <div className="font-display font-bold border-t py-3 t px-4 my-4 transition">
      <p className="text-4xl my-3 pb-3 flex justify-center">
        <IoIosQrScanner size={32} className="mt-1 mr-2" />
        Scans
      </p>
      <div className="">
        {mode === "love" &&
          Object.values(logArray.loveLog).map((doc) => {
            return (
              <div className="bg-[color:var(--theme-bg-color)] flex flex-cols mb-3 rounded-lg">
                <div className="p-3 text-center text-2xl w-1/3 border-r">
                  {doc.name}
                </div>
                <div className="m-3 text-center shrink-0 text-2xl w-1/3">
                  {doc.response}
                </div>

               
                  <div className="p-3 text-center text-2xl w-1/3  border-l">
                    {doc.contactInfo}
                  </div>
                 
                
              </div>
            );
          })}
        {mode === "feedback" &&
          Object.values(logArray.feedbackLog).map((doc) => {
            return (
              <div className="bg-[color:var(--theme-bg-color)] flex flex-cols mb-3 rounded-lg">
                <div className="w-1/2 border-r ">
                  <div className="m-3 text-center shrink-0 text-left break-normal text-slate-300">
                    {doc.ratingQuestion}
                  </div>
                  <div className="m-3 text-center shrink-0 text-3xl">
                    <strong>{doc.ratingResponse}</strong>
                  </div>
                </div>
                <div>
                  <div className="m-3 text-center shrink-0 text-left break-normal text-slate-300">
                    {doc.promptQuestion}
                  </div>
                  <div className="m-3 text-center shrink-0 text-3xl">
                    {" "}
                    {doc.promptResponse}
                  </div>
                </div>
              </div>
            );
          })}

        <div className="my-4"></div>
        {/* <PrintObject object={logArray} /> */}
      </div>
    </div>
  );
};

export default LogPage;

// <p style={{ backgroundColor: "darkgrey", color: "white" }}>
//   <p>Log</p>
//   <pre>{JSON.stringify(logArray, null, 2)}</pre>
// </p>
// </div>
