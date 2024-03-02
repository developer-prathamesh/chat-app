import React from 'react'
import { useState } from 'react'
import {addDoc, collection,serverTimestamp,onSnapshot, query,where, orderBy} from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import { useEffect } from 'react'
import '../styles/Chat.css'

function Chat(props) {
    const {room} = props
    const [newMessage,setNewMessage] = useState("")
    const [messages,setMessages] = useState([])
    const messageRef = collection(db,"messages")
    useEffect(()=>{
        const queryMessages = query(messageRef,where("room","==",room),orderBy("createdAt"))
        const unsubscribe = onSnapshot(queryMessages,(snap)=>{
            let message = []
            snap.forEach((doc)=>{
                message.push({...doc.data(),id:doc.id})
            })
            setMessages(message)
        })
        return ()=>unsubscribe()
    },[])
    const handleSubmit=async (e)=>{
        e.preventDefault()
        if(newMessage===" ")return;
        await addDoc(messageRef,{
            text:newMessage,
            createdAt:serverTimestamp(),
            user:auth.currentUser.displayName,
            room:room,
        })
        setNewMessage(" ")
    }
  return (
    <div className='chat-app'>
        <div className='header'>
            <h1>Welcome To: {room}</h1>
        </div>
        <div className='messages'>
            {
                messages.map((mes)=>(
                  <div className='message' key={mes.id}>
                    <span className='user'>{mes.user}</span>
                    {
                        mes.text
                    }
                  </div>
                ))
            }
        </div>
      <form onSubmit={handleSubmit} className='new-message-form'>
        <input type="text" name="" id="" className='new-message-input' placeholder="Type Your Message Here" onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}/>
        <button className='send-button' type='submit'>Send</button>
      </form>
    </div>
  )
}

export default Chat
