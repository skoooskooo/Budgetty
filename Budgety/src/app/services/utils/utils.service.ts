import { Injectable } from '@angular/core';
import { ToastService } from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

// Get the current month as a string
  get_Current_Month(): string
  {  
      return new Date().toLocaleString('en-US', { month: 'long' });
  }

  get_Current_Month_Number(): number
  {  
    return new Date().getMonth() + 1; 
  }

  getDaysInMonth(year: number, month: number): number {
    return new Date(new Date().getFullYear(),new Date().getMonth() + 1, 0).getDate();
  }

  // Get the current week of the month
  get_current_MonthWeek(): string 
  { 
    const current_day= new Date().getDate();
    if(current_day <= 7)
      return "Week 1";

    else if(current_day <= 14)
      return "Week 2";
    
    else if(current_day <= 21)
      return "Week 3";

    else if(current_day <= 28)
      return "Week 4";

    else 
      return "Final Days";
  }

  getDaysInCurrentMonth(): number {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }

  get_Week_Values(monthly_budget_value: number): Array<number> 
  {
    let week_array: Array<number> = new Array(5).fill(0);

    try
    {
      const days_in_month = this.getDaysInCurrentMonth();
      const days_in_full_weeks = 4 * 7;
      const extraDays = days_in_month - days_in_full_weeks;
  
      const daily_budget = monthly_budget_value / days_in_month;
      const weeklyBudget = daily_budget * 7;
      const leftover_days_budget = daily_budget * extraDays;
    
      week_array[0] = weeklyBudget;
      week_array[1] = weeklyBudget;
      week_array[2] = weeklyBudget;
      week_array[3] = weeklyBudget;
      week_array[4] = leftover_days_budget;
    }
    catch(error: any)
    {
      console.error("Error in get_Week_Values",error);
      this.toastService.show_Error(error.message);
      return new Array(5).fill(0);
    }
    return week_array;
  }



  // Format a number as currency in Euros
  public FormatCurrency(value: number): string 
  {
    const formattedBalance = new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'narrowSymbol'        
    }).format(value); 

    return formattedBalance;
  }

  constructor(private toastService: ToastService) { }
}
