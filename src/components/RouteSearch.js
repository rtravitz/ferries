import React from 'react'

function RouteSearch() {
  return (
    <div className="rounded-full bg-green-700 fixed top-4 inset-x-0 w-6/12 mx-auto z-50 h-12 flex justify-between p-2">
      <div className="rounded-l-full w-1/2 mr-1 bg-gray-200 flex items-center justify-center">
        <p>FROM</p>
      </div>
      <div className="rounded-r-full w-1/2 ml-1 bg-gray-200 flex items-center justify-center">
        <p>TO</p>
      </div>
    </div>
  )
}

export default RouteSearch

