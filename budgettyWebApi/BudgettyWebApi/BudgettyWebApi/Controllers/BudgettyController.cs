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


        [HttpGet("api/budgetty", Name = "get_TestInfo")]
        public JsonResult Get_TestInfo()
        {

            string query = "SELECT * FROM example_table";

            DataTable dt = new DataTable();

            SqlDataReader reader;

            using(SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    reader = command.ExecuteReader();
                    dt.Load(reader);
                }
            }
            JsonResult result = new JsonResult(dt);
            return result;
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
    }
}
