import React from 'react'
import {
  AiOutlineEye,

} from "react-icons/ai";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCurrentUserPid } from '../../features/authentification/data/selectors';

const ViewButton = () => {
  const navigate = useNavigate();
  const pid = useSelector(selectCurrentUserPid);

  const handleClickView = () => navigate(`/view/${pid}`);

  return (
    <div
    className=" mr-4 transition duration-150 border-b-8 border-transparent text-slate-300 hover:text-red-300 flex flex-col "
    onClick={handleClickView}
  >
    <AiOutlineEye size={32} className="mx-auto" />
    <p className="text-sm lowercase">View</p>
  </div>

  )
}

export default ViewButton