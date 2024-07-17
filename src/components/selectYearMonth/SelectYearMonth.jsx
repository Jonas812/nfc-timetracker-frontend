import React, { useState } from "react";
import styles from "./SelectYearMonth.module.css";

function SelectYearMonth({
  setTimelogsYear,
  timelogsYear,
  setTimelogsMonth,
  timelogsMonth,
}) {
  const handleYearChange = (year) => {
    setTimelogsYear(year);
  };

  const handleMonthChange = (month) => {
    const monthIndex = new Date(`${month} 1, 2020`).getMonth() + 1;
    setTimelogsMonth(monthIndex);
  };

  const setCurrentDate = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    setTimelogsYear(currentYear);
    setTimelogsMonth(currentMonth);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Year</button>
        <div className={styles.dropdownContent}>
          {[2022, 2023, 2024].map((year) => (
            <p
              key={year}
              className={`${styles.dropdownItem} ${
                timelogsYear === year ? styles.selected : ""
              }`}
              onClick={() => handleYearChange(year)}
            >
              {year}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Month</button>
        <div className={styles.dropdownContent}>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <p
              key={month}
              className={`${styles.dropdownItem} ${
                timelogsMonth === index + 1 ? styles.selected : ""
              }`}
              onClick={() => handleMonthChange(month)}
            >
              {month}
            </p>
          ))}
        </div>
      </div>
      <button className={styles.currentDateButton} onClick={setCurrentDate}>
        current Month
      </button>
    </div>
  );
}

export default SelectYearMonth;
