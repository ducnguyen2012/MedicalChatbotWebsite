import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/home.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-title">Welcome to Our Website</div>
      <div className="home-buttons">
        <button onClick={() => navigate('/chatbot')}>Go to Chatbot Page</button>
        <button onClick={() => navigate('/information')}>Go to Information Page</button>
      </div>
    </div>
  );
};

export default Home;

