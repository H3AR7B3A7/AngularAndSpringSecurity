import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
    private router: Router
  ) {
    this.auth.checkAuthenticationStatus();
  }

  logout() {
    this.auth.logout();
  }
}
