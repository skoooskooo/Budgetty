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
  expenses: Array<Expense> = []; // List of items
  new_expense = new Expense(undefined, undefined, undefined, undefined, undefined); // Initialize with undefined values

  addExpense(): void {

    if (this.new_expense.description?.trim() && (this.new_expense.expense_value ?? 0) > 0) {
      this.new_expense.date = new Date(Date.now());
      this.expenses.push({ ...this.new_expense }); // Add a copy of the new item to the list
      console.log(this.expenses);
      this.new_expense = new Expense(undefined, undefined, undefined, undefined, undefined); // Reset the input fields
    }
  }

  removeExpense(index: number): void {
    this.expenses.splice(index, 1); // Remove the expense at the given index
  }

  public exportExpenseList(): Array<Expense>
  {
    return this.expenses;
  }
}
