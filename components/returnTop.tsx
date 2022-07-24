import { ChevronUpIcon } from '@heroicons/react/solid'
import React from 'react'

const ReturnTop = () => {
    //No one has a screen bigger than 10000 pixels right?
    function searchResult() {
        console.log('Going Up');
        window.scrollBy(0, -10000);
      }

     // When the user scrolls down 20px from the top of the document, show the button
     window.onscroll = function() {scrollFunction()};
  
     const mybutton = document.getElementById("returnTopButton");
     
     function scrollFunction() {
      const x = document.getElementById("returnTopButton");
      x!.style.display = window.getComputedStyle(document.getElementById("returnTopButton")!).display;
      
       if ((document.body.scrollTop || document.documentElement.scrollTop) === 0) {
        mybutton!.style.pointerEvents = "none";
        mybutton!.style.opacity = "0";
       } else {
         mybutton!.style.opacity = "1";
         mybutton!.style.pointerEvents = "auto";
       }
     }

  return (
    <>
        <ChevronUpIcon className='returnTop pointer-events-none opacity-0' onClick={searchResult} id='returnTopButton'/>
    </>
  )
}

export default ReturnTop