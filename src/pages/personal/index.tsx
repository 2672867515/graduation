import React, { useState } from 'react';
import './index.scss'
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import { Menu, type MenuProps } from 'antd';
import { QuestionCircleOutlined, UserOutlined, BulbOutlined,StarOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('个人信息', '1',<UserOutlined />),
  getItem('我的提问', '2',<QuestionCircleOutlined />),
  getItem('我回答过', '3',<BulbOutlined />),
  getItem('我的收藏', '4',<StarOutlined />),
];


const Personal=()=> {
  const dispatch = useDispatch();
  dispatch(HeaderState('Personal'))
  const [key,setKey]=useState('1')
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setKey(e.key)
    console.log(key);
  };
  return (
    <div className='personal'>
      <div className="head">
            <div className="hc">
              <span className="project">基于three.js的3D选房平台</span>
              <span className="pagetype">|  个人中心</span>
            </div>
      </div>
      <div className="pcontent">
        <div className="menu">
          <Menu
            onClick={onClick}
            defaultSelectedKeys={['1']}
            inlineCollapsed={true}
            mode="inline"
            items={items}
          />
        </div>
        <div className="realcontnet">
          {key==='1'&&<div className="personalmessage">
            1
          </div>}
          {key==='2'&&<div className="myquestion">
            2
          </div>}
          {key==='3'&&<div className="myanswer">
            3
          </div>}
          {key==='4'&&<div className="mycollect">
            4
          </div>}
        </div>
      </div>
    </div>
  );
}
export default Personal