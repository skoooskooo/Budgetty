export class Expense {
  id?: number;
  user_id?: number;
  date?: Date;
  description?: string;
  expense_value?: number; 

  constructor(
    id?: number,
    user_id?: number,
    date?: Date,
    description?: string,
    expense_value?: number
  ) {
    this.id = id;
    this.user_id = user_id;
    this.date = date;
    this.description = description;
    this.expense_value = expense_value;
  }
}