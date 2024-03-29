import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { DocumentData } from "firebase/firestore"
import { useRef, useState } from "react"
import { Movie } from "../typings"
import Thumbnail3 from "./Thumbnail3"

interface Props {
    title: string
     //For Firebase
    movies: Movie[] | DocumentData []
}
function Row({title, movies}:Props) {


  return (
    <div className='scrollbar-hide overflow-y-auto space-y-0.5 md:space-6-2' >
        <h2 
        className="w-56 cursor-pointer text-shadow- text-4xl font-semibold text-[#e5e5e5] 
        transition duration-200 hover:text-white md:text-4xl pb-[25px]">
            {title}
        </h2>
        <div className='group relative md:-ml-2'>
        
        <div className='scrollbar-hide flex flex-wrap justify-center items-center gap-[25px] mb-[25px]'>
            {movies.map((movie) => (
           
           <Thumbnail3 key={movie.id} movie={movie}/>
            ))}
       
           
        </div>

        </div>
      
        <footer className='mb-[25px] w-full h-[50px] z-[-1]'>
            <div className="flex justify-center align-baseline gap-2 pointer-events-none">
             <h1 className="font-semibold pt-1">Powered by</h1>
            <img
              src="./logo-png/tmdb.svg"
              width={60}
              height={60}
              />
        </div>
        </footer>
    </div>
  )
}

export default Row