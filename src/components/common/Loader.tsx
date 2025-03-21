"use client"

import {  PuffLoader } from "react-spinners"

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent background overlay */}
      

      {/* Loader centered on screen with a subtle card effect */}
     
       <div className="bg-white p-4 rounded-full shadow-lg">
       <PuffLoader color="#e7000b" size={70} />
       </div>
       
    </div>
  )
}

export default Loader
