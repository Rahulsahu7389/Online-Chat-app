// import { useEffect, useRef, useState } from 'react'
// import { useMemo } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { io } from 'socket.io-client';
// import { Container, TextField, Typography } from '@mui/material';

// function App() {
//   let obj = {};
//   const [count, setCount] = useState(0)

//   const socket = useMemo(()=>io("http://localhost:3000"),[])//now made one socket to connet to ckt but wiil look into cors now
//   const [message, setMessage] = useState("")
//   const [message2, setMessage2] = useState("")
//   const [messages, setMessages] = useState([])

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("connected", socket.id);
//       // console.log(obj);
//     })
    
//     // let name = useRef(prompt("enter your name : "));
//     // arr.push({"id":socket.id,"name":name})
    

//     socket.on("welcome", (s) => {
//       console.log(s);
//     })

//     socket.on("received-mssg",(s)=>{
//       console.log(s)
//       setMessages((messages=>[...messages,s]));
//     })
//     // return ()=>{
//     //   socket.disconnect();
//     // }


//   }, [])

//   const handlesubmit = (e) => {
//     e.preventDefault();//prevent loading
//     socket.emit("message", message)
//     setMessage("")

//   }

//   // const handlesubmit2 = (e) => {
//   //   e.preventDefault();//prevent loading
//   //   setMessage3(message3.push({"id":socket.id, "name":message2}))
//   //   arr.push({"id":socket.id, "name":message2})
//   //   setMessage2("")
//   //   socket.emit("data-de-rha", message3)
//   //   setMessage("")

//   // }



//   // return (
//   //   <>
//   //     <div>

//   //       <h2>this is created by me</h2>
//   //       <a href="https://vite.dev" target="_blank">
//   //         <img src={viteLogo} className="logo" alt="Vite logo" />
//   //       </a>
//   //       <a href="https://react.dev" target="_blank">
//   //         <img src={reactLogo} className="logo react" alt="React logo" />
//   //       </a>
//   //     </div>
//   //     <h1>Vite + React</h1>
//   //     <div className="card">
//   //       <button onClick={() => setCount((count) => count + 1)}>
//   //         count is {count}
//   //       </button>
//   //       <p>
//   //         Edit <code>src/App.jsx</code> and save to test HMR
//   //       </p>
//   //     </div>
//   //     <p className="read-the-docs">
//   //       Click on the Vite and React logos to learn more
//   //     </p>
//   //   </>
//   // )
//   // let abc = message3;
//   // let naam = arr.find(user => user.id === socket.id)



//   // console.log(naam);
//   // console.log(arr);
  
  
//   return (<>
//     <div className="container">

      

//       <form onSubmit={handlesubmit}>
//         <input value={message} onChange={(e) => {
//           setMessage(e.target.value)
//         }}  />
//         <button variant="contained" color='primary'>send</button>
//       </form>

//       <div className="text">

      
//       {
//         messages.map((m,i)=>{
//          return <div key={i}>
//             {m}
//           </div>
          
//         })
//       }

//       </div>
      

//     </div>
//   </>
//   )
// }

// export default App

// import { useEffect, useState, useMemo } from "react";
// import { io } from "socket.io-client";

// function App() {
//   const [username, setUsername] = useState("");
//   const [isUsernameSet, setIsUsernameSet] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const socket = useMemo(() => io("http://localhost:3000"), []);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected with ID:", socket.id);
//     });

//     socket.on("received-mssg", (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const handleUsernameSubmit = (e) => {
//     e.preventDefault();
//     if (username.trim()) {
//       setIsUsernameSet(true);
//     }
//   };

//   const handleMessageSubmit = (e) => {
//     e.preventDefault();
//     const userMessage = { sender: username, text: message };
//     socket.emit("message", userMessage);
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setMessage("");
//   };

//   return (
//     <div className="container" style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
//       {!isUsernameSet ? (
//         <form onSubmit={handleUsernameSubmit}>
//           <h2>Enter your name:</h2>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your name"
//             style={{ padding: "8px", fontSize: "16px" }}
//           />
//           <button type="submit" style={{ padding: "8px", marginLeft: "10px" }}>
//             Submit
//           </button>
//         </form>
//       ) : (
//         <>
//           <h2>Welcome, {username}!</h2>
//           <div style={{ marginTop: "20px" }}>
//             <form onSubmit={handleMessageSubmit}>
//               <input
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message"
//                 style={{ padding: "8px", fontSize: "16px", width: "80%" }}
//               />
//               <button
//                 type="submit"
//                 style={{
//                   padding: "8px",
//                   marginLeft: "10px",
//                   backgroundColor: "#4CAF50",
//                   color: "white",
//                   border: "none",
//                 }}
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//           <div style={{ marginTop: "20px" }}>
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   justifyContent: msg.sender === username ? "flex-start" : "flex-end",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div
//                   style={{
//                     backgroundColor: msg.sender === username ? "#d1f7c4" : "#f0f0f0",
//                     padding: "10px",
//                     borderRadius: "10px",
//                     maxWidth: "60%",
//                   }}
//                 >
//                   <strong>{msg.sender === username ? "You" : msg.sender}:</strong> {msg.text}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected with ID:", socket.id);
    });

    // Update messages only when received from the server
    socket.on("received-mssg", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    // Emit the message without adding it directly to the state
    const userMessage = { sender: username, text: message };
    socket.emit("message", userMessage);

    // Clear the input field
    setMessage("");
  };

  return (
    <div className="container" style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      {!isUsernameSet ? (
        <form onSubmit={handleUsernameSubmit}>
          <h2>Enter your name:</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            style={{ padding: "8px", fontSize: "16px" }}
          />
          <button type="submit" style={{ padding: "8px", marginLeft: "10px" }}>
            Submit
          </button>
        </form>
      ) : (
        <>
          <h2>Welcome, {username}!</h2>
          <div style={{ marginTop: "20px" }}>
            <form onSubmit={handleMessageSubmit}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                style={{ padding: "8px", fontSize: "16px", width: "80%" }}
              />
              <button
                type="submit"
                style={{
                  padding: "8px",
                  marginLeft: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                }}
              >
                Send
              </button>
            </form>
          </div>
          <div style={{height:"85vw" , backgroundColor:"beige" }}>

          <div style={{ marginTop: "20px"  }}>
            {messages.map((msg, index) => (
              <div
              key={index}
              style={{
                display: "flex",
                justifyContent: msg.sender === username ? "flex-start" : "flex-end",
                marginBottom: "10px",
              }}
              >
                <div
                  style={{
                    backgroundColor: msg.sender === username ? "#d1f7c4" : "#f0f0f0",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "60%",
                  }}
                  >
                  <strong>{msg.sender === username ? "You" : msg.sender}:</strong> {msg.text}
                </div>
              </div>
            ))}
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;