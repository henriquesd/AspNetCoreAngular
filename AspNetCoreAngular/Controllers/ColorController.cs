using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreAngular.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAngular.Controllers
{
    public class ColorController : Controller
    {
        ColorDataAccessLayer objColor = new ColorDataAccessLayer();

        // GET: api/<controller>
        [HttpGet("[action]")]
        [Route("api/Color/Index")]
        public IEnumerable<Color> Index()
        {
            return objColor.GetAllColors();
        }

        [HttpPost]
        [Route("api/Color/Create")]
        public int Create([FromBody] Color color)
        {
            return objColor.AddColor(color);
        }

        [HttpGet]
        [Route("api/Color/Details/{id}")]
        public Color Details(int id)
        {
            return objColor.GetColorData(id);
        }

        [HttpPut]
        [Route("api/Color/Edit")]
        public int Edit([FromBody]Color color)
        {
            return objColor.UpdateColor(color);
        }

        [HttpDelete]
        [Route("api/Color/Delete/{id}")]
        public int Delete(int id)
        {
            return objColor.DeleteColor(id);
        }

    }
}