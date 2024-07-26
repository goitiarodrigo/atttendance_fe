import React from 'react'
import ReactDOM from 'react-dom/client'
import logo1 from './assets/escudo.png'
import logo2 from './assets/espartano.png'
import './index.css'
import AttendanceTable from './Components/AttendanceTable.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='w-[100vw] h-[100vh] body-container flex flex-col items-center gap-10'>
      <div className='flex gap-10'>
        <img src={logo2} alt="logo" className='w-[120px] h-[120px]' />
        <img src={logo1} alt="logo" className='w-[130px] h-[120px]' />
      </div>
      <AttendanceTable />
    </div>
  </React.StrictMode>,
)
