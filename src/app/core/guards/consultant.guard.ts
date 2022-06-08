import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class ConsultantGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate() {
    const user = this.authService.getCurrentUser();

    if (user.rol == 'consultant' || user.rol == 'customer') {
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;
  }
}
