import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email ?? 'george.bluth@reqres.in',
        password: this.loginForm.value.password ?? '1234',
      };

      this.isLoading = true;
      this.authService.login(loginData).subscribe({
        next: (res: any) => {
          this.authService.setToken(res.token);
          console.log('Login exitoso, token recibido:', res.token);
          this.router.navigateByUrl('/'); 
        },
        error: (err) => {
          console.error('Error en la autenticación:', err);
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Por favor, llena todos los campos correctamente.';
    }
  }
}




