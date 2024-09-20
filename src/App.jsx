import Todo from "./components/Todo"

const App = () => {
  return (
    <div className=" overflow-x-hidden text-stone-300 antialiased">
      <div className="fixed inset-0 -z-10">
        {/* Back Ground */}
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      </div>
      <div className="grid py-4 min-h-screen">
        <Todo />
      </div>
    </div>
  )
}
export default App