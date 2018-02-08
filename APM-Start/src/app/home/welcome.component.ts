import { Component } from '@angular/core';

@Component({
// Selector is not needed because we are now using routing and we are routing to the component
    // selector: 'app-home',
    templateUrl: './app/home/welcome.component.html'
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome';
}
