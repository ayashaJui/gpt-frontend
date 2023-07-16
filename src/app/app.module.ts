import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import securityConfig from './config/security-config';
import { DocUploadComponent } from './components/doc-upload/doc-upload.component';
import { BackgroundAnimationComponent } from './components/background-animation/background-animation.component';
import { NavbarComponent } from './components/navbar/navbar.component';


const oktaConfig = securityConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['/login']);
}

const routes: Routes = [
  {
    path: 'docUpload',
    component: DocUploadComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage },
  },

  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/docUpload', pathMatch: 'full' },
  { path: '**', redirectTo: '/docUpload', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginStatusComponent,
    DocUploadComponent,
    BackgroundAnimationComponent,
    NavbarComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    OktaAuthModule,
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  bootstrap: [AppComponent],
})
export class AppModule {}
