import React from 'react';
import './History.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'

function History({handleChatHistoryChange}) {
  const items = [
    { title: 'Chat 1',
      messages: [
        {
          message: "ini 1",
          reply: "hai",
        },
        {
          message: "ini 11",
          reply: "hai",
        }
      ] },
      { title: 'Chat 2',
      messages: [
        {
          message: "ini 2",
          reply: "hai",
        },
        {
          message: "ini 2",
          reply: "hai",
        }
      ] },
  ]
  // const items = ['Chat History 1', 'Chat History 2', 'Chat History 3', 'Chat History 4', 'Chat History 5', 
  //                'Chat History 6', 'Chat History 7', 'Chat History 8', 'Chat History 9', 'Chat History 10',
  //                'Chat History 11', 'Chat History 12', 'Chat History 13', 'Chat History 14', 'Chat History 15'];

  return (
    <div className='history-container'>
      {items.map(item => (
        <div key={item.title}>
          <button className='history-button' onClick={() => handleChatHistoryChange(item.messages)}>
            <i class="bi bi-chat-left-text-fill"></i>
            <span>{item.title}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default History;
