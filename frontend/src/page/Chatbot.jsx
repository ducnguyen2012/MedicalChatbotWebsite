import React, { useState } from 'react'
import '../CSS/chatbot.css'
const Chatbot = () => {
const [message, setMessage] = useState('')
const [messages, setMessages] = useState([])
const [response, setResponse] = useState('not access!')
const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent empty message:
    if (!message.trim()) return;
    // store vector of message!
    const newMessages = [...messages, {text: message, sender: 'user'}];
    setMessages(newMessages)
    setMessage('');
    try{
        const res = await fetch("http://127.0.0.1:5000/chatbot", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message}),
        }
        );

        const data = await res.json();

        // fetch response from backend, and add it to array prevMessage
        setMessages((prevMessage)=> [
            ...prevMessage, {text: data.response, sender: 'bot'},
        ]);
        setResponse(data.response)


        console.log("response from backend: ", data)
    } catch (error) {
        console.log("error sending message: ",error)
    }
} 
  return (
    <div className="Chatbotmain">
        <div>Tư vấn với dược sĩ online của chúng tôi!</div>
        <div className="chat-window">
            <div className="messages">
                {messages.map((mess, index) => (
                    <div key={index} className={mess.sender === 'user' ? 'message user': 'message bot'}>
                        {mess.text} 
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
                <input type="text" placeholder='enter your question' value={message} onChange={(e)=> setMessage(e.target.value)}/>

                <button type='submit'>Send</button>
            </form>
        </div>
    </div>
  )
}

export default Chatbot
