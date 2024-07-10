import React from 'react';
import styles from './Timelog.module.css'

// Functional component
const Timelog = (props) => {
  return (
    <div className={styles.timelogBox}>
      <div className={styles.timelogHeader}>
        <p>Date: 29.06.2024</p>
        <p>Worktime: 6h</p>
      </div>
      <div className={styles.timelogDetails}>
        <div className={styles.detailRow}>
          <p>11:00</p>
          <p>login</p>
        </div>
        <div className={styles.detailRow}>
          <p>11:00</p>
          <p>login</p>
        </div>
        <div className={styles.detailRow}>
          <p>11:00</p>
          <p>login</p>
        </div>
      </div>
    </div>
  );
};

export default Timelog;