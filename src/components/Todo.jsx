import { LuListTodo } from "react-icons/lu";
import { RiMenuAddFill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import TodoItems from "./TodoItems";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Todo = () => {
 
    const [todoList,setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

    const add = ()=>{
        const inputText = inputRef.current.value.trim();

        if (inputText === ""){
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev)=>[...prev,newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id)=>{
        setTodoList((prevTodos)=>{
            alert("Are you sure you want to delete?")
            return prevTodos.filter((todo)=>todo.id!== id)
        })
    }

    const toggle = (id)=>{
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete:!todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList));
    },[todoList])

  return (
    <motion.div 
    whileInView={{opacity: 1, y:0}}
        initial={{opacity:0 , y:-50}}
        transition={{duration:1 }}
    className="flex flex-col w-11/12 max-w-md transition-all border bg-gradient-to-l from-[#6c757d] to-[#212529] border-stone-300 place-self-center p-7 min-h-fit rounded-xl">
        
        {/* Title */}
        
        <motion.div 
            // whileInView={{opacity: 1, x:0}}
            // initial={{opacity:0 , x:-50}}
            // transition={{duration:1 }}
        className="flex items-center gap-2 transition-all mt-7">
        <LuListTodo className="text-3xl transition-all " />
        <h1 className="text-2xl font-bold tracking-tighter transition-all text-slate-300">To-Do List</h1>
        </motion.div>

        {/* Input Field */}
        <div className="flex items-center justify-center text-sm transition-all rounded-md my-7 bg-stone-200 text-stone-300">
            <input ref={inputRef} className="flex-1 pl-6 pr-2 transition-all bg-transparent border-0 outline-none text-slate-800 h-14 placeholder:text-slate-800" type="text" placeholder="What do you want to get done?"/>
            <button  onClick={add} className="flex items-center p-4 font-semibold transition-all border-none rounded-md cursor-pointer text-md bg-stone-900 w-30 h-14">Add Task{" "}<MdOutlinePlaylistAddCheck className="ml-1 text-xl " /></button>
        </div>
        
            {/* To-Do List */}

            <div className="transition-all">
                {todoList.map((item, index) =>{
                    return <TodoItems key={index} text={item.text} id={item.id}  isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
                })}
                {/* <TodoItems text={"Well Hello There"} />
                <TodoItems text={"Eat 4 Eggs"}/> */}
            </div>

    </motion.div>
  )
}
export default Todo