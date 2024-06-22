import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EMPTY, catchError, finalize, of } from 'rxjs';
import { debug, error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public credentials = {
    login: '',
    password: '',
  }

  public errorMessage = "";

  public logged?: boolean;
  public logout?: boolean;

  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  signIn() {   
    this.authService.authenticate(this.credentials)
    .pipe(
      catchError((error) => (this.handleAuthError(error)))
    )
    .subscribe(
      (result) => { // TODO: THIS SHIT AIN'T WORKIN      
      if(!result) {
        this.logged = false;   
        console.log("FAILED");             
      } else {
        console.log("else");  
        this.logout = false;
        this.credentials = {
           password: '',
           login: ''
        };
        this.router.navigate(['/']);          
      }
    }
  );
  }

  handleAuthError(error: Error) {
    this.errorMessage = error.message;
    return of(false);    
  }
}
