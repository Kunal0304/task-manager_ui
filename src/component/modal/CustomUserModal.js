import React from "react";
import { useState } from "react";
import Alert from "../sharedcomponent/Alert";
import Loader from "../sharedcomponent/Loader";
import { postUser, updateUser } from "../util/api";
import { useNavigate } from "react-router-dom";

export default function CustomUserModal({
  userModal,
  selectedUser,
  toggleModal,
  updatedUserList,
  isEditMode
}) {
  const [name, setName] = useState(selectedUser?.name ||"");
  const [userName, setUserName] = useState(selectedUser?.userName ||"");
  const [password, setPassword] = useState("");
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState();
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [statusCode, setStatusCode] = useState();
  const navigate = useNavigate ();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!regex.test(email)) {
      setEmailError("Please use a valid @gmail.com email address");
    } else {
      setEmailError("");
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrengthMessage === "Strong password") {
      return "text-green-500";
    } else if (passwordStrengthMessage === "Medium password") {
      return "text-yellow-500";
    } else if (passwordStrengthMessage === "Weak password") {
      return "text-red-500";
    }
    return "";
  };

  const calculatePasswordStrength = (password) => {
    const strength = password.length;

    // Add additional checks for password strength
    if (strength >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      setPasswordStrengthMessage("Strong password");
      setIsPasswordValid(true);
    } else if (strength >= 6) {
      setPasswordStrengthMessage("Medium password");
      setIsPasswordValid(false);
    } else {
      setPasswordStrengthMessage("Weak password");
      setIsPasswordValid(false);
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!emailError) {
    const data = {
      userName: userName.toLowerCase(),
      name: name,
    };

    if (password && !isEditMode) {
      data.passWord = password;
      data.role = "User";
    }
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      setLoading(true);
      let response;
      if (isEditMode) {
        response = await updateUser(selectedUser.id, data, headers);
      } else {
        response = await postUser(data, headers);
      }
      if (response.status === 200) {
        setAlertMessage(response.data.message);
        setAlert(true);
        setStatusCode(response.status);
        toggleModal();
        updatedUserList();
      }
    } catch (error) {
      setStatusCode(error.response.status);
      setAlertMessage(
        error.response ? error.response.data.message : "Something went wrong!"
      );
      setAlert(true);
      if (error.response && error.response.status === 401) {
        navigate("/unauthorized");
      }
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
          userModal ? "visible opacity-100" : "invisible opacity-0"
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
              {isEditMode ? "Edit" : "Add"} User  
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
                onClick={toggleModal}
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
                        value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value);
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
                  {!isEditMode && (<div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        value={password}
                        onChange={(e) => {
                          const newPassword = e.target.value;
                          setPassword(newPassword);
                          calculatePasswordStrength(newPassword);
                        }}
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    {password && (
                      <div
                        className={`mt-2 text-sm ${getPasswordStrengthColor()}`}
                      >
                        {passwordStrengthMessage}
                      </div>
                    )}
                  </div>)}
                  {!isPasswordValid && password && (
                    <div
                      className="text-sm text-gray-500 mt-2"
                      style={{ color: "red" }}
                    >
                      Password must be at least 8 characters long, contain at
                      least one uppercase letter, and one number.
                    </div>
                  )}

                  <div></div>
                </form>
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="static-modal"
                type="button"
                className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handleSubmit}
              >
                {isEditMode ? "Update" : "Create"}
              </button>
              <button
                data-modal-hide="static-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-red-500 rounded-lg border border-transparent hover:bg-red-600 focus:z-10 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 dark:bg-red-700 dark:hover:bg-red-800"
                onClick={toggleModal}
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
