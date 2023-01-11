import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {} from "../features/mode/settings/data/asyncThunks";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectAllSettings } from "../features/mode/settings/data/selectors";
import SettingsUiController from "../features/mode/settings/SettingsUiConroller";
import ModeSelector from "../features/mode/settings/ModeSelector";
import { selectCurrentUser } from "../features/authentification/data/selectors";
import { fetchSettings } from "../features/mode/settings/data/asyncThunks";
import { useNavigate } from "react-router";
import Loading from "../utils/Loading";
import { selectFetchSettingsUtils } from "../features/mode/settings/data/selectors";
import LogoutButton from "../features/authentification/logout/LogoutButton";
import ModeDescriptor from "../features/mode/settings/ModeDescriptor";
import LogPage from "./LogPage";
import {BsGear} from 'react-icons/bs'
/**
 * The purpose of this file is to render home page, including fetching the
 * profile's settings, checking who the user is, and then conditionally
 * rendering the page.
 */

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector(selectFetchSettingsUtils);
  const { utils, userArray } = useSelector(selectCurrentUser);

  const { pid } = useParams();
  const [savedPid, setSavedPid] = useState();

  useEffect(() => {
    if (pid != "null") {
      dispatch(fetchSettings(pid));
    }
  }, []);

  if (settings.isLoading) {
    return <Loading />;
  }

  if (userArray.pid == pid) {
    return (
      <div className="container  mx-auto bg-[color:var(--theme-bg-color)] mx-5 mt-5 backdrop-blur-xl max-w-screen-lg lg:rounded-lg">
        
        <ModeSelector />
        <ModeDescriptor />
        
        <p className=" text-4xl my-3 pb-3 flex justify-center font-display font-bold  "><BsGear className="mr-2" />Customize</p>
        <SettingsUiController />
        <LogPage />
        <LogoutButton />
        
      </div>
    );
  } else {
    return (
      <div>
        <p>Conditional Rendering for viewers another person profile.</p>
      </div>
    );
  }
};

export default SettingsPage;
