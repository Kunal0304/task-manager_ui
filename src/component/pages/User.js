import React, { useState } from 'react';
import Navbar from '../sharedcomponent/Navbar';
import UserTable from '../sharedcomponent/UserTable';
import AddUserModal from '../modal/AddUserModal';

export default function User() {
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role')
    const [userModal, setUserModal] = useState(false);
    const [refreshUsers, setRefreshUsers] = useState(false);

    const toggleUserModal = () => {
        setUserModal((prev) => !prev);
    };

    const handleUserAdded = () => {
        toggleUserModal();
        setRefreshUsers((prev) => !prev); 
    };

    return (
        <div>
            <Navbar name={name}  role={role}/>
            <div style={{ padding: '40px' }}>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={toggleUserModal}
                    >
                        Add User
                    </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <div style={{ width: '100%', maxWidth: '1200px' }}>
                        <UserTable refreshUsers={refreshUsers} />
                    </div>
                </div>
            </div>
            {userModal && <AddUserModal toggleModal={toggleUserModal} userModal={userModal} handleUserAdded={handleUserAdded} />}
        </div>
    );
}
