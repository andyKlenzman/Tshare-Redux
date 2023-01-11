import React from 'react'
import { useNavigate } from 'react-router'

const ViewerFooter = () => {
    const navigate = useNavigate()


    const handleClick = () => {
        navigate("/")



    }
  return (
    <div onClick={handleClick} className="fixed bottom-0 ">
        <p>Wondering what the hell this is? Click here.</p>
        
    </div>
  )
}

export default ViewerFooter