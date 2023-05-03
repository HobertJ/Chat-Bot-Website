import React from 'react'
import NewChat from './components/NewChat'
import History from './components/History'
import Algorithm from './components/Algorithm'
import SendChat from './components/SendChat'
import ChatBoba from './components/ChatBoba'


function App() {
  return (
    <div>
      <div>
        <NewChat />
      </div>
      <div>
        <History />
      </div>
      <div> 
        <Algorithm />
      </div>
      <div>
        <ChatBoba />
      </div>
      <div>
        <SendChat />
      </div>
    </div>
  )
}

export default App
