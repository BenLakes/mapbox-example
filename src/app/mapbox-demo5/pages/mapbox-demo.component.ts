import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare const maplibregl: any;
var _self:any
@Component({
  selector: 'app-openlayer',
  templateUrl: './mapbox-demo.component.html',
  styleUrls: ['./mapbox-demo.component.scss'],
})
// 根据 GeoJSON source   添加多种类型的几何图形
export class MapBoxDemoComponent implements OnInit {
  marker: any;
  private _this: any;
  map: any;
  // map: any
  constructor() {
    _self = this;
  }

  ngOnInit() {
    console.log('init', maplibregl);
  }

  ngAfterViewInit() {
    // maplibregl.accessToken = 'pk.eyJ1IjoieXVhbmthaWh1aSIsImEiOiJja3Nzc25xemgwaWNiMm9xenp1eHQyZHp5In0.fUEvvwhtIy0X-fCSxkeTCQ';
   
    this.map = new maplibregl.Map({
      // 地图容器 将在其中呈现地图的html 元素，指定元素必须没有子元素
      container: 'map5', // container id
      // 地图的 MapBox 样式，必须符合 mapbox样式规范中描述的架构JSON对象或url
      style:
        // 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      // style: 'mapbox://styles/mapbox/streets-v11', // style URL
      // 中心点
      center: [118.625742, 24.839093],
      zoom: 2,
    });
  
    this.map.on('load', () => {
      console.log("load 加载完成", _self);

      _self.marker = new maplibregl.Marker()

      // setInterval(() => {
      //   let radius = 20;
      //   // console.log("this.marker->>", this.marker)
      //    // 创建一个 marker 点
      //    _self.marker.setLngLat([
      //       Math.cos(performance.now() / 1000) * radius,
      //       Math.sin(performance.now() / 1000) * radius
      //     ])
      //    console.log("_self.marker", _self.marker)
      //   // 根据动画时间戳将数据更新到新位置， timestamp / 1000 控制动画的速度
      //   // this.marker.setLngLat([
      //   //   Math.cos(timestamp / 1000) * radius,
      //   //   Math.sin(timestamp / 1000) * radius
      //   //   ]);
    
      //   _self.marker.addTo(_self.map);
      // },10)
       
      requestAnimationFrame(_self.animateMarker)
    });
  }
  animateMarker(timestamp:number) {
    console.log("animateMarker->>", timestamp);

    console.log("this->>", this, _self)
    // 半径
    let radius = 20;
    console.log("this.marker->>", Math.cos(timestamp / 1000) * radius, Math.sin(timestamp / 1000) * radius)
     // 创建一个 marker 点
     _self.marker.setLngLat([
        (Math.cos(timestamp / 1000) * radius) + 113,
        (Math.sin(timestamp / 1000) * radius) + 7
      ])
     console.log("_self.marker", _self.marker)
    // 根据动画时间戳将数据更新到新位置， timestamp / 1000 控制动画的速度
    // this.marker.setLngLat([
    //   Math.cos(timestamp / 1000) * radius,
    //   Math.sin(timestamp / 1000) * radius
    //   ]);

    _self.marker.addTo(_self.map);
    console.log("执行动画前-》》》", _self)
    // 执行下一个动画
    requestAnimationFrame(_self.animateMarker)
  }

  ngOnDestroy(): void {}
}
