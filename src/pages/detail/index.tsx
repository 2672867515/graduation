import React from 'react'
import Vr from '../../components/VR/index.tsx'
import { useParams } from 'react-router-dom';
import  './index.scss'
import { useDispatch,useSelector } from 'react-redux';
import { HeaderState } from '../../redux/action/index.jsx';
import img from '../../img/2r.jpg'
import { useHistory } from 'react-router-dom';
const Detail=(props)=> {
  let   history = useHistory()
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get('type');
  console.log(type);
  dispatch(HeaderState(type))
  const header = useSelector((state) => state.header);
  console.log(header);

  const tsarr=['特色','特色','特色']

  const housearr=[{ts:['近地铁','fg']},
  {ts:['ute','5rt']},
  {ts:['67yh','ewsf','fgh']},
  {ts:['q343dw','e33']},
  {ts:['f','fg'],hot:'超级优惠'},
  {ts:['hjk','6765g']}
]
const detial=(id)=>{
  history.push(`/detail/${id}?type=${type}`)
  
}
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
            </div>
            <div className="message">
              <div className="price">300万 <div className='per'>20305元/㎡</div></div>
                <div className="base">
                  <span>2室2厅1卫 </span>
                  <div>
                    <span className='pf'>84.9㎡</span><br />
                    <span className='zx'>精装修</span>
                  </div>
                  <div>
                    <span className='kp'>2015年开盘</span><br />
                    <span className='jf'>2019年交房</span>
                  </div>
                  
                </div>
                <div className="ts">
                  {tsarr.map((item)=>{ return <div className="tsitem">{item}</div>   })}
                </div>
                <div className="address">晋安 五四北</div>
                <div className="manager">联系人</div>
            </div>
            <div className="map">
              假装有地图
            </div>
          </div>
          <div className="lb">
          {type!=='Newhome'&&<div className="survey">
            <div className="title">房源概况</div>
            <div className="block">
         
            </div>
          </div>}
          {type==='Newhome'&&<div className="survey">
            <div className="title">楼盘户型</div>
            <div className="block">
         
            </div>
          </div>}

          <div className="comment">
            <div className="title">评论</div>
          </div>
          </div>
          <div className="alike">
            <div className="title">相关推荐</div>
          {housearr.map((item)=>{
            return (<div className="houseitem" onClick={()=>detial(2)}>
              <img className='img' src={img} alt="" />
              <div className="title">汤臣一品</div>
              <div className="size">100</div>
              <div className="address">10dss0</div>
              <div className="price">1000w <br /><span className="per">23564/㎡</span></div>
              <div className="ts">
                  {item.ts.map((item)=>{
                    return <div className="tsitems">{item}</div>
                  })}
              </div>
            </div>)
          })}
          </div>
        </div>
    </div>
  )
}
export default Detail