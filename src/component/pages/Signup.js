import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../sharedcomponent/Loader';
import Alert from '../sharedcomponent/Alert';
import { addAdmin } from '../util/api';

export default function Signup() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordStrengthMessage, setPasswordStrengthMessage] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState()
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [statusCode, setStatuscode] = useState();





    const calculatePasswordStrength = (password) => {
        const strength = password.length;

        // Add additional checks for password strength
        if (strength >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
            setPasswordStrengthMessage('Strong password');
            setIsPasswordValid(true)
        } else if (strength >= 6) {
            setPasswordStrengthMessage('Medium password');
            setIsPasswordValid(false)
        } else {
            setPasswordStrengthMessage('Weak password');
            setIsPasswordValid(false)
        }
    };

    // Function to apply colors based on password strength
    const getPasswordStrengthColor = () => {
        if (passwordStrengthMessage === 'Strong password') {
            return 'text-green-500';
        } else if (passwordStrengthMessage === 'Medium password') {
            return 'text-yellow-500';
        } else if (passwordStrengthMessage === 'Weak password') {
            return 'text-red-500';
        }
        return '';
    };


    const validateEmail = (email) => {
        // Check if email contains @gmail.com
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!regex.test(email)) {
            setEmailError('Please use a valid @gmail.com email address');
        } else {
            setEmailError('');
        }
    };

    const signup = async (e) => {
        e.preventDefault()
        if (isPasswordValid && !emailError) {
            const data = {
                userName: username.toLocaleLowerCase(),
                passWord: password,
                role: 'Admin',
                name: name

            }
            try {
                setLoading(true)
                const response = await addAdmin(data)
                if (response.status === 200) {
                    setPassword('')
                    setUsername('')
                    setName('')
                    setAlertMessage(response.data.message)
                    setAlert(true)
                    setStatuscode(response.status)

                    navigate("/");

                }
            } catch (error) {

                setStatuscode(error.response.status)
                setAlertMessage(error.response ? error.response.data.message : 'Something went wrong!')
                setAlert(true)
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
                    Sign up for a new account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={signup} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
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
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                    validateEmail(e.target.value);
                                }
                                }
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
                            <div className={`mt-2 text-sm ${getPasswordStrengthColor()}`}>
                                {passwordStrengthMessage}
                            </div>
                        )}
                    </div>
                    {!isPasswordValid && password && (
                        <div className="text-sm text-gray-500 mt-2" style={{ color: 'red' }}>
                            Password must be at least 8 characters long, contain at least one uppercase letter, and one number.
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Already a member?{' '}
                    <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    )
}
