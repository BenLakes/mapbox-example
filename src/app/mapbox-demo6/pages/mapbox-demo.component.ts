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
      container: 'map6', // container id
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
      // 添加一个源和显示一个点的图层，该点将在一个圆圈中进行动画处理
      // 源
      this.map.addSource('point', {
        type: 'geojson',
        data: this.pointOnCircle(0)
      });
      // 图层
      this.map.addLayer({
        id: 'point',
        source: 'point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#007cbf'
        }
      })
      this.animateMarker(0)
    });
   
  }
  pointOnCircle(angle: any) {
    let radius = 20;
    // 返回点的 GeoJson 数据对象
    return {
      type: 'Point',
      coordinates: [Math.cos(angle) * radius, Math.sin(angle) * radius]
    }
  }
  animateMarker(timestamp:number) {
    console.log("animateMarker->>", timestamp);

   _self.map.getSource('point').setData(_self.pointOnCircle(timestamp/1000))
    // 执行下一个动画
    requestAnimationFrame(_self.animateMarker)
  }

  ngOnDestroy(): void {}
}
