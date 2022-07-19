import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tabs, Button, Popconfirm } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import Popup from '../Popup';
const { TabPane } = Tabs;

function UserInfo() {
  const { user, signOut } = useAuth();

  const [popUpVisible, setPopUpVisible] = React.useState(false);
  const handleMenu = (handleValidation) => {
    if (handleValidation) {
      user.email_verified_at = true;
    }
    setPopUpVisible(!popUpVisible);
  };
  const navigate = useNavigate();
  const colors = ['#ff0000', '#ffff00', '#', '#0096ff'];
  const styleBg = `bg-[${colors[(user.name.length - 1) % colors.length]}]`;
  return (
    <div className='px-24 py-20'>
      <h1 className='text-4xl strong text-center border-b-4 mb-10'>
        <b>Мой профиль</b>
      </h1>
      <div className='flex justify-around'>
        <div className='flex flex-col items-center'>
          <div
            className={`bg-[#00ff00] h-[96px] w-[96px] rounded-full flex justify-center items-center border-4 border-[#37379a] mb-10`}>
            <b className='text-5xl'>{user.name[0]}</b>
          </div>
          <Button type='default' onClick={() => signOut()} danger>
            Выйти из аккаунта
          </Button>
        </div>
        <div className=''>
          <Tabs size='large' defaultActiveKey='1'>
            <TabPane className='p-5' tab='Информация о пользователе' key='1'>
              <ul>
                <li>Имя: {user.name}</li>
                <li className='flex'>
                  E-Mail: {user.email}
                  {user.email_verified_at ? null : (
                    <div className='relative'>
                      <b onClick={() => handleMenu()}>Подтвердить E-Mail</b>
                      <Popup
                        classname={popUpVisible ? 'visible' : 'invisible'}
                        handleMenu={handleMenu}></Popup>
                    </div>
                  )}
                </li>
                <li>Номер телефона: {user.phone_number}</li>
                <li>Город: {user.city}</li>
              </ul>
            </TabPane>
            <TabPane tab='Адреса' key='2'>
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab='Мои объявления' key='3'>
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab='Мои отзывы' key='4'>
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
