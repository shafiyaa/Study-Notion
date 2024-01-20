
import React from 'react'

const Tab = ({tabData, field, setField}) => {
  return (
    <div 
    style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max border border-pink-300">

        {
           tabData.map( (tab , index) => (
            <button key={index}
             onClick={()=> setField(tab.type)}
             className={ `${
                field === tab.type
                ? "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200" 
             }  px-2 rounded-full transiton-all duration-200 `}
            >
                {/* doubt */}
              
                {tab?.tabName} abcd
            </button>
           )) 
        }
    </div>
  )
}

export default Tab