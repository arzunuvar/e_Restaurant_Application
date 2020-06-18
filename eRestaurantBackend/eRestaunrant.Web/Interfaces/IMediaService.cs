using Microsoft.AspNetCore.Http;

namespace eRestaunrant.Web.Interfaces
{
    public interface IMediaService
    {
        string SaveImage(IFormFile media);
    }
}
