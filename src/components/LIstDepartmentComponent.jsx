import React, { useEffect, useState } from "react";
import { deleteDepartment, getAllDepartments } from "../services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    listOfDepartments();
  }, []);

  const navigator = useNavigate();

  function updateDepartment(id) {
    navigator(`/edit-department/${id}`);
  }

  function listOfDepartments() {
    getAllDepartments()
      .then((response) => {
        console.log(response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeDepartment(id) {
    deleteDepartment(id)
      .then((response) => {
        console.log(response.data);
        listOfDepartments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div
          className="card-header text-center"
          style={{
            background: "linear-gradient(90deg, #20c997, #0dcaf0)",
            color: "#fff",
          }}
        >
          <h3 className="mb-0 fw-bold">🏢 Department Directory</h3>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-end mb-3">
            <Link className="btn btn-success fw-bold" to="/add-department">
              ➕ Add Department
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">🆔 ID</th>
                  <th scope="col">🏷️ Name</th>
                  <th scope="col">📝 Description</th>
                  <th scope="col">⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <tr key={dept.id}>
                      <td>{dept.id}</td>
                      <td className="fw-semibold">{dept.departmentName}</td>
                      <td>{dept.departmentDescription}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2 fw-semibold"
                          onClick={() => updateDepartment(dept.id)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger fw-semibold"
                          onClick={() => removeDepartment(dept.id)}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      🚫 No departments found
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

export default ListDepartmentComponent;
