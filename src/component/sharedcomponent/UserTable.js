import React, { useEffect } from 'react';
import { getAllUser } from '../util/api';
import { useState } from 'react';
import Loader from './Loader';
import EditIcon from './EditIcon';
import DeleteIcon from './DeleteIcon';
import { deleteUser } from '../util/api';
import Alert from './Alert';
import EditUserModal from '../modal/EditUserModal';

export default function UserTable({ refreshUsers }) {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [alert, setAlert] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [statusCode, setStatuscode] = useState();
    const [editUserModal, setEditUserModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [refreshUsers]);

    const updatedUser = () => {
        fetchUser()
    }

    const fetchUser = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            'Authorization': `$Bearer ${token}`
        }
        try {
            setLoading(true)
            const response = await getAllUser(headers)
            if (response.status === 200) {
                setData(response.data)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    const toggleEdit = (id) => {
        setSelectedUserId(id)
        setEditUserModal((prev) => !prev);
    }

    const deleteUserFucn = async (id) => {
        const token = localStorage.getItem('token')
        const headers = {
            'Authorization': `$Bearer ${token}`
        }
        try {
            setLoading(true)
            const response = await deleteUser(id, headers)
            if (response.status === 200) {
                setAlert(true)
                setAlertMessage(response.data.message)
                setStatuscode(response.status)
                fetchUser()
            }
        } catch (error) {
            setAlert(true)
            setStatuscode(error.response.status)
            setAlertMessage(error.response ? error.response.data.message : 'Something went wrong!')
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 ">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
                    <Loader />
                </div>
            )}
            {alert && <Alert setAlert={setAlert} message={alertMessage} statusCode={statusCode} />}

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="border border-gray-300 px-2 py-2 text-center text-white text-xs sm:text-sm md:text-base">Name</th>
                            <th className="border border-gray-300 px-2 py-2 text-center text-white text-xs sm:text-sm md:text-base">User Name</th>
                            <th className="border border-gray-300 px-2 py-2 text-center text-white text-xs sm:text-sm md:text-base">Role</th>
                            <th className="border border-gray-300 px-2 py-2 text-center text-white text-xs sm:text-sm md:text-base">Created At</th>
                            <th className="border border-gray-300 px-2 py-2 text-center text-white text-xs sm:text-sm md:text-base">Updated At</th>
                            <th className="border border-gray-300 px-2 py-2 text-center text-white text-xs sm:text-sm md:text-base">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 text-center px-2 py-2 text-sm sm:text-base">{user.name}</td>
                                <td className="border border-gray-300 text-center px-2 py-2 text-sm sm:text-base">{user.userName}</td>
                                <td className="border border-gray-300 text-center px-2 py-2 text-sm sm:text-base">{user.role}</td>
                                <td className="border border-gray-300 text-center px-2 py-2 text-sm sm:text-base">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="border border-gray-300 text-center px-2 py-2 text-sm sm:text-base">{new Date(user.updatedAt).toLocaleDateString()}</td>
                                <td className="border border-gray-300 text-center px-2 py-2 text-sm sm:text-base">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => toggleEdit(user.id)}>
                                            <EditIcon />
                                        </button>
                                        <button onClick={() => deleteUserFucn(user.id)}>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editUserModal && <EditUserModal toggleEdit={toggleEdit} editUserModal={editUserModal} selectedUserId={selectedUserId} updatedUser={updatedUser} />}
        </div>
    );
}
