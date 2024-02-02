import React from 'react';
import './index.scss'
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
const Question=()=> {
  const dispatch = useDispatch();
  dispatch(HeaderState('Question'))
  const queryParams = new URLSearchParams(window.location.search);
  const qs = queryParams.get('qs')||0;
  const house = queryParams.get('house')||0;
  console.log(qs);
  console.log(house);
  
  return (
    <div className='question'>
        <div className="head">
          <span className="project">基于three.js的3D选房平台</span>
          <span className="pagetype">|  小区问答</span>
        </div>
    Question
    </div>
  );
}
export default Question