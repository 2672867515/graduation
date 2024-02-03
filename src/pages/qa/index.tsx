import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import './index.scss'
import { Input, message } from 'antd';
const Qa=()=> {
  const dispatch = useDispatch();
  dispatch(HeaderState('Question'))
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div className='qa'>
       {contextHolder}
        <div className="head">
            <div className="hc">
              <span className="project">基于three.js的3D选房平台</span>
              <span className="pagetype">|  小区问答</span>
            </div>
        </div>
        <div className="qacontent">
        awqwqwqwq{id}
        </div>

    </div>
  );
}
export default Qa