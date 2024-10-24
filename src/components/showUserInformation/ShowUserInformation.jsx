import React, { useState, useEffect } from "react";
import styles from "./ShowUserInformation.module.css";
import axios from "axios";

function ShowUserInformation({}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeUserid, setActiveUserid] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const usersPerPage = 10;

  useEffect(() => {
    axios
      .get(`/api/cardusermapping`)
      .then((response) => {
        const userData = response.data.map((user) => ({
          cardid: user.cardid,
          userid: user.userid,
          username: getUserByUserId(response.data.cardid),
        }));
        setUsers(userData);
        setFilteredUsers(userData);
        console.log(getUserByUserId(response.data.cardid));
      })
      .catch((error) => {
        console.error("There was an error making the GET request:", error);
      });
  }, []);

  const getUserByUserId = (userid) => {
    const token = import.meta.env.VITE_TOKEN;

    console.log(userid);
    axios
      .get(`/timeout-api/api/v1/user/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error making the GET request:", error);
      });
  };

  useEffect(() => {
    if (activeUserid === null) {
      setFilteredUsers(
        users.filter((user) =>
          user.cardid.toLowerCase().includes(searchTerm.toLowerCase())
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
            <p>Name: {user.username}</p>
            <p>User ID: {user.userid}</p>
            <p>Card ID: {user.cardid}</p>
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
