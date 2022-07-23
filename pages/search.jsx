import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useAuth from "../hooks/useAuth";
import { modalState, movieState } from "../atoms/modalAtom";
import { useRecoilValue } from "recoil";
import Modal from "../components/Modal";
import useList from "../hooks/useList";
import MovieRow from "../components/MovieRow";
import Image from "next/image";
import {ChevronUpIcon, SearchIcon} from "@heroicons/react/solid";
import SkeletonCard from '../components/SkeletonCard';


const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const popular2 = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const searchMovie = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=`;

const search = () => {

    const [moviesResult, setMoviesResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { loading, user } = useAuth();
    const showModal = useRecoilValue(modalState);
    const movieRecoilState = useRecoilValue(movieState)
    const list = useList(user?.uid);

    function searchResult() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    // Just fetches the result of the Popular Movies in TMDB
    useEffect(() => {
      fetch(popular2)
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          setMoviesResult(data.results);
          setIsLoading(false);
        })
    },[])

    // Submits and overrides the fetch response above with the given input value

    const handleOnSubmit = (event) => {
      event.preventDefault();
      let input = searchTerm;
      setIsLoading(true);
      setTimeout(function () {
        if(input.length === 0 ) {
          fetch(popular2)
          .then(response => response.json())
          .then((data) => {
            console.log(data);
            setMoviesResult(data.results);
            setIsLoading(false);
          })
        } else if (input !== null) {
          fetch(searchMovie+searchTerm)
              .then(response => response.json())
              .then((data) => {
                console.log(data);
                setMoviesResult(data.results);
                setIsLoading(false);
        });
        }
      }, 1000);
    }

    const handleOnChange = (event) => {
      setSearchTerm(event.target.value);
    }

  return (
    <div className='h-max'>
        <Header/>
        <Image
        src="/logo-png/sideflixbaselogin.png"
        layout="fill"
        className="-z-10 !hidden opacity-30 sm:!inline"
        objectFit="cover"
      />

        <div className="relative shrink-0 flex flex-col gap-[100px] pt-[20vh] justify-center items-center">
 
        <div className=" w-[100vw] ">
                <form onSubmit={handleOnSubmit} className='flex flex-row justify-center '>
                    <input 
                    className="!text-2xl !text-black w-[80%] md:[85%]" 
                    type="search" 
                    placeholder="Search..."
                    pattern="^[^ ].+[^ ]$"
                    value={searchTerm}
                    onChange={handleOnChange}
                    required
                    />
                    <button className='bg-amber-400 w-[30px] md:w-[50px] searchButton hover:text-amber-700 text-center'>
                    <SearchIcon className="searchIcon2 text-center"/>
                    </button>
                </form>
        </div>

        <main>

        <div className='scrollbar-hide flex flex-wrap justify-center items-center gap-[25px] transition duration-200 ease-out'>

        {isLoading && <SkeletonCard cards={5}/>}
          <div className={(isLoading === true) ? 'hidden' : 'scrollbar-hide flex flex-wrap justify-center items-center gap-[25px] transition duration-200 ease-out'}>
            {moviesResult.length > 0 && 
              moviesResult.map((movie) => 
              <MovieRow key={movie.id} movie={movie} />
              )}
          </div>
        </div>
        </main>

    
    

        </div>
        {showModal && <Modal />}
       
        <footer className='mt-[50px] mb-[25px] w-full h-[50px]'>
            <div className="flex justify-center align-baseline gap-2 pointer-events-none">
             <h1 className="font-semibold pt-1 drop-shadow-xl">Powered by</h1>
            <img
              src="./logo-png/tmdb.svg"
              width={60}
              height={60}
              className='drop-shadow-xl'
              />
        </div>
        </footer>

        <ChevronUpIcon className='h-[60px] w-[60px] fixed right-2 bottom-5 cursor-pointer bg-amber-500 rounded-full p-2 z-[50]' onClick={searchResult}/>
    </div>
  )
}

export default search;
