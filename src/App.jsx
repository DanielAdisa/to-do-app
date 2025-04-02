import Todo from "./components/Todo"
import { motion } from "framer-motion"

const App = () => {
  return (
    <div className="overflow-x-hidden antialiased transition-all text-stone-300">
      <div className="fixed inset-0 transition-all -z-10">
        {/* Modern Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 z-[-3]"></div>
        
        {/* Grid pattern overlay */}
        <div className="transition-all absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
        
        {/* Decorative blurred orbs */}
        <motion.div 
          animate={{ 
            x: [0, 10, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-32 right-1/4 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl z-[-1]"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-32 left-1/4 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl z-[-1]"
        ></motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid min-h-screen py-4 transition-all"
      >
        <Todo />
      </motion.div>
    </div>
  )
}

export default App