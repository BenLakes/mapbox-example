import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {data} from '../pages/data'
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
      container: 'map17', // container id
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
      // 保存完整的坐标列表  预防后面使用
      let coordinates = data.features[0].geometry.coordinates;
      // 首先只显示一个坐标 后续一直增加
      data.features[0].geometry.coordinates = [coordinates[0]];

      // 添加source 到 map
      this.map.addSource('trace', {type: 'geojson', data: data});

        // 添加显示地点图层
        this.map.addLayer({
            id: 'trace',
            type: 'line',
            source: 'trace',
            paint: {
              'line-color': 'red',
              'line-width': 7
            }
        });

        // 使用jumpTo的center 到 当前线坐标
        this.map.jumpTo({center: coordinates[0], zoom: 14});
        // pitch(30) 设置倾斜度 这样更清晰
        this.map.setPitch(50)

      //定期从保存的坐标列表中添加更多的坐标更新地图 画线
      let i = 0;
      let timer = setInterval(function() {
        if(i < coordinates.length) {
          data.features[0].geometry.coordinates.push(
            coordinates[i]
          );
          _self.map.getSource('trace').setData(data);
          // 使用动画移动 到 指定的位置
          // 使用动画过渡将地图平移到指定位置。
          _self.map.panTo(coordinates[i]);
          i++;
        }else {
          clearInterval(timer)
        }
      },10 )


    });
   
  }

  ngOnDestroy(): void {}
}
