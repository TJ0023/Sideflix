import { Movie } from "../typings";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { DocumentData } from "firebase/firestore";
import HoverVideoPlayer from "react-hover-video-player";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Element, Genre, Movie2 } from "../typings";

interface Props {
  movie: Movie | DocumentData;
}
function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [movie2, setmovie2] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const { user } = useAuth();
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (!movie2) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie2?.media_type === "tv" ? "tv" : "movie"
        }/${movie2?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );

        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie2]);

  
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
