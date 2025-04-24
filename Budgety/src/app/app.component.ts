import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastrIconClasses, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    imports: [
        NavbarComponent,
        RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Budgety';
  
}
