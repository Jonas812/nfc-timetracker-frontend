import React, { useState, useEffect } from "react";
import styles from "./SelectUser.module.css";
import axios from "axios";

function SelectUser({ setUseridToFilter }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeUserid, setActiveUserid] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZiZDUzMWUwLTVhMzUtNGM3ZS1hZDA1LTIxOGIyMzU0YjBlMSJ9.eyJqdGkiOiI2NTA0ODlhMS1lYmQwLTQzZDktOWQ4Zi03ZWFkYzE4OGU3NzMiLCJzdWIiOiIwZjUyOWExZC02Y2UyLTQxZmQtOTk1Mi05NTljYjY4YzY0NGIiLCJleHAiOjE3MjE3Mjg4ODksIm5iZiI6MTcyMTcyNTI4NCwiaWF0IjoxNzIxNzI1Mjg5LCJtZXRhIjp7ImVtYWlsIjoiaHR3LXRlc3RAZXhhbXBsZS5jb20iLCJuYW1lIjp7ImZpcnN0IjoiSm9obiIsImxhc3QiOiJEb2UiLCJzYWx1dGF0aW9uIjoiTXIifSwia2V5IjoiOTIyMTU4ZmItN2Y3Ny00ZDg0LWIzMTktZWI5Njk4M2NmZGVmIiwicm9sZSI6IkNPTVBBTllfQURNSU4iLCJjb21wYW55Ijp7ImlkIjoiYjgxNDgyMGItMjk3OC00OWVkLWE5MmItNWY0ZTgzNzZlYTdiIiwibmFtZSI6Imh0dy10ZXN0IiwiZmVhdHVyZXMiOlsiQ0xPQ0tJTkciXX19fQ.I-907PeB6l4Ot-cCnnbU9xGs40iGeMWTcUBvssxZPD7G0EWHB99psLxJVbN1md58VyjX_1KsSiy-WKEH7birhrzO4zr8SGZcuP2GNlvewi9N4F-C2F_PIiJvTVauVg5X8zwqUdKXG-2E0w6eOR7HNb3WpUlSt8OmdGt0DFOjXvImRtN-6GN03PrfBWkCNqIyOmaSH328aaa4bfkFItGcxZG9AU_e7IcZV7M1s1MoTHiZlVmqQRzp0y6_hQFZxfMPRUUiE7xslxflHlNVF9uAqaSSB1gAKDGd9ZegwouFuLNy0mQIpGXjcboReWUjTRgBHruxmtGQWe3MZYwWkKZAkQ"; // Replace with your actual token

    axios
      .get("/timeout-api/api/v1/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedUsers = response.data.items.map((item) => ({
          name: `${item.name.salutation} ${item.name.first} ${item.name.last}`,
          userid: item.id,
        }));
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      })
      .catch((error) => {
        console.error("There was an error making the GET request:", error);
      });
  }, []);

  useEffect(() => {
    if (activeUserid === null) {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users.filter((user) => user.userid === activeUserid));
    }
    setCurrentPage(1); // Reset to first page on search or filter change
  }, [searchTerm, activeUserid, users]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserClick = (userid) => {
    if (activeUserid === userid) {
      resetFilter();
    } else {
      setUseridToFilter(userid);
      setActiveUserid(userid);
    }
  };

  const resetFilter = () => {
    setUseridToFilter(undefined);
    setActiveUserid(null);
    setSearchTerm("");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageInputChange = (event) => {
    const page = Number(event.target.value);
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className={styles.selectUserBox}>
      <div className={styles.headerBox}>
        <h3 className={styles.header}>Users</h3>
        <input
          type="text"
          className={styles.searchbar}
          placeholder="Suche"
          value={searchTerm}
          onChange={handleSearchChange}
          required
          disabled={activeUserid !== null}
        />
      </div>
      <div className={styles.users}>
        {paginatedUsers.map((user) => (
          <div
            key={user.userid}
            className={`${styles.userBox} ${
              activeUserid === user.userid ? styles.active : ""
            }`}
            onClick={() => handleUserClick(user.userid)}
          >
            <p>{user.name}</p>
            {activeUserid === user.userid ? (
              <p className={styles.deleteText}>Löschen</p>
            ) : (
              <p className={styles.selectText}>Auswählen</p>
            )}
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Vorherige Seite
        </button>
        <input
          type="number"
          value={currentPage}
          onChange={handlePageInputChange}
          className={styles.pageInput}
          min="1"
          max={totalPages}
        />
        <span>/ {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Nächste Seite
        </button>
      </div>
    </div>
  );
}

export default SelectUser;
