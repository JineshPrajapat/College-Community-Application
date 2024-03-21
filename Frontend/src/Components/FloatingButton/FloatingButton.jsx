import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from "@ionic/react";
import { add, createOutline, briefcaseOutline, school, bookOutline } from "ionicons/icons";
import {motion} from "framer-motion";

const FloatingButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
        }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
    }, []);

    const hideButtons = () => {
        setIsOpen(false);
    };

  return (
    <div className="fixed bottom-[75px] right-2 z-50 " ref={buttonRef}>
      {/* Main post button */}
      <button
        className=" bg-[#404040] rounded-full w-12 h-12 flex items-center justify-center text-white 
                   transition-transform transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IonIcon className="text-4xl" icon={add} />
      </button>

      {/* Buttons to be displayed when the main button is clicked */}
      {isOpen && (
        <div className="  space-y-2" >
          <Link to="Questions/AddQuestions"  >
            <motion.button 
              initial={{ x:70, y:-10, opacity:0 }}
              animate={{ x:0,y:0, opacity:1}}
              transition={{ duration: 0.5, delay: 0 }}
              className=" bg-green-500 rounded-full w-10 h-10 flex items-center justify-center text-white absolute bottom-[-15px] right-[68px]" onClick={hideButtons}>
              <IonIcon className="text-2xl z-10" icon={bookOutline} />
              <motion.div 
                initial={{ x:20, opacity:0 }}
                animate={{ x:0, opacity:1}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='flex text-[12px] px-2 py-1 z-0 text-black fixed right-[106px] bg-green-500 rounded' >Add Question</motion.div>
            </motion.button>
          </Link>
        
          <Link to="/Opportunity/AddOpportunity">
            <motion.button 
              initial={{ x:40, y:22, opacity:0 }}
              animate={{ x:0, y:0, opacity:1}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center text-white absolute bottom-[32px] right-[58px]" onClick={hideButtons}>
              <IonIcon className="text-2xl z-10" icon={briefcaseOutline} />
              <motion.div 
                initial={{ x:20, opacity:0 }}
                animate={{ x:0, opacity:1}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className='flex text-[12px] px-2 py-1 z-0 text-black fixed right-[99px] bg-yellow-500 rounded'>Add Jobs</motion.div>

            </motion.button>
          </Link>

          <Link to="/Experience/AddExperience">
            <motion.button 
              initial={{ x:10, y:52, opacity:0 }}
              animate={{ x:0, y:0, opacity:1}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white absolute bottom-[72px] right-[10px]" onClick={hideButtons}>
              <IonIcon className="text-2xl z-10" icon={createOutline} />
              <motion.div 
                initial={{ x:20, opacity:0 }}
                animate={{ x:0, opacity:1}}
                transition={{ duration: 0.5, delay: 1 }}
                className='flex text-[12px] px-2 py-1 z-0 text-black fixed right-[50px] bg-purple-500 rounded'>Add Review</motion.div>
            </motion.button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;


