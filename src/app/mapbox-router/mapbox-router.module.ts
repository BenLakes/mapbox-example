import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button'
import { MapBoxRouterComponent } from './pages/mapbox-router.component';

import {MapBoxRoutingModule}  from './mapbox-router-routing.module'

import {NgxDsMapBoxLibModule} from 'ngx-ds-mapbox-lib'



@NgModule({
  declarations: [MapBoxRouterComponent],
  imports: [
    MapBoxRoutingModule,
    NzButtonModule,
    CommonModule,
    NgxDsMapBoxLibModule
  ]
})
export class MapBoxRouterModule { }
