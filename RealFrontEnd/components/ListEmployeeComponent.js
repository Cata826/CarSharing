import React, { useState, useEffect } from 'react';
import ServiceEmployee from '../service/ServiceEmployee';

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);

    useEffect(function fetchData() {
        async function fetchData() {
            try {
                const res = await ServiceEmployee.getEmployees();
                console.log(res.data); 
                setEmployees(res.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }

        fetchData();
    }, []); 

    return (
        <div>
            <h2 className="text-center">Employee List</h2>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                           
                            <th style={{ textAlign: 'left' }}>id</th>
                            <th style={{ textAlign: 'left' }}>email</th>
                            <th style={{ textAlign: 'left' }}>password</th>
                            <th style={{ textAlign: 'left' }}>locked</th>
                            <th style={{ textAlign: 'left' }}>enabled</th>
                            <th style={{ textAlign: 'left' }}>firstName</th>
                            <th style={{ textAlign: 'left' }}>lastName</th>

                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.email}</td>
                                <td>{employee.password}</td>
                                <td>{employee.locked}</td>
                                <td>{employee.enabled}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>

                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEmployeeComponent;
