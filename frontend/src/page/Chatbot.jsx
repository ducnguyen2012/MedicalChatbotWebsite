import React, { useState } from 'react';
import '../CSS/chatbot.css';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessages = [...messages, { text: message, sender: 'user' }];
    setMessages(newMessages);
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:10000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setMessages([...newMessages, { text: data.response, sender: 'bot' }]);
      setLoading(false);
    } catch (error) {
      console.log('Error sending message:', error);
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((mess, index) => (
          <div key={index} className={`chat-bubble ${mess.sender}`}>
            {mess.sender === 'bot' && <img className="message-icon" src={require("./chatbotIcon.jpeg")} alt="Bot" />}
            <div className="message-text">{mess.text}</div>
            {mess.sender === 'user' && <img className="message-icon" src={require("./userIcon.png")} alt="User" />}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble bot chatbot-is-thinking">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-box">
        <input
          type="text"
          placeholder="Nhập câu hỏi của bạn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default Chatbot;
