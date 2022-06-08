import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StateService } from 'src/app/core/services/state.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    loading!: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private stateService: StateService,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Iniciar sesión');
        this.authenticationService.loadData();
        this.authenticationService.logout();
        this.stateService.getStates();
        this.createForm();
    }

    private createForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
        });
    }

    login() {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;

        this.loading = true;
        this.authenticationService.login(email.toLowerCase(), password).subscribe(
            data => {
                if (data.rol !== '') {
                    this.router.navigate(['/']);
                } else {
                    this.notificationService.openSnackBar('Datos Invalidos');
                    this.loading = false;
                }
            }
        )
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
