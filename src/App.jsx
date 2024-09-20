import Todo from "./components/Todo"

const App = () => {
  return (
    <div className="overflow-x-hidden antialiased transition-all text-stone-300">
      <div className="fixed inset-0 transition-all -z-10">
        {/* Back Ground */}
      <div class=" transition-all absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      </div>
      <div className="grid min-h-screen py-4 transition-all">
        <Todo />
      </div>
    </div>
  )
}
export default App