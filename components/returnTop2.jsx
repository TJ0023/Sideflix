import { ChevronUpIcon } from '@heroicons/react/solid'
import React from 'react'

const ReturnTop = () => {
    //No one has a screen bigger than 10000 pixels right?
    function searchResult() {
        console.log('Going Up');
        window.scrollBy(0, -10000);
      }

  return (
    <>
        <ChevronUpIcon className='returnTop opacity-40 hover:opacity-100 ' onClick={searchResult} id='returnTopButton'/>
    </>
  )
}

export default ReturnTop