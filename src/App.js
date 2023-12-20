// import './App.css';
import React,{Suspense} from "react";
import { Route,Link,Switch,Redirect } from 'react-router-dom';
import { lazy } from 'react';
import routes from './router.ts'
// const Vr = lazy(() => import('./VR/index.tsx')); 
// const Page1 = lazy(() => import('./pages/page1/index.tsx')); 
import Header from './components/header/index.tsx'

function App() {
  return (
    <div className="App">
      <Header />
        {/* 注册路由 */}
      <Suspense fallback={<h1>loading...</h1>}>
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
