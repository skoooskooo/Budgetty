export class Expense {
  id?: number;
  user_id?: number;
  date?: string;
  description?: string;
  expense_value?: number; 
  type?: ExpenseType;

  constructor(
    id?: number,
    user_id?: number,
    date?: string,
    description?: string,
    expense_value?: number,
    type?: ExpenseType
  ) {
    this.id = id;
    this.user_id = user_id;
    this.date = date;
    this.description = description;
    this.expense_value = expense_value;
    this.type = type;
  }
}

export enum ExpenseType {
  Groceries = 'Groceries',
  Rent = 'Rent',
  Entertainment = 'Entertainment',
  Utilities = 'Utilities'
}