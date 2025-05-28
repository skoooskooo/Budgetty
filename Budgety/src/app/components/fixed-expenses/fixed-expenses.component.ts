import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-fixed-expenses',
  imports: [FormsModule,CommonModule],
  templateUrl: './fixed-expenses.component.html',
  styleUrl: './fixed-expenses.component.css'
})
export class FixedExpensesComponent {

  // PROPERTIES
  expenses: Array<Expense> = []; 
  new_fixed_expense = new Expense(undefined, undefined, undefined, undefined, undefined,1);

  // METHODS
  AddFixedExpense(): void {

    if (this.new_fixed_expense.description?.trim() && (this.new_fixed_expense.expense_value ?? 0) > 0) 
    {
      this.new_fixed_expense.date = new Date(Date.now()).toISOString().split('T')[0];
      this.expenses.push({ ...this.new_fixed_expense });       
      console.log(this.expenses);
      this.new_fixed_expense = new Expense(undefined, undefined, undefined, undefined, undefined,1); 
    }
  }

  RemoveExpense(index: number): void {
    this.expenses.splice(index, 1);
  }

  public ExportExpenseList(): Array<Expense>
  {
    return this.expenses;
  }
}
