import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss'
import { Button, Form, Input,message } from 'antd';
import { LockOutlined , UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LoginState,HeaderState } from '../../redux/action';
import {tologin} from '../../api/api.ts'
const  Login=(props)=> {
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const [login,Setlogin]=useState('login')
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: any) => {
    console.log('Success:', values);

    tologin('/user/login',values).then((res)=>{
      console.log(res.data);
      if(res.data.code===0){
        message.success('登录成功');
        history.push(`/Home`)
        localStorage.setItem('login','true')
        dispatch(LoginState('true'))
        dispatch(HeaderState('Home'))
      }
      else{
        message.error(res.data.msg);
      }
         
    }).catch((error)=>{
      console.log(error);
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const goregister=()=>{
    Setlogin('register')
  }
  const gologin=()=>{
    Setlogin('login')
  }

  const onRegister = (values: any) => {
    console.log('Success:', values);
  };
  const onRegisterFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  type FieldType = {
    username?: string;
    password?: string;
  };
  type FieldType2 = {
    username?: string;
    password?: string;
    password2?: string;
  };
 
  return (
    <div className="loginpage">
    {contextHolder}

    <div className='login-box'>
      <div className="title">基于three.js的3D选房平台</div>
      <div className="modal">
        {login==='login'&&<div className="state">登录</div>}
        {login==='register'&&<div className="state">注册</div>}
      {login==='login'&&<Form
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
          <Input  placeholder="账号" size="large"  prefix={<UserOutlined className="site-form-item-icon" />}  />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password  placeholder="密码" size="large"  prefix={<LockOutlined  className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
          <Button  size="large" type="primary" htmlType="submit" block style={{ backgroundColor: 'rgb(0, 160, 0)', borderColor: 'rgb(0, 150, 0)' }} >
            登录
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
          <Button onClick={goregister} size="large"  block>
            没有账号，去注册
          </Button>
        </Form.Item>
      </Form>}

      {login==='register'&&<Form
      wrapperCol={{offset:2, span: 20 }}
      name="register"
      autoComplete="off"
      onFinish={onRegister}
      onFinishFailed={onRegisterFailed}
      style={{ maxWidth: 600 }}
    >
       <Form.Item<FieldType2>
          name="username"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input  placeholder="账号" prefix={<UserOutlined className="site-form-item-icon" />}  />
        </Form.Item>

      <Form.Item<FieldType2> 
      name="password" 
      rules={[{ required: true,message: '请输入密码' }]}>
        <Input  placeholder="密码" prefix={<LockOutlined  className="site-form-item-icon" />} />
      </Form.Item>

      {/* Field */}
      <Form.Item<FieldType2>
        name="password2"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: '请再次输入密码'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密码不一致！'));
            },
          }),
        ]}
      >
        <Input  placeholder="确认密码" prefix={<LockOutlined  className="site-form-item-icon" />} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset:2, span: 20 }}>
          <Button type="primary"  htmlType="submit" size="middle"  block style={{ backgroundColor: 'rgb(0, 160, 0)', borderColor: 'rgb(0, 150, 0)' }}>
            注册
          </Button>
        </Form.Item>
      <Form.Item wrapperCol={{ offset:2, span: 20 }}>
          <Button onClick={gologin}  size="middle"  block>
            返回登录
          </Button>
        </Form.Item>
    </Form>}
      </div>
    </div>
    </div>
  );
}
export default Login