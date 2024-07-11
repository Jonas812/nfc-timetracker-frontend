import React from 'react';
import styles from './TimelogTable.module.css';
import SelectYearMonth from '../selectYearMonth/SelectYearMonth';
import Timelog from '../timelog/Timelog';


const timelogs = [
  { starttimestamp: 1672534800, endtimestamp: 1672552800, userid: 1 }, // 01:01:2023 01:00 - 05:00
  { starttimestamp: 1672556400, endtimestamp: 1672567200, userid: 1 }, // 01:01:2023 06:00 - 09:00
  { starttimestamp: 1672534800, endtimestamp: 1672552800, userid: 1 }, // 01:01:2023 01:00 - 05:00
  { starttimestamp: 1672556400, endtimestamp: 1672567200, userid: 1 }, // 01:01:2023 06:00 - 09:00
  { starttimestamp: 1672621200, endtimestamp: 1672639200, userid: 1 }, // 02:01:2023 01:00 - 05:00
  { starttimestamp: 1672642800, endtimestamp: 1672653600, userid: 1 }, // 02:01:2023 06:00 - 09:00
  { starttimestamp: 1672707600, endtimestamp: 1672725600, userid: 1 }, // 03:01:2023 01:00 - 05:00
  { starttimestamp: 1672729200, endtimestamp: 1672740000, userid: 1 }, // 03:01:2023 06:00 - 09:00
  { starttimestamp: 1672794000, endtimestamp: 1672812000, userid: 1 }, // 04:01:2023 01:00 - 05:00
  { starttimestamp: 1672815600, endtimestamp: 1672833600, userid: 1 }, // 04:01:2023 06:00 - 10:00
  { starttimestamp: 1672878000, endtimestamp: 1672896000, userid: 1 }, // 05:01:2023 00:00 - 04:00
  { starttimestamp: 1672902000, endtimestamp: 1672920000, userid: 1 }, // 05:01:2023 06:00 - 10:00
  { starttimestamp: 1672966800, endtimestamp: 1672984800, userid: 1 }, // 06:01:2023 01:00 - 05:00
  { starttimestamp: 1672988400, endtimestamp: 1673006400, userid: 1 }, // 06:01:2023 06:00 - 10:00
  { starttimestamp: 1673053200, endtimestamp: 1673071200, userid: 1 }, // 07:01:2023 01:00 - 05:00
  { starttimestamp: 1673074800, endtimestamp: 1673092800, userid: 1 }, // 07:01:2023 06:00 - 10:00
  { starttimestamp: 1673139600, endtimestamp: 1673157600, userid: 1 }, // 08:01:2023 01:00 - 05:00
  { starttimestamp: 1673161200, endtimestamp: 1673179200, userid: 1 }, // 08:01:2023 06:00 - 10:00
  { starttimestamp: 1673226000, endtimestamp: 1673244000, userid: 1 }, // 09:01:2023 01:00 - 05:00
  { starttimestamp: 1673247600, endtimestamp: 1673265600, userid: 1 }, // 09:01:2023 06:00 - 10:00
  { starttimestamp: 1673312400, endtimestamp: 1673330400, userid: 1 }, // 10:01:2023 01:00 - 05:00
  { starttimestamp: 1673334000, endtimestamp: 1673352000, userid: 1 }, // 10:01:2023 07:00 - 11:00
  { starttimestamp: 1672621200, endtimestamp: 1672639200, userid: 2 }, // 02:01:2023 01:00 - 05:00
  { starttimestamp: 1672642800, endtimestamp: 1672653600, userid: 2 }, // 02:01:2023 06:00 - 09:00
];


function TimelogTable({ useridToFilter }) {

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
      const start = formatTimestamp(log.starttimestamp);
      const end = formatTimestamp(log.endtimestamp);

      if (!workLogByDate[start.date]) {
        workLogByDate[start.date] = { totalHours: 0, details: [] };
      }

      const workHours = (log.endtimestamp - log.starttimestamp) / 3600;
      workLogByDate[start.date].totalHours += workHours;
      workLogByDate[start.date].details.push({
        start: start.time,
        end: end.time,
        hours: workHours
      });
    });

    return workLogByDate;
  };

  const filteredTimelogs = timelogs.filter(log => log.userid === useridToFilter);
  const workLogByDate = calculateWorkHours(filteredTimelogs);

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
