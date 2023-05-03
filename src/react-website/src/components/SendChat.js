import React, { useState, useRef } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './SendChat.css';

function SendChat() {
  const [chatInput, setChatInput] = useState('');
  const inputRef = useRef(null);

  function handleChatInput(event) {
    setChatInput(event.target.value);
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
  }

  function handleSendChat() {
    // TODO: handle send chat logic
    console.log(chatInput);
    setChatInput('');
    inputRef.current.style.height = 'auto';
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
