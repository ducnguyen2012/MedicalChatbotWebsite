import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
import Chatbot from './page/Chatbot';
import Home from './page/Home';
import Information from './page/Information';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useLocation } from 'react-router';
import {motion} from "framer-motion"

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
}

const pageVariants = {
  initial: {opacity: 0, x: "-100vw"},
  in: {opacity: 1, x: 0},
  out: {opacity: 0, x: "100vw"},
}
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div>
    <TransitionGroup>
      <CSSTransition key={location.pathname} timeout={500} >
      <Routes location={location} key={location.pathname}>
          <Route path='/' element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Home /></motion.div>} />
          <Route path='/chatbot' element={<Chatbot />} />
          <Route path='/information' element={<Information />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
    </div>
  )
}
function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
        
      
  
}

export default App;
