import Todo from "./components/Todo"
import { motion } from "framer-motion"

const App = () => {
  return (
    <div className="overflow-x-hidden antialiased transition-all text-stone-300">
      <div className="fixed inset-0 transition-all -z-10">
        {/* Modern Dark-Themed Background */}
        <div className="absolute inset-0 bg-[#080510] z-[-3]"></div>
        
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#12091d]/80 via-[#0c111d]/60 to-[#0e1630]/50 z-[-2]"></div>
        
        {/* Nebula-like pattern overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen z-[-1]" 
             style={{
               backgroundImage: ` url('https://cdn.pixabay.com/photo/2016/11/29/09/08/space-1867260_1280.jpg')`,
               backgroundSize: 'cover'
             }}>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-[-1] opacity-20"
             style={{
               backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
               backgroundSize: '30px 30px'
             }}>
        </div>
        
        {/* Decorative blurred orbs */}
        <motion.div 
          animate={{ 
            x: [0, 10, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute w-64 h-64 rounded-full top-20 right-1/4 bg-indigo-600/10 blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute rounded-full bottom-20 left-1/4 w-80 h-80 bg-blue-600/10 blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, 15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute rounded-full top-1/3 left-1/3 w-72 h-72 bg-purple-600/10 blur-3xl"
        ></motion.div>
      </div>
      
      {/* Subtle floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-1 h-1 rounded-full bg-blue-400/30 animate-pulse"></div>
        <div className="absolute top-[15%] right-[10%] w-1.5 h-1.5 rounded-full bg-indigo-400/40 animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[15%] w-1 h-1 rounded-full bg-violet-400/30 animate-pulse"></div>
        <div className="absolute bottom-[25%] right-[25%] w-1 h-1 rounded-full bg-sky-400/30 animate-pulse"></div>
        <div className="absolute top-[35%] right-[30%] w-1.5 h-1.5 rounded-full bg-blue-400/40 animate-pulse"></div>
        <div className="absolute bottom-[40%] left-[40%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
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