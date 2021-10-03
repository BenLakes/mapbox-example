import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare const maplibregl: any;
@Component({
  selector: 'app-openlayer',
  templateUrl: './mapbox-demo.component.html',
  styleUrls: ['./mapbox-demo.component.scss'],
})
// 根据 GeoJSON source   添加多种类型的几何图形
export class MapBoxDemoComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('init', maplibregl);
  }

  ngAfterViewInit() {
    // maplibregl.accessToken = 'pk.eyJ1IjoieXVhbmthaWh1aSIsImEiOiJja3Nzc25xemgwaWNiMm9xenp1eHQyZHp5In0.fUEvvwhtIy0X-fCSxkeTCQ';

    let map = new maplibregl.Map({
      // 地图容器 将在其中呈现地图的html 元素，指定元素必须没有子元素
      container: 'map4', // container id
      // 地图的 MapBox 样式，必须符合 mapbox样式规范中描述的架构JSON对象或url
      style:
        // 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      'https://demotiles.maplibre.org/style.json', // style URL
      // style: 'mapbox://styles/mapbox/streets-v11', // style URL
      // 中心点
      center: [118.625742, 24.839093],
      zoom: 6,
    });
    map.on('load', () => {
      console.log("load 加载完成");
              // 禁用旋转  使用右键单击 + 拖动禁用地图旋转
              map.dragRotate.disable();
              // 使用触摸旋转手势禁用地图旋转
              map.touchZoomRotate.disableRotation();
        
        
              // 禁用 zoom 放大缩小  使用滚动时禁用地图缩放
              map.scrollZoom.disable();
    });
  }

  ngOnDestroy(): void {}
}
