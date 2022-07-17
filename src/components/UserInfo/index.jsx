import React from 'react';
import AppContext from '../../App';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
function UserInfo() {
  const navigate = useNavigate();
  return (
    <div>
      UserInfo
      <Link to='/'>
        <button>Posts</button>
      </Link>
    </div>
  );
}

export default UserInfo;
