import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class CustomerGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate() {
    const user = this.authService.getCurrentUser();

    if (user.rol == 'customer' || user.rol == 'consultant') {
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;
  }
}
