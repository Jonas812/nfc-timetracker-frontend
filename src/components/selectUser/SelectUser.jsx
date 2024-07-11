import React, { useState, useEffect } from 'react';
import styles from './SelectUser.module.css';

const users = [
    { name: "Marc", userid: 1 },
    { name: "Jonas", userid: 2 },
    { name: "Luka", userid: 3 }
];

const SelectUser = ({ setUseridToFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleUserClick = (userid) => {
        setUseridToFilter(userid);
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
                />
            </div>
            <div className={styles.users}>
                {filteredUsers.map((user) => (
                    <div key={user.userid} className={styles.userBox} onClick={() => handleUserClick(user.userid)}>
                        <p>{user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectUser;
