import React, { useEffect, useState } from "react";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDepartmentById(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentDescription);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateDepartment(e) {
    e.preventDefault();
    const department = { departmentName, departmentDescription };

    if (id) {
      updateDepartment(id, department)
        .then(() => navigate("/departments"))
        .catch((error) => console.error(error));
    } else {
      createDepartment(department)
        .then(() => navigate("/departments"))
        .catch((error) => console.error(error));
    }
  }

  function pageTitle() {
    return id ? (
      <h2 className="text-center mb-4 text-warning fw-bold">
        ✏️ Update Department
      </h2>
    ) : (
      <h2 className="text-center mb-4 text-success fw-bold">
        🏢 Add New Department
      </h2>
    );
  }

  return (
    <div className="container" style={{ minHeight: "80vh" }}>
      <div className="row justify-content-center align-items-center">
        <div className="card shadow-lg p-4 col-md-6 border-0">
          {pageTitle()}
          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">🏷️ Department Name</label>
              <input
                type="text"
                placeholder="✍️ Enter Department Name"
                value={departmentName}
                className="form-control"
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">📝 Description</label>
              <input
                type="text"
                placeholder="📌 Enter Department Description"
                value={departmentDescription}
                className="form-control"
                onChange={(e) => setDepartmentDescription(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button
                className={`btn btn-lg ${
                  id
                    ? "btn-warning text-dark fw-bold"
                    : "btn-success fw-bold"
                }`}
                onClick={saveOrUpdateDepartment}
              >
                {id ? "✅ Update Department" : "➕ Add Department"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;
