import Header from "../components/Header"
import SavedShows from "../components/SavedShows"
import Modal2 from "../components/Modal2"
import { useRecoilValue } from "recoil"
import { useState } from "react"
import { modalState } from "../atoms/modalAtom";
import useAuth from "../hooks/useAuth";

const Account = () => {

  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);
  if (loading) return null;


  return (
    <>
       <Header />
    <main>
    <div className='w-full text-white'>
      <img className='w-full h-[400px] object-cover' 
            src="https://assets.nflxext.com/ffe/siteui/vlv3/271ac55e-7228-438e-824e-92db37981e59/39e7ea48-b4a2-48a3-b993-a228b283a9bf/PH-en-20220627-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
             alt='netflix home screen' />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>My Saved Shows</h1>
        </div>
      </div>
      <SavedShows />
      </main>
    {showModal && <Modal2 />}
    </>
  )
}

export default Account
