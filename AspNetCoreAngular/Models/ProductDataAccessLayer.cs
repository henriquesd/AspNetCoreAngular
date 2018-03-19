using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreAngular.Models
{
    public class ProductDataAccessLayer
    {
        string connectionString = "Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=AspNetCoreAngular;Data Source=HENRIQUE-PC";

        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                List<Product> productList = new List<Product>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_GetAllProducts", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open( );
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Product product = new Product();
                        product.Id = Convert.ToInt32(rdr["Id"]);
                        product.Name = rdr["Name"].ToString();
                        product.Details = rdr["Details"].ToString();
                        product.Quantity = Convert.ToInt32(rdr["Quantity"]);
                        product.ColorId = Convert.ToInt32(rdr["ColorId"]);
                        product.Color = new Color();
                        product.Color.Id = Convert.ToInt32(rdr["ColorId"]);
                        product.Color.Name = rdr["ColorName"].ToString();
                        productList.Add(product);
                    }
                    con.Close();
                }
                return productList;
            }
            catch
            {
                throw;
            }
        }

        public int AddProduct(Product product)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_AddProduct", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Name", product.Name);
                    cmd.Parameters.AddWithValue("@Details", product.Details);
                    cmd.Parameters.AddWithValue("@Quantity", product.Quantity);
                    cmd.Parameters.AddWithValue("@ColorId", product.ColorId);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int UpdateProduct(Product product)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_UpdateProduct", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", product.Id);
                    cmd.Parameters.AddWithValue("@Name", product.Name);
                    cmd.Parameters.AddWithValue("@Details", product.Details);
                    cmd.Parameters.AddWithValue("@Quantity", product.Quantity);
                    cmd.Parameters.AddWithValue("@ColorId", product.ColorId);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public Product GetProductData(int id)
        {
            try
            {
                Product product = new Product();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT Product.*, Color.Id as 'ColorId', Color.Name as 'ColorName' FROM Product INNER JOIN Color on Color.Id = Product.ColorId WHERE Product.Id = " + id;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        product.Id = Convert.ToInt32(rdr["Id"]);
                        product.Name = rdr["Name"].ToString();
                        product.Details = rdr["Details"].ToString();
                        product.Quantity = Convert.ToInt32(rdr["Quantity"]);
                        product.ColorId = Convert.ToInt32(rdr["ColorId"]);
                        product.Color = new Color();
                        product.Color.Id = Convert.ToInt32(rdr["ColorId"]);
                        product.Color.Name = rdr["ColorName"].ToString();
                    }
                }
                return product;
            }
            catch
            {
                throw;
            }
        }
        public int DeleteProduct(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_DeleteProduct", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", id);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
