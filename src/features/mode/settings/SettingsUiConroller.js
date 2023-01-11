import React from 'react'
import LoveSettings from './LoveSettings'
import PromptSettings from './PromptSettings/PromptSettings'
import FeedbackSettings from './FeedbackSettings'
import { useSelector } from 'react-redux'
import { selectMode } from './data/selectors'
import BillboardSettings from './BillboardSettings'

const SettingsUiController = () => {
  const modeSelection = useSelector(selectMode);

  switch(modeSelection){
    case 'love':
      return <LoveSettings />
    case 'prompt':
      return <PromptSettings />
    case 'feedback':
      return <FeedbackSettings />
    case 'billboard':
      return  <BillboardSettings />
    default:
      return <p>Select your Mode</p>
  }
}

export default SettingsUiController