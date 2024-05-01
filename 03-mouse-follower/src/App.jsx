import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position,setPosition]= useState({x:0,y:0})

  useEffect(()=>{
    console.log('efecto')

    const handlemove =(event)=>{
      const {clientX,clientY} = event
      setPosition({ x: clientX , y:clientY})
    }
    if(enabled){
      window.addEventListener('pointermove',handlemove)
    }
    return()=>{
      window.removeEventListener('pointermove',handlemove)
    }
   
    

  },[enabled])

  return (
    <>
    <div style={{
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid #fff',
      borderRadius: '50%',
      opacity: 0.8,
      pointerEvents: 'none',
      left: -25,
      top: -25,
      width: 50,
      height: 50,
      transform: `translate( ${position.x}px, ${position.y}px)`
    }}
    />
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? 'Desactivar' : 'Activar'} seguir puntero
    </button>
  </>
  )
}

export default App
