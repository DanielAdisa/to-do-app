import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { motion } from "framer-motion";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 px-4 py-3 my-2 transition-all border group rounded-xl bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 border-slate-700/30"
    >
      {/* Checkbox area with hover effect */}
      <motion.div 
        whileTap={{ scale: 0.9 }}
        onClick={() => toggle(id)} 
        className="relative flex items-center justify-center transition-all cursor-pointer"
      >
        {isComplete ? (
          <IoCheckmarkCircle className="text-2xl transition-all text-emerald-500" />
        ) : (
          <div className="relative">
            <MdOutlineRadioButtonUnchecked className="text-2xl transition-all text-slate-400 group-hover:text-blue-400" />
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
        <p className={`text-[15px] transition-all duration-300 ${
          isComplete 
            ? "text-slate-400 line-through decoration-slate-500 decoration-1" 
            : "text-slate-100"
        }`}>
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
    </motion.div>
  );
};

export default TodoItems;