import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss'
const Newhome=(props)=> {
  const { path } = useParams();
  console.log(path);
  const queryParams = new URLSearchParams(window.location.search);
  const kw = queryParams.get('kw');
  const [inputValue, setInputValue] = useState('');
  
  const onChange=(event)=>{
    setInputValue(event.target.value);
  }
  const search=()=>{
    
    console.log(inputValue);
    
  }
  return (
    <div className='Newhome'>
      <div className="head">
        <span className="project">基于three.js的3D选房平台</span>
        <span className="pagetype">|  新房</span>
      <Input placeholder="请输入楼盘名称、地址" className='searchinput' size={'middle'}  allowClear value={inputValue} onChange={onChange}  />
      <Button className='but' size={'middle'} type="primary"  style={{width:'100px', backgroundColor: 'rgb(35,201,147)' }} onClick={()=>search}>
        搜索
      </Button>
      </div>
      <div className="searchpart">qq</div>
    

    </div>
  );
}
export default Newhome