import React from 'react'
import LoveView from '../views/love/LoveView'
import PromptView from '../views/prompt/PromptView'
import FeedbackView from '../views/feedback/FeedbackView'
import BillboardView from '../views/billboard/BillboardView'
import { useSelector } from 'react-redux'
import { selectAllViewData } from '../data/selectors'
import { selectMode } from '../../settings/data/selectors'
import { useParams } from 'react-router'
import { selectCurrentUser } from '../../../authentification/data/selectors'
// import { selectModeSelection } from './data/selectors'
//  import { selectCurrentUrlPid } from '../../authentification/data/selectors'


/**
 Purpose is to handle the conditional rendering and higher level loading states for View

 Return
 - For loading messages, could say "This tshare is experiencing technical diffculties. Sewing dataframes... Connecting Threads... exploiting child labor..."
 */

const ViewUiController = () => {
  const modeSelection = useSelector(selectMode);
  const user = useSelector(selectCurrentUser);
  const { pid } = useParams();


  switch(modeSelection){
    case 'love':
      return <LoveView />
    case 'prompt':
      return <PromptView />
    case 'feedback':
      return <FeedbackView />
    case 'billboard':
      return  <BillboardView />
    default:
      return <p>This Tshare is experiencing technical issues...</p>
  }





 

      // <p style={{ backgroundColor: "darkgrey", color: "white" }}>
      //   <pre>{JSON.stringify(view, null, 2)}</pre>
      // </p>
      
      
      



}

export default ViewUiController

// cool conditional render, pas in like <>{content}</>
// if (isLoading) {
//   content = <Loading />;
// } else if (errMsg) {
//   content = <Error errMsg={errMsg} />;
// } else {
//   content = (
//       <>
//           <CampsiteDetail campsite={campsite} />
//           <CommentsList campsiteId={campsiteId} />
//       </>
//   );
// }




// how to select multiple use selectors. 
// const items = useSelector((state) => [selectFeaturedCampsite(state), selectFeaturedPromotion(state), selectFeaturedPartner(state)])