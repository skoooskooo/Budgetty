import { NgClass } from '@angular/common';
import { Component, signal ,inject} from '@angular/core';
import { RouterLink ,Router, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDataServiceService } from '../../services/user-data-service/user-data-service.service';
import  {MatDialog} from '@angular/material/dialog';
import { AddBudgetDialogComponent } from '../../dialogs/add-budget-dialog/add-budget-dialog.component';
import { UtilsService } from '../../services/utils/utils.service';
@Component({
    selector: 'app-navbar',
    imports: [
        RouterLink,
        NgClass,
        CommonModule
    ],
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



  private fetchOverallBalance(): void 
  {
    this.userDataService.getMonthlyBudget(this.userId).subscribe((data: any) => 
    {
        console.log("API Response:", data);

        //Checks if data has values
        if (!data || data.length === 0 || !data[0]?.monthly_budget_value) {
          console.log("Budget value is undefined or empty. Hiding overall balance.");
          this.overallBalanceHidden = true;
          return;
        }
      
      const formattedBalance = this.utilsService.FormatCurrency(data[0].monthly_budget_value);

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
      width: '420px',
      panelClass: 'custom-dialog-container'
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
    this.current_month.set(this.utilsService.get_Current_Month()); 
    this.current_week.set(this.utilsService.get_current_MonthWeek()); 
    this.fetchOverallBalance();


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveLinkFromRoute();
      }
    });
    
  }


  //CONSTRUCTOR
  constructor(private router: Router,private userDataService: UserDataServiceService, private utilsService: UtilsService) {}

}
