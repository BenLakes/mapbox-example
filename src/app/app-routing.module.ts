import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'mapboxRouter', pathMatch:'full'},
  // Routes 是路由配置，告诉路由器 什么样的url 要显示怎么样的视图
  // 这个路由会把一个与空路径 完全匹配的 URL 重定向 到 /dashboard
  {path:'mapboxDemo1', loadChildren: ()=>import('./mapbox-demo1/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxDemo2', loadChildren: ()=>import('./mapbox-demo2/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxDemo3', loadChildren: ()=>import('./mapbox-demo3/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxDemo4', loadChildren: ()=>import('./mapbox-demo4/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxDemo5', loadChildren: ()=>import('./mapbox-demo5/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxDemo6', loadChildren: ()=>import('./mapbox-demo6/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxDemo7', loadChildren: ()=>import('./mapbox-demo7/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxDemo8', loadChildren: ()=>import('./mapbox-demo8/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxDemo9', loadChildren: ()=>import('./mapbox-demo9/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxDemo10', loadChildren: ()=>import('./mapbox-self/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxDemo11', loadChildren: ()=>import('./mapbox-maplibre-gl/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
  {path:'mapboxRouter', loadChildren: ()=>import('./mapbox-router/mapbox-router.module').then(module => module.MapBoxRouterModule)},
  {path:'mapboxDemo12', loadChildren: ()=>import('./mapbox-map/mapbox-demo.module').then(module => module.MapBoxDemoModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
