//signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  public credentials = {
    name: '',
    email: '',
    password: '',
    cpassword: ''
  };

  constructor(private authService: AuthService, public router: Router) { }
  ngOnInit(): void { }

  create() {
    this.authService.createOrUpdate(this.credentials)
      .subscribe((result) => {
        return result;
      });
    this.router.navigate(['/']);
  }
}