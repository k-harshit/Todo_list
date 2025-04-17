import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";   

const initialTasks = [
  { ID: 1, task: "Organize your workspace" },
  { ID: 2, task: "Call a friend or family member" },
  { ID: 3, task: "Read a chapter of a book" },
  { ID: 4, task: "Meditate for 10 minutes" },
  { ID: 5, task: "Take a 15-minute walk" },
  { ID: 6, task: "Review your monthly budget" },
  { ID: 7, task: "Backup your phone or computer" },
  { ID: 8, task: "Do a quick workout" },
  { ID: 9, task: "Organize your email inbox" },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [isCheck, setIsChecked] = useState({})

  const handleAddTask = (newTask) => {
    const newTaskObject = {
      ID: tasks.length + 1,
      task: newTask,
    };
    setTasks([newTaskObject, ...tasks]);
    toast.success("Task added successfully!")
  };

  const handleCheckChange = (id) => {
    setIsChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteTask = (ID) => {
    setTasks(tasks.filter((task) => task.ID !== ID))
    toast.success("Task deleted successfully!")
  };

  const handleDeleteSelected = () => {
      const uncheckedTasks = tasks.filter((task) => !isCheck[task.ID]);
      setTasks(uncheckedTasks);
      setIsChecked({});
      toast.success("Completed tasks deleted!")
  };

  const handleEditTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.ID === id ? { ...task, task: newText } : task
      )
    );
    toast.success("Task edited successfully!")
  };

  return (
    <div className="w-[400px] h-[700px] top-11 mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4 text-white text-center bg-blue-800">
        Tasker
      </h1>
      <TaskForm
        onAddTask={handleAddTask}
        onDeleteSelected={handleDeleteSelected}
        isCheck={isCheck}
      />
      <hr className="my-4" />
      <TaskList
        tasks={tasks}
        isCheck={isCheck}
        onCheckChange={handleCheckChange}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
      <ToastContainer
        style={{width:350}}
        position="bottom-center"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
      />
    </div>
  );
}

