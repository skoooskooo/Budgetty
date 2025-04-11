import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink ,Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  //PROPERTIES
  activeLink: string = 'overview'; // Default active link
  @Output() colorChange = new EventEmitter<string>();
  overallBalance = signal<string>("0.00€");


  //METHODS
  setActiveLink(link: string, color: string): void {
    this.activeLink = link;
    this.colorChange.emit(color);
  }

  private setActiveLinkFromRoute(): void {
    const currentRoute = this.router.url.split('/')[1]; 
    this.activeLink = currentRoute || 'overview'; 
  }


  //EVENTS
  ngOnInit(): void {

    this.setActiveLinkFromRoute(); 

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveLinkFromRoute();
      }
    });
    
  }


  //CONSTRUCTOR
  constructor(private router: Router) {}

}
