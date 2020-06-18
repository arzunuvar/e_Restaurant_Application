namespace eRestaunrant.Web.ServiceWrapper
{
    public class ServiceResponse
    {
        public bool Succeeded { get; set; }
        public string Message { get; set; }
        public int TotalPage { get; set; }
        public int ActivePage { get; set; }
        public object Content { get; set; } = null;
        public string AccessToken { get; set; } = null;
    }
}
