import React from 'react';
import styles from './TimelogTable.module.css';
import SelectYearMonth from '../selectYearMonth/SelectYearMonth';
import Timelog from '../timelog/Timelog';

function TimelogTable() {
  const timelogs = [
    { startTimestamp: 1672534800, endTimestamp: 1672552800 }, // 01:01:2023 01:00 - 05:00
    { startTimestamp: 1672556400, endTimestamp: 1672567200 }, // 01:01:2023 06:00 - 09:00
    { startTimestamp: 1672621200, endTimestamp: 1672639200 }, // 02:01:2023 01:00 - 05:00
    { startTimestamp: 1672642800, endTimestamp: 1672653600 }, // 02:01:2023 06:00 - 09:00
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return { date: `${day}.${month}.${year}`, time: `${hours}:${minutes}` };
  };

  const calculateWorkHours = (timelogs) => {
    const workLogByDate = {};

    timelogs.forEach(log => {
      const start = formatTimestamp(log.startTimestamp);
      const end = formatTimestamp(log.endTimestamp);

      if (!workLogByDate[start.date]) {
        workLogByDate[start.date] = { totalHours: 0, details: [] };
      }

      const workHours = (log.endTimestamp - log.startTimestamp) / 3600;
      workLogByDate[start.date].totalHours += workHours;
      workLogByDate[start.date].details.push({
        start: start.time,
        end: end.time,
        hours: workHours
      });
    });

    return workLogByDate;
  };

  const workLogByDate = calculateWorkHours(timelogs);

  return (
    <div className={styles.timelogTable}>
      <div className={styles.header}>
        <h3 className={styles.headerText}>Timelogs</h3>
        <SelectYearMonth />
      </div>
      <div className={styles.columns}>
        {Object.keys(workLogByDate).map(date => (
          <Timelog
            key={date}
            date={date}
            totalHours={workLogByDate[date].totalHours}
            details={workLogByDate[date].details}
          />
        ))}
      </div>
    </div>
  );
}

export default TimelogTable;
