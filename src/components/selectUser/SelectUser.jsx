import React, { useState, useEffect } from "react";
import styles from "./SelectUser.module.css";

const users = [
  { name: "Marc", userid: 1 },
  { name: "Jonas", userid: 2 },
  { name: "Luka", userid: 3 },
];

const SelectUser = ({ setUseridToFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [activeUserid, setActiveUserid] = useState(null);

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
  }, [searchTerm, activeUserid]);

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
    setUseridToFilter(null);
    setActiveUserid(null);
    setSearchTerm("");
  };

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
        {filteredUsers.map((user) => (
          <div
            key={user.userid}
            className={`${styles.userBox} ${
              activeUserid === user.userid ? styles.active : ""
            }`}
            onClick={() => handleUserClick(user.userid)}
          >
            <p>{user.name}</p>

            {activeUserid === user.userid && (
              <p className={styles.deleteText}>Löschen</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectUser;
