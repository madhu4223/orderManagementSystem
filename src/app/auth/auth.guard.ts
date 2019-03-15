import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        ) {}

    canActivate() {
        if (localStorage.getItem('access_token') || sessionStorage.getItem('access_token')) {
            console.log('verified')
            return true;
        }
        console.log('Not Verified')
        this.router.navigate(['/login']);
        return false;

    }
    
}
