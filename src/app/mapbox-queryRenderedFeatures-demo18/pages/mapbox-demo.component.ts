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
      container: 'map18', // container id
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
      // 呈现每个地图块的 轮廓
      this.map.showTileBoundaries = true;
        
      this.map.on('mousemove', (e:any) => {
        // 获取被点击的点  第一个参数是点 的位置  第二个是 可选参数 表示 可以指定  layer: ['measure-points']
        // 返回表示满足查询参数的可见特征的 GeoJSON 特征对象数组。
        /**
         * 1. geometry 参数  查询区域的几何形状：描述边界框的单个点或西南和东北点。
         * 省略第一个参数 等效于传递包含整个地图视口的边界框。
         * 2. options 
         *  layers: ['XXXXX'] 要检查的查询的样式层 ID 数组。仅返回这些图层内的要素。如果未定义此参数，则将检查所有图层。
         *  filter: [] 用于查询结果的过滤器
         *  validate: boolean 是否校验 filter的值
         * 返回值： 返回一组复合条件的 GeoJson 的特征对象，每个返回的特征对象属性的值都包含特征的所有属性
         * 每个要素都包括顶级 source的id, layer 和 sourceLayer属性
         * layer属性是一个对象，表示该要素所属的 样式图层
         * 第二个 layer 的参数很重要， 否则 查出来的特征包括所有其它层的特征，包括对呈现效果没有意义的特征，
         * 例如 图层的透明度 设置 为 0 其实是不可见的 也是会返回 特征
         * 上面渲染的特征首先出现在返回的数组中，随后的特征按 z-order 降序排序。
         * 多次渲染的特征（由于在低缩放级别下环绕反子午线）仅返回一次
         * 
         * example: 
         *  1.查找某个点的所有特征
         *    let features = this.map.queryRenderedFeatures([20, 35], {layers: ['mylayername']})
         *  2.查找静态边界框的所有特征
         *    let features = this.map.queryRenderedFeatures([[10,20],[20,30]], {layers: ['mylayername']})
         *  3. 在一个点的边界框中查找所有特征
         *    let width = 20
         *    let height = 20
         * 
         * let features = this.map.queryRenderedFeatures([point.x - width / 2, point.y - height / 2],
           [point.x + width / 2, point.y + height / 2], {layer: ['mylayername']})
           从单个图层查询所有渲染的特征
           let features = this.map.queryRenderedFeatures({ layers: ['my-layer-name'] })
         */
        let features = this.map.queryRenderedFeatures(e.point);
        // 定义我们显示的属性 和 数量 提高性能  返回很多不需要的信息
        let displayProperties = [
          'type',
          'properties',
          'id',
          'layer',
          'source',
          'sourceLayer',
          'state'
        ];

        let displayFeatures = features.map((feature:any) => {
            let displayFeature:any = {};
           displayProperties.map(prop => {
             displayFeature[prop] = feature[prop]
           })
            return displayFeature;

        });
        document.getElementById('features')!.innerHTML =  JSON.stringify(
          displayFeatures,
          null,
          2
          );
        // document.getElementById('features').innerHTML = JSON.stringify(
        //   displayFeatures,
        //   null,
        //   2
        //   );
      })
    });
  
  }
  mapRemove(e:any) {
    // 清除地图， 清除后不能在调用地图实例的任何方法
    this.map.remove();
  }
 

  ngOnDestroy(): void {}
}
