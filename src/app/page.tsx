"use client"
import { useState,useEffect } from "react"
export default function Home(){
const [socket,setSocket] = useState<WebSocket|null>(null)
const [input,setInput] = useState("")
const [messeages,setMesseges] = useState<string>("");
useEffect(()=>{
  const ws= new WebSocket('ws://localhost:3000')
  ws.onopen=()=>{
    console.log("connected")
    setSocket(ws)
  }
  ws.onmessage=(message)=>{
    console.log("we've a message for you")
    setMesseges(message.data)
  }
},[])
if(!socket){
  return(
    <div>
      loading chats
    </div>
  )
}
  return( 
    <div>
      <input value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button onClick={()=>socket.send(input)}>Send</button>
           {messeages && (
            <p>{messeages}</p>
           )}

    </div>
  )
}