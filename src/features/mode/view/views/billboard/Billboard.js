import { useSelector } from 'react-redux'
import { selectBillboardModeSettings } from '../../../settings/data/selectors'

const Billboard = () => {
    const settings = useSelector(selectBillboardModeSettings)

  return (
    <div>
        <p className="text-7xl font-display font-bold md:text-9xl mx-3 py-3">{settings.billboardText}</p>
    </div>
  )
}

export default Billboard