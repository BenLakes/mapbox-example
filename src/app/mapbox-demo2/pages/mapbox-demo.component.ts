import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare const maplibregl: any;
@Component({
  selector: 'app-openlayer',
  templateUrl: './mapbox-demo.component.html',
  styleUrls: ['./mapbox-demo.component.scss'],
})
export class MapBoxDemoComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('init', maplibregl);
  }

  ngAfterViewInit() {
    // maplibregl.accessToken = 'pk.eyJ1IjoieXVhbmthaWh1aSIsImEiOiJja3Nzc25xemgwaWNiMm9xenp1eHQyZHp5In0.fUEvvwhtIy0X-fCSxkeTCQ';

    let map = new maplibregl.Map({
      // 地图容器 将在其中呈现地图的html 元素，指定元素必须没有子元素
      container: 'map2', // container id
      // 地图的 MapBox 样式，必须符合 mapbox样式规范中描述的架构JSON对象或url
      style:
        // 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      'https://demotiles.maplibre.org/style.json', // style URL
      // style: 'mapbox://styles/mapbox/streets-v11', // style URL
      // 中心点
      center: [118.625742, 24.839093],
      zoom: 15,
    });
    map.on('load', () => {
      console.log("load 加载完成");
      map.loadImage(
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn2.scratch.mit.edu%2Fget_image%2Fgallery%2F5543129_200x130.png&refer=http%3A%2F%2Fcdn2.scratch.mit.edu&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1634527697&t=6f5f3b59c92799ad4927b07e72d983e6',
        function(error: any, image: any){
          if(error) throw error;
          map.addImage('cat', image);
          map.addSource('point', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [117.654135,24.530207]
                  }
                }
              ]
            }
          });
          map.addLayer({
            id: 'point',
            type: 'symbol',
            source: 'point',
            layout: {
              'icon-image': 'cat',
              'icon-size': 0.15
            }
          })
        }
      )
   
    });
  }

  ngOnDestroy(): void {}
}
