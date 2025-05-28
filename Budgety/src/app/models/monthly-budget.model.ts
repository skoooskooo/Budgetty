export class MonthlyBudget {
    
    user_id?: number;
    date_month: number;
    date_year: number;
    monthly_budget_value: number;
    initial_monthly_budget: number;
    week_1: number;
    week_2: number;
    week_3: number;
    week_4: number;
    week_5: number;
  
    constructor(user_id: number,date_month: number,date_year: number, monthly_budget_value: number, initial_monthly_budget: number,
        week_1: number,week_2: number,week_3: number,week_4: number,week_5: number)
    {
      this.user_id = user_id;
      this.date_month = date_month;
      this.date_year = date_year;
      this.monthly_budget_value = monthly_budget_value;
      this.initial_monthly_budget = initial_monthly_budget;
      this.week_1 = week_1;
      this.week_2 = week_2;
      this.week_3 = week_3;
      this.week_4 = week_4;
      this.week_5 = week_5;
    }
  }