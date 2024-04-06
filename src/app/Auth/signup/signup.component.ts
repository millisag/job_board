import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  onSignup(): void {
    this.authService.signup(this.user).subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }
}

