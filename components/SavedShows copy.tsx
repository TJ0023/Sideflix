import React, {useState, useEffect, useRef} from 'react'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import useAuth from "../hooks/useAuth";
import { db } from '../Firebase';    
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'
import { useRecoilState } from 'recoil';
import { modalState, movieState } from "../atoms/modalAtom";

import { ChevronLeftIcon, ChevronRightIcon, XCircleIcon , VideoCameraIcon} from "@heroicons/react/solid"

const SavedShows = () => {
    const [movies, setMovies] = useState([]);
    const {user} = useAuth();
    const [showModal2, setShowModal2] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
    const savedRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState(false) 
    //Moves the slider by 500 pixels in specified direction 
   // Row ID serves to make each slider a unique slider of its own and won't 
   // Scroll other rows by 500 pixels when clicked.

   // moves the rows
   const handleClick = (direction: string) => {
       setIsMoved(true)

       if (savedRef.current) {
           const {scrollLeft, clientWidth} = savedRef.current
           
           const scrollTo = direction === "left" 
           ? scrollLeft - clientWidth 
           : scrollLeft + clientWidth

           savedRef.current.scrollTo({left: scrollTo, behavior:'smooth'})
       } if (savedRef.current!.scrollLeft <= 0 && isMoved == true ) {
           setIsMoved(false)
       }
   }

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setMovies(doc.data()?.savedShows);
        });
      }, [user?.email]);

      //used for referring to the savedshows database for deleting catalogue
    const movieRef = doc(db, 'users', `${user?.email}`)


    const deleteShow = async (passedID: any) => {
      try {
          const result = movies.filter((item)=> item['id'] !== passedID)
          await updateDoc(movieRef, {
              savedShows: result,
          })
      } catch (error) {
          console.log(error)
      }
  }

  
  return (
    <>
    <h2 className="w-56 cursor-pointer text-shadow- text-sm font-semibold text-[#e5e5e5] 
        transition duration-200 hover:text-white md:text-2xl ">My Shows</h2>
    <div className='relative flex items-center group'>
      
    <ChevronLeftIcon 
            className='absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-105 group-hover:opacity-100 rounded-full hover:bg-[#ffffff7c]' 
            onClick={() => handleClick("left")}//>

      <div ref={savedRef} id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
      >
          {movies.map((item, id) => (
               <div  key={id} className='w-[270px] sm:w-[270px] md:w-[360px] lg:w-[500px] inline-block cursor-pointer relative p-2' >
                <div>
               <img 
               className='w-full h-auto block'
               src={`https://image.tmdb.org/t/p/w500/${item?.['img']}`}
               alt={item?.['title']}
               />
                <div className='transition ease duration-200 absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white hover:ease-in-out'
                >
          
          <p className=' white-space-normal text-[10px] md:text-xs font-bold flex justify-center items-center h-full text-center break-normal flex-wrap'>
              {item?.['name']}
          </p>
          <p onClick={() => {
                setCurrentMovie(item);
                setShowModal2(true);
                }}>
            <VideoCameraIcon  className='absolute text-gray-300 top-4 left-4  h-9 w-9 hover:h-11 hover:w-11 duration-200 ease-in-out hover:text-yellow-300' />
          </p>
          <p onClick={()=> deleteShow(item['id'])}>
            <XCircleIcon  className='absolute text-gray-300 top-4 right-4  h-9 w-9 hover:h-11 hover:w-11 duration-200 ease-in-out hover:text-red-600' />
          </p>
             </div>
                </div>
    </div>
          ))}
          
      </div>

      <ChevronRightIcon 
            className= 'absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-105 group-hover:opacity-100 rounded-full hover:bg-[#ffffff7c]' 
            onClick={() => handleClick("right")}/>

    </div>


  </>
  )
}

export default SavedShows
