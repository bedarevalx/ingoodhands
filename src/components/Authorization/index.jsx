import React from 'react';
import axios from '../../axios';
import 'antd/dist/antd.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useAuth } from '../../hooks/useAuth';
function Authorization({ onRegister }) {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const { signIn } = useAuth();
  const submitLogin = () => {
    console.log(emailInput, ' ', passwordInput);
    axios
      .post('/api/auth/login', {
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        console.log('Email:', emailInput, ' Password:', passwordInput);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        console.log('Signed in by auth');
        signIn(res.data);
        navigate('/');
      });
  };

  const getUserInfo = () => {
    console.log(localStorage.getItem('access_token'));
    axios.get('/api/auth/user-profile').then((res) => {
      console.log(res);
    });
  };
  const submitLogOut = () => {
    localStorage.clear();
    console.log(localStorage.getItem('access_token'));
  };

  return (
    <div className='wrapper-login'>
      <h1>Войти в аккаунт</h1>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={() => submitLogin()}>
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'E-mail введен неверно',
              type: 'email',
            },
          ]}>
          <Input
            className='border10'
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='E-mail'
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            className='border10'
            type='password'
            placeholder='Пароль'
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>
          <a className='login-form-forgot' onClick={() => getUserInfo()}>
            Забыли пароль?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button border10'>
            Войти
          </Button>
          или <a onClick={() => onRegister(true)}>Зарегистрироваться!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Authorization;
