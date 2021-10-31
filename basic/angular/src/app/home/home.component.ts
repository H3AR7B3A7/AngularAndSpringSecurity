import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { AuthenticationService } from '../auth/authentication.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  title = 'Demo'
  greeting!: { id: number, content: string }

  constructor(private auth: AuthenticationService, private http: HttpClient) {
    http.get<{ id: number, content: string }>('resource').subscribe(data => this.greeting = data)
  }

  authenticated() { return this.auth.authenticated }

}
