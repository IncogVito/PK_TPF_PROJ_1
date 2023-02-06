import { Component } from '@angular/core';

@Component({ selector: 'app', templateUrl: 'heroes.component.html' })
export class AppComponent {
    users = [
        { firstName: 'Frank', value: Math.random() * 1000 },
        { firstName: 'Vic', value: Math.random() * 1000 },
        { firstName: 'Gina', value: Math.random() * 1000 },
        { firstName: 'Jessi', value: Math.random() * 1000 },
        { firstName: 'Jay', value: Math.random() * 1000 }
    ];
}