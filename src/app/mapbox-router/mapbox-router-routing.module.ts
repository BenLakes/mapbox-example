import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapBoxRouterComponent} from './pages/mapbox-router.component'


const routes: Routes = [
  {path: '', component: MapBoxRouterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapBoxRoutingModule { }
