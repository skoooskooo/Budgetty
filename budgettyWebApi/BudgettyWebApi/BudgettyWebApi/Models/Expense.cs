namespace BudgettyWebApi.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public int user_id { get; set; }
        public DateTime date { get; set; }
        public string description { get; set; }
        public decimal expense_value { get; set; } 
        public int type { get; set; } 
    }
}
