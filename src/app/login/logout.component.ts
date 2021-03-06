import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  isVisible() {
    return this.authService.authenticated
  }

  doLogout() {
    this.authService
      .doLogout()
      .then(() => this.router.navigate(['login']))
  }

}
