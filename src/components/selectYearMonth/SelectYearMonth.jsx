import React from "react";
import styles from "./SelectYearMonth.module.css";

function SelectYearMonth({ setTimelogsYear, setTimelogsMonth }) {
  const handleYearChange = (year) => {
    setTimelogsYear(year);
  };

  const handleMonthChange = (month) => {
    const monthIndex = new Date(`${month} 1, 2020`).getMonth() + 1; // Convert month name to index
    setTimelogsMonth(monthIndex);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Year</button>
        <div className={styles.dropdownContent}>
          <p className={styles.dropdownItem} onClick={() => handleYearChange(2022)}>2022</p>
          <p className={styles.dropdownItem} onClick={() => handleYearChange(2023)}>2023</p>
          <p className={styles.dropdownItem} onClick={() => handleYearChange(2024)}>2024</p>
        </div>
      </div>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Month</button>
        <div className={styles.dropdownContent}>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('January')}>January</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('February')}>February</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('March')}>March</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('April')}>April</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('May')}>May</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('June')}>June</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('July')}>July</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('August')}>August</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('September')}>September</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('October')}>October</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('November')}>November</p>
          <p className={styles.dropdownItem} onClick={() => handleMonthChange('December')}>December</p>
        </div>
      </div>
    </div>
  );
}

export default SelectYearMonth;
