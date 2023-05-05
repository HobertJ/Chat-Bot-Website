// import React, { useState, useRef, useEffect } from 'react';
// import { chatService } from '../service/chat';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './SendChat.css';

// // udah bisa nyimpen chat data; question sama reply

// function SendChat({algorithm, handleChatDataChange, chatData }) {
//   const [chatInput, setChatInput] = useState('');
//   const [reply, setReply] = useState('');
  

//   // reply harusnya udah kesave di variabel ini ^
//   // sisa logika munculin input & reply, 
//   const inputRef = useRef(null);

//   function handleChatInput(event) {
//     setChatInput(event.target.value);
//     inputRef.current.style.height = 'auto';
//     inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
//   }

//   function handleSendChat() {
//   console.log(chatInput);
//   inputRef.current.style.height = 'auto';
  
//   //TODO : call chatService BENERIN 
//   //setReply(chatService(chatInput, algorithm));

//   // Memanggil endpoint chat di backend server
//   const response = await fetch('http://localhost:5000/chat', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       question: chatInput,
//       algo: algorithm
//     })
//   });

//   if (response.ok) {
//     const data = await response.json();
//     setReply(data.reply);
//   // Save reply from chatbot
//   const newChatData = {
//     message: chatInput,
//     // ganti pake reply asli
//     reply: reply
//   };
  
//   handleChatDataChange(newChatData);
//   setChatInput('');
// }

//   return (
//     <div className="sendchat-container position-fixed bottom-0 end-0 p-3">
//       <div className="input-group input-group d-flex flex-column">
//         <div>
//           <textarea
//             ref={inputRef}
//             className="sendchat-input"
//             placeholder="Type your message here..."
//             value={chatInput}
//             onChange={handleChatInput}
//           />
//         </div>
//         <div>
//           <button className="btn sendchat-button" onClick={handleSendChat}>
//             Send
//           </button>
//         </div>
//       </div>
//       <p className="footer">
//         Free Research Preview. ChatIME may produce inaccurate information about
//         people, places, or facts. ChatIME May 05 Version.
//       </p>
//     </div>
//   );
// }

// export default SendChat;


import React, { useState, useRef, useEffect } from 'react';
import { chatService } from '../service/chat';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './SendChat.css';



function SendChat({ algorithm, handleChatDataChange, chatData }) {
  const [chatInput, setChatInput] = useState('');
  const [reply, setReply] = useState('');
  const inputRef = useRef(null);

  function handleChatInput(event) {
    setChatInput(event.target.value);
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
  }

  async function handleSendChat() {
    console.log(chatInput);
    inputRef.current.style.height = 'auto';

    const BE_URL = "http://localhost:5000";
    // console.log(BE_URL + "/chat");
    fetch(BE_URL + "/chat", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({question: chatInput, algo: "kmp"})
      
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      // Handle successful response
      // console.log("masuk data");
      const newChatData = {
        message: chatInput,
        reply: data.message,
      };
      handleChatDataChange(newChatData);
      setChatInput('');
    })
    .catch(error => {
      // Handle error
      console.error('There was a problem with the fetch operation:', error);
    });

    
    // setReply(chatService(chatInput, algorithm));

  }

  return (
    <div className="sendchat-container position-fixed bottom-0 end-0 p-3">
      <div className="input-group input-group d-flex flex-column">
        <div>
          <textarea
            ref={inputRef}
            className="sendchat-input"
            placeholder="Type your message here..."
            value={chatInput}
            onChange={handleChatInput}
          />
        </div>
        <div>
          <button className="btn sendchat-button" onClick={handleSendChat}>
            Send
          </button>
        </div>
      </div>
      <p className="footer">
        Free Research Preview. ChatIME may produce inaccurate information about
        people, places, or facts. ChatIME May 05 Version.
      </p>
    </div>
  );
}

export default SendChat;