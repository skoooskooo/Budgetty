import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent,RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  chosenContentColor:string = '#F49595';
  title = 'Budgety';


  UpdateChosenContentColor(color:string):void{
    this.chosenContentColor = color;
  }
}
