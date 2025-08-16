import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(()=>{
    if(id){
        getEmployee(id).then((response)=>{
            setFirstName(response.data.firstname);
            setLastname(response.data.lastname);
            setEmail(response.data.email);
        }).catch(error=>{
            console.error(error);
        })
    }
  })
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstname.trim()) {
      errorsCopy.firstname = "";
    } else {
      errorsCopy.firstname = "first name is required";
      valid = false;
    }
    if (lastname.trim()) {
      errorsCopy.lastname = "";
    } else {
      errorsCopy.lastname = "last name is required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "email is required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstname, lastname, email };
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function pageTitle() {
    return id ? (
      <h2 className="text-center mb-4 text-primary">Update Employee</h2>
    ) : (
      <h2 className="text-center mb-4 text-success">Add Employee</h2>
    );
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow-lg p-4 w-50">
        {pageTitle()}
        <form>
          <div className="mb-3">
            <label className="form-label fw-semibold">First Name</label>
            <input
              type="text"
              placeholder="Enter employee first name"
              name="firstname"
              value={firstname}
              className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstname && (
              <div className="invalid-feedback">{errors.firstname}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              type="text"
              placeholder="Enter employee last name"
              name="lastname"
              value={lastname}
              className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
              onChange={(e) => setLastname(e.target.value)}
            />
            {errors.lastname && (
              <div className="invalid-feedback">{errors.lastname}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter employee email"
              name="email"
              value={email}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="d-grid">
            <button
              className={`btn btn-lg ${
                id ? "btn-warning text-dark fw-bold" : "btn-primary"
              }`}
              onClick={saveOrUpdateEmployee}
            >
              {id ? "Update Employee" : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeComponent;
