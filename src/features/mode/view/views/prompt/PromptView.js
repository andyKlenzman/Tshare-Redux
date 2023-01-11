import React from 'react'
import { useSelector } from 'react-redux'
import { selectPromptModeSettings } from '../../../settings/data/selectors'
import PrintObject from '../../../../../utils/PrintObject'
import PromptOwnerContent from './PromptOwnerContent'
import PromptViewForm from './PromptViewForm'


const PromptView = () => {
  const settings = useSelector(selectPromptModeSettings)



  return (
    <div>
      
     
      <PromptOwnerContent />
      <PromptViewForm />
      
      
      
      
      </div>
  )
}

export default PromptView