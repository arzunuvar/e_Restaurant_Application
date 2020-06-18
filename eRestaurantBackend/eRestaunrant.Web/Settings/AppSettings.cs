using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Settings
{
    public class AppSettings
    {
        public string SigningKey { get; set; }
        public string AWSAccessKeyId { get; set; }
        public string AWSAccessKey { get; set; }
        public string MediaBaseUrl { get; set; }
    }
}
