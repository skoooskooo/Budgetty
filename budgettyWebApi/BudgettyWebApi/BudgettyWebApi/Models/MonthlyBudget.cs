namespace BudgettyWebApi.Models
{
    public class MonthlyBudget
    {
        public int user_id { get; set; }
        public int date_month { get; set; }
        public int date_year { get; set; }
        public decimal monthly_budget_value { get; set; }
        public decimal initial_monthly_budget { get; set; }
        public decimal week_1 { get; set; }
        public decimal week_2 { get; set; }
        public decimal week_3 { get; set; }
        public decimal week_4 { get; set; }
        public decimal week_5 { get; set; }

    }
}
