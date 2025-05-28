using System.Data;
using System.Data.SqlClient;
using BudgettyWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BudgettyWebApi.Controllers
{
    [ApiController]
    public class BudgettyController : ControllerBase
    {
        public string _connectionString { get; set; }

        public BudgettyController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("BudgettyDb");
        }

        [HttpGet("get_exampleTable")]
        public JsonResult GetExampleTable()
        {
            string query = "SELECT * FROM example_table";
            DataTable dt = new DataTable();
            


            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            dt.Load(reader); // Load DataReader contents into DataTable
                        }
                    }
                }

                // Convert DataTable to a list of dictionaries
                var result = dt.AsEnumerable()
                               .Select(row => dt.Columns.Cast<DataColumn>()
                                                        .ToDictionary(column => column.ColumnName, column => row[column]))
                               .ToList();

                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { message = ex.Message });
            }
        }


        [HttpGet("get_MonthlyBudget")]
        public JsonResult GetMonthlyBudget()
        {
            DataTable dt = new DataTable();

            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("get_monthly_budget", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@user_id", 1)); // TEST VALUE FOR USER_ID
                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            dt.Load(reader); // Load DataReader contents into DataTable
                        }
                    }
                }

                // Convert DataTable to a list of dictionaries
                var result = dt.AsEnumerable()
                               .Select(row => dt.Columns.Cast<DataColumn>()
                                                        .ToDictionary(column => column.ColumnName, column => row[column]))
                               .ToList();

                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { message = ex.Message });
            }
        }


        [HttpPost("insert_MonthlyBudget")]
        public IActionResult Insert_MonthlyBudget([FromBody] MonthlyBudget monthly_budget)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("insert_monthly_budget", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@user_id", monthly_budget.user_id);
                        command.Parameters.AddWithValue("@date_month", monthly_budget.date_month);
                        command.Parameters.AddWithValue("@date_year", monthly_budget.date_year);
                        command.Parameters.AddWithValue("@monthly_budget_value", monthly_budget.monthly_budget_value);
                        command.Parameters.AddWithValue("@initial_monthly_budget", monthly_budget.initial_monthly_budget);
                        command.Parameters.AddWithValue("@week_1", monthly_budget.week_1);
                        command.Parameters.AddWithValue("@week_2", monthly_budget.week_2);
                        command.Parameters.AddWithValue("@week_3", monthly_budget.week_3);
                        command.Parameters.AddWithValue("@week_4", monthly_budget.week_4);
                        command.Parameters.AddWithValue("@week_5", monthly_budget.week_5);
                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                            return Ok(new { message = "Value inserted successfully." });

                        else
                            return BadRequest(new { message = "No rows were inserted." });

                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost("insert_FixedExpense")]
        public IActionResult Insert_FixedEXpense([FromBody] int user_id, DateTime date, decimal expense_value, int type)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("insert_fixed_expense", connection))
                    {
                        command.Parameters.AddWithValue("@user_id", user_id);
                        command.Parameters.AddWithValue("@date", date);
                        command.Parameters.AddWithValue("@expense_value", expense_value);
                        command.Parameters.AddWithValue("@type", type);
                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                            return Ok(new { message = "Data inserted successfully." });
                        
                        else
                            return BadRequest(new { message = "No rows were inserted." });
                        
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost("insert_FixedExpenses")]
        public async Task<IActionResult> Insert_FixedExpenseList([FromBody] List<Expense> expenses)
        {
            try
            {
                //Creating Expense DataTable
                var expenseDT = new DataTable();
                expenseDT.Columns.Add("user_id", typeof(int));
                expenseDT.Columns.Add("date", typeof(DateTime));
                expenseDT.Columns.Add("description", typeof(string));
                expenseDT.Columns.Add("expense_value", typeof(decimal));
                expenseDT.Columns.Add("type", typeof(int));

                foreach (var expense in expenses)
                {
                    expenseDT.Rows.Add(expense.user_id, expense.date,expense.description, expense.expense_value,expense.type);
                }


                // Bulk Insert into SQL Server
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    using (var bulkCopy = new SqlBulkCopy(connection))
                    {
                        bulkCopy.DestinationTableName = "Expenses";
                        bulkCopy.ColumnMappings.Add("user_id", "user_id");
                        bulkCopy.ColumnMappings.Add("date", "date");
                        bulkCopy.ColumnMappings.Add("description", "description");
                        bulkCopy.ColumnMappings.Add("expense_value", "expense_value");
                        bulkCopy.ColumnMappings.Add("type", "type");

                        // Write data to the database
                        await bulkCopy.WriteToServerAsync(expenseDT);
                    }
                }

                // Convert DataTable to a list of dictionaries for JSON serialization
                var insertedData = expenseDT.AsEnumerable()
                                            .Select(row => expenseDT.Columns.Cast<DataColumn>()
                                            .ToDictionary(column => column.ColumnName, column => row[column])).ToList();
                return Ok(new { message = "Expenses Inserted successfully", count = expenses.Count , data = insertedData });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });

            }
        }
    }
}
