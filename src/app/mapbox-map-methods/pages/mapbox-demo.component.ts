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
      container: 'map14', // container id
      // 地图的 MapBox 样式，必须符合 mapbox样式规范中描述的架构JSON对象或url
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      // 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      // style: 'mapbox://styles/mapbox/streets-v11', // style URL

      // 中心点  地图的初始地理中心点 如果未设置 则会到 样式 style 中去寻找，如果也没有找到，那就默认[0,0]
      // 使用的是经纬度 坐标 来匹配 geoJSON 数据
      center: [118.496847,24.926008],
      //  地图初始缩放级别 未设置 会在地图样式中寻找它，也没有就设置 0
      zoom: 10,
    });

    let _this = this;
    this.map.on('load', () => {
      // 添加导航的 控制 包含 navigation/
      //  this.map.addControl(new maplibregl.NavigationControl(), 'bottom-left');
      
    });
  }
//  移动中心点，放大缩小，旋转 pitch 填充的动画
  easeTo(e:any) {
    console.log("this.map->>", this.map);
    let _self = this;
    this.map.easeTo({
       duration: 5000,
      // 需要是一个计算函数  如果是一个固定值的话 会导致 动画失效
       easing: (t:any) => _self.easing(t),
       center: [118.509206,24.891755],
      //  地图的倾斜
      //  pitch: 0,
       zoom: 14,
      //  地图的 旋转 角度
      //  bearing: 90
      padding: {top: 200, left: 200, bottom: 200, right: 200}
    })
  }
  // 设置可见区域
  fitBounds(e: any) {
    // [][] 第一个是最小   第二个最大 西 南 东 北
    this.map.fitBounds([[119.234304,25.275925],[119.292411,25.253648]],{
      zoom: 14,
      duration: 5000,
      // linear true 表示使用 easeTo  false表示 使用 flyTo
      linear: false,
      easing: (t:any)=>{return t * (2 - t)}
    })
  }
  jumpTo(e: any) {
     this.map.jumpTo({
       center: [116.411161,39.895534],
       zoom: 9,
     })
  }
  //
  fitSceenCoord(e:any){
    this.map.fitScreenCoordinates([119.234304,25.275925],[119.292411,25.253648],10)
  }
  // 改变中心、缩放、方位和 俯仰的任意组合、沿着一条唤起飞行的曲线动画过度
  flyTo(e: any) { 
    this.map.flyTo({
      center: [
        119.234304 + (Math.random() - 0.5) * 10,
        25.275925 + (Math.random() - 0.5) * 10
      ],
      speed: 1.2,
      // 为了处理用户系统开启了 不启用动画的功能
      essential: true,
      // curve: 1
    })

    let center = this.map.getCenter();
    console.log("center->>>", center)

    let container = this.map.getContainer();
    console.log("container地图的容器->>>", container)


  }

   easing(t:any) {
     console.log("easing->>",  t)
     return t * (2 - t);
    }


  

  ngOnDestroy(): void {}
}
