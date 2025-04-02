import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiTime } from "react-icons/bi";
import { MdLockOutline } from "react-icons/md";
import { motion } from "framer-motion";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, time = "", isPast = false }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col gap-1 px-4 py-3 my-2 transition-all border group rounded-xl backdrop-blur-sm border-slate-700/30 
        ${isPast ? 'bg-slate-800/30' : 'bg-slate-800/50 hover:bg-slate-700/50'}`}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox area with hover effect */}
        <motion.div 
          whileTap={{ scale: 0.9 }}
          onClick={() => toggle(id)} 
          className={`relative flex items-center justify-center transition-all 
            ${isPast ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
          {isComplete ? (
            <IoCheckmarkCircle className="text-2xl transition-all text-emerald-500" />
          ) : (
            <div className="relative">
              <MdOutlineRadioButtonUnchecked 
                className={`text-2xl transition-all 
                  ${isPast ? 'text-slate-500' : 'text-slate-400 group-hover:text-blue-400'}`} 
              />
              {isPast && (
                <MdLockOutline className="absolute text-xs text-slate-500 -bottom-0.5 -right-0.5" />
              )}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
              >
              </motion.div>
            </div>
          )}
        </motion.div>
        
        {/* Task text */}
        <div className="flex-1 transition-all">
          <p className={`text-[15px] transition-all duration-300 
            ${isComplete 
              ? "text-slate-400 line-through decoration-slate-500 decoration-1" 
              : isPast 
                ? "text-slate-400"
                : "text-slate-100"
            }`}
          >
            {text}
          </p>
        </div>
        
        {/* Delete button with hover effect */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => deleteTodo(id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <RiDeleteBinLine className="text-lg" />
        </motion.button>
      </div>
      
      {/* Time indicator */}
      {time && (
        <div className="flex items-center gap-1 ml-8 text-xs text-slate-500">
          <BiTime className="text-slate-400" />
          <span>{time}</span>
          {isPast && <span className="ml-1 text-slate-500">(Past task)</span>}
        </div>
      )}
    </motion.div>
  );
};

export default TodoItems;