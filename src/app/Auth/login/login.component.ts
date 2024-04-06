import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: any = {};
  loginError = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.credentials).subscribe(() => {
      this.router.navigate(['/profile']);
    }, () => {
      this.loginError = true;
    });
  }
}

