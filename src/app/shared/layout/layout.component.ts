import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { Access } from 'src/app/model/access';
import { StateService } from 'src/app/core/services/state.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    showSpinner: boolean = false;
    user!: Access;

    constructor(
        public spinnerService: SpinnerService,
        private authenticationService: AuthenticationService,
        private stateService: StateService,
    ) {

    }

    ngOnInit(): void {
        this.user = this.authenticationService.getCurrentUser();
        this.stateService.loadStates()
    }
}