import React from 'react';
import './ChatBoba.css';
import landscape from '../assets/landscape.mp4';

function ChatBoba() {
  const chatData = [
    {
      message: 'Hello',
      reply: 'Hi there!',
    },
    {
      message: 'How are you?',
      reply: 'I am doing well, thanks. How about you?',
    },
    {
      message: 'I am good too, thanks!',
      reply: 'That is great to hear!',
    },
    {
      message: 'What are you doing today?',
      reply: 'I am going to finish The Great Task',
    },
    {
      message: 'The Great Task?',
      reply: 'Tugas Besar maksudnya sob HAHAHA!!!',
    }
  ];

  return (
    <div className='chatboba-container'>
      
      <video src={landscape} autoPlay loop muted />
      <div className='overlay'></div>
      <h3 className='chatime-title'>CHATime</h3>
      <div className='chatboba-messages'>
        {chatData.map((data, index) => (
          <div key={index} className='chatboba-message'>
            <div className='chatboba-message-box'>
              <span>{data.message}</span>
              <i class="bi bi-person"></i>
            </div>
            <div className='chatboba-reply-box'>
              <i class="bi bi-cup-hot"></i>
              <span>{data.reply}</span>   
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatBoba;
