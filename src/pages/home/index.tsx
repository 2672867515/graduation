import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import Search from '../../components/search/index.tsx'
import banner1 from '../../img/banner1.jpg';
import banner2 from '../../img/banner2.png';
import banner3 from '../../img/banner3.png';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { HeaderState } from '../../redux/action';
import {
  ArrowUpOutlined
} from '@ant-design/icons';
import loading from '../../img/2ba.jpg'
import Hotitem from '../../components/hotitem/index.tsx'
const Home=(props)=> {
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const dispatch = useDispatch();
  const bannerArr=[banner1,banner2,banner3]
  const [url,setUrl]=useState(bannerArr[0])
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [topbanner, setTopbanner] = useState(false);
  const hotnew=[1,2,3,4,5,6,7,8]
  const hothouse=[1,2,3,4]
  //轮播
  useEffect(()=>{
    let i=0
    setInterval(()=>{
      i++
      setUrl(bannerArr[i])
      if(i===3){
        setUrl(bannerArr[0])
        i=0
      }
    },5000)
    const intervalId = setInterval(() => {
      setTopbanner((prevValue) => !prevValue);
    }, 5000);


    // 在组件卸载时清除定时器，以避免资源泄漏
    return () => clearInterval(intervalId);
  },[])
  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      // 当页面滚动超过 100 像素时，显示返回顶部按钮
      setIsVisible(window.scrollY > 400);
    };

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);

    // 在组件卸载时清除监听器，以防止内存泄漏
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // 使用 window.scrollTo() 方法滚动到顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滚动效果
    });
  };

  const onChange=(event)=>{
    setInputValue(event.target.value);
  }

  const search=(type)=>{
    history.push(`/${type}/to?kw=${inputValue}&type=${type}`)
    dispatch(HeaderState(type))
  }

  const more=(type)=>{
    history.push(`/${type}/all?type=${type}`)
    dispatch(HeaderState(type))
    
}
const detial=(id)=>{
  history.push(`/detail/${id}?type=Newhome`)
  dispatch(HeaderState('Newhome'))
  
}
  return (
    <div className='mainbox'>
      <img className="bg" src={url} alt='bg' />
      {isVisible &&  <Button className='toTop' onClick={scrollToTop}  shape="circle" icon={<ArrowUpOutlined  />}></Button>}
      <div className="bg-text">
      基于three.js的3D选房平台
      </div>
      <div className="search">
      <Input placeholder="请输入楼盘名称、地址" className='searchinput' size={'large'}  allowClear value={inputValue} onChange={onChange}  />
      <div className="searchbut">
      <Button className='but' size={'large'} type="primary"  style={{width:'100px', backgroundColor: 'rgb(82,196,26)' }} onClick={()=>search('Newhome')}>新房</Button>
      <Button className='but' size={'large'} type="primary"  style={{width:'100px', backgroundColor: 'rgb(250,140,22)' }}onClick={()=>search('Used')}>二手房</Button>
      <Button className='but' size={'large'} type="primary"  style={{width:'100px', backgroundColor: 'rgb(19,194,194)'}}onClick={()=>search('Rent')}>租房</Button>
      </div>
      <div className="fastSearch">

        <Search title='新房' condition= {1} type='Newhome' />

        <Search title='二手房' condition= {2} type='Used'/>

        <Search title='租房' condition= {3} type='Rent'/>

      </div>
      </div>
      <div className="content">
        <div className="content-part">
          
          <div className="hot-title">热门套房</div>
          <div className="banner">
            <div className="part1" style={{marginLeft:topbanner?'-100%':'0'}}>
            {hothouse.map(()=>{
              return( <div className="part1-content" onClick={()=>detial(1)}>
              <img className="part1-img" src={loading} alt='' />
                  <div className="part1-detail">
                    <div className="part1-name">{1}</div>
                    <div className="part1-size">{1}</div>
                    <div className="part1-price">{1}</div>
                  </div>
              </div>)
            })}
            </div>
          </div>
        </div>
        <div className="content-part">
          <div className="hot-title">精选新房</div>
          <div className="hot-more" onClick={()=>more('Newhome')}>查看更多</div>
          <div className="part-item">
            {hotnew.map(()=>{
              return <Hotitem id={2} type='Newhome' name='汤臣一品' size='1-1-1' price='1000w'  />
            })}
          </div>
        
        </div>
        <div className="content-part">
          <div className="hot-title">精选二手房</div>
          <div className="hot-more" onClick={()=>more('Used')}>查看更多</div>
          <div className="part-item">
            {hotnew.map(()=>{
              return <Hotitem id={2} type='Used' name='汤臣一品' size='1-1-1' price='1000w'  />
            })}
          </div>
        
        </div>
        <div className="content-part">
          <div className="hot-title">热租好房</div>
          <div className="hot-more" onClick={()=>more('Rent')}>查看更多</div>
          <div className="part-item">
            {hotnew.map(()=>{
              return <Hotitem id={2} type='Rent' name='汤臣一品' size='1-1-1' price='1000w'  />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
