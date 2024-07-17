import React, { useState, useEffect } from "react";
import styles from "./ShowUserInformation.module.css";
import axios from "axios";

const users = [
  { name: "Marc", userid: 1 },
  { name: "Jonas", userid: 2 },
  { name: "Luka", userid: 3 },
  { name: "Paul", userid: 4 },
  { name: "Anna", userid: 5 },
  { name: "Mike", userid: 6 },
  { name: "Sophie", userid: 7 },
  { name: "Chris", userid: 8 },
  { name: "Nina", userid: 9 },
  { name: "Tom", userid: 10 },
  { name: "Alice", userid: 11 },
  { name: "Bob", userid: 12 },
  { name: "Eva", userid: 13 },
  { name: "Max", userid: 14 },
  { name: "Laura", userid: 15 },
  { name: "Sarah", userid: 16 },
  { name: "David", userid: 17 },
  { name: "Emma", userid: 18 },
  { name: "John", userid: 19 },
  { name: "Julia", userid: 20 },
  { name: "Michael", userid: 21 },
  { name: "Sophia", userid: 22 },
  { name: "Daniel", userid: 23 },
  { name: "Mia", userid: 24 },
  { name: "William", userid: 25 },
  { name: "Olivia", userid: 26 },
  { name: "Alexander", userid: 27 },
  { name: "Emily", userid: 28 },
  { name: "James", userid: 29 },
  { name: "Ava", userid: 30 },
  { name: "Benjamin", userid: 31 },
];

function ShowUserInformation({}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [activeUserid, setActiveUserid] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    axios
      .get(`/api/cardlist`)
      .then((response) => {
        setRemoteTimelogs(response.data);
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
  }, [searchTerm, activeUserid]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
          >
            <p>{user.name}</p>
            <p>{user.name}</p>
            <p>{user.name}</p>
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

export default ShowUserInformation;
