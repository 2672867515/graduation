import React from 'react';
import './index.scss'

interface detail{
    title:string
    condition:number
}
const Search=React.memo((props:detail)=> {
    const {title,condition}=props
  return (
    <div className='searchcondition'>
        {title}
        {condition!==2&&<div className="condition">
           区域：
            <div className="area">
                <span>鼓楼</span>
                <span>晋安</span>
                <span>仓山</span>
                <span>台江</span>
                <span>马尾</span>
                <span>长乐</span>
                <span>闽侯</span>
                <span>福清</span>
                <span>平潭</span>
                <span>永泰</span>
                <span>闽清</span>
                <span>罗源</span>
            </div>
        </div>}
        {condition!==2&&condition!==3&&<div className="condition">
            售价:
            <div className="area">
                <span>1万以下</span>
                <span>1-1.5万</span>
                <span>1.5-2.5万</span>
                <span>2.5-3.5万</span>
                <span>3.5万以上</span>
            </div>
        </div>}
        {condition===2&&<div className="condition">
            售价:
            <div className="area">
                <span>100万以内</span>
                <span>100-150万</span>
                <span>150-200万</span>
                <span>200-250万</span>
                <span>250-300万</span>
                <span>300-350万</span>
                <span>350-400万</span>
                <span>400万以上</span>
            </div>
        </div>}
        {condition===3&&<div className="condition">
            租金:
            <div className="area">
                <span>800元以内</span>
                <span>800-1500元</span>
                <span>1500-3000元</span>
                <span>3000-5000元</span>
                <span>5000元以上</span>
            </div>
        </div>}
        {condition>3&& <div className="condition">
            面积：    
        </div>}
        {condition>3&& <div className="condition">
            房型：    
        </div>}
    </div>
  );
})
export default Search