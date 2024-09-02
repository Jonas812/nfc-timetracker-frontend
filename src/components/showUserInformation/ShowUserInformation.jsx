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
    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA1NzFjZGZlLTAxYmItNDQ0Mi05YTllLTEyNzQ1NTA0YzdiMSJ9.eyJqdGkiOiJlYjc3Mjk1MS02ZjgzLTQwYjUtYWU5Ni1kN2I5Nzc5NTFjMTgiLCJzdWIiOiIwZjUyOWExZC02Y2UyLTQxZmQtOTk1Mi05NTljYjY4YzY0NGIiLCJleHAiOjE3MjE4MzE4ODgsIm5iZiI6MTcyMTgyODI4MywiaWF0IjoxNzIxODI4Mjg4LCJtZXRhIjp7ImVtYWlsIjoiaHR3LXRlc3RAZXhhbXBsZS5jb20iLCJuYW1lIjp7ImZpcnN0IjoiSm9obiIsImxhc3QiOiJEb2UiLCJzYWx1dGF0aW9uIjoiTXIifSwia2V5IjoiOTIyMTU4ZmItN2Y3Ny00ZDg0LWIzMTktZWI5Njk4M2NmZGVmIiwicm9sZSI6IkNPTVBBTllfQURNSU4iLCJjb21wYW55Ijp7ImlkIjoiYjgxNDgyMGItMjk3OC00OWVkLWE5MmItNWY0ZTgzNzZlYTdiIiwibmFtZSI6Imh0dy10ZXN0IiwiZmVhdHVyZXMiOlsiQ0xPQ0tJTkciXX19fQ.eNGLxcJbEV76SrfIi5SAYExvcVNBBzDSj7QzP2S-yy9zhu8LhakJ3D1fWvjpXiaWNqp5koPM3td13GeK4bPptSLLWSdkLNb7Vgb8XSdTFjTkvZvVlfonRynzGOd4jiUBGoX7-nE9KaUqSJj2ytVUDISHwqGGePNLo2i8ePgxD2OxhAByRREQWeMcYKTQiXuwLRY2JdRqVq9vHYQwqleay_0UYU3eF_Dx2Lst0S2B-_guhn_OjCYgK3m3Or2ILr60CyUrqRTxWthQGxh6YokLcI7CucVs-fkNMGcKROq_SRJatLi5vJlBZ3E7gKjs5FPhXiFqAAurKeDX045ddwTw1g"; // Replace with your actual token

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
