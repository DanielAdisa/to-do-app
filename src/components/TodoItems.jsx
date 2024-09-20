import { IoCheckbox } from "react-icons/io5";
import { MdIndeterminateCheckBox } from "react-icons/md"

const TodoItems = ({text, id, isComplete, deleteTodo}) => {
  return (
    <div className="flex items-center gap-2 my-3 ">
        <div className="flex items-center flex-1 cursor-pointer ">
           <IoCheckbox className="text-2xl w-7"/> 
           <p className=" text-stone-50 ml-4 text-[15px]">{text}</p>
          

        </div>
        <MdIndeterminateCheckBox onClick={()=>{deleteTodo(id)}} className="text-2xl w-7"/>
    </div>
  )
}
export default TodoItems