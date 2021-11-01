import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

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
      }
    )
  }

  checkAuthenticationStatus() {
    this.http.get<any>('user').subscribe(response => {
      if (response['name']) {
        this.authenticated = true
      } else {
        this.authenticated = false
      }
    })
  }
}
