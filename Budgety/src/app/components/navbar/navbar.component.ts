import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink ,Router, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDataServiceService } from '../../services/user-data-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,NgClass,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  //PROPERTIES
  userId: any;
  overallBalanceHidden: boolean = true; // Initially hidden
  activeLink: string = 'overview'; // Default active link
  overallBalance = signal<string>("");
  week_Balance = signal<string>("");
  current_month = signal<string>("");
  current_week = signal<string>(""); 


  //METHODS
  setActiveLink(link: string): void {
    this.activeLink = link;
  }

  openInsertBudget(): void{
    
  }

  get_CurrentMonth(): string {  // Get the current month as a string
    return new Date().toLocaleString('en-US', { month: 'long' });
  }

  get_current_MonthWeek(): string { // Get the current week of the month

    const currentday= new Date().getDate();
    if(currentday <= 7)
      return "Week 1";

    else if(currentday <= 14)
      return "Week 2";
    
    else if(currentday <= 21)
      return "Week 3";

    else if(currentday <= 28)
      return "Week 4";

    else 
      return "Final Days";
  }

  private setActiveLinkFromRoute(): void {
    const currentRoute = this.router.url.split('/')[1]; 
    this.activeLink = currentRoute || 'overview'; 
  }

  private fetchOverallBalance(): void {
    this.userDataService.getMonthlyBudget(this.userId).subscribe((data: any) => {
      const formattedBalance = new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'narrowSymbol'        
      }).format(data[0].monthly_budget_value); 

      const budget_value = data[0].monthly_budget_value;

      if(budget_value == undefined) 
        this.overallBalanceHidden = true;
      else
        this.overallBalanceHidden = false; 

      this.overallBalance.set(formattedBalance);
    });
  }



  //EVENTS
  ngOnInit(): void {

    this.userId = 1; // Replace with actual user ID logic

    this.setActiveLinkFromRoute(); 
    this.current_month.set(this.get_CurrentMonth()); 
    this.current_week.set(this.get_current_MonthWeek()); 
    this.fetchOverallBalance();


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveLinkFromRoute();
      }
    });
    
  }


  //CONSTRUCTOR
  constructor(private router: Router,private userDataService: UserDataServiceService) {}

}
