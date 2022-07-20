import { Movie } from "../typings";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { DocumentData } from "firebase/firestore";

interface Props {
  movie: Movie | DocumentData;
}
function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className="relative h-28 min-w-[300px] cursor-pointer transition duration-200 ease-out"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />

      <div className='transition ease duration-200 absolute top-0 left-0 w-full h-full hover:bg-black/50 opacity-0 hover:opacity-100 text-white hover:ease-in-out'>
          
          <p className=' white-space-normal text-[10px] md:text-xs font-bold flex justify-center items-center h-full text-center break-normal flex-wrap'>
              {movie.name || movie.title} 
          </p>
        </div>
    </div>
  );
}

export default Thumbnail;
