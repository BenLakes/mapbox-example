import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button'
import { MapBoxDemoComponent } from './pages/mapbox-demo.component';

import {MapBoxRoutingModule}  from './mapbox-demo-routing.module'

import {NgxDsMapBoxLibModule} from 'ngx-ds-mapbox-lib'



@NgModule({
  declarations: [MapBoxDemoComponent],
  imports: [
    MapBoxRoutingModule,
    NzButtonModule,
    CommonModule,
    NgxDsMapBoxLibModule
  ]
})
export class MapBoxDemoModule { }
