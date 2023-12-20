
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import  './index.css'
import home1_left from './img/home1_left.jpg'
import home1_right from './img/home1_right.jpg'
import home1_top from './img/home1_top.jpg'
import home1_bottom from './img/home1_bottom.jpg'
import home1_front from './img/home1_front.jpg'
import home1_back from './img/home1_back.jpg'

import home2_left from './img/home2_left.jpg'
import home2_right from './img/home2_right.jpg'
import home2_top from './img/home2_top.jpg'
import home2_bottom from './img/home2_bottom.jpg'
import home2_front from './img/home2_front.jpg'
import home2_back from './img/home2_back.jpg'
import { Button, Modal, notification, Radio, Space } from 'antd';

interface HomeOjb {
  materials: [],
  btnPosition: []
}

let scene: any = null //场景
let loader: any = null

const Vr = (): ReactElement => {

  const [camera, setCamera] = useState<any>() //摄像机

  const [renderer, setRenderer] = useState<any>() //渲染器

  const [controls, setControls] = useState<any>() //鼠标控制

  const [homeArr, setHomeArr] = useState<any>([]) // 渲染的数据源

  const [currentHome, setCurrentHome] = useState('') // 当前所处房间

  const [res, setRes] = useState<any>({
    home1: {
      image: [home1_left, home1_right, home1_top, home1_bottom, home1_front, home1_back],// 左右前后上下
    
    },
    home2: {
      image: [home2_left, home2_right, home2_top, home2_bottom, home2_front, home2_back]
    }
  })

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (camera && renderer) {
      setControls(new OrbitControls(camera, renderer.domElement))//用于实现交互式的相机控制。它允许用户通过鼠标拖拽、缩放、旋转等方式来控制相机的视角和位置
    }
  }, [camera, renderer])

  useEffect(() => {
    if (controls) {
      initBaseFactor()
    }
  }, [controls])

  useEffect(() => {
    if (currentHome) {
      if (camera && renderer && controls) {
        initHome();
      }
    }
  }, [currentHome])


  // 处理数据
  const getNewData = (obj: any) => {
    return Object.entries(obj).map((v: any) => {
      return [v[0], {
        ...v[1], image: v[1].image.map((el: any) => {
          const text = loader.load(el)
          return new THREE.MeshBasicMaterial({ map: text, side: THREE.DoubleSide, })
        })
      }]
    })
  }

  const init = () => {
    loader = new THREE.TextureLoader() //纹理加载器
    const width =500;
    const height = 400
    setHomeArr(getNewData(res))
    console.log(getNewData(res));
    setCurrentHome(getNewData(res)[0][0]) // 首次进来的房间
    setCamera(new THREE.PerspectiveCamera(90, width / height, 0.1, 1000))    // 初始化相机
    // 90：这是相机的视场角度，以度为单位。它定义了可见区域的大小。
    // width / height：这是相机的宽高比，通常等于渲染窗口的宽度除以高度。这个值通常随着窗口大小的变化而变化。
    // 0.1：这是相机的近截面。这定义了相机能够看到的最近的物体到相机的距离。任何距离小于这个值的物体都不会被渲染出来。
    // 1000：这是相机的远截面。它定义了相机能够看到的最远的物体到相机的距离。任何距离超过这个值的物体也不会被渲染出来。
    setRenderer(new THREE.WebGLRenderer())   // 初始化渲染器
  }

  const initBaseFactor = () => {
    const width = 500;//浏览器窗口的当前视口宽度
    const height = 400
    scene = new THREE.Scene();
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -0.4;
    //配置渲染器
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color("#dddddd"));
    //渲染至threeDemo
    setTimeout(() => {
      document.getElementById("threeDemo")!.appendChild(renderer.domElement);
    }, 1500);
  
    // 创建controls对象;
    controls.enableDamping = true; //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    controls.minDistance = 0.01;
    controls.maxDistance = 20;
    // 监听控制器的鼠标事件，执行渲染内容
    controls.addEventListener('change', () => {
      renderer.render(scene, camera)
    })
    initHome();
    renderHome();
  }


  const initHome = () => {
    // 切换场景前把之前的物体清除掉
    const homeMesh1 = scene.getObjectByName('homeMesh')
    scene.remove(homeMesh1)
    const activeHome = homeArr.find((v: any) => v[0] == currentHome)
    // 创建一个矩形，贴上六张材质图片，模拟室内效果
    const homeGeoMetry = new THREE.BoxGeometry(40, 40, 40);
    const homeMesh = new THREE.Mesh(homeGeoMetry, activeHome[1].image);
    homeMesh.castShadow = true

    homeMesh.position.set(0, 0, 0);
    homeMesh.geometry.scale(1, 1, -1);
    homeMesh.name = "homeMesh"
    scene.add(homeMesh);
  }

  const renderHome = () => {
    requestAnimationFrame(renderHome);
    renderer.render(scene, camera);
  }
  const change=()=>{
    setCurrentHome(getNewData(res)[1][0]) 
  }
  return (
    <div className='vr'>
      {/* 场景 */}
      <div id="threeDemo" style={{ overflow: 'hidden' }}>
      </div>
      <button onClick={change}>换</button>
    </div>
  );
}
export default Vr