import React from 'react';
import styles from './TimelogTable.module.css'

import Timelog from '../timelog/Timelog';


const TimelogTable = () => {
  return (
    <div>
      <div className={styles.filterBox}>
        <div className={styles.filterSection}>
          <h3 className={styles.filterSectionName}>Year:</h3>
          <button className={styles.filterBtn}>2022</button>
          <button className={styles.filterBtn}>2023</button>
          <button className={styles.filterBtn}>2024</button>
        </div>
        <div className={styles.filterSection}>
        <h3 className={styles.filterSectionName}>Month:</h3>
          <button className={styles.filterBtn}>January</button>
          <button className={styles.filterBtn}>February</button>
          <button className={styles.filterBtn}>March</button>
          <button className={styles.filterBtn}>April</button>
          <button className={styles.filterBtn}>May</button>
          <button className={styles.filterBtn}>June</button>
          <button className={styles.filterBtn}>July</button>
          <button className={styles.filterBtn}>August</button>
          <button className={styles.filterBtn}>September</button>
          <button className={styles.filterBtn}>October</button>
          <button className={styles.filterBtn}>November</button>
          <button className={styles.filterBtn}>December</button>
        </div>
      </div>
      <div className={styles.timelogTable}>
        <h3 className={styles.header}>Timelogs</h3>
        <div className={styles.columns}>
          <Timelog></Timelog>
          <Timelog></Timelog>
          <Timelog></Timelog>
        </div>
      </div>
    </div>
  );
};

export default TimelogTable;
