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
      container: 'map3', // container id
      // 地图的 MapBox 样式，必须符合 mapbox样式规范中描述的架构JSON对象或url
      style:
        // 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
        'https://demotiles.maplibre.org/style.json', // style URL
      // style: 'mapbox://styles/mapbox/streets-v11', // style URL
      // 中心点
      center: [118.625742, 24.839093],
      zoom: 15,
    });

    // 自定义 layer  customerLayer
    // 实现customLayerInterface 在地图上绘制一个脉冲点图标
    let size = 200;

    let context: any;

    let pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
      context: context,
      // 当图层被添加到地图时，获取地图画布的渲染上下文 对其进行上下文的操作
      onAdd: function () {
        console.log('添加画布');
        // 创建一个canvas 标签
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        //  获取当前画布上下文
        this.context = canvas.getContext('2d');
        console.log('上下文-》》', this.context);
      },
      // 将使用图标的每一帧都调用 这个 重绘方法
      render: function () {
        console.log('render');
        // 动画间隔 1秒
        let duration = 1000;
        // performance.now() 返回一个表示从性能测量时刻开始经过的毫秒数，也可精确到微秒 小数位
        
        let t = (performance.now() % duration) / duration;

        let radius = (size / 2) * 0.3;
        let outerRadius = (size / 2) * 0.7 * t + radius;
        let context = this.context;

        // 画外部的 圆
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        // 填充样式
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();

        // 内部圆
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);

        context.fillStyle = 'blue';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // 使用画布的数据更新  标记的数据
        // getImageData 返回ImageData对象,用来描述canvas 区域隐含的像素的数据，
        // 这个区域通过矩形表示。起始点位 x,y  和宽高  data 是包含的矩形像素数据
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // 不断地重绘地图, 导致圆点的平滑动画
        map.triggerRepaint();

        return true;
      },
    };

    map.on('load', () => {
      console.log('load 加载完成');
      map.addSource('national-park', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
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
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [118.66958, 24.695745],
              },
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [118.65032, 24.685929],
              },
            },
          ],
        },
      });
      // 根据 geojson数据 创建 layer
      map.addLayer({
        id: 'park-boundary',
        type: 'fill',
        source: 'national-park',
        paint: {
          'fill-color': '#888',
          'fill-opacity': 0.4,
        },
        // 过滤geoJson 数据  为类型的等于 polygon的
        filter: ['==', '$type', 'Polygon'],
      });

      // 创建图片 与 添加source
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      // map.addSource('points', {
      //   type: 'geojson',
      //   data: {
      //     type: 'Fea'
      //   }
      // })

      // map.addLayer({
      //   id: 'park-volcanoes',
      //   type: 'circle',
      //   source: 'national-park',
      //   paint: {
      //     'circle-radius': 6,
      //     'circle-color': '#B42222'
      //   },
      //   // 过滤geoJson 数据  为类型的等于 polygon的
      //   filter: ['==', '$type', 'Point']
      // });

      map.addLayer({
        id: 'park-volcanoes',
        type: 'symbol',
        source: 'national-park',
        layout: {
          'icon-image': 'pulsing-dot'
          },
        // 过滤geoJson 数据  为类型的等于 polygon的
        filter: ['==', '$type', 'Point']
      });
      // map.addSource('points', {
      //   type: 'geojson',
      //   data: {
      //     type: 'FeatureCollection',
      //     features: [
      //       {
      //         type: 'Feature',
      //         geometry: {
      //           type: 'Point',
      //           coordinates: [0, 0],
      //         },
      //       },
      //     ],
      //   },
      // });
      // map.addLayer({
      //   id: 'points',
      //   type: 'symbol',
      //   source: 'points',
      //   layout: {
      //     'icon-image': 'pulsing-dot',
      //   },
      // });
    });
  }

  ngOnDestroy(): void {}
}
