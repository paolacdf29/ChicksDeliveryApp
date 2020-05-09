import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './wards/usuario.guard';

const routes: Routes = [
  { path: '', redirectTo: 'starting', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'step1',
    loadChildren: () => import('./pages/step1/step1.module').then( m => m.Step1PageModule)
  },
  {
    path: 'step1/:cid',
    loadChildren: () => import('./pages/step1/step1.module').then( m => m.Step1PageModule)
  },
  {
    path: 'step2',
    loadChildren: () => import('./pages/step2/step2.module').then( m => m.Step2PageModule)
  },
  {
    path: 'step3',
    loadChildren: () => import('./pages/step3/step3.module').then( m => m.Step3PageModule),
    canLoad: [ UsuarioGuard ]
  },
  {
    path: 'step4',
    loadChildren: () => import('./pages/step4/step4.module').then( m => m.Step4PageModule),
    canLoad: [ UsuarioGuard ]
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule),
    canLoad: [ UsuarioGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'promos',
    loadChildren: () => import('./pages/promos/promos.module').then( m => m.PromosPageModule)
  },
  {
    path: 'starting',
    loadChildren: () => import('./pages/starting/starting.module').then( m => m.StartingPageModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./pages/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: 'custom-product/:pid',
    loadChildren: () => import('./pages/custom-product/custom-product.module').then( m => m.CustomProductPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'passpage',
    loadChildren: () => import('./pages/passpage/passpage.module').then( m => m.PasspagePageModule),
    canLoad: [ UsuarioGuard ]
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
