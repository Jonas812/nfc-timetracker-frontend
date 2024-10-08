import React from "react";
import styles from "./HeaderBar.module.css";

function HeaderBar() {
  return (
    <div className={styles.headerContainer}>
      <img src="./logo.svg" alt="" className={styles.logo} />
      <div className={styles.navigationItems}>
        <a href="/timelog">Timelog</a>
        <a href="/user">User</a>
      </div>
    </div>
  );
}

export default HeaderBar;
