import React from 'react'
import { chatService } from './service/chat'
import NewChat from './components/NewChat'
import History from './components/History'
import Algorithm from './components/Algorithm'
import SendChat from './components/SendChat'
import ChatBoba from './components/ChatBoba'


function App() {
  const [algorithm, setAlgorithm] = React.useState([])
  const [chatData, setChatData] = React.useState([])

  const handleChangeAlgorithm = (algorithm) => {
    setAlgorithm(algorithm)
  }

  const handleChatDataChange = (data) => {
    setChatData((prevData) => [...prevData, data]);
  }

  return (
    <div>
      <div>
        <NewChat />
      </div>
      <div>
        <History />
      </div>
      <div> 
        <Algorithm handleChangeAlgorithm={handleChangeAlgorithm}/>
      </div>
      <div>
        <ChatBoba chatData={chatData}/>
      </div>
      <div>
        <SendChat algorithm={algorithm} handleChatDataChange={handleChatDataChange} />
      </div>
    </div>
  )
}

export default App
