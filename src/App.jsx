import { useState } from 'react'
import './App.css'
import TimelogTable from './components/timelogTable/TimelogTable'
import SelectUser from './components/selectUser/SelectUser'
import HeaderBar from './components/headerBar/HeaderBar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeaderBar></HeaderBar>
      <div className='content'>
        <SelectUser></SelectUser>
        <TimelogTable></TimelogTable>
      </div >
    </>
  )
}

export default App
