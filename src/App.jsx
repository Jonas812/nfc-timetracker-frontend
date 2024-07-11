import { useState } from 'react';
import './App.css';
import TimelogTable from './components/timelogTable/TimelogTable';
import SelectUser from './components/selectUser/SelectUser';
import HeaderBar from './components/headerBar/HeaderBar';

function App() {
  const [useridToFilter, setUseridToFilter] = useState(1); // Initial user ID to filter

  return (
    <>
      <HeaderBar />
      <div className='content'>
        <SelectUser setUseridToFilter={setUseridToFilter} />
        <TimelogTable useridToFilter={useridToFilter} />
      </div>
    </>
  );
}

export default App;
