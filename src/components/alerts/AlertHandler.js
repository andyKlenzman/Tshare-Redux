import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllAlertData } from "./alertSlice";
import { removeAlert } from "./alertSlice";
import { Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
/**
 *  This component is an app wide alert pop-up to give feedback on processes and inform user on the state of the application and what to do
 *
 * Relections
 * - Make some kind of alert when it is the internets fault. Could make it funny, tell them to hang tight or a prompt for conversation. Say, "The internet is bad...well, this is akward. Talk about sports" or something
 * - gonna focus on rendering it rn, setTimeout later, same with rerender
 * - can do close and timeout with the built in state functionality, though could get complicated if I map them
 * - reaalzied they are in fixed positio nso cant se ehtme, something to note there. 
 */

const AlertHandler = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAllAlertData);
  const [alerts, setAlerts] = useState([]);

  const handleClose = () => {
    // dispatch(closeAlert());
    console.log("close");
  };



  return (
    <div>
      {data && (
        <div>
          {data.map((alert, idx) => {
            return (
              <Alert
                role="alert"
                key={idx}
                variant={alert.alertType}
                dismissible
                style={{
                  position: "",
                  bottom: 0,
                  left: 0,
                  margin: "30px",
                }}
              >
                {alert.message}
                
              </Alert>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AlertHandler;
