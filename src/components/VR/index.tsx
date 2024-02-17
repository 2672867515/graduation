
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import  './index.scss'
// import {image} from '../../image.ts'
import { useParams } from 'react-router-dom';
import {
  ArrowsAltOutlined
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { getByid, queryImageById } from '../../api/api.ts';

interface HomeOjb {
  materials: [],
  btnPosition: []
}

let scene: any = null //场景
let loader: any = null

const Vr = (props): ReactElement => {
  const [image,setImage]=useState({})
  const [camera, setCamera] = useState<any>() //摄像机

  const [renderer, setRenderer] = useState<any>() //渲染器

  const [controls, setControls] = useState<any>() //鼠标控制

  const [homeArr, setHomeArr] = useState<any>([]) // 渲染的数据源

  const [currentHome, setCurrentHome] = useState('') // 当前所处房间

  const [res, setRes] = useState<any>(image)

  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get('type');
  const width =750;
  const height = 600

  useEffect(() => {
    init() 
    // console.log(id);
  
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
         ...v[1],vimage: v[1].image.map((el: any) => {
          const text = loader.load(el)
          return new THREE.MeshBasicMaterial({ map: text, side: THREE.DoubleSide, })
        })
      }]
    })
  }

// 右左上下前后
// 对 image 对象中的 image 属性值进行排序
const sortImage=(image)=> {
 
  Object.keys(image).forEach(area => {
    console.log(`Area: ${area}`);
    let temp=[0,1,2,3,4,5]
    image[area].image.forEach(img => {
      if (img.includes("_r.")) {
        temp[0]=img
      } 
      if (img.includes("_l.")) {
        temp[1]=img
      } 
      if (img.includes("_t.")) {
        temp[2]=img
      } 
      if (img.includes("_bo.")) {
        temp[3]=img
      } 
      if (img.includes("_f.")) {
        temp[4]=img
      } 
      if (img.includes("_ba.")) {
        temp[5]=img
      } 
    });
    image[area].image=temp
  });
  return image
}
 const organizeData=(data)=> {
    const organizedData = {};

    data.forEach(item => {
      const { id, houseid, url, area, direction } = item;
      if (!organizedData[area]) {
        organizedData[area] = { image: [] };
      }
      organizedData[area].image.push(url);
    });
    console.log(organizedData);
    
    let sortdata=sortImage(organizedData)
    console.log(sortdata);
    
    return sortdata;
  }
  const init = () => {
  
    queryImageById('image/queryImageById',{id:id,type:type+'vr'}).then(res=>{
      console.log(res.data);

      setImage({...organizeData(res.data.data)})
      const images={...organizeData(res.data.data)}
      console.log(images);
      
      loader = new THREE.TextureLoader() //纹理加载器
      setHomeArr(getNewData(images))
      console.log(getNewData(images));
      setCurrentHome(getNewData(images)[0][0]) // 首次进来的房间
      setCamera(new THREE.PerspectiveCamera(90, width / height, 0.1, 1000))    // 初始化相机
      // 90：这是相机的视场角度，以度为单位。它定义了可见区域的大小。
      // width / height：这是相机的宽高比，通常等于渲染窗口的宽度除以高度。这个值通常随着窗口大小的变化而变化。
      // 0.1：这是相机的近截面。这定义了相机能够看到的最近的物体到相机的距离。任何距离小于这个值的物体都不会被渲染出来。
      // 1000：这是相机的远截面。它定义了相机能够看到的最远的物体到相机的距离。任何距离超过这个值的物体也不会被渲染出来。
      setRenderer(new THREE.WebGLRenderer())   // 初始化渲染器
    })
 
  }

  const initBaseFactor = () => {
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
    }, 1000);
  
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
    const homeMesh = new THREE.Mesh(homeGeoMetry, activeHome[1].vimage);
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
  const change=(i)=>{
    setCurrentHome(getNewData(image)[i][0]) 
  }

  return (
    <div className='vr'>
      {/* 场景 */}
      <div id="threeDemo" style={{ overflow: 'hidden' }}>
      <Tooltip title="全屏">
        <a className="tip"  target='blank' href={`/bigvr/${id}?type=${type}`}> <ArrowsAltOutlined  />
        </a>
      </Tooltip>
      <div className="select">
      {
        homeArr.map((item,index)=>{
          return (
          <div onClick={()=>change(index)} className="option">
            <div className="text">{item[0]}</div>
            <img style={{ width: '100%',height: '100%'}} key={index} src={item[1].image[4]} /> 
          </div>
          )
        })
      }
      </div>
      </div>
     
    </div>
  );
}
export default Vr