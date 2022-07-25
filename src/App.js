import io from 'socket.io-client';
import {useEffect, useState} from 'react';
import './App.css';

const socket=io.connect("http://localhost:3001"); 
function App() {
  const [msg,setMsg]=useState("");
  const [room,setRoom]=useState("");
  const [recieved,setRecieved]=useState("");
  const [user,setUser]=useState("");
  const [show,setShow]=useState(false);
 


  const setroomfn=()=>{
    setShow(true);
 socket.emit("room_id",{room:room})
  }

  const sendmsgfn=()=>{

socket.emit("send_message",{room:room,msg:msg,user:user})
  }

  useEffect(()=>{
    socket.on("recieve_msg",(data)=>{
      setRecieved(data.msg);
      setUser(data.user)
    })
  },[socket])
  
  return (
    <div className="App">
      <h2><img className='ig' src="https://p.kindpng.com/picc/s/148-1489702_transparent-message-bubble-png-chat-icon-png-png.png"/>Real-Time-Chat App</h2><br/>
     <input onChange={(e)=>{setRoom(e.target.value)}} placeholder='Enter Your RoomID...'/><br/><br/>
     <input onChange={(e)=>{setUser(e.target.value)}} placeholder='Enter Your Name...'/><br/><br/>
     <button onClick={()=>{setroomfn()}}>{show?"Join another Room":"Join Room"}</button><br/><br/>
     <h5>{show?<h5>Room joined Succesfully...</h5>:<h5></h5>}</h5>
     <h5>NOTE - User to whom msg is being sent must be joined to Room from other Side</h5>
     <br/>
     <input onChange={(e)=>{setMsg(e.target.value)}} placeholder='Enter Your Message...'/><br/><br/>
     <button onClick={()=>{sendmsgfn()}}>Send Message</button>
     <h2>Recieved Msg from {user} is : {recieved}</h2>
     <br/>
     <br/>
     <br/>
     

    </div>
  );
}

export default App;
