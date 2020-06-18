using AutoMapper;
using eRestaunrant.Web.Interfaces;
using eRestaunrant.Web.Requests;
using eRestaunrant.Web.Responses;
using eRestaunrant.Web.ServiceProcessors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : AuthenticatedBaseController
    {
        private readonly IServiceProcessor serviceProcessor;
        private readonly IAdvertisementService advertisementService;
        private readonly IMapper mapper;
        public AdvertisementController(IServiceProcessor serviceProcessor, IAdvertisementService advertisementService, IMapper mapper)
        {
            this.serviceProcessor = serviceProcessor;
            this.advertisementService = advertisementService;
            this.mapper = mapper;
        }


        [HttpPost("addCarouselContent")]
        public IActionResult AddCarouselContent([FromBody] AddCarouselContentRequest request)
        {
            var response = serviceProcessor.Call(advertisementService.AddCarouselContent, request);

            return Json(response);
        }

        [HttpPost("deleteCarousel")]
        public IActionResult DeleteCarousel([FromBody] CarouselDeleteRequest request)
        {
            var response = serviceProcessor.Call(advertisementService.DeleteCarousel, request);

            return Json(response);
        }

        [HttpPost("updateCarouselIsActive")]
        public IActionResult UpdateCarouselIsActive([FromBody] UpdateCarouselIsActiviteRequest request)
        {
            var response = serviceProcessor.Call(advertisementService.UpdateCarouselIsActive, request);

            return Json(response);
        }

        [HttpPost("getCarouselContents")]
        public IActionResult GetCarouselContents()
        {
            var response = serviceProcessor.Call(advertisementService.GetCarouselContents,currentUser);
            response.Content = mapper.Map<List<CarouselContentDto>>(response.Content);
            return Json(response);
        }

    }
}
