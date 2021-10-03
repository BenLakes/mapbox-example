import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-openlayer',
  templateUrl: './mapbox-demo.component.html',
  styleUrls: ['./mapbox-demo.component.scss'],
})
// 根据 GeoJSON source   添加多种类型的几何图形
export class MapBoxDemoComponent implements OnInit {
  geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          message: 'Foo',
          iconSize: [60, 60],
        },
        geometry: {
          type: 'Point',
          coordinates: [-66.324462890625, -16.024695711685304],
        },
      },
      {
        type: 'Feature',
        properties: {
          message: 'Bar',
          iconSize: [50, 50],
        },
        geometry: {
          type: 'Point',
          coordinates: [-61.2158203125, -15.97189158092897],
        },
      },
      {
        type: 'Feature',
        properties: {
          message: 'Baz',
          iconSize: [40, 40],
        },
        geometry: {
          type: 'Point',
          coordinates: [-63.29223632812499, -18.28151823530889],
        },
      },
    ],
  };
  constructor() {
   
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
      
  }

  ngOnDestroy(): void {}
}
