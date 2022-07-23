import React from 'react'

const SkeletonCard = ({cards}) => {
  return (
     Array(cards).fill(0)
     .map((_,i) => 
     <div className="relative md:h-[270px] md:min-w-[480px] min-w-[320px] h-[180px] transition duration-200 ease-out flex justify-center skeletonCard rounded-sm object-cover md:rounded" key={i}>
     </div>)
    
  )
}

export default SkeletonCard