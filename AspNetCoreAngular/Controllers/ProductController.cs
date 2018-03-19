using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreAngular.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAngular.Controllers
{
    public class ProductController : Controller
    {
        ProductDataAccessLayer objProduct = new ProductDataAccessLayer();

        // GET: api/<controller>
        [HttpGet("[action]")]
        [Route("api/Product/Index")]
        public IEnumerable<Product> Index()
        {
            return objProduct.GetAllProducts();
        }

        [HttpPost]
        [Route("api/Product/Create")]
        public int Create([FromBody] Product product)
        {
            return objProduct.AddProduct(product);
        }

        [HttpGet]
        [Route("api/Product/Details/{id}")]
        public Product Details(int id)
        {
            return objProduct.GetProductData(id);
        }

        [HttpPut]
        [Route("api/Product/Edit")]
        public int Edit([FromBody]Product product)
        {
            return objProduct.UpdateProduct(product);
        }

        [HttpDelete]
        [Route("api/Product/Delete/{id}")]
        public int Delete(int id)
        {
            return objProduct.DeleteProduct(id);
        }
    }
}
