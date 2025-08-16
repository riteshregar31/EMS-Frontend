import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
useEffect(()=>{
    getAllEmployees()}
,[])


  function getAllEmployees()  {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEmployee() {
    navigate("/add-employee");
  }

  function updateEmployee(id) {
    navigate(`/edit-employees/${id}`);
  }

  function removeEmployee(id){
  deleteEmployee(id).then((response)=>{
getAllEmployees();
  }).catch(error=>{
    console.error(error);
  })
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
       <div 
  className="card-header text-center" 
  style={{ 
    background: "linear-gradient(90deg, #0d6efd, #6f42c1)", 
    color: "#fff" 
  }}
>
  <h3 className="mb-0 fw-bold">👨‍💼 Employee Directory</h3>
</div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-semibold text-secondary">Manage your employees</h5>
            <button className="btn btn-success px-4 fw-semibold shadow-sm" onClick={addNewEmployee}>
              + Add Employee
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="fw-bold">{employee.id}</td>
                      <td>{employee.firstname}</td>
                      <td>{employee.lastname}</td>
                      <td className="text-primary">{employee.email}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2 fw-semibold"
                          onClick={() => updateEmployee(employee.id)}
                        >
                          ✏️ Update
                        </button>
                        <button className="btn btn-danger btn-sm fw-semibold" onClick={()=>removeEmployee(employee.id)}>
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
