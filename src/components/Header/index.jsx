import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Typography } from 'antd';
import styles from './Header.module.scss';
const { Title } = Typography;
function Header() {
  const { user } = useAuth();
  return (
    <header className='bg-reg-color opacity-70 shadow-header font-header-text'>
      <div className='flex justify-between'>
        {/* левая часть */}
        <Link to='/'>
          <div className='flex '>
            <img src='/img/logo.svg' alt='logo' className='w-14 h-14' />
            <div className=' flex items-center'>
              <h1 className='text-3xl font-extrabold mb-0 ml-2.5'>
                В ДОБРЫЕ РУКИ
              </h1>
            </div>
          </div>
        </Link>
        {/* правая часть */}
        <ul className='flex mb-0'>
          <li className='flex mr-10 items-center '>
            <Link
              to='/create'
              style={{ textDecoration: 'none', color: 'black' }}>
              СОЗДАТЬ ОБЪЯВЛЕНИЕ
            </Link>
          </li>
          <li className='flex mr-10 items-center'>
            <Link
              to='/favorites'
              style={{ textDecoration: 'none', color: 'black' }}>
              ИЗБРАННОЕ
            </Link>
          </li>
          <li className='flex mr-10 items-center '>
            <Link to='/user' style={{ textDecoration: 'none', color: 'black' }}>
              {user ? 'ПРОФИЛЬ' : 'ВОЙТИ'}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
