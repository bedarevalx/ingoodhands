import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import Authorization from '../components/Authorization';
import Registration from '../components/Registration';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const { Header, Footer, Sider, Content } = Layout;

function Auth({ cities }) {
  const { user } = useAuth();
  const [isRegistration, setIsRegistration] = React.useState(false);

  const changeToRegistration = (isRegister) => {
    setIsRegistration(isRegister);
  };
  return user ? (
    <Navigate to={'/'} />
  ) : (
    <Layout>
      <Content>
        {isRegistration ? (
          <Registration onAuth={changeToRegistration} cities={cities} />
        ) : (
          <Authorization onRegister={changeToRegistration} />
        )}
      </Content>
    </Layout>
  );
}

export default Auth;
