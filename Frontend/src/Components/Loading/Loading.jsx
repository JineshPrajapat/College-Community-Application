import React from 'react';
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="  flex justify-center items-center ">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
    </div>
  )
}

export default Loading