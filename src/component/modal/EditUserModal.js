import React, { useEffect } from "react";
import { useState } from "react";
import Alert from "../sharedcomponent/Alert";
import Loader from "../sharedcomponent/Loader";
import { getUser } from "../util/api";
import { updateUser } from "../util/api";

export default function EditUserModal({
  toggleEdit,
  editUserModal,
  selectedUserId,
  updatedUser,
}) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [statusCode, setStatuscode] = useState();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!regex.test(email)) {
      setEmailError("Please use a valid @gmail.com email address");
    } else {
      setEmailError("");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `$Bearer ${token}`,
      };
      try {
        setLoading(true);
        const response = await getUser(selectedUserId, headers);

        if (response.status === 200) {
          setName(response.data[0].name);
          setUsername(response.data[0].userName);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [selectedUserId]);

  const update = async (e) => {
    e.preventDefault();
    if (!emailError) {
      const data = {
        userName: username.toLocaleLowerCase(),
        name: name,
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `$Bearer ${token}`,
      };
      try {
        setLoading(true);
        const response = await updateUser(selectedUserId, data, headers);
        if (response.status === 200) {
          setAlertMessage(response.data.message);
          setAlert(true);
          setStatuscode(response.status);
          toggleEdit();
          updatedUser();
        }
      } catch (error) {
        setStatuscode(error.response.status);
        setAlertMessage(
          error.response ? error.response.data.message : "Something went wrong!"
        );
        setAlert(true);
      } finally {
        setLoading(false);
      }
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
          editUserModal ? "visible opacity-100" : "invisible opacity-0"
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
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-slate-100 rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-black">
                Edit User
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
                onClick={toggleEdit}
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
            <div className="p-4 md:p-5 space-y-4">
              <div className="  sm:w-full sm:max-w-full">
                <form className="space-y-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          validateEmail(e.target.value);
                        }}
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    {emailError && (
                      <div className="mt-2 text-sm text-red-500">
                        {emailError}
                      </div>
                    )}
                  </div>

                  <div></div>
                </form>
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="static-modal"
                type="button"
                className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={update}
              >
                Update
              </button>
              <button
                data-modal-hide="static-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-red-500 rounded-lg border border-transparent hover:bg-red-600 focus:z-10 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 dark:bg-red-700 dark:hover:bg-red-800"
                onClick={toggleEdit}
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
