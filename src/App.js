import React from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import axios from './axios';

import Auth from './pages/Auth';
import User from './pages/User';
import Posts from './pages/Posts';
import RequireAuth from './hoc/RequireAuth';
import Header from './components/Header';

import './index.css';
import './App.css';

import { useAuth } from './hooks/useAuth';

const { Footer, Content } = Layout;
function App() {
  const [cities, setCities] = React.useState([]);
  const { signIn, user } = useAuth();
  React.useEffect(() => {
    try {
      axios.get('/api/city/all_cities').then((res) => {
        setCities(
          res.data.map((city) => ({
            value: city.id,
            label: city.name,
          })),
        );
      });
      axios.get('/api/auth/user-profile').then((res) => {
        if (res?.data) {
          signIn(res.data);
          console.log('Login successful', user);
        } else {
          console.log('Unloggined');
        }
      });
    } catch (error) {
      console.log('Some error occurred');
    }
  }, []);
  return (
    <div className='bg-white max-w-screen-2xl m-auto	'>
      <Header />
      <Routes>
        <Route exact path='/' element={<Posts />} />
        <Route exact path='/auth' element={<Auth cities={cities} />} />
        <Route
          exact
          path='/user'
          element={
            <RequireAuth>
              <User onEnter />
            </RequireAuth>
          }
        />
        <Route exact path='/dnd' element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
