import React, { useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './SendChat.css'

function SendChat() {
    const [chatInput, setChatInput] = useState('');

    function handleChatInput(event) {
        setChatInput(event.target.value);
    }

    function handleSendChat() {
        // TODO: handle send chat logic
        console.log(chatInput);
        setChatInput('');
    }

    return (
        <div className="sendchat-container position-fixed bottom-0 end-0 p-3">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message here..."
                    value={chatInput}
                    onChange={handleChatInput}
                />
                <button className="btn btn-primary" onClick={handleSendChat}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default SendChat