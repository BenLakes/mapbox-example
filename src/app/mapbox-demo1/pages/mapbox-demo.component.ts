import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare const maplibregl: any;
@Component({
  selector: 'app-openlayer',
  templateUrl: './mapbox-demo.component.html',
  styleUrls: ['./mapbox-demo.component.scss'],
})
export class MapBoxDemoComponent implements OnInit {
  map:any;
  constructor() {}

  ngOnInit() {
    console.log('init', maplibregl);
  }

  ngAfterViewInit() {
    // maplibregl.accessToken = 'pk.eyJ1IjoieXVhbmthaWh1aSIsImEiOiJja3Nzc25xemgwaWNiMm9xenp1eHQyZHp5In0.fUEvvwhtIy0X-fCSxkeTCQ';

    this.map = new maplibregl.Map({
      // 地图容器 将在其中呈现地图的html 元素，指定元素必须没有子元素
      container: 'map', // container id
      // 地图的 MapBox 样式，必须符合 mapbox样式规范中描述的架构JSON对象或url
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      // 'https://demotiles.maplibre.org/style.json', // style URL
      // style: 'mapbox://styles/mapbox/streets-v11', // style URL
      // 中心点
      center: [118.625742, 24.839093],
      zoom: 15,
    });
    this.map.on('load', () => {
      // 添加自定一定 marker
      new maplibregl.Marker().setLngLat([116.404844, 39.914714]).addTo(this.map);
      //画一条线
      // 先创建source 格式是 geoJson 格式
      this.map.addSource('maine', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [118.840761, 24.878699],
                [118.594697, 24.628525],
                [118.684959, 24.679493],
                [118.840761, 24.878699],
              ],
            ],
          },
        },
      });
      this.map.addLayer({
        id: 'maine',
        type: 'fill',
        source: 'maine',
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8,
        },
      });
      this.map.addSource('route1', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [118.840761, 24.878699],
              [118.594697, 24.628525],
              [118.684959, 24.679493],
              [118.840761, 24.878699],
            ],
          },
        },
      });
      this.map.addLayer({
        id: 'route1',
        type: 'line',
        source: 'route1',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'red',
          'line-width': 2,
        },
      });

      // 添加图片 Marker
      this.map.loadImage(
        'https://maplibre.org/maplibre-gl-js-docs/assets/osgeo-logo.png',
        (_error: any, image: any) => {
          if (_error) throw _error;
          // 定义资源图标
          this.map.addImage('custom-marker', image);
          // 以当前图片作为 图标  添加15个点
          this.map.addSource('conferences', {
            type: 'geojson',
            data: {
              // 要素集合
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [118.625742, 24.839093],
                    
                  },
                  properties: { name: 'QuanZhou' },
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [119.305293, 26.08549],
                    
                  },
                  properties: { name: 'FuZhou' },
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [118.10027, 24.479703],
                    
                  },
                  properties: { name: 'XiaMen' },
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [117.663334, 24.517583],
                    
                  },
                  properties: { name: 'ZhangZhou' },
                },
              ],
            },
          });
          //添加 symbol 格式的 layer  addLayer
          this.map.addLayer({
            id: 'conferences',
            type: 'symbol',
            source: 'conferences',
            layout: {
              // 指定图标
              'icon-image': 'custom-marker',
              // 从source 的 property 获取name 字段
              'text-field': ['get', 'name'],
              // 'text-font': [],
              // 'icon-size': 0.08,
              'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
                ],
                'text-offset': [0, 1.25],
              'text-anchor': 'top',
            },
          });
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.map = null;
  }
}
