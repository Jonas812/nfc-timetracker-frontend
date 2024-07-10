import React, { useState, useEffect } from 'react';
import styles from './SelectUser.module.css';

const SelectUser = () => {
    const [users, setUsers] = useState(['Marc', 'Luca', 'Jonas']);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={styles.selectUserBox}>
            <div className={styles.headerBox}>
                <h3 className={styles.header}>Users</h3>
                <input
                    type="input"
                    className={styles.searchbar}
                    placeholder="Suche"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    required
                />
            </div>
            <div className={styles.users}>
                {filteredUsers.map((user, index) => (
                    <div key={index} className={styles.userBox}>
                        <p>{user}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectUser;
