import { Component ,signal, ViewChild} from '@angular/core';
import { ToastService } from '../../services/toast-service/toast.service';
import { UserDataServiceService } from '../../services/user-data-service/user-data-service.service';
import { UtilsService } from '../../services/utils/utils.service';
import { MonthlyBudget } from '../../models/monthly-budget.model';
import { FixedExpensesComponent } from '../fixed-expenses/fixed-expenses.component';


@Component({
  selector: 'currency-input',
  standalone: true,
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css'
})

export class CurrencyInputComponent {


  // PROPERTIES
  currencyString = signal<string>("");
  fixedExpensesComponent: any;

  //METHODS
  Validate_Budget_Value(): boolean 
{
  const input = this.currencyString();
  const budget_value = parseFloat(input);

  if (/[a-zA-Z]/g.test(input) || isNaN(budget_value)) 
    return false;   

  return true; 
  }

  Add_Monthly_Budget(monthlyBudget: MonthlyBudget): void
  {
    this.userDataService.insertMonthlyBudget(monthlyBudget).subscribe((data: any) => 
    {
      console.log("API Response:", data);
      this.toastService.show_Success("Monthly Budget added successfully.");
    },
    (error: any) => 
    {
      console.error("Error adding budget:", error);
      this.toastService.show_Error("Error adding budget.");
    });

  }

  public Submit_Monthly_Budget(): void 
  {
    //Validates Budget Value Input
    if (!(this.Validate_Budget_Value())) 
    {
      this.toastService.show_Error("Please enter a valid currency value.");
      return;
    }

    //Checks for expenses 
    const expenseList = this.fixedExpensesComponent.exportExpenseList();
    console.log('Current Expense List:', expenseList);

    //Gets relevant Budget Values
    const budget_value = parseFloat(this.currencyString());
    const weekly_budget = this.utilsService.get_Week_Values(budget_value);

    const monthlyBudget: MonthlyBudget = new MonthlyBudget(
      this.utilsService.get_Current_Month_Number(), 
      budget_value,                                
      budget_value,                                
      weekly_budget[0],                           
      weekly_budget[1],                             
      weekly_budget[2],                           
      weekly_budget[3],              
      weekly_budget[4]                      
    );
 
    //Adds Values to Database
    this.Add_Monthly_Budget(monthlyBudget);

  }

 //EVENT HANDLERS 
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
    this.currencyString.set(inputElement.value); // Update the signal with the input value
  }


  //CONSTRUCTOR
  constructor (public toastService:ToastService, public userDataService: UserDataServiceService,private utilsService: UtilsService) { }
}
