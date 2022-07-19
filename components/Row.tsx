import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { DocumentData } from "firebase/firestore"
import { useRef, useState } from "react"
import { Movie } from "../typings"
import Thumbnail from "./Thumbnail"

interface Props {
    title: string
     //For Firebase
    movies: Movie | DocumentData []
}
function Row({title, movies}:Props) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState(false) 
    // moves the rows
    const handleClick = (direction: string) => {
        setIsMoved(true)

        if (rowRef.current) {
            const {scrollLeft, clientWidth} = rowRef.current
            
            const scrollTo = direction === "left" 
            ? scrollLeft - clientWidth 
            : scrollLeft + clientWidth

            rowRef.current.scrollTo({left: scrollTo, behavior:'smooth'})
        } if (rowRef.current!.scrollLeft <= 0 && isMoved == true ) {
            setIsMoved(false)
        }
    }

  return (
    <div className='scrollbar-hide h-40 space-y-0.5 md:space-6-2' >
        <h2 
        className="w-56 cursor-pointer text-shadow- text-sm font-semibold text-[#e5e5e5] 
        transition duration-200 hover:text-white md:text-2xl ">
            {title}
        </h2>
        <div className='group relative md:-ml-2'>
            
            <ChevronLeftIcon 
            className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-105 group-hover:opacity-100 rounded-full hover:bg-[#ffffff7c] ${!isMoved && 'hidden'}`} 
            onClick={() => handleClick("left")}/>
        
        <div ref={rowRef} className='flex scrollbar-hide items-center space-x-1 overflow-x-scroll md:space-x-2.5 md:p-2'>
            {movies.map((movie) => (
           
           <Thumbnail key={movie.id} movie={movie}/>
            ))}
       
           
        </div>

            <ChevronRightIcon 
            className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-105 group-hover:opacity-100 rounded-full hover:bg-[#ffffff7c]`} 
            onClick={() => handleClick("right")}/>
        </div>
    </div>
  )
}

export default Row