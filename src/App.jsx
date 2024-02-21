import { useState,useRef } from 'react'

import './App.css'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import Chat from './components/Chat'
import { signOut} from 'firebase/auth'
import { auth } from './firebase-config'
const cookies  = new Cookies()

function App() {
  const [isAuth, setAuth] = useState(cookies.get("auth-token"))
  const [room,setRoom] = useState(null)
  const roomInputRef  = useRef()
  const signusOut = async()=>{
    await signOut(auth)
    cookies.remove("auth-token")
    setAuth(false)
    setRoom(null)
  }
  if(!isAuth){
    return (
      <>
        <Auth setAuth={setAuth} ></Auth>
      </>
    )
  }
  return (
    <>
      {
        room ? (
        <Chat room={room}></Chat>)
        :
        (<div className='room'>
          <label htmlFor="">Enter Room Name</label>
          <input type="text" ref={roomInputRef}/>
          <button onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>)
      }
      <div className='sign-out'>
        <button onClick={signusOut}>Sign Out</button>
      </div>
    </>
  )
}

export default App
