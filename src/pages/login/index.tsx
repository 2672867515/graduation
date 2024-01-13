import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss'
import { Button, Form, Input } from 'antd';
import { LockOutlined , UserOutlined } from '@ant-design/icons';

const  Login=(props)=> {
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const [login,Setlogin]=useState('login')
  const onFinish = (values: any) => {
    console.log('Success:', values);
    history.push(`/Page1`)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const register=()=>{
    Setlogin('register')
  }
  type FieldType = {
    username?: string;
    password?: string;
  };
 
  return (
    <div className='login-box'>
      <div className="title">基于three.js的3D选房平台</div>
      <div className="modal">
        <div className="state">登录</div>
        {login==='register'&&<div className="state">注册</div>}
      <Form
        name="login"
        wrapperCol={{  offset: 2, span: 20 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input size="large"  prefix={<UserOutlined className="site-form-item-icon" />}  />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password size="large"  prefix={<LockOutlined  className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
          <Button  size="large" type="primary" htmlType="submit" block style={{ backgroundColor: 'rgb(0, 160, 0)', borderColor: 'rgb(0, 150, 0)' }} >
            登录
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
          <Button onClick={register} size="large"  block>
            没有账号，去注册
          </Button>
        </Form.Item>
      </Form>
      {login==='register'&&<Form
      name="dependencies"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      layout="vertical"
    >
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      {/* Field */}
      <Form.Item
        label="Confirm Password"
        name="password2"
        dependencies={['password']}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>

    </Form>}
      </div>
    </div>
  );
}
export default Login