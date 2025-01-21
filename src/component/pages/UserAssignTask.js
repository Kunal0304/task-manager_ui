import React from 'react'
import Navbar from '../sharedcomponent/Navbar'
import TaskBoard from '../sharedcomponent/TaskBoard'

export default function UserAssignTask() {
    const name = localStorage.getItem('name')
    const role = localStorage.getItem('role')

    return (
        <div>
            <Navbar name={name} role={role} />
            <div style={{paddingTop:'70px'}}>
            <TaskBoard  role={role} />
            </div>
        </div>
    )
}
