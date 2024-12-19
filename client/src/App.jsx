import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Button className='bg-red-500'>Check</Button>
      
    </>
  )
}

export default App
