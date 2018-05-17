import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  logout() {
    // logs out the user, then redirects him to Home View.
    if (this.auth.logout()) {
      this.router.navigate(['user/login']);
    }
  }
}
