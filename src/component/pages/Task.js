import React, { useState } from "react";
import Navbar from "../sharedcomponent/Navbar";
import TaskBoard from "../sharedcomponent/TaskBoard";
import CustomTaskModal from "../modal/CustomTaskModal";

export default function Task() {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const [addTask, setAddTask] = useState(false);

  const addTaskToggle = () => {
    setAddTask((prev) => !prev);
  };

  return (
    <div>
      <Navbar name={name} role={role} />
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          padding: "20px",
        }}
      >
        <div>
          <button
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
            onClick={addTaskToggle}
          >
            Add Task
          </button>
        </div>
      </div>
      <div style={{ paddingTop: "70px" }} className="px-20">
        <TaskBoard addTask={addTask} role={role} />
      </div>
      <CustomTaskModal toggleModal={addTaskToggle} addTask={addTask} />
    </div>
  );
}
