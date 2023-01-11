import React from 'react'
import { useSelector } from 'react-redux'
import { selectBillboardModeSettings } from '../../../settings/data/selectors'
import PrintObject from '../../../../../utils/PrintObject'
import Billboard from './Billboard'





/*
Purpose is to hold all of the components for the experiental part of the the view


Notes:
- Could add a simple upvote, downvote button. rank the ,ost popular ones and allow people to use them.


*/
const BillboardView = () => {


  return (
    <div >
     
    
    <Billboard/>
    

    
    
    
    
    </div>
  )
}

export default BillboardView