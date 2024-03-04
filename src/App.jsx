import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl text-slate-600 w-max m-auto bg-green-200     rounded-lg p-3 font-bold underline">
        Hello world!
      </h1>
    </>
  )
}

export default App
