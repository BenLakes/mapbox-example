import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare const maplibregl: any;
// const img = require('./src/assets/images/1-1.png')
// import img from './src/assets/images/1-1.png'
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
    this.map = new maplibregl.Map({
      // 地图容器 将在其中呈现地图的html 元素，指定元素必须没有子元素
      container: 'map12', // container id
      // 地图的 MapBox 样式，必须符合 mapbox样式规范中描述的架构JSON对象或url
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      // 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      // style: 'mapbox://styles/mapbox/streets-v11', // style URL
  
      // minZoom: 10,
      // maxZoom: 13,
      minPitch: 60,
      // 默认true 表示可以交互， 如果false 则不会将鼠标 触摸或键盘侦听器附加到地图 所以不会响应交互
      interactive: true,
      // 默认true 设置false 地图的俯仰，倾斜 拖动旋转交互被禁用
      pitchWithRotate: false,
      // 底部右侧MapTiler 的信息
      attributionControl: true,
      // 添加自定义的 的信息底部右侧地图信息
      customAttribution: ['121212XXXXXXXXXX','13123123','676666','66666'],
      logoPosition: 'top-right',
      preserveDrawingBuffer: true,
      // 如果设置，地图将被限制在给定的范围内
      // maxBounds: [[117.628612,24.519878], [117.638825,24.51693]],
      //默认true 启动 鼠标滚轮 滚动缩放   false 禁用
      scrollZoom: true,
      // 默认true 启用 鼠标点击 按住shift 框选东西  false 是禁用
      boxZoom: false,
      // 默认true 启用 按住ctrl 旋转鼠标 旋转地图
      dragRotate: true,
      // 默认true 表示能按住鼠标拖动 地图,false 则不行
      dragPan: true,
      // 默认 true 启用或关闭 键盘与地图的交互事件  比如 shift + 上箭头   表示旋转地图
      // keyboard: false,
      // 默认 true 是否启用鼠标双击 缩放地图
      // doubleClickZoom: false,
      // 默认 true 当浏览器窗口调整大小  地图会自动跟着调整
      trackResize: true,
      // 中心点  地图的初始地理中心点 如果未设置 则会到 样式 style 中去寻找，如果也没有找到，那就默认[0,0]
      // 使用的是经纬度 坐标 来匹配 geoJSON 数据
      center: [118.625742, 24.839093],
      //  地图初始缩放级别 未设置 会在地图样式中寻找它，也没有就设置 0
      zoom: 10,
      // 地图初始的旋转方位 以北逆时针方向测量的度数，如果未设置 则会在style 文件中查找， 默认0
      // bearing: 90,
      // 地图的初始倾斜角度 以屏幕的 0 - 60 度为单位，未设置->style 样式文件中->0
      // pitch: 10,
      // 地图的初始化边界， 不同于 maxBounds 设置了bounds 它将覆盖center和zoom 的 选项
      // bounds: [[117.628612,24.519878], [117.638825,24.51693]],
      // 默认true, 当世界地图不够铺满容器宽度的时候，多个副本将在 -180度 到 180度 经度范围并排呈现，
      // 如果设置了false, 当地图缩放到单一表示 无法填满整个地图时候 容器 超过 -180 到 180 会空白
      // 
      renderWorldCopies: true,
      transformRequest: () => {
        console.log("Map 请求外部URL 之前运行的回调，回调可以设置 url  和 请求头、跨域等一些信息")
        // return {
        //   url : 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
        // }
      },
      // 控制标签的淡入淡出动画的时间，毫秒为单位，此设置会影响所有符号图层，此设置不会影响 栅格图层的 淡入淡出时间
      // fadeDuration: 3000,
      // crossSourceCollision: false
      // 如果 在里面设定了 accessToken  将不会使用 mapboxgl.accessToken 中定义的令牌。
      // accessToken : '',

    });
  
    let _this = this;
  
    this.map.on('load', () => {
      // 添加导航的 控制 包含 navigation/
       this.map.addControl(new maplibregl.NavigationControl(), 'bottom-left');
       this.map.addControl(new HelloControl(), 'top-right');
      // 加载图片
      //  this.map.loadImage('http://127.0.0.1:8888/audio.jpeg',
      //   (err:any, image:any) => {
      //     // 当加载图片报错的时候 抛出
      //     if(err) throw err;
      //     console.log("添加图片1")
      //     if(!_this.map.hasImage('audio')){
      //       console.log("添加图片2")
      //       _this.map.addImage('audio', image,   {
      //         content: [260, 160, 300, 384], // place text over left half of image, avoiding the 16px border
      //         // stretchX: [[16, 584]], // stretch everything horizontally except the 16px border
      //         // stretchY: [[10, 160]], // stretch everything vertically except the 16px border
      //         });
      //       // 创建source
      //       _this.map.addSource('point', {
      //         type: 'geojson',
      //         data: {
      //           type: 'FeatureCollection',
      //           features: [
      //             {
      //               type: 'Feature',
      //               geometry: {
      //                 type: 'Point',
      //                 coordinates: [118.625742, 24.839093]
      //               },
      //               properties: {

      //               }
      //             }
      //           ]
      //         }
      //       });
      //       // 添加到地图的 layer
      //       /**
      //        * 将图层添加到 Mapbox地图样式 
      //        * 层定义了来自指定源的数据样式
      //        * layer params  (Object | CustomLayerInterface) 
      //        */
      //       _this.map.addLayer({
      //         // 地图上的唯一标识 layer
      //         id: 'points',
      //         // layer 图层的类型
      //         type: 'symbol',
      //         // 图层数据源的唯一 id, 引用已使用源的唯一id定义的源
      //         // 也可以直接使用 源的对象，而不是 源变量的引用， 这对于除了customerLayer
      //         // 之外的所有 layer.type 选项都是必需的
      //         source: 'point',
      //         layout: {
      //           "icon-image": 'audio',
      //           "icon-size": 0.1
      //         }
      //       })
      //     }
      //  });

      //  添加自己生成的图片到 地图
      let width = 64; //这图片是一个 长宽64px 正方形 
      let bytesPerPixel = 4; //每个像素  都包含4 个 字节  也就是一个框 有4个框 red/green/blue and alpha
      let  data = new Uint8Array(width * width * bytesPerPixel);
    //  一个像素占用 4 个 byte 也就是颜色值和透明度
      for(let x = 0; x < width; x ++) {
        for (let y = 0; y < width; y++) {
          let offset = (y * width + x) * bytesPerPixel;
          data[offset + 0] = (y / width)  * 255; //red
          data[offset + 1] = (x / width) * 255; //green;
          data[offset + 2] = 200; //blue
          data[offset + 3] = 180; //alpha
        }
      }

      _this.map.addImage('gradient', {width: width, height: width, data: data});

      // 获取地图所有添加的图片列表
      console.log("listImages->>>", this.map.listImages());

      _this.map.addSource('customer-point', {
         type: 'geojson',
         data: {
           type: 'FeatureCollection',
           features: [
             {
               type: 'Feature',
               geometry: {
                 type: 'Point',
                 coordinates: [117.026327,25.06894]
               }
             }
           ]
         }
      });

     _this.map.addLayer({
       id: 'customer-point',
       type: 'symbol',
       source: 'customer-point',
       layout: {
         "icon-image": 'gradient'
       }

     });
    // 图层数据源   是矢量图层数据源
     this.map.addSource('contours', {
       type: 'vector',
       url: 'https://api.maptiler.com/tiles/contours/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
     });
     
    //  this.map.addLayer({
    //     // 加载 矢量图片的图层源
    //     id: 'terrain-data',
    //     type: 'line',
    //     source: 'contours',
    //     // 指定layer.source 中用于此样式图层的源图层的名称，仅使用于矢量切片源
    //     // 并在layer.source 的类型为vector 时需要
    //     "source-layer": 'contour',
    //     // 图层 的布局属性，根据layer 的 类型不同而异, 未指定布局属性，则使用默认
    //     "layer": {
    //       "line-join": 'round',
    //       "line-cap": 'round'
    //     },
    //     /* paint 图层的绘制属性，可用的绘制属性 因layer的 type而异。
    //      * Mapbox 样式规范中 提供了每种图层类型的完整绘制属性列表，如未指定绘制属性则i
    //        将使用默认值
    //     */ 
    //     "paint": {
    //       "line-color": 'red',
    //       "line-width": 2
    //     }
    //  })
      //  source 源
       this.map.addSource('wms-test-source', {
          type: 'raster',
          tiles: [
            'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
          ],
          tileSize: 256
       })

     //layer 地图层
      this.map.addLayer({
        id: 'wms-test-layer',
        type: 'raster',
        source: 'wms-test-source',
        paint: {}
      }, 'landcover_scrubland')
    });
   
  }

  exportMapCanvas(e:any) {
    // 地图导出图片
    console.log("导出地图图片")
    // 导出图片
    this.map.getCanvas().toDataURL('./src');
  }

  

  ngOnDestroy(): void {}
}

class HelloControl {
  _map:any;
  _container:any;

  onAdd(map: any) {
    this._map = map;
    this._container = document.createElement('button');
    this._container.className = 'maplibregl-ctrl';
    this._container.className = 'container';
    this._container.style.background = 'red'
    this._container.textContent = 'Hello world';
    return this._container;
  }
  onRemove(){
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
