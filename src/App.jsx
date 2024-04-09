import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';
import Us from './pages/Us/Us';

import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/us" element={<Us />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
