import React from 'react';
import DragField from '../components/DragField';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AppContext } from '../App';
function Posts() {
  const { user, signOut } = useAuth();
  const { setIsLoggined } = React.useContext(AppContext);

  const logOut = () => {
    setIsLoggined(false);
    signOut(console.log('logouted'));
  };

  return (
    <>
      {user ? 'userInfo' : 'Please log in'}
      {user && <button onClick={() => logOut()}> LogOut</button>}
      <Link to='/user'>
        <button>User Info</button>
      </Link>
      <DragField />
    </>
  );
}

export default Posts;
