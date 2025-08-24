import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDepartments } from "../services/DepartmentService";

const EmployeeComponent = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: ""
  });

  useEffect(() => {
    getAllDepartments()
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstname);
          setLastname(response.data.lastname);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId || "");
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!firstname.trim()) {
      errorsCopy.firstname = "First name is required";
      valid = false;
    } else errorsCopy.firstname = "";

    if (!lastname.trim()) {
      errorsCopy.lastname = "Last name is required";
      valid = false;
    } else errorsCopy.lastname = "";

    if (!email.trim()) {
      errorsCopy.email = "Email is required";
      valid = false;
    } else errorsCopy.email = "";

    if (!departmentId) {
      errorsCopy.department = "Please select a department";
      valid = false;
    } else errorsCopy.department = "";

    setErrors(errorsCopy);
    return valid;
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const employee = { firstname, lastname, email, departmentId };
    if (id) {
      updateEmployee(id, employee)
        .then(() => navigate("/employees"))
        .catch((error) => console.error(error));
    } else {
      createEmployee(employee)
        .then(() => navigate("/employees"))
        .catch((error) => console.error(error));
    }
  }

  function pageTitle() {
    return id ? (
      <h2 className="text-center mb-4 text-primary fw-bold">✏️ Update Employee</h2>
    ) : (
      <h2 className="text-center mb-4 text-success fw-bold">➕ Add Employee</h2>
    );
  }

  return (
    <div className="container" style={{ minHeight: "80vh" }}>
      <div className="row justify-content-center align-items-center">
        <div className="card shadow-lg p-4 col-md-6">
          {pageTitle()}
          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                value={firstname}
                className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                value={lastname}
                className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                onChange={(e) => setLastname(e.target.value)}
              />
              {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Department</label>
              <select
                className={`form-select ${errors.department ? "is-invalid" : ""}`}
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <option value="">-- Select Department --</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
              {errors.department && <div className="invalid-feedback">{errors.department}</div>}
            </div>
            <div className="d-grid">
              <button
                className={`btn btn-lg ${id ? "btn-warning text-dark fw-bold" : "btn-success"}`}
                onClick={saveOrUpdateEmployee}
              >
                {id ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
