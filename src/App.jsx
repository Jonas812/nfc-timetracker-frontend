import { useState } from 'react'
import './App.css'
import TimelogTable from './components/timelogTable/TimelogTable'
import SelectUser from './components/selectUser/SelectUser'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SelectUser></SelectUser>
      <TimelogTable></TimelogTable>
    </>
  )
}

export default App
