import React from 'react'

const ListEmployeeComponent = () => {
    const dummyData=[
        {
            "id":1,
            "firstName":"Ritesh",
            "lastName":"Regar",
            "email":"riteshregar31@gmail.com"
        },
          {
            "id":2,
            "firstName":"Raman",
            "lastName":"kumar",
            "email":"roamd@gmail.com"
        },  {
            "id":3,
            "firstName":"Rohan",
            "lastName":"ravi",
            "email":"rohd@gmail.com"
        }
    ]
  return (
    <div className='container'>
<h2 className='text-center'>
    List of employees
</h2>
<table className='table striped table-bordered'>
    <thead>
        <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
        </tr>
    </thead>
    <tbody>
        {
            dummyData.map(employee=>
            <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>

            </tr>)
        }
    </tbody>
</table>

    </div>
  )
}

export default ListEmployeeComponent
