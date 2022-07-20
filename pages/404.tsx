import React from 'react'
import Header from "../components/Header";

const NotFound = () => {
  return (
    <div className="overflow-x-hidden scrollbar-hide relative h-screen bg-gradient-to-b from-yellow-900/15 to-{#010511] lg:h-[100vh]">
      <Header/>

      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="font-semibold pt-1 ">How'd you get here?</h1>
        <img
         src="./logo-png/awkware-stare-what.gif"
         width={328}
         height={640}
        />
        </div>
    </div>
  )
}

export default NotFound