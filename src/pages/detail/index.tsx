import React from 'react'
import Vr from '../../components/VR/index.tsx'
import { useParams } from 'react-router-dom';
import  './index.scss'
import { useDispatch,useSelector } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
const Detail=(props)=> {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get('type');
  console.log(type);
  dispatch(HeaderState(type))
  const header = useSelector((state) => state.header);
  console.log(header);

  return (
    <div className='detail'>
        <div className="head">
          <span className="project">基于three.js的3D选房平台</span>
          <span className="pagetype">|  详情</span>
        </div>
        <div className="housename">好房子急售！五四北1号线 鲁能公馆，中层南北通透全明户型</div>
        <div className="content">
          <Vr />
          <div className="details">
            <div className="tip">
              <div className="ad">
                热门好房
              </div>
              <span className="vr">支持VR</span>
              <div className="price">300万 <span>20305元/㎡</span></div>
            </div>
          </div>
        </div>
    </div>
  )
}
export default Detail