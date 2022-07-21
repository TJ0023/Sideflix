import { Movie } from "../typings";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Element, Genre, Movie2 } from "../typings";

interface Props {
  movie: Movie | DocumentData;
}
function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className="relative md:h-[270px] md:min-w-[480px] min-w-[320px] h-[180px] cursor-pointer transition duration-200 ease-out flex justify-center "
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded transition duration-200 ease-out"
        layout="fill"
      />

      <div className='absolute w-full h-full transition ease duration-200  hover:bg-black/50 opacity-0 hover:opacity-100 text-white hover:ease-in-out'>
          
          <p className=' white-space-normal text-[32px] md:text[48px]lg:[64px] font-bold flex justify-center items-center h-full text-center break-normal flex-wrap  transition ease duration-200  '>
              {movie.name || movie.title} 
          </p>
        </div>
    </div>
  );
}

export default Thumbnail;
