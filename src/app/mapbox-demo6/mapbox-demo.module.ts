import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapBoxDemoComponent } from './pages/mapbox-demo.component';

import {MapBoxRoutingModule}  from './mapbox-demo-routing.module'



@NgModule({
  declarations: [MapBoxDemoComponent],
  imports: [
    MapBoxRoutingModule,
    CommonModule
  ]
})
export class MapBoxDemoModule { }
