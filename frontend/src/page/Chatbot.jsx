import React, { useState } from 'react';
import '../CSS/chatbot.css';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState('not access!');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent empty message:
    if (!message.trim()) return;

    // Add user message to messages array
    const newMessages = [...messages, { text: message, sender: 'user' }];
    setMessages(newMessages);
    setMessage('');
    
    // Set loading to true
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // Add bot response to messages array and stop loading
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, sender: 'bot' },
      ]);
      setResponse(data.response);
      setLoading(false); // Stop loading

      console.log('response from backend: ', data);
    } catch (error) {
      console.log('error sending message: ', error);
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="Chatbotmain">
      <div>Tư vấn với dược sĩ online của chúng tôi!</div>
      <div className="chat-window">
        <div className="messages">
          {messages.map((mess, index) => (
            <div key={index} className={mess.sender === 'user' ? 'message user' : 'message bot'}>
              {mess.text}
            </div>
          ))}
          {loading && (
            <div className="message bot">
              <div className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            placeholder="Enter your question"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
