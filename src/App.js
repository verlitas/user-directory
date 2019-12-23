import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./App.css"

const App = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=200&nat=us").then(response => setUsers(response.data.results));
  }, []);

  const sortAscending = () => {
    const sortedUsers = [...users].sort((a,b) => a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1);
    setUsers(sortedUsers)
  };
  const sortDescending = () => {
    const sortedUsers = [...users].sort((a,b) => a.name.last.toLowerCase() < b.name.last.toLowerCase() ? 1 : -1);
    setUsers(sortedUsers);
  };
  return (
    <>
    <input type="text" value={inputValue} onChange={event => setInputValue(event.target.value)}/>
    <button onClick={sortAscending}>SORT A-Z BY LAST NAME</button>
    <button onClick={sortDescending}>SORT Z-A BY LAST NAME</button>
    {users
    .filter(user => 
      `${user.name.first} ${user.name.last}`
      .toLowerCase()
      .includes(inputValue.toLowerCase()))
      .map(user => (
        <h1 key={user.id.value}>
          {user.name.first} {user.name.last}, {user.login.username}, {" "} {user.email}
        </h1>
      ))}
    </>
  )
}

export default App;