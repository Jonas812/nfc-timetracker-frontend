import React from 'react';
import styles from './HeaderBar.module.css'


const HeaderBar = () => {
    return (
        <div className={styles.headerContainer}>
            <img src="./logo.svg" alt="" className={styles.logo} />
            <div className={styles.navigationItems}>
                <a href="">Timelog</a>
                <a href="">User</a>
            </div>
        </div>
    );
};

export default HeaderBar;
