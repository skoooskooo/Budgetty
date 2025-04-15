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
            string procedure = "get_monthly_budget";
            DataTable dt = new DataTable();

            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand(procedure, connection))
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
        public IActionResult Insert_MonthlyBudget_Value([FromBody] string value)
        {
            string procedure = "INSERT INTO budget_table (id,Monthly_Budget_value,user_id) VALUES (1, @Value, 1)";
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand(procedure, connection))
                    {
                        command.Parameters.Add(new SqlParameter("@Value", value));
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
