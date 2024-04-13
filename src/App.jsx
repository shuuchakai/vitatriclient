import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';
import Us from './pages/Us/Us';

import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';
import VerifyEmail from './pages/Auth/VerifyEmail/VerifyEmail';

import DashboardHome from './pages/Dashboard/DashboardHome/DashboardHome';
import DashboardProfile from './pages/Dashboard/DashboardProfile/DashboardProfile';
import DashboardFood from './pages/Dashboard/DashboardFood/DashboardFood';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* General */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/us" element={<Us />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/settings" element={<DashboardProfile />} />
          <Route path="/dashboard/food" element={<DashboardFood />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
