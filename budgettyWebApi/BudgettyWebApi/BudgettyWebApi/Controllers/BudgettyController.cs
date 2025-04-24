using System.Data;
using System.Data.SqlClient;
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

        [HttpPost("insert_MonthlyBudget_Value")]
        public IActionResult Insert_MonthlyBudget_Value([FromBody] int date_month, decimal monthy_budget_value,decimal initial_monthly_budget,decimal week_1,
            decimal week_2, decimal week_3, decimal week_4, decimal week_5)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("insert_monthly_budget", connection))
                    {
                        command.Parameters.AddWithValue("@date_month", date_month);
                        command.Parameters.AddWithValue("@monthly_budget_value", monthy_budget_value);
                        command.Parameters.AddWithValue("@initial_monthly_budget", initial_monthly_budget);
                        command.Parameters.AddWithValue("@week_1", week_1);
                        command.Parameters.AddWithValue("@week_2", week_2);
                        command.Parameters.AddWithValue("@week_3", week_3);
                        command.Parameters.AddWithValue("@week_4", week_4);
                        command.Parameters.AddWithValue("@week_5", week_5);
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
    }
}
