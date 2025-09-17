import './App.css';
import Header from './components/header';
import Home from './components/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { Routes, Route } from "react-router-dom";
import Settings from './components/settings';
import PasswordChange from './components/passwordChange';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/passwordChange" element={<PasswordChange/>}/>
      </Routes>
    </>
  );
}

export default App;
