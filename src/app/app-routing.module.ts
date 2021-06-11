import { ProfileModule } from './profile/profile.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren:()=> import('./login/login.module').then(m=> m.LoginModule),
    canActivate: []
  },
  {
    path:'register',
    loadChildren:()=> import('./registration/registration.module').then(m=> m.RegistrationModule),
    canActivate: []
  },
  {
    path:'home',
    loadChildren:()=> import('./home/home.module').then(m=> m.HomeModule),
    canActivate:[AuthGuard]
  },
  {
    path:'profile',
    loadChildren:()=> import('./profile/profile.module').then(m=> m.ProfileModule),
    canActivate:[AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
