import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapBoxDemoComponent} from './pages/mapbox-demo.component'


const routes: Routes = [
  {path: '', component: MapBoxDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapBoxRoutingModule { }
