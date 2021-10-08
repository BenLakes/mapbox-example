import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import turfLength from '@turf/length'
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
  // @ViewChild('distance', {read: ElementRef, static: true}) distance!: ElementRef;
  distance!: any
  geojson!:any;
  lineString!:any;
  constructor() {
    _self = this;
  }

  ngOnInit() {
    console.log('init', maplibregl);
  }

  ngAfterViewInit() {
    this.map = new maplibregl.Map({
      // 地图容器 将在其中呈现地图的html 元素，指定元素必须没有子元素
      container: 'map15', // container id
      // 地图的 MapBox 样式，必须符合 mapbox样式规范中描述的架构JSON对象或url
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      // 中心点  地图的初始地理中心点 如果未设置 则会到 样式 style 中去寻找，如果也没有找到，那就默认[0,0]
      // 使用的是经纬度 坐标 来匹配 geoJSON 数据
      center: [118.496847,24.926008],
      //  地图初始缩放级别 未设置 会在地图样式中寻找它，也没有就设置 0
      zoom: 10,
    });

    let _this = this;
    // geoJson 对象 保存 测量的 要素
   this.geojson = {
      type: 'FeatureCollection',
      features: []
    }
    // 用于点在之间 画线
    this.lineString = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: []
      }
    }
    this.map.on('load', () => {
      
      this.map.addSource('geojson', {
        'type': 'geojson',
         data: this.geojson
      });

      // 添加点数据 层 到 map
      this.map.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'geojson',
        paint: {
          "circle-radius": 5,
          "circle-color": 'black'
        },
        filter: ['in', '$type', 'Point']
      });

      // 添加线 数据层到map
      this.map.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'geojson',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': 'blue',
          'line-width': 2.8
        },
        filter: ['in', '$type', 'LineString']
      });

      this.map.on('click', (e:any) => {
        // 表示 点击的 是否是 measure-points  层的点
         let features = this.map.queryRenderedFeatures(e.point, {
            layer: ['measure-points']
         });

        //  删除点与点的线、 可以通过点集合 重新 画线
         if(this.geojson.features.length > 1) this.geojson.features.pop();

        // 清除距离显示容器的值
         this.distance = '';

        // 当一个要素 点被点击 则在地图上删除它
        if(features.length) {
          let id = features[0].properties.id;
          this.geojson.features = this.geojson.features.filter((point:any) => {
            // 过滤出不是 被点击的 要素
            return point.properties.id !== id;
          })
        }else {
          // 表示要添加要素
          let point = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [e.lngLat.lng, e.lngLat.lat]
            },
            properties: {
              // 获取当前时间的时间戳
              id: String(new Date().getTime())
            }
          };
          this.geojson.features.push(point)
        }

        if(this.geojson.features.length > 1) {
          this.lineString.geometry.coordinates = this.geojson.features.map((point: any) => {
             return point.geometry.coordinates;
          });
          this.geojson.features.push(this.lineString);

          this.distance = turfLength(this.geojson).toLocaleString()

        }
     
        // 重新设置数据
        this.map.getSource('geojson').setData(this.geojson);
      })

    this.map.on('mousemove', (e:any) => {
       let features = this.map.queryRenderedFeatures(e.point, {
          layers: ['measure-points']
       });
       this.map.getCanvas().style.cursor = features.length ? 'pointer' : 'crosshair'
    })
      
    });
  }

  ngOnDestroy(): void {}
}
