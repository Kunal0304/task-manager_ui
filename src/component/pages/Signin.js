import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../sharedcomponent/Loader";
import Alert from "../sharedcomponent/Alert";
import { signIn } from "../util/api";
export default function Signin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [statusCode, setStatuscode] = useState();

  const validateEmail = (email) => {
    // Check if email contains @gmail.com
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!regex.test(email)) {
      setEmailError("Please use a valid @gmail.com email address");
    } else {
      setEmailError("");
    }
  };

  const signin = async (e) => {
    e.preventDefault();
    if (!emailError) {
      const data = {
        userName: username.toLowerCase(),
        passWord: password,
      };
      try {
        setLoading(true);
        const response = await signIn(data);
        if (response.status === 200) {
          setAlert(true);
          setPassword("");
          setUsername("");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("name", response.data.name);
          setAlertMessage(response.data.message);
          setStatuscode(response.status);
          if (response.data.role) {
            navigate("/task");
          }
        }
      } catch (error) {
        console.log("error", error);
        setAlert(true);

        setStatuscode(error?.response?.status);
        setAlertMessage(
          error.response
            ? error?.response?.data?.message
            : "Something went wrong!"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
          <Loader />
        </div>
      )}
      {alert && (
        <Alert
          setAlert={setAlert}
          message={alertMessage}
          statusCode={statusCode}
        />
      )}

      <div
        className="sm:mx-auto sm:w-full sm:max-w-md rounded-lg bg-slate-300 p-8"
        style={{
          boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)", // Box shadow applied only to this div
        }}
      >
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Log in
        </h2>

        <form onSubmit={signin} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
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
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
              />
            </div>
            {emailError && (
              <div className="mt-2 text-sm text-red-500">{emailError}</div>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
        
          <a
            href="/signup"
            className="font-semibold text-slate-800 hover:text-slate-700"
          >
           Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
