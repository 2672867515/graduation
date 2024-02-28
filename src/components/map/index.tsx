import React, { useEffect, useState } from 'react';

 const Map=(props)=> {
    const {address}=props
    useEffect(() => {
        // 加载地图
        const map = new window.BMap.Map("mapContainer"); // 创建地图实例
        const geoc = new window.BMap.Geocoder();
        if(address){
            geoc.getPoint(address, function(point) {
                if (point) {
                    map.centerAndZoom(point, 15); // 将解析后的坐标设为地图中心点，并设置缩放级别
                    map.addOverlay(new window.BMap.Marker(point)); // 在地图上添加标注点
                } else {
                    alert("地址没有解析到结果！");
                }
            },'福州市'); // 注意：第三个参数是城市名称，如果不指定则默认为当前城市
        }
      

        // 添加控件
        map.addControl(new window.BMap.NavigationControl()); // 添加平移缩放控件
        map.addControl(new window.BMap.ScaleControl()); // 添加比例尺控件
        map.addControl(new window.BMap.OverviewMapControl()); // 添加缩略地图控件
        map.addControl(new window.BMap.MapTypeControl()); // 添加地图类型控件
    }, []); // 空依赖数组表示只在组件挂载时执行一次
  return (
    <div>
      <div id="mapContainer" style={{ width: '100%', height: '250px' }}></div>
    </div>
  );
}
export default Map