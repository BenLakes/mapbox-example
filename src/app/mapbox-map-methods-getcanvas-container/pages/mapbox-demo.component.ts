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
  coords!: any
  geojson!:any;
  lineString!:any;
  canvasContainer!:any
  constructor() {
    _self = this;
  }

  ngOnInit() {
    console.log('init', maplibregl);
  }

  ngAfterViewInit() {
    this.map = new maplibregl.Map({
      // 地图容器 将在其中呈现地图的html 元素，指定元素必须没有子元素
      container: 'map16', // container id
      // 地图的 MapBox 样式，必须符合 mapbox样式规范中描述的架构JSON对象或url
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      // 中心点  地图的初始地理中心点 如果未设置 则会到 样式 style 中去寻找，如果也没有找到，那就默认[0,0]
      // 使用的是经纬度 坐标 来匹配 geoJSON 数据
      center: [0,0],
      //  地图初始缩放级别 未设置 会在地图样式中寻找它，也没有就设置 0
      zoom: 10,
      // maxBounds: [[117.628612,24.519878], [117.638825,24.51693]],
      // renderWorldCopies: false
    });

    let _this = this;
   
    // geoJson 一个点的数据
   this.geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0,0]
          }
        }
      ]
    }
   
    this.map.on('load', () => {
      // this.map.fitBounds([[119.234304,25.275925],[119.292411,25.253648]],{
      //   zoom: 14,
      //   duration: 5000,
      //   // linear true 表示使用 easeTo  false表示 使用 flyTo
      //   linear: false,
      //   easing: (t:any)=>{return t * (2 - t)}
      // })
       /**
        *  地图交互性（例如平移和缩放）的事件绑定所附加到的元素。
        * 它将接收来自 <canvas> 等子元素的冒泡事件，
        * 但不会接收来自地图控件的冒泡事件。
        */
      
       this.canvasContainer = _self.map.getCanvasContainer()



      this.map.addSource('point', {
        type: 'geojson',
        data: this.geojson
      })
  
      this.map.addLayer({
        id: 'point',
        type: 'circle',
        source: 'point',
        paint: {
          'circle-radius': 10,
          'circle-color': 'red'
        },
        filter: ['in']
      });

          // getFilter(layerId) 返回 layer层 对应的 filter 属性 数组
    console.log("getFilter()函数1-》》", this.map.getFilter('point'))
    // getLayer 返回id对应的 layer 层
    console.log("getLayer()函数1-》》", this.map.getLayer('point'))
    // console.log("getLayoutProperty()函数1-》》", this.map.getLayoutProperty('point', 'layout'))
    // console.log("getLight()函数1-》》", this.map.getLight())
    // 获取地图受约束的最大地理边界，没有设置  则返回 null
    console.log("getMaxBounds()函数1-》》", this.map.getMaxBounds())
    // 返回指定样式层中绘制属性的值
    console.log("getPaintProperty()函数1-》》", this.map.getPaintProperty('point', 'circle-color'))
    // getPitch() 返回地图的当前倾斜度  

    // 获取renderWorldCopies 的属性值， true 表示 全球地图会平铺排列
    // false 表示不会 只会展示一张
    console.log("getRenderWorldCopies()函数1-》》", this.map.getRenderWorldCopies())
    /**
     * 返回具有地图样式中指定的source  id
     * 该方法通常用于 获取源实例 来 更新 新源 如设置geoJson 源的数据 或更新图像源的url 和坐标等
     */
    console.log("getSource(id)函数1-》》", this.map.getSource('point'))
    // 返回地图的样式对象， 一个可用于重新创建地图样式的 json 对象
    // 就是创建地图时候  style 的 链接返回的值
    console.log("getStyle()函数1-》》", this.map.getStyle())
    // getZoom() 返回地图的 当前 zoom 层级
    // hasControl(control) 检查地图上是否存在控件 如 navigationControl
    // hasImage(id) 检查样式中是否存在具有 特定ID的图像，会检查样式原始精灵图的图像以及在运行时使用的任何图像
    //  在addImage() 之前使用 检查

    // isSourceLoaded(id) 返回一个布尔值，指示源是否已加载。 
    //如果在地图样式中具有给定id 的源没有未完成的网络请求，则返回true 否则返回false
    console.log("isSourceLoaded()函数1-》》", this.map.isSourceLoaded('point'))

    // isStyleLoaded() 返回布尔值， 指示地图的样式是否已完全加载
    console.log("isStyleLoaded()函数1-》》", this.map.isStyleLoaded())
    // loaded 返回布尔值 指示地图 是否已完成加载  如尚未完全加载，或者有还有
    // 尚未完全加载的源 或样式  返回false  否则 true
    // loadImage(url, callback); 外部URL 加载图像与 addImage 一起使用
    /*
       this.map.loadImage(url, function(err, image){
         if(err)throw error;
         this.map.addImage('kitten', image)
       })
    */
   //moveLayer(id, beforeId) 将图层移动到不同 的z 位置  类似 z-index 顺序
   // 1.off(type, 响应方法名称) 移除先前使用 map.on(type)添加的事件侦听器
  //  2. off(type, layerId, 响应方法名称) 删除先前使用 map.on(type) 添加的特定层事件的事件侦听器

  // on(type, layerId, 响应方法名称) 为指定类型的事件添加侦听器，可选择限制为指定样式层添加
  // once(type, 响应方法名称) 将仅有被调用一次的侦听器添加指定的事件类型
  // once(type, layerId, 响应方法名称)添加一个侦听器，仅对发生在指定样式图层中的要素上的指定事件类型调用一次

  // panBy(offset, options动画, eventData) 按指定的偏移量平移地图
  // panTo(lnglat, options动画, eventData)使用动画过渡将地图平移到指定位置
  let coordinate = [-122.420679, 37.772537];
  // project  返回一个 Point 表示像素坐标，相对于地图的容器，对应于指定的地理位置。
  // let point = this.map.project(coordinate);
  console.log("this.map.projec->>", this.map.project(coordinate));




      // 当光标 进入点图层中的要素时， 准备拖动
      this.map.on('mouseenter', 'point', () => {
                // getFilter(layerId) 返回 layerId 指定的 样式层
    console.log("getFilter()函数3-》》", this.map.getFilter('point'))
        // 设置图层的油漆属性
        _self.map.setPaintProperty('point', 'circle-color', 'blue');
        _self.canvasContainer.style.cursor = 'move';
      })
  //  光标离开 要素 设置油漆属性 并重置 光标样式
      this.map.on('mouseleave', 'point', () => {
                // getFilter(layerId) 返回 layerId 指定的 样式层
    console.log("getFilter()函数2-》》", this.map.getFilter('point'))
        // 设置图层的油漆属性
        _self.map.setPaintProperty('point', 'circle-color', 'red');
        _self.canvasContainer.style.cursor = '';
      })
      // 光标按下的时候触发的方法
      this.map.on('mousedown', 'point', (e:any) => {
        // 阻止默认的拖动行为
        e.preventDefault();
        // 抓住的手势
        _self.canvasContainer.style.cursor = 'grab';
        // 调用移动函数
        _self.map.on('mousemove', _self.onMove);
        // 只执行一次
        _self.map.once('mouseup', _self.onUp);
      })

      this.map.on('touchstart', 'point',  (e:any) => {
        if (e.points.length !== 1) return;
         
        // Prevent the default map drag behavior.
        e.preventDefault();
         
        _self.map.on('touchmove', _self.onMove);
        _self.map.once('touchend', _self.onUp);
        });
    });
  }
  //  移动
  onMove(e:any) {
  console.log("_self.map-《《", _self.map)
    // let canvas = this.map.getCanvasContainer();
    // 系那是该点所在位置的坐标 完成被拖到地图上。
    let coords = e.lngLat;

    // 设置鼠标抓取 grabbing
    _self.canvasContainer.style.cursor = "grabbing";
      //  更新geojson坐标中的点特征，并调用setData地图上的 源
      _self.geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
      _self.map.getSource('point').setData(_self.geojson);
  }
  // 点击松开
  onUp(e:any) {
    // let canvas = this.map.getCanvasContainer();
    // 系那是该点所在位置的坐标 完成被拖到地图上。
    _self.coords = e.lngLat;
    
    _self.canvasContainer.style.cursor = '';
    // 解除鼠标/触摸事件的绑定
    _self.map.off('mousemove', (e:any) => _self.onMove(e));
    _self.map.off('touchmove', (e:any) => _self.onMove(e));
  }




  ngOnDestroy(): void {}
}
