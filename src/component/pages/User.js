import React, { useState } from "react";
import Navbar from "../sharedcomponent/Navbar";
import UserTable from "../sharedcomponent/UserTable";
import CustomUserModal from "../modal/CustomUserModal";

export default function User() {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const [userModal, setUserModal] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const toggleUserModal = () => {
    setUserModal((prev) => !prev);
  };

  const handleUserAdded = () => {
    setRefreshUsers((prev) => !prev);
  };

  return (
    <div>
      <Navbar name={name} role={role} />
      <div style={{ padding: "40px" }}>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "20px",
          }}
        >
          <button
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
            onClick={toggleUserModal}
          >
            Add User
          </button>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <div style={{ width: "100%", maxWidth: "1400px" }}>
            <UserTable refreshUsers={refreshUsers} />
          </div>
        </div>
      </div>
      {userModal && (
        <CustomUserModal
          isEditMode={false}
          userModal={userModal}
          toggleModal={toggleUserModal}
          updatedUserList={handleUserAdded}
        />
      )}
    </div>
  );
}
