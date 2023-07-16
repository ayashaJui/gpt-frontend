import { Component, Inject, OnInit } from '@angular/core';

import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import OktaSignIn from '@okta/okta-signin-widget';

import securityConfig from 'src/app/config/security-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public image = 'assets/images/logo.png';
  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: securityConfig.oidc.issuer.split('/oauth2')[0],
      clientId: securityConfig.oidc.clientId,
      redirectUri: securityConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: securityConfig.oidc.issuer,
        scopes: securityConfig.oidc.scopes,
      },
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl(
      {
        el: '#okta-sign-in-widget',
      },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }
}
