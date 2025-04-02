import { LuListTodo } from "react-icons/lu";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { IoRocketSharp } from "react-icons/io5";
import { BsStars, BsLightningCharge } from "react-icons/bs";
import { FiTrendingUp, FiChevronDown } from "react-icons/fi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import TodoItems from "./TodoItems";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from 'sweetalert2';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Todo = () => {
 
    const [todoList, setTodoList] = useState(
        localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    );
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [activeDay, setActiveDay] = useState(() => {
        const today = new Date();
        return daysOfWeek[today.getDay()];
    });
    const [showDaySelector, setShowDaySelector] = useState(false);

    const inputRef = useRef();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes} ${ampm}`;
    };
    
    const formatDay = (dateString) => {
        const date = new Date(dateString);
        return daysOfWeek[date.getDay()];
    };
    
    const isPastTask = (dateString) => {
        const taskDate = new Date(dateString);
        const taskDay = daysOfWeek[taskDate.getDay()];
        const today = new Date();
        const todayDay = daysOfWeek[today.getDay()];
        
        // If it's from a previous day
        if (taskDay !== activeDay) {
            return false; // Not relevant for filtering
        }
        
        // If it's from a previous day in this week
        const taskDayIndex = daysOfWeek.indexOf(taskDay);
        const todayDayIndex = daysOfWeek.indexOf(todayDay);
        
        if (taskDayIndex < todayDayIndex) {
            return true;
        }
        
        // If it's earlier today
        if (taskDay === todayDay) {
            const taskTime = new Date(taskDate).setHours(0, 0, 0, 0);
            const todayTime = new Date().setHours(0, 0, 0, 0);
            
            if (taskTime < todayTime) {
                return true;
            }
        }
        
        return false;
    };

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

        const now = new Date();
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
            createdAt: now.toISOString(),
            day: daysOfWeek[now.getDay()],
            isPast: false
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
                    // Check if the task is from past days
                    if (isPastTask(todo.createdAt)) {
                        Swal.fire({
                            title: 'Cannot Update',
                            text: 'Tasks from past days cannot be modified.',
                            icon: 'warning',
                            background: '#1e1e2e',
                            color: '#f8fafc',
                            iconColor: '#f59e0b',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        return todo;
                    }
                    
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

    // Filter todos by active day
    const filteredTodos = todoList.filter(todo => {
        const todoDay = formatDay(todo.createdAt);
        return todoDay === activeDay;
    });

    // Calculate progress for filtered todos
    const completedTasks = filteredTodos.filter(todo => todo.isComplete).length;
    const totalTasks = filteredTodos.length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Change active day
    const changeActiveDay = (day) => {
        setActiveDay(day);
        setShowDaySelector(false);
    };

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
            
            {/* Day selector */}
            <div className="relative mt-4">
                <div 
                    onClick={() => setShowDaySelector(!showDaySelector)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer bg-slate-800/60 text-slate-200"
                >
                    <div className="flex items-center gap-2">
                        <HiOutlineCalendarDays className="text-blue-400" />
                        <span>{activeDay}</span>
                    </div>
                    <FiChevronDown className={`transition-transform duration-300 ${showDaySelector ? 'rotate-180' : ''}`} />
                </div>
                
                {showDaySelector && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-1 overflow-hidden rounded-lg shadow-xl bg-slate-800"
                    >
                        {daysOfWeek.map((day) => (
                            <div 
                                key={day} 
                                onClick={() => changeActiveDay(day)}
                                className={`px-3 py-2 cursor-pointer hover:bg-slate-700 transition-colors ${
                                    day === activeDay ? 'bg-indigo-600/30 text-indigo-300' : 'text-slate-300'
                                }`}
                            >
                                {day}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
            
            {/* Status indicator */}
            {filteredTodos.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-3 ml-1"
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
            {filteredTodos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <MdOutlinePlaylistAddCheck className="mb-3 text-5xl text-slate-500" />
                    <p className="text-slate-500">No tasks for {activeDay}. Add some to get started!</p>
                </div>
            ) : (
                <>
                    <h2 className="pl-1 mb-3 text-sm font-medium tracking-wider uppercase text-slate-400">Your Tasks for {activeDay}</h2>
                    <div className="transition-all max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
                        <AnimatePresence>
                            {filteredTodos.map((item) => (
                                <TodoItems 
                                    key={item.id} 
                                    text={item.text} 
                                    id={item.id}  
                                    isComplete={item.isComplete} 
                                    deleteTodo={deleteTodo} 
                                    toggle={toggle} 
                                    createdAt={item.createdAt}
                                    time={formatDate(item.createdAt)}
                                    isPast={isPastTask(item.createdAt)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-4 text-xs border-t border-slate-700/50 text-slate-500">
                        <span>{filteredTodos.length} task{filteredTodos.length !== 1 ? 's' : ''} for {activeDay}</span>
                        <span>{filteredTodos.filter(todo => todo.isComplete).length} completed</span>
                    </div>
                </>
            )}
        </div>
    </motion.div>
  )
}
export default Todo