import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import './Ride.css'; // Import the CSS file for styling

function RideList() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://localhost:8080/api/v1/registration/rides')
      .then(response => response.json())
      .then(data => setRides(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="ride-list-container">
      <h1>Ride List</h1>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Ride ID</Th>
            <Th>Origin</Th>
            <Th>Destination</Th>
            {/* Add more table headers as needed */}
          </Tr>
        </Thead>
        <Tbody>
          {rides.map(ride => (
            <Tr key={ride.id}>
              <Td>{ride.id}</Td>
              <Td>{ride.origin}</Td>
              <Td>{ride.destination}</Td>
              {/* Add more table cells as needed */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default RideList;
