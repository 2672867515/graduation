// import './App.css';
import React,{Suspense, useEffect, useState} from "react";
import { Route,Link,Switch,Redirect,useHistory  } from 'react-router-dom';
import routes from './router.ts'
import Header from './components/header/index.tsx'

function App(props) {

  return (
    <div className="App">
     <Header />
        {/* 注册路由 */}
      <Suspense>
        <Switch>
          {routes.map((item,index)=>{
           return <Route path={item.path} key={index} component={item.component} />
          })}
          <Redirect to="/home" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
