import {useState, useEffect} from 'react'
import {SearchIcon, BellIcon} from "@heroicons/react/solid"
import Link from "next/link"

function Header() {
    const  [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
 
        window.addEventListener('scroll', handleScroll)
            return () => {
                window.removeEventListener('scroll', handleScroll)
      }
    },[])

  return (
    <header className={`${isScrolled && 'bg-[#14141473]'} bg-[#14141473]` }>
        <div className="flex items-center space-x-2 md:space-x-10">
            <img
                src= './logo-png/sideflix.png'
                width={100}
                height={100}
                className="cursor-pointer object-contain"
            />

            <ul className='hidden space-x-4 md:flex transition duration-[.25s]'>
                <li className='headerLink'>Home</li>
                <li className='headerLink'>TV Shows</li>
                <li className='headerLink'>Movies</li>
                <li className='headerLink'>New & Popular</li>
                <li className='headerLink'>My List</li>
            </ul>
        </div>
        {/* H or height measurements are .25em each increment */}
        <div className='flex items-center space-x-4 text-sm font-light'>
            <SearchIcon className='hidden h-6 w-6 cursor-pointer sm:inline '/>
            <BellIcon className='h-6 w-6 cursor-pointer' />
            <Link href="/account">
                <img 
                src= './profile-pic/spongebob.jpg'
                alt=""
                className='cursor-pointer rounded h-6 w-6'
                />
            </Link>
        </div>
    </header>
  )
}

export default Header