import React from 'react'
import Header from "../components/Header";
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="overflow-x-hidden scrollbar-hide relative h-screen bg-gradient-to-b from-yellow-900/15 to-{#010511] lg:h-[100vh]">
      <Header/>

      <div className="w-full h-full flex flex-col justify-center items-center gap-[50px]">
        <h1 className="text-4xl font-semibold pt-1 ">How'd you get here?</h1>
        <img
         src="./logo-png/awkward-stare-what.gif"
         width={328}
         height={640}
         className="rounded-sm object-cover md:rounded transition duration-200 ease-out"
        />
        
        <Link href="/">
         
         <button className="bg-amber-500 hover:bg-amber-400 text-white text-lg font-bold py-4 px-6 rounded cursor-pointer ease-in duration-200 ">
           GO BACK HOME
         </button>
         </Link>
        </div>

    </div>
  )
}

export default NotFound