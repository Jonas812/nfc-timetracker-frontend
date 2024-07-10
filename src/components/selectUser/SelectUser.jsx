import React from 'react';
import styles from './SelectUser.module.css'


const SelectUser = () => {
  return (
    <div className={styles.selectUserBox}>
        <div className={styles.headerBox}>
            <h3 className={styles.header}>Users</h3>
            <input type="input" className={styles.searchbar} placeholder="Suche" required />
        </div>
        <div className={styles.users}>
            <div className={styles.userBox}>
                <p>Marc</p>
            </div>
            <div className={styles.userBox}>
                <p>Luka</p>
            </div>
            <div className={styles.userBox}>
                <p>Jonas</p>
            </div>
        </div>
    </div>
  );
};

export default SelectUser;
