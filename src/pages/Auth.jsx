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

  const registerNow = (isRegister) => {
    console.log(isRegister);
    setIsRegistration(isRegister);
    console.log(isRegistration);
  };
  return user ? (
    <Navigate to={'/'} />
  ) : (
    <Layout>
      <Content>
        {isRegistration ? (
          <Registration onAuth={registerNow} cities={cities} />
        ) : (
          <Authorization onRegister={registerNow} />
        )}
      </Content>
    </Layout>
  );
}

export default Auth;
