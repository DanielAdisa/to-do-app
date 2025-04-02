import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiTime } from "react-icons/bi";
import { MdLockOutline } from "react-icons/md";
import { motion } from "framer-motion";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, time = "", isPast = false, viewMode = "list" }) => {
  // Determine if we're in grid or list view
  const isGridView = viewMode === "grid";
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col transition-all border group rounded-xl backdrop-blur-sm border-slate-700/30 task-item
        ${isPast ? 'bg-slate-800/30' : 'bg-slate-800/50 hover:bg-slate-700/50'}
        ${isGridView ? 'p-4 h-fit' : 'px-4 py-3 my-2'}`}
    >
      <div className={`flex ${isGridView ? 'flex-col gap-4' : 'items-center gap-3'}`}>
        {/* Grid view shows title first */}
        {isGridView && (
          <div className="flex-1 mb-1">
            <p className={`text-[15px] font-medium transition-all duration-300 
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
        )}
        
        {/* Checkbox area with hover effect */}
        <motion.div 
          whileTap={{ scale: 0.9 }}
          onClick={() => toggle(id)} 
          className={`relative flex items-center justify-center transition-all 
            ${isPast ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
            ${isGridView ? 'self-start' : ''}`}
        >
          {isComplete ? (
            <IoCheckmarkCircle className={`transition-all text-emerald-500 ${isGridView ? 'text-3xl' : 'text-2xl'}`} />
          ) : (
            <div className="relative">
              <MdOutlineRadioButtonUnchecked 
                className={`transition-all ${isGridView ? 'text-3xl' : 'text-2xl'} 
                  ${isPast ? 'text-slate-500' : 'text-slate-400 group-hover:text-blue-400'}`} 
              />
              {isPast && (
                <MdLockOutline className="absolute text-xs text-slate-500 -bottom-0.5 -right-0.5" />
              )}
            </div>
          )}
        </motion.div>
        
        {/* Task text for list view */}
        {!isGridView && (
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
        )}
        
        {/* Delete button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => deleteTodo(id)}
          className={`p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all button-hover-effect
            ${isGridView ? 'self-end absolute top-3 right-3' : ''}`}
        >
          <RiDeleteBinLine className="text-lg" />
        </motion.button>
      </div>
      
      {/* Progress indicator for grid view */}
      {isGridView && !isPast && (
        <div className="mt-4 mb-2 progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: isComplete ? '100%' : '0%' }}
          ></div>
        </div>
      )}
      
      {/* Time indicator */}
      {time && (
        <div className={`flex items-center gap-1 text-xs text-slate-500
          ${isGridView ? 'mt-auto pt-3' : 'ml-8'}`}
        >
          <BiTime className="text-slate-400" />
          <span>{time}</span>
          {isPast && <span className="ml-1 text-slate-500">(Past task)</span>}
        </div>
      )}

      {/* Status indicator for grid view */}
      {isGridView && (
        <div className={`mt-2   ${isComplete ? 'text-emerald-500' : 'text-slate-400'} text-xs font-medium`}>
          {isComplete ? 'Completed' : 'In progress'}
        </div>
      )}
    </motion.div>
  );
};

export default TodoItems;