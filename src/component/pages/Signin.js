import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../sharedcomponent/Loader';
import Alert from '../sharedcomponent/Alert';
import { signIn } from '../util/api';
export default function Signin() {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [statusCode, setStatuscode] = useState();



    const validateEmail = (email) => {
        // Check if email contains @gmail.com
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!regex.test(email)) {
            setEmailError('Please use a valid @gmail.com email address');
        } else {
            setEmailError('');
        }
    };

    const signin = async (e) => {
        e.preventDefault()
        if (!emailError) {
            const data = {
                userName: username.toLowerCase(),
                passWord: password,

            }
            try {
                setLoading(true)
                const response = await signIn(data)
                if (response.status === 200) {
                    setAlert(true)
                    setPassword('')
                    setUsername('')
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.role)
                    localStorage.setItem('name', response.data.name)
                    setAlertMessage(response.data.message)
                    setStatuscode(response.status)
                    if (response.data.role === 'Admin') {
                        navigate("/task");
                    }
                    else {
                        navigate("/userassigntask");
                    }
                }
            } catch (error) {
                console.log("error", error)
                setAlert(true)

                setStatuscode(error.response.status)
                setAlertMessage(error.response ? error.response.data.message : 'Something went wrong!')
            }
            finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
                    <Loader />
                </div>
            )}
            {alert && <Alert setAlert={setAlert} message={alertMessage} statusCode={statusCode} />} 

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={signin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
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
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
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
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>


                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?{' '}
                    <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}
