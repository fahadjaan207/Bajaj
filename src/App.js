import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchDesignation, setSearchDesignation] = useState('');

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
      .then(response => {
        setDevelopers(response.data);
        setFilteredDevelopers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    filterDevelopers();
  }, [searchName, searchDesignation]);

  const filterDevelopers = () => {
    let filtered = developers;

    if (searchName) {
      filtered = filtered.filter(developer =>
        developer.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchDesignation) {
      filtered = filtered.filter(developer =>
        developer.designation.toLowerCase().includes(searchDesignation.toLowerCase()) ||
        developer.skills.join(' ').toLowerCase().includes(searchDesignation.toLowerCase())
      );
    }

    setFilteredDevelopers(filtered);
  };

  return (
    <div className="App">
      <h1>Developer List</h1>
      <div>
        <label htmlFor="name">Search by Name:</label>
        <input
          type="text"
          id="name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter name..."
        />
        <br /><br />
        <label htmlFor="designation">Filter by Designation/Skills:</label>
        <input
          type="text"
          id="designation"
          value={searchDesignation}
          onChange={(e) => setSearchDesignation(e.target.value)}
          placeholder="Enter designation/skills..."
        />
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Skills</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevelopers.map((developer, index) => (
            <tr key={index}>
              <td>{developer.name}</td>
              <td>{developer.designation}</td>
              <td>{developer.skills.join(', ')}</td>
              <td>{developer.email}</td>
              <td>{developer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;