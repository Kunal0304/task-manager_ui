import React, { useEffect, useState } from "react";
import Alert from "../sharedcomponent/Alert";
import Loader from "../sharedcomponent/Loader";
import { getAllUser } from "../util/api";
import { updateTask } from "../util/api";
import { getTaskById } from "../util/api";
import Select from "react-select";

export default function EditTaskModal({
  editTaskToggle,
  editTask,
  toRefresh,
  taskId,
}) {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [statusCode, setStatusCode] = useState();
  const [userData, setUserData] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignedUsers: [],
    dueDate: "",
    status: "Todo",
  });
  const [errors, setErrors] = useState({});

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      setLoading(true);
      const response = await getAllUser(headers);
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        setLoading(true);
        const response = await getTaskById(taskId, headers);
        if (response.status === 200) {
          const task = response.data;
          const formattedDueDate = task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : "";

          setTaskData({
            ...task,
            dueDate: formattedDueDate,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleChange = (e, fieldName) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setTaskData({ ...taskData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    } else if (e && e.map) {
      const selectedUsers = e.map((option) => option.value);
      setTaskData({ ...taskData, assignedUsers: selectedUsers });
      setErrors({ ...errors, [fieldName]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!taskData.title) newErrors.title = "Title is required";
    if (!taskData.description)
      newErrors.description = "Description is required";
    if (taskData.assignedUsers.length === 0)
      newErrors.assignedUsers = "At least one user must be assigned";
    if (!taskData.dueDate) newErrors.dueDate = "Due date is required";
    if (!taskData.priority) newErrors.priority = "Priority is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateTaskButton = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      setLoading(true);
      const response = await updateTask(taskId, taskData, headers);
      if (response.status === 200) {
        setAlertMessage(response.data.message);
        setAlert(true);
        setStatusCode(response.status);
        editTaskToggle();
        toRefresh();
      }
    } catch (error) {
      setStatusCode(error.response?.status || 500);
      setAlertMessage(error.response?.data?.message || "Something went wrong!");
      setAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50 transition-opacity ${
          editTask ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {alert && (
          <Alert
            setAlert={setAlert}
            message={alertMessage}
            statusCode={statusCode}
          />
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
            <Loader />
          </div>
        )}
        <div className="relative p-4 w-full max-w-2xl h-[90vh]">
          <div className="relative bg-slate-100 rounded-lg shadow max-h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                Edit Task
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
                onClick={editTaskToggle}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter task title"
                  />
                  {errors.title && (
                    <span className="text-sm text-red-500">{errors.title}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="priority"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={taskData.priority}
                      onChange={handleChange}
                      className={`mt-1 block w-full p-2 border ${
                        errors.priority ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    {errors.priority && (
                      <span className="text-sm text-red-500">
                        {errors.priority}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="dueDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={taskData.dueDate}
                      onChange={handleChange}
                      className={`mt-1 block w-full p-2 border ${
                        errors.dueDate ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.dueDate && (
                      <span className="text-sm text-red-500">
                        {errors.dueDate}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="assignedUsers"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assigned User(s)
                  </label>
                  <Select
                    isMulti
                    id="assignedUsers"
                    name="assignedUsers"
                    options={
                      userData &&
                      userData.map((user) => ({
                        value: user.userName,
                        label: user.userName,
                      }))
                    }
                    value={taskData.assignedUsers.map((user) => ({
                      value: user,
                      label: user,
                    }))}
                    onChange={(selectedOptions) => {
                      setTaskData({
                        ...taskData,
                        assignedUsers: selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : [],
                      });
                    }}
                    className={`mt-1 block w-full p-2 border ${
                      errors.assignedUsers
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.assignedUsers && (
                    <span className="text-sm text-red-500">
                      {errors.assignedUsers}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    rows={3}
                    className={`mt-1 block w-full p-2 border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter task description"
                  />
                  {errors.description && (
                    <span className="text-sm text-red-500">
                      {errors.description}
                    </span>
                  )}
                </div>
              </form>
            </div>
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="static-modal"
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={updateTaskButton}
              >
                Update
              </button>
              <button
                data-modal-hide="static-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-red-500 rounded-lg border border-transparent hover:bg-red-600 focus:z-10 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 dark:bg-red-700 dark:hover:bg-red-800"
                onClick={editTaskToggle}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
