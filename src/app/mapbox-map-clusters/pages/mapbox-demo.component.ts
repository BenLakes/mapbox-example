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
    this.map = new maplibregl.Map({
      // 地图容器 将在其中呈现地图的html 元素，指定元素必须没有子元素
      container: 'map13', // container id
      // 地图的 MapBox 样式，必须符合 mapbox样式规范中描述的架构JSON对象或url
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      // 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      // style: 'mapbox://styles/mapbox/streets-v11', // style URL

      // 中心点  地图的初始地理中心点 如果未设置 则会到 样式 style 中去寻找，如果也没有找到，那就默认[0,0]
      // 使用的是经纬度 坐标 来匹配 geoJSON 数据
      center: [118.625742, 24.839093],
      //  地图初始缩放级别 未设置 会在地图样式中寻找它，也没有就设置 0
      zoom: 10,
    });

    console.log("表示是否已加载所有图块1", this.map.areTilesLoaded());
  
    let _this = this;
  
    this.map.on('load', () => {
      console.log("表示是否已加载所有图块2", _this.map.areTilesLoaded());
      // 添加导航的 控制 包含 navigation/
       this.map.addControl(new maplibregl.NavigationControl(), 'bottom-left');
    
      /** 添加新的 外部 GeoJSON数据 并将 source 选项 设置为聚合， 
      *  GL-JS 将向数据自动添加  point_count 属性 
      * id 要添加源的id, 不得与现有来源发生冲突，  source 源需要符合 Mapbox样式规范的源
      * map.addSource('id', {
      *   type: 'geojson',
      *  data: {
      *    type: 'Feature',
      *    geometry: {
      *     type: 'Point',
      *     coordinates: [100, 200]
      *   },
      *   properties: {
      *    title: 'Mapbox',
      *    time: '1111111'
      *  }
      * }
      * })
      */ 
      this.map.addSource('earthquakes', {
        type: 'geojson',
        // 
        data: 'https://maplibre.org/maplibre-gl-js-docs/assets/earthquakes.geojson',
        // 是否聚合
        cluster: true,
        // 最大缩放到聚集点
        clusterMaxZoom: 10,
        // 聚合点时每个聚类的半径 默认值  后续在layer 中可以用表达式修改
        clusterRadius: 50
      });
    //  添加 layer 到 地图   表示一个带颜色的 圆圈
      this.map.addLayer({
        id: 'clusters',
        // 类型是圆形
        type: 'circle',
        // 指定层的源
        source: 'earthquakes',
        // 过滤条件
        filter: ['has', 'point_count'],
        // 画的配置
        paint: {
          //使用表达式，实现三类圈子
          /**  
           * 蓝色 点数小于100时为20px圆圈
           * 黄色 点数 100 - 750 为30px
           * 粉色 点数 大于或等于 750 时 40px
          */
         'circle-color': [
           'step',
           ['get', 'point_count'],
           'blue',
           100,
           'yellow',
           750,
           'pink'
         ],
         'circle-radius': [
           'step',
           ['get', 'point_count'],
           20,
           100,
           30,
           750,
           40
         ]
        }
      });
    //  表示圆圈上面的数字
      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
          // 'color': '#fff'
        }
      });

      this.map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        // 画线 的配置
        paint: {
          'circle-color': 'green',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });
        // 单击时检查集群 选择第一个数据 为 居中点的位置
    this.map.on('click', 'clusters', function(e: any){
      let features = _this.map.queryRenderedFeatures(e.point, {layers: ['clusters']});
      let clusterId = features[0].properties.cluster_id;
      _this.map.getSource('earthquakes').getClusterExpansionZoom(clusterId, function(err: any, zoom: any) {
         if(err) return;
         _this.map.easeTo({
           center: features[0].geometry.coordinates,
           zoom
         })
      })
   });

  // 当点击要素的 事件的时候 发生  非聚类层 的时候  打开一个弹出窗口  特征的位置与属性的描述
  this.map.on('click', 'unclustered-point', function(e:any) {
    console.log("e.features[0].geometry.coordinates->>>", e.features[0].geometry.coordinates)
     let coordinates = e.features[0].geometry.coordinates.slice();
     let mag = e.features[0].properties.mag;
     let tsunami;
     if(e.features[0].properties.tsunami === 1) {
       tsunami = 'yes';
     }else {
       tsunami = 'no';
     }

    /**
     * 确保如果地图被缩小 该特征的多个副本可见， 弹出窗口出现在所指向的副本上
     */
     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new maplibregl.Popup().setLngLat(coordinates).setHTML(
        'magnitude: ' + mag + '<br> Was there a tsunami?: ' + tsunami
      ).addTo(_this.map);
  })

    this.map.on('mouseenter', 'clusters', () => {
        this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'clusters', () => {
        this.map.getCanvas().style.cursor = '';
    });
    // 禁用 按住shift 拖动鼠标 缩放地图的功能
      // _this.map.boxZoom.disable();
      // _this.map.boxZoom.enable();
      // 禁用 启用 双击缩放 地图
      // _this.map.doubleClickZoom.disable();
      
    });

    
  
   
  }


  

  ngOnDestroy(): void {}
}
