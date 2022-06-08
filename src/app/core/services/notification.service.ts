import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }

    public openSnackBar(message: string) {
        this.snackBar.open(message, 'ok', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
        });
    }
}
