import {Movie} from '../typings'
import Image from 'next/image'
interface Props {
    movie: Movie
}
function Thumbnail({movie}: Props) {
  return (
    <div className='relative h-28 min-w-[250px] cursor-pointer transition duration-200 ease-out'>

    <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />

    </div>
  )
}

export default Thumbnail