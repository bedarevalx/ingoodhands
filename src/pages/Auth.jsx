import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import Authorization from '../components/Authorization';
import Registration from '../components/Registration';
import { AppContext } from '../App';
import { Navigate } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

function Auth({ cities }) {
  const { isLoggined } = React.useContext(AppContext);
  const [isRegistration, setIsRegistration] = React.useState(false);

  const registerNow = (isRegister) => {
    console.log(isRegister);
    setIsRegistration(isRegister);
    console.log(isRegistration);
  };
  return isLoggined ? (
    <Navigate to={'/user'} />
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
