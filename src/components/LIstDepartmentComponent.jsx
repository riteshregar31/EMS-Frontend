import React, { useState } from "react";

const ListDepartmentComponent = () => {
  const dummyData = [
    {
      id: 1,
      departmentName: "R&D",
      departmentDescription: "Research and Development",
    },
    {
      id: 2,
      departmentName: "HR",
      departmentDescription: "Human Resources Management",
    },
    {
      id: 3,
      departmentName: "Finance",
      departmentDescription: "Financial Planning and Analysis",
    },
    {
      id: 4,
      departmentName: "IT",
      departmentDescription: "Information Technology Support",
    },
    {
      id: 5,
      departmentName: "Sales",
      departmentDescription: "Business Sales and Client Relations",
    },
    {
      id: 6,
      departmentName: "Marketing",
      departmentDescription: "Marketing Strategy and Campaigns",
    },
  ];

  const [departments, setDepartments] = useState(dummyData);

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
            <button className="btn btn-success">+ Add Department</button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Department ID</th>
                  <th scope="col">Department Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
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
                        <button className="btn btn-sm btn-primary me-2">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No departments found
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
