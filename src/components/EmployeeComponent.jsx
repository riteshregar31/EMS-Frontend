import React, { useState } from "react";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  function saveEmployee(e) {
    e.preventDefault();
    const employee = { firstName, lastName, email };
    console.log(employee);
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center mb-4 text-primary">Add Employee</h2>
        <form>
          <div className="mb-3">
            <label className="form-label fw-semibold">First Name</label>
            <input
              type="text"
              placeholder="Enter employee first name"
              name="firstName"
              value={firstName}
              className="form-control"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              type="text"
              placeholder="Enter employee last name"
              name="lastName"
              value={lastName}
              className="form-control"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter employee email"
              name="email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary btn-lg" onClick={saveEmployee}>
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeComponent;
