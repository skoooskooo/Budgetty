import { NgClass } from '@angular/common';
import { Component, signal ,inject} from '@angular/core';
import { RouterLink ,Router, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDataServiceService } from '../../services/user-data-service.service';
import {MatButton, MatButtonModule} from '@angular/material/button';
import  {MatDialog} from '@angular/material/dialog';
import { AddBudgetDialogComponent } from '../../dialogs/add-budget-dialog/add-budget-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    CommonModule,
    MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  //#region PROPERTIES
  readonly dialog = inject(MatDialog);
  userId: any;
  overallBalanceHidden: boolean = true; // Initially hidden
  activeLink: string = 'overview'; // Default active link
  overallBalance = signal<string>("");
  week_Balance = signal<string>("");
  current_month = signal<string>("");
  current_week = signal<string>(""); 
  //#endregion



  //METHODS
  setActiveLink(link: string): void {
    this.activeLink = link;
  }

  private setActiveLinkFromRoute(): void {
    const currentRoute = this.router.url.split('/')[1]; 
    this.activeLink = currentRoute || 'overview'; 
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

  private fetchOverallBalance(): void {
    this.userDataService.getMonthlyBudget(this.userId).subscribe((data: any) => 
      {
        console.log("API Response:", data);

        //Checks if data has values
        if (!data || data.length === 0 || !data[0]?.monthly_budget_value) {
          console.log("Budget value is undefined or empty. Hiding overall balance.");
          this.overallBalanceHidden = true;
          return;
        }


      const formattedBalance = new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'narrowSymbol'        
      }).format(data[0].monthly_budget_value); 

      const budget_value = data[0].monthly_budget_value;

      if(budget_value == undefined) 
      {
        console.log("Budget value is undefined. Hiding overall balance.");
        this.overallBalanceHidden = true;
      }
      else
        this.overallBalanceHidden = false; 

      this.overallBalance.set(formattedBalance);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBudgetDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.fetchOverallBalance(); // Refresh the overall balance after closing the dialog
      }
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
