import React, { useState } from "react";
import Navbar from "../sharedcomponent/Navbar";
import TaskBoard from "../sharedcomponent/TaskBoard";
import CustomTaskModal from "../modal/CustomTaskModal";

export default function Task() {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const [addTask, setAddTask] = useState(false);
  const [isCount, isSetCount] = useState({});

  const addTaskToggle = () => {
    setAddTask((prev) => !prev);
  };

  const { todoCount, inProgressCount, completedCount } = isCount;

  return (
    <div>
      <Navbar name={name} role={role} />

      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "20px",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold">To-Do</h3>
            <p className="text-2xl font-bold">{todoCount}</p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold">In Progress</h3>
            <p className="text-2xl font-bold">{inProgressCount}</p>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold">Completed</h3>
            <p className="text-2xl font-bold">{completedCount}</p>
          </div>
        </div>

        <div className="flex justify-end w-full mt-4">
          {role === "Admin" && (
            <button
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
              onClick={addTaskToggle}
            >
              Add Task
            </button>
          )}
        </div>
      </div>

      <div style={{ paddingTop: "130px" }} className="px-20">
        <TaskBoard addTask={addTask} role={role} isSetCount={isSetCount} />
      </div>
      <CustomTaskModal toggleModal={addTaskToggle} addTask={addTask} />
    </div>
  );
}
