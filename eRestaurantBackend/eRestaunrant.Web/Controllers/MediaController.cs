using eRestaunrant.Web.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eRestaunrant.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : Controller
    {
        private readonly IMediaService mediaService;
        public MediaController(IMediaService mediaService)
        {
            this.mediaService = mediaService;
        }

        [AllowAnonymous]
        [HttpPost("upload")]
        public IActionResult Upload([FromForm] IFormFile image)
        {
            var url = mediaService.SaveImage(image);
            return Json(url);
        }
    }
}
