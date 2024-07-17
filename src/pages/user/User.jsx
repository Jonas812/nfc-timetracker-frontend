import { useState } from "react";
import styles from "./User.module.css";
import HeaderBar from "../../components/headerBar/HeaderBar";
import ShowUserInformation from "../../components/showUserInformation/ShowUserInformation.jsx";

function User() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.header}>
          <HeaderBar />
        </div>
        <div className={styles.content}>
          <ShowUserInformation className={styles.user} />
        </div>
      </div>
    </>
  );
}

export default User;
