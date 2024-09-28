import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate('/chatbot');
  }
  const goToInformationPage = () => {
    navigate('/information');
  }
  return (
    <div>
      <div>home page</div>
      <button onClick={goToChatbot}>go to chatbot page</button>
      <button onClick={goToInformationPage}>go to information page</button>
    </div>

  )
}

export default Home
