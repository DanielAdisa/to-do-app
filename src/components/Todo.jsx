import { LuListTodo } from "react-icons/lu";
import { RiMenuAddFill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import TodoItems from "./TodoItems";
import { useRef } from "react";

const Todo = () => {

    const inputRef = useRef();

    const add = ()=>{
        const inputText = inputRef.current.value.trim();
        console.log(inputText);
    }

  return (
    <div className=" bg-gradient-to-br from-stone-500 to-stone-800 border border-stone-300 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-fit rounded-xl">
        
        {/* Title */}
        
        <div className=" flex items-center mt-7 gap-2">
        <LuListTodo className=" text-3xl" />
        <h1 className=" text-xl font-semibold">To-Do List</h1>
        </div>

        {/* Input Field */}
        <div className=" text-sm flex items-center my-7 rounded-md bg-stone-200 justify-center text-stone-300">
            <input ref={inputRef} className=" bg-transparent border-0 outline-none text-slate-800 flex-1 h-14 pl-6 pr-2 placeholder:text-slate-800" type="text" placeholder="What do you want to get done?"/>
            <button  onClick={add} className="  text-md font-semibold p-4 flex items-center border-none rounded-md bg-stone-900  w-30 h-14 cursor-pointer">Add Task{" "}<MdOutlinePlaylistAddCheck className=" ml-1 text-xl" /></button>
        </div>
        
            {/* To-Do List */}

            <div>
                <TodoItems text={"Well Hello There"} />
                <TodoItems text={"Eat 4 Eggs"}/>
            </div>

    </div>
  )
}
export default Todo