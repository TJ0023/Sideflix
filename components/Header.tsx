import {useState, useEffect} from 'react'
import {SearchIcon, BellIcon} from "@heroicons/react/solid"
import Link from "next/link"
import useAuth from '../hooks/useAuth'
import BasicMenu from './BasicMenu'
import { useRouter } from "next/router";

function Header() {
    const  [isScrolled, setIsScrolled] = useState(false)
    const {logout} = useAuth()
    const router = useRouter();

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
        <Link href="/">
        <div className="flex items-center space-x-2 md:space-x-10">
            <img
                src= './logo-png/sideflix.png'
                width={100}
                height={100}
                className="cursor-pointer object-contain"
            />
        </div>
        </Link>
 <BasicMenu />
            <ul className='hidden space-x-4 md:flex transition duration-[.25s] '>
                <li className={router.pathname == "/" ? "headerLink text-[#ffdd00]" : "headerLink"}>
                    <Link href="/">
                    Home 
                    </Link>
                </li>

                <li className={router.pathname == "/myList" ? "headerLink text-[#ffdd00]" : "headerLink"}>
                    <Link href="/myList">My List</Link>
                </li>
                
                <li className='headerLink'><Link href="/account">Account</Link></li> 
            </ul>
        {/* H or height measurements are .25em each increment */}
        <div className='flex items-center space-x-4 text-sm font-light'>
            <Link href="/search">
            <SearchIcon className={router.pathname == "/search" ? "searchIcon text-[#ffdd00]" : "searchIcon "}/>
            </Link>
            <BellIcon className='h-6 w-6 cursor-pointer hover:text-[#ffdd00]' />
            <Link href='/account'>
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