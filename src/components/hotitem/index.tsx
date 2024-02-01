import React from 'react';
import loading from '../../img/loading.gif'
import './index.scss'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action';
 const Hotitem=(props)=> {
    const {id,type,name,size,price}=props
    let   history = useHistory() //将useHistory()钩子赋值给history方便使用
    const dispatch = useDispatch();
    const detial=(type)=>{
        history.push(`/detail/${id}?type=${type}`)
        dispatch(HeaderState(type))
        
    }
  return (
    <div className='Hotitem' onClick={()=>detial(type)}>
        <div className="hot-content">
        <img className="hot-img" src={loading} alt='' />
            <div className="hot-detail">
              <div className="hot-name">{name}</div>
              <div className="hot-size">{size}</div>
              {type!=='Newhome'&&<div className="hot-price">{price}</div>}
              {type==='Newhome'&&<div className="hot-price">{price}/㎡</div>}
            </div>
        </div>
    </div>
  );
}
export default Hotitem