import React from "react";
import styles from "./SelectYearMonth.module.css";

function SelectYearMonth() {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Year</button>
        <div className={styles.dropdownContent}>
          <p className={styles.dropdownItem}>2022</p>
          <p className={styles.dropdownItem}>2023</p>
          <p className={styles.dropdownItem}>2024</p>
        </div>
      </div>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Month</button>
        <div className={styles.dropdownContent}>
          <p className={styles.dropdownItem}>January</p>
          <p className={styles.dropdownItem}>February</p>
          <p className={styles.dropdownItem}>March</p>
          <p className={styles.dropdownItem}>April</p>
          <p className={styles.dropdownItem}>May</p>
          <p className={styles.dropdownItem}>June</p>
          <p className={styles.dropdownItem}>July</p>
          <p className={styles.dropdownItem}>August</p>
          <p className={styles.dropdownItem}>September</p>
          <p className={styles.dropdownItem}>October</p>
          <p className={styles.dropdownItem}>November</p>
          <p className={styles.dropdownItem}>December</p>
        </div>
      </div>
    </div>
  );
}

export default SelectYearMonth;
