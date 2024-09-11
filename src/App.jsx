import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import reactLogo from "./assets/react.svg";
import { RiDeleteBin5Fill } from "react-icons/ri";

function App() {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [lists, setLists] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFinished, setShowFinished] = useState(false);// State for the Show Finished checkbox

  //-------------------------------------------------------------------
  const changeDay = async () => {
    let now = new Date();
    let optionsDay = { weekday: "long" };
    let formattedDay = now.toLocaleDateString("en-US", optionsDay);
    setDay(formattedDay);
  };

  const changeDate = async () => {
    let now = new Date();
    const optionsdate = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = now.toLocaleDateString("en-US", optionsdate);
    setDate(formattedDate);
  };

  useEffect(() => {
    const loadDayAndDate = async () => {
      await changeDay();
      await changeDate();
      setLoading(false);
    };

    loadDayAndDate();
  }, []);

  //---------------------------------------------------------
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const addList = () => {
    if (todo.trim() !== "") {
      const newList = [...lists, { text: todo, completed: false }];
      setLists(newList);
      setTodo("");
      localStorage.setItem("todos", JSON.stringify(newList));
    }
  };

  //----------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(lists));
  }, [lists]);

  //----------------------------------------------------------------
  const handleRemoveItem = (index) => {
    const updatedLists = lists.filter((_, i) => i !== index);
    setLists(updatedLists);
  };

  const handleCheckboxChange = (index) => {
    const updatedLists = lists.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setLists(updatedLists);
  };

  const handleShowFinishedChange = () => {
    setShowFinished((prev) => !prev);
  };

  //--------------------------------------------------------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <h1>Loading...</h1>
      </div>
    );
  }

  // Filter todos based on the "Show Finished" checkbox state
  const displayedTodos = showFinished
    ? lists.filter((item) => item.completed)
    : lists;

  return (
    <>
      <div className="bg-gradient-to-r from-[#de98af] to-[#e75283] h-screen w-[100%] font-display">
        <Navbar />
        <main className="flex justify-center h-screen">
          <main className="max-w-2/5 h-3/4 mt-10 flex flex-col items-center bg-gradient-to-r from-[#42454a] to-[#242930] rounded-md shadow-2xl">
            <h2 className="text text-white text-lg m-2 border-b-2 border-[#353B42] min-h-10">
              myTodo - Manage your todos at one place
            </h2>
            <div className="day flex flex-col items-center">
              <div className="text-4xl text-white">{day}</div>
              <div className="text-xl text-[#575D65]">{date}</div>
            </div>
            <div className="input w-full flex justify-evenly items-center flex-col h-28">
              <input
                type="text"
                value={todo}
                onChange={handleInputChange}
                placeholder="Add a task.."
                className="bg-[#343A40] h-8 w-80 p-3 text-white rounded-md shadow-2xl"
              />
              <button
                onClick={addList}
                className=" bg-gradient-to-r from-[#262c32] to-[#393c3f] h-8 text-white w-32 rounded-md shadow-2xl"
              >
                Save
              </button>
            </div>

            <span className="flex flex-row items-center">
              <input
                type="checkbox"
                className="mt-1"
                checked={showFinished}
                onChange={handleShowFinishedChange}
              />
              <p className="ml-2 text-white">Show Finished</p>
            </span>
            <div className="lists w-full">
              <p className="pl-4 font-medium text-white">Your Todos</p>
              <div className="todos">
                {displayedTodos.map((item, index) => (
                  <div
                    key={index}
                    className="todo text-white pl-3 flex flex-row items-center justify-between"
                  >
                    <span className="flex flex-row items-center">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleCheckboxChange(index)}
                        className="mt-1"
                      />
                      <p
                        className={`ml-2 font-display ${
                          item.completed ? "line-through" : ""
                        }`}
                      >
                        {item.text}
                      </p>
                    </span>
                    <span className="edit">
                      <button
                        className="bg-[#e75283] text-white h-5 w-5 mr-4 flex items-center justify-center rounded-sm"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </main>
      </div>
    </>
  );
}

export default App;
