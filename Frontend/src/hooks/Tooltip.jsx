// import React, { useState, useEffect } from 'react';
// import moment from 'moment';

// const Tooltip = ({ content }) => {
//   const [showTooltip, setShowTooltip] = useState(false);

//   useEffect(() => {
//     let timer;
//     if (showTooltip) {
//       timer = setTimeout(() => {
//         setShowTooltip(true);
//       }, 2000); // Delayed appearance after 2000ms (2 seconds)
//     } else {
//       clearTimeout(timer);
//     }

//     return () => clearTimeout(timer);
//   }, [showTooltip]);

//   const handleMouseEnter = () => setShowTooltip(true);
//   const handleMouseLeave = () => setShowTooltip(false);

//   return (
//     <div
//       className={`absolute bottom-full right-0  w-max px-2 py-1 bg-gray-700 text-white text-xs rounded transition-opacity duration-500 ease-in-out ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {content}
//     </div>
//   );
// };

// export default Tooltip;


import React, { useState, useEffect } from 'react';

const Tooltip = ({ content, handleMouseEnter, handleMouseLeave, showTooltip }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (showTooltip) {
      timer = setTimeout(() => {
        setVisible(true);
      }, 1000); // Delayed appearance after 2000ms (2 seconds)
    } else {
      setVisible(false);
    }

    return () => clearTimeout(timer);
  }, [showTooltip]);

  return (
    <div
      className={`absolute z-[1000] bottom-full right-0 mb-2 w-max px-2 py-1  text-white text-xs rounded transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100 bg-gray-700' : 'opacity-0'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      { visible && content}
    </div>

  );
};

export default Tooltip;
