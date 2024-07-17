import React from "react";
import styles from "./Timelog.module.css";

// Functional component
function Timelog({ date, totalHours, details }) {
  return (
    <div className={styles.timelogBox}>
      <div className={styles.timelogHeader}>
        <p className={styles.regularBoldText}>Date: {date}</p>
        <p className={styles.regularBoldText}>Worktime: {totalHours.toFixed(2)}h</p>
      </div>
      <div className={styles.timelogDetails}>
        {details.map((detail, index) => (
          <div>
            <div className={styles.detailRow}>
              <p className={styles.regularText}>
                {detail.start} - {detail.end}
              </p>
              <p className={styles.regularText}>{detail.hours.toFixed(2)}h</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timelog;
