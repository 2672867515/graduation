import React from 'react';
import './index.scss'
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action';
import { useHistory } from 'react-router-dom';
interface detail{
    title:string
    condition:number
    type:String
}
const Search=React.memo((props:detail)=> {
    
    const {title,condition,type}=props
    let   history = useHistory() //将useHistory()钩子赋值给history方便使用
    const dispatch = useDispatch();
    const area=[
        {name:'鼓楼',path:'gl'},
        {name:'晋安',path:'ja'},
        {name:'仓山',path:'cs'},
        {name:'台江',path:'tj'},
        {name:'马尾',path:'mw'},
        {name:'长乐',path:'cl'},
        {name:'闽侯',path:'mh'},
        {name:'福清',path:'fq'},
        {name:'平潭',path:'pt'},
        {name:'永泰',path:'yt'},
        {name:'闽清',path:'mq'},
        {name:'罗源',path:'ly'},
        {name:'连江',path:'lj'},
    ]
    const newprice=[
        {name:'1万以下',path:'max1'},
        {name:'1-1.5万',path:'max1.5'},
        {name:'1.5-2万',path:'max2'},
        {name:'2-2.5万',path:'max2.5'},
        {name:'2.5-3万',path:'max3'},
        {name:'3万以上',path:'min3'},
    ]
    const usedprice=[
        {name:'100万以内',path:'max100'},
        {name:'100-150万',path:'max150'},
        {name:'150-200万',path:'max200'},
        {name:'200-250万',path:'max250'},
        {name:'250-300万',path:'max300'},
        {name:'300-350万',path:'max350'},
        {name:'350-400万',path:'max400'},
        {name:'400万以上',path:'min400'},
    ]
    const rentprice=[
        {name:'1000元以内',path:'max0.1'},
        {name:'1000-2000元',path:'max0.2'},
        {name:'2000-3000元',path:'max0.3'},
        {name:'3000-4000元',path:'max0.4'},
        {name:'4000元以上',path:'min0.4'},
    ]
    const search=(path)=>{
        history.push(`/${type}/${path}`)
        dispatch(HeaderState(type))
    }
  return (
    <div className='searchcondition'>
        {title}
        {condition!==2&&<div className="condition">
           区域：
            <div className="area">
                { area.map((item,index)=>{
                   return <span onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
        {condition!==2&&condition!==3&&<div className="condition">
            售价:
            <div className="area">
            { newprice.map((item,index)=>{
                   return <span onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
        {condition===2&&<div className="condition">
            售价:
            <div className="area">
            { usedprice.map((item,index)=>{
                   return <span onClick={()=>search(item.path)}>{item.name}</span>
                })}
            </div>
        </div>}
        {condition===3&&<div className="condition">
            租金:
            <div className="area">
            { rentprice.map((item,index)=>{
                   return <span onClick={()=>search(item.path)}>{item.name}</span>
                })}
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