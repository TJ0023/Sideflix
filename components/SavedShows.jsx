import React, {useState, useEffect} from 'react'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import useAuth from "../hooks/useAuth";
import { db } from '../Firebase';    
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'
import { useRecoilState } from 'recoil';
import { modalState, movieState } from "../atoms/modalAtom";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"

const SavedShows = () => {
    const [movies, setMovies] = useState([]);
    const {user} = useAuth();
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

    //Moves the slider by 500 pixels in specified direction 
   // Row ID serves to make each slider a unique slider of its own and won't 
   // Scroll other rows by 500 pixels when clicked.
    const slideLeft = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setMovies(doc.data()?.savedShows);
        });
      }, [user?.email]);

      //used for referring to the savedshows database for deleting catalogue
    const movieRef = doc(db, 'users', `${user?.email}`)


    const deleteShow = async (passedID) => {
      try {
          const result = movies.filter((item)=> item.id !== passedID)
          await updateDoc(movieRef, {
              savedShows: result,
          })
      } catch (error) {
          console.log(error)
      }
  }

  
  return (
    <>
    <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
    <div className='relative flex items-center group'>
      
    <ChevronLeftIcon 
            className='absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-105 group-hover:opacity-100 rounded-full hover:bg-[#ffffff7c]' 
            onClick={slideLeft}/>

      <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
      >
          {movies.map((item, id) => (
               <div  key={id} className='w-[270px] sm:w-[270px] md:w-[360px] lg:w-[500px] inline-block cursor-pointer relative p-2' >
                <div>
               <img 
               className='w-full h-auto block'
               src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
               alt={item?.title}
               onClick={() => {
                setCurrentMovie(item);
                setShowModal(true);
                }}
               />
                </div>
    </div>
          ))}
          
      </div>

      <ChevronRightIcon 
            className= 'absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-105 group-hover:opacity-100 rounded-full hover:bg-[#ffffff7c]' 
            onClick={slideRight}/>

    </div>


  </>
  )
}

export default SavedShows
