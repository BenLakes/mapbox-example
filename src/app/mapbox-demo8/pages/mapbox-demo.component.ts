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
      container: 'map8', // container id
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
      // 指示地图是否将围绕数据源中的所有符号增加呈现框 显示哪些符号已经渲染、哪些已经碰撞
       this.map.showCollisionBoxes = true;
      //  setStyle(url) 使用新值来更新地图样式 
        this.map.addSource('places', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  description: '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                  icon: 'theatre'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [119.32369,26.080298]
                }
              },
              {
                type: 'Feature',
                properties: {
                  description: "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href='http://madmens5finale.eventbrite.com/' target='_blank' title='Opens in a new window'>Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
                  icon: 'theatre'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [119.04773,25.463923]
                }
              },
              {
                type: 'Feature',
                properties: {
                  description: "<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href='http://tallulaeatbar.ticketleap.com/2012beachblanket/' target='_blank' title='Opens in a new window'>Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>",
                  icon: 'bar'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [118.698182,24.894695]
                }
              },
              {
                type: 'Feature',
                properties: {
                  description: '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
                  icon: 'bicycle'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [118.109468,24.508114]
                }
              },
              {
                type: 'Feature',
                properties: {
                  description: '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
                  icon: 'music'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [117.677132,24.533362]
                }
              }
            ]
          }
        });
        // 添加显示地点图层
        this.map.addLayer({
          id: 'places',
          type: 'symbol',
          source: 'places',
          layout: {
            'icon-image': '{icon}_15',
            'icon-allow-overlap': true
          }
        });
        // 当地点图层中的要素发生点击事件时，在特征的位置，带有来自属性的描述 properties
        this.map.on('click', 'places', function(e: any) {
          let coordinates = e.features[0].geometry.coordinates.slice();
          let description = e.features[0].properties.description;
          new maplibregl.Popup().setLngLat(coordinates).setHTML(description).addTo(_self.map);

        })
        // 当鼠标悬停在 Places图层上时， 将光标更改为指针
        this.map.on('mouseenter', 'places', function(){
          // 地图的 鼠标
          _self.map.getCanvas().style.cursor = 'pointer';
        })
          // 当它离开时将其改回指针。
          this.map.on('mouseleave', 'places', function(){
            // 地图的 鼠标
            _self.map.getCanvas().style.cursor = '';
          })

    });
   
  }

  ngOnDestroy(): void {}
}
