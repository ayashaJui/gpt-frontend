import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'gpt-frontend';

  isAuthenticated: boolean = false;

  constructor(private oktaAuthService: OktaAuthStateService) {}

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
    });
  }
}
