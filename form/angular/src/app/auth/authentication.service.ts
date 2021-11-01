import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticated = false

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  authenticate(credentials: any) {
    var formData: FormData = new FormData()
    formData.append('username', credentials.username)
    formData.append('password', credentials.password)

    this.http.post('auth', formData, { responseType: "text" }).subscribe(
      () => {
        this.authenticated = true
        this.router.navigateByUrl('/')
      },
      () => {
        this.authenticated = false
      }
    )
  }

  checkAuthenticationStatus() {
    this.http.get<any>('user').subscribe(response => {
      console.log('Checking: ' + response)
      if (response['name']) {
        this.authenticated = true
      } else {
        this.authenticated = false
      }
    })
  }

  logout() {
    this.http.post('logout', {}).pipe(
      finalize(() => {
        this.authenticated = false;
        this.router.navigateByUrl('/');
      })).subscribe();
  }
}