import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Cascader, Form, Input, Select } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios';

import { useAuth } from '../../hooks/useAuth';
const { Option } = Select;
const residences = [
  {
    value: 'test',
    label: 'Барнаултест',
  },
  {
    value: 'tesss',
    label: 'Новосибирск',
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Registration({ onAuth, cities }) {
  const { signIn } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const sendData = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone_number: data.phone,
    };
    console.log(userData);
    await axios.post('/api/auth/registr', userData).then((res) => {
      console.log(userData);
      console.log(res);
      if (res.status === 201) {
        onAuth(false);
      }
    });
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    sendData(values);
    await axios
      .post('/api/auth/login', {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log('Email:', values.email, ' Password:', values.password);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        console.log(res.status);
        signIn(res.data, navigate(fromPage));
      });
  };

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select
        style={{
          width: 70,
        }}>
        <Option value='86'>+7</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className='register-container'>
      <div className='register-content-container'>
        <div className='register-content'>
          <h1>Регистрация</h1>

          <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={onFinish}
            wrapperCol={{ span: 24 }}
            initialValues={{
              residence: ['zhejiang', 'hangzhou', 'xihu'],
              prefix: '86',
            }}
            scrollToFirstError>
            <Form.Item
              name='email'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}>
              <Input
                className='border10'
                placeholder='E-mail'
                prefix={<MailOutlined className='site-form-item-icon' />}
              />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  pattern:
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})',
                  message:
                    'Пароль должен состоять минимум из 6 символов, содержать 1 заглавную букву, 1 строчную букву, 1 цифру и 1 специальный символ',
                },
              ]}
              hasFeedback>
              <Input.Password
                className='border10'
                placeholder='Пароль'
                prefix={<LockOutlined className='site-form-item-icon' />}
              />
            </Form.Item>

            <Form.Item
              name='confirm'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  pattern:
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
                  message: 'Пароль не должен содержать пробелов',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}>
              <Input.Password
                placeholder='Подтвердите пароль'
                className='border10'
                prefix={<LockOutlined className='site-form-item-icon' />}
              />
            </Form.Item>

            <Form.Item
              name='name'
              tooltip='Укажите как к вам будут обращаться'
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите ваше имя!',
                  whitespace: true,
                },
              ]}>
              <Input
                placeholder='Имя'
                className='border10'
                prefix={<UserOutlined className='site-form-item-icon' />}
              />
            </Form.Item>

            <Form.Item
              name='city'
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, выберите ваш город!',
                },
              ]}>
              <Cascader
                options={cities}
                placeholder={'Выберите ваш город'}
                size={'large'}
              />
            </Form.Item>

            <Form.Item
              name='phone'
              rules={[
                {
                  required: true,
                  message: 'Введите ваш номер телефона!',
                },
                {
                  pattern:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                  message: 'Введите корректный номер телефона',
                },
                {
                  len: 10,
                  message: 'Введите корректный номер телефона',
                },
              ]}>
              <Input
                addonBefore={prefixSelector}
                className={'border10'}
                style={{
                  width: '100%',
                }}
                placeholder={'Номер телефона'}
              />
            </Form.Item>

            <Form.Item className='text-already-register'>
              Уже зарегистированы? <a onClick={() => onAuth(false)}>Войти!</a>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} wrapperCol={{ span: 30 }}>
              <Button
                block
                type='primary'
                htmlType='submit'
                className='border10'>
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
