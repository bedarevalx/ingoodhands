import React from 'react';

import Auth from './pages/Auth';
import User from './pages/User';
import { Routes, Route } from 'react-router-dom';
import './index.css';

import './App.css';
import Posts from './pages/Posts';
import { AuthProvider } from './hoc/AuthProvider';
import RequireAuth from './hoc/RequireAuth';
import { useAuth } from './hooks/useAuth';
import axios from './axios';
export const AppContext = React.createContext({});
const cities = [];
function App() {
  const [isLoggined, setIsLoggined] = React.useState(false);

  React.useEffect(() => {
    try {
      axios.get('/api/auth/user-profile').then((res) => {
        if (res?.data) {
          // signIn(res.data, console.log('loggined'));
          setIsLoggined(true);
          console.log('Login successful');
        } else {
          console.log('Unloggined');
          setIsLoggined(false);
        }
      });
    } catch (error) {
      console.log('Some error occurred');
    }
  }, []);
  return (
    <AppContext.Provider value={{ isLoggined, setIsLoggined }}>
      <AuthProvider>
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
      </AuthProvider>
    </AppContext.Provider>
  );
}

export default App;
