import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { resetSettings } from '../../mode/settings/data/settingsSlice';
import { createUser } from '../data/asyncThunks/createUser';
import { logoutUser } from '../data/asyncThunks/logoutUser';


const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = () => {
      dispatch(logoutUser()).then(()=> {
      dispatch(resetSettings())
      navigate('/')

      })
    }

  return (
    <button className="text-xl m-2 h-14 rounded-lg  bg-black px-5  rounded-lg h-14 bg-transparent transition-all" onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton