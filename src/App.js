// import './App.css';
import React,{Suspense, useEffect, useState} from "react";
import { Route,Link,Switch,Redirect,useHistory  } from 'react-router-dom';
import routes from './router.ts'
// const Vr = lazy(() => import('./VR/index.tsx')); 
// const Page1 = lazy(() => import('./pages/page1/index.tsx')); 
import Header from './components/header/index.tsx'

function App(props) {
  const [show,Setshow]=useState(true)
  const history=useHistory()
  console.log(history);
  useEffect(()=>{
    const unlisten = history.listen(() => {
      // 当路由改变时执行的代码
      if(history.location.pathname==='/Login')
      Setshow(false)
      else
      Setshow(true)
    });
    // 清理函数，用于在组件卸载时取消监听
    return () => {
      unlisten();
    };
  },[history])
  return (
    <div className="App">
     {show&&<Header />}
        {/* 注册路由 */}
      <Suspense>
        <Switch>
          {routes.map((item,index)=>{
           return <Route path={item.path} key={index} component={item.component} />
          })}
          <Redirect to="/Page1" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
