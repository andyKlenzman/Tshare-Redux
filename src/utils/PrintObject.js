import React from 'react'

const PrintObject = (obj) => {
  return (

      <pre  style={{ backgroundColor: "black", color: "white" }}>{JSON.stringify(obj, null, 2)}</pre>
      
  )
}

export default PrintObject