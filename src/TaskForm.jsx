import { useState } from "react";

export default function TaskForm({ onAddTask, onDeleteSelected, isCheck }) {
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [isInputBoxVisible, setIsInputBoxVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTask.trim().length < 6) {
      setError("Task must be at least 6 characters long.");
      return;
    }
    if (newTask.length > 60) {
      setError("Task cannot exceed 60 characters.");
      return;
    }

    onAddTask(newTask);
    setNewTask("");
    setError("");
    setIsInputBoxVisible(false);
  };

  const isAnyTaskSelected = Object.values(isCheck).some((checked) => checked);

  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-3xl">Today</h1>
      <div className="flex justify-end items-center">
        <button
          className="text-blue-500 hover:text-blue-600 focus:outline-none"
          onClick={() => setIsInputBoxVisible(true)}
        >
          <span className="material-icons text-3xl">add_circle</span>
        </button>
        {/* Add task Modal */}
        {isInputBoxVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-5 w-[80%] max-w-[350px]">
              <h3 className="text-lg font-semibold mb-4 text-left">Add Todo</h3>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="resize-none w-full h-[148px] border border-gray-300 rounded-[10px] p-2 outline-none text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your task here..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                {error && (
                  <div className="text-red-500 text-xs mt-2">{error}</div>
                )}
                <div className="flex justify-end mt-4 gap-2">
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-900"
                    onClick={() => {
                      setIsInputBoxVisible(false);
                      setNewTask("");
                      setError("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/*Selected delete task Modal */}
        {isAnyTaskSelected && (
          <button
            className="text-red-500 hover:text-red-600 focus:outline-none ml-4"
            onClick={() => setIsDeleteModalVisible(true)}
          >
            <span className="material-icons text-3xl">delete</span>
          </button>
        )}

        {isDeleteModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-5 w-[90%] max-w-[300px]">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Are you sure you want to delete the selected tasks?
              </p>
              <div className="flex justify-around">
                <button
                  className="text-red-500 hover:text-red-800"
                  onClick={() => setIsDeleteModalVisible(false)}
                >
                  Cancel
                </button>
                <button
                  className="text-red-500 hover:text-red-800"
                  onClick={() => {
                    onDeleteSelected();
                    setIsDeleteModalVisible(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
