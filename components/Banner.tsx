import Image from "next/image"
import { useEffect, useState } from "react"
import { baseUrl } from "../constants/movie"
import { Movie } from "../typings"
import {FaPlay} from "react-icons/fa"
import { InformationCircleIcon } from "@heroicons/react/solid"
interface Props {
    netflixOriginals: Movie[]
}

function Banner({netflixOriginals}: Props) {
    const [movie, setMovie] = useState< Movie | null>(null)
    // Generates a random netflix movie through Math Random
    // Specifically from the Array of netflix originals
    useEffect (() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    },[netflixOriginals])
  

        //If text is too long, it'll be replaced with ... to avoid text from covering the screen too much
    // So you insert the object or whatever text property you have inside this function and set the text string limit...
    const truncateString = (str: string, num: number) => {
        if(str?.length > num) {
            return str.slice(0, num) + '...'
        } else {
            return str;
        }
    };

    return (
        
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] w-screen lg:justify-end lg:pb-12">
        <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
            {/* <img src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}  
            alt={`${movie?.title}`} 
            /> */}
            <Image 
            layout="fill"
            src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} 
            objectFit="cover"
            />
        </div>

        <h1 className="text-shadow-lg text-2xl lg:text-7xl md:text-4xl font-bold">
            {movie?.title || movie?.name || movie?.original_name} 
        </h1>
        <p className='max-w-xs text-shadow-md text-xs md:max-w-large md:text-lg lg:max-w-2xl lg:text-2xl'>
            {truncateString(movie?.overview, 170)}
        </p>

        <div className="flex space-x-5">
            <button className="bannerButton bg-white text-black">
                <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7 transition duration-200"/>
                Play
                </button>
            <button className="bannerButton bg-[gray]/70">
                <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8 transition duration-200"/>
                More Info
                </button>
        </div>
    </div>
  )
}

export default Banner
