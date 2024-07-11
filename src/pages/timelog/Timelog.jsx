import { useState } from "react";
import styles from "./Timelog.module.css";
import TimelogTable from "../../components/timelogTable/TimelogTable";
import SelectUser from "../../components/selectUser/SelectUser";
import HeaderBar from "../../components/headerBar/HeaderBar";

function Timelog() {
  const [useridToFilter, setUseridToFilter] = useState(1); // Initial user ID to filter

  return (
    <>
      <div className={styles.page}>
        <HeaderBar />
        <div className={styles.content}>
          <SelectUser
            className={styles.user}
            setUseridToFilter={setUseridToFilter}
          />
          <TimelogTable useridToFilter={useridToFilter} />
        </div>
      </div>
    </>
  );
}

export default Timelog;