import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  useEffect(() => {
    if (localStorage.getItem('userid')) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <div className="App">
      <h1>App</h1>
      <Routes>
        <Route path='*' element={isLoggedIn ? <Dashboard /> : <Login logFunction={loginUser} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
