import { LuListTodo } from "react-icons/lu";
import { RiMenuAddFill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import TodoItems from "./TodoItems";
import { useRef, useState } from "react";

const Todo = () => {
 
    const [todoList,setTodoList] = useState([]);

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
            return prevTodos.filter((todo)=>todo.id!== id)
        })
    }

  return (
    <div className="flex flex-col w-11/12 max-w-md border bg-gradient-to-br from-stone-500 to-stone-800 border-stone-300 place-self-center p-7 min-h-fit rounded-xl">
        
        {/* Title */}
        
        <div className="flex items-center gap-2 mt-7">
        <LuListTodo className="text-3xl " />
        <h1 className="text-xl font-semibold ">To-Do List</h1>
        </div>

        {/* Input Field */}
        <div className="flex items-center justify-center text-sm rounded-md my-7 bg-stone-200 text-stone-300">
            <input ref={inputRef} className="flex-1 pl-6 pr-2 bg-transparent border-0 outline-none text-slate-800 h-14 placeholder:text-slate-800" type="text" placeholder="What do you want to get done?"/>
            <button  onClick={add} className="flex items-center p-4 font-semibold border-none rounded-md cursor-pointer text-md bg-stone-900 w-30 h-14">Add Task{" "}<MdOutlinePlaylistAddCheck className="ml-1 text-xl " /></button>
        </div>
        
            {/* To-Do List */}

            <div>
                {todoList.map((item, index) =>{
                    return <TodoItems key={index} text={item.text} id={item.id}  isComplete={item.isComplete} deleteTodo={deleteTodo} />
                })}
                {/* <TodoItems text={"Well Hello There"} />
                <TodoItems text={"Eat 4 Eggs"}/> */}
            </div>

    </div>
  )
}
export default Todo