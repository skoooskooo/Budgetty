import { Component, signal,ViewChild } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule ,MatDialogRef} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CurrencyInputComponent } from '../../components/currency-input/currency-input.component';
import { ToastService } from '../../services/toast-service/toast.service';
import { FixedExpensesComponent } from '../../components/fixed-expenses/fixed-expenses.component';
import { UserDataServiceService } from '../../services/user-data-service/user-data-service.service';
import { MonthlyBudget } from '../../models/monthly-budget.model';
import { UtilsService } from '../../services/utils/utils.service';
import { Expense } from '../../models/expense.model';

@Component({
    selector: 'app-add-budget-dialog',
    standalone: true,
    imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        CurrencyInputComponent,
        FixedExpensesComponent
    ],
    templateUrl: './add-budget-dialog.component.html',
    styleUrl: './add-budget-dialog.component.css'
})
export class AddBudgetDialogComponent {
    @ViewChild(CurrencyInputComponent) currencyInputComponent!: CurrencyInputComponent;
    @ViewChild(FixedExpensesComponent) fixedExpensesComponent!: FixedExpensesComponent; // Reference to the FixedExpensesComponent
    
    // PROPERTIES
    public budget_value: number = 0; 
    public budget_after_expenses: number = 0;
    


    // METHODS
    public AddBudget(): void 
    {
      try
      {
        if (!(this.Validate_Budget_Value()))    
          return;
      
        this.Submit_Expenses();
        this.Submit_MonthlyBudget();

        this.budget_dialog_ref.close();
      } 
      catch (error)
      { 
        this.toastService.show_Error("There was an error adding the budget.");
        console.error("Error adding budget:", error);
      }
    }

    Submit_Expenses(): void {

      const expense_list = this.fixedExpensesComponent.ExportExpenseList();

      if(expense_list.length > 0)//If there are expenses
      {
        this.budget_after_expenses = this.budget_value - (expense_list.reduce((sum, item) => sum + (item.expense_value ?? 0), 0));

        console.log('Current Expense List:', expense_list);
        this.userDataService.insert_Fixed_Expenses(expense_list).subscribe((data: any) => 
        {
          console.log("API Response:", data);
        },
        (error: any) => 
        {
          console.error("Error adding expenses:", error);
          this.toastService.show_Error("Error adding expenses.");
        });
      }
    }

    Submit_MonthlyBudget(): void
    { 
      const weekly_budget = this.utilsService.get_Week_Values(this.budget_after_expenses);
      const user_id = 1; // Assuming user_id is 1 for this example  

      const monthlyBudget: MonthlyBudget = new MonthlyBudget(user_id,
        this.utilsService.get_Current_Month_Number(), 
        this.utilsService.get_Current_Year_Number(),
        this.budget_after_expenses,                                
        this.budget_after_expenses,                                
        weekly_budget[0],                           
        weekly_budget[1],                             
        weekly_budget[2],                           
        weekly_budget[3],              
        weekly_budget[4]                      
      );
         
      //Adds Values to Database
      this.Insert_Monthly_Budget(monthlyBudget);
    }

    

    Validate_Budget_Value(): boolean 
    {
      const input = this.currencyInputComponent.getCurrencyInputString();
      const budget_value = parseFloat(input);
    
      if (/[a-zA-Z]/g.test(input) || isNaN(budget_value)) 
      {
        this.toastService.show_Error("Please enter a valid currency value.");
        return false;   
      }

      this.budget_value = budget_value;
      return true; 
    }
    
    Insert_Monthly_Budget(monthlyBudget: MonthlyBudget): void
    {
      try{

      
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
      catch (error) 
      {
        console.error("Error adding budget:", error);
        this.toastService.show_Error("Error adding budget.");
      }
    }

    Click_Ok(): void 
    {
        this.AddBudget();
    }

constructor(public toastService:ToastService, 
            public userDataService: UserDataServiceService,
            private utilsService: UtilsService,
            public budget_dialog_ref: MatDialogRef<AddBudgetDialogComponent>) { } // Constructor to initialize services
    
}
