using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using eRestaunrant.Web.Interfaces;
using eRestaunrant.Web.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.IO;

namespace eRestaunrant.Web.Services
{
    public class MediaService : IMediaService
    {
        private readonly AppSettings settings;
        private readonly IAmazonS3 S3Client;

        private string BucketName = "erestaurant";

        public MediaService(IOptions<AppSettings> settings)
        {
            this.settings = settings.Value;
            this.S3Client = new AmazonS3Client(this.settings.AWSAccessKeyId, this.settings.AWSAccessKey, RegionEndpoint.EUWest3);
        }

        /// <summary>
        /// Returns URL of saved image
        /// </summary>
        /// <param name="media"></param>
        /// <returns></returns>
        public string SaveImage(IFormFile media)
        {
            string imageId = Guid.NewGuid().ToString();
            string fileName = "temp//" + imageId + ".jpg";
            if (media.Length == 0)
            {
                throw new Exception("File cannot be empty");
            }
            Directory.CreateDirectory(Path.GetDirectoryName(fileName));
            using (var fileStream = new FileStream(fileName, FileMode.Create))
            {
                media.CopyTo(fileStream);
            }

            UploadFileToAWSS3(imageId, fileName);
            return string.Format("{0}/{1}", settings.MediaBaseUrl, imageId);
        }

        public void UploadFileToAWSS3(string KeyName, string FileWithPath)
        {
            try
            {
                var uploadRequest = new TransferUtilityUploadRequest
                {
                    FilePath = FileWithPath,
                    BucketName = BucketName,
                    CannedACL = S3CannedACL.PublicRead,
                    Key = KeyName
                };
                var fileTransferUtility = new TransferUtility(S3Client);
                fileTransferUtility.Upload(uploadRequest);
            }
            catch (Exception ex)
            {
                //logger.LogError("UpdloadBinary exception. Message:'{0}' when writing an object. " +
                //    "KeyName:'{1}' FileWithPath:'{2}'", ex.Message, KeyName, FileWithPath);
            }
            finally
            {
                File.Delete(FileWithPath);
            }
        }
    }
}
