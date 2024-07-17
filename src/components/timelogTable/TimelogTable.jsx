import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TimelogTable.module.css";
import SelectYearMonth from "../selectYearMonth/SelectYearMonth";
import Timelog from "../timelog/Timelog";

function TimelogTable({ useridToFilter }) {
  const [remoteTimelogs, setRemoteTimelogs] = useState([]);
  const [timelogsYear, setTimelogsYear] = useState([]);
  const [timelogsMonth, setTimelogsMonth] = useState([]);

  useEffect(() => {
    if (useridToFilter) {
      const year = timelogsYear;  // Adjust as needed
      const month = timelogsMonth;    // Adjust as needed
      axios.get(`/api/timelog/byuser/${useridToFilter}/${year}/${month}`)
        .then(response => {
          setRemoteTimelogs(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('There was an error making the GET request:', error);
        });
    } else {
      setRemoteTimelogs([]); // Reset timelogs when no user is selected
    }
  }, [useridToFilter]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return { date: `${day}.${month}.${year}`, time: `${hours}:${minutes}` };
  };

  const calculateWorkHours = (timelogs) => {
    const workLogByDate = {};

    timelogs.forEach((log) => {
      const start = formatTimestamp(log.starttimestemp);
      const end = formatTimestamp(log.endtimestemp);

      if (!workLogByDate[start.date]) {
        workLogByDate[start.date] = { totalHours: 0, details: [] };
      }

      const workHours = (log.endtimestemp - log.starttimestemp) / 3600;
      workLogByDate[start.date].totalHours += workHours;
      workLogByDate[start.date].details.push({
        start: start.time,
        end: end.time,
        hours: workHours,
      });
    });

    return workLogByDate;
  };

  const workLogByDate = calculateWorkHours(remoteTimelogs);

  return (
    <div className={styles.timelogTable}>
      <div className={styles.header}>
        <h3 className={styles.headerText}>Timelogs</h3>
        <SelectYearMonth setTimelogsYear={setTimelogsYear} setTimelogsMonth={setTimelogsMonth} />
      </div>
      {useridToFilter ? (
        <div className={styles.columns}>
          {Object.keys(workLogByDate).map((date) => (
            <Timelog
              key={date}
              date={date}
              totalHours={workLogByDate[date].totalHours}
              details={workLogByDate[date].details}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noTimelogs}>Select a user to view timelogs</p>
      )}
    </div>
  );
}

export default TimelogTable;
