import { LuListTodo } from "react-icons/lu";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { IoRocketSharp } from "react-icons/io5";
import { BsStars, BsLightningCharge } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import TodoItems from "./TodoItems";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from 'sweetalert2';

const Todo = () => {
 
    const [todoList, setTodoList] = useState(
        localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    );
    const [isInputFocused, setIsInputFocused] = useState(false);

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === "") {
            Swal.fire({
                title: 'Empty Task',
                text: 'Please enter a task description',
                icon: 'warning',
                background: '#1e1e2e',
                color: '#f8fafc',
                confirmButtonColor: '#3b82f6',
                iconColor: '#f59e0b'
            });
            return null;     
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
            createdAt: new Date().toISOString()
        }
        
        Swal.fire({
            title: 'New Goal Added!',
            text: 'Keep crushing those tasks!',
            icon: 'success',
            background: '#1e1e2e',
            color: '#f8fafc',
            confirmButtonColor: '#10b981',
            iconColor: '#10b981',
            showConfirmButton: false,
            timer: 1500
        });
        
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This task will be removed from your list',
            icon: 'question',
            background: '#1e1e2e',
            color: '#f8fafc',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setTodoList((prevTodos) => {
                    return prevTodos.filter((todo) => todo.id !== id);
                });
                
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your task has been removed.',
                    icon: 'success',
                    background: '#1e1e2e',
                    color: '#f8fafc',
                    iconColor: '#10b981',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    const newStatus = !todo.isComplete;
                    
                    // Show completion message only when marking as complete
                    if (newStatus) {
                        Swal.fire({
                            title: 'Task Completed!',
                            text: 'Great job!',
                            icon: 'success',
                            background: '#1e1e2e',
                            color: '#f8fafc',
                            iconColor: '#10b981',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    
                    return {...todo, isComplete: newStatus};
                }
                return todo;
            });
        });
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            add();
        }
    };

    // Calculate progress
    const completedTasks = todoList.filter(todo => todo.isComplete).length;
    const totalTasks = todoList.length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <motion.div 
        whileInView={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: -50}}
        transition={{duration: 0.8, ease: "easeOut"}}
        className="flex flex-col w-11/12 max-w-md p-8 transition-all border-0 shadow-2xl glass-effect place-self-center min-h-fit rounded-2xl"
    >
        {/* Decorative elements */}
        <div className="absolute z-0 w-24 h-24 rounded-full -top-4 -right-4 bg-blue-500/30 blur-2xl"></div>
        <div className="absolute z-0 w-32 h-32 rounded-full -bottom-8 -left-8 bg-violet-500/20 blur-3xl"></div>
        
        {/* Title with status indicator */}
        <motion.div className="flex flex-col gap-1 mt-3 mb-6 transition-all">
            {/* Main title row */}
            <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-indigo-500 to-sky-500 p-2.5 rounded-xl shadow-lg">
                    <LuListTodo className="text-2xl text-white transition-all" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-transparent transition-all bg-gradient-to-r from-white to-slate-300 bg-clip-text">
                    Task Tracker <BsStars className="inline ml-1 text-amber-400" />
                </h1>
            </div>
            
            {/* Status indicator */}
            {todoList.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-2 ml-1"
                >
                    <div className="flex items-center gap-1.5 bg-slate-800/60 px-2.5 py-1 rounded-full text-xs font-medium">
                        <BsLightningCharge className="text-amber-400" />
                        <span className="text-slate-300">Progress: {progressPercentage}%</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-800/60 px-2.5 py-1 rounded-full text-xs font-medium">
                        <FiTrendingUp className={`${completedTasks > 0 ? "text-emerald-400" : "text-slate-400"}`} />
                        <span className="text-slate-300">{completedTasks}/{totalTasks}</span>
                    </div>
                </motion.div>
            )}
        </motion.div>

        {/* Input Field */}
        <div className={`flex items-center justify-center transition-all rounded-xl overflow-hidden mb-6 bg-slate-700/50 shadow-inner ${isInputFocused ? 'ring-2 ring-blue-500' : ''}`}>
            <input 
                ref={inputRef} 
                className="flex-1 px-6 py-4 transition-all bg-transparent border-0 outline-none text-slate-100 h-14 placeholder:text-slate-400"
                type="text" 
                placeholder="What do you want to accomplish?"
                onKeyPress={handleKeyPress}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
            <button  
                onClick={add} 
                className="flex items-center px-5 py-3.5 mr-1 font-medium transition-all rounded-lg cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white h-12"
            >
                Add <IoRocketSharp className="ml-2 text-lg" />
            </button>
        </div>
        
        {/* To-Do List */}
        <div className="transition-all">
            {todoList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <MdOutlinePlaylistAddCheck className="mb-3 text-5xl text-slate-500" />
                    <p className="text-slate-500">No tasks yet. Add some to get started!</p>
                </div>
            ) : (
                <>
                    <h2 className="pl-1 mb-3 text-sm font-medium tracking-wider uppercase text-slate-400">Your Tasks</h2>
                    <div className="transition-all max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                        <AnimatePresence>
                            {todoList.map((item) => (
                                <TodoItems 
                                    key={item.id} 
                                    text={item.text} 
                                    id={item.id}  
                                    isComplete={item.isComplete} 
                                    deleteTodo={deleteTodo} 
                                    toggle={toggle} 
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-4 text-xs border-t border-slate-700/50 text-slate-500">
                        <span>{todoList.length} task{todoList.length !== 1 ? 's' : ''} in total</span>
                        <span>{todoList.filter(todo => todo.isComplete).length} completed</span>
                    </div>
                </>
            )}
        </div>
    </motion.div>
  )
}
export default Todo