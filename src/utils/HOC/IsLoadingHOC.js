import { useState } from "react"
import Loading from "../Loading"



const IsLoadingHOC = (WrappedComponent, loadingMessage) => {

    const [isLoading, setIsLoading ] = useState(true)
  return (
    <div>
        {/* {isLoading ? <div> --- LOADING HOC --- </div> : <WrappedComponent /> } */}
        <Loading />
        <div>Here is the hoc</div>
        <WrappedComponent /> 


    </div>
  )
}

export default IsLoadingHOC
