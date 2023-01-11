import ViewUiController from "../features/mode/view/components/ViewUiController";
import {
  selectCurrentUser,
  selectCurrentUserPid,
} from "../features/authentification/data/selectors";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSettings } from "../features/mode/settings/data/asyncThunks";
import { selectAllViewData } from "../features/mode/view/data/selectors";
import { selectFetchSettingsUtils } from "../features/mode/settings/data/selectors";
import ViewerFooter from "../features/mode/view/components/ViewerFooter";
import logoSmall from "../app/assets/logoSmall.png";
import { BiLoaderAlt } from 'react-icons/bi'
/**
 * Purpose is to handle high level conditional render for view,
 * including header and footer
 *
 *
 */

const ViewPage = () => {
  const utils = useSelector(selectFetchSettingsUtils);
  const userPid = useSelector(selectCurrentUserPid);
  const { pid } = useParams();
  const dispatch = useDispatch();
  const [pidState, setPidState] = useState();

  useEffect(() => {
    // Idea: could create state that stops another fetch and opts for a useSelector when revisiting page
    if (pid !== "null" || pid != undefined) {
      dispatch(fetchSettings(pid));
      setPidState(pid);
    }
  }, [pid]);

  if (utils.isLoading === true) {
    return (
      <div className="text-white mx-auto">
        <BiLoaderAlt className="mt-9 mx-auto animate-spin text-sky-500 opacity-75" size={52}/>
      </div>
    );
  }

  if (utils.errMsg !== "") {
    return (
      <div>
        <img className="text-white mx-auto mt-9" src={logoSmall} />
        <p className="text-red-500">Error check your connection</p>
        <p className="text-red-500">{utils.errMsg}</p>
      </div>
    );
  }

  if (userPid == pidState) {
    return (
      <div className="max-w-screen-lg mx-auto bg-[color:var(--hover-menu-bg)] m-5 rounded-xl backdrop-blur-xl">
        <ViewUiController />
      </div>
    );
  } else {
    return (
      <>
        <div className="max-w-screen-lg  mx-auto bg-[color:var(--hover-menu-bg)] m-5 rounded-xl backdrop-blur-xl">
          <ViewUiController />
        </div>
        <ViewerFooter />
      </>
    );
  }
};

export default ViewPage;
