import { IoCheckbox } from "react-icons/io5";
import { MdIndeterminateCheckBox } from "react-icons/md"

const TodoItems = ({text, id, isComplete, deleteTodo, toggle}) => {
  return (
    <div className="flex items-center gap-2 my-3 transition-all">
        <div onClick={()=>{toggle(id)}} className="flex items-center flex-1 transition-all cursor-pointer ">
          <IoCheckbox className={isComplete? "text-green-700 text-3xl w-7 transition-all antialiased":"text-red-500 transition-all text-2xl w-7"}/>
           {/* <IoCheckbox className="text-2xl w-7"/>  */}
           <p className=" text-stone-50 ml-4 text-[15px]">{text}</p>
          

        </div>
        
        <MdIndeterminateCheckBox  onClick={()=>{deleteTodo(id)}} className="text-2xl w-7"/>
    </div>
  )
}
export default TodoItems